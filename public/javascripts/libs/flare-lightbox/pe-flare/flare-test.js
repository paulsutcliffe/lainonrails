(function (d) {
    var b = ["DOMMouseScroll", "mousewheel"];
    if (d.event.fixHooks) {
        for (var a = b.length; a;) {
            d.event.fixHooks[b[--a]] = d.event.mouseHooks
        }
    }
    d.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) {
                for (var e = b.length; e;) {
                    this.addEventListener(b[--e], c, false)
                }
            } else {
                this.onmousewheel = c
            }
        },
        teardown: function () {
            if (this.removeEventListener) {
                for (var e = b.length; e;) {
                    this.removeEventListener(b[--e], c, false)
                }
            } else {
                this.onmousewheel = null
            }
        }
    };
    d.fn.extend({
        mousewheel: function (e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function (e) {
            return this.unbind("mousewheel", e)
        }
    });

    function c(j) {
        var h = j || window.event,
            g = [].slice.call(arguments, 1),
            k = 0,
            i = true,
            f = 0,
            e = 0;
        j = d.event.fix(h);
        j.type = "mousewheel";
        if (h.wheelDelta) {
            k = h.wheelDelta / 120
        }
        if (h.detail) {
            k = -h.detail / 3
        }
        e = k;
        if (h.axis !== undefined && h.axis === h.HORIZONTAL_AXIS) {
            e = 0;
            f = -1 * k
        }
        if (h.wheelDeltaY !== undefined) {
            e = h.wheelDeltaY / 120
        }
        if (h.wheelDeltaX !== undefined) {
            f = -1 * h.wheelDeltaX / 120
        }
        g.unshift(j, k, f, e);
        return (d.event.dispatch || d.event.handle).apply(this, g)
    }
})(jQuery);
String.prototype.format = function () {
    var c = this;
    for (var a = 0; a < arguments.length; a++) {
        var b = new RegExp("%" + a, "gi");
        c = c.replace(b, arguments[a])
    }
    return c
};
(function (e) {
    e.pixelentity = e.pixelentity || {
        version: "1.0.0"
    };
    var d = navigator.userAgent.toLowerCase();
    var b = d.match(/(iphone|ipod|ipad)/) !== null;
    var a = !b && d.match(/android ([^;]+)/);
    if (a) {
        a = a[1].split(/\./);
        a = parseFloat(a.shift() + "." + a.join(""))
    } else {
        a = false
    }
    var c = (b || a || d.match(/(android|blackberry|webOS|opera mobi)/) !== null);
    e.pixelentity.browser = {
        iDev: b,
        android: a,
        mobile: c
    }
}(jQuery));
(function (a) {
    a.pixelentity = a.pixelentity || {
        version: "1.0.0"
    };
    a.pixelentity.Geom = {
        getScaler: function (o, j, k, n, g, i, c) {
            var e = {};
            var d = n / i;
            var m = g / c;
            var b;
            if (typeof o == "string") {
                switch (o) {
                case "fill":
                case "fillmax":
                    b = d > m ? d : m;
                    if (o == "fill") {
                        b = Math.min(1, b)
                    }
                    break;
                case "fit":
                case "fitmax":
                    b = d < m ? d : m;
                    if (o == "fit") {
                        b = Math.min(1, b)
                    }
                    break;
                case "none":
                    b = 1;
                    break
                }
            } else {
                b = o
            }
            e.ratio = b;
            e.diff = {};
            e.offset = {};
            e.align = {
                w: j,
                h: k
            };
            var l = e.diff;
            var f = e.offset;
            l.w = f.w = n - i * b;
            l.h = f.h = g - c * b;
            switch (j) {
            case "center":
                f.w = l.w / 2;
                break;
            case "left":
                f.w = 0;
                break
            }
            switch (k) {
            case "center":
                f.h = l.h / 2;
                break;
            case "top":
                f.h = 0;
                break
            }
            return e
        },
        splitProps: function (b, d) {
            var c = b.split(/,/);
            return d ? {
                h: parseFloat(c[0]),
                w: parseFloat(c[1])
            } : {
                h: c[0],
                w: c[1]
            }
        }
    }
}(jQuery));
(function (c) {
    c.pixelentity = c.pixelentity || {
        version: "1.0.0"
    };
    if (c.pixelentity.preloader) {
        return
    }
    function b(i) {
        var h = c(i.currentTarget);
        var f;
        while (h.data("peUtilsLoader") && (f = h.data("peUtilsLoader").shift())) {
            if (--f.total <= 0) {
                var d = f.callback;
                var g = f.target;
                h.unbind("load error", b);
                d(g)
            }
        }
    }
    var a = c.pixelentity.preloader = {
        load: function (g, k, j) {
            g = (g instanceof jQuery) ? g : c(g);
            var d = (g[0].tagName.toLowerCase() == "img") ? [g[0]] : g.find("img").get();
            var i;
            var h = [];
            var e;
            while ((i = d.shift())) {
                e = i.complete;
                if (!(i.src && e && !(i.src.match(/blank.png$/i) !== null && i.getAttribute("data-src")))) {
                    h.push(i)
                }
            }
            if (h.length > 0) {
                var f = {
                    target: g,
                    callback: k,
                    total: h.length
                };
                while ((i = h.shift())) {
                    i = c(i);
                    if (!j && c.browser.msie && i[0].src.match(/blank.png$/i) !== null) {
                        i.removeAttr("src");
                        i.replaceWith(i.clone());
                        if (!i.attr("data-src")) {
                            f.total--
                        }
                    }
                    if (i.data("peUtilsLoader")) {
                        i.data("peUtilsLoader").push(f)
                    } else {
                        i.data("peUtilsLoader", [f])
                    }
                    i.one("load error", b);
                    if (i.attr("data-src")) {
                        i.attr("src", i.attr("data-src"));
                        i.removeAttr("data-src")
                    } else {
                        if (c.browser.msie) {
                            i.attr("src", i.attr("src"))
                        }
                    }
                    i = undefined
                }
            } else {
                k(g)
            }
        }
    }
}(jQuery));
(function (g) {
    var e = (new Image()).style,
        d = "ransition",
        h, f;
    f = g.support.csstransitions = (h = "t" + d) in e && h || (h = "webkitT" + d) in e && h || (h = "MozT" + d) in e && h || (h = "OT" + d) in e && h || (h = "MST" + d) in e && h || false;
    g.support.csstransitionsEnd = (f == "MozTransition" && "transitionend") || (f == "OTransition" && "oTransitionEnd") || (f && f + "End")
}(jQuery));
(function (e) {
    e.pixelentity = e.pixelentity || {
        version: "1.0.0"
    };
    if (e.pixelentity.youtube) {
        return
    }
    var f = false;
    var a = window.YT && window.YT.Player;
    var d = [];

    function b() {
        for (var g = 0; g < d.length; g++) {
            d[g](a)
        }
    }
    function c() {
        if (f) {
            return
        }
        f = true;
        var g = document.createElement("script");
        g.src = "http://www.youtube.com/player_api";
        var h = document.getElementsByTagName("script")[0];
        h.parentNode.insertBefore(g, h);
        window.onYouTubePlayerAPIReady = function () {
            a = YT.Player;
            b()
        }
    }
    e.pixelentity.youtube = function (g) {
        if (a) {
            g(a)
        } else {
            d.push(g);
            c()
        }
    }
}(jQuery));
var Froogaloop = (function () {
    function c(m) {
        return new c.fn.init(m)
    }
    var l = {},
        e = false,
        k = Array.prototype.slice;
    c.fn = c.prototype = {
        playerDomain: "",
        element: null,
        init: function (m) {
            if (typeof m === "string") {
                m = document.getElementById(m)
            }
            this.element = m;
            return this
        },
        api: function (s, p) {
            if (!this.element || !s) {
                return false
            }
            var m = this,
                o = m.element,
                n = o.id != "" ? o.id : null,
                q = !d(p) ? p : null,
                r = d(p) ? p : null;
            if (r) {
                i(s, r, n)
            }
            j(s, q, o);
            return m
        },
        addEvent: function (n, q) {
            if (!this.element) {
                return false
            }
            var m = this,
                p = m.element,
                o = p.id != "" ? p.id : null;
            i(n, q, o);
            if (n != "ready") {
                j("addEventListener", n, p)
            }
            if (e) {
                return m
            }
            playerDomain = a(p.getAttribute("src"));
            if (window.addEventListener) {
                window.addEventListener("message", b, false)
            } else {
                window.attachEvent("onmessage", b, false)
            }
            e = true;
            return m
        },
        removeEvent: function (n) {
            if (!this.element) {
                return false
            }
            var m = this,
                p = m.element,
                o = p.id != "" ? p.id : null,
                q = f(n, o);
            if (n != "ready" && q) {
                j("removeEventListener", n, p)
            }
        }
    };

    function j(q, p, o) {
        if (!o || !o.contetWindow || !o.contentWindow.postMessage) {
            return false
        }
        var m = o.getAttribute("src").split("?")[0],
            n = JSON.stringify({
                method: q,
                value: p
            });
        o.contentWindow.postMessage(n, m)
    }
    function b(o) {
        if (o.origin != playerDomain) {
            return false
        }
        var q = JSON.parse(o.data),
            p = q.value,
            t = q.event || q.method,
            n = q.data,
            m = m == "" ? null : q.player_id,
            s = g(t, m),
            r = [];
        if (!s) {
            return false
        }
        if (p !== undefined) {
            r.push(p)
        }
        if (n) {
            r.push(n)
        }
        if (m) {
            r.push(m)
        }
        return r.length > 0 ? s.apply(null, r) : s.call()
    }
    function i(m, o, n) {
        if (n) {
            if (!l[n]) {
                l[n] = {}
            }
            l[n][m] = o
        } else {
            l[m] = o
        }
    }
    function g(m, n) {
        if (n) {
            return l[n][m]
        } else {
            return l[m]
        }
    }
    function f(m, n) {
        if (n && l[n]) {
            if (!l[n][m]) {
                return false
            }
            l[n][m] = null
        } else {
            if (!l[m]) {
                return false
            }
            l[m] = null
        }
        return true
    }
    function a(n) {
        var q = n.split("/"),
            m = "";
        for (var o = 0, p = q.length; o < p; o++) {
            if (o < 3) {
                m += q[o]
            } else {
                break
            }
            if (o < 2) {
                m += "/"
            }
        }
        return m
    }
    function d(m) {
        return !!(m && m.constructor && m.call && m.apply)
    }
    function h(m) {
        return toString.call(m) === "[object Array]"
    }
    c.fn.init.prototype = c.fn;
    return (window.Froogaloop = c)
})();
(function (c) {
    c.pixelentity = c.pixelentity || {
        version: "1.0.0"
    };
    if (c.pixelentity.vimeo) {
        return
    }
    var a = 0;

    function b(h, e) {
        var d = this;
        var f;

        function j() {
            a++;
            var k = c('<iframe id="pe_vimeo_player' + a + '" src="http://player.vimeo.com/video/' + e.videoId + "?autoplay=" + (e.playerVars.autoplay ? 1 : 0) + "&loop=" + (e.playerVars.loop ? 1 : 0) + "&api=1&player_id=pe_vimeo_player" + a + "&origin=" + location.href.match(/:\/\/(.[^\/]+)/)[1] + '" width="' + e.width + '" height="' + e.height + '" frameborder="0"></iframe>')[0];
            c(h).append(k);
            f = new Froogaloop(k);
            f.addEvent("ready", g);
            setTimeout(g, 4000)
        }
        function g() {
            if (f) {
                f.removeEvent("ready", g);
                c(d).trigger("video_ready.pixelentity");
                f.addEvent("finish", i)
            }
        }
        function i() {
            c(d).trigger("video_ended.pixelentity")
        }
        c.extend(d, {
            destroy: function () {
                if (f) {
                    f.removeEvent("ready", g);
                    f.removeEvent("finish", i);
                    c(f.element).remove();
                    delete f.element;
                    f = undefined
                }
                d = undefined
            }
        });
        j()
    }
    c.pixelentity.vimeo = function (d) {
        d(b)
    }
}(jQuery));
jQuery(function ($) {
    if ($.browser.msie) {
        (function () {
            if (!
            /*@cc_on!@*/
            0) {
                return
            }
            var e = "div,audio,video,source".split(",");
            for (var i = 0; i < e.length; i++) {
                document.createElement(e[i])
            }
        })();
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (obj, start) {
                for (var i = (start || 0), j = this.length; i < j; i++) {
                    if (this[i] == obj) {
                        return i
                    }
                }
                return -1
            }
        }
    }
    var projekktors = [];

    function Iterator(arr) {
        this.length = arr.length;
        this.each = function (fn) {
            $.each(arr, fn)
        };
        this.size = function () {
            return arr.length
        }
    }
    if ($.prop == undefined || $().jquery < "1.6") {
        $.fn.prop = function (arga, argb) {
            return $(this).attr(arga, argb)
        }
    }
    projekktor = $p = function () {
        var arg = arguments[0],
            instances = [];
        if (!arguments.length) {
            return projekktors[0] || null
        }
        if (typeof arg == "number") {
            return projekktors[arg]
        }
        if (typeof arg == "string") {
            if (arg == "*") {
                return new Iterator(projekktors)
            }
            for (var i = 0; i < projekktors.length; i++) {
                try {
                    if (projekktors[i].getId() == arg.id) {
                        instances.push(projekktors[i]);
                        continue
                    }
                } catch (e) {}
                try {
                    for (var j = 0; j < $(arg).length; j++) {
                        if (projekktors[i].env.playerDom.get(0) == $(arg).get(j)) {
                            instances.push(projekktors[i]);
                            continue
                        }
                    }
                } catch (e) {}
                try {
                    if (projekktors[i].getParent() == arg) {
                        instances.push(projekktors[i]);
                        continue
                    }
                } catch (e) {}
                try {
                    if (projekktors[i].getId() == arg) {
                        instances.push(projekktors[i]);
                        continue
                    }
                } catch (e) {}
            }
            if (instances.length > 0) {
                return (instances.length == 1) ? instances[0] : new Iterator(instances)
            }
        }
        if (instances.length == 0) {
            var cfg = arguments[1] || {};
            var callback = arguments[2] || {};
            if (typeof arg == "string") {
                var count = 0,
                    playerA;
                $.each($(arg), function () {
                    playerA = new PPlayer($(this), cfg, callback);
                    projekktors.push(playerA);
                    count++
                });
                return (count > 1) ? new Iterator(projekktors) : playerA
            } else {
                if (arg) {
                    projekktors.push(new PPlayer(arg, cfg, callback));
                    return new Iterator(projekktors)
                }
            }
        }
        return null;

        function PPlayer(srcNode, cfg, onReady) {
            this.config = new projekktorConfig("0.9.08");
            this._persCfg = ["enableNativePlayback", "enableFlashFallback"];
            this._queue = [];
            this.env = {
                muted: false,
                inFullscreen: false,
                playerStyle: null,
                scrollTop: null,
                scrollLeft: null,
                bodyOverflow: null,
                playerDom: null,
                mediaContainer: null,
                agent: "standard",
                mouseIsOver: false,
                loading: false,
                autoSize: false,
                className: "",
                onReady: onReady
            };
            this.media = [null];
            this._plugins = [];
            this.listeners = [];
            this.playerModel = {};
            this._isReady = false;
            this._compTableCache = false;
            this._currentItem = 0;
            this._playlistServer = "";
            this._id = "";
            this._reelUpdate = function (obj) {
                this.env.loading = true;
                switch (typeof obj) {
                    default: obj = [{
                        file: "",
                        type: "",
                        errorCode: 98
                    }];
                    break;
                case "object":
                    if (obj.length == 0) {
                        obj = [{
                            file: "",
                            type: "",
                            errorCode: 97
                        }]
                    }
                    break;
                case "undefined":
                    obj = [{
                        file: "",
                        type: "",
                        errorCode: 97
                    }];
                    break
                }
                var ref = this,
                    data = obj;
                this.media = [];
                try {
                    var changes = false;
                    for (var props in data.config) {
                        if (typeof data.config[props].indexOf("objectfunction") > -1) {
                            continue
                        }
                        this.config[props] = this._cleanValue(data.config[props]);
                        changes = true
                    }
                    delete(data.config);
                    if (changes === true) {
                        this._debug("Updated config var: " + props + " to " + this.config[props]);
                        this._promote("configModified")
                    }
                } catch (e) {}
                var files = data.playlist || data;
                for (var item in files) {
                    if (typeof files[item] == "function") {
                        continue
                    }
                    if (typeof files[item] == undefined) {
                        continue
                    }
                    if (files[item]) {
                        this._addItem(this._prepareMedia({
                            file: files[item],
                            config: files[item].config || {},
                            errorCode: files[item].errorCode
                        }))
                    }
                }
                this.env.loading = false;
                this._promote("scheduled", this.getItemCount());
                this._syncPlugins(function () {
                    ref.setActiveItem(0)
                })
            };
            this._addItem = function (data, idx, replace) {
                var resultIdx = 0;
                if (this.media.length === 1 && this.media[0].mediaModel == "NA") {
                    this._detachplayerModel();
                    this.media = []
                }
                if (idx === undefined || idx < 0 || idx > this.media.length - 1) {
                    this.media.push(data);
                    resultIdx = this.media.length - 1
                } else {
                    this.media.splice(idx, (replace === true) ? 1 : 0, data);
                    resultIdx = idx
                }
                if (this.env.loading === false) {
                    this._promote("scheduleModified", this.getItemCount())
                }
                return resultIdx
            };
            this._removeItem = function (idx) {
                var resultIdx = 0;
                if (this.media.length === 1) {
                    if (this.media[0].mediaModel == "NA") {
                        return 0
                    } else {
                        this.media[0] = this._prepareMedia({
                            file: ""
                        });
                        return 0
                    }
                }
                if (idx === undefined || idx < 0 || idx > this.media.length - 1) {
                    this.media.pop();
                    resultIdx = this.media.length
                } else {
                    this.media.splice(idx, 1);
                    resultIdx = idx
                }
                if (this.env.loading === false) {
                    this._promote("scheduleModified", this.getItemCount())
                }
                return resultIdx
            };
            this._prepareMedia = function (data) {
                var mediaFile = "",
                    extTypes = {},
                    typesModels = {},
                    errorCode = data.errorCode || 7,
                    priority = [],
                    modelSets = [];
                result = {};
                var extRegEx = [];
                for (var i in $p.mmap) {
                    if ($p.mmap[i].platform && $p.mmap[i].platform.toUpperCase() == "FLASH") {
                        if (!this.getFlashVersion() > 0) {
                            continue
                        }
                        if (this.getConfig("enableFlashFallback") == false) {
                            continue
                        }
                    }
                    if ($p.mmap[i].platform && $p.mmap[i].platform.toUpperCase() == "NATIVE") {
                        if (!this.getCanPlayNatively($p.mmap[i].type)) {
                            continue
                        }
                        if (this.getConfig("enableNativePlayback") == false) {
                            continue
                        }
                        if (data.config && data.config.flashStreamType == "rtmp") {
                            continue
                        }
                    }
                    $p.mmap[i].level = this.config._platformPriority.indexOf($p.mmap[i].platform);
                    $p.mmap[i].level = ($p.mmap[i].level < 0) ? 100 : $p.mmap[i].level;
                    extRegEx.push("." + $p.mmap[i].ext);
                    if (!extTypes[$p.mmap[i].ext]) {
                        extTypes[$p.mmap[i].ext] = new Array()
                    }
                    extTypes[$p.mmap[i].ext].push($p.mmap[i]);
                    if (!typesModels[$p.mmap[i].type]) {
                        typesModels[$p.mmap[i].type] = new Array()
                    }
                    typesModels[$p.mmap[i].type].push($p.mmap[i])
                }
                extRegEx = "^.*.(" + extRegEx.join("|") + ")$";
                if (typeof data.file == "string") {
                    data.file = [{
                        src: data.file
                    }];
                    if (typeof data.type == "string") {
                        data.file = [{
                            src: data.file,
                            type: data.type
                        }]
                    }
                }
                if (data.file === false) {
                    data.file = [{
                        src: ""
                    }]
                }
                for (var index in data.file) {
                    if (index == "config") {
                        continue
                    }
                    if (typeof data.file[index] == "string") {
                        data.file[index] = {
                            src: data.file[index]
                        }
                    }
                    if (data.file[index].src == undefined) {
                        continue
                    }
                    try {
                        data.file[index].ext = data.file[index].src.match(new RegExp(extRegEx))[1];
                        data.file[index].ext = (!data.file[index].ext) ? "NaN" : data.file[index].ext.replace(".", "")
                    } catch (e) {
                        data.file[index].ext = "NaN"
                    }
                    if (data.file[index].type !== undefined && data.file[index].type !== "") {
                        try {
                            var codecMatch = data.file[index].type.split(" ").join("").split(/[\;]codecs=.([a-zA-Z0-9\,]*)[\'|\"]/i);
                            if (codecMatch[1] !== undefined) {
                                data.file[index].codec = codecMatch[1];
                                data.file[index].type = codecMatch[0]
                            }
                        } catch (e) {}
                        if (typesModels[data.file[index].type]) {
                            modelSets = $.merge(modelSets, typesModels[data.file[index].type])
                        }
                    } else {
                        if (extTypes[data.file[index].ext]) {
                            modelSets = $.merge(modelSets, extTypes[data.file[index].ext])
                        }
                    }
                }
                if (modelSets.length == 0) {
                    modelSets = typesModels["none/none"]
                } else {
                    modelSets.sort(function (a, b) {
                        return a.level - b.level
                    })
                }
                for (var index in data.file) {
                    if (data.file[index].type == modelSets[0].type || modelSets[0].type == "none/none") {
                        result = {
                            setup: data.file,
                            ID: this.randomId(8),
                            type: data.file[index].type,
                            ext: data.file[index].ext,
                            file: (data.config.flashStreamType != "rtmp") ? this.toAbsoluteURL(data.file[index].src) : data.file[index].src,
                            mediaModel: modelSets[0].model || "NA",
                            errorCode: errorCode,
                            config: data.config || {}
                        };
                        break
                    }
                }
                return result
            };
            this._modelUpdateListener = function (type, value) {
                var ref = this;
                if (!this.playerModel.init) {
                    return
                }
                if (type != "time" && type != "progress") {
                    this._debug("Received model Update: '" + type + "' (" + value + ") while handling '" + this.playerModel.getFile() + "' using '" + this.playerModel.getModelName() + "'")
                }
                switch (type) {
                case "state":
                    this._promote("state", value);
                    switch (value) {
                    case "IDLE":
                    case "AWAKENING":
                    case "BUFFERING":
                    case "PLAYING":
                        break;
                    case "ERROR":
                        this._promote("error", {});
                        break;
                    case "STOPPED":
                        this._promote("stopped", {});
                        break;
                    case "PAUSED":
                        if (this.getConfig("disablePause") === true) {
                            this.playerModel.applyCommand("play", 0)
                        }
                        break;
                    case "COMPLETED":
                        if (this._currentItem + 1 >= this.media.length) {
                            if (this.getInFullscreen() === true) {
                                this.setFullscreen(false)
                            }
                            this._promote("done", {})
                        }
                        this.setActiveItem("next");
                        break
                    }
                    break;
                case "buffer":
                    this._promote("buffer", value);
                    break;
                case "modelReady":
                    this._promote("item", ref._currentItem);
                    break;
                case "displayReady":
                    this._promote("displayReady", true);
                    this._addGUIListeners();
                    this._syncPlugins();
                    break;
                case "FFreinit":
                    break;
                case "seek":
                    this._promote("seek", {
                        dest: value
                    });
                    break;
                case "volume":
                    this.setConfig({
                        volume: value
                    });
                    this._promote("volume", value);
                    if (value <= 0) {
                        this.env.muted = true;
                        this._promote("mute", value)
                    } else {
                        if (this.env.muted == true) {
                            this.env.muted = false;
                            this._promote("unmute", value)
                        }
                    }
                    break;
                case "resume":
                case "progress":
                case "time":
                case "fullscreen":
                case "resize":
                case "start":
                    this._promote(type, value);
                    break;
                case "playlist":
                    this.setFile(value, true);
                    break;
                case "config":
                    this.setConfig(value);
                    break;
                case "scaled":
                    if (this.env.autoSize === true) {
                        this.env.playerDom.css({
                            height: value.realHeight + "px",
                            width: value.realWidth + "px"
                        });
                        this._promote("resize", value);
                        this.env.autoSize = false;
                        break
                    }
                    this._promote("scaled", value);
                    break
                }
            };
            this._syncPlugins = function (callback) {
                var ref = this;
                this.env.loading = true;
                (function () {
                    try {
                        if (ref._plugins.length > 0) {
                            for (var i = 0; i < ref._plugins.length; i++) {
                                if (ref._plugins[i].pluginReady !== true) {
                                    setTimeout(arguments.callee, 50);
                                    return
                                }
                            }
                        }
                        ref.env.loading = false;
                        ref._promote("pluginsReady", {});
                        if (ref._isReady === true) {
                            ref._promote("ready", ref.getItemIdx())
                        }
                        try {
                            callback()
                        } catch (e) {}
                    } catch (e) {}
                })()
            };
            this._MD = function (event) {
                projekktor("#" + event.currentTarget.id.replace("_media", ""))._displayMousedownListener(event)
            };
            this._addGUIListeners = function () {
                var ref = this;
                this._removeGUIListeners();
                if (this.getDC().get(0).addEventListener) {
                    this.getDC().get(0).addEventListener("mousedown", this._MD, true)
                } else {
                    this.getDC().mousedown(function (event) {
                        ref._displayMousedownListener(event)
                    })
                }
                this.getDC().mousemove(function (event) {
                    ref._displayMousemoveListener(event)
                }).mouseenter(function (event) {
                    ref._displayMouseEnterListener(event)
                }).mouseleave(function (event) {
                    ref._displayMouseLeaveListener(event)
                });
                $(window).bind("resize.projekktor" + this.getId(), function () {
                    ref.playerModel.applyCommand("resize")
                });
                if (this.config.enableKeyboard === true) {
                    if (!$.browser.mozilla) {
                        $(document.documentElement).unbind("keydown.pp" + this._id);
                        $(document.documentElement).bind("keydown.pp" + this._id, function (evt) {
                            ref._keyListener(evt)
                        })
                    } else {
                        $(document.documentElement).unbind("keypress.pp" + this._id);
                        $(document.documentElement).bind("keypress.pp" + this._id, function (evt) {
                            ref._keyListener(evt)
                        })
                    }
                }
            };
            this._removeGUIListeners = function () {
                $("#" + this.getId()).unbind();
                this.getDC().unbind();
                if (this.getDC().get(0).removeEventListener) {
                    this.getDC().get(0).removeEventListener("mousedown", this._MD, true)
                } else {
                    this.getDC().get(0).detachEvent("onmousedown", this._MD)
                }
                $(window).unbind("resize.projekktor" + this.getId())
            };
            this._registerPlugins = function () {
                var plugins = $.merge($.merge([], this.config._plugins), this.config._addplugins);
                if (this._plugins.length > 0) {
                    return
                }
                if (plugins == 0) {
                    return
                }
                for (var i = 0; i < plugins.length; i++) {
                    var pluginName = "projekktor" + plugins[i];
                    try {
                        typeof eval(pluginName)
                    } catch (e) {
                        continue
                    }
                    var pluginObj = $.extend(true, {}, new projekktorPluginInterface(), eval(pluginName).prototype);
                    pluginObj.name = plugins[i].toLowerCase();
                    pluginObj.pp = this;
                    pluginObj.playerDom = this.env.playerDom;
                    pluginObj._init(this.config["plugin_" + plugins[i].toLowerCase()] || {});
                    this._plugins.push(pluginObj)
                }
            };
            this.removePlugin = function (rmvPl) {
                if (this._plugins.length == 0) {
                    return
                }
                var pluginsToRemove = rmvPl || $.merge($.merge([], this.config._plugins), this.config._addplugins),
                    pluginsRegistered = this._plugins.length;
                for (var j = 0; j < pluginsToRemove.length; j++) {
                    for (var k = 0; k < pluginsRegistered; k++) {
                        if (this._plugins[k] != undefined) {
                            if (this._plugins[k].name == pluginsToRemove[j].toLowerCase()) {
                                this._plugins[k].deconstruct();
                                this._plugins.splice(k, 1)
                            }
                        }
                    }
                }
            };
            this._promote = function (evt, value) {
                var event = evt,
                    pluginData = {};
                if (typeof event == "object") {
                    if (!event._plugin) {
                        return
                    }
                    value.PLUGIN = event._plugin + "";
                    value.EVENT = event._event + "";
                    event = "pluginevent"
                }
                if (event != "time" && event != "progress" && event != "mousemove") {
                    this._debug("Fireing :" + event)
                }
                if (this._plugins.length > 0) {
                    for (var i in this._plugins) {
                        try {
                            this._plugins[i][event + "Handler"](value, this)
                        } catch (e) {}
                    }
                }
                if (this.listeners.length > 0) {
                    for (var i in this.listeners) {
                        try {
                            if (this.listeners[i]["event"] == event || this.listeners[i]["event"] == "*") {
                                this.listeners[i]["callback"](value, this)
                            }
                        } catch (e) {}
                    }
                }
            };
            this._detachplayerModel = function () {
                this._removeGUIListeners();
                try {
                    this.playerModel.destroy()
                } catch (e) {}
                this._promote("detach", {})
            };
            this._displayMousedownListener = function (evt) {
                if (!this.env.mouseIsOver) {
                    return
                }
                switch (evt.which) {
                case 1:
                    this._promote("leftclick", evt);
                    break;
                case 2:
                    this._promote("middleclick", evt);
                    break;
                case 3:
                    evt.stopPropagation();
                    evt.preventDefault();
                    $(document).bind("contextmenu", function (evt) {
                        $(document).unbind("contextmenu");
                        return false
                    });
                    this._promote("rightclick", evt);
                    break
                }
                return false
            };
            this._displayMousemoveListener = function (evt) {
                if ("TEXTAREA|INPUT".indexOf(evt.target.tagName.toUpperCase()) > -1) {
                    this.env.mouseIsOver = false
                }
                this._promote("mousemove", {});
                evt.stopPropagation()
            };
            this._displayMouseEnterListener = function (evt) {
                this._promote("mouseenter", {});
                this.env.mouseIsOver = true;
                evt.stopPropagation()
            };
            this._displayMouseLeaveListener = function (evt) {
                this._promote("mouseleave", {});
                this.env.mouseIsOver = false;
                evt.stopPropagation()
            };
            this._keyListener = function (evt) {
                if (!this.env.mouseIsOver) {
                    return
                }
                evt.stopPropagation();
                evt.preventDefault();
                this._debug("Keypress: " + evt.keyCode);
                this._promote("key", evt.keyCode);
                switch (evt.keyCode) {
                case 27:
                    this.setFullscreen(false);
                    break;
                case 13:
                    this.setFullscreen(true);
                    break;
                case 39:
                    this.setActiveItem("next");
                    break;
                case 37:
                    this.setActiveItem("previous");
                    break;
                case 123:
                    break;
                default:
                    this.setPlayPause();
                    break
                }
                return false
            };
            this._enterFullViewport = function () {
                if (this.env.inFullscreen === true) {
                    return
                }
                this.env.scrollTop = $(window).scrollTop();
                this.env.scrollLeft = $(window).scrollLeft();
                this.env.playerStyle = this.getDC().attr("style");
                this.env.bodyOverflow = $("body").css("overflow");
                $(window).scrollTop(0).scrollLeft(0);
                if (($.browser.mozilla) && this.getUsesFlash()) {} else {
                    $("body").css("overflow", "hidden")
                }
                this.env.playerDom.css({
                    position: "fixed",
                    display: "block",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 99997
                });
                this.env.inFullscreen = true
            };
            this._exitFullViewport = function () {
                if (this.env.inFullscreen === false) {
                    return
                }
                this.getDC().attr("style", this.env.playerStyle);
                $("body").css("overflow", this.env.bodyOverflow);
                $(window).scrollTop(this.env.scrollTop);
                $(window).scrollLeft(this.env.scrollLef);
                if (this.getDC().width() != this.config._width || this.getDC().height() != this.config._height) {
                    this.getDC().css({
                        width: this.config._width + "px",
                        height: this.config._height + "px"
                    })
                }
                this._modelUpdateListener("resize");
                this.env.inFullscreen = false
            };
            this._enterIframeFullViewport = function () {
                if (this.env.inFullscreen === true) {
                    return
                }
                var win = this.getIframeWindow(),
                    iframe = this.getIframe();
                if (!win || !iframe) {
                    return
                }
                this.env.scrollTop = win.scrollTop();
                this.env.scrollLeft = win.scrollLeft();
                this.env.playerStyle = iframe.attr("style");
                this.env.iframeWidth = iframe.attr("width");
                this.env.iframeHeight = iframe.attr("height");
                this.env.bodyOverflow = $(win[0].document.body).css("overflow");
                win.scrollTop(0);
                win.scrollLeft(0);
                $(win[0].document.body).css("overflow", "hidden");
                iframe.css({
                    position: "fixed",
                    display: "block",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 9999
                });
                this.env.inFullscreen = true
            };
            this._exitIframeFullViewport = function () {
                if (this.env.inFullscreen === false) {
                    return
                }
                var win = this.getIframeWindow();
                var iframe = this.getIframe();
                if (!win || !iframe) {
                    return
                }
                win.scrollTop(this.env.scrollTop);
                win.scrollLeft(this.env.scrollLef);
                $(win[0].document.body).css("overflow", this.env.bodyOverflow);
                iframe.attr("width", this.env.iframeWidth + "px");
                iframe.attr("height", this.env.iframeHeight + "px");
                iframe.attr("style", (this.env.playerStyle == undefined) ? "" : this.env.playerStyle);
                this.env.inFullscreen = false
            };
            this.getItemConfig = function (name, itemIdx) {
                return this.getConfig(name, itemIdx)
            };
            this.getConfig = function (name, itemIdx) {
                var idx = itemIdx || this._currentItem,
                    result = undefined,
                    playerCfg = (this.config["_" + name]) ? this.config["_" + name] : this.config[name];
                if (playerCfg !== undefined) {
                    result = playerCfg;
                    if ($.inArray(name, this._persCfg) > -1) {
                        if (this._cookie(name) !== null) {
                            result = this._cookie(name)
                        }
                    }
                    if (this.config["_" + name] == undefined) {
                        try {
                            if (this.media[idx]["config"][name] !== undefined) {
                                result = this.media[idx]["config"][name]
                            }
                        } catch (e) {}
                    }
                } else {
                    if (name.indexOf("plugin_") > -1) {
                        try {
                            if (this.media[idx]["config"][name]) {
                                result = this.media[idx]["config"][name]
                            }
                        } catch (e) {}
                    }
                }
                return result
            };
            this.getItemCount = function () {
                return this.media.length
            };
            this.getDC = function () {
                return this.env.playerDom
            };
            this.getState = function (isThis) {
                var result = null;
                try {
                    result = this.playerModel.getState()
                } catch (e) {
                    result = "IDLE"
                }
                if (isThis != null) {
                    return (result == isThis.toUpperCase())
                }
                return result
            };
            this.getLoadProgress = function () {
                try {
                    return this.playerModel.getLoadProgress()
                } catch (e) {
                    return 0
                }
            };
            this.getKbPerSec = function () {
                try {
                    return this.playerModel.getKbPerSec()
                } catch (e) {
                    return 0
                }
            };
            this.getItemId = function (idx) {
                if (idx == undefined) {
                    return this.media[this._currentItem].ID
                }
                return this.media[idx].ID
            };
            this.getItemIdx = function () {
                return this._currentItem
            };
            this.getItem = function () {
                arg = arguments[0] || "current";
                switch (arg) {
                case "next":
                    return $.extend(true, [], this.media[this._currentItem + 1]);
                case "prev":
                    return $.extend(true, [], this.media[this._currentItem - 1]);
                case "current":
                    return $.extend(true, [], this.media[this._currentItem]);
                case "*":
                    return $.extend(true, [], this.media);
                default:
                    return $.extend(true, [], this.media[arg])
                }
            };
            this.getVolume = function () {
                return (this.getConfig("fixedVolume") === true) ? this.config.volume : this.getConfig("volume")
            };
            this.getTrackId = function () {
                if (this.getConfig("trackId")) {
                    return this.config.trackId
                }
                if (this._playlistServer != null) {
                    return "pl" + this._currentItem
                }
                return null
            };
            this.getLoadPlaybackProgress = function () {
                try {
                    return this.playerModel.getLoadPlaybackProgress()
                } catch (e) {
                    return 0
                }
            };
            this.getDuration = function () {
                try {
                    return this.playerModel.getDuration()
                } catch (e) {
                    return 0
                }
            };
            this.getPosition = function () {
                try {
                    return this.playerModel.getPosition() || 0
                } catch (e) {
                    return 0
                }
            };
            this.getTimeLeft = function () {
                try {
                    return this.playerModel.getDuration() - this.playerModel.getPosition()
                } catch (e) {
                    return this.media[this._currentItem].duration
                }
            };
            this.getInFullscreen = function () {
                return this.env.inFullscreen
            };
            this.getMediaContainer = function () {
                if (this.env.mediaContainer == null) {
                    this.env.mediaContainer = $("#" + this.getMediaId())
                }
                if (this.env.mediaContainer.length == 0) {
                    if (this.env.playerDom.find("." + this.config._cssClassPrefix + "display").length > 0) {
                        this.env.mediaContainer = $(document.createElement("div")).attr({
                            id: this.getId() + "_media"
                        }).css({
                            overflow: "hidden",
                            height: "100%",
                            width: "100%",
                            top: 0,
                            left: 0,
                            padding: 0,
                            margin: 0,
                            display: "block"
                        }).appendTo(this.env.playerDom.find("." + this.config._cssClassPrefix + "display"))
                    } else {
                        this.env.mediaContainer = $(document.createElement("div")).attr({
                            id: this.getMediaId()
                        }).css({
                            width: "1px",
                            height: "1px"
                        }).appendTo($(document.body))
                    }
                }
                return this.env.mediaContainer
            };
            this.getMediaId = function () {
                return this.getId() + "_media"
            };
            this.getMediaType = function () {
                return this.media[this._currentItem].type
            };
            this.getUsesFlash = function () {
                return (this.playerModel.requiresFlash !== false)
            };
            this.getModel = function () {
                try {
                    return this.media[this._currentItem].mediaModel
                } catch (e) {
                    return "NA"
                }
            };
            this.getIframeWindow = function () {
                try {
                    return $(parent.window)
                } catch (e) {
                    return false
                }
            };
            this.getIframe = function () {
                try {
                    return window.$(frameElement)
                } catch (e) {
                    return false
                }
            };
            this.getPlaylist = function () {
                return this.getItem("*")
            };
            this.getFlashVersion = function () {
                try {
                    try {
                        var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                        try {
                            axo.AllowScriptAccess = "always"
                        } catch (e) {
                            return "6,0,0"
                        }
                    } catch (e) {}
                    return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1].match(/\d+/g)[0]
                } catch (e) {
                    try {
                        if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
                            return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1].match(/\d+/g)[0]
                        }
                    } catch (e) {}
                }
                return "0,0,0".match(/\d+/g)[0]
            };
            this.getCanPlayNatively = function (type) {
                var checkFor = [];
                if (this._compTableCache == false) {
                    this._compTableCache = this._testMediaSupport()
                }
                switch (typeof type) {
                case "undefined":
                    if (this._compTableCache.media.length > 0) {
                        return true
                    }
                case "string":
                    checkFor.push(type);
                    break;
                case "array":
                    checkFor = type;
                    break
                }
                for (var i in checkFor) {
                    if ($.inArray(checkFor[i], this._compTableCache.all) > -1) {
                        return true
                    }
                }
                return false
            };
            this.getNativeFullscreenSupport = function () {
                if (typeof this.video.webkitEnterFullScreen == "function") {
                    if (!navigator.userAgent.match("Chrome") && !navigator.userAgent.match("Mac OS X 10.5")) {
                        return true
                    }
                }
                return false
            };
            this.getId = function () {
                return this._id
            };
            this.getHasGUI = function () {
                try {
                    return this.playerModel.getHasGUI()
                } catch (e) {
                    return false
                }
            };
            this.getCssPrefix = function () {
                return this.config._cssClassPrefix
            };
            this.getPlayerDimensions = function () {
                return {
                    width: this.config._width,
                    height: this.config._height
                }
            };
            this.getMediaDimensions = function () {
                return {
                    width: this.config._width,
                    height: this.config._height
                }
            };
            this.getFromUrl = function (url, dest, callback, customParser, dataType) {
                var data = null,
                    ref = this;
                if (dest == ref && callback == "_reelUpdate") {
                    this._promote("scheduleLoading", 1 + this.getItemCount())
                }
                if (callback.substr(0, 1) != "_") {
                    window[callback] = function (data) {
                        try {
                            delete window[callback]
                        } catch (e) {}
                        dest[callback](data)
                    }
                } else {
                    this["_jsonp" + callback] = function (data) {
                        dest[callback](data)
                    }
                }
                if (dataType) {
                    if ($.parseJSON == undefined && dataType.indexOf("json") > -1) {
                        this._raiseError("Projekktor requires jQuery 1.4.2 in order to handle JSON playlists.");
                        return this
                    }
                    dataType = (dataType.indexOf("/") > -1) ? dataType.split("/")[1] : dataType
                }
                $.ajax({
                    url: url,
                    complete: function (xhr, status) {
                        if (dataType == undefined) {
                            try {
                                if (xhr.getResponseHeader("Content-Type").indexOf("xml") > -1) {
                                    dataType = "xml"
                                }
                                if (xhr.getResponseHeader("Content-Type").indexOf("json") > -1) {
                                    dataType = "json"
                                }
                                if (xhr.getResponseHeader("Content-Type").indexOf("html") > -1) {
                                    dataType = "html"
                                }
                            } catch (e) {}
                        }
                        switch (dataType) {
                        case "html":
                        case "xml":
                            if (window.DOMParser) {
                                data = new DOMParser();
                                data = data.parseFromString(xhr.responseText, "text/xml")
                            } else {
                                data = new ActiveXObject("Microsoft.XMLDOM");
                                data.async = "false";
                                data.loadXML(xhr.responseText)
                            }
                            break;
                        case "json":
                            data = xhr.responseText;
                            if (typeof data == "string") {
                                data = $.parseJSON(data)
                            }
                            break;
                        case "jsonp":
                            break;
                        default:
                            data = xhr.responseText;
                            break
                        }
                        try {
                            data = customParser(data, xhr.responseText)
                        } catch (e) {}
                        if (status != "error" && dataType != "jsonp") {
                            dest[callback](data)
                        }
                    },
                    error: function (data) {
                        if (dataType != "jsonp") {
                            dest[callback](false)
                        }
                    },
                    cache: true,
                    dataType: dataType,
                    jsonpCallback: (callback.substr(0, 1) != "_") ? false : "projekktor('" + this.getId() + "')._jsonp" + callback,
                    jsonp: (callback.substr(0, 1) != "_") ? false : "callback"
                });
                return this
            };
            this.setActiveItem = function (mixedData) {
                var newItem = 0;
                var lastItem = this._currentItem;
                if (this.env.loading === true) {
                    return this
                }
                if (typeof mixedData == "string") {
                    switch (mixedData) {
                    case "previous":
                        if (this.getConfig("disallowSkip") == true && !this.getState("COMPLETED")) {
                            return this
                        }
                        newItem = this._currentItem - 1;
                        break;
                    case "next":
                        if (this.getConfig("disallowSkip") == true && !this.getState("COMPLETED")) {
                            return this
                        }
                        newItem = this._currentItem + 1;
                        break;
                    default:
                    case "poster":
                        result = 0;
                        break
                    }
                } else {
                    if (typeof mixedData == "number") {
                        newItem = parseInt(mixedData)
                    } else {
                        newItem = 0
                    }
                }
                if (newItem != this._currentItem) {
                    if (this.getConfig("disallowSkip") == true && !this.getState("COMPLETED")) {
                        return this
                    }
                }
                this._detachplayerModel();
                var ap = false;
                if (newItem === 0 && lastItem == 0 && (this.config._autoplay === true || this.getState().indexOf("IDLE|STOPPED") > -1)) {
                    ap = true
                } else {
                    if (this.getItemCount() > 1 && newItem != lastItem && this.config._continuous === true && newItem < this.getItemCount()) {
                        ap = true
                    }
                }
                if (newItem >= this.getItemCount() || newItem < 0) {
                    ap = this.config._loop;
                    newItem = 0
                }
                this._currentItem = newItem;
                this.getDC().attr("class", this.env.className);
                var newModel = this.media[this._currentItem].mediaModel.toUpperCase();
                if (!$p.models[newModel]) {
                    newModel = "NA";
                    this.media[this._currentItem].mediaModel = newModel;
                    this.media[this._currentItem].errorCode = 8
                } else {
                    if (this.getConfig("className") !== false) {
                        this.getDC().addClass(this.getConfig("className"))
                    }
                }
                this.playerModel = new playerModel();
                $.extend(this.playerModel, $p.models[newModel].prototype);
                this.playerModel._init({
                    media: $.extend(true, {}, this.media[this._currentItem]),
                    model: newModel,
                    pp: this,
                    environment: $.extend(true, {}, this.env),
                    autoplay: ap
                });
                return this
            };
            this._enqueue = function (command, params, delay) {
                this._queue.push({
                    command: command,
                    params: params,
                    delay: delay
                });
                this._processQueue()
            };
            this._clearqueue = function (command, params) {
                if (this._isReady !== true) {
                    return
                }
                this._queue = []
            };
            this._processQueue = function () {
                var ref = this,
                    modelReady = false;
                if (this._processing === true) {
                    return
                }
                if (this.env.loading === true) {
                    return
                }
                this._processing = true;
                (function () {
                    modelReady = false;
                    try {
                        modelReady = ref.playerModel.getIsReady()
                    } catch (e) {}
                    if (ref.env.loading !== true && modelReady) {
                        var msg = ref._queue.shift();
                        if (!msg) {
                            ref._processing = false;
                            if (ref._isReady === false) {
                                ref._promote("ready", ref.getItemIdx());
                                ref._isReady = true
                            }
                            return
                        }
                        if (typeof msg.command == "string") {
                            if (msg.delay > 0) {
                                setTimeout(function () {
                                    ref.playerModel.applyCommand(msg.command, msg.params)
                                }, msg.delay)
                            } else {
                                ref.playerModel.applyCommand(msg.command, msg.params)
                            }
                        } else {
                            msg.command(ref)
                        }
                        arguments.callee();
                        return
                    }
                    setTimeout(arguments.callee, 100)
                })()
            };
            this.getIsLastItem = function () {
                return ((this._currentItem == this.media.length - 1) && this.config._loop !== true)
            };
            this.getIsFirstItem = function () {
                return ((this._currentItem == 0) && this.config._loop !== true)
            };
            this.getIsMobileClient = function () {
                var uagent = navigator.userAgent.toLowerCase();
                var mobileAgents = ["android", "windows ce", "blackberry", "palm", "mobile"];
                for (var i = 0; i < mobileAgents.length; i++) {
                    if (uagent.indexOf(mobileAgents[i]) > -1) {
                        return true
                    }
                }
                return false
            };
            this.setPlay = function () {
                this._enqueue("play", false);
                return this
            };
            this.setPause = function () {
                this._enqueue("pause", false);
                return this
            };
            this.setStop = function (toZero) {
                var ref = this;
                this._enqueue("stop", false);
                if (toZero) {
                    this._enqueue(function () {
                        ref._currentItem = 0;
                        ref.setActiveItem(0)
                    })
                }
                return this
            };
            this.setPlayPause = function () {
                if (!this.getState("PLAYING")) {
                    this.setPlay()
                } else {
                    this.setPause()
                }
                return this
            };
            this.setVolume = function (vol, fadeDelay) {
                if (this.getConfig("fixedVolume") == true) {
                    return this
                }
                var initalVolume = this.getVolume();
                if (typeof vol == "string") {
                    var dir = vol.substr(0, 1);
                    vol = parseFloat(vol.substr(1));
                    vol = (vol > 1) ? vol / 100 : vol;
                    if (dir == "+") {
                        vol = this.getVolume() + vol
                    } else {
                        if (dir == "-") {
                            vol = this.getVolume() - vol
                        } else {
                            vol = this.getVolume()
                        }
                    }
                }
                if (typeof vol == "number") {
                    vol = (vol > 1) ? 1 : vol;
                    vol = (vol < 0) ? 0 : vol
                } else {
                    return this
                }
                if (vol > initalVolume && fadeDelay) {
                    if (vol - initalVolume > 0.03) {
                        for (var i = initalVolume; i <= vol; i = i + 0.03) {
                            this._enqueue("volume", i, fadeDelay)
                        }
                        this._enqueue("volume", vol, fadeDelay);
                        return this
                    }
                } else {
                    if (vol < initalVolume && fadeDelay) {
                        if (initalVolume - vol > 0.03) {
                            for (var i = initalVolume; i >= vol; i = i - 0.03) {
                                this._enqueue("volume", i, fadeDelay)
                            }
                            this._enqueue("volume", vol, fadeDelay);
                            return this
                        }
                    }
                }
                this._enqueue("volume", vol);
                return this
            };
            this.setPlayhead = function (position) {
                if (this.getConfig("disallowSkip") == true) {
                    return this
                }
                if (typeof position == "string") {
                    var dir = position.substr(0, 1);
                    position = parseFloat(position.substr(1));
                    if (dir == "+") {
                        position = this.getPosition() + position
                    } else {
                        if (dir == "-") {
                            position = this.getPosition() - position
                        } else {
                            position = this.getPosition()
                        }
                    }
                }
                if (typeof position == "number") {
                    this._enqueue("seek", position)
                }
                return this
            };
            this.setPlayerPoster = function (url) {
                var ref = this;
                this._enqueue(function () {
                    ref.setConfig({
                        poster: url
                    }, 0)
                });
                return this
            };
            this.setItemConfig = function () {
                var ref = this,
                    args = arguments;
                this._enqueue(function () {
                    ref._setConfig(args[0] || null, args[1] || null)
                });
                return this
            };
            this.setConfig = function () {
                var ref = this,
                    args = arguments;
                this._enqueue(function () {
                    ref._setConfig(args[0] || null, args[1] || null)
                });
                return this
            };
            this._setConfig = function () {
                if (!arguments.length) {
                    return result
                }
                var confObj = arguments[0],
                    dest = "*",
                    value = false;
                if (typeof confObj != "object") {
                    return this
                }
                if (arguments[1] == "string" || arguments[1] == "number") {
                    dest = arguments[1]
                } else {
                    dest = this._currentItem
                }
                for (var i in confObj) {
                    if ($.inArray(i, this._persCfg) > -1) {
                        this._cookie(i, this._cleanValue(confObj[i]))
                    }
                    if (this.config["_" + i] != undefined) {
                        continue
                    }
                    value = this._cleanValue(confObj[i]);
                    if (dest == "*") {
                        $.each(this.media, function () {
                            if (this.config == undefined) {
                                this.config = {}
                            }
                            this.config[i] = value
                        });
                        continue
                    }
                    if (this.media[dest] == undefined) {
                        return this
                    }
                    if (this.media[dest]["config"] == undefined) {
                        this.media[dest]["config"] = {}
                    }
                    this.media[dest]["config"][i] = value
                }
                return this
            };
            this.setFullscreen = function (full) {
                full = (full == null) ? !this.getInFullscreen() : full;
                if (full == this.getInFullscreen() || !this.config.enableFullscreen || this.getIsMobileClient()) {
                    return this
                }
                switch (full) {
                case true:
                    if (this.config._iframe === true) {
                        this._enterIframeFullViewport()
                    } else {
                        this._enterFullViewport()
                    }
                    break;
                case false:
                    if (this.config._iframe === true) {
                        this._exitIframeFullViewport()
                    } else {
                        this._exitFullViewport()
                    }
                    break
                }
                this.playerModel.applyCommand("fullscreen", full);
                return this
            };
            this.setResize = function () {
                this._modelUpdateListener("resize");
                return this
            };
            this.setSize = function (data) {
                this.config._width = data.width || this.config._width;
                this.config._height = data.height || this.config._height;
                if (this.getInFullscreen() === true) {
                    return
                }
                this.getDC().css({
                    width: data.width + "px",
                    height: data.height + "px"
                });
                this._modelUpdateListener("resize")
            };
            this.addListener = function (evt, callback) {
                var ref = this;
                this._enqueue(function () {
                    ref._addListener(evt, callback)
                })
            };
            this._addListener = function (evt, callback) {
                var listenerObj = {
                    event: evt,
                    callback: callback
                };
                this.listeners.push(listenerObj);
                return this
            };
            this.removeListener = function (evt, callback) {
                var len = this.listeners.length;
                for (var i = 0; i < len; i++) {
                    if (this.listeners[i] == undefined) {
                        continue
                    }
                    if (this.listeners[i].event != evt && evt !== "*") {
                        continue
                    }
                    if (this.listeners[i].callback != callback && callback !== undefined) {
                        continue
                    }
                    this.listeners.splice(i, 1)
                }
                return this
            };
            this.setItem = function () {
                var itemData = arguments[0];
                var affectedIdx = 0;
                this._clearqueue();
                if (this.env.loading === true) {
                    return this
                }
                if (itemData == null) {
                    affectedIdx = this._removeItem(arguments[1]);
                    if (affectedIdx === this._currentItem) {
                        this.setActiveItem("previous")
                    }
                } else {
                    affectedIdx = this._addItem(this._prepareMedia({
                        file: itemData,
                        config: itemData.config || {}
                    }), arguments[1], arguments[2]);
                    if (affectedIdx === this._currentItem) {
                        this.setActiveItem(this._currentItem)
                    }
                }
                return this
            };
            this.setFile = function (arg, ext, dataType) {
                var data = arg || {},
                    result = {},
                    externalData = ext || false;
                this._clearqueue();
                if (this.env.loading === true) {
                    return this
                }
                if (typeof data == "object" && data.length == 0) {
                    return false
                }
                this.env.loading = true;
                this._detachplayerModel();
                if (typeof data == "object") {
                    if (data.length == 0) {
                        this._reelUpdate({});
                        return false
                    }
                    this._debug("Applying incoming JS Object", data);
                    this._reelUpdate(data);
                    return this
                }
                if (typeof data == "string") {
                    var splt = [];
                    splt[0] = data;
                    if (data.indexOf(this.config._FilePosterSeparator) > -1) {
                        splt = data.split(this.config._FilePosterSeparator);
                        data.config = {
                            poster: splt[1]
                        }
                    } else {
                        result[0] = {};
                        result[0].file = data
                    }
                    if (externalData === false) {
                        this._debug("Applying incoming single file:" + result[0]["file"], data);
                        this._reelUpdate(result)
                    } else {
                        this._debug("Loading external data from " + splt[0] + " supposed to be " + dataType);
                        this._playlistServer = splt[0];
                        this.getFromUrl(splt[0], this, "_reelUpdate", this.config._reelParser, dataType)
                    }
                }
                return this
            };
            this.openUrl = function (cfg) {
                cfg = cfg || {
                    url: "",
                    target: "",
                    pause: false
                };
                window.open(cfg.url, cfg.target).focus();
                if (cfg.pause === true) {
                    this.setPause()
                }
                return this
            };
            this.selfDestruct = function () {
                var ref = this;
                this._enqueue(function () {
                    ref._selfDestruct()
                });
                return this
            }, this._selfDestruct = function () {
                var ref = this;
                $(this).unbind();
                this.removePlugin();
                this._removeGUIListeners();
                this.env.playerDom.replaceWith($(this.env.srcNode).clone());
                $.each(projekktors, function (idx) {
                    try {
                        if (this.getId() == ref.getId() || this.getId() == ref.getId() || this.getParent() == ref.getId()) {
                            projekktors.splice(idx, 1);
                            return
                        }
                    } catch (e) {}
                });
                return this
            };
            this.reset = function () {
                var ref = this;
                this._clearqueue();
                this._enqueue(function () {
                    ref._reset()
                });
                return this
            }, this._reset = function () {
                var cleanConfig = {},
                    ref = this;
                $(this).unbind();
                this.setFullscreen(false);
                this.removePlugin();
                this._removeGUIListeners();
                this.env.mediaContainer = null;
                for (var i in this.config) {
                    cleanConfig[(i.substr(0, 1) == "_") ? i.substr(1) : i] = this.config[i]
                }
                if (typeof this.env.onReady === "function") {
                    this._enqueue(ref.env.onReady(ref))
                }
                this._init(this.env.playerDom, cleanConfig);
                return this
            }, this._cookie = function (key, value) {
                if (document.cookie === undefined) {
                    return null
                }
                if (document.cookie === false) {
                    return null
                }
                var options = {};
                if (arguments.length > 1 && (value === null || typeof value !== "object")) {
                    var t = new Date();
                    t.setDate(t.getDate() + this.config._cookieExpiry);
                    return (document.cookie = encodeURIComponent(this.config._cookieName + "_" + key) + "=" + encodeURIComponent(String(value)) + "; expires=" + t.toUTCString() + "; path=/")
                }
                options = value || {};
                var result, decode = options.raw ?
                function (s) {
                    return s
                } : decodeURIComponent;
                var returnthis = (result = new RegExp("(?:^|; )" + encodeURIComponent(this.config._cookieName + "_" + key) + "=([^;]*)").exec(document.cookie)) ? decode(result[1]) : null;
                return (returnthis != null) ? this._cleanValue(returnthis) : null
            };
            this.embeddFlash = function (destObj, domOptions) {
                var flashVars = domOptions.FlashVars || {},
                    result = "",
                    htmlEmbedObj = "",
                    htmlEmbed = "",
                    tmpStr = "",
                    id = "";
                domOptions.src += "?";
                for (var key in flashVars) {
                    if (typeof flashVars[key] != "function") {
                        tmpStr = flashVars[key];
                        for (var i in this.media) {
                            if (typeof tmpStr != "string") {
                                continue
                            }
                            tmpStr = tmpStr.replace("{" + i + "}", this.media[i])
                        }
                        domOptions.src += key + "=" + encodeURIComponent(tmpStr) + "&"
                    }
                }
                domOptions.src.replace(/&$/, "");
                if ($.browser.msie) {
                    id = ' id="' + domOptions.id + '" '
                }
                htmlEmbedObj = "<object" + id + ' codebase="https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"  name="' + domOptions.name + '" width="' + domOptions.width + '" height="' + domOptions.height + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">';
                htmlEmbedObj += '<param name="movie" value="' + domOptions.src + '"></param>';
                htmlEmbedObj += '<param name="allowScriptAccess" value="' + domOptions.allowScriptAccess + '"></param>';
                htmlEmbedObj += '<param name="allowFullScreen" value="' + domOptions.allowFullScreen + '"></param>';
                htmlEmbedObj += '<param name="wmode" value="' + domOptions.wmode + '"></param>';
                htmlEmbed = "<embed ";
                for (var key in domOptions) {
                    if (key.toUpperCase() === "FLASHVARS") {
                        continue
                    }
                    if (typeof domOptions[key] != "function") {
                        htmlEmbed += key + '="' + domOptions[key] + '" '
                    }
                }
                htmlEmbed += ' pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>';
                result = htmlEmbedObj + htmlEmbed;
                result += "</object>";
                if ($.browser.mozilla) {
                    result = htmlEmbed
                }
                if (destObj === null) {
                    return result
                }
                destObj[0].innerHTML = result;
                return $("#" + domOptions.id)[0]
            };
            this._testMediaSupport = function () {
                var nativeElementType = "",
                    result = {
                        all: [],
                        media: []
                    };
                for (var i = 0; i < $p.mmap.length; i++) {
                    if ($.inArray($p.mmap[i]["type"], result.all) > -1) {
                        continue
                    }
                    if ("all|internal".indexOf($p.mmap[i]["platform"]) > -1) {
                        result.all.push($p.mmap[i]["type"]);
                        continue
                    }
                    if ($p.mmap[i]["fixed"] !== true) {
                        if (($p.mmap[i]["type"].indexOf("video") > -1 || $p.mmap[i]["type"].indexOf("audio") > -1)) {
                            try {
                                nativeElementType = ($p.mmap[i]["type"].indexOf("video") > -1) ? "video" : "audio";
                                var testObject = document.createElement(nativeElementType);
                                if (testObject.canPlayType != false) {
                                    switch (testObject.canPlayType($p.mmap[i]["type"])) {
                                    case "no":
                                    case "":
                                        break;
                                    case "maybe":
                                        if ($.browser.opera) {
                                            if ($.browser.version.slice(0, 2) < 11) {
                                                break
                                            }
                                        }
                                    case "probably":
                                    default:
                                        result.all.push($p.mmap[i]["type"]);
                                        result.media.push($p.mmap[i]["type"])
                                    }
                                }
                            } catch (e) {}
                        }
                    }
                }
                return result
            };
            this.randomId = function (length) {
                var chars = "abcdefghiklmnopqrstuvwxyz";
                var result = "";
                for (var i = 0; i < length; i++) {
                    var rnum = Math.floor(Math.random() * chars.length);
                    result += chars.substring(rnum, rnum + 1)
                }
                return result
            };
            this.toAbsoluteURL = function (s) {
                var l = location,
                    h, p, f, i;
                if (s == null || s == "") {
                    return ""
                }
                if (/^\w+:/.test(s)) {
                    return s
                }
                h = l.protocol + "//" + l.host;
                if (s.indexOf("/") == 0) {
                    return h + s
                }
                p = l.pathname.replace(/\/[^\/]*$/, "");
                f = s.match(/\.\.\//g);
                if (f) {
                    s = s.substring(f.length * 3);
                    for (i = f.length; i--;) {
                        p = p.substring(0, p.lastIndexOf("/"))
                    }
                }
                return h + p + "/" + s
            };
            this.parseTemplate = function (template, data) {
                if (data === undefined || data.length == 0 || typeof data != "object") {
                    return template
                }
                for (var i in data) {
                    template = template.replace(new RegExp("%{" + i + "}", "gi"), data[i])
                }
                template = template.replace(/%{(.*?)}/gi, "");
                return template
            };
            this._cleanValue = function (value) {
                switch (value) {
                case "false":
                    return false;
                case "true":
                    return true;
                case "null":
                    return null;
                case "undefined":
                    return "";
                case undefined:
                    return false;
                default:
                    return (typeof value != "string" && typeof value != "number" && typeof value != "boolean") ? false : value
                }
            };
            this._getTypeFromFileExtension = function (url) {
                var fileExt = "",
                    extRegEx = [],
                    extTypes = {},
                    extRegEx = [];
                for (var i in $p.mmap) {
                    extRegEx.push("." + $p.mmap[i].ext);
                    extTypes[$p.mmap[i].ext] = $p.mmap[i]
                }
                extRegEx = "^.*.(" + extRegEx.join("|") + ")";
                try {
                    fileExt = url.match(new RegExp(extRegEx))[1];
                    fileExt = (!fileExt) ? "NaN" : fileExt.replace(".", "")
                } catch (e) {
                    fileExt = "NaN"
                }
                return extTypes[fileExt].type
            };
            this._debug = function (desc, data) {
                if (this.config._debug === false) {
                    return
                }
                if (this.config._debug == "console") {
                    try {
                        if (desc) {
                            console.log(desc)
                        }
                        if (data) {
                            console.log(data)
                        }
                    } catch (e) {}
                    return
                }
                var result = "<pre><b>" + desc + "</b>\n";
                if (data && this.config.debugLevel > 1) {
                    switch (typeof data) {
                    case "undefined":
                        break;
                    case "object":
                        var temp = "";
                        if (temp == "") {
                            temp = "";
                            for (var i in data) {
                                temp += i + " : " + data[i] + "\n"
                            }
                        }
                        result += temp;
                        break;
                    case "string":
                        result += data
                    }
                    result += "</pre>"
                }
                try {
                    $("#" + this.config._debug).prepend(result)
                } catch (e) {}
            };
            this._raiseError = function (txt) {
                this.env.playerDom.html(txt).css({
                    color: "#fdfdfd",
                    backgroundColor: "#333",
                    lineHeight: this.config.height + "px",
                    textAlign: "center",
                    display: "block"
                });
                this._promote("error")
            };
            this._readMediaTag = function (domNode) {
                var result = {},
                    htmlTag = "",
                    attr = [],
                    ref = this;
                if (domNode[0].tagName.toUpperCase() != "VIDEO" && domNode[0].tagName.toUpperCase() != "AUDIO") {
                    return false
                }
                result = {
                    autoplay: (domNode.prop("autoplay") !== undefined && domNode.prop("autoplay") !== false) ? true : false,
                    controls: (domNode.prop("controls") !== undefined && domNode.prop("controls") !== false) ? true : false,
                    loop: (domNode.prop("loop") !== undefined && domNode.prop("loop") !== false) ? true : false,
                    title: (domNode.attr("title") !== undefined && domNode.attr("title") !== false) ? domNode.attr("title") : "",
                    poster: (domNode.attr("poster") !== undefined && domNode.attr("poster") !== false) ? domNode.attr("poster") : "",
                    width: (domNode.attr("width") !== undefined && domNode.attr("width") !== false) ? domNode.attr("width") : false,
                    height: (domNode.attr("height") !== undefined && domNode.attr("height") !== false) ? domNode.attr("height") : false
                };
                if ($.browser.msie) {
                    htmlTag = $($("<div></div>").html($(domNode).clone())).html();
                    attr = ["autoplay", "controls", "loop"];
                    for (var i = 0; i < attr.length; i++) {
                        if (htmlTag.indexOf(attr[i]) == -1) {
                            continue
                        }
                        result[attr[i]] = true
                    }
                }
                domNode.prop("autoplay", false);
                result.playlist = [];
                result.playlist[0] = [];
                if (srcNode.attr("src")) {
                    result.playlist[0].push({
                        src: srcNode.attr("src"),
                        type: srcNode.attr("type") || this._getTypeFromFileExtension(srcNode.attr("src"))
                    })
                }
                if ($.browser.msie && $.browser.version < 9) {
                    var childNode = srcNode;
                    do {
                        childNode = childNode.next("source");
                        if (childNode.attr("src")) {
                            result.playlist[0].push({
                                src: childNode.attr("src"),
                                type: childNode.attr("type") || this._getTypeFromFileExtension(childNode.attr("src"))
                            })
                        }
                    } while (childNode.attr("src"))
                } else {
                    srcNode.children("source").each(function () {
                        if ($(this).attr("src")) {
                            result.playlist[0].push({
                                src: $(this).attr("src"),
                                type: $(this).attr("type") || ref._getTypeFromFileExtension($(this).attr("src"))
                            })
                        }
                    })
                }
                try {
                    domNode[0].pause();
                    domNode.find("source").remove();
                    domNode.prop("src", "");
                    domNode[0].load()
                } catch (e) {}
                return result
            };
            this._applyDimensions = function () {
                if (this.config._height !== false && this.config._width !== false) {
                    if (this.config._width <= this.config._minWidth) {
                        this.config._width = this.config._minWidth;
                        this.env.autoSize = true
                    }
                    if (this.config._height <= this.config._minHeight) {
                        this.config._height = this.config._minHeight;
                        this.env.autoSize = true
                    }
                }
                this.env.playerDom.css({
                    overflow: "hidden",
                    width: this.config._width + "px",
                    height: this.config._height + "px",
                    "max-width": "100%"
                })
            };
            this._init = function (customNode, customCfg) {
                var theNode = customNode || srcNode,
                    theCfg = customCfg || cfg,
                    cfgBySource = this._readMediaTag(theNode);
                this.env.srcNode = $.extend(true, {}, theNode);
                this.env.className = theNode.attr("class");
                if (cfgBySource !== false) {
                    this.env.playerDom = $(document.createElement("div")).attr({
                        "class": theNode[0].className,
                        style: theNode.attr("style")
                    });
                    theNode.replaceWith(this.env.playerDom)
                } else {
                    cfgBySource = {
                        width: (theNode.attr("width")) ? theNode.attr("width") : theNode.width(),
                        height: (theNode.attr("height")) ? theNode.attr("height") : theNode.height()
                    };
                    this.env.playerDom = theNode
                }
                theCfg = $.extend(true, {}, cfgBySource, theCfg);
                for (var i in theCfg) {
                    if (this.config["_" + i] != undefined) {
                        this.config["_" + i] = theCfg[i]
                    } else {
                        this.config[i] = theCfg[i]
                    }
                }
                if (this.getIsMobileClient()) {
                    this.config._autoplay = false
                }
                this._id = theNode[0].id || this.randomId(8);
                this.env.playerDom.attr("id", this._id);
                if (this.config._theme) {
                    switch (typeof this.config._theme) {
                    case "string":
                        break;
                    case "object":
                        this._applyTheme(this.config._theme)
                    }
                } else {
                    this._start(false)
                }
                return this
            };
            this._start = function (data) {
                var ref = this,
                    files = [];
                this._applyDimensions();
                try {
                    $("#projekktorver").html("V" + this.config._version)
                } catch (e) {}
                this._registerPlugins();
                if (this.config._iframe === true) {
                    if (this.getIframeWindow()) {
                        this.getIframeWindow().ready(function () {
                            ref._enterFullViewport();
                            ref.env.inFullscreen = false
                        })
                    } else {
                        ref._enterFullViewport();
                        ref.env.inFullscreen = false;
                        this.config.disableFullscreen = true
                    }
                }
                if (typeof onReady === "function") {
                    this._enqueue(function () {
                        onReady(ref)
                    })
                }
                for (var i in this.config._playlist[0]) {
                    if (this.config._playlist[0][i].type) {
                        if (this.config._playlist[0][i].type.indexOf("/json") > -1 || this.config._playlist[0][i].type.indexOf("/xml") > -1) {
                            this.setFile(this.config._playlist[0][i].src, true, this.config._playlist[0][i].type);
                            return this
                        }
                    }
                }
                this.setFile(this.config._playlist);
                return this
            };
            this._applyTheme = function (data) {
                var ref = this;
                if (data === false) {
                    this._raiseError("The Projekktor theme-set specified could not be loaded.");
                    return false
                }
                if (typeof data.config.plugins == "object") {
                    for (var i = 0; i < data.config.plugins.length; i++) {
                        try {
                            typeof eval("projekktor" + data.config.plugins[i])
                        } catch (e) {
                            this._raiseError("The applied theme requires the following Projekktor plugin(s): <b>" + data.config.plugins.join(", ") + "</b>");
                            return false
                        }
                    }
                }
                if (typeof data.css == "string") {
                    $("head").append('<style type="text/css">' + this.parseTemplate(data.css, {
                        rp: data.baseURL
                    }) + "</style>")
                }
                if (typeof data.html == "string") {
                    this.env.playerDom.html(this.parseTemplate(data.html, {
                        p: this.config._cssClassPrefix
                    }))
                }
                this.env.playerDom.addClass(data.id).addClass(data.variation);
                if (typeof data.config == "object") {
                    for (var i in data.config) {
                        if (this.config["_" + i] != undefined) {
                            this.config["_" + i] = data.config[i]
                        } else {
                            this.config[i] = data.config[i]
                        }
                    }
                }
                if (data.onReady) {
                    this._enqueue(function (player) {
                        eval(data.onReady)
                    })
                }
                return this._start()
            };
            return this._init()
        }
    };
    $p.mmap = [];
    $p.models = {};
    $p.newModel = function (obj, ext) {
        var result = false,
            extend = ($p.models[ext] && ext != undefined) ? $p.models[ext].prototype : {};
        if (typeof obj != "object") {
            return result
        }
        if (!obj.modelId) {
            return result
        }
        if ($p.models[obj.modelId]) {
            return result
        }
        $p.models[obj.modelId] = function () {};
        $p.models[obj.modelId].prototype = $.extend({}, extend, obj);
        for (var i = 0; i < obj.iLove.length; i++) {
            obj.iLove[i].model = obj.modelId.toLowerCase();
            $p.mmap.push(obj.iLove[i])
        }
        return true
    }
});
var projekktorConfig = function (b) {
        this._version = b
    };
