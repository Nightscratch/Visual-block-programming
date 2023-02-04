import { dragElement } from "./drag";
import blockStyle from "./blockStyle/index";
import deepClone from './deepClone'
import { zoom } from "./zoom";
import * as compiler from './compiler'
import * as file from './file'

/** @constant { Number } blockMinSpace 积木连接最小距离*/
const blockMinSpace = 20
/** @constant { HTMLElement } codeSpace 积木编程区 html 对象 */
var codeSpace = null;
/** @constant { object } blocksData 存储积木数据 */
var blocksData = {};
/** @constant { object } menu 存储菜单数据 */
var menu = {};
/** @constant { HTMLElement } menuDom 菜单 html 对象 */
var menuDom = null;

/**
 * @function getMinChild 获取积木输入框的最子元素
 * @param { Number } targetBlockId 积木Id 
 * @param { String } inputId 输入名
 * @returns { Number } 最子元素Id
 */
export const getMinChild = (targetBlockId, inputId) => {
    let child = targetBlockId
    if (!blocksData[child].inputs[inputId]) {
        return targetBlockId
    }
    while (blocksData[child].inputs[inputId].value) {
        child = blocksData[child].inputs[inputId].value.data
    }
    return Number(child)
}

/**
 * @function setDragOut 设置积木从父积木里拖出来事件
 * @param { Number } selfBlockId 积木 Id 
 * @param { String } prentId 父积木 Id
 * @param { String } targetBlockInputIndex 输入名
 */
export const setDragOut = (e, selfBlockId, prentId, targetBlockInputIndex) => {
    if (e.target.getAttribute('blockid') != selfBlockId && e.target.getAttribute('dragId') != selfBlockId) {
        return true;
    }
    e = e || window.e;
    e.preventDefault();
    if (e.button == 2) {
        return null;
    }

    delete blocksData[selfBlockId].prent
    let selfBlockDom = codeSpace.querySelector(`[blockid="${selfBlockId}"]`)
    blocksData[prentId].inputs[targetBlockInputIndex].value = null
    selfBlockDom.style.top = setPostiton(selfBlockDom, 'y') + "px";
    selfBlockDom.style.left = setPostiton(selfBlockDom, 'x') + "px";
    selfBlockDom.setAttribute('class', 'block')
    codeSpace.appendChild(selfBlockDom)
    dragElement(selfBlockDom, connectBlocks, e)
}

/**
 * @function setContext 设置积木右键菜单事件
 * @param { Number } e 事件对象
 * @param { String } domId 积木 Id
 */
export const setContext = (e, domId) => {
    e = e || window.e;
    e.preventDefault();
    if (e.target.getAttribute('blockid') != domId && e.target.getAttribute('dragId') != domId) {
        return null;
    }

    //let menuDom = menuDom//document.getElementById('menu')
    menuDom.style.display = 'block'
    menuDom.style.top = (e.clientY + 5) + "px";
    menuDom.style.left = (e.clientX + 10) + "px";
    menu.open = true
    menu.target = {
        type: 1,
        data: String(domId)
    }
}

/**
 * @function connectBlocks 检查积木可否连接其他积木并连接
 * @param { Number } dragBlockId 积木Id
 */
