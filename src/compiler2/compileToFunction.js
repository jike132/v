/**
 * 解析模版字符串，得到 AST 语法树
 * 将 AST 语法树生成渲染函数
 * @param { String } template 模版字符串
 * @returns 渲染函数
 */
import parse from "./parse.js"
import generate from "./generate.js"
export default function compileToFunction(template) {
    // 解析模版，生成 ast
    const ast = parse(template)
    debugger
    // 将 ast 生成渲染函数
    const render = generate(ast)
    return render
  }
  
  