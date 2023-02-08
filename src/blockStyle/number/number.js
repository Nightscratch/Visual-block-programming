import html from './html.html?raw'

export default {
    defaultInput: null,
    topOnly:true,

    html(blockId) {
        return html.replace(/blockId/g, blockId)
    },
    inputs: {
    },
    compiler(inputs, blockData, dom) {
        return `${dom.querySelector('[id="input"]').value}`
    },
    initialSelfData:{
        number:123456
    },
    save: {
        toFile(blockData, dom) {
            blockData.self.number = dom.querySelector('[id="input"]').value
            return blockData
        },
    },
    load: {
        initDom(blockData, dom) {
            dom.querySelector('[id="input"]').value = blockData.self.number
            return dom
        }
    }
}

