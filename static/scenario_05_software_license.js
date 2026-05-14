function setSoftwareLanguage(language) {
    const isEnglish = language === 'en';
    document.getElementById('software-lang-en').classList.toggle('lang-active', isEnglish);
    document.getElementById('software-lang-zh').classList.toggle('lang-active', !isEnglish);
    document.getElementById('software-login-title').textContent = isEnglish ? 'Identity and Access Management' : '统一身份认证平台';
    document.getElementById('software-tab-password').textContent = isEnglish ? 'Password' : '密码';
    document.getElementById('software-tab-sms').textContent = isEnglish ? 'SMS' : '短信';
    document.getElementById('software-tab-email').textContent = isEnglish ? 'Email' : '邮箱';
    document.getElementById('software-account').placeholder = isEnglish ? 'Please enter username/mobile/email' : '请输入用户名/手机号/邮箱';
    document.getElementById('software-password').placeholder = isEnglish ? 'Please enter password' : '请输入密码';
    document.getElementById('software-forgot-password').textContent = isEnglish ? 'Forgot password?' : '忘记密码?';
    document.getElementById('software-remember-label').textContent = isEnglish ? 'Remember the password' : '记住密码';
    document.getElementById('software-submit-btn').textContent = isEnglish ? 'Sign in now' : '立即登录';
    document.getElementById('software-account-error-text').textContent = isEnglish ? 'Please enter a valid username/mobile number/email.' : '请填写正确的用户名/手机号/邮箱。';
    document.getElementById('software-footer-text').innerHTML = isEnglish ? 'Contact ITS if you cannot access: 0571-85771167 (8:30-17:30) or<br><a href="#">itservices@westlake.edu.cn</a>' : '如无法登陆，请联系 ITS：0571-85771167（8:30-17:30）或<br><a href="#">itservices@westlake.edu.cn</a>';
}

function showSoftwareFieldError(fieldId, show) {
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    error.style.display = show ? 'flex' : 'none';
}

function isValidSoftwareAccount(value) {
    return /^\d{11}$/.test(value) || /^[A-Za-z][A-Za-z0-9]*@westlake\.edu\.cn$/.test(value);
}

document.addEventListener('DOMContentLoaded', function() {
    const accountInput = document.getElementById('software-account');
    if (accountInput) {
        accountInput.addEventListener('input', function() {
            if (isValidSoftwareAccount(this.value.trim())) {
                showSoftwareFieldError('software-account', false);
            }
        });
        setSoftwareLanguage('zh');
    }
});

function startSoftwareSimulation() {
    document.getElementById('software-notice-page').style.display = 'none';
    document.getElementById('software-email-page').style.display = 'block';
}

function goToSoftwarePortal() {
    document.getElementById('software-email-page').style.display = 'none';
    document.getElementById('software-portal-page').style.display = 'flex';
}

function goToSoftwareLogin() {
    document.getElementById('software-portal-page').style.display = 'none';
    document.getElementById('software-login-page').style.display = 'flex';
}

function handleSoftwareLogin(event) {
    event.preventDefault();

    const account = document.getElementById('software-account').value.trim();
    const password = document.getElementById('software-password').value;

    if (!isValidSoftwareAccount(account)) {
        showSoftwareFieldError('software-account', true);
        return;
    }

    showSoftwareFieldError('software-account', false);
    document.getElementById('software-login-page').style.display = 'none';
    document.getElementById('software-result-page').style.display = 'flex';

    setTimeout(() => {
        showSoftwareAlert();
    }, 3000);
}

function showSoftwareAlert() {
    document.getElementById('software-result-page').style.display = 'none';
    document.getElementById('software-alert-overlay').style.display = 'flex';
}

function goToSoftwareEducation() {
    window.location.href = 'page_scenario_education.html?scenario=5';
}
