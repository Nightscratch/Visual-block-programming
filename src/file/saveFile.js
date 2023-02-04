import blockStyle from "../blockStyle"

const saveFile = (blocksData)=>{
    let file = {}
    for (const blockId in blocksData) {
        let blockData = blocksData[blockId]
        let blockDom = document.querySelector(`[blockid="${blockId}"]`)
        console.log(blockDom)
        let selfBlockStyle = blockStyle[blockData.type]
        if (selfBlockStyle.save && selfBlockStyle.save.toFile) {
            file[blockId] = selfBlockStyle.save.toFile(blockData,blockDom)
        }else{
            file[blockId] = blockData
        }
        file[blockId].x = blockDom.style.left
        file[blockId].y = blockDom.style.top
    }
    return file
}

export default saveFile