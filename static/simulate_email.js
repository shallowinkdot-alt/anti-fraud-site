// 场景一：免费API Token诈骗逻辑

function startSimulation() {
    document.getElementById('notice-page').style.display = 'none';
    document.getElementById('email-page').style.display = 'block';
}

function goToPhishingPage() {
    document.getElementById('email-page').style.display = 'none';
    document.getElementById('phishing-page').style.display = 'flex';
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('场景一登录数据:', { email: email, password: password });
    document.getElementById('phishing-page').style.display = 'none';
    document.getElementById('success-page').style.display = 'flex';
    setTimeout(function() {
        document.getElementById('success-page').style.display = 'none';
        document.getElementById('alert-overlay').style.display = 'flex';
    }, 3000);
}

function goToEducation() {
    window.location.href = 'education.html?scenario=1';
}