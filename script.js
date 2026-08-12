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

// QQ 二维码：移动端点击切换显示（桌面端用 hover，触屏用点击）
var qqItem = document.getElementById('qqItem');
if (qqItem) {
    qqItem.addEventListener('click', function (e) {
        e.stopPropagation();
        qqItem.classList.toggle('qqActive');
    });
    document.addEventListener('click', function (e) {
        if (qqItem.classList.contains('qqActive') && !qqItem.contains(e.target)) {
            qqItem.classList.remove('qqActive');
        }
    });
}

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

// ===== 中英双语切换 =====
// 范围：欢迎语/描述、各区块标题、左侧位置、QQ弹窗、页脚、全部时间线，以及左侧标签云。
// 技能条标签保持原样（不随语言切换）。
// 默认中文；手动切换后用 Cookie(langState) 记忆（覆盖默认）。
var I18N = {
    zh: {
        welcome: '欢迎来到 <span class="gradientText">天地日志</span>',
        desc1: '<span class="purpleText">Student</span> and Developer',
        desc2: 'Now, it is <span class="purpleText textBackground">time</span> to fight for my <span class="purpleText textBackground">dream</span>.',
        titleArticles: '研究论文',
        titleReviews: '综述论文',
        titleField: '野外实践',
        titleNews: '新闻网站',
        titleSkills: '技能',
        leftLoc: '中国·湖北',
        qqPopup: '扫码加我 QQ',
        footer: '天地日志 © 2025 | <a href="https://github.com/maohaotian187" target="_blank" rel="noopener">GitHub</a>',
        tagWeb: '网页',
        tagPython: 'Python',
        tagLinux: 'Linux',
        tagDeepLearning: '深度学习',
        tagComputationalSimulation: '计算模拟',
        tagPlanetaryScience: '行星科学',
        tagBiology: '生物学',
        tagPopularScience: '科普',
        tagFieldwork: '野外实践',
        leftTimeline:
            '<li><div class="focus"></div><div>敬请期待</div><div>2025.02</div></li>' +
            '<li><div class="focus"></div><div>ICP备案成功</div><div>2025.02</div></li>' +
            '<li><div class="focus"></div><div>注册域名</div><div>2025.01</div></li>' +
            '<li><div class="focus"></div><div>...</div><div>...</div></li>' +
            '<li><div class="focus"></div><div>学习网页设计</div><div>2025.1</div></li>',
        articlesTimeline:
            '<li><div class="focus"></div><div>论文撰写中，敬请期待……</div><div>2026.08</div></li>' +
            '<li><div class="focus"></div><div>实验初步完成</div><div>2026.04</div></li>' +
            '<li><div class="focus"></div><div>模拟各类条件实验</div><div>2025.02</div></li>' +
            '<li><div class="focus"></div><div>拿到试验样品</div><div>2024.12</div></li>' +
            '<li><div class="focus"></div><div>项目立项</div><div>2024.10</div></li>',
        reviewsTimeline:
            '<li><div class="focus"></div><div>第四次投稿，二审中……</div><div>2026.06</div></li>' +
            '<li><div class="focus"></div><div>第四次投稿，一审大修</div><div>2026.06</div></li>' +
            '<li><div class="focus"></div><div>第四次投稿</div><div>2026.03</div></li>' +
            '<li><div class="focus"></div><div>第三次投稿被拒</div><div>2026.06</div></li>' +
            '<li><div class="focus"></div><div>第三次投稿(NSR)</div><div>2026.03</div></li>' +
            '<li><div class="focus"></div><div>第二次投稿被拒</div><div>2025.06</div></li>' +
            '<li><div class="focus"></div><div>第二次投稿(NA)</div><div>2025.03</div></li>' +
            '<li><div class="focus"></div><div>第一次投稿被拒</div><div>2025.03</div></li>' +
            '<li><div class="focus"></div><div>第一次投稿(ESR)</div><div>2024.11</div></li>' +
            '<li><div class="focus"></div><div>完成多轮修改</div><div>2024.10</div></li>' +
            '<li><div class="focus"></div><div>完成初稿，开始修改</div><div>2023.05</div></li>' +
            '<li><div class="focus"></div><div>项目立项</div><div>2023.03</div></li>',
        fieldTimeline:
            '<li><div class="focus"></div><div>湖北·武当山</div><div>2025.01.11~2025.01.12</div></li>' +
            '<li><div class="focus"></div><div>U.K. Dorset-Cornwall</div><div>2024.10.02~2024.10.13</div></li>' +
            '<li><div class="focus"></div><div>北京·周口店</div><div>2024.08.01~2024.08.27</div></li>' +
            '<li><div class="focus"></div><div>北京·球所</div><div>2024.07.15~2024.07.31</div></li>' +
            '<li><div class="focus"></div><div>湖北·梁子湖</div><div>2024.04.27~2024.04.27</div></li>' +
            '<li><div class="focus"></div><div>江苏·南古所</div><div>2024.01.14~2024.01.16</div></li>' +
            '<li><div class="focus"></div><div>湖北·崇阳</div><div>2024.01.01~2024.01.01</div></li>' +
            '<li><div class="focus"></div><div>河北·秦皇岛</div><div>2023.08.14~2023.08.30</div></li>'
    },
    en: {
        welcome: 'Welcome to <span class="gradientText">TDRZ</span>',
        desc1: '<span class="purpleText">Student</span> and Developer',
        desc2: 'Now, it is <span class="purpleText textBackground">time</span> to fight for my <span class="purpleText textBackground">dream</span>.',
        titleArticles: 'Articles',
        titleReviews: 'Reviews',
        titleField: 'Field practice',
        titleNews: 'News Web Links',
        titleSkills: 'skills',
        leftLoc: 'China-Hubei',
        qqPopup: 'Scan to add me on QQ',
        footer: 'TDRZ © 2025 | <a href="https://github.com/maohaotian187" target="_blank" rel="noopener">GitHub</a>',
        tagWeb: 'Web',
        tagPython: 'Python',
        tagLinux: 'Linux',
        tagDeepLearning: 'Deep Learning',
        tagComputationalSimulation: 'Computational Simulation',
        tagPlanetaryScience: 'Planetary Science',
        tagBiology: 'Biology',
        tagPopularScience: 'Popular science',
        tagFieldwork: 'Fieldwork',
        leftTimeline:
            '<li><div class="focus"></div><div>Coming soon</div><div>2025.02</div></li>' +
            '<li><div class="focus"></div><div>ICP filing approved</div><div>2025.02</div></li>' +
            '<li><div class="focus"></div><div>Registered domain</div><div>2025.01</div></li>' +
            '<li><div class="focus"></div><div>...</div><div>...</div></li>' +
            '<li><div class="focus"></div><div>Learned web design</div><div>2025.1</div></li>',
        articlesTimeline:
            '<li><div class="focus"></div><div>Paper in preparation, stay tuned…</div><div>2026.08</div></li>' +
            '<li><div class="focus"></div><div>Initial experiments completed</div><div>2026.04</div></li>' +
            '<li><div class="focus"></div><div>Simulated experiments under various conditions</div><div>2025.02</div></li>' +
            '<li><div class="focus"></div><div>Received experimental samples</div><div>2024.12</div></li>' +
            '<li><div class="focus"></div><div>Project initiated</div><div>2024.10</div></li>',
        reviewsTimeline:
            '<li><div class="focus"></div><div>4th submission, under 2nd review…</div><div>2026.06</div></li>' +
            '<li><div class="focus"></div><div>4th submission, major revision (1st review)</div><div>2026.06</div></li>' +
            '<li><div class="focus"></div><div>4th submission</div><div>2026.03</div></li>' +
            '<li><div class="focus"></div><div>3rd submission rejected</div><div>2026.06</div></li>' +
            '<li><div class="focus"></div><div>3rd submission (NSR)</div><div>2026.03</div></li>' +
            '<li><div class="focus"></div><div>2nd submission rejected</div><div>2025.06</div></li>' +
            '<li><div class="focus"></div><div>2nd submission (NA)</div><div>2025.03</div></li>' +
            '<li><div class="focus"></div><div>1st submission rejected</div><div>2025.03</div></li>' +
            '<li><div class="focus"></div><div>1st submission (ESR)</div><div>2024.11</div></li>' +
            '<li><div class="focus"></div><div>Completed multiple revision rounds</div><div>2024.10</div></li>' +
            '<li><div class="focus"></div><div>Completed first draft, began revisions</div><div>2023.05</div></li>' +
            '<li><div class="focus"></div><div>Project initiated</div><div>2023.03</div></li>',
        fieldTimeline:
            '<li><div class="focus"></div><div>Hubei · Wudang Mountain</div><div>2025.01.11~2025.01.12</div></li>' +
            '<li><div class="focus"></div><div>U.K. Dorset–Cornwall</div><div>2024.10.02~2024.10.13</div></li>' +
            '<li><div class="focus"></div><div>Beijing · Zhoukoudian</div><div>2024.08.01~2024.08.27</div></li>' +
            '<li><div class="focus"></div><div>Beijing · Institute</div><div>2024.07.15~2024.07.31</div></li>' +
            '<li><div class="focus"></div><div>Hubei · Liangzi Lake</div><div>2024.04.27~2024.04.27</div></li>' +
            '<li><div class="focus"></div><div>Jiangsu · NIGPAS</div><div>2024.01.14~2024.01.16</div></li>' +
            '<li><div class="focus"></div><div>Hubei · Chongyang</div><div>2024.01.01~2024.01.01</div></li>' +
            '<li><div class="focus"></div><div>Hebei · Qinhuangdao</div><div>2023.08.14~2023.08.30</div></li>'
    }
};

