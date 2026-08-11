# 天地日志 · GitHub Pages 个人主页

本仓库是原有 **Django（Python 后端）** 个人网页的**纯静态重构版**，可直接托管在 GitHub Pages，无需任何后端。

## 与原站的区别
- 移除所有 Django 模板语法（`{% %}`、`{{ }}`）与后端访问量统计。
- 所有图片 / 字体资源改为**内联 SVG / CSS 渐变 / Google Fonts**，不再依赖 `static/` 目录，开箱即用。
- 「功能中心」里依赖后端的入口（科普文章、矿物图库、陨石信息库、矿物预测、星际时间、PDF 预览）已按需求移除。
- 主题切换（浅色 / 深色）保留，使用 Cookie 记忆。
- GitHub 主页链接指向 `https://github.com/maohaotian187`。

## 目录结构
```
.
├── index.html      # 主页
├── root.css        # 主题变量（浅色 / 深色）
├── style.css       # 布局与组件样式
├── script.js       # 主题切换、加载动画、卡片交互
├── .nojekyll       # 关闭 Jekyll，确保静态文件原样托管
└── README.md
```

## 本地预览
直接用浏览器打开 `index.html` 即可；或启动一个本地服务器：
```bash
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 部署到 GitHub Pages
1. 在 GitHub 新建仓库（用户页请命名为 `maohaotian187.github.io`，否则为普通项目页）。
2. 初始化并提交：
   ```bash
   git init
   git add .
   git commit -m "feat: 静态个人主页"
   git branch -M main
   git remote add origin git@github.com:maohaotian187/<仓库名>.git
   git push -u origin main
   ```
3. 仓库 **Settings → Pages**，Source 选择 `main` 分支、`/ (root)` 目录，保存。
4. 几分钟后访问 `https://maohaotian187.github.io`（项目页为 `https://maohaotian187.github.io/<仓库名>/`）。

> 说明：本次仅完成本地改造，未执行任何 `git push`，请确认后再推送。

## 自定义
- 头像：编辑 `style.css` 中 `.logo` / `.index-logo` 的 `background` 渐变。
- 技能：编辑 `index.html` 内 `#skillPc` SVG 的进度条 `width`。
- 社交链接：编辑 `index.html` 中 `.iconContainer` 内的 `href`。
- 时间线 / 标签 / 期刊链接：均在 `index.html` 中直接修改文本与 `href`。
