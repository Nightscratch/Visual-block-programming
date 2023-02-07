import html from './html.html?raw'

export default {
    defaultInput:'next',
    topOnly:false,
    html(blockId){
        return html.replace(/blockId/g,blockId)
    },
    inputs() {
        return {
            'arg1': {
                type:0,
                value: null
            }  ,
            'arg2': {
                type:0,
                value: null
            },        
            'next': {
                type:1,
                value: null
            },  
        }
    },
    compiler(inputs,blockData,isInput){
        return `move(${inputs.arg1},${inputs.arg2});${inputs.next}`
    }
}