import{B as e,R as t}from"./utils-BgARXyzi.js";import{h as n,t as r}from"./jsx-runtime-DlWfbcA0.js";import{t as i}from"./AppLink-B3nbRAs1.js";import{t as a}from"./url-5X1jjEVf.js";import{t as o}from"./InkUIProvider-B1YvbVhc.js";import"./index-Dp0Kxu4n.js";var s=r(),c=Array.isArray,l=Array.prototype.indexOf,u=Array.prototype.includes,d=Array.from,f=Object.keys,p=Object.defineProperty,m=Object.getOwnPropertyDescriptor,h=Object.getOwnPropertyDescriptors,ee=Object.prototype,te=Array.prototype,g=Object.getPrototypeOf,ne=Object.isExtensible,re=()=>{};function _(e){for(var t=0;t<e.length;t++)e[t]()}function ie(){var e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}}var v=2,y=4,ae=8,oe=1<<24,b=16,x=32,S=64,se=128,ce=512,C=1024,w=2048,T=4096,le=8192,ue=16384,E=32768,de=1<<25,fe=65536,pe=1<<17,me=1<<18,he=1<<19,D=65536,ge=1<<21,_e=1<<23,ve=Symbol(`$state`),ye=Symbol(`legacy props`),be=Symbol(``),xe=Symbol(`attributes`),Se=Symbol(`class`),Ce=Symbol(`style`),we=Symbol(`text`),Te=Symbol(`form reset`),Ee=new class extends Error{name=`StaleReactionError`;message="The reaction that called `getAbortSignal()` was re-run or destroyed"},De=!!globalThis.document?.contentType&&globalThis.document.contentType.includes(`xml`),Oe=3,ke=8;function Ae(e){return e===this.v}function je(e,t){return e==e?e!==t||typeof e==`object`&&!!e||typeof e==`function`:t==t}function Me(e){return!je(e,this.v)}function Ne(e){throw Error(`https://svelte.dev/e/lifecycle_outside_component`)}function Pe(){throw Error(`https://svelte.dev/e/async_derived_orphan`)}function Fe(e){throw Error(`https://svelte.dev/e/effect_in_teardown`)}function Ie(){throw Error(`https://svelte.dev/e/effect_in_unowned_derived`)}function Le(e){throw Error(`https://svelte.dev/e/effect_orphan`)}function Re(){throw Error(`https://svelte.dev/e/effect_update_depth_exceeded`)}function ze(){throw Error(`https://svelte.dev/e/hydration_failed`)}function Be(){throw Error(`https://svelte.dev/e/state_descriptors_fixed`)}function Ve(){throw Error(`https://svelte.dev/e/state_prototype_fixed`)}function He(){throw Error(`https://svelte.dev/e/state_unsafe_mutation`)}function Ue(){throw Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`)}var We=1,Ge=2,Ke=`[`,qe=`[!`,Je=`[?`,Ye=`]`,Xe={},O=Symbol(`uninitialized`),Ze=`http://www.w3.org/1999/xhtml`,Qe=`http://www.w3.org/2000/svg`,$e=`http://www.w3.org/1998/Math/MathML`,et=`@attach`,k=null;function A(e){k=e}function tt(e,t=!1,n){k={p:k,i:!1,c:null,e:null,s:e,x:null,r:W,l:null}}function nt(e){var t=k,n=t.e;if(n!==null){t.e=null;for(var r of n)br(r)}return e!==void 0&&(t.x=e),t.i=!0,k=t.p,e??{}}function rt(){return!0}var j=[];function it(){var e=j;j=[],_(e)}function at(e){if(j.length===0&&!Xt){var t=j;queueMicrotask(()=>{t===j&&it()})}j.push(e)}function ot(){for(;j.length>0;)it()}function st(){console.warn(`https://svelte.dev/e/derived_inert`)}function ct(e){console.warn(`https://svelte.dev/e/hydration_mismatch`)}function lt(){console.warn(`https://svelte.dev/e/select_multiple_invalid_value`)}function ut(){console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`)}var M=!1;function dt(e){M=e}var N;function P(e){if(e===null)throw ct(),Xe;return N=e}function ft(){return P(Dt(N))}function F(e){if(M){if(Dt(N)!==null)throw ct(),Xe;N=e}}function pt(e=1){if(M){for(var t=e,n=N;t--;)n=Dt(n);N=n}}function mt(e=!0){for(var t=0,n=N;;){if(n.nodeType===ke){var r=n.data;if(r===Ye){if(t===0)return n;--t}else(r===Ke||r===qe||r[0]===`[`&&!isNaN(Number(r.slice(1))))&&(t+=1)}var i=Dt(n);e&&n.remove(),n=i}}function ht(e){if(!e||e.nodeType!==ke)throw ct(),Xe;return e.data}function gt(e){if(typeof e!=`object`||!e||ve in e)return e;let t=g(e);if(t!==ee&&t!==te)return e;var n=new Map,r=c(e),i=V(0),a=tr,o=e=>{if(tr===a)return e();var t=U,n=tr;Gn(null),nr(a);var r=e();return Gn(t),nr(n),r};return r&&n.set(`length`,V(e.length)),new Proxy(e,{defineProperty(e,t,r){(!(`value`in r)||r.configurable===!1||r.enumerable===!1||r.writable===!1)&&Be();var i=n.get(t);return i===void 0?o(()=>{var e=V(r.value);return n.set(t,e),e}):H(i,r.value,!0),!0},deleteProperty(e,t){var r=n.get(t);if(r===void 0){if(t in e){let e=o(()=>V(O));n.set(t,e),Pn(i)}}else H(r,O),Pn(i);return!0},get(t,r,i){if(r===ve)return e;var a=n.get(r),s=r in t;if(a===void 0&&(!s||m(t,r)?.writable)&&(a=o(()=>V(gt(s?t[r]:O))),n.set(r,a)),a!==void 0){var c=G(a);return c===O?void 0:c}return Reflect.get(t,r,i)},getOwnPropertyDescriptor(e,t){var r=Reflect.getOwnPropertyDescriptor(e,t);if(r&&`value`in r){var i=n.get(t);i&&(r.value=G(i))}else if(r===void 0){var a=n.get(t),o=a?.v;if(a!==void 0&&o!==O)return{enumerable:!0,configurable:!0,value:o,writable:!0}}return r},has(e,t){if(t===ve)return!0;var r=n.get(t),i=r!==void 0&&r.v!==O||Reflect.has(e,t);return(r!==void 0||W!==null&&(!i||m(e,t)?.writable))&&(r===void 0&&(r=o(()=>V(i?gt(e[t]):O)),n.set(t,r)),G(r)===O)?!1:i},set(e,t,a,s){var c=n.get(t),l=t in e;if(r&&t===`length`)for(var u=a;u<c.v;u+=1){var d=n.get(u+``);d===void 0?u in e&&(d=o(()=>V(O)),n.set(u+``,d)):H(d,O)}if(c===void 0)(!l||m(e,t)?.writable)&&(c=o(()=>V(void 0)),H(c,gt(a)),n.set(t,c));else{l=c.v!==O;var f=o(()=>gt(a));H(c,f)}var p=Reflect.getOwnPropertyDescriptor(e,t);if(p?.set&&p.set.call(s,a),!l){if(r&&typeof t==`string`){var h=n.get(`length`),ee=Number(t);Number.isInteger(ee)&&ee>=h.v&&H(h,ee+1)}Pn(i)}return!0},ownKeys(e){G(i);var t=Reflect.ownKeys(e).filter(e=>{var t=n.get(e);return t===void 0||t.v!==O});for(var[r,a]of n)a.v!==O&&!(r in e)&&t.push(r);return t},setPrototypeOf(){Ve()}})}function _t(e){try{if(typeof e==`object`&&e&&ve in e)return e[ve]}catch{}return e}function vt(e,t){return Object.is(_t(e),_t(t))}var yt,bt,xt,St,Ct;function wt(){if(yt===void 0){yt=window,bt=document,xt=/Firefox/.test(navigator.userAgent);var e=Element.prototype,t=Node.prototype,n=Text.prototype;St=m(t,`firstChild`).get,Ct=m(t,`nextSibling`).get,ne(e)&&(e[Se]=void 0,e[xe]=null,e[Ce]=void 0,e.__e=void 0),ne(n)&&(n[we]=void 0)}}function Tt(e=``){return document.createTextNode(e)}function Et(e){return St.call(e)}function Dt(e){return Ct.call(e)}function I(e,t){if(!M)return Et(e);var n=Et(N);if(n===null)n=N.appendChild(Tt());else if(t&&n.nodeType!==Oe){var r=Tt();return n?.before(r),P(r),r}return t&&Mt(n),P(n),n}function Ot(e,t=!1){if(!M){var n=Et(e);return n instanceof Comment&&n.data===``?Dt(n):n}if(t){if(N?.nodeType!==Oe){var r=Tt();return N?.before(r),P(r),r}Mt(N)}return N}function L(e,t=1,n=!1){let r=M?N:e;for(var i;t--;)i=r,r=Dt(r);if(!M)return r;if(n){if(r?.nodeType!==Oe){var a=Tt();return r===null?i?.after(a):r.before(a),P(a),a}Mt(r)}return P(r),r}function kt(e){e.textContent=``}function At(){return!1}function jt(e,t,n){return document.createElementNS(t??Ze,e,void 0)}function Mt(e){if(e.nodeValue.length<65536)return;let t=e.nextSibling;for(;t!==null&&t.nodeType===Oe;)t.remove(),e.nodeValue+=t.nodeValue,t=e.nextSibling}function Nt(e){var t=W;if(t===null)return U.f|=_e,e;if((t.f&E)===0&&(t.f&y)===0)throw e;Pt(e,t)}function Pt(e,t){for(;t!==null;){if((t.f&se)!==0){if((t.f&E)===0)throw e;try{t.b.error(e);return}catch(t){e=t}}t=t.parent}throw e}var Ft=-7169;function R(e,t){e.f=e.f&Ft|t}function It(e){(e.f&ce)!==0||e.deps===null?R(e,C):R(e,T)}function Lt(e){if(e!==null)for(let t of e)(t.f&v)!==0&&(t.f&D)!==0&&(t.f^=D,Lt(t.deps))}function Rt(e,t,n){(e.f&w)===0?(e.f&T)!==0&&n.add(e):t.add(e),Lt(e.deps),R(e,C)}function zt(e,t,n){if(e==null)return t(void 0),re;let r=pr(()=>e.subscribe(t,n));return r.unsubscribe?()=>r.unsubscribe():r}var Bt=[];function Vt(e,t=re){let n=null,r=new Set;function i(t){if(je(e,t)&&(e=t,n)){let t=!Bt.length;for(let t of r)t[1](),Bt.push(t,e);if(t){for(let e=0;e<Bt.length;e+=2)Bt[e][0](Bt[e+1]);Bt.length=0}}}function a(t){i(t(e))}function o(o,s=re){let c=[o,s];return r.add(c),r.size===1&&(n=t(i,a)||re),o(e),()=>{r.delete(c),r.size===0&&n&&(n(),n=null)}}return{set:i,update:a,subscribe:o}}function Ht(e){let t;return zt(e,e=>t=e)(),t}var Ut=Symbol(`unmounted`);function Wt(e,t,n){let r=n[t]??={store:null,source:jn(void 0),unsubscribe:re};if(r.store!==e&&!(Ut in n))if(r.unsubscribe(),r.store=e??null,e==null)r.source.v=void 0,r.unsubscribe=re;else{var i=!0;r.unsubscribe=zt(e,e=>{i?r.source.v=e:H(r.source,e)}),i=!1}return e&&Ut in n?Ht(e):G(r.source)}function Gt(){let e={};function t(){vr(()=>{for(var t in e)e[t].unsubscribe();p(e,Ut,{enumerable:!1,value:!0})})}return[e,t]}var Kt=null,z=null,qt=null,Jt=null,Yt=null,Xt=!1,Zt=!1,Qt=null,$t=null,en=0,tn=1,nn=class e{id=tn++;#e=!1;linked=!0;#t=null;#n=null;async_deriveds=new Map;current=new Map;previous=new Map;unblocked=new Set;#r=new Set;#i=new Set;#a=new Set;#o=0;#s=new Map;#c=null;#l=[];#u=[];#d=new Set;#f=new Set;#p=new Map;#m=new Set;is_fork=!1;#h=!1;#g(){if(this.is_fork)return!0;for(let n of this.#s.keys()){for(var e=n,t=!1;e.parent!==null;){if(this.#p.has(e)){t=!0;break}e=e.parent}if(!t)return!0}return!1}skip_effect(e){this.#p.has(e)||this.#p.set(e,{d:[],m:[]}),this.#m.delete(e)}unskip_effect(e,t=e=>this.schedule(e)){var n=this.#p.get(e);if(n){this.#p.delete(e);for(var r of n.d)R(r,w),t(r);for(r of n.m)R(r,T),t(r)}this.#m.add(e)}#_(){if(this.#e=!0,en++>1e3&&(this.#C(),rn()),!this.#g()){for(let e of this.#d)this.#f.delete(e),R(e,w),this.schedule(e);for(let e of this.#f)R(e,T),this.schedule(e)}let t=this.#l;this.#l=[],this.apply();var n=Qt=[],r=[],i=$t=[];for(let e of t)try{this.#v(e,n,r)}catch(t){throw ln(e),t}if(z=null,i.length>0){var a=e.ensure();for(let e of i)a.schedule(e)}if(Qt=null,$t=null,this.#g()){this.#x(r),this.#x(n);for(let[e,t]of this.#p)cn(e,t);i.length>0&&z.#_();return}let o=this.#y();if(o){o.#b(this);return}this.#d.clear(),this.#f.clear();for(let e of this.#r)e(this);this.#r.clear(),qt=this,on(r),on(n),qt=null,this.#c?.resolve();var s=z;if(this.linked&&this.#o===0&&this.#C(),this.#l.length>0){s===null&&(s=this,this.#S());let e=s;e.#l.push(...this.#l.filter(t=>!e.#l.includes(t)))}s!==null&&s.#_()}#v(e,t,n){e.f^=C;for(var r=e.first;r!==null;){var i=r.f,a=!!(i&96);if(!(a&&(i&C)!==0||(i&le)!==0||this.#p.has(r))&&r.fn!==null){a?r.f^=C:(i&y)===0?ir(r)&&((i&b)!==0&&this.#f.add(r),lr(r)):t.push(r);var o=r.first;if(o!==null){r=o;continue}}for(;r!==null;){var s=r.next;if(s!==null){r=s;break}r=r.parent}}}#y(){for(var e=this.#t;e!==null;){if(!e.is_fork){for(let[t,[,n]]of this.current)if(e.current.has(t)&&!n)return e}e=e.#t}return null}#b(e){for(let[t,n]of e.current)!this.previous.has(t)&&e.previous.has(t)&&this.previous.set(t,e.previous.get(t)),this.current.set(t,n);for(let[t,n]of e.async_deriveds){let e=this.async_deriveds.get(t);e&&n.promise.then(e.resolve)}let t=e=>{var n=e.reactions;if(n!==null)for(let e of n){var r=e.f;if((r&v)!==0)t(e);else{var i=e;r&4194320&&!this.async_deriveds.has(i)&&(this.#f.delete(i),R(i,w),this.schedule(i))}}};for(let e of this.current.keys())t(e);this.oncommit(()=>e.discard()),e.#C(),z=this,this.#_()}#x(e){for(var t=0;t<e.length;t+=1)Rt(e[t],this.#d,this.#f)}capture(e,t,n=!1){e.v!==O&&!this.previous.has(e)&&this.previous.set(e,e.v),(e.f&_e)===0&&(this.current.set(e,[t,n]),Jt?.set(e,t)),this.is_fork||(e.v=t)}activate(){z=this}deactivate(){z=null,Jt=null}flush(){try{Zt=!0,z=this,this.#_()}finally{en=0,Yt=null,Qt=null,$t=null,Zt=!1,z=null,Jt=null,On.clear()}}discard(){for(let e of this.#i)e(this);this.#i.clear(),this.#a.clear(),this.#C()}register_created_effect(e){this.#u.push(e)}increment(e,t){if(this.#o+=1,e){let e=this.#s.get(t)??0;this.#s.set(t,e+1)}}decrement(e,t){if(--this.#o,e){let e=this.#s.get(t)??0;e===1?this.#s.delete(t):this.#s.set(t,e-1)}this.#h||(this.#h=!0,at(()=>{this.#h=!1,this.linked&&this.flush()}))}transfer_effects(e,t){for(let t of e)this.#d.add(t);for(let e of t)this.#f.add(e);e.clear(),t.clear()}oncommit(e){this.#r.add(e)}ondiscard(e){this.#i.add(e)}on_fork_commit(e){this.#a.add(e)}run_fork_commit_callbacks(){for(let e of this.#a)e(this);this.#a.clear()}settled(){return(this.#c??=ie()).promise}static ensure(){if(z===null){let t=z=new e;t.#S(),!Zt&&!Xt&&at(()=>{t.#e||t.flush()})}return z}apply(){Jt=null}schedule(e){if(Yt=e,e.b?.is_pending&&e.f&16777228&&(e.f&E)===0){e.b.defer_effect(e);return}for(var t=e;t.parent!==null;){t=t.parent;var n=t.f;if(Qt!==null&&t===W&&(U===null||(U.f&v)===0))return;if(n&96){if((n&C)===0)return;t.f^=C}}this.#l.push(t)}#S(){Kt===null?Kt=this:(Kt.#n=this,this.#t=Kt),Kt=this}#C(){var e=this.#t,t=this.#n;e===null||(e.#n=t),t===null?Kt=e:t.#t=e,this.linked=!1}};function B(e){var t=Xt;Xt=!0;try{for(var n;;){if(ot(),z===null)return n;z.flush()}}finally{Xt=t}}function rn(){try{Re()}catch(e){Pt(e,Yt)}}var an=null;function on(e){var t=e.length;if(t!==0){for(var n=0;n<t;){var r=e[n++];if(!(r.f&24576)&&ir(r)&&(an=new Set,lr(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&Pr(r),an?.size>0)){On.clear();for(let e of an){if(e.f&24576)continue;let t=[e],n=e.parent;for(;n!==null;)an.has(n)&&(an.delete(n),t.push(n)),n=n.parent;for(let e=t.length-1;e>=0;e--){let n=t[e];n.f&24576||lr(n)}}an.clear()}}an=null}}function sn(e){z.schedule(e)}function cn(e,t){if((e.f&x)===0||(e.f&C)===0){(e.f&w)===0?(e.f&T)!==0&&t.m.push(e):t.d.push(e),R(e,C);for(var n=e.first;n!==null;)cn(n,t),n=n.next}}function ln(e){R(e,C);for(var t=e.first;t!==null;)ln(t),t=t.next}function un(e){let t=0,n=An(0),r;return()=>{_r()&&(G(n),Tr(()=>(t===0&&(r=pr(()=>e(()=>Pn(n)))),t+=1,()=>{at(()=>{--t,t===0&&(r?.(),r=void 0,Pn(n))})})))}}var dn=589824;function fn(e,t,n,r){new pn(e,t,n,r)}var pn=class{parent;is_pending=!1;transform_error;#e;#t=M?N:null;#n;#r;#i;#a=null;#o=null;#s=null;#c=null;#l=0;#u=0;#d=!1;#f=new Set;#p=new Set;#m=null;#h=un(()=>(this.#m=An(this.#l),()=>{this.#m=null}));constructor(e,t,n,r){this.#e=e,this.#n=t,this.#r=e=>{var t=W;t.b=this,t.f|=se,n(e)},this.parent=W.b,this.transform_error=r??this.parent?.transform_error??(e=>e),this.#i=Dr(()=>{if(M){let e=this.#t;ft();let t=e.data===qe;if(e.data.startsWith(Je)){let t=JSON.parse(e.data.slice(2));this.#_(t)}else t?this.#v():this.#g()}else this.#y()},dn),M&&(this.#e=N)}#g(){try{this.#a=kr(()=>this.#r(this.#e))}catch(e){this.error(e)}}#_(e){let t=this.#n.failed;t&&(this.#s=kr(()=>{t(this.#e,()=>e,()=>()=>{})}))}#v(){let e=this.#n.pending;e&&(this.is_pending=!0,this.#o=kr(()=>e(this.#e)),at(()=>{var e=this.#c=document.createDocumentFragment(),t=Tt();e.append(t),this.#a=this.#x(()=>kr(()=>this.#r(t))),this.#u===0&&(this.#e.before(e),this.#c=null,Fr(this.#o,()=>{this.#o=null}),this.#b(z))}))}#y(){try{if(this.is_pending=this.has_pending_snippet(),this.#u=0,this.#l=0,this.#a=kr(()=>{this.#r(this.#e)}),this.#u>0){var e=this.#c=document.createDocumentFragment();zr(this.#a,e);let t=this.#n.pending;this.#o=kr(()=>t(this.#e))}else this.#b(z)}catch(e){this.error(e)}}#b(e){this.is_pending=!1,e.transfer_effects(this.#f,this.#p)}defer_effect(e){Rt(e,this.#f,this.#p)}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!this.#n.pending}#x(e){var t=W,n=U,r=k;Kn(this.#i),Gn(this.#i),A(this.#i.ctx);try{return nn.ensure(),e()}catch(e){return Nt(e),null}finally{Kn(t),Gn(n),A(r)}}#S(e,t){if(!this.has_pending_snippet()){this.parent&&this.parent.#S(e,t);return}this.#u+=e,this.#u===0&&(this.#b(t),this.#o&&Fr(this.#o,()=>{this.#o=null}),this.#c&&=(this.#e.before(this.#c),null))}update_pending_count(e,t){this.#S(e,t),this.#l+=e,!(!this.#m||this.#d)&&(this.#d=!0,at(()=>{this.#d=!1,this.#m&&Mn(this.#m,this.#l)}))}get_effect_pending(){return this.#h(),G(this.#m)}error(e){if(!this.#n.onerror&&!this.#n.failed)throw e;z?.is_fork?(this.#a&&z.skip_effect(this.#a),this.#o&&z.skip_effect(this.#o),this.#s&&z.skip_effect(this.#s),z.on_fork_commit(()=>{this.#C(e)})):this.#C(e)}#C(e){this.#a&&=(K(this.#a),null),this.#o&&=(K(this.#o),null),this.#s&&=(K(this.#s),null),M&&(P(this.#t),pt(),P(mt()));var t=this.#n.onerror;let n=this.#n.failed;var r=!1,i=!1;let a=()=>{if(r){ut();return}r=!0,i&&Ue(),this.#s!==null&&Fr(this.#s,()=>{this.#s=null}),this.#x(()=>{this.#y()})},o=e=>{try{i=!0,t?.(e,a),i=!1}catch(e){Pt(e,this.#i&&this.#i.parent)}n&&(this.#s=this.#x(()=>{try{return kr(()=>{var t=W;t.b=this,t.f|=se,n(this.#e,()=>e,()=>a)})}catch(e){return Pt(e,this.#i.parent),null}}))};at(()=>{var t;try{t=this.transform_error(e)}catch(e){Pt(e,this.#i&&this.#i.parent);return}typeof t==`object`&&t&&typeof t.then==`function`?t.then(o,e=>Pt(e,this.#i&&this.#i.parent)):o(t)})}};function mn(e,t,n,r){let i=vn;var a=e.filter(e=>!e.settled);if(n.length===0&&a.length===0){r(t.map(i));return}var o=W,s=hn(),c=a.length===1?a[0].promise:a.length>1?Promise.all(a.map(e=>e.promise)):null;function l(e){if((o.f&ue)===0){s();try{r(e)}catch(e){Pt(e,o)}gn()}}var u=_n();if(n.length===0){c.then(()=>l(t.map(i))).finally(u);return}function d(){Promise.all(n.map(e=>bn(e))).then(e=>l([...t.map(i),...e])).catch(e=>Pt(e,o)).finally(u)}c?c.then(()=>{s(),d(),gn()}):d()}function hn(){var e=W,t=U,n=k,r=z;return function(i=!0){Kn(e),Gn(t),A(n),i&&(e.f&ue)===0&&(r?.activate(),r?.apply())}}function gn(e=!0){Kn(null),Gn(null),A(null),e&&z?.deactivate()}function _n(){var e=W,t=e.b,n=z,r=t.is_rendered();return t.update_pending_count(1,n),n.increment(r,e),()=>{t.update_pending_count(-1,n),n.decrement(r,e)}}function vn(e){return W!==null&&(W.f|=he),{ctx:k,deps:null,effects:null,equals:Ae,f:2050,fn:e,reactions:null,rv:0,v:O,wv:0,parent:W,ac:null}}var yn=Symbol(`obsolete`);function bn(e,t,n){let r=W;r===null&&Pe();var i=void 0,a=An(O),o=!U,s=new Set;return wr(()=>{var t=W,n=ie();i=n.promise;try{Promise.resolve(e()).then(n.resolve,e=>{e!==Ee&&n.reject(e)}).finally(gn)}catch(e){n.reject(e),gn()}var c=z;if(o){if((t.f&E)!==0)var l=_n();if(r.b.is_rendered())c.async_deriveds.get(t)?.reject(yn);else for(let e of s.values())e.reject(yn);s.add(n),c.async_deriveds.set(t,n)}let u=(e,t=void 0)=>{l?.(),s.delete(n),t!==yn&&(c.activate(),t?(a.f|=_e,Mn(a,t)):((a.f&_e)!==0&&(a.f^=_e),Mn(a,e)),c.deactivate())};n.promise.then(u,e=>u(null,e||`unknown`))}),vr(()=>{for(let e of s)e.reject(yn)}),new Promise(e=>{function t(n){function r(){n===i?e(a):t(i)}n.then(r,r)}t(i)})}function xn(e){let t=vn(e);return Jn(t),t}function Sn(e){var t=e.effects;if(t!==null){e.effects=null;for(var n=0;n<t.length;n+=1)K(t[n])}}function Cn(e){var t,n=W,r=e.parent;if(!Hn&&r!==null&&e.v!==O&&r.f&24576)return st(),e.v;Kn(r);try{e.f&=-65537,Sn(e),t=or(e)}finally{Kn(n)}return t}function wn(e){var t=Cn(e);if(!e.equals(t)&&(e.wv=rr(),(!z?.is_fork||e.deps===null)&&(z===null?e.v=t:(z.capture(e,t,!0),qt?.capture(e,t,!0)),e.deps===null))){R(e,C);return}Hn||(Jt===null?It(e):(_r()||z?.is_fork)&&Jt.set(e,t))}function Tn(e){if(e.effects!==null)for(let t of e.effects)(t.teardown||t.ac)&&(t.teardown?.(),t.ac?.abort(Ee),t.fn!==null&&(t.teardown=re),t.ac=null,cr(t,0),jr(t))}function En(e){if(e.effects!==null)for(let t of e.effects)t.teardown&&t.fn!==null&&lr(t)}var Dn=new Set,On=new Map,kn=!1;function An(e,t){return{f:0,v:e,reactions:null,equals:Ae,rv:0,wv:0}}function V(e,t){let n=An(e);return Jn(n),n}function jn(e,t=!1,n=!0){let r=An(e);return t||(r.equals=Me),r}function H(e,t,n=!1){return U!==null&&(!Wn||(U.f&pe)!==0)&&rt()&&U.f&4325394&&(qn===null||!u.call(qn,e))&&He(),Mn(e,n?gt(t):t,$t)}function Mn(e,t,n=null){if(!e.equals(t)){On.set(e,Hn?t:e.v);var r=nn.ensure();if(r.capture(e,t),(e.f&v)!==0){let t=e;(e.f&w)!==0&&Cn(t),Jt===null&&It(t)}e.wv=rr(),Fn(e,w,n),W!==null&&(W.f&C)!==0&&!(W.f&96)&&(Zn===null?Qn([e]):Zn.push(e)),!r.is_fork&&Dn.size>0&&!kn&&Nn()}return t}function Nn(){kn=!1;for(let e of Dn){(e.f&C)!==0&&R(e,T);let t;try{t=ir(e)}catch{t=!0}t&&lr(e)}Dn.clear()}function Pn(e){H(e,e.v+1)}function Fn(e,t,n){var r=e.reactions;if(r!==null)for(var i=r.length,a=0;a<i;a++){var o=r[a],s=o.f,c=(s&w)===0;if(c&&R(o,t),(s&pe)!==0)Dn.add(o);else if((s&v)!==0){var l=o;Jt?.delete(l),(s&D)===0&&(s&ce&&(W===null||(W.f&ge)===0)&&(o.f|=D),Fn(l,T,n))}else if(c){var u=o;(s&b)!==0&&an!==null&&an.add(u),n===null?sn(u):n.push(u)}}}function In(e,t){if(t){let t=document.body;e.autofocus=!0,at(()=>{document.activeElement===t&&e.focus()})}}var Ln=!1;function Rn(){Ln||(Ln=!0,document.addEventListener(`reset`,e=>{Promise.resolve().then(()=>{if(!e.defaultPrevented)for(let t of e.target.elements)t[Te]?.()})},{capture:!0}))}function zn(e){var t=U,n=W;Gn(null),Kn(null);try{return e()}finally{Gn(t),Kn(n)}}function Bn(e,t,n,r=n){e.addEventListener(t,()=>zn(n));let i=e[Te];e[Te]=i?()=>{i(),r(!0)}:()=>r(!0),Rn()}var Vn=!1,Hn=!1;function Un(e){Hn=e}var U=null,Wn=!1;function Gn(e){U=e}var W=null;function Kn(e){W=e}var qn=null;function Jn(e){U!==null&&(qn===null?qn=[e]:qn.push(e))}var Yn=null,Xn=0,Zn=null;function Qn(e){Zn=e}var $n=1,er=0,tr=er;function nr(e){tr=e}function rr(){return++$n}function ir(e){var t=e.f;if((t&w)!==0)return!0;if(t&v&&(e.f&=-65537),(t&T)!==0){for(var n=e.deps,r=n.length,i=0;i<r;i++){var a=n[i];if(ir(a)&&wn(a),a.wv>e.wv)return!0}(t&ce)!==0&&Jt===null&&R(e,C)}return!1}function ar(e,t,n=!0){var r=e.reactions;if(r!==null&&!(qn!==null&&u.call(qn,e)))for(var i=0;i<r.length;i++){var a=r[i];(a.f&v)===0?t===a&&(n?R(a,w):(a.f&C)!==0&&R(a,T),sn(a)):ar(a,t,!1)}}function or(e){var t=Yn,n=Xn,r=Zn,i=U,a=qn,o=k,s=Wn,c=tr,l=e.f;Yn=null,Xn=0,Zn=null,U=l&96?null:e,qn=null,A(e.ctx),Wn=!1,tr=++er,e.ac!==null&&(zn(()=>{e.ac.abort(Ee)}),e.ac=null);try{e.f|=ge;var u=e.fn,d=u();e.f|=E;var f=e.deps,p=z?.is_fork;if(Yn!==null){var m;if(p||cr(e,Xn),f!==null&&Xn>0)for(f.length=Xn+Yn.length,m=0;m<Yn.length;m++)f[Xn+m]=Yn[m];else e.deps=f=Yn;if(_r()&&(e.f&ce)!==0)for(m=Xn;m<f.length;m++)(f[m].reactions??=[]).push(e)}else!p&&f!==null&&Xn<f.length&&(cr(e,Xn),f.length=Xn);if(rt()&&Zn!==null&&!Wn&&f!==null&&!(e.f&6146))for(m=0;m<Zn.length;m++)ar(Zn[m],e);if(i!==null&&i!==e){if(er++,i.deps!==null)for(let e=0;e<n;e+=1)i.deps[e].rv=er;if(t!==null)for(let e of t)e.rv=er;Zn!==null&&(r===null?r=Zn:r.push(...Zn))}return(e.f&_e)!==0&&(e.f^=_e),d}catch(e){return Nt(e)}finally{e.f^=ge,Yn=t,Xn=n,Zn=r,U=i,qn=a,A(o),Wn=s,tr=c}}function sr(e,t){let n=t.reactions;if(n!==null){var r=l.call(n,e);if(r!==-1){var i=n.length-1;i===0?n=t.reactions=null:(n[r]=n[i],n.pop())}}if(n===null&&(t.f&v)!==0&&(Yn===null||!u.call(Yn,t))){var a=t;(a.f&ce)!==0&&(a.f^=ce,a.f&=-65537),a.v!==O&&It(a),Tn(a),cr(a,0)}}function cr(e,t){var n=e.deps;if(n!==null)for(var r=t;r<n.length;r++)sr(e,n[r])}function lr(e){var t=e.f;if((t&ue)===0){R(e,C);var n=W,r=Vn;W=e,Vn=!0;try{t&16777232?Mr(e):jr(e),Ar(e);var i=or(e);e.teardown=typeof i==`function`?i:null,e.wv=$n}finally{Vn=r,W=n}}}async function ur(){await Promise.resolve(),B()}function G(e){var t=(e.f&v)!==0;if(U!==null&&!Wn&&(W===null||(W.f&ue)===0)&&(qn===null||!u.call(qn,e))){var n=U.deps;if((U.f&ge)!==0)e.rv<er&&(e.rv=er,Yn===null&&n!==null&&n[Xn]===e?Xn++:Yn===null?Yn=[e]:Yn.push(e));else{(U.deps??=[]).push(e);var r=e.reactions;r===null?e.reactions=[U]:u.call(r,U)||r.push(U)}}if(Hn&&On.has(e))return On.get(e);if(t){var i=e;if(Hn){var a=i.v;return((i.f&C)===0&&i.reactions!==null||fr(i))&&(a=Cn(i)),On.set(i,a),a}var o=(i.f&ce)===0&&!Wn&&U!==null&&(Vn||(U.f&ce)!==0),s=(i.f&E)===0;ir(i)&&(o&&(i.f|=ce),wn(i)),o&&!s&&(En(i),dr(i))}if(Jt?.has(e))return Jt.get(e);if((e.f&_e)!==0)throw e.v;return e.v}function dr(e){if(e.f|=ce,e.deps!==null)for(let t of e.deps)(t.reactions??=[]).push(e),(t.f&v)!==0&&(t.f&ce)===0&&(En(t),dr(t))}function fr(e){if(e.v===O)return!0;if(e.deps===null)return!1;for(let t of e.deps)if(On.has(t)||(t.f&v)!==0&&fr(t))return!0;return!1}function pr(e){var t=Wn;try{return Wn=!0,e()}finally{Wn=t}}function mr(e){W===null&&(U===null&&Le(),Ie()),Hn&&Fe()}function hr(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function gr(e,t){var n=W;n!==null&&(n.f&le)!==0&&(e|=le);var r={ctx:k,deps:null,nodes:null,f:e|2560,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};z?.register_created_effect(r);var i=r;if((e&y)!==0)Qt===null?nn.ensure().schedule(r):Qt.push(r);else if(t!==null){try{lr(r)}catch(e){throw K(r),e}i.deps===null&&i.teardown===null&&i.nodes===null&&i.first===i.last&&(i.f&he)===0&&(i=i.first,(e&b)!==0&&(e&fe)!==0&&i!==null&&(i.f|=fe))}if(i!==null&&(i.parent=n,n!==null&&hr(i,n),U!==null&&(U.f&v)!==0&&(e&S)===0)){var a=U;(a.effects??=[]).push(i)}return r}function _r(){return U!==null&&!Wn}function vr(e){let t=gr(ae,null);return R(t,C),t.teardown=e,t}function yr(e){mr();var t=W.f;if(!U&&(t&x)!==0&&(t&E)===0){var n=k;(n.e??=[]).push(e)}else return br(e)}function br(e){return gr(1048580,e)}function xr(e){nn.ensure();let t=gr(524352,e);return()=>{K(t)}}function Sr(e){nn.ensure();let t=gr(524352,e);return(e={})=>new Promise(n=>{e.outro?Fr(t,()=>{K(t),n(void 0)}):(K(t),n(void 0))})}function Cr(e){return gr(y,e)}function wr(e){return gr(4718592,e)}function Tr(e,t=0){return gr(ae|t,e)}function Er(e,t=[],n=[],r=[]){mn(r,t,n,t=>{gr(ae,()=>e(...t.map(G)))})}function Dr(e,t=0){return gr(b|t,e)}function Or(e,t=0){return gr(oe|t,e)}function kr(e){return gr(524320,e)}function Ar(e){var t=e.teardown;if(t!==null){let e=Hn,n=U;Un(!0),Gn(null);try{t.call(null)}finally{Un(e),Gn(n)}}}function jr(e,t=!1){var n=e.first;for(e.first=e.last=null;n!==null;){let e=n.ac;e!==null&&zn(()=>{e.abort(Ee)});var r=n.next;(n.f&S)===0?K(n,t):n.parent=null,n=r}}function Mr(e){for(var t=e.first;t!==null;){var n=t.next;(t.f&x)===0&&K(t),t=n}}function K(e,t=!0){var n=!1;(t||(e.f&me)!==0)&&e.nodes!==null&&e.nodes.end!==null&&(Nr(e.nodes.start,e.nodes.end),n=!0),R(e,de),jr(e,t&&!n),cr(e,0);var r=e.nodes&&e.nodes.t;if(r!==null)for(let e of r)e.stop();Ar(e),e.f^=de,e.f|=ue;var i=e.parent;i!==null&&i.first!==null&&Pr(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes=e.ac=e.b=null}function Nr(e,t){for(;e!==null;){var n=e===t?null:Dt(e);e.remove(),e=n}}function Pr(e){var t=e.parent,n=e.prev,r=e.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===e&&(t.first=r),t.last===e&&(t.last=n))}function Fr(e,t,n=!0){var r=[];Ir(e,r,!0);var i=()=>{n&&K(e),t&&t()},a=r.length;if(a>0){var o=()=>--a||i();for(var s of r)s.out(o)}else i()}function Ir(e,t,n){if((e.f&le)===0){e.f^=le;var r=e.nodes&&e.nodes.t;if(r!==null)for(let e of r)(e.is_global||n)&&t.push(e);for(var i=e.first;i!==null;){var a=i.next;if((i.f&S)===0){var o=(i.f&fe)!==0||(i.f&x)!==0&&(e.f&b)!==0;Ir(i,t,o?n:!1)}i=a}}}function Lr(e){Rr(e,!0)}function Rr(e,t){if((e.f&le)!==0){e.f^=le,(e.f&C)===0&&(R(e,w),nn.ensure().schedule(e));for(var n=e.first;n!==null;){var r=n.next,i=(n.f&fe)!==0||(n.f&x)!==0;Rr(n,i?t:!1),n=r}var a=e.nodes&&e.nodes.t;if(a!==null)for(let e of a)(e.is_global||t)&&e.in()}}function zr(e,t){if(e.nodes)for(var n=e.nodes.start,r=e.nodes.end;n!==null;){var i=n===r?null:Dt(n);t.append(n),n=i}}function Br(e){let t={get:e=>Ht(t.store)[e],set:(e,n)=>{typeof e==`string`?Object.assign(Ht(t.store),{[e]:n}):Object.assign(Ht(t.store),e),t.store.set(Ht(t.store))},store:Vt(e)};return t}globalThis.$altcha=globalThis.$altcha||{algorithms:new Map,defaults:Br({}),i18n:Br({}),instances:new Set,plugins:new Set},globalThis.$altcha.i18n.set(`en`,{ariaLinkLabel:`Altcha (official website)`,cancel:`Cancel`,enterCode:`Enter code`,enterCodeAria:`Enter code you hear. Press Space to play audio.`,enterCodeFromImage:`To proceed, please enter the code from the image below.`,error:`Verification failed. Try again later.`,expired:`Verification expired. Try again.`,footer:`Protected by <a href="https://altcha.org/" tabindex="-1" target="_blank" aria-label="Altcha (official website)">ALTCHA</a>`,getAudioChallenge:`Get an audio challenge`,label:`I'm not a robot`,loading:`Loading...`,reload:`Reload`,verify:`Verify`,verificationRequired:`Verification required!`,verified:`Verified`,verifying:`Verifying...`,waitAlert:`Verifying... please wait.`});var Vr=`5`;typeof window<`u`&&((window.__svelte??={}).v??=new Set).add(Vr);var Hr=Symbol(`events`),Ur=new Set,Wr=new Set;function Gr(e,t,n,r={}){function i(e){if(r.capture||Yr.call(t,e),!e.cancelBubble)return zn(()=>n?.call(this,e))}return e.startsWith(`pointer`)||e.startsWith(`touch`)||e===`wheel`?at(()=>{t.addEventListener(e,i,r)}):t.addEventListener(e,i,r),i}function q(e,t,n,r,i){var a={capture:r,passive:i},o=Gr(e,t,n,a);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&vr(()=>{t.removeEventListener(e,o,a)})}function Kr(e,t,n){(t[Hr]??={})[e]=n}function qr(e){for(var t=0;t<e.length;t++)Ur.add(e[t]);for(var n of Wr)n(e)}var Jr=null;function Yr(e){var t=this,n=t.ownerDocument,r=e.type,i=e.composedPath?.()||[],a=i[0]||e.target;Jr=e;var o=0,s=Jr===e&&e[Hr];if(s){var c=i.indexOf(s);if(c!==-1&&(t===document||t===window)){e[Hr]=t;return}var l=i.indexOf(t);if(l===-1)return;c<=l&&(o=c)}if(a=i[o]||e.target,a!==t){p(e,`currentTarget`,{configurable:!0,get(){return a||n}});var u=U,d=W;Gn(null),Kn(null);try{for(var f,m=[];a!==null;){var h=a.assignedSlot||a.parentNode||a.host||null;try{var ee=a[Hr]?.[r];ee!=null&&(!a.disabled||e.target===a)&&ee.call(a,e)}catch(e){f?m.push(e):f=e}if(e.cancelBubble||h===t||h===null)break;a=h}if(f){for(let e of m)queueMicrotask(()=>{throw e});throw f}}finally{e[Hr]=t,delete e.currentTarget,Gn(u),Kn(d)}}}var Xr=globalThis?.window?.trustedTypes&&globalThis.window.trustedTypes.createPolicy(`svelte-trusted-html`,{createHTML:e=>e});function Zr(e){return Xr?.createHTML(e)??e}function Qr(e){var t=jt(`template`);return t.innerHTML=Zr(e.replaceAll(`<!>`,`<!---->`)),t.content}function $r(e,t){var n=W;n.nodes===null&&(n.nodes={start:e,end:t,a:null,t:null})}function J(e,t){var n=(t&We)!==0,r=(t&Ge)!==0,i,a=!e.startsWith(`<!>`);return()=>{if(M)return $r(N,null),N;i===void 0&&(i=Qr(a?e:`<!>`+e),n||(i=Et(i)));var t=r||xt?document.importNode(i,!0):i.cloneNode(!0);if(n){var o=Et(t),s=t.lastChild;$r(o,s)}else $r(t,t);return t}}function ei(e,t,n=`svg`){var r=`<${n}>${e.startsWith(`<!>`)?`<!>`+e:e}</${n}>`,i;return()=>{if(M)return $r(N,null),N;i||=Et(Et(Qr(r)));var e=i.cloneNode(!0);return $r(e,e),e}}function ti(e,t){return ei(e,t,`svg`)}function ni(e=``){if(!M){var t=Tt(e+``);return $r(t,t),t}var n=N;return n.nodeType===Oe?Mt(n):(n.before(n=Tt()),P(n)),$r(n,n),n}function ri(){if(M)return $r(N,null),N;var e=document.createDocumentFragment(),t=document.createComment(``),n=Tt();return e.append(t,n),$r(t,n),e}function Y(e,t){if(M){var n=W;((n.f&E)===0||n.nodes.end===null)&&(n.nodes.end=N),ft();return}e!==null&&e.before(t)}function ii(e){return e.endsWith(`capture`)&&e!==`gotpointercapture`&&e!==`lostpointercapture`}var ai=[`beforeinput`,`click`,`change`,`dblclick`,`contextmenu`,`focusin`,`focusout`,`input`,`keydown`,`keyup`,`mousedown`,`mousemove`,`mouseout`,`mouseover`,`mouseup`,`pointerdown`,`pointermove`,`pointerout`,`pointerover`,`pointerup`,`touchend`,`touchmove`,`touchstart`];function oi(e){return ai.includes(e)}var si={formnovalidate:`formNoValidate`,ismap:`isMap`,nomodule:`noModule`,playsinline:`playsInline`,readonly:`readOnly`,defaultvalue:`defaultValue`,defaultchecked:`defaultChecked`,srcobject:`srcObject`,novalidate:`noValidate`,allowfullscreen:`allowFullscreen`,disablepictureinpicture:`disablePictureInPicture`,disableremoteplayback:`disableRemotePlayback`};function ci(e){return e=e.toLowerCase(),si[e]??e}var li=[`touchstart`,`touchmove`];function ui(e){return li.includes(e)}function di(e,t){var n=t==null?``:typeof t==`object`?`${t}`:t;n!==(e[we]??=e.nodeValue)&&(e[we]=n,e.nodeValue=`${n}`)}function fi(e,t){return hi(e,t)}function pi(e,t){wt(),t.intro=t.intro??!1;let n=t.target,r=M,i=N;try{for(var a=Et(n);a&&(a.nodeType!==ke||a.data!==Ke);)a=Dt(a);if(!a)throw Xe;dt(!0),P(a);let r=hi(e,{...t,anchor:a});return dt(!1),r}catch(r){if(r instanceof Error&&r.message.split(`
`).some(e=>e.startsWith(`https://svelte.dev/e/`)))throw r;return r!==Xe&&console.warn(`Failed to hydrate: `,r),t.recover===!1&&ze(),wt(),kt(n),dt(!1),fi(e,t)}finally{dt(r),P(i)}}var mi=new Map;function hi(e,{target:t,anchor:n,props:r={},events:i,context:a,intro:o=!0,transformError:s}){wt();var c=void 0,l=Sr(()=>{var o=n??t.appendChild(Tt());fn(o,{pending:()=>{}},t=>{tt({});var n=k;if(a&&(n.c=a),i&&(r.$$events=i),M&&$r(t,null),c=e(t,r)||{},M&&(W.nodes.end=N,N===null||N.nodeType!==ke||N.data!==Ye))throw ct(),Xe;nt()},s);var l=new Set,u=e=>{for(var n=0;n<e.length;n++){var r=e[n];if(!l.has(r)){l.add(r);var i=ui(r);for(let e of[t,document]){var a=mi.get(e);a===void 0&&(a=new Map,mi.set(e,a));var o=a.get(r);o===void 0?(e.addEventListener(r,Yr,{passive:i}),a.set(r,1)):a.set(r,o+1)}}}};return u(d(Ur)),Wr.add(u),()=>{for(var e of l)for(let n of[t,document]){var r=mi.get(n),i=r.get(e);--i==0?(n.removeEventListener(e,Yr),r.delete(e),r.size===0&&mi.delete(n)):r.set(e,i)}Wr.delete(u),o!==n&&o.parentNode?.removeChild(o)}});return gi.set(c,l),c}var gi=new WeakMap;function _i(e,t){let n=gi.get(e);return n?(gi.delete(e),n(t)):Promise.resolve()}var vi=class{anchor;#e=new Map;#t=new Map;#n=new Map;#r=new Set;#i=!0;constructor(e,t=!0){this.anchor=e,this.#i=t}#a=e=>{if(this.#e.has(e)){var t=this.#e.get(e),n=this.#t.get(t);if(n)Lr(n),this.#r.delete(t);else{var r=this.#n.get(t);r&&(this.#t.set(t,r.effect),this.#n.delete(t),r.fragment.lastChild.remove(),this.anchor.before(r.fragment),n=r.effect)}for(let[t,n]of this.#e){if(this.#e.delete(t),t===e)break;let r=this.#n.get(n);r&&(K(r.effect),this.#n.delete(n))}for(let[e,r]of this.#t){if(e===t||this.#r.has(e))continue;let i=()=>{if(Array.from(this.#e.values()).includes(e)){var t=document.createDocumentFragment();zr(r,t),t.append(Tt()),this.#n.set(e,{effect:r,fragment:t})}else K(r);this.#r.delete(e),this.#t.delete(e)};this.#i||!n?(this.#r.add(e),Fr(r,i,!1)):i()}}};#o=e=>{this.#e.delete(e);let t=Array.from(this.#e.values());for(let[e,n]of this.#n)t.includes(e)||(K(n.effect),this.#n.delete(e))};ensure(e,t){var n=z,r=At();if(t&&!this.#t.has(e)&&!this.#n.has(e))if(r){var i=document.createDocumentFragment(),a=Tt();i.append(a),this.#n.set(e,{effect:kr(()=>t(a)),fragment:i})}else this.#t.set(e,kr(()=>t(this.anchor)));if(this.#e.set(n,e),r){for(let[t,r]of this.#t)t===e?n.unskip_effect(r):n.skip_effect(r);for(let[t,r]of this.#n)t===e?n.unskip_effect(r.effect):n.skip_effect(r.effect);n.oncommit(this.#a),n.ondiscard(this.#o)}else M&&(this.anchor=N),this.#a(n)}};function yi(e,t,...n){var r=new vi(e);Dr(()=>{let e=t()??null;r.ensure(e,e&&(t=>e(t,...n)))},fe)}function bi(e){k===null&&Ne(),yr(()=>{let t=pr(e);if(typeof t==`function`)return t})}function X(e,t,n=!1){var r;M&&(r=N,ft());var i=new vi(e),a=n?fe:0;function o(e,t){if(M){var n=ht(r);if(e!==parseInt(n.substring(1))){var a=mt();P(a),i.anchor=a,dt(!1),i.ensure(e,t),dt(!0);return}}i.ensure(e,t)}Dr(()=>{var e=!1;t((t,n=0)=>{e=!0,o(n,t)}),e||o(-1,null)},a)}var xi=Symbol(`NaN`);function Si(e,t,n){M&&ft();var r=new vi(e);Dr(()=>{var e=t();e!==e&&(e=xi),r.ensure(e,n)})}function Ci(e,t,n=!1,r=!1,i=!1,a=!1){var o=e,s=``;if(n){var c=e;M&&(o=P(Et(c)))}Er(()=>{var e=W;if(s===(s=t()??``)){M&&ft();return}if(n&&!M){e.nodes=null,c.innerHTML=s,s!==``&&$r(Et(c),c.lastChild);return}if(e.nodes!==null&&(Nr(e.nodes.start,e.nodes.end),e.nodes=null),s!==``){if(M){N.data;for(var a=ft(),l=a;a!==null&&(a.nodeType!==ke||a.data!==``);)l=a,a=Dt(a);if(a===null)throw ct(),Xe;$r(N,l),o=P(a);return}var u=jt(r?`svg`:i?`math`:`template`,r?Qe:i?$e:void 0);u.innerHTML=s;var d=r||i?u:u.content;if($r(Et(d),d.lastChild),r||i)for(;Et(d);)o.before(Et(d));else o.before(d)}})}function wi(e,t,n){var r;M&&(r=N,ft());var i=new vi(e);Dr(()=>{var e=t()??null;if(M&&ht(r)===Ke!=(e!==null)){var a=mt();P(a),i.anchor=a,dt(!1),i.ensure(e,e&&(t=>n(t,e))),dt(!0);return}i.ensure(e,e&&(t=>n(t,e)))},fe)}function Ti(e,t){var n=void 0,r;Or(()=>{n!==(n=t())&&(r&&=(K(r),null),n&&(r=kr(()=>{Cr(()=>n(e))})))})}function Ei(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`)if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=Ei(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n);return r}function Di(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=Ei(e))&&(r&&(r+=` `),r+=t);return r}function Oi(e){return typeof e==`object`?Di(e):e??``}var ki=[...` 	
\r\f\xA0\v﻿`];function Ai(e,t,n){var r=e==null?``:``+e;if(n){for(var i of Object.keys(n))if(n[i])r=r?r+` `+i:i;else if(r.length)for(var a=i.length,o=0;(o=r.indexOf(i,o))>=0;){var s=o+a;(o===0||ki.includes(r[o-1]))&&(s===r.length||ki.includes(r[s]))?r=(o===0?``:r.substring(0,o))+r.substring(s+1):o=s}}return r===``?null:r}function ji(e,t=!1){var n=t?` !important;`:`;`,r=``;for(var i of Object.keys(e)){var a=e[i];a!=null&&a!==``&&(r+=` `+i+`: `+a+n)}return r}function Mi(e){return e[0]!==`-`||e[1]!==`-`?e.toLowerCase():e}function Ni(e,t){if(t){var n=``,r,i;if(Array.isArray(t)?(r=t[0],i=t[1]):r=t,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,``).trim();var a=!1,o=0,s=!1,c=[];r&&c.push(...Object.keys(r).map(Mi)),i&&c.push(...Object.keys(i).map(Mi));var l=0,u=-1;let t=e.length;for(var d=0;d<t;d++){var f=e[d];if(s?f===`/`&&e[d-1]===`*`&&(s=!1):a?a===f&&(a=!1):f===`/`&&e[d+1]===`*`?s=!0:f===`"`||f===`'`?a=f:f===`(`?o++:f===`)`&&o--,!s&&a===!1&&o===0){if(f===`:`&&u===-1)u=d;else if(f===`;`||d===t-1){if(u!==-1){var p=Mi(e.substring(l,u).trim());if(!c.includes(p)){f!==`;`&&d++;var m=e.substring(l,d).trim();n+=` `+m+`;`}}l=d+1,u=-1}}}}return r&&(n+=ji(r)),i&&(n+=ji(i,!0)),n=n.trim(),n===``?null:n}return e==null?null:String(e)}function Pi(e,t,n,r,i,a){var o=e[Se];if(M||o!==n||o===void 0){var s=Ai(n,r,a);(!M||s!==e.getAttribute(`class`))&&(s==null?e.removeAttribute(`class`):t?e.className=s:e.setAttribute(`class`,s)),e[Se]=n}else if(a&&i!==a)for(var c in a){var l=!!a[c];(i==null||l!==!!i[c])&&e.classList.toggle(c,l)}return a}function Fi(e,t={},n,r){for(var i in n){var a=n[i];t[i]!==a&&(n[i]==null?e.style.removeProperty(i):e.style.setProperty(i,a,r))}}function Ii(e,t,n,r){var i=e[Ce];if(M||i!==t){var a=Ni(t,r);(!M||a!==e.getAttribute(`style`))&&(a==null?e.removeAttribute(`style`):e.style.cssText=a),e[Ce]=t}else r&&(Array.isArray(r)?(Fi(e,n?.[0],r[0]),Fi(e,n?.[1],r[1],`important`)):Fi(e,n,r));return r}function Li(e,t,n=!1){if(e.multiple){if(t==null)return;if(!c(t))return lt();for(var r of e.options)r.selected=t.includes(zi(r));return}for(r of e.options)if(vt(zi(r),t)){r.selected=!0;return}(!n||t!==void 0)&&(e.selectedIndex=-1)}function Ri(e){var t=new MutationObserver(()=>{Li(e,e.__value)});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`value`]}),vr(()=>{t.disconnect()})}function zi(e){return`__value`in e?e.__value:e.value}var Bi=Symbol(`class`),Vi=Symbol(`style`),Hi=Symbol(`is custom element`),Ui=Symbol(`is html`),Wi=De?`link`:`LINK`,Gi=De?`input`:`INPUT`,Ki=De?`option`:`OPTION`,qi=De?`select`:`SELECT`,Ji=De?`progress`:`PROGRESS`;function Yi(e){if(M){var t=!1,n=()=>{if(!t){if(t=!0,e.hasAttribute(`value`)){var n=e.value;Z(e,`value`,null),e.value=n}if(e.hasAttribute(`checked`)){var r=e.checked;Z(e,`checked`,null),e.checked=r}}};e[Te]=n,at(n),Rn()}}function Xi(e,t){var n=ea(e);n.value!==(n.value=t??void 0)&&(e.value!==t||t===0&&e.nodeName===Ji)&&(e.value=t??``)}function Zi(e,t){t?e.hasAttribute(`selected`)||e.setAttribute(`selected`,``):e.removeAttribute(`selected`)}function Z(e,t,n,r){var i=ea(e);M&&(i[t]=e.getAttribute(t),t===`src`||t===`srcset`||t===`href`&&e.nodeName===Wi)||i[t]!==(i[t]=n)&&(t===`loading`&&(e[be]=n),n==null?e.removeAttribute(t):typeof n!=`string`&&na(e).includes(t)?e[t]=n:e.setAttribute(t,n))}function Qi(e,t,n,r,i=!1,a=!1){if(M&&i&&e.nodeName===Gi){var o=e;(o.type===`checkbox`?`defaultChecked`:`defaultValue`)in n||Yi(o)}var s=ea(e),c=s[Hi],l=!s[Ui];let u=M&&c;u&&dt(!1);var d=t||{},f=e.nodeName===Ki;for(var p in t)p in n||(n[p]=null);n.class?n.class=Oi(n.class):n[Bi]&&(n.class=null),n[Vi]&&(n.style??=null);var m=na(e);for(let i in n){let a=n[i];if(f&&i===`value`&&a==null){e.value=e.__value=``,d[i]=a;continue}if(i===`class`){Pi(e,e.namespaceURI===`http://www.w3.org/1999/xhtml`,a,r,t?.[Bi],n[Bi]),d[i]=a,d[Bi]=n[Bi];continue}if(i===`style`){Ii(e,a,t?.[Vi],n[Vi]),d[i]=a,d[Vi]=n[Vi];continue}var h=d[i];if(!(a===h&&!(a===void 0&&e.hasAttribute(i)))){d[i]=a;var ee=i[0]+i[1];if(ee!==`$$`)if(ee===`on`){let t={},n=`$$`+i,r=i.slice(2);var te=oi(r);if(ii(r)&&(r=r.slice(0,-7),t.capture=!0),!te&&h){if(a!=null)continue;e.removeEventListener(r,d[n],t),d[n]=null}te?(Kr(r,e,a),qr([r])):a!=null&&(d[n]=Gr(r,e,function(e){d[i].call(this,e)},t))}else if(i===`style`)Z(e,i,a);else if(i===`autofocus`)In(e,!!a);else if(!c&&(i===`__value`||i===`value`&&a!=null))e.value=e.__value=a;else if(i===`selected`&&f)Zi(e,a);else{var g=i;l||(g=ci(g));var ne=g===`defaultValue`||g===`defaultChecked`;if(a==null&&!c&&!ne)if(s[i]=null,g===`value`||g===`checked`){let n=e,r=t===void 0;if(g===`value`){let e=n.defaultValue;n.removeAttribute(g),n.defaultValue=e,n.value=n.__value=r?e:null}else{let e=n.defaultChecked;n.removeAttribute(g),n.defaultChecked=e,n.checked=r?e:!1}}else e.removeAttribute(i);else ne||m.includes(g)&&(c||typeof a!=`string`)?(e[g]=a,g in s&&(s[g]=O)):typeof a!=`function`&&Z(e,g,a)}}}return u&&dt(!0),d}function $i(e,t,n=[],r=[],i=[],a,o=!1,s=!1){mn(i,n,r,n=>{var r=void 0,i={},c=e.nodeName===qi,l=!1;if(Or(()=>{var u=t(...n.map(G)),d=Qi(e,r,u,a,o,s);l&&c&&`value`in u&&Li(e,u.value);for(let e of Object.getOwnPropertySymbols(i))u[e]||K(i[e]);for(let t of Object.getOwnPropertySymbols(u)){var f=u[t];t.description===et&&(!r||f!==r[t])&&(i[t]&&K(i[t]),i[t]=kr(()=>Ti(e,()=>f))),d[t]=f}r=d}),c){var u=e;Cr(()=>{Li(u,r.value,!0),Ri(u)})}l=!0})}function ea(e){return e[xe]??={[Hi]:e.nodeName.includes(`-`),[Ui]:e.namespaceURI===Ze}}var ta=new Map;function na(e){var t=e.getAttribute(`is`)||e.nodeName,n=ta.get(t);if(n)return n;ta.set(t,n=[]);for(var r,i=e,a=Element.prototype;a!==i;){for(var o in r=h(i),r)r[o].set&&o!==`innerHTML`&&o!==`textContent`&&o!==`innerText`&&n.push(o);i=g(i)}return n}function ra(e,t,n=t){var r=new WeakSet;Bn(e,`input`,async i=>{var a=i?e.defaultValue:e.value;if(a=ia(e)?aa(a):a,n(a),z!==null&&r.add(z),await ur(),a!==(a=t())){var o=e.selectionStart,s=e.selectionEnd,c=e.value.length;if(e.value=a??``,s!==null){var l=e.value.length;o===s&&s===c&&l>c?(e.selectionStart=l,e.selectionEnd=l):(e.selectionStart=o,e.selectionEnd=Math.min(s,l))}}}),(M&&e.defaultValue!==e.value||pr(t)==null&&e.value)&&(n(ia(e)?aa(e.value):e.value),z!==null&&r.add(z)),Tr(()=>{var n=t();if(e===document.activeElement){var i=z;if(r.has(i))return}ia(e)&&n===aa(e.value)||e.type===`date`&&!n&&!e.value||n!==e.value&&(e.value=n??``)})}function ia(e){var t=e.type;return t===`number`||t===`range`}function aa(e){return e===``?null:+e}function oa(e,t){return e===t||e?.[ve]===t}function sa(e={},t,n,r){var i=k.r,a=W;return Cr(()=>{var r,o;return Tr(()=>{r=o,o=[],pr(()=>{oa(n(...o),e)||(t(e,...o),r&&oa(n(...r),e)&&t(null,...r))})}),()=>{let r=a;for(;r!==i&&r.parent!==null&&r.parent.f&de;)r=r.parent;let s=()=>{o&&oa(n(...o),e)&&t(null,...o)},c=r.teardown;r.teardown=()=>{s(),c?.()}}}),e}var ca={get(e,t){if(!e.exclude.includes(t))return e.props[t]},set(e,t){return!1},getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t)&&t in e.props)return{enumerable:!0,configurable:!0,value:e.props[t]}},has(e,t){return!e.exclude.includes(t)&&t in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))}};function la(e,t,n){return new Proxy({props:e,exclude:t},ca)}function Q(e,t,n,r){var i=r,a=!0,o=()=>(a&&(a=!1,i=r),i),s=e[t];s===void 0&&r!==void 0&&(s=o());var c=()=>{var n=e[t];return n===void 0?o():(a=!0,n)},l=!1,u=vn(()=>(l=!1,c())),d=W;return(function(e,t){if(arguments.length>0){let n=t?G(u):e;return H(u,n),l=!0,i!==void 0&&(i=n),e}return Hn&&l||(d.f&ue)!==0?u.v:G(u)})}function ua(e){return new da(e)}var da=class{#e;#t;constructor(e){var t=new Map,n=(e,n)=>{var r=jn(n,!1,!1);return t.set(e,r),r};let r=new Proxy({...e.props||{},$$events:{}},{get(e,r){return G(t.get(r)??n(r,Reflect.get(e,r)))},has(e,r){return r===ye||(G(t.get(r)??n(r,Reflect.get(e,r))),Reflect.has(e,r))},set(e,r,i){return H(t.get(r)??n(r,i),i),Reflect.set(e,r,i)}});this.#t=(e.hydrate?pi:fi)(e.component,{target:e.target,anchor:e.anchor,props:r,context:e.context,intro:e.intro??!1,recover:e.recover,transformError:e.transformError}),(!e?.props?.$$host||e.sync===!1)&&B(),this.#e=r.$$events;for(let e of Object.keys(this.#t))e!==`$set`&&e!==`$destroy`&&e!==`$on`&&p(this,e,{get(){return this.#t[e]},set(t){this.#t[e]=t},enumerable:!0});this.#t.$set=e=>{Object.assign(r,e)},this.#t.$destroy=()=>{_i(this.#t)}}$set(e){this.#t.$set(e)}$on(e,t){this.#e[e]=this.#e[e]||[];let n=(...e)=>t.call(this,...e);return this.#e[e].push(n),()=>{this.#e[e]=this.#e[e].filter(e=>e!==n)}}$destroy(){this.#t.$destroy()}},fa=class{};typeof HTMLElement==`function`&&(fa=class extends HTMLElement{$$ctor;$$s;$$c;$$cn=!1;$$d={};$$r=!1;$$p_d={};$$l={};$$l_u=new Map;$$me;$$shadowRoot=null;constructor(e,t,n){super(),this.$$ctor=e,this.$$s=t,n&&(this.$$shadowRoot=this.attachShadow(n))}addEventListener(e,t,n){if(this.$$l[e]=this.$$l[e]||[],this.$$l[e].push(t),this.$$c){let n=this.$$c.$on(e,t);this.$$l_u.set(t,n)}super.addEventListener(e,t,n)}removeEventListener(e,t,n){if(super.removeEventListener(e,t,n),this.$$c){let e=this.$$l_u.get(t);e&&(e(),this.$$l_u.delete(t))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let e=function(e){return t=>{let n=jt(`slot`);e!=="default"&&(n.name=e),Y(t,n)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;let t={},n=ma(this);for(let r of this.$$s)r in n&&(r==="default"&&!this.$$d.children?(this.$$d.children=e(r),t.default=!0):t[r]=e(r));for(let e of this.attributes){let t=this.$$g_p(e.name);t in this.$$d||(this.$$d[t]=pa(t,e.value,this.$$p_d,`toProp`))}for(let e in this.$$p_d)!(e in this.$$d)&&this[e]!==void 0&&(this.$$d[e]=this[e],delete this[e]);this.$$c=ua({component:this.$$ctor,target:this.$$shadowRoot||this,props:{...this.$$d,$$slots:t,$$host:this}}),this.$$me=xr(()=>{Tr(()=>{this.$$r=!0;for(let e of f(this.$$c)){if(!this.$$p_d[e]?.reflect)continue;this.$$d[e]=this.$$c[e];let t=pa(e,this.$$d[e],this.$$p_d,`toAttribute`);t==null?this.removeAttribute(this.$$p_d[e].attribute||e):this.setAttribute(this.$$p_d[e].attribute||e,t)}this.$$r=!1})});for(let e in this.$$l)for(let t of this.$$l[e]){let n=this.$$c.$on(e,t);this.$$l_u.set(t,n)}this.$$l={}}}attributeChangedCallback(e,t,n){this.$$r||(e=this.$$g_p(e),this.$$d[e]=pa(e,n,this.$$p_d,`toProp`),this.$$c?.$set({[e]:this.$$d[e]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then(()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),this.$$me(),this.$$c=void 0)})}$$g_p(e){return f(this.$$p_d).find(t=>this.$$p_d[t].attribute===e||!this.$$p_d[t].attribute&&t.toLowerCase()===e)||e}});function pa(e,t,n,r){let i=n[e]?.type;if(t=i===`Boolean`&&typeof t!=`boolean`?t!=null:t,!r||!n[e])return t;if(r===`toAttribute`)switch(i){case`Object`:case`Array`:return t==null?null:JSON.stringify(t);case`Boolean`:return t?``:null;case`Number`:return t??null;default:return t}else switch(i){case`Object`:case`Array`:return t&&JSON.parse(t);case`Boolean`:return t;case`Number`:return t==null?t:+t;default:return t}}function ma(e){let t={};return e.childNodes.forEach(e=>{t[e.slot||`default`]=!0}),t}function ha(e,t,n,r,i,a){let o=class extends fa{constructor(){super(e,n,i),this.$$p_d=t}static get observedAttributes(){return f(t).map(e=>(t[e].attribute||e).toLowerCase())}};return f(t).forEach(e=>{p(o.prototype,e,{get(){return this.$$c&&e in this.$$c?this.$$c[e]:this.$$d[e]},set(n){n=pa(e,n,t),this.$$d[e]=n;var r=this.$$c;r&&(m(r,e)?.get?r[e]=n:r.$set({[e]:n}))}})}),r.forEach(e=>{p(o.prototype,e,{get(){return this.$$c?.[e]}})}),e.element=o,o}var ga=J(`<div class="altcha-checkbox"><input/> <svg aria-hidden="true" width="12" height="9" viewBox="0 0 12 9"><polyline points="1 5 4 8 11 1"></polyline></svg> <div class="altcha-spinner altcha-checkbox-spinner" aria-hidden="true"></div></div>`);function _a(e,t){tt(t,!0);let n=Q(t,`loading`),r=la(t,[`$$slots`,`$$events`,`$$legacy`,`$$host`,`loading`]),i;function a(){i?.click()}var o={get loading(){return n()},set loading(e){n(e),B()}},s=ga(),c=I(s);$i(c,()=>({type:`checkbox`,...r}),void 0,void 0,void 0,void 0,!0),sa(c,e=>i=e,()=>i);var l=L(c,2);return pt(2),F(s),Er(()=>Z(s,`data-loading`,n())),Kr(`click`,l,a),Y(e,s),nt(o)}qr([`click`]),ha(_a,{loading:{}},[],[],{mode:`open`});var va=J(`<div class="altcha-checkbox-native"><input/> <div class="altcha-spinner altcha-checkbox-native-spinner"></div></div>`);function ya(e,t){tt(t,!0);let n=Q(t,`loading`),r=la(t,[`$$slots`,`$$events`,`$$legacy`,`$$host`,`loading`]);var i={get loading(){return n()},set loading(e){n(e),B()}},a=va();return $i(I(a),()=>({type:`checkbox`,...r}),void 0,void 0,void 0,void 0,!0),pt(2),F(a),Er(()=>Z(a,`data-loading`,n())),Y(e,a),nt(i)}ha(ya,{loading:{}},[],[],{mode:`open`});var ba=J(`<div><a target="_blank" class="altcha-logo" aria-hidden="true" tabindex="-1"><svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.33955 16.4279C5.88954 20.6586 12.1971 21.2105 16.4279 17.6604C18.4699 15.947 19.6548 13.5911 19.9352 11.1365L17.9886 10.4279C17.8738 12.5624 16.909 14.6459 15.1423 16.1284C11.7577 18.9684 6.71167 18.5269 3.87164 15.1423C1.03163 11.7577 1.4731 6.71166 4.8577 3.87164C8.24231 1.03162 13.2883 1.4731 16.1284 4.8577C16.9767 5.86872 17.5322 7.02798 17.804 8.2324L19.9522 9.01429C19.7622 7.07737 19.0059 5.17558 17.6604 3.57212C14.1104 -0.658624 7.80283 -1.21043 3.57212 2.33956C-0.658625 5.88958 -1.21046 12.1971 2.33955 16.4279Z" fill="currentColor"></path><path d="M3.57212 2.33956C1.65755 3.94607 0.496389 6.11731 0.12782 8.40523L2.04639 9.13961C2.26047 7.15832 3.21057 5.25375 4.8577 3.87164C8.24231 1.03162 13.2883 1.4731 16.1284 4.8577L13.8302 6.78606L19.9633 9.13364C19.7929 7.15555 19.0335 5.20847 17.6604 3.57212C14.1104 -0.658624 7.80283 -1.21043 3.57212 2.33956Z" fill="currentColor"></path><path d="M7 10H5C5 12.7614 7.23858 15 10 15C12.7614 15 15 12.7614 15 10H13C13 11.6569 11.6569 13 10 13C8.3431 13 7 11.6569 7 10Z" fill="currentColor"></path></svg></a></div>`);function xa(e,t){tt(t,!0);let n=Q(t,`strings`);var r={get strings(){return n()},set strings(e){n(e),B()}},i=ba(),a=I(i);return Z(a,`href`,`https://altcha.org`),F(i),Er(()=>Z(a,`aria-label`,n().ariaLinkLabel)),Y(e,i),nt(r)}ha(xa,{strings:{}},[],[],{mode:`open`});var Sa=J(`<div class="altcha-footer"><p></p> <!></div>`);function Ca(e,t){tt(t,!0);let n=Q(t,`logo`),r=Q(t,`strings`);var i={get logo(){return n()},set logo(e){n(e),B()},get strings(){return r()},set strings(e){r(e),B()}},a=Sa(),o=I(a);Ci(o,()=>r().footer,!0),F(o);var s=L(o,2),c=e=>{xa(e,{get strings(){return r()}})};return X(s,e=>{n()&&e(c)}),F(a),Y(e,a),nt(i)}ha(Ca,{logo:{},strings:{}},[],[],{mode:`open`});var wa=J(`<div class="altcha-switch"><input/>  <div class="altcha-switch-toggle"><div class="altcha-spinner altcha-switch-spinner"></div></div></div>`);function Ta(e,t){tt(t,!0);let n=Q(t,`loading`),r=la(t,[`$$slots`,`$$events`,`$$legacy`,`$$host`,`loading`]),i;function a(){i?.click()}var o={get loading(){return n()},set loading(e){n(e),B()}},s=wa(),c=I(s);$i(c,()=>({type:`checkbox`,...r}),void 0,void 0,void 0,void 0,!0),sa(c,e=>i=e,()=>i);var l=L(c,2);return F(s),Er(()=>Z(s,`data-loading`,n())),Kr(`click`,l,a),Y(e,s),nt(o)}qr([`click`]),ha(Ta,{loading:{}},[],[],{mode:`open`});var Ea=(e=>(e.ERROR=`error`,e.LOADING=`loading`,e.PLAYING=`playing`,e.PAUSED=`paused`,e.READY=`ready`,e))(Ea||{}),$=(e=>(e.CODE=`code`,e.ERROR=`error`,e.VERIFIED=`verified`,e.VERIFYING=`verifying`,e.UNVERIFIED=`unverified`,e.EXPIRED=`expired`,e))($||{}),Da=J(`<div class="altcha-code-challenge-title"> </div>`),Oa=J(`<div class="altcha-spinner"></div>`),ka=ti(`<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8659 3.00017L22.3922 19.5002C22.6684 19.9785 22.5045 20.5901 22.0262 20.8662C21.8742 20.954 21.7017 21.0002 21.5262 21.0002H2.47363C1.92135 21.0002 1.47363 20.5525 1.47363 20.0002C1.47363 19.8246 1.51984 19.6522 1.60761 19.5002L11.1339 3.00017C11.41 2.52187 12.0216 2.358 12.4999 2.63414C12.6519 2.72191 12.7782 2.84815 12.8659 3.00017ZM10.9999 16.0002V18.0002H12.9999V16.0002H10.9999ZM10.9999 9.00017V14.0002H12.9999V9.00017H10.9999Z"></path></svg>`),Aa=ti(`<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 7C15 6.44772 15.4477 6 16 6C16.5523 6 17 6.44772 17 7V17C17 17.5523 16.5523 18 16 18C15.4477 18 15 17.5523 15 17V7ZM7 7C7 6.44772 7.44772 6 8 6C8.55228 6 9 6.44772 9 7V17C9 17.5523 8.55228 18 8 18C7.44772 18 7 17.5523 7 17V7Z"></path></svg>`),ja=ti(`<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 12H7C8.10457 12 9 12.8954 9 14V19C9 20.1046 8.10457 21 7 21H4C2.89543 21 2 20.1046 2 19V12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12V19C22 20.1046 21.1046 21 20 21H17C15.8954 21 15 20.1046 15 19V14C15 12.8954 15.8954 12 17 12H20C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"></path></svg>`),Ma=J(`<button type="button" class="altcha-button altcha-button-secondary"><!></button>`),Na=J(`<audio hidden="" autoplay=""></audio>`),Pa=J(`<div class="altcha-code-challenge"><form data-code-challenge="true"><!> <div class="altcha-code-challenge-text"> </div> <img class="altcha-code-challenge-image" alt=""/> <div class="altcha-code-challenge-row"><input type="text" class="altcha-input" autocomplete="off" name="" required=""/> <!> <button type="button" class="altcha-button altcha-button-secondary"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2V4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 9.25022 5.38734 6.82447 7.50024 5.38451L7.5 8H9.5V2L3.5 2V4L5.99918 3.99989C3.57075 5.82434 2 8.72873 2 12Z"></path></svg></button></div> <div class="altcha-code-challenge-buttons"><button type="submit" class="altcha-button"> </button> <button type="button" class="altcha-button altcha-button-secondary"> </button></div></form> <!></div>`);function Fa(e,t){tt(t,!0);let n=Q(t,`audioUrl`),r=Q(t,`codeChallenge`),i=Q(t,`config`),a=Q(t,`imageUrl`),o=Q(t,`onCancel`),s=Q(t,`onReload`),c=Q(t,`onSubmit`),l=Q(t,`strings`),u=V(void 0),d=V(void 0),f=V(void 0),p=V(!1),m=V(``),h=V(!1);bi(()=>(i().disableAutoFocus||ur().then(()=>{G(f)?.focus()}),()=>{G(d)&&(G(d).pause(),H(d,void 0))}));function ee(){H(u,Ea.PAUSED,!0)}function te(e){H(u,Ea.ERROR,!0)}function g(){H(u,Ea.READY,!0)}function ne(){H(u,Ea.LOADING,!0)}function re(){H(u,Ea.PLAYING,!0)}function _(){H(u,Ea.PAUSED,!0)}function ie(e){e.code===`Space`?(e.preventDefault(),e.stopPropagation(),y()):e.code===`Escape`&&(e.preventDefault(),e.stopPropagation(),o()?.())}function v(e){e.preventDefault(),e.stopPropagation(),c()?.(G(m))}function y(){G(d)?G(u)===Ea.LOADING||(G(d).paused?(n()&&G(d).src!==n()&&(G(d).src=n()),G(d).currentTime=0,G(d).play()):G(d).pause()):(H(h,!0),requestAnimationFrame(()=>{G(d)&&n()&&(G(d).src=n(),G(d).play())}))}var ae={get audioUrl(){return n()},set audioUrl(e){n(e),B()},get codeChallenge(){return r()},set codeChallenge(e){r(e),B()},get config(){return i()},set config(e){i(e),B()},get imageUrl(){return a()},set imageUrl(e){a(e),B()},get onCancel(){return o()},set onCancel(e){o(e),B()},get onReload(){return s()},set onReload(e){s(e),B()},get onSubmit(){return c()},set onSubmit(e){c(e),B()},get strings(){return l()},set strings(e){l(e),B()}},oe=Pa(),b=I(oe),x=I(b),S=e=>{var t=Da(),n=I(t,!0);F(t),Er(()=>di(n,l().verificationRequired)),Y(e,t)};X(x,e=>{i().codeChallengeDisplay!==`standard`&&e(S)});var se=L(x,2),ce=I(se,!0);F(se);var C=L(se,2),w=L(C,2),T=I(w);Yi(T),T.disabled=G(p),sa(T,e=>H(f,e),()=>G(f));var le=L(T,2),ue=e=>{var t=Ma(),n=I(t),r=e=>{Y(e,Oa())},i=e=>{Y(e,ka())},a=e=>{Y(e,Aa())},o=e=>{Y(e,ja())};X(n,e=>{G(u)===Ea.LOADING?e(r):G(u)===Ea.ERROR?e(i,1):G(u)===Ea.PLAYING?e(a,2):e(o,-1)}),F(t),Er(()=>{Z(t,`title`,l().getAudioChallenge),t.disabled=G(u)===Ea.LOADING||G(u)===Ea.ERROR,Z(t,`aria-label`,G(u)===Ea.LOADING?l().loading:l().getAudioChallenge)}),q(`click`,t,()=>y(),!0),Y(e,t)};X(le,e=>{r().audio&&e(ue)});var E=L(le,2);F(w);var de=L(w,2),fe=I(de),pe=I(fe,!0);F(fe);var me=L(fe,2),he=I(me,!0);F(me),F(de),F(b);var D=L(b,2),ge=e=>{var t=Na();sa(t,e=>H(d,e),()=>G(d)),q(`error`,t,te),q(`loadstart`,t,ne),q(`canplay`,t,g),q(`pause`,t,_),q(`playing`,t,re),q(`ended`,t,ee),Y(e,t)};return X(D,e=>{G(h)&&e(ge)}),F(oe),Er(()=>{di(ce,l().enterCodeFromImage),Z(C,`src`,a()),Z(T,`minlength`,r().length||1),Z(T,`maxlength`,r().length),Z(T,`placeholder`,l().enterCode),Z(T,`aria-label`,G(u)===Ea.LOADING?l().loading:G(u)===Ea.PLAYING?``:l().enterCodeAria),Z(T,`aria-live`,G(u)?`assertive`:`polite`),Z(T,`aria-busy`,G(u)===Ea.LOADING),Z(E,`title`,l().reload),Z(E,`aria-label`,l().reload),Z(fe,`aria-label`,l().verify),di(pe,l().verify),Z(me,`aria-label`,l().cancel),di(he,l().cancel)}),q(`submit`,b,v,!0),Kr(`keydown`,T,ie),ra(T,()=>G(m),e=>H(m,e)),q(`click`,E,()=>s()?.(),!0),q(`click`,me,()=>o()?.(),!0),Y(e,oe),nt(ae)}qr([`keydown`]),ha(Fa,{audioUrl:{},codeChallenge:{},config:{},imageUrl:{},onCancel:{},onReload:{},onSubmit:{},strings:{}},[],[],{mode:`open`});var Ia=J(`<div class="altcha-popover-backdrop" data-backdrop=""></div>`),La=J(`<div class="altcha-popover-arrow"></div>`),Ra=J(`<div role="button" class="altcha-popover-close">&times;</div>`),za=J(`<!> <div><!> <!> <div class="altcha-popover-content"><!></div></div>`,1);function Ba(e,t){tt(t,!0);let n=Q(t,`anchor`),r=Q(t,`children`),i=Q(t,`display`,7,`standard`),a=Q(t,`backdrop`,7,!1),o=Q(t,`onClickOutside`),s=Q(t,`onClickOutsideDelay`,7,600),c=Q(t,`onClose`),l=Q(t,`placement`,7,`auto`),u=Q(t,`updateUISignal`),d=Q(t,`variant`,7,`neutral`),f=la(t,[`$$slots`,`$$events`,`$$legacy`,`$$host`,`anchor`,`children`,`display`,`backdrop`,`onClickOutside`,`onClickOutsideDelay`,`onClose`,`placement`,`updateUISignal`,`variant`]),p=V(void 0),m=V(void 0),h=V(!1),ee=V(0);yr(()=>{l()!==`auto`&&H(h,l()===`top`)}),yr(()=>{u()&&ie()}),bi(()=>{let e=i()===`bottomsheet`||i()===`overlay`;return e&&(G(m)&&document.body.append(G(m)),G(p)&&document.body.append(G(p))),ie(),ur().then(()=>{H(ee,Date.now(),!0)}),()=>{e&&(G(m)&&document.body.removeChild(G(m)),G(p)&&document.body.removeChild(G(p)))}});function te(){c()?.()}function g(e){let t=e.target;!G(p)?.contains(t)&&(!s()||G(ee)+s()<Date.now())&&o()?.()}function ne(){ie()}function _(){ie()}function ie(){if(n()&&l()===`auto`&&G(p)){let e=n().getBoundingClientRect(),t=document.documentElement.clientHeight-(e.top+e.height)<G(p).clientHeight;G(h)!==t&&H(h,t)}}var v={get anchor(){return n()},set anchor(e){n(e),B()},get children(){return r()},set children(e){r(e),B()},get display(){return i()},set display(e=`standard`){i(e),B()},get backdrop(){return a()},set backdrop(e=!1){a(e),B()},get onClickOutside(){return o()},set onClickOutside(e){o(e),B()},get onClickOutsideDelay(){return s()},set onClickOutsideDelay(e=600){s(e),B()},get onClose(){return c()},set onClose(e){c(e),B()},get placement(){return l()},set placement(e=`auto`){l(e),B()},get updateUISignal(){return u()},set updateUISignal(e){u(e),B()},get variant(){return d()},set variant(e=`neutral`){d(e),B()}},y=za();q(`click`,yt,g,!0),q(`resize`,yt,ne),q(`scroll`,yt,_);var ae=Ot(y),oe=e=>{var t=Ia();sa(t,e=>H(m,e),()=>G(m)),Y(e,t)};X(ae,e=>{a()&&e(oe)});var b=L(ae,2);$i(b,()=>({...f,class:`altcha-popover ${(t.class||``)??``}`,"data-popover":!0,"data-variant":d(),"data-top":G(h),"data-display":i()}));var x=I(b),S=e=>{Y(e,La())};X(x,e=>{i()===`standard`&&e(S)});var se=L(x,2),ce=e=>{var t=Ra();q(`click`,t,te,!0),Y(e,t)};X(se,e=>{i()!==`standard`&&e(ce)});var C=L(se,2);return yi(I(C),()=>r()??re),F(C),F(b),sa(b,e=>H(p,e),()=>G(p)),Y(e,y),nt(v)}ha(Ba,{anchor:{},children:{},display:{},backdrop:{},onClickOutside:{},onClickOutsideDelay:{},onClose:{},placement:{},updateUISignal:{},variant:{}},[],[],{mode:`open`});function Va(e){return Array.from(new Uint8Array(e)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}function Ha(e,t=`altcha-css`,n){if(typeof document<`u`&&document&&!document.getElementById(t)){let n=document.createElement(`style`);n.id=t,n.textContent=e;let r=document.currentScript?.nonce??document.querySelector(`meta[name="csp-nonce"]`)?.content;r&&(n.nonce=r),document.head.appendChild(n)}}async function Ua(e){let{challenge:t,concurrency:n=navigator.hardwareConcurrency,controller:r=new AbortController,createWorker:i,onOutOfMemory:a=e=>e>1?Math.floor(e/2):0,counterMode:o,timeout:s=9e4}=e,c=Math.min(16,Math.max(1,n)),l=[],u=()=>{for(let e of l)e.terminate()};for(let e=0;e<c;e++)l.push(await i(t.parameters.algorithm));let d=null;try{d=await Promise.race(l.map((e,n)=>(r.signal.addEventListener(`abort`,()=>{e.postMessage({type:`abort`})}),new Promise((r,i)=>{e.addEventListener(`error`,e=>{i(e)}),e.addEventListener(`message`,t=>{if(t.data){for(let t of l)t!==e&&t.postMessage({type:`abort`});if(t.data.error)return i(Error(t.data.error))}r(t.data)}),e.postMessage({challenge:t,counterMode:o,counterStart:n,counterStep:c,timeout:s,type:`work`})}))))}catch(n){if(n instanceof Error&&n?.message?.includes(`Out of memory`)&&a){u();let n=a(c);if(n)return Ua({...e,challenge:t,controller:r,concurrency:n,createWorker:i})}throw n}finally{u()}return r.signal.aborted?null:d||null}var Wa=class{TAG_CODES={INPUT:1,TEXTAREA:2,SELECT:3,BUTTON:4,A:5,DETAILS:6,SUMMARY:7,IFRAME:8,VIDEO:9,AUDIO:10};maxSamples;sampleInterval;target;focusStartTime=0;focusInteraction=0;focusInteractionTimer=null;lastPointerSample=0;lastTouchSample=0;lastScrollSample=0;pendingPointer=null;pendingTouch=null;focus=[];pointer=[];scroll=[];touch=[];constructor(e={}){let{maxSamples:t=60,sampleInterval:n=50,target:r=window}=e;this.maxSamples=t,this.sampleInterval=n,this.target=r,this.attach()}destroy(){let e={capture:!0};this.target.removeEventListener(`focusin`,this.onFocus,e),this.target.removeEventListener(`keydown`,this.onInteraction,e),this.target.removeEventListener(`pointerdown`,this.onInteraction,e),this.target.removeEventListener(`pointermove`,this.onPointer,e),this.target.removeEventListener(`scroll`,this.onScroll,e),this.target.removeEventListener(`touchmove`,this.onTouchMove,e)}export(){return{focus:this.focus,maxTouchPoints:navigator.maxTouchPoints||0,pointer:this.pointer,scroll:this.scroll,time:Date.now(),touch:this.touch}}attach(){let e={passive:!0,capture:!0};this.target.addEventListener(`focusin`,this.onFocus,e),this.target.addEventListener(`keydown`,this.onInteraction,e),this.target.addEventListener(`pointerdown`,this.onInteraction,e),this.target.addEventListener(`pointermove`,this.onPointer,e),this.target.addEventListener(`scroll`,this.onScroll,e),this.target.addEventListener(`touchmove`,this.onTouchMove,e)}evict(e){e.length>this.maxSamples&&e.splice(0,e.length-this.maxSamples)}onFocus=e=>{if(this.focusInteraction===2)return;let t=e.target;if(!(t instanceof Element))return;let n=performance.now();this.focusStartTime===0&&(this.focusStartTime=n),this.focus.push([Math.round(n-this.focusStartTime),t.tabIndex,this.TAG_CODES[t.tagName]??0,+!!this.focusInteraction]),this.evict(this.focus)};onInteraction=e=>{this.focusInteraction=`keyCode`in e?1:2,this.focusInteractionTimer&&clearTimeout(this.focusInteractionTimer),this.focusInteractionTimer=setTimeout(()=>{this.focusInteraction=0},100)};onPointer=e=>{if(e.pointerType===`touch`)return;let t=e.timeStamp||performance.now();this.pendingPointer=[Math.round(e.clientX),Math.round(e.clientY),Math.round(t)],t-this.lastPointerSample>=this.sampleInterval&&(this.pointer.push(this.pendingPointer),this.lastPointerSample=t,this.pendingPointer=null,this.evict(this.pointer))};onScroll=()=>{let e=performance.now();e-this.lastScrollSample<this.sampleInterval||(this.scroll.push([Math.round(window.scrollY),Math.round(e)]),this.lastScrollSample=e,this.evict(this.scroll))};onTouchMove=e=>{let t=e.timeStamp||performance.now(),n=e.touches[0];n&&(this.pendingTouch=[Math.round(n.clientX),Math.round(n.clientY),Math.round(t),Math.round(n.force*1e3)/1e3,Math.round(n.radiusX||0),Math.round(n.radiusY||0)],t-this.lastTouchSample>=this.sampleInterval&&(this.touch.push(this.pendingTouch),this.lastTouchSample=t,this.pendingTouch=null,this.evict(this.touch)))}},Ga=J(`<div class="altcha-overlay-backdrop" data-backdrop=""></div>`),Ka=J(`<div class="altcha-overlay-content"></div>`),qa=J(`<div role="button" class="altcha-overlay-close">&times;</div> <!>`,1),Ja=J(`<div class="altcha-floating-arrow"></div>`),Ya=J(`<input type="hidden"/>`),Xa=J(`<div class="altcha-error">Secure context (HTTPS) required.</div>`),Za=J(`<div class="altcha-error"> </div>`),Qa=J(`<div class="altcha-error"> </div>`),$a=J(`<!> <!>`,1),eo=J(`<!> <div class="altcha"><!> <div class="altcha-main"><div><div class="altcha-checkbox-wrap"><!> <label><!></label></div> <!></div> <!> <!> <!></div> <!></div>`,1);function to(e,t){tt(t,!0);let n=()=>Wt(c,`$altchaDefaults`,i),r=()=>Wt(f,`$altchaI18nStore`,i),[i,a]=Gt(),o=[`ar`,`fa`,`he`,`ur`],{isSecureContext:s}=globalThis,{store:c}=globalThis.$altcha.defaults,l=navigator.hardwareConcurrency||2,u=navigator.deviceMemory||0,d=u&&u<=4?Math.min(4,l):l,f=globalThis.$altcha.i18n.store,p=t.$$host,m=(e,t)=>{ur().then(()=>{p?.dispatchEvent(new CustomEvent(e,{detail:t}))})},h=null,ee=V(gt(new URL(location.origin))),te=V(!1),g=V(null),ne=V(null),re=V(null),_=V(gt($.UNVERIFIED)),ie=V(void 0),v=V(void 0),y=V(null),ae=V(void 0),oe=V(null),b=V(null),x=V(null),S=V(null),se=V(gt([])),ce=V(0),C=V(gt({})),w=V(!0),T=xn(()=>({fetch:(e,t)=>fetch(e,t),audioChallengeLanguage:``,auto:`off`,barPlacement:`bottom`,challenge:``,codeChallenge:null,codeChallengeDisplay:`standard`,credentials:null,debug:!1,disableAutoFocus:!1,display:`standard`,floatingAnchor:``,floatingOffset:8,floatingPersist:!1,floatingPlacement:`auto`,hideFooter:!1,hideLogo:!1,humanInteractionSignature:!0,language:``,mockError:!1,minDuration:500,overlayContent:``,name:`altcha`,popoverPlacement:`auto`,retryOnOutOfMemoryError:!0,setCookie:null,serverVerificationFields:!1,serverVerificationTimeZone:!1,test:!1,timeout:9e4,type:`checkbox`,validationMessage:``,verifyFunction:null,verifyUrl:``,workers:d,...n(),...G(C)})),le=xn(()=>`altcha-checkbox-${t.id||Math.floor(Math.random()*0xe8d4a51000).toString(16)}`),ue=xn(()=>Oe(G(T).type)),E=xn(()=>G(T).auto),de=xn(()=>G(_)===$.VERIFYING),fe=xn(()=>!G(T).hideFooter),pe=xn(()=>!G(T).hideLogo&&G(T).display!==`bar`),me=xn(()=>ke(r(),[G(T).language,document.documentElement.lang,...navigator.languages])),he=xn(()=>o.includes(G(me).language)?`rtl`:void 0),D=xn(()=>({...G(me).strings})),ge=xn(()=>G(g)?.audio?.match(/^(https?:)?\//)?Ne(G(g).audio,G(ee),{language:G(T).audioChallengeLanguage||G(me).language}).toString():G(g)?.audio),_e=xn(()=>G(g)?.image?.match(/^(https?:)?\//)?Ne(G(g).image,G(ee)):G(g)?.image);yr(()=>{Qe({auto:t.auto,challenge:t.challenge,display:t.display,language:t.language,name:t.name,type:t.type,workers:t.workers})}),yr(()=>{if(t.configuration)try{Qe(JSON.parse(t.configuration))}catch{A("unable to parse the `configuration` attribute (JSON expected)")}}),yr(()=>{G(re)!==G(T).display&&Ye(G(T).display)}),yr(()=>{G(te)&&G(_)===$.VERIFYING&&H(te,!1)}),yr(()=>{!G(te)&&G(_)===$.VERIFIED&&H(te,!0)}),yr(()=>{if(!G(te)){let e=De();e&&e.checked&&(e.checked=!1)}}),yr(()=>{G(_)===$.VERIFIED&&De()?.setCustomValidity(``)}),yr(()=>{if(G(E)===`onload`){let e=setTimeout(()=>{ot()},1);return()=>{e&&clearTimeout(e)}}}),yr(()=>{G(b)&&A(`error:`,G(b))}),yr(()=>{G(S)&&G(T).setCookie&&Je(G(S),G(T).setCookie)}),bi(()=>(A(`mounted`,`3.2.1`),p&&globalThis.$altcha.instances.add(p),H(y,G(ae)?.closest(`form`),!0),G(y)?.addEventListener(`reset`,Be),G(y)?.addEventListener(`submit`,Ve,{capture:!0}),G(y)?.addEventListener(`focusin`,ze),ve(),G(T).humanInteractionSignature&&(A(`human interaction signature enabled`),h=new Wa),m(`load`),s||A(`secure context (HTTPS) required`),()=>{be(),p&&globalThis.$altcha.instances.delete(p),G(x)&&clearTimeout(G(x)),G(y)?.removeEventListener(`reset`,Be),G(y)?.removeEventListener(`submit`,Ve,{capture:!0}),G(y)?.removeEventListener(`focusin`,ze),h?.destroy()}));function ve(){H(se,[...globalThis.$altcha.plugins].map(e=>new e(p)),!0),A(`activating plugins`,G(se).map(e=>e.constructor.name));for(let e of G(se))e.activate()}async function ye(e,...t){let n;for(let r of G(se))n=await r[e].call(r,...t);return n}function be(){for(let e of G(se))e.destroy()}function xe(e){let[t,n]=e.salt.split(`?`),r={};if(n)try{Object.assign(r,Object.fromEntries(new URLSearchParams(n).entries()))}catch{}let i={codeChallenge:e.codeChallenge,parameters:{algorithm:e.algorithm,cost:1,data:r,expiresAt:r?.expires?parseInt(r.expires,10):void 0,keyLength:e.algorithm===`SHA-512`?64:e.algorithm===`SHA-384`?48:32,nonce:Va(new TextEncoder().encode(e.salt)),keyPrefix:e.challenge,salt:``},signature:e.signature};return Object.defineProperties(i,{_originalSalt:{enumerable:!1,value:e.salt,writable:!1},_version:{enumerable:!1,value:1,writable:!1}}),i}function Se(e,t){return{algorithm:e.parameters.algorithm,challenge:e.parameters.keyPrefix,number:t.counter,salt:`_originalSalt`in e?e._originalSalt:e.parameters.nonce,signature:e.signature,took:t.time||0}}async function Ce(e){await new Promise(t=>setTimeout(t,e))}async function we(e=G(T).challenge,t){let n=await ye(`onFetchChallenge`,e),r=null;if(n!==void 0)return n;if(typeof e==`string`)if(e.startsWith(`{`)){A(`parsing JSON challenge`);try{r=JSON.parse(e)}catch{throw Error(`Unable to parse JSON challenge.`)}}else{A(`fetching challenge from`,t?.method||`GET`,e),H(ee,new URL(e,location.origin),!0);let n=await G(T).fetch(e,{credentials:G(T).credentials||void 0,...t});await O(n);let i=n.headers.get(`x-altcha-config`);i&&We(i);let a=await n.json();if(a&&`his`in a&&a.his){if(A(`requested HIS`),!h)throw Error(`Server requested HIS data but collector is disabled.`);return we(Ne(a.his.url,G(ee)),{body:JSON.stringify({his:h.export()}),headers:{"content-type":`application/json`},method:`POST`})}a&&`hisResult`in a&&a.hisResult&&A(`HIS result`,a.hisResult),r=a}else if(e&&typeof e==`object`)try{r=JSON.parse(JSON.stringify(e))}catch{throw Error(`Unable to parse JSON challenge.`)}if(Te(r)&&(r=xe(r)),!Ee(r))throw Error(`Challenge validation failed.`);return r}function Te(e){return typeof e==`object`&&`challenge`in e}function Ee(e){return!!e&&typeof e==`object`&&`parameters`in e&&!!e.parameters&&typeof e.parameters==`object`&&`algorithm`in e.parameters&&`nonce`in e.parameters&&`salt`in e.parameters&&`keyPrefix`in e.parameters}function De(){return document.getElementById(G(le))}function Oe(e){switch(e){case`checkbox`:return _a;case`switch`:return Ta;default:return ya}}function ke(e,t){let n=Object.keys(e).map(e=>e.toLowerCase()),r=t.reduce((t,r)=>(r=r.toLowerCase(),t||(e[r]?r:null)||n.find(e=>r.split(`-`)[0]===e.split(`-`)[0])||null),null);return e[r||``]||(r=`en`),{language:r,strings:e[r]}}function Ae(e){switch(e){case`bar`:return G(T).barPlacement||`bottom`;case`floating`:return G(T).floatingPlacement||`auto`;default:return}}function je(e){return[...G(y)?.querySelectorAll(`input[type="text"]:not([data-no-spamfilter]), textarea:not([data-no-spamfilter])`)||[]].reduce((e,t)=>{let n=t.name,r=t.value;return n&&r&&(e[n]=/\n/.test(r)?r.replace(RegExp(`(?<!\\r)\\n`,`g`),`\r
`):r),e},{})}function Me(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch{}}function Ne(e,t,n){let r=new URL(e,t);if(r.search||=t.search,n)for(let e in n)n[e]!==void 0&&n[e]!==null&&r.searchParams.set(e,n[e]);return r.toString()}function Pe(e){!G(te)&&e.currentTarget.checked?(e.preventDefault(),e.currentTarget.checked=!1,G(_)!==$.VERIFYING&&ot()):e.currentTarget.checked||(e.preventDefault(),rt())}function Fe(e){G(_)===$.VERIFYING?e.currentTarget.setCustomValidity(G(D).waitAlert):G(T).validationMessage&&e.currentTarget.setCustomValidity(G(T).validationMessage)}function Ie(){Ye(G(T).display),rt()}function Le(){at()}function Re(e){let t=e.target;G(T).display===`floating`&&t&&!p?.contains(t)&&!t.hasAttribute(`data-backdrop`)&&!t.closest(`[data-popover]`)&&G(_)!==$.VERIFIED&&!G(T).floatingPersist&&k()}function ze(e){G(E)===`onfocus`&&G(_)===$.UNVERIFIED&&ot()}function Be(){Ye(G(T).display),rt()}function Ve(e){e.target?.getAttribute(`data-code-challenge`)!==`true`&&G(E)===`onsubmit`&&G(_)===$.UNVERIFIED&&(e.preventDefault(),e.stopPropagation(),H(oe,e.submitter,!0),it(),ot().then(e=>{e&&!G(g)&&ur().then(()=>{qe(G(oe))})}))}function He(e){e.persisted&&(Ye(G(T).display),rt())}function Ue(){at()}function We(e){try{let t=JSON.parse(e);t&&typeof t==`object`&&Qe({serverVerificationFields:t?.sentinel?.fields,serverVerificationTimeZone:t?.sentinel?.timeZone,verifyUrl:t.verifyurl,...t})}catch(e){A(`unable to configure from x-altcha-config header`,e)}}function Ge(e=20){if(!G(ae))return;let t=G(T).floatingPlacement;if(!G(v)&&(H(v,(G(T).floatingAnchor instanceof HTMLElement?G(T).floatingAnchor:G(T).floatingAnchor?document.querySelector(G(T).floatingAnchor):G(y)?.querySelector(`input[type="submit"], button[type="submit"], button:not([type="button"]):not([type="reset"])`))||G(y),!0),!G(v))){A(`unable to find floating anchor element`);return}let n=parseInt(G(T).floatingOffset,10)||12,r=G(v).getBoundingClientRect(),i=G(ae).getBoundingClientRect(),a=document.documentElement.clientHeight,o=document.documentElement.clientWidth,s=!t||t===`auto`?r.bottom+i.height+n+e>a:t===`top`,c=Math.max(e,Math.min(o-e-i.width,r.left+r.width/2-i.width/2));if(G(ae).style.setProperty(`--altcha-floating-left`,`${c}px`),G(ae).style.setProperty(`--altcha-floating-top`,s?`${r.top-(i.height+n)}px`:`${r.bottom+n}px`),G(ae).setAttribute(`data-floating-position`,s?`top`:`bottom`),G(ie)){let e=G(ie).getBoundingClientRect();G(ie).style.left=r.left-c+r.width/2-e.width/2+`px`}}async function Ke(e,t){let n=await ye(`onRequestServerVerification`,e,t);if(n!==void 0)return n;if(A(`requesting server verification from`,G(T).verifyUrl),!G(T).verifyUrl)throw Error(`Parameter verifyUrl must be set for server verification.`);let r=await G(T).fetch(Ne(G(T).verifyUrl,G(ee)),{body:JSON.stringify({code:t,fields:G(T).serverVerificationFields?je():void 0,payload:e,timeZone:G(T).serverVerificationTimeZone?Me():void 0}),credentials:G(T).credentials||void 0,headers:{"Content-Type":`application/json`},method:`POST`});await O(r);let i=await r.json();return i&&typeof i==`object`&&`payload`in i&&i.payload&&m(`serververification`,i),i}function qe(e){G(y)&&`requestSubmit`in G(y)?G(y).requestSubmit(e):G(y)?.reportValidity()&&(e?e.click():G(y).submit())}function Je(e,t={}){let{domain:n,name:r=G(T).name,maxAge:i,path:a,sameSite:o,secure:s}=t,c=`${encodeURIComponent(r)}=${encodeURIComponent(e)}`;n&&(c+=`; Domain=${n}`),i!=null&&(c+=`; Max-Age=${i}`),a&&(c+=`; Path=${a}`),o&&(c+=`; SameSite=${o}`),s&&(c+=`; Secure`),document.cookie=c}function Ye(e){switch(e){case`bar`:case`floating`:case`overlay`:k(),(!G(E)||G(E)===`off`)&&(G(C).auto=`onsubmit`);break;case`standard`:it()}G(re)!==e&&H(re,e,!0)}function Xe(e){G(x)&&clearTimeout(G(x));let t=()=>{G(_)===$.UNVERIFIED?rt():(H(te,!1),j($.EXPIRED)),m(`expired`)},n=e*1e3-Date.now();n>=1?H(x,setTimeout(t,n),!0):t()}async function O(e){if(e.status>=400){if(e.headers.get(`content-type`)?.includes(`/json`)){let t;try{t=await e.json()}catch{}if(t&&`error`in t)throw Error(`Server responded with ${e.status} - ${t.error}`)}throw Error(`Server responded with ${e.status}.`)}let t=e.headers.get(`content-type`);if(!t||!t.includes(`/json`))throw Error(`Server responded with invalid content-type. Expected application/json, received ${t}.`)}async function Ze(e){if(!G(S)){j($.ERROR,`Cannot verify code challenge without PoW payload.`);return}j($.VERIFYING);let t=null;if(G(T).verifyUrl)t=await Ke(G(S),e);else if(G(T).verifyFunction)t=await G(T).verifyFunction(G(S),e);else{j($.ERROR,`Parameter verifyUrl is required for code challenge verification.`);return}t?.payload&&(H(S,t.payload,!0),A(`server payload`,G(S))),t?.verified===!0?(A(`verified`),j($.VERIFIED),m(`verified`,{payload:G(S)}),G(E)===`onsubmit`&&ur().then(()=>{qe(G(oe))})):j($.ERROR,t?.reason||`Verification failed.`),G(T).disableAutoFocus||De()?.focus()}function Qe(e){Object.assign(G(C),{...Object.fromEntries(Object.entries(e).filter(([e,t])=>t!==void 0))})}function $e(){return{...G(T)}}function et(){return G(_)}function k(){H(w,!1)}function A(...e){(G(T).debug||e.some(e=>e instanceof Error))&&console[e[0]instanceof Error?`error`:`log`](`ALTCHA`,`[name=${G(T).name}]`,...e)}function rt(e=$.UNVERIFIED,t=null){H(te,!1),H(b,t,!0),H(S,null),G(ne)&&G(ne).abort(),G(x)&&(clearTimeout(G(x)),H(x,null)),j(e)}function j(e,t=null){H(_,e,!0),H(b,t,!0),m(`statechange`,{payload:G(S),state:G(_)})}function it(){H(w,!0),ur().then(()=>{at()})}function at(){if(G(T).display===`floating`)return Ge();H(ce,G(ce)+1)}async function ot(e={}){let{concurrency:t=Math.max(1,G(T).workers),controller:n=new AbortController,minDuration:r=G(T).minDuration}=e,i=performance.now(),a=null,o=null,c=!1,l=await ye(`onVerify`,e);if(l!==void 0)return l;rt($.VERIFYING),H(ne,n,!0);try{if(!s)throw Error(`Secure context (HTTPS) required.`);if(G(T).mockError)throw Error(`Mock error.`);if(G(T).test)return A(`running test mode with null challenge`),await Ce(Math.max(0,r-(performance.now()-i))),G(ne)?.signal.aborted?(rt(),null):(H(S,btoa(JSON.stringify({challenge:null,solution:null,test:!0})),!0),A(`verified`),j($.VERIFIED),m(`verified`,{payload:G(S)}),{payload:G(S)});if(a=await we(),!a)throw Error(`Failed to fetch challenge.`);A(`challenge`,a),`configuration`in a&&(A(`re-configuring from challenge`,a.configuration),Qe(a.configuration)),a.parameters.expiresAt&&Xe(a.parameters.expiresAt),c=`_version`in a&&a._version===1;let e=globalThis.$altcha.algorithms.get(a.parameters.algorithm);if(!e)throw Error(`Unsupported algorithm ${a.parameters.algorithm}.`);if(o=await Ua({challenge:a,concurrency:t,controller:n,createWorker:e,counterMode:c?`string`:`uint32`,onOutOfMemory:e=>{if(A(`out of memory error received`),m(`outofmemory`),G(T).retryOnOutOfMemoryError&&e>1){let t=Math.floor(e/2);return A(`retrying with ${t} workers...`),t}},timeout:G(T).timeout}),G(ne)?.signal.aborted)return rt(),null;if(!o)throw Error(`Failed to find solution.`);A(`solution`,o),await Ce(Math.max(0,r-(performance.now()-i))),H(g,a.codeChallenge||G(T).codeChallenge||null,!0),c?H(S,btoa(JSON.stringify(Se(a,o))),!0):H(S,btoa(JSON.stringify({challenge:{parameters:a.parameters,signature:a.signature},solution:o})),!0),G(g)?(A(`requesting code verification`),j($.CODE),m(`codechallenge`,{codeChallenge:G(g)})):G(T).verifyUrl?await Ze():(A(`verified`),j($.VERIFIED),m(`verified`,{payload:G(S)}))}catch(e){return A(`verification failed`,e),j($.ERROR,String(e)),null}finally{H(ne,null)}return{challenge:a,payload:G(S),solution:o}}var st={configure:Qe,getConfiguration:$e,getState:et,hide:k,log:A,reset:rt,setState:j,show:it,updateUI:at,verify:ot},ct=eo();q(`scroll`,bt,Le),q(`click`,bt,Re),q(`pageshow`,yt,He),q(`resize`,yt,Ue);var lt=Ot(ct),ut=e=>{Y(e,Ga())};X(lt,e=>{G(T).display===`overlay`&&G(w)&&e(ut)});var M=L(lt,2),dt=I(M),N=e=>{var t=qa(),n=Ot(t),r=L(n,2),i=e=>{var t=Ka();Ci(t,()=>document.querySelector(G(T).overlayContent)?.innerHTML,!0),F(t),Y(e,t)};X(r,e=>{G(T).overlayContent&&e(i)}),q(`click`,n,Ie,!0),Y(e,t)};X(dt,e=>{G(T).display===`overlay`&&G(w)&&e(N)});var P=L(dt,2),ft=I(P),pt=I(ft),mt=I(pt);{let e=xn(()=>G(T).display===`standard`&&G(E)!==`onsubmit`||G(_)===$.VERIFYING);wi(mt,()=>G(ue),(t,n)=>{n(t,{get id(){return G(le)},name:``,get required(){return G(e)},get loading(){return G(de)},get checked(){return G(te)},onchange:Pe,oninvalid:Fe})})}var ht=L(mt,2),_t=I(ht),vt=e=>{var t=ni();Er(()=>di(t,G(D).verificationRequired)),Y(e,t)},xt=e=>{var t=ni();Er(()=>di(t,G(D).verifying)),Y(e,t)},St=e=>{var t=ni();Er(()=>di(t,G(D).verified)),Y(e,t)},Ct=e=>{var t=ni();Er(()=>di(t,G(D).label)),Y(e,t)};X(_t,e=>{G(_)===$.CODE&&G(g)?e(vt):G(_)===$.VERIFYING?e(xt,1):G(_)===$.VERIFIED?e(St,2):e(Ct,-1)}),F(ht),F(pt);var wt=L(pt,2),Tt=e=>{xa(e,{get strings(){return G(D)}})};X(wt,e=>{G(pe)&&e(Tt)}),F(ft);var Et=L(ft,2),Dt=e=>{{let t=xn(()=>G(T).display===`bar`&&G(pe));Ca(e,{get logo(){return G(t)},get strings(){return G(D)}})}};X(Et,e=>{G(fe)&&e(Dt)});var kt=L(Et,2),At=e=>{var t=Ja();sa(t,e=>H(ie,e),()=>G(ie)),Y(e,t)};X(kt,e=>{G(T).display===`floating`&&e(At)});var jt=L(kt,2),Mt=e=>{var t=Ya();Yi(t),Er(()=>{Z(t,`name`,G(T).name),Xi(t,G(S))}),Y(e,t)};X(jt,e=>{G(T).setCookie||e(Mt)}),F(P);var Nt=L(P,2),Pt=e=>{Ba(e,{get anchor(){return G(ae)},onClickOutside:()=>{s&&rt()},get placement(){return G(T).popoverPlacement},role:`alert`,variant:`error`,get dir(){return G(he)},get updateUISignal(){return G(ce)},children:(e,t)=>{var n=ri(),r=Ot(n),i=e=>{Y(e,Xa())},a=e=>{var t=Za(),n=I(t,!0);F(t),Er(()=>di(n,G(D).expired)),Y(e,t)},o=e=>{var t=Qa(),n=I(t,!0);F(t),Er(()=>{Z(t,`title`,G(b)),di(n,G(D).error)}),Y(e,t)};X(r,e=>{!G(b)&&!s?e(i):!G(b)&&G(_)===$.EXPIRED?e(a,1):e(o,-1)}),Y(e,n)},$$slots:{default:!0}})},Ft=e=>{var t=ri();Si(Ot(t),()=>G(g),e=>{{let t=xn(()=>G(T).codeChallengeDisplay!==`standard`);Ba(e,{get anchor(){return G(ae)},get backdrop(){return G(t)},get display(){return G(T).codeChallengeDisplay},onClose:()=>{rt()},get placement(){return G(T).popoverPlacement},role:`dialog`,get"aria-label"(){return G(D).verificationRequired},get dir(){return G(he)},get updateUISignal(){return G(ce)},children:(e,t)=>{var n=$a(),r=Ot(n);Fa(r,{get audioUrl(){return G(ge)},get imageUrl(){return G(_e)},onCancel:()=>rt(),onReload:()=>ot(),onSubmit:e=>Ze(e),get codeChallenge(){return G(g)},get config(){return G(T)},get strings(){return G(D)}});var i=L(r,2),a=e=>{Ca(e,{get logo(){return G(pe)},get strings(){return G(D)}})};X(i,e=>{G(fe)&&G(T).codeChallengeDisplay!==`standard`&&e(a)}),Y(e,n)},$$slots:{default:!0}})}}),Y(e,t)};X(Nt,e=>{G(b)||G(_)===$.EXPIRED||!s?e(Pt):G(g)&&G(_)===$.CODE&&e(Ft,1)}),F(M),sa(M,e=>H(ae,e),()=>G(ae)),Er(e=>{Z(M,`data-state`,G(_)),Z(M,`data-display`,G(T).display||void 0),Z(M,`data-placement`,e),Z(M,`data-visible`,G(w)||void 0),Z(M,`dir`,G(he)),Z(ht,`for`,G(le)),M.dir=M.dir},[()=>Ae(G(T).display)]),Y(e,ct);var R=nt(st);return a(),R}typeof window<`u`&&window.customElements&&!customElements.get(`altcha-widget`)&&customElements.define(`altcha-widget`,ha(to,{auto:{type:`String`},challenge:{type:`String`},configuration:{type:`String`},display:{type:`String`},language:{type:`String`},name:{type:`String`},theme:{type:`String`},type:{type:`String`},workers:{type:`Number`}},[],[`configure`,`getConfiguration`,`getState`,`hide`,`log`,`reset`,`setState`,`show`,`updateUI`,`verify`]));var no=`(function() {
  "use strict";
  function bufferStartsWith(buffer, prefix) {
    if (prefix.length > buffer.length) {
      return false;
    }
    for (let i = 0; i < prefix.length; i++) {
      if (buffer[i] !== prefix[i]) {
        return false;
      }
    }
    return true;
  }
  function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  function concatBuffers(a, b) {
    const out = new Uint8Array(a.length + b.length);
    out.set(a, 0);
    out.set(b, a.length);
    return out;
  }
  function hexToBuffer(hex) {
    if (hex.length % 2 !== 0) {
      throw new Error(\`Hex string must have an even length. Got: \${hex}\`);
    }
    const buffer = new ArrayBuffer(hex.length / 2);
    const view = new DataView(buffer);
    for (let i = 0; i < hex.length; i += 2) {
      const byteString = hex.substring(i, i + 2);
      const byteValue = parseInt(byteString, 16);
      view.setUint8(i / 2, byteValue);
    }
    return new Uint8Array(buffer);
  }
  async function delay(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
  function timeDuration(start) {
    return Math.floor((performance.now() - start) * 10) / 10;
  }
  class PasswordBuffer {
    constructor(nonce, mode = "uint32") {
      this.nonce = nonce;
      this.mode = mode;
      this.buffer = new Uint8Array(this.nonce.length + this.COUNTER_BYTES);
      this.buffer.set(this.nonce, 0);
      this.dataView = new DataView(this.buffer.buffer);
    }
    nonce;
    mode;
    COUNTER_BYTES = 4;
    buffer;
    dataView;
    encoder = new TextEncoder();
    /**
     * Appends the counter to the nonce buffer.
     * In 'string' mode, encodes the counter as a UTF-8 string.
     * In 'uint32' mode, writes the counter as a big-endian 32-bit integer.
     */
    setCounter(n) {
      if (this.mode === "string") {
        return concatBuffers(this.nonce, this.encoder.encode(n.toString()));
      }
      this.dataView.setUint32(this.nonce.length, n, false);
      return this.buffer;
    }
  }
  async function solveChallenge(options) {
    const {
      challenge,
      controller,
      counterMode = "uint32",
      counterStart = 0,
      counterStep = 1,
      deriveKey: deriveKey2,
      timeout = 9e4
    } = options;
    const { nonce, keyPrefix, salt } = challenge.parameters;
    const nonceBuf = hexToBuffer(nonce);
    const saltBuf = hexToBuffer(salt);
    const keyPrefixBuf = keyPrefix.length % 2 === 0 ? hexToBuffer(keyPrefix) : null;
    const password = new PasswordBuffer(nonceBuf, counterMode);
    const start = performance.now();
    let counter = counterStart;
    let iterations = 0;
    let derivedKeyHex = "";
    let lastYield = start;
    while (true) {
      if (controller?.signal.aborted || timeout && iterations % 10 === 0 && performance.now() - start > timeout) {
        return null;
      }
      const { derivedKey } = await deriveKey2(
        challenge.parameters,
        saltBuf,
        password.setCounter(counter)
      );
      if (iterations % 10 === 0 && performance.now() - lastYield > 200) {
        await delay(0);
        lastYield = performance.now();
      }
      if (keyPrefixBuf ? bufferStartsWith(derivedKey, keyPrefixBuf) : bufferToHex(derivedKey).startsWith(keyPrefix)) {
        derivedKeyHex = bufferToHex(derivedKey);
        break;
      }
      counter = counter + counterStep;
      iterations = iterations + 1;
    }
    return {
      counter,
      derivedKey: derivedKeyHex,
      time: timeDuration(start)
    };
  }
  function handler(options) {
    const { deriveKey: deriveKey2 } = options;
    let controller = void 0;
    self.onmessage = async (message) => {
      const { challenge, counterMode, counterStart, counterStep, timeout, type } = message.data;
      if (type === "abort") {
        controller?.abort();
      } else if (type === "work") {
        controller = new AbortController();
        let solution;
        try {
          solution = await solveChallenge({
            challenge,
            controller,
            counterStart,
            counterStep,
            deriveKey: deriveKey2,
            counterMode,
            timeout
          });
        } catch (err) {
          return self.postMessage({ error: err });
        }
        self.postMessage(solution);
      }
    };
  }
  function getDigest(algorithm) {
    switch (algorithm) {
      case "PBKDF2/SHA-512":
        return "SHA-512";
      case "PBKDF2/SHA-384":
        return "SHA-384";
      case "PBKDF2/SHA-256":
      default:
        return "SHA-256";
    }
  }
  async function deriveKey(parameters, salt, password) {
    const { algorithm, cost, keyLength = 32 } = parameters;
    const passwordKey = await crypto.subtle.importKey(
      "raw",
      password,
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: cost,
        hash: getDigest(algorithm)
      },
      passwordKey,
      { name: "AES-GCM", length: keyLength * 8 },
      true,
      ["encrypt"]
    );
    return {
      derivedKey: new Uint8Array(await crypto.subtle.exportKey("raw", derivedKey))
    };
  }
  handler({
    deriveKey
  });
})();
`,ro=typeof self<`u`&&self.Blob&&new Blob([`(self.URL || self.webkitURL).revokeObjectURL(self.location.href);`,no],{type:`text/javascript;charset=utf-8`});function io(e){let t;try{if(t=ro&&(self.URL||self.webkitURL).createObjectURL(ro),!t)throw``;let n=new Worker(t,{name:e?.name});return n.addEventListener(`error`,()=>{(self.URL||self.webkitURL).revokeObjectURL(t)}),n}catch{return new Worker(`data:text/javascript;charset=utf-8,`+encodeURIComponent(no),{name:e?.name})}}var ao=`(function() {
  "use strict";
  function bufferStartsWith(buffer, prefix) {
    if (prefix.length > buffer.length) {
      return false;
    }
    for (let i = 0; i < prefix.length; i++) {
      if (buffer[i] !== prefix[i]) {
        return false;
      }
    }
    return true;
  }
  function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  function concatBuffers(a, b) {
    const out = new Uint8Array(a.length + b.length);
    out.set(a, 0);
    out.set(b, a.length);
    return out;
  }
  function hexToBuffer(hex) {
    if (hex.length % 2 !== 0) {
      throw new Error(\`Hex string must have an even length. Got: \${hex}\`);
    }
    const buffer = new ArrayBuffer(hex.length / 2);
    const view = new DataView(buffer);
    for (let i = 0; i < hex.length; i += 2) {
      const byteString = hex.substring(i, i + 2);
      const byteValue = parseInt(byteString, 16);
      view.setUint8(i / 2, byteValue);
    }
    return new Uint8Array(buffer);
  }
  async function delay(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
  function timeDuration(start) {
    return Math.floor((performance.now() - start) * 10) / 10;
  }
  class PasswordBuffer {
    constructor(nonce, mode = "uint32") {
      this.nonce = nonce;
      this.mode = mode;
      this.buffer = new Uint8Array(this.nonce.length + this.COUNTER_BYTES);
      this.buffer.set(this.nonce, 0);
      this.dataView = new DataView(this.buffer.buffer);
    }
    nonce;
    mode;
    COUNTER_BYTES = 4;
    buffer;
    dataView;
    encoder = new TextEncoder();
    /**
     * Appends the counter to the nonce buffer.
     * In 'string' mode, encodes the counter as a UTF-8 string.
     * In 'uint32' mode, writes the counter as a big-endian 32-bit integer.
     */
    setCounter(n) {
      if (this.mode === "string") {
        return concatBuffers(this.nonce, this.encoder.encode(n.toString()));
      }
      this.dataView.setUint32(this.nonce.length, n, false);
      return this.buffer;
    }
  }
  async function solveChallenge(options) {
    const {
      challenge,
      controller,
      counterMode = "uint32",
      counterStart = 0,
      counterStep = 1,
      deriveKey: deriveKey2,
      timeout = 9e4
    } = options;
    const { nonce, keyPrefix, salt } = challenge.parameters;
    const nonceBuf = hexToBuffer(nonce);
    const saltBuf = hexToBuffer(salt);
    const keyPrefixBuf = keyPrefix.length % 2 === 0 ? hexToBuffer(keyPrefix) : null;
    const password = new PasswordBuffer(nonceBuf, counterMode);
    const start = performance.now();
    let counter = counterStart;
    let iterations = 0;
    let derivedKeyHex = "";
    let lastYield = start;
    while (true) {
      if (controller?.signal.aborted || timeout && iterations % 10 === 0 && performance.now() - start > timeout) {
        return null;
      }
      const { derivedKey } = await deriveKey2(
        challenge.parameters,
        saltBuf,
        password.setCounter(counter)
      );
      if (iterations % 10 === 0 && performance.now() - lastYield > 200) {
        await delay(0);
        lastYield = performance.now();
      }
      if (keyPrefixBuf ? bufferStartsWith(derivedKey, keyPrefixBuf) : bufferToHex(derivedKey).startsWith(keyPrefix)) {
        derivedKeyHex = bufferToHex(derivedKey);
        break;
      }
      counter = counter + counterStep;
      iterations = iterations + 1;
    }
    return {
      counter,
      derivedKey: derivedKeyHex,
      time: timeDuration(start)
    };
  }
  function handler(options) {
    const { deriveKey: deriveKey2 } = options;
    let controller = void 0;
    self.onmessage = async (message) => {
      const { challenge, counterMode, counterStart, counterStep, timeout, type } = message.data;
      if (type === "abort") {
        controller?.abort();
      } else if (type === "work") {
        controller = new AbortController();
        let solution;
        try {
          solution = await solveChallenge({
            challenge,
            controller,
            counterStart,
            counterStep,
            deriveKey: deriveKey2,
            counterMode,
            timeout
          });
        } catch (err) {
          return self.postMessage({ error: err });
        }
        self.postMessage(solution);
      }
    };
  }
  async function deriveKey(parameters, salt, password) {
    const { algorithm, keyLength = 32 } = parameters;
    const iterations = Math.max(1, parameters.cost);
    let data = void 0;
    let derivedKey = void 0;
    for (let i = 0; i < iterations; i++) {
      if (i === 0) {
        data = concatBuffers(salt, password);
      } else {
        data = derivedKey;
      }
      derivedKey = new Uint8Array(
        (await crypto.subtle.digest(algorithm, data)).slice(0, keyLength)
      );
    }
    return {
      parameters: {},
      derivedKey
    };
  }
  handler({
    deriveKey
  });
})();
`,oo=typeof self<`u`&&self.Blob&&new Blob([`(self.URL || self.webkitURL).revokeObjectURL(self.location.href);`,ao],{type:`text/javascript;charset=utf-8`});function so(e){let t;try{if(t=oo&&(self.URL||self.webkitURL).createObjectURL(oo),!t)throw``;let n=new Worker(t,{name:e?.name});return n.addEventListener(`error`,()=>{(self.URL||self.webkitURL).revokeObjectURL(t)}),n}catch{return new Worker(`data:text/javascript;charset=utf-8,`+encodeURIComponent(ao),{name:e?.name})}}Ha(`:root {
  --altcha-border-color: var(--altcha-color-neutral);
  --altcha-border-width: 1px;
  --altcha-border-radius: 6px;
  --altcha-color-base: light-dark(oklch(100% 0.00011 271.152), oklch(20.904% 0.00002 271.152));
  --altcha-color-base-content: light-dark(
  	oklch(20.904% 0.00002 271.152),
  	oklch(100% 0.00011 271.152)
  );
  --altcha-color-error: oklch(51.284% 0.20527 28.678);
  --altcha-color-error-content: oklch(100% 0.00011 271.152);
  --altcha-color-neutral: light-dark(oklch(83.591% 0.0001 271.152), oklch(46.04% 0.00005 271.152));
  --altcha-color-neutral-content: light-dark(
  	oklch(46.76% 0.00005 271.152),
  	oklch(100% 0.00011 271.152)
  );
  --altcha-color-primary: oklch(40.279% 0.2449 268.131);
  --altcha-color-primary-content: oklch(100% 0.00011 271.152);
  --altcha-color-success: oklch(55.748% 0.18968 142.511);
  --altcha-color-success-content: oklch(100% 0.00011 271.152);
  --altcha-checkbox-border-color: light-dark(
  	oklch(66.494% 0.00233 15.434),
  	oklch(51.028% 0.00006 271.152)
  );
  --altcha-checkbox-border-radius: 5px;
  --altcha-checkbox-border-width: var(--altcha-border-width);
  --altcha-checkbox-outline: 2px solid var(--altcha-checkbox-outline-color);
  --altcha-checkbox-outline-color: -webkit-focus-ring-color;
  --altcha-checkbox-outline-offset: 2px;
  --altcha-checkbox-size: 22px;
  --altcha-checkbox-transition-duration: var(--altcha-transition-duration);
  --altcha-input-background-color: var(--altcha-color-base);
  --altcha-input-border-radius: 3px;
  --altcha-input-border-width: 1px;
  --altcha-input-color: var(--altcha-color-base-content);
  --altcha-max-width: 320px;
  --altcha-padding: 0.75rem;
  --altcha-popover-arrow-size: 6px;
  --altcha-popover-color: var(--altcha-border-color);
  --altcha-shadow: drop-shadow(3px 3px 6px oklch(0% 0 0 / 0.2));
  --altcha-spinner-color: var(--altcha-color-base-content);
  --altcha-switch-background-color: var(--altcha-color-neutral);
  --altcha-switch-border-radius: calc(infinity * 1px);
  --altcha-switch-height: var(--altcha-checkbox-size);
  --altcha-switch-padding: 0.25rem;
  --altcha-switch-width: calc(var(--altcha-checkbox-size) * 1.75);
  --altcha-switch-toggle-border-radius: 100%;
  --altcha-switch-toggle-color: var(--altcha-color-neutral-content);
  --altcha-switch-toggle-size: calc(
  	var(--altcha-switch-height) - calc(var(--altcha-switch-padding) * 2)
  );
  --altcha-transition-duration: 0.6s;
  --altcha-z-index: 99999999;
  --altcha-z-index-popover: 999999999;
}

@supports (-moz-appearance: none) {
  :root {
    --altcha-checkbox-outline-color: var(--altcha-color-primary);
  }
}
.altcha {
  all: revert-layer;
  display: none;
  font-family: inherit;
  font-size: inherit;
  position: relative;
}
.altcha[data-visible] {
  display: block;
}
.altcha-popover, .altcha-popover * {
  all: revert-layer;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.25;
}
.altcha * {
  all: revert-layer;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.25;
}
.altcha a, .altcha-popover a {
  color: currentColor;
  text-decoration: none;
}
.altcha a:hover, .altcha-popover a:hover {
  color: currentColor;
}
.altcha-main {
  align-items: start;
  background-color: var(--altcha-color-base);
  border: var(--altcha-border-width, 1px) solid var(--altcha-border-color);
  border-radius: var(--altcha-border-radius, 0);
  color: var(--altcha-color-base-content);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
  padding: var(--altcha-padding);
  max-width: var(--altcha-max-width, 100%);
}
.altcha-main > * {
  display: flex;
  width: 100%;
}
.altcha-main > *:first-child {
  flex-grow: 1;
}
.altcha-checkbox-wrap {
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 0.5rem;
}
.altcha-checkbox-wrap > * {
  display: flex;
}
.altcha-logo {
  opacity: 0.7;
}
.altcha-footer {
  align-items: center;
  display: flex;
  flex-grow: 1;
  gap: 0.5rem;
  justify-content: flex-end;
  font-size: 0.7rem;
  opacity: 0.7;
}
.altcha-footer p {
  margin: 0;
  padding: 0;
}
.altcha-error {
  font-size: 0.85rem;
}
.altcha-button {
  align-items: center;
  background: var(--altcha-color-primary);
  border: var(--altcha-input-border-width) solid var(--altcha-color-primary);
  border-radius: var(--altcha-input-border-radius);
  color: var(--altcha-color-primary-content);
  cursor: pointer;
  display: flex;
  font-size: 0.9rem;
  gap: 0.5rem;
  padding: 0.35rem;
}
.altcha-button:focus {
  border-color: var(--altcha-color-primary);
  outline: var(--altcha-checkbox-outline);
  outline-offset: var(--altcha-checkbox-outline-offset);
}
.altcha-button > .altcha-spinner, .altcha-button > svg {
  height: 20px;
  width: 20px;
}
.altcha-button-secondary {
  background: transparent;
  border-color: var(--altcha-color-neutral);
  color: var(--altcha-color-neutral-content);
}
.altcha-input {
  background: var(--altcha-input-background-color);
  border: var(--altcha-input-border-width) solid var(--altcha-color-neutral);
  border-radius: var(--altcha-input-border-radius);
  color: var(--altcha-input-color);
  flex-grow: 1;
  font-size: 1rem;
  min-width: 0;
  padding: 0.25rem;
  width: auto;
}
.altcha-input:focus {
  border-color: var(--altcha-color-primary);
  outline: var(--altcha-checkbox-outline);
  outline-offset: var(--altcha-checkbox-outline-offset);
}
.altcha-spinner {
  animation: altcha-rotate 0.6s linear infinite;
  border-radius: 100%;
  border: var(--altcha-checkbox-border-width) solid var(--altcha-spinner-color);
  border-bottom-color: transparent;
  border-right-color: transparent;
  opacity: 0.7;
}
.altcha-popover {
  background-color: var(--altcha-color-base);
  border: var(--altcha-border-width) solid var(--altcha-border-color);
  border-radius: var(--altcha-border-radius);
  color: var(--altcha-color-base-content);
  filter: var(--altcha-shadow);
  position: absolute;
  left: calc(var(--altcha-padding) / 2);
  max-width: calc(var(--altcha-max-width) - var(--altcha-padding));
  top: calc(var(--altcha-padding) + var(--altcha-checkbox-size) + var(--altcha-popover-arrow-size));
  z-index: var(--altcha-z-index-popover);
}
.altcha-popover-arrow {
  border: var(--altcha-popover-arrow-size) solid transparent;
  border-bottom-color: var(--altcha-popover-color);
  content: "";
  height: 0;
  left: calc(var(--altcha-checkbox-size) / 2);
  position: absolute;
  top: calc(var(--altcha-popover-arrow-size) * -2);
  width: 0;
}
.altcha-popover-content {
  max-height: 100dvh;
  overflow: auto;
  padding: var(--altcha-padding);
}
.altcha-popover[data-top=true][data-display=standard] {
  bottom: calc(100% - (var(--altcha-padding) - var(--altcha-popover-arrow-size)));
  top: auto;
}
.altcha-popover[data-top=true][data-display=standard] .altcha-popover-arrow {
  border-bottom-color: transparent;
  border-top-color: var(--altcha-popover-color);
  bottom: calc(var(--altcha-popover-arrow-size) * -2);
  top: auto;
}
.altcha-popover[data-variant=error] {
  --altcha-popover-color: var(--altcha-color-error);
  background-color: var(--altcha-color-error);
  border-color: var(--altcha-color-error);
  color: var(--altcha-color-error-content);
}
.altcha-popover[data-variant=error] .altcha-popover-content {
  padding: calc(var(--altcha-padding) / 1.5) var(--altcha-padding);
}
.altcha-popover[data-display=overlay] {
  animation: altcha-overlay-slidein 0.5s forwards;
  left: 50%;
  position: fixed;
  top: 45%;
  transform: translate(-50%, -50%);
  width: var(--altcha-max-width);
  z-index: var(--altcha-z-index);
}
.altcha-popover[data-display=bottomsheet] {
  animation: altcha-bottomsheet-slideup 0.5s forwards;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 0;
  bottom: -100%;
  left: 50%;
  position: fixed;
  top: auto;
  transform: translate(-50%, 0);
  width: var(--altcha-max-width);
  z-index: var(--altcha-z-index);
}
.altcha-popover[data-display=bottomsheet] .altcha-popover-content {
  padding-bottom: calc(var(--altcha-padding) * 2);
}
.altcha-popover-backdrop {
  background: var(--altcha-color-base-content);
  bottom: 0;
  left: 0;
  opacity: 0.1;
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity 0.5s;
  z-index: var(--altcha-z-index);
}
.altcha-popover-close {
  color: var(--altcha-color-base-content);
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  height: 1.25rem;
  line-height: 0.95;
  position: absolute;
  right: 0;
  text-align: center;
  text-shadow: 0 0 1px var(--altcha-color-base);
  top: -1.5rem;
  width: 1.25rem;
  z-index: var(--altcha-z-index);
}
[dir=rtl] .altcha-popover {
  left: auto;
  right: calc(var(--altcha-padding) / 2);
}
[dir=rtl] .altcha-popover-arrow {
  left: auto;
  right: calc(var(--altcha-checkbox-size) / 2);
}
[dir=rtl] .altcha-popover-close {
  left: 0;
  right: auto;
}
.altcha-popover[data-display=bottomsheet] .altcha-footer, .altcha-popover[data-display=overlay] .altcha-footer {
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  gap: 0.5rem;
}
.altcha-popover[data-display=bottomsheet] .altcha-footer svg, .altcha-popover[data-display=overlay] .altcha-footer svg {
  height: 18px;
  width: 18px;
  vertical-align: middle;
}
.altcha-code-challenge > form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.altcha-code-challenge-title {
  font-weight: 600;
}
.altcha-code-challenge-text {
  font-size: 0.85rem;
}
.altcha-code-challenge-image {
  background: white;
  border: var(--altcha-input-border-width) solid var(--altcha-color-neutral);
  border-radius: var(--altcha-input-border-radius);
  object-fit: contain;
  height: 50px;
}
.altcha-code-challenge-row {
  display: flex;
  gap: 0.5rem;
}
.altcha-code-challenge-buttons {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: var(--altcha-padding);
  justify-content: space-between;
}
.altcha-code-challenge-buttons button {
  justify-content: center;
  width: 100%;
}
.altcha-checkbox {
  cursor: pointer;
  height: var(--altcha-checkbox-size);
  position: relative;
  width: var(--altcha-checkbox-size);
}
.altcha-checkbox input {
  appearance: none;
  background: var(--altcha-input-background-color);
  border: var(--altcha-checkbox-border-width, 2px) solid var(--altcha-checkbox-border-color);
  border-radius: var(--altcha-checkbox-border-radius);
  cursor: pointer;
  height: var(--altcha-checkbox-size);
  left: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  width: var(--altcha-checkbox-size);
}
@supports (hanging-punctuation: first) and (font: -apple-system-body) and (-webkit-appearance: none) {
  .altcha-checkbox input {
    /* Safari-only: fixes focus outline */
  }
  .altcha-checkbox input:focus {
    outline-width: 2px;
    outline-style: solid;
  }
}
.altcha-checkbox input:before {
  border-radius: var(--altcha-checkbox-border-radius);
  content: "";
  width: 100%;
  height: 100%;
  background: var(--altcha-color-neutral);
  display: block;
  transform: scale(0);
}
.altcha-checkbox input:checked {
  background-color: var(--altcha-color-success);
  border-color: var(--altcha-color-success);
}
.altcha-checkbox input:checked::before {
  background-color: var(--altcha-color-success);
  opacity: 0;
  transform: scale(2.2);
  transition: all var(--altcha-checkbox-transition-duration) ease;
  transition-delay: 0.1s;
}
.altcha-checkbox svg {
  --altcha-radio-svg-size: calc(var(--altcha-checkbox-size) * 0.5);
  --altcha-radio-svg-offset: calc(var(--altcha-checkbox-size) * 0.25);
  fill: none;
  left: var(--altcha-radio-svg-offset);
  height: var(--altcha-radio-svg-size);
  opacity: 0;
  position: absolute;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  top: var(--altcha-radio-svg-offset);
  transform: translate3d(0, 0, 0);
  width: var(--altcha-radio-svg-size);
}
.altcha-checkbox input:checked + svg {
  color: var(--altcha-color-success-content);
  opacity: 1;
  stroke-dashoffset: 0;
  transition: all var(--altcha-checkbox-transition-duration) ease;
  transition-delay: 0.1s;
}
.altcha-checkbox-spinner {
  display: none;
  left: 0;
  height: var(--altcha-checkbox-size);
  position: absolute;
  top: 0;
  width: var(--altcha-checkbox-size);
}
.altcha-checkbox[data-loading=true] input {
  appearance: none;
  opacity: 0;
  pointer-events: none;
}
.altcha-checkbox[data-loading=true] .altcha-checkbox-spinner {
  display: block;
}
.altcha-checkbox-native {
  height: var(--altcha-checkbox-size);
  position: relative;
  width: var(--altcha-checkbox-size);
}
.altcha-checkbox-native input {
  height: var(--altcha-checkbox-size);
  margin: 0;
  width: var(--altcha-checkbox-size);
}
.altcha-checkbox-native-spinner {
  display: none;
  left: 0;
  height: var(--altcha-checkbox-size);
  position: absolute;
  top: 0;
  width: var(--altcha-checkbox-size);
}
.altcha-checkbox-native[data-loading=true] input {
  appearance: none;
  opacity: 0;
  pointer-events: none;
}
.altcha-checkbox-native[data-loading=true] .altcha-checkbox-native-spinner {
  display: block;
}
.altcha-switch {
  align-items: center;
  border-radius: var(--altcha-switch-border-radius);
  background-color: var(--altcha-switch-background-color);
  display: flex;
  height: var(--altcha-switch-height);
  padding: var(--altcha-switch-padding);
  position: relative;
  width: var(--altcha-switch-width);
}
.altcha-switch:focus-within {
  outline: var(--altcha-checkbox-outline);
  outline-offset: var(--altcha-checkbox-outline-offset);
}
.altcha-switch input {
  appearance: none;
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.altcha-switch-toggle {
  align-items: center;
  background-color: var(--altcha-switch-toggle-color);
  border-radius: var(--altcha-switch-toggle-border-radius);
  cursor: pointer;
  display: flex;
  height: var(--altcha-switch-toggle-size);
  justify-content: center;
  left: var(--altcha-switch-padding);
  position: absolute;
  transition: width 150ms ease-out, left 150ms ease-out;
  width: var(--altcha-switch-toggle-size);
}
.altcha-switch-spinner {
  display: none;
  height: var(--altcha-switch-toggle-size);
  width: var(--altcha-switch-toggle-size);
}
.altcha-switch[data-loading=true] {
  pointer-events: none;
}
.altcha-switch[data-loading=true] .altcha-switch-spinner {
  display: block;
}
.altcha-switch[data-loading=true] .altcha-switch-toggle {
  background-color: transparent;
  left: calc(50% - var(--altcha-switch-toggle-size) / 2);
}
[data-state=verified] .altcha-switch {
  --altcha-switch-background-color: var(--altcha-color-success);
}
[data-state=verified] .altcha-switch-toggle {
  background-color: var(--altcha-color-success-content);
  left: calc(100% - var(--altcha-switch-height) + var(--altcha-switch-padding));
}
[dir=rtl] .altcha-switch-toggle {
  left: calc(100% - var(--altcha-switch-height) + var(--altcha-switch-padding));
}
[dir=rtl][data-state=verified] .altcha-switch-toggle {
  left: var(--altcha-switch-padding);
}
.altcha-floating-arrow {
  border: 6px solid transparent;
  border-bottom-color: var(--altcha-border-color);
  content: "";
  height: 0;
  left: 12px;
  position: absolute;
  top: -12px;
  width: 0;
}
.altcha-overlay-backdrop {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: opacity var(--altcha-transition-duration);
  z-index: var(--altcha-z-index);
}
.altcha-overlay-close {
  display: inline-block;
  color: currentColor;
  cursor: pointer;
  font-size: 1rem;
  height: 1rem;
  line-height: 0.85;
  position: absolute;
  right: 0;
  text-align: center;
  text-shadow: 0 0 1px var(--altcha-color-base);
  top: -1.5rem;
  width: 1rem;
  z-index: var(--altcha-z-index);
}
.altcha[data-display=overlay] {
  animation: altcha-overlay-slidein var(--altcha-transition-duration) forwards;
  filter: var(--altcha-shadow);
  left: 50%;
  opacity: 0;
  position: fixed;
  top: 45%;
  transform: translate(-50%, -50%);
  z-index: var(--altcha-z-index);
}
.altcha[data-display=overlay] .altcha-main {
  width: var(--altcha-max-width);
}
.altcha[data-display=floating] {
  display: none;
  filter: var(--altcha-shadow);
  left: var(--altcha-floating-left, -100%);
  position: fixed;
  top: var(--altcha-floating-top, -100%);
  z-index: var(--altcha-z-index);
}
.altcha[data-display=floating] .altcha-main {
  width: var(--altcha-max-width);
}
.altcha[data-display=floating][data-floating-position=top] .altcha-floating-arrow {
  border-bottom-color: transparent;
  border-top-color: var(--altcha-border-color);
  bottom: -12px;
  top: auto;
}
.altcha[data-display=floating][data-visible] {
  display: flex;
}
.altcha[data-display=bar] {
  bottom: -100%;
  filter: var(--altcha-shadow);
  left: 0;
  position: fixed;
  right: 0;
  transition: bottom var(--altcha-transition-duration), top var(--altcha-transition-duration);
  z-index: var(--altcha-z-index);
}
.altcha[data-display=bar] .altcha-main {
  align-items: center;
  border-radius: 0;
  border-width: var(--altcha-border-width) 0 0 0;
  flex-direction: row;
  max-width: 100% !important;
}
.altcha[data-display=bar] .altcha-main > * {
  width: auto;
}
.altcha[data-display=bar][data-placement=top] {
  bottom: auto;
  top: -100%;
}
.altcha[data-display=bar][data-placement=top] .altcha-main {
  border-width: 0 0 var(--altcha-border-width) 0;
}
.altcha[data-display=bar][data-placement=bottom]:not([data-state=unverified]) {
  bottom: 0;
}
.altcha[data-display=bar][data-placement=top]:not([data-state=unverified]) {
  top: 0;
}
.altcha[data-display=invisible] {
  display: none;
}

@keyframes altcha-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes altcha-bottomsheet-slideup {
  100% {
    bottom: 0;
  }
}
@keyframes altcha-overlay-slidein {
  100% {
    opacity: 1;
    top: 50%;
  }
}`),$altcha.algorithms.set(`SHA-256`,()=>new so),$altcha.algorithms.set(`SHA-384`,()=>new so),$altcha.algorithms.set(`SHA-512`,()=>new so),$altcha.algorithms.set(`PBKDF2/SHA-256`,()=>new io),$altcha.algorithms.set(`PBKDF2/SHA-384`,()=>new io),$altcha.algorithms.set(`PBKDF2/SHA-512`,()=>new io);var co=()=>{};function lo(e,t){return e==e?e!==t||typeof e==`object`&&!!e||typeof e==`function`:t==t}function uo(e,t,n){if(e==null)return t(void 0),co;let r=go(()=>e.subscribe(t,n));return r.unsubscribe?()=>r.unsubscribe():r}var fo=[];function po(e,t=co){let n=null,r=new Set;function i(t){if(lo(e,t)&&(e=t,n)){let t=!fo.length;for(let t of r)t[1](),fo.push(t,e);if(t){for(let e=0;e<fo.length;e+=2)fo[e][0](fo[e+1]);fo.length=0}}}function a(t){i(t(e))}function o(o,s=co){let c=[o,s];return r.add(c),r.size===1&&(n=t(i,a)||co),o(e),()=>{r.delete(c),r.size===0&&n&&(n(),n=null)}}return{set:i,update:a,subscribe:o}}function mo(e){let t;return uo(e,e=>t=e)(),t}var ho=!1;function go(e){var t=ho;try{return ho=!0,e()}finally{ho=t}}function _o(e){let t={get:e=>mo(t.store)[e],set:(e,n)=>{typeof e==`string`?Object.assign(mo(t.store),{[e]:n}):Object.assign(mo(t.store),e),t.store.set(mo(t.store))},store:po(e)};return t}globalThis.$altcha=globalThis.$altcha||{algorithms:new Map,defaults:_o({}),i18n:_o({}),instances:new Set,plugins:new Set},globalThis.$altcha.i18n.set(`zh-cn`,{ariaLinkLabel:`Altcha (官方网站)`,enterCode:`输入代码`,enterCodeAria:`输入您听到的代码。按空格键播放音频。`,error:`验证失败。稍后再试。`,expired:`验证已过期。请重试。`,footer:`由 <a href="https://altcha.org/" tabindex="-1" target="_blank" aria-label="Altcha (官方网站)">ALTCHA</a> 保护`,getAudioChallenge:`获取音频挑战`,label:`我不是机器人`,loading:`加载中...`,reload:`重新加载`,verify:`验证`,verificationRequired:`需要验证！`,verified:`已验证`,verifying:`正在验证...`,waitAlert:`正在验证... 请稍等。`,cancel:`取消`,enterCodeFromImage:`为继续操作，请输入下图中显示的验证码。`});var vo=e(t(),1),yo=(0,vo.forwardRef)(({action:e,onPayloadChange:t,className:n,...r},i)=>{let o=(0,vo.useRef)(null),c=(0,vo.useMemo)(()=>a(`/api/captcha/challenge?action=${encodeURIComponent(e)}`),[e]);return(0,vo.useImperativeHandle)(i,()=>({reset:()=>{o.current?.reset(),t(null)}}),[t]),(0,vo.useEffect)(()=>{let e=o.current;if(!e)return;let n=e=>{let{payload:n,state:r}=e.detail;t(r===`verified`&&n?n:null)};return e.addEventListener(`statechange`,n),()=>{e.removeEventListener(`statechange`,n)}},[t]),(0,s.jsx)(`div`,{className:n,...r,children:(0,s.jsx)(`altcha-widget`,{ref:o,auto:`off`,challenge:c,language:`zh-cn`,style:{"--altcha-max-width":`100%`}})})});yo.displayName=`AltchaCaptcha`;function bo({title:e,lead:t,subtitle:r,backHref:a,footer:o,children:c}){let l=n(`auth-layout`)?.announcement?.trim()||null;return(0,s.jsxs)(`div`,{className:`bg-paper relative min-h-screen overflow-hidden`,children:[(0,s.jsx)(`div`,{"aria-hidden":`true`,className:`pointer-events-none absolute inset-0 opacity-20`,style:{backgroundImage:`url('/assets/light-grey-floral-motif.webp')`,backgroundPosition:`center top`,backgroundRepeat:`repeat`,backgroundSize:`420px`}}),(0,s.jsx)(`div`,{className:`app-safe-area-page relative mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-center`,children:(0,s.jsxs)(`div`,{className:`mx-auto w-full max-w-xl`,children:[l?(0,s.jsxs)(`div`,{className:`border-ink/15 bg-bgpaper/88 mb-4 flex items-center gap-3 overflow-hidden border border-dashed px-3 py-2 shadow-[0_8px_20px_rgba(44,24,16,0.05)]`,children:[(0,s.jsx)(`span`,{className:`text-ink-secondary shrink-0 tracking-[0.22em]`,children:`公告`}),(0,s.jsx)(`div`,{className:`auth-announcement-marquee min-w-0 flex-1`,children:(0,s.jsxs)(`div`,{className:`auth-announcement-track`,children:[(0,s.jsxs)(`span`,{className:`auth-announcement-segment`,children:[(0,s.jsx)(`span`,{className:`auth-announcement-copy`,children:l}),(0,s.jsx)(`span`,{"aria-hidden":`true`,className:`text-ink-secondary/70 px-4`,children:`·`})]}),(0,s.jsxs)(`span`,{"aria-hidden":`true`,className:`auth-announcement-segment`,children:[(0,s.jsx)(`span`,{className:`auth-announcement-copy`,children:l}),(0,s.jsx)(`span`,{className:`text-ink-secondary/70 px-4`,children:`·`})]})]})})]}):null,(0,s.jsxs)(`header`,{className:`mb-4 text-center`,children:[(0,s.jsx)(`p`,{className:`text-ink-secondary/80 mb-3 text-[0.72rem] tracking-[0.38em] sm:mb-4`,children:`WANJIE DAOYOU`}),(0,s.jsx)(`div`,{className:`border-ink/12 bg-paper/90 mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border border-dashed shadow-[0_12px_36px_rgba(44,24,16,0.08)] sm:mb-5 sm:h-32 sm:w-32`,children:(0,s.jsx)(`img`,{src:`/assets/daoyou_logo.webp`,alt:`万界道友 Logo`,className:`h-20 w-20 object-contain opacity-95 sm:h-24 sm:w-24`})}),(0,s.jsx)(`h1`,{className:`font-heading text-ink text-[3.15rem] leading-none sm:text-[4.4rem]`,children:`万界道友`}),(0,s.jsx)(`p`,{className:`text-crimson mt-3 text-sm tracking-[0.28em] sm:mt-4 sm:text-[0.95rem]`,children:`一入万界，修行不止。`}),(0,s.jsx)(`p`,{className:`text-ink-secondary mx-auto mt-4 max-w-md text-sm leading-7 sm:text-base`,children:`在纸墨之间落下道号，自此入界修行、历练、炼造与论道。`})]}),(0,s.jsx)(`section`,{className:`border-ink/18 bg-bgpaper/92 relative overflow-hidden border border-dashed px-5 py-5 shadow-lg sm:px-7 sm:py-6`,children:(0,s.jsxs)(`div`,{className:`relative`,children:[a?(0,s.jsx)(i,{href:a,className:`text-ink-secondary hover:text-crimson mb-4 inline-flex items-center text-sm no-underline transition-colors`,children:`[← 返回]`}):null,(0,s.jsxs)(`div`,{className:`text-center sm:text-left`,children:[(0,s.jsx)(`h2`,{className:`text-ink text-[1.7rem] leading-tight font-semibold sm:text-[1.9rem]`,children:e}),r?(0,s.jsx)(`p`,{className:`text-ink-secondary mt-2 text-sm leading-6`,children:r}):null,(0,s.jsx)(`p`,{className:`text-ink mt-3 text-base leading-7`,children:t})]}),(0,s.jsx)(`div`,{className:`mt-5 space-y-4`,children:c})]})}),o?(0,s.jsx)(`div`,{className:`mt-5 text-center text-sm leading-7`,children:o}):null]})})]})}function xo(){let{openDialog:e}=o(),t=({title:t,message:n,confirmLabel:r=`知道了`,cancelLabel:i=null,onConfirm:a,onCancel:o})=>e({title:t,content:(0,s.jsx)(`p`,{className:`leading-7`,children:n}),confirmLabel:r,cancelLabel:i,onConfirm:a,onCancel:o});return{showDialog:t,showErrorDialog:(e,n=`未能完成`)=>t({title:n,message:e})}}function So(e,t){if(!e.trim())return t}function Co(e,t){if(!t.trim())return`请再次输入密码`;if(e!==t)return`两次输入的密码不一致`}function wo(e,t){return e?.message?e.status===429||e.code===`TOO_MANY_ATTEMPTS`?`请求过于频繁，请一个时辰后再试`:e.code===`EMAIL_NOT_VERIFIED`?`邮箱尚未验证，新的验证邮件已发送，请前往邮箱完成验证。`:e.message:t}export{bo as a,xo as i,Co as n,So as r,wo as t};