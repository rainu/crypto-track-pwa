(("undefined"!=typeof self?self:this).webpackJsonp=("undefined"!=typeof self?self:this).webpackJsonp||[]).push([[44],{914:function(e,t,r){"use strict";r.r(t);var n=r(174),l=(r(11),r(62),r(64),r(60),r(46),r(17),r(18),r(12),r(32),r(43),r(34),r(14),r(37),r(0)),o=(r(30),r(10),r(54),r(36),r(3),r(53));function c(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,a){if(e){if("string"==typeof e)return f(e,a);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?f(e,a):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,l=function(){};return{s:l,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:l}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,u=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){u=!0,o=e},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw o}}}}function f(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,r=Array(a);t<a;t++)r[t]=e[t];return r}function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(l.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var h={name:"WalletChooser",props:{value:{default:"",required:!0,type:String},error:{required:!1,default:!1,type:Boolean},label:{default:"",required:!1,type:String},whitelist:{default:function(){return[]},required:!1,type:Array}},data:function(){return{selectedWallet:null}},computed:y(y({},Object(o.d)({wallets:function(e){return e.wallets.wallets}})),{},{items:function(){var e=this,t=[];return this.whitelist&&(t=this.whitelist.filter((function(i){return i})).filter((function(i){return i.name})).filter((function(i){return i.type}))),this.wallets.filter((function(e){if(t.length>0){var r,n=c(t);try{for(n.s();!(r=n.n()).done;){var l,o=r.value,f=c(e.currencies);try{for(f.s();!(l=f.n()).done;){var d=l.value;if(o.type===d.type&&o.name===d.name)return!0}}catch(e){f.e(e)}finally{f.f()}}}catch(e){n.e(e)}finally{n.f()}return!1}return!0})).map((function(t){return{label:"".concat(t.name," (").concat(e.shortWalletAddress(t),")"),value:t.id}}))}}),methods:{shortWalletAddress:function(e){if(!e.address)return"";if(e.address.length<15)return e.address;var t=e.address.substr(0,8),r=e.address.substr(e.address.length-4,e.address.length);return"".concat(t,"...").concat(r)},onSelectWallet:function(e){this.$emit("input",e)}},watch:{value:function(){""===this.value&&(this.selectedWallet="")}},mounted:function(){var e,t=c(this.items);try{for(t.s();!(e=t.n()).done;){var r=e.value;if(r.value===this.value){this.selectedWallet=r;break}}}catch(e){t.e(e)}finally{t.f()}}},v=r(59),component=Object(v.a)(h,(function(){var e=this,t=e._self._c;return t(n.a,{attrs:{label:e.label,items:e.items,value:e.selectedWallet,error:e.error,"item-text":"label","item-value":"value",clearable:""},on:{change:e.onSelectWallet},scopedSlots:e._u([{key:"no-data",fn:function(){return[t("span",[e._v(e._s(e.$t("common.select.no-result")))])]},proxy:!0}])})}),[],!1,null,"2531bbc8",null);t.default=component.exports}}]);