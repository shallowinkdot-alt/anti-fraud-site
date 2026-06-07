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

function formatChineseDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}

function formatDateStamp(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
}

function setScenario4DynamicDates() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = hours >= 12 ? `下午 ${hours > 12 ? hours - 12 : hours}:${minutes}` : `上午 ${hours === 0 ? 12 : hours}:${minutes}`;

    // 邮件日期 - 今天
    document.getElementById('s4-email-date').textContent = `${formatChineseDate(now)} ${timeStr}`;

    // 复核回执编号 - 包含今日日期
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    document.getElementById('s4-receipt-no').textContent = `CR-${formatDateStamp(now)}-${randomNum}`;
}

function startCreditSimulation() {
    setScenario4DynamicDates();
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
