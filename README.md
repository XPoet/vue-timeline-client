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
