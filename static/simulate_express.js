// 场景二：快递理赔诈骗逻辑

function goToFakeExpressPage() {
    document.getElementById('sms-page').style.display = 'none';
    document.getElementById('express-login-page').style.display = 'block';
}

function handleExpressLogin(event) {
    event.preventDefault();
    const phone = document.getElementById('express-phone').value;
    const password = document.getElementById('express-password').value;
    console.log('场景二登录数据:', { phone: phone, password: password });
    document.getElementById('express-login-page').style.display = 'none';
    document.getElementById('express-claim-page').style.display = 'block';
}

function handleClaimSubmit(event) {
    event.preventDefault();
    const bank = document.getElementById('bank-card').value;
    const name = document.getElementById('bank-name').value;
    const phone = document.getElementById('claim-phone').value;
    console.log('理赔信息:', { bank: bank, name: name, phone: phone });
    document.getElementById('express-claim-page').style.display = 'none';
    document.getElementById('express-success-page').style.display = 'block';
    setTimeout(function() {
        document.getElementById('express-success-page').style.display = 'none';
        document.getElementById('alert-overlay').style.display = 'flex';
    }, 3000);
}

function goToEducation() {
    window.location.href = 'education.html?scenario=2';
}