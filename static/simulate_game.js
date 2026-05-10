// 场景三：游戏账号交易诈骗模拟逻辑

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

function goToContactPage() {
    document.getElementById('game-account-page').style.display = 'none';
    document.getElementById('game-contact-page').style.display = 'block';
}

function backToAccountPage() {
    document.getElementById('game-contact-page').style.display = 'none';
    document.getElementById('game-account-page').style.display = 'block';
}

function goToPaymentPage() {
    document.getElementById('game-contact-page').style.display = 'none';
    document.getElementById('game-payment-page').style.display = 'flex';
}

function backToContactPage() {
    document.getElementById('game-payment-page').style.display = 'none';
    document.getElementById('game-contact-page').style.display = 'block';
}

function handleGamePayment(event) {
    event.preventDefault();
    const realname = document.getElementById('game-realname').value;
    const phone = document.getElementById('game-phone').value;
    const payaccount = document.getElementById('game-payaccount').value;
    console.log('场景三支付数据:', { realname: realname, phone: phone, payaccount: payaccount });
    
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
    window.location.href = 'education-scenario3.html';
}

// 支付方式选择
document.addEventListener('DOMContentLoaded', function() {
    const methodOptions = document.querySelectorAll('.payment-method-option');
    methodOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            methodOptions.forEach(function(opt) { opt.classList.remove('selected'); opt.querySelector('.method-check').textContent = ''; });
            this.classList.add('selected');
            this.querySelector('.method-check').textContent = '✓';
        });
    });
});