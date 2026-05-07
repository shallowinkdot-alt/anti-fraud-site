let financeCodeRequested = false;
let financeCaptchaValue = '';

function showFinanceFieldError(fieldId, show) {
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    error.style.display = show ? 'flex' : 'none';
}

function isValidFinanceBankCard(value) {
    return /^\d{16,19}$/.test(value);
}

function isValidFinancePhone(value) {
    return /^\d{11}$/.test(value);
}

function isValidFinanceCode(value) {
    return /^[A-Za-z0-9]{4}$/.test(value);
}

function generateFinanceCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let value = '';
    for (let i = 0; i < 4; i += 1) {
        value += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return value;
}

function renderFinanceCaptcha() {
    financeCaptchaValue = generateFinanceCaptcha();
    const captchaDisplay = document.getElementById('finance-captcha-display');
    const canvas = document.getElementById('finance-captcha-canvas');
    if (!captchaDisplay || !canvas) return;

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
        ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 1.8 + 0.6,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    for (let i = 0; i < 3; i += 1) {
        ctx.strokeStyle = palette[Math.floor(Math.random() * palette.length)] + '55';
        ctx.lineWidth = Math.random() * 1.2 + 1;
        ctx.beginPath();
        ctx.moveTo(0, Math.random() * canvas.height);
        ctx.bezierCurveTo(
            canvas.width * 0.3, Math.random() * canvas.height,
            canvas.width * 0.7, Math.random() * canvas.height,
            canvas.width, Math.random() * canvas.height
        );
        ctx.stroke();
    }

    for (let i = 0; i < financeCaptchaValue.length; i += 1) {
        const char = financeCaptchaValue[i];
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

function refreshFinanceCaptcha() {
    renderFinanceCaptcha();
    document.getElementById('finance-code').value = '';
    showFinanceFieldError('finance-code', false);
}

document.addEventListener('DOMContentLoaded', function() {
    const bankCardInput = document.getElementById('finance-bank-card');
    const phoneInput = document.getElementById('finance-bank-phone');
    const codeInput = document.getElementById('finance-code');

    renderFinanceCaptcha();

    bankCardInput.addEventListener('input', function() {
        if (isValidFinanceBankCard(this.value.trim())) {
            showFinanceFieldError('finance-bank-card', false);
        }
    });

    phoneInput.addEventListener('input', function() {
        if (isValidFinancePhone(this.value.trim())) {
            showFinanceFieldError('finance-bank-phone', false);
        }
    });

    codeInput.addEventListener('input', function() {
        if (isValidFinanceCode(this.value.trim())) {
            showFinanceFieldError('finance-code', false);
        }
    });
});

function startFinanceSimulation() {
    document.getElementById('finance-notice-page').style.display = 'none';
    document.getElementById('finance-email-page').style.display = 'block';
}

function goToFinancePortal() {
    document.getElementById('finance-email-page').style.display = 'none';
    document.getElementById('finance-portal-page').style.display = 'flex';
}

function showFakeCodeSent() {
    refreshFinanceCaptcha();
}

function handleFinanceSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('finance-name').value.trim();
    const bankCard = document.getElementById('finance-bank-card').value.trim();
    const phone = document.getElementById('finance-bank-phone').value.trim();
    const code = document.getElementById('finance-code').value.trim();

    if (!isValidFinanceBankCard(bankCard)) {
        showFinanceFieldError('finance-bank-card', true);
        return;
    }
    showFinanceFieldError('finance-bank-card', false);

    if (!isValidFinancePhone(phone)) {
        showFinanceFieldError('finance-bank-phone', true);
        return;
    }
    showFinanceFieldError('finance-bank-phone', false);

    if (!isValidFinanceCode(code)) {
        showFinanceFieldError('finance-code', true);
        return;
    }

    if (code !== financeCaptchaValue) {
        showFinanceFieldError('finance-code', true);
        return;
    }

    showFinanceFieldError('finance-code', false);

    console.log('场景六提交数据:', { name: name, bankCard: bankCard, phone: phone, code: code });

    document.getElementById('finance-portal-page').style.display = 'none';
    document.getElementById('finance-result-page').style.display = 'flex';

    setTimeout(() => {
        showFinanceAlert();
    }, 3000);
}

function showFinanceAlert() {
    document.getElementById('finance-result-page').style.display = 'none';
    document.getElementById('finance-alert-overlay').style.display = 'flex';
}

function goToFinanceEducation() {
    window.location.href = 'education.html?scenario=6';
}
