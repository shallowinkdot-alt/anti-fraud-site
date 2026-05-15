var scenario12PasswordInput = '';
var scenario12PasswordAttempts = 0;

function startScenario12() {
    document.getElementById('scenario12-notice-page').style.display = 'none';
    document.getElementById('scenario12-shell').style.display = 'block';

    var video = document.getElementById('scenario12-video');
    if (video) {
        video.play().catch(function() {
            return null;
        });
    }
}

function openScenario12Browser() {
    document.getElementById('scenario12-bili-page').style.display = 'none';
    document.getElementById('scenario12-browser-page').style.display = 'block';
}

function backToScenario12Bili() {
    document.getElementById('scenario12-browser-page').style.display = 'none';
    document.getElementById('scenario12-bili-page').style.display = 'block';
}

function startScenario12Download() {
    var toast = document.getElementById('scenario12-download-toast');
    var fill = document.getElementById('scenario12-download-fill');
    var text = document.getElementById('scenario12-download-text');
    var complete = document.getElementById('scenario12-download-complete');
    var installBtn = document.getElementById('scenario12-install-btn');
    var downloadBtn = document.getElementById('scenario12-download-btn');

    toast.style.display = 'block';
    complete.style.display = 'none';
    installBtn.style.display = 'none';
    downloadBtn.disabled = true;
    downloadBtn.textContent = '正在下载...';

    var percent = 0;
    var timer = setInterval(function() {
        percent += Math.random() * 14 + 6;
        if (percent >= 100) {
            percent = 100;
            clearInterval(timer);
            fill.style.width = percent + '%';
            text.textContent = '下载完成 100%';
            complete.style.display = 'block';
            installBtn.style.display = 'block';
            downloadBtn.textContent = '重新下载 APK';
            downloadBtn.disabled = false;
            return;
        }

        fill.style.width = percent + '%';
        text.textContent = '下载中... ' + Math.floor(percent) + '%';
    }, 320);
}

function goToScenario12Fraud() {
    scenario12PasswordInput = '';
    scenario12PasswordAttempts = 0;
    document.getElementById('scenario12-bili-page').style.display = 'none';
    document.getElementById('scenario12-browser-page').style.display = 'none';
    document.getElementById('scenario12-malware-page').style.display = 'block';
    document.getElementById('scenario12-password-error').textContent = '';
    document.getElementById('scenario12-access-switch').checked = false;
    document.getElementById('scenario12-malware-alert-overlay').style.display = 'none';
    updatePasswordDots();
    showPage('scenario12-permission-page');
}

function showPage(pageId) {
    var pages = document.querySelectorAll('.scenario12-malware-view');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function openAccessibility() {
    showPage('scenario12-accessibility-page');
}

function toggleAccessibility() {
    var checkbox = document.getElementById('scenario12-access-switch');
    if (checkbox.checked) {
        setTimeout(function() {
            showPage('scenario12-password-page');
        }, 800);
    }
}

function inputPassword(num) {
    if (num === -1) {
        scenario12PasswordInput = '';
    } else if (scenario12PasswordInput.length < 6) {
        scenario12PasswordInput += num;
    }
    updatePasswordDots();

    if (scenario12PasswordInput.length === 6) {
        setTimeout(checkPassword, 300);
    }
}

function deletePassword() {
    if (scenario12PasswordInput.length > 0) {
        scenario12PasswordInput = scenario12PasswordInput.slice(0, -1);
        updatePasswordDots();
    }
}

function updatePasswordDots() {
    var dots = document.querySelectorAll('#scenario12-password-dots .scenario12-malware-password-dot');
    dots.forEach(function(dot, index) {
        if (index < scenario12PasswordInput.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function checkPassword() {
    scenario12PasswordAttempts += 1;
    var errorEl = document.getElementById('scenario12-password-error');

    if (scenario12PasswordAttempts === 1) {
        errorEl.textContent = '密码错误，请重新输入';
        errorEl.style.display = 'block';
        scenario12PasswordInput = '';
        updatePasswordDots();
    } else {
        showPage('scenario12-error-page');
    }
}

function uninstallApp() {
    document.getElementById('scenario12-malware-alert-overlay').style.display = 'flex';
}

function goToEducation() {
    window.location.href = 'page_scenario_education.html?scenario=12';
}

document.addEventListener('keydown', function(e) {
    var passwordPage = document.getElementById('scenario12-password-page');
    if (!passwordPage || !passwordPage.classList.contains('active')) {
        return;
    }

    if (/^\d$/.test(e.key)) {
        inputPassword(e.key);
        e.preventDefault();
        return;
    }

    if (e.key === 'Backspace') {
        deletePassword();
        e.preventDefault();
    }
});
