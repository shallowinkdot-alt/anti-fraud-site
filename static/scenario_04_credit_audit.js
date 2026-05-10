function setCreditLanguage(language) {
    const isEnglish = language === 'en';
    document.getElementById('credit-lang-en').classList.toggle('lang-active', isEnglish);
    document.getElementById('credit-lang-zh').classList.toggle('lang-active', !isEnglish);
    document.getElementById('credit-login-title').textContent = isEnglish ? 'Identity and Access Management' : '统一身份认证平台';
    document.getElementById('credit-tab-password').textContent = isEnglish ? 'Password' : '密码';
    document.getElementById('credit-tab-sms').textContent = isEnglish ? 'SMS' : '短信';
    document.getElementById('credit-tab-email').textContent = isEnglish ? 'Email' : '邮箱';
    document.getElementById('credit-account').placeholder = isEnglish ? 'Please enter username/mobile/email' : '请输入学号/手机号/邮箱';
    document.getElementById('credit-password').placeholder = isEnglish ? 'Please enter password' : '请输入密码';
    document.getElementById('credit-forgot-password').textContent = isEnglish ? 'Forgot password?' : '忘记密码?';
    document.getElementById('credit-remember-label').textContent = isEnglish ? 'Remember the password' : '记住密码';
    document.getElementById('credit-submit-btn').textContent = isEnglish ? 'Sign in now' : '立即登录';
    document.getElementById('credit-account-error-text').textContent = isEnglish ? 'Please enter a valid username/mobile number/email.' : '请填写正确的用户名/手机号/邮箱。';
    document.getElementById('credit-footer-text').innerHTML = isEnglish ? 'Contact ITS if you cannot access: 0571-85771167 (8:30-17:30) or<br><a href="#">itservices@westlake.edu.cn</a>' : '如无法登陆，请联系 ITS：0571-85771167（8:30-17:30）或<br><a href="#">itservices@westlake.edu.cn</a>';
}

function showCreditFieldError(fieldId, show) {
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    error.style.display = show ? 'flex' : 'none';
}

function isValidCreditAccount(value) {
    return /^\d{11}$/.test(value) || /^[A-Za-z][A-Za-z0-9]*@westlake\.edu\.cn$/.test(value);
}

document.addEventListener('DOMContentLoaded', function() {
    const accountInput = document.getElementById('credit-account');
    if (accountInput) {
        accountInput.addEventListener('input', function() {
            if (isValidCreditAccount(this.value.trim())) {
                showCreditFieldError('credit-account', false);
            }
        });
        setCreditLanguage('zh');
    }
});

function startCreditSimulation() {
    document.getElementById('credit-notice-page').style.display = 'none';
    document.getElementById('credit-email-page').style.display = 'block';
}

function goToCreditPhishingPage() {
    document.getElementById('credit-email-page').style.display = 'none';
    document.getElementById('credit-phishing-page').style.display = 'flex';
}

function handleCreditLogin(event) {
    event.preventDefault();

    const account = document.getElementById('credit-account').value.trim();
    const password = document.getElementById('credit-password').value;

    if (!isValidCreditAccount(account)) {
        showCreditFieldError('credit-account', true);
        return;
    }

    showCreditFieldError('credit-account', false);
    console.log('场景四登录数据:', { account: account, password: password });

    document.getElementById('credit-phishing-page').style.display = 'none';
    document.getElementById('credit-result-page').style.display = 'flex';

    setTimeout(() => {
        showCreditAlert();
    }, 3000);
}

function showCreditAlert() {
    document.getElementById('credit-result-page').style.display = 'none';
    document.getElementById('credit-alert-overlay').style.display = 'flex';
}

function goToCreditEducation() {
    window.location.href = 'page_scenario_education.html?scenario=4';
}
