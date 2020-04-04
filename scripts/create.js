const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const babel = require('@babel/core');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse')
const generator = require('@babel/generator')
const type = require('@babel/types');
let elementDir = path.join(__dirname, '../src/functions/elements');
let componentDir = path.join(elementDir, "./components");

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// 引入components/index.js
// const componentIndex = require('../src/functions/elements/components/index');
// const routeIndex = require('../src/functions/elements/routes');
// const elementIndex = require('../src/functions/elements/index');

// 检验目录是否存在
function checkDir (path) {
    try {
        return fs.statSync(path).isDirectory();
    } catch (e) {
        if (e.code === 'ENOENT') {
            console.error('file not exist')
            fs.mkdirSync(path);
            console.log(chalk.green('生成elements目录成功'));
            initElement();
            return false;
        }
        throw e;
    }
}
// babel.transformFileAsync(path.join(__dirname, '../src/functions/elements/components/index.js'), {
//     ast: true,
//     plugins: [
//         transformComponentIndex(type)
//     ]
// })
// .then((result) => { })
// .catch((err) => {console.log(err)})
// function transformComponentIndex (type) {
//     return function (type) {
//         return ({
//             visitor: {
//                 Program: {
//                     enter (pathA) {
//                         console.log(pathA)
//                     },
//                     exit (pathB) {
//                         console.log('离开')
//                     } 
//                 }
//             }
//         })
//     }
//}
if (checkDir(elementDir)) {
    initElement();
}
//changeElementRoute("chinese", "中文")
// 获取elements下的目录
function getDirs (path) {
    try {
        fs.statSync(path).isDirectory();
    } catch (e) {
        if (e.code === 'ENOENT') {
            console.error('file not exist')
            fs.mkdirSync(path);
            console.log(chalk.green('生成components目录成功'));
        }
        throw e;
    }
    let dir = fs.readdirSync(path);
    return dir;
}
// 检查是否存在中文
function checkChinese (str) {
    var reg = new RegExp("[\\u4E00-\\u9FFF]", "g");
    return reg.test(str);
}

function initElement () {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'dirName',
                message: '请输入元素目录名称',
                validate: function (input) {
                    if (!input.length) {
                        return "请输入"
                    }
                    // 判断输入的是不是false或者true
                    let isHave = false;
                    if (checkChinese(input)) {
                        return "输入的目录名称不能包含中文";
                    }
                    let dirs = getDirs(componentDir);
                    (dirs || []).forEach((dir) => {
                        if (dir === input) {
                            isHave = true;
                            return;
                        }
                    });
                    if (isHave) {
                        return "已经有相同名字的目录了，请重新输入";
                    }
                    return true;
                }
            }, {
                type: 'input',
                name: 'chineseName',
                message: '请输入元素的中文名称',
                validate: function (input) {
                    if (!input.length) {
                        return "请输入";
                    }
                    return true;
                }
            }
        ])
        .then((result) => {
            const { dirName, chineseName } = result;
            console.log(chineseName)
            let createDir = path.join(componentDir, `./${dirName}`)
            fs.mkdirSync(createDir);
            fs.writeFileSync(`${createDir}/index.js`, createTemplate(setFirstUpper(dirName)));
            fs.writeFileSync(`${createDir}/index.less`, '');
            console.log(chalk.green(`生成${dirName}目录成功`));
            // 执行将components下面的index重写
            changeComponentIndex(dirName, setFirstUpper(dirName));
            changeElementRoute(dirName, chineseName);
            changeElementIndex(dirName, setFirstUpper(dirName));
        }).catch((err) => {
            console.error(err);
        });
        //chalk.green(`生成${dirName}目录成功`);
}
//changeElementIndex("hello", "Hello")
// 改变element下面的index文件
function changeElementIndex (name, file) {
    const visitor = {
        ImportDeclaration: {
            enter (path) {
                // 使用value值来进行判断
                if (path.node.source.value === './components') {
                    path.node.specifiers.push(
                        type.importSpecifier(type.identifier(file), type.identifier(file))
                    )                
                }
            }
        },
        ReturnStatement: {
            enter (path) {
                console.log(path.node.argument.children)
                path.node.argument.children.push(
                    type.jsxElement(
                        type.jsxOpeningElement(type.jsxIdentifier("Route"), [type.jsxAttribute(type.jsxIdentifier("path"), type.stringLiteral(`/elements/${name}`))], false),
                        type.jsxClosingElement(type.jsxIdentifier("Route")),
                        [type.jsxElement(
                            type.jsxOpeningElement(type.jsxIdentifier(file), [], true),
                            null,
                            [],
                            true
                        )],
                        false),
                    type.jsxText('\n')
                )
            }
        }
    }
    const sourceCode = fs.readFileSync(path.join(__dirname, '../src/functions/elements/index.js'), 'utf8');
    const ast = parser.parse(sourceCode, { sourceType: 'module', plugins: ["jsx"] });
    traverse.default(ast, visitor);
    let code = generator.default(ast, {}, sourceCode);
    console.log(code)
    fs.writeFileSync(path.join(__dirname, '../src/functions/elements/index.js'), code.code, { encoding: 'utf8' });
    console.log(chalk.green(`${file}写入element下index成功`));
}

function changeElementRoute (name, file) {
    console.log(file)
    const visitor = {
        ExportDeclaration: {
            enter (path) {
                if (path.node.type = 'ExportDefaultDeclaration') {
                    path.node.declaration.elements.push(type.objectExpression([
                        type.objectProperty(type.identifier("path"), type.stringLiteral(`/${name}`)),
                        type.objectProperty(type.identifier("name"), type.stringLiteral(file.toString()))
                    ]))
                }
            },
            exit (path) {
                //console.log('离开')
            }
        }
    }
    let dir = path.join(__dirname, '../src/functions/elements/routes.js');
    let sourceCode = fs.readFileSync(dir, 'utf8')
    let ast = parser.parse(sourceCode, { sourceType: 'module' })
    traverse.default(ast, visitor);
    let code = generator.default(ast, {}, sourceCode)
    fs.writeFileSync(dir, code.code, { encoding: 'utf8' });
    console.log(chalk.green(`${file}写入elements/routes.js成功`))
}

// 将component中的index文件重写
function changeComponentIndex (name, file) {
    let dir = path.join(__dirname, '../src/functions/elements/components/index.js');
    const sourceCode  = fs.readFileSync(dir, 'utf8');
    const ast = parser.parse(sourceCode, { sourceType: 'module' });
    // 定义一个visitor
    const visitor = {
        Program: {
            enter (path) {
                //console.log('进入')
            },
            exit (path) {
                //console.log('离开')
            }
        },
        ExportDeclaration: {
            enter (path) {
                if (path.node.type === 'ExportNamedDeclaration') {
                    path.insertBefore(type.importDeclaration([type.importDefaultSpecifier(type.identifier(file))], type.stringLiteral(`./${name}`)))
                    path.node.specifiers.push(type.identifier(file))
                }
            },
            exit (path) {
                //console.log('end')
            }
        }
    }
    traverse.default(ast, visitor)
    let code = generator.default(ast, {}, sourceCode)
    fs.writeFileSync(dir, code.code, { encoding: 'utf8' });
    console.log(chalk.green(`${file}写入components/index成功`))
}
// 设置首字母大写
function setFirstUpper (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

function createTemplate (componentName) {
    return `import React from 'react';
function ${componentName} () {
    return (
        <div>${componentName}</div>
    )
}
export default ${componentName};`;
}

