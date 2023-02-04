import html from './html.html?raw'

export default {
    isTopLevel:false,
    defaultInput:'next',
    html(blockId){
        return html.replace(/blockId/g,blockId)
    },
    inputs() {
        return {
            'arg': {
                type:0,
                value: null
            }  ,
            'next': {
                type:1,
                value: null
            },          
        }
    },
    compiler(inputs,blockData){
        return `move(${inputs.arg});${inputs.next}`
    }
}