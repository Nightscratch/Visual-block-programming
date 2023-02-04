import blockStyle from "./blockStyle/index";
var blocksData = {}

const compileBlock = (blockData,blocksId)=>{
    let selfBlockStyle =blockStyle[ blockData.type]
    let inputs = {}
    for (const inputkey in blockData.inputs) {
        let inputData = blockData.inputs[inputkey]
        if (inputData.value) {
            inputs[inputkey] = compileBlock(blocksData[inputData.value.data],inputData.value.data,false)
        }else{
            if (inputkey == 'next') {
                inputs[inputkey] = ''
            }else{
                inputs[inputkey] = 'null'
            }
        }
    }
    return selfBlockStyle.compiler(inputs,blockData,document.querySelector(`[blockid="${blocksId}"]`))
}

const compile = (blocksDataInput)=>{
    blocksData = blocksDataInput // load data to compile
    let sourceCode = '' 
    for (const blocksId in blocksData) {
        let blockData = blocksData[blocksId]
        if (blockStyle[blockData.type].isTopLevel) {
            sourceCode += compileBlock(blockData,blocksId)
        }
    }
    return sourceCode
}

export {
    compile
}