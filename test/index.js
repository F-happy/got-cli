#!/usr/bin/env node
/**
 * Created by fuhuixiang on 2018/01/02.
 */
const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

exec('node index.js add --name test');
exec('node index.js add --name test -c');

// 判断任务执行结果
setTimeout(() => {
    fs.exists(path.resolve(process.cwd(), './src/action/Test/index.js'), (exists) => {
        if (!exists) {
            throw new Error('容器创建失败');
        }
    });
    fs.exists(path.resolve(process.cwd(), './src/component/Test/action.js'), (exists) => {
        if (!exists) {
            throw new Error('组件创建失败');
        }
    });
}, 5000);
