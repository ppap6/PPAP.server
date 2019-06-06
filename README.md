### PPAP.server
node 服务端程序

### Introduction
帖子乱弹社区 API 服务端 

> 技术栈

`node` + `koa2` + `koa-router` + `ES6`

### Structure
```bash
└── PPAP.server
    ├── controller # 操作层 验证视图层用户输入，调用业务层方法，json接口返回数据
    │   └── index.js
    ├── model # 数据模型层 执行数据操作
    │   └── index.js
    ├── router # 路由层 控制路由
    │   └── index.js
    ├── service # 业务层 操作数据层，对业务逻辑进行处理，将结果返回控制层
    │   └── index.js
    ├── sql # 数据表sql
    │   └── init.sql
    ├── util # 工具函数
    │   └── index.js
    ├── app.js # 入口文件
    ├── package.json 
    ├── README.md
    └── yarn.lock
```

### Build Setup
```bash
yarn install
yarn run dev
```