export const connectBlocks = (dragBlockId) => {
    let NowCanConnectBlocks = []
    let dragBlockDom = getBlockById(dragBlockId)
    for (let targetBlockId in blocksData) {
        let targetBlockData = blocksData[targetBlockId]
        if (targetBlockId == dragBlockId || !targetBlockData.defaultInput) {
            continue
        }
        for (const dragBlockInputId in blocksData[dragBlockId].inputs) {
            if (blocksData[dragBlockId].inputs[dragBlockInputId].type == 1 && !blocksData[targetBlockId].prent) {
                let targetBlockDom = getBlockById(targetBlockId)
                let dragBlockInputDom = document.querySelector(`[prentId="${dragBlockId}"][inputId="${dragBlockInputId}"]`)
                let distanceX = Math.abs(targetBlockDom.getBoundingClientRect().left - dragBlockInputDom.getBoundingClientRect().left)
                let distanceY = Math.abs(targetBlockDom.getBoundingClientRect().top - dragBlockInputDom.getBoundingClientRect().top)
                let type = 1

                if (distanceY < blockMinSpace && distanceX < blockMinSpace) {
                    NowCanConnectBlocks.push({
                        distance: distanceX + distanceY,
                        targetBlockId,
                        targetBlockDom,
                        dragBlockInputId,
                        type
                    })
                }
            }

        }
        for (const targetBlockInputIndex in targetBlockData.inputs) {
            if (!blocksData[dragBlockId].defaultInput && targetBlockData.inputs[targetBlockInputIndex].type == 1) {
                continue
            }
            let targetBlockInputDom = document.querySelector(`[prentId="${targetBlockId}"][inputId="${targetBlockInputIndex}"]`)
            let distanceX = Math.abs(targetBlockInputDom.getBoundingClientRect().left - dragBlockDom.getBoundingClientRect().left)
            let distanceY = Math.abs(targetBlockInputDom.getBoundingClientRect().top - dragBlockDom.getBoundingClientRect().top)
            if (distanceX < blockMinSpace && distanceY < blockMinSpace) {
                NowCanConnectBlocks.push({
                    distance: distanceX + distanceY,
                    targetBlockId,
                    targetBlockInputIndex,
                    targetBlockInputDom,
                    type: 0
                })
            }
        }
    }

    if (NowCanConnectBlocks.length == 0) {
        return null
    }
    NowCanConnectBlocks.sort((a, b) => {
        return a.distance - b.distance
    });
    let NowCanConnectBlock = NowCanConnectBlocks[0]
    debugger
    if (NowCanConnectBlock.type == 0) {
        let {
            targetBlockId,
            targetBlockInputIndex,
            targetBlockInputDom,
        } = NowCanConnectBlock

        if (blocksData[targetBlockId].inputs[targetBlockInputIndex].value) {
            let oldBlockId = blocksData[targetBlockId].inputs[targetBlockInputIndex].value.data
            let oldBlockDom = getBlockById(oldBlockId)
            let minChildId = getMinChild(dragBlockId, 'next')


            if (targetBlockInputIndex == 'next') {

                //console.log(blocksData[targetBlockId].inputs[Object.keys(blocksData[targetBlockId].inputs)[0]])

                let defaultInput = blocksData[dragBlockId].defaultInput
                let inpid = defaultInput
                document.querySelector(`[prentId="${minChildId}"][inputId="${inpid}"]`).appendChild(oldBlockDom)
                blocksData[minChildId].inputs[inpid].value = { data: oldBlockId, type: 1 }

                blocksData[targetBlockId].inputs[targetBlockInputIndex].value = null
                blocksData[oldBlockId].prent = {
                    inputId: targetBlockInputIndex,
                    blockId: minChildId
                }
                oldBlockDom.onmousedown = (e) => {
                    setDragOut(e, oldBlockId, minChildId, targetBlockInputIndex)
                }
            } else {
                if (blocksData[oldBlockId].defaultInput) {
                    if (blocksData[dragBlockId].defaultInput) {
                        let inpid = blocksData[dragBlockId].defaultInput
                        document.querySelector(`[prentId="${minChildId}"][inputId="${inpid}"]`).appendChild(oldBlockDom)
                        blocksData[minChildId].inputs[inpid].value = { data: oldBlockId, type: 1 }

                        blocksData[oldBlockId].prent = {
                            inputId: inpid,
                            blockId: minChildId
                        }
                        oldBlockDom.onmousedown = (e) => {
                            setDragOut(e, oldBlockId, minChildId, inpid)
                        }
                    } else {
                        oldBlockDom.style.top = setPostiton(oldBlockDom, 'y')+20 + "px";
                        oldBlockDom.style.left = setPostiton(oldBlockDom, 'x')+20 + "px";
                        codeSpace.appendChild(oldBlockDom)
                        delete blocksData[oldBlockId].prent
                        oldBlockDom.setAttribute('class', 'block')
                        dragElement(oldBlockDom, connectBlocks)

                    }

                } else {
                    oldBlockDom.style.top = setPostiton(oldBlockDom, 'y')+20 + "px";
                    oldBlockDom.style.left = setPostiton(oldBlockDom, 'x')+20 + "px";
                    codeSpace.appendChild(oldBlockDom)
                    delete blocksData[oldBlockId].prent
                    oldBlockDom.setAttribute('class', 'block')
                    dragElement(oldBlockDom, connectBlocks)
                }
                debugger
            }
        }
        blocksData[targetBlockId].inputs[targetBlockInputIndex].value = {
            type: 1,
            data: dragBlockId
        }
        blocksData[dragBlockId].prent = {
            blockId: targetBlockId,
            inputId: targetBlockInputIndex
        }

        targetBlockInputDom.appendChild(dragBlockDom)
        dragBlockDom.setAttribute('class', 'block-input')
        dragBlockDom.onmousedown = (e) => {
            setDragOut(e, dragBlockId, targetBlockId, targetBlockInputIndex)
        }
    } else if (NowCanConnectBlock.type == 1) {
        let {
            targetBlockId,
            targetBlockDom,
            dragBlockInputId
        } = NowCanConnectBlock
        let dragBlockInputDom = document.querySelector(`[prentId="${dragBlockId}"][inputId="${dragBlockInputId}"]`)

        dragBlockInputDom.append(targetBlockDom)


        blocksData[targetBlockId].prent = {
            blockId: dragBlockId,
            inputId: dragBlockInputId
        }
        blocksData[dragBlockId].inputs[dragBlockInputId].value = {
            type: 1,
            data: targetBlockId
        }
        targetBlockDom.setAttribute('class', 'block-input')
        targetBlockDom.onmousedown = (e) => {
            setDragOut(e, targetBlockId, dragBlockId, dragBlockInputId)
        }




    }


    return null
}
/**
 * @function createBlockDomById 创建一个积木
 * @param { String } type 积木类型
 * @param { Number } dragBlockId 积木Id
 */
