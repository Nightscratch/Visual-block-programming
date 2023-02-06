(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function l(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=l(t);fetch(t.href,r)}})();let m=1;const R=()=>{document.getElementById("app").style.zoom=m},J=()=>{m+=.5,m>4&&(m=4),R()},P=()=>{m-=.5,m<.5&&(m=.5),R()};document.getElementById("zoomIn").addEventListener("click",P);document.getElementById("zoomOut").addEventListener("click",J);let X=document.getElementById("app"),$=document.getElementById("zoom");const D=(e,n,l=!1)=>{let o,t,r=u=>{if(u.target!=e&&u.target.getAttribute("dragId")!=e.getAttribute("blockId")||u.button==2)return!0;u=u||window.event,u.preventDefault(),X.appendChild(e),o=e.getAttribute("blockId"),document.getElementById("screen").style.height=$.scrollTop+$.offsetHeight-16+"px",document.getElementById("screen").style.width=$.scrollLeft+$.offsetWidth-16+"px",t={y:u.clientY/m-(e.getBoundingClientRect().y+$.scrollTop/m),x:u.clientX/m-(e.getBoundingClientRect().x+$.scrollLeft/m)},document.onmouseup=c,document.onmousemove=s},s=u=>{u=u||window.event,u.preventDefault(),e.style.top=u.clientY/m-t.y+"px",e.style.left=u.clientX/m-t.x+"px",n(o,!1)},c=()=>{document.onmouseup=null,document.onmousemove=null,n(o)};e.onmousedown=r,l&&r(l)},Y=`<div class="block-in" dragId="blockId">\r
    <div class="inline-block">\r
        <p dragId="blockId">Move(</p>\r
        <div class="input" prentId="blockId" inputId="arg1"></div>\r
        <p dragId="blockId">,</p>\r
        <div class="input" prentId="blockId" inputId="arg2"></div>\r
        <p dragId="blockId">)</p>\r
    </div>\r
</div>\r
\r
<div prentId="blockId" inputId="next"></div>`,Q={defaultInput:"next",topOnly:!1,html(e){return Y.replace(/blockId/g,e)},inputs(){return{arg1:{type:0,value:null},arg2:{type:0,value:null},next:{type:1,value:null}}},compiler(e,n){return`move(${e.arg1},${e.arg2});${e.next}`}},W=`<div class="block-in" dragId="blockId">\r
    <div class="inline-block">\r
        <p dragId="blockId">\u5982\u679C</p>\r
        <div class="input" prentId="blockId" inputId="condition1"></div>\r
    </div>\r
</div>\r
<div class="inline">\r
    <div class="column"></div>\r
    <div class="input-transparent" prentId="blockId" inputId="do1"></div>\r
</div>\r
<div class="block-in" dragId="blockId">\r
    <div class="inline-block">\r
        <img class="right" src="./images/back.svg" />\r
    </div>\r
</div>\r
\r
<div prentId="blockId" inputId="next"></div>`,_={defaultInput:"do1",topOnly:!1,html(e){return W.replace(/blockId/g,e)},inputs(){return{do1:{type:1,value:null},condition1:{type:0,value:null},next:{type:1,value:null}}},compiler(e,n){return`if (${e.condition1}){${e.do1}}${e.next}`}},G=`\r
<div class="block-in" dragId="blockId">\r
    <div class="inline-block">\r
        <p dragId="blockId">\u5F53\u7A0B\u5E8F\u542F\u52A8\u65F6</p>\r
    </div>\r
</div>\r
<div prentId="blockId" inputId="next"></div>`,U={isTopLevel:!0,defaultInput:"next",topOnly:!0,html(e){return G.replace(/blockId/g,e)},inputs(){return{next:{type:1,value:null}}},compiler(e,n){return`const start =()=>{${e.next}}`}},V=`<div class="block-in" dragId="blockId">\r
    <div class="inline-block report-only">\r
            <p dragId="blockId">\u6587\u672C</p>\r
        <div>\r
            <input type="text" id="input">\r
        </div>\r
    </div>\r
</div>`,Z={defaultInput:null,topOnly:!0,html(e){return V.replace(/blockId/g,e)},inputs(){return{}},compiler(e,n,l){return`"${l.querySelector('[id="input"]').value}"`},save:{toFile(e,n){return e.self.text=n.querySelector('[id="input"]').value,e}},load:{toJson(e){return delete e.self.text,e},changeDom(e,n){return n.querySelector('[id="input"]').value=e.self.text,n}}},ee=`<div class="block-in" dragId="blockId">\r
    <div class="inline-block report-only">\r
        <p dragId="blockId">\u6570\u5B57</p>\r
        <div>\r
            <input id="input" type="number">\r
        </div>\r
    </div>\r
</div>`,te={defaultInput:null,topOnly:!0,html(e){return ee.replace(/blockId/g,e)},inputs(){return{}},compiler(e,n,l){return`${l.querySelector('[id="input"]').value}`},save:{toFile(e,n){return e.self.number=n.querySelector('[id="input"]').value,e}},load:{toJson(e){return delete e.self.number,e},changeDom(e,n){return n.querySelector('[id="input"]').value=e.self.number,n}}},ne=`<div class="block-in" dragId="blockId">\r
    <div class="inline-block report-only" dragId="blockId">\r
        <p dragId="blockId">Arry(</p>\r
        <div id="inputs" class="inline">\r
\r
        </div>\r
        <p dragId="blockId">)</p>\r
        <button id="add">\u52A0</button>\r
        <button id="subtract">\u51CF</button>\r
    </div>\r
</div>\r
\r
<div prentId="blockId" inputId="next"></div>`,le=`\r
<div group="argId" class="inline">\r
    <div class="input" prentId="blockId" inputId="argId"></div>,\r
</div>`,oe={defaultInput:null,topOnly:!0,html(e){return ne.replace(/blockId/g,e)},inputs(){return{}},compiler(e,n){return`Math.abs(${e.arg});${e.next}`},load:{changeDom(e,n){let l=o=>{let t=document.createElement("template");t.innerHTML=le.replace(/argId/g,o).replace(/blockId/g,e.blockId),e.inputs[o]={type:0,value:null},n.querySelector('[id="inputs"]').appendChild(t.content)};for(let o in e.inputs)l(o);n.querySelector('[id="add"]').onclick=()=>{l(`item_${Object.keys(e.inputs).length+2}`)},n.querySelector('[id="subtract"]').onclick=()=>{let o=Object.keys(e.inputs);if(o.length>1){let t=e.inputs[o[o.length-1]];t.value&&H(t.value.data),n.querySelector(`[group="${o[o.length-1]}"]`).remove(),delete e.inputs[o[o.length-1]],console.log(e.inputs)}}}}},g={move:Q,ifelse:_,start:U,text:Z,number:te,equalTo:oe};function re(e){const n=new WeakMap;function l(t){return typeof t=="object"&&t||typeof t=="function"}function o(t){if(!l(t))return t;if([Date,RegExp].includes(t.constructor))return new t.constructor(t);if(typeof t=="function")return new Function("return "+t.toString())();const r=n.get(t);if(r)return r;if(t instanceof Map){const d=new Map;return n.set(t,d),t.forEach((a,f)=>{l(a)?d.set(f,o(a)):d.set(f,a)}),d}if(t instanceof Set){const d=new Set;return n.set(t,d),t.forEach(a=>{l(a)?d.add(o(a)):d.add(a)}),d}const s=Reflect.ownKeys(t),c=Object.getOwnPropertyDescriptors(t),u=Object.create(Object.getPrototypeOf(t),c);return n.set(t,u),s.forEach(d=>{const a=t[d];l(a)?u[d]=o(a):u[d]=a}),u}return o(e)}var O={};const j=(e,n)=>{let l=g[e.type],o={};for(const t in e.inputs){let r=e.inputs[t];r.value?o[t]=j(O[r.value.data],r.value.data):t=="next"?o[t]="":o[t]="null"}return l.compiler(o,e,document.querySelector(`[blockid="${n}"]`))},ie=e=>{O=e;let n="";for(const l in O){let o=O[l];g[o.type].isTopLevel&&(n+=j(o,l))}return n},ue=e=>{let n={};for(const l in e){let o=e[l],t=document.querySelector(`[blockid="${l}"]`);console.log(t);let r=g[o.type];r.save&&r.save.toFile?n[l]=r.save.toFile(o,t):n[l]=o,n[l].x=t.style.left,n[l].y=t.style.top}return n};let z={},M=[];const T=(e,n,l)=>{let o=n[e],t=g[o.type];t.load&&t.load.changeDom&&t.load.changeDom(o,l),l.style.left=o.x,l.style.top=o.y,delete o.x,delete o.y,t.load&&t.load.toJson&&t.load.toJson(o),z[e]=o;for(const r in o.inputs){let s=o.inputs[r];if(s.value){let c=se(n[s.value.data].type,s.value.data);M.push({selfBlockDom:c,selfBlockId:s.value.data,prentId:e,targetBlockInputIndex:r}),l.querySelector(`[inputid="${r}"]`).appendChild(T(s.value.data,n,c));debugger}}return l},de=(e,n)=>{document.getElementById("app").innerHTML="",z={};for(const l in e){console.log("sss",e[l]);const o=e[l];if(!o.prent){debugger;M=[],ae(T(l,e,x(o.type,!1,l)),M,l);debugger}}},w=20;var I=null,i={},C={},E=null,y=null;const ce=(e,n)=>{let l=e;if(!i[l].inputs[n])return e;for(;i[l].inputs[n].value;)l=i[l].inputs[n].value.data;return Number(l)},h=(e,n,l,o)=>{if(e.target.getAttribute("blockid")!=n&&e.target.getAttribute("dragId")!=n)return!0;if(e=e||window.e,e.preventDefault(),e.button==2)return null;delete i[n].prent;let t=I.querySelector(`[blockid="${n}"]`);i[l].inputs[o].value=null,t.style.top=v(t,"y")+"px",t.style.left=v(t,"x")+"px",t.setAttribute("class","block"),I.appendChild(t),D(t,B,e)},A=(e,n)=>{if(e=e||window.e,e.preventDefault(),e.target.getAttribute("blockid")!=n&&e.target.getAttribute("dragId")!=n)return null;E.style.display="block",E.style.top=e.clientY+5+"px",E.style.left=e.clientX+10+"px",C.open=!0,C.target={type:1,data:String(n)}},B=(e,n=!0)=>{n&&y.remove();let l=[],o=q(e);for(let r in i){let s=i[r];if(r!=e){for(const c in i[e].inputs){if(s.topOnly&&i[e].inputs[c].type==1||i[e].inputs[c].type!=1||i[r].prent||c!="next"&&i[e].inputs[c].value)continue;let u=q(r),d=document.querySelector(`[prentId="${e}"][inputId="${c}"]`),a=Math.abs(u.getBoundingClientRect().left-d.getBoundingClientRect().left),f=Math.abs(u.getBoundingClientRect().top-d.getBoundingClientRect().top),p=1;f<w&&a<w&&l.push({distance:a+f,targetBlockId:r,targetBlockDom:u,dragBlockInputId:c,type:p})}for(const c in s.inputs){if(!i[e].defaultInput&&s.inputs[c].type==1||i[e].topOnly&&s.inputs[c].type==1)continue;let u=document.querySelector(`[prentId="${r}"][inputId="${c}"]`),d=Math.abs(u.getBoundingClientRect().left-o.getBoundingClientRect().left),a=Math.abs(u.getBoundingClientRect().top-o.getBoundingClientRect().top);d<w&&a<w&&l.push({distance:d+a,targetBlockId:r,targetBlockInputIndex:c,targetBlockInputDom:u,type:0})}}}if(l.length==0)return y.remove(),null;l.sort((r,s)=>r.distance-s.distance);let t=l[0];if(t.type==0){let{targetBlockId:r,targetBlockInputIndex:s,targetBlockInputDom:c}=t;if(i[r].inputs[s].value){let u=i[r].inputs[s].value.data,d=q(u),a=ce(e,"next");if(s=="next"){let f=i[e].defaultInput;if(!n)return c.insertBefore(y,c.childNodes[0]),!0;f!="next"&&!i[e].inputs[f].value?(document.querySelector(`[prentId="${e}"][inputId="${f}"]`).appendChild(d),i[e].inputs[f].value={type:1,data:u},i[u].prent={inputId:f,blockId:e},d.onmousedown=p=>{h(p,u,e,f)}):(document.querySelector(`[prentId="${a}"][inputId="next"]`).appendChild(d),i[a].inputs.next.value={type:1,data:u},i[u].prent={inputId:"next",blockId:a},d.onmousedown=p=>{h(p,u,a,"next")})}else{if(i[u].defaultInput)if(i[e].defaultInput){if(!n)return c.insertBefore(y,c.childNodes[0]),!0;let f=i[e].defaultInput,p;f=="next"?p=a:i[e].inputs[f].value?(p=a,f="next"):p=e,document.querySelector(`[prentId="${p}"][inputId="${f}"]`).appendChild(d),i[p].inputs[f].value={data:u,type:1},i[u].prent={inputId:f,blockId:p},d.onmousedown=b=>{h(b,u,p,f)}}else{if(!n)return c.append(y),!0;d.style.top=v(d,"y")+20+"px",d.style.left=v(d,"x")+20+"px",I.appendChild(d),delete i[u].prent,d.setAttribute("class","block"),D(d,B)}else{if(!n)return c.append(y),!0;d.style.top=v(d,"y")+20+"px",d.style.left=v(d,"x")+20+"px",I.appendChild(d),delete i[u].prent,d.setAttribute("class","block"),D(d,B)}debugger}}debugger;if(!n)return c.append(y),!0;i[r].inputs[s].value={type:1,data:e},i[e].prent={blockId:r,inputId:s},c.appendChild(o),o.setAttribute("class","block-input"),o.onmousedown=u=>{h(u,e,r,s)}}else if(t.type==1){let{targetBlockId:r,targetBlockDom:s,dragBlockInputId:c}=t,u=document.querySelector(`[prentId="${e}"][inputId="${c}"]`);if(!n)return u.append(y),!0;u.append(s),i[r].prent={blockId:e,inputId:c},i[e].inputs[c].value={type:1,data:r},s.setAttribute("class","block-input"),s.onmousedown=d=>{h(d,r,e,c)}}return null},L=(e,n=Object.keys(i).length)=>{let l=document.createElement("div");return l.setAttribute("blockId",`${n}`),l.setAttribute("class","block"),l.innerHTML=g[e].html(n),l},se=(e,n=Object.keys(i).length)=>{let l=L(e,n);return l.setAttribute("class","input-block"),l},x=(e,n=!0,l)=>{let o;if(n?o=L(e):o=L(e,l),I.appendChild(o),n){D(o,B);let t=Object.keys(i).length;o.oncontextmenu=r=>{A(r,t)},i[t]={type:e,inputs:g[e].inputs(),blockId:t,defaultInput:g[e].defaultInput,topOnly:g[e].topOnly,self:{}},K(o,t,e)}return o},K=(e,n,l)=>{g[l].load&&g[l].load.changeDom&&g[l].load.changeDom(i[n],e)},F=e=>{let n=[];for(const l in i[e].inputs){let o=i[e].inputs[l];o.value&&o.value&&(n.push(o.value.data),n=n.concat(F(o.value.data)))}return n},H=e=>{q(e).remove(),i[e].prent&&(i[i[e].prent.blockId].inputs[i[e].prent.inputId].value=null);let n=F(e);for(const l of n)delete i[l];delete i[e]},v=(e,n)=>n=="x"?e.getBoundingClientRect().x+document.getElementById("zoom").scrollLeft/m:e.getBoundingClientRect().y+document.getElementById("zoom").scrollTop/m,pe=e=>{let n=F(e),l=Number(Object.keys(i)[Object.keys(i).length-1])+1;n.unshift(e);let o=document.querySelector(`[blockid="${e}"]`),t=o.cloneNode(!0);t.style.left=v(o,"x")+10+"px",t.style.top=v(o,"y")+10+"px",I.appendChild(t);for(const r of n){let s=i[r],c=re(s);g[s.type].save.toFile(c,t),i[String(Number(r)+l)]=c;let u=i[String(Number(r)+l)];document.createElement("div").appendChild(t.cloneNode(!0));let a=(p,b,k=()=>{})=>{let S=t.querySelectorAll(p)[0];S||(S=t),S.setAttribute(b,String(Number(r)+l)),k(S)},f=(p,b)=>{let k=t.querySelectorAll(p);for(let S of k)S.setAttribute(b,String(Number(r)+l))};u.prent&&(i[String(Number(r)+l)].prent.blockId=String(Number(i[String(Number(r)+l)].prent.blockId)+l)),a(`[blockid="${r}"]`,"blockid",p=>{let b=i[String(Number(r)+l)];r==e?(p.setAttribute("class","block"),D(p,B)):p.onmousedown=k=>{h(k,String(Number(r)+l),b.prent.blockId,b.prent.inputId)},K(p,String(Number(r)+l),b.type),p.oncontextmenu=k=>{A(k,String(Number(r)+l))}}),f(`[dragid="${r}"]`,"dragid");for(const p in u.inputs)f(`[prentid="${r}"][inputId="${p}"]`,"prentid"),u.inputs[p].value&&(u.inputs[p].value.data=String(Number(u.inputs[p].value.data)+l))}},ae=(e,n,l)=>{D(e,B),e.oncontextmenu=o=>{A(o,l)};for(const o of n)o.selfBlockDom.onmousedown=t=>{h(t,o.selfBlockId,o.prentId,o.targetBlockInputIndex)},o.selfBlockDom.oncontextmenu=t=>{A(t,o.selfBlockId)}},q=e=>document.querySelector(`[blockId="${e}"]`),N=()=>{E.style.display="none",C.open=!1},fe=e=>{E=document.getElementById("menu"),I=e,i={},C={},y=document.getElementById("porDom"),y.remove(),console.log(y),I.onmousedown=n=>{if(n.target.getAttribute("id")=="menuItem")return null;N()},document.getElementById("menuCopy").addEventListener("click",()=>{pe(C.target.data),N()}),document.getElementById("menuDelet").addEventListener("click",()=>{H(C.target.data),N()})},me=e=>{de(e)},ge=()=>ue(i),ye=()=>ie(i);fe(document.getElementById("app"));x("move");x("ifelse");x("start");x("text");x("equalTo");x("number");document.getElementById("compiler").addEventListener("click",()=>{console.log(ye())});document.getElementById("saveFile").addEventListener("click",()=>{alert("\u8BF7\u6309F12\u6253\u5F00\u63A7\u5236\u53F0\uFF0C\u67E5\u770B\u6587\u4EF6"),console.log("\u79EF\u6728\u6587\u4EF6",ge())});document.getElementById("loadFile").addEventListener("click",()=>{me(JSON.parse(prompt("\u6587\u4EF6json")))});
