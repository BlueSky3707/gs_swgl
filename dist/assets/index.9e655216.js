import{v as A,T as b,J as L,U as E,V as $,x as i,y as u,S as g,W as B,X as N,E as f,z as v,F as y,C as V,Y as U,L as q,Z as z,D as S,$ as F,w as I,a0 as x,a1 as C}from"./index.1cbafa1b.js";const T={class:"areaMap"},D={class:"limit"},J={class:"label_box"},O={class:"check_item"},Z=["src"],j={class:"flabel"},K={key:0,class:"child_box"},M={class:"label"},P={__name:"ztType",props:["modelValue","checkall"],emits:["update:modelValue","change"],setup(p,{emit:r}){const t=p;b();const d=L({checkall:!1,stqList:{nameList:["\u6C34\u529F\u80FD\u533A","\u6838\u5FC3\u533A","\u7F13\u51B2\u533A","\u8BD5\u9A8C\u533A","\u751F\u6001\u516C\u56ED","\u4FDD\u62A4\u533A"],styList:["background: rgba(210, 181, 151, 0.39);border: 1px solid #EFE3D7","background: rgba(7, 187, 215, 0.39);border: 1px solid  #9CEAFF;","background: rgba(128, 208, 132, 0.39);border: 1px solid #CEF1D0;","background: rgba(52, 143, 12, 0.39);border: 1px solid #68B56C;","background:  rgba(0, 245, 255, 0.39);border: 1px solid #1EBCC2","background:  rgba(197, 225, 51, 0.39);border: 1px solid #94AB1A;"]}});E(()=>t.checkall,()=>{d.checkall=!1});const e=a=>{m(t.modelValue,a),r("change",{all:t.modelValue,active:a})},o=a=>{let n=t.modelValue.find(c=>c.name===a.name);m(n.child,a.active),r("change",{all:t.modelValue,active:a})},s=(a,n)=>{t.modelValue.filter(l=>l.child).forEach(l=>{l.child.some(_=>_.active==!0)?l.active=!0:l.active=!1}),r("change",{all:t.modelValue,active:n,target:a})},m=(a,n)=>{for(const c in a)a[c].hasOwnProperty("child")?(a[c].active=n,m(a[c].child,n)):a[c].active=n;return a};return(a,n)=>{const c=$("el-checkbox");return i(),u("div",T,[g(c,{class:"all",onChange:e,modelValue:d.checkall,"onUpdate:modelValue":n[0]||(n[0]=l=>d.checkall=l)},{default:B(()=>[N(f(d.checkall?"\u5173\u95ED":"\u9009\u62E9")+"\u6240\u6709\u56FE\u5C42 ",1)]),_:1},8,["modelValue"]),v("div",D,[(i(!0),u(y,null,V(p.modelValue,(l,_)=>(i(),u("div",{key:_},[v("div",J,[v("div",O,[l.name.includes(d.stqList.nameList[_])?(i(),u("div",{key:0,class:"stq",style:U(d.stqList.styList[_])},null,4)):(i(),u("img",{key:1,src:a.getSrc(`zt/${l.name}.png`),style:{width:"18px",height:"18px","vertical-align":"text-bottom","margin-right":"10px"}},null,8,Z)),v("span",j,f(l.name),1)]),g(c,{modelValue:l.active,"onUpdate:modelValue":h=>l.active=h,onChange:h=>o(l)},null,8,["modelValue","onUpdate:modelValue","onChange"])]),l.child?(i(),u("div",K,[(i(!0),u(y,null,V(l.child,(h,w)=>(i(),u("div",{class:"child_item",key:w},[v("span",M,f(h.name),1),g(c,{modelValue:h.active,"onUpdate:modelValue":k=>h.active=k,onChange:k=>s(h,l)},null,8,["modelValue","onUpdate:modelValue","onChange"])]))),128))])):q("",!0)]))),128))])])}}};var Q=A(P,[["__scopeId","data-v-70065e98"]]);const W={__name:"index",props:["label"],setup(p){const r=p;b(),E(()=>r.label,()=>{t.typeList.forEach((e,o)=>{e.active=!1,r.label=="AQI\u65E5\u5747\u503C"&&o==0?(e.active=!0,e.child&&e.child.forEach(s=>s.active=!0)):e.name==r.label?(e.active=!0,e.child&&e.child.forEach(s=>s.active=!0)):(e.active=!1,e.child&&e.child.forEach(s=>s.active=!1))})});const t=L({checkAll:1,typeList:[{layerid:"qskxxid",name:"\u53D6\u6C34\u53E3",active:!0},{layerid:"ysqyid",name:"\u7528\u6C34\u4F01\u4E1A",active:!1},{layerid:"jczid",name:"\u76D1\u6D4B\u7AD9",active:!1}]}),d=e=>{const{active:o,all:s}=JSON.parse(JSON.stringify(e));F(o,s)};return(e,o)=>{const s=$("Box");return i(),z(s,{title:"\u4E13\u9898\u56FE\u5C42",onClose:o[1]||(o[1]=m=>e.$store.commit("setNavIndex",0))},{default:B(()=>[g(S(Q),{onChange:d,checkall:t.checkall,modelValue:t.typeList,"onUpdate:modelValue":o[0]||(o[0]=m=>t.typeList=m)},null,8,["checkall","modelValue"])]),_:1})}}},Y={__name:"index",setup(p){b();let r=I("");return(t,d)=>x((i(),u("div",null,[x(g(S(W),{label:r.value},null,8,["label"]),[[C,t.$store.state.navIndex!==0&&t.$store.state.navIndex!==-1]])],512)),[[C,!t.$store.state.layerInf]])}};export{Y as default};