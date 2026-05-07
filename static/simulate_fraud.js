// 場景四：惡意軟件詐騙 - 手機端模擬邏輯

var passwordInput = '';
var passwordAttempts = 0;

function showPage(pageId) {
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(page) { page.classList.remove('active'); });
    document.getElementById(pageId).classList.add('active');
}

function openAccessibility() {
    showPage('accessibility-page');
}

function toggleAccessibility() {
    var checkbox = document.getElementById('access-switch');
    if (checkbox.checked) {
        setTimeout(function() {
            showPage('password-page');
        }, 800);
    }
}

function inputPassword(num) {
    if (num === -1) {
        passwordInput = '';
    } else if (passwordInput.length < 6) {
        passwordInput += num;
    }
    updatePasswordDots();
    
    if (passwordInput.length === 6) {
        setTimeout(checkPassword, 300);
    }
}

function deletePassword() {
    if (passwordInput.length > 0) {
        passwordInput = passwordInput.slice(0, -1);
        updatePasswordDots();
    }
}

function updatePasswordDots() {
    var dots = document.querySelectorAll('#password-dots .password-dot');
    dots.forEach(function(dot, index) {
        if (index < passwordInput.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function checkPassword() {
    passwordAttempts++;
    var errorEl = document.getElementById('password-error');
    
    if (passwordAttempts === 1) {
        errorEl.textContent = '密碼錯誤，請重新輸入';
        errorEl.style.display = 'block';
        passwordInput = '';
        updatePasswordDots();
    } else {
        showPage('error-page');
    }
}

function uninstallApp() {
    document.getElementById('alert-overlay').style.display = 'flex';
}

function showVideo() {
    document.getElementById('alert-overlay').style.display = 'none';
    document.getElementById('video-container').style.display = 'flex';
}

function closeVideo() {
    window.location.href = 'education.html?scenario=4';
}