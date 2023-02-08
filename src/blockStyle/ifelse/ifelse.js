import html from './html.html?raw'

export default {
    defaultInput: 'do1',
    topOnly: false,
    html(blockId) {
        return html.replace(/blockId/g, blockId)
    },
    inputs: {
        'do1': {
            type: 1,
            value: null
        },
        'condition1': {
            type: 0,
            value: null
        },
        'next': {
            type: 1,
            value: null
        },
    },
    // 例子：do1 input 仅允许type=0的积木
    //inputCheack(inputId,blockData,targetBlockData){
    //    if (blockData.inputs[inputId].type == 0) {
    //        return targetBlockData.defaultInput
    //    }
    //},
    compiler(inputs, blockData) {
        return `if (${inputs.condition1}){${inputs.do1}}${inputs.next}`
    }
}

