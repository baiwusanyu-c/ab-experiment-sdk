const t=(t,e)=>Object.assign({},t,e),e=t=>{console.info(`[cbd -- A/B test sdk] ${t}`)},n=t=>"boolean"==typeof t,r=t=>"string"==typeof t&&t.constructor==String,i=t=>"number"==typeof t,s=t=>"[object Function]"===Object.prototype.toString.call(t)||"[object AsyncFunction]"===Object.prototype.toString.call(t),o=t=>"{}"===JSON.stringify(t);function a(t){return null!=t&&"[object Object]"==toString.call(t)}const u=(t,e=Array.isArray)=>e?e(t):"[object Array]"===toString.call(t);function c(t){const e={};return function t(e,n){for(const r in n){const i=n[r];u(i)?(e[r]=[],t(e[r],i)):a(i)?(e[r]={},t(e[r],i)):e[r]=i}}(e,t),e}let f=null;const h=async t=>(f=t,f);async function l(t){const e=await function(t,e={}){return new Promise((n=>{f.then((r=>{r.default(t,{params:e},!1).then((t=>{t&&200===t.code&&t.data&&t.data.length>0?n(t.data):(n(void 0),console.warn(t.msg))})).catch((t=>{n(void 0),console.warn("Request error:",t)}))}))}))}("experiment/config/list",t);return e}var g;!function(t){t.WEB="web",t.MINI_WECHAT="mini-wechat",t.MINI_DOUYIN="mini-douyin"}(g||(g={}));const p={appKey:void 0,auto_report:!1,reportChannel:"cn",log:!1,enableAbTest:!0,clear_ab_cache_on_user_change:!1,customConfig:{},autoRefresh:!1,autoRefreshStep:0,userId:""},d=function(t,e){Object.prototype.hasOwnProperty.call(p,t)?p[t]=e:p.customConfig[t]=e},y=(e,n=e)=>t(n,e);var m=function(t,e){return t.reduce((function(t,n){var r="[object "+n+"]";return e?t[r]=n:t[n]=r,t}),{})},v=function(t){return t.reduce((function(t,e){return t[e]=!0,t}),{})},b=["Array","Arguments","Object","RegExp","Symbol","Map","Set","Date","Error","Event","Generator","Promise","WeakMap","WeakSet","DocumentFragment","Float32Array","Float64Array","Int8Array","Int16Array","Int32Array","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","ArrayBuffer","DataView","DocumentFragment","Window","String","Number","Boolean","Function","Undefined","GeneratorFunction","BigInt","Null"],x=m(b,!1),C=m(b,!0),A=v([x.Generator,x.Promise,x.WeakMap,x.WeakSet]),I=v([x.Map,x.Set]),O=v([x.Date,x.RegExp]),k=v(["bigint","boolean","function","number","string","undefined"]),j=v([x.Arguments,x.Array]),w=v([x.RegExp,x.Symbol]),T=v([x.Float32Array,x.Float64Array,x.Int8Array,x.Int16Array,x.Int32Array,x.Uint8Array,x.Uint8ClampedArray,x.Uint16Array,x.Uint32Array]),E="undefined"!=typeof Buffer&&"function"==typeof Buffer.from,R="function"==typeof Uint16Array;function S(t){return String.fromCharCode.apply(null,new Uint16Array(t))}function U(t){return Buffer.from(t).toString("utf8")}function M(t){return""}var P=E?U:R?S:M,_=/\[object ([HTML|SVG](.*)Element)\]/,N=Object.prototype.toString,F=Object.keys;function D(t,e){return t>e}function B(t,e){return t[0]>e[0]}function V(t,e){for(var n,r,i=0;i<t.length;++i){for(r=t[i],n=i-1;~n&&e(t[n],r);--n)t[n+1]=t[n];t[n+1]=r}return t}function W(t){for(var e,n=V(F(t),D),r={},i=0;i<n.length;++i)r[e=n[i]]=t[e];return r}function z(t,e){for(var n=0;n<t.length;++n)if(t[n]===e)return n+1;return 0}function H(t,e,n,r){if(!r){var i=typeof t;if(k[i])return i+"|"+t;if(null===t)return t+"|"+t}var s,o=r||N.call(t);return j[o]?t:o===x.Object?W(t):w[o]?C[o]+"|"+t.toString():I[o]?t instanceof Map?function(t,e,n){var r=[];t.forEach((function(t,i){r.push([K(i,e,n),K(t,e,n)])})),V(r,B);for(var i,s=0;s<r.length;++s)i=r[s],r[s]="["+i[0]+","+i[1]+"]";return"Map|["+r.join(",")+"]"}(t,e,n):function(t,e,n){var r=[];return t.forEach((function(t){r.push(K(t,e,n))})),V(r,D),"Set|["+r.join(",")+"]"}(t,e,n):o===x.Date?C[o]+"|"+t.getTime():o===x.Error?C[o]+"|"+t.stack:o===x.Event?{bubbles:(s=t).bubbles,cancelBubble:s.cancelBubble,cancelable:s.cancelable,composed:s.composed,currentTarget:s.currentTarget,defaultPrevented:s.defaultPrevented,eventPhase:s.eventPhase,isTrusted:s.isTrusted,returnValue:s.returnValue,target:s.target,type:s.type}:A[o]?C[o]+"|NOT_ENUMERABLE":_.test(o)?o.slice(8,-1)+"|"+t.outerHTML:o===x.DocumentFragment?C[o]+"|"+function(t){for(var e=t.children,n=[],r=0;r<e.length;++r)n.push(e[r].outerHTML);return n.join(",")}(t):T[o]?C[o]+"|"+t.join(","):o===x.ArrayBuffer?C[o]+"|"+P(t):o===x.DataView?C[o]+"|"+P(t.buffer):t}function K(t,e,n){if(!t||"object"!=typeof t)return H(t,e,n);var r=N.call(t);return O[r]?H(t,e,n,r):JSON.stringify(t,function(t,e){return void 0===t&&(t=[]),void 0===e&&(e=[]),function(n,r){if("object"==typeof r)if(t.length){var i=z(t,this);0===i?t.push(this):(t.splice(i),e.splice(i)),e.push(n);var s=z(t,r);if(0!==s)return"[~"+(e.slice(0,s).join(".")||".")+"]";t.push(r)}else t[0]=r,e[0]=n;return n&&this[n]instanceof Date?H(this[n],t,e,x.Date):H(r,t,e)}}(e,n))}function q(t){return function(t){for(var e,n=t.length,r=5381,i=52711;n--;)r=33*r^(e=t.charCodeAt(n)),i=33*i^e;return 4096*(r>>>0)+(i>>>0)}(K(t))}function G(t,e){return q(t)===q(e)}G.all=function(t){for(var e=0;e<(arguments.length<=1?0:arguments.length-1);++e)if(!G(t,e+1<1||arguments.length<=e+1?void 0:arguments[e+1]))return!1;return!0},G.any=function(t){for(var e=0;e<(arguments.length<=1?0:arguments.length-1);++e)if(G(t,e+1<1||arguments.length<=e+1?void 0:arguments[e+1]))return!0;return!1},G.not=function(t,e){return q(t)!==q(e)},q.is=G;const L=t=>{const e=t.expConfig,n={};return e.forEach((e=>{const r=Y(t.configOption.userId,e.experimentTrafficWeight);n[e.experimentId]={...e,...r}})),n},Y=(t,e)=>{const n=Math.abs(q(t))%1e3/10;return{isEntry:n<=e,hashVal:n}},J=(t,e,n)=>{let r=0;const i=e,s=i.hashVal*(100/i.experimentTrafficWeight),o={msg:"group successfully",res:{isEntryVersion:!1,versionId:0,versionParam:{}},status:!1};for(let e=0;e<i.versions.length;e++)if(r+=i.versions[e].versionTrafficWeight,s<r&&(!i.versions[e].whitelist||i.versions[e].whitelist.indexOf(t.configOption.userId)<0)){o.res={isEntryVersion:!0,versionId:i.versions[e].versionId,versionParam:i.versions[e].versionParam},o.status=!0;break}return o},$={configOption:{},log:!1,expConfig:[],timer:0,isInit:!1,shuntRes:{},groupRes:{},getExpConfig:Function,init(t,n){this.log&&e("init running"),this.getExpConfig=n||et,this.configOption=y(t,p),this.log=this.configOption.log,this.isInit=!0},async start(t){return this.isInit?(this.log&&e("start running"),this.expConfig=await this.getExpConfig(this.configOption.appKey,this),this.configOption.autoRefresh&&nt(this),this.expConfig&&0!==this.expConfig.length?(this.shuntRes=L(this),this.log&&e("shunt successfully"),t&&t({res:{expConfig:this.expConfig,shuntRes:this.shuntRes,sdk:this},msg:"shunt successfully",status:!0})):t&&t({res:{expConfig:[],shuntRes:{},sdk:this},msg:"unknown exception",status:!1})):(t&&t({res:void 0,msg:"sdk not initialized",status:!1}),void(this.log&&e("sdk not initialized")))},getVar(t,n,r){this.log&&e("getVar running");const i=this.shuntRes[t];if(i&&i.isEntry){let t=J(this,i);this.log&&e("group successfully"),t.status?(this.groupRes=t,r&&r(this.groupRes)):r&&r({res:n,msg:"user did not enter the version",status:!1})}i&&!i.isEntry&&(this.log&&e("user did not enter the experiment"),r&&r({res:n,msg:"user did not enter the experiment",status:!1})),i&&0!==this.expConfig.length||(this.log&&e("unknown exception"),r&&r({res:n,msg:"unknown exception",status:!1}))},config(t,n){this.configOption=y(t,this.configOption),this.log&&e("config set success !")},async refresh(t){return this.isInit?(this.expConfig=await this.getExpConfig(this.configOption.appKey,this),this.expConfig&&0!==this.expConfig.length?(this.shuntRes=L(this),this.log&&e("shunt successfully"),t&&t({res:{expConfig:this.expConfig,shuntRes:this.shuntRes,sdk:this},msg:"shunt successfully",status:!0})):t&&t({res:{expConfig:[],shuntRes:{},sdk:this},msg:"unknown exception",status:!1})):(t&&t({res:void 0,msg:"sdk not initialized",status:!1}),void(this.log&&e("sdk not initialized")))},resetInstance(){this.configOption={},this.log=!1,this.expConfig=[],this.timer&&clearTimeout(this.timer),this.timer=0,this.isInit=!1,this.shuntRes={},this.groupRes={}}},Q=new Map;function X(t,...e){let n="",i="";if(r(t)?n=t:(n=t.funcName,i=t.sdkKey),i){if(!Q.get(i)&&"init"===n){const t=Z(n,$,...e);return Q.set(i,c($)),t}return Q.get(i)||"init"===n?Z(n,Q.get(i),...e):{res:{expConfig:{},shuntRes:{},sdk:Q.get(i)},msg:"sdkKey does not exist"}}return Z(n,$,...e)}const Z=(t,e,...n)=>{if("start"===t||"refresh"===t)return new Promise((r=>{e[t].call(e,r,...n)}));if("init"!==t&&"resetInstance"!==t&&!$.isInit){const e={res:void 0,msg:"sdk not initialized",status:!1};return"getVar"===t&&n[2]&&s(n[2])&&n[2](e),e}return e[t]&&s(e[t])&&e[t].call(e,...n),e},et=async(t,n,r=l)=>{const i={appKey:t},s=await r(i);return s?(n.log&&e("The experimental parameters were successfully obtained"),s):(n.log&&e("Failed to get experimental parameters"),[])},nt=t=>{const e=t.configOption.autoRefreshStep;t.timer=setInterval((async()=>{t.refresh()}),e)};h(Promise.resolve().then((function(){return ft})));const rt=(t,...e)=>X(t,...e);var it,st;!function(t){t.json="application/json;charset=UTF-8"}(it||(it={})),function(t){t.post="POST"}(st||(st={}));const ot=t=>t&&void 0!==t["Content-Type"]?t["Content-Type"]:(t&&(t.method,st.post),it.json),at=t=>`http://47.96.100.195/api/${t.replace("//","/")}`,ut=(t,e)=>{const n=e&&void 0!==e.token?e.token:"",r="mini-douyin";return r===g.MINI_WECHAT||r===g.MINI_DOUYIN?{token:n,"Content-Type":t}:new Headers({token:n,"Content-Type":t})};const ct=t=>t;var ft=Object.freeze({__proto__:null,default:async(t,n={params:{},method:"POST",headers:{"Content-Type":it.json,token:""},token:"","Content-Type":it.json})=>{const{reqUrl:r,headers:i}=function(t,e){const n=ot(e);return{contentType:n,reqUrl:at(t),headers:ut(n,e)}}(t,n),s=await function(t,n,r){return new Promise(((i,s)=>{("mini-douyin"===g.MINI_DOUYIN?tt:wx).request({url:t,method:st.post,data:r.params,header:{...n},success:t=>{200===t.statusCode?i(t.data):s(t)},fail:t=>{s(t),e(t.message)}})}))}(r,i,n);return ct(s)}});export{rt as ABTest,g as ENV,J as abTestGrouping,L as abTestShunt,nt as autoRefresh,X as cbdABTest,c as deepCopy,l as experimentConfig,t as extend,et as getExperimentConfig,u as isArray,n as isBool,o as isEmptyObj,s as isFunction,i as isNumber,a as isObject,r as isString,e as log,y as mergeConfig,$ as sdk,d as setConfig,h as setRequestInst,Y as shuntAlgorithm};
