function setScenario1Language(language) {
    const isEnglish = language === 'en';
    document.getElementById('scenario1-lang-en').classList.toggle('lang-active', isEnglish);
    document.getElementById('scenario1-lang-zh').classList.toggle('lang-active', !isEnglish);
    document.getElementById('scenario1-login-title').textContent = isEnglish ? 'Identity and Access Management' : '统一身份认证平台';
    document.getElementById('scenario1-tab-password').textContent = isEnglish ? 'Password' : '密码';
    document.getElementById('scenario1-tab-sms').textContent = isEnglish ? 'SMS' : '短信';
    document.getElementById('scenario1-tab-email').textContent = isEnglish ? 'Email' : '邮箱';
    document.getElementById('email').placeholder = isEnglish ? 'Please enter username/mobile/email' : '请输入用户名/手机号/邮箱';
    document.getElementById('password').placeholder = isEnglish ? 'Please enter password' : '请输入密码';
    document.getElementById('scenario1-forgot-password').textContent = isEnglish ? 'Forgot password?' : '忘记密码?';
    document.getElementById('scenario1-remember-label').textContent = isEnglish ? 'Remember the password' : '记住密码';
    document.getElementById('scenario1-submit-btn').textContent = isEnglish ? 'Sign in now' : '立即登录';
    document.getElementById('scenario1-account-error-text').textContent = isEnglish ? 'Please enter a valid username/mobile number/email.' : '请填写正确的用户名/手机号/邮箱。';
    document.getElementById('scenario1-footer-text').innerHTML = isEnglish ? 'Contact ITS if you cannot access: 0571-85771167 (8:30-17:30) or<br><a href="#">itservices@westlake.edu.cn</a>' : '如无法登陆，请联系 ITS：0571-85771167（8:30-17:30）或<br><a href="#">itservices@westlake.edu.cn</a>';
}

function showScenario1FieldError(fieldId, show) {
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    error.style.display = show ? 'flex' : 'none';
}

function isValidCampusAccount(value) {
    return /^\d{11}$/.test(value) || /^[A-Za-z][A-Za-z0-9]*@westlake\.edu\.cn$/.test(value);
}

document.addEventListener('DOMContentLoaded', function() {
    const scenario1AccountInput = document.getElementById('email');
    if (scenario1AccountInput) {
        scenario1AccountInput.addEventListener('input', function() {
            if (isValidCampusAccount(this.value.trim())) {
                showScenario1FieldError('scenario1-account', false);
            }
        });
        setScenario1Language('zh');
    }
});

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
    setTimeout(() => {
        showAlert();
    }, 3000);
}

function showAlert() {
    document.getElementById('success-page').style.display = 'none';
    document.getElementById('alert-overlay').style.display = 'flex';
}

function goToEducation() {
    window.location.href = 'page_scenario_education.html?scenario=1';
}
