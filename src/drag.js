import { zoom } from "./zoom";
let codeSpace = document.getElementById('app')
let zoomSpace = document.getElementById('zoom')
const dragElement = (elmnt,dragOver,event=false)=>{
    //console.log("55")
    let offset;
    let dragMouseDown=(e)=>{
        if (e.target != elmnt && e.target.getAttribute('dragId') != elmnt.getAttribute('blockId')) {
            return true;
        }
        if (e.button == 2) {
            return true;
        }
        e = e || window.event;
        e.preventDefault();
        document.getElementById('screen').style.height = zoomSpace.scrollTop + zoomSpace.offsetHeight - 16  + 'px'
        document.getElementById('screen').style.width = zoomSpace.scrollLeft + zoomSpace.offsetWidth - 16 + 'px'

        offset = {
            y:e.clientY/ zoom - (elmnt.getBoundingClientRect().y + zoomSpace.scrollTop/ zoom),
            x:e.clientX/ zoom - (elmnt.getBoundingClientRect().x + zoomSpace.scrollLeft/ zoom),
        }

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    let elementDrag=(e)=> {
        e = e || window.event;
        e.preventDefault();
        elmnt.style.top = (e.clientY / zoom - offset.y) + "px";
        elmnt.style.left = (e.clientX / zoom - offset.x) + "px";  
    }
    let closeDragElement=()=> {
        document.onmouseup = null;
        document.onmousemove = null;
        //elmnt.onmousedown = null
        dragOver(elmnt.getAttribute('blockId'))
    }
    elmnt.onmousedown = dragMouseDown;
    if (event) {
        dragMouseDown(event)
    }
}

export {
    dragElement
}