"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});let b=1;const z=()=>{document.getElementById("app").style.zoom=b},Y=()=>{b+=.5,b>4&&(b=4),z()},Q=()=>{b-=.5,b<.5&&(b=.5),z()};document.getElementById("zoomIn").addEventListener("click",Q);document.getElementById("zoomOut").addEventListener("click",Y);const W=Object.freeze(Object.defineProperty({__proto__:null,get zoom(){return b}},Symbol.toStringTag,{value:"Module"}));let G=document.getElementById("app"),$=document.getElementById("zoom");const C=(e,t,n=!1)=>{let o,l,i=u=>{if(u.target!=e&&u.target.getAttribute("dragId")!=e.getAttribute("blockId")||u.button==2)return!0;u=u||window.event,u.preventDefault(),G.appendChild(e),o=e.getAttribute("blockId"),document.getElementById("screen").style.height=$.scrollTop+$.offsetHeight-16+"px",document.getElementById("screen").style.width=$.scrollLeft+$.offsetWidth-16+"px",l={y:u.clientY/b-(e.getBoundingClientRect().y+$.scrollTop/b),x:u.clientX/b-(e.getBoundingClientRect().x+$.scrollLeft/b)},document.onmouseup=s,document.onmousemove=d},d=u=>{u=u||window.event,u.preventDefault(),e.style.top=u.clientY/b-l.y+"px",e.style.left=u.clientX/b-l.x+"px",t(o,!1)},s=()=>{document.onmouseup=null,document.onmousemove=null,t(o)};e.onmousedown=i,n&&i(n)},J=`<div class="block-in" dragId="blockId">\r
    <div class="inline-block">\r
        <p dragId="blockId">Move(</p>\r
        <div class="input" prentId="blockId" inputId="arg1"></div>\r
        <p dragId="blockId">,</p>\r
        <div class="input" prentId="blockId" inputId="arg2"></div>\r
        <p dragId="blockId">)</p>\r
    </div>\r
</div>\r
\r
<div prentId="blockId" inputId="next"></div>`,U={defaultInput:"next",topOnly:!1,html(e){return J.replace(/blockId/g,e)},inputs(){return{arg1:{type:0,value:null},arg2:{type:0,value:null},next:{type:1,value:null}}},compiler(e,t){return`move(${e.arg1},${e.arg2});${e.next}`}},V=`<div class="block-in" dragId="blockId">\r
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
<div prentId="blockId" inputId="next"></div>`,Z={defaultInput:"do1",topOnly:!1,html(e){return V.replace(/blockId/g,e)},inputs(){return{do1:{type:1,value:null},condition1:{type:0,value:null},next:{type:1,value:null}}},compiler(e,t){return`if (${e.condition1}){${e.do1}}${e.next}`}},ee=`\r
<div class="block-in">\r
    <div class="inline-block top-level" dragId="blockId">\r
        <p dragId="blockId">\u5F53\u7A0B\u5E8F\u542F\u52A8\u65F6</p>\r
    </div>\r
</div>\r
<div prentId="blockId" inputId="next"></div>`,te={isTopLevel:!0,defaultInput:"next",topOnly:!0,html(e){return ee.replace(/blockId/g,e)},inputs(){return{next:{type:1,value:null}}},compiler(e,t){return`const start =()=>{${e.next}}`}},ne=`<div class="block-in">\r
    <div class="inline-block report-only" dragId="blockId">\r
            <p dragId="blockId">\u6587\u672C</p>\r
        <div>\r
            <input type="text" id="input">\r
        </div>\r
    </div>\r
</div>`,le={defaultInput:null,topOnly:!0,html(e){return ne.replace(/blockId/g,e)},inputs(){return{}},initialSelfData:{text:"\u9ED8\u8BA4\u6587\u672C"},compiler(e,t,n){return`"${n.querySelector('[id="input"]').value}"`},save:{toFile(e,t){return e.self.text=t.querySelector('[id="input"]').value,e}},load:{initDom(e,t){return t.querySelector('[id="input"]').value=e.self.text,t}}},oe=`<div class="block-in">\r
    <div class="inline-block report-only"  dragId="blockId">\r
        <p dragId="blockId">\u6570\u5B57</p>\r
        <div>\r
            <input id="input" type="number">\r
        </div>\r
    </div>\r
</div>`,re={defaultInput:null,topOnly:!0,html(e){return oe.replace(/blockId/g,e)},inputs(){return{}},compiler(e,t,n){return`${n.querySelector('[id="input"]').value}`},initialSelfData:{number:123456},save:{toFile(e,t){return e.self.number=t.querySelector('[id="input"]').value,e}},load:{initDom(e,t){return t.querySelector('[id="input"]').value=e.self.number,t}}},ie=`<div class="block-in" dragId="blockId">\r
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
<div prentId="blockId" inputId="next"></div>`,ue=`\r
\r
<div group="argId" prentId="blockId">\r
    <div class="input" prentId="blockId" inputId="argId"></div>, \r
