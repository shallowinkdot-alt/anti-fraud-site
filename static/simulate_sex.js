// 場景四：色情網站惡意軟件詐騙 - PC端網站邏輯

function confirmAge() {
    document.getElementById('age-modal').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

function leaveSite() {
    alert('感謝您的誠實，請在成年後再來訪問。');
    window.location.href = 'https://www.google.com';
}

function showClickHint(event) {
    if (event.target.closest('.video-card')) {
        event.preventDefault();
        event.stopPropagation();
        var hint = document.getElementById('click-hint');
        hint.style.display = 'block';
        setTimeout(function() {
            hint.style.display = 'none';
        }, 2000);
    }
}

function downloadApp() {
    var toast = document.getElementById('download-toast');
    toast.style.display = 'flex';
    
    var percent = 0;
    var barInner = document.getElementById('download-bar-inner');
    var percentText = document.getElementById('download-percent');
    
    var interval = setInterval(function() {
        percent += Math.random() * 15;
        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);
            setTimeout(function() {
                document.getElementById('download-toast').style.display = 'none';
                document.getElementById('download-complete-toast').style.display = 'flex';
            }, 500);
        }
        barInner.style.width = percent + '%';
        percentText.textContent = Math.floor(percent) + '%';
    }, 300);
}

function openApp() {
    window.location.href = 'simulate_fraud.html';
}