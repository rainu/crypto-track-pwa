(("undefined"!=typeof self?self:this).webpackJsonp=("undefined"!=typeof self?self:this).webpackJsonp||[]).push([[16],{534:function(e,t,n){"use strict";n.r(t);n(30),n(26),n(18);var r=n(1),o=n(29),l=n(264);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={name:"CurrencyIcon",props:{currency:{type:Object},size:{type:Number,default:12,required:!1}},data:function(){return{}},computed:d(d({},Object(o.d)({currencies:function(e){return e.currencies.currencies},darkMode:function(e){return e.settings.theme.dark}})),{},{isSymbolKnown:function(){var e=this;return l.a.filter((function(i){return i.symbol.toLowerCase()===e.currency.name.toLowerCase()})).length>0},symbol:function(){return this.currency&&this.currency.name?this.currency.name:""},color:function(){return this.darkMode?"white":"black"}})},v=n(36),component=Object(v.a)(f,(function(){var e=this.$createElement,t=this._self._c||e;return t("i",[this.isSymbolKnown?t("cryptoicon",{attrs:{symbol:this.symbol,size:this.size,color:this.color}}):t("span",[this._v(this._s(this.symbol))])],1)}),[],!1,null,null,null);t.default=component.exports},549:function(e,t,n){"use strict";n.r(t);n(17),n(30),n(135),n(32),n(27),n(104),n(26),n(47),n(53);var r=n(1),o=n(29);function l(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,d=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return l=e.done,e},e:function(e){d=!0,o=e},f:function(){try{l||null==n.return||n.return()}finally{if(d)throw o}}}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={name:"CurrencySelect",components:{CurrencyIcon:n(534).default},props:{value:{default:function(){return[]},required:!0,type:Array},error:{required:!1,default:!1,type:Boolean},label:{default:"",required:!1,type:String},fiat:{default:!0,required:!1},crypto:{default:!0,required:!1},whitelist:{default:function(){return[]},required:!1,type:Array}},data:function(){return{selectedValues:[]}},computed:f(f({},Object(o.d)({currencies:function(e){return e.currencies.currencies}})),{},{items:function(){var e={fiat:[],crypto:[]},t=this.whitelist.length>0;this.whitelist&&(e={fiat:this.whitelist.filter((function(i){return i})).filter((function(i){return i.name})).filter((function(i){return i.type})).filter((function(i){return"fiat"===i.type})).map((function(i){return i.name})),crypto:this.whitelist.filter((function(i){return i})).filter((function(i){return i.name})).filter((function(i){return i.type})).filter((function(i){return"crypto"===i.type})).map((function(i){return i.name}))});var n=[],r=this.currencies.fiat,o=this.currencies.crypto;if(this.fiat)for(var l=0,c=Object.keys(r);l<c.length;l++){var symbol=c[l];t&&!e.fiat.includes(symbol)||n.push({label:"".concat(symbol," (").concat(r[symbol].label,")"),value:{name:r[symbol].key,type:"fiat"}})}if(this.crypto)for(var d=0,f=Object.keys(o);d<f.length;d++){var v=f[d];t&&!e.crypto.includes(v)||n.push({label:"".concat(v," (").concat(o[v].label,")"),value:{name:o[v].key,type:"crypto"}})}return n}}),methods:{remove:function(e){var t=this.selectedValues.findIndex((function(t){return t.value.name===e.value.name&&t.value.type===e.value.type}));t>=0&&this.selectedValues.splice(t,1)},onSelectCurrencies:function(e){this.$emit("input",e)}},watch:{value:function(){var e=this;this.value&&(this.selectedValues=this.items.filter((function(option){var t,n=l(e.value);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(option.value.name===r.name&&option.value.type===r.type)return!0}}catch(e){n.e(e)}finally{n.f()}return!1})))}}},x=n(36),h=n(40),m=n.n(h),y=n(133),_=n(240),component=Object(x.a)(v,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-autocomplete",{attrs:{label:e.label,items:e.items,error:e.error,"item-value":"value","item-text":"label",multiple:"",clearable:"",filled:"",chips:"","deletable-chips":""},on:{change:e.onSelectCurrencies},scopedSlots:e._u([{key:"item",fn:function(data){return[n("CurrencyIcon",{attrs:{currency:data.item.value}}),e._v("\n     \n    "),n("span",[e._v(e._s(data.item.label))])]}},{key:"selection",fn:function(data){return[n("v-chip",{attrs:{close:""},on:{"click:close":function(t){return e.remove(data.item)}}},[n("CurrencyIcon",{attrs:{currency:data.item.value}}),e._v("\n       \n      "),n("span",[e._v(e._s(data.item.label))])],1)]}},{key:"no-data",fn:function(){return[n("span",[e._v(e._s(e.$t("common.select.no-result")))])]},proxy:!0}]),model:{value:e.selectedValues,callback:function(t){e.selectedValues=t},expression:"selectedValues"}})}),[],!1,null,"1896c4b0",null);t.default=component.exports;m()(component,{CurrencyIcon:n(534).default}),m()(component,{VAutocomplete:y.a,VChip:_.a})},704:function(e,t,n){"use strict";n(30),n(58),n(55),n(32),n(161),n(53),n(69),n(54);var r=n(1),o=n(3),l=n(96),c=n(74);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}t.a=Object(o.a)(l.a,Object(c.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var e=this,t=function(input){return input.$watch("hasError",(function(t){e.$set(e.errorBag,input._uid,t)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(e.errorBag.hasOwnProperty(input._uid)||(n.valid=t(input)))})):n.valid=t(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var e=this.inputs.find((function(i){return i._uid===input._uid}));if(e){var t=this.watchers.find((function(i){return i._uid===e._uid}));t&&(t.valid(),t.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==e._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}})},705:function(e,t,n){var content=n(706);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(10).default)("5c8fbe94",content,!0,{sourceMap:!1})},706:function(e,t,n){(t=n(9)(!1)).push([e.i,".v-textarea textarea{align-self:stretch;flex:1 1 auto;line-height:1.75rem;max-width:100%;min-height:32px;outline:none;padding:0;width:100%}.v-textarea .v-text-field__prefix,.v-textarea .v-text-field__suffix{padding-top:2px;align-self:start}.v-textarea.v-text-field--box .v-text-field__prefix,.v-textarea.v-text-field--box textarea,.v-textarea.v-text-field--enclosed .v-text-field__prefix,.v-textarea.v-text-field--enclosed textarea{margin-top:24px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) textarea{margin-top:10px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-label{top:18px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense textarea{margin-top:6px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-outer{align-self:flex-start;margin-top:8px}.v-textarea.v-text-field--solo{align-items:flex-start}.v-textarea.v-text-field--solo .v-input__append-inner,.v-textarea.v-text-field--solo .v-input__append-outer,.v-textarea.v-text-field--solo .v-input__prepend-inner,.v-textarea.v-text-field--solo .v-input__prepend-outer{align-self:flex-start;margin-top:12px}.v-application--is-ltr .v-textarea.v-text-field--solo .v-input__append-inner{padding-left:12px}.v-application--is-rtl .v-textarea.v-text-field--solo .v-input__append-inner{padding-right:12px}.v-textarea--auto-grow textarea{overflow:hidden}.v-textarea--no-resize textarea{resize:none}.v-textarea.v-text-field--enclosed .v-text-field__slot{align-self:stretch}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-right:-12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-left:-12px}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-right:12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-left:12px}",""]),e.exports=t},787:function(e,t,n){"use strict";n(18),n(54);var r=n(1),o=(n(705),n(89)),l=n(3);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}var d=Object(l.a)(o.a);t.a=d.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(e){return!isNaN(parseFloat(e))}},rows:{type:[Number,String],default:5,validator:function(e){return!isNaN(parseInt(e,10))}}},computed:{classes:function(){return function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},o.a.options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var e=this;setTimeout((function(){e.autoGrow&&e.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var input=this.$refs.input;if(input){input.style.height="0";var e=input.scrollHeight,t=parseInt(this.rows,10)*parseFloat(this.rowHeight);input.style.height=Math.max(t,e)+"px"}},genInput:function(){var input=o.a.options.methods.genInput.call(this);return input.tag="textarea",delete input.data.attrs.type,input.data.attrs.rows=this.rows,input},onInput:function(e){o.a.options.methods.onInput.call(this,e),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(e){this.isFocused&&13===e.keyCode&&e.stopPropagation(),this.$emit("keydown",e)}}})},810:function(e,t,n){"use strict";n.r(t);n(342),n(343),n(26);var r=n(1),o=n(29),l=n(539);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}function f(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return l=e.done,e},e:function(e){c=!0,o=e},f:function(){try{l||null==n.return||n.return()}finally{if(c)throw o}}}}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var x={components:{CurrencySelect:n(549).default},data:function(){return{wallet:null,address:"",currencies:[],displayName:"",comment:"",saveError:!1,saveSuccess:!1}},validations:{address:{required:l.required,uniqueAddress:function(address){var e,t=f(this.wallets);try{for(t.s();!(e=t.n()).done;){var n=e.value;if(n.id!==this.wallet.id&&n.address===address)return!1}}catch(e){t.e(e)}finally{t.f()}return!0}},currencies:{required:l.required,minLength:Object(l.minLength)(1)},displayName:{required:l.required,uniqueName:function(e){var t,n=f(this.wallets);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(r.id!==this.wallet.id&&r.name===e)return!1}}catch(e){n.e(e)}finally{n.f()}return!0}},comment:{}},computed:d(d({},Object(o.d)({wallets:function(e){return e.wallets.wallets}})),Object(o.c)({walletById:"wallets/byId"})),methods:d(d({},Object(o.b)({storeWallet:"wallets/saveWallet"})),{},{submit:function(){var e=this,t={id:this.wallet.id,address:this.address,name:this.displayName,currencies:this.currencies,description:this.comment};this.storeWallet(t).then((function(){e.saveSuccess=!0})).catch((function(t){e.saveError=!0}))}}),mounted:function(){this.wallet=this.walletById(this.$route.params.id),this.address=this.wallet.address,this.currencies=this.wallet.currencies,this.displayName=this.wallet.name,this.comment=this.wallet.description,this.$v.$touch()}},h=n(36),m=n(40),y=n.n(m),_=n(793),w=n(267),O=n(510),j=n(513),$=n(686),P=n(704),S=n(236),k=n(511),V=n(89),I=n(787),E=n(68),C=n(262),component=Object(h.a)(x,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("v-form",{attrs:{role:"form"},on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[e.saveError?n("v-alert",{attrs:{type:"error",dense:"",dismissible:""}},[e._v(e._s(e.$t("wallet.save-error")))]):e._e(),e._v(" "),e.saveSuccess?n("v-alert",{attrs:{type:"success",dense:"",dismissible:""}},[e._v(e._s(e.$t("wallet.edit-success")))]):e._e(),e._v(" "),n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{label:e.$t("wallet.name"),error:e.$v.displayName.$error},on:{input:function(t){return e.$v.displayName.$touch()}},model:{value:e.displayName,callback:function(t){e.displayName=t},expression:"displayName"}})],1)],1),e._v(" "),n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("v-text-field",{attrs:{label:e.$t("wallet.address"),error:e.$v.address.$error},on:{input:function(t){return e.$v.address.$touch()}},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1)],1),e._v(" "),n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("CurrencySelect",{attrs:{label:e.$t("wallet.currency"),error:e.$v.currencies.$error},on:{input:function(t){return e.$v.currencies.$touch()}},model:{value:e.currencies,callback:function(t){e.currencies=t},expression:"currencies"}})],1)],1),e._v(" "),n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("v-textarea",{attrs:{rows:"3",label:e.$t("wallet.comment"),error:e.$v.comment.$error},on:{input:function(t){return e.$v.comment.$touch()}},model:{value:e.comment,callback:function(t){e.comment=t},expression:"comment"}})],1)],1),e._v(" "),n("v-footer",{staticClass:"pa-0",attrs:{app:""}},[n("v-toolbar",{attrs:{dense:""}},[n("v-toolbar-items",{staticClass:"flex-grow-1"}),e._v(" "),n("v-toolbar-items",[n("v-btn",{staticClass:"mr-2",attrs:{to:"/wallet",color:"warning",tile:""}},[n("v-icon",{attrs:{left:""}},[e._v("mdi-keyboard-backspace")]),e._v("\n            "+e._s(e.$t("common.abort"))+"\n          ")],1)],1),e._v(" "),n("v-toolbar-items",[n("v-btn",{attrs:{disabled:e.$v.$invalid,tile:"",color:"primary"},on:{click:e.submit}},[n("v-icon",{attrs:{left:""}},[e._v("mdi-content-save")]),e._v("\n            "+e._s(e.$t("common.confirmation.save"))+"\n          ")],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;y()(component,{CurrencySelect:n(549).default}),y()(component,{VAlert:_.a,VBtn:w.a,VCol:O.a,VContainer:j.a,VFooter:$.a,VForm:P.a,VIcon:S.a,VRow:k.a,VTextField:V.a,VTextarea:I.a,VToolbar:E.a,VToolbarItems:C.a})}}]);