# gm-node-server

### 本地开发

1. 修改配置
添加config.local.js
修改基础配置

2. 更新数据库表
> 使用sequelize指令前，先npm install -g sequelize-cli

如果数据库未创建
```bash
sequelize db:create
sequelize db:migrate
sequelize db:seed:all
```

如果已经创建
```bash
sequelize db:migrate
```

3. 启动服务
```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

1. 修改配置
添加config.prod.js

2. 更新mysql数据表
> 使用sequelize指令前，先npm install -g sequelize-cli

如果数据库未创建
```bash
NODE_ENV=production sequelize db:create
NODE_ENV=production sequelize db:migrate
NODE_ENV=production sequelize db:seed:all
```

如果已经创建
```bash
NODE_ENV=production sequelize db:migrate
```

3. 启动服务

```bash
$ npm start
$ npm stop
```
