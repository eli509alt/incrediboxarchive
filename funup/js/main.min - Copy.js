function preloadSound(a) {
    var b = a[0]
        , c = a[2]
        , d = a[3]
        , e = DIR + "./" + app.folder + "sound/" + cache(b)
        , f = new XMLHttpRequest;
    f.open("GET", e, !0), f.responseType = "arraybuffer", f.onload = function (b) {
        200 == f.status ? contextAudio.decodeAudioData(f.response, function (b) {
            a[1][c] = b, d()
        }, function (a) {
            errorTabToLoad(e)
        }) : errorTabToLoad(e)
    }, f.onerror = function () {
        errorTabToLoad(e)
    }, f.send()
}

function preloadVideo(a) {
    var b = a[0]
        , c = a[2]
        , d = a[3]
        , e = DIR + "./" + app.folder + "video/" + cache(b)
        , f = document.createElement("video");
    f.type = "video/mp4", f.setAttribute("muted", "muted"), f.setAttribute("playsinline", "playsinline"), f.setAttribute("webkit-playsinline", "webkit-playsinline");
    var g = new XMLHttpRequest;
    g.onload = function () {
        f.src = window.URL.createObjectURL(this.response), a[1][c] = f, d()
    }, g.onerror = function () {
        errorTabToLoad(e)
    }, g.open("GET", e), g.responseType = "blob", g.send()
}

function lockGesture() {
    gestureLocked || (gestureLocked = !0, document.addEventListener(evtPress, lockZoom, !1), document.getElementById("webapp")
        .addEventListener(evtMove, preventDefault, !1), checkMiniDevice() && !isPortrait() && recenterApp())
}

function windowPopup(a, b, c, d) {
    var e = d ? screen.height / 2 - c / 2 : 0
        , f = d ? screen.width / 2 - b / 2 : 0;
    window.open(a, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + b + ",height=" + c + ",top=" + e + ",left=" + f)
}

function simulerClickAudioIOS(a) {
    var b = this;
    return b = new SoundObject(contextAudio), b.prepare(a, 0), b.play(0), b.buffer = a, setTimeout(function () {
        b.stop()
    }, 10), needFirstClick = !1, b
}

function cache(a) {
    return uncache ? a + "?" + (new Date)
        .getTime() : a
}

function preventDefault(a) {
    a = a || window.event, a.preventDefault && a.preventDefault(), a.returnValue = !1
}

function disableScroll() {
    window.addEventListener && window.addEventListener("DOMMouseScroll", preventDefault, !1), window.ontouchmove = preventDefault
}

function enableScroll() {
    window.removeEventListener && window.removeEventListener("DOMMouseScroll", preventDefault, !1), window.ontouchmove = null
}

function hasNetwork() {
    return navigator.onLine
}

function lockZoom(a) {
    a.touches.length > 1 ? prevent(a) : 0 == cntTap ? (tap1 = (new Date)
        .getTime(), cntTap++, tapTimer = setTimeout(function () {
            cntTap = 0
        }, 300)) : (cntTap = 0, clearTimeout(tapTimer), prevent(a))
}

function prevent(a) {
    a.preventDefault()
}

function checkFileName(a) {
    var b = checkMiniDevice() ? miniFile(a) : a;
    return b
}

function checkMiniDevice() {
    return !!(isPortrait() && screen.width < 400) || !isPortrait() && screen.width < 700
}

function changeFileName(a, b) {
    var c = a.substr(a.lastIndexOf("."));
    return a.split(c)
        .join(b + c)
}

function miniFile(a) {
    var b = a.substr(a.lastIndexOf("."))
        , c = ".svg" != b ? a.split(b)
        .join("-mini" + b) : a;
    return c
}

function isPortrait() {
    if (isDevice) {
        var a = window.orientation;
        if (90 == a || a == -90) return !1
    }
    return !0
}

function checkOrientation() {
    var a = window.orientation;
    90 != a && a != -90 || checkMiniDevice() && recenterApp(), resizer.resize()
}

function recenterApp() {
    $("html, body")
        .animate({
            scrollTop: $("#webapp")
                .offset()
                .top - 10
        }, 500)
}

function getBrowser() {
    var a, b, c = navigator.userAgent || navigator.vendor || window.opera
        , d = "(?)";
    /(FBAN|FBIOS|FBAV|FBBV|FBID)/.test(c) ? d = "facebook" : /(Twitter|twitter)/.test(c) && (d = "twitter");
    var e = "(?)";
    /(Windows|Win16)/.test(c) ? e = "Windows" : /(Android)/.test(c) ? e = "Android" : /(iPhone|iPad|iPod)/.test(c) ? e = "iOS" : /(Mac OS X)/.test(c) ? e = "Mac OS X" : /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/.test(c) && (e = "Mac OS");
    var f = "(?)";
    /(Windows Phone|Windows phone)/.test(c) ? f = "Windows phone" : /(Windows|Win16)/.test(c) ? f = "PC" : /(Android)/.test(c) ? f = "Android" : /(iPad)/.test(c) ? f = "iPad" : /(iPhone)/.test(c) ? f = "iPhone" : /(iPod)/.test(c) ? f = "iPod" : /(Mac)/.test(c) && (f = "Mac");
    var g = "(?)";
    "Windows" == e ? /(Windows 10.0|Windows NT 10.0)/.test(c) ? g = "10" : /(Windows 8.1|Windows NT 6.3)/.test(c) ? g = "8.1" : /(Windows 8|Windows NT 6.2)/.test(c) ? g = "8" : /(Windows 7|Windows NT 6.1)/.test(c) ? g = "7" : /(Windows NT 6.0)/.test(c) ? g = "Vista" : /(Windows NT 5.2)/.test(c) ? g = "Server 2003" : /(Windows NT 5.1|Windows XP)/.test(c) ? g = "XP" : /(Windows NT 5.0|Windows 2000)/.test(c) ? g = "2000" : /(Win 9x 4.90|Windows ME)/.test(c) ? g = "ME" : /(Windows 98|Win98)/.test(c) ? g = "98" : /(Windows 95|Win95|Windows_95)/.test(c) ? g = "95" : /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/.test(c) ? g = "NT 4.0" : /(Windows CE)/.test(c) ? g = "CE" : /(Win16)/.test(c) && (g = "3.11") : "Android" == e ? (a = "Android", cursor = c.toLowerCase()
        .indexOf(a.toLowerCase()), b = parseFloat(c.slice(cursor + a.length, cursor + a.length + 6)), g = isNaN(b) ? g : b) : "iOS" == e ? (a = "OS", cursor = c.toLowerCase()
        .indexOf(a.toLowerCase()), b = c.slice(cursor + a.length, cursor + a.length + 6), b = parseFloat(b.replace("_", ".")), g = isNaN(b) ? g : b) : e.indexOf("Mac OS") != -1 && (a = e.indexOf("Mac OS X") != -1 ? "Mac OS X" : "Mac OS", cursor = c.toLowerCase()
        .indexOf(a.toLowerCase()), b = c.slice(cursor + a.length, cursor + a.length + 6), b = parseFloat(b.replace("_", ".")), g = isNaN(b) ? g : b);
    var h = 0;
    if ("iOS" == e && "iPhone" == f) {
        var i = window.screen.width
            , j = window.screen.height;
        320 == i && 480 == j && (h = 4), 320 == i && 568 == j && (h = 5), 375 == i && 667 == j && (h = 6), j > 667 && (h = 7)
    }
    var k, l, m, n = (navigator.appVersion, navigator.appName)
        , o = "" + parseFloat(navigator.appVersion)
        , p = parseInt(navigator.appVersion, 10);
    (l = c.indexOf("OPR/")) != -1 ? (n = "Opera", o = c.substring(l + 4)) : (l = c.indexOf("Opera")) != -1 ? (n = "Opera", o = c.substring(l + 6), (l = c.indexOf("Version")) != -1 && (o = c.substring(l + 8))) : (l = c.indexOf("Edge")) != -1 ? (n = "Microsoft Edge", o = c.substring(l + 5)) : (l = c.indexOf("MSIE")) != -1 ? (n = "Microsoft Internet Explorer", o = c.substring(l + 5)) : (l = c.indexOf("Trident")) != -1 ? (n = "Microsoft Internet Explorer", (l = c.indexOf("rv:")) != -1 && (o = c.substring(l + 3), trace(o))) : (l = c.indexOf("CriOS")) != -1 && /iphone|ipod|ipad/i.test(c) ? (n = "Google Chrome for IOS", o = c.substring(l + 6)) : (l = c.indexOf("Chrome")) != -1 ? (n = "Google Chrome", o = c.substring(l + 7)) : (l = c.indexOf("Safari")) != -1 ? (n = "Safari", o = c.substring(l + 7), (l = c.indexOf("Version")) != -1 && (o = c.substring(l + 8))) : (l = c.indexOf("Firefox")) != -1 ? (n = "Mozilla Firefox", o = c.substring(l + 8)) : (k = c.lastIndexOf(" ") + 1) < (l = c.lastIndexOf("/")) && (n = c.substring(k, l), o = c.substring(l + 1), n.toLowerCase() == n.toUpperCase() && (n = navigator.appName)), (m = o.indexOf(";")) != -1 && (o = o.substring(0, m)), (m = o.indexOf(" ")) != -1 && (o = o.substring(0, m)), p = parseInt("" + o, 10), isNaN(p) && (o = "" + parseFloat(navigator.appVersion), p = parseInt(navigator.appVersion, 10));
    var q = {
        osname: e
        , osversion: g
        , device: f
        , deviceModel: h
        , name: n
        , webview: d
        , version: p
        , fullversion: o
        , appName: navigator.appName
        , userAgent: navigator.userAgent
    };
    return q
}

function getMobileOperatingSystem() {
    var a = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(a)) return "windows phone";
    if (/android/i.test(a)) return "android";
    if (!window.MSStream) {
        if (/iPad/.test(a)) return "ipad";
        if (/iPhone/.test(a)) return "iphone";
        if (/iPod/.test(a)) return "ipod"
    }
    return "unknown"
}

function isTouchDevice() {
    return "ontouchstart" in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
}

function isAndroidDevice() {
    return "android" == getMobileOperatingSystem()
}

function isIOSDevice() {
    return iPadDevice() || iPhoneDevice() || iPodDevice()
}

function iPadDevice() {
    return "ipad" == getMobileOperatingSystem()
}

function iPhoneDevice() {
    return "iphone" == getMobileOperatingSystem()
}

function iPodDevice() {
    return "ipod" == getMobileOperatingSystem()
}

function isMobile() {
    trace("width : " + window.screen.availWidth + " | height : " + window.screen.availHeight);
    var a = window.screen.availWidth
        , b = window.screen.availHeight;
    return a < 400 && b < 700 ? (trace("MOBILE DETECTED"), !0) : (trace("BORWSER or TABLET DETECTED"), !1)
}

function loadImg(a, b) {
    function c() {
        var a = e[g][0]
            , b = e[g][1]
            , c = new Image;
        c.onload = function () {
            c.width = c.width / 2, c.height = c.height / 2, $(b)
                .append(c), d()
        }, c.onerror = function () {
            errorTabToLoad(a)
        }, c.src = cache(a)
    }
    
    function d() {
        g++;
        var a = g == f ? b : c;
        a()
    }
    var e = "object" != typeof a[0] ? [a] : a
        , f = e.length
        , g = 0;
    c()
}

function countObj(a) {
    var b, c = 0;
    for (b in a) a.hasOwnProperty(b) && c++;
    return c
}

function gotoUrl(a) {
    var b = isnull(a) ? "" : a;
    window.location.href = b
}

function openURL(a, b) {
    b = isnull(b) ? "_self" : b, window.open(a, b)
}

function openURLFromIframe(a) {
    window.top.location.href = a
}

function redirectTo(a) {
    openURL("http://www.incredibox.com/php/ios-redirect-url.php?u=" + a)
}

function removeHash() {
    var a, b, c = window.location;
    "pushState" in history ? history.pushState("", document.title, c.pathname + c.search) : (a = document.body.scrollTop, b = document.body.scrollLeft, c.hash = "/", document.body.scrollTop = a, document.body.scrollLeft = b)
}

function getParameterByName(a, b) {
    b || (b = window.location.href), b = b.toLowerCase(), a = a.replace(/[\[\]]/g, "\\$&");
    var c = new RegExp("[?&]" + a + "(=([^&#]*)|&|#|$)")
        , d = c.exec(b);
    return d ? d[2] ? decodeURIComponent(d[2].replace(/\+/g, " ")) : "" : null
}

function getDateNow() {
    var a = new Date
        , b = a.getDate()
        , c = a.getMonth() + 1
        , d = a.getFullYear()
        , e = a.getHours()
        , f = a.getMinutes()
        , g = a.getSeconds();
    return b = b < 10 ? String("0" + b) : String(b), c = c < 10 ? String("0" + c) : String(c), e = e < 10 ? e = String("0" + e) : String(e), f = f < 10 ? f = String("0" + f) : String(f), g = g < 10 ? g = String("0" + g) : String(g), String(d + "-" + c + "-" + b + " " + e + ":" + f + ":" + g)
}

function jsonDecode(a) {
    if (isnull(a)) return null;
    var b = a.split("\t")
        .join("")
        .split("\n")
        .join("");
    return JSON.parse(b)
}

function jsonEncode(a) {
    return isnull(a) ? null : JSON.stringify(a)
}

