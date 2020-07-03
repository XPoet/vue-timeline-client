# timeline-client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目依赖

### 基础 UI 库 Element UI

```js
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)
```

### 网络请求 Axios

```js
import Axios from "axios";
Vue.prototype.$axios = Axios;
```

### 基于 Vue 的 Markdown 编辑器 mavon-editor
```js
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);
```
###  解析 Markdown 文档 markdown-it

使用 markdown-it 来解析 markdown 文档
```js
const content = '# 111'
import MI from 'markdown-it';
new MI().render(content)
```

# markdown 样式 github-markdown-css

在展示 markdown 内容的 DOM 上，添加类名 markdown-body。

```html
<div v-html="content"
     class="markdown-body"
></div>
```
