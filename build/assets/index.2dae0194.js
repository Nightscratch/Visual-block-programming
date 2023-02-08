(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function l(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=l(n);fetch(n.href,o)}})();let g=1;const F=()=>{document.getElementById("app").style.zoom=g},P=()=>{g+=.5,g>4&&(g=4),F()},X=()=>{g-=.5,g<.5&&(g=.5),F()};document.getElementById("zoomIn").addEventListener("click",X);document.getElementById("zoomOut").addEventListener("click",P);let Y=document.getElementById("app"),S=document.getElementById("zoom");const B=(e,t,l=!1)=>{let r,n,o=d=>{if(d.target!=e&&d.target.getAttribute("dragId")!=e.getAttribute("blockId")||d.button==2)return!0;d=d||window.event,d.preventDefault(),Y.appendChild(e),r=e.getAttribute("blockId"),document.getElementById("screen").style.height=S.scrollTop+S.offsetHeight-16+"px",document.getElementById("screen").style.width=S.scrollLeft+S.offsetWidth-16+"px",n={y:d.clientY/g-(e.getBoundingClientRect().y+S.scrollTop/g),x:d.clientX/g-(e.getBoundingClientRect().x+S.scrollLeft/g)},document.onmouseup=s,document.onmousemove=i},i=d=>{d=d||window.event,d.preventDefault(),e.style.top=d.clientY/g-n.y+"px",e.style.left=d.clientX/g-n.x+"px",t(r,!1)},s=()=>{document.onmouseup=null,document.onmousemove=null,t(r)};e.onmousedown=o,l&&o(l)},Q=`<div class="block-in" dragId="blockId">\r
    <div class="inline-block">\r
        <p dragId="blockId">Move(</p>\r
        <div class="input" prentId="blockId" inputId="arg1"></div>\r
        <p dragId="blockId">,</p>\r
        <div class="input" prentId="blockId" inputId="arg2"></div>\r
        <p dragId="blockId">)</p>\r
    </div>\r
</div>\r
\r
<div prentId="blockId" inputId="next"></div>`,W={defaultInput:"next",topOnly:!1,html(e){return Q.replace(/blockId/g,e)},inputs(){return{arg1:{type:0,value:null},arg2:{type:0,value:null},next:{type:1,value:null}}},compiler(e,t,l){return`move(${e.arg1},${e.arg2});${e.next}`}},J=`<div class="block-in" dragId="blockId">\r
    <div class="inline-block" dragId="blockId">\r
        <p dragId="blockId">\u5982\u679C</p>\r
        <div class="input" prentId="blockId" inputId="condition1"></div>\r
    </div>\r
</div>\r
<div class="inline">\r
    <div class="column"></div>\r
    <div class="input-transparent" prentId="blockId" inputId="do1"></div>\r
</div>\r
<div class="block-in" dragId="blockId">\r
    <div class="inline-block" dragId="blockId">\r
        <img class="right" src="./images/back.svg" />\r
    </div>\r
</div>\r
\r
<div prentId="blockId" inputId="next"></div>`,_={defaultInput:"do1",topOnly:!1,html(e){return J.replace(/blockId/g,e)},inputs(){return{do1:{type:1,value:null},condition1:{type:0,value:null},next:{type:1,value:null}}},compiler(e,t){return`if (${e.condition1}){${e.do1}}${e.next}`}},G=`\r
<div class="block-in">\r
    <div class="inline-block top-level" dragId="blockId">\r
        <p dragId="blockId">\u5F53\u7A0B\u5E8F\u542F\u52A8\u65F6</p>\r
    </div>\r
</div>\r
<div prentId="blockId" inputId="next"></div>`,U={isTopLevel:!0,defaultInput:"next",topOnly:!0,html(e){return G.replace(/blockId/g,e)},inputs(){return{next:{type:1,value:null}}},compiler(e,t){return`const start =()=>{${e.next}}`}},V=`<div class="block-in">\r
    <div class="inline-block report-only" dragId="blockId">\r
            <p dragId="blockId">\u6587\u672C</p>\r
        <div>\r
            <input type="text" id="input">\r
        </div>\r
    </div>\r
</div>`,Z={defaultInput:null,topOnly:!0,html(e){return V.replace(/blockId/g,e)},inputs(){return{}},initialSelfData:{text:"\u9ED8\u8BA4\u6587\u672C"},compiler(e,t,l){return`"${l.querySelector('[id="input"]').value}"`},save:{toFile(e,t){return e.self.text=t.querySelector('[id="input"]').value,e}},load:{initDom(e,t){return t.querySelector('[id="input"]').value=e.self.text,t}}},ee=`<div class="block-in">\r
    <div class="inline-block report-only"  dragId="blockId">\r
        <p dragId="blockId">\u6570\u5B57</p>\r
        <div>\r
            <input id="input" type="number">\r
        </div>\r
    </div>\r
</div>`,te={defaultInput:null,topOnly:!0,html(e){return ee.replace(/blockId/g,e)},inputs(){return{}},compiler(e,t,l){return`${l.querySelector('[id="input"]').value}`},initialSelfData:{number:123456},save:{toFile(e,t){return e.self.number=t.querySelector('[id="input"]').value,e}},load:{initDom(e,t){return t.querySelector('[id="input"]').value=e.self.number,t}}},ne=`<div class="block-in" dragId="blockId">\r
    <div class="inline-block report-only" dragId="blockId">\r
        <p dragId="blockId">Array[</p>\r
        <div id="inputs" group="blockId" class="inline">\r
\r
        </div>\r
        <p dragId="blockId">]</p>\r
        <button id="add" prentId="blockId">\u52A0</button>\r
        <button id="subtract" prentId="blockId">\u51CF</button>\r
    </div>\r
</div>\r
\r
<div prentId="blockId" inputId="next"></div>`,le=`\r
\r
<div group="argId" prentId="blockId">\r
    <div class="input" prentId="blockId" inputId="argId"></div>, \r
</div>`,oe={defaultInput:null,topOnly:!0,html(e){return ne.replace(/blockId/g,e)},inputs(){return{}},compiler(e,t){let l="";for(const r in e)l+=e[r]+",";return`[${l}]`},load:{initDom(e,t,l,r){let n=(i,s=!0)=>{let d=document.createElement("template");d.innerHTML=le.replace(/argId/g,i).replace(/blockId/g,l),s&&(e.inputs[i]={type:0,value:null}),t.querySelector('[id="inputs"]').appendChild(d.content)},o=()=>{let i=Object.keys(e.inputs);if(i.length>0){let s=e.inputs[i[i.length-1]];s.value&&K(s.value.data),t.querySelector(`[group="${i[i.length-1]}"][prentId="${l}"]`).remove(),delete e.inputs[i[i.length-1]]}};if(r){debugger;t.querySelector('[id="inputs"]').innerHTML="";for(let i in e.inputs)n(i,!1)}t.querySelector('[id="add"]').onclick=()=>{n(`item_${Object.keys(e.inputs).length+1}`)},t.querySelector('[id="subtract"]').onclick=i=>{o()}}}},m={move:W,ifelse:_,start:U,text:Z,number:te,equalTo:oe};function re(e){const t=new WeakMap;function l(n){return typeof n=="object"&&n||typeof n=="function"}function r(n){if(!l(n))return n;if([Date,RegExp].includes(n.constructor))return new n.constructor(n);if(typeof n=="function")return new Function("return "+n.toString())();const o=t.get(n);if(o)return o;if(n instanceof Map){const c=new Map;return t.set(n,c),n.forEach((f,a)=>{l(f)?c.set(a,r(f)):c.set(a,f)}),c}if(n instanceof Set){const c=new Set;return t.set(n,c),n.forEach(f=>{l(f)?c.add(r(f)):c.add(f)}),c}const i=Reflect.ownKeys(n),s=Object.getOwnPropertyDescriptors(n),d=Object.create(Object.getPrototypeOf(n),s);return t.set(n,d),i.forEach(c=>{const f=n[c];l(f)?d[c]=r(f):d[c]=f}),d}return r(e)}var E={};const j=(e,t,l)=>{let r=m[e.type],n={};for(const o in e.inputs){let i=e.inputs[o];i.value?(n[o]=j(E[i.value.data],i.value.data,i.type==0),i.value&&E[i.value.data].defaultInput&&i.type==0&&(n[o]=`()=>{${n[o]}}`)):o=="next"?n[o]="":n[o]="null"}return r.compiler(n,e,document.querySelector(`[blockid="${t}"]`),l)},ie=e=>{E=e;let t="";for(const l in E){let r=E[l];m[r.type].isTopLevel&&(t+=j(r,l,!1))}return t},ue=e=>{let t={};for(const l in e){let r=e[l],n=document.querySelector(`[blockid="${l}"]`);console.log(n);let o=m[r.type];o.save&&o.save.toFile?t[l]=o.save.toFile(r,n):t[l]=r,t[l].x=n.style.left,t[l].y=n.style.top}return t};let T={},M=[];const z=(e,t,l)=>{let r=t[e],n=m[r.type];l.style.left=r.x,l.style.top=r.y,delete r.x,delete r.y,T[e]=r,n.load&&n.load.initDom&&n.load.initDom(r,l,e,!0);for(const o in r.inputs){let i=r.inputs[o];if(i.value){let s=se(t[i.value.data].type,i.value.data);M.push({selfBlockDom:s,selfBlockId:i.value.data,prentId:e,targetBlockInputIndex:o}),l.querySelector(`[inputid="${o}"]`).appendChild(z(i.value.data,t,s));debugger}}return l},de=(e,t)=>{document.getElementById("app").innerHTML="",T={};for(const l in e){console.log("sss",e[l]);const r=e[l];if(!r.prent){debugger;M=[],ae(z(l,e,h(r.type,!1,l)),M,l);debugger}}},O=20;var v=null,u={},D={},w=null,y=null;const ce=(e,t)=>{let l=e;if(!u[l].inputs[t])return e;for(;u[l].inputs[t].value;)l=u[l].inputs[t].value.data;return Number(l)},$=(e,t,l,r)=>{if(e.target.getAttribute("blockid")!=t&&e.target.getAttribute("dragId")!=t)return!0;if(e=e||window.e,e.preventDefault(),e.button==2)return null;delete u[t].prent;let n=v.querySelector(`[blockid="${t}"]`);u[l].inputs[r].value=null,n.style.top=I(n,"y")+"px",n.style.left=I(n,"x")+"px",n.setAttribute("class","block"),v.appendChild(n),B(n,C,e)},A=(e,t)=>{if(e=e||window.e,e.preventDefault(),e.target.getAttribute("blockid")!=t&&e.target.getAttribute("dragId")!=t)return null;w.style.display="block",w.style.top=e.clientY+5+"px",w.style.left=e.clientX+10+"px",D.open=!0,D.target={type:1,data:String(t)}},C=(e,t=!0)=>{t&&y.remove();let l=[],r=q(e);for(let o in u){let i=u[o];if(o!=e){for(const s in u[e].inputs){if(i.topOnly&&u[e].inputs[s].type==1||u[e].inputs[s].type!=1||u[o].prent||s!="next"&&u[e].inputs[s].value)continue;let d=q(o),c=document.querySelector(`[prentId="${e}"][inputId="${s}"]`),f=Math.abs(d.getBoundingClientRect().left-c.getBoundingClientRect().left),a=Math.abs(d.getBoundingClientRect().top-c.getBoundingClientRect().top),p=1;a<O&&f<O&&l.push({distance:f+a,targetBlockId:o,targetBlockDom:d,dragBlockInputId:s,type:p})}for(const s in i.inputs){if(!u[e].defaultInput&&i.inputs[s].type==1||u[e].topOnly&&i.inputs[s].type==1)continue;let d=document.querySelector(`[prentId="${o}"][inputId="${s}"]`),c=Math.abs(d.getBoundingClientRect().left-r.getBoundingClientRect().left),f=Math.abs(d.getBoundingClientRect().top-r.getBoundingClientRect().top);c<O&&f<O&&l.push({distance:c+f,targetBlockId:o,targetBlockInputIndex:s,targetBlockInputDom:d,type:0})}}}if(l.length==0)return y.remove(),null;l.sort((o,i)=>o.distance-i.distance);let n=l[0];if(n.type==0){let{targetBlockId:o,targetBlockInputIndex:i,targetBlockInputDom:s}=n;if(u[o].inputs[i].value){let d=u[o].inputs[i].value.data,c=q(d),f=ce(e,"next");if(i=="next"){let a=u[e].defaultInput;if(!t)return s.insertBefore(y,s.childNodes[0]),!0;let p;a!="next"&&!u[e].inputs[a].value?p=e:(a="next",p=f),document.querySelector(`[prentId="${p}"][inputId="${a}"]`).appendChild(c),u[p].inputs[a].value={type:1,data:d},u[d].prent={inputId:a,blockId:p},c.onmousedown=b=>{$(b,d,f,a)}}else{if(u[d].defaultInput)if(u[e].defaultInput){if(!t)return s.insertBefore(y,s.childNodes[0]),!0;let a=u[e].defaultInput,p;a=="next"?p=f:u[e].inputs[a].value?(p=f,a="next"):p=e,document.querySelector(`[prentId="${p}"][inputId="${a}"]`).appendChild(c),u[p].inputs[a].value={data:d,type:1},u[d].prent={inputId:a,blockId:p},c.onmousedown=b=>{$(b,d,p,a)}}else{if(!t)return s.append(y),!0;c.style.top=I(c,"y")+20+"px",c.style.left=I(c,"x")+20+"px",v.appendChild(c),delete u[d].prent,c.setAttribute("class","block"),B(c,C)}else{if(!t)return s.append(y),!0;c.style.top=I(c,"y")+20+"px",c.style.left=I(c,"x")+20+"px",v.appendChild(c),delete u[d].prent,c.setAttribute("class","block"),B(c,C)}debugger}}debugger;if(!t)return s.append(y),!0;u[o].inputs[i].value={type:1,data:e},u[e].prent={blockId:o,inputId:i},s.appendChild(r),r.setAttribute("class","block-input"),r.onmousedown=d=>{$(d,e,o,i)}}else if(n.type==1){let{targetBlockId:o,targetBlockDom:i,dragBlockInputId:s}=n,d=document.querySelector(`[prentId="${e}"][inputId="${s}"]`);if(!t)return d.append(y),!0;d.append(i),u[o].prent={blockId:e,inputId:s},u[e].inputs[s].value={type:1,data:o},i.setAttribute("class","block-input"),i.onmousedown=c=>{$(c,o,e,s)}}return null},L=(e,t=Object.keys(u).length)=>{let l=document.createElement("div");return l.setAttribute("blockId",`${t}`),l.setAttribute("class","block"),l.innerHTML=m[e].html(t),l},se=(e,t=Object.keys(u).length)=>{let l=L(e,t);return l.setAttribute("class","input-block"),l},h=(e,t=!0,l)=>{let r;if(t?r=L(e):r=L(e,l),v.appendChild(r),t){B(r,C);let n=Object.keys(u).length;r.oncontextmenu=o=>{A(o,n)},u[n]={type:e,inputs:m[e].inputs(),defaultInput:m[e].defaultInput,topOnly:m[e].topOnly},m[e].initialSelfData?u[n].self=m[e].initialSelfData:u[n].self={},H(r,n,e)}return r},H=(e,t,l)=>{m[l].load&&m[l].load.initDom&&m[l].load.initDom(u[t],e,t,!1)},R=e=>{let t=[];for(const l in u[e].inputs){let r=u[e].inputs[l];r.value&&r.value&&(t.push(r.value.data),t=t.concat(R(r.value.data)))}return t},K=e=>{q(e).remove(),u[e].prent&&(u[u[e].prent.blockId].inputs[u[e].prent.inputId].value=null);let t=R(e);for(const l of t)delete u[l];delete u[e]},I=(e,t)=>t=="x"?e.getBoundingClientRect().x-v.getBoundingClientRect().x+document.getElementById("zoom").scrollLeft/g:e.getBoundingClientRect().y-v.getBoundingClientRect().y+document.getElementById("zoom").scrollTop/g,pe=e=>{let t=R(e),l=Number(Object.keys(u)[Object.keys(u).length-1])+1;t.unshift(e);let r=document.querySelector(`[blockid="${e}"]`),n=r.cloneNode(!0);n.style.left=I(r,"x")+10+"px",n.style.top=I(r,"y")+10+"px",v.appendChild(n);for(const o of t){let i=u[o],s=re(i);u[String(Number(o)+l)]=s,m[i.type].save&&m[i.type].save.toFile&&m[i.type].save.toFile(s,n);let d=u[String(Number(o)+l)];document.createElement("div").appendChild(n.cloneNode(!0));let f=(p,b,k=()=>{})=>{let x=n.querySelectorAll(p)[0];x||(x=n),x.setAttribute(b,String(Number(o)+l)),k(x)},a=(p,b)=>{let k=n.querySelectorAll(p);for(let x of k)x.setAttribute(b,String(Number(o)+l))};d.prent&&(u[String(Number(o)+l)].prent.blockId=String(Number(u[String(Number(o)+l)].prent.blockId)+l)),f(`[blockid="${o}"]`,"blockid",p=>{debugger;let b=u[String(Number(o)+l)];o==e?(p.setAttribute("class","block"),B(p,C)):p.onmousedown=k=>{$(k,String(Number(o)+l),b.prent.blockId,b.prent.inputId)},H(p,String(Number(o)+l),b.type),p.oncontextmenu=k=>{A(k,String(Number(o)+l))}}),a(`[dragid="${o}"]`,"dragid");for(const p in d.inputs)a(`[prentid="${o}"][inputId="${p}"]`,"prentid"),a(`[prentid="${o}"][group="${p}"]`,"prentid"),d.inputs[p].value&&(d.inputs[p].value.data=String(Number(d.inputs[p].value.data)+l))}},ae=(e,t,l)=>{B(e,C),e.oncontextmenu=r=>{A(r,l)};for(const r of t)r.selfBlockDom.onmousedown=n=>{$(n,r.selfBlockId,r.prentId,r.targetBlockInputIndex)},r.selfBlockDom.oncontextmenu=n=>{A(n,r.selfBlockId)}},q=e=>document.querySelector(`[blockId="${e}"]`),N=()=>{w.style.display="none",D.open=!1},fe=e=>{w=document.getElementById("menu"),v=e,u={},D={},y=document.getElementById("porDom"),y.remove(),v.onmousedown=t=>{if(t.target.getAttribute("id")=="menuItem")return null;N()},document.getElementById("menuCopy").addEventListener("click",()=>{pe(D.target.data),N()}),document.getElementById("menuDelet").addEventListener("click",()=>{K(D.target.data),N()})},me=e=>{de(e)},ge=()=>ue(u),be=()=>ie(u);fe(document.getElementById("app"));h("move");h("ifelse");h("start");h("text");h("equalTo");h("number");document.getElementById("compiler").addEventListener("click",()=>{console.log(be())});document.getElementById("saveFile").addEventListener("click",()=>{alert("\u8BF7\u6309F12\u6253\u5F00\u63A7\u5236\u53F0\uFF0C\u67E5\u770B\u6587\u4EF6"),console.log("\u79EF\u6728\u6587\u4EF6",ge())});document.getElementById("loadFile").addEventListener("click",()=>{me(JSON.parse(prompt("\u6587\u4EF6json")))});
