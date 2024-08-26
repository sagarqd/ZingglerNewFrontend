import{u as z,X as C,a1 as g,k as x,a0 as M,bg as q,j as e,G as s,B as a,d as i,a2 as H,a3 as w,a5 as f,a6 as y,a7 as b,a8 as c,a9 as T,S as I,aa as $,ac as G,t as R,ad as V,ab as v,ae as _,D as N}from"./index-jfPFzjbI.js";import{F as O,A as Q,a as U,b as X}from"./AuthFooter-Dk-l6gVd.js";import{d as J}from"./Visibility-KP81lIWL.js";import{d as K}from"./VisibilityOff-93xk6HZ1.js";import{I as Y}from"./IconButton-B7JpJvwz.js";import{C as Z}from"./Checkbox-C8FiwUyA.js";import"./Link-n2lUMppv.js";const ee=({...m})=>{const n=z();C(n.breakpoints.down("md")),g(t=>t.customization);const[k,E]=x.useState(!0),[h,o]=x.useState(null),p=M();q(),g(t=>t.customization.user);const[u,P]=x.useState(!1),S=()=>{P(!u)},A=t=>{t.preventDefault()},D=async t=>{try{const r=await V.post("http://localhost:8080/api/auth/login",t);console.log("Login successful",r.data),p("/dashboard/default"),o(null)}catch(r){console.error("Error logging in:",r),r.response&&r.response.status===401?o("Invalid email or password. Please try again."):o("Error occurred during login. Please try again.")}},F=async t=>{try{p("/forgot-password")}catch(r){console.error("Error initiating password reset:",r),o("Error initiating password reset. Please try again.")}};return e.jsxs(e.Fragment,{children:[e.jsxs(s,{container:!0,direction:"column",justifyContent:"center",spacing:2,children:[e.jsx(s,{item:!0,xs:12,children:e.jsx(a,{sx:{alignItems:"center",display:"flex"}})}),e.jsx(s,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"center",children:e.jsx(a,{sx:{mb:2},children:e.jsx(i,{variant:"subtitle1",children:"Sign in with Email address"})})})]}),e.jsx(O,{initialValues:{email:"",password:"",submit:null},validationSchema:H().shape({email:w().email("Must be a valid email").max(255).required("Email is required"),password:w().max(255).required("Password is required")}),onSubmit:(t,{setSubmitting:r})=>{r(!0);const l={email:t.email,password:t.password};D(l),r(!1)},children:({errors:t,handleBlur:r,handleChange:l,handleSubmit:B,isSubmitting:L,touched:d,values:j})=>e.jsxs("form",{noValidate:!0,onSubmit:B,...m,children:[e.jsxs(f,{fullWidth:!0,error:!!(d.email&&t.email),sx:{...n.typography.customInput},children:[e.jsx(y,{htmlFor:"outlined-adornment-email-login",children:"Email Address"}),e.jsx(b,{id:"outlined-adornment-email-login",type:"email",value:j.email,name:"email",onBlur:r,onChange:l,label:"Email Address / Username",inputProps:{}}),d.email&&t.email&&e.jsx(c,{error:!0,id:"standard-weight-helper-text-email-login",children:t.email})]}),e.jsxs(f,{fullWidth:!0,error:!!(d.password&&t.password),sx:{...n.typography.customInput},children:[e.jsx(y,{htmlFor:"outlined-adornment-password-login",children:"Password"}),e.jsx(b,{id:"outlined-adornment-password-login",type:u?"text":"password",value:j.password,name:"password",onBlur:r,onChange:l,endAdornment:e.jsx(T,{position:"end",children:e.jsx(Y,{"aria-label":"toggle password visibility",onClick:S,onMouseDown:A,edge:"end",size:"large",children:u?e.jsx(J,{}):e.jsx(K,{})})}),label:"Password",inputProps:{}}),d.password&&t.password&&e.jsx(c,{error:!0,id:"standard-weight-helper-text-password-login",children:t.password})]}),e.jsxs(I,{direction:"row",alignItems:"center",justifyContent:"space-between",spacing:1,children:[e.jsx($,{control:e.jsx(Z,{checked:k,onChange:W=>E(W.target.checked),name:"checked",color:"primary"}),label:"Remember me"}),e.jsx(i,{variant:"subtitle1",color:"secondary",sx:{textDecoration:"none",cursor:"pointer"},onClick:F,children:"Forgot Password?"})]}),h&&e.jsx(a,{sx:{mt:2},children:e.jsx(c,{error:!0,children:h})}),t.submit&&e.jsx(a,{sx:{mt:3},children:e.jsx(c,{error:!0,children:t.submit})}),e.jsx(a,{sx:{mt:2},children:e.jsx(G,{children:e.jsx(R,{disableElevation:!0,disabled:L,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"secondary",children:"Sign in"})})})]})})]})},le=()=>{const m=C(n=>n.breakpoints.down("md"));return e.jsx(Q,{children:e.jsxs(s,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:[e.jsx(s,{item:!0,xs:12,children:e.jsx(s,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:e.jsx(s,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:e.jsx(U,{children:e.jsxs(s,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[e.jsx(s,{item:!0,sx:{mb:3},children:e.jsx(v,{to:"#","aria-label":"logo",children:e.jsx(_,{})})}),e.jsx(s,{item:!0,xs:12,children:e.jsx(s,{container:!0,direction:{xs:"column-reverse",md:"row"},alignItems:"center",justifyContent:"center",children:e.jsx(s,{item:!0,children:e.jsxs(I,{alignItems:"center",justifyContent:"center",spacing:1,children:[e.jsx(i,{color:"secondary.main",gutterBottom:!0,variant:m?"h3":"h2",children:"Hi, Welcome Back"}),e.jsx(i,{variant:"caption",fontSize:"16px",textAlign:{xs:"center",md:"inherit"},children:"Enter your credentials to continue"})]})})})}),e.jsx(s,{item:!0,xs:12,children:e.jsx(ee,{})}),e.jsx(s,{item:!0,xs:12,children:e.jsx(N,{})}),e.jsx(s,{item:!0,xs:12,children:e.jsx(s,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:e.jsx(i,{component:v,to:"/register",variant:"subtitle1",sx:{textDecoration:"none"},children:"Don't have an account?"})})})]})})})})}),e.jsx(s,{item:!0,xs:12,sx:{m:3,mt:1},children:e.jsx(X,{})})]})})};export{le as default};
