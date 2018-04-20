!function(e,t,n){function a(e,t){return typeof e===t}function i(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):p?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function s(){var e=t.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function c(e,n,a,r){var o,c,l,d,u="modernizr",f=i("div"),p=s();if(parseInt(a,10))for(;a--;)l=i("div"),l.id=r?r[a]:u+(a+1),f.appendChild(l);return o=i("style"),o.type="text/css",o.id="s"+u,(p.fake?p:f).appendChild(o),p.appendChild(f),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),f.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",d=m.style.overflow,m.style.overflow="hidden",m.appendChild(p)),c=n(f,e),p.fake?(p.parentNode.removeChild(p),m.style.overflow=d,m.offsetHeight):f.parentNode.removeChild(f),!!c}var l=[],d=[],u={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){d.push({name:e,fn:t,options:n})},addAsyncTest:function(e){d.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=u,(Modernizr=new Modernizr).addTest("ie8compat",!e.addEventListener&&!!t.documentMode&&7===t.documentMode),Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var f=u._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];u._prefixes=f;var m=t.documentElement,p="svg"===m.nodeName.toLowerCase();p||function(e,t){function n(e,t){var n=e.createElement("p"),a=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",a.insertBefore(n.lastChild,a.firstChild)}function a(){var e=w.elements;return"string"==typeof e?e.split(" "):e}function o(e){var t=y[e[g]];return t||(t={},v++,e[g]=v,y[v]=t),t}function i(e,n,a){if(n||(n=t),u)return n.createElement(e);a||(a=o(n));var r;return!(r=a.cache[e]?a.cache[e].cloneNode():h.test(e)?(a.cache[e]=a.createElem(e)).cloneNode():a.createElem(e)).canHaveChildren||p.test(e)||r.tagUrn?r:a.frag.appendChild(r)}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return w.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+a().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(w,t.frag)}function l(e){e||(e=t);var a=o(e);return!w.shivCSS||d||a.hasCSS||(a.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),u||c(e,a),e}var d,u,m=e.html5||{},p=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",v=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",d="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return void 0===e.cloneNode||void 0===e.createDocumentFragment||void 0===e.createElement}()}catch(n){d=!0,u=!0}}();var w={elements:m.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:"3.7.3",shivCSS:!1!==m.shivCSS,supportsUnknownElements:u,shivMethods:!1!==m.shivMethods,type:"default",shivDocument:l,createElement:i,createDocumentFragment:function(e,n){if(e||(e=t),u)return e.createDocumentFragment();for(var r=(n=n||o(e)).frag.cloneNode(),i=0,s=a(),c=s.length;c>i;i++)r.createElement(s[i]);return r},addElements:function(e,t){var n=w.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),w.elements=n+" "+e,l(t)}};e.html5=w,l(t),"object"==typeof module&&module.exports&&(module.exports=w)}(void 0!==e?e:this,t),Modernizr.addTest("csspositionsticky",function(){var e="position:",t="sticky",a=i("a").style;return a.cssText=e+f.join(t+";"+e).slice(0,-e.length),-1!==a.position.indexOf(t)}),Modernizr.addTest("inlinesvg",function(){var e=i("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var h={}.toString;Modernizr.addTest("svgclippaths",function(){return!!t.createElementNS&&/SVGClipPath/.test(h.call(t.createElementNS("http://www.w3.org/2000/svg","clipPath")))});var g=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return c("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();u.mq=g,u.testStyles=c,function(){var e,t,n,r,o,i,s;for(var c in d)if(d.hasOwnProperty(c)){if(e=[],(t=d[c]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(r=a(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)i=e[o],1===(s=i.split(".")).length?Modernizr[s[0]]=r:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=r),l.push((r?"":"no-")+s.join("-"))}}(),function(e){var t=m.className,n=Modernizr._config.classPrefix||"";if(p&&(t=t.baseVal),Modernizr._config.enableJSClass){var a=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(a,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),p?m.className.baseVal=t:m.className=t)}(l),delete u.addTest,delete u.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);