const createBlockDomById = (type, id) => {
    let dom = document.createElement("div");
    dom.setAttribute('blockId', `${id}`)
    dom.setAttribute('class', 'block')
    dom.innerHTML = blockStyle[type].html(id)
    return dom
}
/**
 * 创建一个积木
 * @function createBlockDom 创建一个积木
 * @param { String } type 积木类型
 * @return { HTMLDivElement } 创建积木
 */
const createBlockDom = (type, id = Object.keys(blocksData).length) => {
    let dom = document.createElement("div");
    dom.setAttribute('blockId', `${id}`)
    dom.setAttribute('class', 'block')
    dom.innerHTML = blockStyle[type].html(id)
    return dom
}

/**
 * @function addInputBlock 创建一个有父的积木
 * @param { String } type 积木类型
 * @param { String } id 积木 id
 */
export const addInputBlock = (type, id = Object.keys(blocksData).length) => {
    let dom = createBlockDom(type, id)
    dom.setAttribute('class', 'input-block')
    return dom
}

/**
 * @function addBlock 创建一个积木
 * @param { String } type 积木类型
 * @param { boolean } changeBlocksData 是否修改
 * @param { String } id 积木 id
 */
export const addBlock = (type, changeBlocksData = true, id) => {

    let dom;
    if (changeBlocksData) {
        dom = createBlockDom(type)
    } else {
        dom = createBlockDom(type, id)
    }
    codeSpace.appendChild(dom);
    if (changeBlocksData) {
        dragElement(dom, connectBlocks)
        let domId = Object.keys(blocksData).length
        dom.oncontextmenu = (e) => {
            setContext(e, domId)
        }

        blocksData[domId] =
        {
            type,
            inputs: blockStyle[type].inputs(),
            isTopLevel: blockStyle[type].isTopLevel,
            defaultInput: blockStyle[type].defaultInput
        }
    }
    return dom
}

/**
 * @function getAllChildBlock 获取该积木的所有子
 * @param { Number } tagetBlockId 积木id
 * @return { number[] } 子积木id
 */
export const getAllChildBlock = (tagetBlockId) => {
    let res = []
    for (const inputKey in blocksData[tagetBlockId].inputs) {
        let inputData = blocksData[tagetBlockId].inputs[inputKey]
        if (inputData.value) {
            if (inputData.value) {

                res.push(inputData.value.data)
                res = res.concat(getAllChildBlock(inputData.value.data))

            }
        }
    }
    return res
}

/**
 * @function deletBlock 删除积木
 * @param { Number } deletBlock 积木 id
 */
export const deletBlock = (targetBlockId) => {
    getBlockById(targetBlockId).remove()

    if (blocksData[targetBlockId].prent) {
        blocksData[blocksData[targetBlockId].prent.blockId].inputs[blocksData[targetBlockId].prent.inputId].value = null
    }

    let data = getAllChildBlock(targetBlockId)
    for (const delBlockId of data) {
        delete blocksData[delBlockId]
    }
    delete blocksData[targetBlockId]
}

/**
 * @function setPostiton 通过在页面的绝对位置设置位置偏移
 * @param { Number } deletBlock 积木 id
 * @param { String } attribute 方向
 * @param { HTMLElement } dom 积木对象
 */
const setPostiton = (dom, attribute) => {
    if (attribute == 'x') {
        return dom.getBoundingClientRect().x + document.getElementById('zoom').scrollLeft / zoom
    } else {
        return dom.getBoundingClientRect().y + document.getElementById('zoom').scrollTop / zoom
    }
}
/**
 * @function copyBlock 复制积木
 * @param { Number } targetBlockId 积木 id
 */
