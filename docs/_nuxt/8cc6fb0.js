(("undefined"!=typeof self?self:this).webpackJsonp=("undefined"!=typeof self?self:this).webpackJsonp||[]).push([[68,26,28],{677:function(e,t,n){"use strict";n.r(t);n(11),n(17),n(18),n(12),n(14);var r=n(0),l=(n(10),n(36),n(31),n(3),n(53)),o=n(335);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v={name:"CurrencyIcon",props:{currency:{type:Object},size:{type:Number,default:12,required:!1}},data:function(){return{}},computed:d(d({},Object(l.d)({currencies:function(e){return e.currencies.currencies},darkMode:function(e){return e.settings.theme.dark}})),{},{isSymbolKnown:function(){var e=this;return o.a.filter((function(i){return i.symbol.toLowerCase()===e.currency.name.toLowerCase()})).length>0},symbol:function(){return this.currency&&this.currency.name?this.currency.name:""},color:function(){return this.darkMode?"white":"black"}})},f=n(59),component=Object(f.a)(v,(function(){var e=this,t=e._self._c;return t("i",[e.isSymbolKnown?t("cryptoicon",{attrs:{symbol:e.symbol,size:e.size,color:e.color}}):t("span",[e._v(e._s(e.symbol))])],1)}),[],!1,null,null,null);t.default=component.exports},884:function(e,t,n){"use strict";n.r(t);var r=n(174),l=n(303),o=(n(11),n(62),n(64),n(60),n(46),n(17),n(18),n(32),n(43),n(34),n(14),n(37),n(0)),c=(n(30),n(10),n(131),n(48),n(54),n(130),n(36),n(12),n(3),n(65),n(53));function d(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,a){if(e){if("string"==typeof e)return v(e,a);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?v(e,a):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,l=function(){};return{s:l,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:l}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){u=!0,o=e},f:function(){try{a||null==n.return||n.return()}finally{if(u)throw o}}}}function v(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,n=Array(a);t<a;t++)n[t]=e[t];return n}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var h={name:"CurrencySelect",components:{CurrencyIcon:n(677).default},props:{value:{default:function(){return[]},required:!0,type:Array},error:{required:!1,default:!1,type:Boolean},label:{default:"",required:!1,type:String},fiat:{default:!0,required:!1},crypto:{default:!0,required:!1},whitelist:{default:function(){return[]},required:!1,type:Array}},data:function(){return{selectedValues:[]}},computed:x(x({},Object(c.d)({currencies:function(e){return e.currencies.currencies}})),{},{items:function(){var e={fiat:[],crypto:[]},t=this.whitelist.length>0;this.whitelist&&(e={fiat:this.whitelist.filter((function(i){return i})).filter((function(i){return i.name})).filter((function(i){return i.type})).filter((function(i){return"fiat"===i.type})).map((function(i){return i.name})),crypto:this.whitelist.filter((function(i){return i})).filter((function(i){return i.name})).filter((function(i){return i.type})).filter((function(i){return"crypto"===i.type})).map((function(i){return i.name}))});var n=[],r=this.currencies.fiat,l=this.currencies.crypto;if(this.fiat)for(var o=0,c=Object.keys(r);o<c.length;o++){var symbol=c[o];t&&!e.fiat.includes(symbol)||n.push({label:"".concat(symbol," (").concat(r[symbol].label,")"),value:{name:r[symbol].key,type:"fiat"}})}if(this.crypto)for(var d=0,v=Object.keys(l);d<v.length;d++){var f=v[d];t&&!e.crypto.includes(f)||n.push({label:"".concat(f," (").concat(l[f].label,")"),value:{name:l[f].key,type:"crypto"}})}return n}}),methods:{remove:function(e){var t=this.selectedValues.findIndex((function(t){return t.value.name===e.value.name&&t.value.type===e.value.type}));t>=0&&this.selectedValues.splice(t,1)},onSelectCurrencies:function(e){this.$emit("input",e)}},watch:{value:function(){var e=this;this.value&&(this.selectedValues=this.items.filter((function(option){var t,n=d(e.value);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(option.value.name===r.name&&option.value.type===r.type)return!0}}catch(e){n.e(e)}finally{n.f()}return!1})))}}},m=n(59),component=Object(m.a)(h,(function(){var e=this,t=e._self._c;return t(r.a,{attrs:{label:e.label,items:e.items,error:e.error,"item-value":"value","item-text":"label",multiple:"",clearable:"",filled:"",chips:"","deletable-chips":""},on:{change:e.onSelectCurrencies},scopedSlots:e._u([{key:"item",fn:function(data){return[t("CurrencyIcon",{attrs:{currency:data.item.value}}),e._v("\n     \n    "),t("span",[e._v(e._s(data.item.label))])]}},{key:"selection",fn:function(data){return[t(l.a,{attrs:{close:""},on:{"click:close":function(t){return e.remove(data.item)}}},[t("CurrencyIcon",{attrs:{currency:data.item.value}}),e._v("\n       \n      "),t("span",[e._v(e._s(data.item.label))])],1)]}},{key:"no-data",fn:function(){return[t("span",[e._v(e._s(e.$t("common.select.no-result")))])]},proxy:!0}]),model:{value:e.selectedValues,callback:function(t){e.selectedValues=t},expression:"selectedValues"}})}),[],!1,null,"1896c4b0",null);t.default=component.exports;installComponents(component,{CurrencyIcon:n(677).default})},890:function(e,t,n){var content=n(891);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(26).default)("c54b7bb4",content,!0,{sourceMap:!1})},891:function(e,t,n){var r=n(25)((function(i){return i[1]}));r.push([e.i,".theme--light.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea{color:#fff}.theme--light.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea::-moz-placeholder{color:hsla(0,0%,100%,.5)}.theme--light.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea::placeholder{color:hsla(0,0%,100%,.5)}.theme--dark.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea{color:rgba(0,0,0,.87)}.theme--dark.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea::-moz-placeholder{color:rgba(0,0,0,.38)}.theme--dark.v-textarea.v-text-field--solo-inverted.v-input--is-focused textarea::placeholder{color:rgba(0,0,0,.38)}.v-textarea textarea{align-self:stretch;flex:1 1 auto;line-height:1.75rem;max-width:100%;min-height:32px;outline:none;padding:0;width:100%}.v-textarea .v-text-field__prefix,.v-textarea .v-text-field__suffix{align-self:start;padding-top:2px}.v-textarea.v-text-field--box .v-text-field__prefix,.v-textarea.v-text-field--box textarea,.v-textarea.v-text-field--enclosed .v-text-field__prefix,.v-textarea.v-text-field--enclosed textarea{margin-top:24px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) textarea{margin-top:10px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-label{top:18px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense textarea{margin-top:6px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-outer{align-self:flex-start;margin-top:8px}.v-textarea.v-text-field--solo{align-items:flex-start}.v-textarea.v-text-field--solo .v-input__control textarea{caret-color:auto}.v-textarea.v-text-field--solo .v-input__append-inner,.v-textarea.v-text-field--solo .v-input__append-outer,.v-textarea.v-text-field--solo .v-input__prepend-inner,.v-textarea.v-text-field--solo .v-input__prepend-outer{align-self:flex-start;margin-top:12px}.v-application--is-ltr .v-textarea.v-text-field--solo .v-input__append-inner{padding-left:12px}.v-application--is-rtl .v-textarea.v-text-field--solo .v-input__append-inner{padding-right:12px}.v-textarea--auto-grow textarea{overflow:hidden}.v-textarea--no-resize textarea{resize:none}.v-textarea.v-text-field--enclosed .v-text-field__slot{align-self:stretch}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-right:-12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-left:-12px}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-right:12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-left:12px}.v-application--is-ltr .v-textarea.v-text-field--enclosed.v-text-field--reverse .v-text-field__slot .v-label{margin-right:12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed.v-text-field--reverse .v-text-field__slot .v-label{margin-left:12px}",""]),r.locals={},e.exports=r},945:function(e,t,n){"use strict";n(11),n(10),n(17),n(18),n(12),n(3),n(14);var r=n(0),l=(n(31),n(69),n(890),n(110)),o=n(9);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var d=Object(o.a)(l.a);t.a=d.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(e){return!isNaN(parseFloat(e))}},rows:{type:[Number,String],default:5,validator:function(e){return!isNaN(parseInt(e,10))}}},computed:{classes:function(){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},l.a.options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{autoGrow:function(e){var t=this;this.$nextTick((function(){var n;e?t.calculateInputHeight():null===(n=t.$refs.input)||void 0===n||n.style.removeProperty("height")}))},lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var e=this;setTimeout((function(){e.autoGrow&&e.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var input=this.$refs.input;if(input){input.style.height="0";var e=input.scrollHeight,t=parseInt(this.rows,10)*parseFloat(this.rowHeight);input.style.height=Math.max(t,e)+"px"}},genInput:function(){var input=l.a.options.methods.genInput.call(this);return input.tag="textarea",delete input.data.attrs.type,input.data.attrs.rows=this.rows,input},onInput:function(e){l.a.options.methods.onInput.call(this,e),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(e){this.isFocused&&13===e.keyCode&&e.stopPropagation(),this.$emit("keydown",e)}}})},963:function(e,t,n){"use strict";n.r(t);var r=n(921),l=n(340),o=n(656),c=n(653),d=n(869),v=n(951),f=n(299),x=n(655),h=n(110),m=n(945),y=n(88),_=n(333),w=(n(64),n(10),n(60),n(46),n(17),n(18),n(12),n(3),n(32),n(43),n(34),n(14),n(37),n(0)),O=(n(11),n(62),n(36),n(53)),j=n(679);function $(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?$(Object(n),!0).forEach((function(t){Object(w.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):$(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function P(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,a){if(e){if("string"==typeof e)return S(e,a);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?S(e,a):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,l=function(){};return{s:l,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:l}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){u=!0,o=e},f:function(){try{a||null==n.return||n.return()}finally{if(u)throw o}}}}function S(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,n=Array(a);t<a;t++)n[t]=e[t];return n}var I={components:{CurrencySelect:n(884).default},data:function(){return{wallet:null,address:"",currencies:[],displayName:"",comment:"",saveError:!1,saveSuccess:!1}},validations:{address:{required:j.required,uniqueAddress:function(address){var e,t=P(this.wallets);try{for(t.s();!(e=t.n()).done;){var n=e.value;if(n.id!==this.wallet.id&&n.address===address)return!1}}catch(e){t.e(e)}finally{t.f()}return!0}},currencies:{required:j.required,minLength:Object(j.minLength)(1)},displayName:{required:j.required,uniqueName:function(e){var t,n=P(this.wallets);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(r.id!==this.wallet.id&&r.name===e)return!1}}catch(e){n.e(e)}finally{n.f()}return!0}},comment:{}},computed:k(k({},Object(O.d)({wallets:function(e){return e.wallets.wallets}})),Object(O.c)({walletById:"wallets/byId"})),methods:k(k({},Object(O.b)({storeWallet:"wallets/saveWallet"})),{},{submit:function(){var e=this,t={id:this.wallet.id,address:this.address,name:this.displayName,currencies:this.currencies,description:this.comment};this.storeWallet(t).then((function(){e.saveSuccess=!0})).catch((function(t){e.saveError=!0}))}}),mounted:function(){this.wallet=this.walletById(this.$route.params.id),this.address=this.wallet.address,this.currencies=this.wallet.currencies,this.displayName=this.wallet.name,this.comment=this.wallet.description,this.$v.$touch()}},C=n(59),component=Object(C.a)(I,(function(){var e=this,t=e._self._c;return t(c.a,{attrs:{fluid:""}},[t(v.a,{attrs:{role:"form"},on:{submit:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}}},[e.saveError?t(r.a,{attrs:{type:"error",dense:"",dismissible:""}},[e._v(e._s(e.$t("wallet.save-error")))]):e._e(),e._v(" "),e.saveSuccess?t(r.a,{attrs:{type:"success",dense:"",dismissible:""}},[e._v(e._s(e.$t("wallet.edit-success")))]):e._e(),e._v(" "),t(x.a,[t(o.a,{attrs:{cols:"12"}},[t(h.a,{attrs:{label:e.$t("wallet.name"),error:e.$v.displayName.$error},on:{input:function(t){return e.$v.displayName.$touch()}},model:{value:e.displayName,callback:function(t){e.displayName=t},expression:"displayName"}})],1)],1),e._v(" "),t(x.a,[t(o.a,{attrs:{cols:"12"}},[t(h.a,{attrs:{label:e.$t("wallet.address"),error:e.$v.address.$error},on:{input:function(t){return e.$v.address.$touch()}},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1)],1),e._v(" "),t(x.a,[t(o.a,{attrs:{cols:"12"}},[t("CurrencySelect",{attrs:{label:e.$t("wallet.currency"),error:e.$v.currencies.$error},on:{input:function(t){return e.$v.currencies.$touch()}},model:{value:e.currencies,callback:function(t){e.currencies=t},expression:"currencies"}})],1)],1),e._v(" "),t(x.a,[t(o.a,{attrs:{cols:"12"}},[t(m.a,{attrs:{rows:"3",label:e.$t("wallet.comment"),error:e.$v.comment.$error},on:{input:function(t){return e.$v.comment.$touch()}},model:{value:e.comment,callback:function(t){e.comment=t},expression:"comment"}})],1)],1),e._v(" "),t(d.a,{staticClass:"pa-0",attrs:{app:""}},[t(y.a,{attrs:{dense:""}},[t(_.a,{staticClass:"flex-grow-1"}),e._v(" "),t(_.a,[t(l.a,{staticClass:"mr-2",attrs:{to:"/wallet",color:"warning",tile:""}},[t(f.a,{attrs:{left:""}},[e._v("mdi-keyboard-backspace")]),e._v("\n            "+e._s(e.$t("common.abort"))+"\n          ")],1)],1),e._v(" "),t(_.a,[t(l.a,{attrs:{disabled:e.$v.$invalid,tile:"",color:"primary"},on:{click:e.submit}},[t(f.a,{attrs:{left:""}},[e._v("mdi-content-save")]),e._v("\n            "+e._s(e.$t("common.confirmation.save"))+"\n          ")],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);