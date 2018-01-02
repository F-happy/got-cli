# got-template-cli
[![npm](https://img.shields.io/npm/v/got-template-cli.svg?style=flat-square)](https://www.npmjs.com/package/got-template-cli)
[![npm](https://img.shields.io/npm/l/got-template-cli.svg?style=flat-square)](https://www.npmjs.com/package/got-template-cli)
[![npm](https://img.shields.io/npm/dt/got-template-cli.svg?style=flat-square)](https://www.npmjs.com/package/got-template-cli)

> “最佳实践” 生成器，我们总结了一些关于 Redux 的最佳实践，但是每次创建这些模板文件总会
消耗大量的时间，所以我写了这样一个自动生成的工具来节约时间。

### 安装：
```
npm install -g got-template-cli
```

### 创建容器
```
$ got-template-cli add --name <容器名称>

eg:
$ got-template-cli add --name test
```

### 创建组件
```
$ got-template-cli add --name <容器名称> [--component <创建组件>]

eg:
$ got-template-cli add --name test -c
// or
$ got-template-cli add --name test --component
```
