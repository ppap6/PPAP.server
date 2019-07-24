### PPAP.server
使用 `node` 构建的服务端接口程序。  
近段时间比较忙碌，刚好需要负责工作项目的跟进，只能晚上抽时间进行编写。  
周末白天基本没时间，工作日晚上回来要锻炼身体，洗澡洗衣服后，才有一点时间编写这个项目。  
周期比预计的要长了很多，后面加油吧……😲

### 介绍
帖子乱弹社区 API 服务端 

> 技术栈

`node` + `koa2` + `koa-router` + `ES6` + `mysql` + `mongodb`

### 工程结构
```bash
└── PPAP.server
    ├── code # 返回提示码
    │   └── index.js  # 常量文件
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

### 构建步骤
```bash
yarn install
yarn run dev
```
服务运行在 `localhost:2333` 