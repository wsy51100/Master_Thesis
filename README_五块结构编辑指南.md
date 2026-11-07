# 五块结构编辑指南

网站的活动目录为：

```text
D:\agent_skill\Master_Thesis
```

后续都在这个目录修改。用 VS Code 的 `File → Open Folder` 打开它，沿用现有 Live Preview 预览窗口；修改后按 `Ctrl+S` 保存并查看刷新结果。如果预览仍显示旧内容，先确认预览的是此目录中的 `index.html`。

## 1. 主要修改哪些文件

| 文件 | 用途 |
| --- | --- |
| `index.html` | 五块正文、标题、图注、图片路径和导航 |
| `static/css/five-sections.css` | 五块框架的宽度、间距、占位样式与手机布局 |
| `static/css/index.css` | 原有整体配色、页头、按钮与基础排版 |
| `static/js/index.js` | PDF、Code、Video、Poster 链接和图片放大等交互 |
| `static/images/` | 正式图片和待替换的占位图 |
| `static/pdfs/` | 已有论文和海报 PDF |

## 2. 五块顺序与填写位置

导航对应五个 section ID：`overview` → `abstract` → `motivation` → `pipeline` → `results`。填写内容时保留这些 ID，导航即可继续正常定位。

在 `index.html` 中用 `Ctrl+F` 搜索：

| 标记 | 对应内容 |
| --- | --- |
| `TODO_OVERVIEW_IMAGE` | 第一块总体 Pipeline 图 |
| `TODO_OVERVIEW_CAPTION` | 总体图图注 |
| `TODO_ABSTRACT` | Abstract 正文 |
| `TODO_MOTIVATION` | Motivation 正文 |
| `TODO_PIPELINE_INTRO` | Pipeline 总体介绍 |
| `TODO_CORRESPONDENCE` | 2D–3D Correspondence |
| `TODO_SEGMENTATION_METHOD` | DINOv3-Assisted LiDAR Segmentation |
| `TODO_SEMANTIC_MAPPING` | Semantic Neural Mapping |
| `TODO_RESULTS_INTRO` | Results 总体介绍 |
| `TODO_SEGMENTATION_RESULTS` | Semantic Segmentation |
| `TODO_ABLATION_RESULTS` | Ablation Studies |
| `TODO_MAPPING_RESULTS` | Semantic Mapping and Trajectory Estimation |

正文由你填写。将占位段落替换成正式文字时，**删除该段的 `class="placeholder-text"`**，例如：

```html
<!-- 修改前 -->
<p class="placeholder-text">[TODO_ABSTRACT: add your abstract here.]</p>

<!-- 修改后 -->
<p>在这里填写正式摘要。</p>
```

需要多段就添加多个 `<p>…</p>`。图注中的占位 `<span class="placeholder-text">…</span>` 也可以直接换成正式文字。TODO 是搜索标记，不是自动填充变量；`<!-- … -->` 是注释，里面的文字不会显示。

## 3. 换图时同时修改两个路径

把正式图片放入 `static/images/`，然后同步更新：

```html
<button class="image-button"
        data-lightbox="./static/images/my-pipeline.png"
        data-caption="正式图注">
  <img src="./static/images/my-pipeline.png" alt="图片内容描述">
</button>
```

`src` 是页面小图，`data-lightbox` 是点击后放大的图。只改一个会导致两处内容不一致。还要同步修改 `data-caption`、`alt` 和下面的 `<figcaption>`。

当前三个占位图为 `overall-pipeline-placeholder.svg`、`pipeline-detail-placeholder.svg` 和 `results-placeholder.svg`。可以使用 JPG、PNG、SVG 或 WebP 正式图片替换；文件名或扩展名改变时，两个路径都要跟着改。可将 Results 图复制到相关结果小节中，保留完整的 `<figure>…</figure>` 结构。

## 4. PDF、海报和个人链接

`static/js/index.js` 顶部的资源配置保留为：

```js
const RESOURCE_LINKS = {
  thesis: 'static/pdfs/thesis_shuyi_wu.pdf',
  code: null,
  video: null,
  poster: 'static/pdfs/poster.pdf',
};
```

已有论文、海报文件继续使用。以后添加代码或视频，直接把对应 `null` 换成带引号的网址；尚未准备好时保留 `null`。按钮由 JS 统一配置，不要只修改 HTML 中的 `href`。

页头保留你的个人信息和三个主页链接：

- Shuyi Wu：<https://wsy51100.github.io/>
- Louis Wiesmann：<https://www.ipb.uni-bonn.de/people/louis-wiesmann/index.html>
- Cyrill Stachniss：<https://www.ipb.uni-bonn.de/people/cyrill-stachniss/index.html>

编辑正文时无需修改这些链接、底部 dialog 或图标代码。

## 5. 每次保存后检查

在现有 Live Preview 中查看正文、图片放大和五项导航；调整样式时同时看桌面与手机宽度。修改 `five-sections.css` 后，注意文件末尾的 `@media` 可能覆盖前面的字号与间距。

准备更新 GitHub 时，从当前 D 盘目录上传改过的文件，并保留 `static` 层级；新增图片或 CSS 也要一同上传。仓库根目录应直接包含 `index.html` 和 `static`。
