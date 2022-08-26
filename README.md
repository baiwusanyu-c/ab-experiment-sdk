
<h1 align="center">AB-TEST-SDK</h1>
<h3 align="center">茶百道 AB-TEST 前端SDK，支持微信小程序、抖音小程序、h5、web</h3>

## 前端运行指令

```bash
# 克隆项目
git clone https://XXXX.XXXX.XXXX.XXXX


# 项目根目录安装依赖
pnpm i 或运行 pnpm run init

# 启动一个react项目，用于调试打包后的sdk
pnpm run play:web

# eslint语法校验与部分自动修复
pnpm run lint:fix

# husky文件生成（已经配置好了，一般不需要运行）
pnpm run prepare

# 基于jest的单元测试
pnpm run test

# 基于jest的coverage测试
pnpm run test:coverage

# 基于rollup与gulp的打包指令
pnpm run build

# 清楚dist打包产物
pnpm run clean

```

## 项目主要文件夹
注：目前SDK还在不断规划和完善中，文件夹结构可能会发生改变

### utils

该目录下主要存放一些公共方法，包括请求脚本等。

### build-script

该目录下存放打包使用的脚本，脚本编写基于gulp和rollup

### play

该目录是一个react项目，用于web端SDK打包产物调试

### packages

目录下根据各个平台存放了对应的SDK实现逻辑代码