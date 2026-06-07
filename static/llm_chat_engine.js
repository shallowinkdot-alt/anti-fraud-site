(function() {
    const configUrl = 'static/llm_scenario_config.json';
    const configCache = { promise: null };

    function loadConfig() {
        if (!configCache.promise) {
            configCache.promise = fetch(configUrl, { cache: 'no-store' }).then(function(response) {
                if (!response.ok) {
                    throw new Error('LLM config unavailable');
                }
                return response.json();
            });
        }
        return configCache.promise;
    }

    function asOpeningMessage(item) {
        if (typeof item === 'string') {
            return { role: 'assistant', content: item };
        }
        return {
            role: 'assistant',
            content: item.content || '',
            senderName: item.senderName,
            avatar: item.avatar
        };
    }

    function setDisplay(element, value) {
        if (element) {
            element.style.display = value;
        }
    }

    function appendPlainMessage(container, role, content) {
        const row = document.createElement('div');
        row.className = role === 'user' ? 'loan-msg-row self' : 'loan-msg-row';

        const bubble = document.createElement('div');
        bubble.className = role === 'user' ? 'loan-msg self' : 'loan-msg service';

        const text = document.createElement('p');
        text.textContent = content;
        bubble.appendChild(text);
        row.appendChild(bubble);
        container.appendChild(row);
        container.scrollTop = container.scrollHeight;
    }

    function appendWxBubbleContent(bubble, content, actionLabel, onAction) {
        const text = String(content || '');
        if (!actionLabel || !text.includes(actionLabel) || typeof onAction !== 'function') {
            bubble.textContent = text;
            return false;
        }

        const parts = text.split(actionLabel);
        parts.forEach(function(part, index) {
            if (part) {
                bubble.appendChild(document.createTextNode(part));
            }

            if (index < parts.length - 1) {
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = actionLabel;
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    onAction();
                });
                bubble.appendChild(link);
            }
        });
        return true;
    }

    function appendWxMessage(container, role, content, meta) {
        const row = document.createElement('div');
        row.className = role === 'user' ? 'wx-msg-row wx-msg-right' : 'wx-msg-row wx-msg-left';

        const body = document.createElement('div');
        body.className = 'wx-msg-body';

        const sender = document.createElement('div');
        sender.className = 'wx-sender-name';
        sender.textContent = role === 'user' ? '我' : ((meta && meta.senderName) || '王老师');

        const bubble = document.createElement('div');
        bubble.className = role === 'user' ? 'wx-bubble wx-bubble-self' : 'wx-bubble';
        let hasActionLink = false;
        if (role === 'user') {
            bubble.textContent = content;
        } else {
            hasActionLink = appendWxBubbleContent(
                bubble,
                content,
                meta && meta.actionLabel,
                meta && meta.onAction
            );
        }

        body.appendChild(sender);
        body.appendChild(bubble);

        const avatar = document.createElement('img');
        avatar.className = 'wx-avatar';
        avatar.alt = '';
        avatar.src = role === 'user' ? 'static/images/avatar-me.png' : ((meta && meta.avatar) || 'static/images/avatar-wang.png');

        if (role === 'user') {
            row.appendChild(body);
            row.appendChild(avatar);
        } else {
            row.appendChild(avatar);
            row.appendChild(body);
        }

        container.appendChild(row);
        container.scrollTop = container.scrollHeight;
        return hasActionLink;
    }

    function appendWxAction(container, label, onAction) {
        const row = document.createElement('div');
        row.className = 'wx-msg-row wx-msg-left llm-next-action-row';

        const avatar = document.createElement('img');
        avatar.src = 'static/images/avatar-li.png';
        avatar.alt = '';
        avatar.className = 'wx-avatar';

        const body = document.createElement('div');
        body.className = 'wx-msg-body';

        const sender = document.createElement('div');
        sender.className = 'wx-sender-name';
        sender.textContent = '李明辉（班长）';

        const bubble = document.createElement('div');
        bubble.className = 'wx-bubble';
        bubble.appendChild(document.createTextNode('@全体成员 请点击下方链接填写缴费信息：'));
        bubble.appendChild(document.createElement('br'));

        const link = document.createElement('a');
        link.href = '#';
        link.textContent = label;
        link.addEventListener('click', function(event) {
            event.preventDefault();
            onAction();
        });
        bubble.appendChild(link);

        body.appendChild(sender);
        body.appendChild(bubble);
        row.appendChild(avatar);
        row.appendChild(body);
        container.appendChild(row);
        container.scrollTop = container.scrollHeight;
    }

    function makePayload(scenarioId, scenarioConfig, messages) {
        const responseInstruction = '你必须只输出一个 JSON 对象，不要使用 Markdown，不要添加解释。格式为 {"reply":"给用户看的中文回复","nextAction":false}。当用户已经愿意进入下一步、询问入口、明显被说服，或达到场景目标时，把 nextAction 设为 true。';
        const chatMessages = [
            {
                role: 'system',
                content: [scenarioConfig.systemPrompt || '', responseInstruction].filter(Boolean).join('\n\n')
            }
        ].concat(messages.map(function(message) {
            return {
                role: message.role,
                content: message.content
            };
        }));

        if (scenarioConfig.requestFormat === 'deepseek-chat-completions') {
            return {
                model: scenarioConfig.model || 'deepseek-chat',
                messages: chatMessages,
                stream: false,
                temperature: scenarioConfig.temperature === undefined ? 0.7 : scenarioConfig.temperature,
                max_tokens: scenarioConfig.maxTokens || 220,
                response_format: { type: 'json_object' }
            };
        }

        return {
            scenarioId: Number(scenarioId),
            messages: messages.map(function(message) {
                return {
                    role: message.role,
                    content: message.content
                };
            }),
            systemPrompt: scenarioConfig.systemPrompt || '',
            goal: scenarioConfig.goal || '诱导用户进入原有下一步流程'
        };
    }

    function normalizeReply(data) {
        let replyData = data;
        const deepseekContent = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;

        if (typeof deepseekContent === 'string') {
            try {
                replyData = JSON.parse(deepseekContent);
            } catch (error) {
                replyData = { reply: deepseekContent, nextAction: false };
            }
        }

        if (!replyData || typeof replyData.reply !== 'string' || !replyData.reply.trim()) {
            throw new Error('Invalid LLM response');
        }
        return {
            reply: replyData.reply.trim(),
            nextAction: replyData.nextAction === true
        };
    }

    function initChat(options, scenarioConfig) {
        const llmRoot = document.getElementById(options.llmRootId);
        const legacyRoot = document.getElementById(options.legacyRootId);
        const messagesEl = document.getElementById(options.messagesId);
        const inputEl = document.getElementById(options.inputId);
        const sendEl = document.getElementById(options.sendId);
        const actionEl = options.actionId ? document.getElementById(options.actionId) : null;
        const isWx = options.variant === 'wx';
        const messages = [];
        let waiting = false;
        let actionShown = false;

        if (!llmRoot || !legacyRoot || !messagesEl || !inputEl || !sendEl) {
            return false;
        }

        setDisplay(legacyRoot, 'none');
        setDisplay(llmRoot, isWx ? 'block' : 'block');

        (scenarioConfig.openingMessages || []).map(asOpeningMessage).forEach(function(message) {
            messages.push({ role: 'assistant', content: message.content });
            if (isWx) {
                appendWxMessage(messagesEl, 'assistant', message.content, message);
            } else {
                appendPlainMessage(messagesEl, 'assistant', message.content);
            }
        });

        function showAction() {
            if (actionShown) return;
            actionShown = true;

            if (isWx) {
                appendWxAction(messagesEl, scenarioConfig.nextActionLabel || 'https://westlake-fee.top/pay', options.onAction);
                return;
            }

            setDisplay(actionEl, 'block');
        }

        function setWaiting(value) {
            waiting = value;
            sendEl.disabled = value;
            inputEl.disabled = value;
            sendEl.textContent = value ? '等待中' : '发送';
        }

        function send() {
            const content = inputEl.value.trim();
            if (!content || waiting || actionShown) return;

            inputEl.value = '';
            messages.push({ role: 'user', content: content });
            if (isWx) {
                appendWxMessage(messagesEl, 'user', content);
            } else {
                appendPlainMessage(messagesEl, 'user', content);
            }

            setWaiting(true);
            const controller = new AbortController();
            const timeoutMs = (scenarioConfig.timeoutMs || 30000);
            const timer = setTimeout(function() { controller.abort(); }, timeoutMs);

            fetch(scenarioConfig.endpoint, {
                method: scenarioConfig.method || 'POST',
                headers: scenarioConfig.headers || { 'Content-Type': 'application/json' },
                body: JSON.stringify(makePayload(options.scenarioId, scenarioConfig, messages)),
                signal: controller.signal
            })
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('LLM API unavailable');
                    }
                    return response.json();
                })
                .then(normalizeReply)
                .then(function(result) {
                    messages.push({ role: 'assistant', content: result.reply });
                    if (isWx && result.nextAction) {
                        showAction();
                        return;
                    }

                    if (isWx) {
                        appendWxMessage(messagesEl, 'assistant', result.reply, {
                            actionLabel: scenarioConfig.nextActionLabel || 'https://westlake-fee.top/pay',
                            onAction: options.onAction
                        });
                    } else {
                        appendPlainMessage(messagesEl, 'assistant', result.reply);
                    }
                    if (result.nextAction) {
                        showAction();
                    }
                })
                .catch(function(err) {
                    if (window.console && console.error) {
                        console.error('LLM chat failed:', err);
                    }
                    const errMsg = err && err.name === 'AbortError'
                        ? '回复超时，请稍后再试'
                        : '网络异常，请稍后再试';
                    if (isWx) {
                        appendWxMessage(messagesEl, 'assistant', errMsg);
                    } else {
                        appendPlainMessage(messagesEl, 'assistant', errMsg);
                    }
                })
                .finally(function() {
                    clearTimeout(timer);
                    setWaiting(false);
                });
        }

        if (options.submitFunctionName) {
            const legacySubmit = window[options.submitFunctionName];
            window[options.submitFunctionName] = function() {
                if (llmRoot.style.display !== 'none') {
                    send();
                    return;
                }
                if (typeof legacySubmit === 'function') {
                    legacySubmit();
                }
            };
        } else {
            sendEl.addEventListener('click', send);
        }

        inputEl.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (options.submitFunctionName && typeof window[options.submitFunctionName] === 'function') {
                    window[options.submitFunctionName]();
                    return;
                }
                send();
            }
        });

        return true;
    }

    window.AntiFraudLLMChat = {
        setup: function(options) {
            return loadConfig()
                .then(function(config) {
                    const scenarioConfig = config[String(options.scenarioId)];
                    if (!scenarioConfig || !scenarioConfig.enabled || !scenarioConfig.endpoint) {
                        throw new Error('LLM disabled');
                    }
                    return initChat(options, scenarioConfig);
                })
                .catch(function() {
                    const llmRoot = document.getElementById(options.llmRootId);
                    const legacyRoot = document.getElementById(options.legacyRootId);
                    setDisplay(llmRoot, 'none');
                    setDisplay(legacyRoot, 'block');
                    return false;
                });
        }
    };
})();
