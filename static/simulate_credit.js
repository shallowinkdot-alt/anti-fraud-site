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
    if (!accountInput) return;

    accountInput.addEventListener('input', function() {
        if (isValidCreditAccount(this.value.trim())) {
            showCreditFieldError('credit-account', false);
        }
    });
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
    window.location.href = 'education.html?scenario=4';
}
