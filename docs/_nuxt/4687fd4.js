(("undefined"!=typeof self?self:this).webpackJsonp=("undefined"!=typeof self?self:this).webpackJsonp||[]).push([[59,12,13],{853:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return l}));r(30),r(12),r(3);var n=[function(data){return data}],c=n.length,o=function(content){return{version:c,content:content}},l=function(e){return new Promise((function(t,r){var n={};if(e&&e.version)n=e;else try{n=JSON.parse(e)}catch(e){return void r(e)}n.version!==c&&(n=d(n)),t(n)}))},d=function(data){for(var i=data.version;i<n.length;i++)console.log("Import-Migration: do Step ".concat(i+1," of ").concat(n.length)),(data=n[i](data)).version=i+1;return data}},872:function(e,t,r){"use strict";r.r(t);var n=r(340),c=r(299),o=(r(11),r(10),r(17),r(18),r(12),r(14),r(0)),l=(r(3),r(34),r(37),r(863),r(864),r(439),r(53)),d=r(853);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m={name:"FileExport",data:function(){return{}},methods:y(y({},Object(l.b)({backupContent:"backup/getBackupContent"})),{},{onDownloadFile:function(){var e=this;return this.backupContent().then((function(t){var r=Object(d.a)(t),n=new Blob([JSON.stringify(r,null,2)],{type:"text/json;charset=UTF-8"}),link=e.$refs.downloadLink;link.href=window.URL.createObjectURL(n),link.download="crypto_track_backup.json",link.click()}))}})},v=r(59),component=Object(v.a)(m,(function(){var e=this,t=e._self._c;return t("div",[t(n.a,{attrs:{block:"",color:"primary"},on:{click:e.onDownloadFile}},[t(c.a,{attrs:{left:""}},[e._v("cloud_upload")]),e._v("\n    "+e._s(e.$t("backup.file.export.title"))+"\n  ")],1),e._v(" "),t("a",{ref:"downloadLink",attrs:{hidden:""}})],1)}),[],!1,null,"9673686e",null);t.default=component.exports},873:function(e,t,r){"use strict";r.r(t);var n=r(340),c=r(300),o=r(52),l=r(656),d=r(663),f=r(299),y=r(655),m=r(900),v=(r(11),r(10),r(17),r(18),r(12),r(3),r(14),r(0)),h=r(53),k=r(853);function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){Object(v.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var _={name:"FileImport",data:function(){return{uploadError:null,snackbar:{error:!1,success:!1}}},methods:j(j({},Object(h.b)({applyBackup:"backup/applyBackup"})),{},{onConfirm:function(){window.location.reload()},onUploadFile:function(){var e=this;if(this.$refs.fileInput.files[0]){this.uploadError=null;var t=new FileReader;t.readAsText(this.$refs.fileInput.files[0],"UTF-8"),t.addEventListener("load",(function(t){Object(k.b)(t.target.result).then((function(t){e.applyBackup(t.content),e.snackbar.success=!0,e.$refs.fileInput.value=""})).catch((function(t){e.uploadError=t,e.snackbar.error=!0}))}))}}})},x=r(59),component=Object(x.a)(_,(function(){var e=this,t=e._self._c;return t("div",[t(n.a,{attrs:{block:"",color:"primary"},on:{click:function(t){return e.$refs.fileInput.click()}}},[t(f.a,{attrs:{left:""}},[e._v("cloud_download")]),e._v("\n    "+e._s(e.$t("backup.file.import.title"))+"\n\n    "),t("input",{ref:"fileInput",attrs:{hidden:"",type:"file"},on:{change:e.onUploadFile}})],1),e._v(" "),t(m.a,{staticClass:"text-center",attrs:{color:"error",timeout:5e3},model:{value:e.snackbar.error,callback:function(t){e.$set(e.snackbar,"error",t)},expression:"snackbar.error"}},[e._v("\n    "+e._s(e.$t("backup.file.import.failed",{err:e.uploadError}))+"\n    "),t(n.a,{attrs:{text:""},on:{click:function(t){e.snackbar.error=!1}}},[t(f.a,[e._v("close")])],1)],1),e._v(" "),t(d.a,{attrs:{persistent:""},model:{value:e.snackbar.success,callback:function(t){e.$set(e.snackbar,"success",t)},expression:"snackbar.success"}},[t(c.a,[t(o.d,[e._v(e._s(e.$t("backup.file.import.success")))]),e._v(" "),t(o.c,[e._v(e._s(e.$t("backup.reload")))]),e._v(" "),t(o.a,[t(y.a,{attrs:{dense:""}},[t(l.a,{attrs:{cols:"12"}},[t(n.a,{attrs:{block:"",color:"primary"},on:{click:e.onConfirm}},[t(f.a,[e._v("check")]),e._v("\n              "+e._s(e.$t("common.ok"))+"\n            ")],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,"cdad932a",null);t.default=component.exports},893:function(e,t,r){"use strict";r.r(t);var n=r(300),c=r(52),o=r(656),l=r(655),d=r(872),f={name:"BackupFile",components:{FileImport:r(873).default,FileExport:d.default}},y=r(59),component=Object(y.a)(f,(function(){var e=this,t=e._self._c;return t(n.a,[t(c.d,[e._v(e._s(e.$t("backup.file.title")))]),e._v(" "),t(c.a,[t(l.a,{attrs:{align:"center"}},[t(o.a,{attrs:{md:"6"}},[t("FileExport")],1),e._v(" "),t(o.a,{attrs:{md:"6"}},[t("FileImport")],1)],1)],1)],1)}),[],!1,null,"7c5b44e0",null);t.default=component.exports},902:function(e,t,r){"use strict";r.r(t);var n=r(340),c=r(299),o=r(900),l=(r(11),r(10),r(17),r(18),r(12),r(14),r(0)),d=(r(3),r(34),r(37),r(863),r(864),r(439),r(53)),f=r(55),y=(r(62),r(64),r(60),r(46),r(36),r(205),r(32),r(43),r(901)),m=r.n(y),v=r(670),h=r(666),k=void 0;function O(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,a){if(e){if("string"==typeof e)return j(e,a);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?j(e,a):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,c=function(){};return{s:c,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,u=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){u=!0,o=e},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw o}}}}function j(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,r=Array(a);t<a;t++)r[t]=e[t];return r}var _=[{label:"Type",value:"type"},{label:"Buy Amount",value:"buy.value"},{label:"Buy Currency.",value:"buy.currency"},{label:"Sell Amount",value:"sell.value"},{label:"Sell Currency",value:"sell.currency"},{label:"Fee",value:"fee.value"},{label:"Fee Currency",value:"fee.currency"},{label:"Exchange",value:"exchange"},{label:"Trade-Group",value:"trade.group"},{label:"Comment",value:"comment"},{label:"Date",value:"date"},{label:"Tx-ID",value:"trade.id"},{label:"Buy Value in your Account Currency",value:"counter.buy"},{label:"Sell Value in your Account Currency",value:"counter.sell"}],x=function(e){var t={value:null,currency:null};return e.data&&e.data.fee&&e.data.fee.length>0&&(t.value=e.data.fee[0].amount,t.currency=e.data.fee[0].currency.name),t},w=function(e,t){if(e.data&&e.data.exchangeRates&&e.data.exchangeRates.length>0){var r,n=O(e.data.exchangeRates);try{for(n.s();!(r=n.n()).done;){var c=r.value;if(c.in.name===t.name&&c.in.type===t.type)return c}}catch(e){n.e(e)}finally{n.f()}}return null},P=function(e){var t={buy:null,sell:null};if(e.data&&e.data.exchangeRates&&e.data.exchangeRates.length>0){if(e.data&&e.data.out&&e.data.out.currency&&"crypto"===e.data.out.currency.type){var r=w(e,e.data.out.currency);r&&(t.sell=e.data.out.amount*r.ratio)}if(e.data&&e.data.in&&e.data.in.currency&&"crypto"===e.data.in.currency.type){var n=w(e,e.data.in.currency);n&&(t.buy=e.data.in.amount*n.ratio)}}return t},F={exchange:function(e){return[{type:"Trade",buy:{value:e.data.in.amount,currency:e.data.in.currency.name},sell:{value:e.data.out.amount,currency:e.data.out.currency.name},fee:x(e),exchange:e.data.details.exchange,trade:{id:e.data.details.comment,group:e.data.details.group},counter:P(e),comment:e.data.details.comment,date:v.a(h.a(e.date),"yyyy-MM-dd HH:mm")}]},transfer:function(e){return[{type:"Withdrawal",sell:{value:e.data.amount,currency:e.data.currency.name},fee:x(e),exchange:e.data.details.exchange,trade:{id:e.data.details.comment,group:e.data.details.group},comment:e.data.details.comment,date:v.a(h.a(e.date),"yyyy-MM-dd HH:mm")},{type:"Deposit",buy:{value:e.data.amount,currency:e.data.currency.name},exchange:e.data.details.exchange,trade:{id:e.data.details.comment,group:e.data.details.group},comment:e.data.details.comment,date:v.a(h.a(e.date),"yyyy-MM-dd HH:mm")}]},spent:function(e){return[{type:"Spend",sell:{value:e.data.out.amount,currency:e.data.out.currency.name},fee:x(e),exchange:e.data.details.exchange,trade:{id:e.data.details.comment,group:e.data.details.group},counter:P(e),comment:e.data.details.comment,date:v.a(h.a(e.date),"yyyy-MM-dd HH:mm")}]},giftIn:function(e){return[{type:"Gift/Tip",buy:{value:e.data.in.amount,currency:e.data.in.currency.name},fee:x(e),exchange:e.data.details.exchange,trade:{id:e.data.details.comment,group:e.data.details.group},counter:P(e),comment:e.data.details.comment,date:v.a(h.a(e.date),"yyyy-MM-dd HH:mm")}]},giftOut:function(e){return[{type:"Gift",sell:{value:e.data.out.amount,currency:e.data.out.currency.name},fee:x(e),exchange:e.data.details.exchange,trade:{id:e.data.details.comment,group:e.data.details.group},counter:P(e),comment:e.data.details.comment,date:v.a(h.a(e.date),"yyyy-MM-dd HH:mm")}]},lost:function(e){return[{type:"Lost",sell:{value:e.data.out.amount,currency:e.data.out.currency.name},fee:x(e),exchange:e.data.details.exchange,trade:{id:e.data.details.comment,group:e.data.details.group},counter:P(e),comment:e.data.details.comment,date:v.a(h.a(e.date),"yyyy-MM-dd HH:mm")}]},stolen:function(e){return k.lost(e)},income:function(e){return[{type:"Income",buy:{value:e.data.in.amount,currency:e.data.in.currency.name},fee:x(e),exchange:e.data.details.exchange,trade:{id:e.data.details.comment,group:e.data.details.group},counter:P(e),comment:e.data.details.comment,date:v.a(h.a(e.date),"yyyy-MM-dd HH:mm")}]}};function E(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var $={name:"CoinTracking",data:function(){return{exportError:null,snackbar:{error:!1}}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?E(Object(r),!0).forEach((function(t){Object(l.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(d.d)({transactions:function(e){return e.transactions.transactions}})),methods:{onDownloadFile:function(){var e,t=this;return(e=this.transactions,new Promise((function(t,r){for(var n={fields:_},c=[],o=0,l=Object.values(e);o<l.length;o++){var d=l[o];if(!F[d.type])return void r("Transaction not supported yet: ".concat(d.type));c.push.apply(c,Object(f.a)(F[d.type](d)))}t(m.a.parse(c,n))}))).then((function(content){var e=new Blob([content],{type:"text/csv"}),link=t.$refs.downloadLink;link.href=window.URL.createObjectURL(e),link.download="cointracking.csv",link.click()})).catch((function(e){t.snackbar.error=!0,t.exportError=e.Error||e}))}}},D=$,C=r(59),component=Object(C.a)(D,(function(){var e=this,t=e._self._c;return t("div",[t(o.a,{staticClass:"text-center",attrs:{color:"error",timeout:5e3},model:{value:e.snackbar.error,callback:function(t){e.$set(e.snackbar,"error",t)},expression:"snackbar.error"}},[e._v("\n    "+e._s(e.$t("backup.cointracking.failed",{err:e.exportError}))+"\n    "),t(n.a,{attrs:{text:""},on:{click:function(t){e.snackbar.error=!1}}},[t(c.a,[e._v("close")])],1)],1),e._v(" "),t(n.a,{attrs:{block:"",color:"primary"},on:{click:e.onDownloadFile}},[t(c.a,{attrs:{left:""}},[e._v("cloud_upload")]),e._v("\n    "+e._s(e.$t("backup.file.export.title"))+"\n  ")],1),e._v(" "),t("a",{ref:"downloadLink",attrs:{hidden:""}})],1)}),[],!1,null,"a4e4e76a",null);t.default=component.exports},953:function(e,t,r){"use strict";r.r(t);var n=r(300),c=r(52),o=r(656),l=r(653),d=r(655),f=r(893),y={components:{CoinTracking:r(902).default,BackupFile:f.default}},m=r(59),component=Object(m.a)(y,(function(){var e=this,t=e._self._c;return t(l.a,{attrs:{fluid:""}},[t(d.a,[t(o.a,{attrs:{cols:"12"}},[t("BackupFile")],1)],1),e._v(" "),t(d.a,[t(o.a,{attrs:{cols:"12"}},[t(n.a,[t(c.d,[e._v(e._s(e.$t("backup.cointracking.title")))]),e._v(" "),t(c.a,[t(d.a,[t(o.a,{attrs:{cols:"12"}},[t("CoinTracking")],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,"c756e978",null);t.default=component.exports;installComponents(component,{BackupFile:r(893).default})}}]);