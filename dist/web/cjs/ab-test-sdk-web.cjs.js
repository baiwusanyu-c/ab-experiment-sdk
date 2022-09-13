"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t=(t,e)=>Object.assign({},t,e),e=t=>{console.info(`[cbd -- A/B test sdk] ${t}`)},n=t=>"string"==typeof t&&t.constructor==String,r=t=>"[object Function]"===Object.prototype.toString.call(t)||"[object AsyncFunction]"===Object.prototype.toString.call(t);function i(t){return null!=t&&"[object Object]"==toString.call(t)}const o=Array.isArray||function(t){return"[object Array]"===toString.call(t)};function s(t){const e={};return function t(e,n){for(const r in n){const s=n[r];o(s)?(e[r]=[],t(e[r],s)):i(s)?(e[r]={},t(e[r],s)):e[r]=s}}(e,t),e}let a=null;const u=async t=>(a=t,a);async function c(t){const e=await function(t,e={}){return new Promise((n=>{a.then((r=>{r.default(t,{params:e},!1).then((t=>{t&&200===t.code&&t.data&&t.data.length>0?n(t.data):(n(void 0),console.warn(t.msg))})).catch((t=>{n(void 0),console.warn("Request error:",t)}))}))}))}("experiment/config/list",t);return e}var f;exports.ENV=void 0,(f=exports.ENV||(exports.ENV={})).WEB="web",f.MINI_WECHAT="mini-wechat",f.MINI_DOUYIN="mini-douyin";const l={appKey:void 0,auto_report:!1,reportChannel:"cn",log:!1,enableAbTest:!0,clear_ab_cache_on_user_change:!1,customConfig:{},autoRefresh:!1,autoRefreshStep:0,userId:""},p=(e,n=e)=>t(n,e);function h(t){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}var g=function(t,e){return t.reduce((function(t,n){var r="[object "+n+"]";return e?t[r]=n:t[n]=r,t}),{})},d=function(t){return t.reduce((function(t,e){return t[e]=!0,t}),{})},y=["Array","Arguments","Object","RegExp","Symbol","Map","Set","Date","Error","Event","Generator","Promise","WeakMap","WeakSet","DocumentFragment","Float32Array","Float64Array","Int8Array","Int16Array","Int32Array","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","ArrayBuffer","DataView","DocumentFragment","Window","String","Number","Boolean","Function","Undefined","GeneratorFunction","BigInt","Null"],m=g(y,!1),x=g(y,!0),b=d([m.Generator,m.Promise,m.WeakMap,m.WeakSet]),v=d([m.Map,m.Set]),A=d([m.Date,m.RegExp]),C=d(["bigint","boolean","function","number","string","undefined"]),O=d([m.Arguments,m.Array]),w=d([m.RegExp,m.Symbol]),I=d([m.Float32Array,m.Float64Array,m.Int8Array,m.Int16Array,m.Int32Array,m.Uint8Array,m.Uint8ClampedArray,m.Uint16Array,m.Uint32Array]),j="undefined"!=typeof Buffer&&"function"==typeof Buffer.from,k="function"==typeof Uint16Array;function E(t){return String.fromCharCode.apply(null,new Uint16Array(t))}function S(t){return Buffer.from(t).toString("utf8")}function T(t){return""}var R=j?S:k?E:T,N=/\[object ([HTML|SVG](.*)Element)\]/,M=Object.prototype.toString,U=Object.keys;function _(t,e){return t>e}function P(t,e){return t[0]>e[0]}function V(t,e){for(var n,r,i=0;i<t.length;++i){for(r=t[i],n=i-1;~n&&e(t[n],r);--n)t[n+1]=t[n];t[n+1]=r}return t}function B(t){for(var e,n=V(U(t),_),r={},i=0;i<n.length;++i)r[e=n[i]]=t[e];return r}function F(t,e){for(var n=0;n<t.length;++n)if(t[n]===e)return n+1;return 0}function D(t,e,n,r){if(!r){var i=h(t);if(C[i])return i+"|"+t;if(null===t)return t+"|"+t}var o,s=r||M.call(t);return O[s]?t:s===m.Object?B(t):w[s]?x[s]+"|"+t.toString():v[s]?t instanceof Map?function(t,e,n){var r=[];t.forEach((function(t,i){r.push([W(i,e,n),W(t,e,n)])})),V(r,P);for(var i,o=0;o<r.length;++o)i=r[o],r[o]="["+i[0]+","+i[1]+"]";return"Map|["+r.join(",")+"]"}(t,e,n):function(t,e,n){var r=[];return t.forEach((function(t){r.push(W(t,e,n))})),V(r,_),"Set|["+r.join(",")+"]"}(t,e,n):s===m.Date?x[s]+"|"+t.getTime():s===m.Error?x[s]+"|"+t.stack:s===m.Event?{bubbles:(o=t).bubbles,cancelBubble:o.cancelBubble,cancelable:o.cancelable,composed:o.composed,currentTarget:o.currentTarget,defaultPrevented:o.defaultPrevented,eventPhase:o.eventPhase,isTrusted:o.isTrusted,returnValue:o.returnValue,target:o.target,type:o.type}:b[s]?x[s]+"|NOT_ENUMERABLE":N.test(s)?s.slice(8,-1)+"|"+t.outerHTML:s===m.DocumentFragment?x[s]+"|"+function(t){for(var e=t.children,n=[],r=0;r<e.length;++r)n.push(e[r].outerHTML);return n.join(",")}(t):I[s]?x[s]+"|"+t.join(","):s===m.ArrayBuffer?x[s]+"|"+R(t):s===m.DataView?x[s]+"|"+R(t.buffer):t}function W(t,e,n){if(!t||"object"!==h(t))return D(t,e,n);var r=M.call(t);return A[r]?D(t,e,n,r):JSON.stringify(t,function(t,e){return void 0===t&&(t=[]),void 0===e&&(e=[]),function(n,r){if("object"===h(r))if(t.length){var i=F(t,this);0===i?t.push(this):(t.splice(i),e.splice(i)),e.push(n);var o=F(t,r);if(0!==o)return"[~"+(e.slice(0,o).join(".")||".")+"]";t.push(r)}else t[0]=r,e[0]=n;return n&&this[n]instanceof Date?D(this[n],t,e,m.Date):D(r,t,e)}}(e,n))}function z(t){return function(t){for(var e,n=t.length,r=5381,i=52711;n--;)r=33*r^(e=t.charCodeAt(n)),i=33*i^e;return 4096*(r>>>0)+(i>>>0)}(W(t))}function H(t,e){return z(t)===z(e)}H.all=function(t){for(var e=0;e<(arguments.length<=1?0:arguments.length-1);++e)if(!H(t,e+1<1||arguments.length<=e+1?void 0:arguments[e+1]))return!1;return!0},H.any=function(t){for(var e=0;e<(arguments.length<=1?0:arguments.length-1);++e)if(H(t,e+1<1||arguments.length<=e+1?void 0:arguments[e+1]))return!0;return!1},H.not=function(t,e){return z(t)!==z(e)},z.is=H;const K=t=>{const e=t.expConfig,n={};return e.forEach((e=>{const r=G(t.configOption.userId,e.experimentTrafficWeight);n[e.experimentId]={...e,...r}})),n},G=(t,e)=>{const n=Math.abs(z(t))%1e3/10;return{isEntry:n<=e,hashVal:n}},q=(t,e)=>{let n=0;const r=e,i=r.hashVal*(100/r.experimentTrafficWeight),o={msg:"group successfully",res:{isEntryVersion:!1,versionId:0,versionParam:{}}};for(let e=0;e<r.versions.length;e++)if(n+=r.versions[e].versionTrafficWeight,i<n&&(!r.versions[e].whitelist||r.versions[e].whitelist.indexOf(t.configOption.userId)<0)){o.res={isEntryVersion:!0,versionId:r.versions[e].versionId,versionParam:r.versions[e].versionParam};break}return o},L={configOption:{},log:!1,expConfig:[],timer:0,isInit:!1,shuntRes:{},groupRes:{},getExpConfig:Function,init(t,n){this.log&&e("init running"),this.getExpConfig=n||Q,this.configOption=p(t,l),this.log=this.configOption.log,this.isInit=!0},async start(t){return this.isInit?(this.log&&e("start running"),this.expConfig=await this.getExpConfig(this.configOption.appKey,this),this.configOption.autoRefresh&&X(this),this.expConfig?(this.shuntRes=K(this),this.log&&e("shunt successfully"),t&&t({res:{expConfig:this.expConfig,shuntRes:this.shuntRes,sdk:this},msg:"shunt successfully",status:!0})):t&&t({res:{expConfig:{},shuntRes:{},sdk:this},msg:"unknown exception",status:!1})):(t&&t({res:void 0,msg:"sdk not initialized",status:!1}),void(this.log&&e("sdk not initialized")))},getVar(t,n,r){if(!this.isInit)return r&&r({res:void 0,msg:"sdk not initialized",status:!1}),void(this.log&&e("sdk not initialized"));this.log&&e("getVar running");const i=this.shuntRes[t];i&&i.isEntry&&(this.groupRes=q(this,i),this.log&&e("group successfully"),r&&r(this.groupRes)),i&&!i.isEntry&&(this.log&&e("user did not enter the experiment"),r&&r({res:n,msg:"user did not enter the experiment",status:!1})),i&&0!==this.expConfig.length||(this.log&&e("unknown exception"),r&&r({res:n,msg:"unknown exception",status:!1}))},config(t,n){if(!this.isInit)return n&&n({res:void 0,msg:"sdk not initialized",status:!1}),void(this.log&&e("sdk not initialized"));this.configOption=p(t,this.configOption),this.log&&e("config set success !")},async refresh(t){return this.isInit?(this.expConfig=await this.getExpConfig(this.configOption.appKey,this),this.expConfig?(this.shuntRes=K(this),this.log&&e("shunt successfully"),t&&t({res:{expConfig:this.expConfig,shuntRes:this.shuntRes,sdk:this},msg:"shunt successfully",status:!0})):void 0):(t&&t({res:void 0,msg:"sdk not initialized",status:!1}),void(this.log&&e("sdk not initialized")))},resetInstance(){this.configOption={},this.log=!1,this.expConfig=[],this.timer&&clearTimeout(this.timer),this.timer=0,this.isInit=!1,this.shuntRes={},this.groupRes={}}},J=new Map;function Y(t,...e){let r="",i="";if(n(t)?r=t:(r=t.funcName,i=t.sdkKey),i){if(!J.get(i)&&"init"===r){const t=$(r,L,...e);return J.set(i,s(L)),t}return J.get(i)||"init"===r?$(r,J.get(i),...e):{res:{expConfig:{},shuntRes:{},sdk:J.get(i)},msg:"sdkKey does not exist"}}return $(r,L,...e)}const $=(t,e,...n)=>"start"===t||"refresh"===t?new Promise((r=>{e[t].call(e,r,...n)})):(e[t]&&r(e[t])&&e[t].call(e,...n),e),Q=async(t,n)=>{const r={appKey:t},i=await c(r);if(i)return n.log&&e("The experimental parameters were successfully obtained"),i;n.log&&e("Failed to get experimental parameters")},X=t=>{const e=t.configOption.autoRefreshStep;t.timer=setInterval((async()=>{t.refresh()}),e)};u(Promise.resolve().then((function(){return st})));var Z,tt;!function(t){t.json="application/json;charset=UTF-8"}(Z||(Z={})),function(t){t.post="POST"}(tt||(tt={}));const et=t=>t&&void 0!==t["Content-Type"]?t["Content-Type"]:(t&&(t.method,tt.post),Z.json),nt=t=>`http://47.96.100.195/api/${t.replace("//","/")}`,rt=(t,e)=>{const n=e&&void 0!==e.token?e.token:"";return"web"===exports.ENV.MINI_WECHAT||"web"===exports.ENV.MINI_DOUYIN?{token:n,"Content-Type":t}:new Headers({token:n,"Content-Type":t})};const it=async t=>{const e=await ot(t);if(t.ok)return e;throw e},ot=async t=>{const e=t.headers.get("Content-Type");let n;return e?(e.indexOf("json")>-1&&(n=await t.json()),e.indexOf("text")>-1&&(n=await t.text()),e.indexOf("form")>-1&&(n=await t.formData()),e.indexOf("video")>-1&&(n=await t.blob())):n=await t.text(),n};var st=Object.freeze({__proto__:null,default:async(t,e={params:{},method:"POST",headers:{"Content-Type":Z.json,token:""},token:"","Content-Type":Z.json})=>{const{reqUrl:n,headers:r}=function(t,e){const n=et(e);return{contentType:n,reqUrl:nt(t),headers:rt(n,e)}}(t,e),i=await async function(t,e,n){return await fetch(t,{body:JSON.stringify(n.params),headers:e,method:tt.post})}(n,r,e);return it(i)}});exports.ABTest=(t,...e)=>Y(t,...e),exports.abTestGrouping=q,exports.abTestShunt=K,exports.autoRefresh=X,exports.cbdABTest=Y,exports.deepCopy=s,exports.experimentConfig=c,exports.extend=t,exports.getExperimentConfig=Q,exports.isArray=o,exports.isBool=t=>"boolean"==typeof t,exports.isEmptyObj=t=>"{}"===JSON.stringify(t),exports.isFunction=r,exports.isNumber=t=>"number"==typeof t,exports.isObject=i,exports.isString=n,exports.log=e,exports.mergeConfig=p,exports.sdk=L,exports.setConfig=function(t,e){Object.prototype.hasOwnProperty.call(l,t)?l[t]=e:l.customConfig[t]=e},exports.setRequestInst=u,exports.shuntAlgorithm=G;