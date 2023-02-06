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
        initDom(blockData,dom,blockId,firstTime) {
            // firstTime : 当copy时是false，当load是true
            let addItem = (inputName,change=true)=>{
                let inputDom = document.createElement('template')
                inputDom.innerHTML = inputHtml.replace(/argId/g, inputName).replace(/blockId/g, blockId)
                if (change) {
                    blockData.inputs[inputName] = { type:0, value:null }
                }
                
                dom.querySelector(`[id="inputs"][prentId="${blockId}"]`).appendChild(inputDom.content)                
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
                    console.log(blockData.inputs)
                    
                }
            }
            if (firstTime) {
                debugger
                dom.querySelector(`[id="inputs"][prentId="${blockId}"]`).innerHTML = ''
                for (let inputName in blockData.inputs) {
                    addItem(inputName,false)
                }                
            }

            dom.querySelector(`[id="add"][prentId="${blockId}"]`).onclick = () => {
                addItem(`item_${Object.keys(blockData.inputs).length + 1}`)
            }
            dom.querySelector(`[id="subtract"][prentId="${blockId}"]`).onclick = (e) => {
                console.log(e.target)
                subtractItem()
            }
        }        
    }

}