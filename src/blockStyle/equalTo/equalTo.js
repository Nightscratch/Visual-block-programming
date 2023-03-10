import html from './html.html?raw'
import inputHtml from './input.html?raw'
import { deletBlock } from '../../block'

export default {
    defaultInput: null,
    topOnly: true,
    html(blockId) {
        return html.replace(/blockId/g, blockId)
    },
    inputs: {},
    compiler(inputs, blockData) {
        let arr = ''
        for (const item in inputs) {
            arr += inputs[item] + ','
        }
        return `[${arr}]`
    },
    load:{
        initDom(blockData,dom,blockId,firstTime) {
            // firstTime : 当copy时是false，当load是true
            let addItem = (inputName,change=true)=>{
                let inputDom = document.createElement('template')
                inputDom.innerHTML = inputHtml.replace(/argId/g, inputName).replace(/blockId/g, blockId)
                if (change) {
                    blockData.inputs[inputName] = { type:0, value:null }
                }
                
                dom.querySelector(`[id="inputs"]`).appendChild(inputDom.content)                
            }
            let subtractItem = ()=>{
                let inputKeys = Object.keys(blockData.inputs)
                if (inputKeys.length > 0) {
                    let inputData = blockData.inputs[inputKeys[inputKeys.length-1]]
                    if (inputData.value) {
                        deletBlock(inputData.value.data)
                    }
                    dom.querySelector(`[group="${inputKeys[inputKeys.length-1]}"][prentId="${blockId}"]`).remove()
                    delete blockData.inputs[inputKeys[inputKeys.length-1]]
                }
            }
            if (firstTime) {
                debugger
                dom.querySelector(`[id="inputs"]`).innerHTML = ''
                for (let inputName in blockData.inputs) {
                    addItem(inputName,false)
                }                
            }

            dom.querySelector(`[id="add"]`).onclick = () => {
                addItem(`item_${Object.keys(blockData.inputs).length + 1}`)
            }
            dom.querySelector(`[id="subtract"]`).onclick = (e) => {
                subtractItem()
            }
        }        
    }

}