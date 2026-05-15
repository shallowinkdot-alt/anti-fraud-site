// 场景三：游戏账号交易诈骗模拟逻辑

let currentGamePurchaseMode = 'default';
let hasGameTradeEntryBeenSent = false;
let currentGameAmount = '¥1,299.00';

function startGameSimulation() {
    document.getElementById('scenario3-notice-page').style.display = 'none';
    document.getElementById('scenario3-main-content').style.display = 'block';
    document.getElementById('app').style.display = 'block';
}

function showGameFieldError(fieldId, show) {
    const error = document.getElementById(fieldId + '-error');
    if (!error) return;
    error.style.display = show ? 'flex' : 'none';
}

function isValidGameName(value) {
    return /^[A-Za-z\u4e00-\u9fa5·]+$/.test(value);
}

function isValidGamePhone(value) {
    return /^\d{11}$/.test(value);
}

function isValidAlipayAccount(value) {
    return /^\d{11}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidWechatId(value) {
    return /^[A-Za-z][A-Za-z0-9_-]{5,19}$/.test(value);
}

function isValidBankCard(value) {
    return /^\d{16,19}$/.test(value);
}

function isValidPayPassword(value) {
    return /^\d{6}$/.test(value);
}

// 截图轮播切换
function switchGallery(index) {
    var imgs = document.querySelectorAll('.gallery-img');
    var thumbs = document.querySelectorAll('.gallery-thumbs img');
    imgs.forEach(function(img) { img.style.display = 'none'; img.classList.remove('active'); });
    thumbs.forEach(function(thumb) { thumb.classList.remove('thumb-active'); });
    var targetImg = document.getElementById('gallery-img-' + index);
    if (targetImg) {
        targetImg.style.display = 'block';
        targetImg.classList.add('active');
    }
    if (thumbs[index - 1]) thumbs[index - 1].classList.add('thumb-active');
}

function updateGameOrderCopy() {
    const orderName = document.querySelector('.order-item-name');
    const orderPrice = document.querySelector('.order-item-price');
    const orderTotal = document.querySelector('.order-total-price');
    const chatInput = document.querySelector('.chat-input');
    const paymentTitle = document.querySelector('.payment-title');
    const payButton = document.getElementById('game-order-pay-btn');
    const paymentAmount = document.getElementById('game-payment-amount');
    const paymentSubmitText = document.getElementById('game-payment-submit-text');
    const tradeEntryTitle = document.getElementById('game-trade-entry-title');
    const tradeEntryPrice = document.getElementById('game-trade-entry-price');
    const tradeEntryDesc = document.getElementById('game-trade-entry-desc');

    let amount = '¥1,299.00';
    let orderLabel = '原神_账号_米哈游官服_天空岛';
    let shortPrice = '¥1,299';
    let chatValue = '好的，走担保交易吧';
    let paymentLabel = '7881担保交易 - 安全支付';
    let buttonLabel = '去支付 →';

    if (!orderName || !orderPrice || !orderTotal || !chatInput || !paymentTitle || !payButton || !paymentAmount || !paymentSubmitText || !tradeEntryTitle || !tradeEntryPrice || !tradeEntryDesc) {
        return;
    }

    if (currentGamePurchaseMode === 'bargain') {
        orderLabel = '原神_账号_专属议价担保订单';
        shortPrice = '¥1,220';
        amount = '¥1,220.00';
        chatValue = '好的，按你说的专属议价订单来';
        paymentLabel = '7881担保交易 - 专属议价支付';
        buttonLabel = '去支付议价订单 →';
    } else if (currentGamePurchaseMode === 'consult') {
        orderLabel = '原神_账号_咨询保留订单';
        shortPrice = '¥1,250';
        amount = '¥1,250.00';
        chatValue = '我先咨询下细节，如果没问题就走担保';
        paymentLabel = '7881担保交易 - 咨询保留支付';
        buttonLabel = '生成咨询保留单 →';
    }

    orderName.textContent = orderLabel;
    orderPrice.textContent = shortPrice;
    orderTotal.textContent = amount;
    chatInput.value = chatValue;
    paymentTitle.textContent = paymentLabel;
    payButton.textContent = buttonLabel;
    paymentAmount.textContent = amount;
    paymentSubmitText.textContent = '确认支付 ' + amount;
    currentGameAmount = amount;
    tradeEntryTitle.textContent = currentGamePurchaseMode === 'bargain'
        ? '卖家已创建专属议价订单'
        : currentGamePurchaseMode === 'consult'
            ? '卖家已创建咨询保留订单'
            : '卖家已创建担保订单';
    tradeEntryPrice.textContent = amount;
    tradeEntryDesc.textContent = currentGamePurchaseMode === 'bargain'
        ? '卖家已按议价金额创建订单，点击进入平台担保交易页继续付款。'
        : currentGamePurchaseMode === 'consult'
            ? '卖家已为你保留当前价格，点击进入平台担保交易页继续付款。'
            : '点击进入平台担保交易页，完成付款后等待卖家交接账号。';
}

function goToContactPage(mode) {
    currentGamePurchaseMode = mode || 'default';
    hasGameTradeEntryBeenSent = false;
    document.getElementById('game-account-page').style.display = 'none';
    document.getElementById('game-contact-page').style.display = 'block';
    document.getElementById('game-trade-request-msg').style.display = 'none';
    document.getElementById('game-trade-entry-card').style.display = 'none';
    document.getElementById('game-chat-send-btn').textContent = '发送';
    updateGameOrderCopy();
}

function backToAccountPage() {
    document.getElementById('game-contact-page').style.display = 'none';
    document.getElementById('game-account-page').style.display = 'block';
}

function goToPaymentPage() {
    document.getElementById('game-contact-page').style.display = 'none';
    document.getElementById('game-payment-page').style.display = 'flex';
}

function sendGameTradeMessage() {
    if (hasGameTradeEntryBeenSent) {
        return;
    }

    const chatBody = document.querySelector('.contact-chat-body');
    const chatInput = document.querySelector('.chat-input');
    const sellerName = document.querySelector('.chat-seller-name');
    const tradeRequestMsg = document.getElementById('game-trade-request-msg');
    const tradeEntryCard = document.getElementById('game-trade-entry-card');
    const sendButton = document.getElementById('game-chat-send-btn');

    if (chatBody && chatInput) {
        const buyerMessage = document.createElement('div');
        buyerMessage.className = 'chat-msg chat-msg-self';
        buyerMessage.innerHTML = '<div class="chat-bubble"><p>' + chatInput.value + '</p><span class="chat-time">19:41</span></div>';
        chatBody.appendChild(buyerMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
        chatInput.value = '';
    }

    hasGameTradeEntryBeenSent = true;
    if (sendButton) {
        sendButton.textContent = '已发送';
    }

    setTimeout(function() {
        if (chatBody) {
            const sellerReply = document.createElement('div');
            sellerReply.className = 'chat-msg chat-msg-other';
            sellerReply.innerHTML = '<div class="chat-avatar">🐱</div><div class="chat-bubble"><p>' + (sellerName ? sellerName.textContent.replace('卖家: ', '') : '卖家') + ' 已经给你发起订单了，你点下面卡片进去就能付款。</p><span class="chat-time">19:41</span></div>';
            chatBody.appendChild(sellerReply);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }, 350);

    setTimeout(function() {
        if (tradeRequestMsg) {
            chatBody.appendChild(tradeRequestMsg);
            tradeRequestMsg.style.display = 'block';
        }
        if (tradeEntryCard) {
            chatBody.appendChild(tradeEntryCard);
            tradeEntryCard.style.display = 'block';
        }
        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }, 750);
}

function setGameOrderMode(mode) {
    if (mode === 'bargain') {
        currentGamePurchaseMode = 'bargain';
    }
    updateGameOrderCopy();

    const methodOption = document.querySelector('input[name="payMethod"][value="' + mode + '"]');
    if (methodOption) {
        methodOption.checked = true;
        const optionLabel = methodOption.closest('.payment-method-option');
        if (optionLabel) {
            optionLabel.click();
        }
    }

    goToPaymentPage();
}

function backToContactPage() {
    document.getElementById('game-payment-page').style.display = 'none';
    document.getElementById('game-contact-page').style.display = 'block';
}

function handleGamePayment(event) {
    event.preventDefault();
    const realname = document.getElementById('game-realname').value.trim();
    const phone = document.getElementById('game-phone').value.trim();
    const payaccount = document.getElementById('game-payaccount').value.trim();
    const paypassword = document.getElementById('game-paypassword').value.trim();
    const selectedMethod = document.querySelector('input[name="payMethod"]:checked').value;
    const successAmount = document.getElementById('game-success-amount');
    const successMethod = document.getElementById('game-success-method');

    if (!isValidGameName(realname)) {
        showGameFieldError('game-realname', true);
        return;
    }
    showGameFieldError('game-realname', false);

    if (!isValidGamePhone(phone)) {
        showGameFieldError('game-phone', true);
        return;
    }
    showGameFieldError('game-phone', false);

    if (selectedMethod === 'alipay' && !isValidAlipayAccount(payaccount)) {
        showGameFieldError('game-payaccount', true);
        return;
    }
    if (selectedMethod === 'wechat' && !isValidWechatId(payaccount)) {
        showGameFieldError('game-payaccount', true);
        return;
    }
    if (selectedMethod === 'bank' && !isValidBankCard(payaccount)) {
        showGameFieldError('game-payaccount', true);
        return;
    }
    showGameFieldError('game-payaccount', false);

    if (!isValidPayPassword(paypassword)) {
        showGameFieldError('game-paypassword', true);
        return;
    }
    showGameFieldError('game-paypassword', false);

    if (successAmount) {
        successAmount.textContent = currentGameAmount;
    }

    if (successMethod) {
        if (selectedMethod === 'alipay') {
            successMethod.textContent = '支付宝';
        } else if (selectedMethod === 'wechat') {
            successMethod.textContent = '微信支付';
        } else if (selectedMethod === 'bank') {
            successMethod.textContent = '网银支付';
        }
    }
    
    document.getElementById('game-payment-page').style.display = 'none';
    document.getElementById('game-success-page').style.display = 'flex';
    
    setTimeout(() => {
        showGameAlert();
    }, 3500);
}

function showGameAlert() {
    document.getElementById('game-success-page').style.display = 'none';
    document.getElementById('game-alert-overlay').style.display = 'flex';
}

function goToGameEducation() {
    window.location.href = 'page_scenario_education.html?scenario=3';
}

// 支付方式选择
document.addEventListener('DOMContentLoaded', function() {
    const methodOptions = document.querySelectorAll('.payment-method-option');
    const paymentHint = document.getElementById('game-payment-hint');
    const paymentFormTitle = document.getElementById('game-payment-form-title');
    const paymentContactLabel = document.getElementById('game-payment-contact-label');
    const paymentAccountLabel = document.getElementById('game-payment-account-label');
    const paymentPasswordLabel = document.getElementById('game-payment-password-label');
    const paymentPhoneInput = document.getElementById('game-phone');
    const paymentAccountInput = document.getElementById('game-payaccount');
    const paymentPasswordInput = document.getElementById('game-paypassword');
    const phoneErrorText = document.getElementById('game-phone-error-text');
    const payAccountErrorText = document.getElementById('game-payaccount-error-text');
    const payPasswordErrorText = document.getElementById('game-paypassword-error-text');
    const realnameInput = document.getElementById('game-realname');

    function updatePaymentFormByMethod(method) {
        if (!paymentFormTitle || !paymentContactLabel || !paymentAccountLabel || !paymentPasswordLabel || !paymentPhoneInput || !paymentAccountInput || !paymentPasswordInput || !phoneErrorText || !payAccountErrorText || !payPasswordErrorText) {
            return;
        }

        if (method === 'alipay') {
            paymentFormTitle.textContent = '支付宝付款信息（用于交易凭证）';
            paymentContactLabel.textContent = '联系电话';
            paymentPhoneInput.placeholder = '请输入手机号码';
            paymentAccountLabel.textContent = '支付宝账号';
            paymentAccountInput.placeholder = '请输入支付宝账号';
            paymentPasswordLabel.textContent = '支付宝支付密码';
            paymentPasswordInput.placeholder = '请输入支付宝支付密码';
            phoneErrorText.textContent = '请输入正确的 11 位手机号。';
            payAccountErrorText.textContent = '请输入正确的支付宝账号。';
            payPasswordErrorText.textContent = '请输入正确的 6 位支付宝支付密码。';
        } else if (method === 'wechat') {
            paymentFormTitle.textContent = '微信付款信息（用于交易凭证）';
            paymentContactLabel.textContent = '联系电话';
            paymentPhoneInput.placeholder = '请输入手机号码';
            paymentAccountLabel.textContent = '微信号';
            paymentAccountInput.placeholder = '请输入微信号';
            paymentPasswordLabel.textContent = '微信支付密码';
            paymentPasswordInput.placeholder = '请输入微信支付密码';
            phoneErrorText.textContent = '请输入正确的 11 位手机号。';
            payAccountErrorText.textContent = '请输入正确的微信号。';
            payPasswordErrorText.textContent = '请输入正确的 6 位微信支付密码。';
        } else if (method === 'bank') {
            paymentFormTitle.textContent = '网银付款信息（用于交易凭证）';
            paymentContactLabel.textContent = '银行预留手机号';
            paymentPhoneInput.placeholder = '请输入银行预留手机号';
            paymentAccountLabel.textContent = '银行卡号';
            paymentAccountInput.placeholder = '请输入银行卡号';
            paymentPasswordLabel.textContent = '网银支付密码';
            paymentPasswordInput.placeholder = '请输入网银支付密码';
            phoneErrorText.textContent = '请输入正确的 11 位银行预留手机号。';
            payAccountErrorText.textContent = '请输入正确的 16-19 位银行卡号。';
            payPasswordErrorText.textContent = '请输入正确的 6 位网银支付密码。';
        }

        showGameFieldError('game-phone', false);
        showGameFieldError('game-payaccount', false);
        showGameFieldError('game-paypassword', false);
    }

    methodOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            methodOptions.forEach(function(opt) { opt.classList.remove('selected'); opt.querySelector('.method-check').textContent = ''; });
            this.classList.add('selected');
            this.querySelector('.method-check').textContent = '✓';

            if (!paymentHint) {
                return;
            }

            const method = this.querySelector('input').value;
            updatePaymentFormByMethod(method);
            if (method === 'alipay') {
                paymentHint.textContent = '当前为支付宝担保支付，平台显示资金将在确认收货后结算给卖家。';
            } else if (method === 'wechat') {
                paymentHint.textContent = '当前为微信担保支付，订单将同步到微信交易记录中。';
            } else if (method === 'bank') {
                paymentHint.textContent = '当前为网银担保支付，平台将生成电子付款凭证。';
            }
        });
    });

    if (realnameInput) {
        realnameInput.addEventListener('input', function() {
            if (isValidGameName(this.value.trim())) {
                showGameFieldError('game-realname', false);
            }
        });
    }

    if (paymentPhoneInput) {
        paymentPhoneInput.addEventListener('input', function() {
            if (isValidGamePhone(this.value.trim())) {
                showGameFieldError('game-phone', false);
            }
        });
    }

    if (paymentAccountInput) {
        paymentAccountInput.addEventListener('input', function() {
            const method = document.querySelector('input[name="payMethod"]:checked').value;
            const value = this.value.trim();
            if ((method === 'alipay' && isValidAlipayAccount(value)) || (method === 'wechat' && isValidWechatId(value)) || (method === 'bank' && isValidBankCard(value))) {
                showGameFieldError('game-payaccount', false);
            }
        });
    }

    if (paymentPasswordInput) {
        paymentPasswordInput.addEventListener('input', function() {
            if (isValidPayPassword(this.value.trim())) {
                showGameFieldError('game-paypassword', false);
            }
        });
    }

    updateGameOrderCopy();
    updatePaymentFormByMethod('alipay');
});
