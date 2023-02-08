import html from './html.html?raw'

export default {
    isTopLevel: true,
    defaultInput: 'next',
    topOnly: true,

    html(blockId) {
        return html.replace(/blockId/g, blockId)
    },
    inputs: {
        'next': {
            type: 1,
            value: null
        },
    },
    compiler(inputs, blockData) {
        return `const start =()=>{${inputs.next}}`
    }
}

