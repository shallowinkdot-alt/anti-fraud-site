const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const port = Number(process.env.PORT || 8765);
const configPath = path.join(rootDir, 'static', 'llm_scenario_config.json');

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4'
};

function sendJson(res, status, data) {
    res.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
    });
    res.end(JSON.stringify(data));
}

function readRequestJson(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
            if (body.length > 1024 * 1024) {
                reject(new Error('Request body too large'));
                req.destroy();
            }
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', reject);
    });
}

function normalizeMessages(messages) {
    if (!Array.isArray(messages)) return [];
    return messages
        .filter((message) => message && typeof message.content === 'string')
        .map((message) => ({
            role: message.role === 'user' ? 'user' : 'assistant',
            content: message.content.slice(0, 1000)
        }))
        .slice(-12);
}

function readScenarioConfig(scenarioId) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return config[String(scenarioId)];
}

function parseModelReply(text) {
    const cleaned = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
    const parsed = JSON.parse(cleaned);
    if (!parsed || typeof parsed.reply !== 'string' || !parsed.reply.trim()) {
        throw new Error('Model response missing reply');
    }
    return {
        reply: parsed.reply.trim().slice(0, 240),
        nextAction: parsed.nextAction === true
    };
}

function buildDeepSeekMessages(scenarioConfig, messages, goal) {
    const responseInstruction = [
        '你必须只输出一个 JSON 对象，不要使用 Markdown，不要添加解释。',
        '格式为 {"reply":"给用户看的中文回复","nextAction":false}。',
        '当用户已经愿意进入下一步、询问入口、明显被说服，或达到场景目标时，把 nextAction 设为 true。',
        `当前目标：${goal || scenarioConfig.goal || '诱导用户进入原有下一步流程'}`
    ].join('\n');

    return [
        {
            role: 'system',
            content: [scenarioConfig.systemPrompt || '', responseInstruction].filter(Boolean).join('\n\n')
        },
        ...messages.map((message) => ({
            role: message.role,
            content: message.content
        }))
    ];
}

function getChatCompletionsEndpoint(apiEndpoint) {
    const endpoint = apiEndpoint || 'https://api.deepseek.com/chat/completions';
    if (/\/chat\/completions\/?$/.test(endpoint)) {
        return endpoint;
    }
    return endpoint.replace(/\/$/, '') + '/chat/completions';
}

async function handleChat(req, res) {
    let payload;
    try {
        payload = await readRequestJson(req);
    } catch (error) {
        sendJson(res, 400, { error: 'Invalid JSON request body' });
        return;
    }

    const scenarioId = Number(payload.scenarioId);
    if (![8, 9, 10].includes(scenarioId)) {
        sendJson(res, 400, { error: 'scenarioId must be 8, 9, or 10' });
        return;
    }

    const messages = normalizeMessages(payload.messages);
    let scenarioConfig;
    try {
        scenarioConfig = readScenarioConfig(scenarioId);
    } catch (error) {
        sendJson(res, 500, { error: 'Failed to read static/llm_scenario_config.json' });
        return;
    }

    if (!scenarioConfig || !scenarioConfig.enabled) {
        sendJson(res, 400, { error: 'Scenario LLM config is disabled or missing' });
        return;
    }

    if (scenarioConfig.provider !== 'deepseek') {
        sendJson(res, 400, { error: 'Only provider \"deepseek\" is supported by this local server' });
        return;
    }

    if (!scenarioConfig.apiKey || scenarioConfig.apiKey.includes('YOUR_')) {
        sendJson(res, 500, { error: 'DeepSeek apiKey is not set in static/llm_scenario_config.json' });
        return;
    }

    try {
        const deepSeekResponse = await fetch(getChatCompletionsEndpoint(scenarioConfig.apiEndpoint), {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${scenarioConfig.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: scenarioConfig.model || 'deepseek-chat',
                messages: buildDeepSeekMessages(scenarioConfig, messages, payload.goal),
                stream: false,
                temperature: scenarioConfig.temperature === undefined ? 0.7 : scenarioConfig.temperature,
                max_tokens: scenarioConfig.maxTokens || 220,
                response_format: { type: 'json_object' }
            })
        });

        const data = await deepSeekResponse.json();
        if (!deepSeekResponse.ok) {
            sendJson(res, deepSeekResponse.status, {
                error: data.error && data.error.message ? data.error.message : 'DeepSeek API request failed'
            });
            return;
        }

        const content = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
        sendJson(res, 200, parseModelReply(content));
    } catch (error) {
        sendJson(res, 500, { error: error.message || 'Chat request failed' });
    }
}

function serveStatic(req, res) {
    const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = decodeURIComponent(requestUrl.pathname === '/' ? '/page_home.html' : requestUrl.pathname);
    const filePath = path.resolve(rootDir, `.${pathname}`);

    if (!filePath.startsWith(rootDir)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.stat(filePath, (statError, stats) => {
        if (statError || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
            'Content-Type': mimeTypes[ext] || 'application/octet-stream',
            'Cache-Control': ext === '.html' || ext === '.json' || ext === '.js' ? 'no-store' : 'public, max-age=3600'
        });
        fs.createReadStream(filePath).pipe(res);
    });
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/chat') {
        handleChat(req, res);
        return;
    }

    if (req.method === 'GET' || req.method === 'HEAD') {
        serveStatic(req, res);
        return;
    }

    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method not allowed');
});

server.listen(port, () => {
    console.log(`Anti-fraud site running at http://localhost:${port}/`);
    console.log('LLM chat endpoint: POST /chat');
    console.log('DeepSeek config is read from static/llm_scenario_config.json.');
});
