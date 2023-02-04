import { blocksData,setBlocksData, cleanBlocksData } from "../blocksData"
import blockStyle from "../blockStyle"
import { addBlock, addInputBlock,bindEvent } from "../block"
let blocksDataToChange = {}
let eventList = []

const load = (blockId, blocksDataToLoad, dom) => {
    let blockData = blocksDataToLoad[blockId]
    let selfBlockStyle = blockStyle[blockData.type]
    if (selfBlockStyle.load && selfBlockStyle.load.changeDom) {
        selfBlockStyle.load.changeDom(blockData,dom)
    }
    
    dom.style.left = blockData.x
    dom.style.top = blockData.y


    delete blockData.x
    delete blockData.y

    if (selfBlockStyle.load && selfBlockStyle.load.toJson) {
        selfBlockStyle.load.toJson(blockData)
    }
    blocksDataToChange[blockId] = blockData
    for (const inputKey in blockData.inputs) {
        let inputData = blockData.inputs[inputKey]
        if (inputData.value) {
            let child = addInputBlock(
                blocksDataToLoad[inputData.value.data].type,
                inputData.value.data
            )
            //setDragOut = (e, selfBlockDom, selfBlockId, prentId, targetBlockInputIndex)
            eventList.push({
                selfBlockDom:child,
                selfBlockId:inputData.value.data,
                prentId:blockId,
                targetBlockInputIndex:inputKey


            })
            dom.querySelector(`[inputid="${inputKey}"]`).appendChild(
            load(
                    inputData.value.data,
                    blocksDataToLoad, 
                    child
                )
            )
            debugger
        }
    }
    return dom
}

const loadFile = (blocksDataToLoad,blocksData) => {
    blocksData = {}
    document.getElementById('app').innerHTML = ''
    blocksDataToChange = {}
    for (const blockId in blocksDataToLoad) {
        console.log("sss", blocksDataToLoad[blockId])
        const blockData = blocksDataToLoad[blockId]
        if (!blockData.prent) {
            debugger
            eventList = []
            bindEvent(load(blockId, blocksDataToLoad, addBlock(blockData.type,false,blockId)),eventList,blockId)
            debugger
        }
    }
    setBlocksData(blocksDataToChange)
}

export default loadFile