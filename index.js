#!/usr/bin/env node
/**
 * Created by fuhuixiang on 2018/01/01.
 */
'use strict';
const fs = require('fs');
const task = require('gulp');
const renamePlugin = require('gulp-rename');
const replacePlugin = require('gulp-replace-pro');
const program = require('commander');

program
    .version('0.1.0')
    .command('add')
    .description('添加模板文件')
    .option('-c, --component', '添加组件')
    .option('-n, --name', '名称')
    .action(function (env, options) {
        const component = !!options.component;
        const name = options.name || 'test';
        const srcDir = `${process.cwd()}/src`;
        fs.exists(srcDir, (exists) => {
            if (!exists) {
                console.log('正在创建根目录');
                fs.mkdirSync(`${process.cwd()}/src`);
            }
            if (component) {
                createComponent(name, `${process.cwd()}/src`);
            } else {
                createContainer(name, `${process.cwd()}/src`);
            }
        });
    });

// 启动执行
program.parse(process.argv);

/**
 * 创建容器
 * @param name 容器名称
 * @param dir  容器创建目录
 * @description 首先检测目标路径是否存在，如果不存在则创建
 */
function createContainer(name, dir) {
    const outName = toUpperCase(name);
    fs.exists(`${dir}/action/${outName}`, (exists) => {
        if (exists) {
            console.log('你创建的容器已存在');
        } else {
            task.src(`${__dirname}/templates/action.tmpl`)
                .pipe(replacePlugin({
                    '@@name@@': name,
                    '@name@': name.toUpperCase(),
                }))
                .pipe(renamePlugin('index.js'))
                .pipe(task.dest(`${dir}/action/${outName}`));
            task.src(`${__dirname}/templates/reducer.tmpl`)
                .pipe(replacePlugin({
                    '@@name@@': name,
                    '@name@': name.toUpperCase(),
                }))
                .pipe(renamePlugin('index.js'))
                .pipe(task.dest(`${dir}/reducer/${outName}`));
            task.src(`${__dirname}/templates/view.tmpl`)
                .pipe(replacePlugin({
                    '@@name@@': name,
                    '@name@': toUpperCase(name),
                }))
                .pipe(renamePlugin('index.js'))
                .pipe(task.dest(`${dir}/view/${outName}`));
            task.src(`${__dirname}/templates/style.tmpl`)
                .pipe(renamePlugin('style.js'))
                .pipe(task.dest(`${dir}/view/${outName}`));
            console.log('新容器创建完成');
        }
    });
}

/**
 * 创建创建
 * @param name 创建名称
 * @param dir  创建创建目录
 * @description 首先检测目标路径是否存在，如果不存在则创建
 */
function createComponent(name, dir) {
    const outDir = `${dir}/component/${toUpperCase(name)}`;
    fs.exists(outDir, (exists) => {
        if (exists) {
            console.log('你创建的组件已存在');
        } else {
            task.src(`${__dirname}/templates/action.tmpl`)
                .pipe(replacePlugin({
                    '@@name@@': name,
                    '@name@': name.toUpperCase(),
                }))
                .pipe(renamePlugin('action.js'))
                .pipe(task.dest(outDir));
            task.src(`${__dirname}/templates/reducer.tmpl`)
                .pipe(replacePlugin({
                    '@@name@@': name,
                    '@name@': name.toUpperCase(),
                }))
                .pipe(renamePlugin('reducer.js'))
                .pipe(task.dest(outDir));
            task.src(`${__dirname}/templates/component.tmpl`)
                .pipe(replacePlugin({
                    '@@name@@': name,
                    '@name@': toUpperCase(name),
                }))
                .pipe(renamePlugin('component.js'))
                .pipe(task.dest(outDir));
            task.src(`${__dirname}/templates/style.tmpl`)
                .pipe(renamePlugin('style.js'))
                .pipe(task.dest(outDir));
            task.src(`${__dirname}/templates/index.tmpl`)
                .pipe(replacePlugin({
                    '@name@': toUpperCase(name),
                }))
                .pipe(renamePlugin('index.js'))
                .pipe(task.dest(outDir));
            console.log('新组件创建完成');
        }
    });
}

/**
 * 首字母大写转换
 * @param string
 * @returns {string | * | void}
 */
function toUpperCase(string) {
    return string.replace(/\b\w+\b/g, (word) => {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
}
