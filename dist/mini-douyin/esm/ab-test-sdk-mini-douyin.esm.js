const t=(t,n)=>Object.assign({},t,n),n=t=>{console.info(`[cbd -- A/B test sdk] ${t}`)},e=t=>"boolean"==typeof t,r=t=>"string"==typeof t&&t.constructor==String,i=t=>"number"==typeof t,s=t=>"[object Function]"===Object.prototype.toString.call(t)||"[object AsyncFunction]"===Object.prototype.toString.call(t),o=t=>"{}"===JSON.stringify(t);function a(t){return null!=t&&"[object Object]"==toString.call(t)}const u=Array.isArray||function(t){return"[object Array]"===toString.call(t)};function c(t){const n={};return function t(n,e){for(const r in e){const i=e[r];u(i)?(n[r]=[],t(n[r],i)):a(i)?(n[r]={},t(n[r],i)):n[r]=i}}(n,t),n}let f=null;const l=async t=>(f=t,f);async function h(t){const n=await function(t,n={}){return new Promise((e=>{f.then((r=>{r.default(t,{params:n},!1).then((t=>{t&&200===t.code&&t.data&&t.data.length>0?e(t.data):(e(void 0),console.warn(t.msg))})).catch((t=>{e(void 0),console.warn("Request error:",t)}))}))}))}("experiment/config/list",t);return n}var g;!function(t){t.WEB="web",t.MINI_WECHAT="mini-wechat",t.MINI_DOUYIN="mini-douyin"}(g||(g={}));const p={appKey:void 0,auto_report:!1,reportChannel:"cn",log:!1,enableAbTest:!0,clear_ab_cache_on_user_change:!1,customConfig:{},autoRefresh:!1,autoRefreshStep:0,userId:""},d=function(t,n){Object.prototype.hasOwnProperty.call(p,t)?p[t]=n:p.customConfig[t]=n},y=(n,e=n)=>t(e,n);var m=function(t,n){return t.reduce((function(t,e){var r="[object "+e+"]";return n?t[r]=e:t[e]=r,t}),{})},v=function(t){return t.reduce((function(t,n){return t[n]=!0,t}),{})},b=["Array","Arguments","Object","RegExp","Symbol","Map","Set","Date","Error","Event","Generator","Promise","WeakMap","WeakSet","DocumentFragment","Float32Array","Float64Array","Int8Array","Int16Array","Int32Array","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","ArrayBuffer","DataView","DocumentFragment","Window","String","Number","Boolean","Function","Undefined","GeneratorFunction","BigInt","Null"],x=m(b,!1),A=m(b,!0),I=v([x.Generator,x.Promise,x.WeakMap,x.WeakSet]),C=v([x.Map,x.Set]),O=v([x.Date,x.RegExp]),k=v(["bigint","boolean","function","number","string","undefined"]),j=v([x.Arguments,x.Array]),T=v([x.RegExp,x.Symbol]),w=v([x.Float32Array,x.Float64Array,x.Int8Array,x.Int16Array,x.Int32Array,x.Uint8Array,x.Uint8ClampedArray,x.Uint16Array,x.Uint32Array]),E="undefined"!=typeof Buffer&&"function"==typeof Buffer.from,R="function"==typeof Uint16Array;function S(t){return String.fromCharCode.apply(null,new Uint16Array(t))}function U(t){return Buffer.from(t).toString("utf8")}function M(t){return""}var P=E?U:R?S:M,_=/\[object ([HTML|SVG](.*)Element)\]/,N=Object.prototype.toString,F=Object.keys;function D(t,n){return t>n}function B(t,n){return t[0]>n[0]}function V(t,n){for(var e,r,i=0;i<t.length;++i){for(r=t[i],e=i-1;~e&&n(t[e],r);--e)t[e+1]=t[e];t[e+1]=r}return t}function W(t){for(var n,e=V(F(t),D),r={},i=0;i<e.length;++i)r[n=e[i]]=t[n];return r}function z(t,n){for(var e=0;e<t.length;++e)if(t[e]===n)return e+1;return 0}function H(t,n,e,r){if(!r){var i=typeof t;if(k[i])return i+"|"+t;if(null===t)return t+"|"+t}var s,o=r||N.call(t);return j[o]?t:o===x.Object?W(t):T[o]?A[o]+"|"+t.toString():C[o]?t instanceof Map?function(t,n,e){var r=[];t.forEach((function(t,i){r.push([K(i,n,e),K(t,n,e)])})),V(r,B);for(var i,s=0;s<r.length;++s)i=r[s],r[s]="["+i[0]+","+i[1]+"]";return"Map|["+r.join(",")+"]"}(t,n,e):function(t,n,e){var r=[];return t.forEach((function(t){r.push(K(t,n,e))})),V(r,D),"Set|["+r.join(",")+"]"}(t,n,e):o===x.Date?A[o]+"|"+t.getTime():o===x.Error?A[o]+"|"+t.stack:o===x.Event?{bubbles:(s=t).bubbles,cancelBubble:s.cancelBubble,cancelable:s.cancelable,composed:s.composed,currentTarget:s.currentTarget,defaultPrevented:s.defaultPrevented,eventPhase:s.eventPhase,isTrusted:s.isTrusted,returnValue:s.returnValue,target:s.target,type:s.type}:I[o]?A[o]+"|NOT_ENUMERABLE":_.test(o)?o.slice(8,-1)+"|"+t.outerHTML:o===x.DocumentFragment?A[o]+"|"+function(t){for(var n=t.children,e=[],r=0;r<n.length;++r)e.push(n[r].outerHTML);return e.join(",")}(t):w[o]?A[o]+"|"+t.join(","):o===x.ArrayBuffer?A[o]+"|"+P(t):o===x.DataView?A[o]+"|"+P(t.buffer):t}function K(t,n,e){if(!t||"object"!=typeof t)return H(t,n,e);var r=N.call(t);return O[r]?H(t,n,e,r):JSON.stringify(t,function(t,n){return void 0===t&&(t=[]),void 0===n&&(n=[]),function(e,r){if("object"==typeof r)if(t.length){var i=z(t,this);0===i?t.push(this):(t.splice(i),n.splice(i)),n.push(e);var s=z(t,r);if(0!==s)return"[~"+(n.slice(0,s).join(".")||".")+"]";t.push(r)}else t[0]=r,n[0]=e;return e&&this[e]instanceof Date?H(this[e],t,n,x.Date):H(r,t,n)}}(n,e))}function q(t){return function(t){for(var n,e=t.length,r=5381,i=52711;e--;)r=33*r^(n=t.charCodeAt(e)),i=33*i^n;return 4096*(r>>>0)+(i>>>0)}(K(t))}function G(t,n){return q(t)===q(n)}G.all=function(t){for(var n=0;n<(arguments.length<=1?0:arguments.length-1);++n)if(!G(t,n+1<1||arguments.length<=n+1?void 0:arguments[n+1]))return!1;return!0},G.any=function(t){for(var n=0;n<(arguments.length<=1?0:arguments.length-1);++n)if(G(t,n+1<1||arguments.length<=n+1?void 0:arguments[n+1]))return!0;return!1},G.not=function(t,n){return q(t)!==q(n)},q.is=G;const L=t=>{const n=t.expConfig,e={};return n.forEach((n=>{const r=Y(t.configOption.userId,n.experimentTrafficWeight);e[n.experimentId]={...n,...r}})),e},Y=(t,n)=>{const e=Math.abs(q(t))%1e3/10;return{isEntry:e<=n,hashVal:e}},J=(t,n)=>{let e=0;const r=n,i=r.hashVal*(100/r.experimentTrafficWeight),s={msg:"group successfully",res:{isEntryVersion:!1,versionId:0,versionParam:{}}};for(let n=0;n<r.versions.length;n++)if(e+=r.versions[n].versionTrafficWeight,i<e&&(!r.versions[n].whitelist||r.versions[n].whitelist.indexOf(t.configOption.userId)<0)){s.res={isEntryVersion:!0,versionId:r.versions[n].versionId,versionParam:r.versions[n].versionParam};break}return s},$={configOption:{},log:!1,expConfig:[],timer:0,isInit:!1,shuntRes:{},groupRes:{},getExpConfig:Function,init(t,e){this.log&&n("init running"),this.getExpConfig=e||nt,this.configOption=y(t,p),this.log=this.configOption.log,this.isInit=!0},async start(t){return this.isInit?(this.log&&n("start running"),this.expConfig=await this.getExpConfig(this.configOption.appKey,this),this.configOption.autoRefresh&&et(this),this.expConfig?(this.shuntRes=L(this),this.log&&n("shunt successfully"),t&&t({res:{expConfig:this.expConfig,shuntRes:this.shuntRes,sdk:this},msg:"shunt successfully",status:!0})):t&&t({res:{expConfig:{},shuntRes:{},sdk:this},msg:"unknown exception",status:!1})):(t&&t({res:void 0,msg:"sdk not initialized",status:!1}),void(this.log&&n("sdk not initialized")))},getVar(t,e,r){if(!this.isInit)return r&&r({res:void 0,msg:"sdk not initialized",status:!1}),void(this.log&&n("sdk not initialized"));this.log&&n("getVar running");const i=this.shuntRes[t];i&&i.isEntry&&(this.groupRes=J(this,i),this.log&&n("group successfully"),r&&r(this.groupRes)),i&&!i.isEntry&&(this.log&&n("user did not enter the experiment"),r&&r({res:e,msg:"user did not enter the experiment",status:!1})),i&&0!==this.expConfig.length||(this.log&&n("unknown exception"),r&&r({res:e,msg:"unknown exception",status:!1}))},config(t,e){if(!this.isInit)return e&&e({res:void 0,msg:"sdk not initialized",status:!1}),void(this.log&&n("sdk not initialized"));this.configOption=y(t,this.configOption),this.log&&n("config set success !")},async refresh(t){return this.isInit?(this.expConfig=await this.getExpConfig(this.configOption.appKey,this),this.expConfig?(this.shuntRes=L(this),this.log&&n("shunt successfully"),t&&t({res:{expConfig:this.expConfig,shuntRes:this.shuntRes,sdk:this},msg:"shunt successfully",status:!0})):void 0):(t&&t({res:void 0,msg:"sdk not initialized",status:!1}),void(this.log&&n("sdk not initialized")))},resetInstance(){this.configOption={},this.log=!1,this.expConfig=[],this.timer&&clearTimeout(this.timer),this.timer=0,this.isInit=!1,this.shuntRes={},this.groupRes={}}},Q=new Map;function X(t,...n){let e="",i="";if(r(t)?e=t:(e=t.funcName,i=t.sdkKey),i){if(!Q.get(i)&&"init"===e){const t=Z(e,$,...n);return Q.set(i,c($)),t}return Q.get(i)||"init"===e?Z(e,Q.get(i),...n):{res:{expConfig:{},shuntRes:{},sdk:Q.get(i)},msg:"sdkKey does not exist"}}return Z(e,$,...n)}const Z=(t,n,...e)=>"start"===t||"refresh"===t?new Promise((r=>{n[t].call(n,r,...e)})):(n[t]&&s(n[t])&&n[t].call(n,...e),n),nt=async(t,e)=>{const r={appKey:t},i=await h(r);if(i)return e.log&&n("The experimental parameters were successfully obtained"),i;e.log&&n("Failed to get experimental parameters")},et=t=>{const n=t.configOption.autoRefreshStep;t.timer=setInterval((async()=>{t.refresh()}),n)};l(Promise.resolve().then((function(){return ft})));const rt=(t,...n)=>X(t,...n);var it,st;!function(t){t.json="application/json;charset=UTF-8"}(it||(it={})),function(t){t.post="POST"}(st||(st={}));const ot=t=>t&&void 0!==t["Content-Type"]?t["Content-Type"]:(t&&(t.method,st.post),it.json),at=t=>`http://47.96.100.195/api/${t.replace("//","/")}`,ut=(t,n)=>{const e=n&&void 0!==n.token?n.token:"",r="mini-douyin";return r===g.MINI_WECHAT||r===g.MINI_DOUYIN?{token:e,"Content-Type":t}:new Headers({token:e,"Content-Type":t})};const ct=t=>t;var ft=Object.freeze({__proto__:null,default:async(t,e={params:{},method:"POST",headers:{"Content-Type":it.json,token:""},token:"","Content-Type":it.json})=>{const{reqUrl:r,headers:i}=function(t,n){const e=ot(n);return{contentType:e,reqUrl:at(t),headers:ut(e,n)}}(t,e),s=await function(t,e,r){return new Promise(((i,s)=>{("mini-douyin"===g.MINI_DOUYIN?tt:wx).request({url:t,method:st.post,data:r.params,header:{...e},success:t=>{200===t.statusCode?i(t.data):s(t)},fail:t=>{s(t),n(t.message)}})}))}(r,i,e);return ct(s)}});export{rt as ABTest,g as ENV,J as abTestGrouping,L as abTestShunt,et as autoRefresh,X as cbdABTest,c as deepCopy,h as experimentConfig,t as extend,nt as getExperimentConfig,u as isArray,e as isBool,o as isEmptyObj,s as isFunction,i as isNumber,a as isObject,r as isString,n as log,y as mergeConfig,$ as sdk,d as setConfig,l as setRequestInst,Y as shuntAlgorithm};