</div>`,de={defaultInput:null,topOnly:!0,html(e){return ie.replace(/blockId/g,e)},inputs(){return{}},compiler(e,t){let n="";for(const o in e)n+=e[o]+",";return`[${n}]`},load:{initDom(e,t,n,o){let l=(d,s=!0)=>{let u=document.createElement("template");u.innerHTML=ue.replace(/argId/g,d).replace(/blockId/g,n),s&&(e.inputs[d]={type:0,value:null}),t.querySelector('[id="inputs"]').appendChild(u.content)},i=()=>{let d=Object.keys(e.inputs);if(d.length>0){let s=e.inputs[d[d.length-1]];s.value&&R(s.value.data),t.querySelector(`[group="${d[d.length-1]}"][prentId="${n}"]`).remove(),delete e.inputs[d[d.length-1]]}};if(o){debugger;t.querySelector('[id="inputs"]').innerHTML="";for(let d in e.inputs)l(d,!1)}t.querySelector('[id="add"]').onclick=()=>{l(`item_${Object.keys(e.inputs).length+1}`)},t.querySelector('[id="subtract"]').onclick=d=>{i()}}}},m={move:U,ifelse:Z,start:te,text:le,number:re,equalTo:de};function ce(e){const t=new WeakMap;function n(l){return typeof l=="object"&&l||typeof l=="function"}function o(l){if(!n(l))return l;if([Date,RegExp].includes(l.constructor))return new l.constructor(l);if(typeof l=="function")return new Function("return "+l.toString())();const i=t.get(l);if(i)return i;if(l instanceof Map){const c=new Map;return t.set(l,c),l.forEach((a,f)=>{n(a)?c.set(f,o(a)):c.set(f,a)}),c}if(l instanceof Set){const c=new Set;return t.set(l,c),l.forEach(a=>{n(a)?c.add(o(a)):c.add(a)}),c}const d=Reflect.ownKeys(l),s=Object.getOwnPropertyDescriptors(l),u=Object.create(Object.getPrototypeOf(l),s);return t.set(l,u),d.forEach(c=>{const a=l[c];n(a)?u[c]=o(a):u[c]=a}),u}return o(e)}var E={};const T=(e,t)=>{let n=m[e.type],o={};for(const l in e.inputs){let i=e.inputs[l];i.value?o[l]=T(E[i.value.data],i.value.data):l=="next"?o[l]="":o[l]="null"}return n.compiler(o,e,document.querySelector(`[blockid="${t}"]`))},se=e=>{E=e;let t="";for(const n in E){let o=E[n];m[o.type].isTopLevel&&(t+=T(o,n))}return t},pe=e=>{let t={};for(const n in e){let o=e[n],l=document.querySelector(`[blockid="${n}"]`);console.log(l);let i=m[o.type];i.save&&i.save.toFile?t[n]=i.save.toFile(o,l):t[n]=o,t[n].x=l.style.left,t[n].y=l.style.top}return t};let F={},N=[];const _=(e,t,n)=>{let o=t[e],l=m[o.type];n.style.left=o.x,n.style.top=o.y,delete o.x,delete o.y,F[e]=o,l.load&&l.load.initDom&&l.load.initDom(o,n,e,!0);for(const i in o.inputs){let d=o.inputs[i];if(d.value){let s=H(t[d.value.data].type,d.value.data);N.push({selfBlockDom:s,selfBlockId:d.value.data,prentId:e,targetBlockInputIndex:i}),n.querySelector(`[inputid="${i}"]`).appendChild(_(d.value.data,t,s));debugger}}return n},ae=(e,t)=>{document.getElementById("app").innerHTML="",F={};for(const n in e){console.log("sss",e[n]);const o=e[n];if(!o.prent){debugger;N=[],X(_(n,e,P(o.type,!1,n)),N,n);debugger}}},O=20;var v=null,r={},D={},B=null,g=null;const L=(e,t)=>{let n=e;if(!r[n].inputs[t])return e;for(;r[n].inputs[t].value;)n=r[n].inputs[t].value.data;return Number(n)},I=(e,t,n,o)=>{if(e.target.getAttribute("blockid")!=t&&e.target.getAttribute("dragId")!=t)return!0;if(e=e||window.e,e.preventDefault(),e.button==2)return null;delete r[t].prent;let l=v.querySelector(`[blockid="${t}"]`);r[n].inputs[o].value=null,l.style.top=k(l,"y")+"px",l.style.left=k(l,"x")+"px",l.setAttribute("class","block"),v.appendChild(l),C(l,h,e)},w=(e,t)=>{if(e=e||window.e,e.preventDefault(),e.target.getAttribute("blockid")!=t&&e.target.getAttribute("dragId")!=t)return null;B.style.display="block",B.style.top=e.clientY+5+"px",B.style.left=e.clientX+10+"px",D.open=!0,D.target={type:1,data:String(t)}},h=(e,t=!0)=>{t&&g.remove();let n=[],o=q(e);for(let i in r){let d=r[i];if(i!=e){for(const s in r[e].inputs){if(d.topOnly&&r[e].inputs[s].type==1||r[e].inputs[s].type!=1||r[i].prent||s!="next"&&r[e].inputs[s].value)continue;let u=q(i),c=document.querySelector(`[prentId="${e}"][inputId="${s}"]`),a=Math.abs(u.getBoundingClientRect().left-c.getBoundingClientRect().left),f=Math.abs(u.getBoundingClientRect().top-c.getBoundingClientRect().top),p=1;f<O&&a<O&&n.push({distance:a+f,targetBlockId:i,targetBlockDom:u,dragBlockInputId:s,type:p})}for(const s in d.inputs){if(!r[e].defaultInput&&d.inputs[s].type==1||r[e].topOnly&&d.inputs[s].type==1)continue;let u=document.querySelector(`[prentId="${i}"][inputId="${s}"]`),c=Math.abs(u.getBoundingClientRect().left-o.getBoundingClientRect().left),a=Math.abs(u.getBoundingClientRect().top-o.getBoundingClientRect().top);c<O&&a<O&&n.push({distance:c+a,targetBlockId:i,targetBlockInputIndex:s,targetBlockInputDom:u,type:0})}}}if(n.length==0)return g.remove(),null;n.sort((i,d)=>i.distance-d.distance);let l=n[0];if(l.type==0){let{targetBlockId:i,targetBlockInputIndex:d,targetBlockInputDom:s}=l;if(r[i].inputs[d].value){let u=r[i].inputs[d].value.data,c=q(u),a=L(e,"next");if(d=="next"){let f=r[e].defaultInput;if(!t)return s.insertBefore(g,s.childNodes[0]),!0;f!="next"&&!r[e].inputs[f].value?(document.querySelector(`[prentId="${e}"][inputId="${f}"]`).appendChild(c),r[e].inputs[f].value={type:1,data:u},r[u].prent={inputId:f,blockId:e},c.onmousedown=p=>{I(p,u,e,f)}):(document.querySelector(`[prentId="${a}"][inputId="next"]`).appendChild(c),r[a].inputs.next.value={type:1,data:u},r[u].prent={inputId:"next",blockId:a},c.onmousedown=p=>{I(p,u,a,"next")})}else{if(r[u].defaultInput)if(r[e].defaultInput){if(!t)return s.insertBefore(g,s.childNodes[0]),!0;let f=r[e].defaultInput,p;f=="next"?p=a:r[e].inputs[f].value?(p=a,f="next"):p=e,document.querySelector(`[prentId="${p}"][inputId="${f}"]`).appendChild(c),r[p].inputs[f].value={data:u,type:1},r[u].prent={inputId:f,blockId:p},c.onmousedown=y=>{I(y,u,p,f)}}else{if(!t)return s.append(g),!0;c.style.top=k(c,"y")+20+"px",c.style.left=k(c,"x")+20+"px",v.appendChild(c),delete r[u].prent,c.setAttribute("class","block"),C(c,h)}else{if(!t)return s.append(g),!0;c.style.top=k(c,"y")+20+"px",c.style.left=k(c,"x")+20+"px",v.appendChild(c),delete r[u].prent,c.setAttribute("class","block"),C(c,h)}debugger}}debugger;if(!t)return s.append(g),!0;r[i].inputs[d].value={type:1,data:e},r[e].prent={blockId:i,inputId:d},s.appendChild(o),o.setAttribute("class","block-input"),o.onmousedown=u=>{I(u,e,i,d)}}else if(l.type==1){let{targetBlockId:i,targetBlockDom:d,dragBlockInputId:s}=l,u=document.querySelector(`[prentId="${e}"][inputId="${s}"]`);if(!t)return u.append(g),!0;u.append(d),r[i].prent={blockId:e,inputId:s},r[e].inputs[s].value={type:1,data:i},d.setAttribute("class","block-input"),d.onmousedown=c=>{I(c,i,e,s)}}return null},j=(e,t=Object.keys(r).length)=>{let n=document.createElement("div");return n.setAttribute("blockId",`${t}`),n.setAttribute("class","block"),n.innerHTML=m[e].html(t),n},H=(e,t=Object.keys(r).length)=>{let n=j(e,t);return n.setAttribute("class","input-block"),n},P=(e,t=!0,n)=>{let o;if(t?o=j(e):o=j(e,n),v.appendChild(o),t){C(o,h);let l=Object.keys(r).length;o.oncontextmenu=i=>{w(i,l)},r[l]={type:e,inputs:m[e].inputs(),defaultInput:m[e].defaultInput,topOnly:m[e].topOnly},m[e].initialSelfData?r[l].self=m[e].initialSelfData:r[l].self={},K(o,l,e)}return o},K=(e,t,n)=>{m[n].load&&m[n].load.initDom&&m[n].load.initDom(r[t],e,t,!1)},A=e=>{let t=[];for(const n in r[e].inputs){let o=r[e].inputs[n];o.value&&o.value&&(t.push(o.value.data),t=t.concat(A(o.value.data)))}return t},R=e=>{q(e).remove(),r[e].prent&&(r[r[e].prent.blockId].inputs[r[e].prent.inputId].value=null);let t=A(e);for(const n of t)delete r[n];delete r[e]},k=(e,t)=>t=="x"?e.getBoundingClientRect().x-v.getBoundingClientRect().x+document.getElementById("zoom").scrollLeft/b:e.getBoundingClientRect().y-v.getBoundingClientRect().y+document.getElementById("zoom").scrollTop/b,fe=e=>{let t=A(e),n=Number(Object.keys(r)[Object.keys(r).length-1])+1;t.unshift(e);let o=document.querySelector(`[blockid="${e}"]`),l=o.cloneNode(!0);l.style.left=k(o,"x")+10+"px",l.style.top=k(o,"y")+10+"px",v.appendChild(l);for(const i of t){let d=r[i],s=ce(d);r[String(Number(i)+n)]=s,m[d.type].save&&m[d.type].save.toFile&&m[d.type].save.toFile(s,l);let u=r[String(Number(i)+n)];document.createElement("div").appendChild(l.cloneNode(!0));let a=(p,y,x=()=>{})=>{let S=l.querySelectorAll(p)[0];S||(S=l),S.setAttribute(y,String(Number(i)+n)),x(S)},f=(p,y)=>{let x=l.querySelectorAll(p);for(let S of x)S.setAttribute(y,String(Number(i)+n))};u.prent&&(r[String(Number(i)+n)].prent.blockId=String(Number(r[String(Number(i)+n)].prent.blockId)+n)),a(`[blockid="${i}"]`,"blockid",p=>{debugger;let y=r[String(Number(i)+n)];i==e?(p.setAttribute("class","block"),C(p,h)):p.onmousedown=x=>{I(x,String(Number(i)+n),y.prent.blockId,y.prent.inputId)},K(p,String(Number(i)+n),y.type),p.oncontextmenu=x=>{w(x,String(Number(i)+n))}}),f(`[dragid="${i}"]`,"dragid");for(const p in u.inputs)f(`[prentid="${i}"][inputId="${p}"]`,"prentid"),f(`[prentid="${i}"][group="${p}"]`,"prentid"),u.inputs[p].value&&(u.inputs[p].value.data=String(Number(u.inputs[p].value.data)+n))}},X=(e,t,n)=>{C(e,h),e.oncontextmenu=o=>{w(o,n)};for(const o of t)o.selfBlockDom.onmousedown=l=>{I(l,o.selfBlockId,o.prentId,o.targetBlockInputIndex)},o.selfBlockDom.oncontextmenu=l=>{w(l,o.selfBlockId)}},q=e=>document.querySelector(`[blockId="${e}"]`),M=()=>{B.style.display="none",D.open=!1},be=e=>{B=document.getElementById("menu"),v=e,r={},D={},g=document.getElementById("porDom"),g.remove(),v.onmousedown=t=>{if(t.target.getAttribute("id")=="menuItem")return null;M()},document.getElementById("menuCopy").addEventListener("click",()=>{fe(D.target.data),M()}),document.getElementById("menuDelet").addEventListener("click",()=>{R(D.target.data),M()})},me=e=>{ae(e)},ge=()=>pe(r),ve=()=>se(r),ye=Object.freeze(Object.defineProperty({__proto__:null,getMinChild:L,setDragOut:I,setContext:w,connectBlocks:h,addInputBlock:H,addBlock:P,getAllChildBlock:A,deletBlock:R,bindEvent:X,init:be,loadFile:me,saveFile:ge,compile:ve},Symbol.toStringTag,{value:"Module"}));exports.block=ye;exports.zoom=W;
//# sourceMappingURL=vb.cjs.js.map
