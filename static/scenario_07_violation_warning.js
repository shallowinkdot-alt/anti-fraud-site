function setViolationLanguage(language) {
    const isEnglish = language === 'en';
    document.getElementById('violation-lang-en').classList.toggle('lang-active', isEnglish);
    document.getElementById('violation-lang-zh').classList.toggle('lang-active', !isEnglish);
    document.getElementById('violation-login-title').textContent = isEnglish ? 'Identity and Access Management' : '统一身份认证平台';
    document.getElementById('violation-tab-password').textContent = isEnglish ? 'Password' : '密码';
    document.getElementById('violation-tab-sms').textContent = isEnglish ? 'SMS' : '短信';
    document.getElementById('violation-tab-email').textContent = isEnglish ? 'Email' : '邮箱';
    document.getElementById('violation-account').placeholder = isEnglish ? 'Please enter username/mobile/email' : '请输入用户名/手机号/邮箱';
    document.getElementById('violation-password').placeholder = isEnglish ? 'Please enter password' : '请输入密码';
    document.getElementById('violation-forgot-password').textContent = isEnglish ? 'Forgot password?' : '忘记密码?';
    document.getElementById('violation-remember-label').textContent = isEnglish ? 'Remember the password' : '记住密码';
    document.getElementById('violation-submit-btn').textContent = isEnglish ? 'Sign in now' : '立即登录';
    document.getElementById('violation-account-error-text').textContent = isEnglish ? 'Please enter a valid username/mobile number/email.' : '请填写正确的用户名/手机号/邮箱。';
    document.getElementById('violation-footer-text').innerHTML = isEnglish ? 'Contact ITS if you cannot access: 0571-85771167 (8:30-17:30) or<br><a href="#">itservices@westlake.edu.cn</a>' : '如无法登陆，请联系 ITS：0571-85771167（8:30-17:30）或<br><a href="#">itservices@westlake.edu.cn</a>';
}

function showViolationFieldError(fieldId, show) {
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    error.style.display = show ? 'flex' : 'none';
}

function isValidViolationAccount(value) {
    return /^\d{11}$/.test(value) || /^[A-Za-z][A-Za-z0-9]*@westlake\.edu\.cn$/.test(value);
}

document.addEventListener('DOMContentLoaded', function() {
    const accountInput = document.getElementById('violation-account');
    if (accountInput) {
        accountInput.addEventListener('input', function() {
            if (isValidViolationAccount(this.value.trim())) {
                showViolationFieldError('violation-account', false);
            }
        });
        setViolationLanguage('zh');
    }
});

function startViolationSimulation() {
    document.getElementById('violation-notice-page').style.display = 'none';
    document.getElementById('violation-email-page').style.display = 'block';
}

function goToViolationPortal() {
    document.getElementById('violation-email-page').style.display = 'none';
    document.getElementById('violation-portal-page').style.display = 'flex';
}

function goToViolationLogin() {
    document.getElementById('violation-portal-page').style.display = 'none';
    document.getElementById('violation-login-page').style.display = 'flex';
}

function handleViolationLogin(event) {
    event.preventDefault();

    const account = document.getElementById('violation-account').value.trim();
    const password = document.getElementById('violation-password').value;

    if (!isValidViolationAccount(account)) {
        showViolationFieldError('violation-account', true);
        return;
    }

    showViolationFieldError('violation-account', false);
    console.log('场景七登录数据:', { account: account, password: password });

    document.getElementById('violation-login-page').style.display = 'none';
    document.getElementById('violation-result-page').style.display = 'flex';

    setTimeout(() => {
        showViolationAlert();
    }, 3000);
}

function showViolationAlert() {
    document.getElementById('violation-result-page').style.display = 'none';
    document.getElementById('violation-alert-overlay').style.display = 'flex';
}

function goToViolationEducation() {
    window.location.href = 'page_scenario_education.html?scenario=7';
}
