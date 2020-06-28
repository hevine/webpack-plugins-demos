let esprima = require('esprima');

let code = `function ast(){}`
let tree = esprima.parseScript(code);
console.log(tree);

let estraverse = require('estraverse');
estraverse.traverse(tree,{
    enter(node){//拿到节点, 实际用enter
        console.log('enter', node);
        if(node.type == 'Identifier'){
            node.name = 'fe'

        }

    },
    // leave(node){
    //     console.log('leave', node);
    // }
});

let escodegen = require('escodegen');
let res = escodegen.generate(tree);
console.log(res);