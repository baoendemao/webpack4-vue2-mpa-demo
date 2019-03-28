## 构建webpack4和vue2的多页面应用

### 技术栈
webpack4 + vue2 + koa2 + pm2

### 目录结构
```
.
├── README.md
├── build
│   ├── webpack.base.config.js        // webpack基础配置
│   ├── webpack.dev.config.js         // webpack开发环境配置
│   └── webpack.prod.config.js        // webpack生产环境配置
├── dist                              // npm run build 打包输出
├── package.json  
├── server
│   └── server.js                     // koa server
└── src
    └── pages
        ├── detail                    // 详情页
        │   ├── detail.html           // html模板
        │   ├── detail.js             // 入口js
        │   └── detail.vue            // 根vue文件
        ├── home                      // 首页
        │   ├── home.html
        │   ├── home.js
        │   └── home.vue
        └── list                      // 列表页
            ├── list.html
            ├── list.js
            └── list.vue
```

### 本地dev环境下运行
```
  npm run dev

  访问：
  http://localhost:8888/home.html
  http://localhost:8888/detail.html
  http://localhost:8888/list.html

```
### 服务端prod环境下运行
* 打包到dist目录
```
  npm run build

```
* 运行：
  * 方法1： 起koa server运行
  ```
    npm run prod
    
  ```
  * 方法2： pm2守护进程运行
  ```
    pm2 list
    pm2 info webpack4-demo
    pm2 delete webpack4-demo
    
    npm run pm2-process

  ```
* 访问
```
    http://localhost:8888/home.html
    http://localhost:8888/detail.html
    http://localhost:8888/list.html

```