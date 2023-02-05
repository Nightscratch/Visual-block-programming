import html from './html.html?raw'

export default {
    isTopLevel:false,
    defaultInput:'next',
    topOnly:true,
    html(blockId){
        return html.replace(/blockId/g,blockId)
    },
    inputs() {
        return {
            'arg': {
                type:0,
                value: null
            }  ,       
        }
    },
    compiler(inputs,blockData){
        return `Math.abs(${inputs.arg});${inputs.next}`
    }
}