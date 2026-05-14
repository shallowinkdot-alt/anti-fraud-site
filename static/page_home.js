// 主页逻辑

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 0) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});
