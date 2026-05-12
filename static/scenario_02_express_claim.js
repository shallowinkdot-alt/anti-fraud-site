function showScenario2FieldError(fieldId, show) {
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    error.style.display = show ? 'flex' : 'none';
}

function isValidMobilePhone(value) {
    return /^\d{11}$/.test(value);
}

function isValidBankCard(value) {
    return /^\d{16,19}$/.test(value);
}

function isValidPersonName(value) {
    return /^[A-Za-z\u4e00-\u9fa5·]+$/.test(value);
}

document.addEventListener('DOMContentLoaded', function() {
    const expressPhoneInput = document.getElementById('express-phone');
    if (expressPhoneInput) {
        expressPhoneInput.addEventListener('input', function() {
            if (isValidMobilePhone(this.value.trim())) {
                showScenario2FieldError('express-phone', false);
            }
        });
    }

    const bankCardInput = document.getElementById('bank-card');
    if (bankCardInput) {
        bankCardInput.addEventListener('input', function() {
            if (isValidBankCard(this.value.trim())) {
                showScenario2FieldError('bank-card', false);
            }
        });
    }

    const bankNameInput = document.getElementById('bank-name');
    if (bankNameInput) {
        bankNameInput.addEventListener('input', function() {
            if (isValidPersonName(this.value.trim())) {
                showScenario2FieldError('bank-name', false);
            }
        });
    }

    const claimPhoneInput = document.getElementById('claim-phone');
    if (claimPhoneInput) {
        claimPhoneInput.addEventListener('input', function() {
            if (isValidMobilePhone(this.value.trim())) {
                showScenario2FieldError('claim-phone', false);
            }
        });
    }
});

function goToFakeExpressPage() {
    document.getElementById('sms-page').style.display = 'none';
    document.getElementById('express-login-page').style.display = 'block';
}

function handleExpressLogin(event) {
    event.preventDefault();
    const phone = document.getElementById('express-phone').value.trim();
    const password = document.getElementById('express-password').value;
    if (!isValidMobilePhone(phone)) {
        showScenario2FieldError('express-phone', true);
        return;
    }
    showScenario2FieldError('express-phone', false);
    console.log('场景二登录数据:', { phone: phone, password: password });
    document.getElementById('express-login-page').style.display = 'none';
    document.getElementById('express-claim-page').style.display = 'block';
}

function handleClaimSubmit(event) {
    event.preventDefault();
    const bank = document.getElementById('bank-card').value.trim();
    const name = document.getElementById('bank-name').value.trim();
    const phone = document.getElementById('claim-phone').value.trim();
    if (!isValidPersonName(name)) {
        showScenario2FieldError('bank-name', true);
        return;
    }
    showScenario2FieldError('bank-name', false);
    if (!isValidBankCard(bank)) {
        showScenario2FieldError('bank-card', true);
        return;
    }
    showScenario2FieldError('bank-card', false);
    if (!isValidMobilePhone(phone)) {
        showScenario2FieldError('claim-phone', true);
        return;
    }
    showScenario2FieldError('claim-phone', false);
    console.log('理赔信息:', { bank: bank, name: name, phone: phone });
    document.getElementById('express-claim-page').style.display = 'none';
    document.getElementById('express-success-page').style.display = 'block';
    setTimeout(() => {
        showAlert();
    }, 3000);
}

function showAlert() {
    document.getElementById('express-success-page').style.display = 'none';
    document.getElementById('alert-overlay').style.display = 'flex';
}

function goToEducation() {
    window.location.href = 'page_scenario_education.html?scenario=2';
}
