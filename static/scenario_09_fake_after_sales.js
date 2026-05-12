function showAfterSalesFieldError(fieldId, show) {
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    error.style.display = show ? 'flex' : 'none';
}

let afterSalesCaptchaValue = '';

function isValidAfterSalesBankCard(value) {
    return /^\d{16,19}$/.test(value);
}

function isValidAfterSalesPhone(value) {
    return /^\d{11}$/.test(value);
}

function isValidAfterSalesName(value) {
    return /^[A-Za-z\u4e00-\u9fa5·]+$/.test(value);
}

function isValidAfterSalesCode(value) {
    return /^[A-Za-z0-9]{4}$/.test(value);
}

function generateAfterSalesCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let value = '';
    for (let i = 0; i < 4; i += 1) {
        value += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return value;
}

function renderAfterSalesCaptcha() {
    afterSalesCaptchaValue = generateAfterSalesCaptcha();
    const canvas = document.getElementById('after-sales-captcha-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const palette = ['#0f172a', '#1d4ed8', '#7c2d12', '#065f46', '#6b21a8'];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bg.addColorStop(0, '#f8fafc');
    bg.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 40; i += 1) {
        ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)] + '22';
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.8 + 0.6, 0, Math.PI * 2);
        ctx.fill();
    }

    for (let i = 0; i < 3; i += 1) {
        ctx.strokeStyle = palette[Math.floor(Math.random() * palette.length)] + '55';
        ctx.lineWidth = Math.random() * 1.2 + 1;
        ctx.beginPath();
        ctx.moveTo(0, Math.random() * canvas.height);
        ctx.bezierCurveTo(canvas.width * 0.3, Math.random() * canvas.height, canvas.width * 0.7, Math.random() * canvas.height, canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }

    for (let i = 0; i < afterSalesCaptchaValue.length; i += 1) {
        const char = afterSalesCaptchaValue[i];
        const x = 20 + i * 28 + Math.random() * 4;
        const y = 30 + Math.random() * 8;
        const rotation = ((Math.random() * 36) - 18) * Math.PI / 180;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.font = (Math.floor(Math.random() * 6) + 24) + 'px Arial';
        ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
        ctx.fillText(char, 0, 0);
        ctx.restore();
    }

    for (let i = 0; i < 6; i += 1) {
        ctx.strokeStyle = palette[Math.floor(Math.random() * palette.length)] + '33';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }
}

function refreshAfterSalesCaptcha() {
    renderAfterSalesCaptcha();
    document.getElementById('after-sales-code').value = '';
    showAfterSalesFieldError('after-sales-code', false);
}

document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('after-sales-name');
    const bankCardInput = document.getElementById('after-sales-bank-card');
    const phoneInput = document.getElementById('after-sales-bank-phone');
    const codeInput = document.getElementById('after-sales-code');

    renderAfterSalesCaptcha();

    nameInput.addEventListener('input', function() {
        if (isValidAfterSalesName(this.value.trim())) {
            showAfterSalesFieldError('after-sales-name', false);
        }
    });

    bankCardInput.addEventListener('input', function() {
        if (isValidAfterSalesBankCard(this.value.trim())) {
            showAfterSalesFieldError('after-sales-bank-card', false);
        }
    });

    phoneInput.addEventListener('input', function() {
        if (isValidAfterSalesPhone(this.value.trim())) {
            showAfterSalesFieldError('after-sales-bank-phone', false);
        }
    });

    codeInput.addEventListener('input', function() {
        if (isValidAfterSalesCode(this.value.trim())) {
            showAfterSalesFieldError('after-sales-code', false);
        }
    });
});

function startAfterSalesSimulation() {
    document.getElementById('after-sales-notice-page').style.display = 'none';
    document.getElementById('after-sales-chat-page').style.display = 'block';
}

function goToAfterSalesPortal() {
    document.getElementById('after-sales-chat-page').style.display = 'none';
    document.getElementById('after-sales-portal-page').style.display = 'flex';
}

function goToAfterSalesLogin() {
    document.getElementById('after-sales-portal-page').style.display = 'none';
    document.getElementById('after-sales-login-page').style.display = 'flex';
}

function handleAfterSalesLogin(event) {
    event.preventDefault();
    const name = document.getElementById('after-sales-name').value.trim();
    const bankCard = document.getElementById('after-sales-bank-card').value.trim();
    const phone = document.getElementById('after-sales-bank-phone').value.trim();
    const code = document.getElementById('after-sales-code').value.trim();

    if (!isValidAfterSalesName(name)) {
        showAfterSalesFieldError('after-sales-name', true);
        return;
    }
    showAfterSalesFieldError('after-sales-name', false);

    if (!isValidAfterSalesBankCard(bankCard)) {
        showAfterSalesFieldError('after-sales-bank-card', true);
        return;
    }
    showAfterSalesFieldError('after-sales-bank-card', false);

    if (!isValidAfterSalesPhone(phone)) {
        showAfterSalesFieldError('after-sales-bank-phone', true);
        return;
    }
    showAfterSalesFieldError('after-sales-bank-phone', false);

    if (!isValidAfterSalesCode(code)) {
        showAfterSalesFieldError('after-sales-code', true);
        return;
    }

    if (code !== afterSalesCaptchaValue) {
        showAfterSalesFieldError('after-sales-code', true);
        return;
    }
    showAfterSalesFieldError('after-sales-code', false);

    console.log('场景九提交数据:', { name: name, bankCard: bankCard, phone: phone, code: code });
    document.getElementById('after-sales-login-page').style.display = 'none';
    document.getElementById('after-sales-result-page').style.display = 'flex';
    setTimeout(() => {
        showAfterSalesAlert();
    }, 3000);
}

function showAfterSalesAlert() {
    document.getElementById('after-sales-result-page').style.display = 'none';
    document.getElementById('after-sales-alert-overlay').style.display = 'flex';
}

function goToAfterSalesEducation() {
    window.location.href = 'page_scenario_education.html?scenario=9';
}
