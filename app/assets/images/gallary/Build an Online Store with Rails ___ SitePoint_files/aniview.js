(function(n){n.avPlayer=function(a){function z(){var c=document.getElementById(a.position).parentNode||"BODY"!=document.getElementById(a.position).parentNode.tagName?document.getElementById(a.position).parentNode.clientWidth:document.body.clientWidth||screen.width;4E3<Math.floor(c)&&(c=4E3);var d=Math.floor(c/1.777);0==a.height&&100==a.width&&(a.height=d,a.width=c,c=(navigator&&navigator.userAgent&&-1<navigator.userAgent.toLowerCase().indexOf("firefox")?0:document.documentElement.clientHeight)||document.body.clientHeight||
screen.height,a.height>c&&(a.height=c,a.width=Math.floor(1.77*c)));a.width=Math.floor(a.width);a.height=Math.floor(a.height)}function D(c){e.subscribe(function(a,k,u){var d;for(d=0;d<arguments.length;d++);for(d=0;d<l[c].length;d++)l[c][d].charAt(0).toUpperCase(),l[c][d].slice(1);if("AdEvent"==c&&"function"==typeof b.onEvent)b.onEvent(a,k,u);if("AdLoaded"==c&&(b.AdLoaded=!0,"function"==typeof b.onLoad))b.onLoad();if("AdImpression"==c&&(b.playing=!0,"function"==typeof b.onPlay))b.onPlay(a);if("AdVideoFirstQuartile"==
c&&"function"==typeof b.onPlay25)b.onPlay25();if("AdVideoMidpoint"==c&&"function"==typeof b.onPlay50)b.onPlay50();if("AdVideoThirdQuartile"==c&&"function"==typeof b.onPlay75)b.onPlay75();if("AdVideoComplete"==c&&(b.playing=!1,"function"==typeof b.onPlay100))b.onPlay100();if("AdClickThru"==c&&"function"==typeof b.onClick)b.onClick();if("AdPaused"==c&&"function"==typeof b.onPause)b.onPause();if("AdPlaying"==c&&"function"==typeof b.onResume)b.onResume();if("AdError"==c&&(b.playing=!1,"function"==typeof b.onError))b.onError(a);
if("AdStopped"==c&&(b.playing=!1,"function"==typeof b.onStopped))b.onStopped();if("AdSkipped"==c&&(b.playing=!1,"function"==typeof b.onSkip))b.onSkip();if("AdClosed"==c&&(b.playing=!1,"function"==typeof b.onClose))b.onClose(a);if("AdVolumeChange"==c){d=b.muted;"undefined"!==typeof e.adVolume&&(b.muted=!(0<e.adVolume));if(d==b.muted)return;"function"!=typeof b.onUnmute||b.muted?"function"==typeof b.onMute&&b.muted&&(b.onMute(),b.muted=!0):(b.onUnmute(),b.muted=!1)}if("ContentImpression"==c&&(b.contentPlaying=
!0,"function"==typeof b.onContentPlay))b.onContentPlay(a);if("ContentComplete"==c&&(b.contentPlaying=!1,"function"==typeof b.onContentPlay100))b.onContentPlay100();if("ContentPaused"==c&&"function"==typeof b.onContentPaused)b.onContentPaused();if("ContentPlaying"==c&&"function"==typeof b.onContentPlaying)b.onContentPlaying();if("ContentClick"==c&&"function"==typeof b.onContentClick)b.onContentClick();if("Inventory"==c&&"function"==typeof b.onInventory)b.onInventory();if("InventoryRequest"==c&&"function"==
typeof b.onInventoryRequest)b.onInventoryRequest(a);v.dispatch(c,a,k,u)},c)}var v=new function(){var a={};this.subscribe=function(c,b,e){a[b]||(a[b]=[]);a[b].push({callback:c,context:e})};this.unsubscribe=function(c,b){if("*"==b)a={};else if(a[b])if("*"==c)a[b]=[];else for(var d=0;d<a[b].length;d++)if(a[b][d].callback===c){a[b].splice(d,1);break}};this.dispatch=function(c,b,e,g){if(a[c])for(var d=0;d<a[c].length;d++)if(a[c][d]&&"function"===typeof a[c][d].callback)try{a[c][d].callback.call(a[c][d].context,
b,e,g)}catch(m){}}},e,q;var b=this;b.AdLoaded=!1;b.playing=!1;b.contentPlaying=!1;b.muted=!0;var h=null,r=null,A=null,w="track1.aniview.com";a.publisherId&&(a.publisherId=a.publisherId.trim());a.channelId&&(a.channelId=a.channelId.trim());a.trackDomain&&(w=a.trackDomain);if(a.adServerDomain&&a.wl){var x=a.adServerDomain.indexOf(".");-1<x&&(w=a.adServerDomain.substring(0,x)+"t"+a.adServerDomain.substring(x,100))}(new Image).src="https://"+w+"/track?pid="+a.publisherId+"&cid="+a.channelId+"&e=playerStarted&cb="+
Date.now();var l={AdLoaded:[],AdStarted:[],AdStopped:[],AdSkipped:[],AdClosed:[],AdSkippableStateChange:["adSkippableState"],AdSizeChange:["adWidth","adHeight"],AdLinearChange:["adLinear"],AdDurationChange:["adDuration","adRemainingTime"],AdExpandedChange:["adExpanded"],AdRemainingTimeChange:["adRemainingTime"],AdVolumeChange:["adVolume"],AdImpression:[],AdVideoStart:[],AdVideoFirstQuartile:[],AdVideoMidpoint:[],AdVideoThirdQuartile:[],AdVideoComplete:[],AdClickThru:[],AdInteraction:[],AdUserAcceptInvitation:[],
AdUserMinimize:[],AdUserClose:[],AdPaused:[],AdPlaying:[],AdLog:[],AdError:[],ContentImpression:[],ContentComplete:[],ContentPaused:[],ContentPlaying:[],ContentClick:[],Inventory:[],InventoryRequest:[],AdEvent:[]};document.getElementById("videoSlot");if(f&&f.parentNode){f.parentNode.removeChild(f);var f=null}f=document.createElement("iframe");f.setAttribute("id","AVLoader"+a.position);f.style.display="none";f.src="about:blank";var E=function(){var c;if(a.baseJsUrl||""==a.baseJsUrl)var b=a.baseJsUrl;
else b="https://player.aniview.com/script/6.1/",a.bundle=!1;b=a.bundle?b+"av.js":b+"AVmanager.js";try{q=f.contentWindow.document.createElement("script");q.src=b;q.type="text/javascript";var k=function(){if("function"===typeof f.contentWindow.getVPAIDAd){e=f.contentWindow.getVPAIDAd();for(c in l)l.hasOwnProperty(c)&&D(c);z();"undefined"===typeof a.hideControls&&(a.hidecontrols=!1);a.slot=document.getElementById(a.position);a.videoSlot=document.getElementById("videoSlot");a.videoSlotCanAutoPlay=!0;
a.getviewability=A;e.initAd(a.width,a.height,"normal","","",a)}};q.onload=function(){k()};f.contentWindow.document.body.appendChild(q)}catch(u){}};b.play=function(){if(!b.playCalled){b.playCalled=!0;document.body&&"function"===typeof document.body.appendChild?document.body.appendChild(f):document.getElementById(a.position).appendChild(f);var c=f.contentWindow.document.open();f.contentWindow.avCallback=E;c.write('<html><body onload="window.avCallback();"></body></html>');f.contentWindow.document.close()}};
b.startAd=function(){b.AdLoaded&&e.startAd()};b.setWaterfallState=function(a,b){e&&"function"===typeof e.setWaterfallState&&e.setWaterfallState(a,b)};b.unmute=function(a){e&&e.setAdVolume(a?a:1)};b.mute=function(){try{e&&e.setAdVolume(0)}catch(c){}};b.pause=function(){e&&e.pauseAd()};b.resume=function(){e&&e.resumeAd()};b.close=function(){e&&"function"===typeof e.stopAd&&e.stopAd();setTimeout(function(){try{f&&(document.body.removeChild(f),e=f=null)}catch(c){}},3E3)};b.getEvents=function(){var a=
[],b;for(b in l)a.push(b);return a};b.updateGui=function(a){try{if("object"==typeof a)for(var c in a){var b=c.toLowerCase();f.contentWindow.AV_PlayerGui.config[b]=a[c];f.contentWindow.AV_PlayerGui.config[c]=a[c];"showTimeline"==c&&"function"===typeof f.contentWindow.AV_PlayerGui.showTimeline&&f.contentWindow.AV_PlayerGui.showTimeline(a[c])}}catch(u){}};b.resize=function(a,b,k){k||(k="normal");e&&e.resizeAd(Math.floor(a),Math.floor(b),k)};b.getAdDuration=function(){if(e)return e.getAdDuration()};b.getAdRemainingTime=
function(){if(e)return e.getAdRemainingTime()};b.getAdVolume=function(){if(e)return e.getAdVolume()};b.setAdVolume=function(a){if(e)return e.setAdVolume(a)};b.seek=function(a){if(e)return e.seekAd(a)};b.getContentPaused=function(){if(e)return e.getContentPaused()};this.pauseContent=function(){if(e)return e.pauseContent()};this.resumeContent=function(){if(e)return e.resumeContent()};this.setContentVolume=function(a){if(e)return e.setContentVolume(a)};this.on=function(a,b,e){v.subscribe(b,a,e)};this.off=
function(a,b){v.unsubscribe(b,a)};var C=function(){function a(){var a=m.getVieabilityInfo(g.el,g.wnd,g.iframe?g.baseEl:null),b=a.vertical.value*a.horizontal.value;return{inView:b>f,ratio:b,state:a.vertical.state,distance:a.vertical.distance}}function b(){var b=a();e&&e(b.inView,b.ratio,b.state,b.distance)}var e=null,f=.5,g=null,h=!1,m=this;this.checkViewability=function(){b()};this.start=function(a,c,d,k){if(h)return!1;a:{var p=null;a="object"==typeof a?a:document.getElementById(a);try{if(p=n.frameElement)for(var y,
t=n;t!==n.top;){y=p.ownerDocument;t=y.defaultView||y.parentWindow;if(t===n.top){var B=t;var m=p;break}p=t.frameElement}}catch(H){h=!0;g=null;break a}if(null==p){m=a;if(!m){h=!0;g=null;break a}B=n}g={el:m,wnd:B,baseEl:a,iframe:null!=p&&k}}if(!g)return!1;d&&(f=d);c&&(g.wnd.addEventListener("resize",b,!0),g.wnd.addEventListener("scroll",b,!0),e=c,setTimeout(b,10));return!0};this.stop=function(){e&&(g.wnd.removeEventListener("resize",b,!0),g.wnd.removeEventListener("scroll",b,!0),e=null)};this.get=function(b,
c){return!h&&g?a():{inView:!1,ratio:0,state:"UNKNOWN"}};this.getHorizontalViewability=function(a,b){b=b.innerWidth;var c=a.getBoundingClientRect().left;a=a.getBoundingClientRect().right;var d=a-c;return c>b?{value:0,state:"OUT_RIGHT"}:0>=a?{value:0,state:"OUT_LEFT"}:0<=c&&a<=b?{value:1,state:"IN_HVIEW"}:0>c&&a>b?{value:b/d,state:"LR_TRUNC"}:0>c&&a<=b?{value:a/d,state:"L_TRUNC"}:0<=c&&a>b?{value:(b-c)/d,state:"R_TRUNC"}:{value:0,state:"OUT"}};this.getVerticalViewability=function(a,b,c){b=b.innerHeight;
var d=a.getBoundingClientRect().top;a=a.getBoundingClientRect().bottom;var e=a-d;c&&(d+=c.getBoundingClientRect().top,a=d+(c.getBoundingClientRect().bottom-c.getBoundingClientRect().top),e=a-d);return d>b?{value:0,state:"OUT_BOTTOM",out:-1}:0>=a?{value:0,state:"OUT_TOP",out:-1}:0<=d&&a<=b?{value:1,state:"IN_VVIEW",out:0,distance:b-d}:0>d&&a>b?{value:b/e,state:"BT_TRUNC",out:-d+a-b}:0>d&&a<=b?{value:a/e,state:"T_TRUNC",out:-d}:0<=d&&a>b?{value:(b-d)/e,state:"B_TRUNC",out:a-b}:{value:0,state:"OUT",
out:-1}};this.getVieabilityInfo=function(a,b,c){return{vertical:m.getVerticalViewability(a,b,c),horizontal:m.getHorizontalViewability(a,b,c)}}};this.startViewability=function(a,b,e,f){h||(h=new C);return h.start(a,b,e,f)};this.stopViewability=function(){h&&h.stop()};this.getViewability=function(){if(h)return h.get()};A=function(a,b,e){if(a)return r||(r=new C,r.start(a,b,e)),r.get();r.stop()};(function(){var a=void 0,d=void 0;"undefined"!==typeof document.hidden?(a="hidden",d="visibilitychange"):"undefined"!==
typeof document.webkitHidden?(a="webkitHidden",d="webkitvisibilitychange"):"undefined"!==typeof document.mozHidden?(a="mozHidden",d="mozvisibilitychange"):"undefined"!==typeof document.msHidden&&(a="msHidden",d="msvisibilitychange");a&&document.addEventListener(d,function(c){document[a]&&b.mute()},!1)})();var F={addClass:function(b,d){(a.sticky&&0<a.sticky.size||a.floating&&0<a.floating.size)&&b.style.visibility&&(d+=";visibility:"+b.style.visibility+";");b.style.cssText=d},setfloatingCSS:function(){this.floatingCSS||
(a.floating.size||(a.floating.size=.5),a.floating.right||(a.floating.right=0),a.floating.bottom||(a.floating.bottom=0),this.floatingCSS=a.floating.floatingCSS||"z-index:10000001;position:fixed; bottom:"+a.floating.bottom+"px; right:"+a.floating.right+"px; -webkit-transform:scale("+a.floating.size+"); -webkit-transform-origin:bottom right; transform:scale("+a.floating.size+"); transform-origin:bottom right")},setStickyCSS:function(){if(!this.stickyCSS){var b=.5,d=0,e=0,f=0,g=0;a.sticky.size&&(b=a.sticky.size);
a.sticky.right&&(d=a.sticky.right);a.sticky.bottom&&(e=a.sticky.bottom);a.sticky.top&&(f=a.sticky.top);a.sticky.left&&(g=a.sticky.left);switch(a.sticky.position){case "Bottom-Right":this.stickyCSS="z-index:10000001;position:fixed; bottom:"+e+"px; right:"+d+"px; -webkit-transform:scale("+b+"); -webkit-transform-origin:bottom right; transform:scale("+b+"); transform-origin:bottom right";break;case "Bottom-Left":this.stickyCSS="z-index:10000001;position:fixed; bottom:"+e+"px; left:"+g+"px; -webkit-transform:scale("+
b+"); -webkit-transform-origin:bottom left; transform:scale("+b+"); transform-origin:bottom left";break;case "Top-Left":this.stickyCSS="z-index:10000001;position:fixed; top:"+f+"px; left:"+g+"px; -webkit-transform:scale("+b+"); -webkit-transform-origin:top left; transform:scale("+b+"); transform-origin:top left";break;case "Top-Right":this.stickyCSS="z-index:10000001;position:fixed; top:"+f+"px; right:"+d+"px; -webkit-transform:scale("+b+"); -webkit-transform-origin:top right; transform:scale("+b+
"); transform-origin:top right"}}},getPlaceholderWidth:function(b){b=b.parentNode||"BODY"!=b.parentNode.tagName?b.parentNode.clientWidth:document.body.clientWidth||screen.width;4E3<b&&(b=4E3);100!=a.width&&0!=a.height?b=a.width:(a.height=Math.floor(b/1.777),a.width=b);return b},hidePlayer:function(c,d,e){c&&(c.style.width=this.getPlaceholderWidth(c)+"px",c.style.height="1px",e?setTimeout(function(){b.playing||(c.style.opacity=0)},1E3):c.style.opacity=0,a.sticky&&0<a.sticky.size||a.floating&&0<a.floating.size)&&
(d.style.visibility="hidden")},showPlayer:function(c,d){if(a.sticky&&0<a.sticky.size||a.floating&&0<a.floating.size)d.style.visibility="";a.sticky&&0<a.sticky.size||(c&&(c.style.width=this.getPlaceholderWidth(c)+"px",c.style.height=a.height+"px"),b.resize(a.width,a.height),d.style.zIndex="9999999");c&&(c.style.opacity="")},startAd:function(){this.playerInView&&this.playerLoadedFirstTime&&!a.clickToPlay&&b.startAd()},startViewability:function(c){var d=this,e=!1,f=!1;a.floting&&!a.floating&&(a.floating=
a.floting);if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,
4)))f=!0;a.preloader||(a.preloader={});z();var g=document.querySelector("#"+a.position);c&&d.addClass(c,"overflow:hidden; -webkit-transition:1s ease height; transition:1s ease height;opacity:0;");a.floating&&0<a.floating.size&&d.setfloatingCSS();a.sticky&&0<a.sticky.size&&(a.playOnView=!1,d.setStickyCSS());(a.playOnView&&!a.autoPlay&&!a.showPlayer||a.openAnim)&&d.hidePlayer(c,g);a.showPlayer&&d.showPlayer(c,g);b.on("AdLoaded",function(){d.playerLoadedFirstTime=!0;d.startAd()});b.on("AdImpression",
function(){c&&(c.style.opacity="");a.sticky&&0<a.sticky.size&&""!=a.preloader.type&&d.addClass(g,d.stickyCSS);d.showPlayer(c,g);a.unMuteOnMouseEnter&&!f&&(g.addEventListener("mouseenter",function(a){setTimeout(function(){b.unmute()},5)}),g.addEventListener("mouseleave",function(a){setTimeout(function(){b.mute()},5)}));a.pauseOnBlur&&!f&&n.addEventListener("blur",function(){setTimeout(function(){b.pause()},500)});if(a.playOnView)try{h.checkViewability()}catch(m){}});b.on("AdVideoComplete",function(){a.lastFrame||
a.preloader.type||d.hidePlayer(c,g,!0);0==a.autoPlayLoop&&(d.startAdFirstTime=!1,e&&d.startAd())});b.on("AdSkipped",function(){(!a.preloader||"content"!=a.preloader.type&&"Image"!=a.preloader.type&&"js"!=a.preloader.type)&&d.hidePlayer(c,g,!0)});b.on("AdClosed",function(){d.hidePlayer(c,g)});b.on("AdError",function(b){b=b&&b.errorlimit;a.preloader.type||a.passbackUrl?a.passbackUrl&&(a.playOnView||a.passbackpriority)&&b&&d.showPlayer(c,g):d.hidePlayer(c,g)});if(a.playOnView){var l=.5;a.inViewRatio&&
(l=a.inViewRatio);b.startViewability(c,function(f,h,k,l){if(f&&a.playOnViewPerc&&0<a.playOnViewPerc){var m=100-100*(a.height-l)/a.height;0<m&&m<a.playOnViewPerc&&(f=!1)}if("function"===typeof b.onViewabilityChanged)try{b.onViewabilityChanged(f,h,k,l)}catch(G){}if(f){if(e=!0,!a.preloader.type||d.playerInView||0!=a.Preroll||a.hideInitPreloader||d.showPlayer(c,g),d.playerInView=!0,b.playing||(d.startAd(),"content"==a.preloader.type&&a.showPlayer&&a.autoPlayContent&&b.resumeContent()),b.playing||""!=
a.preloader.type&&a.preloader.type)a.pauseOnUnseen&&b.resume(),d.addClass(g,"")}else if(e=!1,(b.playing||b.contentPlaying||""!=a.preloader.type&&a.preloader.type&&!a.preloader.noFloatIdle)&&a.pauseOnUnseen&&b.pause(),a.floating&&0<a.floating.size)switch(k){case "T_TRUNC":case "OUT_TOP":d.addClass(g,d.floatingCSS);break;case "B_TRUNC":case "OUT_BOTTOM":a.floating.floatOnBottom&&d.addClass(g,d.floatingCSS)}},l,a.iframeViewability)}else a.sticky&&0<a.sticky.size&&(""==a.preloader.type||a.hideInitPreloader?
(d.addClass(g,d.stickyCSS),d.hidePlayer(c,g)):d.addClass(g,d.stickyCSS)),d.startAdFirstTime=!1,d.playerInView=!0,d.playerLoadedFirstTime=!0,d.startAd(),c&&(c.style.opacity=""),a.hideInitPreloader?d.hidePlayer(c,g):d.showPlayer(c,g)}};b.startTemplate=function(a){F.startViewability(a)}}})(window);
