(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72b085c6"],{"17cd":function(t,n,e){},"25f0":function(t,n,e){"use strict";var r=e("6eeb"),a=e("825a"),i=e("d039"),o=e("ad6d"),c="toString",s=RegExp.prototype,u=s[c],l=i((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),d=u.name!=c;(l||d)&&r(RegExp.prototype,c,(function(){var t=a(this),n=String(t.source),e=t.flags,r=String(void 0===e&&t instanceof RegExp&&!("flags"in s)?o.call(t):e);return"/"+n+"/"+r}),{unsafe:!0})},2909:function(t,n,e){"use strict";function r(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}e("a4d3"),e("e01a"),e("d28b"),e("a630"),e("e260"),e("d3b7"),e("25f0"),e("3ca3"),e("ddb0");function a(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function o(t){return r(t)||a(t)||i()}e.d(n,"a",(function(){return o}))},"4df4":function(t,n,e){"use strict";var r=e("f8c2"),a=e("7b0b"),i=e("9bdd"),o=e("e95a"),c=e("50c4"),s=e("8418"),u=e("35a1");t.exports=function(t){var n,e,l,d,h,f=a(t),p="function"==typeof this?this:Array,v=arguments.length,m=v>1?arguments[1]:void 0,b=void 0!==m,g=0,C=u(f);if(b&&(m=r(m,v>2?arguments[2]:void 0,2)),void 0==C||p==Array&&o(C))for(n=c(f.length),e=new p(n);n>g;g++)s(e,g,b?m(f[g],g):f[g]);else for(d=C.call(f),h=d.next,e=new p;!(l=h.call(d)).done;g++)s(e,g,b?i(d,m,[l.value,g],!0):l.value);return e.length=g,e}},"5ab7":function(t,n,e){"use strict";e.d(n,"e",(function(){return a})),e.d(n,"f",(function(){return i})),e.d(n,"a",(function(){return o})),e.d(n,"c",(function(){return c})),e.d(n,"b",(function(){return s})),e.d(n,"d",(function(){return u})),e.d(n,"h",(function(){return l})),e.d(n,"g",(function(){return d})),e.d(n,"i",(function(){return h}));var r=e("b775"),a=function(t){return Object(r["a"])({method:"GET",url:"/app/v1_1/articles",params:t})},i=function(t){return Object(r["a"])({method:"GET",url:"/app/v1_0/articles/".concat(t)})},o=function(t){return Object(r["a"])({method:"POST",url:"/app/v1_0/article/collections",data:{target:t}})},c=function(t){return Object(r["a"])({method:"DELETE",url:"/app/v1_0/article/collections/".concat(t)})},s=function(t){return Object(r["a"])({method:"POST",url:"/app/v1_0/article/likings",data:{target:t}})},u=function(t){return Object(r["a"])({method:"DELETE",url:"/app/v1_0/article/likings/".concat(t)})},l=function(t){return Object(r["a"])({method:"GET",url:"/app/v1_0/user/articles",params:t})},d=function(t){return Object(r["a"])({method:"GET",url:"/app/v1_0/article/collections",params:t})},h=function(t){return Object(r["a"])({method:"GET",url:"/app/v1_0/user/histories",params:t})}},"7abe":function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"home-container"},[e("div",{staticClass:"nav-bar"},[e("div",{staticClass:"logo"}),e("van-button",{staticClass:"search-btn",attrs:{round:"",type:"info",size:"small",icon:"search"},on:{click:function(n){return t.$router.push("/search")}}},[t._v("搜索")])],1),e("van-tabs",{model:{value:t.active,callback:function(n){t.active=n},expression:"active"}},[e("van-icon",{staticClass:"wap-nav",attrs:{slot:"nav-right",name:"wap-nav"},on:{click:function(n){t.isChannelEditShow=!0}},slot:"nav-right"}),t._l(t.userChannels,(function(t){return e("van-tab",{key:t.id,attrs:{title:t.name}},[e("article-list",{attrs:{channel:t}})],1)}))],2),e("van-popup",{style:{height:"85%"},attrs:{position:"bottom",closeable:"","close-icon-position":"top-left"},model:{value:t.isChannelEditShow,callback:function(n){t.isChannelEditShow=n},expression:"isChannelEditShow"}},[e("channel-edit",{attrs:{"user-channels":t.userChannels},on:{close:function(n){t.isChannelEditShow=!1}},model:{value:t.active,callback:function(n){t.active=n},expression:"active"}})],1)],1)},a=[],i=(e("96cf"),e("1da1")),o=e("89dd"),c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(n){t.isLoading=n},expression:"isLoading"}},[e("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(n){t.loading=n},expression:"loading"}},t._l(t.list,(function(n,r){return e("van-cell",{key:r,attrs:{title:n.title},on:{click:function(e){return t.$router.push("/article/"+n.art_id)}}})})),1)],1)},s=[],u=e("2909"),l=e("5ab7"),d={name:"ArticleList",components:{},props:{channel:{type:Object,required:!0}},data:function(){return{list:[],loading:!1,finished:!1,timestamp:null,isLoading:!1}},computed:{},watch:{},created:function(){},mounted:function(){},methods:{onLoad:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var n,e,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["e"])({channel_id:this.channel.id,timestamp:this.timestamp||Date.now(),with_top:1});case 2:e=t.sent,r=e.data,a=r.data.results,(n=this.list).push.apply(n,Object(u["a"])(a)),this.loading=!1,a.length?this.timestamp=r.data.pre_timestamp:this.finished=!0;case 8:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}(),onRefresh:function(){var t=this;setTimeout((function(){t.$toast("刷新成功"),t.isLoading=!1}),500)}}},h=d,f=e("2877"),p=Object(f["a"])(h,c,s,!1,null,null,null),v=p.exports,m=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"channel-edit"},[e("van-cell",{attrs:{title:"我的频道",border:!1}},[e("van-button",{attrs:{size:"mini",round:"",type:"danger",plain:""},on:{click:t.editOrOver}},[t._v(t._s(t.isEditShow?"完成":"编辑"))])],1),e("van-grid",{attrs:{gutter:10}},t._l(t.userChannels,(function(n,r){return e("van-grid-item",{key:n.id,attrs:{text:n.name},on:{click:function(n){return t.onUserChannelClick(r)}}},[e("van-icon",{directives:[{name:"show",rawName:"v-show",value:t.isEditShow&&0!==r,expression:"isEditShow && index!==0"}],attrs:{slot:"icon",name:"close"},on:{click:function(n){return t.onUserChannelClick(r)}},slot:"icon"})],1)})),1),e("van-cell",{attrs:{title:"推荐频道",border:!1}}),e("van-grid",{attrs:{gutter:10}},t._l(t.remainingChangels,(function(n){return e("van-grid-item",{key:n.id,attrs:{text:n.name},on:{click:function(e){return t.onChannelAdd(n)}}})})),1)],1)},b=[],g=(e("7db0"),e("a434"),e("159b"),e("b775")),C=function(){return Object(g["a"])({url:"/app/v1_0/channels",method:"GET"})},w=e("5d2d"),O={watch:{userChannels:function(){Object(w["b"])("user-channels",this.userChannels)}},name:"ChannelEdit",components:{},props:{userChannels:{type:Array,required:!0}},data:function(){return{allChannels:[],isEditShow:!1}},computed:{remainingChangels:function(){var t=this.allChannels,n=this.userChannels,e=[];return t.forEach((function(t){n.find((function(n){return n.id===t.id}))||e.push(t)})),e}},created:function(){this.loadAllChannels()},mounted:function(){},methods:{onUserChannelClick:function(t){this.isEditShow&&0!==t?this.userChannels.splice(t,1):(this.$emit("input",t),this.$emit("close"))},editOrOver:function(){this.isEditShow=!this.isEditShow},loadAllChannels:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var n,e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,C();case 2:n=t.sent,e=n.data,this.allChannels=e.data.channels;case 5:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}(),onChannelAdd:function(t){this.userChannels.push(t)}}},E=O,_=(e("f43e"),Object(f["a"])(E,m,b,!1,null,"25639456",null)),j=_.exports,y={name:"HomePage",components:{ArticleList:v,ChannelEdit:j},props:{},data:function(){return{active:0,value:"",userChannels:[],isChannelEditShow:!1}},computed:{},watch:{},created:function(){this.loadUserChannels()},mounted:function(){},methods:{loadUserChannels:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var n,e,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=[],e=Object(w["a"])("user-channels"),!e){t.next=6;break}n=e,t.next=11;break;case 6:return t.next=8,Object(o["d"])();case 8:r=t.sent,a=r.data,n=a.data.channels;case 11:this.userChannels=n;case 12:case"end":return t.stop()}}),t,this)})));function n(){return t.apply(this,arguments)}return n}()}},k=y,x=(e("a13e"),Object(f["a"])(k,r,a,!1,null,"d734fe92",null));n["default"]=x.exports},"7db0":function(t,n,e){"use strict";var r=e("23e7"),a=e("b727").find,i=e("44d2"),o="find",c=!0;o in[]&&Array(1)[o]((function(){c=!1})),r({target:"Array",proto:!0,forced:c},{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),i(o)},"88b7":function(t,n,e){},"89dd":function(t,n,e){"use strict";e.d(n,"g",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"e",(function(){return o})),e.d(n,"d",(function(){return c})),e.d(n,"a",(function(){return s})),e.d(n,"f",(function(){return u})),e.d(n,"h",(function(){return l})),e.d(n,"i",(function(){return d}));var r=e("b775"),a=function(t){return Object(r["a"])({method:"POST",url:"/app/v1_0/authorizations",data:t})},i=function(t){return Object(r["a"])({method:"GET",url:"/app/v1_0/sms/codes/".concat(t)})},o=function(){return Object(r["a"])({method:"GET",url:"/app/v1_0/user"})},c=function(){return Object(r["a"])({method:"GET",url:"/app/v1_0/user/channels"})},s=function(t){return Object(r["a"])({method:"POST",url:"/app/v1_0/user/followings",data:{target:t}})},u=function(){return Object(r["a"])({method:"GET",url:"/app/v1_0/user/profile"})},l=function(t){return Object(r["a"])({method:"PATCH",url:"/app/v1_0/user/photo",data:t})},d=function(t){return Object(r["a"])({method:"PATCH",url:"/app/v1_0/user/profile",data:t})}},a13e:function(t,n,e){"use strict";var r=e("88b7"),a=e.n(r);a.a},a630:function(t,n,e){var r=e("23e7"),a=e("4df4"),i=e("1c7e"),o=!i((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:o},{from:a})},ad6d:function(t,n,e){"use strict";var r=e("825a");t.exports=function(){var t=r(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.dotAll&&(n+="s"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}},f43e:function(t,n,e){"use strict";var r=e("17cd"),a=e.n(r);a.a}}]);
//# sourceMappingURL=chunk-72b085c6.e1749f93.js.map