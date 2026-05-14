let loanLanguage = 'zh';

function setLoanLanguage(language) {
    loanLanguage = language;

    const isEnglish = language === 'en';
    document.getElementById('loan-lang-en').classList.toggle('lang-active', isEnglish);
    document.getElementById('loan-lang-zh').classList.toggle('lang-active', !isEnglish);

    document.getElementById('loan-login-title').textContent = isEnglish ? 'Identity and Access Management' : '统一身份认证平台';
    document.getElementById('loan-tab-password').textContent = isEnglish ? 'Password' : '密码';
    document.getElementById('loan-tab-sms').textContent = isEnglish ? 'SMS' : '短信';
    document.getElementById('loan-tab-email').textContent = isEnglish ? 'Email' : '邮箱';
    document.getElementById('loan-account').placeholder = isEnglish ? 'Please enter username/mobile/email' : '请输入用户名/手机号/邮箱';
    document.getElementById('loan-password').placeholder = isEnglish ? 'Please enter password' : '请输入密码';
    document.getElementById('loan-forgot-password').textContent = isEnglish ? 'Forgot password?' : '忘记密码?';
    document.getElementById('loan-remember-label').textContent = isEnglish ? 'Remember the password' : '记住密码';
    document.getElementById('loan-submit-btn').textContent = isEnglish ? 'Sign in now' : '立即登录';
    document.getElementById('loan-account-error-text').textContent = isEnglish
        ? 'Please enter a valid username/mobile number/email.'
        : '请填写正确的用户名/手机号/邮箱。';
    document.getElementById('loan-footer-text').innerHTML = isEnglish
        ? 'Contact ITS if you cannot access: 0571-85771167 (8:30-17:30) or<br><a href="#">itservices@westlake.edu.cn</a>'
        : '如无法登陆，请联系 ITS：0571-85771167（8:30-17:30）或<br><a href="#">itservices@westlake.edu.cn</a>';
}

function showLoanFieldError(fieldId, show) {
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    error.style.display = show ? 'flex' : 'none';
}

function isValidLoanAccount(value) {
    return /^\d{11}$/.test(value) || /^[A-Za-z][A-Za-z0-9]*@westlake\.edu\.cn$/.test(value);
}

document.addEventListener('DOMContentLoaded', function() {
    const accountInput = document.getElementById('loan-account');
    if (accountInput) {
        accountInput.addEventListener('input', function() {
            if (isValidLoanAccount(this.value.trim())) {
                showLoanFieldError('loan-account', false);
            }
        });
    }

    setLoanLanguage('zh');
});

function startLoanSimulation() {
    document.getElementById('loan-notice-page').style.display = 'none';
    document.getElementById('loan-chat-page').style.display = 'block';
}

function goToLoanPortal() {
    document.getElementById('loan-chat-page').style.display = 'none';
    document.getElementById('loan-portal-page').style.display = 'flex';
}

function goToLoanLogin() {
    document.getElementById('loan-portal-page').style.display = 'none';
    document.getElementById('loan-login-page').style.display = 'flex';
}

function handleLoanLogin(event) {
    event.preventDefault();
    const account = document.getElementById('loan-account').value.trim();
    const password = document.getElementById('loan-password').value;
    if (!isValidLoanAccount(account)) {
        showLoanFieldError('loan-account', true);
        return;
    }
    showLoanFieldError('loan-account', false);
    document.getElementById('loan-login-page').style.display = 'none';
    document.getElementById('loan-result-page').style.display = 'flex';
    setTimeout(() => {
        showLoanAlert();
    }, 3000);
}

function showLoanAlert() {
    document.getElementById('loan-result-page').style.display = 'none';
    document.getElementById('loan-alert-overlay').style.display = 'flex';
}

function goToLoanEducation() {
    window.location.href = 'page_scenario_education.html?scenario=8';
}
