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
    if (!accountInput) return;

    accountInput.addEventListener('input', function() {
        if (isValidSoftwareAccount(this.value.trim())) {
            showSoftwareFieldError('software-account', false);
        }
    });
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
    console.log('场景五登录数据:', { account: account, password: password });

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
    window.location.href = 'education.html?scenario=5';
}
