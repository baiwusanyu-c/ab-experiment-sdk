const t=(t,n)=>Object.assign({},t,n),n=t=>{console.info(`[cbd -- A/B test sdk] ${t}`)},e=t=>"boolean"==typeof t,r=t=>"string"==typeof t&&t.constructor==String,i=t=>"number"==typeof t,o=t=>"[object Function]"===Object.prototype.toString.call(t)||"[object AsyncFunction]"===Object.prototype.toString.call(t),s=t=>"{}"===JSON.stringify(t);function a(t){return null!=t&&"[object Object]"==toString.call(t)}const u=(t,n=Array.isArray)=>n?n(t):"[object Array]"===toString.call(t);function c(t){const n={};return function t(n,e){for(const r in e){const i=e[r];u(i)?(n[r]=[],t(n[r],i)):a(i)?(n[r]={},t(n[r],i)):n[r]=i}}(n,t),n}let f=null;const l=async t=>(f=t,f);async function h(t){const n=await function(t,n={}){return new Promise((e=>{f.then((r=>{r.default(t,{params:n},!1).then((t=>{t&&200===t.code&&t.data&&t.data.length>0?e(t.data):(e(void 0),console.warn(t.msg))})).catch((t=>{e(void 0),console.warn("Request error:",t)}))}))}))}("experiment/config/list",t);return n}var g;!function(t){t.WEB="web",t.MINI_WECHAT="mini-wechat",t.MINI_DOUYIN="mini-douyin"}(g||(g={}));const p={appKey:void 0,auto_report:!1,reportChannel:"cn",log:!1,enableAbTest:!0,clear_ab_cache_on_user_change:!1,customConfig:{},autoRefresh:!1,autoRefreshStep:0,userId:""},y=function(t,n){Object.prototype.hasOwnProperty.call(p,t)?p[t]=n:p.customConfig[t]=n},d=(n,e=n)=>t(e,n);function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}var b=function(t,n){return t.reduce((function(t,e){var r="[object "+e+"]";return n?t[r]=e:t[e]=r,t}),{})},v=function(t){return t.reduce((function(t,n){return t[n]=!0,t}),{})},x=["Array","Arguments","Object","RegExp","Symbol","Map","Set","Date","Error","Event","Generator","Promise","WeakMap","WeakSet","DocumentFragment","Float32Array","Float64Array","Int8Array","Int16Array","Int32Array","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","ArrayBuffer","DataView","DocumentFragment","Window","String","Number","Boolean","Function","Undefined","GeneratorFunction","BigInt","Null"],C=b(x,!1),A=b(x,!0),O=v([C.Generator,C.Promise,C.WeakMap,C.WeakSet]),w=v([C.Map,C.Set]),I=v([C.Date,C.RegExp]),k=v(["bigint","boolean","function","number","string","undefined"]),j=v([C.Arguments,C.Array]),S=v([C.RegExp,C.Symbol]),T=v([C.Float32Array,C.Float64Array,C.Int8Array,C.Int16Array,C.Int32Array,C.Uint8Array,C.Uint8ClampedArray,C.Uint16Array,C.Uint32Array]),E="undefined"!=typeof Buffer&&"function"==typeof Buffer.from,R="function"==typeof Uint16Array;function U(t){return String.fromCharCode.apply(null,new Uint16Array(t))}function M(t){return Buffer.from(t).toString("utf8")}function P(t){return""}var _=E?M:R?U:P,F=/\[object ([HTML|SVG](.*)Element)\]/,N=Object.prototype.toString,D=Object.keys;function B(t,n){return t>n}function V(t,n){return t[0]>n[0]}function W(t,n){for(var e,r,i=0;i<t.length;++i){for(r=t[i],e=i-1;~e&&n(t[e],r);--e)t[e+1]=t[e];t[e+1]=r}return t}function z(t){for(var n,e=W(D(t),B),r={},i=0;i<e.length;++i)r[n=e[i]]=t[n];return r}function H(t,n){for(var e=0;e<t.length;++e)if(t[e]===n)return e+1;return 0}function K(t,n,e,r){if(!r){var i=m(t);if(k[i])return i+"|"+t;if(null===t)return t+"|"+t}var o,s=r||N.call(t);return j[s]?t:s===C.Object?z(t):S[s]?A[s]+"|"+t.toString():w[s]?t instanceof Map?function(t,n,e){var r=[];t.forEach((function(t,i){r.push([G(i,n,e),G(t,n,e)])})),W(r,V);for(var i,o=0;o<r.length;++o)i=r[o],r[o]="["+i[0]+","+i[1]+"]";return"Map|["+r.join(",")+"]"}(t,n,e):function(t,n,e){var r=[];return t.forEach((function(t){r.push(G(t,n,e))})),W(r,B),"Set|["+r.join(",")+"]"}(t,n,e):s===C.Date?A[s]+"|"+t.getTime():s===C.Error?A[s]+"|"+t.stack:s===C.Event?{bubbles:(o=t).bubbles,cancelBubble:o.cancelBubble,cancelable:o.cancelable,composed:o.composed,currentTarget:o.currentTarget,defaultPrevented:o.defaultPrevented,eventPhase:o.eventPhase,isTrusted:o.isTrusted,returnValue:o.returnValue,target:o.target,type:o.type}:O[s]?A[s]+"|NOT_ENUMERABLE":F.test(s)?s.slice(8,-1)+"|"+t.outerHTML:s===C.DocumentFragment?A[s]+"|"+function(t){for(var n=t.children,e=[],r=0;r<n.length;++r)e.push(n[r].outerHTML);return e.join(",")}(t):T[s]?A[s]+"|"+t.join(","):s===C.ArrayBuffer?A[s]+"|"+_(t):s===C.DataView?A[s]+"|"+_(t.buffer):t}function G(t,n,e){if(!t||"object"!==m(t))return K(t,n,e);var r=N.call(t);return I[r]?K(t,n,e,r):JSON.stringify(t,function(t,n){return void 0===t&&(t=[]),void 0===n&&(n=[]),function(e,r){if("object"===m(r))if(t.length){var i=H(t,this);0===i?t.push(this):(t.splice(i),n.splice(i)),n.push(e);var o=H(t,r);if(0!==o)return"[~"+(n.slice(0,o).join(".")||".")+"]";t.push(r)}else t[0]=r,n[0]=e;return e&&this[e]instanceof Date?K(this[e],t,n,C.Date):K(r,t,n)}}(n,e))}function L(t){return function(t){for(var n,e=t.length,r=5381,i=52711;e--;)r=33*r^(n=t.charCodeAt(e)),i=33*i^n;return 4096*(r>>>0)+(i>>>0)}(G(t))}function q(t,n){return L(t)===L(n)}q.all=function(t){for(var n=0;n<(arguments.length<=1?0:arguments.length-1);++n)if(!q(t,n+1<1||arguments.length<=n+1?void 0:arguments[n+1]))return!1;return!0},q.any=function(t){for(var n=0;n<(arguments.length<=1?0:arguments.length-1);++n)if(q(t,n+1<1||arguments.length<=n+1?void 0:arguments[n+1]))return!0;return!1},q.not=function(t,n){return L(t)!==L(n)},L.is=q;const J=t=>{const n=t.expConfig,e={};return n.forEach((n=>{const r=Y(t.configOption.userId,n.experimentTrafficWeight);e[n.experimentId]={...n,...r}})),e},Y=(t,n)=>{const e=Math.abs(L(t))%1e3/10;return{isEntry:e<=n,hashVal:e}},$=(t,n,e)=>{let r=0;const i=n,o=i.hashVal*(100/i.experimentTrafficWeight),s={msg:"group successfully",res:{isEntryVersion:!1,versionId:0,versionParam:{}},status:!1};for(let n=0;n<i.versions.length;n++)if(r+=i.versions[n].versionTrafficWeight,o<r&&(!i.versions[n].whitelist||i.versions[n].whitelist.indexOf(t.configOption.userId)<0)){s.res={isEntryVersion:!0,versionId:i.versions[n].versionId,versionParam:i.versions[n].versionParam},s.status=!0;break}return s},Q={configOption:{},log:!1,expConfig:[],timer:0,isInit:!1,shuntRes:{},groupRes:{},getExpConfig:Function,init(t,e){this.log&&n("init running"),this.getExpConfig=e||nt,this.configOption=d(t,p),this.log=this.configOption.log,this.isInit=!0},async start(t){return this.isInit?(this.log&&n("start running"),this.expConfig=await this.getExpConfig(this.configOption.appKey,this),this.configOption.autoRefresh&&et(this),this.expConfig&&0!==this.expConfig.length?(this.shuntRes=J(this),this.log&&n("shunt successfully"),t&&t({res:{expConfig:this.expConfig,shuntRes:this.shuntRes,sdk:this},msg:"shunt successfully",status:!0})):t&&t({res:{expConfig:[],shuntRes:{},sdk:this},msg:"unknown exception",status:!1})):(t&&t({res:void 0,msg:"sdk not initialized",status:!1}),void(this.log&&n("sdk not initialized")))},getVar(t,e,r){this.log&&n("getVar running");const i=this.shuntRes[t];if(i&&i.isEntry){let t=$(this,i);this.log&&n("group successfully"),t.status?(this.groupRes=t,r&&r(this.groupRes)):r&&r({res:e,msg:"user did not enter the version",status:!1})}i&&!i.isEntry&&(this.log&&n("user did not enter the experiment"),r&&r({res:e,msg:"user did not enter the experiment",status:!1})),i&&0!==this.expConfig.length||(this.log&&n("unknown exception"),r&&r({res:e,msg:"unknown exception",status:!1}))},config(t,e){this.configOption=d(t,this.configOption),this.log&&n("config set success !")},async refresh(t){return this.isInit?(this.expConfig=await this.getExpConfig(this.configOption.appKey,this),this.expConfig&&0!==this.expConfig.length?(this.shuntRes=J(this),this.log&&n("shunt successfully"),t&&t({res:{expConfig:this.expConfig,shuntRes:this.shuntRes,sdk:this},msg:"shunt successfully",status:!0})):t&&t({res:{expConfig:[],shuntRes:{},sdk:this},msg:"unknown exception",status:!1})):(t&&t({res:void 0,msg:"sdk not initialized",status:!1}),void(this.log&&n("sdk not initialized")))},resetInstance(){this.configOption={},this.log=!1,this.expConfig=[],this.timer&&clearTimeout(this.timer),this.timer=0,this.isInit=!1,this.shuntRes={},this.groupRes={}}},X=new Map;function Z(t,...n){let e="",i="";if(r(t)?e=t:(e=t.funcName,i=t.sdkKey),i){if(!X.get(i)&&"init"===e){const t=tt(e,Q,...n);return X.set(i,c(Q)),t}return X.get(i)||"init"===e?tt(e,X.get(i),...n):{res:{expConfig:{},shuntRes:{},sdk:X.get(i)},msg:"sdkKey does not exist"}}return tt(e,Q,...n)}const tt=(t,n,...e)=>{if("start"===t||"refresh"===t)return new Promise((r=>{n[t].call(n,r,...e)}));if("init"!==t&&"resetInstance"!==t&&!Q.isInit){const n={res:void 0,msg:"sdk not initialized",status:!1};return"getVar"===t&&e[2]&&o(e[2])&&e[2](n),n}return n[t]&&o(n[t])&&n[t].call(n,...e),n},nt=async(t,e,r=h)=>{const i={appKey:t},o=await r(i);return o?(e.log&&n("The experimental parameters were successfully obtained"),o):(e.log&&n("Failed to get experimental parameters"),[])},et=t=>{const n=t.configOption.autoRefreshStep;t.timer=setInterval((async()=>{t.refresh()}),n)};l(Promise.resolve().then((function(){return lt})));const rt=(t,...n)=>Z(t,...n);var it,ot;!function(t){t.json="application/json;charset=UTF-8"}(it||(it={})),function(t){t.post="POST"}(ot||(ot={}));const st=t=>t&&void 0!==t["Content-Type"]?t["Content-Type"]:(t&&(t.method,ot.post),it.json),at=t=>`http://47.96.100.195/api/${t.replace("//","/")}`,ut=(t,n)=>{const e=n&&void 0!==n.token?n.token:"";return"web"===g.MINI_WECHAT||"web"===g.MINI_DOUYIN?{token:e,"Content-Type":t}:new Headers({token:e,"Content-Type":t})};const ct=async t=>{const n=await ft(t);if(t.ok)return n;throw n},ft=async t=>{const n=t.headers.get("Content-Type");let e;return n?(n.indexOf("json")>-1&&(e=await t.json()),n.indexOf("text")>-1&&(e=await t.text()),n.indexOf("form")>-1&&(e=await t.formData()),n.indexOf("video")>-1&&(e=await t.blob())):e=await t.text(),e};var lt=Object.freeze({__proto__:null,default:async(t,n={params:{},method:"POST",headers:{"Content-Type":it.json,token:""},token:"","Content-Type":it.json})=>{const{reqUrl:e,headers:r}=function(t,n){const e=st(n);return{contentType:e,reqUrl:at(t),headers:ut(e,n)}}(t,n),i=await async function(t,n,e){return await fetch(t,{body:JSON.stringify(e.params),headers:n,method:ot.post})}(e,r,n);return ct(i)}});export{rt as ABTest,g as ENV,$ as abTestGrouping,J as abTestShunt,et as autoRefresh,Z as cbdABTest,c as deepCopy,h as experimentConfig,t as extend,nt as getExperimentConfig,u as isArray,e as isBool,s as isEmptyObj,o as isFunction,i as isNumber,a as isObject,r as isString,n as log,d as mergeConfig,Q as sdk,y as setConfig,l as setRequestInst,Y as shuntAlgorithm};
