//直接用babel实现

//step1. babel-core，转化
let babel = require('babel-core');
let types = require('babel-types');
/**
 * types的功能
 * 生成ast树
 * 判断是不是XX
 */


let code = `let sum = (a,b)=>{ return a+b}`
let code2 = `let sum = (a, b) => a+b`
let ArrowPlugin = {
    visitor:{
        //path是树的路径
        ArrowFunctionExpression(path){
            let node = path.node;
            let { params, body} = node;
            //step2. 改AST， babel-types
            if(!types.isBlockStatement(body)){
                let returnStatement = types.returnStatement(body);
                body = types.blockStatement([returnStatement])//如果不是代码块，则加个return后再转代码块。
            }
            let func = types.functionExpression(null, params, body,false, false);
            path.replaceWith(func);

            //console.log(node)
            //step3.生成函数表达式

        }
    }
}
let r = babel.transform(code, { //这个对象就是.babelrc
    plugins:[
        ArrowPlugin
    ]
})

let r2 = babel.transform(code2, {
    plugins:[
        ArrowPlugin,
    ]
})

console.log(r.code);
console.log(r2.code);
