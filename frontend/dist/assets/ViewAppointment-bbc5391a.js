import{d as g,r as n,s as b,y as x,u as N,j as a,b as t,aq as w,ar as y,B as k}from"./index-2a2af9eb.js";import{H as S}from"./Header-26a5d3ec.js";const j=()=>{var m,d;const p=g();n.useEffect(()=>{p(b("View Appointment"))});const{providerKey:o}=x(),[i,c]=n.useState(!1),[r,l]=n.useState("loading"),[s,u]=n.useState({company:{name:"",phone:"",logo:""},customer:{name:"",email:"",phone:"",address:""},appointment:{time1:"",time2:"",time3:""},services:[]});n.useEffect(()=>{fetch("https://api.edservicetx.com/api/v1/appointment/book/view/"+o).then(e=>{if(e.ok)return e.json();throw Error(e.statusText)}).then(e=>{l("success"),u(e)}).catch(e=>{console.error("Error:",e),l("error")})},[]);const h=N(),f=()=>{i||(c(!0),fetch("https://api.edservicetx.com/api/v1/appointment/book/remove/"+o).then(e=>{if(e.ok)return e.json();throw Error(e.statusText)}).then(e=>{console.log(e),h("/appointment/book/cancel/"+e.key)}).catch(e=>{console.error("Error:",e)}).finally(()=>{c(!1)}))};return a("div",{className:"App h-full",children:[r==="loading"&&t(w,{}),r==="error"&&t(y,{}),r==="success"&&a("div",{className:"text-center",children:[t(S,{...s.company}),a("div",{className:"w-full sm:w-3/4 m-auto",children:[a("div",{className:"header border-b border-gray-300 p-2 pb-4 mt-10",children:[t("h2",{className:"font-bold",children:a("div",{className:"flex items-center justify-center",children:[t("svg",{className:"w-4 h-4 me-2 text-blue-600 dark:text-blue-500 flex-shrink-0","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 20 20",children:t("path",{d:"M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"})}),"Appointment accepted!"]})}),a("div",{className:"text-gray-500 mt-2",children:["We're looking forward to seeing you on ",s.appointment.time1]})]}),a("div",{className:"cintent p-2 mt-6",children:[t("div",{className:"text-lg",children:s.customer.name}),a("div",{className:"datetime mt-4 font-bold text-sm",children:[(m=s.appointment)==null?void 0:m.time2,t("br",{}),(d=s.appointment)==null?void 0:d.time3]}),t("div",{className:"services mt-4",children:s.services.map((e,v)=>a("div",{className:"text-gray-500 mt-2",children:[e.title," - $",e.price]},v))}),a("div",{className:"customer-info mt-4 text-gray-500",children:[s.customer.address,t("br",{}),s.customer.phone,t("br",{})]})]}),a("div",{className:"footer p-2 mt-6 w-full sm:w-1/3 m-auto border-t border-gray-300",children:[a("div",{className:"text-gray-500 mt-2",children:["You can contact with company for any questions by phone number: ",t("b",{children:s.company.phone})]}),t("div",{className:"mt-3",children:a("button",{onClick:f,className:"bg-blue-100 text-blue-600 p-2 rounded w-full",children:["Cancel appointment ",i&&t(k,{})]})})]})]})]})]})};export{j as default};