function startPatch11Scenario() {
    document.getElementById('patch11-notice-page').style.display = 'none';
    document.getElementById('patch11-site-page').style.display = 'block';
}

function scrollPatch11ToResources() {
    const resourceSection = document.getElementById('patch11-resource-section');
    if (resourceSection) {
        resourceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function openPatch11Installer(source) {
    document.getElementById('patch11-site-page').style.display = 'none';
    document.getElementById('patch11-installer-page').style.display = 'flex';
}

function beginPatch11Install() {
    const checkbox = document.getElementById('patch11-disable-defender');
    const error = document.getElementById('patch11-inline-error');

    if (!checkbox.checked) {
        error.style.display = 'flex';
        return;
    }

    error.style.display = 'none';
    document.getElementById('patch11-installer-page').style.display = 'none';
    document.getElementById('patch11-progress-page').style.display = 'flex';

    const fill = document.getElementById('patch11-progress-fill');
    const text = document.getElementById('patch11-progress-text');
    const log = document.getElementById('patch11-progress-log');
    const steps = [
        { progress: 18, message: '正在连接高速资源节点... 18%', log: '已连接第三方镜像节点，开始下载 KunPatchResourceDownloader 组件。' },
        { progress: 43, message: '正在释放补丁资源... 43%', log: '已解压补丁包，开始写入 runtime、patch 与兼容组件。' },
        { progress: 71, message: '正在配置白名单与启动项... 71%', log: '正在写入缓存目录，并尝试注册补丁快速启动服务。' },
        { progress: 100, message: '正在完成安装... 100%', log: '补丁资源写入完成，正在清理日志并准备启动游戏。' }
    ];

    let index = 0;

    function nextStep() {
        const step = steps[index];
        fill.style.width = step.progress + '%';
        text.textContent = step.message;

        const item = document.createElement('div');
        item.className = 'patch11-log-item';
        item.textContent = step.log;
        log.appendChild(item);

        index += 1;
        if (index < steps.length) {
            setTimeout(nextStep, 900);
        } else {
            setTimeout(showPatch11Success, 1000);
        }
    }

    nextStep();
}

function showPatch11Success() {
    document.getElementById('patch11-progress-page').style.display = 'none';
    document.getElementById('patch11-success-page').style.display = 'flex';

    setTimeout(function() {
        document.getElementById('patch11-success-page').style.display = 'none';
        document.getElementById('patch11-alert-overlay').style.display = 'flex';
    }, 2600);
}

function goToPatch11Education() {
    window.location.href = 'page_scenario_education.html?scenario=11';
}