function getLang() {
    var c = getCookie('langState');
    if (c === 'zh' || c === 'en') return c;
    // 默认中文：曾有用户浏览器语言被识别为英文，导致首次打开整页进英文模式
    // （标签、标题、页脚全部英文）。改为固定中文默认，手动切换后由 Cookie 记忆。
    return 'zh';
}

function applyLang(lang) {
    if (!I18N[lang]) return;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (I18N[lang][key] !== undefined) {
            el.innerHTML = I18N[lang][key];
        }
    });
    document.documentElement.setAttribute('data-lang', lang);
    var btn = document.getElementById('langSwitch');
    if (btn) btn.textContent = (lang === 'zh') ? 'EN' : '中';
}

(function initLang() {
    var lang = getLang();
    applyLang(lang);
    var btn = document.getElementById('langSwitch');
    if (btn) {
        btn.addEventListener('click', function () {
            lang = (lang === 'zh') ? 'en' : 'zh';
            applyLang(lang);
            setCookie('langState', lang, 365);
        });
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    var html = document.documentElement;
    var themeState = getCookie('themeState') || 'Light';
    var checkbox = document.getElementById('myonoffswitch');

    function changeTheme(theme) {
        html.dataset.theme = theme;
        setCookie('themeState', theme, 365);
        themeState = theme;
    }

    // 默认浅色：Light = 开关开（默认），Dark = 开关关
    checkbox.checked = (themeState !== 'Dark');
    changeTheme(themeState);

    checkbox.addEventListener('change', function () {
        changeTheme(themeState === 'Dark' ? 'Light' : 'Dark');
    });

    // 隐藏加载动画（原 Django 版不会自动消失，这里修复）
    // 关键：不依赖 window.load —— 外部脚本/字体拖慢 load 时遮罩会长时间不消失并频闪
    var loading = document.getElementById('Martin-loading');
    function hideLoading() {
        if (!loading || loading.dataset.hidden) return;
        loading.dataset.hidden = '1';
        loading.classList.add('hidden');
        setTimeout(function () { loading.style.display = 'none'; }, 650);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideLoading);
    } else {
        hideLoading();
    }
    // 兜底：无论如何 1.2s 后强制隐藏，避免外部资源卡住导致遮罩常驻
    setTimeout(hideLoading, 1200);
    window.addEventListener('load', hideLoading);
});
