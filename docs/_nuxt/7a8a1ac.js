(("undefined"!=typeof self?self:this).webpackJsonp=("undefined"!=typeof self?self:this).webpackJsonp||[]).push([[9],{704:function(r,t,e){"use strict";e(30),e(58),e(55),e(32),e(161),e(53),e(69),e(54);var n=e(1),o=e(3),c=e(96),l=e(74);function f(object,r){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);r&&(e=e.filter((function(r){return Object.getOwnPropertyDescriptor(object,r).enumerable}))),t.push.apply(t,e)}return t}function h(r){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(n.a)(r,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(source,t))}))}return r}t.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(r){var t=Object.values(r).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var r=this,t=function(input){return input.$watch("hasError",(function(t){r.$set(r.errorBag,input._uid,t)}),{immediate:!0})},e={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?e.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(r.errorBag.hasOwnProperty(input._uid)||(e.valid=t(input)))})):e.valid=t(input),e},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var r=this;this.lazyValidation&&setTimeout((function(){r.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var r=this.inputs.find((function(i){return i._uid===input._uid}));if(r){var t=this.watchers.find((function(i){return i._uid===r._uid}));t&&(t.valid(),t.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==r._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==r._uid})),this.$delete(this.errorBag,r._uid)}}},render:function(r){var t=this;return r("form",{staticClass:"v-form",attrs:h({novalidate:!0},this.attrs$),on:{submit:function(r){return t.$emit("submit",r)}}},this.$slots.default)}})},788:function(r,t,e){var n=e(8),o=Math.log,c=Math.LOG10E;n({target:"Math",stat:!0},{log10:function(r){return o(r)*c}})},811:function(r,t,e){"use strict";e.r(t);e(788),e(161),e(163);var n=e(1),o=e(29),c=e(539);function l(object,r){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);r&&(e=e.filter((function(r){return Object.getOwnPropertyDescriptor(object,r).enumerable}))),t.push.apply(t,e)}return t}function f(r){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(r,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(source,t))}))}return r}function h(r,t){var e;if("undefined"==typeof Symbol||null==r[Symbol.iterator]){if(Array.isArray(r)||(e=function(r,t){if(!r)return;if("string"==typeof r)return d(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);"Object"===e&&r.constructor&&(e=r.constructor.name);if("Map"===e||"Set"===e)return Array.from(r);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return d(r,t)}(r))||t&&r&&"number"==typeof r.length){e&&(r=e);var i=0,n=function(){};return{s:n,n:function(){return i>=r.length?{done:!0}:{done:!1,value:r[i++]}},e:function(r){throw r},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){e=r[Symbol.iterator]()},n:function(){var r=e.next();return c=r.done,r},e:function(r){l=!0,o=r},f:function(){try{c||null==e.return||e.return()}finally{if(l)throw o}}}}function d(r,t){(null==t||t>r.length)&&(t=r.length);for(var i=0,e=new Array(t);i<t;i++)e[i]=r[i];return e}var m={data:function(){return{currency:null,label:"",factor:0,crawler:{coinmarketcap:{id:"",slug:""},forexsb:{from:"",to:""},finnhub:{symbol:""}},saveError:!1,saveSuccess:!1}},validations:{label:{required:c.required,uniqueLabel:function(label){var r,t=h(this.currencies);try{for(t.s();!(r=t.n()).done;){var e=r.value;if(e.key!==this.currency.key&&e.label===label)return!1}}catch(r){t.e(r)}finally{t.f()}return!0}},factor:{required:c.required,minValue:Object(c.minValue)(1),maxValue:Object(c.maxValue)(18)},crawler:{coinmarketcap:{id:{required:Object(c.requiredIf)((function(){return this.isCrypto}))},slug:{required:Object(c.requiredIf)((function(){return this.isCrypto}))}},forexsb:{from:{required:Object(c.requiredIf)((function(){return!this.isCrypto}))},to:{required:Object(c.requiredIf)((function(){return!this.isCrypto}))}},finnhub:{symbol:{required:Object(c.requiredIf)((function(){return!this.isCrypto}))}}}},computed:f(f(f({},Object(o.d)({allCurrencies:function(r){return r.currencies.currencies}})),Object(o.c)({getCurrency:"currencies/getCurrency"})),{},{currentCurrency:function(){return this.getCurrency(this.$route.params.type,this.$route.params.key)},isCrypto:function(){return"crypto"===this.$route.params.type},currencies:function(){return Object.values(this.allCurrencies[this.$route.params.type])}}),methods:f(f({},Object(o.b)({updateCurrency:"currencies/updateCurrency"})),{},{submit:function(){var r=this,t={type:this.$route.params.type,key:this.$route.params.key,label:this.label,factor:parseFloat("1e-".concat(this.factor)),format:{numeral:"0,0.[".concat("0".repeat(this.factor),"]")}};this.isCrypto?t.crawler={coinmarketcap:{id:this.crawler.coinmarketcap.id,slug:this.crawler.coinmarketcap.slug}}:t.crawler={forexsb:{from:this.crawler.forexsb.from,to:this.crawler.forexsb.to},finnhub:{symbol:this.crawler.finnhub.symbol}},this.updateCurrency(t).then((function(){r.saveSuccess=!0})).catch((function(t){r.saveError=!0}))}}),mounted:function(){this.currency=this.currentCurrency,this.label=this.currency.label,this.factor=-1*Math.log10(this.currency.factor),this.isCrypto?(this.crawler.coinmarketcap.id=this.currency.crawler.coinmarketcap.id,this.crawler.coinmarketcap.slug=this.currency.crawler.coinmarketcap.slug):(this.crawler.forexsb.from=this.currency.crawler.forexsb.from,this.crawler.forexsb.to=this.currency.crawler.forexsb.to,this.crawler.finnhub.symbol=this.currency.crawler.finnhub.symbol),this.$v.$touch()}},v=e(36),y=e(40),w=e.n(y),$=e(793),O=e(267),k=e(510),x=e(513),j=e(686),_=e(704),C=e(236),V=e(511),P=e(89),E=e(68),B=e(262),component=Object(v.a)(m,(function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("v-container",{attrs:{fluid:""}},[e("v-form",{attrs:{role:"form"},on:{submit:function(t){return t.preventDefault(),r.submit(t)}}},[r.saveError?e("v-alert",{attrs:{type:"error",dense:"",dismissible:""}},[r._v(r._s(r.$t("currency.save-error")))]):r._e(),r._v(" "),r.saveSuccess?e("v-alert",{attrs:{type:"success",dense:"",dismissible:""}},[r._v(r._s(r.$t("currency.edit-success")))]):r._e(),r._v(" "),e("v-row",[e("v-col",{attrs:{cols:"3",sm:"2",md:"2"}},[e("v-text-field",{attrs:{label:r.$t("currency.key"),readonly:""},model:{value:this.$route.params.key,callback:function(t){r.$set(this.$route.params,"key",t)},expression:"this.$route.params.key"}})],1),r._v(" "),e("v-col",{attrs:{cols:"6",sm:"9",md:"9"}},[e("v-text-field",{attrs:{label:r.$t("currency.name"),error:r.$v.label.$error},on:{input:function(t){return r.$v.label.$touch()}},model:{value:r.label,callback:function(t){r.label=t},expression:"label"}})],1),r._v(" "),e("v-col",{attrs:{cols:"3",sm:"1",md:"1"}},[e("v-text-field",{attrs:{type:"number",min:"1",max:"18",label:r.$t("currency.factor"),error:r.$v.factor.$error},on:{input:function(t){return r.$v.factor.$touch()}},model:{value:r.factor,callback:function(t){r.factor=t},expression:"factor"}})],1)],1),r._v(" "),r.isCrypto?e("v-row",[e("v-col",{attrs:{cols:"6"}},[e("v-text-field",{attrs:{label:r.$t("currency.crawler.coinmarketcap.id"),error:r.$v.crawler.coinmarketcap.id.$error},on:{input:function(t){return r.$v.crawler.coinmarketcap.id.$touch()}},model:{value:r.crawler.coinmarketcap.id,callback:function(t){r.$set(r.crawler.coinmarketcap,"id",t)},expression:"crawler.coinmarketcap.id"}})],1),r._v(" "),e("v-col",{attrs:{cols:"6"}},[e("v-text-field",{attrs:{label:r.$t("currency.crawler.coinmarketcap.slug"),error:r.$v.crawler.coinmarketcap.slug.$error},on:{input:function(t){return r.$v.crawler.coinmarketcap.slug.$touch()}},model:{value:r.crawler.coinmarketcap.slug,callback:function(t){r.$set(r.crawler.coinmarketcap,"slug",t)},expression:"crawler.coinmarketcap.slug"}})],1)],1):[e("v-row",[e("v-col",{attrs:{cols:"6"}},[e("v-text-field",{attrs:{label:r.$t("currency.crawler.forexsb.from"),error:r.$v.crawler.forexsb.from.$error},on:{input:function(t){return r.$v.crawler.forexsb.from.$touch()}},model:{value:r.crawler.forexsb.from,callback:function(t){r.$set(r.crawler.forexsb,"from",t)},expression:"crawler.forexsb.from"}})],1),r._v(" "),e("v-col",{attrs:{cols:"6"}},[e("v-text-field",{attrs:{label:r.$t("currency.crawler.forexsb.to"),error:r.$v.crawler.forexsb.to.$error},on:{input:function(t){return r.$v.crawler.forexsb.to.$touch()}},model:{value:r.crawler.forexsb.to,callback:function(t){r.$set(r.crawler.forexsb,"to",t)},expression:"crawler.forexsb.to"}})],1)],1),r._v(" "),e("v-row",[e("v-col",{attrs:{cols:"12"}},[e("v-text-field",{attrs:{label:r.$t("currency.crawler.finnhub.symbol"),error:r.$v.crawler.finnhub.symbol.$error},on:{input:function(t){return r.$v.crawler.finnhub.symbol.$touch()}},model:{value:r.crawler.finnhub.symbol,callback:function(t){r.$set(r.crawler.finnhub,"symbol",t)},expression:"crawler.finnhub.symbol"}})],1)],1)],r._v(" "),e("v-footer",{staticClass:"pa-0",attrs:{app:""}},[e("v-toolbar",{attrs:{dense:""}},[e("v-toolbar-items",{staticClass:"flex-grow-1"}),r._v(" "),e("v-toolbar-items",[e("v-btn",{staticClass:"mr-2",attrs:{to:"/currency",color:"warning",tile:""}},[e("v-icon",{attrs:{left:""}},[r._v("mdi-keyboard-backspace")]),r._v("\n            "+r._s(r.$t("common.abort"))+"\n          ")],1)],1),r._v(" "),e("v-toolbar-items",[e("v-btn",{attrs:{disabled:r.$v.$invalid,tile:"",color:"primary"},on:{click:r.submit}},[e("v-icon",{attrs:{left:""}},[r._v("mdi-content-save")]),r._v("\n            "+r._s(r.$t("common.confirmation.save"))+"\n          ")],1)],1)],1)],1)],2)],1)}),[],!1,null,"45bcc2bf",null);t.default=component.exports;w()(component,{VAlert:$.a,VBtn:O.a,VCol:k.a,VContainer:x.a,VFooter:j.a,VForm:_.a,VIcon:C.a,VRow:V.a,VTextField:P.a,VToolbar:E.a,VToolbarItems:B.a})}}]);