const copyBlock = (targetBlockId) => {
    let data = getAllChildBlock(targetBlockId)
    let baseId = Number(Object.keys(blocksData)[Object.keys(blocksData).length - 1]) + 1 //Object.keys(blocksData).length+1
    data.unshift(targetBlockId)
    let targetBlockToCopy = document.querySelector(`[blockid="${targetBlockId}"]`)
    let newBlockDom = targetBlockToCopy.cloneNode(true)

    newBlockDom.style.left = setPostiton(targetBlockToCopy, 'x') + 10 + 'px'
    newBlockDom.style.top = setPostiton(targetBlockToCopy, 'y') + 10 + 'px'

    codeSpace.appendChild(newBlockDom)
    for (const blockIdToCopy of data) {
        let toCopyData = blocksData[blockIdToCopy]
        blocksData[String(Number(blockIdToCopy) + baseId)] = deepClone(toCopyData)

        let newBlock = blocksData[String(Number(blockIdToCopy) + baseId)]

        let domToQuery = document.createElement("div");
        domToQuery.appendChild(newBlockDom.cloneNode(true))

        let change = (Attribute, AttributeName, callBack = () => { }) => {
            let newBlockDomToChange = newBlockDom.querySelectorAll(Attribute)[0]
            if (!newBlockDomToChange) {
                newBlockDomToChange = newBlockDom
            }
            newBlockDomToChange.setAttribute(AttributeName, String(Number(blockIdToCopy) + baseId))
            callBack(newBlockDomToChange)
        }
        let changeMultiple = (Attribute, AttributeName) => {
            let newBlockDomToChanges = newBlockDom.querySelectorAll(Attribute)
            for (let newBlockDomToChange of newBlockDomToChanges) {
                newBlockDomToChange.setAttribute(AttributeName, String(Number(blockIdToCopy) + baseId))
            }
        }

        if (newBlock.prent) {
            blocksData[String(Number(blockIdToCopy) + baseId)].prent.blockId = String(Number(blocksData[String(Number(blockIdToCopy) + baseId)].prent.blockId) + baseId)
        }

        change(`[blockid="${blockIdToCopy}"]`, 'blockid', (newBlockDomToChange) => {
            let data = blocksData[String(Number(blockIdToCopy) + baseId)]
            if (blockIdToCopy == targetBlockId) {
                newBlockDomToChange.setAttribute('class', 'block')
                dragElement(newBlockDomToChange, connectBlocks)
            } else {
                newBlockDomToChange.onmousedown = (e) => {
                    setDragOut(e, String(Number(blockIdToCopy) + baseId), data.prent.blockId, data.prent.inputId)
                }
            }
            newBlockDomToChange.oncontextmenu = (e) => {
                setContext(e, String(Number(blockIdToCopy) + baseId))
            }
        })
        changeMultiple(`[dragid="${blockIdToCopy}"]`, 'dragid')
        for (const inputKey in newBlock.inputs) {
            changeMultiple(`[prentid="${blockIdToCopy}"][inputId="${inputKey}"]`, 'prentid')
            if (newBlock.inputs[inputKey].value) {
                newBlock.inputs[inputKey].value.data = String(Number(newBlock.inputs[inputKey].value.data) + baseId)
            }
        }
    }
}

/**
 * @function bindEvent 绑定事件
 * @param { object } eventList 事件
 * @param { Number } blockId 积木 id
 * @param { HTMLElement } dom 积木对象
 */
export const bindEvent = (dom, eventList, blockId) => {
    // only for toplevel
    dragElement(dom, connectBlocks)
    dom.oncontextmenu = (e) => {
        setContext(e, blockId)
    }
    for (const aevent of eventList) {
        aevent.selfBlockDom.onmousedown = (e) => {
            setDragOut(e, aevent.selfBlockId, aevent.prentId, aevent.targetBlockInputIndex)
        }
        aevent.selfBlockDom.oncontextmenu = (e) => {
            setContext(e, aevent.selfBlockId)
        }
    }
}

/**
 * @function getBlockById 通过积木Id 获取积木元素
 * @param { Number } tid 积木 id
 * @return { HTMLElement } 积木元素
 */
const getBlockById = (tid) => {
    return document.querySelector(`[blockId="${tid}"]`)
}

/**
 * @function closeMenu 关闭菜单
 */
const closeMenu = () => {
    menuDom.style.display = 'none'
    menu.open = false
}

/**
 * @function init 初始化
 * @param { HTMLElement } codeSpaceDom 工作区元素
 */
export const init = (codeSpaceDom) => {
    menuDom = document.getElementById('menu')
    codeSpace = codeSpaceDom //document.getElementById('app')
    blocksData = {}
    menu = {}

    codeSpace.onmousedown = (e) => {
        if (e.target.getAttribute('id') == 'menuItem') {
            return null;
        }
        closeMenu()
    }

    document.getElementById("menuCopy").addEventListener("click", () => {
        copyBlock(menu.target.data)
        closeMenu()
    })
    document.getElementById("menuDelet").addEventListener("click", () => {
        deletBlock(menu.target.data)
        closeMenu()
    })
}

/**
 * @exports loadFile
 */
export const loadFile = (projectJson) => {
    file.loadFile(projectJson, blocksData)
}
/**
 * @exports saveFile
 */
export const saveFile = () => {
    return file.saveFile(blocksData)
}
/**
 * @exports compile
 */
export const compile = () => {
    return compiler.compile(blocksData)
}
//