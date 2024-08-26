import{aX as x,aY as w,aZ as R,H as _,g as $,as as b,s as S,b as o,O as U,at as c,k as M,aj as j,a as T,j as X,y as A,K as E}from"./index-jfPFzjbI.js";function P(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function K(t){return parseFloat(t)}function W({props:t,name:a}){return x({props:t,name:a,defaultTheme:w,themeId:R})}function N(t){return _("MuiSkeleton",t)}$("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const B=["animation","className","component","height","style","variant","width"];let r=t=>t,p,m,g,f;const D=t=>{const{classes:a,variant:e,animation:s,hasChildren:i,width:l,height:n}=t;return E({root:["root",e,s,i&&"withChildren",i&&!l&&"fitContent",i&&!n&&"heightAuto"]},N,a)},F=b(p||(p=r`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),H=b(m||(m=r`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),I=S("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:e}=t;return[a.root,a[e.variant],e.animation!==!1&&a[e.animation],e.hasChildren&&a.withChildren,e.hasChildren&&!e.width&&a.fitContent,e.hasChildren&&!e.height&&a.heightAuto]}})(({theme:t,ownerState:a})=>{const e=P(t.shape.borderRadius)||"px",s=K(t.shape.borderRadius);return o({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:U(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},a.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${s}${e}/${Math.round(s/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}},a.variant==="circular"&&{borderRadius:"50%"},a.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&c(g||(g=r`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),F),({ownerState:t,theme:a})=>t.animation==="wave"&&c(f||(f=r`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),H,(a.vars||a).palette.action.hover)),L=M.forwardRef(function(a,e){const s=j({props:a,name:"MuiSkeleton"}),{animation:i="pulse",className:l,component:n="span",height:h,style:v,variant:C="text",width:k}=s,d=T(s,B),u=o({},s,{animation:i,component:n,variant:C,hasChildren:!!d.children}),y=D(u);return X.jsx(I,o({as:n,ref:e,className:A(y.root,l),ownerState:u},d,{style:o({width:k,height:h},v)}))});export{L as S,W as u};
