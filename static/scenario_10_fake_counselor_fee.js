let counselorPasswordInput = '';

function showCounselorFieldError(fieldId, show) {
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    error.style.display = show ? 'flex' : 'none';
}

function isValidCounselorName(value) {
    return /^[A-Za-z\u4e00-\u9fa5·]+$/.test(value);
}

function isValidCounselorPhone(value) {
    return /^\d{11}$/.test(value);
}

function isValidCounselorStudentId(value) {
    return /^\d{11}$/.test(value);
}

function isValidCounselorBankCard(value) {
    return /^\d{16,19}$/.test(value);
}

function startCounselorSimulation() {
    document.getElementById('counselor-notice-page').style.display = 'none';
    document.getElementById('counselor-chat-page').style.display = 'block';
}

function goBackCounselor(pageId) {
    const pages = [
        'counselor-chat-page',
        'counselor-fee-page',
        'counselor-transfer-page',
        'counselor-password-page',
        'counselor-transfer-success-page'
    ];
    pages.forEach(function(id) {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

function goToFeePage() {
    goBackCounselor('counselor-fee-page');
}

function handleCounselorFeeSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('fee-name').value.trim();
    const id = document.getElementById('fee-id').value.trim();
    const phone = document.getElementById('fee-phone').value.trim();

    if (!isValidCounselorName(name)) {
        showCounselorFieldError('fee-name', true);
        return;
    }
    showCounselorFieldError('fee-name', false);

    if (!isValidCounselorStudentId(id)) {
        showCounselorFieldError('fee-id', true);
        return;
    }
    showCounselorFieldError('fee-id', false);

    if (!isValidCounselorPhone(phone)) {
        showCounselorFieldError('fee-phone', true);
        return;
    }
    showCounselorFieldError('fee-phone', false);

    console.log('场景十缴费信息:', { name: name, id: id, phone: phone });
    goBackCounselor('counselor-transfer-page');
}

function confirmCounselorTransfer() {
    const bankCard = document.getElementById('transfer-bank-card').value.trim();
    if (!isValidCounselorBankCard(bankCard)) {
        showCounselorFieldError('transfer-bank-card', true);
        return;
    }
    showCounselorFieldError('transfer-bank-card', false);
    goBackCounselor('counselor-password-page');
    counselorPasswordInput = '';
    updateCounselorPwdDots();
}

function updateCounselorPwdDots() {
    const dots = document.querySelectorAll('#counselor-password-page .wx-pwd-dot');
    dots.forEach(function(dot, index) {
        if (index < counselorPasswordInput.length) {
            dot.classList.add('wx-pwd-dot-filled');
        } else {
            dot.classList.remove('wx-pwd-dot-filled');
        }
    });
}

function completeCounselorTransfer() {
    if (document.getElementById('counselor-transfer-success-page').style.display === 'block') {
        return;
    }
    const now = new Date();
    const timeStr = '今天 ' + now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    document.getElementById('transfer-time').textContent = timeStr;
    goBackCounselor('counselor-transfer-success-page');
    setTimeout(showCounselorAlert, 3000);
}

function sendCounselorMessage() {
    const input = document.getElementById('qq-input');
    const message = input.value.trim();
    if (!message) return;

    const chatList = document.querySelector('.wx-chat-list');
    const divider = document.createElement('div');
    divider.className = 'wx-time-divider';
    divider.textContent = '刚刚';

    const newMessage = document.createElement('div');
    newMessage.className = 'wx-msg-row wx-msg-right';
    newMessage.innerHTML = '<div class="wx-msg-body"><div class="wx-sender-name">我</div><div class="wx-bubble wx-bubble-self">' + message + '</div></div><img src="static/images/avatar-me.png" alt="" class="wx-avatar">';

    chatList.appendChild(divider);
    chatList.appendChild(newMessage);
    input.value = '';
    chatList.scrollTop = chatList.scrollHeight;
}

function setCounselorFeeDeadline() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const deadlineStr = tomorrow.getFullYear() + '年' + (tomorrow.getMonth() + 1) + '月' + tomorrow.getDate() + '日 18:00';
    document.getElementById('fee-deadline').textContent = deadlineStr;
}

function showCounselorAlert() {
    document.getElementById('counselor-transfer-success-page').style.display = 'none';
    document.getElementById('counselor-alert-overlay').style.display = 'flex';
}

function goToCounselorEducation() {
    window.location.href = 'page_scenario_education.html?scenario=10';
}

document.addEventListener('DOMContentLoaded', function() {
    setCounselorFeeDeadline();

    const feeNameInput = document.getElementById('fee-name');
    const feeIdInput = document.getElementById('fee-id');
    const feePhoneInput = document.getElementById('fee-phone');
    const transferBankCardInput = document.getElementById('transfer-bank-card');

    if (feeNameInput) {
        feeNameInput.addEventListener('input', function() {
            if (isValidCounselorName(this.value.trim())) {
                showCounselorFieldError('fee-name', false);
            }
        });
    }

    if (feeIdInput) {
        feeIdInput.addEventListener('input', function() {
            if (isValidCounselorStudentId(this.value.trim())) {
                showCounselorFieldError('fee-id', false);
            }
        });
    }

    if (feePhoneInput) {
        feePhoneInput.addEventListener('input', function() {
            if (isValidCounselorPhone(this.value.trim())) {
                showCounselorFieldError('fee-phone', false);
            }
        });
    }

    if (transferBankCardInput) {
        transferBankCardInput.addEventListener('input', function() {
            if (isValidCounselorBankCard(this.value.trim())) {
                showCounselorFieldError('transfer-bank-card', false);
            }
        });
    }

    document.addEventListener('click', function(e) {
        const keyEl = e.target.closest('#counselor-password-page .wx-key');
        if (!keyEl) return;

        if (keyEl.dataset.action === 'del') {
            if (counselorPasswordInput.length > 0) {
                counselorPasswordInput = counselorPasswordInput.slice(0, -1);
                updateCounselorPwdDots();
            }
        } else if (keyEl.dataset.val !== undefined && counselorPasswordInput.length < 6) {
            counselorPasswordInput += keyEl.dataset.val;
            updateCounselorPwdDots();

            if (counselorPasswordInput.length === 6) {
                setTimeout(completeCounselorTransfer, 500);
            }
        }
    });

    document.addEventListener('keydown', function(e) {
        const passwordPage = document.getElementById('counselor-password-page');
        if (!passwordPage || passwordPage.style.display !== 'block') {
            return;
        }

        if (/^\d$/.test(e.key) && counselorPasswordInput.length < 6) {
            counselorPasswordInput += e.key;
            updateCounselorPwdDots();

            if (counselorPasswordInput.length === 6) {
                setTimeout(completeCounselorTransfer, 500);
            }

            e.preventDefault();
            return;
        }

        if (e.key === 'Backspace' && counselorPasswordInput.length > 0) {
            counselorPasswordInput = counselorPasswordInput.slice(0, -1);
            updateCounselorPwdDots();
            e.preventDefault();
        }
    });
});
