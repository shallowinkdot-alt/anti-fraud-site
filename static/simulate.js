// 模拟页面逻辑
let currentScenario = 1;

function showScenario1FieldError(fieldId, show) {
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    error.style.display = show ? 'flex' : 'none';
}

function isValidCampusAccount(value) {
    return /^\d{11}$/.test(value) || /^[A-Za-z][A-Za-z0-9]*@westlake\.edu\.cn$/.test(value);
}

// 场景选择（根据URL参数）
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const scenario = urlParams.get('scenario');
    const scenario1AccountInput = document.getElementById('email');

    if (scenario1AccountInput) {
        scenario1AccountInput.addEventListener('input', function() {
            if (isValidCampusAccount(this.value.trim())) {
                showScenario1FieldError('scenario1-account', false);
            }
        });
    }
    
    if (scenario == 1) {
        currentScenario = 1;
        selectScenario(1);
    } else if (scenario == 2) {
        currentScenario = 2;
        selectScenario(2);
    }
});

function selectScenario(scenario) {
    currentScenario = scenario;
    document.getElementById('scenario-select').style.display = 'none';
    if (scenario === 1) {
        document.getElementById('notice-page').style.display = 'flex';
    } else if (scenario === 2) {
        document.getElementById('sms-page').style.display = 'block';
    } else if (scenario === 3) {
        window.location.href = 'simulate_game.html';
    } else if (scenario === 4) {
        window.location.href = 'simulate_credit.html';
    } else if (scenario === 5) {
        window.location.href = 'simulate_software.html';
    } else if (scenario === 6) {
        window.location.href = 'simulate_finance.html';
    } else if (scenario === 7) {
        window.location.href = 'simulate_violation.html';
    }
}

// ===== 场景一：免费Token诈骗 =====

function startSimulation() {
    document.getElementById('notice-page').style.display = 'none';
    document.getElementById('email-page').style.display = 'block';
}

function goToPhishingPage() {
    document.getElementById('email-page').style.display = 'none';
    document.getElementById('phishing-page').style.display = 'flex';
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!isValidCampusAccount(email)) {
        showScenario1FieldError('scenario1-account', true);
        return;
    }

    showScenario1FieldError('scenario1-account', false);
    console.log('场景一登录数据:', { email: email, password: password });
    document.getElementById('phishing-page').style.display = 'none';
    document.getElementById('success-page').style.display = 'flex';
    document.getElementById('alert-message').textContent = '回顾一下刚才发生了什么——你填写了"校园邮箱"和"密码"，然后点击了"登录并领取"。';
    setTimeout(() => {
        showAlert();
    }, 3000);
}

// ===== 场景二：快递理赔诈骗 =====

function goToFakeExpressPage() {
    document.getElementById('sms-page').style.display = 'none';
    document.getElementById('express-login-page').style.display = 'block';
}

function handleExpressLogin(event) {
    event.preventDefault();
    const phone = document.getElementById('express-phone').value;
    const password = document.getElementById('express-password').value;
    console.log('场景二登录数据:', { phone: phone, password: password });
    document.getElementById('express-login-page').style.display = 'none';
    document.getElementById('express-claim-page').style.display = 'block';
}

function handleClaimSubmit(event) {
    event.preventDefault();
    const bank = document.getElementById('bank-card').value;
    const name = document.getElementById('bank-name').value;
    const phone = document.getElementById('claim-phone').value;
    console.log('理赔信息:', { bank: bank, name: name, phone: phone });
    document.getElementById('express-claim-page').style.display = 'none';
    document.getElementById('express-success-page').style.display = 'block';
    document.getElementById('alert-message').textContent = '回顾一下刚才发生了什么——你收到了"快递损坏"的通知，点击链接填写了淘宝账号密码，然后又填写了银行卡信息。';
    setTimeout(() => {
        showAlert();
    }, 3000);
}

// ===== 通用 =====

function showAlert() {
    document.getElementById('success-page').style.display = 'none';
    document.getElementById('express-success-page').style.display = 'none';
    document.getElementById('alert-overlay').style.display = 'flex';
}

function goToEducation() {
    window.location.href = 'education.html?scenario=' + currentScenario;
}
