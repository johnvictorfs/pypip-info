(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ccb7ddb0"],{"2a7f":function(t,e,i){"use strict";i.d(e,"a",(function(){return l}));var o=i("71d9"),r=i("80d2"),l=Object(r["g"])("v-toolbar__title"),c=Object(r["g"])("v-toolbar__items");o["a"]},"8b0d":function(t,e,i){},d000:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[i("v-toolbar-title",{staticClass:"title app-title"},[i("v-icon",{attrs:{left:""}},[t._v("mdi-information")]),t._v(" PyPip Info ")],1)],1)},r=[],l={name:"NavBar"},c=l,n=(i("ecfd"),i("2877")),s=i("6544"),a=i.n(s),h=(i("a9e3"),i("b680"),i("c7cd"),i("5530")),p=(i("8b0d"),i("71d9"));function d(t,e){var i=e.value,o=e.options||{passive:!0},r=e.arg?document.querySelector(e.arg):window;r&&(r.addEventListener("scroll",i,o),t._onScroll={callback:i,options:o,target:r})}function u(t){if(t._onScroll){var e=t._onScroll,i=e.callback,o=e.options,r=e.target;r.removeEventListener("scroll",i,o),delete t._onScroll}}var f={inserted:d,unbind:u},m=f,v=i("fe6c"),S=i("58df");function g(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(S["a"])(Object(v["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty:function(){return t}},watch:{app:function(t,e){e?this.removeApplication(!0):this.callUpdate()},applicationProperty:function(t,e){this.$vuetify.application.unregister(this._uid,e)}},activated:function(){this.callUpdate()},created:function(){for(var t=0,i=e.length;t<i;t++)this.$watch(e[t],this.callUpdate);this.callUpdate()},mounted:function(){this.callUpdate()},deactivated:function(){this.removeApplication()},destroyed:function(){this.removeApplication()},methods:{callUpdate:function(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:function(){return 0}}})}var b=i("d9bd"),O=i("2b0e"),T=O["a"].extend({name:"scrollable",directives:{Scroll:f},props:{scrollTarget:String,scrollThreshold:[String,Number]},data:function(){return{currentScroll:0,currentThreshold:0,isActive:!1,isScrollingUp:!1,previousScroll:0,savedScroll:0,target:null}},computed:{canScroll:function(){return"undefined"!==typeof window},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):300}},watch:{isScrollingUp:function(){this.savedScroll=this.savedScroll||this.currentScroll},isActive:function(){this.savedScroll=0}},mounted:function(){this.scrollTarget&&(this.target=document.querySelector(this.scrollTarget),this.target||Object(b["c"])("Unable to locate element with identifier ".concat(this.scrollTarget),this))},methods:{onScroll:function(){var t=this;this.canScroll&&(this.previousScroll=this.currentScroll,this.currentScroll=this.target?this.target.scrollTop:window.pageYOffset,this.isScrollingUp=this.currentScroll<this.previousScroll,this.currentThreshold=Math.abs(this.currentScroll-this.computedScrollThreshold),this.$nextTick((function(){Math.abs(t.currentScroll-t.savedScroll)>t.computedScrollThreshold&&t.thresholdMet()})))},thresholdMet:function(){}}}),y=i("d10f"),w=i("f2e7"),x=i("80d2"),A=Object(S["a"])(p["a"],T,y["a"],w["a"],g("top",["clippedLeft","clippedRight","computedHeight","invertedScroll","isExtended","isProminent","value"])),B=A.extend({name:"v-app-bar",directives:{Scroll:m},props:{clippedLeft:Boolean,clippedRight:Boolean,collapseOnScroll:Boolean,elevateOnScroll:Boolean,fadeImgOnScroll:Boolean,hideOnScroll:Boolean,invertedScroll:Boolean,scrollOffScreen:Boolean,shrinkOnScroll:Boolean,value:{type:Boolean,default:!0}},data:function(){return{isActive:this.value}},computed:{applicationProperty:function(){return this.bottom?"bottom":"top"},canScroll:function(){return T.options.computed.canScroll.call(this)&&(this.invertedScroll||this.elevateOnScroll||this.hideOnScroll||this.collapseOnScroll||this.isBooted||!this.value)},classes:function(){return Object(h["a"])({},p["a"].options.computed.classes.call(this),{"v-toolbar--collapse":this.collapse||this.collapseOnScroll,"v-app-bar":!0,"v-app-bar--clipped":this.clippedLeft||this.clippedRight,"v-app-bar--fade-img-on-scroll":this.fadeImgOnScroll,"v-app-bar--elevate-on-scroll":this.elevateOnScroll,"v-app-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-app-bar--hide-shadow":this.hideShadow,"v-app-bar--is-scrolled":this.currentScroll>0,"v-app-bar--shrink-on-scroll":this.shrinkOnScroll})},computedContentHeight:function(){if(!this.shrinkOnScroll)return p["a"].options.computed.computedContentHeight.call(this);var t=this.computedOriginalHeight,e=this.dense?48:56,i=t,o=i-e,r=o/this.computedScrollThreshold,l=this.currentScroll*r;return Math.max(e,i-l)},computedFontSize:function(){if(this.isProminent){var t=this.dense?96:128,e=t-this.computedContentHeight,i=.00347;return Number((1.5-e*i).toFixed(2))}},computedLeft:function(){return!this.app||this.clippedLeft?0:this.$vuetify.application.left},computedMarginTop:function(){return this.app?this.$vuetify.application.bar:0},computedOpacity:function(){if(this.fadeImgOnScroll){var t=Math.max((this.computedScrollThreshold-this.currentScroll)/this.computedScrollThreshold,0);return Number(parseFloat(t).toFixed(2))}},computedOriginalHeight:function(){var t=p["a"].options.computed.computedContentHeight.call(this);return this.isExtended&&(t+=parseInt(this.extensionHeight)),t},computedRight:function(){return!this.app||this.clippedRight?0:this.$vuetify.application.right},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):this.computedOriginalHeight-(this.dense?48:56)},computedTransform:function(){if(!this.canScroll||this.elevateOnScroll&&0===this.currentScroll&&this.isActive)return 0;if(this.isActive)return 0;var t=this.scrollOffScreen?this.computedHeight:this.computedContentHeight;return this.bottom?t:-t},hideShadow:function(){return this.elevateOnScroll&&this.isExtended?this.currentScroll<this.computedScrollThreshold:this.elevateOnScroll?0===this.currentScroll||this.computedTransform<0:(!this.isExtended||this.scrollOffScreen)&&0!==this.computedTransform},isCollapsed:function(){return this.collapseOnScroll?this.currentScroll>0:p["a"].options.computed.isCollapsed.call(this)},isProminent:function(){return p["a"].options.computed.isProminent.call(this)||this.shrinkOnScroll},styles:function(){return Object(h["a"])({},p["a"].options.computed.styles.call(this),{fontSize:Object(x["f"])(this.computedFontSize,"rem"),marginTop:Object(x["f"])(this.computedMarginTop),transform:"translateY(".concat(Object(x["f"])(this.computedTransform),")"),left:Object(x["f"])(this.computedLeft),right:Object(x["f"])(this.computedRight)})}},watch:{canScroll:"onScroll",computedTransform:function(){this.canScroll&&(this.clippedLeft||this.clippedRight)&&this.callUpdate()},invertedScroll:function(t){this.isActive=!t||0!==this.currentScroll}},created:function(){this.invertedScroll&&(this.isActive=!1)},methods:{genBackground:function(){var t=p["a"].options.methods.genBackground.call(this);return t.data=this._b(t.data||{},t.tag,{style:{opacity:this.computedOpacity}}),t},updateApplication:function(){return this.invertedScroll?0:this.computedHeight+this.computedTransform},thresholdMet:function(){this.invertedScroll?this.isActive=this.currentScroll>this.computedScrollThreshold:this.currentThreshold<this.computedScrollThreshold||(this.hideOnScroll&&(this.isActive=this.isScrollingUp),this.savedScroll=this.currentScroll)}},render:function(t){var e=p["a"].options.render.call(this,t);return e.data=e.data||{},this.canScroll&&(e.data.directives=e.data.directives||[],e.data.directives.push({arg:this.scrollTarget,name:"scroll",value:this.onScroll})),e}}),_=i("132d"),j=i("2a7f"),k=Object(n["a"])(c,o,r,!1,null,"f3279ba0",null);e["default"]=k.exports;a()(k,{VAppBar:B,VIcon:_["a"],VToolbarTitle:j["a"]})},e825:function(t,e,i){},ecfd:function(t,e,i){"use strict";var o=i("e825"),r=i.n(o);r.a}}]);
//# sourceMappingURL=chunk-ccb7ddb0.335e7abd.js.map