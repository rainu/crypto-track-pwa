(("undefined"!=typeof self?self:this).webpackJsonp=("undefined"!=typeof self?self:this).webpackJsonp||[]).push([[57,24,26],{677:function(e,r,t){"use strict";t.r(r);t(11),t(17),t(18),t(12),t(14);var n=t(0),c=(t(10),t(36),t(31),t(3),t(53)),o=t(335);function l(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function f(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?l(Object(t),!0).forEach((function(r){Object(n.a)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var y={name:"CurrencyIcon",props:{currency:{type:Object},size:{type:Number,default:12,required:!1}},data:function(){return{}},computed:f(f({},Object(c.d)({currencies:function(e){return e.currencies.currencies},darkMode:function(e){return e.settings.theme.dark}})),{},{isSymbolKnown:function(){var e=this;return o.a.filter((function(i){return i.symbol.toLowerCase()===e.currency.name.toLowerCase()})).length>0},symbol:function(){return this.currency&&this.currency.name?this.currency.name:""},color:function(){return this.darkMode?"white":"black"}})},m=t(59),component=Object(m.a)(y,(function(){var e=this,r=e._self._c;return r("i",[e.isSymbolKnown?r("cryptoicon",{attrs:{symbol:e.symbol,size:e.size,color:e.color}}):r("span",[e._v(e._s(e.symbol))])],1)}),[],!1,null,null,null);r.default=component.exports},678:function(e,r,t){"use strict";t.r(r);t(11),t(10),t(17),t(18),t(12),t(3),t(14);var n=t(0),c=(t(36),t(31),t(53)),o=t(419),l=t.n(o);function f(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function y(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?f(Object(t),!0).forEach((function(r){Object(n.a)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var m={name:"CurrencyAmount",components:{CurrencyIcon:t(677).default},props:{amount:{type:Number},currency:{type:Object}},data:function(){return{}},computed:y(y({},Object(c.d)({locale:function(e){return e.settings.locale},currencies:function(e){return e.currencies.currencies}})),{},{displayAmount:function(){if(!this.amount)return"0";var e="0.00";this.currency&&this.currency.name&&(e=this.currencies[this.currency.type][this.currency.name].format.numeral),l.a.locale(this.locale);var r=l()(this.amount).format(e);return"NaN"===r&&(r="0"),r}})},d=t(59),component=Object(d.a)(m,(function(){var e=this,r=e._self._c;return r("span",{staticClass:"word-wrap"},[e._v("\n  "+e._s(e.displayAmount)+" "),r("CurrencyIcon",{attrs:{currency:e.currency}})],1)}),[],!1,null,null,null);r.default=component.exports;installComponents(component,{CurrencyIcon:t(677).default})},895:function(e,r,t){"use strict";t.r(r);var n=t(300),c=t(52),o=t(302),l=t(297),f=t(195),y=t(40),m=(t(36),{name:"Wallet",components:{CurrencyAmount:t(678).default},props:{wallet:{type:Object,required:!0}},computed:{shyWalletAddress:function(){if(!this.wallet.address)return"";for(var e=this.wallet.address.split(""),r="",i=0;i<e.length;i++)r+=e[i],0!==i&&i%12==0&&(r+="<wbr>");return r},balances:function(){return this.$store.getters["wallets/balances"](this.wallet.id)}}}),d=t(59),component=Object(d.a)(m,(function(){var e=this,r=e._self._c;return r(n.a,[r(c.d,[e._v(e._s(e.wallet.name))]),e._v(" "),r(c.b,{domProps:{innerHTML:e._s(e.shyWalletAddress)}}),e._v(" "),r(o.a),e._v(" "),r(l.a,e._l(e.balances,(function(t){return r(f.a,{key:t.currency.type+"_"+t.currency.name},[r(y.c,[e._v(e._s(t.currency.name))]),e._v(" "),r(y.b,{staticClass:"text-right"},[r("CurrencyAmount",{attrs:{amount:t.amount,currency:t.currency}})],1)],1)})),1),e._v(" "),r(c.a,[e._t("default")],2)],1)}),[],!1,null,"4d3a3a2a",null);r.default=component.exports;installComponents(component,{CurrencyAmount:t(678).default})}}]);