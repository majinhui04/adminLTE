!
function(t) {
    function e(e, n, a) {
        var s = this;
        return this.on("click.pjax", e,
        function(e) {
            var o = t.extend({},
            u(n, a));
            o.container || (o.container = t(this).attr("data-pjax") || s),
            i(e, o)
        })
    }
    function i(e, i, n) {
        n = u(i, n);
        var s = e.currentTarget;
        if ("A" !== s.tagName.toUpperCase()) throw "$.fn.pjax or $.pjax.click requires an anchor element";
        if (! (e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || location.protocol !== s.protocol || location.hostname !== s.hostname || s.hash && s.href.replace(s.hash, "") === location.href.replace(location.hash, "") || s.href === location.href + "#")) {
            var o = {
                url: s.href,
                container: t(s).attr("data-pjax"),
                target: s
            },
            r = t.extend({},
            o, n),
            l = t.Event("pjax:click");
            t(s).trigger(l, [r]),
            l.isDefaultPrevented() || (a(r), e.preventDefault(), t(s).trigger("pjax:clicked", [r]))
        }
    }
    function n(e, i, n) {
        n = u(i, n);
        var s = e.currentTarget;
        if ("FORM" !== s.tagName.toUpperCase()) throw "$.pjax.submit requires a form element";
        var o = {
            type: s.method.toUpperCase(),
            url: s.action,
            data: t(s).serializeArray(),
            container: t(s).attr("data-pjax"),
            target: s
        };
        a(t.extend({},
        o, n)),
        e.preventDefault()
    }
    function a(e) {
        function i(e, i) {
            var a = t.Event(e, {
                relatedTarget: n
            });
            return r.trigger(a, i),
            !a.isDefaultPrevented()
        }
        e = t.extend(!0, {},
        t.ajaxSettings, a.defaults, e),
        t.isFunction(e.url) && (e.url = e.url());
        var n = e.target,
        s = c(e.url).hash,
        r = e.context = p(e.container);
        e.data || (e.data = {}),
        e.data._pjax = r.selector;
        var l;
        e.beforeSend = function(t, n) {
            return "GET" !== n.type && (n.timeout = 0),
            t.setRequestHeader("X-PJAX", "true"),
            t.setRequestHeader("X-PJAX-Container", r.selector),
            i("pjax:beforeSend", [t, n]) ? (n.timeout > 0 && (l = setTimeout(function() {
                i("pjax:timeout", [t, e]) && t.abort("timeout")
            },
            n.timeout), n.timeout = 0), void(e.requestUrl = c(n.url).href)) : !1
        },
        e.complete = function(t, n) {
            l && clearTimeout(l),
            i("pjax:complete", [t, n, e]),
            i("pjax:end", [t, e])
        },
        e.error = function(t, n, a) {
            var s = g("", t, e),
            r = i("pjax:error", [t, n, a, e]);
            "GET" == e.type && "abort" !== n && r && o(s.url)
        },
        e.success = function(n, l, d) {
            var u = "function" == typeof t.pjax.defaults.version ? t.pjax.defaults.version() : t.pjax.defaults.version,
            p = d.getResponseHeader("X-PJAX-Version"),
            f = g(n, d, e);
            if (u && p && u !== p) return void o(f.url);
            if (!f.contents) return void o(f.url);
            a.state = {
                id: e.id || h(),
                url: f.url,
                title: f.title,
                container: r.selector,
                fragment: e.fragment,
                timeout: e.timeout
            },
            (e.push || e.replace) && window.history.replaceState(a.state, f.title, f.url);
            try {
                document.activeElement.blur()
            } catch(m) {}
            f.title && (document.title = f.title),
            r.html(f.contents);
            var w = r.find("input[autofocus], textarea[autofocus]").last()[0];
            if (w && document.activeElement !== w && w.focus(), v(f.scripts), "number" == typeof e.scrollTo && t(window).scrollTop(e.scrollTo), "" !== s) {
                var y = c(f.url);
                y.hash = s,
                a.state.url = y.href,
                window.history.replaceState(a.state, f.title, y.href);
                var b = t(y.hash);
                b.length && t(window).scrollTop(b.offset().top)
            }
            i("pjax:success", [n, l, d, e])
        },
        a.state || (a.state = {
            id: h(),
            url: window.location.href,
            title: document.title,
            container: r.selector,
            fragment: e.fragment,
            timeout: e.timeout
        },
        window.history.replaceState(a.state, document.title));
        var u = a.xhr;
        u && u.readyState < 4 && (u.onreadystatechange = t.noop, u.abort()),
        a.options = e;
        var u = a.xhr = t.ajax(e);
        return u.readyState > 0 && (e.push && !e.replace && (w(a.state.id, r.clone().contents()), window.history.pushState(null, "", d(e.requestUrl))), i("pjax:start", [u, e]), i("pjax:send", [u, e])),
        a.xhr
    }
    function s(e, i) {
        var n = {
            url: window.location.href,
            push: !1,
            replace: !0,
            scrollTo: !1
        };
        return a(t.extend(n, u(e, i)))
    }
    function o(t) {
        window.history.replaceState(null, "", "#"),
        window.location.replace(t)
    }
    function r(e) {
        var i = e.state;
        if (i && i.container) {
            if (k && M == i.url) return;
            if (a.state && a.state.id === i.id) return;
            var n = t(i.container);
            if (n.length) {
                var s, r = S[i.id];
                a.state && (s = a.state.id < i.id ? "forward": "back", y(s, a.state.id, n.clone().contents()));
                var l = t.Event("pjax:popstate", {
                    state: i,
                    direction: s
                });
                n.trigger(l);
                var h = {
                    id: i.id,
                    url: i.url,
                    container: n,
                    push: !1,
                    fragment: i.fragment,
                    timeout: i.timeout,
                    scrollTo: !1
                };
                r ? (n.trigger("pjax:start", [null, h]), i.title && (document.title = i.title), n.html(r), a.state = i, n.trigger("pjax:end", [null, h])) : a(h),
                n[0].offsetHeight
            } else o(location.href)
        }
        k = !1
    }
    function l(e) {
        var i = t.isFunction(e.url) ? e.url() : e.url,
        n = e.type ? e.type.toUpperCase() : "GET",
        a = t("<form>", {
            method: "GET" === n ? "GET": "POST",
            action: i,
            style: "display:none"
        });
        "GET" !== n && "POST" !== n && a.append(t("<input>", {
            type: "hidden",
            name: "_method",
            value: n.toLowerCase()
        }));
        var s = e.data;
        if ("string" == typeof s) t.each(s.split("&"),
        function(e, i) {
            var n = i.split("=");
            a.append(t("<input>", {
                type: "hidden",
                name: n[0],
                value: n[1]
            }))
        });
        else if ("object" == typeof s) for (key in s) a.append(t("<input>", {
            type: "hidden",
            name: key,
            value: s[key]
        }));
        t(document.body).append(a),
        a.submit()
    }
    function h() {
        return (new Date).getTime()
    }
    function d(t) {
        return t.replace(/\?_pjax=[^&]+&?/, "?").replace(/_pjax=[^&]+&?/, "").replace(/[\?&]$/, "")
    }
    function c(t) {
        var e = document.createElement("a");
        return e.href = t,
        e
    }
    function u(e, i) {
        return e && i ? i.container = e: i = t.isPlainObject(e) ? e: {
            container: e
        },
        i.container && (i.container = p(i.container)),
        i
    }
    function p(e) {
        if (e = t(e), e.length) {
            if ("" !== e.selector && e.context === document) return e;
            if (e.attr("id")) return t("#" + e.attr("id"));
            throw "cant get selector for pjax container!"
        }
        throw "no pjax container for " + e.selector
    }
    function f(t, e) {
        return t.filter(e).add(t.find(e))
    }
    function m(e) {
        return t.parseHTML(e, document, !0)
    }
    function g(e, i, n) {
        var a = {};
        if (a.url = d(i.getResponseHeader("X-PJAX-URL") || n.requestUrl), /<html/i.test(e)) var s = t(m(e.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])),
        o = t(m(e.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
        else var s = o = t(m(e));
        if (0 === o.length) return a;
        if (a.title = f(s, "title").last().text(), n.fragment) {
            if ("body" === n.fragment) var r = o;
            else var r = f(o, n.fragment).first();
            r.length && (a.contents = r.contents(), a.title || (a.title = r.attr("title") || r.data("title")))
        } else / <html / i.test(e) || (a.contents = o);
        return a.contents && (a.contents = a.contents.not(function() {
            return t(this).is("title")
        }), a.contents.find("title").remove(), a.scripts = f(a.contents, "script[src]").remove(), a.contents = a.contents.not(a.scripts)),
        a.title && (a.title = t.trim(a.title)),
        a
    }
    function v(e) {
        if (e) {
            var i = t("script[src]");
            e.each(function() {
                var e = this.src,
                n = i.filter(function() {
                    return this.src === e
                });
                if (!n.length) {
                    var a = document.createElement("script");
                    a.type = t(this).attr("type"),
                    a.src = t(this).attr("src"),
                    document.head.appendChild(a)
                }
            })
        }
    }
    function w(t, e) {
        for (S[t] = e, x.push(t); _.length;) delete S[_.shift()];
        for (; x.length > a.defaults.maxCacheLength;) delete S[x.shift()]
    }
    function y(t, e, i) {
        var n, a;
        S[e] = i,
        "forward" === t ? (n = x, a = _) : (n = _, a = x),
        n.push(e),
        (e = a.pop()) && delete S[e]
    }
    function b() {
        return t("meta").filter(function() {
            var e = t(this).attr("http-equiv");
            return e && "X-PJAX-VERSION" === e.toUpperCase()
        }).attr("content")
    }
    function T() {
        t.fn.pjax = e,
        t.pjax = a,
        t.pjax.enable = t.noop,
        t.pjax.disable = C,
        t.pjax.click = i,
        t.pjax.submit = n,
        t.pjax.reload = s,
        t.pjax.defaults = {
            timeout: 650,
            push: !0,
            replace: !1,
            type: "GET",
            dataType: "html",
            scrollTo: 0,
            maxCacheLength: 20,
            version: b
        },
        t(window).on("popstate.pjax", r)
    }
    function C() {
        t.fn.pjax = function() {
            return this
        },
        t.pjax = l,
        t.pjax.enable = T,
        t.pjax.disable = t.noop,
        t.pjax.click = t.noop,
        t.pjax.submit = t.noop,
        t.pjax.reload = function() {
            window.location.reload()
        },
        t(window).off("popstate.pjax", r)
    }
    var k = !0,
    M = window.location.href,
    D = window.history.state;
    D && D.container && (a.state = D),
    "state" in window.history && (k = !1);
    var S = {},
    _ = [],
    x = [];
    t.inArray("state", t.event.props) < 0 && t.event.props.push("state"),
    t.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/),
    t.support.pjax ? T() : C()
} (jQuery),
function(t, e) {
    var i = function(t, e, i, n) {
        var a = null,
        s = 0;
        return (isNaN(e) || 0 > e) && (e = 100),
        (isNaN(n) || 0 > n || n > e) && (n = e),
        "function" != typeof i ? i ?
        function() {
            var e = this,
            i = arguments;
            t.apply(e, i)
        }: function() {
            function i() {
                var l = (new Date).getTime() - s;
                l > e ? (t.apply(o, r), a = null) : a = setTimeout(i, n)
            }
            var o = this,
            r = arguments;
            a && clearTimeout(a),
            s = (new Date).getTime(),
            a = setTimeout(i, n)
        }: function() {
            function o() {
                var h = (new Date).getTime() - s;
                h > e || i() ? (t.apply(r, l), a = null) : a = setTimeout(o, n)
            }
            var r = this,
            l = arguments;
            a ? (clearTimeout(a), a = null) : i() ? t.apply(r, l) : (s = (new Date).getTime(), a = setTimeout(o, n))
        }
    };
    t.fn.waitFor = i,
    t.fn[e] = function(t) {
        return t ? this.bind("resize", i(t)) : this.trigger(e)
    }
} (jQuery || Zepto, "smartResize"),
function(t) {
    function e(e) {
        {
            var i = e.target;
            t(i).offset()
        }
        i.dragging = !0,
        i.dragX = e.clientX,
        i.dragY = e.clientY,
        i.dragLeft = parseInt(i.style.left, 10),
        i.dragTop = parseInt(i.style.top, 10),
        i.style.transition = "all 0ms linear"
    }
    function i(t) {
        var e = t.target;
        if (e.dragging) {
            if (!isNaN(t.which) && 1 !== t.which) return void n(t);
            e.style.left = t.clientX - e.dragX + e.dragLeft + "px",
            e.style.top = t.clientY - e.dragY + e.dragTop + "px"
        }
    }
    function n(t) {
        var e = t.target,
        i = Math.abs(e.dragLeft - parseInt(e.style.left, 10)),
        n = Math.abs(e.dragTop - parseInt(e.style.top, 10));
        20 > i && 20 > n ? e.dragging = !1 : setTimeout(function() {
            e.dragging = !1
        },
        10),
        e.style.transition = ""
    }
    var a = null,
    s = {},
    o = "click",
    r = {
        frameFill: .95,
        smartReisze: !0,
        zIndex: 1e3,
        container: null,
        width: 0,
        height: 0,
        group: "default",
        viewport: function(t) {
            return t
        },
        close: [{
            selector: "document",
            event: "keyup",
            condition: {
                keyCode: 27
            }
        },
        {
            selector: ".imagebubble-backmask",
            event: o
        }],
        callbacks: {
            show: function() {},
            hide: function() {},
            shown: function() {},
            hidden: function() {}
        },
        showTitle: !0,
        showMenu: !0,
        zoomLimit: "width",
        zoomRate: .98
    },
    l = t('<div class="imagebubble-menu" />'),
    h = t('<div class="imagebubble-button zoomOut" />').html("+").appendTo(l),
    d = t('<a class="imagebubble-button downPic" />').appendTo(l).attr("target", "_blank"),
    c = t('<div class="imagebubble-button zoomIn" />').html("-").appendTo(l);
    l.on(o,
    function(t) {
        t.stopPropagation()
    }),
    c.on(o,
    function() {
        var e = t(this),
        i = e.parent().parent(),
        n = i.find(".imagebubble-ghost.selected"),
        a = parseInt(n.attr("scale"), 10) || 10;
        a -= 1,
        1 > a && (a = 1),
        n.attr("scale", a).css({
            transform: "scale(" + a / 10 + ")"
        }),
        n[0].__showWidgets(n[0].__rect, a)
    }),
    h.on(o,
    function() {
        var e = t(this),
        i = e.parent().parent(),
        n = i.find(".imagebubble-ghost.selected"),
        a = parseInt(n.attr("scale"), 10) || 10,
        s = n[0].zoomLimit;
        a += 1,
        "width" === s ? n.width() * a > n[0].limitWidth * n[0].zoomRate && (a -= 1) : "height" === s ? n.height() * a > n[0].limitHeight * n[0].zoomRate && (a -= 1) : "draggable" !== s && (n.width() * a > n[0].limitWidth * n[0].zoomRate || n.height() * a > n[0].limitHeight * n[0].zoomRate) && (a -= 1),
        n.attr("scale", a).css({
            transform: "scale(" + a / 10 + ")"
        }),
        n[0].__showWidgets(n[0].__rect, a)
    }),
    t.fn.imageBubble = function(h) {
        function c(t, e, i, n) {
            var a = i.width * n,
            s = i.height * n,
            o = 1,
            r = 0,
            l = {};
            return a >= t && s >= e ? (l.width = t, l.height = e) : t > a && e > s ? (o = a / t, r = s / e, o > r && (o = r), l.width = t * o, l.height = e * o) : t > a ? (o = e / t, l.width = a, l.height = a * o) : (o = t / e, l.height = s, l.width = s * o),
            l.top = .5 * (i.height - l.height) + i.offsetTop,
            l.left = .5 * (i.width - l.width) + i.offsetLeft,
            l
        }
        function u() {
            f.find(".imagebubble-bubble").trigger(o)
        }
        function p() {
            var e, i, n, a = g.mask.find(".imagebubble-ghost"),
            s = {};
            m.container.hasClass("imagebubble-mode-on") && g.mask.css({
                width: m.container.width(),
                height: m.container.height()
            }),
            a.each(function(o) {
                var r, l;
                o = a[o],
                r = o._origin,
                o = t(o),
                l = o.hasClass("selected"),
                r[0].__setRect(),
                l ? (e = o[0].naturalWidth, i = o[0].naturalHeight, v = g.getBoundingClientRect(), n = m.viewport(v), n.offsetTop = n.top - v.top, n.offsetLeft = n.left - v.left, o[0].limitWidth = n.width, o[0].limitHeight = n.height, s = c(e, i, n, m.frameFill), o.css({
                    top: s.top,
                    left: s.left,
                    width: s.width,
                    height: s.height
                }), o[0].__rect = s, o[0].__showWidgets(s)) : (v = g.getBoundingClientRect(), o[0].__reset())
            })
        }
        if (! (Maleskine.BrowserDetector && Maleskine.BrowserDetector.isIE() && (Maleskine.BrowserDetector.isIE9() || Maleskine.BrowserDetector.isIE8() || Maleskine.BrowserDetector.lessThanIE8()))) {
            a || (a = t(window), r.container = t(document.body));
            var f = t(this),
            m = t.extend(!0, r, h);
            m.container.addClass("imagebubble-container").addClass("imagebubble-mode-off"),
            s[h.group] = s[h.group] || null;
            var g = m.container[0],
            v = g.getBoundingClientRect();
            g.mask || (g.mask = t('<div class="imagebubble-backmask image-package" />').css({
                "z-index": m.zIndex
            }).appendTo(m.container).on(o, u)),
            this.each(function() {
                var r = t(this),
                u = r.find("img");
                if ((g.contains(this) || g === this) && "ImageBubble" === r.attr("widget") && u.length > 0) {
                    r.addClass("imagebubble"),
                    u.each(function() {
                        var r = t(this),
                        u = r.data("updateImageBubble");
                        if (u) return void u(r.attr("data-original-src"), r.attr("alt"));
                        var f, w, y, b = this.getBoundingClientRect(),
                        T = r.data("title") || r.attr("alt") || "",
                        C = m.showTitle && !!T && T.length > 0,
                        k = t('<img class="imagebubble-ghost" />').attr("src", r.attr("data-original-src")).load(function() {
                            function t(t) {
                                if (!D) {
                                    if (D = !0, M) {
                                        if (k[0].dragging || s[h.group] !== r) return D = !1,
                                        void t.stopPropagation();
                                        m.callbacks.hide(),
                                        m.container.removeClass("imagebubble-mode-on").addClass("imagebubble-mode-off"),
                                        r.css({
                                            opacity: r[0].originalOpacity || 1
                                        }).removeClass("imagebubble-bubble"),
                                        k.css({
                                            top: b.top - v.top,
                                            left: b.left - v.left,
                                            width: b.width,
                                            height: b.height,
                                            transform: "scale(1)"
                                        }).removeClass("selected").attr("scale", 10),
                                        C && y.removeClass("enable"),
                                        setTimeout(w, 250)
                                    } else {
                                        if (null !== s[h.group] && s[h.group] !== r) return void(D = !1);
                                        s[h.group] = r,
                                        m.callbacks.show(),
                                        r[0].__setRect(),
                                        window.getComputedStyle ? r[0].originalOpacity = window.getComputedStyle(r[0]).opacity: document.defaultView && document.defaultView.getComputedStyle ? r[0].originalOpacity = document.defaultView.getComputedStyle(r[0]).opacity: r[0].currentStyle && (r[0].originalOpacity = r[0].currentStyle.opacity),
                                        v = g.getBoundingClientRect(),
                                        u = m.viewport(v),
                                        u.offsetTop = u.top - v.top,
                                        u.offsetLeft = u.left - v.left,
                                        k[0].limitWidth = u.width,
                                        k[0].limitHeight = u.height,
                                        g.mask.css({
                                            top: 0,
                                            width: m.container.width(),
                                            height: m.container.height(),
                                            display: "block"
                                        }),
                                        setTimeout(function() {
                                            n = c(e, i, u, m.frameFill),
                                            m.container.removeClass("imagebubble-mode-off").addClass("imagebubble-mode-on"),
                                            r.css({
                                                opacity: 0
                                            }).addClass("imagebubble-bubble"),
                                            k.css({
                                                top: n.top,
                                                left: n.left,
                                                width: n.width,
                                                height: n.height
                                            }).addClass("selected"),
                                            k[0].__rect = n,
                                            k[0].__showWidgets(n),
                                            setTimeout(f, 250)
                                        },
                                        0)
                                    }
                                    t.stopPropagation()
                                }
                            }
                            var e = k[0].naturalWidth,
                            i = k[0].naturalHeight,
                            n = {},
                            u = {};
                            g.mask.append(k.css({
                                top: b.top - v.top,
                                left: b.left - v.left,
                                width: r.width(),
                                height: r.height()
                            })),
                            r.addClass("imagebubble-image"),
                            k[0]._origin = r,
                            r.on(o, t),
                            k.on(o, t),
                            k[0].__showWidgets = function(t, e) {
                                var i, n = {};
                                e = e || 10,
                                e /= 10,
                                m.showMenu ? (g.mask[0].contains(l[0]) || g.mask.append(l), n = l[0].getBoundingClientRect(), n = {
                                    top: t.top + t.height * (1 + e) * .5 + 10,
                                    win_bottom: a.scrollTop() + a.height() - n.height - 20
                                },
                                C && (i = y[0].getBoundingClientRect(), n.img_bottom = n.top, n.top += i.height + 10), n.top > n.win_bottom ? (l.addClass("in_pic"), n.top = n.win_bottom) : l.removeClass("in_pic"), l.css({
                                    top: n.top
                                }), d.attr("href", r.attr("data-original-src")), C && (n.top = n.top - i.height - 10, n.top < n.img_bottom ? y.addClass("in_pic") : y.removeClass("in_pic"), y.addClass("enable").css({
                                    top: n.top,
                                    "margin-left": -i.width / 2
                                }))) : C && (n = y[0].getBoundingClientRect(), n = {
                                    width: n.width,
                                    top: t.top + t.height * (1 + e) * .5 + 10,
                                    win_bottom: a.scrollTop() + a.height() - n.height - 20
                                },
                                n.top > n.win_bottom ? (y.addClass("in_pic"), n.top = n.win_bottom) : y.removeClass("in_pic"), y.addClass("enable").css({
                                    top: n.top,
                                    "margin-left": -n.width / 2
                                }))
                            },
                            k[0].__reset = function() {
                                k.css({
                                    top: b.top - v.top,
                                    left: b.left - v.left,
                                    width: r.width(),
                                    height: r.height()
                                })
                            },
                            r.data("updateImageBubble",
                            function(t, e) {
                                t && k.attr("src", t),
                                e && m.showTitle && (C = e.length > 0, y.html(C ? e: ""))
                            }),
                            k.load(function() {
                                e = k[0].naturalWidth,
                                i = k[0].naturalHeight,
                                p()
                            }),
                            p()
                        }),
                        M = !1,
                        D = !1;
                        k[0].zoomLimit = m.zoomLimit,
                        k[0].zoomRate = 10 * m.zoomRate,
                        "draggable" === m.zoomLimit && k.attr("draggable", !1).on("mousedown", e).on("mousemove", i).on("mouseup", n),
                        f = function() {
                            M = !0,
                            D = !1,
                            m.callbacks.shown()
                        },
                        w = function() {
                            g.mask.css({
                                top: 0,
                                width: 0,
                                height: 0,
                                display: "none"
                            }),
                            C && y.removeClass("enable"),
                            M = !1,
                            D = !1,
                            s[h.group] = null,
                            m.callbacks.hidden()
                        },
                        r[0].__setRect = function() {
                            b = r[0].getBoundingClientRect()
                        },
                        C && (y = t('<div class="image-caption" />').html(T).appendTo(g.mask))
                    })
                }
            }),
            m.close && m.close.map(function(e) {
                "window" === e.selector ? a.on(e.event, u) : "document" === e.selector ? e.condition ? t(document).on(e.event,
                function(t) {
                    var i, n = !0;
                    for (i in e.condition) if (t[i] && t[i] !== e.condition[i]) {
                        n = !1;
                        break
                    }
                    n && u()
                }) : t(document).on(e.event, u) : t(document).on(e.event, e.selector, u)
            }),
            m.smartReisze ? t(window).smartResize(p) : t(window).resize(p),
            p()
        }
    }
} (jQuery || Zepto),
function(t, e) {
    "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Spinner = e()
} (this,
function() {
    "use strict";
    function t(t, e) {
        var i, n = document.createElement(t || "div");
        for (i in e) n[i] = e[i];
        return n
    }
    function e(t) {
        for (var e = 1,
        i = arguments.length; i > e; e++) t.appendChild(arguments[e]);
        return t
    }
    function i(t, e, i, n) {
        var a = ["opacity", e, ~~ (100 * t), i, n].join("-"),
        s = .01 + i / n * 100,
        o = Math.max(1 - (1 - t) / e * (100 - s), t),
        r = h.substring(0, h.indexOf("Animation")).toLowerCase(),
        l = r && "-" + r + "-" || "";
        return c[a] || (u.insertRule("@" + l + "keyframes " + a + "{0%{opacity:" + o + "}" + s + "%{opacity:" + t + "}" + (s + .01) + "%{opacity:1}" + (s + e) % 100 + "%{opacity:" + t + "}100%{opacity:" + o + "}}", u.cssRules.length), c[a] = 1),
        a
    }
    function n(t, e) {
        var i, n, a = t.style;
        if (void 0 !== a[e]) return e;
        for (e = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < d.length; n++) if (i = d[n] + e, void 0 !== a[i]) return i
    }
    function a(t, e) {
        for (var i in e) try {
            t.style[n(t, i) || i] = e[i]
        } catch(a) {
            t.style.zIndex = 1
        }
        return t
    }
    function s(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var n in i) void 0 === t[n] && (t[n] = i[n])
        }
        return t
    }
    function o(t) {
        for (var e = {
            x: t.offsetLeft,
            y: t.offsetTop
        }; t = t.offsetParent;) e.x += t.offsetLeft,
        e.y += t.offsetTop;
        return e
    }
    function r(t) {
        return "undefined" == typeof this ? new r(t) : void(this.opts = s(t || {},
        r.defaults, p))
    }
    function l() {
        function i(e, i) {
            return t("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', i)
        }
        u.addRule(".spin-vml", "behavior:url(#default#VML)"),
        r.prototype.lines = function(t, n) {
            function s() {
                return a(i("group", {
                    coordsize: h + " " + h,
                    coordorigin: -l + " " + -l
                }), {
                    width: h,
                    height: h
                })
            }
            function o(t, o, r) {
                e(c, e(a(s(), {
                    rotation: 360 / n.lines * t + "deg",
                    left: ~~o
                }), e(a(i("roundrect", {
                    arcsize: n.corners
                }), {
                    width: l,
                    height: n.width,
                    left: n.radius,
                    top: -n.width >> 1,
                    filter: r
                }), i("fill", {
                    color: n.color,
                    opacity: n.opacity
                }), i("stroke", {
                    opacity: 0
                }))))
            }
            var r, l = n.length + n.width,
            h = 2 * l,
            d = 2 * -(n.width + n.length) + "px",
            c = a(s(), {
                position: "absolute",
                top: d,
                left: d
            });
            if (n.shadow) for (r = 1; r <= n.lines; r++) o(r, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (r = 1; r <= n.lines; r++) o(r);
            return e(t, c)
        },
        r.prototype.opacity = function(t, e, i, n) {
            var a = t.firstChild;
            n = n.shadow && n.lines || 0,
            a && e + n < a.childNodes.length && (a = a.childNodes[e + n], a = a && a.firstChild, a = a && a.firstChild, a && (a.opacity = i))
        }
    }
    var h, d = ["webkit", "Moz", "ms", "O"],
    c = {},
    u = function() {
        var i = t("style", {
            type: "text/css"
        });
        return e(document.getElementsByTagName("head")[0], i),
        i.sheet || i.styleSheet
    } (),
    p = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        rotate: 0,
        corners: 1,
        color: "#000",
        direction: 1,
        speed: 1,
        trail: 100,
        opacity: .25,
        fps: 20,
        zIndex: 2e9,
        className: "spinner",
        top: "auto",
        left: "auto",
        position: "relative"
    };
    r.defaults = {},
    s(r.prototype, {
        spin: function(e) {
            this.stop();
            var i, n, s = this,
            r = s.opts,
            l = s.el = a(t(0, {
                className: r.className
            }), {
                position: r.position,
                width: 0,
                zIndex: r.zIndex
            }),
            d = r.radius + r.length + r.width;
            if (e && (e.insertBefore(l, e.firstChild || null), n = o(e), i = o(l), a(l, {
                left: ("auto" == r.left ? n.x - i.x + (e.offsetWidth >> 1) : parseInt(r.left, 10) + d) + "px",
                top: ("auto" == r.top ? n.y - i.y + (e.offsetHeight >> 1) : parseInt(r.top, 10) + d) + "px"
            })), l.setAttribute("role", "progressbar"), s.lines(l, s.opts), !h) {
                var c, u = 0,
                p = (r.lines - 1) * (1 - r.direction) / 2,
                f = r.fps,
                m = f / r.speed,
                g = (1 - r.opacity) / (m * r.trail / 100),
                v = m / r.lines; !
                function w() {
                    u++;
                    for (var t = 0; t < r.lines; t++) c = Math.max(1 - (u + (r.lines - t) * v) % m * g, r.opacity),
                    s.opacity(l, t * r.direction + p, c, r);
                    s.timeout = s.el && setTimeout(w, ~~ (1e3 / f))
                } ()
            }
            return s
        },
        stop: function() {
            var t = this.el;
            return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), this.el = void 0),
            this
        },
        lines: function(n, s) {
            function o(e, i) {
                return a(t(), {
                    position: "absolute",
                    width: s.length + s.width + "px",
                    height: s.width + "px",
                    background: e,
                    boxShadow: i,
                    transformOrigin: "left",
                    transform: "rotate(" + ~~ (360 / s.lines * l + s.rotate) + "deg) translate(" + s.radius + "px,0)",
                    borderRadius: (s.corners * s.width >> 1) + "px"
                })
            }
            for (var r, l = 0,
            d = (s.lines - 1) * (1 - s.direction) / 2; l < s.lines; l++) r = a(t(), {
                position: "absolute",
                top: 1 + ~ (s.width / 2) + "px",
                transform: s.hwaccel ? "translate3d(0,0,0)": "",
                opacity: s.opacity,
                animation: h && i(s.opacity, s.trail, d + l * s.direction, s.lines) + " " + 1 / s.speed + "s linear infinite"
            }),
            s.shadow && e(r, a(o("#000", "0 0 4px #000"), {
                top: "2px"
            })),
            e(n, e(r, o(s.color, "0 0 1px rgba(0,0,0,.1)")));
            return n
        },
        opacity: function(t, e, i) {
            e < t.childNodes.length && (t.childNodes[e].style.opacity = i)
        }
    });
    var f = a(t("group"), {
        behavior: "url(#default#VML)"
    });
    return ! n(f, "transform") && f.adj ? l() : h = n(f, "animation"),
    r
}),
function(t, e) {
    "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(["./spin"], e) : t.Ladda = e(t.Spinner)
} (this,
function(t) {
    "use strict";
    function e(t) {
        if ("undefined" == typeof t) throw "Button target must be defined.";
        var e = a(t, t.getAttribute("data-size")),
        i = document.createElement("span");
        i.className = "ladda-spinner",
        t.appendChild(i);
        var n, o = {
            start: function() {
                return t.setAttribute("disabled", ""),
                t.setAttribute("data-loading", ""),
                Maleskine.BrowserDetector.isIE() && Maleskine.BrowserDetector.isIE8() && $(t).find(".ladda-label").css("left", "-999%"),
                clearTimeout(n),
                e.spin(i),
                this.setProgress(0),
                this
            },
            stop: function() {
                return t.removeAttribute("disabled"),
                t.removeAttribute("data-loading"),
                clearTimeout(n),
                n = setTimeout(function() {
                    e.stop()
                },
                1e3),
                this
            },
            toggle: function() {
                return this.isLoading() ? this.stop() : this.start(),
                this
            },
            setProgress: function(e) {
                var i = t.querySelector(".ladda-progress");
                0 === e && i && i.parentNode ? i.parentNode.removeChild(i) : (i || (i = document.createElement("div"), i.className = "ladda-progress", t.appendChild(i)), i.style.width = (e || 0) * t.offsetWidth + "px")
            },
            enable: function() {
                return this.stop(),
                this
            },
            disable: function() {
                return this.stop(),
                t.setAttribute("disabled", ""),
                this
            },
            isLoading: function() {
                return t.hasAttribute("data-loading")
            }
        };
        return s.push(o),
        o
    }
    function i(t, i) {
        i = i || {};
        var n = [];
        "string" == typeof t ? n = [].slice.call(document.querySelectorAll(t)) : "object" == typeof t && "string" == typeof t.nodeName && (n = [n]);
        for (var a = 0,
        s = n.length; s > a; a++) !
        function() {
            var t = n[a];
            if ("function" == typeof t.addEventListener) {
                var s = e(t),
                o = -1;
                t.addEventListener("click",
                function() {
                    s.start(),
                    "number" == typeof i.timeout && (clearTimeout(o), o = setTimeout(s.stop, i.timeout)),
                    "function" == typeof i.callback && i.callback.apply(null, [s])
                },
                !1)
            }
        } ()
    }
    function n() {
        for (var t = 0,
        e = s.length; e > t; t++) s[t].stop()
    }
    function a(e) {
        var i = e.offsetHeight;
        i > 32 && (i *= .8);
        var n = 12,
        a = .2 * i,
        s = .6 * a,
        o = 7 > a ? 2 : 3;
        return new t({
            color: "#fff",
            lines: n,
            radius: a,
            length: s,
            width: o,
            zIndex: "initial",
            top: "auto",
            left: "auto",
            className: ""
        })
    }
    var s = [];
    return {
        bind: i,
        create: e,
        stopAll: n
    }
}),
!
function(t) {
    "use strict";
    var e = function(e, i) {
        this.options = i,
        this.$element = t(e).delegate('[data-dismiss="modal"]', "click.dismiss.modal", t.proxy(this.hide, this)),
        this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    e.prototype = {
        constructor: e,
        toggle: function() {
            return this[this.isShown ? "hide": "show"]()
        },
        show: function() {
            var e = this,
            i = t.Event("show");
            this.$element.trigger(i),
            this.isShown || i.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function() {
                var i = t.support.transition && e.$element.hasClass("fade");
                e.$element.parent().length || e.$element.appendTo(document.body),
                e.$element.show(),
                i && e.$element[0].offsetWidth,
                e.$element.addClass("in").attr("aria-hidden", !1),
                e.enforceFocus(),
                i ? e.$element.one(t.support.transition.end,
                function() {
                    e.$element.focus().trigger("shown")
                }) : e.$element.focus().trigger("shown")
            }))
        },
        hide: function(e) {
            e && e.preventDefault();
            e = t.Event("hide"),
            this.$element.trigger(e),
            this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), t.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        },
        enforceFocus: function() {
            var e = this;
            t(document).on("focusin.modal",
            function(t) {
                e.$element[0] === t.target || e.$element.has(t.target).length || e.$element.focus()
            })
        },
        escape: function() {
            var t = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal",
            function(e) {
                27 == e.which && t.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        },
        hideWithTransition: function() {
            var e = this,
            i = setTimeout(function() {
                e.$element.off(t.support.transition.end),
                e.hideModal()
            },
            500);
            this.$element.one(t.support.transition.end,
            function() {
                clearTimeout(i),
                e.hideModal()
            })
        },
        hideModal: function() {
            var t = this;
            this.$element.hide(),
            this.backdrop(function() {
                t.removeBackdrop(),
                t.$element.trigger("hidden")
            })
        },
        removeBackdrop: function() {
            this.$backdrop && this.$backdrop.remove(),
            this.$backdrop = null
        },
        backdrop: function(e) {
            var i = this.$element.hasClass("fade") ? "fade": "";
            if (this.isShown && this.options.backdrop) {
                var n = t.support.transition && i;
                if (this.$backdrop = t('<div class="modal-backdrop ' + i + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? t.proxy(this.$element[0].focus, this.$element[0]) : t.proxy(this.hide, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
                n ? this.$backdrop.one(t.support.transition.end, e) : e()
            } else ! this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, e) : e()) : e && e()
        }
    };
    var i = t.fn.modal;
    t.fn.modal = function(i) {
        return this.each(function() {
            var n = t(this),
            a = n.data("modal"),
            s = t.extend({},
            t.fn.modal.defaults, n.data(), "object" == typeof i && i);
            a || n.data("modal", a = new e(this, s)),
            "string" == typeof i ? a[i]() : s.show && a.show()
        })
    },
    t.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    t.fn.modal.Constructor = e,
    t.fn.modal.noConflict = function() {
        return t.fn.modal = i,
        this
    },
    t(document).on("click.modal.data-api", '[data-toggle="modal"]',
    function(e) {
        var i = t(this),
        n = i.attr("href"),
        a = t(i.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
        s = a.data("modal") ? "toggle": t.extend({
            remote: !/#/.test(n) && n
        },
        a.data(), i.data());
        e.preventDefault(),
        a.modal(s).one("hide",
        function() {
            i.focus()
        })
    })
} (window.jQuery),
!
function(t) {
    "use strict";
    var e = function(t, e) {
        this.init("tooltip", t, e)
    };
    e.prototype = {
        constructor: e,
        init: function(e, i, n) {
            var a, s, o, r, l;
            for (this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.enabled = !0, o = this.options.trigger.split(" "), l = o.length; l--;) r = o[l],
            "click" == r ? this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)) : "manual" != r && (a = "hover" == r ? "mouseenter": "focus", s = "hover" == r ? "mouseleave": "blur", this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.leave, this)));
            this.options.selector ? this._options = t.extend({},
            this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(e) {
            return e = t.extend({},
            t.fn[this.type].defaults, this.$element.data(), e),
            e.delay && "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }),
            e
        },
        enter: function(e) {
            var i, n = t.fn[this.type].defaults,
            a = {};
            return this._options && t.each(this._options,
            function(t, e) {
                n[t] != e && (a[t] = e)
            },
            this),
            i = t(e.currentTarget)[this.type](a).data(this.type),
            i.options.delay && i.options.delay.show ? (clearTimeout(this.timeout), i.hoverState = "in", void(this.timeout = setTimeout(function() {
                "in" == i.hoverState && i.show()
            },
            i.options.delay.show))) : i.show()
        },
        leave: function(e) {
            var i = t(e.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout),
            i.options.delay && i.options.delay.hide ? (i.hoverState = "out", void(this.timeout = setTimeout(function() {
                "out" == i.hoverState && i.hide()
            },
            i.options.delay.hide))) : i.hide()
        },
        show: function() {
            var e, i, n, a, s, o, r = t.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(r), r.isDefaultPrevented()) return;
                switch (e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), s = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, e.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element), i = this.getPosition(), n = e[0].offsetWidth, a = e[0].offsetHeight, s) {
                case "bottom":
                    o = {
                        top: i.top + i.height,
                        left: i.left + i.width / 2 - n / 2
                    };
                    break;
                case "top":
                    o = {
                        top: i.top - a,
                        left: i.left + i.width / 2 - n / 2
                    };
                    break;
                case "left":
                    o = {
                        top: i.top + i.height / 2 - a / 2,
                        left: i.left - n
                    };
                    break;
                case "right":
                    o = {
                        top: i.top + i.height / 2 - a / 2,
                        left: i.left + i.width
                    }
                }
                this.applyPlacement(o, s),
                this.$element.trigger("shown")
            }
        },
        applyPlacement: function(t, e) {
            var i, n, a, s, o = this.tip(),
            r = o[0].offsetWidth,
            l = o[0].offsetHeight;
            o.offset(t).addClass(e).addClass("in"),
            i = o[0].offsetWidth,
            n = o[0].offsetHeight,
            "top" == e && n != l && (t.top = t.top + l - n, s = !0),
            "bottom" == e || "top" == e ? (a = 0, t.left < 0 && (a = -2 * t.left, t.left = 0, o.offset(t), i = o[0].offsetWidth, n = o[0].offsetHeight), this.replaceArrow(a - r + i, i, "left")) : this.replaceArrow(n - l, n, "top"),
            s && o.offset(t)
        },
        replaceArrow: function(t, e, i) {
            this.arrow().css(i, t ? 50 * (1 - t / e) + "%": "")
        },
        setContent: function() {
            var t = this.tip(),
            e = this.getTitle();
            t.find(".tooltip-inner")[this.options.html ? "html": "text"](e),
            t.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function e() {
                var e = setTimeout(function() {
                    i.off(t.support.transition.end).detach()
                },
                500);
                i.one(t.support.transition.end,
                function() {
                    clearTimeout(e),
                    i.detach()
                })
            }
            var i = this.tip(),
            n = t.Event("hide");
            return this.$element.trigger(n),
            n.isDefaultPrevented() ? void 0 : (i.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? e() : i.detach(), this.$element.trigger("hidden"), this)
        },
        fixTitle: function() {
            var t = this.$element; (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function() {
            var e = this.$element[0];
            return t.extend({},
            "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
                width: e.offsetWidth,
                height: e.offsetHeight
            },
            this.$element.offset())
        },
        getTitle: function() {
            var t, e = this.$element,
            i = this.options;
            return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
        },
        tip: function() {
            return this.$tip = this.$tip || t(this.options.template)
        },
        arrow: function() {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function() {
            this.enabled = !0
        },
        disable: function() {
            this.enabled = !1
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled
        },
        toggle: function(e) {
            var i = e ? t(e.currentTarget)[this.type](this._options).data(this.type) : this;
            i.tip().hasClass("in") ? i.hide() : i.show()
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = function(i) {
        return this.each(function() {
            var n = t(this),
            a = n.data("tooltip"),
            s = "object" == typeof i && i;
            a || n.data("tooltip", a = new e(this, s)),
            "string" == typeof i && a[i]()
        })
    },
    t.fn.tooltip.Constructor = e,
    t.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    },
    t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = i,
        this
    }
} (window.jQuery),
!
function(t) {
    function e() {
        return new Date(Date.UTC.apply(Date, arguments))
    }
    var i = function(e, i) {
        var s = this;
        this.element = t(e),
        this.language = i.language || this.element.data("date-language") || "en",
        this.language = this.language in n ? this.language: "en",
        this.isRTL = n[this.language].rtl || !1,
        this.formatType = i.formatType || this.element.data("format-type") || "standard",
        this.format = a.parseFormat(i.format || this.element.data("date-format") || n[this.language].format || a.getDefaultFormat(this.formatType, "input"), this.formatType),
        this.isInline = !1,
        this.isVisible = !1,
        this.isInput = this.element.is("input"),
        this.bootcssVer = this.isInput ? this.element.is(".form-control") ? 3 : 2 : this.bootcssVer = this.element.is(".input-group") ? 3 : 2,
        this.component = this.element.is(".date") ? 3 == this.bootcssVer ? this.element.find(".input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-calendar").parent() : this.element.find(".add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar").parent() : !1,
        this.componentReset = this.element.is(".date") ? 3 == this.bootcssVer ? this.element.find(".input-group-addon .glyphicon-remove").parent() : this.element.find(".add-on .icon-remove").parent() : !1,
        this.hasInput = this.component && this.element.find("input").length,
        this.component && 0 === this.component.length && (this.component = !1),
        this.linkField = i.linkField || this.element.data("link-field") || !1,
        this.linkFormat = a.parseFormat(i.linkFormat || this.element.data("link-format") || a.getDefaultFormat(this.formatType, "link"), this.formatType),
        this.minuteStep = i.minuteStep || this.element.data("minute-step") || 5,
        this.pickerPosition = i.pickerPosition || this.element.data("picker-position") || "bottom-right",
        this.showMeridian = i.showMeridian || this.element.data("show-meridian") || !1,
        this.initialDate = i.initialDate || new Date,
        this._attachEvents(),
        this.formatViewType = "datetime",
        "formatViewType" in i ? this.formatViewType = i.formatViewType: "formatViewType" in this.element.data() && (this.formatViewType = this.element.data("formatViewType")),
        this.minView = 0,
        "minView" in i ? this.minView = i.minView: "minView" in this.element.data() && (this.minView = this.element.data("min-view")),
        this.minView = a.convertViewMode(this.minView),
        this.maxView = a.modes.length - 1,
        "maxView" in i ? this.maxView = i.maxView: "maxView" in this.element.data() && (this.maxView = this.element.data("max-view")),
        this.maxView = a.convertViewMode(this.maxView),
        this.wheelViewModeNavigation = !1,
        "wheelViewModeNavigation" in i ? this.wheelViewModeNavigation = i.wheelViewModeNavigation: "wheelViewModeNavigation" in this.element.data() && (this.wheelViewModeNavigation = this.element.data("view-mode-wheel-navigation")),
        this.wheelViewModeNavigationInverseDirection = !1,
        "wheelViewModeNavigationInverseDirection" in i ? this.wheelViewModeNavigationInverseDirection = i.wheelViewModeNavigationInverseDirection: "wheelViewModeNavigationInverseDirection" in this.element.data() && (this.wheelViewModeNavigationInverseDirection = this.element.data("view-mode-wheel-navigation-inverse-dir")),
        this.wheelViewModeNavigationDelay = 100,
        "wheelViewModeNavigationDelay" in i ? this.wheelViewModeNavigationDelay = i.wheelViewModeNavigationDelay: "wheelViewModeNavigationDelay" in this.element.data() && (this.wheelViewModeNavigationDelay = this.element.data("view-mode-wheel-navigation-delay")),
        this.startViewMode = 2,
        "startView" in i ? this.startViewMode = i.startView: "startView" in this.element.data() && (this.startViewMode = this.element.data("start-view")),
        this.startViewMode = a.convertViewMode(this.startViewMode),
        this.viewMode = this.startViewMode,
        this.viewSelect = this.minView,
        "viewSelect" in i ? this.viewSelect = i.viewSelect: "viewSelect" in this.element.data() && (this.viewSelect = this.element.data("view-select")),
        this.viewSelect = a.convertViewMode(this.viewSelect),
        this.forceParse = !0,
        "forceParse" in i ? this.forceParse = i.forceParse: "dateForceParse" in this.element.data() && (this.forceParse = this.element.data("date-force-parse")),
        this.picker = t(3 == this.bootcssVer ? a.templateV3: a.template).appendTo(this.isInline ? this.element: "body").on({
            click: t.proxy(this.click, this),
            mousedown: t.proxy(this.mousedown, this)
        }),
        this.wheelViewModeNavigation && (t.fn.mousewheel ? this.picker.on({
            mousewheel: t.proxy(this.mousewheel, this)
        }) : console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option")),
        this.picker.addClass(this.isInline ? "datetimepicker-inline": "datetimepicker-dropdown-" + this.pickerPosition + " dropdown-menu"),
        this.isRTL && (this.picker.addClass("datetimepicker-rtl"), 3 == this.bootcssVer ? this.picker.find(".prev span, .next span").toggleClass("glyphicon-arrow-left glyphicon-arrow-right") : this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")),
        t(document).on("mousedown",
        function(e) {
            0 === t(e.target).closest(".datetimepicker").length && s.hide()
        }),
        this.autoclose = !1,
        "autoclose" in i ? this.autoclose = i.autoclose: "dateAutoclose" in this.element.data() && (this.autoclose = this.element.data("date-autoclose")),
        this.keyboardNavigation = !0,
        "keyboardNavigation" in i ? this.keyboardNavigation = i.keyboardNavigation: "dateKeyboardNavigation" in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation")),
        this.todayBtn = i.todayBtn || this.element.data("date-today-btn") || !1,
        this.todayHighlight = i.todayHighlight || this.element.data("date-today-highlight") || !1,
        this.weekStart = (i.weekStart || this.element.data("date-weekstart") || n[this.language].weekStart || 0) % 7,
        this.weekEnd = (this.weekStart + 6) % 7,
        this.startDate = -1 / 0,
        this.endDate = 1 / 0,
        this.daysOfWeekDisabled = [],
        this.setStartDate(i.startDate || this.element.data("date-startdate")),
        this.setEndDate(i.endDate || this.element.data("date-enddate")),
        this.setDaysOfWeekDisabled(i.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled")),
        this.fillDow(),
        this.fillMonths(),
        this.update(),
        this.showMode(),
        this.isInline && this.show()
    };
    i.prototype = {
        constructor: i,
        _events: [],
        _attachEvents: function() {
            this._detachEvents(),
            this.isInput ? this._events = [[this.element, {
                focus: t.proxy(this.show, this),
                keyup: t.proxy(this.update, this),
                keydown: t.proxy(this.keydown, this)
            }]] : this.component && this.hasInput ? (this._events = [[this.element.find("input"), {
                focus: t.proxy(this.show, this),
                keyup: t.proxy(this.update, this),
                keydown: t.proxy(this.keydown, this)
            }], [this.component, {
                click: t.proxy(this.show, this)
            }]], this.componentReset && this._events.push([this.componentReset, {
                click: t.proxy(this.reset, this)
            }])) : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {
                click: t.proxy(this.show, this)
            }]];
            for (var e, i, n = 0; n < this._events.length; n++) e = this._events[n][0],
            i = this._events[n][1],
            e.on(i)
        },
        _detachEvents: function() {
            for (var t, e, i = 0; i < this._events.length; i++) t = this._events[i][0],
            e = this._events[i][1],
            t.off(e);
            this._events = []
        },
        show: function(e) {
            this.picker.show(),
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(),
            this.forceParse && this.update(),
            this.place(),
            t(window).on("resize", t.proxy(this.place, this)),
            e && (e.stopPropagation(), e.preventDefault()),
            this.isVisible = !0,
            this.element.trigger({
                type: "show",
                date: this.date
            })
        },
        hide: function() {
            this.isVisible && (this.isInline || (this.picker.hide(), t(window).off("resize", this.place), this.viewMode = this.startViewMode, this.showMode(), this.isInput || t(document).off("mousedown", this.hide), this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this.isVisible = !1, this.element.trigger({
                type: "hide",
                date: this.date
            })))
        },
        remove: function() {
            this._detachEvents(),
            this.picker.remove(),
            delete this.picker,
            delete this.element.data().datetimepicker
        },
        getDate: function() {
            var t = this.getUTCDate();
            return new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
        },
        getUTCDate: function() {
            return this.date
        },
        setDate: function(t) {
            this.setUTCDate(new Date(t.getTime() - 6e4 * t.getTimezoneOffset()))
        },
        setUTCDate: function(t) {
            t >= this.startDate && t <= this.endDate ? (this.date = t, this.setValue(), this.viewDate = this.date, this.fill()) : this.element.trigger({
                type: "outOfRange",
                date: t,
                startDate: this.startDate,
                endDate: this.endDate
            })
        },
        setFormat: function(t) {
            this.format = a.parseFormat(t, this.formatType);
            var e;
            this.isInput ? e = this.element: this.component && (e = this.element.find("input")),
            e && e.val() && this.setValue()
        },
        setValue: function() {
            var e = this.getFormattedDate();
            this.isInput ? this.element.val(e) : (this.component && this.element.find("input").val(e), this.element.data("date", e)),
            this.linkField && t("#" + this.linkField).val(this.getFormattedDate(this.linkFormat))
        },
        getFormattedDate: function(t) {
            return void 0 == t && (t = this.format),
            a.formatDate(this.date, t, this.language, this.formatType)
        },
        setStartDate: function(t) {
            this.startDate = t || -1 / 0,
            this.startDate !== -1 / 0 && (this.startDate = a.parseDate(this.startDate, this.format, this.language, this.formatType)),
            this.update(),
            this.updateNavArrows()
        },
        setEndDate: function(t) {
            this.endDate = t || 1 / 0,
            1 / 0 !== this.endDate && (this.endDate = a.parseDate(this.endDate, this.format, this.language, this.formatType)),
            this.update(),
            this.updateNavArrows()
        },
        setDaysOfWeekDisabled: function(e) {
            this.daysOfWeekDisabled = e || [],
            t.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)),
            this.daysOfWeekDisabled = t.map(this.daysOfWeekDisabled,
            function(t) {
                return parseInt(t, 10)
            }),
            this.update(),
            this.updateNavArrows()
        },
        place: function() {
            if (!this.isInline) {
                var e = 0;
                t("div").each(function() {
                    var i = parseInt(t(this).css("zIndex"), 10);
                    i > e && (e = i)
                });
                var i, n, a, s = e + 10;
                this.component ? (i = this.component.offset(), a = i.left, ("bottom-left" == this.pickerPosition || "top-left" == this.pickerPosition) && (a += this.component.outerWidth() - this.picker.outerWidth())) : (i = this.element.offset(), a = i.left),
                n = "top-left" == this.pickerPosition || "top-right" == this.pickerPosition ? i.top - this.picker.outerHeight() : i.top + this.height,
                this.picker.css({
                    top: n,
                    left: a,
                    zIndex: s
                })
            }
        },
        update: function() {
            var t, e = !1;
            arguments && arguments.length && ("string" == typeof arguments[0] || arguments[0] instanceof Date) ? (t = arguments[0], e = !0) : t = this.element.data("date") || (this.isInput ? this.element.val() : this.element.find("input").val()) || this.initialDate,
            t || (t = new Date, e = !1),
            this.date = a.parseDate(t, this.format, this.language, this.formatType),
            e && this.setValue(),
            this.viewDate = new Date(this.date < this.startDate ? this.startDate: this.date > this.endDate ? this.endDate: this.date),
            this.fill()
        },
        fillDow: function() {
            for (var t = this.weekStart,
            e = "<tr>"; t < this.weekStart + 7;) e += '<th class="dow">' + n[this.language].daysMin[t++%7] + "</th>";
            e += "</tr>",
            this.picker.find(".datetimepicker-days thead").append(e)
        },
        fillMonths: function() {
            for (var t = "",
            e = 0; 12 > e;) t += '<span class="month">' + n[this.language].monthsShort[e++] + "</span>";
            this.picker.find(".datetimepicker-months td").html(t)
        },
        fill: function() {
            if (null != this.date && null != this.viewDate) {
                var i = new Date(this.viewDate),
                s = i.getUTCFullYear(),
                o = i.getUTCMonth(),
                r = i.getUTCDate(),
                l = i.getUTCHours(),
                h = i.getUTCMinutes(),
                d = this.startDate !== -1 / 0 ? this.startDate.getUTCFullYear() : -1 / 0,
                c = this.startDate !== -1 / 0 ? this.startDate.getUTCMonth() : -1 / 0,
                u = 1 / 0 !== this.endDate ? this.endDate.getUTCFullYear() : 1 / 0,
                p = 1 / 0 !== this.endDate ? this.endDate.getUTCMonth() : 1 / 0,
                f = new e(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate()).valueOf(),
                m = new Date;
                if (this.picker.find(".datetimepicker-days thead th:eq(1)").text(n[this.language].months[o] + " " + s), "time" == this.formatViewType) {
                    var g = l % 12 ? l % 12 : 12,
                    v = (10 > g ? "0": "") + g,
                    w = (10 > h ? "0": "") + h,
                    y = n[this.language].meridiem[12 > l ? 0 : 1];
                    this.picker.find(".datetimepicker-hours thead th:eq(1)").text(v + ":" + w + " " + y.toUpperCase()),
                    this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(v + ":" + w + " " + y.toUpperCase())
                } else this.picker.find(".datetimepicker-hours thead th:eq(1)").text(r + " " + n[this.language].months[o] + " " + s),
                this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(r + " " + n[this.language].months[o] + " " + s);
                this.picker.find("tfoot th.today").text(n[this.language].today).toggle(this.todayBtn !== !1),
                this.updateNavArrows(),
                this.fillMonths();
                var b = e(s, o - 1, 28, 0, 0, 0, 0),
                T = a.getDaysInMonth(b.getUTCFullYear(), b.getUTCMonth());
                b.setUTCDate(T),
                b.setUTCDate(T - (b.getUTCDay() - this.weekStart + 7) % 7);
                var C = new Date(b);
                C.setUTCDate(C.getUTCDate() + 42),
                C = C.valueOf();
                for (var k, M = []; b.valueOf() < C;) b.getUTCDay() == this.weekStart && M.push("<tr>"),
                k = "",
                b.getUTCFullYear() < s || b.getUTCFullYear() == s && b.getUTCMonth() < o ? k += " old": (b.getUTCFullYear() > s || b.getUTCFullYear() == s && b.getUTCMonth() > o) && (k += " new"),
                this.todayHighlight && b.getUTCFullYear() == m.getFullYear() && b.getUTCMonth() == m.getMonth() && b.getUTCDate() == m.getDate() && (k += " today"),
                b.valueOf() == f && (k += " active"),
                (b.valueOf() + 864e5 <= this.startDate || b.valueOf() > this.endDate || -1 !== t.inArray(b.getUTCDay(), this.daysOfWeekDisabled)) && (k += " disabled"),
                M.push('<td class="day' + k + '">' + b.getUTCDate() + "</td>"),
                b.getUTCDay() == this.weekEnd && M.push("</tr>"),
                b.setUTCDate(b.getUTCDate() + 1);
                this.picker.find(".datetimepicker-days tbody").empty().append(M.join("")),
                M = [];
                for (var D = "",
                S = "",
                _ = "",
                x = 0; 24 > x; x++) {
                    var U = e(s, o, r, x);
                    k = "",
                    U.valueOf() + 36e5 <= this.startDate || U.valueOf() > this.endDate ? k += " disabled": l == x && (k += " active"),
                    this.showMeridian && 2 == n[this.language].meridiem.length ? (S = 12 > x ? n[this.language].meridiem[0] : n[this.language].meridiem[1], S != _ && ("" != _ && M.push("</fieldset>"), M.push('<fieldset class="hour"><legend>' + S.toUpperCase() + "</legend>")), _ = S, D = x % 12 ? x % 12 : 12, M.push('<span class="hour' + k + " hour_" + (12 > x ? "am": "pm") + '">' + D + "</span>"), 23 == x && M.push("</fieldset>")) : (D = x + ":00", M.push('<span class="hour' + k + '">' + D + "</span>"))
                }
                this.picker.find(".datetimepicker-hours td").html(M.join("")),
                M = [],
                D = "",
                S = "",
                _ = "";
                for (var x = 0; 60 > x; x += this.minuteStep) {
                    var U = e(s, o, r, l, x, 0);
                    k = "",
                    U.valueOf() < this.startDate || U.valueOf() > this.endDate ? k += " disabled": Math.floor(h / this.minuteStep) == Math.floor(x / this.minuteStep) && (k += " active"),
                    this.showMeridian && 2 == n[this.language].meridiem.length ? (S = 12 > l ? n[this.language].meridiem[0] : n[this.language].meridiem[1], S != _ && ("" != _ && M.push("</fieldset>"), M.push('<fieldset class="minute"><legend>' + S.toUpperCase() + "</legend>")), _ = S, D = l % 12 ? l % 12 : 12, M.push('<span class="minute' + k + '">' + D + ":" + (10 > x ? "0" + x: x) + "</span>"), 59 == x && M.push("</fieldset>")) : (D = x + ":00", M.push('<span class="minute' + k + '">' + l + ":" + (10 > x ? "0" + x: x) + "</span>"))
                }
                this.picker.find(".datetimepicker-minutes td").html(M.join(""));
                var $ = this.date.getUTCFullYear(),
                H = this.picker.find(".datetimepicker-months").find("th:eq(1)").text(s).end().find("span").removeClass("active");
                $ == s && H.eq(this.date.getUTCMonth()).addClass("active"),
                (d > s || s > u) && H.addClass("disabled"),
                s == d && H.slice(0, c).addClass("disabled"),
                s == u && H.slice(p + 1).addClass("disabled"),
                M = "",
                s = 10 * parseInt(s / 10, 10);
                var I = this.picker.find(".datetimepicker-years").find("th:eq(1)").text(s + "-" + (s + 9)).end().find("td");
                s -= 1;
                for (var x = -1; 11 > x; x++) M += '<span class="year' + ( - 1 == x || 10 == x ? " old": "") + ($ == s ? " active": "") + (d > s || s > u ? " disabled": "") + '">' + s + "</span>",
                s += 1;
                I.html(M),
                this.place()
            }
        },
        updateNavArrows: function() {
            var t = new Date(this.viewDate),
            e = t.getUTCFullYear(),
            i = t.getUTCMonth(),
            n = t.getUTCDate(),
            a = t.getUTCHours();
            switch (this.viewMode) {
            case 0:
                this.picker.find(".prev").css(this.startDate !== -1 / 0 && e <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() && n <= this.startDate.getUTCDate() && a <= this.startDate.getUTCHours() ? {
                    visibility: "hidden"
                }: {
                    visibility: "visible"
                }),
                this.picker.find(".next").css(1 / 0 !== this.endDate && e >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() && n >= this.endDate.getUTCDate() && a >= this.endDate.getUTCHours() ? {
                    visibility: "hidden"
                }: {
                    visibility: "visible"
                });
                break;
            case 1:
                this.picker.find(".prev").css(this.startDate !== -1 / 0 && e <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() && n <= this.startDate.getUTCDate() ? {
                    visibility: "hidden"
                }: {
                    visibility: "visible"
                }),
                this.picker.find(".next").css(1 / 0 !== this.endDate && e >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() && n >= this.endDate.getUTCDate() ? {
                    visibility: "hidden"
                }: {
                    visibility: "visible"
                });
                break;
            case 2:
                this.picker.find(".prev").css(this.startDate !== -1 / 0 && e <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() ? {
                    visibility: "hidden"
                }: {
                    visibility: "visible"
                }),
                this.picker.find(".next").css(1 / 0 !== this.endDate && e >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() ? {
                    visibility: "hidden"
                }: {
                    visibility: "visible"
                });
                break;
            case 3:
            case 4:
                this.picker.find(".prev").css(this.startDate !== -1 / 0 && e <= this.startDate.getUTCFullYear() ? {
                    visibility: "hidden"
                }: {
                    visibility: "visible"
                }),
                this.picker.find(".next").css(1 / 0 !== this.endDate && e >= this.endDate.getUTCFullYear() ? {
                    visibility: "hidden"
                }: {
                    visibility: "visible"
                })
            }
        },
        mousewheel: function(e) {
            if (e.preventDefault(), e.stopPropagation(), !this.wheelPause) {
                this.wheelPause = !0;
                var i = e.originalEvent,
                n = i.wheelDelta,
                a = n > 0 ? 1 : 0 === n ? 0 : -1;
                this.wheelViewModeNavigationInverseDirection && (a = -a),
                this.showMode(a),
                setTimeout(t.proxy(function() {
                    this.wheelPause = !1
                },
                this), this.wheelViewModeNavigationDelay)
            }
        },
        click: function(i) {
            i.stopPropagation(),
            i.preventDefault();
            var n = t(i.target).closest("span, td, th, legend");
            if (1 == n.length) {
                if (n.is(".disabled")) return void this.element.trigger({
                    type: "outOfRange",
                    date: this.viewDate,
                    startDate: this.startDate,
                    endDate: this.endDate
                });
                switch (n[0].nodeName.toLowerCase()) {
                case "th":
                    switch (n[0].className) {
                    case "switch":
                        this.showMode(1);
                        break;
                    case "prev":
                    case "next":
                        var s = a.modes[this.viewMode].navStep * ("prev" == n[0].className ? -1 : 1);
                        switch (this.viewMode) {
                        case 0:
                            this.viewDate = this.moveHour(this.viewDate, s);
                            break;
                        case 1:
                            this.viewDate = this.moveDate(this.viewDate, s);
                            break;
                        case 2:
                            this.viewDate = this.moveMonth(this.viewDate, s);
                            break;
                        case 3:
                        case 4:
                            this.viewDate = this.moveYear(this.viewDate, s)
                        }
                        this.fill();
                        break;
                    case "today":
                        var o = new Date;
                        o = e(o.getFullYear(), o.getMonth(), o.getDate(), o.getHours(), o.getMinutes(), o.getSeconds(), 0),
                        o < this.startDate ? o = this.startDate: o > this.endDate && (o = this.endDate),
                        this.viewMode = this.startViewMode,
                        this.showMode(0),
                        this._setDate(o),
                        this.fill(),
                        this.autoclose && this.hide()
                    }
                    break;
                case "span":
                    if (!n.is(".disabled")) {
                        var r = this.viewDate.getUTCFullYear(),
                        l = this.viewDate.getUTCMonth(),
                        h = this.viewDate.getUTCDate(),
                        d = this.viewDate.getUTCHours(),
                        c = this.viewDate.getUTCMinutes(),
                        u = this.viewDate.getUTCSeconds();
                        if (n.is(".month") ? (this.viewDate.setUTCDate(1), l = n.parent().find("span").index(n), h = this.viewDate.getUTCDate(), this.viewDate.setUTCMonth(l), this.element.trigger({
                            type: "changeMonth",
                            date: this.viewDate
                        }), this.viewSelect >= 3 && this._setDate(e(r, l, h, d, c, u, 0))) : n.is(".year") ? (this.viewDate.setUTCDate(1), r = parseInt(n.text(), 10) || 0, this.viewDate.setUTCFullYear(r), this.element.trigger({
                            type: "changeYear",
                            date: this.viewDate
                        }), this.viewSelect >= 4 && this._setDate(e(r, l, h, d, c, u, 0))) : n.is(".hour") ? (d = parseInt(n.text(), 10) || 0, (n.hasClass("hour_am") || n.hasClass("hour_pm")) && (12 == d && n.hasClass("hour_am") ? d = 0 : 12 != d && n.hasClass("hour_pm") && (d += 12)), this.viewDate.setUTCHours(d), this.element.trigger({
                            type: "changeHour",
                            date: this.viewDate
                        }), this.viewSelect >= 1 && this._setDate(e(r, l, h, d, c, u, 0))) : n.is(".minute") && (c = parseInt(n.text().substr(n.text().indexOf(":") + 1), 10) || 0, this.viewDate.setUTCMinutes(c), this.element.trigger({
                            type: "changeMinute",
                            date: this.viewDate
                        }), this.viewSelect >= 0 && this._setDate(e(r, l, h, d, c, u, 0))), 0 != this.viewMode) {
                            var p = this.viewMode;
                            this.showMode( - 1),
                            this.fill(),
                            p == this.viewMode && this.autoclose && this.hide()
                        } else this.fill(),
                        this.autoclose && this.hide()
                    }
                    break;
                case "td":
                    if (n.is(".day") && !n.is(".disabled")) {
                        var h = parseInt(n.text(), 10) || 1,
                        r = this.viewDate.getUTCFullYear(),
                        l = this.viewDate.getUTCMonth(),
                        d = this.viewDate.getUTCHours(),
                        c = this.viewDate.getUTCMinutes(),
                        u = this.viewDate.getUTCSeconds();
                        n.is(".old") ? 0 === l ? (l = 11, r -= 1) : l -= 1 : n.is(".new") && (11 == l ? (l = 0, r += 1) : l += 1),
                        this.viewDate.setUTCFullYear(r),
                        this.viewDate.setUTCMonth(l),
                        this.viewDate.setUTCDate(h),
                        this.element.trigger({
                            type: "changeDay",
                            date: this.viewDate
                        }),
                        this.viewSelect >= 2 && this._setDate(e(r, l, h, d, c, u, 0))
                    }
                    var p = this.viewMode;
                    this.showMode( - 1),
                    this.fill(),
                    p == this.viewMode && this.autoclose && this.hide()
                }
            }
        },
        _setDate: function(t, e) {
            e && "date" != e || (this.date = t),
            e && "view" != e || (this.viewDate = t),
            this.fill(),
            this.setValue();
            var i;
            this.isInput ? i = this.element: this.component && (i = this.element.find("input")),
            i && (i.change(), this.autoclose && (!e || "date" == e)),
            this.element.trigger({
                type: "changeDate",
                date: this.date
            })
        },
        moveMinute: function(t, e) {
            if (!e) return t;
            var i = new Date(t.valueOf());
            return i.setUTCMinutes(i.getUTCMinutes() + e * this.minuteStep),
            i
        },
        moveHour: function(t, e) {
            if (!e) return t;
            var i = new Date(t.valueOf());
            return i.setUTCHours(i.getUTCHours() + e),
            i
        },
        moveDate: function(t, e) {
            if (!e) return t;
            var i = new Date(t.valueOf());
            return i.setUTCDate(i.getUTCDate() + e),
            i
        },
        moveMonth: function(t, e) {
            if (!e) return t;
            var i, n, a = new Date(t.valueOf()),
            s = a.getUTCDate(),
            o = a.getUTCMonth(),
            r = Math.abs(e);
            if (e = e > 0 ? 1 : -1, 1 == r) n = -1 == e ?
            function() {
                return a.getUTCMonth() == o
            }: function() {
                return a.getUTCMonth() != i
            },
            i = o + e,
            a.setUTCMonth(i),
            (0 > i || i > 11) && (i = (i + 12) % 12);
            else {
                for (var l = 0; r > l; l++) a = this.moveMonth(a, e);
                i = a.getUTCMonth(),
                a.setUTCDate(s),
                n = function() {
                    return i != a.getUTCMonth()
                }
            }
            for (; n();) a.setUTCDate(--s),
            a.setUTCMonth(i);
            return a
        },
        moveYear: function(t, e) {
            return this.moveMonth(t, 12 * e)
        },
        dateWithinRange: function(t) {
            return t >= this.startDate && t <= this.endDate
        },
        keydown: function(t) {
            if (this.picker.is(":not(:visible)")) return void(27 == t.keyCode && this.show());
            var e, i, n, a = !1;
            switch (t.keyCode) {
            case 27:
                this.hide(),
                t.preventDefault();
                break;
            case 37:
            case 39:
                if (!this.keyboardNavigation) break;
                e = 37 == t.keyCode ? -1 : 1,
                viewMode = this.viewMode,
                t.ctrlKey ? viewMode += 2 : t.shiftKey && (viewMode += 1),
                4 == viewMode ? (i = this.moveYear(this.date, e), n = this.moveYear(this.viewDate, e)) : 3 == viewMode ? (i = this.moveMonth(this.date, e), n = this.moveMonth(this.viewDate, e)) : 2 == viewMode ? (i = this.moveDate(this.date, e), n = this.moveDate(this.viewDate, e)) : 1 == viewMode ? (i = this.moveHour(this.date, e), n = this.moveHour(this.viewDate, e)) : 0 == viewMode && (i = this.moveMinute(this.date, e), n = this.moveMinute(this.viewDate, e)),
                this.dateWithinRange(i) && (this.date = i, this.viewDate = n, this.setValue(), this.update(), t.preventDefault(), a = !0);
                break;
            case 38:
            case 40:
                if (!this.keyboardNavigation) break;
                e = 38 == t.keyCode ? -1 : 1,
                viewMode = this.viewMode,
                t.ctrlKey ? viewMode += 2 : t.shiftKey && (viewMode += 1),
                4 == viewMode ? (i = this.moveYear(this.date, e), n = this.moveYear(this.viewDate, e)) : 3 == viewMode ? (i = this.moveMonth(this.date, e), n = this.moveMonth(this.viewDate, e)) : 2 == viewMode ? (i = this.moveDate(this.date, 7 * e), n = this.moveDate(this.viewDate, 7 * e)) : 1 == viewMode ? this.showMeridian ? (i = this.moveHour(this.date, 6 * e), n = this.moveHour(this.viewDate, 6 * e)) : (i = this.moveHour(this.date, 4 * e), n = this.moveHour(this.viewDate, 4 * e)) : 0 == viewMode && (i = this.moveMinute(this.date, 4 * e), n = this.moveMinute(this.viewDate, 4 * e)),
                this.dateWithinRange(i) && (this.date = i, this.viewDate = n, this.setValue(), this.update(), t.preventDefault(), a = !0);
                break;
            case 13:
                if (0 != this.viewMode) {
                    var s = this.viewMode;
                    this.showMode( - 1),
                    this.fill(),
                    s == this.viewMode && this.autoclose && this.hide()
                } else this.fill(),
                this.autoclose && this.hide();
                t.preventDefault();
                break;
            case 9:
                this.hide()
            }
            if (a) {
                var o;
                this.isInput ? o = this.element: this.component && (o = this.element.find("input")),
                o && o.change(),
                this.element.trigger({
                    type: "changeDate",
                    date: this.date
                })
            }
        },
        showMode: function(t) {
            if (t) {
                var e = Math.max(0, Math.min(a.modes.length - 1, this.viewMode + t));
                e >= this.minView && e <= this.maxView && (this.element.trigger({
                    type: "changeMode",
                    date: this.viewDate,
                    oldViewMode: this.viewMode,
                    newViewMode: e
                }), this.viewMode = e)
            }
            this.picker.find(">div").hide().filter(".datetimepicker-" + a.modes[this.viewMode].clsName).css("display", "block"),
            this.updateNavArrows()
        },
        reset: function() {
            this._setDate(null, "date")
        }
    },
    t.fn.datetimepicker = function(e) {
        var n = Array.apply(null, arguments);
        return n.shift(),
        this.each(function() {
            var a = t(this),
            s = a.data("datetimepicker"),
            o = "object" == typeof e && e;
            s || a.data("datetimepicker", s = new i(this, t.extend({},
            t.fn.datetimepicker.defaults, o))),
            "string" == typeof e && "function" == typeof s[e] && s[e].apply(s, n)
        })
    },
    t.fn.datetimepicker.defaults = {},
    t.fn.datetimepicker.Constructor = i;
    var n = t.fn.datetimepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            meridiem: ["am", "pm"],
            suffix: ["st", "nd", "rd", "th"],
            today: "Today"
        }
    },
    a = {
        modes: [{
            clsName: "minutes",
            navFnc: "Hours",
            navStep: 1
        },
        {
            clsName: "hours",
            navFnc: "Date",
            navStep: 1
        },
        {
            clsName: "days",
            navFnc: "Month",
            navStep: 1
        },
        {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        },
        {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10
        }],
        isLeapYear: function(t) {
            return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
        },
        getDaysInMonth: function(t, e) {
            return [31, a.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
        },
        getDefaultFormat: function(t, e) {
            if ("standard" == t) return "input" == e ? "yyyy-mm-dd hh:ii": "yyyy-mm-dd hh:ii:ss";
            if ("php" == t) return "input" == e ? "Y-m-d H:i": "Y-m-d H:i:s";
            throw new Error("Invalid format type.")
        },
        validParts: function(t) {
            if ("standard" == t) return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
            if ("php" == t) return /[dDjlNwzFmMnStyYaABgGhHis]/g;
            throw new Error("Invalid format type.")
        },
        nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
        parseFormat: function(t, e) {
            var i = t.replace(this.validParts(e), "\x00").split("\x00"),
            n = t.match(this.validParts(e));
            if (!i || !i.length || !n || 0 == n.length) throw new Error("Invalid date format.");
            return {
                separators: i,
                parts: n
            }
        },
        parseDate: function(a, s, o, r) {
            if (a instanceof Date) {
                var l = new Date(a.valueOf() - 6e4 * a.getTimezoneOffset());
                return l.setMilliseconds(0),
                l
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(a) && (s = this.parseFormat("yyyy-mm-dd", r)), /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(a) && (s = this.parseFormat("yyyy-mm-dd hh:ii", r)), /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(a) && (s = this.parseFormat("yyyy-mm-dd hh:ii:ss", r)), /^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(a)) {
                var h, d, c = /([-+]\d+)([dmwy])/,
                u = a.match(/([-+]\d+)([dmwy])/g);
                a = new Date;
                for (var p = 0; p < u.length; p++) switch (h = c.exec(u[p]), d = parseInt(h[1]), h[2]) {
                case "d":
                    a.setUTCDate(a.getUTCDate() + d);
                    break;
                case "m":
                    a = i.prototype.moveMonth.call(i.prototype, a, d);
                    break;
                case "w":
                    a.setUTCDate(a.getUTCDate() + 7 * d);
                    break;
                case "y":
                    a = i.prototype.moveYear.call(i.prototype, a, d)
                }
                return e(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), 0)
            }
            var f, m, h, u = a && a.match(this.nonpunctuation) || [],
            a = new Date(0, 0, 0, 0, 0, 0, 0),
            g = {},
            v = ["hh", "h", "ii", "i", "ss", "s", "yyyy", "yy", "M", "MM", "m", "mm", "D", "DD", "d", "dd", "H", "HH", "p", "P"],
            w = {
                hh: function(t, e) {
                    return t.setUTCHours(e)
                },
                h: function(t, e) {
                    return t.setUTCHours(e)
                },
                HH: function(t, e) {
                    return t.setUTCHours(12 == e ? 0 : e)
                },
                H: function(t, e) {
                    return t.setUTCHours(12 == e ? 0 : e)
                },
                ii: function(t, e) {
                    return t.setUTCMinutes(e)
                },
                i: function(t, e) {
                    return t.setUTCMinutes(e)
                },
                ss: function(t, e) {
                    return t.setUTCSeconds(e)
                },
                s: function(t, e) {
                    return t.setUTCSeconds(e)
                },
                yyyy: function(t, e) {
                    return t.setUTCFullYear(e)
                },
                yy: function(t, e) {
                    return t.setUTCFullYear(2e3 + e)
                },
                m: function(t, e) {
                    for (e -= 1; 0 > e;) e += 12;
                    for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() != e;) t.setUTCDate(t.getUTCDate() - 1);
                    return t
                },
                d: function(t, e) {
                    return t.setUTCDate(e)
                },
                p: function(t, e) {
                    return t.setUTCHours(1 == e ? t.getUTCHours() + 12 : t.getUTCHours())
                }
            };
            if (w.M = w.MM = w.mm = w.m, w.dd = w.d, w.P = w.p, a = e(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds()), u.length == s.parts.length) {
                for (var p = 0,
                y = s.parts.length; y > p; p++) {
                    if (f = parseInt(u[p], 10), h = s.parts[p], isNaN(f)) switch (h) {
                    case "MM":
                        m = t(n[o].months).filter(function() {
                            var t = this.slice(0, u[p].length),
                            e = u[p].slice(0, t.length);
                            return t == e
                        }),
                        f = t.inArray(m[0], n[o].months) + 1;
                        break;
                    case "M":
                        m = t(n[o].monthsShort).filter(function() {
                            var t = this.slice(0, u[p].length),
                            e = u[p].slice(0, t.length);
                            return t == e
                        }),
                        f = t.inArray(m[0], n[o].monthsShort) + 1;
                        break;
                    case "p":
                    case "P":
                        f = t.inArray(u[p].toLowerCase(), n[o].meridiem)
                    }
                    g[h] = f
                }
                for (var b, p = 0; p < v.length; p++) b = v[p],
                b in g && !isNaN(g[b]) && w[b](a, g[b])
            }
            return a
        },
        formatDate: function(e, i, s, o) {
            if (null == e) return "";
            var r;
            if ("standard" == o) r = {
                yy: e.getUTCFullYear().toString().substring(2),
                yyyy: e.getUTCFullYear(),
                m: e.getUTCMonth() + 1,
                M: n[s].monthsShort[e.getUTCMonth()],
                MM: n[s].months[e.getUTCMonth()],
                d: e.getUTCDate(),
                D: n[s].daysShort[e.getUTCDay()],
                DD: n[s].days[e.getUTCDay()],
                p: 2 == n[s].meridiem.length ? n[s].meridiem[e.getUTCHours() < 12 ? 0 : 1] : "",
                h: e.getUTCHours(),
                i: e.getUTCMinutes(),
                s: e.getUTCSeconds()
            },
            r.H = 2 == n[s].meridiem.length ? r.h % 12 == 0 ? 12 : r.h % 12 : r.h,
            r.HH = (r.H < 10 ? "0": "") + r.H,
            r.P = r.p.toUpperCase(),
            r.hh = (r.h < 10 ? "0": "") + r.h,
            r.ii = (r.i < 10 ? "0": "") + r.i,
            r.ss = (r.s < 10 ? "0": "") + r.s,
            r.dd = (r.d < 10 ? "0": "") + r.d,
            r.mm = (r.m < 10 ? "0": "") + r.m;
            else {
                if ("php" != o) throw new Error("Invalid format type.");
                r = {
                    y: e.getUTCFullYear().toString().substring(2),
                    Y: e.getUTCFullYear(),
                    F: n[s].months[e.getUTCMonth()],
                    M: n[s].monthsShort[e.getUTCMonth()],
                    n: e.getUTCMonth() + 1,
                    t: a.getDaysInMonth(e.getUTCFullYear(), e.getUTCMonth()),
                    j: e.getUTCDate(),
                    l: n[s].days[e.getUTCDay()],
                    D: n[s].daysShort[e.getUTCDay()],
                    w: e.getUTCDay(),
                    N: 0 == e.getUTCDay() ? 7 : e.getUTCDay(),
                    S: e.getUTCDate() % 10 <= n[s].suffix.length ? n[s].suffix[e.getUTCDate() % 10 - 1] : "",
                    a: 2 == n[s].meridiem.length ? n[s].meridiem[e.getUTCHours() < 12 ? 0 : 1] : "",
                    g: e.getUTCHours() % 12 == 0 ? 12 : e.getUTCHours() % 12,
                    G: e.getUTCHours(),
                    i: e.getUTCMinutes(),
                    s: e.getUTCSeconds()
                },
                r.m = (r.n < 10 ? "0": "") + r.n,
                r.d = (r.j < 10 ? "0": "") + r.j,
                r.A = r.a.toString().toUpperCase(),
                r.h = (r.g < 10 ? "0": "") + r.g,
                r.H = (r.G < 10 ? "0": "") + r.G,
                r.i = (r.i < 10 ? "0": "") + r.i,
                r.s = (r.s < 10 ? "0": "") + r.s
            }
            for (var e = [], l = t.extend([], i.separators), h = 0, d = i.parts.length; d > h; h++) l.length && e.push(l.shift()),
            e.push(r[i.parts[h]]);
            return l.length && e.push(l.shift()),
            e.join("")
        },
        convertViewMode: function(t) {
            switch (t) {
            case 4:
            case "decade":
                t = 4;
                break;
            case 3:
            case "year":
                t = 3;
                break;
            case 2:
            case "month":
                t = 2;
                break;
            case 1:
            case "day":
                t = 1;
                break;
            case 0:
            case "hour":
                t = 0
            }
            return t
        },
        headTemplate: '<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>',
        headTemplateV3: '<thead><tr><th class="prev"><i class="glyphicon glyphicon-arrow-left"></i> </th><th colspan="5" class="switch"></th><th class="next"><i class="glyphicon glyphicon-arrow-right"></i> </th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'
    };
    a.template = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + a.headTemplate + a.contTemplate + a.footTemplate + '</table></div><div class="datetimepicker-hours"><table class=" table-condensed">' + a.headTemplate + a.contTemplate + a.footTemplate + '</table></div><div class="datetimepicker-days"><table class=" table-condensed">' + a.headTemplate + "<tbody></tbody>" + a.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + a.headTemplate + a.contTemplate + a.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + a.headTemplate + a.contTemplate + a.footTemplate + "</table></div></div>",
    a.templateV3 = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + a.headTemplateV3 + a.contTemplate + a.footTemplate + '</table></div><div class="datetimepicker-hours"><table class=" table-condensed">' + a.headTemplateV3 + a.contTemplate + a.footTemplate + '</table></div><div class="datetimepicker-days"><table class=" table-condensed">' + a.headTemplateV3 + "<tbody></tbody>" + a.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + a.headTemplateV3 + a.contTemplate + a.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + a.headTemplateV3 + a.contTemplate + a.footTemplate + "</table></div></div>",
    t.fn.datetimepicker.DPGlobal = a,
    t.fn.datetimepicker.noConflict = function() {
        return t.fn.datetimepicker = old,
        this
    },
    t(document).on("focus.datetimepicker.data-api click.datetimepicker.data-api", '[data-provide="datetimepicker"]',
    function(e) {
        var i = t(this);
        i.data("datetimepicker") || (e.preventDefault(), i.datetimepicker("show"))
    }),
    t(function() {
        t('[data-provide="datetimepicker-inline"]').datetimepicker()
    })
} (window.jQuery),
!
function(t) {
    "use strict";
    var e = function(t, e) {
        this.init("popover", t, e)
    };
    e.prototype = t.extend({},
    t.fn.tooltip.Constructor.prototype, {
        constructor: e,
        setContent: function() {
            var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
            t.find(".popover-title")[this.options.html ? "html": "text"](e),
            t.find(".popover-content")[this.options.html ? "html": "text"](i),
            t.removeClass("fade top bottom left right in")
        },
        hasContent: function() {
            return this.getTitle() || this.getContent()
        },
        getContent: function() {
            var t, e = this.$element,
            i = this.options;
            return t = ("function" == typeof i.content ? i.content.call(e[0]) : i.content) || e.attr("data-content")
        },
        tip: function() {
            return this.$tip || (this.$tip = t(this.options.template)),
            this.$tip
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    });
    var i = t.fn.popover;
    t.fn.popover = function(i) {
        return this.each(function() {
            var n = t(this),
            a = n.data("popover"),
            s = "object" == typeof i && i;
            a || n.data("popover", a = new e(this, s)),
            "string" == typeof i && a[i]()
        })
    },
    t.fn.popover.Constructor = e,
    t.fn.popover.defaults = t.extend({},
    t.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    t.fn.popover.noConflict = function() {
        return t.fn.popover = i,
        this
    }
} (window.jQuery),
function() { !
    function() {
        var t;
        return t = $.fn.popover.Constructor.prototype.setContent,
        $.fn.popover.Constructor.prototype.setContent = function() {
            return t.call(this),
            this.options.onShown ? this.options.onShown(this) : void 0
        }
    } (jQuery)
}.call(this),
function() {
    Maleskine.BaseModule = function() {
        function t(t) {
            var e, i, n;
            this.options = t,
            n = this.options;
            for (e in n) i = n[e],
            this[e] = i;
            this.elements || (this.elements = this.constructor.elements),
            this.events || (this.events = this.constructor.events),
            this.elements && this.refreshElements(),
            this.events && this.delegateEvents(this.events)
        }
        return t.prototype.eventSplitter = /^(\S+)\s*(.*)$/,
        t.prototype.refreshElements = function() {
            var t, e, i, n;
            i = this.elements,
            n = [];
            for (t in i) e = i[t],
            n.push(this[e] = this.$(t));
            return n
        },
        t.prototype.delegateEvents = function(t) {
            var e, i, n, a, s, o;
            o = [];
            for (i in t) {
                if (a = t[i], "function" == typeof a) a = function(t) {
                    return function(e) {
                        return function() {
                            return e.apply(t, arguments),
                            !0
                        }
                    }
                } (this)(a);
                else {
                    if (!this[a]) throw new Error("" + a + " doesn't exist");
                    a = function(t) {
                        return function(e) {
                            return function() {
                                return t[e].apply(t, arguments),
                                !0
                            }
                        }
                    } (this)(a)
                }
                n = i.match(this.eventSplitter),
                e = n[1],
                s = n[2],
                o.push("" === s ? this.el.bind(e, a) : this.el.delegate(s, e, a))
            }
            return o
        },
        t.prototype.$ = function(t) {
            return $(t, this.el)
        },
        t.prototype.notyInfo = function(t) {
            return noty({
                text: t,
                layout: "topCenter",
                type: "information",
                timeout: 2200,
                theme: "maleskineTheme"
            })
        },
        t.prototype.notyError = function(t) {
            return noty({
                text: t,
                layout: "topCenter",
                type: "error",
                timeout: 3500,
                theme: "maleskineTheme"
            })
        },
        t.prototype.setCookie = function(t, e) {
            return Maleskine.Utils.setCookie(t, e)
        },
        t.prototype.infiniteScroll = function() {
            return $(".pagination").length || $("#list-container .load-more").length > 0 ? ($(window).scroll(function() {
                var t, e;
                if (t = $(document).height() / $(window).height() * ($(window).height() / 3), $(".pagination").length > 0) {
                    if (e = $(".pagination .next").children("a").attr("href"), e && $(window).scrollTop() > $(document).height() - $(window).height() - t) return $(".pagination").text(""),
                    $.getScript(e)
                } else if ($("#list-container .load-more").length > 0 && (e = $("#list-container .load-more .ladda-button").data("url"), e && $(window).scrollTop() > $(document).height() - $(window).height() - t)) return $("#list-container .load-more").text(""),
                $.getScript(e)
            }), $(window).scroll()) : void 0
        },
        t.prototype.getURLParmeter = function(t) {
            var e, i, n, a, s, o;
            for (e = window.location.search.substring(1), n = e.split("&"), s = 0, o = n.length; o > s; s++) if (a = n[s], i = a.split("="), i[0] === t) return i[1];
            return ""
        },
        t.prototype.scrollToAnchor = function(t) {
            var e;
            return e = $("#" + t),
            "undefined" != typeof e.offset() ? $("html, body").animate({
                scrollTop: e.offset().top
            },
            1e3) : void 0
        },
        t
    } ()
}.call(this),
function() {
    Maleskine.AuthorCard = {
        cachedCards: {},
        authorElementSelector: ".maleskine-author",
        authorCardPath: function(t) {
            return "/users/" + t + "/author_card"
        },
        loadingHtml: "<img src='" + Maleskine.CommonImages.loader("tiny") + "' class='loading loader-tiny'>",
        clearCachedCard: function(t) {
            return Maleskine.AuthorCard.cachedCards[t] = null
        },
        setCurrentCard: function(t) {
            return null != Maleskine.AuthorCard.currentCard && (clearInterval(Maleskine.AuthorCard.currentCard.timeoutHandle), Maleskine.AuthorCard.currentCard = null),
            Maleskine.AuthorCard.currentCard = {},
            Maleskine.AuthorCard.currentCard.authorElement = t,
            Maleskine.AuthorCard.currentCard.slug = t.data("user-slug"),
            Maleskine.AuthorCard.currentCard.timeoutHandle = setInterval(Maleskine.AuthorCard.checkCard, 400)
        },
        isCurrentCard: function(t) {
            return null != Maleskine.AuthorCard.currentCard && Maleskine.AuthorCard.currentCard.authorElement === t ? !0 : !1
        },
        checkCard: function() {
            var t, e;
            return null == Maleskine.AuthorCard.currentCard || (t = Maleskine.AuthorCard.currentCard.authorElement, e = $(".popover"), t.is(":hover") || e.is(":hover")) ? void 0 : Maleskine.AuthorCard.closeCurrentCard()
        },
        closeCurrentCard: function() {
            var t;
            return null != Maleskine.AuthorCard.currentCard ? (t = Maleskine.AuthorCard.currentCard.authorElement, t.popover("hide"), clearInterval(Maleskine.AuthorCard.currentCard.timeoutHandle), Maleskine.AuthorCard.currentCard = null, t.popover("destroy")) : void 0
        },
        initAuthorCards: function() {
            return $("body").on("mouseenter", ".popover .following a",
            function() {
                return $(this).addClass("unfollow").html("<i class='fa fa-times'></i>" + I18n.t("reading.unfollow"))
            }),
            $("body").on("mouseleave", ".popover .following a",
            function() {
                return $(this).removeClass("unfollow").html("<i class='fa fa-check'></i>" + I18n.t("reading.following"))
            }),
            $("body").on("mouseenter", Maleskine.AuthorCard.authorElementSelector,
            function(t) {
                var e, i, n, a;
                return e = $(t.currentTarget),
                a = e.data("user-slug"),
                Maleskine.AuthorCard.isCurrentCard(e) ? void 0 : (Maleskine.AuthorCard.closeCurrentCard(), i = Maleskine.AuthorCard.cardContent(e), n = e.data("placement") || "bottom", e.popover({
                    trigger: "manual",
                    html: !0,
                    content: i,
                    placement: n,
                    container: "body"
                }), e.popover("show"), Maleskine.AuthorCard.setCurrentCard(e))
            })
        },
        cardContent: function(t) {
            var e;
            return e = t.data("user-slug"),
            null != Maleskine.AuthorCard.cachedCards[e] ? Maleskine.AuthorCard.cachedCards[e] : (Maleskine.AuthorCard.loadContent(t), Maleskine.AuthorCard.loadingHtml)
        },
        loadContent: function(t) {
            var e;
            return e = t.data("user-slug"),
            $.get(this.authorCardPath(e),
            function() {
                return function(i) {
                    var n, a;
                    return Maleskine.AuthorCard.cachedCards[e] = i,
                    Maleskine.AuthorCard.isCurrentCard(t) && ($(".popover-content").html(i), "left" === t.data("placement")) ? (n = $(".popover").outerHeight() / 2 - 29, a = $(".popover").offset().top - n, $(".popover").css("top", a)) : void 0
                }
            } (this))
        }
    }
}.call(this),
function() { !
    function(t) {
        return t.fn.ajaxTab = function() {
            var e, i, n;
            return n = t(this),
            e = t(n.data("container")),
            i = n.find(n.data("loader")),
            null != e ? n.on("click", "li > a",
            function(n) {
                var a, s;
                return s = t(this).attr("href"),
                a = t(t(this).parent()),
                a.hasClass("disabled") || a.hasClass("active") ? n.preventDefault() : (n.preventDefault(), a.siblings().removeClass("active"), a.addClass("active"), t.ajax({
                    url: s,
                    type: "GET",
                    dataType: "html",
                    beforeSend: function() {
                        return function(t) {
                            return i.show(),
                            t.setRequestHeader("X-PJAX", "true")
                        }
                    } (this),
                    success: function() {
                        return function(t) {
                            return i.hide(),
                            e.html(t),
                            Maleskine.Utils.initModulesInElement(e),
                            Maleskine.Utils.initLaddaButton(e),
                            e.find("a[data-toggle=tooltip]").tooltip()
                        }
                    } (this)
                }))
            }) : void 0
        }
    } (jQuery)
}.call(this),
function(t) {
    t.fn.downloadApp = function() {
        return this.on("click",
        function() {
            var t = navigator.userAgent.toLowerCase();
            /android/.test(t) && (window.location = t.match(/micromessenger|qq|mqqbrowser/) ? "http://a.app.qq.com/o/simple.jsp?pkgname=com.jianshu.haruki": "http://downloads.jianshu.io/apps/haruki/JianShu-1.6.2.apk"),
            /iphone|ipad|ipod/.test(t) && (window.location = t.match(/micromessenger|qq|mqqbrowser/) ? "http://a.app.qq.com/o/simple.jsp?pkgname=com.jianshu.haruki": "https://itunes.apple.com/cn/app/jian-shu/id888237539?ls=1&mt=8")
        }),
        this
    }
} (jQuery),
function() {
    $(document).on("ajax:success", "a[data-mcomponent=easy-bookmark]",
    function(t, e) {
        var i;
        return i = $(t.currentTarget),
        e.bookmarked ? (i.removeClass("bookmark").addClass("bookmarked"), $(t.currentTarget).html("<i class='fa fa-bookmark'></i><span>" + I18n.t("reading.bookmark") + "</span>"), (new Maleskine.BaseModule).notyInfo(I18n.t("reading.bookmarked"))) : (i.removeClass("bookmarked").addClass("bookmark"), $(t.currentTarget).html("<i class='fa fa-bookmark-o'></i><span>" + I18n.t("reading.bookmark") + "</span>"), (new Maleskine.BaseModule).notyInfo(I18n.t("reading.unbookmarked")))
    })
}.call(this),
function() {
    $(document).on("ajax:success", "a[data-mcomponent=easy-like]",
    function(t, e) {
        return $(t.currentTarget).html("<i class='" + (e.liked ? "fa fa-heart": "fa fa-heart-o") + "'></i>" + e.liked_count)
    })
}.call(this),
function() {
    $(function() {
        return Maleskine.BrowserDetector.isNotIE8NorIE9() ? void 0 : $("[placeholder]").focus(function() {
            var t;
            return t = $(this),
            t.val() === t.attr("placeholder") ? (t.val(""), t.removeClass("placeholder")) : void 0
        }).blur(function() {
            var t;
            return t = $(this),
            "" === t.val() || t.val() === t.attr("placeholder") ? (t.addClass("placeholder"), t.val(t.attr("placeholder"))) : void 0
        }).blur()
    })
}.call(this),
function() {
    $(function() {
        var t, e, i;
        return Maleskine.BrowserDetector.isNotIE8NorIE9() ? (e = /\?imageView2\/\d\/\w\/\d{2,}\/\w\/\w{1,3}/gi, t = $("#show-note-container"), i = $("div.image-package"), i.map(function() {
            return function(n) {
                var a, s, o, r;
                return n = $(i[n]),
                n.hasClass("imagebubble-backmask") || (a = n.attr("widget"), "ImageBubble" === a) ? void 0 : (n.attr("widget", "ImageBubble"), o = n.find("img"), s = n.find(".image-caption"), a = s.html(), a || (a = o.attr("alt"), s.html(a)), o.data("title", a), r = o.attr("data-original-src"), r || (r = o.attr("src"), r = r.replace(e, "")), o.attr("data-original-src", r), n.imageBubble({
                    container: t,
                    showMenu: !1,
                    viewport: function(t) {
                        var e, i;
                        return i = $(window),
                        e = {
                            top: 0,
                            left: 0,
                            width: i.width(),
                            height: i.height()
                        },
                        e.bottom = e.top + e.height,
                        e.right = e.left + e.width,
                        e.top < t.top && (e.top = t.top),
                        e.bottom > t.bottom && (e.bottom = t.bottom),
                        e.left < t.left && (e.left = t.left),
                        e.right > t.right && (e.right = t.right),
                        e.width = e.right - e.left,
                        e.height = e.bottom - e.top,
                        e
                    },
                    callbacks: {
                        show: function() {
                            return s.css({
                                opacity: 0
                            })
                        },
                        hide: function() {
                            return s.css({
                                opacity: 1
                            })
                        }
                    }
                }))
            }
        } (this))) : void 0
    })
}.call(this),
function() { !
    function(t) {
        return t.fn.pjaxTab = function(e) {
            var i, n, a, s, o, r;
            return o = e || {},
            a = t(this),
            r = a.data("loader"),
            s = a.data("container"),
            i = t(s),
            n = a.find(r),
            null != i ? (a.pjax("li:not(.disabled) > a[data-pjax]", s), i.on("pjax:beforeSend",
            function() {
                return function(e, i) {
                    return n.length > 0 && n.show(),
                    t.isFunction(o.beforeSend) ? o.beforeSend(e, i) : void 0
                }
            } (this)), i.on("pjax:success",
            function() {
                return function(e, s, l, h) {
                    return Maleskine.Utils.initModulesInElement(i),
                    Maleskine.Utils.initLaddaButton(i),
                    i.find("a[data-toggle=tooltip]").tooltip(),
                    n = a.find(r),
                    t.isFunction(o.success) ? o.success(e, s, l, h) : void 0
                }
            } (this)), i.on("pjax:complete",
            function() {
                return function(e, i, a) {
                    return n.length > 0 && n.hide(),
                    t.isFunction(o.complete) ? o.complete(e, i, a) : void 0
                }
            } (this)), a.on("click", "li > a[data-pjax]",
            function() {
                var e, i;
                return i = t(this).attr("href"),
                e = t(t(this).parent()),
                e.hasClass("disabled") ? void 0 : (e.siblings().removeClass("active"), e.addClass("active"))
            })) : void 0
        }
    } (jQuery)
}.call(this),
function() { !
    function(t) {
        return t.fn.toggleHeader = function(e, i) {
            var n, a, s, o, r, l;
            return n = t(this),
            s = !1,
            r = 0,
            a = 5,
            l = n.outerHeight(),
            t(window).scroll(function() {
                return s = !0
            }),
            setInterval(function() {
                return s ? (o(), s = !1) : void 0
            },
            150),
            o = function() {
                var s;
                return s = t(this).scrollTop(),
                Math.abs(r - s) <= a ? void 0 : (s > r && s > l ? (n.addClass(e), t(i).modal("hide")) : s + t(window).height() < t(document).height() && n.removeClass(e), r = s)
            }
        }
    } (jQuery)
}.call(this),
function() { !
    function(t) {
        var e, i;
        return i = {
            allowMultiple: !1,
            globalDrop: !1,
            dropZone: null,
            send: function() {}
        },
        e = function() {
            function t(t) {
                var e, i;
                for (i in t) e = t[i],
                null != e && (this[i] = e)
            }
            return t
        } (),
        e.prototype = i,
        t.fn.imageUpload = function(t) {
            return t = new e(t),
            this.attr("multiple", t.allowMultiple),
            this.on("change",
            function() {
                return function(e) {
                    var i, n, a, s, o;
                    if (e.preventDefault(), e.stopPropagation(), n = [], t.allowMultiple) for (o = e.target.files, a = 0, s = o.length; s > a; a++) i = o[a],
                    n.push(i);
                    else n.push(e.target.files[0]);
                    return t.send(n)
                }
            } (this)),
            Modernizr.draganddrop && (t.globalDrop === !0 && (window.ondrop = function() {
                return function(e) {
                    var i, n, a, s, o;
                    if (e.preventDefault(), e.stopPropagation(), n = [], t.allowMultiple) for (o = e.dataTransfer.files, a = 0, s = o.length; s > a; a++) i = o[a],
                    n.push(i);
                    else n.push(e.dataTransfer.files[0]);
                    return t.send(n)
                }
            } (this)), null != t.dropZone && t.dropZone.on("drop",
            function() {
                return function(e) {
                    var i, n, a, s, o;
                    if (t.dropZone.focus(), e.preventDefault(), e.stopPropagation(), n = [], t.allowMultiple) for (o = e.originalEvent.dataTransfer.files, a = 0, s = o.length; s > a; a++) i = o[a],
                    n.push(i);
                    else n.push(e.originalEvent.dataTransfer.files[0]);
                    return t.send(n)
                }
            } (this))),
            this
        }
    } (jQuery)
}.call(this),
function() {
    var t, e, i;
    i = ["keyup", !1, "blur", !1, "focus", !1, "drop", !0, "change", !1, "input", !1, "textInput", !1, "paste", !0, "cut", !0, "copy", !0, "contextmenu", !0],
    Maleskine.BrowserDetector.isIE() || (t = document.createElement("input"), e = "oninput" in t, e || (t.setAttribute("oninput", "return;"), e = "function" == typeof t.oninput), t = null, e && (i = ["input", !1, "textInput", !1])),
    $.fn.userChange = function(t, e) {
        var n;
        return n = function(i, a) {
            var s, o, r;
            return o = this,
            r = $(this),
            this.value !== r.data("priorValue") ? (r.data("priorValue", this.value), t.call(this, i, e)) : a ? (s = $.extend({},
            i), setTimeout(function() {
                return n.call(o, s, !1)
            },
            1)) : void 0
        },
        this.each(function() {
            var t, e, a;
            for (e = $(this).data("priorValue", this.value), t = 0, a = []; t < i.length;) !
            function(t) {
                return e.on(i[t],
                function(e) {
                    return n.call(this, e, i[t + 1])
                })
            } (t),
            a.push(t += 2);
            return a
        })
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/collection_submissions/reject"] = function(t) {
        var e = '<form accept-charset="UTF-8" action="/collection_submissions/' + (t.collectionSubmissionId || "").toString().encodeHTML() + '/reject" data-remote="true" method="post"> <div class="modal-header"> <b>' + (I18n.t("reading.reject.title") || "").toString().encodeHTML() + '</b> </div> <div class="modal-body"> <p>' + (I18n.t("reading.reject.description") || "").toString().encodeHTML() + '</p> <textarea id="content" name="content" placeholder="' + (I18n.t("reading.reject.placeholder") || "").toString().encodeHTML() + '"></textarea> </div> <div class="modal-footer"> <button class="btn" data-dismiss="modal" aria-hidden="true">' + (I18n.t("reading.reject.close") || "").toString().encodeHTML() + '</button> <input class="btn btn-info" name="commit" type="submit" value="' + (I18n.t("reading.reject.submit") || "").toString().encodeHTML() + '"> </div></form>';
        return e
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/comment/footer"] = function(t) {
        var e = "";
        return t.currentUser ? (e += " ", t.currentUser.id == t.comment.userId ? e += ' <a class="delete pull-right" data-confirm="' + (I18n.t("reading.comment.delete_confirm") || "").toString().encodeHTML() + '" data-method="delete" data-remote="true" href="' + (Routes.note_comment_path(t.note.id, t.comment.id) || "").toString().encodeHTML() + '" rel="nofollow"> <i class="fa fa-times"></i>' + (I18n.t("reading.comment.delete_button") || "").toString().encodeHTML() + " </a> ": t.currentUser.id == t.noteAuthor.id && (e += ' <a class="dismiss pull-right" data-method="post" data-remote="true" data-type="json" href="' + (Routes.dismiss_comment_path(t.comment.id) || "").toString().encodeHTML() + '" rel="nofollow"> <i class="fa fa-times"></i>' + (I18n.t("reading.comment.dismiss_button") || "").toString().encodeHTML() + " </a> "), e += " ", t.blocking || (e += ' <a class="reply pull-right" data-nickname="' + (t.comment.userName || "").toString().encodeHTML() + '" href="javascript:void(null)"> <i class="fa fa-reply"></i>' + (I18n.t("reading.comment.reply_button") || "").toString().encodeHTML() + " </a> ", t.currentUser.id != t.comment.userId && (e += ' <div class="dropdown pull-right report"> <a class="report_comment pull-right" href="#" data-toggle="dropdown"> <i class="fa fa-flag-o"></i>' + (I18n.t("reading.abuse_report.report") || "").toString().encodeHTML() + ' </a> <ul class="dropdown-menu arrow-top"> <li> <a href="' + (Routes.abuse_reports_path({
            abuse_report: {
                abuse_reportable_id: t.comment.id,
                abuse_reportable_type: "Comment",
                type: "ad"
            }
        }) || "").toString().encodeHTML() + '" data-type="json" data-method="post" data-remote="true"> ' + (I18n.t("reading.abuse_report.ad") || "").toString().encodeHTML() + ' </a> </li> <li><a href="" data-toggle="modal" data-id="' + (t.comment.id || "").toString().encodeHTML() + '" data-type="Comment">' + (I18n.t("reading.abuse_report.other") || "").toString().encodeHTML() + "</a></li> </ul> </div> "), e += " ")) : e += ' <a class="reply pull-right" data-toggle="modal" href="#login-modal"><i class="fa fa-reply"></i>' + (I18n.t("reading.comment.reply_button") || "").toString().encodeHTML() + "</a>",
        e
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/comment/paginator"] = function(t) {
        var e = '<div class="pagination clearfix"><ul>';
        t.current_page > 1 && (e += '<li class="next"><a href="javascript:void(null)" data-page="' + (t.current_page - 1) + '" rel="last"><i class="fa fa-angle-left"></i></a></li>');
        for (var i = 1; i <= t.total_pages; i++) i == t.current_page && (e += '<li class="active"><a href="javascript:void(null)">' + (i || "").toString().encodeHTML() + "</a></li>"),
        i != t.current_page && (e += '<li class=""><a href="javascript:void(null)" data-page="' + i + '" >' + (i || "").toString().encodeHTML() + "</a></li>");
        return t.current_page < t.total_pages && (e += '<li class="next"><a href="javascript:void(null)" data-page="' + (t.current_page + 1) + '" rel="next"><i class="fa fa-angle-right"></i></a></li>'),
        e += "</ul></div>"
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/comment/timeline_comments_item"] = function(t) {
        var e = '<p><a href="' + (t.user.url || "").toString().encodeHTML() + '" class="author-avatar" data-toggle="tooltip" data-placement="left" data-original-title="' + (t.user.name || "").toString().encodeHTML() + '" target="_blank"><img src="' + (t.user.image || "").toString().encodeHTML() + '" /></a>' + t.content;
        return t.can_reply && (e += ' <a href="javascript:void(null)" class="reply" data-nickname="' + (t.user.name || "").toString().encodeHTML() + '">' + (I18n.t("reading.timeline.reply") || "").toString().encodeHTML() + "</a>"),
        Maleskine.currentUserSlug == t.user.slug && (e += '<a href="javascript:void(null)" class="delete" data-destroy-url="' + t.destroy_url + '">' + (I18n.t("reading.timeline.delete") || "").toString().encodeHTML() + "</a>"),
        e += "</p>"
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/common/captcha"] = function(t) {
        var e = '<input id="captcha_key" name="captcha_key" type="hidden" value="' + (t.captcha_key || "").toString().encodeHTML() + '">';
        return t.skip_captcha || (e += ' <input id="captcha" name="captcha" placeholder="' + (I18n.t("reading.captcha.placeholder") || "").toString().encodeHTML() + '" type="text"> <a href="javascript:void(null)" class="refresh_captcha"> <img alt="captcha img" src="' + (t.captcha_image_url || "").toString().encodeHTML() + '"> </a> <p class="text-right"><a href="javascript:void(null)" class="refresh_captcha">' + (I18n.t("reading.captcha.refresh_button") || "").toString().encodeHTML() + "</a></p>"),
        e
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/note/collection"] = function(t) {
        var e = "",
        i = t.collections;
        if (i) for (var n, a = -1,
        s = i.length - 1; s > a;) n = i[a += 1],
        e += ' <li id="collection_' + (n.id || "").toString().encodeHTML() + '" class="' + (n.has_note ? "approved": "").toString().encodeHTML() + '"> ',
        e += n.has_note ? ' <a href="javascript:void(null)" class="add"> <div class="avatar"> <img alt="' + (n.image_file_name || "").toString().encodeHTML() + '" src="' + (n.image_source || "").toString().encodeHTML() + '" thumbnail="180x180"> </div> <h5> ' + (n.title || "").toString().encodeHTML() + " " + (I18n.t("reading.notes.show.contribute_status.approved") || "").toString().encodeHTML() + " </h5> <small>" + (n.owner_name || "").toString().encodeHTML() + (I18n.t("reading.bian") || "").toString().encodeHTML() + '</small> </a> <a href="' + (Routes.collection_note_path(n.collection_note_id, {
            collection_id: n.id
        }) || "").toString().encodeHTML() + '" class="delete" data-method="delete" data-remote="true" rel="nofollow">' + (I18n.t("reading.remove") || "").toString().encodeHTML() + "</a> ": ' <a href="' + (Routes.collection_notes_path({
            note_id: t.note_id,
            collection_id: n.id
        }) || "").toString().encodeHTML() + '" class="add" data-method="post" data-remote="true" rel="nofollow"> <div class="avatar"> <img alt="' + (n.image_file_name || "").toString().encodeHTML() + '" src="' + (n.image_source || "").toString().encodeHTML() + '" thumbnail="180x180"> </div> <h5>' + (n.title || "").toString().encodeHTML() + "</h5> <small>" + (n.owner_name || "").toString().encodeHTML() + (I18n.t("reading.bian") || "").toString().encodeHTML() + "</small> </a> ",
        e += " </li>";
        return e
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/note/further_reading_content"] = function(t) {
        var e = '<div id="further-reading-form" class="active"> <i class="fa fa-plus-circle"></i> <div id="reading-info" class="reading-info"> <h6 id="further-reading-title" contenteditable="true" placeholder="' + (I18n.t("reading.further_reading.title_placeholder") || "").toString().encodeHTML() + '">' + (t.data.title || "").toString().encodeHTML() + '</h6> \u2009\u2014\u2009 <span id="further-reading-description" contenteditable="true" placeholder="' + (I18n.t("reading.further_reading.description_placeholder") || "").toString().encodeHTML() + '">' + (t.data.description || "").toString().encodeHTML() + '</span> </div> <div id="reading-footer"> <p class="article-origin"> <span><a href="' + (Routes.user_path(t.slug) || "").toString().encodeHTML() + '" target="_blank">' + (t.nickname || "").toString().encodeHTML() + '</a>\u30fb <a id="further-reading-url" href="' + (t.data.url || "").toString().encodeHTML() + '" target="_blank">' + (t.data.host || "").toString().encodeHTML() + '</a></span> </p> </div> <a id="submit-further-reading" class="btn-link left">' + (I18n.t("reading.further_reading.button.save") || "").toString().encodeHTML() + '</a> <a id="cancel-further-reading" class="btn-link">' + (I18n.t("reading.further_reading.button.cancel") || "").toString().encodeHTML() + "</a></div>";
        return e
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/note/further_reading_item"] = function(t) {
        var e = '<li id="further_reading_' + (t.id || "").toString().encodeHTML() + '" data-can-be-dismissed="' + (t.can_be_dismissed || "").toString().encodeHTML() + '"> <a class="reading-title" href="' + (t.url || "").toString().encodeHTML() + '"> <h6>' + (t.title || "").toString().encodeHTML() + "</h6> ";
        return t.description && (e += " \u2014 " + (t.description || "").toString().encodeHTML() + " "),
        e += ' </a> <div class="article-origin"> <a href="' + (Routes.user_path(t.user_slug) || "").toString().encodeHTML() + '">' + (t.user_name || "").toString().encodeHTML() + '</a>\u30fb <a href="' + (t.url || "").toString().encodeHTML() + '"> ',
        e += t.fr_author ? " " + (t.host || "").toString().encodeHTML() + " ": " " + (t.host || "").toString().encodeHTML() + " \u2192 ",
        e += " </a> ",
        t.fr_author && (e += ' \u30fb <a id="delete-further-reading" data-further-reading-id="' + (t.id || "").toString().encodeHTML() + '" href="javascript:void(null)"> ' + (I18n.t("reading.further_reading.button.delete") || "").toString().encodeHTML() + " </a> "),
        e += " ",
        t.note_author ? e += " " + JST.render("note/further_reading_states", {
            id: t.id,
            state: t.state,
            can_be_dismissed: t.can_be_dismissed
        }) + " ": "private" == t.state && (e += ' <a href="javascript:void(null)" class="reading-states"><i class="fa fa-eye-slash"></i>' + (I18n.t("reading.further_reading.states.private") || "").toString().encodeHTML() + "</a> "),
        e += " </div></li>"
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/note/further_reading_link"] = function() {
        var t = '<div id="further-reading-form" class="active"> <i class="fa fa-plus-circle"></i> <span id="further-reading-link-text" class="reading-link-text placeholder" contenteditable="true" placeholder="' + (I18n.t("reading.further_reading.link_text_placeholder") || "").toString().encodeHTML() + '"></span> <img alt="Loader-tiny" class="hide loader-tiny" id="loader" src="' + Maleskine.CommonImages.loader("tiny") + '"> <br> <a id="load-further-reading" class="btn-link">' + (I18n.t("reading.further_reading.button.load") || "").toString().encodeHTML() + '</a> <a id="cancel-further-reading" class="btn-link">' + (I18n.t("reading.further_reading.button.cancel") || "").toString().encodeHTML() + "</a></div>";
        return t
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/note/further_reading_states"] = function(t) {
        var e = '<ul class="unstyled edit further-reading-states" data-origin-state="' + (t.state || "").toString().encodeHTML() + '" data-further-reading-id="' + (t.id || "").toString().encodeHTML() + '"> ';
        return "private" == t.state ? (e += ' <li><a href="javascript:void(null)"><i class="fa fa-eye-slash"></i>' + (I18n.t("reading.further_reading.states.private") || "").toString().encodeHTML() + '</a></li> <li class="hide state-item" data-state="public"> <a href="javascript:void(null)"><i class="fa fa-users"></i>' + (I18n.t("reading.further_reading.states.public") || "").toString().encodeHTML() + "</a> </li> ", t.can_be_dismissed && (e += ' <li class="hide state-item" data-state="dismiss"> <a href="javascript:void(null)"><i class="fa fa-times"></i>' + (I18n.t("reading.further_reading.states.dismiss") || "").toString().encodeHTML() + "</a> </li> "), e += " ") : "public" == t.state ? (e += ' <li><a href="javascript:void(null)"><i class="fa fa-users"></i>' + (I18n.t("reading.further_reading.states.public") || "").toString().encodeHTML() + '</a></li> <li class="hide state-item" data-state="private"> <a href="javascript:void(null)"><i class="fa fa-eye-slash"></i> ' + (I18n.t("reading.further_reading.states.private") || "").toString().encodeHTML() + "</a> </li> ", t.can_be_dismissed && (e += ' <li class="hide state-item" data-state="dismiss"> <a href="javascript:void(null)"><i class="fa fa-times"></i>' + (I18n.t("reading.further_reading.states.dismiss") || "").toString().encodeHTML() + "</a> </li> "), e += " ") : e += ' <li><a href="javascript:void(null)"><i class="fa fa-times"></i>' + (I18n.t("reading.further_reading.states.dismiss") || "").toString().encodeHTML() + '</a></li> <li class="hide state-item" data-state="private"> <a href="javascript:void(null)"><i class="fa fa-eye-slash"></i> ' + (I18n.t("reading.further_reading.states.private") || "").toString().encodeHTML() + '</a> </li> <li class="hide state-item" data-state="public"> <a href="javascript:void(null)"><i class="fa fa-users"></i>' + (I18n.t("reading.further_reading.states.public") || "").toString().encodeHTML() + "</a> </li> ",
        e += "</ul>"
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/note/reward_info"] = function(t) {
        var e = "";
        return t.note.rewards_total_count > 0 && (e += '<p class="payment-list"> <span class="rewards_total_count">' + (t.note.rewards_total_count || "").toString().encodeHTML() + "</span> " + (I18n.t("reading.notes.show.reward.info") || "").toString().encodeHTML() + "</p>"),
        e
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/social/share_buttons"] = function(t) {
        var e = "<h1>" + (t.title || "").toString().encodeHTML() + "</h1>";
        return e
    }
}.call(this),
function() {
    this.JST || (this.JST = {}),
    this.JST["reading/templates/social/timeline_comments"] = function() {
        var t = "";
        return t
    }
}.call(this),
function() {
    $(function() {
        var t, e, i, n, a;
        return Maleskine.currentUserSlug = $("#current_user_slug").attr("value"),
        JST.render = function(t, e) {
            return JST["reading/templates/" + t](e)
        },
        $(".modal").on("shown",
        function() {
            return $(this).hasClass("fullscreen") ? $(".modal-backdrop").css("background", "#FFF").css("opacity", 1) : void 0
        }),
        a = Maleskine.BrowserDetector.isMobile() ? "touchend": "click",
        $(".set-view-mode").on(a,
        function() {
            var t;
            return t = $(this),
            t.hasClass("daytime") ? (Maleskine.Utils.setNight(), t.removeClass("daytime").addClass("nighttime").html('<i class="fa fa-sun-o">')) : (Maleskine.Utils.setDay(), t.removeClass("nighttime").addClass("daytime").html('<i class="fa fa-moon-o">'))
        }),
        $.support.pjax && ($.pjax.defaults.timeout = !1),
        I18n.defaultLocale = "zh-CN",
        I18n.locale = $("body").data("locale"),
        $(".shutdown").length > 0 && (n = $(".shutdown").data("notice-id"), $.cookie("hide_notice") !== n && ($(".shutdown > i").click(function() {
            return $.cookie("hide_notice", n, {
                path: "/"
            }),
            $(".shutdown").slideToggle()
        }), $(".shutdown").slideToggle())),
        Maleskine.Utils.initLaddaButton($("body")),
        $("input[type=checkbox]").iCheck({
            checkboxClass: "icheckbox_minimal"
        }),
        $("input[type=radio]").iCheck({
            radioClass: "iradio_minimal"
        }),
        Maleskine.BrowserDetector.lessThanIE8() && (i = $("<div id='ie-alert'></div>"), i.append('<div class="mock"></div><div class="content"></div>'), i.find(".content").append('<h2><span class="exclamation-circle">!</span>' + I18n.t("ie_warning.title") + "</h2>"), i.find(".content").append("<br />"), i.find(".content").append('<p class="show-link"> ' + I18n.t("ie_warning.upgrade_ie") + "<br />" + I18n.t("ie_warning.use_chrome") + "</p>"), i.find(".content").append('<p class="skip"><a href="javascript:void(null);" onclick="$(\'#ie-alert\').remove();">' + I18n.t("ie_warning.skip") + "</a></p>"), $("body").prepend(i)),
        $("img[lazy-avatar]").length > 0 && $(window).on("load",
        function() {
            var t, e, i, n, a;
            for (n = $("img[lazy-avatar]"), a = [], e = 0, i = n.length; i > e; e++) t = n[e],
            a.push($(t).attr("src", $(t).attr("lazy-avatar")));
            return a
        }),
        $("select[data-enable-select2]").length > 0 && ($("select[data-enable-select2]").data("old-val", $("select[data-enable-select2]").val()), $("select[data-enable-select2]").select2().on("change",
        function() {
            var t, e, i, n, a, s, o, r;
            for (a = $(this).data("old-val") || [], n = $(this).val() || [], e = null, a.length > n.length ? (t = a, s = n) : (s = a, t = n), o = 0, r = t.length; r > o; o++) if (i = t[o], s.indexOf(i) < 0) {
                e = i;
                break
            }
            return $.post($(this).data("update_url"), {
                collection_id: e
            }),
            $("select[data-enable-select2]").data("old-val", $("select[data-enable-select2]").val())
        })),
        $("a[data-toggle=tooltip]").tooltip(),
        e = $("#flash"),
        t = $("#error_explanation ul > li"),
        e.length > 0 && $.each(e.children(),
        function() {
            return function(t, e) {
                var i, n, a;
                return a = $(e).data("flash-type"),
                n = "notice" === a ? "information": "error",
                i = "notice" === a ? 2200 : 3500,
                $.each($(e).children(),
                function(t, e) {
                    return noty({
                        text: $(e).text(),
                        layout: "topCenter",
                        type: n,
                        timeout: i,
                        theme: "maleskineTheme"
                    })
                })
            }
        } (this)),
        t.length > 0 && $.each(t,
        function() {
            return function(t, e) {
                return noty({
                    text: $(e).text(),
                    layout: "topCenter",
                    type: "error",
                    timeout: 3e3,
                    theme: "maleskineTheme"
                })
            }
        } (this)),
        Maleskine.Utils.initModulesInElement($(document)),
        Maleskine.BrowserDetector.isIE8() || Maleskine.AuthorCard.initAuthorCards(),
        Maleskine.Utils.initFollowButtonEvents($("body"))
    })
}.call(this),
function() {
    var t = {}.hasOwnProperty,
    e = function(e, i) {
        function n() {
            this.constructor = e
        }
        for (var a in i) t.call(i, a) && (e[a] = i[a]);
        return n.prototype = i.prototype,
        e.prototype = new n,
        e.__super__ = i.prototype,
        e
    };
    Maleskine.ViewModeModal = function(t) {
        function i() {
            i.__super__.constructor.apply(this, arguments),
            this.bgButtons.on("click",
            function(t) {
                return function(e) {
                    var i;
                    return i = $(e.currentTarget),
                    $("body").removeClass("reader-day-mode").removeClass("reader-night-mode").addClass("reader-" + i.data("mode") + "-mode"),
                    i.siblings().removeClass("active"),
                    i.addClass("active"),
                    i.find("i").addClass("active"),
                    t.setCookie("read_mode", i.data("mode"))
                }
            } (this)),
            this.fontButtons.on("click",
            function(t) {
                return function(e) {
                    var i;
                    return i = $(e.currentTarget),
                    $("body").removeClass("reader-font1").removeClass("reader-font2").addClass("reader-" + i.data("font")),
                    i.siblings().removeClass("active"),
                    i.addClass("active"),
                    t.setCookie("default_font", i.data("font"))
                }
            } (this)),
            this.localeButtons.on("click",
            function(t) {
                return function(e) {
                    var i;
                    return i = $(e.currentTarget),
                    "javascript:void(null);" === i.prop("href") ? (t.setCookie("locale", i.data("locale")), location.reload()) : setTimeout(function() {
                        return location.reload()
                    },
                    200)
                }
            } (this))
        }
        return e(i, t),
        i.prototype.elements = {
            "div.change-background > a": "bgButtons",
            "div.change-font > a": "fontButtons",
            "div.change-locale > a": "localeButtons"
        },
        i
    } (Maleskine.BaseModule)
}.call(this),
function() {
    var t = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    },
    e = {}.hasOwnProperty,
    i = function(t, i) {
        function n() {
            this.constructor = t
        }
        for (var a in i) e.call(i, a) && (t[a] = i[a]);
        return n.prototype = i.prototype,
        t.prototype = new n,
        t.__super__ = i.prototype,
        t
    };
    Maleskine.Login = function(e) {
        function n() {
            this.refreshCaptcha = t(this.refreshCaptcha, this),
            n.__super__.constructor.apply(this, arguments),
            $(".login-page").pjax("a[data-pjax]", "#pjax-container"),
            $("#pjax-container").on("pjax:success",
            function() {
                return function(t) {
                    return $(".login-page").find("a[data-pjax]").removeClass("active"),
                    $(t.relatedTarget).addClass("active"),
                    $("input[type=checkbox]").iCheck({
                        checkboxClass: "icheckbox_minimal"
                    })
                }
            } (this))
        }
        return i(n, e),
        n.prototype.elements = {
            ".captcha_fields": "captcha"
        },
        n.prototype.events = {
            "click .refresh_captcha": "refreshCaptcha"
        },
        n.prototype.refreshCaptcha = function() {
            return $.getJSON(Routes.refresh_captcha_path({
                format: "json"
            }),
            function(t) {
                return function(e) {
                    return t.captcha.html(JST.render("common/captcha", e))
                }
            } (this))
        },
        n
    } (Maleskine.BaseModule)
}.call(this),
function() {
    var t = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    },
    e = {}.hasOwnProperty,
    i = function(t, i) {
        function n() {
            this.constructor = t
        }
        for (var a in i) e.call(i, a) && (t[a] = i[a]);
        return n.prototype = i.prototype,
        t.prototype = new n,
        t.__super__ = i.prototype,
        t
    };
    Maleskine.LoginModal = function(e) {
        function n() {
            this.refreshCaptcha = t(this.refreshCaptcha, this),
            n.__super__.constructor.apply(this, arguments),
            this.el.on("shown",
            function(t) {
                return function() {
                    return t.emailInput.focus()
                }
            } (this)),
            this.el.on("hidden",
            function(t) {
                return function() {
                    return t.signInError.hide(),
                    t.$("input").val("")
                }
            } (this)),
            this.el.on("show", this.refreshCaptcha),
            this.signinForm.on("ajax:success",
            function(t) {
                return function(e, i) {
                    return t.signInError.fadeOut("fast"),
                    window.location = i.goto_url
                }
            } (this)),
            this.signinForm.on("ajax:error",
            function(t) {
                return function(e, i) {
                    return t.signInError.fadeOut("fast",
                    function() {
                        return t.signInError.text($.parseJSON(i.responseText).error),
                        t.signInError.fadeIn("fast"),
                        t.refreshCaptcha()
                    })
                }
            } (this)),
            this.signupForm.on("ajax:success",
            function(t) {
                return function(e, i) {
                    var n, a;
                    return t.notyInfo(I18n.t("reading.registration_complete")),
                    a = i.goto_url,
                    n = i.label,
                    "undefined" != typeof _gaq && null !== _gaq && _gaq.push(["_trackEvent", "User", "Create", n]),
                    setTimeout(function() {
                        return t.signInError.fadeOut("fast"),
                        window.location = a
                    },
                    500)
                }
            } (this)),
            this.signupForm.on("ajax:error",
            function(t) {
                return function(e, i) {
                    return t.signUpError.fadeOut("fast",
                    function() {
                        return t.signUpError.html($.parseJSON(i.responseText).error),
                        t.signUpError.fadeIn("fast"),
                        t.refreshCaptcha()
                    })
                }
            } (this))
        }
        return i(n, e),
        n.prototype.elements = {
            "#sign_in": "signinForm",
            "#sign_up": "signupForm",
            "#signin_errors": "signInError",
            "#signup_errors": "signUpError",
            "#email": "emailInput",
            "div.sign-in": "signInSection",
            "div.sign-up": "signUpSection",
            "#signup-link": "signUpLink",
            "#signin-link": "signInLink",
            ".captcha_fields": "captcha"
        },
        n.prototype.events = {
            "click #signup-link": "goToSignUpSection",
            "click #signin-link": "goToSignInSection",
            "click .refresh_captcha": "refreshCaptcha"
        },
        n.prototype.refreshCaptcha = function() {
            return $.getJSON(Routes.refresh_captcha_path({
                format: "json"
            }),
            function(t) {
                return function(e) {
                    return t.captcha.html(JST.render("common/captcha", e))
                }
            } (this))
        },
        n.prototype.goToSignInSection = function(t) {
            return $("#login-modal").find("#signin_errors").empty().hide(),
            $(t.currentTarget).siblings("a").removeClass("active"),
            $(t.currentTarget).addClass("active"),
            this.signUpSection.hide(),
            this.signInSection.fadeIn("fast")
        },
        n.prototype.goToSignUpSection = function(t) {
            return $("#login-modal").find("#signup_errors").empty().hide(),
            $(t.currentTarget).siblings("a").removeClass("active"),
            $(t.currentTarget).addClass("active"),
            this.signInSection.hide(),
            this.signUpSection.fadeIn("fast")
        },
        n
    } (Maleskine.BaseModule)
}.call(this);