function makeid() {
    for (var a = "", b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", c = b.length, d = 0; d < random(20) + 1; d++) a += b.charAt(Math.floor(Math.random() * c));
    return a
}

function random(a) {
    return Math.round(Math.random() * a)
}

function decimal(a, b) {
    b = isnull(b) ? 2 : b;
    var c = Math.pow(10, b);
    return Math.round(a * c) / c
}

function trim(a) {
    return isnull(a) ? "" : (a = a.replace(/\r+/g, ""), a = a.replace(/\t+/g, ""), a = a.replace(/\n+/g, ""), a = a.replace(/\s+/g, " "))
}

function die(a) {
    return alert(a), !0
}

function xhr(a, b, c, d, e) {
    $.ajax({
        type: a
        , url: b
        , crossdomain: !0
        , data: c
        , dataType: "json"
        , success: function (a) {
            d(a, c)
        }
        , error: function (a, b, c) {
            trace("AJAX error " + b + " / " + c), isnull(e) || e(b)
        }
    })
}

function ucwords(a) {
    return a.charAt(0)
        .toUpperCase() + a.slice(1)
}

function uniqid() {
    function a() {
        return Math.floor(65536 * (1 + Math.random()))
            .toString(16)
            .substring(1)
    }
    return a() + a() + a() + a() + a() + a()
}

function isnull(a) {
    return null === a || void 0 === a || "undefined" === a
}

function checkSupported() {
    var a = !!window.HTMLCanvasElement
        , b = window.AudioContext || window.webkitAudioContext || !1
        , c = "string" == typeof (new XMLHttpRequest)
        .responseType
        , d = !isnull(transitionEnd) && !isnull(animationEnd);
    return window.AudioContext = b, RAFsupported ? a ? b ? c ? d ? "ok" : "CSS3" : "XHR" : "Audio" : "Canvas" : "Animation Frame"
}

function transitionEndEventName() {
    var a, b, c = document.createElement("div")
        , d = {
            transition: "transitionend"
            , OTransition: "otransitionend"
            , MozTransition: "transitionend"
            , WebkitTransition: "webkitTransitionEnd"
        };
    for (a in d)
        if (d.hasOwnProperty(a) && c.style[a] !== b) return d[a];
    return null
}

function animationEndEventName() {
    var a, b, c = document.createElement("div")
        , d = {
            animation: "animationend"
            , OAnimation: "oanimationend"
            , MozAnimation: "animationend"
            , WebkitAnimation: "webkitAnimationEnd"
        };
    for (a in d)
        if (d.hasOwnProperty(a) && c.style[a] !== b) return d[a];
    return null
}

function getCSSMatrix(a) {
    if (!isnull(a)) {
        var b = a.css("-webkit-transform") || a.css("-moz-transform") || a.css("-ms-transform") || a.css("-o-transform") || a.css("transform");
        return isnull(b) ? [1] : b.replace(/[^0-9\-.,]/g, "")
            .split(",")
    }
    return [1]
}

function stopProp(a) {
    trace("stopPropagation -> " + a.target), a.stopPropagation()
}

function getErrorObject() {
    try {
        throw Error("")
    } catch (a) {
        return a
    }
}

function trace(a) {
    showlog && (isDevice ? $("#trace")
        .append("<p>" + a + "</p>") : console.log(a))
}

function listenResize() {
    function a() {
        f = $boxPopup.$pop.width(), e = decimal(f / h, 3), e != d && (TweenMax.set($webapp, {
            scale: e
        }), d = e)
    }
    
    function b() {
        f = i.width(), e = decimal(f / h, 3), e != d && (scaleApp = e, TweenMax.set($webapp, {
            scale: e
        }), TweenMax.set($section, {
            height: decimal(j * e, 3) + k
        }), d = e)
    }
    
    function c() {
        if (appLoaded) {
            for (var a = 0; a < nbData; a++) listPicto[a].setPosition();
            for (a = 0; a < app.nbpolo; a++) listPolo[a].setPosition()
        }
    }
    trace("listenResize()");
    var d, e, f, g = this
        , h = $webapp.width()
        , i = $section.find(".center")
        , j = $section.height()
        , k = Number($section.find(".center")
            .css("padding-top")
            .replace("px", ""));
    return this.resize = function () {
            modeTop50 ? a() : (b(), c())
        }, $(window)
        .resize(g.resize), this.resize(), this
}

function newBoxDialog(a) {
    function b(a) {
        $(a.target)
            .addClass("active");
        var b = !0;
        void 0 !== a.data.func && (a.data.func === c && (b = !1), a.data.func()), b && c()
    }
    
    function c() {
        d.close()
    }
    var d = $(a);
    return d.cntOpen = 0, d.$bck = $(".bac", d), d.$box = $(".box", d), d.$scale = $(".scale", d), d.$pop = $(".pop", d), d.$pop.$title = $(".title", d), d.$pop.$text = $(".text", d), d.$pop.$content = $(".content", d), d.$box.bind(evtPress, stopProp), d.open = function (a, e, f, g, h) {
        a = isnull(a) ? "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" : a, e = isnull(e) ? "Info" : e, f = isnull(f) ? ["Close"] : f, g = isnull(g) ? [c] : g, h = !isnull(h) && h, d.cntOpen++, isDevice ? (d.addClass("device"), TweenMax.set(d, {
            top: 0
        }), TweenMax.set(d.$scale, {
            y: 290
        })) : d.addClass("fixed"), d.addClass("show"), d.$bck.fadeIn(), d.$pop.clean(), d.$pop.$title.html(e), d.$pop.$text.html(a);
        for (var i = 0, j = f.length; i < j; i++) d.$pop.$content.append('<div class="bt bt-mini light" id="bt-mini' + i + '"><div class="txt">' + f[i] + "</div></div>"), d.$pop.$content.find("#bt-mini" + i)
            .unbind()
            .bind(evtClick, {
                func: g[i]
            }, b);
        1 == d.cntOpen && d.$box.open()
    }, d.close = function () {
        1 == d.cntOpen && (d.$box.close(), d.$bck.fadeOut()), d.cntOpen--, d.cntOpen < 0 && (d.cntOpen = 0)
    }, d.$bck.fadeIn = function () {
        this.addClass("animateFadeIn")
    }, d.$bck.fadeOut = function () {
        this.removeClass("animateFadeIn")
    }, d.$box.open = function () {
        TweenMax.to(this, .3, {
            opacity: 1
            , ease: Linear.easeNone
            , onComplete: function () {
                d.$box.addClass("enable")
            }
        })
    }, d.$box.close = function () {}, d.$pop.clean = function () {
        this.$content.find(".bt-mini")
            .unbind(), this.$content.empty()
    }, d
}

function newPopup(a) {
    function b() {
        "mini" == m.bck && (TweenMax.killTweensOf($fadeStage), TweenMax.set($fadeStage, {
            opacity: 0
        })), h.removeClass("fixed"), h.removeClass("show"), h.removeClass(m.bck), h.$bck.removeClass("animateFadeIn animateFadeOut"), h.$bck.unbind(), h.$pop.$icon.unbind(), TweenMax.set(h, {
            height: "100%"
        }), TweenMax.set(h.$scale, {
            marginTop: 0
        }), TweenMax.set(h.$box, {
            opacity: 0
            , scale: .9
        }), TweenMax.set($wrapper, {
            height: "auto"
        })
    }
    
    function c(a, b) {
        j && (a.id == o && b !== !0 || (a.addClass("active"), a.$mypop.addClass("active"), isnull(n) || a.id == o || (n.removeClass("active"), n.$mypop.removeClass("active"), e()), n = a, o = a.id))
    }
    
    function d() {
        j && c(k[0], 0, !0)
    }
    
    function e() {
        if (j) {
            var a = $boxPoptab.onCloseFunc[n.$mypop.attr("id")];
            isnull(a) || a()
        } else isnull(h.funcOnClose) || (h.funcOnClose(), h.funcOnClose = null)
    }
    
    function f(a) {
        var b = !0;
        if (m.lockCenter) {
            b = !1;
            var c = isIOS ? a.originalEvent.targetTouches[0] : a
                , d = Math.round(c.pageX)
                , e = (Math.round(c.pageY), Math.round(stageW / 2 + width / 2))
                , g = Math.round(stageW / 2 - width / 2);
            (d > e || d < g) && (b = !0)
        }
        b && ($body.unbind(evtPress, f), h.close())
    }
    
    function g() {
        if (m.custom && h.addClass("custom"), "" != m.icon && h.$pop.$icon.addClass("icon " + m.icon + " icon-popic-" + m.icon), "mini" != m.bck && "fullscreen" != m.bck || h.addClass(m.bck), "fullscreen" == m.bck)
            if (isDevice) {
                h.addClass("device");
                var a = $body.scrollTop()
                    , b = $window.height()
                    , c = h.$pop.height();
                c = 0 == c ? Number(h.$pop.css("padding-bottom")
                    .replace("px", "")) : c, h.$box.height(c);
                var d = Math.round(b / 2 - c / 2)
                    , e = a + d - 22;
                e = e < a ? a : e, e = 0 == e ? 10 : e, TweenMax.set(h.$scale, {
                    y: e
                })
            } else h.addClass("fixed")
    }
    var h = $(a);
    h.$bck = $(".bac", h), h.$box = $(".box", h), h.$scale = $(".scale", h), h.$poplist = $(".box .pop", h), h.$boxtab = $(".box .box-tab", h), h.$pop = h.$poplist, h.$box.bind(evtPress, function (a) {
        m.clicable || stopProp(a)
    });
    var i = !1
        , j = !isnull(h.$boxtab[0])
        , k = []
        , l = getCSSMatrix(h.$scale)
        , m = (isNaN(parseInt(l[0])) || isnull(l[0]) ? 1 : l[0], {});
    h.open = function (a) {
        i && h.immediatClose(), i = !0, m = isnull(a) ? {
            icon: "close"
            , bck: "fullscreen"
            , custom: !1
            , locked: !0
            , unlock: !1
            , lockCenter: !1
            , clicable: !1
        } : a, g(), this.addClass("show"), this.$bck.fadeIn(), this.$box.open(), d()
    }, h.close = function (a) {
        "close" == m.icon && this.$pop.$icon.unbind(), this.$bck.unbind(), this.$box.close(a), this.$bck.fadeOut()
    }, h.$box.open = function (a) {
        isnull(a) || (m = a, g()), "close" == m.icon && h.$pop.$icon.bind(evtClick, function () {
            return h.close(), !1
        }), m.locked || $body.bind(evtPress, f), m.unlock && unlock(), TweenMax.set(this, {
            y: 80
            , scale: 1
        }), TweenMax.to(this, .3, {
            y: 0
            , opacity: 1
            , ease: Quint.easeOut
            , onComplete: function () {
                h.$box.addClass("enable")
            }
        })
    }, h.$box.close = function (a) {
        h.$box.removeClass("enable"), TweenMax.to(this, .3, {
            opacity: 0
            , scale: .9
            , ease: Back.easeIn
            , force3D: !0
            , onComplete: function () {
                e(), isnull(a) || a(), i = !1
            }
        })
    }, h.$bck.fadeIn = function () {
        "mini" == m.bck && (TweenMax.to($fadeStage, .5, {
            opacity: .5
            , ease: Linear.none
        }), TweenMax.set(h, {
            height: $section.height()
        }), TweenMax.set(h.$scale, {
            marginTop: -(150 * scaleApp - 60)
        })), this.addClass("animateFadeIn")
    }, h.$bck.fadeOut = function () {
        function a() {
            "fullscreen" == m.bck ? isDevice ? (h.removeClass("device"), TweenMax.set(h.$scale, {
                y: 0
            })) : h.removeClass("fixed") : (TweenMax.set(h.$scale, {
                marginTop: 0
            }), TweenMax.set(h, {
                height: "100%"
            })), b(), unlock()
        }
        "mini" == m.bck ? TweenMax.to($fadeStage, .5, {
                opacity: 0
                , ease: Linear.none
                , onComplete: a
            }) : this.addClass("animateFadeOut")
            .one(animationEnd, a)
    }, h.immediatClose = function () {
        b(), e()
    };
    var n = null
        , o = -1;
    return j && $(".tab", h.$boxtab)
        .each(function (a) {
            var b = $(this);
            k.push(b), b.id = a, b.$mypop = h.$box.find(".pop")
                .eq(a), b.bind(evtClick, function (a) {
                    c(b)
                })
        }), h
}

function initFuncPopup(a) {
    var b = a;
    b.$pop.$title = b.$pop.find(".title"), b.$pop.$text = b.$pop.find(".text"), b.$pop.$content = b.$pop.find(".content"), b.$pop.$icon = b.$pop.find(".icon"), b.$pop.clean = function () {
        b.removeClass("custom"), this.removeClass("info"), this.removeClass("open"), this.removeClass("close"), this.$icon.attr("href", "javascript:void(0)"), this.$icon.removeClass(), this.$icon.unbind(), this.$content.find(".bt")
            .unbind(), this.$content.empty(), this.$title.empty(), this.$text.empty()
    }, b.$pop.reflow = function () {
        this.$title.is(":empty") ? this.$title.hide() : this.$title.show(), this.$text.is(":empty") ? this.$text.hide() : this.$text.show(), this.$content.is(":empty") ? this.$content.hide() : this.$content.show()
    }
}

function loadLanguage(a, b) {
    trace("loadLanguage()");
    var c = "en";
    isnull(b) && $("#pop-param .box-lang .bt-mini#bt-lang-" + c)
        .addClass("active"), $.getScript(DIR + "./lang/" + c + ".js")
        .done(function (b, d) {
            trace("- language code = " + c), isnull(a) || a()
        })
        .fail(function (a, b, d) {
            return errorTabToLoad("lang/" + c + ".js"), !1
        })
}

function changeDomTxt() {
    translateObj.trad
}

function clickBtLang(a) {
    var b = $(a.currentTarget)
        , c = b.attr("id")
        .split("bt-lang-")
        .join("");
    b.hasClass("active") || ($("#pop-param .box-lang .bt-mini")
        .removeClass("active"), b.addClass("active"), loadLanguage(changeDomTxt, c))
}

function STR(a) {
    for (var b = a.split("."), c = translateObj.trad, d = 0, e = b.length; d < e; d++) {
        var f = b[d];
        if (!(f in c)) return;
        c = c[f]
    }
    return c
}

function DOMReady2() {
    function a() {
        b++;
        var a = {};
        a.uniqid = uniqid(), a.name = makeid(), a.title = "Test from local", a.dedi = b, a.mix = "<xml></xml>", a.date = getDateNow(), a.device = "todo", trace("-> on passe le mix à PHP"), xhr("POST", DOMAIN + "/php/mix-save.php", a, function (a) {
            trace("-> PHP à retourner"), trace(a), trace("-> PHP tente de récupérer"), xhr("POST", DOMAIN + "/php/mix-get.php", {
                link: a.mix.link
            }, function (a) {
                trace(jsonDecode(a.mix))
            })
        })
    }
    var b = 0;
    a()
}

function DOMReady() {
    console.log("%c♫ Powered by incredibox.com", "color:#FFF; background-color:#25447F; padding:2px 10px 2px 6px;"), isDevice && window.addEventListener("orientationchange", checkOrientation, !1), trace("DOMReady()"), $(document)
        .ready(function () {
            trace("$(document).ready()"), initJqueryVar(), $boxDialog = newBoxDialog(".box-popup#pop-dialog"), $boxPopup = newPopup(".box-popup#pop-popup"), initFuncPopup($boxPopup), checkBrowser() ? (trace("checkSupported() = 'ok'"), contextCanvas = $("#cnvGame")[0].getContext("2d"), contextAudio = new AudioContext, loadLanguage(function () {
                loadAppFile(function () {
                    if (changeDomTxt(), checkCookie(), resizer = new listenResize, modeWatch && "success" != mixobj.state);
                    else {
                        if (modeWatch) {
                            var a = jsonDecode(mixobj.mix)
                                , b = a.mix
                                , c = $.parseXML(b)
                                , d = $(c)
                                , e = d.find("mix");
                            isnull(e.attr("version")) && (app.sndaspire = app.oldbonus.aspire, app.bonusarray[0].sound = app.oldbonus.music, app.bonusarray[0].src = app.oldbonus.video, trace("-> on remplace le bonus Jessie par l'ancien bonus"))
                        }
                        preparerArray()
                    }
                })
            })) : (popupUpdate(), saveGA("POPUP", "Update", browser.txt + " " + browser.userAgent))
        })
}

function checkBrowser() {
    var a = String(browser.name.toLowerCase())
        , b = browser.version
        , c = "To enjoy the <span class='txt-red'>#BitesizeBeat</span> experience"
        , d = "You browser is not supported by our website, "
        , e = "please upgrade to the latest and come back!";
    if (browser.txt = "[ " + browser.osname + " " + browser.osversion + " - " + browser.name + " " + browser.version + " - " + browser.device + " ]", browser.msg = d + e, "ok" != checkSupported()) return browser.txt += "<br>[ HTML5 not supported : " + checkSupported() + " ]", browser.msg += "<br><br><span class='info'>[ HTML5 not supported : " + checkSupported() + " ]</span>", !1;
    if (console.log(browser.txt), "Android" == browser.osname) {
        if (browser.osversion < 4.4) return browser.msg = c + ", you need Android 4.4 (KitKat) minimum.", !1;
        if (browser.name.indexOf("Chrome") == -1) return browser.msg = c + " on Android you have to use Chrome.", !1;
        if (browser.version < 45) return browser.msg = c + " on Android you need Chrome version 45 minimum.", !1
    }
    if ("iOS" == browser.osname) {
        if ("iPhone" == browser.device && 4 == browser.deviceModel) return browser.msg = c + " on iPhone you need the model 5 minimum.", !1;
        if (browser.osversion < 9) return browser.msg = c + ", you need iOS 9 minimum.", !1;
        if ("(?)" != browser.webview) {
            if ("iPhone" == browser.device) return browser.msg = c + " on iOS please use Safari.", !1
        } else if (browser.name.indexOf("Safari") == -1 && !(browser.name.indexOf("Chrome") > -1 && b > 50)) return browser.msg = c + " on iOS you have to use Safari.", !1
    }
    return "Windows phone" == browser.device ? (browser.msg = "Your device is not supported. " + c + " please come back with another device!", !1) : ("google chrome" === a || a.indexOf("chrome") > -1) && b < 45 ? (browser.msg = c + " please update Chrome to the latest version.", !1) : ("mozilla firefox" === a || a.indexOf("firefox") > -1) && b < 45 ? (browser.msg = c + " please update Firefox to the latest version.", !1) : "microsoft internet explorer" === a || a.indexOf("explorer") > -1 ? (browser.msg = "Your browser is not supported. " + c + " please come back with another browser!", !1) : ("microsoft edge" === a || a.indexOf("edge") > -1) && b < 12 ? (browser.msg = c + " please update Edge to the latest version.", !1) : "safari" === a && b < 8 ? (browser.msg = c + " please update Safari to the latest version.", !1) : "opera" === a && b < 43 ? (browser.msg = c + " please update Opera to the latest version.", !1) : ((a.indexOf("firefox") != -1 && b < 48 || a.indexOf("safari") != -1 && browser.osversion < 9) && (bugCanvasEllipse = !0), "iOS" === browser.osname && "iPhone" === browser.device && browser.osversion < 10 && (console.debug("IIV activate for iPhone IOS < 10"), bugInlineVideo = !0), "iOS" === browser.osname && browser.osversion >= 10.3 && (console.debug("API audio snd.noteOff replaced by snd.stop(0)"), isIOS103 = !0), !0)
}

function checkCookie() {
    var a = Cookies.get("gate");
    trace("COOKIE => " + a), isnull(a) ? popupGate() : "nope" == a ? (gateChecked()) : "good" == a && gateChecked()
}

function gateChecked() {
    if (!errorPrelaod)
        if ($fadeAll.removeClass("show"), modeTop50) top50 = initTop50(), loadBarreFull();
        else if (modeWatch) {
        var a = loadBarreFull;
        "success" != mixobj.state && (a = function () {
            TweenMax.to($present.find(".preload-err"), .3, {
                opacity: 1
                , onComplete: function () {
                    TweenMax.to($present, .3, {
                        opacity: 0
                        , scale: .7
                        , ease: Back.easeIn
                        , delay: 3
                        , onComplete: function () {
                            location.href = "../"
                        }
                    })
                }
            })
        }), TweenMax.set($present, {
            opacity: 1
        }), TweenMax.to($rounder, .3, {
            opacity: 1
            , scale: 1
            , ease: Back.easeOut
            , onComplete: a
        })
    } else TweenMax.to($homeLoadbox, .3, {
        opacity: 1
    }), showIntro()
}

function loadAppFile(a) {
    $.getScript(DIR + "./asset/" + cache("app.js"))
        .done(a)
        .fail(function () {
            errorTabToLoad("/asset/app.js")
        })
}

function initJqueryVar() {
    $window = $(window), $body = $("body"), $wrapper = $("#wrapper"), $header = $("header"), $section = $("section"), $webapp = $("#webapp"), $bckapp = $("#bck-app"), $lockAll = $("#lock-all")
        .bind(evtPress, stopProp), $lockPause = $("#lock-pause"), $lockStage = $("#lock-stage")
        .bind(evtPress, stopProp), $fadeAll = $("#fade-all"), $home = $("#home")
        .bind(evtPress, stopProp), $homeLoadbox = $("#home #load-box"), $homeLoadbar = $("#home #load-box #load-bar"), $homeBtPlay = $("#home #home-bt-play"), $present = $("#present"), $rounder = $("#rounder"), isnull($rounder[0]) || ($rounder.clock = new ClockObject("cnv-preload"), $rounder.clock.prepare(0, 0, .4, 280, 10, "#000")), $gameTouch = $("#game-touch"), $btTool = $("#bt-tool"), $btTool.$bck = $("#bt-tool .bck"), $btTool.$bckimg = $("#bt-tool .bckimg"), $btStop = $("#bt-stop"), $btStop.$bck = $("#bt-stop .bckimg"), $btRandom = $("#bt-random"), $btRandom.$bck = $("#bt-random .bckimg"), $btRecord = $("#bt-record"), $btRecord.$bck = $("#bt-record .bckimg"), $cntRecord = $("#cnt-record"), $boxVideo = $("#box-video")
        .bind(evtPress, stopProp), $fadeStage = $("#fade-stage"), $boxBottom = $("#box-bottom"), $boxInfo = $("#box-info"), $boxInfo.$title = $("#box-info .title"), $boxInfo.$name = $("#box-info .name"), $boxInfo.$dedi = $("#box-info .dedi"), $("#incredibox-logo")
        .bind(evtClick, popupIncredibox)
}

function preparerArray() {
    frameTotal = app.totalframe, tabBuffer = [], tabAnime = [], nbPolo = app.persoarray.length, nbSound = app.animearray.length, nbSoundBonus = app.bonusarray.length, nbBonus = app.bonusarray.length, nbAnime = app.animearray.length, nbData = app.animearray.length, tabToLoad = [], cntLoad = 0;
    var a = 0
        , b = 0;
    for (a = 0; a < nbSound; a++) tabBuffer.push([0]), tabAnime.push({
        imgSprite: null
        , ratio: null
        , width: null
        , height: null
        , headHeight: null
        , headPosY: null
        , totalFrames: null
        , imgData: null
        , color: app.animearray[a].color
    });
    for (a = 0; a < nbSoundBonus; a++) tabBuffer.push([0]), createMetaBonus(a);
    for (tabBuffer.push([0]), tabBuffer.push([0]), tabToLoad.push({
            func: loadSound
            , params: [app.sndaspire, nbSound + nbSoundBonus, 0]
        }), tabToLoad.push({
            func: loadSound
            , params: [app.sndlooper, nbSound + nbSoundBonus + 1, 0]
        }), a = 0; a < nbSound; a++, b++) tabToLoad.push({
        func: loadSound
        , params: [app.animearray[a].soundA, b, 0]
    });
    for (a = 0; a < nbSoundBonus; a++, b++) tabToLoad.push({
        func: loadSound
        , params: [app.bonusarray[a].sound, b, 0]
    }), tabToLoad.push({
        func: loadVideoBonus
        , params: [app.bonusarray[a].src, a]
    });
    for (a = 0; a < nbAnime; a++) tabToLoad.push({
        func: loadAnimeData
        , params: [app.animearray[a].animeData, a]
    });
    for (a = 0; a < nbAnime; a++) tabToLoad.push({
        func: loadAnime
        , params: [app.animearray[a].anime, a]
    });
    for (a = 0; a < nbPolo; a++) tabToLoad.push({
        func: loadSprite
        , params: [app.persoarray[a].file, a]
    });
    modeTop50 && (tabOldBonus = [0, 0, 0], tabToLoad.push({
        func: preloadSound
        , params: [app.oldbonus.aspire, tabOldBonus, 0, checkPreloadOlBonus]
    }), tabToLoad.push({
        func: preloadSound
        , params: [app.oldbonus.music, tabOldBonus, 1, checkPreloadOlBonus]
    }), tabToLoad.push({
        func: preloadVideo
        , params: [app.oldbonus.video, tabOldBonus, 2, checkPreloadOlBonus]
    })), nbTotalAsset = tabToLoad.length;
    for (var a = 0; a < nbTotalAsset; a++) tabToLoad[a].func(tabToLoad[a].params)
}

function checkPreloadOlBonus() {
    trace(tabOldBonus), checkTabToLoad()
}

function checkTabToLoad() {
    if (!errorPrelaod) {
        if (cntLoad > 0) {
            var a = String(Math.round(cntLoad / (nbTotalAsset - 1) * 100));
            modeWatch ? $rounder.clock.update(a) : $homeLoadbar.css({
                width: a + "%"
            })
        }
        cntLoad++, cntLoad == nbTotalAsset && (trace("All asset loaded"), allAssetLoaded())
    }
}

function errorTabToLoad(a) {
    errorPrelaod = !0;
    var b = a.split("/")
        , c = b[b.length - 1];
    console.log("PRELOAD ERROR " + c), $boxDialog.open("Something went wrong while preloading assets, please reload the page!", "Oops!", ["Reload"], [gotoUrl], !0), saveGA("PRELOAD ERROR", c, browser.txt)
}

function loadImage(a) {
    var b = a[0]
        , c = a[1]
        , d = DIR + "./img/" + cache(b)
        , e = new Image;
    e.onload = function () {
        window[c] = this, checkTabToLoad()
    }, e.onerror = function () {
        errorTabToLoad(d)
    }, e.src = d
}

function loadSprite(a) {
    var b = a[0]
        , c = a[1]
        , d = DIR + "./" + app.folder + "sprite/" + cache(b)
        , e = new Image;
    e.onload = function () {
        app.persoarray[c].sprite = this, checkTabToLoad()
    }, e.onerror = function () {
        errorTabToLoad(d)
    }, e.src = d
}

function loadSound(a) {
    var b = a[0]
        , c = a[1]
        , d = a[2]
        , e = DIR + "./" + app.folder + "sound/" + cache(b)
        , f = new XMLHttpRequest;
    f.open("GET", e, !0), f.responseType = "arraybuffer", f.onload = function (a) {
        200 == f.status ? contextAudio.decodeAudioData(f.response, function (a) {
            tabBuffer[c][d] = a, checkTabToLoad()
        }, function (a) {
            errorTabToLoad(e)
        }) : errorTabToLoad(e)
    }, f.onerror = function () {
        errorTabToLoad(e)
    }, f.send()
}

function loadAnimeData(a) {
    var b = a[0]
        , c = a[1]
        , d = DIR + "./" + app.folder + "anime/" + cache(b)
        , e = new XMLHttpRequest;
    e.open("GET", d, !0), e.responseType = "json", e.onload = function () {
        function a() {
            for (var b = 0; b < f; b++) {
                var c = d[b].prop.split(",")
                    , e = [0, 0];
                void 0 !== d[b].legs && (e = d[b].legs.split(",")), g.push([parseInt(c[0]), parseInt(c[1]), parseInt(c[2]), parseInt(c[3]), parseInt(e[0]), parseInt(e[1])])
            }
            var i = g.length;
            i != h && i != 2 * h && i != 3 * h || a()
        }
        var b = e.response
            , d = b.arrayFrame
            , f = d.length
            , g = []
            , h = app.totalframe / 4;
        a(), tabAnime[c].imgData = g, tabAnime[c].headHeight = b.headHeight, tabAnime[c].headPosY = b.headPosY, tabAnime[c].legsHeight = b.legsHeight, tabAnime[c].legsPosY = b.legsPosY, checkTabToLoad()
    }, e.onerror = function () {
        errorTabToLoad(d)
    }, e.send()
}

function loadAnime(a) {
    var b = a[0]
        , c = a[1]
        , d = DIR + "./" + app.folder + "anime/" + cache(b)
        , e = new Image;
    e.onload = function () {
        tabAnime[c].imgSprite = e, checkTabToLoad()
    }, e.onerror = function () {
        errorTabToLoad(d)
    }, e.src = d
}

function loadVideoBonus(a) {
    var b = a[0]
        , c = DIR + "./" + app.folder + "video/" + cache(b)
        , d = a[1] + 1
        , e = document.createElement("video");
    e.type = "video/mp4", e.setAttribute("muted", "muted"), e.setAttribute("playsinline", "playsinline"), e.setAttribute("webkit-playsinline", "webkit-playsinline"), $boxVideo.append("<div class='video' id='video" + d + "'><div class='overflow'></div></div>"), $videoFlow = $boxVideo.find(".video#video" + d + " .overflow"), $videoFlow.append(e);
    var f = new XMLHttpRequest;
    f.onload = function () {
        e.src = window.URL.createObjectURL(this.response), checkTabToLoad()
    }, f.onerror = function () {
        errorTabToLoad(c)
    }, f.open("GET", c), f.responseType = "blob", f.send()
}

function createMetaBonus(a) {
    var b = a + 1
        , c = '<div class="bt-bonus" id="bt-bonus-' + b + '""><div class="icon-bt-bonus-txt"></div><div class="circle"></div><div class="quarter icon-bt-bonus-bck">';
    c += '<div class="svg q1"><svg x="0px" y="0px" width="102px" height="102px" viewBox="0 0 102 102"><path d="M52,49.68,99.2,34.33A51,51,0,0,0,52,0Z"/></svg></div>', c += '<div class="svg q2"><svg x="0px" y="0px" width="102px" height="102px" viewBox="0 0 102 102"><path d="M99.8,36.16,52.56,51.51,81.75,91.68a51,51,0,0,0,18-55.53Z"/></svg></div>', c += '<div class="svg q3"><svg x="0px" y="0px" width="102px" height="102px" viewBox="0 0 102 102"><path d="M51,52.64,21.81,92.81a51,51,0,0,0,58.38,0Z"/></svg></div>', c += '<div class="svg q4"><svg x="0px" y="0px" width="102px" height="102px" viewBox="0 0 102 102"><path d="M49.44,51.51,2.2,36.16A51,51,0,0,0,20.25,91.68Z"/></svg></div>', c += '<div class="svg q5"><svg x="0px" y="0px" width="102px" height="102px" viewBox="0 0 102 102"><path d="M50,49.68V0A51,51,0,0,0,2.8,34.33Z"/></svg></div>', c += '</div><div class="eye-green"></div><canvas id="canvas-bt-bonus-' + b + '" width="120" height="120"></canvas><div class="eye-bck"></div><div class="eye"></div><div class="hitzone"></div></div>', $("#box-bt-bonus")
        .append(c)
}

function allAssetLoaded() {
    TweenMax.to($homeLoadbox, .5, {
        opacity: 0
    }), createGame(), needCallback && loadBarreFull()
}

function showIntro() {
    intro = new AnimationIntro
}

function comeBackIntro() {
    $fadeAll.addClass("animateIn")
        .one(animationEnd, function () {
            removeHash(), quitReplay(), TweenMax.set($homeBtPlay, {
                    clearProps: "all"
                    , width: 200
                    , marginLeft: -100
                }), $homeBtPlay.find(".txt")
                .text("Skip intro"), $present.remove(), $home.show(), $fadeAll.removeClass("animateIn"), showIntro(), unlock()
        })
}

function showBtHome() {
    appLoaded ? loadBarreFull() : needCallback = !0
}

function loadBarreFull() {
    appLoaded ? modeTop50 ? ($home.hide(), $btBonus.hide(), startRender(), afficherAllPolo(), lancerApp()) : modeWatch ? "success" == mixobj.state && (isIOS || isAndroid ? ($homeBtPlay.find(".txt")
        .text("Play the beat"), $homeBtPlay.find(".bckimg")
        .addClass("icon-bt-listen")
        .removeClass("icon-bt-create"), $homeBtPlay.bind(evtPressEnd, clickHomeBtPlay), TweenMax.set($homeBtPlay, {
            y: -50
            , width: 250
            , marginLeft: -125
        }), TweenMax.to($homeBtPlay, .4, {
            scale: 1
            , opacity: 1
            , delay: .5
            , ease: Back.easeOut
        })) : clickHomeBtPlay()) : ($homeBtPlay.bind(evtClick, clickHomeBtPlay), TweenMax.to($homeBtPlay, .4, {
        scale: 1
        , opacity: 1
        , delay: .5
        , ease: Back.easeOut
    })) : needCallback = !0
}

function clickHomeBtPlay() {
    if ($homeBtPlay.unbind(), needFirstClick) {
        var a = simulerClickAudioIOS(tabBuffer[0][0]);
        a = null
    }
    listBonus[0].playtest(), modeWatch && prepareModeWatch(), $fadeAll.addClass("animateIn")
        .one(animationEnd, hideHome)
}

function hideHome() {
    modeWatch || intro.stop(), onGame = !0, $home.hide(), startRender(), modeWatch ? afficherAllPolo() : baisserAllPolo(), $fadeAll.removeClass("show")
        .addClass("animateOut")
        .one(animationEnd, lancerApp)
}

function hideGame() {
    onGame = !1, stopAllStage(), stopRender(), closeTool(!1), $home.show(), $fadeAll.addClass("animateOut")
        .one(animationEnd, showHome);
}

function lancerApp() {
    trace("lancerApp"), $fadeAll.removeClass(), isDevice && lockGesture(), modeTop50 && popupIsWaiting ? top50.launchMix() : modeWatch ? startReplayMode() : (afficherAllPolo(), TweenMax.delayedCall(.5, function () {
        listBonus[0].flashButton()
    }))
}

function createGame() {
    trace("---- createGame()"), appLoaded = !0, app.recminloop = showlog ? 0 : app.recminloop, loopDuration = app.looptime, nbLoopBonus = app.nbloopbonus, nbPoloMax = app.nbpolo, stepAnimation = frameTotal / loopDuration, stepPercent = 100 / loopDuration, sndAspire = new SndObject(contextAudio), sndLooper = new SndObject(contextAudio), clock = new ClockObject("cnv-clock"), clock.init(40, 40, .4, 35, 10, "#FFFFFF"), randomMix = new RandomMix, recordMix = new RecordMix, replayMix = new ReplayMix, readingBar = new ReadingBar("#reading-bar", app.recminloop, app.recmaxloop), listPolo = creerBoxPolo(), majListPoloDrop(), listPicto = creerBoxPicto(), listBonus = creerBoxBonus(), enableBtGame(), openTool()
}

function creerBoxPicto() {
    var a = []
        , b = []
        , c = ["Beats", "Effects", "Melodies", "Voices"]
        , d = ["beat", "effect", "melo", "voice"]
        , e = 83
        , f = 60
        , g = (1e3 - (4 * e + 3 * f)) / 2
        , h = 23
        , i = 1
        , j = 0
        , k = 0;
    for (k = 0; k < 4; k++) {
        var l = g + k * (e + f);
        b.push(l);
        var m = $("<div class='behindPicto'><div class='icon-picto-" + d[k] + " img'></div><div class='text'>" + c[k] + "</div><div class='point'></div></div>");
        m.css({
            top: String(h) + "px"
            , left: String(l) + "px"
        });
        for (var n = 0; n < 6; n++) m.find(".point")
            .append("<div class='pt'></p>");
        $("#box-picto")
            .append(m), listBehindPicto.push(m)
    }
    for (k = 0; k < nbSound; k++, i++) {
        i > 6 && (i = 1, j++), $("#box-picto")
            .append('<div class="picto" id="picto' + k + '"><div class="scale icon-picto-' + d[j] + '"><div class="hitzone"></div></div></div>');
        var o = new PictoObject(k, j, $("#box-picto"));
        o.init(b[j], h, app.animearray[k].color), o.activer(), a.push(o)
    }
    return a
}

function creerBoxPolo() {
    for (var a = [], b = -10, c = 0, d = 20, e = 200, f = 360, g = 140, h = 260, i = 0; i < nbPoloMax; i++) {
        $("#box-polo")
            .append('<div class="polo" id="polo' + i + '"><div class="ctrl"><div class="cbt icon-game-bt-mute"></div><div class="cbt icon-game-bt-solo"></div><div class="cbt icon-game-bt-delete"></div></div></div>'), c = Math.round(b + (1e3 - 2 * b - e) / (nbPoloMax - 1) * i);
        var j = new PoloObject(i, $("#box-stage"), contextAudio, contextCanvas, c, d, e, f, g, h);
        a.push(j)
    }
    return a
}

function creerBoxBonus() {
    for (var a = [], b = 0, c = nbBonus - 1; b < nbBonus; b++, c--) {
        var d = app.bonusarray[b]
            , e = d.code.split(",")
            , f = $("#bt-bonus-" + (b + 1));
        $btBonus = f;
        for (var g = 0, h = e.length; g < h; g++) {
            var i = app.animearray[e[g] - 1].color;
            $(".svg.q" + (g + 1) + " svg", f)
                .css({
                    fill: "#" + i
                })
        }
        var j = new BonusObject(b, d, contextAudio);
        if (a.push(j), bugInlineVideo) {
            var k = j.getVideo();
            window.enableInlineVideo(k, {
                everywhere: !0
            })
        }
    }
    return a
}

function clickStage(a) {
    a.preventDefault()
}

function enableBtGame() {
    $btTool.bind(evtClick, function () {
        isToolbarMove || clickTool()
    }), $btStop.bind(evtClick, function () {
        !isToolbarMove && loopOn && (clickBtStop(), stopAllStage())
    }), $btRandom.bind(evtClick, function () {
        isToolbarMove || ($btRandom.addClass("hidebulle"), startRandomMode())
    }), $btRecord.bind(evtClick, function () {
        isToolbarMove || ($btRecord.addClass("hidebulle"), modeReplay ? startReplayMode() : startRecordMode())
    }), isDevice || ($btStop.append("<div class='bulle'><div class='bloc'>RESET</div><div class='pointe'></div></div>"), $btRandom.append("<div class='bulle'><div class='bloc'>RANDOM</div><div class='pointe'></div></div>"), $btRecord.append("<div class='bulle'><div class='bloc'>RECORD</div><div class='pointe'></div></div>"))
}

function enableBtTool() {
    $btTool.bind(evtClick, function () {
        isToolbarMove || clickTool()
    })
}

function clickBtStop() {
    TweenMax.set($btStop.$bck, {
        rotation: 0
    }), TweenMax.to($btStop.$bck, 1, {
        rotation: 360
        , ease: Quint.easeOut
    })
}

function clickTool() {
    var a = isToolbarOpen ? closeTool : openTool;
    isToolbarMove = !0, a()
}

function openTool() {
    trace("openTool()"), TweenMax.to($btTool, .3, {
        scale: .5
        , opacity: 0
        , display: "none"
        , ease: Quint.easeOut
    }), TweenMax.set([$btStop, $btRandom, $btRecord], {
        scale: .5
        , opacity: 0
    }), TweenMax.staggerTo([$btStop, $btRandom, $btRecord], .2, {
        scale: 1
        , opacity: 1
        , display: "block"
        , ease: Quint.easeOut
    }, .04, function () {
        $btRandom.removeClass("hidebulle"), $btRecord.removeClass("hidebulle")
    }), isToolbarMove = !1, isToolbarOpen = !0, $gameTouch.bind(evtPress, clickStage)
}

function closeTool() {
    $gameTouch.unbind(), TweenMax.staggerTo([$btStop, $btRandom, $btRecord], .2, {
        scale: .5
        , opacity: 0
        , display: "none"
        , ease: Quint.easeIn
    }, .04, function () {
        TweenMax.to($btTool, .3, {
            scale: 1
            , opacity: 1
            , display: "block"
            , ease: Quint.easeOut
        }), isToolbarMove = !1, isToolbarOpen = !1
    })
}

function moveBtTool(a, b, c) {
    $gameTouch.unbind(), isToolbarMove = !0, TweenMax.to($btTool, .2, {
        scale: .5
        , opacity: 0
        , display: "none"
        , ease: Quint.easeOut
    }), TweenMax.staggerTo([$btStop, $btRandom, $btRecord], .2, {
        scale: .5
        , opacity: 0
        , display: "none"
        , ease: Quint.easeIn
    }, .04, function () {
        TweenMax.set(a, {
            x: b
        }), TweenMax.to(a, .3, {
            scale: 1
            , opacity: 1
            , display: "block"
            , ease: Quint.easeOut
        }), isToolbarMove = !1, isToolbarOpen = !1, isnull(c) || c()
    })
}

function reinitBtTool(a, b) {
    isToolbarMove = !0, TweenMax.to(a, .2, {
        scale: .5
        , opacity: 0
        , display: "none"
        , ease: Quint.easeOut
        , onComplete: function () {
            TweenMax.set([$btStop, $btRandom, $btRecord], {
                x: 0
            }), isToolbarMove = !1, isToolbarOpen = !1, openTool(), isnull(b) || b()
        }
    })
}

function baisserAllPolo() {
    for (var a = 0; a < nbPoloMax; a++) {
        var b = listPolo[a];
        b.baisser()
    }
}

function afficherAllPolo() {
    for (var a = 0; a < nbPoloMax; a++) {
        var b = listPolo[a];
        b.remonte(.03 * a, !1)
    }
}

function habillerPolo(a, b, c) {
    c = isnull(c) ? 0 : c;
    var d = a
        , e = b
        , f = e.getGroup()
        , g = d.getId()
        , h = 6 * f + g
        , i = tabAnime[h];
    d.habiller(e, h, cntBoucle, i, c), loopOn ? (d.showLoader(), d.activerClick()) : waitingFirstLoop || (modeReplay || modeWatch ? setTimeout(afterWaiting, 0) : setTimeout(afterWaiting, delayassist), waitingFirstLoop = !0)
}

function afterWaiting() {
    enableClickFirstPolos(), startLoop(), waitingFirstLoop = !1, waitForRecording && startRecording()
}

function enableClickFirstPolos() {
    for (var a = 0; a < nbPoloMax; a++) {
        var b = listPolo[a];
        b.getBusy() && b.activerClick()
    }
}

function clickPolo(a) {
    var b = a;
    b.desactiverClick(), getRemainingTime() < delayassist ? listPoloToRemove.push(b) : removePolo(b);
    var c = getListPoloBusy()
        .length;
    0 !== c && c != listPoloToRemove.length || stopLoop()
}

function mutePolo(a) {
    a.mute()
}

function unmutePolo(a) {
    a.unmute()
}

function soloPolo() {
    for (var a = getListPoloBusy(), b = a.length, c = 0; c < b; c++) {
        var d = a[c];
        d.getSolo() ? d.unmute() : d.mute()
    }
}

function muteAll(a) {
    for (var b = getListPoloBusy(), c = b.length, d = 0; d < c; d++) {
        var e = b[d];
        e.getId() != a.getId() ? (e.setSolo(!1), e.mute()) : (e.setSolo(!0), e.unmute())
    }
}

function unmuteAll(a) {
    for (var b = getListPoloBusy(), c = b.length, d = 0; d < c; d++) {
        var e = b[d];
        e.setSolo(!1), listPoloToSolo.push(e)
    }
    getRemainingTime() > delayassist && checkPoloToSolo()
}

function checkIfPoloAlone(a) {
    for (var b = getListPoloBusy(), c = b.length, d = 0, e = 0; e < c; e++) {
        var f = b[e];
        f.getMute() && d++
    }
    return d == c - 1 && !a.getMute()
}

function checkPoloToSolo() {
    for (var a = 0, b = listPoloToSolo.length; a < b; a++) {
        var c = listPoloToSolo[a];
        c.unmute()
    }
    listPoloToSolo = []
}

function getTotalSolo() {
    for (var a = getListPoloBusy(), b = a.length, c = 0, d = 0; d < b; d++) {
        var e = a[d];
        e.getSolo() && c++
    }
    return c
}

function stopSoloPolo() {
    for (var a = getListPoloBusy(), b = a.length, c = 0; c < b; c++) {
        var d = a[c];
        listPoloToSolo.push(d)
    }
    getRemainingTime() > delayassist && checkPoloToSolo()
}

function removePolo(a, b) {
    1 == getTotalSolo() && a.getSolo() && (a.setSolo(!1), stopSoloPolo()), reinitPolo(a, b), 1 == getListPoloBusy()
        .length && getListPoloBusy()[0].setSolo(!1)
}

function reinitPolo(a, b) {
    checkerCodeBonus(a.getPicto(), !1), a.stopSound(), a.setSolo(!1), a.setMute(!1), a.deshabiller(b, bonusPlaying), a.desactiverClick()
}

function stopAllPolo() {
    for (var a = getListPoloBusy(), b = a.length, c = bonusPlaying ? 0 : .03, d = 0; d < b; d++) reinitPolo(a[d], d * c);
    listPoloToRemove = []
}

function checkPoloToRemove() {
    for (var a = listPoloToRemove.length, b = bonusPlaying ? .01 : .03, c = 0; c < a; c++) removePolo(listPoloToRemove[c], c * b);
    listPoloToRemove = []
}

function pictoOnDrag(a) {
    tabPictoOnDrag.push(a.getId()), poloWatchPicto(a);
    for (var b = 0, c = listPoloDrop.length; b < c; b++) "hover" != listPoloDrop[b].getMode() && listPoloDrop[b].mode("regarde")
}

function pictoOnMove(a) {
    poloWatchPicto(a), checkPictoHoverPolo(a)
}

function poloWatchPicto(a) {
    a.getId() === tabPictoOnDrag[0] && (mouseX = a.getBound()
        .px, mouseY = a.getBound()
        .py)
}

function checkPictoHoverPolo(a) {
    for (var b = 0, c = listPoloDrop.length; b < c; b++) {
        var d = listPoloDrop[b];
        d.hitTestPicto(a) ? (d.rollover(), d.pictoHoverId = a.getId()) : d.pictoHoverId == a.getId() && (d.rollout(), d.pictoHoverId = null)
    }
}

function poloStopHover() {
    for (var a = 0, b = listPoloDrop.length; a < b; a++) listPoloDrop[a].rollout(!0)
}

function poloForceDraw() {
    for (var a = 0; a < nbPoloMax; a++) {
        var b = listPolo[a];
        b.draw()
    }
}

function pictoOnDrop(a, b) {
    for (var c = !1, d = null, e = 0; e < nbPoloMax; e++)
        if (d = listPolo[e], d.hitTestPicto(a)) {
            c = !0;
            break
        } if (c && d.getBusy() && d.getPicto()
        .getGroup() == a.getGroup() && (c = !1), c ? pictoTouchePolo(d, a) : a.replacer(), majListPoloDrop(), nbPoloDrop = listPoloDrop.length, majListPictoOnDrag(a.getId()), 0 === tabPictoOnDrag.length)
        for (var f = 0; f < nbPoloDrop; f++) listPoloDrop[f].mode("normal")
}

function pictoForceOnDrop(a) {
    if (void 0 !== tabPictoOnDrag) {
        var b = void 0 !== a && a;
        if (tabPictoOnDrag.length > 0) {
            for (var c = 0, d = tabPictoOnDrag.length; c < d; c++) b ? listPicto[tabPictoOnDrag[c]].forceReplacer() : pictoOnDrop(listPicto[tabPictoOnDrag[0]], !0);
            poloStopHover(), tabPictoOnDrag = []
        }
    }
}

function majListPictoOnDrag(a) {
    var b = tabPictoOnDrag.indexOf(a);
    b > -1 && tabPictoOnDrag.splice(b, 1)
}

function pictoTouchePolo(a, b, c) {
    a.getBusy() && (checkerCodeBonus(a.getPicto(), !1), a.relance(), majListPoloDrop()), b.absorber(a), habillerPolo(a, b, c), checkerCodeBonus(b, !0), getTotalSolo() > 0 && !a.getSolo() && a.mute()
}

function majListPoloDrop() {
    listPoloDrop = [];
    for (var a = 0; a < nbPoloMax; a++) {
        var b = listPolo[a];
        b.getBusy() || listPoloDrop.push(b)
    }
}

function clickBtPause() {
    getTime() - btClockClickedAt > 350 && (pauseGame(), btClockClickedAt = getTime())
}

function enableBtPause() {}

function disableBtause() {}

function clickBtBonus(a) {
    trace("*-* clickBtBonus(" + a + ")"), bonusWaiting = !0, bonusQueue = a, curVideo = listBonus[bonusQueue - 1], playSndAspire();
    var b = getRemainingTime()
        , c = b / 1e3;
    c = Math.round(100 * c) / 100 - .5, TweenMax.delayedCall(c, showBlackLayerAtStart), trace("*-* on va faire un fondu au noir dans " + c + "s")
}

function cancelClickBtBonus() {
    bonusWaiting && (trace("*-* cancelClickBtBonus()"), TweenMax.to($fadeStage, .3, {
        opacity: 0
        , ease: Linear.none
    }), TweenMax.killTweensOf(showBlackLayerAtStart), TweenMax.killTweensOf(videoSlideUp), curVideo.stop(), sndAspire.mute(), reinitBonusVars())
}

function showBlackLayerAtStart() {
    trace("*-* On lance le fondu au noir"), $lockStage.addClass("show"), TweenMax.to($fadeStage, .5, {
        opacity: 1
        , ease: Linear.none
        , onComplete: function () {
            bonusPlaying && TweenMax.to($fadeStage, 0, {
                opacity: 0
            })
        }
    }), modeReplay || modeRandom || ($boxBottom.addClass("fadeOut"), $btBonus.addClass("fadeOut"))
}

function waitForSlideUp() {}

function launchBonusVideo() {
    trace("*-* launchBonusVideo()"), curVideo.play(), TweenMax.to($fadeStage, 0, {
        opacity: 0
    }), pictoForceOnDrop(!0), videoSlideDown(), bonusWaiting = !1, bonusPlaying = !0
}

function stopBonusVideo(a) {
    trace("*-* stopBonusVideo()"), TweenMax.killTweensOf(showBlackLayerAtStart), TweenMax.killTweensOf(videoSlideUp), bonusWaiting ? reinitBonusVideo() : bonusPlaying && (a ? (TweenMax.to($fadeStage, .4, {
        opacity: 1
        , ease: Linear.none
        , onComplete: reinitBonusVideo
    }), videoSlideUp()) : (TweenMax.to($fadeStage, 0, {
        opacity: 1
    }), reinitBonusVideo()))
}

function reinitBonusVideo() {
    trace("*-* reinitBonusVideo()"), TweenMax.to($fadeStage, .4, {
        opacity: 0
        , ease: Linear.none
        , onComplete: function () {
            modeReplay || modeRandom || modeWatch || $lockStage.removeClass("show")
        }
    }), modeReplay || modeRandom || modeWatch || ($boxBottom.removeClass("fadeOut"), $btBonus.removeClass("fadeOut")), curVideo.stop(), reinitBonusVars()
}

function reinitBonusVars() {
    trace("*-* reinitBonusVars()"), bonusWaiting = !1, bonusPlaying = !1, bonusQueue = 0, cntBoucleBonus = 0, curVideo = null
}

function checkerCodeBonus(a, b) {
    var c = a.polo.getAssetId() + 1
        , d = a.polo
        , e = listBehindPicto[a.getGroup()]
        , f = e.find(".point .pt:eq(" + d.getId() + ")")
        , g = b ? d.getColor() : "E6E6E6";
    f.css({
        "background-color": "#" + g
    });
    for (var h = 0; h < nbBonus; h++) {
        var i = listBonus[h];
        i.checkCode(c, b)
    }
}

function videoSlideDown() {}

function videoSlideUp() {}

function loopFinished() {
    checkPoloToRemove(), checkPoloToSolo(), modeRandom && randomMix.loop(), modeReplay && readingBar.loop(), trace("loopOn = " + loopOn), loopOn && startLoop(), modeRecord && readingBar.loop()
}

function startLoop() {
    trace("[->] startLoop() boucleA=" + boucleA + " cntBoucle=" + cntBoucle), startboucle = getTime(), loopOn = !0, frame = 0, currentSndPart = 0, clock.start(loopDuration, boucleA), clock.checkAtEnd(), sndLooper.prepare(tabBuffer[nbSound + nbBonus + 1][0], 0), modeReplay && readingBar.isLastLoop() ? sndLooper.loop(readingBar.loop) : sndLooper.loop(loopFinished), (bonusWaiting || bonusPlaying) && playBonus(), bonusPlaying ? checkPoloLoader() : playSounds(), sndLooper.play(), cntBoucle++, boucleA = !boucleA
}

function playSndAspire() {
    var a = modeTop50 && isOldBonus ? tabOldBonus[0] : tabBuffer[nbSound + nbBonus][0];
    sndAspire.prepare(a, 0), sndAspire.play(getTimeSpent() / 1e3), sndAspire.fadeIn()
}

function stopLoop() {
    trace("[->] stopLoop()"), loopOn = !1, boucleA = !0, cntBoucle = 0, currentSndPart = 0, clock.stop(), sndAspire.stop(), sndLooper.stop(), stopBonusVideo(!0), stopAllPolo(), modeRecord && stopRecordMode(), modeReplay && stopReplayMode()
}

function playBonus() {
    bonusPlaying || (launchBonusVideo(), checkPoloLoader()), bonusPlaying && (cntBoucleBonus++, cntBoucleBonus == nbLoopBonus && waitForSlideUp(), cntBoucleBonus > nbLoopBonus && stopBonusVideo())
}

function playSounds() {
    for (var a = 0; a < nbPoloMax; a++) {
        var b = listPolo[a];
        b.getBusy() && (b.waitOneLoop ? (b.showLoader(), b.waitOneLoop = !1) : playSoundPolo(b))
    }
}

function playSoundPolo(a) {
    var b = a;
    b.sound.prepare(tabBuffer[b.getAssetId()][0]), b.getMoment() != cntBoucle && void 0 === b.waitOneLoop || b.hideLoader(), b.getMute() || b.mode("anime"), b.playSound()
}

function pauseAudioSource() {
    if (!bonusPlaying)
        for (var a = 0; a < nbPoloMax; a++) {
            var b = listPolo[a];
            b.getPlaying() && b.sound.pause()
        }
    sndAspire.pause(), sndLooper.pause()
}

function unpauseAudioSource() {
    if (!bonusPlaying)
        for (var a = 0; a < nbPoloMax; a++) {
            var b = listPolo[a];
            b.getPlaying() && b.sound.unpause()
        }
    sndAspire.unpause(!0), sndLooper.unpause(!0)
}

function startRender() {
    if (timenow = getTime(), timespent = getTimeSpent(), timeremain = getTimeRemain(), pctMetronome = timespent * stepPercent, frame = Math.floor(timespent * stepAnimation), clock.render(), readingBar.render(), isnull(curVideo) || curVideo.render(), !bonusPlaying) {
        contextCanvas.clearRect(0, 0, 1e3, 350);
        for (var a = 0; a < nbPoloMax; a++) listPolo[a].draw()
    }
    requestAF = requestAnimationFrame(startRender)
}

function stopRender() {
    cancelAnimationFrame(requestAF), requestAF = null
}

function stopAllStage() {
    for (var a = getListPoloBusy(), b = 0, c = a.length; b < c; b++) {
        var d = a[b];
        listPoloToRemove.push(d)
    }
    stopLoop()
}

function pauseGame() {
    if (pause) {
        pause = !1;
        var a = getTime() - pausedAt;
        startboucle += a, $lockPause.hide(), $btTool.removeClass("pause"), clock.resume(), TweenMax.resumeAll(), startRender(), unpauseAudioSource(), isnull(curVideo) || curVideo.resume()
    } else pause = !0, pausedAt = getTime(), $lockPause.show(), $btTool.addClass("pause"), clock.pause(), stopRender(), TweenMax.pauseAll(), pictoForceOnDrop(), poloForceDraw(), pauseAudioSource(), isnull(curVideo) || curVideo.pause()
}

function onPause() {
    trace("-> QUIT APP"), lock(), stopRender(), TweenMax.killTweensOf(onResumeDelayed), onGame ? (trace("on est en mode jeu"), TweenMax.pauseAll(), loopOn && !pause && (trace("Un mix est en cours on pause le tout"), pausedAt = getTime(), clock.pause(), pauseAudioSource(), isnull(curVideo) || curVideo.pause()), loopOn && pause && trace("Un mix est en cours mais l'app est déjà en pause"), loopOn || trace("Aucun mix n'est en cours")) : trace("on est pas en mode jeu on s'en bas les steacks")
}

function onResume() {
    trace("-> BACK TO APP"), stopRender(), sndTest.checkSoundCanPlay(null, function () {
        TweenMax.delayedCall(1, onResumeDelayed)
    })
}

function onResumeDelayed() {
    onGame ? (trace("on est en mode jeu"), pictoForceOnDrop(), poloForceDraw(), loopOn && !pause && (trace("Un mix est en cours on relance le tout"), startboucle += getTime() - pausedAt, clock.resume(), unpauseAudioSource(), isnull(curVideo) || curVideo.resume(), TweenMax.resumeAll()), pause || (trace("On lance le moteur de rendu"), startRender())) : trace("on est pas en mode jeu on s'en bas les steacks"), unlock()
}

function checkPoloLoader() {
    for (var a = 0; a < nbPoloMax; a++) {
        var b = listPolo[a].getMode();
        "waiting" != b && "mute" != b || listPolo[a].hideLoader()
    }
}

function pausePolos() {
    for (var a = 0; a < nbPoloMax; a++) listPolo[a].pause()
}

function resumePolos() {
    for (var a = 0; a < nbPoloMax; a++) listPolo[a].resume()
}

function getStringDate(a) {
    a = a.indexOf("/") == -1 ? a.split("-")
        .join("/") : a;
    var b = new Date(a)
        , c = b.getDate()
        , d = b.getMonth()
        , e = b.getFullYear()
        , f = [STR("txt.m1"), STR("txt.m2"), STR("txt.m3"), STR("txt.m4"), STR("txt.m5"), STR("txt.m6"), STR("txt.m7"), STR("txt.m8"), STR("txt.m9"), STR("txt.m10"), STR("txt.m11"), STR("txt.m12")];
    return c + " " + f[d] + " " + e
}

function getTime() {
    return (new Date)
        .getTime()
}

function getTimeSpent() {
    return loopOn ? timenow - startboucle : 0
}

function getTimeRemain() {
    return loopDuration - getTimeSpent()
}

function getRemainingTime(a) {
    return a = void 0 !== a && a, a ? 2 * loopDuration - (getTime() - startboucle) : loopDuration - (getTime() - startboucle)
}

function getRandomObject(a) {
    var b = Math.floor(Math.random() * a.length)
        , c = a.splice(b, 1)[0];
    return c
}

function isStageFull() {
    return getListPoloBusy()
        .length == nbPoloMax
}

function isAllPoloWaiting() {
    return 0 === getListPoloBusy()
        .length
}

function getListPoloBusy() {
    for (var a = [], b = 0; b < nbPoloMax; b++) {
        var c = listPolo[b];
        c.getBusy() && a.push(c)
    }
    return a
}

function getListPoloFree() {
    for (var a = [], b = 0; b < nbPoloMax; b++) {
        var c = listPolo[b];
        c.getBusy() || a.push(c)
    }
    return a
}

function getListPictoBusy() {
    for (var a = [], b = 0; b < nbSound; b++) {
        var c = listPicto[b];
        c.use && a.push(c)
    }
    return a
}

function getListPictoFree() {
    for (var a = [], b = 0; b < nbSound; b++) {
        var c = listPicto[b];
        c.use || a.push(c)
    }
    return a
}

function lock() {
    $lockAll.addClass("show"), pictoForceOnDrop()
}

function unlock() {
    $lockAll.removeClass("show")
}

function debugEvents(a) {
    ["loadstart", "progress", "suspend", "abort", "error", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "seeked", "ended", "timeupdate", "play", "pause", "webkitbeginfullscreen", "webkitendfullscreen"].forEach(function (b) {
        a.addEventListener(b, function () {
            console.info("@", b)
        })
    })
}

function startRandomMode() {
    trace("RANDOM"), lock(), modeRandom ? stopRandomMode() : (waitOneLoopBeforeRandom = loopOn && getRemainingTime() < 500, $lockStage.addClass("show"), modeRandom = !0, moveBtTool($btRandom, -70, lancerRandomMode))
}

function lancerRandomMode() {
    TweenMax.to($btRandom.$bck, 3, {
        rotation: 360
        , ease: Linear.easeNone
        , repeat: -1
    }), $btBonus.addClass("fadeOut"), $bckapp.addClass("fadeUp"), $boxInfo.$title.html(STR("txt.randomTitle")), $boxInfo.$name.html(STR("txt.randomText")), $boxInfo.addClass("random"), $boxInfo.addClass("fadeUp"), $boxBottom.addClass("fadeOut"), waitOneLoopBeforeRandom || randomMix.start(loopOn), unlock()
}

function stopRandomMode() {
    waitOneLoopBeforeRandom = !1, modeRandom = !1, randomMix.stop(), reinitBtTool($btRandom, afterStopRandom), TweenMax.killTweensOf($btRandom.$bck), $bckapp.removeClass("fadeUp"), $boxInfo.removeClass("fadeUp")
}

function afterStopRandom() {
    bonusPlaying || ($boxBottom.removeClass("fadeOut"), $btBonus.removeClass("fadeOut"), $lockStage.removeClass("show")), TweenMax.set($btRandom.$bck, {
        rotation: 0
    }), $boxInfo.removeClass("random"), unlock()
}

function startRecordMode() {
    lock(), modeRecord ? (trace("STOP RECORD"), stopRecordMode()) : bonusPlaying ? (TweenMax.delayedCall(.25, popupBonusPlaying), unlock()) : (trace("START RECORD"), moveBtTool($btRecord, -140, lancerRecordMode), modeRecord = !0, waitForRecording = !1, recordMix.init(), readingBar.maxLoop = app.recmaxloop, readingBar.open("record"))
}

function lancerRecordMode() {
    loopOn ? startRecording() : (waitForRecording = !0, popupDrag()), unlock()
}

function startRecording() {
    TweenMax.to($btRecord.$bck, .76, {
        opacity: 0
        , ease: Linear.easeNone
        , yoyo: -1
        , repeat: -1
    }), trace("startRecording()"), waitForRecording = !1, readingBar.start()
}

function stopRecordMode() {
    trace("stopRecordMode()"), TweenMax.killTweensOf($btRecord.$bck), TweenMax.set($btRecord.$bck, {
        opacity: 1
    }), reinitBtTool($btRecord), modeRecord = !1, readingBar.stop(), readingBar.close(), readingBar.cntLoop < readingBar.minLoop && !waitForRecording && (TweenMax.delayedCall(.25, popupShort), unlock()), readingBar.cntLoop >= readingBar.minLoop ? (pictoForceOnDrop(), stopAllStage(), popupRecok()) : (unlock(), waitForRecording = !1)
}

function startReplayMode() {
    lock(), trace("onGame = " + onGame), modeReplay ? stopReplayMode() : (modeWatch || ($lockStage.addClass("show"), $btRecord.addClass("replay"), $boxBottom.addClass("fadeOut"), $btBonus.addClass("fadeOut")), modeReplay = !0, firstWatch ? (firstWatch = !1, lancerReplayMode()) : moveBtTool($btRecord, -140, lancerReplayMode))
}

function prepareModeWatch() {
    firstWatch = !0, $lockStage.addClass("show"), $btRecord.addClass("replay"), $boxBottom.addClass("fadeOut"), $btBonus.addClass("fadeOut"), moveBtTool($btRecord, -140)
}

function lancerReplayMode() {
    TweenMax.to($btRecord.$bck, .76, {
        opacity: 0
        , ease: Linear.easeNone
        , yoyo: -1
        , repeat: -1
    });
    var a = modeWatch ? jsonDecode(mixobj.mix) : null;
    $boxInfo.$title.html(modeWatch ? a.title : STR("txt.replayTitle")), $boxInfo.$name.html(modeWatch ? "By " + a.name : STR("txt.replayText")), $boxInfo.$dedi.html(modeWatch && "" != a.dedi ? "Dedicated to " + a.dedi : ""), $boxInfo.addClass("replay fadeUp"), modeWatch ? $boxInfo.append("<a href='../' class='bt bt-long create'><div class='bck'><div class='bckimg icon-bt-create'></div><div class='txt'>" + STR("bt.create") + "</div></div><div class='hitzone'></div></a>") : ($boxInfo.append("<div class='bt bt-long save'><div class='bck'><div class='bckimg icon-bt-save'></div><div class='txt'>" + STR("bt.save") + "</div></div><div class='hitzone'></div></div>"), $boxInfo.find(".bt.save")
        .bind(evtClick, function () {
            showPopupForm = !0, startReplayMode()
        }));
    var b = modeWatch ? a.mix : recordMix.getXML();
    replayMix = new ReplayMix(b), readingBar.maxLoop = replayMix.getTotalLoop(), readingBar.open("play")
        .start(), unlock()
}

function stopReplayMode() {
    trace("stopReplayMode()"), lock(), modeReplay = !1, readingBar.stop()
        .close(), stopAllStage(), reinitBtTool($btRecord, afterStopReplay), TweenMax.killTweensOf($btRecord.$bck), modeWatch || ($boxInfo.find(".bt.save")
            .unbind(), $boxInfo.removeClass("fadeUp"))
}

function afterStopReplay() {
    trace("--> afterStopReplay()"), TweenMax.set($btRecord.$bck, {
        opacity: 1
    }), modeTop50 ? top50.mixFinished() : modeWatch ? popupReplayOk() : ($btRecord.removeClass("replay"), $boxInfo.removeClass("replay"), $boxBottom.removeClass("fadeOut"), $btBonus.removeClass("fadeOut"), $lockStage.removeClass("show"), $boxInfo.find(".bt.save")
        .remove(), popupRecok())
}

function quitReplay() {
    modeReplay = !1, modeWatch = !1, $btRecord.removeClass("replay"), $boxInfo.removeClass("replay"), $boxInfo.removeClass("fadeUp"), $boxBottom.removeClass("fadeOut"), $btBonus.removeClass("fadeOut"), $lockStage.removeClass("show")
}

function popupDrag() {
    $boxPopup.$pop.clean(), $boxPopup.$pop.$title.html(STR("pop.dragDropTitle")), $boxPopup.$pop.$text.html(STR("pop.dragDropText")), $boxPopup.$pop.reflow(), $boxPopup.open({
        icon: "info"
        , locked: !1
        , bck: "mini"
        , clicable: !0
    })
}

function popupShort() {
    $boxPopup.$pop.clean(), $boxPopup.$pop.$title.html(STR("pop.toShortTitle")), $boxPopup.$pop.$text.html(STR("pop.toShortText")), $boxPopup.$pop.reflow(), $boxPopup.open({
        icon: "info"
        , locked: !1
        , bck: "mini"
        , clicable: !0
    })
}

function popupBonusPlaying() {
    $boxPopup.$pop.clean(), $boxPopup.$pop.$title.html(STR("pop.bonusPlayingTitle")), $boxPopup.$pop.$text.html(STR("pop.bonusPlayingText")), $boxPopup.$pop.reflow(), $boxPopup.open({
        icon: "info"
        , locked: !1
        , bck: "mini"
        , clicable: !0
    })
}

function popupGamePaused() {
    $boxDialog.open(STR("pop.pauseText"), STR("pop.pauseTitle"), ["Resume"], [], !0)
}

function popupRecok() {
    showPopupForm ? (popupForm(!0), showPopupForm = !1) : ($boxPopup.$pop.clean(), $boxPopup.$pop.$title.html(STR("pop.recOkTitle")), $boxPopup.$pop.$content.append("<div class='bt bt-haut retry'><div class='bck'><div class='bckimg icon-bt-reset'></div></div><div class='txt'>" + STR("bt.retry") + "</div><div class='hitzone'></div></div>"), $boxPopup.$pop.$content.append("<div class='bt bt-haut replay'><div class='bck'><div class='bckimg icon-bt-replay'></div></div><div class='txt'>" + STR("bt.replay") + "</div><div class='hitzone'></div></div>"), $boxPopup.$pop.$content.append("<div class='bt bt-haut save'><div class='bck'><div class='bckimg icon-bt-save'></div></div><div class='txt'>" + STR("bt.save") + "</div><div class='hitzone'></div></div>"), $boxPopup.$pop.$content.find(".bt.retry")
        .bind(evtClick, clickRetryMix), $boxPopup.$pop.$content.find(".bt.replay")
        .bind(evtClick, clickReplayMix), $boxPopup.$pop.$content.find(".bt.save")
        .bind(evtClick, clickSaveMix), $boxPopup.$pop.reflow(), $boxPopup.open({
            icon: "close"
            , locked: !0
            , bck: "fullscreen"
            , unlock: !0
        }))
}

function popupReplayOk() {
    $boxPopup.$pop.clean(), $boxPopup.$pop.$title.html(STR("pop.replayOkTitle")), $boxPopup.$pop.$content.append("<a href='../' class='bt bt-haut create'><div class='bck'><div class='bckimg icon-bt-create'></div></div><div class='txt'>" + STR("bt.create") + "</div><div class='hitzone'></div></a>"), $boxPopup.$pop.$content.append("<div class='bt bt-haut replay'><div class='bck'><div class='bckimg icon-bt-replay'></div></div><div class='txt'>" + STR("bt.replay") + "</div><div class='hitzone'></div></div>"), $boxPopup.$pop.$content.find(".bt.replay")
        .bind(evtClick, clickReplayMix), $boxPopup.$pop.reflow(), $boxPopup.open({
            icon: "info"
            , locked: !0
            , bck: "fullscreen"
            , unlock: !0
        })
}

function clickRetryMix() {
    $boxPopup.close(), TweenMax.delayedCall(.2, startRecordMode)
}

function clickReplayMix() {
    $boxPopup.close(), startReplayMode()
}

function clickCreateMix() {
    $boxPopup.close(comeBackIntro)
}

function clickSaveMix() {
    $boxPopup.$box.close(popupForm)
}

function popupForm(a) {
    var b = "";
    $boxPopup.$pop.clean(), $boxPopup.$pop.$title.html(STR("pop.formTitle"));
    var c = "";
    c += "<form action='javascript:clickBtValidFormMix()' method='post' target='_self' class='popsave'>", c += "\t<div class='formzone'>", c += "\t\t<div class='formline ic-name'><i class='formic icon-popup-form-name'></i><input type='text' id='input-name' placeholder='" + STR("txt.inputName") + "' value='" + b + "' maxlength='25' autofocus/></div>", c += "\t\t<div class='formline ic-city'><i class='formic icon-popup-form-city'></i><input type='text' id='input-city' placeholder='" + STR("txt.cityState") + "' value='' maxlength='25'/></div>", c += "\t\t<div class='formline ic-email'><i class='formic icon-popup-form-mail'></i><input type='text' id='input-email' placeholder='" + STR("txt.email") + "' value='' maxlength='40'/></div>", c += "\t\t<div class='formline ic-title'><i class='formic icon-popup-form-title'></i><input type='text' id='input-title' placeholder='" + STR("txt.inputTitle") + "' value='' maxlength='25'/></div>", c += "\t\t<div class='formline ic-dedi'><i class='formic icon-popup-form-dedic'></i><input type='text' id='input-dedi' placeholder='" + STR("txt.dedicatedTo") + "...' value='' maxlength='25'/></div>", c += "\t\t<div class='formline ic-check'><label><input type='checkbox' id='input-check' value=''/>I agree with the <a href='terms/' target='_blank'>terms and conditions</a></label></div>", c += "\t</div>", c += "\t<div class='btzone'><div class='bt valid' id='bt-valid'><div class='bck'><div class='bckimg icon-bt-valid'></div></div><div class='hitzone'></div></div></div><input type='submit' style='visibility:hidden;position:absolute'/><div class='clear'></div>", c += "</form>", c += "<div class='email-info'>Email address will only be used to contact you if your Beat is selected</div>", $boxPopup.$pop.$content.append(c), $boxPopup.$pop.$content.find(".bt.valid")
        .bind(evtClick, clickBtValidFormMix), $boxPopup.$pop.reflow();
    var d = a ? $boxPopup : $boxPopup.$box;
    d.open({
        icon: "close"
        , locked: !0
        , bck: "fullscreen"
        , unlock: !0
    })
}

function blurAll() {
    $(":focus")
        .blur()
}

function clickBtValidFormMix() {
    if (!saveInPorgress) {
        saveInPorgress = !0, lock(), addSpinnerBt($boxPopup.$pop.$content.find("#bt-valid"));
        var a = $boxPopup.$pop.$content.find(".formzone #input-name")
            , b = $boxPopup.$pop.$content.find(".formzone #input-city")
            , c = $boxPopup.$pop.$content.find(".formzone #input-title")
            , d = $boxPopup.$pop.$content.find(".formzone #input-dedi")
            , e = $boxPopup.$pop.$content.find(".formzone #input-check")
            , f = $boxPopup.$pop.$content.find(".formzone #input-email")
            , g = {
                uniqid: uniqid()
                , name: trim(a.val())
                , city: trim(b.val())
                , email: trim(f.val())
                , title: trim(c.val())
                , dedi: trim(d.val())
                , mix: trim(recordMix.getXML())
                , date: getDateNow()
                , device: browser
            }
            , h = g.name.split(" ")
            .join("")
            , i = g.city.split(" ")
            .join("")
            , j = g.email
            , k = g.title.split(" ")
            .join("")
            , l = g.dedi.split(" ")
            .join("")
            , m = /[^A-Za-z0-9\u00C0-\u017F '-.,]/
            , n = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        m.test(h) ? invalidField(a) : m.test(i) ? invalidField(b) : n.test(j) ? m.test(k) ? invalidField(c) : m.test(l) ? invalidField(d) : "" === h ? invalidField(a) : "" !== j || n.test(j) ? "" === k ? invalidField(c) : e.prop("checked") ? (a.blur(), b.blur(), f.blur(), c.blur(), d.blur(), recordMix.setData(g), xhr("POST", DOMAIN + "/php/mix-save.php", g, function (a) {
            "success" == a.state ? (recordMix.setData(a.mix), $boxPopup.$box.close(popupShare)) : $boxPopup.$box.close(popupSaveFailed), saveGA("SAVE MIX", a.state, browser.txt), removeSpinnerBt($boxPopup.$pop.$content.find("#bt-valid"))
        }, function (a) {
            $boxPopup.$box.close(popupSaveFailed), removeSpinnerBt($boxPopup.$pop.$content.find("#bt-valid")), saveGA("SAVE MIX", "XHR Error", browser.txt)
        })) : invalidField(e) : invalidField(f) : invalidField(f)
    }
}

function invalidField(a) {
    a.addClass("invalid")
        .one(animationEnd, function (a) {
            removeSpinnerBt($boxPopup.$pop.$content.find("#bt-valid")), $(a.target)
                .removeClass("invalid")
        }), saveInPorgress = !1, unlock()
}

function popupSaveFailed() {
    saveInPorgress = !1, $boxPopup.$pop.clean(), $boxPopup.$pop.$title.html(STR("pop.sharingBugTitle")), $boxPopup.$pop.$text.html(STR("pop.sharingBugText")), $boxPopup.$pop.$content.append("<div class='bt bt-haut save'><div class='bck'><div class='bckimg icon-bt-save'></div></div><div class='txt'>" + STR("bt.save") + "</div><div class='hitzone'></div></div>"), $boxPopup.$pop.$content.find(".bt.save")
        .bind(evtClick, clickSaveMix), $boxPopup.$pop.reflow(), $boxPopup.open({
            icon: "close"
            , locked: !0
            , bck: "fullscreen"
            , unlock: !0
        })
}

function popupShare() {
    saveInPorgress = !1;
    var a = recordMix.getData()
        , b = DOMAIN + "/mix/" + a.link
        , c = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(b)
        , d = "http://twitter.com/intent/tweet?text=" + encodeURIComponent(STR("pop.sharePresentMix")) + "&url=" + encodeURIComponent(b);
    $boxPopup.$pop.clean(), $boxPopup.$pop.$title.html(STR("pop.shareTitle")), $boxPopup.$pop.$text.html(STR("pop.shareText")), $boxPopup.$pop.$content.append("<a href='" + c + "' target='_blank' class='bt some facebook color'><div class='bck'><div class='bckimg icon-bt-fb'></div></div><div class='hitzone'></div></a>"), $boxPopup.$pop.$content.append("<a href='" + d + "' target='_blank' class='bt some twitter color'><div class='bck'><div class='bckimg icon-bt-twit'></div></div><div class='hitzone'></div></a>"), $boxPopup.$pop.$content.append("<a href='" + b + "' class='bt link color'><div class='bck'><div class='bckimg icon-bt-link'></div></div><div class='hitzone'></div></a>"), isDevice || $boxPopup.$pop.$content.find($(".bt.some"))
        .bind(evtClick, function (a) {
            a.preventDefault(), windowPopup($(this)
                .attr("href"), 560, 350, !0)
        }), $boxPopup.$pop.reflow(), $boxPopup.$box.open({
            icon: "close"
            , locked: !0
            , bck: "fullscreen"
            , unlock: !0
        }), $boxPopup.funcOnClose = function () {
            blurAll()
        }
}

function addSpinnerBt(a) {
    a.find(".bck")
        .append("<div class='spinner'><div class='bckspin'></div><div class='spin'></div></div>"), a.addClass("spinning")
}

function removeSpinnerBt(a) {
    a.find(".spinner")
        .remove(), a.removeClass("spinning")
}

function popupIncredibox(a) {
    stopProp(a), $boxPopup.$pop.clean(), $("#popup-incredibox")
        .clone()
        .appendTo($boxPopup.$pop.$content), $boxPopup.$pop.reflow(), $boxPopup.open({
            icon: "close"
            , bck: "fullscreen"
            , custom: !0
            , locked: !0
        })
}

function popupUpdate() {
    $boxPopup.$pop.clean(), $("#popup-msg")
        .clone()
        .appendTo($boxPopup.$pop.$content), $boxPopup.$pop.$content.find(".title")
        .html("Hey buddy,<br>we're sorry"), $boxPopup.$pop.$content.find(".text")
        .html(browser.msg), $boxPopup.$pop.reflow(), $boxPopup.open({
            icon: ""
            , bck: "fullscreen"
            , custom: !0
            , locked: !0
        })
}

function popupOwner() {
    $boxPopup.$pop.clean(), $("#popup-msg")
        .clone()
        .appendTo($boxPopup.$pop.$content), $boxPopup.$pop.$content.find(".title")
        .html(STR("pop.owner.title")), $boxPopup.$pop.$content.find(".text")
        .html(STR("pop.owner.text")), $boxPopup.$pop.reflow(), $boxPopup.open({
            icon: "close"
            , bck: "fullscreen"
            , custom: !0
            , locked: !0
        })
}

function popupGate() {
    $boxPopup.$pop.clean(), $("#popup-gate")
        .clone()
        .appendTo($boxPopup.$pop.$content), $boxPopup.$pop.reflow(), $boxPopup.open({
            icon: "close"
            , bck: "fullscreen"
            , custom: !0
            , locked: !0
        }), $boxPopup.$pop.$icon.unbind(), $boxPopup.$pop.$icon.attr("href", "http://www.mars.com/global/about-mars/mars-pia/health-and-nutrition/responsible-marketing.aspx")
}

function popupGateSorry() {
    $boxPopup.$pop.$content.find(".title")
        .html(STR("pop.sorry.title")), $boxPopup.$pop.$content.find(".text")
        .html(STR("pop.sorry.text")), $boxPopup.$pop.$content.find("form")
        .remove(), $boxPopup.$pop.$content.find(".cont")
        .append("<a href='http://www.mars.com/global/about-mars/mars-pia/health-and-nutrition/responsible-marketing.aspx' target='_blank' rel='external' class='big-button' id='bt-understand'>" + STR("bt.understand") + "</a>"), $boxPopup.$pop.$content.find(".cont")
        .append($boxPopup.$pop.$content.find(".info"))
}

function clickBtGate() {
    function a(a) {
        var b = Date.now() - a.getTime()
            , c = new Date(b);
        return Math.abs(c.getUTCFullYear() - 1970)
    }
    
    function b(a) {
        a.addClass("invalid")
            .one(animationEnd, function (a) {
                $(a.target)
                    .removeClass("invalid")
            })
    }
    var c = $boxPopup.$pop.$content.find("form #ip-month")
        , d = $boxPopup.$pop.$content.find("form #ip-day")
        , e = $boxPopup.$pop.$content.find("form #ip-year")
        , f = c.val()
        , g = d.val()
        , h = e.val();
    if (isNaN(Number(f)) || Number(f) < -99 || Number(f) > 99) b(c);
    else if (isNaN(Number(g)) || Number(g) < -99 || Number(g) > 99) b(d);
    else if (isNaN(Number(h)) || Number(h) < -9999 || Number(h) < 0 || Number(h) > 9999) b(e);
    else {
        var i = new Date(h, f, g);
        a(i) < 1 ? (Cookies.set("gate", "good", {
            expires: 7
        }), popupGateSorry()) : (Cookies.set("gate", "good", {
            expires: 7
        }), $boxPopup.close(gateChecked))
    }
}

function initTop50() {
    function a() {
        j = $(this)
            .text()
            .toLowerCase(), b(j)
    }
    
    function b(a) {
        $(".top-50 .bt-filter .bt-fil.selected")
            .removeClass("selected"), $(".top-50 .list .page.selected")
            .removeClass("selected"), $(".top-50 .bt-filter .bt-fil#bt-fil-" + a)
            .addClass("selected"), $(".top-50 .list .page#page-" + a)
            .addClass("selected")
    }
    
    function c(a) {
        if (appLoaded || (popupIsWaiting = !0), k) {
            if (k = !1, isDevice && !popupIsWaiting) {
                simulerClickAudioIOS(tabBuffer[0][0]);
                listBonus[0].playtest()
            }
            e()
        }
        var b = $(a)
            , c = b.attr("data-link")
            , d = listMix[c]
            , h = $boxPopup.$pop.find(".mix-info")
            .empty();
        b.find(".inbox.icon")
            .clone()
            .appendTo(h), b.find(".inbox.info")
            .clone()
            .appendTo(h), h.find(".inbox.icon")
            .find("span")
            .hasClass("icon-top-play-jessie") && h.find(".inbox.icon")
            .find("span")
            .removeClass("icon-top-play-jessie")
            .addClass("icon-top-play-jessie-pop"), h.append("<div class='inbox bts'><a href='../mix/" + c + "' class='bt link color'><div class='bck'><div class='bckimg icon-bt-link'></div></div><div class='hitzone'></div></a></div>"), popupIsWaiting ? i = d : (recordMix.setXML(d), g()), f()
    }
    
    function d() {
        $boxPopup.removeClass("popapp"), $boxPopup.addClass("hideapp")
    }
    
    function e() {
        appLoaded || ($fadeAll.find("span")
            .append("<div class='spinner'><div class='bckspin'></div><div class='spin'></div></div>"), $fadeAll.addClass("loading")), $boxPopup.$pop.prepend($webapp), $boxPopup.$pop.append("<div class='mix-info'></div>"), $webapp.show()
    }
    
    function f() {
        $boxPopup.removeClass("hideapp"), $boxPopup.funcOnClose = d, $boxPopup.addClass("popapp"), $boxPopup.open({
            icon: "close"
            , bck: "fullscreen"
            , custom: !0
            , locked: !0
        }), $boxPopup.$pop.$icon.bind(evtClick, h), resizer.resize()
    }
    
    function g() {
        startReplayMode()
    }
    
    function h() {
        i = null, modeReplay && startReplayMode()
    }
    var i, j = "day"
        , k = !0
        , l = !1;
    return $webapp.hide(), $(".top-50 .bt-filter .bt-fil")
        .on(evtClick, a), b(j), isDevice && ($(".top-50")
            .on(evtMove, function (a) {
                l = !0
            }), $(".top-50")
            .on(evtPressEnd, function (a) {
                l = !1
            })), $(".top-50")
        .find(".line")
        .not(":empty")
        .on(evtPressEnd, function (a) {
            l || c(this)
        }), this.mixFinished = function () {
            $boxPopup.$pop.$icon.trigger(evtClick)
        }, this.launchMix = function () {
            $fadeAll.find("span")
                .empty(), popupIsWaiting = !1, isnull(i) || (recordMix.setXML(i), i = null, isDevice ? ($fadeAll.find("span")
                    .addClass("icon-top-bt-play"), $fadeAll.addClass("waiting"), $fadeAll.on(evtPressEnd, function () {
                        $fadeAll.off(evtPressEnd);
                        simulerClickAudioIOS(tabBuffer[0][0]);
                        listBonus[0].playtest(), $fadeAll.removeClass("waiting"), g()
                    })) : g()), $fadeAll.removeClass("loading")
        }, this
}
var gestureLocked = !1
    , cumulativeOffset = function (a) {
        var b = 0
            , c = 0;
        do b += a.offsetTop || 0, c += a.offsetLeft || 0, a = a.offsetParent; while (a);
        return {
            top: b
            , left: c
        }
    }
    , tap1, tap2, tapTimer, cntTap = 0
    , AnimationIntro = function () {
        function a() {
            errorPrelaod || (appLoaded ? clickHomeBtPlay() : timel.restart())
        }
        
        function b() {
            $red.addClass("animate"), j.addClass("animate"), sndIntro.prepare(sndIntro.buffer, 1), sndIntro.loop(c), sndIntro.play()
        }
        
        function c() {
            $red.removeClass("animate"), sndIntro.stop()
        }
        
        function d(a, b) {
            var b = b === !0
                , c = b ? .4 : 0;
            b && TweenMax.set(a, {
                opacity: .4
                , delay: c
            }), TweenMax.to(a, .3, {
                scale: "-=.5"
                , opacity: 0
                , ease: Back.easeIn
                , onComplete: function () {
                    TweenMax.to(this.target, .3, {
                        scale: "+=.5"
                        , opacity: 1
                        , ease: Back.easeOut
                        , onComplete: function () {
                            TweenMax.to(this.target, .4, {
                                y: "-=80"
                                , opacity: 0
                                , ease: Circ.easeIn
                                , onComplete: function () {
                                    TweenMax.set(a, {
                                        y: "+=80"
                                    }), b ? TweenMax.to(this.target, .8, {
                                        opacity: .4
                                        , ease: Linear.easeNone
                                        , delay: .3
                                    }) : d(this.target, !0)
                                }
                            })
                        }
                    })
                }
                , delay: c
            })
        }
        
        function e() {
            $hand.addClass("icon-tuto-hand-close")
                .removeClass("icon-tuto-hand-open")
        }
        
        function f() {
            $hand.addClass("icon-tuto-hand-open")
                .removeClass("icon-tuto-hand-close")
        }
        
        function g() {
            var a = new XMLHttpRequest;
            a.open("GET", DIR + "asset/sound/red-effect-cut.mp3", !0), a.responseType = "arraybuffer", a.onload = function () {
                contextAudio.decodeAudioData(a.response, function (a) {
                    needFirstClick ? ($btIntro = $("#home-bt-intro"), TweenMax.to($btIntro, .4, {
                        scale: 1
                        , opacity: 1
                        , ease: Back.easeOut
                        , onComplete: function () {
                            appLoaded && TweenMax.to($homeLoadbox, 0, {
                                opacity: 0
                            }), $btIntro.bind(evtPressEnd, function () {
                                $btIntro.unbind(), sndIntro = simulerClickAudioIOS(a), TweenMax.to($btIntro, .2, {
                                    scale: 0
                                    , autoAlpha: 0
                                    , ease: Back.easeIn
                                    , onComplete: function () {
                                        $btIntro.remove(), h.play()
                                    }
                                })
                            })
                        }
                    })) : (sndIntro = simulerClickAudioIOS(a), h.play())
                }, function (a) {
                    errorTabToLoad("Error Decode audio intro [ red-effect-cut.mp3 ]")
                })
            }, a.onerror = function () {
                errorTabToLoad("Error Load audio intro [ red-effect-cut.mp3 ]")
            }, a.send()
        }
        var h = this
            , i = $("#intro")
            , j = $("#tuto-red-asset");
        $hand = $("#tuto-hand"), $picto = $("#tuto-picto"), $note1 = $("#tuto-note1"), $note2 = $("#tuto-note2"), $note3 = $("#tuto-note3"), $red = $("#tuto-red-face"), timel = (new TimelineMax)
            .pause(), list = [$hand, $picto, $note1, $note2, $note3, $red], sndIntro = {}, this.stop = function () {
                timel.pause(), TweenMax.killTweensOf(list), TweenMax.killTweensOf(d), c(), sndIntro = null, i.remove(), h = null
            }, this.play = function () {
                needFirstClick = !1, timel.play(), showBtHome()
            }, timel.set([$note1, $note2, $note3], {
                clearProps: "all"
            }), timel.from($hand, .5, {
                x: "+=50"
                , y: "+2=0"
                , opacity: 0
                , ease: Circ.easeOut
            }), timel.addCallback(e, "+=.3"), timel.set($picto, {
                x: "+=10"
                , y: "+=10"
            }), timel.set($hand, {
                x: "-=10"
                , y: "-=10"
            }), timel.to([$picto, $hand], 1, {
                x: "+=400"
                , y: "+=40"
                , ease: Quint.easeInOut
                , delay: .3
            }), timel.addCallback(f, "+=.3"), timel.to($picto, .3, {
                scale: .5
                , opacity: 0
                , ease: Back.easeIn
            }), timel.addCallback(b), timel.to($hand, .7, {
                x: "+=80"
                , y: "+=20"
                , opacity: 0
                , ease: Circ.easeInOut
                , delay: .3
            }), timel.set($picto, {
                clearProps: "x,y"
            }), timel.to($picto, .7, {
                scale: 1
                , opacity: .4
                , ease: Circ.easeOut
            }), timel.addCallback(d, "-=0.5", $note1), timel.addCallback(d, "-=0.4", $note3), timel.addCallback(d, "-=0.3", $note2), timel.addCallback(a, "+=3"), TweenMax.to(i, .4, {
                opacity: 1
                , onComplete: g
            })
    };
document.addEventListener("DOMContentLoaded", DOMReady, !1);
var isDevice = isTouchDevice()
    , isiPod = iPodDevice()
    , isiPhone = iPhoneDevice()
    , isiPad = iPadDevice()
    , isIOS = isIOSDevice()
    , isAndroid = isAndroidDevice()
    , modeWatch = "undefined" != typeof mixobj && !isnull(mixobj)
    , modeTop50 = "undefined" != typeof top50 && top50
    , evtClick = isDevice ? "touchstart" : "click"
    , evtPress = isDevice ? "touchstart" : "mousedown"
    , evtPressEnd = isDevice ? "touchend" : "mouseup"
    , evtMove = isDevice ? "touchmove" : "mousemove"
    , transitionEnd = transitionEndEventName()
    , animationEnd = animationEndEventName()
    , scaleApp = 1
    , browser = getBrowser()
    , RAFsupported = !0
    , bugCanvasEllipse = !1
    , bugInlineVideo = !1
    , isIOS103 = !1
    , errorPrelaod = !1
    , isOldBonus = !1
    , $body, $wrapper, $header, $section, $webapp, $lockAll, $lockPause, $lockStage, $fadeAll, $boxInfo, $bckapp, $btBonus, $btTool, $btStop, $btRecord, $cntRecord, $btRandom, $home, $homeLoadbox, $homeLoadbar, $homeBtPlay, $present, $rounder, $boxVideo, $videoFlow, $fadeStage, $boxBottom, $boxDialog, $boxPopup, $gameTouch, contextCanvas, contextAudio, needFirstClick = isDevice
    , intro, needCallback = !1
    , appLoaded = !1
    , appViewed = !1
    , onGame = !1
    , delayassist = 500
    , clock, resizer, top50, tabBuffer, tabAnime, nbPolo, nbSound, nbSoundBonus, nbBonus, nbAnime, nbData, nbTotalAsset, tabToLoad, cntLoad, tabOldBonus, loopDuration, nbLoopBonus, nbPoloMax, listPolo, listPicto, listBonus, listBehindPicto = []
    , listPoloDrop = []
    , listPoloToRemove = []
    , listPoloToSolo = []
    , tabFirstSound = []
    , tabPoloOnStage = []
    , tabPoloBusy = []
    , nbPoloToAnime = 0
    , pictoDrag = null
    , modeRandom = !1
    , modeRecord = !1
    , modeReplay = !1
    , waitForRecording = !1
    , mouseX = 0
    , mouseY = 0
    , readingBar, randomMix, recordMix, replayMix, isToolbarOpen = !1
    , isToolbarMove = !1
    , tabPictoOnDrag = []
    , btClockClickedAt = 0
    , curVideo = null
    , loopOn = !1
    , waitingFirstLoop = !1
    , bonusPlaying = !1
    , bonusWaiting = !1
    , bonusQueue = 0
    , pause = !1
    , boucleA = !0
    , cntBoucle = 0
    , cntBoucleBonus = 0
    , timenow, timespent, timeremain = 0
    , pctMetronome = 0
    , frame = 0
    , frameTotal = 0
    , stepAnimation = 0
    , stepPercent = 0
    , currentSndPart = 0
    , requestAF, sndLooper, sndAspire, sndTest, startboucle = 0
    , pausedAt = 0
    , timeoutRender, PoloObject = function (a, b, c, d, e, f, g, h, i, j) {
        function k() {
            var a = random(7) + 2;
            TweenMax.delayedCall(a, m)
        }
        
        function l() {
            TweenMax.killTweensOf(m)
        }
        
        function m() {
            Ca = getTime();
            var a = random(Ga.length - 1);
            Fa = Ga[a], Da = Fa.length, Ea = Da / (36 * Da), C.mode("cligne")
        }
        
        function n() {
            C.mode("normal")
        }
        
        function o() {
            la.globalAlpha = 1, la.drawImage(pa, 0, 0, Ja, Ka, C.posX, C.posY, Ha, Ia)
        }
        
        function p(a, b) {
            la.drawImage(pa, a * va, b * va, Ja, 60 * va, C.posX, C.posY + qa.posY, Ha, 60)
        }
        
        function q() {
            la.globalAlpha = ra, la.drawImage(pa, Ja, 0, Ja, Ka, C.posX, C.posY, Ha, Ia)
        }
        
        function r() {
            o(), p(600, 0), q()
        }
        
        function s() {
            C.updateLoader(), la.globalAlpha = 1, la.drawImage(U, 3 * Na, 0, Na, Oa, C.posX, C.posY, La, Ma), la.drawImage(U, Na, 0, Na, Oa, C.posX, C.posY, La, Ma), la.drawImage(U, 0, 0, Na, Oa, C.posX, C.posY, La, Ma)
        }
        
        function t() {
            C.updateLoader(), la.globalAlpha = 1, la.drawImage(U, 3 * Na, 0, Na, Oa, C.posX, C.posY, La, Ma), la.drawImage(U, Na, 0, Na, Oa, C.posX, C.posY, La, Ma), la.drawImage(U, 0, 0, Na, Oa, C.posX, C.posY, La, Ma), la.globalAlpha = sa, la.drawImage(U, 2 * Na, 0, Na, Oa, C.posX, C.posY, La, Ma)
        }
        
        function u() {
            if (aa) r();
            else {
                C.anime(), la.globalAlpha = 1;
                var a = C.posX + K
                    , b = C.posY + L;
                la.drawImage(U, M, N, Na, Z, C.posX, C.posY + _, Na, Z), la.drawImage(U, Na, 0, Na, Oa, a, b, La, Ma), la.drawImage(U, I, J + 1, Na, X - 1, a, b + Y + 1, Na, X - 1)
            }
        }
        
        function v() {
            var a = timenow - Ca
                , b = Math.floor(a * Ea);
            b = b > Da - 1 ? Da - 1 : b, o(), p(600, 60 * Fa[b]), q(), b >= Da - 1 && n()
        }
        
        function w() {
            if (ea) u();
            else if (bugCanvasEllipse) o(), p(600, 0);
            else {
                o();
                var a = C.getPupPos(qa.p1x, qa.p1y, qa.dist)
                    , b = C.getPupPos(qa.p2x, qa.p2y, qa.dist);
                la.beginPath(), la.fill(), la.ellipse(a[0], a[1], qa.pW, qa.pH, 0, 0, 2 * Math.PI), la.ellipse(b[0], b[1], qa.pW, qa.pH, 0, 0, 2 * Math.PI), la.closePath(), la.fill(), mouseY < G + C.posY + 50 ? p(400, 180) : mouseY >= G + C.posY + 50 && mouseY < G + C.posY + 100 ? p(400, 120) : mouseY >= G + C.posY + 180 ? p(400, 60) : p(400, 0)
            }
        }
        
        function x() {
            w(), q()
        }
        
        function y() {
            w()
        }
        
        function z() {
            ga ? (1 == getTotalSolo() ? stopSoloPolo() : C.mute(), ga = !1) : C.switchMute()
        }
        
        function A() {
            clickPolo(C)
        }
        
        function B() {
            ga = checkIfPoloAlone(C), ga ? (ga = !1, unmuteAll(C)) : (ga = !0, muteAll(C))
        }
        this.sound = new SndObject(c);
        var C = this
            , D = $("#polo" + a, b)
            .css({
                left: e + (g - i) / 2 + "px"
                , top: f + (h - j) / 2 + "px"
                , width: i + "px"
                , height: j + "px"
            })
            , E = $('<div class="zone"><div class="loader"><div class="bar"></div></div><div class="pointer"></div></div>');
        $("#box-loader")
            .append(E), E.css({
                left: e + (g - i) / 2 + "px"
                , width: i + "px"
            });
        var F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, _, aa, ba, ca, da, ea, fa, ga, ha = $(".loader", E)
            .css({
                "margin-left": "" + String(Math.round((i - 80) / 2)) + "px"
            })
            , ia = $(".bar", E)
            , ja = $(".pointer", E)
            , ka = a
            , la = d
            , ma = ""
            , na = "normal"
            , oa = !1
            , pa = app.persoarray[ka].sprite
            , qa = app.persoarray[ka].eyes
            , ra = .6
            , sa = .7
            , ta = r
            , ua = !1
            , va = 1
            , wa = D.find(".ctrl")
            , xa = D.find(".icon-game-bt-mute")
            , ya = D.find(".icon-game-bt-solo")
            , za = D.find(".icon-game-bt-delete")
            , Aa = f
            , Ba = h - Aa;
        this.posX = e, this.posY = Ba, this.pictoHoverId = null, this.reinit = function () {
            k(), C.draw(), ua = !1, C.pictoHoverId = null, I = J = K = L = M = N = O = P = Q = 0, ma = R = S = T = U = V = W = X = Y = Z = _ = null, aa = ba = ca = da = ea = fa = ga = !1, C.sound.reinit()
        }, this.relance = function () {
            C.desactiverClick(), C.desactiverCtrl(), C.stopSound(), C.getPicto()
                .reactiver(!0), s()
        }, this.setPosition = function () {
            F = b.offset()
                .left, G = b.offset()
                .top, H = {
                    px: D.offset()
                        .left
                    , py: D.offset()
                        .top
                    , width: D.outerWidth()
                    , height: D.outerHeight()
                }
        }, this.getId = function () {
            return ka
        }, this.getPicto = function () {
            return R
        }, this.getAssetId = function () {
            return S
        }, this.getMoment = function () {
            return O
        }, this.getLoop = function () {
            return P
        }, this.getEnabled = function () {
            return ba
        }, this.getBusy = function () {
            return ca
        }, this.getMode = function () {
            return na
        }, this.getDeleting = function () {
            return ea
        }, this.getPlaying = function () {
            return da
        }, this.getDiv = function () {
            return D
        }, this.getMute = function () {
            return fa
        }, this.getSolo = function () {
            return ga
        }, this.getColor = function () {
            return app.persoarray[ka].color
        }, this.setSolo = function (a) {
            ga = a
        }, this.setMute = function (a) {
            fa = a
        }, this.setLoop = function (a) {
            P = a
        }, this.setMoment = function (a) {
            O = a
        }, this.setPlaying = function (a) {
            da = a
        }, this.habiller = function (a, b, c, d, e) {
            R = a, S = b, O = c, T = d.imgData, X = Number(d.headHeight), Y = Number(d.headPosY), Z = Number(d.legsHeight), _ = Number(d.legsPosY), U = d.imgSprite, ma = d.color, Q = T.length, ca = !0, C.activerCtrl(), ia.css({
                "background-color": "#" + ma
            }), ja.css({
                "background-color": "#" + ma
            }), oa ? C.mode("waiting") : (aa = !0, TweenMax.delayedCall(e, C.rebond)), recordMix.xmlAction("append", C)
        }, this.deshabiller = function (a, b) {
            ea = !0, ca = !1;
            var c = (C.posY, b ? 0 : .3);
            TweenMax.to(this, c, {
                posY: Ba
                , ease: Quint.easeIn
                , onComplete: C.remonte
                , onCompleteParams: [0, !0, b]
                , delay: a
                , overwrite: !0
            }), this.hideLoader(), C.desactiverCtrl(), recordMix.xmlAction("remove", C)
        }, this.baisser = function (a, b) {
            this.posY = Ba
        }, this.remonte = function (a, b, c) {
            oa = !0, b === !0 && (R.reactiver(!0), C.reinit(), majListPoloDrop()), C.mode("normal");
            var d = (C.posY, c ? 0 : .4);
            TweenMax.to(C, d, {
                posY: Aa
                , ease: Back.easeOut
                , delay: a
                , onComplete: function () {
                    oa = !1
                }
                , overwrite: !0
            })
        }, this.rebond = function (a) {
            var b = C.posY
                , c = b - 20
                , d = da ? "anime" : "waiting";
            d = fa ? "mute" : d, C.mode(d), TweenMax.to(C, .1, {
                posY: c
                , ease: Quint.easeOut
                , onComplete: C.rebond2
                , overwrite: !0
            }), aa = !1
        }, this.rebond2 = function () {
            var a = C.posY
                , b = a + 20;
            TweenMax.to(C, .2, {
                posY: b
                , ease: Back.easeOut
                , overwrite: !0
            })
        }, this.showLoader = function () {
            TweenMax.to(ha, .3, {
                scaleX: 1
                , ease: Quint.easeOut
                , overwrite: !0
            })
        }, this.showYou = function () {
            da && ja.addClass("show")
                .one(animationEnd, function (a) {
                    $(a.target)
                        .removeClass("show")
                })
        }, this.hideLoader = function () {
            TweenMax.to(ha, .2, {
                scaleX: 0
                , ease: Quint.easeOut
                , overwrite: !0
            })
        };
        var Ca, Da, Ea = 0
            , Fa = []
            , Ga = [[0, 1, 2, 2, 1, 0], [0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 2, 2, 2, 0], [0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0], [0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 2, 4, 4, 4, 4, 4, 2, 2, 0]]
            , Ha = g
            , Ia = h
            , Ja = Ha * va
            , Ka = Ia * va
            , La = g
            , Ma = h
            , Na = La * va
            , Oa = Ma * va;
        this.mode = function (a) {
            if (a != na) switch (l(), na = a) {
            case "normal":
                ta = r, k();
                break;
            case "cligne":
                ta = v;
                break;
            case "regarde":
                ta = x;
                break;
            case "hover":
                ta = y;
                break;
            case "waiting":
                ta = s;
                break;
            case "anime":
                ta = u;
                break;
            case "mute":
                ta = t;
                break;
            default:
                trace("bug polo mode")
            }
        }, this.draw = function () {
            ta()
        }, this.updateLoader = function () {
            ia.css({
                width: pctMetronome + "%"
            })
        }, this.anime = function () {
            var a = frame;
            a >= Q - 1 && (a = Q - 1), I = Number(T[a][0]), J = Number(T[a][1]), K = Number(T[a][2]), L = Number(T[a][3]), M = Number(T[a][4]), N = Number(T[a][5])
        }, this.getPupPos = function (a, b, c) {
            var d = (mouseX - F) / scaleApp
                , e = (mouseY - G) / scaleApp
                , f = d - a - this.posX
                , g = e - b - this.posY
                , h = Math.atan2(g, f)
                , i = c * Math.cos(h) + (C.posX + a)
                , j = c * Math.sin(h) + (C.posY + b);
            return [i, j]
        };
        var Pa, Qa = !1
            , Ra = !1
            , Sa = 0
            , Ta = 0
            , Ua = isDevice ? 45 : 20
            , Va = 0
            , Wa = 0
            , Xa = isDevice ? 45 : 20;
        this.activerClick = function () {
            ba = !0, D.bind(evtPress, C.touchStart)
        }, this.desactiverClick = function () {
            ba = !1, clearTimeout(Pa), D.unbind(evtPress, C.touchStart), D.unbind(evtMove, C.touchMove), D.unbind(evtPressEnd, C.touchEnd)
        }, this.touchStart = function (a) {
            Qa = Ra = !1;
            var b = isDevice ? a.originalEvent.targetTouches[0] : a;
            Sa = Ta = b.pageX, Va = Wa = b.pageY, Pa = setTimeout(function () {
                C.touchLong(a)
            }, 250), D.bind(evtMove, C.touchMove), D.bind(evtPressEnd, C.touchEnd)
        }, this.touchMove = function (a) {
            var b = isDevice ? a.originalEvent.targetTouches[0] : a;
            Ta = b.pageX, Wa = b.pageY, Wa > Va + Xa && Math.abs(Ta - Sa) < Ua && (clearTimeout(Pa), A())
        }, this.touchLong = function (a) {
            clearTimeout(Pa), ga = !0, soloPolo(C)
        }, this.touchEnd = function (a) {
            Qa = !0, clearTimeout(Pa), D.unbind(evtMove, C.touchMove), D.unbind(evtPressEnd, C.touchEnd), z()
        }, this.activerCtrl = function () {
            isDevice || (wa.addClass("visible")
                .bind(evtPress, stopProp), xa.bind(evtClick, z), ya.bind(evtClick, B), za.bind(evtClick, A))
        }, this.desactiverCtrl = function () {
            isDevice || (wa.removeClass("visible")
                .unbind(), xa.unbind(), ya.unbind(), za.unbind())
        }, this.playSound = function () {
            da = !0, fa && this.sound.mute(), this.sound.play(0), P++
        }, this.stopSound = function () {
            da = !1, this.sound.stop(!fa)
        }, this.mute = function () {
            fa = !0, this.mode("mute"), this.sound.mute(), recordMix.xmlAction("mute", C)
        }, this.unmute = function () {
            fa = !1, da ? this.mode("anime") : this.mode("waiting"), this.sound.unmute(), recordMix.xmlAction("unmute", C)
        }, this.switchMute = function () {
            fa ? C.unmute() : C.mute()
        }, this.hitTest = function (a, b) {
            var c = a
                , d = b;
            return c > H.px && c < H.px + H.width * scaleApp && d > H.py && d < H.py + H.height * scaleApp
        }, this.hitTestPicto = function (a) {
            if (!ea) {
                var b = a.getBound();
                return C.hitTest(Math.round(b.px), Math.round(b.py))
            }
            return !1
        }, this.rollover = function () {
            ua || (ua = !0, C.mode("hover"))
        }, this.rollout = function (a) {
            var b = !isnull(a) && a;
            b ? (ua = !1, C.mode("normal")) : ua && (ua = !1, C.mode("regarde"))
        }, this.setPosition(), this.reinit()
    }
    , PictoObject = function (a, b, c) {
        var d, e, f, g, h, i = this
            , j = a
            , k = b
            , l = $("#picto" + j, c)
            , m = isDevice ? l : $body
            , n = $(".scale", l)
            , o = l.innerWidth()
            , p = 1.2
            , q = 0
            , r = {
                px: 0
                , py: 0
                , _x: 0
                , _y: 0
            };
        this.getDiv = function () {
            return l
        }, this.getId = function () {
            return j
        }, this.getGroup = function () {
            return k
        }, this.getColor = function () {
            return h
        }, this.use = !1, this.polo = null, this.init = function (a, b, c) {
            h = c, q = -(k * o), l.css({
                top: b + "px"
                , left: a + "px"
            }), n.css({
                visibility: "hidden"
            }), i.setPosition()
        }, this.setPosition = function () {
            g = l.parent()
                .offset()
                .top, f = l.parent()
                .offset()
                .left, d = l.offset()
                .left, e = l.offset()
                .top
        }, this.getBound = function () {
            return r
        }, this.activer = function () {
            i.desactiver(), l.removeClass("disable"), l.bind(evtPress, i.touchStart)
        }, this.desactiver = function () {
            l.addClass("disable"), l.unbind(), m.unbind(evtMove, i.touchMove), m.unbind(evtPressEnd, i.touchEnd)
        }, this.touchStart = function (a) {
            l.unbind(), l.addClass("drag"), n.css({
                visibility: "visible"
            }), m.bind(evtMove, i.touchMove), m.bind(evtPressEnd, i.touchEnd);
            var b = a;
            a = isDevice ? a.originalEvent : a, i.touchMove(b), pictoOnDrag(i)
        }, this.touchMove = function (a) {
            a = isDevice ? a.originalEvent : a;
            var b = isDevice ? a.targetTouches[0] : a
                , c = b.pageX
                , d = b.pageY;
            i.bouger(c, d), a.preventDefault(), pictoOnMove(i)
        }, this.touchEnd = function () {
            m.unbind(), l.removeClass("drag"), pictoOnDrop(i)
        }, this.bouger = function (a, b) {
            var c = decimal((a - d) / scaleApp, 2)
                , f = decimal((b - e) / scaleApp, 2);
            r = {
                px: a
                , py: b
                , _x: c
                , _y: f
            }, c -= o / 2, f -= o / p, TweenMax.set(l, {
                x: c
                , y: f
                , z: 0
            })
        }, this.replacer = function () {
            TweenMax.to(l, .4, {
                x: 0
                , y: 0
                , ease: Quad.easeOut
                , onComplete: i.replacerFini
            })
        }, this.forceReplacer = function () {
            i.desactiver(), l.removeClass("drag"), TweenMax.set(l, {
                x: 0
                , y: 0
                , z: 0
            }), i.reactiver()
        }, this.absorber = function (a) {
            i.desactiver(), TweenMax.set(l, {
                x: 0
                , y: 0
                , z: 0
            }), n.css({
                visibility: "hidden"
            }), i.use = !0, i.polo = a
        }, this.reactiver = function (a) {
            !isnull(a) && a;
            i.replacerFini()
        }, this.replacerFini = function () {
            l.removeClass("replacer"), TweenMax.set(l, {
                x: 0
                , y: 0
                , z: 0
            }), n.css({
                visibility: "hidden"
            }), i.use = !1, i.activer()
        }, this.showYourPolo = function () {
            i.polo.showYou()
        }
    }
    , BonusObject = function (a, b, c) {
        function d() {
            B || e.unlock || bonusWaiting || bonusPlaying || e.showText()
        }
        var e = this
            , f = b
            , g = a + 1
            , h = $("#bt-bonus-" + g)
            , i = $(".icon-bt-bonus-txt", h)
            , j = $(".eye", h)
            , k = $(".eye-green", h)
            , l = $(".quarter", h)
            , m = $(".circle", h)
            , n = $("#box-video .video#video" + g)
            , o = $("#box-video .video#video" + g + " .overflow video")
            , p = o[0]
            , q = p.src
            , r = !1
            , s = new ClockObject("canvas-bt-bonus-" + g)
            , t = new SoundObject(c)
            , u = tabBuffer[nbSound + (g - 1)][0]
            , v = f.code.split(",")
            , w = v.length
            , x = 0
            , y = [];
        o.on("ended", e.videoEnded), s.init(60, 60, 1, 52, 16, "#5A5A5A"), this.unlock = !1;
        for (var z = 0; z < w; z++) {
            var A = {
                obj: $(".svg.q" + (z + 1), h)
                , col: $(".svg.q" + (z + 1) + " svg", h)
                    .css("fill")
            };
            y.push(A)
        }
        this.getId = function () {
            return g - 1
        }, this.getVideo = function () {
            return p
        };
        var B = !1;
        h.bind(evtPress, function () {
            d()
        }), this.showText = function () {
            B = !0, TweenMax.set(i, {
                scale: 1
                , rotation: -45
                , opacity: 0
            }), TweenMax.to(i, .3, {
                scale: 1
                , rotation: 0
                , opacity: 1
                , ease: Back.easeOut
                , onComplete: function () {
                    TweenMax.to(i, .3, {
                        scale: 1
                        , rotation: 45
                        , opacity: 0
                        , ease: Back.easeIn
                        , delay: 1
                        , onComplete: function () {
                            B = !1
                        }
                    })
                }
            })
        }, this.flashButton = function () {
            e.showText();
            for (var a = 0, b = y.length; a < b; a++) e.flashQuarter(a, .1 * a)
        }, this.flashQuarter = function (a, b) {
            var c = y[a].obj;
            TweenMax.delayedCall(b, function () {
                c.addClass("directshow"), TweenMax.delayedCall(1, function () {
                    c.addClass("hide")
                        .one(animationEnd, function (a) {
                            $(a.target)
                                .removeClass("directshow hide")
                        })
                })
            })
        }, this.checkCode = function (a, b) {
            for (var c = 0; c < w; c++) a == v[c] && (b ? e.showQuarter(c) : e.hideQuarter(c))
        }, this.showQuarter = function (a) {
            x++;
            var b = y[a].obj
                , c = y[a].col;
            x == w ? (modeReplay || b.removeClass("hide")
                .addClass("directshow"), e.animeClap(), e.enable()) : modeReplay || (d(), m.addClass("show")
                .one(animationEnd, function (a) {
                    $(a.target)
                        .removeClass("show")
                }), m.css({
                    "border-color": c
                }), b.removeClass("hide")
                .addClass("directshow show"))
        }, this.hideQuarter = function (a) {
            if (!modeReplay) {
                var b = y[a].obj;
                b.addClass("hide")
                    .one(animationEnd, function (a) {
                        $(a.target)
                            .removeClass("directshow show hide")
                    })
            }
            x == w && (cancelClickBtBonus(), this.stopClap(), e.hideClock(), e.disable()), x--, x < 0 && (trace("ATTENTION -> cntCode = " + x), x = 0)
        }, this.hideClock = function () {
            s.stop(!0)
        }, this.render = function (a) {
            s.render()
        }, this.animeClap = function () {
            modeReplay || (TweenMax.to(l, .25, {
                scale: .5
                , ease: Back.easeIn
            }), TweenMax.to(k, .25, {
                scale: 1
                , ease: Back.easeOut
                , delay: .3
            }), j.addClass("bounce"))
        }, this.reduceEye = function () {
            modeReplay || j.removeClass("bounce")
        }, this.stopClap = function () {
            modeReplay || (TweenMax.to(k, .25, {
                scale: .5
                , ease: Back.easeIn
            }), TweenMax.to(l, .25, {
                scale: 1
                , ease: Back.easeOut
                , delay: .3
            }), j.removeClass("bounce"), j.removeClass("ready"))
        }, this.enable = function () {
            e.unlock = !0, h.bind(evtPress, e.touchStart)
        }, this.disable = function () {
            e.unlock = !1, h.unbind(evtPress, e.touchStart)
        }, this.touchStart = function (a) {
            e.click(), recordMix.xmlAction("bonus", e)
        }, this.click = function () {
            getRemainingTime() < 500 || (clickBtBonus(g), e.disable(), e.reduceEye(), j.addClass("ready"), m.addClass("showCircle")
                .one(animationEnd, function (a) {
                    $(a.target)
                        .removeClass("showCircle")
                }), p.src = modeTop50 && isOldBonus ? tabOldBonus[2].src : q, u = modeTop50 && isOldBonus ? tabOldBonus[1] : tabBuffer[nbSound + (g - 1)][0], o.on("timeupdate", e.timeUpdated), p.currentTime = 0, p.play(), t.prepare(u), s.start(getRemainingTime(), !0))
        }, this.timeUpdated = function () {
            p.currentTime = 0
        }, this.play = function () {
            o.off("timeupdate"), p.currentTime = 0, s.start(loopDuration * app.nbloopbonus, !1), r = !0, t.play(0), n.addClass("show")
        }, this.playtest = function () {
            p.currentTime = 0, p.play(), TweenMax.delayedCall(.5, function () {
                p.pause(), p.currentTime = 0
            })
        }, this.stop = function () {
            o.off("timeupdate"), p.pause(), r && (t.stop(), e.hideClock()), j.removeClass("ready"), x == w && (this.enable(), j.addClass("bounce")), r = !1, n.removeClass("show")
        }, this.videoEnded = function () {}, this.pause = function () {
            r && (p.pause(), t.pause()), s.pause()
        }, this.resume = function () {
            r && (p.play(), t.unpause()), s.resume()
        }
    }
    , SndObject = function (a) {
        var b, c, d, e = this
            , f = a
            , g = !1
            , h = !1;
        return this.prepare = function (a, e) {
            h = !1, g = !1, d = isNaN(e) ? 1 : e, b = f.createBufferSource(), b.buffer = a, c = f.createGain(), c.gain.value = d, b.connect(c), c.connect(f.destination)
        }, this.loop = function (a) {
            b.onended = a
        }, this.setVolume = function (a) {
            d = a < 0 ? 0 : a, isnull(c) || (c.gain.value = d)
        }, this.play = function (a) {
            var c = a > 0 ? a : 0;
            g = !0, b.start(0, c)
        }, this.stop = function (a) {
            g && h ? e.stopSource() : g && (a ? e.fadeOut() : e.stopSource())
        }, this.stopSource = function () {
            !isIOS || isIOS103 ? b.stop(0) : b.noteOff(0), g = !1
        }, this.mute = function () {
            h = !0, e.setVolume(0)
        }, this.unmute = function () {
            h = !1, e.setVolume(1)
        }, this.fadeOut = function () {
            var a = {
                vol: d
            };
            TweenMax.to(a, .2, {
                vol: 0
                , ease: Linear.easeNone
                , onUpdate: function () {
                    e.setVolume(Math.round(100 * a.vol) / 100)
                }
                , onComplete: function () {
                    e.stopSource()
                }
            })
        }, this.fadeIn = function () {
            var a = {
                vol: d
            };
            TweenMax.to(a, .2, {
                vol: 1
                , ease: Linear.easeNone
                , onUpdate: function () {
                    e.setVolume(Math.round(100 * a.vol) / 100)
                }
            })
        }, this.pause = function () {}, this.unpause = function () {}, this.reinit = function () {}, this.getVolume = function () {
            return isnull(c) ? null : c.gain.value
        }, this.getDuration = function () {
            return isnull(b) ? null : b.buffer.duration
        }, e
    }
    , SoundObject = function (a) {
        var b, c, d, e, f, g, h, i, j = this
            , k = a
            , l = !1
            , m = !1
            , n = {
                vlm: 0
            };
        this.getMute = function () {
            return l
        }, this.reinit = function (a, k) {
            trace("reinit"), j.unmute(), m = !1, b = null, c = null, d = null, e = null, f = 1, g = null, h = 0, i = 0
        }, this.prepare = function (a, g) {
            trace("prepare"), d = a, f = 0 == g ? 0 : 1, b = k.createBufferSource(), b.buffer = d, e = d.duration, c = k.createGain(), c.gain.value = f, b.connect(c), c.connect(k.destination)
        }, this.getDuration = function () {
            return null != d ? d.duration : 0
        }, this.getCurrentTime = function () {
            return null != b ? b.context.currentTime : 0
        }, this.play = function (a) {
            isnull(g) && trace("play"), a = a > 0 ? a : 0, h = getTime(), b.start(0, a), l && this.mute()
        }, this.fadeIn = function (a) {
            TweenMax.killTweensOf(n), a = isNaN(a) ? .4 : a, null != b && (n.vlm = 0, TweenMax.to(n, a, {
                vlm: 1
                , ease: Linear.easeNone
                , onUpdate: function () {
                    isnull(c) || (c.gain.value = Math.round(100 * n.vlm) / 100)
                }
            }))
        }, this.fadeOut = function () {
            TweenMax.killTweensOf(n), null != b && (n.vlm = 1, TweenMax.to(n, 1, {
                vlm: 0
                , ease: Linear.easeNone
                , onUpdate: function () {
                    var a = Math.round(100 * n.vlm) / 100;
                    isnull(c) ? a = 0 : c.gain.value = a, a <= 0 && j.stopSource()
                }
            }))
        }, this.fade = function () {
            if (null != b)
                if (l) j.stopSource();
                else var a = .3
                    , d = f
                    , e = setInterval(function () {
                        d -= a, null != c && (c.gain.value = d), d <= 0 && (d = 0, clearInterval(e), j.stopSource())
                    }, 5)
        }, this.stop = function (a) {
            isnull(b) || (b.onended = null, b.context.currentTime > 0 && (a ? j.fade() : j.stopSource()))
        }, this.stopSource = function () {
            TweenMax.killTweensOf(n), null != b && (!isIOS || isIOS103 ? b.stop(0) : b.noteOff(0)), b = null, c = null, m || (l = !1, g = null, h = 0, i = 0)
        }, this.pause = function (a) {
            m = !0, i = getTime() - h, i < 0 ? i = 0 : i, this.stop(a)
        }, this.unpause = function (a) {
            m = !1, this.prepare(d, f), null != b && (a === !0 ? (this.play(i / 1e3, (loopDuration - i) / 1e3), this.loop(g)) : this.play(i / 1e3), h = getTime() - i)
        }, this.mute = function () {
            null != b && (c.gain.value = 0), l = !0
        }, this.unmute = function () {
            null != b && (c.gain.value = 1), l = !1
        }, this.loop = function (a) {
            b.onended = a, g = a
        };
        var o;
        this.checkSoundCanPlay = function (a, b) {
            if (trace("- Test lecture des sons : checkSoundCanPlay()"), isMixReplay) isnull(b) || b();
            else {
                o = isnull(a) ? o : a, j.prepare(o, 0), j.play(0);
                var c = 0
                    , d = 0
                    , e = setInterval(function () {
                        c++, d = j.getCurrentTime(), d > .01 ? (trace("- Test lecture des sons OK !"), j.stopSource(), clearInterval(e), isnull(b) || b()) : c > 100 && window.location.reload()
                    }, 10)
            }
        }
    }
    , ClockObject = function (a) {
        var b, c, d, e, f, g, h, i, j, c, k, l, m, n, o = $("#" + a)
            , p = o[0]
            , q = p.getContext("2d")
            , r = 2 * Math.PI
            , s = Math.PI / 2
            , t = !1
            , u = !1
            , v = 0;
        this.start = function (a, b) {
            t = !0, u = !1, n = b, l = a, m = 100 / l, k = getTime()
        }, this.stop = function (a) {
            t = !1, a ? q.clearRect(d - g - i / 2, e - g - i / 2, 2 * g + i, 2 * g + i) : (u = !0, b = n ? 0 : 1)
        }, this.pause = function () {
            v = getTime()
        }, this.resume = function () {
            var a = getTime() - v;
            k += a
        }, this.render = function () {
            if (t || u) {
                if (t) {
                    var a = getTime() - k;
                    c = a * m / 100
                } else u && (c += .2 * (b - c));
                c < .001 ? c = .001 : c, c > .999 ? c = .999 : c;
                var f = n ? -s : r * c - s
                    , h = n ? r * c - s : -s;
                q.clearRect(d - g - i / 2, e - g - i / 2, 2 * g + i, 2 * g + i), q.beginPath(), q.arc(d, e, g, f, h, !1), q.stroke(), u && (.001 != c && .999 != c || (u = !1, q.clearRect(d - g - i / 2, e - g - i / 2, 2 * g + i, 2 * g + i)))
            }
        };
        var w = !1;
        this.checkAtEnd = function () {
            w = !0
        }, this.init = function (a, b, c, h, k, l) {
            d = void 0 == a ? 0 : a, e = void 0 == b ? 0 : b, f = void 0 == c ? 1 : c, g = void 0 == h ? 18 : h, i = void 0 == k ? 6 : k, j = void 0 == l ? "#FFFFFF" : l, q.lineWidth = i, q.strokeStyle = j, q.globalAlpha = f
        }, this.prepare = function (a, b, c, k, l, m, o) {
            d = void 0 == a ? 0 : a, e = void 0 == b ? 0 : b, f = void 0 == c ? 1 : c, g = void 0 == k ? 18 : k, h = g / 2, i = void 0 == l ? 6 : l, j = void 0 == m ? "#FFFFFF" : m, n = void 0 == o || o, q.lineWidth = i, q.strokeStyle = j, q.globalAlpha = f
        }, this.update = function (a) {
            var b = a / 100;
            b = b > 1 ? 1 : b, b = b < 0 ? 0 : b;
            var c = n ? -s : r * b - s
                , f = n ? r * b - s : -s;
            q.clearRect(d, e, g, g), q.beginPath(), q.arc(d + h, e + h, h - i / 2, c, f, !1), q.stroke()
        }
    }
    , ReadingBar = function (a, b, c) {
        function d(a) {
            var b = Math.floor(a / 1e3) % 60
                , c = Math.floor(a / 1e3 / 60);
            return b = b < 10 ? "0" + b : b, c = c < 10 ? "0" + c : c, c + ":" + b
        }
        var e, f = this
            , g = $(a)
            , h = $("#reading-buffer", g)
            , i = $cntRecord
            , j = !1
            , k = 0
            , l = "#D20A0A"
            , m = "#36B460"
            , n = "record";
        this.minLoop = b, this.maxLoop = c, this.maxTime = 0, this.cntLoop = 0, this.isFinished = function () {
            return this.cntLoop == this.maxLoop
        }, this.isLastLoop = function () {
            return this.cntLoop + 1 == this.maxLoop
        }, this.open = function (a) {
            return n = a, f.createRecordBlock(), f.cntLoop = 0, f.maxTime = "record" == n ? "03:00" : d(f.maxLoop * app.looptime), h.css({
                transform: "scale(0)"
            }), $cntRecord.text("00:00 / " + f.maxTime), TweenMax.to(g, .4, {
                top: "15px"
                , ease: Quint.easeOut
            }), TweenMax.to($cntRecord, .4, {
                opacity: 1
                , display: "block"
                , ease: Quint.easeOut
                , delay: "record" == n ? .4 : 0
            }), f
        }, this.close = function () {
            return TweenMax.to(g, .3, {
                top: "20px"
                , ease: Quint.easeIn
            }), TweenMax.to($cntRecord, .3, {
                opacity: 0
                , display: "none"
                , ease: Quint.easeOut
            }), f
        }, this.start = function () {
            return j = !0, f.cntLoop = 0, k = 0, "record" == n ? recordMix.start() : replayMix.start(), f
        }, this.stop = function () {
            return j = !1, "record" == n ? recordMix.stop() : replayMix.stop(), f
        }, this.loop = function () {
            return f.cntLoop++, k += e, f.isFinished() ? "record" == n ? stopRecordMode() : stopReplayMode() : "record" == n ? recordMix.loop() : replayMix.loop(), f
        }, this.render = function () {
            if (j) {
                e = pctMetronome;
                var a = Math.floor(k + e) / f.maxLoop;
                $cntRecord.text(d(getTimeSpent() + loopDuration * f.cntLoop) + " / " + f.maxTime), h.css({
                    transform: "scale(" + a / 100 + ", 1)"
                })
            }
        }, this.createRecordBlock = function () {
            for (var a = "record" == n ? l : m, b = "", c = 0; c < f.maxLoop; c++) b += "record" == n && c < f.minLoop ? "<div class='reading-blockloop blockloopmin'></div>" : "<div class='reading-blockloop'></div>";
            b += "<div class='clear'></div>", $("#reading-block", g)
                .empty()
                .append(b), $(i)
                .css({
                    color: a
                }), h.css({
                    "background-color": a
                })
        }, this.createRecordBlock()
    }
    , waitOneLoopBeforeRandom = !1
    , RandomMix = function (a, b) {
        var c = this;
        this.start = function () {
            c.loop()
        }, this.stop = function () {}, this.loop = function () {
            var b, c = "--------\nSTART RANDOM MODE\n"
                , d = getListPoloFree()
                , e = getListPoloBusy()
                , f = getListPictoFree()
                , g = getListPictoBusy()
                , h = d.length
                , i = e.length
                , j = (f.length, g.length, 0)
                , k = random(6)
                , l = random(5)
                , m = random(2)
                , n = random(5) < 4 ? 2 : 1
                , o = !1
                , p = 0
                , q = "ajouter";
            if (q = m > k ? "rien" : q, q = l > k || 0 === h ? "enlever" : q, q = !loopOn || i <= 1 ? "ajouter" : q, n = !loopOn || i <= 1 ? 1 : n, q = a ? "ajouter" : q, q = a && 0 === h ? "rien" : q, bonusPlaying || bonusWaiting) q = "bonus", cntBoucleBonus == nbLoopBonus && (trace("un bonus était en cours on va virer 3 sons minimum pour arrêter le bonus"), o = !0, q = "enlever");
            else
                for (j = 0; j < nbBonus; j++) {
                    var r = listBonus[j];
                    if (r.unlock) {
                        q = "bonus", r.click(), trace("on va lancer le bonus " + (j + 1));
                        break
                    }
                }
            if (c += "mode = " + q + "\n-------------\n", "ajouter" == q) {
                p = Math.round((random(h - 1) + 1) / n), c += "vener = " + (2 == n ? "à la cool (divise les actions par 2)" : "potentiellement vener (ne divisera pas les actions)") + "\n-------------\n", c += "-> on ajoute " + p + " pictos\n";
                var s = [];
                for (j = 0; j < p; j++) b = getRandomObject(d), s.push(b.getId());
                for (s.sort(), j = 0; j < p; j++) {
                    b = listPolo[s[j]];
                    var t = getRandomObject(f);
                    pictoTouchePolo(b, t, .03 * j), t.desactiver(), majListPoloDrop()
                }
            } else if ("enlever" == q)
                for (p = Math.round((random(i - 2) + 1) / n), p = o && i - p > 4 ? i - 4 : p, c += "vener = " + (2 == n ? "à la cool (divise les actions par 2)" : "potentiellement vener (ne divisera pas les actions)") + "\n-------------\n", c += "<- on supprime " + p + " polos\n", j = 0; j < p; j++) b = getRandomObject(e), b.getLoop() > 2 || o ? (c += "[polo " + b.getId() + "][picto " + b.getPicto()
                        .getId() + "]\n", removePolo(b, 0)) : c += "[polo " + b.getId() + "][picto " + b.getPicto()
                    .getId() + "] na joué que " + b.getLoop() + " boucles donc on va le laisser\n";
            else "rien" == q ? c += "-- on fait rien\n" : "bonus" == q && (c += "-- un bonus va être lancé ou est déjà en cours, on fait rien\n");
            if (q != r) {
                e = getListPoloBusy(), i = e.length;
                var u = 0;
                for (j = 0; j < i; j++) {
                    var v = e[j]
                        , w = v.getLoop();
                    w > 7 && (u++, u < i ? (c += "<-- on vire le polo " + v.getId() + " qui est là depuis " + w + " boucles\n", removePolo(v, 0)) : c += "!-- on voulait virer le polo " + v.getId() + " qui est là depuis " + w + " boucles mais cest le dernier donc on le laisse\n")
                }
            }
            trace(c)
        }
    }
    , RecordMix = function () {
        var a, b, c, d, e, f = this;
        this.init = function () {
            a = "", b = "", c = !1, d = 0, e = {}
        }, this.setData = function (a) {
            e = a
        }, this.getData = function () {
            return e
        }, this.getXML = function () {
            return a
        }, this.setXML = function (b) {
            a = b
        }, this.start = function () {
            f.init(), c = !0, f.xmlOpen()
        }, this.loop = function () {
            f.xmlCloseAction(), f.xmlCloseLoop(), d++, f.xmlOpenLoop(), f.xmlOpenAction()
        }, this.stop = function (a) {
            c = !1, f.xmlClose()
        }, this.xmlOpen = function () {
            a = "<mix version='jessie'>\n", f.xmlOpenLoop(), f.xmlOpenAction()
        }, this.xmlClose = function () {
            f.xmlCloseAction(), f.xmlCloseLoop(), a += "</mix>\n"
        }, this.xmlOpenLoop = function () {
            b = "\t<loop count='" + d + "'>\n", b += "\t\t<stage>\n";
            for (var a = 0; a < nbPoloMax; a++) {
                var c = listPolo[a];
                if (c.getBusy()) {
                    var e = "";
                    e = c.getPlaying() || 0 !== c.getMoment() || 0 !== c.getLoop() ? "\t\t\t<polo id='" + c.getId() + "' picto='" + c.getPicto()
                        .getId() + "' mute='" + c.getMute() + "' playing='" + c.getPlaying() + "'/>\n" : "\t\t\t<polo id='" + c.getId() + "' picto='" + c.getPicto()
                        .getId() + "' mute='" + c.getMute() + "' playing='true'/>\n", b += e
                }
            }
            b += "\t\t</stage>\n"
        }, this.xmlCloseLoop = function () {
            b += "\t</loop>\n", a += b
        }, this.xmlOpenAction = function () {
            b += "\t\t<action>\n", 0 === d && bonusWaiting && recordMix.xmlAction("bonus", listBonus[bonusQueue - 1], !0)
        }, this.xmlCloseAction = function () {
            b += "\t\t</action>\n"
        }, this.xmlAction = function (a, d, e) {
            if (c) {
                e = void 0 !== e && e;
                var f = "";
                if ("bonus" == a) f += e ? "\t\t\t<user type='" + a + "' bonus='" + d.getId() + "' when='0.1'/>\n" : "\t\t\t<user type='" + a + "' bonus='" + d.getId() + "' when='" + decimal(getTimeSpent() / 1e3, 2) + "'/>\n";
                else {
                    var g = getTimeSpent() / 1e3
                        , h = sndLooper.getDuration();
                    g > h - delayassist / 1e3 && (g = h), g = decimal(g, 2), f += "\t\t\t<user type='" + a + "' polo='" + d.getId() + "' picto='" + d.getPicto()
                        .getId() + "' when='" + g + "'/>\n"
                }
                b += f
            }
        }
    }
    , showPopupForm = !1
    , firstWatch = !1
    , ReplayMix = function (a) {
        var b = this
            , c = $.parseXML(a)
            , d = $(c)
            , e = d.find("mix");
        isOldBonus = isnull(e.attr("version")), trace("BONUS OLD = " + isOldBonus);
        var f = e.children()
            .length
            , g = 0;
        this.getTotalLoop = function () {
            return f
        }, this.start = function () {
            b.loop()
        }, this.stop = function () {
            TweenMax.killTweensOf(b.appendPolo), TweenMax.killTweensOf(b.removePolo), TweenMax.killTweensOf(b.mutePolo), TweenMax.killTweensOf(b.unmutePolo), TweenMax.killTweensOf(b.launchBonus)
        }, this.loop = function () {
            if (g == f) stopReplayMode();
            else {
                var a = d.find('loop[count="' + g + '"]');
                if (0 === g) {
                    var c = a.find("stage")
                        , e = 0;
                    $(c)
                        .children()
                        .each(function () {
                            var a = this.tagName;
                            if ("polo" == a) {
                                var c = Number($(this)
                                        .attr("id"))
                                    , d = Number($(this)
                                        .attr("picto"))
                                    , f = "true" == $(this)
                                    .attr("mute")
                                    , g = "true" == $(this)
                                    .attr("playing")
                                    , h = listPolo[c]
                                    , i = listPicto[d];
                                b.appendPolo(h, i, .03 * e), f && h.mute(), g || (h.waitOneLoop = !0), e++
                            }
                        })
                }
                var h = a.find("action");
                $(h)
                    .children()
                    .each(function () {
                        var a = this.tagName;
                        if ("user" == a) {
                            var c = $(this)
                                .attr("type")
                                , d = decimal(Number($(this)
                                    .attr("when")), 2);
                            if ("bonus" == c) {
                                var e = Number($(this)
                                    .attr("bonus"));
                                d = 0 === d ? .1 : d, TweenMax.delayedCall(d, b.launchBonus, [e])
                            } else {
                                var f = Number($(this)
                                        .attr("polo"))
                                    , g = Number($(this)
                                        .attr("picto"))
                                    , h = listPolo[f]
                                    , i = listPicto[g];
                                trace("poloId " + f + " avec pictoId " + g + " va " + c + " dans " + d + " sec"), "append" == c ? TweenMax.delayedCall(d, b.appendPolo, [h, i]) : "remove" == c ? TweenMax.delayedCall(d, b.removePolo, [h]) : "mute" == c ? TweenMax.delayedCall(d, b.mutePolo, [h]) : "unmute" == c && TweenMax.delayedCall(d, b.unmutePolo, [h])
                            }
                        }
                    }), g++
            }
        }, this.appendPolo = function (a, b, c) {
            pictoTouchePolo(a, b, c), majListPoloDrop()
        }, this.removePolo = function (a) {
            clickPolo(a)
        }, this.mutePolo = function (a) {
            mutePolo(a)
        }, this.unmutePolo = function (a) {
            unmutePolo(a)
        }, this.launchBonus = function (a) {
            var b = listBonus[a];
            b.click()
        }
    }
    , saveInPorgress = !1
    , popupIsWaiting = !1;
