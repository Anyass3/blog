import{T as l,D as d,U as m}from"./vendor-bcb5457f.js";var u={actions:{startConnectome({commit:e,dispatch:o,state:s}){const c=location.protocol.includes("https")&&location.port?`wss://${location.hostname}:${7780}`:void 0,r="dmtapp/meet";class a{constructor(){this.connector=l({protocol:r,port:7780,endpoint:c}),window.sk=this}emitLocal(t,n){this.connector.emit(t,n)}emit(t,n){this.connector.signal(t,n)}on(t,n){this.connector.on(t,n)}get connected(){return this.connector.connected}get disconnected(){return this.connector.closed()}reconnect(){this.connector.connection.terminate()}disconnect(){this.emit("signal-disconnect","disconnected by user"),this.connector.decommission(),this.connector=null,o("socket",{}).then(()=>setTimeout(()=>o("startConnectome")))}get id(){return this.connector.clientPublicKeyHex}}e("socket",new a)}}};function h(){const{subscribe:e,update:o,set:s}=d(null);return{subscribe:e,show:(i,c=3e3)=>o(()=>(setTimeout(()=>s(null),c),i))}}var p={noStore:["snack"],state:{content:"",title:"",snack:h()}},w=m([p,u]);export{w as s};
