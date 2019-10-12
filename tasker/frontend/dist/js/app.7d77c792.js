(function(e){function t(t){for(var n,o,i=t[0],c=t[1],u=t[2],p=0,v=[];p<i.length;p++)o=i[p],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&v.push(a[o][0]),a[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(v.length)v.shift()();return s.push.apply(s,u||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,i=1;i<r.length;i++){var c=r[i];0!==a[c]&&(n=!1)}n&&(s.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},a={app:0},s=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=c;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var n=r("64a9"),a=r.n(n);a.a},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view")],1)},s=[],o={name:"app"},i=o,c=(r("034f"),r("2877")),u=Object(c["a"])(i,a,s,!1,null,null,null),l=u.exports,p=r("8c4f"),v=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("div",{staticClass:"nav"},[r("button",{staticClass:"waves-effect waves-default btn",on:{click:e.goHome}},[e._v("Home")]),r("button",{staticClass:"waves-effect waves-light btn",on:{click:e.goAbout}},[e._v("About")]),r("button",{staticClass:"waves-effect waves-light btn",on:{click:e.goLogin}},[e._v("Login")]),r("button",{staticClass:"waves-effect waves-light btn",on:{click:e.goRegister}},[e._v("Register")])]),r("h1",[e._v("All servers")]),r("div",{staticClass:"create-server"},[r("label",{attrs:{for:"create-server"}},[e._v("Say Something...")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.text,expression:"text"}],attrs:{type:"text",id:"create-server","text-darken-2":"",placeholder:"Add a server"},domProps:{value:e.text},on:{input:function(t){t.target.composing||(e.text=t.target.value)}}}),r("button",{staticClass:"waves-effect waves-light btn",on:{click:e.createServer}},[e._v("Add")])]),r("hr"),e.error?r("p",{staticClass:"error"},[e._v(e._s(e.error))]):e._e(),r("div",{staticClass:"servers-container"},e._l(e.servers,(function(t,n){return r("div",{key:t._id,staticClass:"server",attrs:{item:t,index:n},on:{dblclick:function(r){return e.deleteServer(t._id)}}},[e._v("\n    "+e._s(t.createdAt.getDate()+"/"+t.createdAt.getMonth()+"/"+t.createdAt.getYear())+"\n    "),r("p",{staticClass:"text white-text"},[e._v(e._s(t.text))])])})),0)])},f=[],d=(r("96cf"),r("3b8d")),m=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),h=r("d225"),g=r("b0b4"),b=r("bc3a"),w=r.n(b);function _(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?_(r,!0).forEach((function(t){Object(m["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var x="api/servers/",O=function(){function e(){Object(h["a"])(this,e)}return Object(g["a"])(e,null,[{key:"getServers",value:function(){return new Promise(function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(t,r){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.a.get(x);case 3:n=e.sent,a=n.data,t(a.map((function(e){return y({},e,{createdAt:new Date(e.createdAt)})}))),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),r(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,r){return e.apply(this,arguments)}}())}},{key:"insertServer",value:function(e){return w.a.post(x,{text:e})}},{key:"deleteServer",value:function(e){return w.a.delete("".concat(x).concat(e))}}]),e}(),j=O,k={name:"ServerComponent",data:function(){return{servers:[],error:"",text:""}},created:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.getServers();case 3:this.servers=e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),this.error=e.t0.message;case 9:case"end":return e.stop()}}),e,this,[[0,6]])})));function t(){return e.apply(this,arguments)}return t}(),methods:{createServer:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,j.insertServer(this.text);case 2:return e.next=4,j.getServers();case 4:this.servers=e.sent;case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),deleteServer:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,j.deleteServer(t);case 2:return e.next=4,j.getServers();case 4:this.servers=e.sent;case 5:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),goHome:function(){this.$router.push("/")},goAbout:function(){this.$router.push("/about")},goLogin:function(){this.$router.push("/login")},goRegister:function(){this.$router.push("/register")}}},S=k,P=(r("f7bb"),Object(c["a"])(S,v,f,!1,null,"1978d87a",null)),C=P.exports,R=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h1",[e._v("About")])},A=[],$={},E=Object(c["a"])($,R,A,!1,null,null,null),D=E.exports,L=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("form",{staticClass:"login",on:{submit:function(t){return t.preventDefault(),e.login(t)}}},[r("h1",[e._v("Sign in")]),r("label",[e._v("Username")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{required:"",type:"text",placeholder:"Username"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),r("br"),r("label",[e._v("Password")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{required:"",type:"password",placeholder:"Password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),r("hr"),r("button",{attrs:{type:"submit"}},[e._v("Login")])])])},H=[],M={name:"Login",methods:{login:function(){}}},N=M,T=Object(c["a"])(N,L,H,!1,null,"2639fc1e",null),J=T.exports,U=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h1",[e._v("Register")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{type:"email",name:"email",placeholder:"email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),r("br"),r("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",name:"password",placeholder:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),r("br"),r("button",{on:{click:e.register}},[e._v("Register")])])},q=[],z="api/user/",G=function(){function e(){Object(h["a"])(this,e)}return Object(g["a"])(e,null,[{key:"register",value:function(e){return w.a.post("".concat(z,"register"),e)}}]),e}(),Y=G,B={data:function(){return{email:"",password:""}},methods:{register:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Y.register({email:this.email,password:this.password});case 2:e.sent;case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}},F=B,I=Object(c["a"])(F,U,q,!1,null,"95b31a78",null),K=I.exports,Q=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e._m(0),r("div",{staticClass:"row"},[e._m(1),r("div",{staticClass:"col s5"},[r("h2",[e._v("Run tasks!!!. Smartly.")]),r("h4",[e._v("Join Tasker to run your tasks today!")]),r("button",{on:{click:e.goAbout}},[e._v("Go to about beecause why not")]),r("button",{staticClass:"btn waves-effect waves-light blue"},[e._v("Sign up!")])])])])},V=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("nav",{staticClass:"nav-wrapper white z-depth-0"},[r("form",{attrs:{action:""}},[r("ul",{staticClass:"right"},[r("li",[r("input",{attrs:{type:"text",placeholder:"Username"}})]),r("li",[r("input",{attrs:{type:"password",placeholder:"Password"}})]),r("li",[r("a",{staticClass:"btn waves-effect waves-light blue"},[e._v("\n                    Log in\n                ")])])])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col s7"},[n("img",{staticClass:"responsive-img",attrs:{src:r("adcc"),alt:""}})])}],W={name:"HomeComponent",methods:{goAbout:function(){this.$router.push("/about")}}},X=W,Z=Object(c["a"])(X,Q,V,!1,null,"74551967",null),ee=Z.exports;n["a"].config.productionTip=!1,n["a"].use(p["a"]);var te=[{path:"/",name:"Home",component:ee},{path:"/about",name:"About",component:D},{path:"/login",name:"Login",component:J},{path:"/register",name:"Register",component:K},{path:"/servers",name:"Server",component:C}],re=new p["a"]({routes:te,mode:"history"});new n["a"]({render:function(e){return e(l)},router:re}).$mount("#app")},"64a9":function(e,t,r){},adcc:function(e,t,r){e.exports=r.p+"img/undraw_through_the_window_51ew.dddc4660.svg"},b1a9:function(e,t,r){},f7bb:function(e,t,r){"use strict";var n=r("b1a9"),a=r.n(n);a.a}});
//# sourceMappingURL=app.7d77c792.js.map