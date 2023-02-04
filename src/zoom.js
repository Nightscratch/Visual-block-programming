let zoom = 1;

const display = ()=>{
    document.getElementById('app').style.zoom = zoom
}

const zoomOut = ()=>{
    zoom+=0.5
    if (zoom > 4) {
        zoom = 4
    }
    display()
}

const zoomIn = ()=>{
    zoom-=0.5
    if (zoom < 0.5) {
        zoom = 0.5
    }
    display()

}

document.getElementById("zoomIn").addEventListener("click", zoomIn)
document.getElementById("zoomOut").addEventListener("click", zoomOut)

export{
    zoom,
}