import html from './html.html?raw'

export default {
    isTopLevel:false,
    defaultInput:'do1',
    topOnly:false,
    html(blockId){
        return html.replace(/blockId/g,blockId)
    },
    inputs() {
        return {
            'do1':{
                type:1,
                value: null
            },
            'condition1': {
                type:0,
                value: null
            },
            'next': {
                type:1,
                value: null
            },   
        }
    },
    compiler(inputs,blockData){
        return `if (${inputs.condition1}){${inputs.do1}}${inputs.next}`
    }
}

