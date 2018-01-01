/**
 * Created by fuhuixiang on 2018/01/01.
 */
"use strict";
const fs = require('fs');
const task = require('gulp');
const renamePlugin = require('gulp-rename');
const replacePlugin = require('gulp-replace-pro');
const program = require('commander');

program
    .version('1.0.0')
    .command('add [env]')
    .description('添加模板文件')
    .option('-c, --component', '添加组件')
    .action(function (env, options) {
        const component = !!options.component;
        const name = env || 'test';
        const srcDir = `${process.cwd()}/src`;
        fs.exists(srcDir, (exists) => {
            if (!exists) {
                console.log('正在创建根目录');
                fs.mkdirSync(`${process.cwd()}/src`);
            }
            console.log(fs.existsSync(`${process.cwd()}/src`));
            createView('goods', `${process.cwd()}/src`);
        });
        // fs.mkdirSync(`${process.cwd()}/src`);
        console.log(process.cwd());
    });

program.parse(process.argv);

function createView(name, dir) {
    task.src(`${__dirname}/templates/action.tmpl`)
        .pipe(replacePlugin({
            '@@name@@': name,
            '@name@': name.toUpperCase(),
        }))
        .pipe(renamePlugin('index.js'))
        .pipe(task.dest(`${dir}/action/${toUpperCase(name)}`));
    task.src(`${__dirname}/templates/reducer.tmpl`)
        .pipe(replacePlugin({
            '@@name@@': name,
            '@name@': name.toUpperCase(),
        }))
        .pipe(renamePlugin('index.js'))
        .pipe(task.dest(`${dir}/reducer/${toUpperCase(name)}`));
    task.src(`${__dirname}/templates/view.tmpl`)
        .pipe(replacePlugin({
            '@@name@@': name,
            '@name@': toUpperCase(name),
        }))
        .pipe(renamePlugin('index.js'))
        .pipe(task.dest(`${dir}/view/${toUpperCase(name)}`));
    task.src(`${__dirname}/templates/style.tmpl`)
        .pipe(renamePlugin('style.js'))
        .pipe(task.dest(`${dir}/view/${toUpperCase(name)}`));
    console.log('新容器创建完成');
}

function toUpperCase(string) {
    return string.replace(/\b\w+\b/g, (word) => {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
}