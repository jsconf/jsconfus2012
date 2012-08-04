/*
 * SimpleModal 1.4.2 - jQuery Plugin
 * http://simplemodal.com/
 * Copyright (c) 2011 Eric Martin
 * Licensed under MIT and GPL
 * Date: Sat, Dec 17 2011 15:35:38 -0800
 */
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):b(jQuery)})(function(b){var j=[],k=b(document),l=b.browser.msie&&6===parseInt(b.browser.version)&&"object"!==typeof window.XMLHttpRequest,n=b.browser.msie&&7===parseInt(b.browser.version),m=null,h=b(window),i=[];b.modal=function(a,d){return b.modal.impl.init(a,d)};b.modal.close=function(){b.modal.impl.close()};b.modal.focus=function(a){b.modal.impl.focus(a)};b.modal.setContainerDimensions=function(){b.modal.impl.setContainerDimensions()};
b.modal.setPosition=function(){b.modal.impl.setPosition()};b.modal.update=function(a,d){b.modal.impl.update(a,d)};b.fn.modal=function(a){return b.modal.impl.init(this,a)};b.modal.defaults={appendTo:"body",focus:!0,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:!1,autoPosition:!0,zIndex:1E3,close:!0,closeHTML:'<a class="modalCloseImg" title="Close"></a>',
closeClass:"simplemodal-close",escClose:!0,overlayClose:!1,fixed:!0,position:null,persist:!1,modal:!0,onOpen:null,onShow:null,onClose:null};b.modal.impl={d:{},init:function(a,d){if(this.d.data)return!1;m=b.browser.msie&&!b.boxModel;this.o=b.extend({},b.modal.defaults,d);this.zIndex=this.o.zIndex;this.occb=!1;if("object"===typeof a){if(a=a instanceof jQuery?a:b(a),this.d.placeholder=!1,0<a.parent().parent().size()&&(a.before(b("<span></span>").attr("id","simplemodal-placeholder").css({display:"none"})),
this.d.placeholder=!0,this.display=a.css("display"),!this.o.persist))this.d.orig=a.clone(!0)}else if("string"===typeof a||"number"===typeof a)a=b("<div></div>").html(a);else return alert("SimpleModal Error: Unsupported data type: "+typeof a),this;this.create(a);this.open();b.isFunction(this.o.onShow)&&this.o.onShow.apply(this,[this.d]);return this},create:function(a){this.getDimensions();if(this.o.modal&&l)this.d.iframe=b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss,
{display:"none",opacity:0,position:"fixed",height:i[0],width:i[1],zIndex:this.o.zIndex,top:0,left:0})).appendTo(this.o.appendTo);this.d.overlay=b("<div></div>").attr("id",this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss,{display:"none",opacity:this.o.opacity/100,height:this.o.modal?j[0]:0,width:this.o.modal?j[1]:0,position:"fixed",left:0,top:0,zIndex:this.o.zIndex+1})).appendTo(this.o.appendTo);this.d.container=b("<div></div>").attr("id",this.o.containerId).addClass("simplemodal-container").css(b.extend({position:this.o.fixed?
"fixed":"absolute"},this.o.containerCss,{display:"none",zIndex:this.o.zIndex+2})).append(this.o.close&&this.o.closeHTML?b(this.o.closeHTML).addClass(this.o.closeClass):"").appendTo(this.o.appendTo);this.d.wrap=b("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(this.d.container);this.d.data=a.attr("id",a.attr("id")||this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss,{display:"none"})).appendTo("body");this.setContainerDimensions();
this.d.data.appendTo(this.d.wrap);(l||m)&&this.fixIE()},bindEvents:function(){var a=this;b("."+a.o.closeClass).bind("click.simplemodal",function(b){b.preventDefault();a.close()});a.o.modal&&a.o.close&&a.o.overlayClose&&a.d.overlay.bind("click.simplemodal",function(b){b.preventDefault();a.close()});k.bind("keydown.simplemodal",function(b){a.o.modal&&9===b.keyCode?a.watchTab(b):a.o.close&&a.o.escClose&&27===b.keyCode&&(b.preventDefault(),a.close())});h.bind("resize.simplemodal orientationchange.simplemodal",
function(){a.getDimensions();a.o.autoResize?a.setContainerDimensions():a.o.autoPosition&&a.setPosition();l||m?a.fixIE():a.o.modal&&(a.d.iframe&&a.d.iframe.css({height:i[0],width:i[1]}),a.d.overlay.css({height:j[0],width:j[1]}))})},unbindEvents:function(){b("."+this.o.closeClass).unbind("click.simplemodal");k.unbind("keydown.simplemodal");h.unbind(".simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var a=this.o.position;b.each([this.d.iframe||null,!this.o.modal?null:this.d.overlay,
"fixed"===this.d.container.css("position")?this.d.container:null],function(b,f){if(f){var g=f[0].style;g.position="absolute";if(2>b)g.removeExpression("height"),g.removeExpression("width"),g.setExpression("height",'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'),g.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');else{var c,e;a&&a.constructor===
Array?(c=a[0]?"number"===typeof a[0]?a[0].toString():a[0].replace(/px/,""):f.css("top").replace(/px/,""),c=-1===c.indexOf("%")?c+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':parseInt(c.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',a[1]&&(e="number"===typeof a[1]?
a[1].toString():a[1].replace(/px/,""),e=-1===e.indexOf("%")?e+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(e.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')):(c='(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
e='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');g.removeExpression("top");g.removeExpression("left");g.setExpression("top",c);g.setExpression("left",e)}}})},focus:function(a){var d=this,a=a&&-1!==b.inArray(a,["first","last"])?a:"first",f=b(":input:enabled:visible:"+a,d.d.wrap);setTimeout(function(){0<f.length?f.focus():d.d.wrap.focus()},
10)},getDimensions:function(){var a=b.browser.opera&&"9.5"<b.browser.version&&"1.3">b.fn.jquery||b.browser.opera&&"9.5">b.browser.version&&"1.2.6"<b.fn.jquery?h[0].innerHeight:h.height();j=[k.height(),k.width()];i=[a,h.width()]},getVal:function(a,b){return a?"number"===typeof a?a:"auto"===a?0:0<a.indexOf("%")?parseInt(a.replace(/%/,""))/100*("h"===b?i[0]:i[1]):parseInt(a.replace(/px/,"")):null},update:function(a,b){if(!this.d.data)return!1;this.d.origHeight=this.getVal(a,"h");this.d.origWidth=this.getVal(b,
"w");this.d.data.hide();a&&this.d.container.css("height",a);b&&this.d.container.css("width",b);this.setContainerDimensions();this.d.data.show();this.o.focus&&this.focus();this.unbindEvents();this.bindEvents()},setContainerDimensions:function(){var a=l||n,d=this.d.origHeight?this.d.origHeight:b.browser.opera?this.d.container.height():this.getVal(a?this.d.container[0].currentStyle.height:this.d.container.css("height"),"h"),a=this.d.origWidth?this.d.origWidth:b.browser.opera?this.d.container.width():
this.getVal(a?this.d.container[0].currentStyle.width:this.d.container.css("width"),"w"),f=this.d.data.outerHeight(!0),g=this.d.data.outerWidth(!0);this.d.origHeight=this.d.origHeight||d;this.d.origWidth=this.d.origWidth||a;var c=this.o.maxHeight?this.getVal(this.o.maxHeight,"h"):null,e=this.o.maxWidth?this.getVal(this.o.maxWidth,"w"):null,c=c&&c<i[0]?c:i[0],e=e&&e<i[1]?e:i[1],h=this.o.minHeight?this.getVal(this.o.minHeight,"h"):"auto",d=d?this.o.autoResize&&d>c?c:d<h?h:d:f?f>c?c:this.o.minHeight&&
"auto"!==h&&f<h?h:f:h,c=this.o.minWidth?this.getVal(this.o.minWidth,"w"):"auto",a=a?this.o.autoResize&&a>e?e:a<c?c:a:g?g>e?e:this.o.minWidth&&"auto"!==c&&g<c?c:g:c;this.d.container.css({height:d,width:a});this.d.wrap.css({overflow:f>d||g>a?"auto":"visible"});this.o.autoPosition&&this.setPosition()},setPosition:function(){var a,b;a=i[0]/2-this.d.container.outerHeight(!0)/2;b=i[1]/2-this.d.container.outerWidth(!0)/2;var f="fixed"!==this.d.container.css("position")?h.scrollTop():0;this.o.position&&"[object Array]"===
Object.prototype.toString.call(this.o.position)?(a=f+(this.o.position[0]||a),b=this.o.position[1]||b):a=f+a;this.d.container.css({left:b,top:a})},watchTab:function(a){if(0<b(a.target).parents(".simplemodal-container").length){if(this.inputs=b(":input:enabled:visible:first, :input:enabled:visible:last",this.d.data[0]),!a.shiftKey&&a.target===this.inputs[this.inputs.length-1]||a.shiftKey&&a.target===this.inputs[0]||0===this.inputs.length)a.preventDefault(),this.focus(a.shiftKey?"last":"first")}else a.preventDefault(),
this.focus()},open:function(){this.d.iframe&&this.d.iframe.show();b.isFunction(this.o.onOpen)?this.o.onOpen.apply(this,[this.d]):(this.d.overlay.show(),this.d.container.show(),this.d.data.show());this.o.focus&&this.focus();this.bindEvents()},close:function(){if(!this.d.data)return!1;this.unbindEvents();if(b.isFunction(this.o.onClose)&&!this.occb)this.occb=!0,this.o.onClose.apply(this,[this.d]);else{if(this.d.placeholder){var a=b("#simplemodal-placeholder");this.o.persist?a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display",
this.display)):(this.d.data.hide().remove(),a.replaceWith(this.d.orig))}else this.d.data.hide().remove();this.d.container.hide().remove();this.d.overlay.hide();this.d.iframe&&this.d.iframe.hide().remove();this.d.overlay.remove();this.d={}}}}});


