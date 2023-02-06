import html from './html.html?raw'

export default {
    defaultInput: null,
    topOnly:true,

    html(blockId) {
        return html.replace(/blockId/g, blockId)
    },
    inputs() {
        return {
        }
    },
    compiler(inputs, blockData, dom) {
        return `${dom.querySelector('[id="input"]').value}`
    },
    save: {
        toFile(blockData, dom) {
            blockData.self.number = dom.querySelector('[id="input"]').value
            return blockData
        },
    },
    load: {
        toJson(blockData) {
            delete blockData.self.number
            return blockData
        },
        changeDom(blockData, dom) {
            dom.querySelector('[id="input"]').value = blockData.self.number
            return dom
        }
    }
}

