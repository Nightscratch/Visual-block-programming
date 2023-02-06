import html from './html.html?raw'
import inputHtml from './input.html?raw'
import { deletBlock } from '../../block'

export default {
    defaultInput: null,
    topOnly: true,
    html(blockId) {
        return html.replace(/blockId/g, blockId)
    },
    inputs() {
        return {
        }
    },
    compiler(inputs, blockData) {
        return `Math.abs(${inputs.arg});${inputs.next}`
    },
    load:{
        changeDom(blockData,dom) {
            let addItem = (inputName)=>{
                let inputDom = document.createElement('template')
                inputDom.innerHTML = inputHtml.replace(/argId/g, inputName).replace(/blockId/g, blockData.blockId)
                blockData.inputs[inputName] = { type:0, value:null }

                dom.querySelector('[id="inputs"]').appendChild(inputDom.content)                
            }
            for (let inputName in blockData.inputs) {
                addItem(inputName)
            }
            dom.querySelector('[id="add"]').onclick = () => {
                addItem(`item_${Object.keys(blockData.inputs).length + 2}`)
            }
            dom.querySelector('[id="subtract"]').onclick = () => {
                let inputKeys = Object.keys(blockData.inputs)
                if (inputKeys.length > 1) {
                    let inputData = blockData.inputs[inputKeys[inputKeys.length-1]]
                    if (inputData.value) {
                        deletBlock(inputData.value.data)
                    }
                    dom.querySelector(`[group="${inputKeys[inputKeys.length-1]}"]`).remove()
                    delete blockData.inputs[inputKeys[inputKeys.length-1]]
                    console.log(blockData.inputs)
                    
                }
            }
        }        
    }

}