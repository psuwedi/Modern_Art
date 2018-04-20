
(function () {
/*tagconfig*/

var a = {
		publisherId: "5961f0e6073ef42d7843d002",
		channelId: "5a30fb2728a06159ea245973",
		width: 100,
		height: 0,
		errorLimit: 5,
		passbackUrl: "",
		lastFrame: false,
		nativevideo: true,
		playOnViewPerc: 60,
		timelineChange: true,
		HD: !0,
		autoPlay: false,
		Preroll: 0,
		midrolltime: 5,
		vastRetry: 5,
		loop: true,
		logo: true,
		timelineMode: "bottom",
		soundButton: true,
		pauseButton: true,
		maximp: 2,
		maxrun: 9999,
		preloader: {
			type: "",
			link: "",
			clickthrough: ""
		},
		customLogo: {
			link: "https://hoolymedia.com",
			height: "5",
			width: "5",
			text: "Ads by Hooly",
			clickthrough: "https://hoolymedia.com"
		},
		playOnView: true,
		pauseOnBlur: false,
		unMuteOnMouseEnter: false,
		floating: {
			size: 0,
			right: 0,
			bottom: 0
		},
		customCSS: "#aniBox { margin:15px 0; }",
		pauseOnUnseen: false,
		closeButton: false,
		skipTimer: 7,
		skip: true,
		skipText: "skip",
		scriptId: "aniviewJS",
		posId: "",
		posTag: "",
		maxWidth: "544",
		templateType: "1",
		position: "aniplayer_aniviewJS"
};

/*tagconfig*/

function run() {
	(new Image).src = "https://track1.aniview.com/track?pid=" + a.publisherId + "&cid=" + a.channelId + "&e=playerLoaded&cb=" + Date.now();
	var posRetry = 0;
	if(!a.posTimeout)
		a.posTimeout = 40;
	var AV_topElement;

	function AV_getParams(b) {
		var scripts = document.getElementsByTagName("script");
		for (var d = "", c = 0; c < scripts.length; c++)
			if (-1 < scripts[c].id.indexOf(b))
				if (d = scripts[c].src.split("?").pop())
					break;
				else
					return "";
		return d
	}
	a.ref1 = AV_getParams(a.scriptId);

	function AV_getTopElement(p1, p2) {
		try {
			if(( p1 == "" && p2 == "" ) || (window === top))
				return document;
			if(window.frameElement == null)
				return document;
			return window.top.document;
			
		} catch (f) {
			return document;
		}
	}
	function AV_loadJS(b, d, c) {
		var scp = AV_topElement.createElement("script");
		scp.src = b;
		scp.onload = d;
		scp.onreadystatechange = d;
		scp.async = true;
		c.appendChild(scp)
	}
	function AV_StartPlayer() {
		if (parent.avPlayer) {
			var b = new parent.avPlayer(a);
		} else {
			var b = new avPlayer(a);
		}
		if(a.templateType != 0)
			b.startTemplate(AV_topElement.getElementById(a.position).parentNode);
		b.play(a);
	}
	 
	function AV_posRetry(callback, args) {
		posRetry++;
		if(posRetry > a.posTimeout)
			return;
		
		setTimeout(function() {
			callback.apply(null, args);
		}, 250);
	}
	function AV_setPosition(doc, p1, p2) {
		function createPlayer(p) {
			var d1 = document.createElement("div");
			d1.style.width = "100%";
			d1.style.margin = "0 auto";
			d1.style.maxWidth = "" + a.maxWidth + "px";

			var d2 = document.createElement("div");
			d2.id = "aniBox";
			d2.style.height = "1px";

			var d3 = document.createElement("div");
			d3.id = ""+a.position;
			if(!doc.body) 
				doc.documentElement.appendChild(doc.createElement("body"));
			if(p === doc)
				p.body.appendChild(d1);
			else
				p.appendChild(d1);
			d1.appendChild(d2);
			d2.appendChild(d3);		
		}
		var p = doc; 
		if(p2) {
			p = doc.getElementById(p2);
			if(!p) {
				AV_posRetry(AV_setPosition, arguments);
				return;
			}
		}
		if(p1) {
			var c = p1.split("#");
			if(c && c.length == 2) {
				var e = p.getElementsByTagName(c[0]);
				if(e.length == 0) {
					AV_posRetry(AV_setPosition, arguments);
					return;				
				}
				p = e[Math.min(c[1] - 1, e.length-1)];
			}
		}
		if(p === doc) {
			var n = doc.getElementById(a.scriptId);
			if(n)
				p = n.parentNode;
		}
		if(p === doc.head)
			p = doc;		
		createPlayer(p);	
		AV_loadJS("https://player.aniview.com/script/6.1/aniview.js", AV_StartPlayer, AV_topElement.body);
	};
	AV_topElement = AV_getTopElement(a.posTag, a.posId);
	AV_setPosition(AV_topElement, a.posTag, a.posId);
}
if(!window.aniplayerPos)
	window.aniplayerPos = {};
if(window.aniplayerPos[a.position])
	return;
window.aniplayerPos[a.position] = true;
run();

})();