/*!
 * jQuery Form Plugin
 * version: 3.02 (07-MAR-2012)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *    http://www.opensource.org/licenses/mit-license.php
 *    http://www.gnu.org/licenses/gpl.html
 *//*global ActiveXObject alert */(function(a){function e(){if(!!a.fn.ajaxSubmit.debug){var b="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(b):window.opera&&window.opera.postError&&window.opera.postError(b)}}function d(b){var c=b.target,d=a(c);if(!d.is(":submit,input:image")){var e=d.closest(":submit");if(e.length===0)return;c=e[0]}var f=this;f.clk=c;if(c.type=="image")if(b.offsetX!==undefined)f.clk_x=b.offsetX,f.clk_y=b.offsetY;else if(typeof a.fn.offset=="function"){var g=d.offset();f.clk_x=b.pageX-g.left,f.clk_y=b.pageY-g.top}else f.clk_x=b.pageX-c.offsetLeft,f.clk_y=b.pageY-c.offsetTop;setTimeout(function(){f.clk=f.clk_x=f.clk_y=null},100)}function c(b){var c=b.data;b.isDefaultPrevented()||(b.preventDefault(),a(this).ajaxSubmit(c))}"use strict";var b={};b.fileapi=a("<input type='file'/>").get(0).files!==undefined,b.formdata=window.FormData!==undefined,a.fn.ajaxSubmit=function(c){function w(b){function E(b){if(!o.aborted&&!D){try{B=w(n)}catch(c){e("cannot access response document: ",c),b=v}if(b===u&&o){o.abort("timeout");return}if(b==v&&o){o.abort("server abort");return}if(!B||B.location.href==j.iframeSrc)if(!r)return;n.detachEvent?n.detachEvent("onload",E):n.removeEventListener("load",E,!1);var d="success",f;try{if(r)throw"timeout";var g=j.dataType=="xml"||B.XMLDocument||a.isXMLDoc(B);e("isXml="+g);if(!g&&window.opera&&(B.body===null||!B.body.innerHTML)&&--C){e("requeing onLoad callback, DOM not available"),setTimeout(E,250);return}var h=B.body?B.body:B.documentElement;o.responseText=h?h.innerHTML:null,o.responseXML=B.XMLDocument?B.XMLDocument:B,g&&(j.dataType="xml"),o.getResponseHeader=function(a){var b={"content-type":j.dataType};return b[a]},h&&(o.status=Number(h.getAttribute("status"))||o.status,o.statusText=h.getAttribute("statusText")||o.statusText);var i=(j.dataType||"").toLowerCase(),l=/(json|script|text)/.test(i);if(l||j.textarea){var p=B.getElementsByTagName("textarea")[0];if(p)o.responseText=p.value,o.status=Number(p.getAttribute("status"))||o.status,o.statusText=p.getAttribute("statusText")||o.statusText;else if(l){var q=B.getElementsByTagName("pre")[0],t=B.getElementsByTagName("body")[0];q?o.responseText=q.textContent?q.textContent:q.innerText:t&&(o.responseText=t.textContent?t.textContent:t.innerText)}}else i=="xml"&&!o.responseXML&&o.responseText&&(o.responseXML=F(o.responseText));try{A=H(o,i,j)}catch(b){d="parsererror",o.error=f=b||d}}catch(b){e("error caught: ",b),d="error",o.error=f=b||d}o.aborted&&(e("upload aborted"),d=null),o.status&&(d=o.status>=200&&o.status<300||o.status===304?"success":"error"),d==="success"?(j.success&&j.success.call(j.context,A,"success",o),k&&a.event.trigger("ajaxSuccess",[o,j])):d&&(f===undefined&&(f=o.statusText),j.error&&j.error.call(j.context,o,d,f),k&&a.event.trigger("ajaxError",[o,j,f])),k&&a.event.trigger("ajaxComplete",[o,j]),k&&!--a.active&&a.event.trigger("ajaxStop"),j.complete&&j.complete.call(j.context,o,d),D=!0,j.timeout&&clearTimeout(s),setTimeout(function(){j.iframeTarget||m.remove(),o.responseXML=null},100)}}function z(){function g(){try{var a=w(n).readyState;e("state = "+a),a&&a.toLowerCase()=="uninitialized"&&setTimeout(g,50)}catch(b){e("Server abort: ",b," (",b.name,")"),E(v),s&&clearTimeout(s),s=undefined}}var b=h.attr("target"),c=h.attr("action");f.setAttribute("target",l),d||f.setAttribute("method","POST"),c!=j.url&&f.setAttribute("action",j.url),!j.skipEncodingOverride&&(!d||/post/i.test(d))&&h.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),j.timeout&&(s=setTimeout(function(){r=!0,E(u)},j.timeout));var i=[];try{if(j.extraData)for(var k in j.extraData)j.extraData.hasOwnProperty(k)&&i.push(a('<input type="hidden" name="'+k+'">').attr("value",j.extraData[k]).appendTo(f)[0]);j.iframeTarget||(m.appendTo("body"),n.attachEvent?n.attachEvent("onload",E):n.addEventListener("load",E,!1)),setTimeout(g,15),f.submit()}finally{f.setAttribute("action",c),b?f.setAttribute("target",b):h.removeAttr("target"),a(i).remove()}}function w(a){var b=a.contentWindow?a.contentWindow.document:a.contentDocument?a.contentDocument:a.document;return b}var f=h[0],g,i,j,k,l,m,n,o,p,q,r,s,t=!!a.fn.prop;if(b)if(t)for(i=0;i<b.length;i++)g=a(f[b[i].name]),g.prop("disabled",!1);else for(i=0;i<b.length;i++)g=a(f[b[i].name]),g.removeAttr("disabled");if(a(":input[name=submit],:input[id=submit]",f).length)alert('Error: Form elements must not have name or id of "submit".');else{j=a.extend(!0,{},a.ajaxSettings,c),j.context=j.context||j,l="jqFormIO"+(new Date).getTime(),j.iframeTarget?(m=a(j.iframeTarget),q=m.attr("name"),q?l=q:m.attr("name",l)):(m=a('<iframe name="'+l+'" src="'+j.iframeSrc+'" />'),m.css({position:"absolute",top:"-1000px",left:"-1000px"})),n=m[0],o={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(b){var c=b==="timeout"?"timeout":"aborted";e("aborting upload... "+c),this.aborted=1,m.attr("src",j.iframeSrc),o.error=c,j.error&&j.error.call(j.context,o,c,b),k&&a.event.trigger("ajaxError",[o,j,c]),j.complete&&j.complete.call(j.context,o,c)}},k=j.global,k&&0===a.active++&&a.event.trigger("ajaxStart"),k&&a.event.trigger("ajaxSend",[o,j]);if(j.beforeSend&&j.beforeSend.call(j.context,o,j)===!1){j.global&&a.active--;return}if(o.aborted)return;p=f.clk,p&&(q=p.name,q&&!p.disabled&&(j.extraData=j.extraData||{},j.extraData[q]=p.value,p.type=="image"&&(j.extraData[q+".x"]=f.clk_x,j.extraData[q+".y"]=f.clk_y)));var u=1,v=2,x=a("meta[name=csrf-token]").attr("content"),y=a("meta[name=csrf-param]").attr("content");y&&x&&(j.extraData=j.extraData||{},j.extraData[y]=x),j.forceSync?z():setTimeout(z,10);var A,B,C=50,D,F=a.parseXML||function(a,b){window.ActiveXObject?(b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a)):b=(new DOMParser).parseFromString(a,"text/xml");return b&&b.documentElement&&b.documentElement.nodeName!="parsererror"?b:null},G=a.parseJSON||function(a){return window.eval("("+a+")")},H=function(b,c,d){var e=b.getResponseHeader("content-type")||"",f=c==="xml"||!c&&e.indexOf("xml")>=0,g=f?b.responseXML:b.responseText;f&&g.documentElement.nodeName==="parsererror"&&a.error&&a.error("parsererror"),d&&d.dataFilter&&(g=d.dataFilter(g,c)),typeof g=="string"&&(c==="json"||!c&&e.indexOf("json")>=0?g=G(g):(c==="script"||!c&&e.indexOf("javascript")>=0)&&a.globalEval(g));return g}}}function v(b){var d=new FormData;for(var e=0;e<b.length;e++)d.append(b[e].name,b[e].value);if(c.extraData)for(var f in c.extraData)c.extraData.hasOwnProperty(f)&&d.append(f,c.extraData[f]);c.data=null;var g=a.extend(!0,{},a.ajaxSettings,c,{contentType:!1,processData:!1,cache:!1,type:"POST"});c.uploadProgress&&(g.xhr=function(){var a=jQuery.ajaxSettings.xhr();a.upload&&(a.upload.onprogress=function(a){var b=0;a.lengthComputable&&(b=parseInt(a.position/a.total*100,10)),c.uploadProgress(a,a.position,a.total,b)});return a}),g.data=null;var h=g.beforeSend;g.beforeSend=function(a,b){b.data=d,h&&h.call(b,a,c)},a.ajax(g)}if(!this.length){e("ajaxSubmit: skipping submit process - no element selected");return this}var d,f,g,h=this;typeof c=="function"&&(c={success:c}),d=this.attr("method"),f=this.attr("action"),g=typeof f=="string"?a.trim(f):"",g=g||window.location.href||"",g&&(g=(g.match(/^([^#]+)/)||[])[1]),c=a.extend(!0,{url:g,success:a.ajaxSettings.success,type:d||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},c);var i={};this.trigger("form-pre-serialize",[this,c,i]);if(i.veto){e("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this}if(c.beforeSerialize&&c.beforeSerialize(this,c)===!1){e("ajaxSubmit: submit aborted via beforeSerialize callback");return this}var j=c.traditional;j===undefined&&(j=a.ajaxSettings.traditional);var k,l=this.formToArray(c.semantic);c.data&&(c.extraData=c.data,k=a.param(c.data,j));if(c.beforeSubmit&&c.beforeSubmit(l,this,c)===!1){e("ajaxSubmit: submit aborted via beforeSubmit callback");return this}this.trigger("form-submit-validate",[l,this,c,i]);if(i.veto){e("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this}var m=a.param(l,j);k&&(m=m?m+"&"+k:k),c.type.toUpperCase()=="GET"?(c.url+=(c.url.indexOf("?")>=0?"&":"?")+m,c.data=null):c.data=m;var n=[];c.resetForm&&n.push(function(){h.resetForm()}),c.clearForm&&n.push(function(){h.clearForm(c.includeHidden)});if(!c.dataType&&c.target){var o=c.success||function(){};n.push(function(b){var d=c.replaceTarget?"replaceWith":"html";a(c.target)[d](b).each(o,arguments)})}else c.success&&n.push(c.success);c.success=function(a,b,d){var e=c.context||c;for(var f=0,g=n.length;f<g;f++)n[f].apply(e,[a,b,d||h,h])};var p=a("input:file:enabled[value]",this),q=p.length>0,r="multipart/form-data",s=h.attr("enctype")==r||h.attr("encoding")==r,t=b.fileapi&&b.formdata;e("fileAPI :"+t);var u=(q||s)&&!t;c.iframe!==!1&&(c.iframe||u)?c.closeKeepAlive?a.get(c.closeKeepAlive,function(){w(l)}):w(l):(q||s)&&t?v(l):a.ajax(c),this.trigger("form-submit-notify",[this,c]);return this},a.fn.ajaxForm=function(b){b=b||{},b.delegation=b.delegation&&a.isFunction(a.fn.on);if(!b.delegation&&this.length===0){var f={s:this.selector,c:this.context};if(!a.isReady&&f.s){e("DOM not ready, queuing ajaxForm"),a(function(){a(f.s,f.c).ajaxForm(b)});return this}e("terminating; zero elements found by selector"+(a.isReady?"":" (DOM not ready)"));return this}if(b.delegation){a(document).off("submit.form-plugin",this.selector,c).off("click.form-plugin",this.selector,d).on("submit.form-plugin",this.selector,b,c).on("click.form-plugin",this.selector,b,d);return this}return this.ajaxFormUnbind().bind("submit.form-plugin",b,c).bind("click.form-plugin",b,d)},a.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},a.fn.formToArray=function(c){var d=[];if(this.length===0)return d;var e=this[0],f=c?e.getElementsByTagName("*"):e.elements;if(!f)return d;var g,h,i,j,k,l,m;for(g=0,l=f.length;g<l;g++){k=f[g],i=k.name;if(!i)continue;if(c&&e.clk&&k.type=="image"){!k.disabled&&e.clk==k&&(d.push({name:i,value:a(k).val(),type:k.type}),d.push({name:i+".x",value:e.clk_x},{name:i+".y",value:e.clk_y}));continue}j=a.fieldValue(k,!0);if(j&&j.constructor==Array)for(h=0,m=j.length;h<m;h++)d.push({name:i,value:j[h]});else if(b.fileapi&&k.type=="file"&&!k.disabled){var n=k.files;for(h=0;h<n.length;h++)d.push({name:i,value:n[h],type:k.type})}else j!==null&&typeof j!="undefined"&&d.push({name:i,value:j,type:k.type})}if(!c&&e.clk){var o=a(e.clk),p=o[0];i=p.name,i&&!p.disabled&&p.type=="image"&&(d.push({name:i,value:o.val()}),d.push({name:i+".x",value:e.clk_x},{name:i+".y",value:e.clk_y}))}return d},a.fn.formSerialize=function(b){return a.param(this.formToArray(b))},a.fn.fieldSerialize=function(b){var c=[];this.each(function(){var d=this.name;if(!!d){var e=a.fieldValue(this,b);if(e&&e.constructor==Array)for(var f=0,g=e.length;f<g;f++)c.push({name:d,value:e[f]});else e!==null&&typeof e!="undefined"&&c.push({name:this.name,value:e})}});return a.param(c)},a.fn.fieldValue=function(b){for(var c=[],d=0,e=this.length;d<e;d++){var f=this[d],g=a.fieldValue(f,b);if(g===null||typeof g=="undefined"||g.constructor==Array&&!g.length)continue;g.constructor==Array?a.merge(c,g):c.push(g)}return c},a.fieldValue=function(b,c){var d=b.name,e=b.type,f=b.tagName.toLowerCase();c===undefined&&(c=!0);if(c&&(!d||b.disabled||e=="reset"||e=="button"||(e=="checkbox"||e=="radio")&&!b.checked||(e=="submit"||e=="image")&&b.form&&b.form.clk!=b||f=="select"&&b.selectedIndex==-1))return null;if(f=="select"){var g=b.selectedIndex;if(g<0)return null;var h=[],i=b.options,j=e=="select-one",k=j?g+1:i.length;for(var l=j?g:0;l<k;l++){var m=i[l];if(m.selected){var n=m.value;n||(n=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value);if(j)return n;h.push(n)}}return h}return a(b).val()},a.fn.clearForm=function(b){return this.each(function(){a("input,select,textarea",this).clearFields(b)})},a.fn.clearFields=a.fn.clearInputs=function(a){var b=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var c=this.type,d=this.tagName.toLowerCase();b.test(c)||d=="textarea"||a&&/hidden/.test(c)?this.value="":c=="checkbox"||c=="radio"?this.checked=!1:d=="select"&&(this.selectedIndex=-1)})},a.fn.resetForm=function(){return this.each(function(){(typeof this.reset=="function"||typeof this.reset=="object"&&!this.reset.nodeType)&&this.reset()})},a.fn.enable=function(a){a===undefined&&(a=!0);return this.each(function(){this.disabled=!a})},a.fn.selected=function(b){b===undefined&&(b=!0);return this.each(function(){var c=this.type;if(c=="checkbox"||c=="radio")this.checked=b;else if(this.tagName.toLowerCase()=="option"){var d=a(this).parent("select");b&&d[0]&&d[0].type=="select-one"&&d.find("option").selected(!1),this.selected=b}})},a.fn.ajaxSubmit.debug=!1})(jQuery)


var Mustache=typeof module!="undefined"&&module.exports||{};(function(a){function i(a){return h.test(a)}function n(a){return String(a).replace(/&(?!\w+;)|[<>"']/g,function(a){return m[a]||a})}function o(a,b,c,d){d=d||"<template>";var e=b.split("\n"),f=Math.max(c-3,0),g=Math.min(e.length,c+3),h=e.slice(f,g),i;for(var j=0,k=h.length;j<k;++j)i=j+f+1,h[j]=(i===c?" >> ":"    ")+h[j];return a.template=b,a.line=c,a.file=d,a.message=[d+":"+c,h.join("\n"),"",a.message].join("\n"),a}function p(a,b,c){if(a===".")return b[b.length-1];var d=a.split("."),e=d.length-1,f=d[e],g,h,i=b.length,j,k;while(i){k=b.slice(0),h=b[--i],j=0;while(j<e){h=h[d[j++]];if(h==null)break;k.push(h)}if(h&&typeof h=="object"&&f in h){g=h[f];break}}return typeof g=="function"&&(g=g.call(k[k.length-1])),g==null?c:g}function q(a,b,c,d){var e="",h=p(a,b);if(d){if(h==null||h===!1||f(h)&&h.length===0)e+=c()}else if(f(h))g(h,function(a){b.push(a),e+=c(),b.pop()});else if(typeof h=="object")b.push(h),e+=c(),b.pop();else if(typeof h=="function"){var i=b[b.length-1],j=function(a){return w(a,i)};e+=h.call(i,c(),j)||""}else h&&(e+=c());return e}function r(b,c){c=c||{};var d=c.tags||a.tags,e=d[0],f=d[d.length-1],g=['var buffer = "";',"\nvar line = 1;","\ntry {",'\nbuffer += "'],h=[],k=!1,l=!1,m=function(){if(k&&!l&&!c.space)while(h.length)g.splice(h.pop(),1);else h=[];k=!1,l=!1},n=[],p,q,r,s=function(a){d=j(a).split(/\s+/),q=d[0],r=d[d.length-1]},t=function(a){g.push('";',p,'\nvar partial = partials["'+j(a)+'"];',"\nif (partial) {","\n  buffer += render(partial,stack[stack.length - 1],partials);","\n}",'\nbuffer += "')},u=function(a,d){var e=j(a);if(e==="")throw o(new Error("Section name may not be empty"),b,z,c.file);n.push({name:e,inverted:d}),g.push('";',p,'\nvar name = "'+e+'";',"\nvar callback = (function () {","\n  return function () {",'\n    var buffer = "";','\nbuffer += "')},v=function(a){u(a,!0)},w=function(a){var d=j(a),e=n.length!=0&&n[n.length-1].name;if(!e||d!=e)throw o(new Error('Section named "'+d+'" was never opened'),b,z,c.file);var f=n.pop();g.push('";',"\n    return buffer;","\n  };","\n})();"),f.inverted?g.push("\nbuffer += renderSection(name,stack,callback,true);"):g.push("\nbuffer += renderSection(name,stack,callback);"),g.push('\nbuffer += "')},x=function(a){g.push('";',p,'\nbuffer += lookup("'+j(a)+'",stack,"");','\nbuffer += "')},y=function(a){g.push('";',p,'\nbuffer += escapeHTML(lookup("'+j(a)+'",stack,""));','\nbuffer += "')},z=1,A,B;for(var C=0,D=b.length;C<D;++C)if(b.slice(C,C+e.length)===e){C+=e.length,A=b.substr(C,1),p="\nline = "+z+";",q=e,r=f,k=!0;switch(A){case"!":C++,B=null;break;case"=":C++,f="="+f,B=s;break;case">":C++,B=t;break;case"#":C++,B=u;break;case"^":C++,B=v;break;case"/":C++,B=w;break;case"{":f="}"+f;case"&":C++,l=!0,B=x;break;default:l=!0,B=y}var E=b.indexOf(f,C);if(E===-1)throw o(new Error('Tag "'+e+'" was not closed properly'),b,z,c.file);var F=b.substring(C,E);B&&B(F);var G=0;while(~(G=F.indexOf("\n",G)))z++,G++;C=E+f.length-1,e=q,f=r}else{A=b.substr(C,1);switch(A){case'"':case"\\":l=!0,g.push("\\"+A);break;case"\r":break;case"\n":h.push(g.length),g.push("\\n"),m(),z++;break;default:i(A)?h.push(g.length):l=!0,g.push(A)}}if(n.length!=0)throw o(new Error('Section "'+n[n.length-1].name+'" was not closed properly'),b,z,c.file);m(),g.push('";',"\nreturn buffer;","\n} catch (e) { throw {error: e, line: line}; }");var H=g.join("").replace(/buffer \+= "";\n/g,"");return c.debug&&(typeof console!="undefined"&&console.log?console.log(H):typeof print=="function"&&print(H)),H}function s(a,b){var c="view,partials,stack,lookup,escapeHTML,renderSection,render",d=r(a,b),e=new Function(c,d);return function(c,d){d=d||{};var f=[c];try{return e(c,d,f,p,n,q,w)}catch(g){throw o(g.error,a,g.line,b.file)}}}function u(){t={}}function v(a,b){return b=b||{},b.cache!==!1?(t[a]||(t[a]=s(a,b)),t[a]):s(a,b)}function w(a,b,c){return v(a)(b,c)}a.name="mustache.js",a.version="0.5.0-dev",a.tags=["{{","}}"],a.parse=r,a.compile=v,a.render=w,a.clearCache=u,a.to_html=function(a,b,c,d){var e=w(a,b,c);if(typeof d!="function")return e;d(e)};var b=Object.prototype.toString,c=Array.isArray,d=Array.prototype.forEach,e=String.prototype.trim,f;c?f=c:f=function(a){return b.call(a)==="[object Array]"};var g;d?g=function(a,b,c){return d.call(a,b,c)}:g=function(a,b,c){for(var d=0,e=a.length;d<e;++d)b.call(c,a[d],d,a)};var h=/^\s*$/,j;if(e)j=function(a){return a==null?"":e.call(a)};else{var k,l;i(" ")?(k=/^\s+/,l=/\s+$/):(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),j=function(a){return a==null?"":String(a).replace(k,"").replace(l,"")}}var m={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},t={}})(Mustache);
var speaker_template = "<div class='tb-title'>{{title}}</div><div class='tb-name'>{{name}}</div>";
var register_template = "<a href='http://scheduler.jsconf.com/schedule/{{day}}/{{slot}}' class='tb-register'>Register For This Slot</a>";


function render_track_b(data) {
	var max = data.max;
	for (var day = 0; day < data.lineup.length; day++) {
		for (var slot = 0; slot < max; slot++)	{
			var block;
			if (data.lineup[day][slot]) {
				var curr = data.lineup[day][slot];
				block = Mustache.render(speaker_template, { name: curr.name, title: curr.title });
			}  else {
				block = Mustache.render(register_template, { day: day, slot: slot});
			}
			var target = "#tb-"+day+"-"+slot;
			$(target).html(block).addClass(slot % 2 ? 'bottom' : 'top');
		}
	}
	
}


var target;

$(function () {
	render_track_b({
  "max": 20,
  "year": 2012,
  "lineup": [
    [{
      "name": "Carter Rabasa",
      "title": "Use JS to Send an SMS or Make a Phone Call. WAT?!?"
    }, {
      "name": "Addison Higham",
      "title": "Making the web an awesomer place for all"
    }, {
      "name": "Bradley Meck",
      "title": "Load Balancing with Node.js"
    }, {
      "name": "Doug Hughes",
      "title": "CoolBeans! Or, Flying Upside Down"
    }, {
      "name": "Mike Taylor and Rick Waldron",
      "title": "The W3C Script Library Community Group"
    }, {
      "name": "Ben Alman",
      "title": "What is \"grunt\" and why shoul I use it for like, every JavaScript project, ever?"
    }, {
      "name": "Chris Helm",
      "title": "Geospatial Visualization and Analysis with Javascript and HTML5"
    }, {
      "name": "Alex Sexton",
      "title": "JavaScript Internationalization for Winners"
    }, {
      "name": "Sam Bisbee",
      "title": "Hooking Up Your Front End to CouchDB in 10min"
    }, {
      "name": "Adam Crabtree",
      "title": "Tiki, the First Ever Browser Package Manager"
    }, {
      "name": "Jonathan Gottfried",
      "title": "Securing Your Node App With 2-Factor Auth Using Socket.io and Twilio"
    }, {
      "name": "Malte Ubl",
      "title": "Transforming JavaScript with Java like God intended"
    }, {
      "name": "Adam Ahmed",
      "title": "Reusable Everything: Saving time with AMD and Eve.js"
    }, {
      "name": "Jamund Ferguson",
      "title": "JavaScript as a Subculture"
    }, {
      "name": "Sam Breed",
      "title": "Modules For the Rest of Us"
    }, {
      "name": "Nicole Sullivan",
      "title": "Don't Feed the Trolls"
    }, {
      "name": "Brad Dunbar",
      "title": "Lumbar Support - Dos and Don'ts for your Backbonejs App"
    }, {
      "name": "Gabriel Grant",
      "title": "Hello *real* world: building hybrid applications with JS"
    }, {
      "name": "Dave Geddes",
      "title": "Modular JavaScript"
    }, {
      "name": "James Burke",
      "title": "Bootstrapping web projects using GitHub and volo"
    }],
    [{
      "name": "Kevin Whinnery",
      "title": "Ending the Web Versus Native Debate"
    }, {
      "name": "Aaron Ackerman",
      "title": "The Life and Times of a Software Application"
    }, {
      "name": "Matt Pizzimenti",
      "title": "Your Javascript Widget Won't Survive 3M+ Daily Visits"
    }, {
      "name": "Christopher Thorn",
      "title": "TBA"
    }, {
      "name": "Daniel Beauchamp & Edward Ocampo-Gooding",
      "title": "Open Data + Batman.js = yeah! yeah! yeah!"
    }, {
      "name": "Panos Astithas",
      "title": "Debugging Boot to Gecko"
    }, {
      "name": "Ralph Holzmann",
      "title": "Enjoying the View with Live Bindings"
    }, {
      "name": "Austin McDaniel",
      "title": "Progressive Loading with Steal"
    }, {
      "name": "John-David Dalton",
      "title": "The hidden cost of JavaScript natives."
    }, {
      "name": "Tom Occhino",
      "title": "The importance of good APIs"
    }, {
      "name": "Julien Lecomte",
      "title": "Shaker: asset rollup management made easy"
    }, {
      "name": "Nicholas Matsakis",
      "title": "PJs: Parallel JavaScript"
    }, {
      "name": "Ray Daly",
      "title": "StartupBus: 3 days of hackaton. Why code on the road."
    }, {
      "name": "Itay Neeman",
      "title": "Splunk + JavaScript: bringing your data to life"
    }, {
      "name": "Solomon Hykes",
      "title": "The World after Rails"
    }, {
      "name": "James Greene",
      "title": "Extending jQuery's Event System to Create Custom Events"
    }, {
      "name": "Nuno Job",
      "title": "TBA"
    }, {
      "name": "Rich Manalang ",
      "title": "Backbone Brace"
    }, {
      "name": "David Guttman",
      "title": "How-to: Sound Reactive Visuals"
    }, {
      "name": "John K paul",
      "title": "jQuery Plugin Unit Testing"
    }]
  ]
});
/*

  $.getJSON("http://scheduler.jsconf.com/schedule.json?callback=?", render_track_b);
	$(document).on("click", "a.tb-register", function (e) {
		e.stopPropagation(); e.preventDefault();
		target = $(this).attr("href");
		$("#trackb-registration").modal({
		  maxWidth: 850,
		  minHeight: 384,
      onShow: function () {
		    var h = $("#trackb-registration").height();
        $("#simplemodal-container").css({height: h+24});      
      }
		});
	})
	
	$(document).on("submit", "form.tb", function (e) {
    e.preventDefault(); e.stopPropagation();
    var that = $(this);
    var qs = that.formSerialize();

    $.getJSON(target+"?"+qs+"&callback=?", function (data) {
      if (data.errors) {
          $(".err", that).remove();
         var errors = '<div class="err"><h5>Woah There Partner</h5><ul><li>'+data.errors.join("</li><li>")+'</li></div>';
         $("h5", that).after(errors);
         var h = $("#trackb-registration").height();
         $("#simplemodal-container").css({height: h+24});
         $.modal.setPosition();
         // recenter
      } else {
        $.modal.close();
        render_track_b(data);
        
      }
    });
    return false;
  });
*/
});

