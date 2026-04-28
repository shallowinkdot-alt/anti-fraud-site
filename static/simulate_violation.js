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
    if (!accountInput) return;

    accountInput.addEventListener('input', function() {
        if (isValidViolationAccount(this.value.trim())) {
            showViolationFieldError('violation-account', false);
        }
    });
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
    window.location.href = 'education.html?scenario=7';
}
