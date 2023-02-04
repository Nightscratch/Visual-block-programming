(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function l(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=l(t);fetch(t.href,r)}})();let f=1;const M=()=>{document.getElementById("app").style.zoom=f},j=()=>{f+=.5,f>4&&(f=4),M()},z=()=>{f-=.5,f<.5&&(f=.5),M()};document.getElementById("zoomIn").addEventListener("click",z);document.getElementById("zoomOut").addEventListener("click",j);document.getElementById("app");let h=document.getElementById("zoom");const S=(e,n,l=!1)=>{let o,t=u=>{if(u.target!=e&&u.target.getAttribute("dragId")!=e.getAttribute("blockId")||u.button==2)return!0;u=u||window.event,u.preventDefault(),document.getElementById("screen").style.height=h.scrollTop+h.offsetHeight-16+"px",document.getElementById("screen").style.width=h.scrollLeft+h.offsetWidth-16+"px",o={y:u.clientY/f-(e.getBoundingClientRect().y+h.scrollTop/f),x:u.clientX/f-(e.getBoundingClientRect().x+h.scrollLeft/f)},document.onmouseup=d,document.onmousemove=r},r=u=>{u=u||window.event,u.preventDefault(),e.style.top=u.clientY/f-o.y+"px",e.style.left=u.clientX/f-o.x+"px"},d=()=>{document.onmouseup=null,document.onmousemove=null,n(e.getAttribute("blockId"))};e.onmousedown=t,l&&t(l)},J=`<div dragId="blockId">\r
    <div class="block-in">\r
        <div class="inline-block" dragId="blockId">\r
            <p dragId="blockId">Move(</p>\r
            <div class="input" prentId="blockId" inputId="arg1"></div>\r
            <p dragId="blockId">,</p>\r
            <div class="input" prentId="blockId" inputId="arg2"></div>\r
            <p dragId="blockId">)</p>\r
        </div>\r
    </div>\r
</div>\r
<div prentId="blockId" inputId="next"></div>`,K={isTopLevel:!1,defaultInput:"next",html(e){return J.replace(/blockId/g,e)},inputs(){return{arg1:{type:0,value:null},arg2:{type:0,value:null},next:{type:1,value:null}}},compiler(e,n){return`move(${e.arg1},${e.arg2});${e.next}`}},P=`<div>\r
    <div class="block-in">\r
        <div class="inline-block">\r
            <p dragId="blockId">\u5982\u679C</p>\r
            <div class="input" prentId="blockId" inputId="condition1"></div>\r
        </div>\r
    </div>\r
    <div class="inline">\r
        <div class="column"></div>\r
        <div class="input-transparent" prentId="blockId" inputId="do1"></div>\r
    </div>\r
    <div class="block-in">\r
        <div class="inline-block" dragId="blockId">\r
            <img class="right" src="./images/back.svg" />\r
        </div>\r
    </div>\r
</div>\r
<div prentId="blockId" inputId="next"></div>`,X={isTopLevel:!1,defaultInput:"do1",html(e){return P.replace(/blockId/g,e)},inputs(){return{do1:{type:1,value:null},condition1:{type:0,value:null},next:{type:1,value:null}}},compiler(e,n){return`if (${e.condition1}){${e.do1}}${e.next}`}},Y=`<div>\r
    <div class="block-in">\r
        <div class="inline-block" dragId="blockId">\r
            <p dragId="blockId">\u5F53\u7A0B\u5E8F\u542F\u52A8\u65F6</p>\r
        </div>\r
    </div>\r
</div>\r
<div prentId="blockId" inputId="next"></div>`,H={isTopLevel:!0,defaultInput:"next",html(e){return Y.replace(/blockId/g,e)},inputs(){return{next:{type:1,value:null}}},compiler(e,n){return`const start =()=>{${e.next}}`}},Q=`<div>\r
    <div class="block-in">\r
        <div class="inline-block report-only" dragId="blockId">\r
            <p dragId="blockId">\u6587\u672C</p>\r
            <div>\r
                <input type="text" id="input">\r
            </div>\r
        </div>\r
    </div>\r
</div>`,W={isTopLevel:!1,defaultInput:null,html(e){return Q.replace(/blockId/g,e)},inputs(){return{}},compiler(e,n,l){return`"${l.querySelector('[id="input"]').value}"`},save:{toFile(e,n){return e.text=n.querySelector('[id="input"]').value,e}},load:{toJson(e){return delete e.text,e},changeDom(e,n){return n.querySelector('[id="input"]').value=e.text,n}}},G=`<div>\r
    <div class="block-in">\r
        <div class="inline-block report-only" dragId="blockId">\r
            <p dragId="blockId">\u6570\u5B57</p>\r
            <div>\r
                <input id="input" type="number">\r
            </div>\r
        </div>\r
    </div>\r
</div>`,U={isTopLevel:!1,defaultInput:null,html(e){return G.replace(/blockId/g,e)},inputs(){return{}},compiler(e,n,l){return`${l.querySelector('[id="input"]').value}`},save:{toFile(e,n){return e.number=n.querySelector('[id="input"]').value,e}},load:{toJson(e){return delete e.number,e},changeDom(e,n){return n.querySelector('[id="input"]').value=e.number,n}}},V=`<div dragId="blockId">\r
    <div class="block-in">\r
        <div class="inline-block" dragId="blockId">\r
            <p dragId="blockId">abs(</p>\r
            <div class="input" prentId="blockId" inputId="arg"></div>\r
            <p dragId="blockId">)</p>\r
        </div>\r
    </div>\r
</div>\r
<div prentId="blockId" inputId="next"></div>`,Z={isTopLevel:!1,defaultInput:"next",html(e){return V.replace(/blockId/g,e)},inputs(){return{arg:{type:0,value:null},next:{type:1,value:null}}},compiler(e,n){return`Math.abs(${e.arg});${e.next}`}},g={move:K,ifelse:X,start:H,text:W,number:U,equalTo:Z};function _(e){const n=new WeakMap;function l(t){return typeof t=="object"&&t||typeof t=="function"}function o(t){if(!l(t))return t;if([Date,RegExp].includes(t.constructor))return new t.constructor(t);if(typeof t=="function")return new Function("return "+t.toString())();const r=n.get(t);if(r)return r;if(t instanceof Map){const s=new Map;return n.set(t,s),t.forEach((p,a)=>{l(p)?s.set(a,o(p)):s.set(a,p)}),s}if(t instanceof Set){const s=new Set;return n.set(t,s),t.forEach(p=>{l(p)?s.add(o(p)):s.add(p)}),s}const d=Reflect.ownKeys(t),u=Object.getOwnPropertyDescriptors(t),c=Object.create(Object.getPrototypeOf(t),u);return n.set(t,c),d.forEach(s=>{const p=t[s];l(p)?c[s]=o(p):c[s]=p}),c}return o(e)}var E={};const T=(e,n)=>{let l=g[e.type],o={};for(const t in e.inputs){let r=e.inputs[t];r.value?o[t]=T(E[r.value.data],r.value.data):t=="next"?o[t]="":o[t]="null"}return l.compiler(o,e,document.querySelector(`[blockid="${n}"]`))},ee=e=>{E=e;let n="";for(const l in E){let o=E[l];g[o.type].isTopLevel&&(n+=T(o,l))}return n},te=e=>{let n={};for(const l in e){let o=e[l],t=document.querySelector(`[blockid="${l}"]`);console.log(t);let r=g[o.type];r.save&&r.save.toFile?n[l]=r.save.toFile(o,t):n[l]=o,n[l].x=t.style.left,n[l].y=t.style.top}return n};let R={},L=[];const F=(e,n,l)=>{let o=n[e],t=g[o.type];t.load&&t.load.changeDom&&t.load.changeDom(o,l),l.style.left=o.x,l.style.top=o.y,delete o.x,delete o.y,t.load&&t.load.toJson&&t.load.toJson(o),R[e]=o;for(const r in o.inputs){let d=o.inputs[r];if(d.value){let u=oe(n[d.value.data].type,d.value.data);L.push({selfBlockDom:u,selfBlockId:d.value.data,prentId:e,targetBlockInputIndex:r}),l.querySelector(`[inputid="${r}"]`).appendChild(F(d.value.data,n,u));debugger}}return l},ne=(e,n)=>{document.getElementById("app").innerHTML="",R={};for(const l in e){console.log("sss",e[l]);const o=e[l];if(!o.prent){debugger;L=[],ue(F(l,e,y(o.type,!1,l)),L,l);debugger}}},C=20;var b=null,i={},B={},D=null;const le=(e,n)=>{let l=e;if(!i[l].inputs[n])return e;for(;i[l].inputs[n].value;)l=i[l].inputs[n].value.data;return Number(l)},x=(e,n,l,o)=>{if(e.target.getAttribute("blockid")!=n&&e.target.getAttribute("dragId")!=n)return!0;if(e=e||window.e,e.preventDefault(),e.button==2)return null;delete i[n].prent;let t=b.querySelector(`[blockid="${n}"]`);i[l].inputs[o].value=null,t.style.top=v(t,"y")+"px",t.style.left=v(t,"x")+"px",t.setAttribute("class","block"),b.appendChild(t),S(t,$,e)},A=(e,n)=>{if(e=e||window.e,e.preventDefault(),e.target.getAttribute("blockid")!=n&&e.target.getAttribute("dragId")!=n)return null;D.style.display="block",D.style.top=e.clientY+5+"px",D.style.left=e.clientX+10+"px",B.open=!0,B.target={type:1,data:String(n)}},$=e=>{let n=[],l=w(e);for(let t in i){let r=i[t];if(!(t==e||!r.defaultInput)){for(const d in i[e].inputs)if(i[e].inputs[d].type==1&&!i[t].prent){let u=w(t),c=document.querySelector(`[prentId="${e}"][inputId="${d}"]`),s=Math.abs(u.getBoundingClientRect().left-c.getBoundingClientRect().left),p=Math.abs(u.getBoundingClientRect().top-c.getBoundingClientRect().top),a=1;p<C&&s<C&&n.push({distance:s+p,targetBlockId:t,targetBlockDom:u,dragBlockInputId:d,type:a})}for(const d in r.inputs){if(!i[e].defaultInput&&r.inputs[d].type==1)continue;let u=document.querySelector(`[prentId="${t}"][inputId="${d}"]`),c=Math.abs(u.getBoundingClientRect().left-l.getBoundingClientRect().left),s=Math.abs(u.getBoundingClientRect().top-l.getBoundingClientRect().top);c<C&&s<C&&n.push({distance:c+s,targetBlockId:t,targetBlockInputIndex:d,targetBlockInputDom:u,type:0})}}}if(n.length==0)return null;n.sort((t,r)=>t.distance-r.distance);let o=n[0];debugger;if(o.type==0){let{targetBlockId:t,targetBlockInputIndex:r,targetBlockInputDom:d}=o;if(i[t].inputs[r].value){let u=i[t].inputs[r].value.data,c=w(u),s=le(e,"next");if(r=="next"){let a=i[e].defaultInput;document.querySelector(`[prentId="${s}"][inputId="${a}"]`).appendChild(c),i[s].inputs[a].value={data:u,type:1},i[t].inputs[r].value=null,i[u].prent={inputId:r,blockId:s},c.onmousedown=m=>{x(m,u,s,r)}}else if(i[u].defaultInput)if(i[e].defaultInput){let p="next";document.querySelector(`[prentId="${s}"][inputId="${p}"]`).appendChild(c),i[s].inputs[p].value={data:u,type:1},i[u].prent={inputId:p,blockId:s},c.onmousedown=a=>{x(a,u,s,p)}}else c.style.top=v(c,"y")+20+"px",c.style.left=v(c,"x")+20+"px",b.appendChild(c),delete i[u].prent,c.setAttribute("class","block"),S(c,$);else c.style.top=v(c,"y")+20+"px",c.style.left=v(c,"x")+20+"px",b.appendChild(c),delete i[u].prent,c.setAttribute("class","block"),S(c,$)}i[t].inputs[r].value={type:1,data:e},i[e].prent={blockId:t,inputId:r},d.appendChild(l),l.setAttribute("class","block-input"),l.onmousedown=u=>{x(u,e,t,r)}}else if(o.type==1){let{targetBlockId:t,targetBlockDom:r,dragBlockInputId:d}=o;document.querySelector(`[prentId="${e}"][inputId="${d}"]`).append(r),i[t].prent={blockId:e,inputId:d},i[e].inputs[d].value={type:1,data:t},r.setAttribute("class","block-input"),r.onmousedown=c=>{x(c,t,e,d)}}return null},N=(e,n=Object.keys(i).length)=>{let l=document.createElement("div");return l.setAttribute("blockId",`${n}`),l.setAttribute("class","block"),l.innerHTML=g[e].html(n),l},oe=(e,n=Object.keys(i).length)=>{let l=N(e,n);return l.setAttribute("class","input-block"),l},y=(e,n=!0,l)=>{let o;if(n?o=N(e):o=N(e,l),b.appendChild(o),n){S(o,$);let t=Object.keys(i).length;o.oncontextmenu=r=>{A(r,t)},i[t]={type:e,inputs:g[e].inputs(),isTopLevel:g[e].isTopLevel,defaultInput:g[e].defaultInput}}return o},O=e=>{let n=[];for(const l in i[e].inputs){let o=i[e].inputs[l];o.value&&o.value&&(n.push(o.value.data),n=n.concat(O(o.value.data)))}return n},re=e=>{w(e).remove(),i[e].prent&&(i[i[e].prent.blockId].inputs[i[e].prent.inputId].value=null);let n=O(e);for(const l of n)delete i[l];delete i[e]},v=(e,n)=>n=="x"?e.getBoundingClientRect().x+document.getElementById("zoom").scrollLeft/f:e.getBoundingClientRect().y+document.getElementById("zoom").scrollTop/f,ie=e=>{let n=O(e),l=Number(Object.keys(i)[Object.keys(i).length-1])+1;n.unshift(e);let o=document.querySelector(`[blockid="${e}"]`),t=o.cloneNode(!0);t.style.left=v(o,"x")+10+"px",t.style.top=v(o,"y")+10+"px",b.appendChild(t);for(const r of n){let d=i[r];i[String(Number(r)+l)]=_(d);let u=i[String(Number(r)+l)];document.createElement("div").appendChild(t.cloneNode(!0));let s=(a,m,I=()=>{})=>{let k=t.querySelectorAll(a)[0];k||(k=t),k.setAttribute(m,String(Number(r)+l)),I(k)},p=(a,m)=>{let I=t.querySelectorAll(a);for(let k of I)k.setAttribute(m,String(Number(r)+l))};u.prent&&(i[String(Number(r)+l)].prent.blockId=String(Number(i[String(Number(r)+l)].prent.blockId)+l)),s(`[blockid="${r}"]`,"blockid",a=>{let m=i[String(Number(r)+l)];r==e?(a.setAttribute("class","block"),S(a,$)):a.onmousedown=I=>{x(I,String(Number(r)+l),m.prent.blockId,m.prent.inputId)},a.oncontextmenu=I=>{A(I,String(Number(r)+l))}}),p(`[dragid="${r}"]`,"dragid");for(const a in u.inputs)p(`[prentid="${r}"][inputId="${a}"]`,"prentid"),u.inputs[a].value&&(u.inputs[a].value.data=String(Number(u.inputs[a].value.data)+l))}},ue=(e,n,l)=>{S(e,$),e.oncontextmenu=o=>{A(o,l)};for(const o of n)o.selfBlockDom.onmousedown=t=>{x(t,o.selfBlockId,o.prentId,o.targetBlockInputIndex)},o.selfBlockDom.oncontextmenu=t=>{A(t,o.selfBlockId)}},w=e=>document.querySelector(`[blockId="${e}"]`),q=()=>{D.style.display="none",B.open=!1},ce=e=>{D=document.getElementById("menu"),b=e,i={},B={},b.onmousedown=n=>{if(n.target.getAttribute("id")=="menuItem")return null;q()},document.getElementById("menuCopy").addEventListener("click",()=>{ie(B.target.data),q()}),document.getElementById("menuDelet").addEventListener("click",()=>{re(B.target.data),q()})},de=e=>{ne(e)},se=()=>{te(i)},pe=()=>ee(i);ce(document.getElementById("app"));y("move");y("ifelse");y("start");y("text");y("equalTo");y("number");document.getElementById("compiler").addEventListener("click",()=>{console.log(pe())});document.getElementById("saveFile").addEventListener("click",()=>{console.log(se())});document.getElementById("loadFile").addEventListener("click",()=>{de(JSON.parse(prompt("\u6587\u4EF6json")))});