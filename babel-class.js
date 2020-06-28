let babel = require('babel-core')
let types = require('babel-types')


let code = `
 class Person{
     constructor(name){
        this.name = name;
     }
     getName(){
         return this.name;
     }
 }
`

//转化
let coderesTemplate = `
    function Person(name){
        this.name = name;
    
    }
    Person.prototype.getName = function(){
        return this.name
    }
`

let ClassPlugin = {
    visitor:{
      ClassDeclaration(path){
        let { node } = path;
        let className = node.id.name;
        console.log(className);
        let { body } = node.body;
        className = types.identifier(className);
        let funcs = types.functionDeclaration(className, [], types.blockStatement([]), false, false);
        path.replaceWith(funcs);
        body.forEach((item, idx)=>{
                //函数的代码体
                let codeBody = body[idx].body;
                console.log(item);
                if(item.kind === 'construtor'){
                    let { params } = item;
                    params = params.length? params.map(i => i.name):[];
                    funcs = types.functionDeclaration(className, [], types.blockStatement([]), false, false);
                    path.replaceWith(funcs);
                }

        })
      }
    }
}
let res = babel.transform(code, {
    plugins:[
        ClassPlugin,
    ]
});
console.log(res.code)