var projekktorPluginInterface = function () {};
jQuery(function (b) {
    projekktorPluginInterface.prototype = {
        pluginReady: false,
        name: "",
        pp: {},
        config: {},
        playerDom: null,
        canvas: {
            media: null,
            projekktor: null
        },
        _appliedDOMObj: [],
        _init: function (a) {
            this.config = b.extend(true, this.config, a);
            this.initialize()
        },
        getConfig: function (a, f) {
            var e = null;
            if (this.pp.getConfig("plugin_" + this.name) != null) {
                e = this.pp.getConfig("plugin_" + this.name)[a]
            }
            if (e == null) {
                e = this.pp.getConfig(a)
            }
            if (e == null) {
                e = (this.config[a] || f)
            }
            return e
        },
        sendEvent: function (a, d) {
            this.pp._promote({
                _plugin: this.name,
                _event: a
            }, d)
        },
        deconstruct: function () {
            this.pluginReady = false;
            b.each(this._appliedDOMObj, function () {
                b(this).remove()
            })
        },
        parseTemplate: function (a, d) {
            return this.pp.parseTemplate(a, d)
        },
        blockSelection: function (a) {
            if (!a) {
                return
            }
            if (b.browser.mozilla) {
                a.css("MozUserSelect", "none")
            } else {
                if (b.browser.msie) {
                    a.bind("selectstart", function () {
                        return false
                    })
                } else {
                    a.mousedown(function () {
                        return false
                    })
                }
            }
        },
        applyToPlayer: function (h, g) {
            var f = this.getConfig("cssClassPrefix");
            if (!h) {
                return null
            }
            if (this.playerDom.find("." + f + h.attr("class")).length == 0) {
                var a = h.attr("class");
                h.removeClass(a);
                h.addClass(f + a);
                if (g === true) {
                    h.prependTo(this.playerDom)
                } else {
                    h.appendTo(this.playerDom)
                }
                this._appliedDOMObj.push(h);
                return h
            }
            var a = h.attr("class");
            h = this.playerDom.find("." + f + h.attr("class"));
            h.removeClass(a);
            h.addClass(f + a);
            return h
        },
        initialize: function () {}
    }
});
var playerModel = function () {};
jQuery(function (b) {
    playerModel.prototype = {
        modelId: "player",
        iLove: [],
        _currentState: null,
        _currentBufferState: null,
        _volume: 0,
        _KbPerSec: 0,
        _bandWidthTimer: null,
        _isPoster: false,
        modelReady: true,
        requiresFlash: false,
        hasGUI: false,
        allowRandomSeek: false,
        flashVerifyMethod: "api_get",
        elementReady: false,
        mediaElement: null,
        pp: {},
        media: {
            duration: 0,
            position: 0,
            startOffset: 0,
            file: false,
            poster: "",
            ended: false,
            message: "",
            error: null,
            loadProgress: 0,
            errorCode: 0,
            message: "",
            type: "NA"
        },
        _init: function (a) {
            this.pp = a.pp || null;
            this.media = a.media || this.media;
            this._ap = a.autoplay;
            this._volume = this.pp.getVolume("volume");
            this.init()
        },
        init: function (a) {
            this.ready()
        },
        ready: function () {
            this.sendUpdate("modelReady");
            this.displayItem(this._ap)
        },
        displayItem: function (a) {
            if (a !== true || this.getState("STOPPED")) {
                this._setState("idle");
                this.applyImage(this.getPoster(), this.pp.getMediaContainer().html(""));
                this._isPoster = true;
                this.elementReady = true
            } else {
                if (this.hasGUI) {
                    this.pp.env.playerDom.children().not(".ppdisplay").addClass("inactive").removeClass("active")
                }
                if (this.requiresFlash !== false) {
                    if (this.requiresFlash > this.pp.getFlashVersion()) {
                        this.setTestcard(6);
                        return
                    }
                }
                this._setState("awakening");
                this.elementReady = false;
                this._isPoster = false;
                this.applyMedia(this.pp.getMediaContainer().html("").show())
            }
            this.waitTillReady(a)
        },
        applyMedia: function () {},
        sendUpdate: function (a, d) {
            this.pp._modelUpdateListener(a, d)
        },
        waitTillReady: function (d) {
            var a = this;
            (function () {
                try {
                    if (a.elementReady !== true) {
                        setTimeout(arguments.callee, 70);
                        return
                    }
                } catch (c) {}
                if (!a.getState("STOPPED") || d === true) {
                    try {
                        a.addListeners()
                    } catch (c) {}
                }
                a.pp._modelUpdateListener("displayReady");
                if (d === true) {
                    if (a.pp.getIsMobileClient()) {
                        setTimeout(function () {
                            a.setPlay()
                        }, 500)
                    }
                    a.setPlay()
                }
            })()
        },
        addListeners: function () {},
        removeListeners: function () {
            try {
                this.mediaElement.unbind()
            } catch (a) {}
        },
        detachMedia: function () {},
        destroy: function () {
            this.setPause();
            this.removeListeners();
            this.detachMedia();
            try {
                b("#" + this.mediaElement.id).empty()
            } catch (a) {}
            try {
                b("#" + this.mediaElement.id).remove()
            } catch (a) {}
            try {
                this.mediaElement.remove()
            } catch (a) {}
            this.pp.getMediaContainer().html("");
            this.mediaElement = null;
            this.media.loadProgress = 0;
            this.media.playProgress = 0;
            this.media.position = 0;
            this.media.duration = 0;
            this._setState("stopped")
        },
        reInit: function () {
            if (this.requiresFlash === false || !(b.browser.mozilla) || this.getState("ERROR") || this.pp.getConfig("bypassFlashFFFix") === true) {
                return
            }
            this.sendUpdate("FFreinit");
            this.removeListeners();
            this.displayItem((!this.getState("IDLE")))
        },
        applyCommand: function (d, a) {
            switch (d) {
            case "play":
                if (this.getState("ERROR")) {
                    break
                }
                if (this.getState("IDLE")) {
                    this._setState("awakening");
                    this.displayItem(true);
                    break
                }
                this.setPlay();
                break;
            case "pause":
                if (this.getState("ERROR")) {
                    break
                }
                this.setPause();
                break;
            case "volume":
                if (this.getState("ERROR")) {
                    break
                }
                if (!this.setVolume(a)) {
                    this._volume = a;
                    this.sendUpdate("volume", a)
                }
                break;
            case "stop":
                this.setStop();
                break;
            case "seek":
                if (this.getState("ERROR")) {
                    break
                }
                if (this.media.loadProgress == -1) {
                    break
                }
                this.setSeek(a);
                break;
            case "fullscreen":
                this.sendUpdate("fullscreen", a);
                this.setFullscreen(a);
                this.reInit();
                break;
            case "resize":
                this.setResize();
                this.sendUpdate("resize", a);
                break
            }
        },
        setSeek: function (a) {},
        setPlay: function () {},
        setPause: function () {},
        setStop: function () {
            this.detachMedia();
            this.destroy();
            this.displayItem(false)
        },
        setVolume: function (a) {},
        setFullscreen: function (a) {},
        setResize: function () {},
        getVolume: function () {
            if (this.mediaElement == null) {
                return this._volume
            }
            return (this.mediaElement.prop("muted") == true) ? 0 : this.mediaElement.prop("volume")
        },
        getLoadProgress: function () {
            return this.media.loadProgress || 0
        },
        getLoadPlaybackProgress: function () {
            return this.media.playProgress || 0
        },
        getPosition: function () {
            return this.media.position || 0
        },
        getDuration: function () {
            return this.media.duration || 0
        },
        getInFullscreen: function () {
            return this.pp.getInFullscreen()
        },
        getKbPerSec: function () {
            return this._KbPerSec
        },
        getState: function (a) {
            var d = (this._currentState == null) ? "IDLE" : this._currentState;
            if (a != null) {
                return (d == a.toUpperCase())
            }
            return d
        },
        getFile: function () {
            return this.media.file || null
        },
        getModelName: function () {
            return this.modelId || null
        },
        getHasGUI: function () {
            return (this.hasGUI && !this._isPoster)
        },
        getIsReady: function () {
            return this.elementReady
        },
        getPoster: function () {
            return this.pp.getConfig("poster")
        },
        timeListener: function (f) {
            if (f == undefined) {
                return
            }
            var g = (f.position != undefined) ? f.position : f.currentTime,
                h = f.duration,
                a = (g > 0 && h > 0) ? g * 100 / h : 0;
            this.media.duration = this._roundNumber(h, 2);
            this.media.position = this._roundNumber(g, 2);
            this.media.playProgress = a;
            this.sendUpdate("time", this.media.position);
            this.loadProgressUpdate()
        },
        loadProgressUpdate: function () {
            try {
                var g = this.mediaElement[0];
                if (typeof g.buffered !== "object") {
                    return
                }
                if (typeof g.buffered.length <= 0) {
                    return
                }
                var a = Math.round(g.buffered.end(g.buffered.length - 1) * 100) / 100,
                    h = a * 100 / this.media.duration;
                if (h == this.media.loadProgress) {
                    return
                }
                this.media.loadProgress = (this.allowRandomSeek === true) ? 100 : -1;
                this.media.loadProgress = (this.media.loadProgress < 100 || this.media.loadProgress == undefined) ? h : 100;
                this.sendUpdate("progress", this.media.loadProgress)
            } catch (e) {}
        },
        progressListener: function (l, e) {
            try {
                if (typeof this.mediaElement[0].buffered == "object") {
                    if (this.mediaElement[0].buffered.length > 0) {
                        this.mediaElement.unbind("progress");
                        return
                    }
                }
            } catch (i) {}
            if (this._bandWidthTimer == null) {
                this._bandWidthTimer = (new Date()).getTime()
            }
            var j = 0,
                k = 0;
            if (!isNaN(l.loaded / l.total)) {
                j = l.loaded;
                k = l.total
            } else {
                if (l.originalEvent && !isNaN(l.originalEvent.loaded / l.originalEvent.total)) {
                    j = l.originalEvent.loaded;
                    k = l.originalEvent.total
                } else {
                    if (e && !isNaN(e.loaded / e.total)) {
                        j = e.loaded;
                        k = e.total
                    }
                }
            }
            var a = (j > 0 && k > 0) ? j * 100 / k : 0;
            if (Math.round(a) > Math.round(this.media.loadProgress)) {
                this._KbPerSec = ((j / 1024) / (((new Date()).getTime() - this._bandWidthTimer) / 1000))
            }
            a = (this.media.loadProgress !== 100) ? a : 100;
            a = (this.allowRandomSeek === true) ? 100 : a;
            if (this.media.loadProgress != a) {
                this.media.loadProgress = a;
                this.sendUpdate("progress", a)
            }
            if (this.media.loadProgress >= 100 && this.allowRandomSeek == false) {
                this._setBufferState("full")
            }
        },
        endedListener: function (a) {
            if (this.mediaElement === null) {
                return
            }
            this._setState("completed")
        },
        waitingListener: function (a) {
            this._setBufferState("empty")
        },
        canplayListener: function (a) {
            this._setBufferState("full")
        },
        canplaythroughListener: function (a) {
            this._setBufferState("full")
        },
        suspendListener: function (a) {
            this._setBufferState("full")
        },
        playingListener: function (a) {
            this._setState("playing")
        },
        startListener: function (a) {
            this.applyCommand("volume", this.pp.getConfig("volume"));
            this._setState("playing")
        },
        pauseListener: function (a) {
            this._setState("paused")
        },
        volumeListener: function (a) {
            this.sendUpdate("volume", this.getVolume())
        },
        flashReadyListener: function () {
            this.elementReady = true
        },
        errorListener: function (a, e) {
            try {
                switch (a.target.error.code) {
                case a.target.error.MEDIA_ERR_ABORTED:
                    this.setTestcard(1);
                    break;
                case a.target.error.MEDIA_ERR_NETWORK:
                    this.setTestcard(2);
                    break;
                case a.target.error.MEDIA_ERR_DECODE:
                    this.setTestcard(3);
                    break;
                case a.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    this.setTestcard(4);
                    break;
                default:
                    this.setTestcard(5);
                    break
                }
            } catch (f) {}
        },
        metaDataListener: function (d) {
            try {
                this.videoWidth = d.videoWidth;
                this.videoHeight = d.videoHeight
            } catch (a) {}
            this._scaleVideo()
        },
        setTestcard: function (g, a) {
            var h = this.pp.getMediaContainer(),
                i = this.pp.getConfig("messages"),
                j = (i[g] != undefined) ? i[g] : i[0];
            j = (a != undefined && a != "") ? a : j;
            if (this.pp.getItemCount() > 1) {
                j += i[99]
            }
            if (j.length < 3) {
                j = "ERROR"
            }
            if (g == 100) {
                j = ""
            }
            j = this.pp.parseTemplate(j, b.extend({}, this.media, {
                flashver: this.requiresFlash
            }));
            h.css({
                width: "100%",
                height: "100%"
            }).html("");
            this.mediaElement = b(document.createElement("div")).addClass("pptestcard").attr("id", this.pp.getId() + "_testcard_media").appendTo(h);
            if (j.length > 0) {
                b(document.createElement("p")).appendTo(this.mediaElement).html(j)
            }
            this._setState("error")
        },
        applyImage: function (j, l) {
            var h = b(document.createElement("img")).hide(),
                i = this;
            if (j == "" || j == undefined) {
                h = b(document.createElement("span")).attr({
                    id: this.pp.getMediaId() + "_image"
                }).appendTo(l);
                return h
            }
            h.appendTo(l).attr({
                id: this.pp.getMediaId() + "_image",
                src: j
            }).css({
                position: "absolute"
            });
            h.error(function (c) {
                b(this).remove()
            });
            var a = function (c) {
                    c.realWidth = c.prop("width");
                    c.realHeight = c.prop("height");
                    c.width = function () {
                        return c.realWidth
                    };
                    c.height = function () {
                        return c.realHeight
                    }
                };
            if (b.browser.msie) {
                (function () {
                    try {
                        if (h[0].complete == true) {
                            h.show();
                            a(h);
                            i.stretch(i.pp.getConfig("imageScaling"), h, l.width(), l.height());
                            return
                        }
                        setTimeout(arguments.callee, 100)
                    } catch (c) {
                        setTimeout(arguments.callee, 100)
                    }
                })()
            } else {
                h.load(function (c) {
                    b(this).show();
                    a(h);
                    i.stretch(i.pp.getConfig("imageScaling"), b(this), l.width(), l.height())
                })
            }
            var k = function (c, d) {
                    if (d.is(":visible") === false) {
                        i.pp.removeListener("fullscreen", arguments.callee)
                    }
                    i.stretch(i.pp.getConfig("imageScaling"), c, d.width(), d.height())
                };
            this.pp.addListener("fullscreen", function () {
                k(h, l)
            });
            this.pp.addListener("resize", function () {
                k(h, l)
            });
            return h
        },
        stretch: function (x, v, a, o, t, r) {
            if (v == undefined || v == null) {
                return false
            }
            if (v._originalDimensions === undefined) {
                v._originalDimensions = {};
                v._originalDimensions = {
                    width: v.width(),
                    height: v.height()
                }
            }
            var s = (t !== undefined) ? t : v._originalDimensions.width;
            var w = (r !== undefined) ? r : v._originalDimensions.height;
            var q = (a / s);
            var n = (o / w);
            var u = a;
            var p = o;
            switch (x) {
            case "fill":
                if (q > n) {
                    u = s * q;
                    p = w * q
                } else {
                    if (q < n) {
                        u = s * n;
                        p = w * n
                    }
                }
                break;
            case "aspectratio":
            default:
                if (q > n) {
                    u = s * n;
                    p = w * n
                } else {
                    if (q < n) {
                        u = s * q;
                        p = w * q
                    }
                }
                break
            }
            a = this._roundNumber((u / a) * 100, 0);
            o = this._roundNumber((p / o) * 100, 0);
            if (a == 0 || o == 0) {
                return false
            }
            v.css({
                margin: 0,
                padding: 0,
                width: a + "%",
                height: o + "%",
                left: (100 - a) / 2 + "%",
                top: (100 - o) / 2 + "%"
            });
            if (v._originalDimensions.width != v.width() || v._originalDimensions.height != v.height()) {
                return true
            }
            return false
        },
        createFlash: function (d, a) {
            this.mediaElement = this.pp.embeddFlash(a, d);
            this._waitforPlayer()
        },
        _waitforPlayer: function () {
            if (this.elementReady == true) {
                return
            }
            var a = this;
            this._setBufferState("empty");
            (function () {
                try {
                    if (a.mediaElement == undefined) {
                        setTimeout(arguments.callee, 100)
                    } else {
                        if (a.mediaElement[a.flashVerifyMethod] == undefined) {
                            setTimeout(arguments.callee, 100)
                        } else {
                            a._setBufferState("full");
                            a.flashReadyListener()
                        }
                    }
                } catch (d) {
                    setTimeout(arguments.callee, 100)
                }
            })()
        },
        _roundNumber: function (a, d) {
            if (a <= 0 || isNaN(a)) {
                return 0
            }
            return Math.round(a * Math.pow(10, d)) / Math.pow(10, d)
        },
        _setState: function (a) {
            a = a.toUpperCase();
            if (this._currentState != a) {
                if (this._currentState == "PAUSED" && a == "PLAYING") {
                    this.sendUpdate("resume", this.media)
                }
                if ((this._currentState == "IDLE" || this._currentState == "AWAKENING") && a == "PLAYING") {
                    this.sendUpdate("start", this.media)
                }
                this._currentState = a.toUpperCase();
                this.sendUpdate("state", this._currentState)
            }
        },
        _setBufferState: function (a) {
            if (this._currentBufferState != a) {
                this._currentBufferState = a.toUpperCase();
                this.sendUpdate("buffer", this._currentBufferState)
            }
        },
        _scaleVideo: function (j) {
            var m = this.pp.getMediaContainer();
            if (this.pp.getIsMobileClient()) {
                return
            }
            try {
                var l = m.width(),
                    e = m.height(),
                    a = this.videoWidth,
                    n = this.videoHeight;
                if (this.stretch(this.pp.getConfig("videoScaling"), this.mediaElement, l, e, a, n)) {
                    this.sendUpdate("scaled", {
                        realWidth: a,
                        realHeight: n,
                        displayWidth: l,
                        displayHeight: e
                    })
                }
            } catch (k) {}
        }
    }
});
jQuery(function (b) {
    $p.newModel({
        modelId: "NA",
        iLove: [{
            ext: "NaN",
            type: "none/none",
            platform: "all"
        }],
        hasGUI: true,
        applyMedia: function (a) {
            if (this.pp.getConfig("enableTestcard") && !this.pp.getIsMobileClient()) {
                this.setTestcard((this.media.file !== "" && this.media.errorCode === 7) ? 5 : this.media.errorCode);
                this.elementReady = true
            } else {
                this.elementReady = true;
                this.applyCommand("stop");
                window.location.href = this.media.file
            }
        },
        setPlay: function () {
            this.sendUpdate("start")
        },
        setPause: function () {
            if (this._hasEnded == false) {
                this._hasEnded = true;
                this.sendUpdate("ended")
            }
        }
    })
});
jQuery(function (b) {
    $p.newModel({
        modelId: "PLAYLIST",
        iLove: [{
            ext: "json",
            type: "text/json",
            platform: "internal"
        }, {
            ext: "jsonp",
            type: "text/jsonp",
            platform: "internal"
        }, {
            ext: "xml",
            type: "text/xml",
            platform: "internal"
        }, {
            ext: "json",
            type: "application/json",
            platform: "internal"
        }, {
            ext: "jsonp",
            type: "application/jsonp",
            platform: "internal"
        }, {
            ext: "xml",
            type: "application/xml",
            platform: "internal"
        }],
        applyMedia: function (a) {
            this.elementReady = true
        },
        setPlay: function () {
            this.sendUpdate("playlist", this.media.file)
        }
    })
});
jQuery(function (b) {
    $p.newModel({
        modelId: "VIDEOFLASH",
        iLove: [{
            ext: "flv",
            type: "video/x-flv",
            platform: "flash",
            fixed: true
        }, {
            ext: "flv",
            type: "video/flv",
            platform: "flash",
            fixed: true
        }, {
            ext: "mp4",
            type: "video/mp4",
            platform: "flash",
            fixed: "maybe"
        }, {
            ext: "mov",
            type: "video/quicktime",
            platform: "flash"
        }, {
            ext: "m4v",
            type: "video/mp4",
            platform: "flash",
            fixed: "maybe"
        }],
        requiresFlash: 9,
        allowRandomSeek: false,
        flashVerifyMethod: "api_get",
        _jarisVolume: 0,
        applyMedia: function (a) {
            var d = {
                id: this.pp.getMediaId() + "_flash",
                name: this.pp.getMediaId() + "_flash",
                src: this.pp.getConfig("playerFlashMP4"),
                width: "100%",
                height: "100%",
                allowScriptAccess: "always",
                allowFullScreen: "true",
                allowNetworking: "all",
                wmode: "transparent",
                bgcolor: "#000000",
                FlashVars: {
                    source: this.media.file,
                    type: "video",
                    streamtype: this.pp.getConfig("flashStreamType"),
                    server: (this.pp.getConfig("flashStreamType") == "rtmp") ? this.pp.getConfig("flashRTMPServer") : "",
                    autostart: "false",
                    hardwarescaling: "true",
                    controls: "false",
                    jsapi: "true"
                }
            };
            switch (this.pp.getConfig("flashStreamType")) {
            case "rtmp":
            case "http":
                this.allowRandomSeek = true;
                this.media.loadProgress = 100;
                break
            }
            this.createFlash(d, a)
        },
        addListeners: function () {
            if (this.mediaElement == null) {
                return
            }
            this.mediaElement.api_addlistener("onprogress", "projekktor('" + this.pp.getId() + "').playerModel.progressListener");
            this.mediaElement.api_addlistener("ontimeupdate", "projekktor('" + this.pp.getId() + "').playerModel.timeListener");
            if (this.getModelName().indexOf("VIDEO") > -1) {
                this.mediaElement.api_addlistener("ondatainitialized", "projekktor('" + this.pp.getId() + "').playerModel.metaDataListener")
            }
            if (this.getModelName().indexOf("AUDIO") > -1) {
                this.mediaElement.api_addlistener("onconnectionsuccess", "projekktor('" + this.pp.getId() + "').playerModel.startListener")
            }
            this.mediaElement.api_addlistener("onplaypause", "projekktor('" + this.pp.getId() + "').playerModel._playpauseListener");
            this.mediaElement.api_addlistener("onplaybackfinished", "projekktor('" + this.pp.getId() + "').playerModel.endedListener");
            this.mediaElement.api_addlistener("onmute", "projekktor('" + this.pp.getId() + "').playerModel.volumeListener");
            this.mediaElement.api_addlistener("onvolumechange", "projekktor('" + this.pp.getId() + "').playerModel.volumeListener");
            this.mediaElement.api_addlistener("onbuffering", "projekktor('" + this.pp.getId() + "').playerModel.waitingListener");
            this.mediaElement.api_addlistener("onnotbuffering", "projekktor('" + this.pp.getId() + "').playerModel.canplayListener");
            this.mediaElement.api_addlistener("onconnectionfailed", "projekktor('" + this.pp.getId() + "').playerModel.errorListener")
        },
        removeListeners: function () {
            try {
                this.mediaElement.api_removelistener("*")
            } catch (a) {}
        },
        _playpauseListener: function (a) {
            if (a.isplaying) {
                this.playingListener()
            } else {
                this.pauseListener()
            }
        },
        metaDataListener: function (d) {
            this.startListener(d);
            try {
                this.videoWidth = d.width;
                this.videoHeight = d.height;
                this.sendUpdate("scaled", {
                    width: this.videoWidth,
                    height: this.videoHeight
                })
            } catch (a) {}
        },
        setSeek: function (d) {
            try {
                this.mediaElement.api_seek(d)
            } catch (a) {}
        },
        setVolume: function (a) {
            this._volume = a;
            try {
                this.mediaElement.api_volume(a)
            } catch (d) {
                return false
            }
            return a
        },
        setPause: function (a) {
            try {
                this.mediaElement.api_pause()
            } catch (d) {}
        },
        setPlay: function (a) {
            try {
                this.mediaElement.api_play()
            } catch (d) {}
        },
        getVolume: function () {
            return this._jarisVolume
        },
        errorListener: function (a) {
            this.setTestcard(4)
        },
        volumeListener: function (a) {
            if (this._jarisVolume != a.volume) {
                this._jarisVolume = a.volume;
                this.sendUpdate("volume", a.volume)
            }
        },
        detachMedia: function () {
            try {
                b(this.mediaElement).remove()
            } catch (a) {}
        }
    });
    $p.newModel({
        modelId: "AUDIOFLASH",
        iLove: [{
            ext: "mp3",
            type: "audio/mp3",
            platform: "flash"
        }, {
            ext: "mp3",
            type: "audio/mpeg",
            platform: "flash"
        }, {
            ext: "m4a",
            type: "audio/mp4",
            platform: "flash"
        }],
        applyMedia: function (a) {
            this.imageElement = this.applyImage(this.pp.getConfig("cover") || this.pp.getConfig("poster"), a);
            var f = b("#" + this.pp.getMediaId() + "_flash_container");
            if (f.length == 0) {
                f = b(document.createElement("div")).css({
                    width: "1px",
                    height: "1px"
                }).attr("id", this.pp.getMediaId() + "_flash_container").appendTo(a)
            }
            var e = {
                id: this.pp.getMediaId() + "_flash",
                name: this.pp.getMediaId() + "_flash",
                src: this.pp.getConfig("playerFlashMP3"),
                width: "1px",
                height: "1px",
                allowScriptAccess: "always",
                allowFullScreen: "true",
                allowNetworking: "all",
                wmode: "transparent",
                bgcolor: "#000000",
                FlashVars: {
                    source: this.media.file,
                    type: "audio",
                    streamtype: this.pp.getConfig("flashStreamType"),
                    server: (this.pp.getConfig("flashStreamType") == "rtmp") ? this.pp.getConfig("flashRTMPServer") : "",
                    autostart: "false",
                    hardwarescaling: "false",
                    controls: "false",
                    jsapi: "true"
                }
            };
            this.createFlash(e, f)
        }
    }, "VIDEOFLASH")
});
jQuery(function (b) {
    $p.newModel({
        modelId: "VIDEO",
        iLove: [{
            ext: "ogv",
            type: "video/ogg",
            platform: "native"
        }, {
            ext: "webm",
            type: "video/webm",
            platform: "native"
        }, {
            ext: "ogg",
            type: "video/ogg",
            platform: "native"
        }, {
            ext: "anx",
            type: "video/ogg",
            platform: "native"
        }, {
            ext: "mp4",
            type: "video/mp4",
            platform: "native",
            fixed: "maybe"
        }],
        allowRandomSeek: false,
        videoWidth: 0,
        videoHeight: 0,
        element: "video",
        init: function (a) {
            if (this.pp.getIsMobileClient() && this.element == "video") {
                this.hasGUI = true
            }
            this.ready()
        },
        applyMedia: function (e) {
            this.elementReady = false;
            if (this.media.type.indexOf("/ogg") > -1 || this.media.type.indexOf("/webm") > -1) {
                this.allowRandomSeek = true
            }
            if (this.element == "audio") {
                this.imageElement = this.applyImage(this.pp.getConfig("cover") || this.pp.getConfig("poster"), e)
            }
            var a = (this.element == "video") ? e : b("body");
            a.append(b(document.createElement(this.element)).attr({
                id: this.pp.getMediaId() + "_html",
                poster: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi/v//PwNAgAEACQsDAUdpTjcAAAAASUVORK5CYII=",
                loop: false,
                autoplay: true,
                "x-webkit-airplay": "allow"
            }).prop({
                controls: (this.hasGUI && this.element == "video"),
                volume: this.getVolume()
            }).css({
                width: ((this.element == "video") ? "100%" : "1px"),
                height: ((this.element == "video") ? "100%" : "1px"),
                position: "absolute",
                top: 0,
                left: 0
            }));
            this.mediaElement = b("#" + this.pp.getMediaId() + "_html");
            for (var f in this.media.setup) {
                if (this.media.setup[f].src) {
                    b(document.createElement("source")).appendTo(this.mediaElement).attr({
                        src: this.media.setup[f].src,
                        type: this.media.setup[f].type
                    })
                }
            }
            this.waitforPlayer()
        },
        waitforPlayer: function () {
            if (this.elementReady == true) {
                return
            }
            var e = this,
                f = b("#" + this.pp.getMediaId() + "_html");
            try {
                if (f == undefined) {
                    setTimeout(function () {
                        e.waitforPlayer()
                    }, 200);
                    return
                }
                if (f[0].networkState == undefined) {
                    setTimeout(function () {
                        e.waitforPlayer()
                    }, 200);
                    return
                }
                this.elementReady = true
            } catch (a) {
                setTimeout(function () {
                    e.waitforPlayer()
                }, 200);
                return
            }
        },
        addListeners: function () {
            var a = this;
            if (this.element == "video") {
                this.mediaElement.bind("loadedmetadata", function () {
                    a.metaDataListener(this)
                })
            }
            this.mediaElement.bind("pause", function () {
                a.pauseListener(this)
            });
            this.mediaElement.bind("play", function () {
                a.playingListener(this)
            });
            this.mediaElement.bind("volumechange", function () {
                a.volumeListener(this)
            });
            this.mediaElement.bind("progress", function (d) {
                a.progressListener(d, this)
            });
            this.mediaElement.bind("timeupdate", function () {
                a.timeListener(this)
            });
            this.mediaElement.bind("ended", function () {
                a.endedListener(this)
            });
            this.mediaElement.bind("waiting", function () {
                a.waitingListener(this)
            });
            this.mediaElement.bind("canplaythrough", function () {
                a.canplayListener(this)
            });
            this.mediaElement.bind("canplay", function () {
                a.canplayListener(this)
            });
            this.mediaElement.bind("error", function (d) {
                a.errorListener(d, this)
            });
            this.mediaElement.bind("suspend", function () {
                a.suspendListener(this)
            })
        },
        updatePlayerInfo: function () {
            if (this.mediaElement == null) {
                return
            }
            var a = this,
                d = this.mediaElement[0];
            if (this.getState() == "PLAYING") {
                switch (d.networkState) {
                case d.NETWORK_EMPTY:
                    break;
                case d.NETWORK_IDLE:
                    break;
                case d.NETWORK_LOADING:
                    break;
                case d.NETWORK_NO_SOURCE:
                    this.setTestcard(4);
                    break
                }
            }
            if ("PAUSED|ERROR".indexOf(this.getState()) == -1) {
                setTimeout(function () {
                    a.updatePlayerInfo()
                }, 500)
            }
        },
        detachMedia: function () {
            try {
                this.mediaElement[0].pause();
                b(this.mediaElement[0]).prop("src", "");
                this.mediaElement[0].load()
            } catch (a) {}
        },
        setPlay: function () {
            try {
                this.mediaElement[0].play()
            } catch (a) {}
            this.updatePlayerInfo()
        },
        setPause: function () {
            try {
                this.mediaElement[0].pause()
            } catch (a) {}
        },
        setVolume: function (a) {
            this._volume = a;
            try {
                this.mediaElement.prop("volume", a)
            } catch (d) {
                return false
            }
            return a
        },
        setSeek: function (d) {
            try {
                this.mediaElement.prop("currentTime", d)
            } catch (a) {}
        },
        setFullscreen: function (a) {
            if (this.element == "audio") {
                return
            }
            this._scaleVideo()
        },
        setResize: function () {
            if (this.element == "audio") {
                return
            }
            this._scaleVideo(false)
        }
    });
    $p.newModel({
        modelId: "AUDIO",
        iLove: [{
            ext: "ogg",
            type: "audio/ogg",
            platform: "native"
        }, {
            ext: "oga",
            type: "audio/ogg",
            platform: "native"
        }, {
            ext: "mp3",
            type: "audio/mp3",
            platform: "native"
        }],
        imageElement: {},
        element: "audio"
    }, "VIDEO")
});
jQuery(function (b) {
    $p.newModel({
        modelId: "IMAGE",
        iLove: [{
            ext: "jpg",
            type: "image/jpeg",
            platform: "all"
        }, {
            ext: "gif",
            type: "image/gif",
            platform: "all"
        }, {
            ext: "png",
            type: "image/png",
            platform: "all"
        }],
        allowRandomSeek: true,
        _interval: null,
        _position: 0,
        _duration: 0,
        applyMedia: function (a) {
            this.mediaElement = this.applyImage(this.media.file, a);
            this.elementReady = true;
            this._duration = this.pp.getConfig("duration")
        },
        setPlay: function () {
            var a = this;
            this._setBufferState("full");
            this.progressListener(100);
            this.playingListener();
            if (this._duration > 0) {
                this._interval = setInterval(function () {
                    a._position = a._position + 0.5;
                    if (a._position > a._duration) {
                        clearInterval(a._interval);
                        a._setState("completed")
                    }
                    a.timeListener({
                        duration: a._duration,
                        position: a._position
                    })
                }, 500)
            } else {
                a._setState("completed")
            }
        },
        detachMedia: function () {
            this._position = 0;
            clearInterval(this._interval);
            this.mediaElement.remove()
        },
        setPause: function () {
            this.pauseListener();
            clearInterval(this._interval)
        },
        setSeek: function (a) {
            if (a < this._duration) {
                this._position = a
            }
        }
    });
    $p.newModel({
        modelId: "HTML",
        iLove: [{
            ext: "html",
            type: "text/html",
            platform: "all"
        }],
        applyMedia: function (d) {
            var a = this;
            this.mediaElement = b(document.createElement("iframe")).attr({
                id: this.pp.getMediaId() + "_iframe",
                name: this.pp.getMediaId() + "_iframe",
                src: this.media.file,
                scrolling: "no",
                frameborder: "0",
                width: "100%",
                height: "100%"
            }).css({
                overflow: "hidden",
                border: "0px",
                width: "100%",
                height: "100%"
            }).appendTo(d);
            this.mediaElement.load(function (c) {
                a.success()
            });
            this.mediaElement.error(function (c) {
                a.remove()
            });
            this._duration = this.pp.getConfig("duration")
        },
        success: function () {
            this.elementReady = true
        },
        remove: function () {
            this.mediaElement.remove();
            this.elementReady = true
        }
    }, "IMAGE")
});
jQuery(function (b) {
    $p.newModel({
        modelId: "YTVIDEO",
        iLove: [{
            ext: "youtube.com",
            type: "video/youtube",
            platform: "flash",
            fixed: true
        }],
        modelReady: false,
        allowRandomSeek: true,
        useIframeAPI: true,
        _updateTimer: null,
        init: function (f) {
            var a = this;
            this.useIframeAPI = this.pp.getConfig("useYTIframeAPI") || this.pp.getIsMobileClient();
            if (this.useIframeAPI !== true) {
                this.requiresFlash = 8;
                this.flashVerifyMethod = "cueVideoById";
                this.ready();
                return
            }
            var e = this.pp.getId();
            if (window.ProjekktorYoutubePlayerAPIReady !== true) {
                b.getScript("http://www.youtube.com/player_api");
                (function () {
                    try {
                        if (window.ProjekktorYoutubePlayerAPIReady == true) {
                            a.ready();
                            return
                        }
                        setTimeout(arguments.callee, 50)
                    } catch (c) {
                        setTimeout(arguments.callee, 50)
                    }
                })()
            } else {
                this.ready()
            }
            window.onYouTubePlayerAPIReady = function () {
                window.ProjekktorYoutubePlayerAPIReady = true
            }
        },
        applyMedia: function (f) {
            this._setBufferState("empty");
            var a = this;
            if (this.useIframeAPI === true) {
                this.mediaElement = new YT.Player(this.pp.getId() + "_media", {
                    width: (this.pp.getIsMobileClient()) ? this.pp.config._width : "100%",
                    height: (this.pp.getIsMobileClient()) ? this.pp.config._height : "100%",
                    playerVars: {
                        autoplay: 0,
                        disablekb: 1,
                        start: 0,
                        controls: 0,
                        enablejsapi: 1,
                        wmode: "opaque"
                    },
                    videoId: this.youtubeGetId(),
                    events: {
                        onReady: function (c) {
                            a.onReady(c)
                        },
                        onStateChange: function (c) {
                            a.stateChange(c)
                        },
                        onError: function (c) {
                            a.errorListener(c)
                        }
                    }
                });
                b(this.mediaElement.a).prop("ALLOWTRANSPARENCY", true).attr({
                    scrolling: "no",
                    frameborder: 0
                }).css({
                    overflow: "hidden",
                    border: "0px",
                    display: "block"
                });
                if (b.browser.mozilla) {
                    this.requiresFlash = 8
                }
            } else {
                var e = {
                    id: this.pp.getId() + "_media_youtube",
                    name: this.pp.getId() + "_media_youtube",
                    src: "http://www.youtube.com/apiplayer",
                    width: "100%",
                    height: "100%",
                    bgcolor: "#000000",
                    allowScriptAccess: "always",
                    wmode: "transparent",
                    FlashVars: {
                        enablejsapi: 1,
                        autoplay: 1
                    }
                };
                this.createFlash(e, f)
            }
        },
        flashReadyListener: function () {
            this._youtubeResizeFix();
            this.addListeners();
            this.mediaElement.cueVideoById(this.youtubeGetId())
        },
        flashReinitListener: function () {
            this._youtubeResizeFix();
            this.addListeners();
            if (b.browser.mozilla) {
                this.mediaElement.cueVideoById(this.youtubeGetId());
                if (this.getState() === "PLAYING") {
                    this.setPlay()
                }
            }
            this.elementReady = true
        },
        _youtubeResizeFix: function () {
            b(this.mediaElement).attr({
                width: "99.99999%",
                height: "99.9999%"
            });
            this.applyCommand("volume", this.pp.getConfig("volume"))
        },
        addListeners: function () {
            if (this.useIframeAPI === true) {
                return
            }
            this.mediaElement.addEventListener("onStateChange", "projekktor('" + this.pp.getId() + "').playerModel.stateChange");
            this.mediaElement.addEventListener("onError", "projekktor('" + this.pp.getId() + "').playerModel.errorListener")
        },
        setSeek: function (d) {
            try {
                this.mediaElement.seekTo(d, true)
            } catch (a) {}
        },
        setVolume: function (a) {
            try {
                this.mediaElement.setVolume(a * 100)
            } catch (d) {}
        },
        setPause: function (a) {
            try {
                this.mediaElement.pauseVideo()
            } catch (d) {}
        },
        setPlay: function (a) {
            try {
                this.mediaElement.playVideo()
            } catch (d) {}
        },
        getVolume: function () {
            try {
                return this.mediaElement.getVolume()
            } catch (a) {}
            return 0
        },
        getPoster: function () {
            return this.media.config.poster || this.pp.config.poster || "http://img.youtube.com/vi/" + this.youtubeGetId() + "/0.jpg"
        },
        errorListener: function (a) {
            switch ((a.data == undefined) ? a : a.data) {
            case 100:
                this.setTestcard(500);
                break;
            case 101:
            case 150:
                this.setTestcard(501);
                break;
            case 2:
                this.setTestcard(502);
                break
            }
        },
        stateChange: function (a) {
            clearTimeout(this._updateTimer);
            if (this.mediaElement === null) {
                return
            }
            switch ((a.data == undefined) ? a : a.data) {
            case -1:
                this.setPlay();
                break;
            case 0:
                this.endedListener({});
                break;
            case 1:
                this._setBufferState("full");
                this.playingListener({});
                this.canplayListener({});
                this.updateInfo();
                break;
            case 2:
                this.pauseListener({});
                break;
            case 3:
                this.waitingListener({});
                break;
            case 5:
                if (this.useIframeAPI !== true) {
                    this.onReady()
                }
                break
            }
        },
        onReady: function () {
            this.setVolume(this.pp.getVolume());
            this.elementReady = true;
            if (this.media.title || this.pp.config.title || this.elementReady) {
                return
            }
            var a = this;
            b.ajax({
                url: "http://gdata.youtube.com/feeds/api/videos/" + this.youtubeGetId() + "?v=2&alt=jsonc",
                complete: function (e, h) {
                    try {
                        data = e.responseText;
                        if (typeof data == "string") {
                            data = b.parseJSON(data)
                        }
                        if (data.data.title) {
                            a.sendUpdate("config", {
                                title: data.data.title + " (" + data.data.uploader + ")"
                            })
                        }
                    } catch (g) {}
                    a.elementReady = true
                }
            })
        },
        youtubeGetId: function () {
            return encodeURIComponent(this.media.file.replace(/^[^v]+v.(.{11}).*/, "$1"))
        },
        updateInfo: function () {
            var a = this;
            clearTimeout(this._updateTimer);
            (function () {
                if (a.mediaElement == null) {
                    clearTimeout(a._updateTimer);
                    return
                }
                try {
                    if (a.getState() !== "IDLE" && a.getState() !== "COMPLETED") {
                        a.timeListener({
                            position: a.mediaElement.getCurrentTime(),
                            duration: a.mediaElement.getDuration()
                        });
                        a.progressListener({
                            loaded: a.mediaElement.getVideoBytesLoaded(),
                            total: a.mediaElement.getVideoBytesTotal()
                        })
                    }
                } catch (d) {}
                a._updateTimer = setTimeout(arguments.callee, 500)
            })()
        }
    });
    $p.newModel({
        modelId: "YTAUDIO",
        iLove: [{
            ext: "youtube.com",
            type: "audio/youtube",
            platform: "flash",
            fixed: "maybe"
        }],
        applyMedia: function (a) {
            this.imageElement = this.applyImage(this.pp.getConfig("cover") || this.pp.getConfig("poster"), a);
            this._setBufferState("empty");
            this.mediaElement = new YT.Player(this.pp.getId() + "_media", {
                width: "100px",
                height: "100px",
                playerVars: {
                    autoplay: 10,
                    disablekb: 1,
                    start: 0,
                    controls: 0,
                    enablejsapi: 1,
                    playerapiid: this.pp.getId(),
                    origin: location.host
                },
                videoId: this.youtubeGetId(),
                events: {
                    onReady: "onReady" + this.pp.getId(),
                    onStateChange: "onStateChange" + this.pp.getId(),
                    onError: "onError" + this.pp.getId()
                }
            })
        }
    }, "YTVIDEO")
});
var projekktorControlbar = function () {};
jQuery(function (b) {
    projekktorControlbar.prototype = {
        _cTimer: null,
        _noCHide: false,
        _cFading: false,
        _vSliderAct: false,
        _storeVol: 0,
        _timeTags: {},
        cb: null,
        cbFS: null,
        _pos: {
            left: 0,
            right: 0
        },
        controlElements: {},
        controlElementsConfig: {
            cb: null,
            playhead: {
                on: null,
                call: null
            },
            loaded: {
                on: "click",
                call: "scrubberClk"
            },
            scrubber: {
                on: "click",
                call: "scrubberClk"
            },
            play: {
                on: "click",
                call: "playClk"
            },
            pause: {
                on: "click",
                call: "pauseClk"
            },
            stop: {
                on: "click",
                call: "stopClk"
            },
            prev: {
                on: "click",
                call: "prevClk"
            },
            next: {
                on: "click",
                call: "nextClk"
            },
            rewind: {
                on: "click",
                call: "rewindClk"
            },
            forward: {
                on: "click",
                call: "forwardClk"
            },
            fsexit: {
                on: "click",
                call: "exitFullscreenClk"
            },
            fsenter: {
                on: "click",
                call: "enterFullscreenClk"
            },
            vslider: {
                on: "click",
                call: "vsliderClk"
            },
            vmarker: {
                on: "click",
                call: "vsliderClk"
            },
            vknob: {
                on: "mousedown",
                call: "vknobStartDragListener"
            },
            mute: {
                on: "click",
                call: "muteClk"
            },
            unmute: {
                on: "click",
                call: "unmuteClk"
            },
            vmax: {
                on: "click",
                call: "vmaxClk"
            },
            open: {
                on: "click",
                call: "openCloseClk"
            },
            close: {
                on: "click",
                call: "openCloseClk"
            },
            loopon: {
                on: "click",
                call: "loopClk"
            },
            loopoff: {
                on: "click",
                call: "loopClk"
            },
            draghandle: {
                on: "mousedown",
                call: "handleStartDragListener"
            },
            controls: {
                on: null,
                call: null
            },
            title: null,
            sec_dur: null,
            min_dur: null,
            hr_dur: null,
            sec_elp: null,
            min_elp: null,
            hr_elp: null,
            sec_rem: null,
            min_rem: null,
            hr_rem: null
        },
        config: {
            disableFade: false,
            fadeDelay: 2500,
            showOnStart: false,
            controlsTemplate: "<div %{fsexit}></div><div %{fsenter}></div><div %{play}></div><div %{pause}></div><div %{prev}></div><div %{next}></div><div %{title}></div><div %{timeleft}>%{min_elp}:%{sec_elp} | %{min_dur}:%{sec_dur}</div><div %{scrubber}><div %{loaded}></div><div %{playhead}></div></div><div %{vslider}><div %{vmarker}></div><div %{vknob}></div></div><div %{mute}></div><div %{vmax}></div>",
            controlsTemplateFull: null,
            toggleMute: false
        },
        initialize: function () {
            var h = this,
                i = this.playerDom.html(),
                j = true,
                g = this.getConfig("cssClassPrefix");
            for (var a in this.controlElementsConfig) {
                if (i.match(new RegExp(g + a, "gi"))) {
                    j = false;
                    break
                }
            }
            if (j) {
                this.cb = this.applyToPlayer(b(document.createElement("div")).addClass("controls"));
                this.cbFS = this.applyToPlayer(b(document.createElement("div")).addClass("controls").addClass("fullscreen").removeClass("active").addClass("inactive"));
                this.applyTemplate(this.cb, this.getConfig("controlsTemplate"));
                this.applyTemplate(this.cbFS, this.getConfig("controlsTemplateFull") || this.getConfig("controlsTemplate"))
            } else {
                this.cb = this.playerDom.find("." + g + "controls:not(.fullscreen)");
                this.cbFS = this.playerDom.children("." + g + "controls.fullscreen");
                if (this.cbFS.length == 0) {
                    this.cbFS = this.cb
                }
            }
            for (var a in this.controlElementsConfig) {
                this.controlElements[a] = b(this.playerDom).find("." + g + a);
                this.blockSelection(this.controlElements[a])
            }
            this.addGuiListeners();
            this._storeVol = this.getConfig("volume");
            this.drawUpdateControls();
            this.hidecb(true);
            this.pluginReady = true
        },
        applyTemplate: function (i, j) {
            var h = this,
                g = this.getConfig("cssClassPrefix");
            if (j) {
                var a = j.match(/\%{[a-zA-Z_]*\}/gi);
                if (a != null) {
                    b.each(a, function (e, d) {
                        var c = d.replace(/\%{|}/gi, "");
                        if (d.match(/\_/gi)) {
                            j = j.replace(d, '<span class="' + g + c + '"></span>')
                        } else {
                            j = j.replace(d, 'class="' + g + c + '"')
                        }
                    })
                }
                i.html(j)
            }
        },
        itemHandler: function (a) {
            this.pluginReady = true;
            this.hidecb(true)
        },
        startHandler: function () {
            if (this.getConfig("showOnStart") == true) {
                this.showcb(true)
            } else {
                this.hidecb(true)
            }
        },
        readyHandler: function (a) {
            clearTimeout(this._cTimer);
            this.cb.removeClass("fade");
            this.cbFS.removeClass("fade");
            if (this.getConfig("disableFade") != true) {
                this.cb.addClass("fade");
                this.cbFS.addClass("fade")
            }
            this.pluginReady = true
        },
        drawUpdateControls: function () {
            var a = this,
                f = this.pp.getState();
            clearTimeout(this._cTimer);
            if (this.pp.getHasGUI()) {
                return
            }
            if (this.getConfig("controls") == false) {
                this.hidecb(true);
                return
            }
            var e = (this.pp.getItemCount() < 2 || this.getConfig("disallowSkip"));
            if (!e) {
                this.controlElements.prev.removeClass("inactive").addClass("active");
                this.controlElements.next.removeClass("inactive").addClass("active")
            } else {
                this.controlElements.prev.removeClass("active").addClass("inactive");
                this.controlElements.next.removeClass("active").addClass("inactive")
            }
            if (this.pp.getItemIdx() < 1) {
                this.controlElements.prev.removeClass("active").addClass("inactive")
            }
            if (this.pp.getItemIdx() >= this.pp.getItemCount() - 1) {
                this.controlElements.next.removeClass("active").addClass("inactive")
            }
            if (this.getConfig("disablePause")) {
                this.controlElements.pause.removeClass("active").addClass("inactive");
                this.controlElements.play.removeClass("active").addClass("inactive")
            } else {
                if (f === "PLAYING") {
                    this.drawPauseButton()
                }
                if (f === "PAUSED") {
                    this.drawPlayButton()
                }
                if (f === "IDLE") {
                    this.drawPlayButton()
                }
            }
            if (f == "IDLE") {
                this.controlElements.stop.removeClass("active").addClass("inactive")
            } else {
                this.controlElements.stop.removeClass("inactive").addClass("active")
            }
            if (f == "IDLE") {
                this.controlElements.forward.removeClass("active").addClass("inactive");
                this.controlElements.rewind.removeClass("active").addClass("inactive")
            } else {
                this.controlElements.forward.removeClass("inactive").addClass("active");
                this.controlElements.rewind.removeClass("inactive").addClass("active")
            }
            if (this.pp.getInFullscreen() === true) {
                this.drawExitFullscreenButton()
            } else {
                this.drawEnterFullscreenButton()
            }
            if (!this.getConfig("enableFullscreen")) {
                this.controlElements.fsexit.removeClass("active").addClass("inactive");
                this.controlElements.fsenter.removeClass("active").addClass("inactive")
            }
            if (this.pp.config._loop != true) {
                this.controlElements.loopoff.removeClass("active").addClass("inactive");
                this.controlElements.loopon.removeClass("inactive").addClass("active")
            } else {
                this.controlElements.loopoff.removeClass("inactive").addClass("active");
                this.controlElements.loopon.removeClass("active").addClass("inactive")
            }
            this.drawTitle();
            this.drawUpdateTimeDisplay();
            this.drawUpdateVolumeDisplay(this.pp.getVolume() || this._storeVol)
        },
        stateHandler: function (a) {
            this.drawUpdateControls();
            if ("STOPPED|AWAKENING|IDLE".indexOf(a) > -1) {
                this.drawUpdateTimeDisplay(0, 0, 0);
                this.drawUpdateProgressDisplay(0)
            } else {
                this.drawUpdateProgressDisplay()
            }
        },
        scheduleModifiedHandler: function () {
            if (this.pp.getState() === "IDLE") {
                return
            }
            this.drawUpdateControls();
            this.drawUpdateTimeDisplay();
            this.drawUpdateProgressDisplay()
        },
        volumeHandler: function (a) {
            this.drawUpdateVolumeDisplay(a)
        },
        progressHandler: function (a) {
            this.drawUpdateProgressDisplay()
        },
        timeHandler: function (a) {
            this.drawUpdateTimeDisplay();
            this.drawUpdateProgressDisplay()
        },
        fullscreenHandler: function (e) {
            var a = this,
                f = this.getConfig("cssClassPrefix");
            this._noCHide = false;
            this._cFading = false;
            this._vSliderAct = false;
            clearTimeout(this._cTimer);
            if (!this.getConfig("controls")) {
                return
            }
            if (!this.getConfig("enableFullscreen")) {
                return
            }
            if (this.pp.getInFullscreen() === true) {
                this.playerDom.children("." + f + "controls:not(.fullscreen)").stop(true, true).removeClass("active").addClass("inactive").css("display", "");
                this.playerDom.children("." + f + "controls.fullscreen").stop(true, true).removeClass("inactive").addClass("active").css("display", "")
            } else {
                this.playerDom.children("." + f + "controls:not(.fullscreen)").stop(true, true).removeClass("inactive").addClass("active").css("display", "");
                this.playerDom.children("." + f + "controls.fullscreen").stop(true, true).removeClass("active").addClass("inactive").css("display", "")
            }
            this.drawUpdateControls();
            if (this.pp.getState() == "IDLE") {
                this.hidecb(true)
            } else {
                this._cTimer = setTimeout(function () {
                    a.hidecb()
                }, this.getConfig("fadeDelay"))
            }
        },
        addGuiListeners: function () {
            var a = this;
            b.each(this.controlElementsConfig, function (f, e) {
                if (!e) {
                    return
                }
                if (e.on != null) {
                    a.controlElements[f][e.on](function (c) {
                        a.clickCatcher(c, e.call, a.controlElements[f])
                    })
                }
            });
            this.cbFS.mouseenter(function (d) {
                a.controlsMouseEnterListener(d)
            });
            this.cbFS.mouseleave(function (d) {
                a.controlsMouseLeaveListener(d)
            });
            this.cb.mouseenter(function (d) {
                a.controlsMouseEnterListener(d)
            });
            this.cb.mouseleave(function (d) {
                a.controlsMouseLeaveListener(d)
            })
        },
        clickCatcher: function (a, e, f) {
            if (b.browser.msie) {
                a.cancelBubble = true
            } else {
                a.stopPropagation()
            }
            if (!f.hasClass("inactive")) {
                this[e](a, f)
            }
            return false
        },
        drawTitle: function () {
            this.controlElements.title.html(this.getConfig("title", ""))
        },
        hidecb: function (h) {
            clearTimeout(this._cTimer);
            var f = this.getConfig("cssClassPrefix"),
                a = (this.pp.getInFullscreen() === true) ? this.cbFS : this.cb,
                g = this;
            if (a == null) {
                return
            }
            a.stop(true, true);
            if (this._noCHide == true) {
                return
            }
            if (!a.is(":visible")) {
                return
            }
            if (h === true) {
                this._cFading = false;
                a.removeClass("active").addClass("inactive").css("display", "");
                return
            }
            if (this.getConfig("controls") == false || this.pp.getHasGUI() || !a.hasClass("fade")) {
                a.removeClass("active").addClass("inactive");
                return
            }
            a.fadeOut("slow", function () {
                b(this).removeClass("active").addClass("inactive").css("display", "");
                g._cFading = false
            })
        },
        showcb: function (h) {
            clearTimeout(this._cTimer);
            if (this.pp.getHasGUI() || this.getConfig("controls") == false) {
                a.removeClass("active").addClass("inactive").css("display", "");
                return
            }
            var g = this,
                a = (this.pp.getInFullscreen() === true) ? this.cbFS : this.cb,
                f = this.getConfig("cssClassPrefix");
            if (a == null) {
                return
            }
            if ("IDLE|AWAKENING|ERROR".indexOf(this.pp.getState()) > -1 && h != true) {
                return
            }
            a.stop(true, true);
            if ((!a.hasClass("fade") || h == true)) {
                a.removeClass("inactive").addClass("active").css("display", "");
                return
            }
            if (a.is(":visible") || this._cFading == true) {
                this._cTimer = setTimeout(function () {
                    g.hidecb()
                }, this.getConfig("fadeDelay"));
                return
            }
            this._cFading = true;
            a.fadeIn("slow", function () {
                g._cFading = false;
                b(this).removeClass("inactive").addClass("active").css("display", "")
            })
        },
        drawUpdateTimeDisplay: function (n, o, e) {
            if (this.pp.getHasGUI()) {
                return
            }
            try {
                var p = (n != undefined) ? n : this.pp.getLoadPlaybackProgress(),
                    k = (o != undefined) ? o : this.pp.getDuration(),
                    a = (e != undefined) ? e : this.pp.getPosition()
            } catch (m) {
                var p = n || 0,
                    k = o || 0,
                    a = e || 0
            }
            this.controlElements.playhead.css("width", p + "%");
            var l = b.extend({}, this._clockDigits(k, "dur"), this._clockDigits(a, "elp"), this._clockDigits(k - a, "rem"));
            b.each(this.controlElements, function (d, c) {
                if (l[d]) {
                    b.each(c, function () {
                        b(this).html(l[d])
                    })
                }
            })
        },
        drawUpdateProgressDisplay: function () {
            this.controlElements.loaded.css("width", this.pp.getLoadProgress() + "%")
        },
        drawUpdateVolumeDisplay: function (a) {
            if (this._vSliderAct == true) {
                return
            }
            if (a == undefined) {
                return
            }
            clearTimeout(this._cTimer);
            var m = (this.pp.getInFullscreen() === true) ? this.cbFS : this.cb,
                j = m.is(":visible"),
                k = this,
                n = (this.controlElements.mute.hasClass("toggle") || this.controlElements.unmute.hasClass("toggle") || this.getConfig("toggleMute")),
                l = m.find("." + this.getConfig("cssClassPrefix") + "vknob"),
                i = m.find("." + this.getConfig("cssClassPrefix") + "vslider");
            m.stop(true, true).show();
            switch (a) {
            case 0:
                l.css("left", 0);
                break;
            case 1:
                l.css("left", (i.width() - (l.width() / 2)) + "px");
                break;
            default:
                l.css("left", a * (i.width() - (l.width() / 2)) + "px");
                break
            }
            if (n) {
                if (a) {
                    this.controlElements.mute.removeClass("inactive").addClass("active");
                    this.controlElements.unmute.removeClass("active").addClass("inactive")
                } else {
                    this.controlElements.mute.removeClass("active").addClass("inactive");
                    this.controlElements.unmute.removeClass("inactive").addClass("active");
                    this.controlElements.vmax.removeClass("inactive").addClass("active")
                }
                if (a == 1) {
                    this.controlElements.vmax.removeClass("active").addClass("inactive")
                } else {
                    this.controlElements.vmax.removeClass("inactive").addClass("active")
                }
            } else {
                this.controlElements.vmax.removeClass("inactive").addClass("active");
                this.controlElements.unmute.removeClass("inactive").addClass("active");
                this.controlElements.mute.removeClass("inactive").addClass("active")
            }
            this.controlElements.vmarker.css("width", a * 100 + "%");
            this._cTimer = setTimeout(function () {
                k.hidecb()
            }, this.getConfig("fadeDelay"));
            if (!j) {
                m.hide()
            }
        },
        drawPauseButton: function (a) {
            this.controlElements.pause.removeClass("inactive").addClass("active");
            this.controlElements.play.removeClass("active").addClass("inactive")
        },
        drawPlayButton: function (a) {
            this.controlElements.pause.removeClass("active").addClass("inactive");
            this.controlElements.play.removeClass("inactive").addClass("active")
        },
        drawEnterFullscreenButton: function (a) {
            this.controlElements.fsexit.removeClass("active").addClass("inactive");
            this.controlElements.fsenter.removeClass("inactive").addClass("active")
        },
        drawExitFullscreenButton: function (a) {
            this.controlElements.fsexit.removeClass("inactive").addClass("active");
            this.controlElements.fsenter.removeClass("active").addClass("inactive")
        },
        playClk: function (a) {
            this.pp.setPlay()
        },
        pauseClk: function (a) {
            this.pp.setPause()
        },
        stopClk: function (a) {
            this.pp.setStop()
        },
        controlsMouseEnterListener: function (a) {
            this._noCHide = true
        },
        controlsMouseLeaveListener: function (a) {
            this._noCHide = false
        },
        controlsClk: function (a) {},
        mousemoveHandler: function (a) {
            this.showcb()
        },
        prevClk: function (a) {
            this.pp.setActiveItem("previous")
        },
        nextClk: function (a) {
            this.pp.setActiveItem("next")
        },
        forwardClk: function (a) {
            this.pp.setPlayhead("+10")
        },
        rewindClk: function (a) {
            this.pp.setPlayhead("-10")
        },
        muteClk: function (a) {
            this._storeVol = (this.pp.getVolume() == 0) ? this.getConfig("volume") : this.pp.getVolume();
            this.pp.setVolume(0)
        },
        unmuteClk: function (a) {
            if (this._storeVol <= 0) {
                this._storeVol = 1
            }
            this.pp.setVolume(this._storeVol)
        },
        vmaxClk: function (a) {
            this.pp.setVolume(1)
        },
        enterFullscreenClk: function (a) {
            this.pp.setFullscreen(true)
        },
        exitFullscreenClk: function (a) {
            this.pp.setFullscreen(false)
        },
        openCloseClk: function (a) {
            var d = this;
            b(b(a.currentTarget).attr("class").split(/\s+/)).each(function (f, c) {
                if (c.indexOf("toggle") == -1) {
                    return
                }
                d.playerDom.find("." + c.substring(6)).slideToggle("slow", function () {
                    d.pp.setResize()
                });
                d.controlElements.open.toggle();
                d.controlElements.close.toggle()
            })
        },
        loopClk: function (a) {
            if (b.inArray(this.getConfig("cssClassPrefix") + "loopon", b(a.currentTarget).attr("class").split(/\s+/)) > -1) {
                this.pp.config._loop = true
            } else {
                this.pp.config._loop = false
            }
            this.drawUpdateControls()
        },
        startClk: function (a) {
            this.pp.setPlay()
        },
        scrubberClk: function (a) {
            var j = 0;
            if (this.getConfig("disallowSkip") == true) {
                return
            }
            var h = (this.pp.getInFullscreen() === true && this.controlElements.vslider.length > 1) ? 1 : 0,
                k = b(this.controlElements.scrubber[h]).width(),
                l = b(this.controlElements.loaded[h]).width(),
                i = a.pageX - b(this.controlElements.scrubber[h]).offset().left;
            if (i < 0 || i == "NaN" || i == undefined) {
                j = 0
            } else {
                if (l != undefined) {
                    if (i > l) {
                        i = l - 1
                    }
                    j = ((i * 100 / k) * this.pp.getDuration() / 100) * 1
                }
            }
            this.pp.setPlayhead(j)
        },
        vmarkerClk: function (a) {
            vsliderClk(a)
        },
        vsliderClk: function (j) {
            if (this._vSliderAct == true) {
                return
            }
            var g = (this.pp.getInFullscreen() === true && this.controlElements.vslider.length > 1) ? 1 : 0,
                a = b(this.controlElements.vslider[g]),
                i = a.width(),
                h = j.pageX - a.offset().left;
            if (h < 0 || h == "NaN" || h == undefined) {
                result = 0
            } else {
                result = (h / i)
            }
            this.pp.setVolume(result);
            this._storeVol = result
        },
        vknobStartDragListener: function (t, m) {
            this._vSliderAct = true;
            var r = this,
                p = (this.pp.getInFullscreen() === true && this.controlElements.vslider.length > 1) ? 1 : 0,
                s = b(m[p]),
                n = b(this.controlElements.vslider[p]),
                a = Math.abs(parseInt(s.position().left) - t.clientX),
                q = 0,
                o = function (c) {
                    if (b.browser.msie) {
                        c.cancelBubble = true
                    } else {
                        c.stopPropagation()
                    }
                    r.playerDom.unbind("mouseup", o);
                    n.unbind("mousemove", l);
                    n.unbind("mouseup", o);
                    s.unbind("mousemove", l);
                    s.unbind("mouseup", o);
                    r._vSliderAct = false;
                    return false
                },
                l = function (d) {
                    clearTimeout(r._cTimer);
                    if (b.browser.msie) {
                        d.cancelBubble = true
                    } else {
                        d.stopPropagation()
                    }
                    var c = (d.clientX - a);
                    c = (c > n.width() - s.width() / 2) ? n.width() - (s.width() / 2) : c;
                    c = (c < 0) ? 0 : c;
                    s.css("left", c + "px");
                    q = Math.abs(c / (n.width() - (s.width() / 2)));
                    r.pp.setVolume(q);
                    r._storeVol = q;
                    b(r.controlElements.vmarker[p]).css("width", q * 100 + "%");
                    return false
                };
            this.playerDom.mouseup(o);
            n.mousemove(l);
            n.mouseup(o);
            s.mousemove(l);
            s.mouseup(o)
        },
        handleStartDragListener: function (m, j) {
            var i = this;
            var k = Math.abs(parseInt(this.cb.position().left) - m.clientX);
            var n = Math.abs(parseInt(this.cb.position().top) - m.clientY);
            var a = function (c) {
                    if (b.browser.msie) {
                        c.cancelBubble = true
                    } else {
                        c.stopPropagation()
                    }
                    i.playerDom.unbind("mouseup", a);
                    i.playerDom.unbind("mouseout", a);
                    i.playerDom.unbind("mousemove", l);
                    return false
                };
            var l = function (d) {
                    if (b.browser.msie) {
                        d.cancelBubble = true
                    } else {
                        d.stopPropagation()
                    }
                    clearTimeout(i._cTimer);
                    var c = (d.clientX - k);
                    c = (c > i.playerDom.width() - i.cb.width()) ? i.playerDom.width() - i.cb.width() : c;
                    c = (c < 0) ? 0 : c;
                    i.cb.css("left", c + "px");
                    var e = (d.clientY - n);
                    e = (e > i.playerDom.height() - i.cb.height()) ? i.playerDom.height() - i.cb.height() : e;
                    e = (e < 0) ? 0 : e;
                    i.cb.css("top", e + "px");
                    return false
                };
            this.playerDom.mousemove(l);
            this.playerDom.mouseup(a)
        },
        errorHandler: function (a) {
            this.hidecb(true)
        },
        _clockDigits: function (o, j) {
            if (o < 0 || isNaN(o) || o == undefined) {
                o = 0
            }
            var m = Math.floor(o / (60 * 60));
            var l = o % (60 * 60);
            var p = Math.floor(l / 60);
            var a = l % 60;
            var n = Math.floor(a);
            var k = {};
            k["min_" + j] = (p < 10) ? "0" + p : p;
            k["sec_" + j] = (n < 10) ? "0" + n : n;
            k["hr_" + j] = (m < 10) ? "0" + m : m;
            return k
        }
    }
});
var projekktorDisplay = function () {};
jQuery(function (b) {
    projekktorDisplay.prototype = {
        logo: null,
        logoIsFading: false,
        display: null,
        displayClicks: 0,
        buffIcn: null,
        buffIcnSprite: null,
        bufferDelayTimer: null,
        bufferIconDelay: 1,
        config: {
            onclick: {
                callback: "setPlayPause",
                value: null
            },
            onclick_playing: {
                callback: "setPlayPause",
                value: null
            },
            ondblclick: {
                callback: "setFullscreen",
                value: null
            },
            bufferIconDelay: 200,
            spriteUrl: "",
            spriteWidth: 50,
            spriteHeight: 50,
            spriteTiles: 25,
            spriteOffset: 1,
            spriteCountUp: false,
            logoImage: "",
            logoDelay: 0,
            logoPosition: "tl",
            onlogoclick: {
                callback: "",
                value: {
                    url: "",
                    target: "_blank",
                    pause: true
                }
            }
        },
        initialize: function () {
            var d = this;
            var a = {
                position: "absolute",
                overflow: "hidden",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                padding: 0,
                margin: 0,
                display: "block"
            };
            this.startButton = this.applyToPlayer(b(document.createElement("div")).addClass("start")).addClass("inactive");
            this.buffIcn = this.applyToPlayer(b(document.createElement("div")).addClass("buffering")).addClass("inactive");
            if (this.config.spriteUrl != "") {
                this.buffIcnSprite = b(document.createElement("div")).appendTo(this.buffIcn).css({
                    width: this.config.spriteWidth,
                    height: this.config.spriteHeight,
                    marginLeft: ((this.buffIcn.width() - this.config.spriteWidth) / 2) + "px",
                    marginTop: ((this.buffIcn.height() - this.config.spriteHeight) / 2) + "px",
                    backgroundColor: "transparent",
                    backgroundImage: "url(" + this.config.spriteUrl + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "0 0"
                }).addClass("inactive")
            }
            this.display = this.applyToPlayer(b(document.createElement("div")).addClass("display").css(a));
            this.pp.getMediaContainer();
            this.logo = this.applyToPlayer(b(document.createElement("img")).addClass("logo").addClass("inactive").attr("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi/v//PwNAgAEACQsDAUdpTjcAAAAASUVORK5CYII=").css("position", "absolute").css(((this.getConfig("logoPosition").indexOf("r") > -1) ? "right" : "left"), "2%").css(((this.getConfig("logoPosition").indexOf("t") > -1) ? "top" : "bottom"), "2%"));
            this.pluginReady = true
        },
        displayReadyHandler: function () {
            var a = this;
            this.startButton.unbind();
            this.startButton.click(function () {
                a.pp.setPlay()
            })
        },
        bufferHandler: function (a) {
            if (a == "EMPTY") {
                this.showBufferIcon()
            } else {
                this.hideBufferIcon()
            }
        },
        stateHandler: function (a) {
            if (a === "IDLE") {
                this.startButton.addClass("active").removeClass("inactive")
            } else {
                this.startButton.addClass("inactive").removeClass("active")
            }
            if (a == "AWAKENING" || a == "COMPLETED" || a == "ERROR") {
                this.hideBufferIcon()
            }
            if (a == "ERROR" || a === "STOPPED") {
                this.logo.addClass("inactive").removeClass("active")
            }
        },
        stoppedHandler: function () {
            this.hideBufferIcon()
        },
        scheduleLoadingHandler: function () {
            this.startButton.addClass("inactive").removeClass("active");
            this.showBufferIcon()
        },
        scheduledHandler: function () {
            if (!this.getConfig("autoplay")) {
                this.startButton.addClass("active").removeClass("inactive")
            }
            this.hideBufferIcon()
        },
        itemHandler: function () {
            var a = this;
            this.hideBufferIcon();
            this.logoIsFading = false;
            this.logo.stop(true, true).addClass("inactive").removeClass("active").unbind();
            if (this.getConfig("logoImage") != false) {
                this.logo.attr("src", this.getConfig("logoImage")).css({
                    cursor: (this.getConfig("logoURL") != "") ? "pointer" : "normal"
                }).click(function () {
                    try {
                        a.pp[a.getConfig("onlogoclick").callback](a.getConfig("onlogoclick").value)
                    } catch (d) {}
                    return false
                })
            } else {
                this.logo.attr("src", "").addClass("inactive").removeClass("active")
            }
        },
        timeHandler: function () {
            if (this.getConfig("logoImage") == false) {
                return
            }
            if (this.pp.getIsMobileClient()) {
                return
            }
            var a = this.pp.getPosition(),
                e = this.pp.getDuration(),
                f = this;
            if (!this.logo.is(":visible") && !this.logoIsFading && a + this.config.logoDelay < e) {
                if (a > this.config.logoDelay && e > (this.config.logoDelay * 2)) {
                    this.logoIsFading = true;
                    this.logo.fadeIn("slow", function () {
                        f.logoIsFading = false;
                        b(this).addClass("active").removeClass("inactive").css("display", "")
                    })
                }
            }
            if (this.logo.is(":visible") && !this.logoIsFading) {
                if (a + this.config.logoDelay > e) {
                    this.logoIsFading = true;
                    this.logo.fadeOut("slow", function () {
                        b(this).addClass("inactive").removeClass("active").css("display", "");
                        f.logoIsFading = false
                    })
                }
            }
        },
        leftclickHandler: function (a) {
            var d = this;
            if (b(a.target).attr("id").indexOf("_media") == -1) {
                return
            }
            if (this.pp.getState() == "ERROR") {
                this.pp.setActiveItem("next");
                return
            }
            if (this.pp.getHasGUI() == true) {
                return
            }
            this.displayClicks++;
            if (this.displayClicks > 0) {
                setTimeout(function () {
                    if (d.displayClicks == 1) {
                        if (d.pp.getState() == "PLAYING") {
                            try {
                                d.pp[d.getConfig("onclick_playing").callback](d.getConfig("onclick_playing").value)
                            } catch (c) {}
                        } else {
                            try {
                                d.pp[d.getConfig("onclick").callback](d.getConfig("onclick").value)
                            } catch (c) {}
                        }
                    } else {
                        if (d.displayClicks == 2) {
                            try {
                                d.pp[d.getConfig("ondblclick").callback](d.getConfig("ondblclick").value)
                            } catch (c) {}
                        }
                    }
                    d.displayClicks = 0
                }, 250)
            }
            return
        },
        hideBufferIcon: function () {
            var a = this;
            clearTimeout(this.bufferDelayTimer);
            this.buffIcn.stop(true, true);
            this.buffIcn.fadeOut("fast", function () {
                b(this).addClass("inactive").removeClass("active").css("display", "")
            })
        },
        showBufferIcon: function (a) {
            var d = this;
            clearTimeout(this.bufferDelayTimer);
            if (this.pp.getHasGUI()) {
                return
            }
            if (this.pp.getModel() === "YTAUDIO" || this.pp.getModel() === "YTVIDEO") {
                a = true
            }
            if (a != true && this.config.bufferIconDelay > 0) {
                this.bufferDelayTimer = setTimeout(function () {
                    d.showBufferIcon(true)
                }, d.config.bufferIconDelay);
                return
            }
            this.buffIcn.stop(true, true);
            if (this.buffIcn.hasClass("active")) {
                return
            }
            this.buffIcn.fadeIn("fast", function () {
                if (d.buffIcnSprite == null) {
                    return
                }
                var c = (d.config.spriteCountUp == true) ? 0 : (d.config.spriteHeight + d.config.spriteOffset) * d.config.spriteTiles;
                d.buffIcnSprite.addClass("active").removeClass("inactive").css("display", "");
                (function () {
                    if (!d.buffIcn.is(":visible")) {
                        return
                    }
                    d.buffIcnSprite.css("backgroundPosition", "0px -" + c + "px");
                    if (d.config.spriteCountUp == true) {
                        c += d.config.spriteHeight + d.config.spriteOffset
                    } else {
                        c -= d.config.spriteHeight + d.config.spriteOffset
                    }
                    if (c >= d.config.spriteHeight * d.config.spriteTiles) {
                        c = 0
                    }
                    setTimeout(arguments.callee, 60)
                })()
            })
        }
    }
});
projekktorConfig.prototype = {
    _cookieName: "qwprojekktor",
    _cookieExpiry: 356,
    _plugins: ["Display", "Controlbar"],
    _addplugins: [],
    _reelParser: function (b) {
        return b
    },
    _cssClassPrefix: "pp",
    _platformPriority: ["native", "flash"],
    _bypassFlashFFFix: false,
    _iframe: false,
    _loop: false,
    _autoplay: false,
    _continuous: true,
    _playlist: [],
    _theme: false,
    _themeRepo: "http://www.projekktorxl.com/themegen/api/themes/live/format/jsonp/id/%{id}/version/%{ver}",
    _messages: {
        0: "An error occurred.",
        1: "You aborted the media playback. ",
        2: "A network error caused the media download to fail part-way. ",
        3: "The media playback was aborted due to a corruption problem. ",
        4: "The media (%{file}) could not be loaded because the server or network failed.",
        5: "Sorry, your browser does not support the media format of the requested file (%{type}).",
        6: "Your client is in lack of the Flash Plugin V%{flashver} or higher.",
        7: "No media scheduled.",
        8: "! Invalid media model configured !",
        9: "File (%{file}) not found.",
        97: "No media scheduled.",
        98: "Invalid or malformed playlist data!",
        99: "Click display to proceed. ",
        500: "This Youtube video has been removed or set to private",
        501: "The Youtube user owning this video disabled embedding.",
        502: "Invalid Youtube Video-Id specified."
    },
    _debug: false,
    _width: 0,
    _height: 0,
    _minHeight: 40,
    _minWidth: 40,
    ID: 0,
    title: null,
    poster: false,
    controls: false,
    start: false,
    stop: false,
    volume: 0.5,
    cover: "",
    disablePause: false,
    disallowSkip: false,
    fixedVolume: false,
    imageScaling: "aspectratio",
    videoScaling: "aspectratio",
    playerFlashMP4: "jarisplayer.swf",
    playerFlashMP3: "jarisplayer.swf",
    flashStreamType: "file",
    flashRTMPServer: "",
    useYTIframeAPI: false,
    enableFlashFallback: true,
    enableNativePlayback: true,
    enableKeyboard: true,
    enableFullscreen: true,
    enableTestcard: true,
    duration: 0,
    className: ""
};
(function (d) {
    d.pixelentity = d.pixelentity || {
        version: "1.0.0"
    };

    function b(o, s, n, g, r) {
        var j;

        function k() {
            j[0].play()
        }
        j = d('<video controls autobuffer height="' + n + '" width="' + s + '" poster="' + (r ? r : "") + '"></video>');
        for (var m in g) {
            if (typeof m === "string") {
                j.append('<source src="' + g[m].src + '" type="' + g[m].type + '">')
            }
        }
        j.bind("click", k);
        o.append(j);
        setTimeout(p, 100);

        function p() {
            j.triggerHandler("ready");
            j.triggerHandler("buffer")
        }
        function q() {
            j.unbind("click", k).detach().empty();
            j = undefined
        }
        function f(h, i) {
            j.bind(h, i)
        }
        function l(h, i) {
            j.unbind(h, i)
        }
        d.extend(this, {
            destroy: q,
            addListener: f,
            removeListener: l
        })
    }
    d.pixelentity.video = {
        conf: {
            disableFade: false,
            useVideoTag: false
        },
        getType: function (f) {
            return "video/" + f.match(/(\w+)$/)[1].replace("ogv", "ogg")
        },
        fallbackPlayer: "js/template/video/jarisplayer.swf",
        SimplePlayer: b
    };
    var a = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/);
    var e = 0;

    function c(v, n) {
        var l = d(this);
        var m = v;
        var r;
        var s;
        var p = false;

        function g() {
            switch (n.type) {
            case "youtube":
                d.pixelentity.youtube(k);
                break;
            case "vimeo":
                d.pixelentity.vimeo(f);
                break;
            case "vidly":
                i(["http://vid.ly/" + n.videoId + "?content=video&format=mp4", "http://vid.ly/" + n.videoId + "?content=video&format=webm", "http://vid.ly/" + n.videoId + "?content=video&format=ogv"], n.poster);
                break;
            case "local":
                i(n.videoId, n.poster);
                break
            }
        }
        function i(y, A) {
            var x = {};
            for (var w = 0; w < y.length; w++) {
                x[w] = {
                    src: y[w],
                    type: d.pixelentity.video.getType(y[w])
                }
            }
            if (n.useVideoTag) {
                r = new d.pixelentity.video.SimplePlayer(m, n.width, n.height, x, A)
            } else {
                e++;
                var z = "pe_local_player_" + (e);
                var t = d('<div id="' + (z) + '"/>').css({
                    "background-color": "black",
                    width: n.width,
                    height: n.height
                });
                m.html(t[0]);
                r = new projekktor("#" + z, {
                    disableFade: n.disableFade,
                    controls: true,
                    volume: 0.9,
                    _width: n.width,
                    _height: n.height,
                    _autoplay: true,
                    enableFullscreen: false,
                    imageScaling: "fill",
                    videoScaling: "aspectratio",
                    poster: A,
                    playerFlashMP4: d.pixelentity.video.fallbackPlayer,
                    playerFlashMP3: d.pixelentity.video.fallbackPlayer,
                    playlist: [x]
                })
            }
            r.addListener(a ? "ready" : "buffer", j)
        }
        function j(t) {
            if (a) {
                setTimeout(q, 100);
                r.removeListener("ready", j)
            } else {
                if (t == "FULL" || n.useVideoTag) {
                    r.removeListener("buffer", j);
                    q()
                }
            }
        }
        function k(t) {
            var w = d("<div/>");
            m.append(w);
            r = new t(w[0], {
                height: n.height,
                width: n.width,
                videoId: n.videoId,
                playerVars: {
                    theme: "dark",
                    wmode: "opaque",
                    autohide: 1,
                    enablejsapi: 1,
                    origin: location.href.match(/:\/\/(.[^\/]+)/)[1],
                    loop: n.loop ? 1 : 0,
                    hd: n.hd ? 1 : 0,
                    autoplay: n.autoPlay ? 1 : 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    showsearch: 0,
                    fs: 0
                },
                events: {
                    onStateChange: u,
                    onReady: q
                }
            });
            s = setInterval(u, 250);
            if (d.browser.msie && d.browser.version < 8) {
                setTimeout(q, 1000)
            }
        }
        function q() {
            if (!p) {
                l.trigger("video_ready.pixelentity");
                p = true
            }
        }
        function f(t) {
            r = new t(m[0], {
                height: n.height,
                width: n.width,
                videoId: n.videoId,
                playerVars: {
                    autohide: 0,
                    origin: location.href.match(/:\/\/(.[^\/]+)/)[1],
                    loop: n.loop ? 1 : 0,
                    autoplay: n.autoPlay ? 1 : 0
                }
            });
            d(r).one("video_ready.pixelentity", q).one("video_ended.pixelentity", o)
        }
        function o() {
            l.trigger("video_ended.pixelentity")
        }
        function u() {
            if (!r) {
                return
            }
            if (r.getPlayerState) {
                switch (r.getPlayerState()) {
                case YT.PlayerState.ENDED:
                    l.trigger("video_ended.pixelentity");
                    break;
                case YT.PlayerState.PLAYING:
                    if ((r.getDuration() - r.getCurrentTime()) < 0.4) {
                        l.trigger("video_ended.pixelentity")
                    }
                    break
                }
            }
        }
        function h(t, x) {
            if (r && r.setSize) {
                r.setSize({
                    width: t,
                    height: x
                })
            }
        }
        d.extend(this, {
            resize: h,
            bind: function (w, t) {
                l.bind(w, t)
            },
            unbind: function (w, t) {
                l.bind(w, t)
            },
            one: function (w, t) {
                l.one(w, t)
            },
            destroy: function () {
                clearInterval(s);
                if (l) {
                    l.remove()
                }
                l = undefined;
                if (r) {
                    d(r).unbind("video_ended.pixelentity");
                    switch (n.type) {
                    case "vidly":
                    case "local":
                        if (r.removeListener) {
                            r.removeListener(a ? "ready" : "buffer", j)
                        }
                        if (n.useVideoTag) {
                            if (r.destroy) {
                                r.destroy()
                            }
                        } else {
                            if (r.selfDestruct) {
                                r.selfDestruct()
                            }
                        }
                        break;
                    default:
                        if (r.destroy) {
                            r.destroy()
                        }
                    }
                }
                r = undefined;
                m.data("peVideo", null);
                m = undefined
            }
        });
        g()
    }
    d.fn.peVideo = function (f) {
        var g = this.data("peVideo");
        if (g) {
            return g
        }
        f = d.extend(true, {}, d.pixelentity.video.conf, f);
        this.each(function () {
            g = new c(d(this), f);
            d(this).data("peVideo", g)
        });
        return f.api ? g : this
    }
}(jQuery));
(function (f) {
    f.pixelentity = f.pixelentity || {
        version: "1.0.0"
    };

    function a(k, r, t, u) {
        var v, q, m, o, s = false,
            p = false;
        k = k ? k : "";
        for (var l in d) {
            if (typeof l === "string") {
                v = k.match(d[l]);
                if (v && v.length > 0) {
                    q = l;
                    m = v[2];
                    t = c[q] ? c[q].replace("$ID", m) : "";
                    break
                }
            }
        }
        if (!m) {
            var j = k.match(b);
            if (j) {
                q = "local";
                m = [j[0]];
                if (r) {
                    r = r.split(",");
                    for (o = 0; o < r.length; o++) {
                        m.push(j[1] + r[o])
                    }
                }
            } else {
                m = false
            }
        }
        if (u) {
            var n = u.split(/x| |,/);
            s = parseInt(n[0], 10) || 0;
            p = parseInt(n[1], 10) || 0
        }
        return {
            video: m,
            videoType: q,
            videoPoster: t,
            videoW: s,
            videoH: p
        }
    }
    f.pixelentity.videoplayer = {
        conf: {
            autoPlay: false,
            responsive: false,
            api: false
        },
        getInfo: a
    };
    var g = [];
    var d = {
        vidly: /http:\/\/(vid.ly)\/([\w|\-]+)/i,
        youtube: /http:\/\/(www.youtube.com\/watch\?v=|youtube.com\/watch\?v=|youtu.be\/)([\w|\-]+)/i,
        vimeo: /http:\/\/(vimeo\.com|www\.vimeo\.com)\/([\w|\-]+)/i
    };
    var c = {
        vidly: "http://cf.cdn.vid.ly/$ID/poster.jpg",
        youtube: "http://img.youtube.com/vi/$ID/0.jpg",
        vimeo: "http://vimeo.com/api/v2/video/$ID.json?callback=?"
    };
    var b = /(.+[^w])(mp4|webm|ogv)$/i;

    function e(C, m) {
        var u, n, z, j, v, p;
        var r;
        var y = false;
        var s;

        function k() {
            var D = a(C[0].href, C.attr("data-formats"), C.attr("data-poster"), C.attr("data-size"));
            if (D.video) {
                v = D.video;
                j = D.videoType;
                p = D.videoPoster
            } else {
                return
            }
            if (D.videoW !== false) {
                C.css({
                    width: D.videoW,
                    height: D.videoH
                })
            }
            n = D.videoW || C.width();
            z = D.videoH || C.height();
            var w = f('<span class="largePlay"></span>');
            if (m.responsive) {
                r = f("<div/>").fadeTo(0, 0);
                C.append(w).removeAttr("href").append(r).wrap('<div class="videoWrapper sixteenBYnine ' + D.videoType + '"></div>').addClass("peActiveWidget").bind("enable.pixelentity ", o).bind("disable.pixelentity ", i).bind("click", A)
            } else {
                C.append(w).wrap('<div style="position: relative; overflow: hidden"></div>').addClass("peActiveWidget").bind("enable.pixelentity ", o).bind("disable.pixelentity ", i).bind("click", A);
                w.css({
                    left: (n - w.width()) >> 1,
                    top: (z - w.height()) >> 1
                });
                r = f("<div/>").css({
                    position: "absolute",
                    "z-index": 2,
                    display: "none",
                    width: n + "px",
                    height: z + "px"
                });
                C.parent().prepend(r)
            }
            var h = C.children("img:eq(0)");
            if (h.length > 0) {
                u = h;
                p = h.attr("src");
                t()
            } else {
                if (p) {
                    if (j == "vimeo") {
                        f.getJSON(p, q)
                    } else {
                        l()
                    }
                } else {
                    if (C.attr("data-poster")) {
                        p = C.attr("data-poster");
                        l()
                    }
                }
            }
            if (f.pixelentity.browser.mobile || m.autoPlay) {
                o()
            }
        }
        function q(h) {
            p = (h && h[0] && h[0].thumbnail_large) || false;
            if (p) {
                l()
            }
        }
        function l() {
            u = f("<img/>");
            u.fadeTo(0, 0).css("opacity", 0).attr("data-src", p);
            C.append(u);
            f.pixelentity.preloader.load(u, t)
        }
        function t() {
            if (m.responsive) {
                u.width("100%").fadeTo(300, 1);
                return
            }
            var h = u[0].width || u.width();
            var w = u[0].height || u.height();
            var D = f.pixelentity.Geom.getScaler("fillmax", "center", "center", n, z, h, w);
            u.transform(D.ratio, D.offset.w, D.offset.h, n, z, true);
            u.fadeTo(300, 1)
        }
        function A(w) {
            if (y) {
                return false
            }
            if (!f.pixelentity.browser.mobile) {
                for (var h = 0; h < g.length; h++) {
                    if (h != s) {
                        g[h].disable()
                    }
                }
            }
            r.show().fadeTo(0, 0);
            y = r.peVideo({
                api: true,
                useVideoTag: m.responsive && f.pixelentity.browser.mobile,
                width: m.responsive ? "100%" : n,
                height: m.responsive ? "100%" : z,
                type: j,
                videoId: v,
                poster: p,
                hd: true,
                autoPlay: true,
                loop: true
            });
            y.one("video_ready.pixelentity", B);
            return false
        }
        function B() {
            r.fadeTo(500, 1)
        }
        function x() {}
        function o() {
            if (!y && (f.pixelentity.browser.mobile || m.autoPlay)) {
                A()
            }
        }
        function i() {
            if (y) {
                if (y.destroy) {
                    y.destroy()
                }
                y = false;
                r.empty().fadeTo(0, 0).hide()
            }
        }
        f.extend(this, {
            enable: o,
            disable: i,
            destroy: function () {
                if (y && y.destroy) {
                    y.destroy()
                }
                y = undefined;
                g.splice(s, 1);
                C.data("peVideoPlayer", null);
                C = undefined
            }
        });
        s = g.length;
        g.push(this);
        k()
    }
    f.fn.peVideoPlayer = function (h) {
        var i = this.data("peVideoPlayer");
        if (i) {
            return i
        }
        h = f.extend(true, {}, f.pixelentity.videoplayer.conf, h);
        this.each(function () {
            i = new e(f(this), h);
            f(this).data("peVideoPlayer", i)
        });
        return h.api ? i : this
    }
}(jQuery));
(function (e) {
    var k = "0px 0px";
    var j = "bilinear";
    var f = /progid:DXImageTransform\.Microsoft\.Matrix\(.*?\)/;
    var c = document.createElement("modernizr"),
        d = c.style;

    function i() {
        var m = {
            transformProperty: "",
            MozTransform: "-moz-",
            WebkitTransform: "-webkit-",
            OTransform: "-o-",
            msTransform: "-ms-"
        };
        for (var n in m) {
            if (typeof d[n] != "undefined") {
                return m[n]
            }
        }
        return null
    }
    function l() {
        var n = ["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"];
        for (var m in n) {
            if (d[n[m]] !== undefined) {
                return true
            }
        }
        return false
    }
    var a = i(),
        g = a !== null ? a + "transform" : false,
        h = a !== null ? a + "transform-origin" : false;
    e.support.csstransforms = l();
    e.support.hw3dTransform = ("WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix());
    if (a == "-ms-") {
        g = "msTransform";
        h = "msTransformOrigin"
    }
    function b(o, s, z, y, v, q, x, p) {
        if (e.support.csstransforms && !p) {
            var t;
            var u = "px";
            if (v && q && (parseInt(z, 10) != z || parseInt(y, 10) != y)) {
                z = 100 * z / v;
                y = 100 * y / q;
                z = parseInt(z * 1000, 10) / 1000;
                y = parseInt(y * 1000, 10) / 1000;
                u = "%"
            } else {
                z = parseInt(z, 10);
                y = parseInt(y, 10)
            }
            if (e.support.hw3dTransform) {
                t = (z !== undefined) ? "translate3d(" + z + u + "," + y + u + ",0) " : "translateZ(0) "
            } else {
                t = (z !== undefined) ? "translate(" + z + u + "," + y + u + ") " : ""
            }
            e(o).css(h, k).css(g, t + "scale(" + s + ")")
        } else {
            if (!x && !p && e.browser.msie) {
                var m = o.style;
                var r = 'progid:DXImageTransform.Microsoft.Matrix(FilterType="' + j + '",M11=' + s + ",M12=0,M21=0,M22=" + s + ",Dx=" + z + ",Dy=" + y + ")";
                var n = m.filter || e.curCSS(o, "filter") || "";
                m.filter = f.test(n) ? n.replace(f, r) : n ? n + " " + r : r
            } else {
                e(o).width(v * s).height(q * s).css({
                    "margin-left": z + "px",
                    "margin-top": y + "px"
                })
            }
        }
    }
    e.fn.transform = function (r, p, o, n, q, m, s) {
        this.each(function () {
            b(this, r, p, o, n, q, m, s)
        });
        return this
    }
}(jQuery));
(function (d) {
    d.pixelentity = d.pixelentity || {
        version: "1.0.0"
    };
    d.pixelentity.peFlareLightbox = {
        conf: {
            api: false
        }
    };
    d.pixelentity.video.fallbackPlayer = "js/pe.flare/video/jarisplayer.swf";
    var b = navigator.userAgent.toLowerCase();
    var g = /http:\/\/(vimeo\.com|www\.vimeo\.com)\//i;
    var f = {
        none: {
            from: 0,
            to: 0
        },
        prev: {
            from: -100,
            to: 0
        },
        next: {
            from: 100,
            to: 0
        }
    };

    function e() {
        var ax;
        var aJ = false;
        var u = false;
        var W;
        var P, X;
        var aB;
        var ad = false;
        var y = false;
        var ap = false;
        var n = d.support.csstransitions;
        var aI = d.support.csstransitionsEnd;
        var ag, L;
        var aw = [];
        var ar = [];
        var J = {};
        var k = [];
        var aC = [];
        var ay = {};
        var aK = [];
        var au = [];
        var T = 0;
        var M;
        var aL = false;
        var Q = 0;
        var U = -1;
        var aQ = false;
        var K = 1;
        var aD = "none";
        var aE, D, i;
        var aj = 0;
        var I = 0;
        var al;
        var aS;
        var af = false;
        var ao;
        var B = 0;
        var ak = 0;
        var j = false;
        var ae, x;
        var aO;
        var R = 0;
        var m = false;

        function s() {
            P = W.width();
            X = window.innerHeight ? window.innerHeight : W.height();
            if (aB) {
                aB.width(P).height(X);
                if (m) {
                    aB.css("top", W.scrollTop())
                }
            }
            if (d.pixelentity.browser.mobile && al && al.data("count") > 0) {
                av(B, true)
            }
            var h = au.length;
            while (h--) {
                au[h].resize(P, X)
            }
            aA()
        }
        function aN(w, h) {
            aw[h] = w
        }
        function o(h) {
            clearTimeout(ao);
            switch (h.type) {
            case "mouseenter":
                aH(true);
                break;
            case "mouseleave":
                aH(false);
                break;
            case "click":
                if (!I) {
                    var w = parseInt(h.currentTarget.id, 10);
                    if (U >= 0) {
                        aD = w > U ? "next" : "prev"
                    }
                    l(w)
                }
                h.stopPropagation();
                h.stopImmediatePropagation();
                return false
            }
        }
        function ac(w) {
            clearTimeout(ao);
            var aU = w ? w.pageX : 0;
            var h = al.data("width");
            var aT = h - P;
            if (aT >= 0) {
                aU = -aT * aU / P;
                aS.css("margin-left", aU)
            } else {
                aS.css("margin-left", "auto")
            }
        }
        function av(aW, aV) {
            var h = al.data("size");
            var w = Math.floor(P / h);
            var aU;
            var aT = 0;
            if (al.data("width") > P) {
                if (aV) {
                    B = aW
                } else {
                    B = Math.max(0, B + aW * w)
                }
                if ((aU = al.data("count") - B) < w) {
                    B -= (w - aU + 1);
                    aT = P - w * h - h - 8
                }
            } else {
                B = 0
            }
            ak = -B * h + aT;
            aS.transform(1, ak === 0 ? 0 : ak - 2, 0)
        }
        function z(aT) {
            if (!ad || aO) {
                return true
            }
            var w = aT.type;
            var aU = aT.originalEvent;
            switch (w) {
            case "touchstart":
                if (aU.touches.length > 1 || aU.scale && aU.scale !== 1) {
                    return true
                }
                aE = aU.touches[0].pageX;
                D = 0;
                break;
            case "touchmove":
                if (aU.touches.length > 1 || aU.scale && aU.scale !== 1) {
                    return true
                }
                D = (aU.touches[0].pageX - aE);
                aT.preventDefault();
                aT.stopPropagation();
                if (af) {
                    aS.addClass("touchMove").transform(1, ak + D, 0)
                }
                break;
            case "touchend":
                if (af) {
                    aS.removeClass("touchMove")
                }
                if (D === 0) {
                    return false
                }
                var h = false;
                if (D > 10) {
                    h = true;
                    if (!af) {
                        N()
                    } else {
                        av(-1)
                    }
                }
                if (D < -10) {
                    h = true;
                    if (!af) {
                        ai()
                    } else {
                        av(+1)
                    }
                }
                D = 0;
                break
            }
            return true
        }
        function S(h) {
            if (!ad) {
                return true
            }
            h.preventDefault();
            h.stopPropagation();
            return false
        }
        function ai() {
            if (I || !aL) {
                return
            }
            aD = "next";
            l(aL[(Q + 1) % aL.length])
        }
        function N() {
            if (I || !aL) {
                return
            }
            aD = "prev";
            l(aL[Q === 0 ? aL.length - 1 : Q - 1])
        }
        function aH(h) {
            var w = al.parent();
            af = h === true ? true : (h === false ? false : (af ? false : true));
            if (aI) {
                w[af ? "addClass" : "removeClass"]("peFlareLightboxActive")
            } else {
                w.animate({
                    "margin-top": (af ? -84 : 0)
                }, 500)
            }
        }
        function aA() {
            if (x.hasClass("peFlareLightboxActive")) {
                if (d.pixelentity.browser.mobile || j.videoType == "youtube" || j.videoType == "vimeo") {
                    var h = d.pixelentity.browser.iDev ? 35 : 0;
                    var w = d.pixelentity.browser.android ? P * 9 / 16 : X;
                    w = Math.min(w, X);
                    x.find("iframe, video").css("margin-top", (X - w) / 2 + h).height(w - h).width("100%")
                } else {
                    aO.resize(P, X)
                }
            }
        }
        function ah() {
            clearTimeout(R);
            aO.unbind("video_ready.pixelentity", ah);
            ag.hide();
            x.addClass("peFlareLightboxActive");
            aA();
            if (d.pixelentity.browser.iDev && (j.videoType == "vimeo" || j.videoType == "youtube")) {
                m = true;
                aB.css({
                    position: "absolute",
                    top: W.scrollTop()
                })
            }
        }
        function t() {
            clearTimeout(R);
            if (aO) {
                if (aO.destroy) {
                    aO.destroy()
                }
                aO = false;
                x.removeClass("peFlareLightboxActive").empty();
                ae.addClass("peFlareLightboxActive")
            }
            if (m) {
                m = false;
                aB.css({
                    position: "fixed",
                    top: 0
                })
            }
        }
        function aR() {
            if (aO) {
                t();
                ae.addClass("peFlareLightboxActive");
                if (!aL) {
                    Z()
                }
            } else {
                Z()
            }
        }
        function aa() {
            ag.show();
            ae.removeClass("peFlareLightboxActive");
            aO = x.peVideo({
                api: true,
                useVideoTag: d.pixelentity.browser.mobile,
                disableFade: true,
                width: P,
                height: X,
                type: j.videoType,
                videoId: j.video,
                poster: d.pixelentity.browser.mobile && j.videoPoster,
                hd: true,
                autoPlay: true,
                loop: false
            });
            aO.one("video_ready.pixelentity", ah);
            R = setTimeout(ah, 5000)
        }
        function aP(h) {
            switch (h.currentTarget.id) {
            case "peFlareLightboxControlClose":
                aR();
                break;
            case "peFlareLightboxControlNext":
                ai();
                break;
            case "peFlareLightboxControlPrev":
                N();
                break;
            case "peFlareLightboxControlThumbs":
                aH();
                break;
            case "peFlareLightboxControlVideo":
                aa();
                break
            }
            h.stopPropagation();
            h.stopImmediatePropagation();
            return false
        }
        function Y(h, w) {
            if (!ad) {
                return true
            }
            if (h.type == "keydown") {
                switch (h.keyCode) {
                case 27:
                    aR();
                    break;
                case 39:
                    ai();
                    break;
                case 37:
                    N();
                    break
                }
            } else {
                if (!aO) {
                    if (w < 0) {
                        ai()
                    } else {
                        N()
                    }
                }
            }
            h.preventDefault();
            h.stopPropagation();
            return false
        }
        function am(h) {
            if (aJ) {
                return true
            }
            aJ = true;
            ax = h;
            return true
        }
        function at(h) {
            if (!ad) {
                return
            }
            if (m) {
                aB.css("top", W.scrollTop())
            }
        }
        function H() {
            if (u) {
                return true
            }
            u = true;
            W = d(window).resize(s);
            W.scroll(at);
            aB = d('<div class="peFlareLightbox"><div class="peFlareLightboxHidden"></div><div class="peFlareLightboxControls"><div><a href="#" class="sprite" id="peFlareLightboxControlClose"/><a href="#" class="sprite" id="peFlareLightboxControlNext"/><a href="#" class="sprite" id="peFlareLightboxControlPrev"/><a href="#" class="sprite" id="peFlareLightboxControlThumbs"/></div></div><div class="peFlareLightboxOverlay"></div><div class="peFlareLightboxContent"></div><div class="peFlareLightboxThumbs"><span></span></div><a id="peFlareLightboxControlVideo" class="peFlareLightboxVideoIcon"><span></span></a><div class="peFlareLightboxVideo"></div><div class="peFlareLightboxSpinner"><span/></div></div>');
            if (!n) {
                aB.addClass("no-transitions")
            }
            if (d.browser.msie) {
                aB.addClass("msie")
            }
            d("body").append(aB).bind("touchmove", S);
            ag = aB.find(".peFlareLightboxSpinner").hide();
            L = aB.find(".peFlareLightboxContent");
            ae = aB.find(".peFlareLightboxVideoIcon");
            x = aB.find(".peFlareLightboxVideo");
            al = d("<div/>");
            if (d.pixelentity.browser.mobile) {
                aB.addClass("mobile");
                aB.find(".peFlareLightboxThumbs").append(al)
            } else {
                aB.find(".peFlareLightboxThumbs").bind("mouseenter mouseleave", o).append(al)
            }
            M = aB.find(".peFlareLightboxHidden");
            aB.bind("touchstart touchmove touchend", z).bind("mousewheel", Y).delegate(".peFlareLightboxControls a", "click touchstart", aP).delegate(".peFlareLightboxThumbs span", "click", o);
            ae.click(aP);
            if (!d.pixelentity.browser.mobile) {
                al.bind("mousemove", ac)
            } else {
                aB.click(aH)
            }
            d(document).bind("keydown", Y)
        }
        function v() {
            y = true;
            aB.css("filter", "none");
            if (al.data("created")) {
                aH(true);
                ao = setTimeout(aH, 2000)
            }
            if (aK.length === T) {
                ab()
            }
        }
        function an() {
            aB.addClass("peFlareLightboxActive");
            if (n) {
                setTimeout(v, 600)
            } else {
                aB.stop().css("opacity", 0).fadeTo(500, 1, v)
            }
        }
        function V() {
            ad = true;
            H();
            s();
            W.scrollLeft(0);
            aB.show();
            setTimeout(an, 10)
        }
        function aq() {
            ad = false;
            aL = false;
            I = false;
            U = -1;
            t();
            aB.hide();
            L.empty();
            var h, w;
            while ((w = au.shift())) {
                w.destroy()
            }
            while ((h = ar.shift())) {
                J[h].destroy()
            }
            al.data("created", false).empty();
            aB.removeClass("peFlareLightboxActive");
            ae.removeClass("peFlareLightboxActive");
            aD = "none"
        }
        function Z(h) {
            y = false;
            if (n) {
                if (aI) {
                    aB.one(aI, aq)
                } else {
                    setTimeout(aq, 600)
                }
                aB.removeClass("peFlareLightboxActive")
            } else {
                aB.stop().css("opacity", 1).fadeTo(500, 0, aq)
            }
        }
        function aG() {
            ag.show()
        }
        function G() {
            aj = setTimeout(aG, 500)
        }
        function aM() {
            clearTimeout(aj);
            ag.hide()
        }
        function O() {
            if (!aL || al.data("created") === true) {
                return
            }
            var w, aV;
            aS = d("<div/>");
            al.empty().append(aS);
            var aU = 0;
            for (var aT = 0; aT < aL.length; aT++) {
                aV = aL[aT];
                if ((w = aC[aV].thumb)) {
                    w = d("<span/>").attr("data-src", w).attr("id", aV);
                    aS.append(w);
                    w.peSimpleThumb();
                    aU++
                }
            }
            var h = aU * (104) + 10;
            aS.width(h);
            al.data("count", aU);
            al.data("size", 104);
            if (aU > 0) {
                al.data("created", true);
                al.data("width", h)
            } else {
                aB.find("#peFlareLightboxControlThumbs").hide()
            }
        }
        function q(h) {
            aM();
            var w = U;
            aC[w].resource = (h && h[0] && h[0].thumbnail_large) || false;
            U = -1;
            l(w)
        }
        function l(aV) {
            var aT = aC[aV];
            if (aT.resource.match(g)) {
                U = aV;
                G();
                d.getJSON(aT.resource, q);
                return false
            }
            if (aV === U) {
                ap = true;
                T = 0;
                return false
            }
            U = aV;
            t();
            aL = aT.gallery ? ay[aT.gallery] : false;
            aL = aL.length > 1 ? aL : false;
            aB.find("#peFlareLightboxControlPrev,#peFlareLightboxControlNext,#peFlareLightboxControlThumbs")[aL && aL.length > 1 ? "show" : "hide"]();
            if (aL) {
                Q = d.inArray(aV, aL);
                O()
            }
            ap = false;
            T = 0;
            var w;
            var aU, h;
            if (ar.length > 0 && (aU = J[ar[0]]).isGallery) {
                w = ar[0];
                aQ = false
            } else {
                w = K++;
                h = aw[aT.plugin] || aw["default"];
                aU = new h(w, P, X);
                J[w] = aU;
                ar.push(w);
                aQ = true
            }
            j = aT.video ? aT : false;
            if (!j) {
                ae.removeClass("peFlareLightboxActive")
            }
            aK.push(w);
            G();
            aU.load(aT)
        }
        function F(h) {
            V();
            l(parseInt(h.currentTarget.getAttribute("data-pe-target-id"), 10));
            return false
        }
        function aF(w) {
            var h = d.inArray(w, ar);
            if (h !== false) {
                ar.splice(h, 1)
            }
            J[w] = undefined;
            delete J[w]
        }
        function p(h, w) {
            switch (h) {
            case "loaded":
                T++;
                if (aK.length === T && y) {
                    ab()
                }
                break;
            case "destroy":
                aF(w);
                break;
            case "locked":
                I++;
                break;
            case "unlocked":
                I--;
                break
            }
        }
        function r(aT) {
            var w = J[aT];
            var h = w.resize(P, X).render();
            if (w.isGallery) {
                L.append(h)
            } else {
                h.css("left", f[aD].from);
                L.append(h);
                if (n) {
                    h.fadeTo(0, 1).css("left", f[aD].to)
                } else {
                    h.css("opacity", 0).animate({
                        left: f[aD].to,
                        opacity: 1
                    }, 1000)
                }
            }
            if (d.inArray(w, au) < 0) {
                au.push(w)
            }
            if (j && !aL) {
                ae.removeClass("peFlareLightboxActive");
                aa()
            } else {
                ae[j ? "addClass" : "removeClass"]("peFlareLightboxActive")
            }
        }
        function E() {
            if (!aQ) {
                return
            }
            aQ = false;
            var w, h;
            while ((w = au.shift())) {
                if (aI) {
                    w.render().fadeTo(0, 0).css("left", -f[aD].from).one(aI, w.destroy)
                } else {
                    w.render().css("opacity", 1).animate({
                        left: -f[aD].from,
                        opacity: 0
                    }, 1000, null, w.destroy)
                }
            }
        }
        function ab() {
            aM();
            if (ap) {
                return
            }
            ap = true;
            var h;
            E();
            while ((h = aK.shift()) !== undefined) {
                r(h)
            }
        }
        function az(w) {
            var h = w.gallery || false;
            var aT = w.id !== undefined ? w.id : aC.length;
            if (h) {
                if (ay[h]) {
                    ay[h].push(aT)
                } else {
                    ay[h] = [aT]
                }
            }
            aC.push(w)
        }
        function C(aV) {
            var aW = k.length;
            var aT = aV.attr("href");
            var w = aV.attr("data-flare-plugin") || "default";
            aV.attr("data-pe-target-id", k.length).bind("click", F);
            var aU;
            aU = d.pixelentity.videoplayer.getInfo(aT, aV.attr("data-flare-videoformats"), aV.attr("data-flare-videoposter"));
            if (aU.video) {
                aT = aU.videoPoster
            } else {
                aU = d.pixelentity.videoplayer.getInfo(aV.attr("data-flare-video"), aV.attr("data-flare-videoformats"))
            }
            var h = {
                id: aW,
                plugin: w,
                resource: aT || "",
                gallery: aV.attr("data-flare-gallery") || false,
                bw: aV.attr("data-flare-bw"),
                thumb: aV.attr("data-flare-thumb"),
                scale: aV.attr("data-flare-scale") || "fit"
            };
            if (aU.video) {
                d.extend(h, aU)
            }
            k.push(aV);
            az(h)
        }
        function A(h) {
            M.append(h)
        }
        d.extend(this, {
            init: am,
            add: C,
            show: r,
            signal: p,
            register: aN,
            addToBuffer: A
        })
    }
    var c = d.pixelentity.lightbox = new e();

    function a(i, h) {
        function j() {
            c.init(h);
            c.add(i)
        }
        d.extend(this, {
            destroy: function () {
                i.data("peFlareLightbox", null);
                i = undefined
            }
        });
        j()
    }
    d.fn.peFlareLightbox = function (h) {
        var i = this.data("peFlareLightbox");
        if (i) {
            return i
        }
        h = d.extend(true, {}, d.pixelentity.peFlareLightbox.conf, h);
        this.each(function () {
            var j = d(this);
            i = new a(j, h);
            j.data("peFlareLightbox", i)
        });
        return h.api ? i : this
    }
}(jQuery));
(function (c) {
    var b;
    if (!c.pixelentity || !(b = c.pixelentity.lightbox)) {
        return
    }
    function a(e, r, n) {
        var m;
        var k, t;
        var j = false;
        var i = false;
        var o;

        function s(h) {
            o = h;
            b.signal("locked", e);
            p(h);
            return this
        }
        function g() {
            b.signal("unlocked", e)
        }
        function f(h, u) {
            r = h;
            n = u;
            if (m) {
                var v = 0;
                if (o.scale == "fit") {
                    v = 40
                }
                var w = c.pixelentity.Geom.getScaler(o.scale, "center", "center", r - v, n - v, k, t);
                m.transform(w.ratio, parseInt(w.offset.w, 10) + v / 2, parseInt(w.offset.h, 10) + v / 2, k, t, true, c.pixelentity.browser.android && c.pixelentity.browser.android < 3)
            }
            return this
        }
        function l() {
            k = m[0].naturalWidth || m[0].width || m.width();
            t = m[0].naturalHeight || m[0].height || m.height();
            b.signal("loaded", e);
            setTimeout(g, 500)
        }
        function d() {
            if (!i) {
                i = c('<div class="peFlareLightboxRenderImage" />').append(m.addClass(o.scale));
                m.wrap("<div/>")
            }
            return i
        }
        function p(h) {
            j = true;
            m = c('<img class="singleImage" src="%0"/>'.format(h.resource));
            b.addToBuffer(m);
            c.pixelentity.preloader.load(m, l)
        }
        function q() {
            m = undefined;
            if (i) {
                i.detach();
                i = undefined
            }
            b.signal("destroy", e)
        }
        c.extend(this, {
            load: s,
            preload: p,
            resize: f,
            render: d,
            isGallery: false,
            destroy: q
        })
    }
    b.register(a, "default")
}(jQuery));
(function (a) {
    a.pixelentity = a.pixelentity || {
        version: "1.0.0"
    };
    a.pixelentity.peBackgroundSlider = {
        conf: {
            api: false,
            wait: false
        }
    };

    function b(E, k) {
        var x, n, s, p;
        var o = a(this);
        var e = 0;
        var v = "center,center".split(/,/);
        var F = "fillmax";
        var m, y;
        var C = false;
        var t = false;

        function g() {
            p = a(window)
        }
        function j(h, H) {
            t = C = false;
            if (n) {
                x = n.removeClass("peCurrentColor").addClass("pePrevColor")
            }
            e = h ? 1 : 0;
            e += H ? 1 : 0;
            o.triggerHandler("loading.pixelentity");
            var w = a.browser.mozilla;
            if (h) {
                n = a("<img/>").addClass("peCurrentColor").attr("data-src", h);
                if (w) {
                    n.css("background-color", "rgba(255,255,255,.01)")
                }
                E.append(n.fadeTo(0, 0)[0]);
                a.pixelentity.preloader.load(n, c)
            } else {
                n = false
            }
            if (H) {
                s = a("<img/>").addClass("peCurrentBW").attr("data-src", H);
                if (w) {
                    s.css("background-color", "rgba(255,255,255,.01)")
                }
                E.append(s.fadeTo(0, 0)[0]);
                a.pixelentity.preloader.load(s, c)
            } else {
                s = false
            }
            if (!e) {
                u()
            }
        }
        function c(h) {
            e--;
            if (e === 0) {
                u()
            }
        }
        function u() {
            if (C) {
                return
            }
            C = true;
            o.triggerHandler("loaded.pixelentity");
            if (t || !k.wait) {
                z()
            }
        }
        function l() {
            t = true;
            if (e === 0) {
                z()
            }
        }
        function z() {
            d(n);
            d(s);
            B();
            if (x) {
                if (n) {
                    x.fadeTo(400, 0);
                    r()
                } else {
                    x.fadeTo(400, 0, r)
                }
            } else {
                r()
            }
        }
        function B() {
            m = p.width();
            y = window.innerHeight ? window.innerHeight : p.height();
            f(n, 1.02);
            f(s, 1)
        }
        function f(I, w) {
            if (I) {
                var h = I.data("w");
                var H = I.data("h");
                var J = a.pixelentity.Geom.getScaler(F, v[1], v[0], m, y, h, H);
                I.transform(J.ratio * w, parseInt(J.offset.w + h * (J.ratio - J.ratio * w) * 0.5, 10), parseInt(J.offset.h + H * (J.ratio - J.ratio * w) * 0.5, 10), h, H, true, a.pixelentity.browser.android && a.pixelentity.browser.android < 3)
            }
        }
        function d(h) {
            if (h) {
                h.data("w", h[0].width || h.width() || h[0].naturalWidth);
                h.data("h", h[0].height || h.height() || h[0].naturalHeight)
            }
        }
        function r() {
            if (s) {
                s.delay(200).fadeTo(800, 1)
            }
            if (n) {
                n.delay(600).fadeTo(1200, 1, q)
            } else {
                q()
            }
        }
        function q() {
            if (x) {
                x.remove();
                x = false
            }
            if (s) {
                s.remove();
                s = false
            }
            if (o) {
                o.triggerHandler("complete.pixelentity")
            }
        }
        function G() {
            o.bind.apply(o, arguments)
        }
        function i() {
            o.unbind.apply(o, arguments)
        }
        function D(w, h) {
            F = w;
            v = h.split(/,/)
        }
        function A() {
            x = n = s = p = o = undefined;
            E.data("peBackgroundSlider", null);
            E = undefined
        }
        a.extend(this, {
            load: j,
            resize: B,
            gogo: l,
            bind: G,
            unbind: i,
            configure: D,
            destroy: A
        });
        g()
    }
    a.fn.peBackgroundSlider = function (c) {
        var d = this.data("peBackgroundSlider");
        if (d) {
            return d
        }
        c = a.extend(true, {}, a.pixelentity.peBackgroundSlider.conf, c);
        this.each(function () {
            var e = a(this);
            d = new b(e, c);
            e.data("peBackgroundSlider", d)
        });
        return c.api ? d : this
    }
}(jQuery));
(function (b) {
    b.pixelentity = b.pixelentity || {
        version: "1.0.0"
    };
    b.pixelentity.peSimpleThumb = {
        conf: {
            api: false
        }
    };

    function a(f, e) {
        var c;

        function g() {
            c = b("<img/>").attr("src", f.attr("data-src")).fadeTo(0, 0);
            f.append(c);
            b.pixelentity.preloader.load(c, d)
        }
        function d() {
            var h = c[0].naturalWidth || c[0].width || c.width();
            var i = c[0].naturalHeight || c[0].height || c.height();
            var j = b.pixelentity.Geom.getScaler("fill", "center", "center", f.width(), f.height(), h, i);
            c.transform(j.ratio, parseInt(j.offset.w, 10), parseInt(j.offset.h, 10), h, i, true, true);
            c.fadeTo(500, 1);
            f.addClass("loaded");
            f = undefined;
            c = undefined
        }
        b.extend(this, {
            destroy: function () {
                f.data("peSimpleThumb", null);
                f = undefined
            }
        });
        g()
    }
    b.fn.peSimpleThumb = function (c) {
        var d = this.data("peSimpleThumb");
        if (d) {
            return d
        }
        c = b.extend(true, {}, b.pixelentity.peSimpleThumb.conf, c);
        this.each(function () {
            var e = b(this);
            d = new a(e, c);
            e.data("peSimpleThumb", d)
        });
        return c.api ? d : this
    }
}(jQuery));
(function (c) {
    var b;
    if (!c.pixelentity || !(b = c.pixelentity.lightbox)) {
        return
    }
    function a(f, s, n) {
        var g;
        var l, u;
        var k = false;
        var j = false;
        var p;

        function t(h) {
            p = h;
            b.signal("locked", f);
            q(h);
            return this
        }
        function i(h, v) {
            s = h;
            n = v;
            if (g) {
                g.resize(s, n)
            }
            return this
        }
        function m() {
            b.signal("loaded", f)
        }
        function e() {
            b.signal("unlocked", f)
        }
        function d() {
            setTimeout(o, 50);
            return j
        }
        function o() {
            if (g) {
                g.gogo()
            }
        }
        function q(h) {
            k = true;
            if (!g) {
                j = c('<div class="peFlareLightboxRenderGallery" />');
                b.addToBuffer(j);
                g = j.peBackgroundSlider({
                    api: true,
                    wait: true
                });
                g.bind("loaded.pixelentity", m);
                g.bind("complete.pixelentity", e)
            }
            g.load(h.resource, h.bw);
            g.configure("fillmax", "center,center")
        }
        function r() {
            if (j) {
                j.detach();
                j = undefined
            }
            if (g) {
                g.unbind("loaded.pixelentity", m);
                g.unbind("complete.pixelentity", e);
                g.destroy();
                g = undefined
            }
            b.signal("destroy", f)
        }
        c.extend(this, {
            load: t,
            preload: q,
            resize: i,
            render: d,
            isGallery: true,
            destroy: r
        })
    }
    b.register(a, "shutter")
}(jQuery));