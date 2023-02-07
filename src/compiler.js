import blockStyle from "./blockStyle/index";
var blocksData = {}

const compileBlock = (blockData,blocksId,isInput)=>{
    let selfBlockStyle =blockStyle[ blockData.type]
    let inputs = {}
    for (const inputkey in blockData.inputs) {
        let inputData = blockData.inputs[inputkey]
        if (inputData.value) {
            inputs[inputkey] = compileBlock(blocksData[inputData.value.data],inputData.value.data,inputData.type == 0)
            if (inputData.value && blocksData[inputData.value.data].defaultInput && inputData.type == 0) {
                // 这代表是一个语句积木
                inputs[inputkey] = `()=>{${inputs[inputkey]}}`
            }
            //debugger
        }else{
            if (inputkey == 'next') {
                inputs[inputkey] = ''
            }else{
                inputs[inputkey] = 'null'
            }
        }
    }
    return selfBlockStyle.compiler(inputs,blockData,document.querySelector(`[blockid="${blocksId}"]`),isInput)
}

const compile = (blocksDataInput)=>{
    blocksData = blocksDataInput // load data to compile
    let sourceCode = '' 
    for (const blocksId in blocksData) {
        let blockData = blocksData[blocksId]
        if (blockStyle[blockData.type].isTopLevel) {
            sourceCode += compileBlock(blockData,blocksId,false)
        }
    }
    return sourceCode
}

export {
    compile
}