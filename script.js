// 禁用右键菜单（保持原站习惯）
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

// 项目卡片按压反馈
function handlePress() { this.classList.add('pressed'); }
function handleRelease() { this.classList.remove('pressed'); }
function handleCancel() { this.classList.remove('pressed'); }

document.querySelectorAll('.projectItem').forEach(function (button) {
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleCancel);
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchend', handleRelease);
    button.addEventListener('touchcancel', handleCancel);
});

// 图片弹窗（如需启用，把图片路径改为本地相对路径，例如 ./img/xxx.jpg）
function toggleClass(selector, className) {
    document.querySelectorAll(selector).forEach(function (el) {
        el.classList.toggle(className);
    });
}

function pop(imageURL) {
    var img = document.querySelector('.tc-img');
    if (imageURL) img.src = imageURL;
    toggleClass('.tc-main', 'active');
    toggleClass('.tc', 'active');
}

var tc = document.querySelector('.tc');
var tcMain = document.querySelector('.tc-main');
if (tc) tc.addEventListener('click', function () { pop(); });
if (tcMain) tcMain.addEventListener('click', function (event) { event.stopPropagation(); });

// Cookie 读写（记住主题）
function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(name) {
    var nameEQ = name + '=';
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function () {
    var html = document.documentElement;
    var themeState = getCookie('themeState') || 'Light';
    var checkbox = document.getElementById('myonoffswitch');

    function changeTheme(theme) {
        html.dataset.theme = theme;
        setCookie('themeState', theme, 365);
        themeState = theme;
    }

    // 初始：Light = 开关开，Dark = 开关关
    checkbox.checked = (themeState !== 'Dark');
    changeTheme(themeState);

    checkbox.addEventListener('change', function () {
        changeTheme(themeState === 'Dark' ? 'Light' : 'Dark');
    });

    // 隐藏加载动画（原 Django 版不会自动消失，这里修复）
    var loading = document.getElementById('Martin-loading');
    function hideLoading() {
        if (!loading) return;
        loading.classList.add('hidden');
        setTimeout(function () { loading.style.display = 'none'; }, 650);
    }
    if (document.readyState === 'complete') {
        hideLoading();
    } else {
        window.addEventListener('load', hideLoading);
    }
});
