
function noty(e) {
    var t = 0,
    n = {
        animateOpen: "animation.open",
        animateClose: "animation.close",
        easing: "animation.easing",
        speed: "animation.speed",
        onShow: "callback.onShow",
        onShown: "callback.afterShow",
        onClose: "callback.onClose",
        onClosed: "callback.afterClose"
    };
    return jQuery.each(e,
    function(i, o) {
        if (n[i]) {
            t++;
            var r = n[i].split(".");
            e[r[0]] || (e[r[0]] = {}),
            e[r[0]][r[1]] = o ? o: function() {},
            delete e[i]
        }
    }),
    e.closeWith || (e.closeWith = jQuery.noty.defaults.closeWith),
    e.hasOwnProperty("closeButton") && (t++, e.closeButton && e.closeWith.push("button"), delete e.closeButton),
    e.hasOwnProperty("closeOnSelfClick") && (t++, e.closeOnSelfClick && e.closeWith.push("click"), delete e.closeOnSelfClick),
    e.hasOwnProperty("closeOnSelfOver") && (t++, e.closeOnSelfOver && e.closeWith.push("hover"), delete e.closeOnSelfOver),
    e.hasOwnProperty("custom") && (t++, "null" != e.custom.container && (e.custom = e.custom.container)),
    e.hasOwnProperty("cssPrefix") && (t++, delete e.cssPrefix),
    "noty_theme_default" == e.theme && (t++, e.theme = "defaultTheme"),
    e.hasOwnProperty("dismissQueue") || (e.dismissQueue = jQuery.noty.defaults.dismissQueue),
    e.buttons && jQuery.each(e.buttons,
    function(e, n) {
        n.click && (t++, n.onClick = n.click, delete n.click),
        n.type && (t++, n.addClass = n.type, delete n.type)
    }),
    t && "undefined" != typeof console && console.warn && console.warn("You are using noty v2 with v1.x.x options. @deprecated until v2.2.0 - Please update your options."),
    jQuery.notyRenderer.init(e)
} !
function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    }: t(e)
} ("undefined" != typeof window ? window: this,
function(e, t) {
    function n(e) {
        var t = e.length,
        n = rt.type(e);
        return "function" === n || rt.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }
    function i(e, t, n) {
        if (rt.isFunction(t)) return rt.grep(e,
        function(e, i) {
            return !! t.call(e, i, e) !== n
        });
        if (t.nodeType) return rt.grep(e,
        function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (pt.test(t)) return rt.filter(t, e, n);
            t = rt.filter(t, e)
        }
        return rt.grep(e,
        function(e) {
            return rt.inArray(e, t) >= 0 !== n
        })
    }
    function o(e, t) {
        do e = e[t];
        while (e && 1 !== e.nodeType);
        return e
    }
    function r(e) {
        var t = wt[e] = {};
        return rt.each(e.match(_t) || [],
        function(e, n) {
            t[n] = !0
        }),
        t
    }
    function s() {
        mt.addEventListener ? (mt.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1)) : (mt.detachEvent("onreadystatechange", a), e.detachEvent("onload", a))
    }
    function a() { (mt.addEventListener || "load" === event.type || "complete" === mt.readyState) && (s(), rt.ready())
    }
    function l(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var i = "data-" + t.replace(St, "-$1").toLowerCase();
            if (n = e.getAttribute(i), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null: +n + "" === n ? +n: Tt.test(n) ? rt.parseJSON(n) : n
                } catch(o) {}
                rt.data(e, t, n)
            } else n = void 0
        }
        return n
    }
    function c(e) {
        var t;
        for (t in e) if (("data" !== t || !rt.isEmptyObject(e[t])) && "toJSON" !== t) return ! 1;
        return ! 0
    }
    function u(e, t, n, i) {
        if (rt.acceptData(e)) {
            var o, r, s = rt.expando,
            a = e.nodeType,
            l = a ? rt.cache: e,
            c = a ? e[s] : e[s] && s;
            if (c && l[c] && (i || l[c].data) || void 0 !== n || "string" != typeof t) return c || (c = a ? e[s] = X.pop() || rt.guid++:s),
            l[c] || (l[c] = a ? {}: {
                toJSON: rt.noop
            }),
            ("object" == typeof t || "function" == typeof t) && (i ? l[c] = rt.extend(l[c], t) : l[c].data = rt.extend(l[c].data, t)),
            r = l[c],
            i || (r.data || (r.data = {}), r = r.data),
            void 0 !== n && (r[rt.camelCase(t)] = n),
            "string" == typeof t ? (o = r[t], null == o && (o = r[rt.camelCase(t)])) : o = r,
            o
        }
    }
    function d(e, t, n) {
        if (rt.acceptData(e)) {
            var i, o, r = e.nodeType,
            s = r ? rt.cache: e,
            a = r ? e[rt.expando] : rt.expando;
            if (s[a]) {
                if (t && (i = n ? s[a] : s[a].data)) {
                    rt.isArray(t) ? t = t.concat(rt.map(t, rt.camelCase)) : t in i ? t = [t] : (t = rt.camelCase(t), t = t in i ? [t] : t.split(" ")),
                    o = t.length;
                    for (; o--;) delete i[t[o]];
                    if (n ? !c(i) : !rt.isEmptyObject(i)) return
                } (n || (delete s[a].data, c(s[a]))) && (r ? rt.cleanData([e], !0) : it.deleteExpando || s != s.window ? delete s[a] : s[a] = null)
            }
        }
    }
    function h() {
        return ! 0
    }
    function p() {
        return ! 1
    }
    function f() {
        try {
            return mt.activeElement
        } catch(e) {}
    }
    function m(e) {
        var t = Pt.split("|"),
        n = e.createDocumentFragment();
        if (n.createElement) for (; t.length;) n.createElement(t.pop());
        return n
    }
    function g(e, t) {
        var n, i, o = 0,
        r = typeof e.getElementsByTagName !== kt ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== kt ? e.querySelectorAll(t || "*") : void 0;
        if (!r) for (r = [], n = e.childNodes || e; null != (i = n[o]); o++) ! t || rt.nodeName(i, t) ? r.push(i) : rt.merge(r, g(i, t));
        return void 0 === t || t && rt.nodeName(e, t) ? rt.merge([e], r) : r
    }
    function y(e) {
        jt.test(e.type) && (e.defaultChecked = e.checked)
    }
    function b(e, t) {
        return rt.nodeName(e, "table") && rt.nodeName(11 !== t.nodeType ? t: t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function v(e) {
        return e.type = (null !== rt.find.attr(e, "type")) + "/" + e.type,
        e
    }
    function _(e) {
        var t = Xt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
        e
    }
    function w(e, t) {
        for (var n, i = 0; null != (n = e[i]); i++) rt._data(n, "globalEval", !t || rt._data(t[i], "globalEval"))
    }
    function x(e, t) {
        if (1 === t.nodeType && rt.hasData(e)) {
            var n, i, o, r = rt._data(e),
            s = rt._data(t, r),
            a = r.events;
            if (a) {
                delete s.handle,
                s.events = {};
                for (n in a) for (i = 0, o = a[n].length; o > i; i++) rt.event.add(t, n, a[n][i])
            }
            s.data && (s.data = rt.extend({},
            s.data))
        }
    }
    function C(e, t) {
        var n, i, o;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !it.noCloneEvent && t[rt.expando]) {
                o = rt._data(t);
                for (i in o.events) rt.removeEvent(t, i, o.handle);
                t.removeAttribute(rt.expando)
            }
            "script" === n && t.text !== e.text ? (v(t).text = e.text, _(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), it.html5Clone && e.innerHTML && !rt.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && jt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected: ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }
    function k(t, n) {
        var i = rt(n.createElement(t)).appendTo(n.body),
        o = e.getDefaultComputedStyle ? e.getDefaultComputedStyle(i[0]).display: rt.css(i[0], "display");
        return i.detach(),
        o
    }
    function T(e) {
        var t = mt,
        n = en[e];
        return n || (n = k(e, t), "none" !== n && n || (Zt = (Zt || rt("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Zt[0].contentWindow || Zt[0].contentDocument).document, t.write(), t.close(), n = k(e, t), Zt.detach()), en[e] = n),
        n
    }
    function S(e, t) {
        return {
            get: function() {
                var n = e();
                return null != n ? n ? void delete this.get: (this.get = t).apply(this, arguments) : void 0
            }
        }
    }
    function E(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, o = fn.length; o--;) if (t = fn[o] + n, t in e) return t;
        return i
    }
    function A(e, t) {
        for (var n, i, o, r = [], s = 0, a = e.length; a > s; s++) i = e[s],
        i.style && (r[s] = rt._data(i, "olddisplay"), n = i.style.display, t ? (r[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && Nt(i) && (r[s] = rt._data(i, "olddisplay", T(i.nodeName)))) : r[s] || (o = Nt(i), (n && "none" !== n || !o) && rt._data(i, "olddisplay", o ? n: rt.css(i, "display"))));
        for (s = 0; a > s; s++) i = e[s],
        i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? r[s] || "": "none"));
        return e
    }
    function N(e, t, n) {
        var i = un.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
    }
    function F(e, t, n, i, o) {
        for (var r = n === (i ? "border": "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > r; r += 2)"margin" === n && (s += rt.css(e, n + At[r], !0, o)),
        i ? ("content" === n && (s -= rt.css(e, "padding" + At[r], !0, o)), "margin" !== n && (s -= rt.css(e, "border" + At[r] + "Width", !0, o))) : (s += rt.css(e, "padding" + At[r], !0, o), "padding" !== n && (s += rt.css(e, "border" + At[r] + "Width", !0, o)));
        return s
    }
    function j(e, t, n) {
        var i = !0,
        o = "width" === t ? e.offsetWidth: e.offsetHeight,
        r = tn(e),
        s = it.boxSizing() && "border-box" === rt.css(e, "boxSizing", !1, r);
        if (0 >= o || null == o) {
            if (o = nn(e, t, r), (0 > o || null == o) && (o = e.style[t]), rn.test(o)) return o;
            i = s && (it.boxSizingReliable() || o === e.style[t]),
            o = parseFloat(o) || 0
        }
        return o + F(e, t, n || (s ? "border": "content"), i, r) + "px"
    }
    function O(e, t, n, i, o) {
        return new O.prototype.init(e, t, n, i, o)
    }
    function I() {
        return setTimeout(function() {
            mn = void 0
        }),
        mn = rt.now()
    }
    function R(e, t) {
        var n, i = {
            height: e
        },
        o = 0;
        for (t = t ? 1 : 0; 4 > o; o += 2 - t) n = At[o],
        i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e),
        i
    }
    function D(e, t, n) {
        for (var i, o = (wn[t] || []).concat(wn["*"]), r = 0, s = o.length; s > r; r++) if (i = o[r].call(n, t, e)) return i
    }
    function L(e, t, n) {
        var i, o, r, s, a, l, c, u, d = this,
        h = {},
        p = e.style,
        f = e.nodeType && Nt(e),
        m = rt._data(e, "fxshow");
        n.queue || (a = rt._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
            a.unqueued || l()
        }), a.unqueued++, d.always(function() {
            d.always(function() {
                a.unqueued--,
                rt.queue(e, "fx").length || a.empty.fire()
            })
        })),
        1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], c = rt.css(e, "display"), u = T(e.nodeName), "none" === c && (c = u), "inline" === c && "none" === rt.css(e, "float") && (it.inlineBlockNeedsLayout && "inline" !== u ? p.zoom = 1 : p.display = "inline-block")),
        n.overflow && (p.overflow = "hidden", it.shrinkWrapBlocks() || d.always(function() {
            p.overflow = n.overflow[0],
            p.overflowX = n.overflow[1],
            p.overflowY = n.overflow[2]
        }));
        for (i in t) if (o = t[i], yn.exec(o)) {
            if (delete t[i], r = r || "toggle" === o, o === (f ? "hide": "show")) {
                if ("show" !== o || !m || void 0 === m[i]) continue;
                f = !0
            }
            h[i] = m && m[i] || rt.style(e, i)
        }
        if (!rt.isEmptyObject(h)) {
            m ? "hidden" in m && (f = m.hidden) : m = rt._data(e, "fxshow", {}),
            r && (m.hidden = !f),
            f ? rt(e).show() : d.done(function() {
                rt(e).hide()
            }),
            d.done(function() {
                var t;
                rt._removeData(e, "fxshow");
                for (t in h) rt.style(e, t, h[t])
            });
            for (i in h) s = D(f ? m[i] : 0, i, d),
            i in m || (m[i] = s.start, f && (s.end = s.start, s.start = "width" === i || "height" === i ? 1 : 0))
        }
    }
    function P(e, t) {
        var n, i, o, r, s;
        for (n in e) if (i = rt.camelCase(n), o = t[i], r = e[n], rt.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), s = rt.cssHooks[i], s && "expand" in s) {
            r = s.expand(r),
            delete e[i];
            for (n in r) n in e || (e[n] = r[n], t[n] = o)
        } else t[i] = o
    }
    function M(e, t, n) {
        var i, o, r = 0,
        s = _n.length,
        a = rt.Deferred().always(function() {
            delete l.elem
        }),
        l = function() {
            if (o) return ! 1;
            for (var t = mn || I(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, r = 1 - i, s = 0, l = c.tweens.length; l > s; s++) c.tweens[s].run(r);
            return a.notifyWith(e, [c, r, n]),
            1 > r && l ? n: (a.resolveWith(e, [c]), !1)
        },
        c = a.promise({
            elem: e,
            props: rt.extend({},
            t),
            opts: rt.extend(!0, {
                specialEasing: {}
            },
            n),
            originalProperties: t,
            originalOptions: n,
            startTime: mn || I(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var i = rt.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                return c.tweens.push(i),
                i
            },
            stop: function(t) {
                var n = 0,
                i = t ? c.tweens.length: 0;
                if (o) return this;
                for (o = !0; i > n; n++) c.tweens[n].run(1);
                return t ? a.resolveWith(e, [c, t]) : a.rejectWith(e, [c, t]),
                this
            }
        }),
        u = c.props;
        for (P(u, c.opts.specialEasing); s > r; r++) if (i = _n[r].call(c, e, u, c.opts)) return i;
        return rt.map(u, D, c),
        rt.isFunction(c.opts.start) && c.opts.start.call(e, c),
        rt.fx.timer(rt.extend(l, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })),
        c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }
    function H(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, o = 0,
            r = t.toLowerCase().match(_t) || [];
            if (rt.isFunction(n)) for (; i = r[o++];)"+" === i.charAt(0) ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }
    function q(e, t, n, i) {
        function o(a) {
            var l;
            return r[a] = !0,
            rt.each(e[a] || [],
            function(e, a) {
                var c = a(t, n, i);
                return "string" != typeof c || s || r[c] ? s ? !(l = c) : void 0 : (t.dataTypes.unshift(c), o(c), !1)
            }),
            l
        }
        var r = {},
        s = e === Vn;
        return o(t.dataTypes[0]) || !r["*"] && o("*")
    }
    function B(e, t) {
        var n, i, o = rt.ajaxSettings.flatOptions || {};
        for (i in t) void 0 !== t[i] && ((o[i] ? e: n || (n = {}))[i] = t[i]);
        return n && rt.extend(!0, e, n),
        e
    }
    function z(e, t, n) {
        for (var i, o, r, s, a = e.contents,
        l = e.dataTypes;
        "*" === l[0];) l.shift(),
        void 0 === o && (o = e.mimeType || t.getResponseHeader("Content-Type"));
        if (o) for (s in a) if (a[s] && a[s].test(o)) {
            l.unshift(s);
            break
        }
        if (l[0] in n) r = l[0];
        else {
            for (s in n) {
                if (!l[0] || e.converters[s + " " + l[0]]) {
                    r = s;
                    break
                }
                i || (i = s)
            }
            r = r || i
        }
        return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0
    }
    function U(e, t, n, i) {
        var o, r, s, a, l, c = {},
        u = e.dataTypes.slice();
        if (u[1]) for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
        for (r = u.shift(); r;) if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = u.shift()) if ("*" === r) r = l;
        else if ("*" !== l && l !== r) {
            if (s = c[l + " " + r] || c["* " + r], !s) for (o in c) if (a = o.split(" "), a[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                s === !0 ? s = c[o] : c[o] !== !0 && (r = a[0], u.unshift(a[1]));
                break
            }
            if (s !== !0) if (s && e["throws"]) t = s(t);
            else try {
                t = s(t)
            } catch(d) {
                return {
                    state: "parsererror",
                    error: s ? d: "No conversion from " + l + " to " + r
                }
            }
        }
        return {
            state: "success",
            data: t
        }
    }
    function W(e, t, n, i) {
        var o;
        if (rt.isArray(t)) rt.each(t,
        function(t, o) {
            n || Gn.test(e) ? i(e, o) : W(e + "[" + ("object" == typeof o ? t: "") + "]", o, n, i)
        });
        else if (n || "object" !== rt.type(t)) i(e, t);
        else for (o in t) W(e + "[" + o + "]", t[o], n, i)
    }
    function V() {
        try {
            return new e.XMLHttpRequest
        } catch(t) {}
    }
    function $() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch(t) {}
    }
    function Q(e) {
        return rt.isWindow(e) ? e: 9 === e.nodeType ? e.defaultView || e.parentWindow: !1
    }
    var X = [],
    G = X.slice,
    J = X.concat,
    K = X.push,
    Y = X.indexOf,
    Z = {},
    et = Z.toString,
    tt = Z.hasOwnProperty,
    nt = "".trim,
    it = {},
    ot = "1.11.0",
    rt = function(e, t) {
        return new rt.fn.init(e, t)
    },
    st = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    at = /^-ms-/,
    lt = /-([\da-z])/gi,
    ct = function(e, t) {
        return t.toUpperCase()
    };
    rt.fn = rt.prototype = {
        jquery: ot,
        constructor: rt,
        selector: "",
        length: 0,
        toArray: function() {
            return G.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : G.call(this)
        },
        pushStack: function(e) {
            var t = rt.merge(this.constructor(), e);
            return t.prevObject = this,
            t.context = this.context,
            t
        },
        each: function(e, t) {
            return rt.each(this, e, t)
        },
        map: function(e) {
            return this.pushStack(rt.map(this,
            function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(G.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq( - 1)
        },
        eq: function(e) {
            var t = this.length,
            n = +e + (0 > e ? t: 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: K,
        sort: X.sort,
        splice: X.splice
    },
    rt.extend = rt.fn.extend = function() {
        var e, t, n, i, o, r, s = arguments[0] || {},
        a = 1,
        l = arguments.length,
        c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[a] || {},
        a++), "object" == typeof s || rt.isFunction(s) || (s = {}), a === l && (s = this, a--); l > a; a++) if (null != (o = arguments[a])) for (i in o) e = s[i],
        n = o[i],
        s !== n && (c && n && (rt.isPlainObject(n) || (t = rt.isArray(n))) ? (t ? (t = !1, r = e && rt.isArray(e) ? e: []) : r = e && rt.isPlainObject(e) ? e: {},
        s[i] = rt.extend(c, r, n)) : void 0 !== n && (s[i] = n));
        return s
    },
    rt.extend({
        expando: "jQuery" + (ot + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === rt.type(e)
        },
        isArray: Array.isArray ||
        function(e) {
            return "array" === rt.type(e)
        },
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            return e - parseFloat(e) >= 0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return ! 1;
            return ! 0
        },
        isPlainObject: function(e) {
            var t;
            if (!e || "object" !== rt.type(e) || e.nodeType || rt.isWindow(e)) return ! 1;
            try {
                if (e.constructor && !tt.call(e, "constructor") && !tt.call(e.constructor.prototype, "isPrototypeOf")) return ! 1
            } catch(n) {
                return ! 1
            }
            if (it.ownLast) for (t in e) return tt.call(e, t);
            for (t in e);
            return void 0 === t || tt.call(e, t)
        },
        type: function(e) {
            return null == e ? e + "": "object" == typeof e || "function" == typeof e ? Z[et.call(e)] || "object": typeof e
        },
        globalEval: function(t) {
            t && rt.trim(t) && (e.execScript ||
            function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(at, "ms-").replace(lt, ct)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, i) {
            var o, r = 0,
            s = e.length,
            a = n(e);
            if (i) {
                if (a) for (; s > r && (o = t.apply(e[r], i), o !== !1); r++);
                else for (r in e) if (o = t.apply(e[r], i), o === !1) break
            } else if (a) for (; s > r && (o = t.call(e[r], r, e[r]), o !== !1); r++);
            else for (r in e) if (o = t.call(e[r], r, e[r]), o === !1) break;
            return e
        },
        trim: nt && !nt.call("\ufeff\xa0") ?
        function(e) {
            return null == e ? "": nt.call(e)
        }: function(e) {
            return null == e ? "": (e + "").replace(st, "")
        },
        makeArray: function(e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? rt.merge(i, "string" == typeof e ? [e] : e) : K.call(i, e)),
            i
        },
        inArray: function(e, t, n) {
            var i;
            if (t) {
                if (Y) return Y.call(t, e, n);
                for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n: 0; i > n; n++) if (n in t && t[n] === e) return n
            }
            return - 1
        },
        merge: function(e, t) {
            for (var n = +t.length,
            i = 0,
            o = e.length; n > i;) e[o++] = t[i++];
            if (n !== n) for (; void 0 !== t[i];) e[o++] = t[i++];
            return e.length = o,
            e
        },
        grep: function(e, t, n) {
            for (var i, o = [], r = 0, s = e.length, a = !n; s > r; r++) i = !t(e[r], r),
            i !== a && o.push(e[r]);
            return o
        },
        map: function(e, t, i) {
            var o, r = 0,
            s = e.length,
            a = n(e),
            l = [];
            if (a) for (; s > r; r++) o = t(e[r], r, i),
            null != o && l.push(o);
            else for (r in e) o = t(e[r], r, i),
            null != o && l.push(o);
            return J.apply([], l)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, i, o;
            return "string" == typeof t && (o = e[t], t = e, e = o),
            rt.isFunction(e) ? (n = G.call(arguments, 2), i = function() {
                return e.apply(t || this, n.concat(G.call(arguments)))
            },
            i.guid = e.guid = e.guid || rt.guid++, i) : void 0
        },
        now: function() {
            return + new Date
        },
        support: it
    }),
    rt.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
    function(e, t) {
        Z["[object " + t + "]"] = t.toLowerCase()
    });
    var ut = function(e) {
        function t(e, t, n, i) {
            var o, r, s, a, l, c, d, f, m, g;
            if ((t ? t.ownerDocument || t: q) !== O && j(t), t = t || O, n = n || [], !e || "string" != typeof e) return n;
            if (1 !== (a = t.nodeType) && 9 !== a) return [];
            if (R && !i) {
                if (o = bt.exec(e)) if (s = o[1]) {
                    if (9 === a) {
                        if (r = t.getElementById(s), !r || !r.parentNode) return n;
                        if (r.id === s) return n.push(r),
                        n
                    } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(s)) && M(t, r) && r.id === s) return n.push(r),
                    n
                } else {
                    if (o[2]) return Z.apply(n, t.getElementsByTagName(e)),
                    n;
                    if ((s = o[3]) && C.getElementsByClassName && t.getElementsByClassName) return Z.apply(n, t.getElementsByClassName(s)),
                    n
                }
                if (C.qsa && (!D || !D.test(e))) {
                    if (f = d = H, m = t, g = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
                        for (c = h(e), (d = t.getAttribute("id")) ? f = d.replace(_t, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", l = c.length; l--;) c[l] = f + p(c[l]);
                        m = vt.test(e) && u(t.parentNode) || t,
                        g = c.join(",")
                    }
                    if (g) try {
                        return Z.apply(n, m.querySelectorAll(g)),
                        n
                    } catch(y) {} finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return w(e.replace(lt, "$1"), t, n, i)
        }
        function n() {
            function e(n, i) {
                return t.push(n + " ") > k.cacheLength && delete e[t.shift()],
                e[n + " "] = i
            }
            var t = [];
            return e
        }
        function i(e) {
            return e[H] = !0,
            e
        }
        function o(e) {
            var t = O.createElement("div");
            try {
                return !! e(t)
            } catch(n) {
                return ! 1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                t = null
            }
        }
        function r(e, t) {
            for (var n = e.split("|"), i = e.length; i--;) k.attrHandle[n[i]] = t
        }
        function s(e, t) {
            var n = t && e,
            i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || X) - (~e.sourceIndex || X);
            if (i) return i;
            if (n) for (; n = n.nextSibling;) if (n === t) return - 1;
            return e ? 1 : -1
        }
        function a(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }
        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function c(e) {
            return i(function(t) {
                return t = +t,
                i(function(n, i) {
                    for (var o, r = e([], n.length, t), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
                })
            })
        }
        function u(e) {
            return e && typeof e.getElementsByTagName !== Q && e
        }
        function d() {}
        function h(e, n) {
            var i, o, r, s, a, l, c, u = W[e + " "];
            if (u) return n ? 0 : u.slice(0);
            for (a = e, l = [], c = k.preFilter; a;) { (!i || (o = ct.exec(a))) && (o && (a = a.slice(o[0].length) || a), l.push(r = [])),
                i = !1,
                (o = ut.exec(a)) && (i = o.shift(), r.push({
                    value: i,
                    type: o[0].replace(lt, " ")
                }), a = a.slice(i.length));
                for (s in k.filter) ! (o = ft[s].exec(a)) || c[s] && !(o = c[s](o)) || (i = o.shift(), r.push({
                    value: i,
                    type: s,
                    matches: o
                }), a = a.slice(i.length));
                if (!i) break
            }
            return n ? a.length: a ? t.error(e) : W(e, l).slice(0)
        }
        function p(e) {
            for (var t = 0,
            n = e.length,
            i = ""; n > t; t++) i += e[t].value;
            return i
        }
        function f(e, t, n) {
            var i = t.dir,
            o = n && "parentNode" === i,
            r = z++;
            return t.first ?
            function(t, n, r) {
                for (; t = t[i];) if (1 === t.nodeType || o) return e(t, n, r)
            }: function(t, n, s) {
                var a, l, c = [B, r];
                if (s) {
                    for (; t = t[i];) if ((1 === t.nodeType || o) && e(t, n, s)) return ! 0
                } else for (; t = t[i];) if (1 === t.nodeType || o) {
                    if (l = t[H] || (t[H] = {}), (a = l[i]) && a[0] === B && a[1] === r) return c[2] = a[2];
                    if (l[i] = c, c[2] = e(t, n, s)) return ! 0
                }
            }
        }
        function m(e) {
            return e.length > 1 ?
            function(t, n, i) {
                for (var o = e.length; o--;) if (!e[o](t, n, i)) return ! 1;
                return ! 0
            }: e[0]
        }
        function g(e, t, n, i, o) {
            for (var r, s = [], a = 0, l = e.length, c = null != t; l > a; a++)(r = e[a]) && (!n || n(r, i, o)) && (s.push(r), c && t.push(a));
            return s
        }
        function y(e, t, n, o, r, s) {
            return o && !o[H] && (o = y(o)),
            r && !r[H] && (r = y(r, s)),
            i(function(i, s, a, l) {
                var c, u, d, h = [],
                p = [],
                f = s.length,
                m = i || _(t || "*", a.nodeType ? [a] : a, []),
                y = !e || !i && t ? m: g(m, h, e, a, l),
                b = n ? r || (i ? e: f || o) ? [] : s: y;
                if (n && n(y, b, a, l), o) for (c = g(b, p), o(c, [], a, l), u = c.length; u--;)(d = c[u]) && (b[p[u]] = !(y[p[u]] = d));
                if (i) {
                    if (r || e) {
                        if (r) {
                            for (c = [], u = b.length; u--;)(d = b[u]) && c.push(y[u] = d);
                            r(null, b = [], c, l)
                        }
                        for (u = b.length; u--;)(d = b[u]) && (c = r ? tt.call(i, d) : h[u]) > -1 && (i[c] = !(s[c] = d))
                    }
                } else b = g(b === s ? b.splice(f, b.length) : b),
                r ? r(null, s, b, l) : Z.apply(s, b)
            })
        }
        function b(e) {
            for (var t, n, i, o = e.length,
            r = k.relative[e[0].type], s = r || k.relative[" "], a = r ? 1 : 0, l = f(function(e) {
                return e === t
            },
            s, !0), c = f(function(e) {
                return tt.call(t, e) > -1
            },
            s, !0), u = [function(e, n, i) {
                return ! r && (i || n !== A) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i))
            }]; o > a; a++) if (n = k.relative[e[a].type]) u = [f(m(u), n)];
            else {
                if (n = k.filter[e[a].type].apply(null, e[a].matches), n[H]) {
                    for (i = ++a; o > i && !k.relative[e[i].type]; i++);
                    return y(a > 1 && m(u), a > 1 && p(e.slice(0, a - 1).concat({
                        value: " " === e[a - 2].type ? "*": ""
                    })).replace(lt, "$1"), n, i > a && b(e.slice(a, i)), o > i && b(e = e.slice(i)), o > i && p(e))
                }
                u.push(n)
            }
            return m(u)
        }
        function v(e, n) {
            var o = n.length > 0,
            r = e.length > 0,
            s = function(i, s, a, l, c) {
                var u, d, h, p = 0,
                f = "0",
                m = i && [],
                y = [],
                b = A,
                v = i || r && k.find.TAG("*", c),
                _ = B += null == b ? 1 : Math.random() || .1,
                w = v.length;
                for (c && (A = s !== O && s); f !== w && null != (u = v[f]); f++) {
                    if (r && u) {
                        for (d = 0; h = e[d++];) if (h(u, s, a)) {
                            l.push(u);
                            break
                        }
                        c && (B = _)
                    }
                    o && ((u = !h && u) && p--, i && m.push(u))
                }
                if (p += f, o && f !== p) {
                    for (d = 0; h = n[d++];) h(m, y, s, a);
                    if (i) {
                        if (p > 0) for (; f--;) m[f] || y[f] || (y[f] = K.call(l));
                        y = g(y)
                    }
                    Z.apply(l, y),
                    c && !i && y.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                }
                return c && (B = _, A = b),
                m
            };
            return o ? i(s) : s
        }
        function _(e, n, i) {
            for (var o = 0,
            r = n.length; r > o; o++) t(e, n[o], i);
            return i
        }
        function w(e, t, n, i) {
            var o, r, s, a, l, c = h(e);
            if (!i && 1 === c.length) {
                if (r = c[0] = c[0].slice(0), r.length > 2 && "ID" === (s = r[0]).type && C.getById && 9 === t.nodeType && R && k.relative[r[1].type]) {
                    if (t = (k.find.ID(s.matches[0].replace(wt, xt), t) || [])[0], !t) return n;
                    e = e.slice(r.shift().value.length)
                }
                for (o = ft.needsContext.test(e) ? 0 : r.length; o--&&(s = r[o], !k.relative[a = s.type]);) if ((l = k.find[a]) && (i = l(s.matches[0].replace(wt, xt), vt.test(r[0].type) && u(t.parentNode) || t))) {
                    if (r.splice(o, 1), e = i.length && p(r), !e) return Z.apply(n, i),
                    n;
                    break
                }
            }
            return E(e, c)(i, t, !R, n, vt.test(e) && u(t.parentNode) || t),
            n
        }
        var x, C, k, T, S, E, A, N, F, j, O, I, R, D, L, P, M, H = "sizzle" + -new Date,
        q = e.document,
        B = 0,
        z = 0,
        U = n(),
        W = n(),
        V = n(),
        $ = function(e, t) {
            return e === t && (F = !0),
            0
        },
        Q = "undefined",
        X = 1 << 31,
        G = {}.hasOwnProperty,
        J = [],
        K = J.pop,
        Y = J.push,
        Z = J.push,
        et = J.slice,
        tt = J.indexOf ||
        function(e) {
            for (var t = 0,
            n = this.length; n > t; t++) if (this[t] === e) return t;
            return - 1
        },
        nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        it = "[\\x20\\t\\r\\n\\f]",
        ot = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        rt = ot.replace("w", "w#"),
        st = "\\[" + it + "*(" + ot + ")" + it + "*(?:([*^$|!~]?=)" + it + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + rt + ")|)|)" + it + "*\\]",
        at = ":(" + ot + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + st.replace(3, 8) + ")*)|.*)\\)|)",
        lt = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$", "g"),
        ct = new RegExp("^" + it + "*," + it + "*"),
        ut = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"),
        dt = new RegExp("=" + it + "*([^\\]'\"]*?)" + it + "*\\]", "g"),
        ht = new RegExp(at),
        pt = new RegExp("^" + rt + "$"),
        ft = {
            ID: new RegExp("^#(" + ot + ")"),
            CLASS: new RegExp("^\\.(" + ot + ")"),
            TAG: new RegExp("^(" + ot.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + st),
            PSEUDO: new RegExp("^" + at),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + nt + ")$", "i"),
            needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)", "i")
        },
        mt = /^(?:input|select|textarea|button)$/i,
        gt = /^h\d$/i,
        yt = /^[^{]+\{\s*\[native \w/,
        bt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        vt = /[+~]/,
        _t = /'|\\/g,
        wt = new RegExp("\\\\([\\da-f]{1,6}" + it + "?|(" + it + ")|.)", "ig"),
        xt = function(e, t, n) {
            var i = "0x" + t - 65536;
            return i !== i || n ? t: 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
        };
        try {
            Z.apply(J = et.call(q.childNodes), q.childNodes),
            J[q.childNodes.length].nodeType
        } catch(Ct) {
            Z = {
                apply: J.length ?
                function(e, t) {
                    Y.apply(e, et.call(t))
                }: function(e, t) {
                    for (var n = e.length,
                    i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        C = t.support = {},
        S = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName: !1
        },
        j = t.setDocument = function(e) {
            var t, n = e ? e.ownerDocument || e: q,
            i = n.defaultView;
            return n !== O && 9 === n.nodeType && n.documentElement ? (O = n, I = n.documentElement, R = !S(n), i && i !== i.top && (i.addEventListener ? i.addEventListener("unload",
            function() {
                j()
            },
            !1) : i.attachEvent && i.attachEvent("onunload",
            function() {
                j()
            })), C.attributes = o(function(e) {
                return e.className = "i",
                !e.getAttribute("className")
            }), C.getElementsByTagName = o(function(e) {
                return e.appendChild(n.createComment("")),
                !e.getElementsByTagName("*").length
            }), C.getElementsByClassName = yt.test(n.getElementsByClassName) && o(function(e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>",
                e.firstChild.className = "i",
                2 === e.getElementsByClassName("i").length
            }), C.getById = o(function(e) {
                return I.appendChild(e).id = H,
                !n.getElementsByName || !n.getElementsByName(H).length
            }), C.getById ? (k.find.ID = function(e, t) {
                if (typeof t.getElementById !== Q && R) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            },
            k.filter.ID = function(e) {
                var t = e.replace(wt, xt);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete k.find.ID, k.filter.ID = function(e) {
                var t = e.replace(wt, xt);
                return function(e) {
                    var n = typeof e.getAttributeNode !== Q && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), k.find.TAG = C.getElementsByTagName ?
            function(e, t) {
                return typeof t.getElementsByTagName !== Q ? t.getElementsByTagName(e) : void 0
            }: function(e, t) {
                var n, i = [],
                o = 0,
                r = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = r[o++];) 1 === n.nodeType && i.push(n);
                    return i
                }
                return r
            },
            k.find.CLASS = C.getElementsByClassName &&
            function(e, t) {
                return typeof t.getElementsByClassName !== Q && R ? t.getElementsByClassName(e) : void 0
            },
            L = [], D = [], (C.qsa = yt.test(n.querySelectorAll)) && (o(function(e) {
                e.innerHTML = "<select t=''><option selected=''></option></select>",
                e.querySelectorAll("[t^='']").length && D.push("[*^$]=" + it + "*(?:''|\"\")"),
                e.querySelectorAll("[selected]").length || D.push("\\[" + it + "*(?:value|" + nt + ")"),
                e.querySelectorAll(":checked").length || D.push(":checked")
            }), o(function(e) {
                var t = n.createElement("input");
                t.setAttribute("type", "hidden"),
                e.appendChild(t).setAttribute("name", "D"),
                e.querySelectorAll("[name=d]").length && D.push("name" + it + "*[*^$|!~]?="),
                e.querySelectorAll(":enabled").length || D.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                D.push(",.*:")
            })), (C.matchesSelector = yt.test(P = I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && o(function(e) {
                C.disconnectedMatch = P.call(e, "div"),
                P.call(e, "[s!='']:x"),
                L.push("!=", at)
            }), D = D.length && new RegExp(D.join("|")), L = L.length && new RegExp(L.join("|")), t = yt.test(I.compareDocumentPosition), M = t || yt.test(I.contains) ?
            function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement: e,
                i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            }: function(e, t) {
                if (t) for (; t = t.parentNode;) if (t === e) return ! 0;
                return ! 1
            },
            $ = t ?
            function(e, t) {
                if (e === t) return F = !0,
                0;
                var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return i ? i: (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & i || !C.sortDetached && t.compareDocumentPosition(e) === i ? e === n || e.ownerDocument === q && M(q, e) ? -1 : t === n || t.ownerDocument === q && M(q, t) ? 1 : N ? tt.call(N, e) - tt.call(N, t) : 0 : 4 & i ? -1 : 1)
            }: function(e, t) {
                if (e === t) return F = !0,
                0;
                var i, o = 0,
                r = e.parentNode,
                a = t.parentNode,
                l = [e],
                c = [t];
                if (!r || !a) return e === n ? -1 : t === n ? 1 : r ? -1 : a ? 1 : N ? tt.call(N, e) - tt.call(N, t) : 0;
                if (r === a) return s(e, t);
                for (i = e; i = i.parentNode;) l.unshift(i);
                for (i = t; i = i.parentNode;) c.unshift(i);
                for (; l[o] === c[o];) o++;
                return o ? s(l[o], c[o]) : l[o] === q ? -1 : c[o] === q ? 1 : 0
            },
            n) : O
        },
        t.matches = function(e, n) {
            return t(e, null, null, n)
        },
        t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== O && j(e), n = n.replace(dt, "='$1']"), !(!C.matchesSelector || !R || L && L.test(n) || D && D.test(n))) try {
                var i = P.call(e, n);
                if (i || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
            } catch(o) {}
            return t(n, O, null, [e]).length > 0
        },
        t.contains = function(e, t) {
            return (e.ownerDocument || e) !== O && j(e),
            M(e, t)
        },
        t.attr = function(e, t) { (e.ownerDocument || e) !== O && j(e);
            var n = k.attrHandle[t.toLowerCase()],
            i = n && G.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !R) : void 0;
            return void 0 !== i ? i: C.attributes || !R ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value: null
        },
        t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        },
        t.uniqueSort = function(e) {
            var t, n = [],
            i = 0,
            o = 0;
            if (F = !C.detectDuplicates, N = !C.sortStable && e.slice(0), e.sort($), F) {
                for (; t = e[o++];) t === e[o] && (i = n.push(o));
                for (; i--;) e.splice(n[i], 1)
            }
            return N = null,
            e
        },
        T = t.getText = function(e) {
            var t, n = "",
            i = 0,
            o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += T(e)
                } else if (3 === o || 4 === o) return e.nodeValue
            } else for (; t = e[i++];) n += T(t);
            return n
        },
        k = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: ft,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(wt, xt),
                    e[3] = (e[4] || e[5] || "").replace(wt, xt),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t, n = !e[5] && e[2];
                    return ft.CHILD.test(e[0]) ? null: (e[3] && void 0 !== e[4] ? e[2] = e[4] : n && ht.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(wt, xt).toLowerCase();
                    return "*" === e ?
                    function() {
                        return ! 0
                    }: function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = U[e + " "];
                    return t || (t = new RegExp("(^|" + it + ")" + e + "(" + it + "|$)")) && U(e,
                    function(e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== Q && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, i) {
                    return function(o) {
                        var r = t.attr(o, e);
                        return null == r ? "!=" === n: n ? (r += "", "=" === n ? r === i: "!=" === n ? r !== i: "^=" === n ? i && 0 === r.indexOf(i) : "*=" === n ? i && r.indexOf(i) > -1 : "$=" === n ? i && r.slice( - i.length) === i: "~=" === n ? (" " + r + " ").indexOf(i) > -1 : "|=" === n ? r === i || r.slice(0, i.length + 1) === i + "-": !1) : !0
                    }
                },
                CHILD: function(e, t, n, i, o) {
                    var r = "nth" !== e.slice(0, 3),
                    s = "last" !== e.slice( - 4),
                    a = "of-type" === t;
                    return 1 === i && 0 === o ?
                    function(e) {
                        return !! e.parentNode
                    }: function(t, n, l) {
                        var c, u, d, h, p, f, m = r !== s ? "nextSibling": "previousSibling",
                        g = t.parentNode,
                        y = a && t.nodeName.toLowerCase(),
                        b = !l && !a;
                        if (g) {
                            if (r) {
                                for (; m;) {
                                    for (d = t; d = d[m];) if (a ? d.nodeName.toLowerCase() === y: 1 === d.nodeType) return ! 1;
                                    f = m = "only" === e && !f && "nextSibling"
                                }
                                return ! 0
                            }
                            if (f = [s ? g.firstChild: g.lastChild], s && b) {
                                for (u = g[H] || (g[H] = {}), c = u[e] || [], p = c[0] === B && c[1], h = c[0] === B && c[2], d = p && g.childNodes[p]; d = ++p && d && d[m] || (h = p = 0) || f.pop();) if (1 === d.nodeType && ++h && d === t) {
                                    u[e] = [B, p, h];
                                    break
                                }
                            } else if (b && (c = (t[H] || (t[H] = {}))[e]) && c[0] === B) h = c[1];
                            else for (; (d = ++p && d && d[m] || (h = p = 0) || f.pop()) && ((a ? d.nodeName.toLowerCase() !== y: 1 !== d.nodeType) || !++h || (b && ((d[H] || (d[H] = {}))[e] = [B, h]), d !== t)););
                            return h -= o,
                            h === i || h % i === 0 && h / i >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var o, r = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return r[H] ? r(n) : r.length > 1 ? (o = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                        for (var i, o = r(e, n), s = o.length; s--;) i = tt.call(e, o[s]),
                        e[i] = !(t[i] = o[s])
                    }) : function(e) {
                        return r(e, 0, o)
                    }) : r
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = [],
                    n = [],
                    o = E(e.replace(lt, "$1"));
                    return o[H] ? i(function(e, t, n, i) {
                        for (var r, s = o(e, null, i, []), a = e.length; a--;)(r = s[a]) && (e[a] = !(t[a] = r))
                    }) : function(e, i, r) {
                        return t[0] = e,
                        o(t, null, r, n),
                        !n.pop()
                    }
                }),
                has: i(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: i(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
                    }
                }),
                lang: i(function(e) {
                    return pt.test(e || "") || t.error("unsupported lang: " + e),
                    e = e.replace(wt, xt).toLowerCase(),
                    function(t) {
                        var n;
                        do
                        if (n = R ? t.lang: t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(),
                        n === e || 0 === n.indexOf(e + "-");
                        while ((t = t.parentNode) && 1 === t.nodeType);
                        return ! 1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === I
                },
                focus: function(e) {
                    return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return ! 1;
                    return ! 0
                },
                parent: function(e) {
                    return ! k.pseudos.empty(e)
                },
                header: function(e) {
                    return gt.test(e.nodeName)
                },
                input: function(e) {
                    return mt.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: c(function() {
                    return [0]
                }),
                last: c(function(e, t) {
                    return [t - 1]
                }),
                eq: c(function(e, t, n) {
                    return [0 > n ? n + t: n]
                }),
                even: c(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: c(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: c(function(e, t, n) {
                    for (var i = 0 > n ? n + t: n; --i >= 0;) e.push(i);
                    return e
                }),
                gt: c(function(e, t, n) {
                    for (var i = 0 > n ? n + t: n; ++i < t;) e.push(i);
                    return e
                })
            }
        },
        k.pseudos.nth = k.pseudos.eq;
        for (x in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) k.pseudos[x] = a(x);
        for (x in {
            submit: !0,
            reset: !0
        }) k.pseudos[x] = l(x);
        return d.prototype = k.filters = k.pseudos,
        k.setFilters = new d,
        E = t.compile = function(e, t) {
            var n, i = [],
            o = [],
            r = V[e + " "];
            if (!r) {
                for (t || (t = h(e)), n = t.length; n--;) r = b(t[n]),
                r[H] ? i.push(r) : o.push(r);
                r = V(e, v(o, i))
            }
            return r
        },
        C.sortStable = H.split("").sort($).join("") === H,
        C.detectDuplicates = !!F,
        j(),
        C.sortDetached = o(function(e) {
            return 1 & e.compareDocumentPosition(O.createElement("div"))
        }),
        o(function(e) {
            return e.innerHTML = "<a href='#'></a>",
            "#" === e.firstChild.getAttribute("href")
        }) || r("type|href|height|width",
        function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }),
        C.attributes && o(function(e) {
            return e.innerHTML = "<input/>",
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
        }) || r("value",
        function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }),
        o(function(e) {
            return null == e.getAttribute("disabled")
        }) || r(nt,
        function(e, t, n) {
            var i;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value: null
        }),
        t
    } (e);
    rt.find = ut,
    rt.expr = ut.selectors,
    rt.expr[":"] = rt.expr.pseudos,
    rt.unique = ut.uniqueSort,
    rt.text = ut.getText,
    rt.isXMLDoc = ut.isXML,
    rt.contains = ut.contains;
    var dt = rt.expr.match.needsContext,
    ht = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    pt = /^.[^:#\[\.,]*$/;
    rt.filter = function(e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"),
        1 === t.length && 1 === i.nodeType ? rt.find.matchesSelector(i, e) ? [i] : [] : rt.find.matches(e, rt.grep(t,
        function(e) {
            return 1 === e.nodeType
        }))
    },
    rt.fn.extend({
        find: function(e) {
            var t, n = [],
            i = this,
            o = i.length;
            if ("string" != typeof e) return this.pushStack(rt(e).filter(function() {
                for (t = 0; o > t; t++) if (rt.contains(i[t], this)) return ! 0
            }));
            for (t = 0; o > t; t++) rt.find(e, i[t], n);
            return n = this.pushStack(o > 1 ? rt.unique(n) : n),
            n.selector = this.selector ? this.selector + " " + e: e,
            n
        },
        filter: function(e) {
            return this.pushStack(i(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(i(this, e || [], !0))
        },
        is: function(e) {
            return !! i(this, "string" == typeof e && dt.test(e) ? rt(e) : e || [], !1).length
        }
    });
    var ft, mt = e.document,
    gt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    yt = rt.fn.init = function(e, t) {
        var n, i;
        if (!e) return this;
        if ("string" == typeof e) {
            if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : gt.exec(e), !n || !n[1] && t) return ! t || t.jquery ? (t || ft).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof rt ? t[0] : t, rt.merge(this, rt.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t: mt, !0)), ht.test(n[1]) && rt.isPlainObject(t)) for (n in t) rt.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            if (i = mt.getElementById(n[2]), i && i.parentNode) {
                if (i.id !== n[2]) return ft.find(e);
                this.length = 1,
                this[0] = i
            }
            return this.context = mt,
            this.selector = e,
            this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : rt.isFunction(e) ? "undefined" != typeof ft.ready ? ft.ready(e) : e(rt) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), rt.makeArray(e, this))
    };
    yt.prototype = rt.fn,
    ft = rt(mt);
    var bt = /^(?:parents|prev(?:Until|All))/,
    vt = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    rt.extend({
        dir: function(e, t, n) {
            for (var i = [], o = e[t]; o && 9 !== o.nodeType && (void 0 === n || 1 !== o.nodeType || !rt(o).is(n));) 1 === o.nodeType && i.push(o),
            o = o[t];
            return i
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }),
    rt.fn.extend({
        has: function(e) {
            var t, n = rt(e, this),
            i = n.length;
            return this.filter(function() {
                for (t = 0; i > t; t++) if (rt.contains(this, n[t])) return ! 0
            })
        },
        closest: function(e, t) {
            for (var n, i = 0,
            o = this.length,
            r = [], s = dt.test(e) || "string" != typeof e ? rt(e, t || this.context) : 0; o > i; i++) for (n = this[i]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && rt.find.matchesSelector(n, e))) {
                r.push(n);
                break
            }
            return this.pushStack(r.length > 1 ? rt.unique(r) : r)
        },
        index: function(e) {
            return e ? "string" == typeof e ? rt.inArray(this[0], rt(e)) : rt.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length: -1
        },
        add: function(e, t) {
            return this.pushStack(rt.unique(rt.merge(this.get(), rt(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject: this.prevObject.filter(e))
        }
    }),
    rt.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t: null
        },
        parents: function(e) {
            return rt.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return rt.dir(e, "parentNode", n)
        },
        next: function(e) {
            return o(e, "nextSibling")
        },
        prev: function(e) {
            return o(e, "previousSibling")
        },
        nextAll: function(e) {
            return rt.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return rt.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return rt.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return rt.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return rt.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return rt.sibling(e.firstChild)
        },
        contents: function(e) {
            return rt.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document: rt.merge([], e.childNodes)
        }
    },
    function(e, t) {
        rt.fn[e] = function(n, i) {
            var o = rt.map(this, t, n);
            return "Until" !== e.slice( - 5) && (i = n),
            i && "string" == typeof i && (o = rt.filter(i, o)),
            this.length > 1 && (vt[e] || (o = rt.unique(o)), bt.test(e) && (o = o.reverse())),
            this.pushStack(o)
        }
    });
    var _t = /\S+/g,
    wt = {};
    rt.Callbacks = function(e) {
        e = "string" == typeof e ? wt[e] || r(e) : rt.extend({},
        e);
        var t, n, i, o, s, a, l = [],
        c = !e.once && [],
        u = function(r) {
            for (n = e.memory && r, i = !0, s = a || 0, a = 0, o = l.length, t = !0; l && o > s; s++) if (l[s].apply(r[0], r[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break
            }
            t = !1,
            l && (c ? c.length && u(c.shift()) : n ? l = [] : d.disable())
        },
        d = {
            add: function() {
                if (l) {
                    var i = l.length; !
                    function r(t) {
                        rt.each(t,
                        function(t, n) {
                            var i = rt.type(n);
                            "function" === i ? e.unique && d.has(n) || l.push(n) : n && n.length && "string" !== i && r(n)
                        })
                    } (arguments),
                    t ? o = l.length: n && (a = i, u(n))
                }
                return this
            },
            remove: function() {
                return l && rt.each(arguments,
                function(e, n) {
                    for (var i; (i = rt.inArray(n, l, i)) > -1;) l.splice(i, 1),
                    t && (o >= i && o--, s >= i && s--)
                }),
                this
            },
            has: function(e) {
                return e ? rt.inArray(e, l) > -1 : !(!l || !l.length)
            },
            empty: function() {
                return l = [],
                o = 0,
                this
            },
            disable: function() {
                return l = c = n = void 0,
                this
            },
            disabled: function() {
                return ! l
            },
            lock: function() {
                return c = void 0,
                n || d.disable(),
                this
            },
            locked: function() {
                return ! c
            },
            fireWith: function(e, n) {
                return ! l || i && !c || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? c.push(n) : u(n)),
                this
            },
            fire: function() {
                return d.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !! i
            }
        };
        return d
    },
    rt.extend({
        Deferred: function(e) {
            var t = [["resolve", "done", rt.Callbacks("once memory"), "resolved"], ["reject", "fail", rt.Callbacks("once memory"), "rejected"], ["notify", "progress", rt.Callbacks("memory")]],
            n = "pending",
            i = {
                state: function() {
                    return n
                },
                always: function() {
                    return o.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var e = arguments;
                    return rt.Deferred(function(n) {
                        rt.each(t,
                        function(t, r) {
                            var s = rt.isFunction(e[t]) && e[t];
                            o[r[1]](function() {
                                var e = s && s.apply(this, arguments);
                                e && rt.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[r[0] + "With"](this === i ? n.promise() : this, s ? [e] : arguments)
                            })
                        }),
                        e = null
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? rt.extend(e, i) : i
                }
            },
            o = {};
            return i.pipe = i.then,
            rt.each(t,
            function(e, r) {
                var s = r[2],
                a = r[3];
                i[r[1]] = s.add,
                a && s.add(function() {
                    n = a
                },
                t[1 ^ e][2].disable, t[2][2].lock),
                o[r[0]] = function() {
                    return o[r[0] + "With"](this === o ? i: this, arguments),
                    this
                },
                o[r[0] + "With"] = s.fireWith
            }),
            i.promise(o),
            e && e.call(o, o),
            o
        },
        when: function(e) {
            var t, n, i, o = 0,
            r = G.call(arguments),
            s = r.length,
            a = 1 !== s || e && rt.isFunction(e.promise) ? s: 0,
            l = 1 === a ? e: rt.Deferred(),
            c = function(e, n, i) {
                return function(o) {
                    n[e] = this,
                    i[e] = arguments.length > 1 ? G.call(arguments) : o,
                    i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                }
            };
            if (s > 1) for (t = new Array(s), n = new Array(s), i = new Array(s); s > o; o++) r[o] && rt.isFunction(r[o].promise) ? r[o].promise().done(c(o, i, r)).fail(l.reject).progress(c(o, n, t)) : --a;
            return a || l.resolveWith(i, r),
            l.promise()
        }
    });
    var xt;
    rt.fn.ready = function(e) {
        return rt.ready.promise().done(e),
        this
    },
    rt.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? rt.readyWait++:rt.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? !--rt.readyWait: !rt.isReady) {
                if (!mt.body) return setTimeout(rt.ready);
                rt.isReady = !0,
                e !== !0 && --rt.readyWait > 0 || (xt.resolveWith(mt, [rt]), rt.fn.trigger && rt(mt).trigger("ready").off("ready"))
            }
        }
    }),
    rt.ready.promise = function(t) {
        if (!xt) if (xt = rt.Deferred(), "complete" === mt.readyState) setTimeout(rt.ready);
        else if (mt.addEventListener) mt.addEventListener("DOMContentLoaded", a, !1),
        e.addEventListener("load", a, !1);
        else {
            mt.attachEvent("onreadystatechange", a),
            e.attachEvent("onload", a);
            var n = !1;
            try {
                n = null == e.frameElement && mt.documentElement
            } catch(i) {}
            n && n.doScroll && !
            function o() {
                if (!rt.isReady) {
                    try {
                        n.doScroll("left")
                    } catch(e) {
                        return setTimeout(o, 50)
                    }
                    s(),
                    rt.ready()
                }
            } ()
        }
        return xt.promise(t)
    };
    var Ct, kt = "undefined";
    for (Ct in rt(it)) break;
    it.ownLast = "0" !== Ct,
    it.inlineBlockNeedsLayout = !1,
    rt(function() {
        var e, t, n = mt.getElementsByTagName("body")[0];
        n && (e = mt.createElement("div"), e.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", t = mt.createElement("div"), n.appendChild(e).appendChild(t), typeof t.style.zoom !== kt && (t.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1", (it.inlineBlockNeedsLayout = 3 === t.offsetWidth) && (n.style.zoom = 1)), n.removeChild(e), e = t = null)
    }),
    function() {
        var e = mt.createElement("div");
        if (null == it.deleteExpando) {
            it.deleteExpando = !0;
            try {
                delete e.test
            } catch(t) {
                it.deleteExpando = !1
            }
        }
        e = null
    } (),
    rt.acceptData = function(e) {
        var t = rt.noData[(e.nodeName + " ").toLowerCase()],
        n = +e.nodeType || 1;
        return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
    };
    var Tt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    St = /([A-Z])/g;
    rt.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return e = e.nodeType ? rt.cache[e[rt.expando]] : e[rt.expando],
            !!e && !c(e)
        },
        data: function(e, t, n) {
            return u(e, t, n)
        },
        removeData: function(e, t) {
            return d(e, t)
        },
        _data: function(e, t, n) {
            return u(e, t, n, !0)
        },
        _removeData: function(e, t) {
            return d(e, t, !0)
        }
    }),
    rt.fn.extend({
        data: function(e, t) {
            var n, i, o, r = this[0],
            s = r && r.attributes;
            if (void 0 === e) {
                if (this.length && (o = rt.data(r), 1 === r.nodeType && !rt._data(r, "parsedAttrs"))) {
                    for (n = s.length; n--;) i = s[n].name,
                    0 === i.indexOf("data-") && (i = rt.camelCase(i.slice(5)), l(r, i, o[i]));
                    rt._data(r, "parsedAttrs", !0)
                }
                return o
            }
            return "object" == typeof e ? this.each(function() {
                rt.data(this, e)
            }) : arguments.length > 1 ? this.each(function() {
                rt.data(this, e, t)
            }) : r ? l(r, e, rt.data(r, e)) : void 0
        },
        removeData: function(e) {
            return this.each(function() {
                rt.removeData(this, e)
            })
        }
    }),
    rt.extend({
        queue: function(e, t, n) {
            var i;
            return e ? (t = (t || "fx") + "queue", i = rt._data(e, t), n && (!i || rt.isArray(n) ? i = rt._data(e, t, rt.makeArray(n)) : i.push(n)), i || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = rt.queue(e, t),
            i = n.length,
            o = n.shift(),
            r = rt._queueHooks(e, t),
            s = function() {
                rt.dequeue(e, t)
            };
            "inprogress" === o && (o = n.shift(), i--),
            o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, s, r)),
            !i && r && r.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return rt._data(e, n) || rt._data(e, n, {
                empty: rt.Callbacks("once memory").add(function() {
                    rt._removeData(e, t + "queue"),
                    rt._removeData(e, n)
                })
            })
        }
    }),
    rt.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--),
            arguments.length < n ? rt.queue(this[0], e) : void 0 === t ? this: this.each(function() {
                var n = rt.queue(this, e, t);
                rt._queueHooks(this, e),
                "fx" === e && "inprogress" !== n[0] && rt.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                rt.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, i = 1,
            o = rt.Deferred(),
            r = this,
            s = this.length,
            a = function() {--i || o.resolveWith(r, [r])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;) n = rt._data(r[s], e + "queueHooks"),
            n && n.empty && (i++, n.empty.add(a));
            return a(),
            o.promise(t)
        }
    });
    var Et = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    At = ["Top", "Right", "Bottom", "Left"],
    Nt = function(e, t) {
        return e = t || e,
        "none" === rt.css(e, "display") || !rt.contains(e.ownerDocument, e)
    },
    Ft = rt.access = function(e, t, n, i, o, r, s) {
        var a = 0,
        l = e.length,
        c = null == n;
        if ("object" === rt.type(n)) {
            o = !0;
            for (a in n) rt.access(e, t, a, n[a], !0, r, s)
        } else if (void 0 !== i && (o = !0, rt.isFunction(i) || (s = !0), c && (s ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
            return c.call(rt(e), n)
        })), t)) for (; l > a; a++) t(e[a], n, s ? i: i.call(e[a], a, t(e[a], n)));
        return o ? e: c ? t.call(e) : l ? t(e[0], n) : r
    },
    jt = /^(?:checkbox|radio)$/i; !
    function() {
        var e = mt.createDocumentFragment(),
        t = mt.createElement("div"),
        n = mt.createElement("input");
        if (t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a>", it.leadingWhitespace = 3 === t.firstChild.nodeType, it.tbody = !t.getElementsByTagName("tbody").length, it.htmlSerialize = !!t.getElementsByTagName("link").length, it.html5Clone = "<:nav></:nav>" !== mt.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, e.appendChild(n), it.appendChecked = n.checked, t.innerHTML = "<textarea>x</textarea>", it.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, e.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", it.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, it.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick",
        function() {
            it.noCloneEvent = !1
        }), t.cloneNode(!0).click()), null == it.deleteExpando) {
            it.deleteExpando = !0;
            try {
                delete t.test
            } catch(i) {
                it.deleteExpando = !1
            }
        }
        e = t = n = null
    } (),
    function() {
        var t, n, i = mt.createElement("div");
        for (t in {
            submit: !0,
            change: !0,
            focusin: !0
        }) n = "on" + t,
        (it[t + "Bubbles"] = n in e) || (i.setAttribute(n, "t"), it[t + "Bubbles"] = i.attributes[n].expando === !1);
        i = null
    } ();
    var Ot = /^(?:input|select|textarea)$/i,
    It = /^key/,
    Rt = /^(?:mouse|contextmenu)|click/,
    Dt = /^(?:focusinfocus|focusoutblur)$/,
    Lt = /^([^.]*)(?:\.(.+)|)$/;
    rt.event = {
        global: {},
        add: function(e, t, n, i, o) {
            var r, s, a, l, c, u, d, h, p, f, m, g = rt._data(e);
            if (g) {
                for (n.handler && (l = n, n = l.handler, o = l.selector), n.guid || (n.guid = rt.guid++), (s = g.events) || (s = g.events = {}), (u = g.handle) || (u = g.handle = function(e) {
                    return typeof rt === kt || e && rt.event.triggered === e.type ? void 0 : rt.event.dispatch.apply(u.elem, arguments)
                },
                u.elem = e), t = (t || "").match(_t) || [""], a = t.length; a--;) r = Lt.exec(t[a]) || [],
                p = m = r[1],
                f = (r[2] || "").split(".").sort(),
                p && (c = rt.event.special[p] || {},
                p = (o ? c.delegateType: c.bindType) || p, c = rt.event.special[p] || {},
                d = rt.extend({
                    type: p,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && rt.expr.match.needsContext.test(o),
                    namespace: f.join(".")
                },
                l), (h = s[p]) || (h = s[p] = [], h.delegateCount = 0, c.setup && c.setup.call(e, i, f, u) !== !1 || (e.addEventListener ? e.addEventListener(p, u, !1) : e.attachEvent && e.attachEvent("on" + p, u))), c.add && (c.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, d) : h.push(d), rt.event.global[p] = !0);
                e = null
            }
        },
        remove: function(e, t, n, i, o) {
            var r, s, a, l, c, u, d, h, p, f, m, g = rt.hasData(e) && rt._data(e);
            if (g && (u = g.events)) {
                for (t = (t || "").match(_t) || [""], c = t.length; c--;) if (a = Lt.exec(t[c]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
                    for (d = rt.event.special[p] || {},
                    p = (i ? d.delegateType: d.bindType) || p, h = u[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = r = h.length; r--;) s = h[r],
                    !o && m !== s.origType || n && n.guid !== s.guid || a && !a.test(s.namespace) || i && i !== s.selector && ("**" !== i || !s.selector) || (h.splice(r, 1), s.selector && h.delegateCount--, d.remove && d.remove.call(e, s));
                    l && !h.length && (d.teardown && d.teardown.call(e, f, g.handle) !== !1 || rt.removeEvent(e, p, g.handle), delete u[p])
                } else for (p in u) rt.event.remove(e, p + t[c], n, i, !0);
                rt.isEmptyObject(u) && (delete g.handle, rt._removeData(e, "events"))
            }
        },
        trigger: function(t, n, i, o) {
            var r, s, a, l, c, u, d, h = [i || mt],
            p = tt.call(t, "type") ? t.type: t,
            f = tt.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = u = i = i || mt, 3 !== i.nodeType && 8 !== i.nodeType && !Dt.test(p + rt.event.triggered) && (p.indexOf(".") >= 0 && (f = p.split("."), p = f.shift(), f.sort()), s = p.indexOf(":") < 0 && "on" + p, t = t[rt.expando] ? t: new rt.Event(p, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = f.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : rt.makeArray(n, [t]), c = rt.event.special[p] || {},
            o || !c.trigger || c.trigger.apply(i, n) !== !1)) {
                if (!o && !c.noBubble && !rt.isWindow(i)) {
                    for (l = c.delegateType || p, Dt.test(l + p) || (a = a.parentNode); a; a = a.parentNode) h.push(a),
                    u = a;
                    u === (i.ownerDocument || mt) && h.push(u.defaultView || u.parentWindow || e)
                }
                for (d = 0; (a = h[d++]) && !t.isPropagationStopped();) t.type = d > 1 ? l: c.bindType || p,
                r = (rt._data(a, "events") || {})[t.type] && rt._data(a, "handle"),
                r && r.apply(a, n),
                r = s && a[s],
                r && r.apply && rt.acceptData(a) && (t.result = r.apply(a, n), t.result === !1 && t.preventDefault());
                if (t.type = p, !o && !t.isDefaultPrevented() && (!c._default || c._default.apply(h.pop(), n) === !1) && rt.acceptData(i) && s && i[p] && !rt.isWindow(i)) {
                    u = i[s],
                    u && (i[s] = null),
                    rt.event.triggered = p;
                    try {
                        i[p]()
                    } catch(m) {}
                    rt.event.triggered = void 0,
                    u && (i[s] = u)
                }
                return t.result
            }
        },
        dispatch: function(e) {
            e = rt.event.fix(e);
            var t, n, i, o, r, s = [],
            a = G.call(arguments),
            l = (rt._data(this, "events") || {})[e.type] || [],
            c = rt.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                for (s = rt.event.handlers.call(this, e, l), t = 0; (o = s[t++]) && !e.isPropagationStopped();) for (e.currentTarget = o.elem, r = 0; (i = o.handlers[r++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, n = ((rt.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, a), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, e),
                e.result
            }
        },
        handlers: function(e, t) {
            var n, i, o, r, s = [],
            a = t.delegateCount,
            l = e.target;
            if (a && l.nodeType && (!e.button || "click" !== e.type)) for (; l != this; l = l.parentNode || this) if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                for (o = [], r = 0; a > r; r++) i = t[r],
                n = i.selector + " ",
                void 0 === o[n] && (o[n] = i.needsContext ? rt(n, this).index(l) >= 0 : rt.find(n, this, null, [l]).length),
                o[n] && o.push(i);
                o.length && s.push({
                    elem: l,
                    handlers: o
                })
            }
            return a < t.length && s.push({
                elem: this,
                handlers: t.slice(a)
            }),
            s
        },
        fix: function(e) {
            if (e[rt.expando]) return e;
            var t, n, i, o = e.type,
            r = e,
            s = this.fixHooks[o];
            for (s || (this.fixHooks[o] = s = Rt.test(o) ? this.mouseHooks: It.test(o) ? this.keyHooks: {}), i = s.props ? this.props.concat(s.props) : this.props, e = new rt.Event(r), t = i.length; t--;) n = i[t],
            e[n] = r[n];
            return e.target || (e.target = r.srcElement || mt),
            3 === e.target.nodeType && (e.target = e.target.parentNode),
            e.metaKey = !!e.metaKey,
            s.filter ? s.filter(e, r) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode: t.keyCode),
                e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, i, o, r = t.button,
                s = t.fromElement;
                return null == e.pageX && null != t.clientX && (i = e.target.ownerDocument || mt, o = i.documentElement, n = i.body, e.pageX = t.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)),
                !e.relatedTarget && s && (e.relatedTarget = s === e.target ? t.toElement: s),
                e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0),
                e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== f() && this.focus) try {
                        return this.focus(),
                        !1
                    } catch(e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === f() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return rt.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return rt.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, i) {
            var o = rt.extend(new rt.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            i ? rt.event.trigger(o, null, t) : rt.event.dispatch.call(t, o),
            o.isDefaultPrevented() && n.preventDefault()
        }
    },
    rt.removeEvent = mt.removeEventListener ?
    function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }: function(e, t, n) {
        var i = "on" + t;
        e.detachEvent && (typeof e[i] === kt && (e[i] = null), e.detachEvent(i, n))
    },
    rt.Event = function(e, t) {
        return this instanceof rt.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && (e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault()) ? h: p) : this.type = e, t && rt.extend(this, t), this.timeStamp = e && e.timeStamp || rt.now(), void(this[rt.expando] = !0)) : new rt.Event(e, t)
    },
    rt.Event.prototype = {
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = h,
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = h,
            e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = h,
            this.stopPropagation()
        }
    },
    rt.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    },
    function(e, t) {
        rt.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, i = this,
                o = e.relatedTarget,
                r = e.handleObj;
                return (!o || o !== i && !rt.contains(i, o)) && (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t),
                n
            }
        }
    }),
    it.submitBubbles || (rt.event.special.submit = {
        setup: function() {
            return rt.nodeName(this, "form") ? !1 : void rt.event.add(this, "click._submit keypress._submit",
            function(e) {
                var t = e.target,
                n = rt.nodeName(t, "input") || rt.nodeName(t, "button") ? t.form: void 0;
                n && !rt._data(n, "submitBubbles") && (rt.event.add(n, "submit._submit",
                function(e) {
                    e._submit_bubble = !0
                }), rt._data(n, "submitBubbles", !0))
            })
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && rt.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            return rt.nodeName(this, "form") ? !1 : void rt.event.remove(this, "._submit")
        }
    }),
    it.changeBubbles || (rt.event.special.change = {
        setup: function() {
            return Ot.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (rt.event.add(this, "propertychange._change",
            function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), rt.event.add(this, "click._change",
            function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1),
                rt.event.simulate("change", this, e, !0)
            })), !1) : void rt.event.add(this, "beforeactivate._change",
            function(e) {
                var t = e.target;
                Ot.test(t.nodeName) && !rt._data(t, "changeBubbles") && (rt.event.add(t, "change._change",
                function(e) { ! this.parentNode || e.isSimulated || e.isTrigger || rt.event.simulate("change", this.parentNode, e, !0)
                }), rt._data(t, "changeBubbles", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return rt.event.remove(this, "._change"),
            !Ot.test(this.nodeName)
        }
    }),
    it.focusinBubbles || rt.each({
        focus: "focusin",
        blur: "focusout"
    },
    function(e, t) {
        var n = function(e) {
            rt.event.simulate(t, e.target, rt.event.fix(e), !0)
        };
        rt.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this,
                o = rt._data(i, t);
                o || i.addEventListener(e, n, !0),
                rt._data(i, t, (o || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this,
                o = rt._data(i, t) - 1;
                o ? rt._data(i, t, o) : (i.removeEventListener(e, n, !0), rt._removeData(i, t))
            }
        }
    }),
    rt.fn.extend({
        on: function(e, t, n, i, o) {
            var r, s;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (r in e) this.on(r, t, n, e[r], o);
                return this
            }
            if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), i === !1) i = p;
            else if (!i) return this;
            return 1 === o && (s = i, i = function(e) {
                return rt().off(e),
                s.apply(this, arguments)
            },
            i.guid = s.guid || (s.guid = rt.guid++)),
            this.each(function() {
                rt.event.add(this, e, i, n, t)
            })
        },
        one: function(e, t, n, i) {
            return this.on(e, t, n, i, 1)
        },
        off: function(e, t, n) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj,
            rt(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace: i.origType, i.selector, i.handler),
            this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, t, e[o]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0),
            n === !1 && (n = p),
            this.each(function() {
                rt.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                rt.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? rt.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Pt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    Mt = / jQuery\d+="(?:null|\d+)"/g,
    Ht = new RegExp("<(?:" + Pt + ")[\\s/>]", "i"),
    qt = /^\s+/,
    Bt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    zt = /<([\w:]+)/,
    Ut = /<tbody/i,
    Wt = /<|&#?\w+;/,
    Vt = /<(?:script|style|link)/i,
    $t = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Qt = /^$|\/(?:java|ecma)script/i,
    Xt = /^true\/(.*)/,
    Gt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Jt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: it.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    },
    Kt = m(mt),
    Yt = Kt.appendChild(mt.createElement("div"));
    Jt.optgroup = Jt.option,
    Jt.tbody = Jt.tfoot = Jt.colgroup = Jt.caption = Jt.thead,
    Jt.th = Jt.td,
    rt.extend({
        clone: function(e, t, n) {
            var i, o, r, s, a, l = rt.contains(e.ownerDocument, e);
            if (it.html5Clone || rt.isXMLDoc(e) || !Ht.test("<" + e.nodeName + ">") ? r = e.cloneNode(!0) : (Yt.innerHTML = e.outerHTML, Yt.removeChild(r = Yt.firstChild)), !(it.noCloneEvent && it.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || rt.isXMLDoc(e))) for (i = g(r), a = g(e), s = 0; null != (o = a[s]); ++s) i[s] && C(o, i[s]);
            if (t) if (n) for (a = a || g(e), i = i || g(r), s = 0; null != (o = a[s]); s++) x(o, i[s]);
            else x(e, r);
            return i = g(r, "script"),
            i.length > 0 && w(i, !l && g(e, "script")),
            i = a = o = null,
            r
        },
        buildFragment: function(e, t, n, i) {
            for (var o, r, s, a, l, c, u, d = e.length,
            h = m(t), p = [], f = 0; d > f; f++) if (r = e[f], r || 0 === r) if ("object" === rt.type(r)) rt.merge(p, r.nodeType ? [r] : r);
            else if (Wt.test(r)) {
                for (a = a || h.appendChild(t.createElement("div")), l = (zt.exec(r) || ["", ""])[1].toLowerCase(), u = Jt[l] || Jt._default, a.innerHTML = u[1] + r.replace(Bt, "<$1></$2>") + u[2], o = u[0]; o--;) a = a.lastChild;
                if (!it.leadingWhitespace && qt.test(r) && p.push(t.createTextNode(qt.exec(r)[0])), !it.tbody) for (r = "table" !== l || Ut.test(r) ? "<table>" !== u[1] || Ut.test(r) ? 0 : a: a.firstChild, o = r && r.childNodes.length; o--;) rt.nodeName(c = r.childNodes[o], "tbody") && !c.childNodes.length && r.removeChild(c);
                for (rt.merge(p, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
                a = h.lastChild
            } else p.push(t.createTextNode(r));
            for (a && h.removeChild(a), it.appendChecked || rt.grep(g(p, "input"), y), f = 0; r = p[f++];) if ((!i || -1 === rt.inArray(r, i)) && (s = rt.contains(r.ownerDocument, r), a = g(h.appendChild(r), "script"), s && w(a), n)) for (o = 0; r = a[o++];) Qt.test(r.type || "") && n.push(r);
            return a = null,
            h
        },
        cleanData: function(e, t) {
            for (var n, i, o, r, s = 0,
            a = rt.expando,
            l = rt.cache,
            c = it.deleteExpando,
            u = rt.event.special; null != (n = e[s]); s++) if ((t || rt.acceptData(n)) && (o = n[a], r = o && l[o])) {
                if (r.events) for (i in r.events) u[i] ? rt.event.remove(n, i) : rt.removeEvent(n, i, r.handle);
                l[o] && (delete l[o], c ? delete n[a] : typeof n.removeAttribute !== kt ? n.removeAttribute(a) : n[a] = null, X.push(o))
            }
        }
    }),
    rt.fn.extend({
        text: function(e) {
            return Ft(this,
            function(e) {
                return void 0 === e ? rt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || mt).createTextNode(e))
            },
            null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments,
            function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = b(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments,
            function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = b(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments,
            function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments,
            function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var n, i = e ? rt.filter(e, this) : this, o = 0; null != (n = i[o]); o++) t || 1 !== n.nodeType || rt.cleanData(g(n)),
            n.parentNode && (t && rt.contains(n.ownerDocument, n) && w(g(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && rt.cleanData(g(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && rt.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e,
            t = null == t ? e: t,
            this.map(function() {
                return rt.clone(this, e, t)
            })
        },
        html: function(e) {
            return Ft(this,
            function(e) {
                var t = this[0] || {},
                n = 0,
                i = this.length;
                if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(Mt, "") : void 0;
                if (! ("string" != typeof e || Vt.test(e) || !it.htmlSerialize && Ht.test(e) || !it.leadingWhitespace && qt.test(e) || Jt[(zt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(Bt, "<$1></$2>");
                    try {
                        for (; i > n; n++) t = this[n] || {},
                        1 === t.nodeType && (rt.cleanData(g(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch(o) {}
                }
                t && this.empty().append(e)
            },
            null, e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            return this.domManip(arguments,
            function(t) {
                e = this.parentNode,
                rt.cleanData(g(this)),
                e && e.replaceChild(t, this)
            }),
            e && (e.length || e.nodeType) ? this: this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t) {
            e = J.apply([], e);
            var n, i, o, r, s, a, l = 0,
            c = this.length,
            u = this,
            d = c - 1,
            h = e[0],
            p = rt.isFunction(h);
            if (p || c > 1 && "string" == typeof h && !it.checkClone && $t.test(h)) return this.each(function(n) {
                var i = u.eq(n);
                p && (e[0] = h.call(this, n, i.html())),
                i.domManip(e, t)
            });
            if (c && (a = rt.buildFragment(e, this[0].ownerDocument, !1, this), n = a.firstChild, 1 === a.childNodes.length && (a = n), n)) {
                for (r = rt.map(g(a, "script"), v), o = r.length; c > l; l++) i = a,
                l !== d && (i = rt.clone(i, !0, !0), o && rt.merge(r, g(i, "script"))),
                t.call(this[l], i, l);
                if (o) for (s = r[r.length - 1].ownerDocument, rt.map(r, _), l = 0; o > l; l++) i = r[l],
                Qt.test(i.type || "") && !rt._data(i, "globalEval") && rt.contains(s, i) && (i.src ? rt._evalUrl && rt._evalUrl(i.src) : rt.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Gt, "")));
                a = n = null
            }
            return this
        }
    }),
    rt.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(e, t) {
        rt.fn[e] = function(e) {
            for (var n, i = 0,
            o = [], r = rt(e), s = r.length - 1; s >= i; i++) n = i === s ? this: this.clone(!0),
            rt(r[i])[t](n),
            K.apply(o, n.get());
            return this.pushStack(o)
        }
    });
    var Zt, en = {}; !
    function() {
        var e, t, n = mt.createElement("div"),
        i = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        e = n.getElementsByTagName("a")[0],
        e.style.cssText = "float:left;opacity:.5",
        it.opacity = /^0.5/.test(e.style.opacity),
        it.cssFloat = !!e.style.cssFloat,
        n.style.backgroundClip = "content-box",
        n.cloneNode(!0).style.backgroundClip = "",
        it.clearCloneStyle = "content-box" === n.style.backgroundClip,
        e = n = null,
        it.shrinkWrapBlocks = function() {
            var e, n, o, r;
            if (null == t) {
                if (e = mt.getElementsByTagName("body")[0], !e) return;
                r = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
                n = mt.createElement("div"),
                o = mt.createElement("div"),
                e.appendChild(n).appendChild(o),
                t = !1,
                typeof o.style.zoom !== kt && (o.style.cssText = i + ";width:1px;padding:1px;zoom:1", o.innerHTML = "<div></div>", o.firstChild.style.width = "5px", t = 3 !== o.offsetWidth),
                e.removeChild(n),
                e = n = o = null
            }
            return t
        }
    } ();
    var tn, nn, on = /^margin/,
    rn = new RegExp("^(" + Et + ")(?!px)[a-z%]+$", "i"),
    sn = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (tn = function(e) {
        return e.ownerDocument.defaultView.getComputedStyle(e, null)
    },
    nn = function(e, t, n) {
        var i, o, r, s, a = e.style;
        return n = n || tn(e),
        s = n ? n.getPropertyValue(t) || n[t] : void 0,
        n && ("" !== s || rt.contains(e.ownerDocument, e) || (s = rt.style(e, t)), rn.test(s) && on.test(t) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r)),
        void 0 === s ? s: s + ""
    }) : mt.documentElement.currentStyle && (tn = function(e) {
        return e.currentStyle
    },
    nn = function(e, t, n) {
        var i, o, r, s, a = e.style;
        return n = n || tn(e),
        s = n ? n[t] : void 0,
        null == s && a && a[t] && (s = a[t]),
        rn.test(s) && !sn.test(t) && (i = a.left, o = e.runtimeStyle, r = o && o.left, r && (o.left = e.currentStyle.left), a.left = "fontSize" === t ? "1em": s, s = a.pixelLeft + "px", a.left = i, r && (o.left = r)),
        void 0 === s ? s: s + "" || "auto"
    }),
    !
    function() {
        function t() {
            var t, n, i = mt.getElementsByTagName("body")[0];
            i && (t = mt.createElement("div"), n = mt.createElement("div"), t.style.cssText = c, i.appendChild(t).appendChild(n), n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%", rt.swap(i, null != i.style.zoom ? {
                zoom: 1
            }: {},
            function() {
                o = 4 === n.offsetWidth
            }), r = !0, s = !1, a = !0, e.getComputedStyle && (s = "1%" !== (e.getComputedStyle(n, null) || {}).top, r = "4px" === (e.getComputedStyle(n, null) || {
                width: "4px"
            }).width), i.removeChild(t), n = i = null)
        }
        var n, i, o, r, s, a, l = mt.createElement("div"),
        c = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
        u = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        n = l.getElementsByTagName("a")[0],
        n.style.cssText = "float:left;opacity:.5",
        it.opacity = /^0.5/.test(n.style.opacity),
        it.cssFloat = !!n.style.cssFloat,
        l.style.backgroundClip = "content-box",
        l.cloneNode(!0).style.backgroundClip = "",
        it.clearCloneStyle = "content-box" === l.style.backgroundClip,
        n = l = null,
        rt.extend(it, {
            reliableHiddenOffsets: function() {
                if (null != i) return i;
                var e, t, n, o = mt.createElement("div"),
                r = mt.getElementsByTagName("body")[0];
                return r ? (o.setAttribute("className", "t"), o.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = mt.createElement("div"), e.style.cssText = c, r.appendChild(e).appendChild(o), o.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", t = o.getElementsByTagName("td"), t[0].style.cssText = "padding:0;margin:0;border:0;display:none", n = 0 === t[0].offsetHeight, t[0].style.display = "", t[1].style.display = "none", i = n && 0 === t[0].offsetHeight, r.removeChild(e), o = r = null, i) : void 0
            },
            boxSizing: function() {
                return null == o && t(),
                o
            },
            boxSizingReliable: function() {
                return null == r && t(),
                r
            },
            pixelPosition: function() {
                return null == s && t(),
                s
            },
            reliableMarginRight: function() {
                var t, n, i, o;
                if (null == a && e.getComputedStyle) {
                    if (t = mt.getElementsByTagName("body")[0], !t) return;
                    n = mt.createElement("div"),
                    i = mt.createElement("div"),
                    n.style.cssText = c,
                    t.appendChild(n).appendChild(i),
                    o = i.appendChild(mt.createElement("div")),
                    o.style.cssText = i.style.cssText = u,
                    o.style.marginRight = o.style.width = "0",
                    i.style.width = "1px",
                    a = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight),
                    t.removeChild(n)
                }
                return a
            }
        })
    } (),
    rt.swap = function(e, t, n, i) {
        var o, r, s = {};
        for (r in t) s[r] = e.style[r],
        e.style[r] = t[r];
        o = n.apply(e, i || []);
        for (r in t) e.style[r] = s[r];
        return o
    };
    var an = /alpha\([^)]*\)/i,
    ln = /opacity\s*=\s*([^)]*)/,
    cn = /^(none|table(?!-c[ea]).+)/,
    un = new RegExp("^(" + Et + ")(.*)$", "i"),
    dn = new RegExp("^([+-])=(" + Et + ")", "i"),
    hn = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    },
    pn = {
        letterSpacing: 0,
        fontWeight: 400
    },
    fn = ["Webkit", "O", "Moz", "ms"];
    rt.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = nn(e, "opacity");
                        return "" === n ? "1": n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": it.cssFloat ? "cssFloat": "styleFloat"
        },
        style: function(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, r, s, a = rt.camelCase(t),
                l = e.style;
                if (t = rt.cssProps[a] || (rt.cssProps[a] = E(l, a)), s = rt.cssHooks[t] || rt.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (o = s.get(e, !1, i)) ? o: l[t];
                if (r = typeof n, "string" === r && (o = dn.exec(n)) && (n = (o[1] + 1) * o[2] + parseFloat(rt.css(e, t)), r = "number"), null != n && n === n && ("number" !== r || rt.cssNumber[a] || (n += "px"), it.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(s && "set" in s && void 0 === (n = s.set(e, n, i))))) try {
                    l[t] = "",
                    l[t] = n
                } catch(c) {}
            }
        },
        css: function(e, t, n, i) {
            var o, r, s, a = rt.camelCase(t);
            return t = rt.cssProps[a] || (rt.cssProps[a] = E(e.style, a)),
            s = rt.cssHooks[t] || rt.cssHooks[a],
            s && "get" in s && (r = s.get(e, !0, n)),
            void 0 === r && (r = nn(e, t, i)),
            "normal" === r && t in pn && (r = pn[t]),
            "" === n || n ? (o = parseFloat(r), n === !0 || rt.isNumeric(o) ? o || 0 : r) : r
        }
    }),
    rt.each(["height", "width"],
    function(e, t) {
        rt.cssHooks[t] = {
            get: function(e, n, i) {
                return n ? 0 === e.offsetWidth && cn.test(rt.css(e, "display")) ? rt.swap(e, hn,
                function() {
                    return j(e, t, i)
                }) : j(e, t, i) : void 0
            },
            set: function(e, n, i) {
                var o = i && tn(e);
                return N(e, n, i ? F(e, t, i, it.boxSizing() && "border-box" === rt.css(e, "boxSizing", !1, o), o) : 0)
            }
        }
    }),
    it.opacity || (rt.cssHooks.opacity = {
        get: function(e, t) {
            return ln.test((t && e.currentStyle ? e.currentStyle.filter: e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "": t ? "1": ""
        },
        set: function(e, t) {
            var n = e.style,
            i = e.currentStyle,
            o = rt.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")": "",
            r = i && i.filter || n.filter || "";
            n.zoom = 1,
            (t >= 1 || "" === t) && "" === rt.trim(r.replace(an, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = an.test(r) ? r.replace(an, o) : r + " " + o)
        }
    }),
    rt.cssHooks.marginRight = S(it.reliableMarginRight,
    function(e, t) {
        return t ? rt.swap(e, {
            display: "inline-block"
        },
        nn, [e, "marginRight"]) : void 0
    }),
    rt.each({
        margin: "",
        padding: "",
        border: "Width"
    },
    function(e, t) {
        rt.cssHooks[e + t] = {
            expand: function(n) {
                for (var i = 0,
                o = {},
                r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) o[e + At[i] + t] = r[i] || r[i - 2] || r[0];
                return o
            }
        },
        on.test(e) || (rt.cssHooks[e + t].set = N)
    }),
    rt.fn.extend({
        css: function(e, t) {
            return Ft(this,
            function(e, t, n) {
                var i, o, r = {},
                s = 0;
                if (rt.isArray(t)) {
                    for (i = tn(e), o = t.length; o > s; s++) r[t[s]] = rt.css(e, t[s], !1, i);
                    return r
                }
                return void 0 !== n ? rt.style(e, t, n) : rt.css(e, t)
            },
            e, t, arguments.length > 1)
        },
        show: function() {
            return A(this, !0)
        },
        hide: function() {
            return A(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Nt(this) ? rt(this).show() : rt(this).hide()
            })
        }
    }),
    rt.Tween = O,
    O.prototype = {
        constructor: O,
        init: function(e, t, n, i, o, r) {
            this.elem = e,
            this.prop = n,
            this.easing = o || "swing",
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = i,
            this.unit = r || (rt.cssNumber[n] ? "": "px")
        },
        cur: function() {
            var e = O.propHooks[this.prop];
            return e && e.get ? e.get(this) : O.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = O.propHooks[this.prop];
            return this.pos = t = this.options.duration ? rt.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : O.propHooks._default.set(this),
            this
        }
    },
    O.prototype.init.prototype = O.prototype,
    O.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = rt.css(e.elem, e.prop, ""), t && "auto" !== t ? t: 0) : e.elem[e.prop]
            },
            set: function(e) {
                rt.fx.step[e.prop] ? rt.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[rt.cssProps[e.prop]] || rt.cssHooks[e.prop]) ? rt.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    },
    O.propHooks.scrollTop = O.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    rt.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return.5 - Math.cos(e * Math.PI) / 2
        }
    },
    rt.fx = O.prototype.init,
    rt.fx.step = {};
    var mn, gn, yn = /^(?:toggle|show|hide)$/,
    bn = new RegExp("^(?:([+-])=|)(" + Et + ")([a-z%]*)$", "i"),
    vn = /queueHooks$/,
    _n = [L],
    wn = {
        "*": [function(e, t) {
            var n = this.createTween(e, t),
            i = n.cur(),
            o = bn.exec(t),
            r = o && o[3] || (rt.cssNumber[e] ? "": "px"),
            s = (rt.cssNumber[e] || "px" !== r && +i) && bn.exec(rt.css(n.elem, e)),
            a = 1,
            l = 20;
            if (s && s[3] !== r) {
                r = r || s[3],
                o = o || [],
                s = +i || 1;
                do a = a || ".5",
                s /= a,
                rt.style(n.elem, e, s + r);
                while (a !== (a = n.cur() / i) && 1 !== a && --l)
            }
            return o && (s = n.start = +s || +i || 0, n.unit = r, n.end = o[1] ? s + (o[1] + 1) * o[2] : +o[2]),
            n
        }]
    };
    rt.Animation = rt.extend(M, {
        tweener: function(e, t) {
            rt.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, i = 0,
            o = e.length; o > i; i++) n = e[i],
            wn[n] = wn[n] || [],
            wn[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? _n.unshift(e) : _n.push(e)
        }
    }),
    rt.speed = function(e, t, n) {
        var i = e && "object" == typeof e ? rt.extend({},
        e) : {
            complete: n || !n && t || rt.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !rt.isFunction(t) && t
        };
        return i.duration = rt.fx.off ? 0 : "number" == typeof i.duration ? i.duration: i.duration in rt.fx.speeds ? rt.fx.speeds[i.duration] : rt.fx.speeds._default,
        (null == i.queue || i.queue === !0) && (i.queue = "fx"),
        i.old = i.complete,
        i.complete = function() {
            rt.isFunction(i.old) && i.old.call(this),
            i.queue && rt.dequeue(this, i.queue)
        },
        i
    },
    rt.fn.extend({
        fadeTo: function(e, t, n, i) {
            return this.filter(Nt).css("opacity", 0).show().end().animate({
                opacity: t
            },
            e, n, i)
        },
        animate: function(e, t, n, i) {
            var o = rt.isEmptyObject(e),
            r = rt.speed(t, n, i),
            s = function() {
                var t = M(this, rt.extend({},
                e), r); (o || rt._data(this, "finish")) && t.stop(!0)
            };
            return s.finish = s,
            o || r.queue === !1 ? this.each(s) : this.queue(r.queue, s)
        },
        stop: function(e, t, n) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop,
                t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0),
            t && e !== !1 && this.queue(e || "fx", []),
            this.each(function() {
                var t = !0,
                o = null != e && e + "queueHooks",
                r = rt.timers,
                s = rt._data(this);
                if (o) s[o] && s[o].stop && i(s[o]);
                else for (o in s) s[o] && s[o].stop && vn.test(o) && i(s[o]);
                for (o = r.length; o--;) r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1)); (t || !n) && rt.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"),
            this.each(function() {
                var t, n = rt._data(this),
                i = n[e + "queue"],
                o = n[e + "queueHooks"],
                r = rt.timers,
                s = i ? i.length: 0;
                for (n.finish = !0, rt.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                for (t = 0; s > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                delete n.finish
            })
        }
    }),
    rt.each(["toggle", "show", "hide"],
    function(e, t) {
        var n = rt.fn[t];
        rt.fn[t] = function(e, i, o) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(R(t, !0), e, i, o)
        }
    }),
    rt.each({
        slideDown: R("show"),
        slideUp: R("hide"),
        slideToggle: R("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    },
    function(e, t) {
        rt.fn[e] = function(e, n, i) {
            return this.animate(t, e, n, i)
        }
    }),
    rt.timers = [],
    rt.fx.tick = function() {
        var e, t = rt.timers,
        n = 0;
        for (mn = rt.now(); n < t.length; n++) e = t[n],
        e() || t[n] !== e || t.splice(n--, 1);
        t.length || rt.fx.stop(),
        mn = void 0
    },
    rt.fx.timer = function(e) {
        rt.timers.push(e),
        e() ? rt.fx.start() : rt.timers.pop()
    },
    rt.fx.interval = 13,
    rt.fx.start = function() {
        gn || (gn = setInterval(rt.fx.tick, rt.fx.interval))
    },
    rt.fx.stop = function() {
        clearInterval(gn),
        gn = null
    },
    rt.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    rt.fn.delay = function(e, t) {
        return e = rt.fx ? rt.fx.speeds[e] || e: e,
        t = t || "fx",
        this.queue(t,
        function(t, n) {
            var i = setTimeout(t, e);
            n.stop = function() {
                clearTimeout(i)
            }
        })
    },
    function() {
        var e, t, n, i, o = mt.createElement("div");
        o.setAttribute("className", "t"),
        o.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        e = o.getElementsByTagName("a")[0],
        n = mt.createElement("select"),
        i = n.appendChild(mt.createElement("option")),
        t = o.getElementsByTagName("input")[0],
        e.style.cssText = "top:1px",
        it.getSetAttribute = "t" !== o.className,
        it.style = /top/.test(e.getAttribute("style")),
        it.hrefNormalized = "/a" === e.getAttribute("href"),
        it.checkOn = !!t.value,
        it.optSelected = i.selected,
        it.enctype = !!mt.createElement("form").enctype,
        n.disabled = !0,
        it.optDisabled = !i.disabled,
        t = mt.createElement("input"),
        t.setAttribute("value", ""),
        it.input = "" === t.getAttribute("value"),
        t.value = "t",
        t.setAttribute("type", "radio"),
        it.radioValue = "t" === t.value,
        e = t = n = i = o = null
    } ();
    var xn = /\r/g;
    rt.fn.extend({
        val: function(e) {
            var t, n, i, o = this[0];
            return arguments.length ? (i = rt.isFunction(e), this.each(function(n) {
                var o;
                1 === this.nodeType && (o = i ? e.call(this, n, rt(this).val()) : e, null == o ? o = "": "number" == typeof o ? o += "": rt.isArray(o) && (o = rt.map(o,
                function(e) {
                    return null == e ? "": e + ""
                })), t = rt.valHooks[this.type] || rt.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
            })) : o ? (t = rt.valHooks[o.type] || rt.valHooks[o.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(o, "value")) ? n: (n = o.value, "string" == typeof n ? n.replace(xn, "") : null == n ? "": n)) : void 0
        }
    }),
    rt.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = rt.find.attr(e, "value");
                    return null != t ? t: rt.text(e)
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, i = e.options,
                    o = e.selectedIndex,
                    r = "select-one" === e.type || 0 > o,
                    s = r ? null: [], a = r ? o + 1 : i.length, l = 0 > o ? a: r ? o: 0; a > l; l++) if (n = i[l], !(!n.selected && l !== o || (it.optDisabled ? n.disabled: null !== n.getAttribute("disabled")) || n.parentNode.disabled && rt.nodeName(n.parentNode, "optgroup"))) {
                        if (t = rt(n).val(), r) return t;
                        s.push(t)
                    }
                    return s
                },
                set: function(e, t) {
                    for (var n, i, o = e.options,
                    r = rt.makeArray(t), s = o.length; s--;) if (i = o[s], rt.inArray(rt.valHooks.option.get(i), r) >= 0) try {
                        i.selected = n = !0
                    } catch(a) {
                        i.scrollHeight
                    } else i.selected = !1;
                    return n || (e.selectedIndex = -1),
                    o
                }
            }
        }
    }),
    rt.each(["radio", "checkbox"],
    function() {
        rt.valHooks[this] = {
            set: function(e, t) {
                return rt.isArray(t) ? e.checked = rt.inArray(rt(e).val(), t) >= 0 : void 0
            }
        },
        it.checkOn || (rt.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on": e.value
        })
    });
    var Cn, kn, Tn = rt.expr.attrHandle,
    Sn = /^(?:checked|selected)$/i,
    En = it.getSetAttribute,
    An = it.input;
    rt.fn.extend({
        attr: function(e, t) {
            return Ft(this, rt.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                rt.removeAttr(this, e)
            })
        }
    }),
    rt.extend({
        attr: function(e, t, n) {
            var i, o, r = e.nodeType;
            return e && 3 !== r && 8 !== r && 2 !== r ? typeof e.getAttribute === kt ? rt.prop(e, t, n) : (1 === r && rt.isXMLDoc(e) || (t = t.toLowerCase(), i = rt.attrHooks[t] || (rt.expr.match.bool.test(t) ? kn: Cn)), void 0 === n ? i && "get" in i && null !== (o = i.get(e, t)) ? o: (o = rt.find.attr(e, t), null == o ? void 0 : o) : null !== n ? i && "set" in i && void 0 !== (o = i.set(e, n, t)) ? o: (e.setAttribute(t, n + ""), n) : void rt.removeAttr(e, t)) : void 0
        },
        removeAttr: function(e, t) {
            var n, i, o = 0,
            r = t && t.match(_t);
            if (r && 1 === e.nodeType) for (; n = r[o++];) i = rt.propFix[n] || n,
            rt.expr.match.bool.test(n) ? An && En || !Sn.test(n) ? e[i] = !1 : e[rt.camelCase("default-" + n)] = e[i] = !1 : rt.attr(e, n, ""),
            e.removeAttribute(En ? n: i)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!it.radioValue && "radio" === t && rt.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        }
    }),
    kn = {
        set: function(e, t, n) {
            return t === !1 ? rt.removeAttr(e, n) : An && En || !Sn.test(n) ? e.setAttribute(!En && rt.propFix[n] || n, n) : e[rt.camelCase("default-" + n)] = e[n] = !0,
            n
        }
    },
    rt.each(rt.expr.match.bool.source.match(/\w+/g),
    function(e, t) {
        var n = Tn[t] || rt.find.attr;
        Tn[t] = An && En || !Sn.test(t) ?
        function(e, t, i) {
            var o, r;
            return i || (r = Tn[t], Tn[t] = o, o = null != n(e, t, i) ? t.toLowerCase() : null, Tn[t] = r),
            o
        }: function(e, t, n) {
            return n ? void 0 : e[rt.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }),
    An && En || (rt.attrHooks.value = {
        set: function(e, t, n) {
            return rt.nodeName(e, "input") ? void(e.defaultValue = t) : Cn && Cn.set(e, t, n)
        }
    }),
    En || (Cn = {
        set: function(e, t, n) {
            var i = e.getAttributeNode(n);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(n)),
            i.value = t += "",
            "value" === n || t === e.getAttribute(n) ? t: void 0
        }
    },
    Tn.id = Tn.name = Tn.coords = function(e, t, n) {
        var i;
        return n ? void 0 : (i = e.getAttributeNode(t)) && "" !== i.value ? i.value: null
    },
    rt.valHooks.button = {
        get: function(e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value: void 0
        },
        set: Cn.set
    },
    rt.attrHooks.contenteditable = {
        set: function(e, t, n) {
            Cn.set(e, "" === t ? !1 : t, n)
        }
    },
    rt.each(["width", "height"],
    function(e, t) {
        rt.attrHooks[t] = {
            set: function(e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })),
    it.style || (rt.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || void 0
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    });
    var Nn = /^(?:input|select|textarea|button|object)$/i,
    Fn = /^(?:a|area)$/i;
    rt.fn.extend({
        prop: function(e, t) {
            return Ft(this, rt.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = rt.propFix[e] || e,
            this.each(function() {
                try {
                    this[e] = void 0,
                    delete this[e]
                } catch(t) {}
            })
        }
    }),
    rt.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var i, o, r, s = e.nodeType;
            return e && 3 !== s && 8 !== s && 2 !== s ? (r = 1 !== s || !rt.isXMLDoc(e), r && (t = rt.propFix[t] || t, o = rt.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i: e[t] = n: o && "get" in o && null !== (i = o.get(e, t)) ? i: e[t]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = rt.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Nn.test(e.nodeName) || Fn.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }),
    it.hrefNormalized || rt.each(["href", "src"],
    function(e, t) {
        rt.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }),
    it.optSelected || (rt.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
            null
        }
    }),
    rt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"],
    function() {
        rt.propFix[this.toLowerCase()] = this
    }),
    it.enctype || (rt.propFix.enctype = "encoding");
    var jn = /[\t\r\n\f]/g;
    rt.fn.extend({
        addClass: function(e) {
            var t, n, i, o, r, s, a = 0,
            l = this.length,
            c = "string" == typeof e && e;
            if (rt.isFunction(e)) return this.each(function(t) {
                rt(this).addClass(e.call(this, t, this.className))
            });
            if (c) for (t = (e || "").match(_t) || []; l > a; a++) if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(jn, " ") : " ")) {
                for (r = 0; o = t[r++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                s = rt.trim(i),
                n.className !== s && (n.className = s)
            }
            return this
        },
        removeClass: function(e) {
            var t, n, i, o, r, s, a = 0,
            l = this.length,
            c = 0 === arguments.length || "string" == typeof e && e;
            if (rt.isFunction(e)) return this.each(function(t) {
                rt(this).removeClass(e.call(this, t, this.className))
            });
            if (c) for (t = (e || "").match(_t) || []; l > a; a++) if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(jn, " ") : "")) {
                for (r = 0; o = t[r++];) for (; i.indexOf(" " + o + " ") >= 0;) i = i.replace(" " + o + " ", " ");
                s = e ? rt.trim(i) : "",
                n.className !== s && (n.className = s)
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(rt.isFunction(e) ?
            function(n) {
                rt(this).toggleClass(e.call(this, n, this.className, t), t)
            }: function() {
                if ("string" === n) for (var t, i = 0,
                o = rt(this), r = e.match(_t) || []; t = r[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else(n === kt || "boolean" === n) && (this.className && rt._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "": rt._data(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ",
            n = 0,
            i = this.length; i > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(jn, " ").indexOf(t) >= 0) return ! 0;
            return ! 1
        }
    }),
    rt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
    function(e, t) {
        rt.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }),
    rt.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, i) {
            return this.on(t, e, n, i)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var On = rt.now(),
    In = /\?/,
    Rn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    rt.parseJSON = function(t) {
        if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
        var n, i = null,
        o = rt.trim(t + "");
        return o && !rt.trim(o.replace(Rn,
        function(e, t, o, r) {
            return n && t && (i = 0),
            0 === i ? e: (n = o || t, i += !r - !o, "")
        })) ? Function("return " + o)() : rt.error("Invalid JSON: " + t)
    },
    rt.parseXML = function(t) {
        var n, i;
        if (!t || "string" != typeof t) return null;
        try {
            e.DOMParser ? (i = new DOMParser, n = i.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch(o) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || rt.error("Invalid XML: " + t),
        n
    };
    var Dn, Ln, Pn = /#.*$/,
    Mn = /([?&])_=[^&]*/,
    Hn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    qn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Bn = /^(?:GET|HEAD)$/,
    zn = /^\/\//,
    Un = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Wn = {},
    Vn = {},
    $n = "*/".concat("*");
    try {
        Ln = location.href
    } catch(Qn) {
        Ln = mt.createElement("a"),
        Ln.href = "",
        Ln = Ln.href
    }
    Dn = Un.exec(Ln.toLowerCase()) || [],
    rt.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ln,
            type: "GET",
            isLocal: qn.test(Dn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": $n,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": rt.parseJSON,
                "text xml": rt.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? B(B(e, rt.ajaxSettings), t) : B(rt.ajaxSettings, e)
        },
        ajaxPrefilter: H(Wn),
        ajaxTransport: H(Vn),
        ajax: function(e, t) {
            function n(e, t, n, i) {
                var o, u, y, b, _, x = t;
                2 !== v && (v = 2, a && clearTimeout(a), c = void 0, s = i || "", w.readyState = e > 0 ? 4 : 0, o = e >= 200 && 300 > e || 304 === e, n && (b = z(d, w, n)), b = U(d, b, w, o), o ? (d.ifModified && (_ = w.getResponseHeader("Last-Modified"), _ && (rt.lastModified[r] = _), _ = w.getResponseHeader("etag"), _ && (rt.etag[r] = _)), 204 === e || "HEAD" === d.type ? x = "nocontent": 304 === e ? x = "notmodified": (x = b.state, u = b.data, y = b.error, o = !y)) : (y = x, (e || !x) && (x = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || x) + "", o ? f.resolveWith(h, [u, x, w]) : f.rejectWith(h, [w, x, y]), w.statusCode(g), g = void 0, l && p.trigger(o ? "ajaxSuccess": "ajaxError", [w, d, o ? u: y]), m.fireWith(h, [w, x]), l && (p.trigger("ajaxComplete", [w, d]), --rt.active || rt.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = void 0),
            t = t || {};
            var i, o, r, s, a, l, c, u, d = rt.ajaxSetup({},
            t),
            h = d.context || d,
            p = d.context && (h.nodeType || h.jquery) ? rt(h) : rt.event,
            f = rt.Deferred(),
            m = rt.Callbacks("once memory"),
            g = d.statusCode || {},
            y = {},
            b = {},
            v = 0,
            _ = "canceled",
            w = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === v) {
                        if (!u) for (u = {}; t = Hn.exec(s);) u[t[1].toLowerCase()] = t[2];
                        t = u[e.toLowerCase()]
                    }
                    return null == t ? null: t
                },
                getAllResponseHeaders: function() {
                    return 2 === v ? s: null
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    return v || (e = b[n] = b[n] || e, y[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return v || (d.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e) if (2 > v) for (t in e) g[t] = [g[t], e[t]];
                    else w.always(e[w.status]);
                    return this
                },
                abort: function(e) {
                    var t = e || _;
                    return c && c.abort(t),
                    n(0, t),
                    this
                }
            };
            if (f.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, d.url = ((e || d.url || Ln) + "").replace(Pn, "").replace(zn, Dn[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = rt.trim(d.dataType || "*").toLowerCase().match(_t) || [""], null == d.crossDomain && (i = Un.exec(d.url.toLowerCase()), d.crossDomain = !(!i || i[1] === Dn[1] && i[2] === Dn[2] && (i[3] || ("http:" === i[1] ? "80": "443")) === (Dn[3] || ("http:" === Dn[1] ? "80": "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = rt.param(d.data, d.traditional)), q(Wn, d, t, w), 2 === v) return w;
            l = d.global,
            l && 0 === rt.active++&&rt.event.trigger("ajaxStart"),
            d.type = d.type.toUpperCase(),
            d.hasContent = !Bn.test(d.type),
            r = d.url,
            d.hasContent || (d.data && (r = d.url += (In.test(r) ? "&": "?") + d.data, delete d.data), d.cache === !1 && (d.url = Mn.test(r) ? r.replace(Mn, "$1_=" + On++) : r + (In.test(r) ? "&": "?") + "_=" + On++)),
            d.ifModified && (rt.lastModified[r] && w.setRequestHeader("If-Modified-Since", rt.lastModified[r]), rt.etag[r] && w.setRequestHeader("If-None-Match", rt.etag[r])),
            (d.data && d.hasContent && d.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", d.contentType),
            w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + $n + "; q=0.01": "") : d.accepts["*"]);
            for (o in d.headers) w.setRequestHeader(o, d.headers[o]);
            if (d.beforeSend && (d.beforeSend.call(h, w, d) === !1 || 2 === v)) return w.abort();
            _ = "abort";
            for (o in {
                success: 1,
                error: 1,
                complete: 1
            }) w[o](d[o]);
            if (c = q(Vn, d, t, w)) {
                w.readyState = 1,
                l && p.trigger("ajaxSend", [w, d]),
                d.async && d.timeout > 0 && (a = setTimeout(function() {
                    w.abort("timeout")
                },
                d.timeout));
                try {
                    v = 1,
                    c.send(y, n)
                } catch(x) {
                    if (! (2 > v)) throw x;
                    n( - 1, x)
                }
            } else n( - 1, "No Transport");
            return w
        },
        getJSON: function(e, t, n) {
            return rt.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return rt.get(e, void 0, t, "script")
        }
    }),
    rt.each(["get", "post"],
    function(e, t) {
        rt[t] = function(e, n, i, o) {
            return rt.isFunction(n) && (o = o || i, i = n, n = void 0),
            rt.ajax({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: i
            })
        }
    }),
    rt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
    function(e, t) {
        rt.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    rt._evalUrl = function(e) {
        return rt.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    },
    rt.fn.extend({
        wrapAll: function(e) {
            if (rt.isFunction(e)) return this.each(function(t) {
                rt(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = rt(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return this.each(rt.isFunction(e) ?
            function(t) {
                rt(this).wrapInner(e.call(this, t))
            }: function() {
                var t = rt(this),
                n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = rt.isFunction(e);
            return this.each(function(n) {
                rt(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                rt.nodeName(this, "body") || rt(this).replaceWith(this.childNodes)
            }).end()
        }
    }),
    rt.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !it.reliableHiddenOffsets() && "none" === (e.style && e.style.display || rt.css(e, "display"))
    },
    rt.expr.filters.visible = function(e) {
        return ! rt.expr.filters.hidden(e)
    };
    var Xn = /%20/g,
    Gn = /\[\]$/,
    Jn = /\r?\n/g,
    Kn = /^(?:submit|button|image|reset|file)$/i,
    Yn = /^(?:input|select|textarea|keygen)/i;
    rt.param = function(e, t) {
        var n, i = [],
        o = function(e, t) {
            t = rt.isFunction(t) ? t() : null == t ? "": t,
            i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = rt.ajaxSettings && rt.ajaxSettings.traditional), rt.isArray(e) || e.jquery && !rt.isPlainObject(e)) rt.each(e,
        function() {
            o(this.name, this.value)
        });
        else for (n in e) W(n, e[n], t, o);
        return i.join("&").replace(Xn, "+")
    },
    rt.fn.extend({
        serialize: function() {
            return rt.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = rt.prop(this, "elements");
                return e ? rt.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !rt(this).is(":disabled") && Yn.test(this.nodeName) && !Kn.test(e) && (this.checked || !jt.test(e))
            }).map(function(e, t) {
                var n = rt(this).val();
                return null == n ? null: rt.isArray(n) ? rt.map(n,
                function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Jn, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Jn, "\r\n")
                }
            }).get()
        }
    }),
    rt.ajaxSettings.xhr = void 0 !== e.ActiveXObject ?
    function() {
        return ! this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && V() || $()
    }: V;
    var Zn = 0,
    ei = {},
    ti = rt.ajaxSettings.xhr();
    e.ActiveXObject && rt(e).on("unload",
    function() {
        for (var e in ei) ei[e](void 0, !0)
    }),
    it.cors = !!ti && "withCredentials" in ti,
    ti = it.ajax = !!ti,
    ti && rt.ajaxTransport(function(e) {
        if (!e.crossDomain || it.cors) {
            var t;
            return {
                send: function(n, i) {
                    var o, r = e.xhr(),
                    s = ++Zn;
                    if (r.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (o in e.xhrFields) r[o] = e.xhrFields[o];
                    e.mimeType && r.overrideMimeType && r.overrideMimeType(e.mimeType),
                    e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (o in n) void 0 !== n[o] && r.setRequestHeader(o, n[o] + "");
                    r.send(e.hasContent && e.data || null),
                    t = function(n, o) {
                        var a, l, c;
                        if (t && (o || 4 === r.readyState)) if (delete ei[s], t = void 0, r.onreadystatechange = rt.noop, o) 4 !== r.readyState && r.abort();
                        else {
                            c = {},
                            a = r.status,
                            "string" == typeof r.responseText && (c.text = r.responseText);
                            try {
                                l = r.statusText
                            } catch(u) {
                                l = ""
                            }
                            a || !e.isLocal || e.crossDomain ? 1223 === a && (a = 204) : a = c.text ? 200 : 404
                        }
                        c && i(a, l, c, r.getAllResponseHeaders())
                    },
                    e.async ? 4 === r.readyState ? setTimeout(t) : r.onreadystatechange = ei[s] = t: t()
                },
                abort: function() {
                    t && t(void 0, !0)
                }
            }
        }
    }),
    rt.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return rt.globalEval(e),
                e
            }
        }
    }),
    rt.ajaxPrefilter("script",
    function(e) {
        void 0 === e.cache && (e.cache = !1),
        e.crossDomain && (e.type = "GET", e.global = !1)
    }),
    rt.ajaxTransport("script",
    function(e) {
        if (e.crossDomain) {
            var t, n = mt.head || rt("head")[0] || mt.documentElement;
            return {
                send: function(i, o) {
                    t = mt.createElement("script"),
                    t.async = !0,
                    e.scriptCharset && (t.charset = e.scriptCharset),
                    t.src = e.url,
                    t.onload = t.onreadystatechange = function(e, n) { (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || o(200, "success"))
                    },
                    n.insertBefore(t, n.firstChild)
                },
                abort: function() {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var ni = [],
    ii = /(=)\?(?=&|$)|\?\?/;
    rt.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = ni.pop() || rt.expando + "_" + On++;
            return this[e] = !0,
            e
        }
    }),
    rt.ajaxPrefilter("json jsonp",
    function(t, n, i) {
        var o, r, s, a = t.jsonp !== !1 && (ii.test(t.url) ? "url": "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && ii.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (o = t.jsonpCallback = rt.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(ii, "$1" + o) : t.jsonp !== !1 && (t.url += (In.test(t.url) ? "&": "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
            return s || rt.error(o + " was not called"),
            s[0]
        },
        t.dataTypes[0] = "json", r = e[o], e[o] = function() {
            s = arguments
        },
        i.always(function() {
            e[o] = r,
            t[o] && (t.jsonpCallback = n.jsonpCallback, ni.push(o)),
            s && rt.isFunction(r) && r(s[0]),
            s = r = void 0
        }), "script") : void 0
    }),
    rt.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1),
        t = t || mt;
        var i = ht.exec(e),
        o = !n && [];
        return i ? [t.createElement(i[1])] : (i = rt.buildFragment([e], t, o), o && o.length && rt(o).remove(), rt.merge([], i.childNodes))
    };
    var oi = rt.fn.load;
    rt.fn.load = function(e, t, n) {
        if ("string" != typeof e && oi) return oi.apply(this, arguments);
        var i, o, r, s = this,
        a = e.indexOf(" ");
        return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)),
        rt.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"),
        s.length > 0 && rt.ajax({
            url: e,
            type: r,
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments,
            s.html(i ? rt("<div>").append(rt.parseHTML(e)).find(i) : e)
        }).complete(n &&
        function(e, t) {
            s.each(n, o || [e.responseText, t, e])
        }),
        this
    },
    rt.expr.filters.animated = function(e) {
        return rt.grep(rt.timers,
        function(t) {
            return e === t.elem
        }).length
    };
    var ri = e.document.documentElement;
    rt.offset = {
        setOffset: function(e, t, n) {
            var i, o, r, s, a, l, c, u = rt.css(e, "position"),
            d = rt(e),
            h = {};
            "static" === u && (e.style.position = "relative"),
            a = d.offset(),
            r = rt.css(e, "top"),
            l = rt.css(e, "left"),
            c = ("absolute" === u || "fixed" === u) && rt.inArray("auto", [r, l]) > -1,
            c ? (i = d.position(), s = i.top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0),
            rt.isFunction(t) && (t = t.call(e, n, a)),
            null != t.top && (h.top = t.top - a.top + s),
            null != t.left && (h.left = t.left - a.left + o),
            "using" in t ? t.using.call(e, h) : d.css(h)
        }
    },
    rt.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this: this.each(function(t) {
                rt.offset.setOffset(this, e, t)
            });
            var t, n, i = {
                top: 0,
                left: 0
            },
            o = this[0],
            r = o && o.ownerDocument;
            return r ? (t = r.documentElement, rt.contains(t, o) ? (typeof o.getBoundingClientRect !== kt && (i = o.getBoundingClientRect()), n = Q(r), {
                top: i.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: i.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : i) : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n = {
                    top: 0,
                    left: 0
                },
                i = this[0];
                return "fixed" === rt.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), rt.nodeName(e[0], "html") || (n = e.offset()), n.top += rt.css(e[0], "borderTopWidth", !0), n.left += rt.css(e[0], "borderLeftWidth", !0)),
                {
                    top: t.top - n.top - rt.css(i, "marginTop", !0),
                    left: t.left - n.left - rt.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || ri; e && !rt.nodeName(e, "html") && "static" === rt.css(e, "position");) e = e.offsetParent;
                return e || ri
            })
        }
    }),
    rt.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    },
    function(e, t) {
        var n = /Y/.test(t);
        rt.fn[e] = function(i) {
            return Ft(this,
            function(e, i, o) {
                var r = Q(e);
                return void 0 === o ? r ? t in r ? r[t] : r.document.documentElement[i] : e[i] : void(r ? r.scrollTo(n ? rt(r).scrollLeft() : o, n ? o: rt(r).scrollTop()) : e[i] = o)
            },
            e, i, arguments.length, null)
        }
    }),
    rt.each(["top", "left"],
    function(e, t) {
        rt.cssHooks[t] = S(it.pixelPosition,
        function(e, n) {
            return n ? (n = nn(e, t), rn.test(n) ? rt(e).position()[t] + "px": n) : void 0
        })
    }),
    rt.each({
        Height: "height",
        Width: "width"
    },
    function(e, t) {
        rt.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        },
        function(n, i) {
            rt.fn[i] = function(i, o) {
                var r = arguments.length && (n || "boolean" != typeof i),
                s = n || (i === !0 || o === !0 ? "margin": "border");
                return Ft(this,
                function(t, n, i) {
                    var o;
                    return rt.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? rt.css(t, n, s) : rt.style(t, n, i, s)
                },
                t, r ? i: void 0, r, null)
            }
        })
    }),
    rt.fn.size = function() {
        return this.length
    },
    rt.fn.andSelf = rt.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [],
    function() {
        return rt
    });
    var si = e.jQuery,
    ai = e.$;
    return rt.noConflict = function(t) {
        return e.$ === rt && (e.$ = ai),
        t && e.jQuery === rt && (e.jQuery = si),
        rt
    },
    typeof t === kt && (e.jQuery = e.$ = rt),
    rt
}),
function(e, t) {
    e.rails !== t && e.error("jquery-ujs has already been loaded!");
    var n;
    e.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
        buttonClickSelector: "button[data-remote]",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
        disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]",
        linkDisableSelector: "a[data-disable-with]",
        CSRFProtection: function(t) {
            var n = e('meta[name="csrf-token"]').attr("content");
            n && t.setRequestHeader("X-CSRF-Token", n)
        },
        fire: function(t, n, i) {
            var o = e.Event(n);
            return t.trigger(o, i),
            o.result !== !1
        },
        confirm: function(e) {
            return confirm(e)
        },
        ajax: function(t) {
            return e.ajax(t)
        },
        href: function(e) {
            return e.attr("href")
        },
        handleRemote: function(i) {
            var o, r, s, a, l, c, u, d;
            if (n.fire(i, "ajax:before")) {
                if (a = i.data("cross-domain"), l = a === t ? null: a, c = i.data("with-credentials") || null, u = i.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, i.is("form")) {
                    o = i.attr("method"),
                    r = i.attr("action"),
                    s = i.serializeArray();
                    var h = i.data("ujs:submit-button");
                    h && (s.push(h), i.data("ujs:submit-button", null))
                } else i.is(n.inputChangeSelector) ? (o = i.data("method"), r = i.data("url"), s = i.serialize(), i.data("params") && (s = s + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (o = i.data("method") || "get", r = i.data("url"), s = i.serialize(), i.data("params") && (s = s + "&" + i.data("params"))) : (o = i.data("method"), r = n.href(i), s = i.data("params") || null);
                d = {
                    type: o || "GET",
                    data: s,
                    dataType: u,
                    beforeSend: function(e, o) {
                        return o.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script),
                        n.fire(i, "ajax:beforeSend", [e, o])
                    },
                    success: function(e, t, n) {
                        i.trigger("ajax:success", [e, t, n])
                    },
                    complete: function(e, t) {
                        i.trigger("ajax:complete", [e, t])
                    },
                    error: function(e, t, n) {
                        i.trigger("ajax:error", [e, t, n])
                    },
                    crossDomain: l
                },
                c && (d.xhrFields = {
                    withCredentials: c
                }),
                r && (d.url = r);
                var p = n.ajax(d);
                return i.trigger("ajax:send", p),
                p
            }
            return ! 1
        },
        handleMethod: function(i) {
            var o = n.href(i),
            r = i.data("method"),
            s = i.attr("target"),
            a = e("meta[name=csrf-token]").attr("content"),
            l = e("meta[name=csrf-param]").attr("content"),
            c = e('<form method="post" action="' + o + '"></form>'),
            u = '<input name="_method" value="' + r + '" type="hidden" />';
            l !== t && a !== t && (u += '<input name="' + l + '" value="' + a + '" type="hidden" />'),
            s && c.attr("target", s),
            c.hide().append(u).appendTo("body"),
            c.submit()
        },
        disableFormElements: function(t) {
            t.find(n.disableSelector).each(function() {
                var t = e(this),
                n = t.is("button") ? "html": "val";
                t.data("ujs:enable-with", t[n]()),
                t[n](t.data("disable-with")),
                t.prop("disabled", !0)
            })
        },
        enableFormElements: function(t) {
            t.find(n.enableSelector).each(function() {
                var t = e(this),
                n = t.is("button") ? "html": "val";
                t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")),
                t.prop("disabled", !1)
            })
        },
        allowAction: function(e) {
            var t, i = e.data("confirm"),
            o = !1;
            return i ? (n.fire(e, "confirm") && (o = n.confirm(i), t = n.fire(e, "confirm:complete", [o])), o && t) : !0
        },
        blankInputs: function(t, n, i) {
            var o, r, s = e(),
            a = n || "input,textarea",
            l = t.find(a);
            return l.each(function() {
                if (o = e(this), r = o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : o.val(), !r == !i) {
                    if (o.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + o.attr("name") + '"]').length) return ! 0;
                    s = s.add(o)
                }
            }),
            s.length ? s: !1
        },
        nonBlankInputs: function(e, t) {
            return n.blankInputs(e, t, !0)
        },
        stopEverything: function(t) {
            return e(t.target).trigger("ujs:everythingStopped"),
            t.stopImmediatePropagation(),
            !1
        },
        disableElement: function(e) {
            e.data("ujs:enable-with", e.html()),
            e.html(e.data("disable-with")),
            e.bind("click.railsDisable",
            function(e) {
                return n.stopEverything(e)
            })
        },
        enableElement: function(e) {
            e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")),
            e.unbind("click.railsDisable")
        }
    },
    n.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, i) {
        e.crossDomain || n.CSRFProtection(i)
    }), e(document).delegate(n.linkDisableSelector, "ajax:complete",
    function() {
        n.enableElement(e(this))
    }), e(document).delegate(n.linkClickSelector, "click.rails",
    function(i) {
        var o = e(this),
        r = o.data("method"),
        s = o.data("params");
        if (!n.allowAction(o)) return n.stopEverything(i);
        if (o.is(n.linkDisableSelector) && n.disableElement(o), o.data("remote") !== t) {
            if (! (!i.metaKey && !i.ctrlKey || r && "GET" !== r || s)) return ! 0;
            var a = n.handleRemote(o);
            return a === !1 ? n.enableElement(o) : a.error(function() {
                n.enableElement(o)
            }),
            !1
        }
        return o.data("method") ? (n.handleMethod(o), !1) : void 0
    }), e(document).delegate(n.buttonClickSelector, "click.rails",
    function(t) {
        var i = e(this);
        return n.allowAction(i) ? (n.handleRemote(i), !1) : n.stopEverything(t)
    }), e(document).delegate(n.inputChangeSelector, "change.rails",
    function(t) {
        var i = e(this);
        return n.allowAction(i) ? (n.handleRemote(i), !1) : n.stopEverything(t)
    }), e(document).delegate(n.formSubmitSelector, "submit.rails",
    function(i) {
        var o = e(this),
        r = o.data("remote") !== t,
        s = n.blankInputs(o, n.requiredInputSelector),
        a = n.nonBlankInputs(o, n.fileInputSelector);
        if (!n.allowAction(o)) return n.stopEverything(i);
        if (s && o.attr("novalidate") == t && n.fire(o, "ajax:aborted:required", [s])) return n.stopEverything(i);
        if (r) {
            if (a) {
                setTimeout(function() {
                    n.disableFormElements(o)
                },
                13);
                var l = n.fire(o, "ajax:aborted:file", [a]);
                return l || setTimeout(function() {
                    n.enableFormElements(o)
                },
                13),
                l
            }
            return n.handleRemote(o),
            !1
        }
        setTimeout(function() {
            n.disableFormElements(o)
        },
        13)
    }), e(document).delegate(n.formInputClickSelector, "click.rails",
    function(t) {
        var i = e(this);
        if (!n.allowAction(i)) return n.stopEverything(t);
        var o = i.attr("name"),
        r = o ? {
            name: o,
            value: i.val()
        }: null;
        i.closest("form").data("ujs:submit-button", r)
    }), e(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails",
    function(t) {
        this == t.target && n.disableFormElements(e(this))
    }), e(document).delegate(n.formSubmitSelector, "ajax:complete.rails",
    function(t) {
        this == t.target && n.enableFormElements(e(this))
    }), e(function() {
        var t = e("meta[name=csrf-token]").attr("content"),
        n = e("meta[name=csrf-param]").attr("content");
        e('form input[name="' + n + '"]').val(t)
    }))
} (jQuery),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
} (function(e) {
    function t(e) {
        return a.raw ? e: encodeURIComponent(e)
    }
    function n(e) {
        return a.raw ? e: decodeURIComponent(e)
    }
    function i(e) {
        return t(a.json ? JSON.stringify(e) : String(e))
    }
    function o(e) {
        0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            e = decodeURIComponent(e.replace(s, " "))
        } catch(t) {
            return
        }
        try {
            return a.json ? JSON.parse(e) : e
        } catch(t) {}
    }
    function r(t, n) {
        var i = a.raw ? t: o(t);
        return e.isFunction(n) ? n(i) : i
    }
    var s = /\+/g,
    a = e.cookie = function(o, s, l) {
        if (void 0 !== s && !e.isFunction(s)) {
            if (l = e.extend({},
            a.defaults, l), "number" == typeof l.expires) {
                var c = l.expires,
                u = l.expires = new Date;
                u.setDate(u.getDate() + c)
            }
            return document.cookie = [t(o), "=", i(s), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path: "", l.domain ? "; domain=" + l.domain: "", l.secure ? "; secure": ""].join("")
        }
        for (var d = o ? void 0 : {},
        h = document.cookie ? document.cookie.split("; ") : [], p = 0, f = h.length; f > p; p++) {
            var m = h[p].split("="),
            g = n(m.shift()),
            y = m.join("=");
            if (o && o === g) {
                d = r(y, s);
                break
            }
            o || void 0 === (y = r(y)) || (d[g] = y)
        }
        return d
    };
    a.defaults = {},
    e.removeCookie = function(t, n) {
        return void 0 !== e.cookie(t) ? (e.cookie(t, "", e.extend({},
        n, {
            expires: -1
        })), !0) : !1
    }
}),
String.prototype.encodeHTML = function() {
    var e = {
        "&": "&#38;",
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "/": "&#47;"
    },
    t = /&(?!#?\w+;)|<|>|"|'|\//g;
    return function() {
        return this ? this.replace(t,
        function(t) {
            return e[t] || t
        }) : this
    }
} (),
!
function() {
    "use strict";
    var Faye = {
        VERSION: "1.0.0",
        BAYEUX_VERSION: "1.0",
        ID_LENGTH: 160,
        JSONP_CALLBACK: "jsonpcallback",
        CONNECTION_TYPES: ["long-polling", "cross-origin-long-polling", "callback-polling", "websocket", "eventsource", "in-process"],
        MANDATORY_CONNECTION_TYPES: ["long-polling", "callback-polling", "in-process"],
        ENV: "undefined" != typeof window ? window: global,
        extend: function(e, t, n) {
            if (!t) return e;
            for (var i in t) t.hasOwnProperty(i) && (e.hasOwnProperty(i) && n === !1 || e[i] !== t[i] && (e[i] = t[i]));
            return e
        },
        random: function(e) {
            return e = e || this.ID_LENGTH,
            csprng(e, 36)
        },
        clientIdFromMessages: function(e) {
            var t = this.filter([].concat(e),
            function(e) {
                return "/meta/connect" === e.channel
            });
            return t[0] && t[0].clientId
        },
        copyObject: function(e) {
            var t, n, i;
            if (e instanceof Array) {
                for (t = [], n = e.length; n--;) t[n] = Faye.copyObject(e[n]);
                return t
            }
            if ("object" == typeof e) {
                t = null === e ? null: {};
                for (i in e) t[i] = Faye.copyObject(e[i]);
                return t
            }
            return e
        },
        commonElement: function(e, t) {
            for (var n = 0,
            i = e.length; i > n; n++) if ( - 1 !== this.indexOf(t, e[n])) return e[n];
            return null
        },
        indexOf: function(e, t) {
            if (e.indexOf) return e.indexOf(t);
            for (var n = 0,
            i = e.length; i > n; n++) if (e[n] === t) return n;
            return - 1
        },
        map: function(e, t, n) {
            if (e.map) return e.map(t, n);
            var i = [];
            if (e instanceof Array) for (var o = 0,
            r = e.length; r > o; o++) i.push(t.call(n || null, e[o], o));
            else for (var s in e) e.hasOwnProperty(s) && i.push(t.call(n || null, s, e[s]));
            return i
        },
        filter: function(e, t, n) {
            if (e.filter) return e.filter(t, n);
            for (var i = [], o = 0, r = e.length; r > o; o++) t.call(n || null, e[o], o) && i.push(e[o]);
            return i
        },
        asyncEach: function(e, t, n, i) {
            var o = e.length,
            r = -1,
            s = 0,
            a = !1,
            l = function() {
                return s -= 1,
                r += 1,
                r === o ? n && n.call(i) : void t(e[r], u)
            },
            c = function() {
                if (!a) {
                    for (a = !0; s > 0;) l();
                    a = !1
                }
            },
            u = function() {
                s += 1,
                c()
            };
            u()
        },
        toJSON: function(e) {
            return this.stringify ? this.stringify(e,
            function(e, t) {
                return this[e] instanceof Array ? this[e] : t
            }) : JSON.stringify(e)
        }
    };
    "undefined" != typeof module ? module.exports = Faye: "undefined" != typeof window && (window.Faye = Faye),
    Faye.Class = function(e, t) {
        "function" != typeof e && (t = e, e = Object);
        var n = function() {
            return this.initialize ? this.initialize.apply(this, arguments) || this: this
        },
        i = function() {};
        return i.prototype = e.prototype,
        n.prototype = new i,
        Faye.extend(n.prototype, t),
        n
    },
    function() {
        function e(e, t) {
            if (e.indexOf) return e.indexOf(t);
            for (var n = 0; n < e.length; n++) if (t === e[n]) return n;
            return - 1
        }
        var t = Faye.EventEmitter = function() {},
        n = "function" == typeof Array.isArray ? Array.isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        };
        t.prototype.emit = function(e) {
            if ("error" === e && (!this._events || !this._events.error || n(this._events.error) && !this._events.error.length)) throw arguments[1] instanceof Error ? arguments[1] : Error("Uncaught, unspecified 'error' event.");
            if (!this._events) return ! 1;
            var t = this._events[e];
            if (!t) return ! 1;
            if ("function" == typeof t) {
                switch (arguments.length) {
                case 1:
                    t.call(this);
                    break;
                case 2:
                    t.call(this, arguments[1]);
                    break;
                case 3:
                    t.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    var i = Array.prototype.slice.call(arguments, 1);
                    t.apply(this, i)
                }
                return ! 0
            }
            if (n(t)) {
                for (var i = Array.prototype.slice.call(arguments, 1), o = t.slice(), r = 0, s = o.length; s > r; r++) o[r].apply(this, i);
                return ! 0
            }
            return ! 1
        },
        t.prototype.addListener = function(e, t) {
            if ("function" != typeof t) throw Error("addListener only takes instances of Function");
            return this._events || (this._events = {}),
            this.emit("newListener", e, t),
            this._events[e] ? n(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t,
            this
        },
        t.prototype.on = t.prototype.addListener,
        t.prototype.once = function(e, t) {
            var n = this;
            return n.on(e,
            function i() {
                n.removeListener(e, i),
                t.apply(this, arguments)
            }),
            this
        },
        t.prototype.removeListener = function(t, i) {
            if ("function" != typeof i) throw Error("removeListener only takes instances of Function");
            if (!this._events || !this._events[t]) return this;
            var o = this._events[t];
            if (n(o)) {
                var r = e(o, i);
                if (0 > r) return this;
                o.splice(r, 1),
                0 == o.length && delete this._events[t]
            } else this._events[t] === i && delete this._events[t];
            return this
        },
        t.prototype.removeAllListeners = function(e) {
            return 0 === arguments.length ? (this._events = {},
            this) : (e && this._events && this._events[e] && (this._events[e] = null), this)
        },
        t.prototype.listeners = function(e) {
            return this._events || (this._events = {}),
            this._events[e] || (this._events[e] = []),
            n(this._events[e]) || (this._events[e] = [this._events[e]]),
            this._events[e]
        }
    } (),
    Faye.Namespace = Faye.Class({
        initialize: function() {
            this._used = {}
        },
        exists: function(e) {
            return this._used.hasOwnProperty(e)
        },
        generate: function() {
            for (var e = Faye.random(); this._used.hasOwnProperty(e);) e = Faye.random();
            return this._used[e] = e
        },
        release: function(e) {
            delete this._used[e]
        }
    }),
    function() {
        var e, t = setTimeout;
        e = "function" == typeof setImmediate ?
        function(e) {
            setImmediate(e)
        }: "object" == typeof process && process.nextTick ?
        function(e) {
            process.nextTick(e)
        }: function(e) {
            t(e, 0)
        };
        var n = 0,
        i = 1,
        o = 2,
        r = function(e) {
            return e
        },
        s = function(e) {
            throw e
        },
        a = function(e) {
            if (this._state = n, this._callbacks = [], this._errbacks = [], "function" == typeof e) {
                var t = this;
                e(function(e) {
                    d(t, e)
                },
                function(e) {
                    h(t, e)
                })
            }
        };
        a.prototype.then = function(e, t) {
            var n = this;
            return new a(function(i, o) {
                var r = {
                    fulfill: i,
                    reject: o
                };
                l(n, e, r),
                c(n, t, r)
            })
        };
        var l = function(t, o, s) {
            "function" != typeof o && (o = r);
            var a = function(e) {
                u(o, e, s)
            };
            t._state === n ? t._callbacks.push(a) : t._state === i && e(function() {
                a(t._value)
            })
        },
        c = function(t, i, r) {
            "function" != typeof i && (i = s);
            var a = function(e) {
                u(i, e, r)
            };
            t._state === n ? t._errbacks.push(a) : t._state === o && e(function() {
                a(t._reason)
            })
        },
        u = function(e, t, n) {
            try {
                var i = e(t);
                i && "function" == typeof i.then ? i.then(n.fulfill, n.reject) : n.fulfill(i)
            } catch(o) {
                n.reject(o)
            }
        },
        d = a.fulfill = function(e, t) {
            if (e._state === n) {
                e._state = i,
                e._value = t,
                e._errbacks = [];
                for (var o, r = e._callbacks; o = r.shift();) o(t)
            }
        },
        h = a.reject = function(e, t) {
            if (e._state === n) {
                e._state = o,
                e._reason = t,
                e._callbacks = [];
                for (var i, r = e._errbacks; i = r.shift();) i(t)
            }
        };
        a.defer = e,
        a.pending = function() {
            var e = {};
            return e.promise = new a(function(t, n) {
                e.fulfill = t,
                e.reject = n
            }),
            e
        },
        a.fulfilled = function(e) {
            return new a(function(t) {
                t(e)
            })
        },
        a.rejected = function(e) {
            return new a(function(t, n) {
                n(e)
            })
        },
        void 0 === Faye ? module.exports = a: Faye.Promise = a
    } (),
    Faye.Set = Faye.Class({
        initialize: function() {
            this._index = {}
        },
        add: function(e) {
            var t = void 0 !== e.id ? e.id: e;
            return this._index.hasOwnProperty(t) ? !1 : (this._index[t] = e, !0)
        },
        forEach: function(e, t) {
            for (var n in this._index) this._index.hasOwnProperty(n) && e.call(t, this._index[n])
        },
        isEmpty: function() {
            for (var e in this._index) if (this._index.hasOwnProperty(e)) return ! 1;
            return ! 0
        },
        member: function(e) {
            for (var t in this._index) if (this._index[t] === e) return ! 0;
            return ! 1
        },
        remove: function(e) {
            var t = void 0 !== e.id ? e.id: e,
            n = this._index[t];
            return delete this._index[t],
            n
        },
        toArray: function() {
            var e = [];
            return this.forEach(function(t) {
                e.push(t)
            }),
            e
        }
    }),
    Faye.URI = {
        isURI: function(e) {
            return e && e.protocol && e.host && e.path
        },
        isSameOrigin: function(e) {
            var t = Faye.ENV.location;
            return e.protocol === t.protocol && e.hostname === t.hostname && e.port === t.port
        },
        parse: function(e) {
            if ("string" != typeof e) return e;
            var t, n, i, o, r, s, a = {},
            l = function(t, n) {
                e = e.replace(n,
                function(e) {
                    return a[t] = e,
                    ""
                }),
                a[t] = a[t] || ""
            };
            for (l("protocol", /^[a-z]+\:/i), l("host", /^\/\/[^\/\?#]+/), /^\//.test(e) || a.host || (e = Faye.ENV.location.pathname.replace(/[^\/]*$/, "") + e), l("pathname", /^[^\?#]*/), l("search", /^\?[^#]*/), l("hash", /^#.*/), a.protocol = a.protocol || Faye.ENV.location.protocol, a.host ? (a.host = a.host.substr(2), t = a.host.split(":"), a.hostname = t[0], a.port = t[1] || "") : (a.host = Faye.ENV.location.host, a.hostname = Faye.ENV.location.hostname, a.port = Faye.ENV.location.port), a.pathname = a.pathname || "/", a.path = a.pathname + a.search, n = a.search.replace(/^\?/, ""), i = n ? n.split("&") : [], s = {},
            o = 0, r = i.length; r > o; o++) t = i[o].split("="),
            s[decodeURIComponent(t[0] || "")] = decodeURIComponent(t[1] || "");
            return a.query = s,
            a.href = this.stringify(a),
            a
        },
        stringify: function(e) {
            var t = e.protocol + "//" + e.hostname;
            return e.port && (t += ":" + e.port),
            t += e.pathname + this.queryString(e.query) + (e.hash || "")
        },
        queryString: function(e) {
            var t = [];
            for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
            return 0 === t.length ? "": "?" + t.join("&")
        }
    },
    Faye.Error = Faye.Class({
        initialize: function(e, t, n) {
            this.code = e,
            this.params = Array.prototype.slice.call(t),
            this.message = n
        },
        toString: function() {
            return this.code + ":" + this.params.join(",") + ":" + this.message
        }
    }),
    Faye.Error.parse = function(e) {
        if (e = e || "", !Faye.Grammar.ERROR.test(e)) return new this(null, [], e);
        var t = e.split(":"),
        n = parseInt(t[0]),
        i = t[1].split(","),
        e = t[2];
        return new this(n, i, e)
    },
    Faye.Error.versionMismatch = function() {
        return "" + new this(300, arguments, "Version mismatch")
    },
    Faye.Error.conntypeMismatch = function() {
        return "" + new this(301, arguments, "Connection types not supported")
    },
    Faye.Error.extMismatch = function() {
        return "" + new this(302, arguments, "Extension mismatch")
    },
    Faye.Error.badRequest = function() {
        return "" + new this(400, arguments, "Bad request")
    },
    Faye.Error.clientUnknown = function() {
        return "" + new this(401, arguments, "Unknown client")
    },
    Faye.Error.parameterMissing = function() {
        return "" + new this(402, arguments, "Missing required parameter")
    },
    Faye.Error.channelForbidden = function() {
        return "" + new this(403, arguments, "Forbidden channel")
    },
    Faye.Error.channelUnknown = function() {
        return "" + new this(404, arguments, "Unknown channel")
    },
    Faye.Error.channelInvalid = function() {
        return "" + new this(405, arguments, "Invalid channel")
    },
    Faye.Error.extUnknown = function() {
        return "" + new this(406, arguments, "Unknown extension")
    },
    Faye.Error.publishFailed = function() {
        return "" + new this(407, arguments, "Failed to publish")
    },
    Faye.Error.serverError = function() {
        return "" + new this(500, arguments, "Internal server error")
    },
    Faye.Deferrable = {
        then: function(e, t) {
            var n = this;
            return this._promise || (this._promise = new Faye.Promise(function(e, t) {
                n._fulfill = e,
                n._reject = t
            })),
            0 === arguments.length ? this._promise: this._promise.then(e, t)
        },
        callback: function(e, t) {
            return this.then(function(n) {
                e.call(t, n)
            })
        },
        errback: function(e, t) {
            return this.then(null,
            function(n) {
                e.call(t, n)
            })
        },
        timeout: function(e, t) {
            this.then();
            var n = this;
            this._timer = Faye.ENV.setTimeout(function() {
                n._reject(t)
            },
            1e3 * e)
        },
        setDeferredStatus: function(e, t) {
            this._timer && Faye.ENV.clearTimeout(this._timer),
            this.then(),
            "succeeded" === e ? this._fulfill(t) : "failed" === e ? this._reject(t) : delete this._promise
        }
    },
    Faye.Publisher = {
        countListeners: function(e) {
            return this.listeners(e).length
        },
        bind: function(e, t, n) {
            var i = Array.prototype.slice,
            o = function() {
                t.apply(n, i.call(arguments))
            };
            return this._listeners = this._listeners || [],
            this._listeners.push([e, t, n, o]),
            this.on(e, o)
        },
        unbind: function(e, t, n) {
            this._listeners = this._listeners || [];
            for (var i, o = this._listeners.length; o--;) i = this._listeners[o],
            i[0] === e && (!t || i[1] === t && i[2] === n) && (this._listeners.splice(o, 1), this.removeListener(e, i[3]))
        }
    },
    Faye.extend(Faye.Publisher, Faye.EventEmitter.prototype),
    Faye.Publisher.trigger = Faye.Publisher.emit,
    Faye.Timeouts = {
        addTimeout: function(e, t, n, i) {
            if (this._timeouts = this._timeouts || {},
            !this._timeouts.hasOwnProperty(e)) {
                var o = this;
                this._timeouts[e] = Faye.ENV.setTimeout(function() {
                    delete o._timeouts[e],
                    n.call(i)
                },
                1e3 * t)
            }
        },
        removeTimeout: function(e) {
            this._timeouts = this._timeouts || {};
            var t = this._timeouts[e];
            t && (clearTimeout(t), delete this._timeouts[e])
        }
    },
    Faye.Logging = {
        LOG_LEVELS: {
            fatal: 4,
            error: 3,
            warn: 2,
            info: 1,
            debug: 0
        },
        writeLog: function(e, t) {
            if (Faye.logger) {
                var e = Array.prototype.slice.apply(e),
                n = "[Faye",
                i = this.className,
                o = e.shift().replace(/\?/g,
                function() {
                    try {
                        return Faye.toJSON(e.shift())
                    } catch(t) {
                        return "[Object]"
                    }
                });
                for (var r in Faye) i || "function" == typeof Faye[r] && this instanceof Faye[r] && (i = r);
                i && (n += "." + i),
                n += "] ",
                "function" == typeof Faye.logger[t] ? Faye.logger[t](n + o) : "function" == typeof Faye.logger && Faye.logger(n + o)
            }
        }
    },
    function() {
        for (var e in Faye.Logging.LOG_LEVELS)(function(e) {
            Faye.Logging[e] = function() {
                this.writeLog(arguments, e)
            }
        })(e, Faye.Logging.LOG_LEVELS[e])
    } (),
    Faye.Grammar = {
        CHANNEL_NAME: /^\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*$/,
        CHANNEL_PATTERN: /^(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*\/\*{1,2}$/,
        ERROR: /^([0-9][0-9][0-9]:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*(,(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)*:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*|[0-9][0-9][0-9]::(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)$/,
        VERSION: /^([0-9])+(\.(([a-z]|[A-Z])|[0-9])(((([a-z]|[A-Z])|[0-9])|\-|\_))*)*$/
    },
    Faye.Extensible = {
        addExtension: function(e) {
            this._extensions = this._extensions || [],
            this._extensions.push(e),
            e.added && e.added(this)
        },
        removeExtension: function(e) {
            if (this._extensions) for (var t = this._extensions.length; t--;) this._extensions[t] === e && (this._extensions.splice(t, 1), e.removed && e.removed(this))
        },
        pipeThroughExtensions: function(e, t, n, i, o) {
            if (this.debug("Passing through ? extensions: ?", e, t), !this._extensions) return i.call(o, t);
            var r = this._extensions.slice(),
            s = function(t) {
                if (!t) return i.call(o, t);
                var a = r.shift();
                if (!a) return i.call(o, t);
                var l = a[e];
                return l ? void(l.length >= 3 ? a[e](t, n, s) : a[e](t, s)) : s(t)
            };
            s(t)
        }
    },
    Faye.extend(Faye.Extensible, Faye.Logging),
    Faye.Channel = Faye.Class({
        initialize: function(e) {
            this.id = this.name = e
        },
        push: function(e) {
            this.trigger("message", e)
        },
        isUnused: function() {
            return 0 === this.countListeners("message")
        }
    }),
    Faye.extend(Faye.Channel.prototype, Faye.Publisher),
    Faye.extend(Faye.Channel, {
        HANDSHAKE: "/meta/handshake",
        CONNECT: "/meta/connect",
        SUBSCRIBE: "/meta/subscribe",
        UNSUBSCRIBE: "/meta/unsubscribe",
        DISCONNECT: "/meta/disconnect",
        META: "meta",
        SERVICE: "service",
        expand: function(e) {
            var t = this.parse(e),
            n = ["/**", e],
            i = t.slice();
            i[i.length - 1] = "*",
            n.push(this.unparse(i));
            for (var o = 1,
            r = t.length; r > o; o++) i = t.slice(0, o),
            i.push("**"),
            n.push(this.unparse(i));
            return n
        },
        isValid: function(e) {
            return Faye.Grammar.CHANNEL_NAME.test(e) || Faye.Grammar.CHANNEL_PATTERN.test(e)
        },
        parse: function(e) {
            return this.isValid(e) ? e.split("/").slice(1) : null
        },
        unparse: function(e) {
            return "/" + e.join("/")
        },
        isMeta: function(e) {
            var t = this.parse(e);
            return t ? t[0] === this.META: null
        },
        isService: function(e) {
            var t = this.parse(e);
            return t ? t[0] === this.SERVICE: null
        },
        isSubscribable: function(e) {
            return this.isValid(e) ? !this.isMeta(e) && !this.isService(e) : null
        },
        Set: Faye.Class({
            initialize: function() {
                this._channels = {}
            },
            getKeys: function() {
                var e = [];
                for (var t in this._channels) e.push(t);
                return e
            },
            remove: function(e) {
                delete this._channels[e]
            },
            hasSubscription: function(e) {
                return this._channels.hasOwnProperty(e)
            },
            subscribe: function(e, t, n) {
                if (t) for (var i, o = 0,
                r = e.length; r > o; o++) {
                    i = e[o];
                    var s = this._channels[i] = this._channels[i] || new Faye.Channel(i);
                    s.bind("message", t, n)
                }
            },
            unsubscribe: function(e, t, n) {
                var i = this._channels[e];
                return i ? (i.unbind("message", t, n), i.isUnused() ? (this.remove(e), !0) : !1) : !1
            },
            distributeMessage: function(e) {
                for (var t = Faye.Channel.expand(e.channel), n = 0, i = t.length; i > n; n++) {
                    var o = this._channels[t[n]];
                    o && o.trigger("message", e.data)
                }
            }
        })
    }),
    Faye.Envelope = Faye.Class({
        initialize: function(e, t) {
            this.id = e.id,
            this.message = e,
            void 0 !== t && this.timeout(t / 1e3, !1)
        }
    }),
    Faye.extend(Faye.Envelope.prototype, Faye.Deferrable),
    Faye.Publication = Faye.Class(Faye.Deferrable),
    Faye.Subscription = Faye.Class({
        initialize: function(e, t, n, i) {
            this._client = e,
            this._channels = t,
            this._callback = n,
            this._context = i,
            this._cancelled = !1
        },
        cancel: function() {
            this._cancelled || (this._client.unsubscribe(this._channels, this._callback, this._context), this._cancelled = !0)
        },
        unsubscribe: function() {
            this.cancel()
        }
    }),
    Faye.extend(Faye.Subscription.prototype, Faye.Deferrable),
    Faye.Client = Faye.Class({
        UNCONNECTED: 1,
        CONNECTING: 2,
        CONNECTED: 3,
        DISCONNECTED: 4,
        HANDSHAKE: "handshake",
        RETRY: "retry",
        NONE: "none",
        CONNECTION_TIMEOUT: 60,
        DEFAULT_RETRY: 5,
        MAX_REQUEST_SIZE: 2048,
        DEFAULT_ENDPOINT: "/bayeux",
        INTERVAL: 0,
        initialize: function(e, t) {
            this.info("New client created for ?", e),
            this._options = t || {},
            this.endpoint = Faye.URI.parse(e || this.DEFAULT_ENDPOINT),
            this.endpoints = this._options.endpoints || {},
            this.transports = {},
            this.cookies = Faye.CookieJar && new Faye.CookieJar,
            this.headers = {},
            this.ca = this._options.ca,
            this._disabled = [],
            this._retry = this._options.retry || this.DEFAULT_RETRY;
            for (var n in this.endpoints) this.endpoints[n] = Faye.URI.parse(this.endpoints[n]);
            this.maxRequestSize = this.MAX_REQUEST_SIZE,
            this._state = this.UNCONNECTED,
            this._channels = new Faye.Channel.Set,
            this._messageId = 0,
            this._responseCallbacks = {},
            this._advice = {
                reconnect: this.RETRY,
                interval: 1e3 * (this._options.interval || this.INTERVAL),
                timeout: 1e3 * (this._options.timeout || this.CONNECTION_TIMEOUT)
            },
            Faye.Event && void 0 !== Faye.ENV.onbeforeunload && Faye.Event.on(Faye.ENV, "beforeunload",
            function() {
                Faye.indexOf(this._disabled, "autodisconnect") < 0 && this.disconnect()
            },
            this)
        },
        disable: function(e) {
            this._disabled.push(e)
        },
        setHeader: function(e, t) {
            this.headers[e] = t
        },
        handshake: function(e, t) {
            if (this._advice.reconnect !== this.NONE && this._state === this.UNCONNECTED) {
                this._state = this.CONNECTING;
                var n = this;
                this.info("Initiating handshake with ?", Faye.URI.stringify(this.endpoint)),
                this._selectTransport(Faye.MANDATORY_CONNECTION_TYPES),
                this._send({
                    channel: Faye.Channel.HANDSHAKE,
                    version: Faye.BAYEUX_VERSION,
                    supportedConnectionTypes: [this._transport.connectionType]
                },
                function(i) {
                    i.successful ? (this._state = this.CONNECTED, this._clientId = i.clientId, this._selectTransport(i.supportedConnectionTypes), this.info("Handshake successful: ?", this._clientId), this.subscribe(this._channels.getKeys(), !0), e && Faye.Promise.defer(function() {
                        e.call(t)
                    })) : (this.info("Handshake unsuccessful"), Faye.ENV.setTimeout(function() {
                        n.handshake(e, t)
                    },
                    this._advice.interval), this._state = this.UNCONNECTED)
                },
                this)
            }
        },
        connect: function(e, t) {
            if (this._advice.reconnect !== this.NONE && this._state !== this.DISCONNECTED) {
                if (this._state === this.UNCONNECTED) return this.handshake(function() {
                    this.connect(e, t)
                },
                this);
                this.callback(e, t),
                this._state === this.CONNECTED && (this.info("Calling deferred actions for ?", this._clientId), this.setDeferredStatus("succeeded"), this.setDeferredStatus("unknown"), this._connectRequest || (this._connectRequest = !0, this.info("Initiating connection for ?", this._clientId), this._send({
                    channel: Faye.Channel.CONNECT,
                    clientId: this._clientId,
                    connectionType: this._transport.connectionType
                },
                this._cycleConnection, this)))
            }
        },
        disconnect: function() {
            this._state === this.CONNECTED && (this._state = this.DISCONNECTED, this.info("Disconnecting ?", this._clientId), this._send({
                channel: Faye.Channel.DISCONNECT,
                clientId: this._clientId
            },
            function(e) {
                e.successful && (this._transport.close(), delete this._transport)
            },
            this), this.info("Clearing channel listeners for ?", this._clientId), this._channels = new Faye.Channel.Set)
        },
        subscribe: function(e, t, n) {
            if (e instanceof Array) return Faye.map(e,
            function(e) {
                return this.subscribe(e, t, n)
            },
            this);
            var i = new Faye.Subscription(this, e, t, n),
            o = t === !0,
            r = this._channels.hasSubscription(e);
            return r && !o ? (this._channels.subscribe([e], t, n), i.setDeferredStatus("succeeded"), i) : (this.connect(function() {
                this.info("Client ? attempting to subscribe to ?", this._clientId, e),
                o || this._channels.subscribe([e], t, n),
                this._send({
                    channel: Faye.Channel.SUBSCRIBE,
                    clientId: this._clientId,
                    subscription: e
                },
                function(o) {
                    if (!o.successful) return i.setDeferredStatus("failed", Faye.Error.parse(o.error)),
                    this._channels.unsubscribe(e, t, n);
                    var r = [].concat(o.subscription);
                    this.info("Subscription acknowledged for ? to ?", this._clientId, r),
                    i.setDeferredStatus("succeeded")
                },
                this)
            },
            this), i)
        },
        unsubscribe: function(e, t, n) {
            if (e instanceof Array) return Faye.map(e,
            function(e) {
                return this.unsubscribe(e, t, n)
            },
            this);
            var i = this._channels.unsubscribe(e, t, n);
            i && this.connect(function() {
                this.info("Client ? attempting to unsubscribe from ?", this._clientId, e),
                this._send({
                    channel: Faye.Channel.UNSUBSCRIBE,
                    clientId: this._clientId,
                    subscription: e
                },
                function(e) {
                    if (e.successful) {
                        var t = [].concat(e.subscription);
                        this.info("Unsubscription acknowledged for ? from ?", this._clientId, t)
                    }
                },
                this)
            },
            this)
        },
        publish: function(e, t) {
            var n = new Faye.Publication;
            return this.connect(function() {
                this.info("Client ? queueing published message to ?: ?", this._clientId, e, t),
                this._send({
                    channel: e,
                    data: t,
                    clientId: this._clientId
                },
                function(e) {
                    e.successful ? n.setDeferredStatus("succeeded") : n.setDeferredStatus("failed", Faye.Error.parse(e.error))
                },
                this)
            },
            this),
            n
        },
        receiveMessage: function(e) {
            var t, n = e.id;
            void 0 !== e.successful && (t = this._responseCallbacks[n], delete this._responseCallbacks[n]),
            this.pipeThroughExtensions("incoming", e, null,
            function(e) {
                e && (e.advice && this._handleAdvice(e.advice), this._deliverMessage(e), t && t[0].call(t[1], e))
            },
            this),
            this._transportUp !== !0 && (this._transportUp = !0, this.trigger("transport:up"))
        },
        messageError: function(e, t) {
            for (var n, i, o = this._retry,
            r = this,
            s = 0,
            a = e.length; a > s; s++) i = e[s],
            n = i.id,
            t ? this._transportSend(i) : Faye.ENV.setTimeout(function() {
                r._transportSend(i)
            },
            1e3 * o);
            t || this._transportUp === !1 || (this._transportUp = !1, this.trigger("transport:down"))
        },
        _selectTransport: function(e) {
            Faye.Transport.get(this, e, this._disabled,
            function(e) {
                this.debug("Selected ? transport for ?", e.connectionType, Faye.URI.stringify(e.endpoint)),
                e !== this._transport && (this._transport && this._transport.close(), this._transport = e)
            },
            this)
        },
        _send: function(e, t, n) {
            this._transport && (e.id = e.id || this._generateMessageId(), this.pipeThroughExtensions("outgoing", e, null,
            function(e) {
                e && (t && (this._responseCallbacks[e.id] = [t, n]), this._transportSend(e))
            },
            this))
        },
        _transportSend: function(e) {
            if (this._transport) {
                var t = 1.2 * (this._advice.timeout || 1e3 * this._retry),
                n = new Faye.Envelope(e, t);
                n.errback(function(t) {
                    this.messageError([e], t)
                },
                this),
                this._transport.send(n)
            }
        },
        _generateMessageId: function() {
            return this._messageId += 1,
            this._messageId >= Math.pow(2, 32) && (this._messageId = 0),
            this._messageId.toString(36)
        },
        _handleAdvice: function(e) {
            Faye.extend(this._advice, e),
            this._advice.reconnect === this.HANDSHAKE && this._state !== this.DISCONNECTED && (this._state = this.UNCONNECTED, this._clientId = null, this._cycleConnection())
        },
        _deliverMessage: function(e) {
            e.channel && void 0 !== e.data && (this.info("Client ? calling listeners for ? with ?", this._clientId, e.channel, e.data), this._channels.distributeMessage(e))
        },
        _cycleConnection: function() {
            this._connectRequest && (this._connectRequest = null, this.info("Closed connection for ?", this._clientId));
            var e = this;
            Faye.ENV.setTimeout(function() {
                e.connect()
            },
            this._advice.interval)
        }
    }),
    Faye.extend(Faye.Client.prototype, Faye.Deferrable),
    Faye.extend(Faye.Client.prototype, Faye.Publisher),
    Faye.extend(Faye.Client.prototype, Faye.Logging),
    Faye.extend(Faye.Client.prototype, Faye.Extensible),
    Faye.Transport = Faye.extend(Faye.Class({
        MAX_DELAY: 0,
        batching: !0,
        initialize: function(e, t) {
            this._client = e,
            this.endpoint = t,
            this._outbox = []
        },
        close: function() {},
        encode: function() {
            return ""
        },
        send: function(e) {
            var t = e.message;
            return this.debug("Client ? sending message to ?: ?", this._client._clientId, Faye.URI.stringify(this.endpoint), t),
            this.batching ? (this._outbox.push(e), t.channel === Faye.Channel.HANDSHAKE ? this.addTimeout("publish", .01, this.flush, this) : (t.channel === Faye.Channel.CONNECT && (this._connectMessage = t), this.flushLargeBatch(), void this.addTimeout("publish", this.MAX_DELAY, this.flush, this))) : this.request([e])
        },
        flush: function() {
            this.removeTimeout("publish"),
            this._outbox.length > 1 && this._connectMessage && (this._connectMessage.advice = {
                timeout: 0
            }),
            this.request(this._outbox),
            this._connectMessage = null,
            this._outbox = []
        },
        flushLargeBatch: function() {
            var e = this.encode(this._outbox);
            if (! (e.length < this._client.maxRequestSize)) {
                var t = this._outbox.pop();
                this.flush(),
                t && this._outbox.push(t)
            }
        },
        receive: function(e, t) {
            for (var n = e.length; n--;) e[n].setDeferredStatus("succeeded");
            t = [].concat(t),
            this.debug("Client ? received from ?: ?", this._client._clientId, Faye.URI.stringify(this.endpoint), t);
            for (var i = 0,
            n = t.length; n > i; i++) this._client.receiveMessage(t[i])
        },
        handleError: function(e, t) {
            for (var n = e.length; n--;) e[n].setDeferredStatus("failed", t)
        },
        _getCookies: function() {
            var e = this._client.cookies;
            return e ? e.getCookies({
                domain: this.endpoint.hostname,
                path: this.endpoint.path,
                secure: "https:" === this.endpoint.protocol
            }).toValueString() : ""
        },
        _storeCookies: function(e) {
            if (e && this._client.cookies) {
                e = [].concat(e);
                for (var t, n = 0,
                i = e.length; i > n; n++) t = this._client.cookies.setCookie(e[n]),
                t = t[0] || t,
                t.domain = t.domain || this.endpoint.hostname
            }
        }
    }), {
        get: function(e, t, n, i, o) {
            var r = e.endpoint;
            Faye.asyncEach(this._transports,
            function(s, a) {
                var l = s[0],
                c = s[1],
                u = e.endpoints[l] || r;
                return Faye.indexOf(n, l) >= 0 ? a() : Faye.indexOf(t, l) < 0 ? (c.isUsable(e, u,
                function() {}), a()) : void c.isUsable(e, u,
                function(t) {
                    if (!t) return a();
                    var n = c.hasOwnProperty("create") ? c.create(e, u) : new c(e, u);
                    i.call(o, n)
                })
            },
            function() {
                throw Error("Could not find a usable connection type for " + Faye.URI.stringify(r))
            })
        },
        register: function(e, t) {
            this._transports.push([e, t]),
            t.prototype.connectionType = e
        },
        _transports: []
    }),
    Faye.extend(Faye.Transport.prototype, Faye.Logging),
    Faye.extend(Faye.Transport.prototype, Faye.Timeouts),
    Faye.Event = {
        _registry: [],
        on: function(e, t, n, i) {
            var o = function() {
                n.call(i)
            };
            e.addEventListener ? e.addEventListener(t, o, !1) : e.attachEvent("on" + t, o),
            this._registry.push({
                _element: e,
                _type: t,
                _callback: n,
                _context: i,
                _handler: o
            })
        },
        detach: function(e, t, n, i) {
            for (var o, r = this._registry.length; r--;) o = this._registry[r],
            e && e !== o._element || t && t !== o._type || n && n !== o._callback || i && i !== o._context || (o._element.removeEventListener ? o._element.removeEventListener(o._type, o._handler, !1) : o._element.detachEvent("on" + o._type, o._handler), this._registry.splice(r, 1), o = null)
        }
    },
    void 0 !== Faye.ENV.onunload && Faye.Event.on(Faye.ENV, "unload", Faye.Event.detach, Faye.Event),
    "object" != typeof JSON && (JSON = {}),
    function() {
        function f(e) {
            return 10 > e ? "0" + e: e
        }
        function quote(e) {
            return escapable.lastIndex = 0,
            escapable.test(e) ? '"' + e.replace(escapable,
            function(e) {
                var t = meta[e];
                return "string" == typeof t ? t: "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice( - 4)
            }) + '"': '"' + e + '"'
        }
        function str(e, t) {
            var n, i, o, r, s, a = gap,
            l = t[e];
            switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(e)), "function" == typeof rep && (l = rep.call(t, e, l)), typeof l) {
            case "string":
                return quote(l);
            case "number":
                return isFinite(l) ? l + "": "null";
            case "boolean":
            case "null":
                return l + "";
            case "object":
                if (!l) return "null";
                if (gap += indent, s = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                    for (r = l.length, n = 0; r > n; n += 1) s[n] = str(n, l) || "null";
                    return o = 0 === s.length ? "[]": gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]": "[" + s.join(",") + "]",
                    gap = a,
                    o
                }
                if (rep && "object" == typeof rep) for (r = rep.length, n = 0; r > n; n += 1)"string" == typeof rep[n] && (i = rep[n], o = str(i, l), o && s.push(quote(i) + (gap ? ": ": ":") + o));
                else for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (o = str(i, l), o && s.push(quote(i) + (gap ? ": ": ":") + o));
                return o = 0 === s.length ? "{}": gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}": "{" + s.join(",") + "}",
                gap = a,
                o
            }
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
        },
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "   ": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        rep;
        Faye.stringify = function(e, t, n) {
            var i;
            if (gap = "", indent = "", "number" == typeof n) for (i = 0; n > i; i += 1) indent += " ";
            else "string" == typeof n && (indent = n);
            if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw Error("JSON.stringify");
            return str("", {
                "": e
            })
        },
        "function" != typeof JSON.stringify && (JSON.stringify = Faye.stringify),
        "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var n, i, o = e[t];
                if (o && "object" == typeof o) for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (i = walk(o, n), void 0 !== i ? o[n] = i: delete o[n]);
                return reviver.call(e, t, o)
            }
            var j;
            if (text += "", cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx,
            function(e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice( - 4)
            })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"),
            "function" == typeof reviver ? walk({
                "": j
            },
            "") : j;
            throw new SyntaxError("JSON.parse")
        })
    } (),
    Faye.Transport.WebSocket = Faye.extend(Faye.Class(Faye.Transport, {
        UNCONNECTED: 1,
        CONNECTING: 2,
        CONNECTED: 3,
        batching: !1,
        isUsable: function(e, t) {
            this.callback(function() {
                e.call(t, !0)
            }),
            this.errback(function() {
                e.call(t, !1)
            }),
            this.connect()
        },
        request: function(e) {
            this.callback(function(t) {
                if (t) {
                    for (var n = 0,
                    i = e.length; i > n; n++) this._pending.add(e[n]);
                    var o = Faye.map(e,
                    function(e) {
                        return e.message
                    });
                    t.send(Faye.toJSON(o))
                }
            },
            this),
            this.connect()
        },
        connect: function() {
            if (!Faye.Transport.WebSocket._unloaded && (this._state = this._state || this.UNCONNECTED, this._state === this.UNCONNECTED)) {
                this._state = this.CONNECTING;
                var e = this._createSocket();
                if (!e) return this.setDeferredStatus("failed");
                var t = this;
                e.onopen = function() {
                    e.headers && t._storeCookies(e.headers["set-cookie"]),
                    t._socket = e,
                    t._pending = new Faye.Set,
                    t._state = t.CONNECTED,
                    t._everConnected = !0,
                    t._ping(),
                    t.setDeferredStatus("succeeded", e)
                };
                var n = !1;
                e.onclose = e.onerror = function() {
                    if (!n) {
                        n = !0;
                        var i = t._state === t.CONNECTED;
                        e.onopen = e.onclose = e.onerror = e.onmessage = null,
                        delete t._socket,
                        t._state = t.UNCONNECTED,
                        t.removeTimeout("ping"),
                        t.setDeferredStatus("unknown");
                        var o = t._pending ? t._pending.toArray() : [];
                        delete t._pending,
                        i ? t.handleError(o, !0) : t._everConnected ? t.handleError(o) : t.setDeferredStatus("failed")
                    }
                },
                e.onmessage = function(e) {
                    var n, i = JSON.parse(e.data),
                    o = [];
                    if (i) {
                        i = [].concat(i);
                        for (var r = 0,
                        s = i.length; s > r; r++) void 0 !== i[r].successful && (n = t._pending.remove(i[r]), n && o.push(n));
                        t.receive(o, i)
                    }
                }
            }
        },
        close: function() {
            this._socket && this._socket.close()
        },
        _createSocket: function() {
            var e = Faye.Transport.WebSocket.getSocketUrl(this.endpoint),
            t = {
                headers: Faye.copyObject(this._client.headers),
                ca: this._client.ca
            };
            return t.headers.Cookie = this._getCookies(),
            Faye.WebSocket ? new Faye.WebSocket.Client(e, [], t) : Faye.ENV.MozWebSocket ? new MozWebSocket(e) : Faye.ENV.WebSocket ? new WebSocket(e) : void 0
        },
        _ping: function() {
            this._socket && (this._socket.send("[]"), this.addTimeout("ping", this._client._advice.timeout / 2e3, this._ping, this))
        }
    }), {
        PROTOCOLS: {
            "http:": "ws:",
            "https:": "wss:"
        },
        create: function(e, t) {
            var n = e.transports.websocket = e.transports.websocket || {};
            return n[t.href] = n[t.href] || new this(e, t),
            n[t.href]
        },
        getSocketUrl: function(e) {
            return e = Faye.copyObject(e),
            e.protocol = this.PROTOCOLS[e.protocol],
            Faye.URI.stringify(e)
        },
        isUsable: function(e, t, n, i) {
            this.create(e, t).isUsable(n, i)
        }
    }),
    Faye.extend(Faye.Transport.WebSocket.prototype, Faye.Deferrable),
    Faye.Transport.register("websocket", Faye.Transport.WebSocket),
    Faye.Event && Faye.Event.on(Faye.ENV, "beforeunload",
    function() {
        Faye.Transport.WebSocket._unloaded = !0
    }),
    Faye.Transport.EventSource = Faye.extend(Faye.Class(Faye.Transport, {
        initialize: function(e, t) {
            if (Faye.Transport.prototype.initialize.call(this, e, t), !Faye.ENV.EventSource) return this.setDeferredStatus("failed");
            this._xhr = new Faye.Transport.XHR(e, t),
            t = Faye.copyObject(t),
            t.pathname += "/" + e._clientId;
            var n = new EventSource(Faye.URI.stringify(t)),
            i = this;
            n.onopen = function() {
                i._everConnected = !0,
                i.setDeferredStatus("succeeded")
            },
            n.onerror = function() {
                i._everConnected ? i._client.messageError([]) : (i.setDeferredStatus("failed"), n.close())
            },
            n.onmessage = function(e) {
                i.receive([], JSON.parse(e.data))
            },
            this._socket = n
        },
        close: function() {
            this._socket && (this._socket.onopen = this._socket.onerror = this._socket.onmessage = null, this._socket.close(), delete this._socket)
        },
        isUsable: function(e, t) {
            this.callback(function() {
                e.call(t, !0)
            }),
            this.errback(function() {
                e.call(t, !1)
            })
        },
        encode: function(e) {
            return this._xhr.encode(e)
        },
        request: function(e) {
            this._xhr.request(e)
        }
    }), {
        isUsable: function(e, t, n, i) {
            var o = e._clientId;
            return o ? void Faye.Transport.XHR.isUsable(e, t,
            function(o) {
                return o ? void this.create(e, t).isUsable(n, i) : n.call(i, !1)
            },
            this) : n.call(i, !1)
        },
        create: function(e, t) {
            var n = e.transports.eventsource = e.transports.eventsource || {},
            i = e._clientId;
            t = Faye.copyObject(t),
            t.pathname += "/" + (i || "");
            var o = Faye.URI.stringify(t);
            return n[o] = n[o] || new this(e, t),
            n[o]
        }
    }),
    Faye.extend(Faye.Transport.EventSource.prototype, Faye.Deferrable),
    Faye.Transport.register("eventsource", Faye.Transport.EventSource),
    Faye.Transport.XHR = Faye.extend(Faye.Class(Faye.Transport, {
        encode: function(e) {
            var t = Faye.map(e,
            function(e) {
                return e.message
            });
            return Faye.toJSON(t)
        },
        request: function(e) {
            var t = this.endpoint.path,
            n = Faye.ENV.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest,
            i = this;
            n.open("POST", t, !0),
            n.setRequestHeader("Content-Type", "application/json"),
            n.setRequestHeader("Pragma", "no-cache"),
            n.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            var o = this._client.headers;
            for (var r in o) o.hasOwnProperty(r) && n.setRequestHeader(r, o[r]);
            var s = function() {
                n.abort()
            };
            Faye.Event.on(Faye.ENV, "beforeunload", s),
            n.onreadystatechange = function() {
                if (n && 4 === n.readyState) {
                    var t = null,
                    o = n.status,
                    r = n.responseText,
                    a = o >= 200 && 300 > o || 304 === o || 1223 === o;
                    if (Faye.Event.detach(Faye.ENV, "beforeunload", s), n.onreadystatechange = function() {},
                    n = null, !a) return i.handleError(e);
                    try {
                        t = JSON.parse(r)
                    } catch(l) {}
                    t ? i.receive(e, t) : i.handleError(e)
                }
            },
            n.send(this.encode(e))
        }
    }), {
        isUsable: function(e, t, n, i) {
            n.call(i, Faye.URI.isSameOrigin(t))
        }
    }),
    Faye.Transport.register("long-polling", Faye.Transport.XHR),
    Faye.Transport.CORS = Faye.extend(Faye.Class(Faye.Transport, {
        encode: function(e) {
            var t = Faye.map(e,
            function(e) {
                return e.message
            });
            return "message=" + encodeURIComponent(Faye.toJSON(t))
        },
        request: function(e) {
            var t, n = Faye.ENV.XDomainRequest ? XDomainRequest: XMLHttpRequest,
            i = new n,
            o = this._client.headers,
            r = this;
            if (i.open("POST", Faye.URI.stringify(this.endpoint), !0), i.setRequestHeader) {
                i.setRequestHeader("Pragma", "no-cache");
                for (t in o) o.hasOwnProperty(t) && i.setRequestHeader(t, o[t])
            }
            var s = function() {
                return i ? (i.onload = i.onerror = i.ontimeout = i.onprogress = null, void(i = null)) : !1
            };
            i.onload = function() {
                var t = null;
                try {
                    t = JSON.parse(i.responseText)
                } catch(n) {}
                s(),
                t ? r.receive(e, t) : r.handleError(e)
            },
            i.onerror = i.ontimeout = function() {
                s(),
                r.handleError(e)
            },
            i.onprogress = function() {},
            i.send(this.encode(e))
        }
    }), {
        isUsable: function(e, t, n, i) {
            if (Faye.URI.isSameOrigin(t)) return n.call(i, !1);
            if (Faye.ENV.XDomainRequest) return n.call(i, t.protocol === Faye.ENV.location.protocol);
            if (Faye.ENV.XMLHttpRequest) {
                var o = new Faye.ENV.XMLHttpRequest;
                return n.call(i, void 0 !== o.withCredentials)
            }
            return n.call(i, !1)
        }
    }),
    Faye.Transport.register("cross-origin-long-polling", Faye.Transport.CORS),
    Faye.Transport.JSONP = Faye.extend(Faye.Class(Faye.Transport, {
        encode: function(e) {
            var t = Faye.map(e,
            function(e) {
                return e.message
            }),
            n = Faye.copyObject(this.endpoint);
            return n.query.message = Faye.toJSON(t),
            n.query.jsonp = "__jsonp" + Faye.Transport.JSONP._cbCount + "__",
            Faye.URI.stringify(n)
        },
        request: function(e) {
            var t = Faye.map(e,
            function(e) {
                return e.message
            }),
            n = document.getElementsByTagName("head")[0],
            i = document.createElement("script"),
            o = Faye.Transport.JSONP.getCallbackName(),
            r = Faye.copyObject(this.endpoint),
            s = this;
            r.query.message = Faye.toJSON(t),
            r.query.jsonp = o,
            Faye.ENV[o] = function(t) {
                if (!Faye.ENV[o]) return ! 1;
                Faye.ENV[o] = void 0;
                try {
                    delete Faye.ENV[o]
                } catch(n) {}
                i.parentNode.removeChild(i),
                s.receive(e, t)
            },
            i.type = "text/javascript",
            i.src = Faye.URI.stringify(r),
            n.appendChild(i)
        }
    }), {
        _cbCount: 0,
        getCallbackName: function() {
            return this._cbCount += 1,
            "__jsonp" + this._cbCount + "__"
        },
        isUsable: function(e, t, n, i) {
            n.call(i, !0)
        }
    }),
    Faye.Transport.register("callback-polling", Faye.Transport.JSONP)
} (),
function(e) {
    "undefined" == typeof e.fn.each2 && e.fn.extend({
        each2: function(t) {
            for (var n = e([0]), i = -1, o = this.length; ++i < o && (n.context = n[0] = this[i]) && t.call(n[0], i, n) !== !1;);
            return this
        }
    })
} (jQuery),
function(e, t) {
    "use strict";
    function n(e, t) {
        var n, i = 0,
        o = t.length;
        if ("undefined" == typeof e) return - 1;
        if (e.constructor === String) {
            for (; o > i; i += 1) if (0 === e.localeCompare(t[i])) return i
        } else for (; o > i; i += 1) if (n = t[i], n.constructor === String) {
            if (0 === n.localeCompare(e)) return i
        } else if (n === e) return i;
        return - 1
    }
    function i(e, n) {
        return e === n ? !0 : e === t || n === t ? !1 : null === e || null === n ? !1 : e.constructor === String ? 0 === e.localeCompare(n) : n.constructor === String ? 0 === n.localeCompare(e) : !1
    }
    function o(t, n) {
        var i, o, r;
        if (null === t || t.length < 1) return [];
        for (i = t.split(n), o = 0, r = i.length; r > o; o += 1) i[o] = e.trim(i[o]);
        return i
    }
    function r(e) {
        return e.outerWidth(!1) - e.width()
    }
    function s(n) {
        var i = "keyup-change-value";
        n.bind("keydown",
        function() {
            e.data(n, i) === t && e.data(n, i, n.val())
        }),
        n.bind("keyup",
        function() {
            var o = e.data(n, i);
            o !== t && n.val() !== o && (e.removeData(n, i), n.trigger("keyup-change"))
        })
    }
    function a(n) {
        n.bind("mousemove",
        function(n) {
            var i = N; (i === t || i.x !== n.pageX || i.y !== n.pageY) && e(n.target).trigger("mousemove-filtered", n)
        })
    }
    function l(e, n, i) {
        i = i || t;
        var o;
        return function() {
            var t = arguments;
            window.clearTimeout(o),
            o = window.setTimeout(function() {
                n.apply(i, t)
            },
            e)
        }
    }
    function c(e) {
        var t, n = !1;
        return function() {
            return n === !1 && (t = e(), n = !0),
            t
        }
    }
    function u(e, t) {
        var i = l(e,
        function(e) {
            t.trigger("scroll-debounced", e)
        });
        t.bind("scroll",
        function(e) {
            n(e.target, t.get()) >= 0 && i(e)
        })
    }
    function d(e) {
        e.preventDefault(),
        e.stopPropagation()
    }
    function h(e) {
        e.preventDefault(),
        e.stopImmediatePropagation()
    }
    function p(t) {
        if (!A) {
            var n = t[0].currentStyle || window.getComputedStyle(t[0], null);
            A = e("<div></div>").css({
                position: "absolute",
                left: "-10000px",
                top: "-10000px",
                display: "none",
                fontSize: n.fontSize,
                fontFamily: n.fontFamily,
                fontStyle: n.fontStyle,
                fontWeight: n.fontWeight,
                letterSpacing: n.letterSpacing,
                textTransform: n.textTransform,
                whiteSpace: "nowrap"
            }),
            e("body").append(A)
        }
        return A.text(t.val()),
        A.width()
    }
    function f(e, t, n, i) {
        var o = e.toUpperCase().indexOf(t.toUpperCase()),
        r = t.length;
        return 0 > o ? void n.push(i(e)) : (n.push(i(e.substring(0, o))), n.push("<span class='select2-match'>"), n.push(i(e.substring(o, o + r))), n.push("</span>"), void n.push(i(e.substring(o + r, e.length))))
    }
    function m(t) {
        var n, i = 0,
        o = null,
        r = t.quietMillis || 100;
        return function(s) {
            window.clearTimeout(n),
            n = window.setTimeout(function() {
                i += 1;
                var n = i,
                r = t.data,
                a = t.transport || e.ajax,
                l = t.traditional || !1,
                c = t.type || "GET";
                r = r.call(this, s.term, s.page, s.context),
                null !== o && o.abort(),
                o = a.call(null, {
                    url: "function" == typeof t.url ? t.url() : t.url,
                    dataType: t.dataType,
                    data: r,
                    type: c,
                    traditional: l,
                    success: function(e) {
                        if (! (i > n)) {
                            var o = t.results(e, s.page);
                            s.callback(o)
                        }
                    }
                })
            },
            r)
        }
    }
    function g(t) {
        var n, i = t,
        o = function(e) {
            return "" + e.text
        };
        return e.isArray(i) || (o = i.text, e.isFunction(o) || (n = i.text, o = function(e) {
            return e[n]
        }), i = i.results),
        function(t) {
            var n, r = t.term,
            s = {
                results: []
            };
            return "" === r ? void t.callback({
                results: i
            }) : (n = function(i, s) {
                var a, l;
                if (i = i[0], i.children) {
                    a = {};
                    for (l in i) i.hasOwnProperty(l) && (a[l] = i[l]);
                    a.children = [],
                    e(i.children).each2(function(e, t) {
                        n(t, a.children)
                    }),
                    (a.children.length || t.matcher(r, o(a))) && s.push(a)
                } else t.matcher(r, o(i)) && s.push(i)
            },
            e(i).each2(function(e, t) {
                n(t, s.results)
            }), void t.callback(s))
        }
    }
    function y(n) {
        return e.isFunction(n) ? n: function(i) {
            var o = i.term,
            r = {
                results: []
            };
            e(n).each(function() {
                var e = this.text !== t,
                n = e ? this.text: this; ("" === o || i.matcher(o, n)) && r.results.push(e ? this: {
                    id: this,
                    text: this
                })
            }),
            i.callback(r)
        }
    }
    function b(t) {
        if (e.isFunction(t)) return ! 0;
        if (!t) return ! 1;
        throw new Error("formatterName must be a function or a falsy value")
    }
    function v(t) {
        return e.isFunction(t) ? t() : t
    }
    function _(t) {
        var n = 0;
        return e.each(t,
        function(e, t) {
            t.children ? n += _(t.children) : n++
        }),
        n
    }
    function w(e, n, o, r) {
        var s, a, l, c, u, d = e,
        h = !1;
        if (!r.createSearchChoice || !r.tokenSeparators || r.tokenSeparators.length < 1) return t;
        for (;;) {
            for (a = -1, l = 0, c = r.tokenSeparators.length; c > l && (u = r.tokenSeparators[l], a = e.indexOf(u), !(a >= 0)); l++);
            if (0 > a) break;
            if (s = e.substring(0, a), e = e.substring(a + u.length), s.length > 0 && (s = r.createSearchChoice(s, n), s !== t && null !== s && r.id(s) !== t && null !== r.id(s))) {
                for (h = !1, l = 0, c = n.length; c > l; l++) if (i(r.id(s), r.id(n[l]))) {
                    h = !0;
                    break
                }
                h || o(s)
            }
        }
        return 0 != d.localeCompare(e) ? e: void 0
    }
    function x(t, n) {
        var i = function() {};
        return i.prototype = new t,
        i.prototype.constructor = i,
        i.prototype.parent = t.prototype,
        i.prototype = e.extend(i.prototype, n),
        i
    }
    if (window.Select2 === t) {
        var C, k, T, S, E, A, N, F;
        C = {
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            SPACE: 32,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            HOME: 36,
            END: 35,
            BACKSPACE: 8,
            DELETE: 46,
            isArrow: function(e) {
                switch (e = e.which ? e.which: e) {
                case C.LEFT:
                case C.RIGHT:
                case C.UP:
                case C.DOWN:
                    return ! 0
                }
                return ! 1
            },
            isControl: function(e) {
                var t = e.which;
                switch (t) {
                case C.SHIFT:
                case C.CTRL:
                case C.ALT:
                    return ! 0
                }
                return e.metaKey ? !0 : !1
            },
            isFunctionKey: function(e) {
                return e = e.which ? e.which: e,
                e >= 112 && 123 >= e
            }
        },
        F = e(document),
        E = function() {
            var e = 1;
            return function() {
                return e++
            }
        } (),
        F.bind("mousemove",
        function(e) {
            N = {
                x: e.pageX,
                y: e.pageY
            }
        }),
        F.ready(function() {
            F.bind("mousedown touchend",
            function(n) {
                var i, o = e(n.target).closest("div.select2-container").get(0),
                r = null;
                o && (F.find("div.select2-container-active").each(function() {
                    this !== o && e(this).data("select2").blur()
                }), r = e(o).data("select2").dropdown.get(0)),
                o = r || e(n.target).closest("div.select2-drop").get(0),
                F.find("div.select2-drop-active").each(function() {
                    this !== o && e(this).data("select2").blur()
                }),
                o = e(n.target),
                i = o.attr("for"),
                "LABEL" === n.target.tagName && i && i.length > 0 && (i = i.replace(/([\[\].])/g, "\\$1"), o = e("#" + i), o = o.data("select2"), o !== t && (o.focus(), n.preventDefault()))
            })
        }),
        k = x(Object, {
            bind: function(e) {
                var t = this;
                return function() {
                    e.apply(t, arguments)
                }
            },
            init: function(n) {
                var i, o, r = ".select2-results";
                this.opts = n = this.prepareOpts(n),
                this.id = n.id,
                n.element.data("select2") !== t && null !== n.element.data("select2") && this.destroy(),
                this.enabled = !0,
                this.container = this.createContainer(),
                this.containerId = "s2id_" + (n.element.attr("id") || "autogen" + E()),
                this.containerSelector = "#" + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"),
                this.container.attr("id", this.containerId),
                this.body = c(function() {
                    return n.element.closest("body")
                }),
                n.element.attr("class") !== t && this.container.addClass(n.element.attr("class").replace(/validate\[[\S ]+] ?/, "")),
                this.container.css(v(n.containerCss)),
                this.container.addClass(v(n.containerCssClass)),
                this.opts.element.data("select2", this).hide().before(this.container),
                this.container.data("select2", this),
                this.dropdown = this.container.find(".select2-drop"),
                this.dropdown.addClass(v(n.dropdownCssClass)),
                this.dropdown.data("select2", this),
                this.results = i = this.container.find(r),
                this.search = o = this.container.find("input.select2-input"),
                o.attr("tabIndex", this.opts.element.attr("tabIndex")),
                this.resultsPage = 0,
                this.context = null,
                this.initContainer(),
                this.initContainerWidth(),
                a(this.results),
                this.dropdown.delegate(r, "mousemove-filtered", this.bind(this.highlightUnderEvent)),
                u(80, this.results),
                this.dropdown.delegate(r, "scroll-debounced", this.bind(this.loadMoreIfNeeded)),
                e.fn.mousewheel && i.mousewheel(function(e, t, n, o) {
                    var r = i.scrollTop();
                    o > 0 && 0 >= r - o ? (i.scrollTop(0), d(e)) : 0 > o && i.get(0).scrollHeight - i.scrollTop() + o <= i.height() && (i.scrollTop(i.get(0).scrollHeight - i.height()), d(e))
                }),
                s(o),
                o.bind("keyup-change", this.bind(this.updateResults)),
                o.bind("focus",
                function() {
                    o.addClass("select2-focused"),
                    " " === o.val() && o.val("")
                }),
                o.bind("blur",
                function() {
                    o.removeClass("select2-focused")
                }),
                this.dropdown.delegate(r, "mouseup", this.bind(function(t) {
                    e(t.target).closest(".select2-result-selectable:not(.select2-disabled)").length > 0 ? (this.highlightUnderEvent(t), this.selectHighlighted(t)) : this.focusSearch(),
                    d(t)
                })),
                this.dropdown.bind("click mouseup mousedown",
                function(e) {
                    e.stopPropagation()
                }),
                e.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()),
                (n.element.is(":disabled") || n.element.is("[readonly='readonly']")) && this.disable()
            },
            destroy: function() {
                var e = this.opts.element.data("select2");
                e !== t && (e.container.remove(), e.dropdown.remove(), e.opts.element.removeData("select2").unbind(".select2").show())
            },
            prepareOpts: function(n) {
                var r, s, a, l;
                if (r = n.element, "select" === r.get(0).tagName.toLowerCase() && (this.select = s = n.element), s && e.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"],
                function() {
                    if (this in n) throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                }), n = e.extend({},
                {
                    populateResults: function(i, o, r) {
                        var s, a = this.opts.id,
                        l = this; (s = function(i, o, c) {
                            var u, d, h, p, f, m, g, y, b, v;
                            for (i = n.sortResults(i, o, r), u = 0, d = i.length; d > u; u += 1) h = i[u],
                            f = h.disabled === !0,
                            p = !f && a(h) !== t,
                            m = h.children && h.children.length > 0,
                            g = e("<li></li>"),
                            g.addClass("select2-results-dept-" + c),
                            g.addClass("select2-result"),
                            g.addClass(p ? "select2-result-selectable": "select2-result-unselectable"),
                            f && g.addClass("select2-disabled"),
                            m && g.addClass("select2-result-with-children"),
                            g.addClass(l.opts.formatResultCssClass(h)),
                            y = e("<div></div>"),
                            y.addClass("select2-result-label"),
                            v = n.formatResult(h, y, r),
                            v !== t && y.html(v),
                            g.append(y),
                            m && (b = e("<ul></ul>"), b.addClass("select2-result-sub"), s(h.children, b, c + 1), g.append(b)),
                            g.data("select2-data", h),
                            o.append(g)
                        })(o, i, 0)
                    }
                },
                e.fn.select2.defaults, n), "function" != typeof n.id && (a = n.id, n.id = function(e) {
                    return e[a]
                }), s ? (n.query = this.bind(function(n) {
                    var o, s, a, l = {
                        results: [],
                        more: !1
                    },
                    c = n.term;
                    a = function(e, t) {
                        var o;
                        e.is("option") ? n.matcher(c, e.text(), e) && t.push({
                            id: e.attr("value"),
                            text: e.text(),
                            element: e.get(),
                            css: e.attr("class"),
                            disabled: i(e.attr("disabled"), "disabled")
                        }) : e.is("optgroup") && (o = {
                            text: e.attr("label"),
                            children: [],
                            element: e.get(),
                            css: e.attr("class")
                        },
                        e.children().each2(function(e, t) {
                            a(t, o.children)
                        }), o.children.length > 0 && t.push(o))
                    },
                    o = r.children(),
                    this.getPlaceholder() !== t && o.length > 0 && (s = o[0], "" === e(s).text() && (o = o.not(s))),
                    o.each2(function(e, t) {
                        a(t, l.results)
                    }),
                    n.callback(l)
                }), n.id = function(e) {
                    return e.id
                },
                n.formatResultCssClass = function(e) {
                    return e.css
                }) : "query" in n || ("ajax" in n ? (l = n.element.data("ajax-url"), l && l.length > 0 && (n.ajax.url = l), n.query = m(n.ajax)) : "data" in n ? n.query = g(n.data) : "tags" in n && (n.query = y(n.tags), n.createSearchChoice === t && (n.createSearchChoice = function(e) {
                    return {
                        id: e,
                        text: e
                    }
                }), n.initSelection = function(t, r) {
                    var s = [];
                    e(o(t.val(), n.separator)).each(function() {
                        var t = this,
                        o = this,
                        r = n.tags;
                        e.isFunction(r) && (r = r()),
                        e(r).each(function() {
                            return i(this.id, t) ? (o = this.text, !1) : void 0
                        }),
                        s.push({
                            id: t,
                            text: o
                        })
                    }),
                    r(s)
                })), "function" != typeof n.query) throw "query function not defined for Select2 " + n.element.attr("id");
                return n
            },
            monitorSource: function() {
                this.opts.element.bind("change.select2", this.bind(function() {
                    this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                }))
            },
            triggerChange: function(t) {
                t = t || {},
                t = e.extend({},
                t, {
                    type: "change",
                    val: this.val()
                }),
                this.opts.element.data("select2-change-triggered", !0),
                this.opts.element.trigger(t),
                this.opts.element.data("select2-change-triggered", !1),
                this.opts.element.click(),
                this.opts.blurOnChange && this.opts.element.blur()
            },
            enable: function() {
                this.enabled || (this.enabled = !0, this.container.removeClass("select2-container-disabled"), this.opts.element.removeAttr("disabled"))
            },
            disable: function() {
                this.enabled && (this.close(), this.enabled = !1, this.container.addClass("select2-container-disabled"), this.opts.element.attr("disabled", "disabled"))
            },
            opened: function() {
                return this.container.hasClass("select2-dropdown-open")
            },
            positionDropdown: function() {
                var t, n, i, o = this.container.offset(),
                r = this.container.outerHeight(!1),
                s = this.container.outerWidth(!1),
                a = this.dropdown.outerHeight(!1),
                l = e(window).scrollLeft() + document.documentElement.clientWidth,
                c = e(window).scrollTop() + document.documentElement.clientHeight,
                u = o.top + r,
                d = o.left,
                h = c >= u + a,
                p = o.top - a >= this.body().scrollTop(),
                f = this.dropdown.outerWidth(!1),
                m = l >= d + f,
                g = this.dropdown.hasClass("select2-drop-above");
                "static" !== this.body().css("position") && (t = this.body().offset(), u -= t.top, d -= t.left),
                g ? (n = !0, !p && h && (n = !1)) : (n = !1, !h && p && (n = !0)),
                m || (d = o.left + s - f),
                n ? (u = o.top - a, this.container.addClass("select2-drop-above"), this.dropdown.addClass("select2-drop-above")) : (this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")),
                i = e.extend({
                    top: u,
                    left: d,
                    width: s
                },
                v(this.opts.dropdownCss)),
                this.dropdown.css(i)
            },
            shouldOpen: function() {
                var t;
                return this.opened() ? !1 : (t = e.Event("open"), this.opts.element.trigger(t), !t.isDefaultPrevented())
            },
            clearDropdownAlignmentPreference: function() {
                this.container.removeClass("select2-drop-above"),
                this.dropdown.removeClass("select2-drop-above")
            },
            open: function() {
                return this.shouldOpen() ? (window.setTimeout(this.bind(this.opening), 1), !0) : !1
            },
            opening: function() {
                var t = this.containerId,
                n = this.containerSelector,
                i = "scroll." + t,
                o = "resize." + t;
                this.container.parents().each(function() {
                    e(this).bind(i,
                    function() {
                        var t = e(n);
                        0 == t.length && e(this).unbind(i),
                        t.select2("close")
                    })
                }),
                window.setTimeout(function() {
                    e(window).bind(o,
                    function() {
                        var t = e(n);
                        0 == t.length && e(window).unbind(o),
                        t.select2("close")
                    })
                },
                10),
                this.clearDropdownAlignmentPreference(),
                " " === this.search.val() && this.search.val(""),
                this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),
                this.updateResults(!0),
                this.dropdown[0] !== this.body().children().last()[0] && this.dropdown.detach().appendTo(this.body()),
                this.dropdown.show(),
                this.positionDropdown(),
                this.dropdown.addClass("select2-drop-active"),
                this.ensureHighlightVisible(),
                this.focusSearch()
            },
            close: function() {
                if (this.opened()) {
                    var t = this;
                    this.container.parents().each(function() {
                        e(this).unbind("scroll." + t.containerId)
                    }),
                    e(window).unbind("resize." + this.containerId),
                    this.clearDropdownAlignmentPreference(),
                    this.dropdown.hide(),
                    this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"),
                    this.results.empty(),
                    this.clearSearch(),
                    this.opts.element.trigger(e.Event("close"))
                }
            },
            clearSearch: function() {},
            ensureHighlightVisible: function() {
                var t, n, i, o, r, s, a, l = this.results;
                if (n = this.highlight(), !(0 > n)) {
                    if (0 == n) return void l.scrollTop(0);
                    t = l.find(".select2-result-selectable"),
                    i = e(t[n]),
                    o = i.offset().top + i.outerHeight(!0),
                    n === t.length - 1 && (a = l.find("li.select2-more-results"), a.length > 0 && (o = a.offset().top + a.outerHeight(!0))),
                    r = l.offset().top + l.outerHeight(!0),
                    o > r && l.scrollTop(l.scrollTop() + (o - r)),
                    s = i.offset().top - l.offset().top,
                    0 > s && "none" != i.css("display") && l.scrollTop(l.scrollTop() + s)
                }
            },
            moveHighlight: function(t) {
                for (var n = this.results.find(".select2-result-selectable"), i = this.highlight(); i > -1 && i < n.length;) {
                    i += t;
                    var o = e(n[i]);
                    if (o.hasClass("select2-result-selectable") && !o.hasClass("select2-disabled")) {
                        this.highlight(i);
                        break
                    }
                }
            },
            highlight: function(t) {
                var i = this.results.find(".select2-result-selectable").not(".select2-disabled");
                return 0 === arguments.length ? n(i.filter(".select2-highlighted")[0], i.get()) : (t >= i.length && (t = i.length - 1), 0 > t && (t = 0), i.removeClass("select2-highlighted"), e(i[t]).addClass("select2-highlighted"), void this.ensureHighlightVisible())
            },
            countSelectableResults: function() {
                return this.results.find(".select2-result-selectable").not(".select2-disabled").length
            },
            highlightUnderEvent: function(t) {
                var n = e(t.target).closest(".select2-result-selectable");
                if (n.length > 0 && !n.is(".select2-highlighted")) {
                    var i = this.results.find(".select2-result-selectable");
                    this.highlight(i.index(n))
                } else 0 == n.length && this.results.find(".select2-highlighted").removeClass("select2-highlighted")
            },
            loadMoreIfNeeded: function() {
                var e, t = this.results,
                n = t.find("li.select2-more-results"),
                i = this.resultsPage + 1,
                o = this,
                r = this.search.val(),
                s = this.context;
                0 !== n.length && (e = n.offset().top - t.offset().top - t.height(), e <= this.opts.loadMorePadding && (n.addClass("select2-active"), this.opts.query({
                    term: r,
                    page: i,
                    context: s,
                    matcher: this.opts.matcher,
                    callback: this.bind(function(e) {
                        o.opened() && (o.opts.populateResults.call(this, t, e.results, {
                            term: r,
                            page: i,
                            context: s
                        }), e.more === !0 ? (n.detach().appendTo(t).text(o.opts.formatLoadMore(i + 1)), window.setTimeout(function() {
                            o.loadMoreIfNeeded()
                        },
                        10)) : n.remove(), o.positionDropdown(), o.resultsPage = i)
                    })
                })))
            },
            tokenize: function() {},
            updateResults: function(n) {
                function o() {
                    c.scrollTop(0),
                    l.removeClass("select2-active"),
                    d.positionDropdown()
                }
                function r(e) {
                    c.html(e),
                    o()
                }
                var s, a, l = this.search,
                c = this.results,
                u = this.opts,
                d = this;
                if (n === !0 || this.showSearchInput !== !1 && this.opened()) {
                    if (l.addClass("select2-active"), u.maximumSelectionSize >= 1 && (s = this.data(), e.isArray(s) && s.length >= u.maximumSelectionSize && b(u.formatSelectionTooBig, "formatSelectionTooBig"))) return void r("<li class='select2-selection-limit'>" + u.formatSelectionTooBig(u.maximumSelectionSize) + "</li>");
                    if (l.val().length < u.minimumInputLength) return void r(b(u.formatInputTooShort, "formatInputTooShort") ? "<li class='select2-no-results'>" + u.formatInputTooShort(l.val(), u.minimumInputLength) + "</li>": "");
                    if (u.formatSearching() && r("<li class='select2-searching'>" + u.formatSearching() + "</li>"), u.maximumInputLength && l.val().length > u.maximumInputLength) return void r(b(u.formatInputTooLong, "formatInputTooLong") ? "<li class='select2-no-results'>" + u.formatInputTooLong(l.val(), u.maximumInputLength) + "</li>": "");
                    a = this.tokenize(),
                    a != t && null != a && l.val(a),
                    this.resultsPage = 1,
                    u.query({
                        term: l.val(),
                        page: this.resultsPage,
                        context: null,
                        matcher: u.matcher,
                        callback: this.bind(function(s) {
                            var a;
                            if (this.opened()) {
                                if (this.context = s.context === t ? null: s.context, this.opts.createSearchChoice && "" !== l.val() && (a = this.opts.createSearchChoice.call(null, l.val(), s.results), a !== t && null !== a && d.id(a) !== t && null !== d.id(a) && 0 === e(s.results).filter(function() {
                                    return i(d.id(this), d.id(a))
                                }).length && s.results.unshift(a)), 0 === s.results.length && b(u.formatNoMatches, "formatNoMatches")) return void r("<li class='select2-no-results'>" + u.formatNoMatches(l.val()) + "</li>");
                                c.empty(),
                                d.opts.populateResults.call(this, c, s.results, {
                                    term: l.val(),
                                    page: this.resultsPage,
                                    context: null
                                }),
                                s.more === !0 && b(u.formatLoadMore, "formatLoadMore") && (c.append("<li class='select2-more-results'>" + d.opts.escapeMarkup(u.formatLoadMore(this.resultsPage)) + "</li>"), window.setTimeout(function() {
                                    d.loadMoreIfNeeded()
                                },
                                10)),
                                this.postprocessResults(s, n),
                                o()
                            }
                        })
                    })
                }
            },
            cancel: function() {
                this.close()
            },
            blur: function() {
                this.opts.selectOnBlur && this.selectHighlighted({
                    noFocus: !0
                }),
                this.close(),
                this.container.removeClass("select2-container-active"),
                this.dropdown.removeClass("select2-drop-active"),
                this.search[0] === document.activeElement && this.search.blur(),
                this.clearSearch(),
                this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),
                this.opts.element.triggerHandler("blur")
            },
            focusSearch: function() {
                this.search.show(),
                this.search.focus(),
                window.setTimeout(this.bind(function() {
                    this.search.show(),
                    this.search.focus(),
                    this.search.val(this.search.val())
                }), 10)
            },
            selectHighlighted: function(e) {
                var t = this.highlight(),
                n = this.results.find(".select2-highlighted").not(".select2-disabled"),
                i = n.closest(".select2-result-selectable").data("select2-data");
                i && (n.addClass("select2-disabled"), this.highlight(t), this.onSelect(i, e))
            },
            getPlaceholder: function() {
                return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder
            },
            initContainerWidth: function() {
                function n() {
                    var n, i, o, r, s;
                    if ("off" === this.opts.width) return null;
                    if ("element" === this.opts.width) return 0 === this.opts.element.outerWidth(!1) ? "auto": this.opts.element.outerWidth(!1) + "px";
                    if ("copy" === this.opts.width || "resolve" === this.opts.width) {
                        if (n = this.opts.element.attr("style"), n !== t) for (i = n.split(";"), r = 0, s = i.length; s > r; r += 1) if (o = i[r].replace(/\s/g, "").match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/), null !== o && o.length >= 1) return o[1];
                        return "resolve" === this.opts.width ? (n = this.opts.element.css("width"), n.indexOf("%") > 0 ? n: 0 === this.opts.element.outerWidth(!1) ? "auto": this.opts.element.outerWidth(!1) + "px") : null
                    }
                    return e.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                }
                var i = n.call(this);
                null !== i && this.container.attr("style", "width: " + i)
            }
        }),
        T = x(k, {
            createContainer: function() {
                var t = e("<div></div>", {
                    "class": "select2-container"
                }).html(["    <a href='javascript:void(0)' onclick='return false;' class='select2-choice'>", "   <span></span><abbr class='select2-search-choice-close' style='display:none;'></abbr>", "   <div><b></b></div>", "</a>", "    <div class='select2-drop select2-offscreen'>", "   <div class='select2-search'>", "       <input type='text' autocomplete='off' class='select2-input'/>", "   </div>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return t
            },
            opening: function() {
                this.search.show(),
                this.parent.opening.apply(this, arguments),
                this.dropdown.removeClass("select2-offscreen")
            },
            close: function() {
                this.opened() && (this.parent.close.apply(this, arguments), this.dropdown.removeAttr("style").addClass("select2-offscreen").insertAfter(this.selection).show())
            },
            focus: function() {
                this.close(),
                this.selection.focus()
            },
            isFocused: function() {
                return this.selection[0] === document.activeElement
            },
            cancel: function() {
                this.parent.cancel.apply(this, arguments),
                this.selection.focus()
            },
            initContainer: function() {
                var e, t = this.container,
                n = this.dropdown,
                i = !1;
                this.selection = e = t.find(".select2-choice"),
                this.search.bind("keydown", this.bind(function(e) {
                    if (this.enabled) {
                        if (e.which === C.PAGE_UP || e.which === C.PAGE_DOWN) return void d(e);
                        if (this.opened()) switch (e.which) {
                        case C.UP:
                        case C.DOWN:
                            return this.moveHighlight(e.which === C.UP ? -1 : 1),
                            void d(e);
                        case C.TAB:
                        case C.ENTER:
                            return this.selectHighlighted(),
                            void d(e);
                        case C.ESC:
                            return this.cancel(e),
                            void d(e)
                        } else {
                            if (e.which === C.TAB || C.isControl(e) || C.isFunctionKey(e) || e.which === C.ESC) return;
                            if (this.opts.openOnEnter === !1 && e.which === C.ENTER) return;
                            if (this.open(), e.which === C.ENTER) return
                        }
                    }
                })),
                this.search.bind("focus", this.bind(function() {
                    this.selection.attr("tabIndex", "-1")
                })),
                this.search.bind("blur", this.bind(function() {
                    this.opened() || this.container.removeClass("select2-container-active"),
                    window.setTimeout(this.bind(function() {
                        var e = this.opts.element.attr("tabIndex") || 0;
                        e ? this.selection.attr("tabIndex", e) : this.selection.removeAttr("tabIndex")
                    }), 10)
                })),
                e.delegate("abbr", "mousedown", this.bind(function(e) {
                    this.enabled && (this.clear(), h(e), this.close(), this.triggerChange(), this.selection.focus())
                })),
                e.bind("mousedown", this.bind(function() {
                    i = !0,
                    this.opened() ? (this.close(), this.selection.focus()) : this.enabled && this.open(),
                    i = !1
                })),
                n.bind("mousedown", this.bind(function() {
                    this.search.focus()
                })),
                e.bind("focus", this.bind(function() {
                    this.container.addClass("select2-container-active"),
                    this.search.attr("tabIndex", "-1")
                })),
                e.bind("blur", this.bind(function() {
                    this.opened() || this.container.removeClass("select2-container-active"),
                    window.setTimeout(this.bind(function() {
                        this.search.attr("tabIndex", this.opts.element.attr("tabIndex") || 0)
                    }), 10)
                })),
                e.bind("keydown", this.bind(function(e) {
                    return this.enabled ? e.which == C.DOWN || e.which == C.UP || e.which == C.ENTER && this.opts.openOnEnter ? (this.open(), void d(e)) : e.which == C.DELETE || e.which == C.BACKSPACE ? (this.opts.allowClear && this.clear(), void d(e)) : void 0 : void 0
                })),
                e.bind("keypress", this.bind(function(e) {
                    var t = String.fromCharCode(e.which);
                    this.search.val(t),
                    this.open()
                })),
                this.setPlaceholder(),
                this.search.bind("focus", this.bind(function() {
                    this.container.addClass("select2-container-active")
                }))
            },
            clear: function() {
                this.opts.element.val(""),
                this.selection.find("span").empty(),
                this.selection.removeData("select2-data"),
                this.setPlaceholder()
            },
            initSelection: function() {
                if ("" === this.opts.element.val() && "" === this.opts.element.text()) this.close(),
                this.setPlaceholder();
                else {
                    var e = this;
                    this.opts.initSelection.call(null, this.opts.element,
                    function(n) {
                        n !== t && null !== n && (e.updateSelection(n), e.close(), e.setPlaceholder())
                    })
                }
            },
            prepareOpts: function() {
                var t = this.parent.prepareOpts.apply(this, arguments);
                return "select" === t.element.get(0).tagName.toLowerCase() && (t.initSelection = function(t, n) {
                    var i = t.find(":selected");
                    e.isFunction(n) && n({
                        id: i.attr("value"),
                        text: i.text(),
                        element: i
                    })
                }),
                t
            },
            setPlaceholder: function() {
                var e = this.getPlaceholder();
                if ("" === this.opts.element.val() && e !== t) {
                    if (this.select && "" !== this.select.find("option:first").text()) return;
                    this.selection.find("span").html(this.opts.escapeMarkup(e)),
                    this.selection.addClass("select2-default"),
                    this.selection.find("abbr").hide()
                }
            },
            postprocessResults: function(t, n) {
                var o = 0,
                r = this,
                s = !0;
                this.results.find(".select2-result-selectable").each2(function(e, t) {
                    return i(r.id(t.data("select2-data")), r.opts.element.val()) ? (o = e, !1) : void 0
                }),
                this.highlight(o),
                n === !0 && (s = this.showSearchInput = _(t.results) >= this.opts.minimumResultsForSearch, this.dropdown.find(".select2-search")[s ? "removeClass": "addClass"]("select2-search-hidden"), e(this.dropdown, this.container)[s ? "addClass": "removeClass"]("select2-with-searchbox"))
            },
            onSelect: function(e, t) {
                var n = this.opts.element.val();
                this.opts.element.val(this.id(e)),
                this.updateSelection(e),
                this.close(),
                t && t.noFocus || this.selection.focus(),
                i(n, this.id(e)) || this.triggerChange()
            },
            updateSelection: function(e) {
                var n, i = this.selection.find("span");
                this.selection.data("select2-data", e),
                i.empty(),
                n = this.opts.formatSelection(e, i),
                n !== t && i.append(this.opts.escapeMarkup(n)),
                this.selection.removeClass("select2-default"),
                this.opts.allowClear && this.getPlaceholder() !== t && this.selection.find("abbr").show()
            },
            val: function() {
                var e, n = null,
                i = this;
                if (0 === arguments.length) return this.opts.element.val();
                if (e = arguments[0], this.select) this.select.val(e).find(":selected").each2(function(e, t) {
                    return n = {
                        id: t.attr("value"),
                        text: t.text()
                    },
                    !1
                }),
                this.updateSelection(n),
                this.setPlaceholder(),
                this.triggerChange();
                else {
                    if (this.opts.initSelection === t) throw new Error("cannot call val() if initSelection() is not defined");
                    if (!e) return this.clear(),
                    void this.triggerChange();
                    this.opts.element.val(e),
                    this.opts.initSelection(this.opts.element,
                    function(e) {
                        i.opts.element.val(e ? i.id(e) : ""),
                        i.updateSelection(e),
                        i.setPlaceholder(),
                        i.triggerChange()
                    })
                }
            },
            clearSearch: function() {
                this.search.val("")
            },
            data: function(e) {
                var n;
                return 0 === arguments.length ? (n = this.selection.data("select2-data"), n == t && (n = null), n) : void(e && "" !== e ? (this.opts.element.val(e ? this.id(e) : ""), this.updateSelection(e)) : this.clear())
            }
        }),
        S = x(k, {
            createContainer: function() {
                var t = e("<div></div>", {
                    "class": "select2-container select2-container-multi"
                }).html(["    <ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <input type='text' autocomplete='off' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi' style='display:none;'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return t
            },
            prepareOpts: function() {
                var t = this.parent.prepareOpts.apply(this, arguments);
                return "select" === t.element.get(0).tagName.toLowerCase() && (t.initSelection = function(t, n) {
                    var i = [];
                    t.find(":selected").each2(function(e, t) {
                        i.push({
                            id: t.attr("value"),
                            text: t.text(),
                            element: t
                        })
                    }),
                    e.isFunction(n) && n(i)
                }),
                t
            },
            initContainer: function() {
                var t, n = ".select2-choices";
                this.searchContainer = this.container.find(".select2-search-field"),
                this.selection = t = this.container.find(n),
                this.search.bind("keydown", this.bind(function(e) {
                    if (this.enabled) {
                        if (e.which === C.BACKSPACE && "" === this.search.val()) {
                            this.close();
                            var n, i = t.find(".select2-search-choice-focus");
                            if (i.length > 0) return this.unselect(i.first()),
                            this.search.width(10),
                            void d(e);
                            n = t.find(".select2-search-choice:not(.select2-locked)"),
                            n.length > 0 && n.last().addClass("select2-search-choice-focus")
                        } else t.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                        if (this.opened()) switch (e.which) {
                        case C.UP:
                        case C.DOWN:
                            return this.moveHighlight(e.which === C.UP ? -1 : 1),
                            void d(e);
                        case C.ENTER:
                        case C.TAB:
                            return this.selectHighlighted(),
                            void d(e);
                        case C.ESC:
                            return this.cancel(e),
                            void d(e)
                        }
                        e.which === C.TAB || C.isControl(e) || C.isFunctionKey(e) || e.which === C.BACKSPACE || e.which === C.ESC || (this.opts.openOnEnter !== !1 || e.which !== C.ENTER) && (this.open(), (e.which === C.PAGE_UP || e.which === C.PAGE_DOWN) && d(e))
                    }
                })),
                this.search.bind("keyup", this.bind(this.resizeSearch)),
                this.search.bind("blur", this.bind(function(e) {
                    this.container.removeClass("select2-container-active"),
                    this.search.removeClass("select2-focused"),
                    this.clearSearch(),
                    e.stopImmediatePropagation()
                })),
                this.container.delegate(n, "mousedown", this.bind(function(t) {
                    this.enabled && (e(t.target).closest(".select2-search-choice").length > 0 || (this.clearPlaceholder(), this.open(), this.focusSearch(), t.preventDefault()))
                })),
                this.container.delegate(n, "focus", this.bind(function() {
                    this.enabled && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder())
                })),
                this.clearSearch()
            },
            enable: function() {
                this.enabled || (this.parent.enable.apply(this, arguments), this.search.removeAttr("disabled"))
            },
            disable: function() {
                this.enabled && (this.parent.disable.apply(this, arguments), this.search.attr("disabled", !0))
            },
            initSelection: function() {
                if ("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]), this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val()) {
                    var e = this;
                    this.opts.initSelection.call(null, this.opts.element,
                    function(n) {
                        n !== t && null !== n && (e.updateSelection(n), e.close(), e.clearSearch())
                    })
                }
            },
            clearSearch: function() {
                var e = this.getPlaceholder();
                e !== t && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(e).addClass("select2-default"), this.resizeSearch()) : this.search.val(" ").width(10)
            },
            clearPlaceholder: function() {
                this.search.hasClass("select2-default") ? this.search.val("").removeClass("select2-default") : " " === this.search.val() && this.search.val("")
            },
            opening: function() {
                this.parent.opening.apply(this, arguments),
                this.clearPlaceholder(),
                this.resizeSearch(),
                this.focusSearch()
            },
            close: function() {
                this.opened() && this.parent.close.apply(this, arguments)
            },
            focus: function() {
                this.close(),
                this.search.focus()
            },
            isFocused: function() {
                return this.search.hasClass("select2-focused")
            },
            updateSelection: function(t) {
                var i = [],
                o = [],
                r = this;
                e(t).each(function() {
                    n(r.id(this), i) < 0 && (i.push(r.id(this)), o.push(this))
                }),
                t = o,
                this.selection.find(".select2-search-choice").remove(),
                e(t).each(function() {
                    r.addSelectedChoice(this)
                }),
                r.postprocessResults()
            },
            tokenize: function() {
                var e = this.search.val();
                e = this.opts.tokenizer(e, this.data(), this.bind(this.onSelect), this.opts),
                null != e && e != t && (this.search.val(e), e.length > 0 && this.open())
            },
            onSelect: function(e, t) {
                this.addSelectedChoice(e),
                (this.select || !this.opts.closeOnSelect) && this.postprocessResults(),
                this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.positionDropdown()) : this.close(),
                this.triggerChange({
                    added: e
                }),
                t && t.noFocus || this.focusSearch()
            },
            cancel: function() {
                this.close(),
                this.focusSearch()
            },
            addSelectedChoice: function(n) {
                var i, o = !n.locked,
                r = e("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"),
                s = e("<li class='select2-search-choice select2-locked'><div></div></li>"),
                a = o ? r: s,
                l = this.id(n),
                c = this.getVal();
                i = this.opts.formatSelection(n, a.find("div")),
                i != t && a.find("div").replaceWith("<div>" + this.opts.escapeMarkup(i) + "</div>"),
                o && a.find(".select2-search-choice-close").bind("mousedown", d).bind("click dblclick", this.bind(function(t) {
                    this.enabled && (e(t.target).closest(".select2-search-choice").fadeOut("fast", this.bind(function() {
                        this.unselect(e(t.target)),
                        this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),
                        this.close(),
                        this.focusSearch()
                    })).dequeue(), d(t))
                })).bind("focus", this.bind(function() {
                    this.enabled && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"))
                })),
                a.data("select2-data", n),
                a.insertBefore(this.searchContainer),
                c.push(l),
                this.setVal(c)
            },
            unselect: function(e) {
                var t, i, o = this.getVal();
                if (e = e.closest(".select2-search-choice"), 0 === e.length) throw "Invalid argument: " + e + ". Must be .select2-search-choice";
                t = e.data("select2-data"),
                i = n(this.id(t), o),
                i >= 0 && (o.splice(i, 1), this.setVal(o), this.select && this.postprocessResults()),
                e.remove(),
                this.triggerChange({
                    removed: t
                })
            },
            postprocessResults: function() {
                var e = this.getVal(),
                t = this.results.find(".select2-result-selectable"),
                i = this.results.find(".select2-result-with-children"),
                o = this;
                t.each2(function(t, i) {
                    var r = o.id(i.data("select2-data"));
                    n(r, e) >= 0 ? i.addClass("select2-disabled").removeClass("select2-result-selectable") : i.removeClass("select2-disabled").addClass("select2-result-selectable")
                }),
                i.each2(function(e, t) {
                    t.is(".select2-result-selectable") || 0 != t.find(".select2-result-selectable").length ? t.removeClass("select2-disabled") : t.addClass("select2-disabled")
                }),
                -1 == this.highlight() && t.each2(function(e, t) {
                    return ! t.hasClass("select2-disabled") && t.hasClass("select2-result-selectable") ? (o.highlight(0), !1) : void 0
                })
            },
            resizeSearch: function() {
                var e, t, n, i, o, s = r(this.search);
                e = p(this.search) + 10,
                t = this.search.offset().left,
                n = this.selection.width(),
                i = this.selection.offset().left,
                o = n - (t - i) - s,
                e > o && (o = n - s),
                40 > o && (o = n - s),
                0 >= o && (o = e),
                this.search.width(o)
            },
            getVal: function() {
                var e;
                return this.select ? (e = this.select.val(), null === e ? [] : e) : (e = this.opts.element.val(), o(e, this.opts.separator))
            },
            setVal: function(t) {
                var i;
                this.select ? this.select.val(t) : (i = [], e(t).each(function() {
                    n(this, i) < 0 && i.push(this)
                }), this.opts.element.val(0 === i.length ? "": i.join(this.opts.separator)))
            },
            val: function() {
                var n, i = [],
                o = this;
                if (0 === arguments.length) return this.getVal();
                if (n = arguments[0], !n) return this.opts.element.val(""),
                this.updateSelection([]),
                this.clearSearch(),
                void this.triggerChange();
                if (this.setVal(n), this.select) this.select.find(":selected").each(function() {
                    i.push({
                        id: e(this).attr("value"),
                        text: e(this).text()
                    })
                }),
                this.updateSelection(i),
                this.triggerChange();
                else {
                    if (this.opts.initSelection === t) throw new Error("val() cannot be called if initSelection() is not defined");
                    this.opts.initSelection(this.opts.element,
                    function(t) {
                        var n = e(t).map(o.id);
                        o.setVal(n),
                        o.updateSelection(t),
                        o.clearSearch(),
                        o.triggerChange()
                    })
                }
                this.clearSearch()
            },
            onSortStart: function() {
                if (this.select) throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                this.search.width(0),
                this.searchContainer.hide()
            },
            onSortEnd: function() {
                var t = [],
                n = this;
                this.searchContainer.show(),
                this.searchContainer.appendTo(this.searchContainer.parent()),
                this.resizeSearch(),
                this.selection.find(".select2-search-choice").each(function() {
                    t.push(n.opts.id(e(this).data("select2-data")))
                }),
                this.setVal(t),
                this.triggerChange()
            },
            data: function(t) {
                var n, i = this;
                return 0 === arguments.length ? this.selection.find(".select2-search-choice").map(function() {
                    return e(this).data("select2-data")
                }).get() : (t || (t = []), n = e.map(t,
                function(e) {
                    return i.opts.id(e)
                }), this.setVal(n), this.updateSelection(t), this.clearSearch(), void 0)
            }
        }),
        e.fn.select2 = function() {
            var i, o, r, s, a = Array.prototype.slice.call(arguments, 0),
            l = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "onSortStart", "onSortEnd", "enable", "disable", "positionDropdown", "data"];
            return this.each(function() {
                if (0 === a.length || "object" == typeof a[0]) i = 0 === a.length ? {}: e.extend({},
                a[0]),
                i.element = e(this),
                "select" === i.element.get(0).tagName.toLowerCase() ? s = i.element.attr("multiple") : (s = i.multiple || !1, "tags" in i && (i.multiple = s = !0)),
                o = s ? new S: new T,
                o.init(i);
                else {
                    if ("string" != typeof a[0]) throw "Invalid arguments to select2 plugin: " + a;
                    if (n(a[0], l) < 0) throw "Unknown method: " + a[0];
                    if (r = t, o = e(this).data("select2"), o === t) return;
                    if (r = "container" === a[0] ? o.container: o[a[0]].apply(o, a.slice(1)), r !== t) return ! 1
                }
            }),
            r === t ? this: r
        },
        e.fn.select2.defaults = {
            width: "copy",
            loadMorePadding: 0,
            closeOnSelect: !0,
            openOnEnter: !0,
            containerCss: {},
            dropdownCss: {},
            containerCssClass: "",
            dropdownCssClass: "",
            formatResult: function(e, t, n) {
                var i = [];
                return f(e.text, n.term, i, this.escapeMarkup),
                i.join("")
            },
            formatSelection: function(e) {
                return e ? e.text: t
            },
            sortResults: function(e) {
                return e
            },
            formatResultCssClass: function() {
                return t
            },
            formatNoMatches: function() {
                return "No matches found"
            },
            formatInputTooShort: function(e, t) {
                var n = t - e.length;
                return "Please enter " + n + " more character" + (1 == n ? "": "s")
            },
            formatInputTooLong: function(e, t) {
                var n = e.length - t;
                return "Please enter " + n + " less character" + (1 == n ? "": "s")
            },
            formatSelectionTooBig: function(e) {
                return "You can only select " + e + " item" + (1 == e ? "": "s")
            },
            formatLoadMore: function() {
                return "Loading more results..."
            },
            formatSearching: function() {
                return "Searching..."
            },
            minimumResultsForSearch: 0,
            minimumInputLength: 0,
            maximumInputLength: null,
            maximumSelectionSize: 0,
            id: function(e) {
                return e.id
            },
            matcher: function(e, t) {
                return t.toUpperCase().indexOf(e.toUpperCase()) >= 0
            },
            separator: ",",
            tokenSeparators: [],
            tokenizer: w,
            escapeMarkup: function(e) {
                var t = {
                    "\\": "&#92;",
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&apos;",
                    "/": "&#47;"
                };
                return String(e).replace(/[&<>"'/\\] / g,
                function(e) {
                    return t[e[0]]
                })
            },
            blurOnChange: !1,
            selectOnBlur: !1
        },
        window.Select2 = {
            query: {
                ajax: m,
                local: g,
                tags: y
            },
            util: {
                debounce: l,
                markMatch: f
            },
            "class": {
                "abstract": k,
                single: T,
                multi: S
            }
        }
    }
} (jQuery),
function(e) {
    function t(e, t, o) {
        var r = e[0],
        s = /er/.test(o) ? _indeterminate: /bl/.test(o) ? f: h,
        a = o == _update ? {
            checked: r[h],
            disabled: r[f],
            indeterminate: "true" == e.attr(_indeterminate) || "false" == e.attr(_determinate)
        }: r[s];
        if (/^(ch|di|in)/.test(o) && !a) n(e, s);
        else if (/^(un|en|de)/.test(o) && a) i(e, s);
        else if (o == _update) for (var l in a) a[l] ? n(e, l, !0) : i(e, l, !0);
        else t && "toggle" != o || (t || e[_callback]("ifClicked"), a ? r[_type] !== d && i(e, s) : n(e, s))
    }
    function n(t, n, o) {
        var u = t[0],
        m = t.parent(),
        g = n == h,
        y = n == _indeterminate,
        b = n == f,
        v = y ? _determinate: g ? p: "enabled",
        _ = r(t, v + s(u[_type])),
        w = r(t, n + s(u[_type]));
        if (u[n] !== !0) {
            if (!o && n == h && u[_type] == d && u.name) {
                var x = t.closest("form"),
                C = 'input[name="' + u.name + '"]';
                C = x.length ? x.find(C) : e(C),
                C.each(function() {
                    this !== u && e(this).data(l) && i(e(this), n)
                })
            }
            y ? (u[n] = !0, u[h] && i(t, h, "force")) : (o || (u[n] = !0), g && u[_indeterminate] && i(t, _indeterminate, !1)),
            a(t, g, n, o)
        }
        u[f] && r(t, _cursor, !0) && m.find("." + c).css(_cursor, "default"),
        m[_add](w || r(t, n) || ""),
        m.attr("role") && !y && m.attr("aria-" + (b ? f: h), "true"),
        m[_remove](_ || r(t, v) || "")
    }
    function i(e, t, n) {
        var i = e[0],
        o = e.parent(),
        l = t == h,
        u = t == _indeterminate,
        d = t == f,
        m = u ? _determinate: l ? p: "enabled",
        g = r(e, m + s(i[_type])),
        y = r(e, t + s(i[_type]));
        i[t] !== !1 && ((u || !n || "force" == n) && (i[t] = !1), a(e, l, m, n)),
        !i[f] && r(e, _cursor, !0) && o.find("." + c).css(_cursor, "pointer"),
        o[_remove](y || r(e, t) || ""),
        o.attr("role") && !u && o.attr("aria-" + (d ? f: h), "false"),
        o[_add](g || r(e, m) || "")
    }
    function o(t, n) {
        t.data(l) && (t.parent().html(t.attr("style", t.data(l).s || "")), n && t[_callback](n), t.off(".i").unwrap(), e(_label + '[for="' + t[0].id + '"]').add(t.closest(_label)).off(".i"))
    }
    function r(e, t, n) {
        return e.data(l) ? e.data(l).o[t + (n ? "": "Class")] : void 0
    }
    function s(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }
    function a(e, t, n, i) {
        i || (t && e[_callback]("ifToggled"), e[_callback]("ifChanged")[_callback]("if" + s(n)))
    }
    var l = "iCheck",
    c = l + "-helper",
    u = "checkbox",
    d = "radio",
    h = "checked",
    p = "un" + h,
    f = "disabled";
    _determinate = "determinate",
    _indeterminate = "in" + _determinate,
    _update = "update",
    _type = "type",
    _click = "click",
    _touch = "touchbegin.i touchend.i",
    _add = "addClass",
    _remove = "removeClass",
    _callback = "trigger",
    _label = "label",
    _cursor = "cursor",
    _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent),
    e.fn[l] = function(r, s) {
        var a = 'input[type="' + u + '"], input[type="' + d + '"]',
        p = e(),
        m = function(t) {
            t.each(function() {
                var t = e(this);
                p = p.add(t.is(a) ? t: t.find(a))
            })
        };
        if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(r)) return r = r.toLowerCase(),
        m(this),
        p.each(function() {
            var n = e(this);
            "destroy" == r ? o(n, "ifDestroyed") : t(n, !0, r),
            e.isFunction(s) && s()
        });
        if ("object" != typeof r && r) return this;
        var g = e.extend({
            checkedClass: h,
            disabledClass: f,
            indeterminateClass: _indeterminate,
            labelHover: !0
        },
        r),
        y = g.handle,
        b = g.hoverClass || "hover",
        v = g.focusClass || "focus",
        _ = g.activeClass || "active",
        w = !!g.labelHover,
        x = g.labelHoverClass || "hover",
        C = 0 | ("" + g.increaseArea).replace("%", "");
        return (y == u || y == d) && (a = 'input[type="' + y + '"]'),
        -50 > C && (C = -50),
        m(this),
        p.each(function() {
            var r = e(this);
            o(r);
            var s, a = this,
            p = a.id,
            m = -C + "%",
            y = 100 + 2 * C + "%",
            k = {
                position: "absolute",
                top: m,
                left: m,
                display: "block",
                width: y,
                height: y,
                margin: 0,
                padding: 0,
                background: "#fff",
                border: 0,
                opacity: 0
            },
            T = _mobile ? {
                position: "absolute",
                visibility: "hidden"
            }: C ? k: {
                position: "absolute",
                opacity: 0
            },
            S = a[_type] == u ? g.checkboxClass || "i" + u: g.radioClass || "i" + d,
            E = e(_label + '[for="' + p + '"]').add(r.closest(_label)),
            A = !!g.aria,
            N = l + "-" + Math.random().toString(36).substr(2, 6),
            F = '<div class="' + S + '" ' + (A ? 'role="' + a[_type] + '" ': "");
            A && E.each(function() {
                F += 'aria-labelledby="',
                this.id ? F += this.id: (this.id = N, F += N),
                F += '"'
            }),
            F = r.wrap(F + "/>")[_callback]("ifCreated").parent().append(g.insert),
            s = e('<ins class="' + c + '"/>').css(k).appendTo(F),
            r.data(l, {
                o: g,
                s: r.attr("style")
            }).css(T),
            !!g.inheritClass && F[_add](a.className || ""),
            !!g.inheritID && p && F.attr("id", l + "-" + p),
            "static" == F.css("position") && F.css("position", "relative"),
            t(r, !0, _update),
            E.length && E.on(_click + ".i mouseover.i mouseout.i " + _touch,
            function(n) {
                var i = n[_type],
                o = e(this);
                if (!a[f]) {
                    if (i == _click) {
                        if (e(n.target).is("a")) return;
                        t(r, !1, !0)
                    } else w && (/ut|nd/.test(i) ? (F[_remove](b), o[_remove](x)) : (F[_add](b), o[_add](x)));
                    if (!_mobile) return ! 1;
                    n.stopPropagation()
                }
            }),
            r.on(_click + ".i focus.i blur.i keyup.i keydown.i keypress.i",
            function(e) {
                var t = e[_type],
                o = e.keyCode;
                return t == _click ? !1 : "keydown" == t && 32 == o ? (a[_type] == d && a[h] || (a[h] ? i(r, h) : n(r, h)), !1) : void("keyup" == t && a[_type] == d ? !a[h] && n(r, h) : /us|ur/.test(t) && F["blur" == t ? _remove: _add](v))
            }),
            s.on(_click + " mousedown mouseup mouseover mouseout " + _touch,
            function(e) {
                var n = e[_type],
                i = /wn|up/.test(n) ? _: b;
                if (!a[f]) {
                    if (n == _click ? t(r, !1, !0) : (/wn|er|in/.test(n) ? F[_add](i) : F[_remove](i + " " + _), E.length && w && i == b && E[/ut|nd/.test(n) ? _remove: _add](x)), !_mobile) return ! 1;
                    e.stopPropagation()
                }
            })
        })
    }
} (window.jQuery || window.Zepto),
"function" != typeof Object.create && (Object.create = function(e) {
    function t() {}
    return t.prototype = e,
    new t
}),
function(e) {
    var t = {
        init: function(t) {
            return this.options = e.extend({},
            e.noty.defaults, t),
            this.options.layout = this.options.custom ? e.noty.layouts.inline: e.noty.layouts[this.options.layout],
            this.options.theme = e.noty.themes[this.options.theme],
            delete t.layout,
            delete t.theme,
            this.options = e.extend({},
            this.options, this.options.layout.options),
            this.options.id = "noty_" + (new Date).getTime() * Math.floor(1e6 * Math.random()),
            this.options = e.extend({},
            this.options, t),
            this._build(),
            this
        },
        _build: function() {
            var t = e('<div class="noty_bar"></div>').attr("id", this.options.id);
            if (t.append(this.options.template).find(".noty_text").html(this.options.text), this.$bar = null !== this.options.layout.parent.object ? e(this.options.layout.parent.object).css(this.options.layout.parent.css).append(t) : t, this.options.buttons) {
                this.options.closeWith = [],
                this.options.timeout = !1;
                var n = e("<div/>").addClass("noty_buttons");
                null !== this.options.layout.parent.object ? this.$bar.find(".noty_bar").append(n) : this.$bar.append(n);
                var i = this;
                e.each(this.options.buttons,
                function(t, n) {
                    var o = e("<button/>").addClass(n.addClass ? n.addClass: "gray").html(n.text).appendTo(i.$bar.find(".noty_buttons")).bind("click",
                    function() {
                        e.isFunction(n.onClick) && n.onClick.call(o, i)
                    })
                })
            }
            this.$message = this.$bar.find(".noty_message"),
            this.$closeButton = this.$bar.find(".noty_close"),
            this.$buttons = this.$bar.find(".noty_buttons"),
            e.noty.store[this.options.id] = this
        },
        show: function() {
            var t = this;
            return e(t.options.layout.container.selector).append(t.$bar),
            t.options.theme.style.apply(t),
            "function" === e.type(t.options.layout.css) ? this.options.layout.css.apply(t.$bar) : t.$bar.css(this.options.layout.css || {}),
            t.$bar.addClass(t.options.layout.addClass),
            t.options.layout.container.style.apply(e(t.options.layout.container.selector)),
            t.options.theme.callback.onShow.apply(this),
            e.inArray("click", t.options.closeWith) > -1 && t.$bar.css("cursor", "pointer").one("click",
            function() {
                t.close()
            }),
            e.inArray("hover", t.options.closeWith) > -1 && t.$bar.one("mouseenter",
            function() {
                t.close()
            }),
            e.inArray("button", t.options.closeWith) > -1 && t.$closeButton.one("click",
            function() {
                t.close()
            }),
            -1 == e.inArray("button", t.options.closeWith) && t.$closeButton.remove(),
            t.options.callback.onShow && t.options.callback.onShow.apply(t),
            t.$bar.animate(t.options.animation.open, t.options.animation.speed, t.options.animation.easing,
            function() {
                t.options.callback.afterShow && t.options.callback.afterShow.apply(t),
                t.shown = !0
            }),
            t.options.timeout && t.$bar.delay(t.options.timeout).promise().done(function() {
                t.close()
            }),
            this
        },
        close: function() {
            if (!this.closed) {
                var t = this;
                if (!this.shown) {
                    var n = [];
                    return e.each(e.noty.queue,
                    function(e, i) {
                        i.options.id != t.options.id && n.push(i)
                    }),
                    void(e.noty.queue = n)
                }
                t.$bar.addClass("i-am-closing-now"),
                t.options.callback.onClose && t.options.callback.onClose.apply(t),
                t.$bar.clearQueue().stop().animate(t.options.animation.close, t.options.animation.speed, t.options.animation.easing,
                function() {
                    t.options.callback.afterClose && t.options.callback.afterClose.apply(t)
                }).promise().done(function() {
                    t.options.modal && (e.notyRenderer.setModalCount( - 1), 0 == e.notyRenderer.getModalCount() && e(".noty_modal").fadeOut("fast",
                    function() {
                        e(this).remove()
                    })),
                    e.notyRenderer.setLayoutCountFor(t, -1),
                    0 == e.notyRenderer.getLayoutCountFor(t) && e(t.options.layout.container.selector).remove(),
                    "undefined" != typeof t.$bar && null !== t.$bar && (t.$bar.remove(), t.$bar = null, t.closed = !0),
                    delete e.noty.store[t.options.id],
                    t.options.theme.callback.onClose.apply(t),
                    t.options.dismissQueue || (e.noty.ontap = !0, e.notyRenderer.render())
                })
            }
        },
        setText: function(e) {
            return this.closed || (this.options.text = e, this.$bar.find(".noty_text").html(e)),
            this
        },
        setType: function(e) {
            return this.closed || (this.options.type = e, this.options.theme.style.apply(this), this.options.theme.callback.onShow.apply(this)),
            this
        },
        setTimeout: function(e) {
            if (!this.closed) {
                var t = this;
                this.options.timeout = e,
                t.$bar.delay(t.options.timeout).promise().done(function() {
                    t.close()
                })
            }
            return this
        },
        closed: !1,
        shown: !1
    };
    e.notyRenderer = {},
    e.notyRenderer.init = function(n) {
        var i = Object.create(t).init(n);
        return i.options.force ? e.noty.queue.unshift(i) : e.noty.queue.push(i),
        e.notyRenderer.render(),
        "object" == e.noty.returns ? i: i.options.id
    },
    e.notyRenderer.render = function() {
        var t = e.noty.queue[0];
        "object" === e.type(t) ? t.options.dismissQueue ? e.notyRenderer.show(e.noty.queue.shift()) : e.noty.ontap && (e.notyRenderer.show(e.noty.queue.shift()), e.noty.ontap = !1) : e.noty.ontap = !0
    },
    e.notyRenderer.show = function(t) {
        t.options.modal && (e.notyRenderer.createModalFor(t), e.notyRenderer.setModalCount(1)),
        0 == e(t.options.layout.container.selector).length ? t.options.custom ? t.options.custom.append(e(t.options.layout.container.object).addClass("i-am-new")) : e("body").append(e(t.options.layout.container.object).addClass("i-am-new")) : e(t.options.layout.container.selector).removeClass("i-am-new"),
        e.notyRenderer.setLayoutCountFor(t, 1),
        t.show()
    },
    e.notyRenderer.createModalFor = function(t) {
        0 == e(".noty_modal").length && e("<div/>").addClass("noty_modal").data("noty_modal_count", 0).css(t.options.theme.modal.css).prependTo(e("body")).fadeIn("fast")
    },
    e.notyRenderer.getLayoutCountFor = function(t) {
        return e(t.options.layout.container.selector).data("noty_layout_count") || 0
    },
    e.notyRenderer.setLayoutCountFor = function(t, n) {
        return e(t.options.layout.container.selector).data("noty_layout_count", e.notyRenderer.getLayoutCountFor(t) + n)
    },
    e.notyRenderer.getModalCount = function() {
        return e(".noty_modal").data("noty_modal_count") || 0
    },
    e.notyRenderer.setModalCount = function(t) {
        return e(".noty_modal").data("noty_modal_count", e.notyRenderer.getModalCount() + t)
    },
    e.fn.noty = function(t) {
        return t.custom = e(this),
        e.notyRenderer.init(t)
    },
    e.noty = {},
    e.noty.queue = [],
    e.noty.ontap = !0,
    e.noty.layouts = {},
    e.noty.themes = {},
    e.noty.returns = "object",
    e.noty.store = {},
    e.noty.get = function(t) {
        return e.noty.store.hasOwnProperty(t) ? e.noty.store[t] : !1
    },
    e.noty.close = function(t) {
        return e.noty.get(t) ? e.noty.get(t).close() : !1
    },
    e.noty.setText = function(t, n) {
        return e.noty.get(t) ? e.noty.get(t).setText(n) : !1
    },
    e.noty.setType = function(t, n) {
        return e.noty.get(t) ? e.noty.get(t).setType(n) : !1
    },
    e.noty.clearQueue = function() {
        e.noty.queue = []
    },
    e.noty.closeAll = function() {
        e.noty.clearQueue(),
        e.each(e.noty.store,
        function(e, t) {
            t.close()
        })
    };
    var n = window.alert;
    e.noty.consumeAlert = function(t) {
        window.alert = function(n) {
            t ? t.text = n: t = {
                text: n
            },
            e.notyRenderer.init(t)
        }
    },
    e.noty.stopConsumeAlert = function() {
        window.alert = n
    },
    e.noty.defaults = {
        layout: "top",
        theme: "defaultTheme",
        type: "alert",
        text: "",
        dismissQueue: !0,
        template: '<div class="noty_message"><div class="noty_close"></div><span class="noty_text"></span></div>',
        animation: {
            open: {
                height: "toggle"
            },
            close: {
                height: "toggle"
            },
            easing: "swing",
            speed: 500
        },
        timeout: !1,
        force: !1,
        modal: !1,
        closeWith: ["click"],
        callback: {
            onShow: function() {},
            afterShow: function() {},
            onClose: function() {},
            afterClose: function() {}
        },
        buttons: !1
    },
    e(window).resize(function() {
        e.each(e.noty.layouts,
        function(t, n) {
            n.container.style.apply(e(n.container.selector))
        })
    })
} (jQuery),
function(e) {
    e.noty.layouts.bottom = {
        name: "bottom",
        options: {},
        container: {
            object: '<ul id="noty_bottom_layout_container" />',
            selector: "ul#noty_bottom_layout_container",
            style: function() {
                e(this).css({
                    bottom: 0,
                    left: "5%",
                    position: "fixed",
                    width: "90%",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 9999999
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.bottomCenter = {
        name: "bottomCenter",
        options: {},
        container: {
            object: '<ul id="noty_bottomCenter_layout_container" />',
            selector: "ul#noty_bottomCenter_layout_container",
            style: function() {
                e(this).css({
                    bottom: 20,
                    left: 0,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }),
                e(this).css({
                    left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px"
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none",
            width: "310px"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.bottomLeft = {
        name: "bottomLeft",
        options: {},
        container: {
            object: '<ul id="noty_bottomLeft_layout_container" />',
            selector: "ul#noty_bottomLeft_layout_container",
            style: function() {
                e(this).css({
                    bottom: 20,
                    left: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }),
                window.innerWidth < 600 && e(this).css({
                    left: 5
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none",
            width: "310px"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.bottomRight = {
        name: "bottomRight",
        options: {},
        container: {
            object: '<ul id="noty_bottomRight_layout_container" />',
            selector: "ul#noty_bottomRight_layout_container",
            style: function() {
                e(this).css({
                    bottom: 20,
                    right: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }),
                window.innerWidth < 600 && e(this).css({
                    right: 5
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none",
            width: "310px"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.center = {
        name: "center",
        options: {},
        container: {
            object: '<ul id="noty_center_layout_container" />',
            selector: "ul#noty_center_layout_container",
            style: function() {
                e(this).css({
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                });
                var t = e(this).clone().css({
                    visibility: "hidden",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0
                }).attr("id", "dupe");
                e("body").append(t),
                t.find(".i-am-closing-now").remove(),
                t.find("li").css("display", "block");
                var n = t.height();
                t.remove(),
                e(this).hasClass("i-am-new") ? e(this).css({
                    left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px",
                    top: (e(window).height() - n) / 2 + "px"
                }) : e(this).animate({
                    left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px",
                    top: (e(window).height() - n) / 2 + "px"
                },
                500)
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none",
            width: "310px"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.centerLeft = {
        name: "centerLeft",
        options: {},
        container: {
            object: '<ul id="noty_centerLeft_layout_container" />',
            selector: "ul#noty_centerLeft_layout_container",
            style: function() {
                e(this).css({
                    left: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                });
                var t = e(this).clone().css({
                    visibility: "hidden",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0
                }).attr("id", "dupe");
                e("body").append(t),
                t.find(".i-am-closing-now").remove(),
                t.find("li").css("display", "block");
                var n = t.height();
                t.remove(),
                e(this).hasClass("i-am-new") ? e(this).css({
                    top: (e(window).height() - n) / 2 + "px"
                }) : e(this).animate({
                    top: (e(window).height() - n) / 2 + "px"
                },
                500),
                window.innerWidth < 600 && e(this).css({
                    left: 5
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none",
            width: "310px"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.centerRight = {
        name: "centerRight",
        options: {},
        container: {
            object: '<ul id="noty_centerRight_layout_container" />',
            selector: "ul#noty_centerRight_layout_container",
            style: function() {
                e(this).css({
                    right: 20,
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                });
                var t = e(this).clone().css({
                    visibility: "hidden",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0
                }).attr("id", "dupe");
                e("body").append(t),
                t.find(".i-am-closing-now").remove(),
                t.find("li").css("display", "block");
                var n = t.height();
                t.remove(),
                e(this).hasClass("i-am-new") ? e(this).css({
                    top: (e(window).height() - n) / 2 + "px"
                }) : e(this).animate({
                    top: (e(window).height() - n) / 2 + "px"
                },
                500),
                window.innerWidth < 600 && e(this).css({
                    right: 5
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none",
            width: "310px"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.inline = {
        name: "inline",
        options: {},
        container: {
            object: '<ul id="noty_inline_layout_container" />',
            selector: "ul#noty_inline_layout_container",
            style: function() {
                e(this).css({
                    width: "100%",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 9999999
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.maleskineCenter = {
        name: "maleskineCenter",
        options: {},
        container: {
            object: '<ul id="noty_center_layout_container" />',
            selector: "ul#noty_center_layout_container",
            style: function() {
                e(this).css({
                    position: "fixed",
                    width: "310px",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }),
                e(this).addClass("maleskine-confirm-center");
                var t = e(this).clone().css({
                    visibility: "hidden",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0
                }).attr("id", "dupe");
                e("body").append(t),
                t.find(".i-am-closing-now").remove(),
                t.find("li").css("display", "block");
                var n = t.height();
                t.remove(),
                e(this).hasClass("i-am-new") ? e(this).css({
                    left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px",
                    top: (e(window).height() - n) / 2 + "px"
                }) : e(this).animate({
                    left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px",
                    top: (e(window).height() - n) / 2 + "px"
                },
                500)
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none",
            width: "310px"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.maleskineTopCenter = {
        name: "maleskineTopCenter",
        options: {},
        container: {
            object: '<ul id="noty_topCenter_layout_container" />',
            selector: "ul#noty_topCenter_layout_container",
            style: function() {
                e(this).css({
                    top: 0,
                    left: 0,
                    position: "fixed",
                    width: "500px",
                    height: "auto",
                    listStyleType: "none",
                    zIndex: 1e7
                }),
                e(this).addClass("top-center-with-action"),
                e(this).find(".noty_close").css("display", "block"),
                e(this).css({
                    left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px"
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.maleskineTopRight = {
        name: "maleskineTopRight",
        options: {},
        container: {
            object: '<ul id="noty_topRight_layout_container" />',
            selector: "ul#noty_topRight_layout_container",
            style: function() {
                e(this).css({
                    top: 10,
                    right: 10,
                    position: "fixed",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 1e7
                }),
                e(this).addClass("maleskine-top-right"),
                window.innerWidth < 600 && e(this).css({
                    right: 5
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.top = {
        name: "top",
        options: {},
        container: {
            object: '<ul id="noty_top_layout_container" />',
            selector: "ul#noty_top_layout_container",
            style: function() {
                e(this).css({
                    top: 0,
                    left: "5%",
                    position: "fixed",
                    width: "90%",
                    height: "auto",
                    margin: 0,
                    padding: 0,
                    listStyleType: "none",
                    zIndex: 9999999
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.topCenter = {
        name: "topCenter",
        options: {},
        container: {
            object: '<ul id="noty_topCenter_layout_container" />',
            selector: "ul#noty_topCenter_layout_container",
            style: function() {
                e(this).css({
                    top: 20,
                    left: 0,
                    position: "fixed",
                    listStyleType: "none",
                    zIndex: 1e7
                }),
                e(this).css({
                    left: (e(window).width() - e(this).outerWidth(!1)) / 2 + "px"
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.topLeft = {
        name: "topLeft",
        options: {},
        container: {
            object: '<ul id="noty_topLeft_layout_container" />',
            selector: "ul#noty_topLeft_layout_container",
            style: function() {
                e(this).css({
                    top: 20,
                    left: 20,
                    position: "fixed",
                    listStyleType: "none",
                    zIndex: 1e7
                }),
                window.innerWidth < 600 && e(this).css({
                    left: 5
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.layouts.topRight = {
        name: "topRight",
        options: {},
        container: {
            object: '<ul id="noty_topRight_layout_container" />',
            selector: "ul#noty_topRight_layout_container",
            style: function() {
                e(this).css({
                    top: 20,
                    right: 20,
                    position: "fixed",
                    listStyleType: "none",
                    zIndex: 1e7
                }),
                window.innerWidth < 600 && e(this).css({
                    right: 5
                })
            }
        },
        parent: {
            object: "<li />",
            selector: "li",
            css: {}
        },
        css: {
            display: "none"
        },
        addClass: ""
    }
} (jQuery),
function(e) {
    e.noty.themes.defaultTheme = {
        name: "defaultTheme",
        helpers: {
            borderFix: function() {
                if (this.options.dismissQueue) {
                    var t = this.options.layout.container.selector + " " + this.options.layout.parent.selector;
                    switch (this.options.layout.name) {
                    case "top":
                        e(t).css({
                            borderRadius:
                            "0px 0px 0px 0px"
                        }),
                        e(t).last().css({
                            borderRadius: "0px 0px 5px 5px"
                        });
                        break;
                    case "topCenter":
                    case "topLeft":
                    case "topRight":
                    case "bottomCenter":
                    case "bottomLeft":
                    case "bottomRight":
                    case "center":
                    case "centerLeft":
                    case "centerRight":
                    case "inline":
                        e(t).css({
                            borderRadius:
                            "0px 0px 0px 0px"
                        }),
                        e(t).first().css({
                            "border-top-left-radius": "5px",
                            "border-top-right-radius": "5px"
                        }),
                        e(t).last().css({
                            "border-bottom-left-radius": "5px",
                            "border-bottom-right-radius": "5px"
                        });
                        break;
                    case "bottom":
                        e(t).css({
                            borderRadius:
                            "0px 0px 0px 0px"
                        }),
                        e(t).first().css({
                            borderRadius: "5px 5px 0px 0px"
                        })
                    }
                }
            }
        },
        modal: {
            css: {
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "#000",
                zIndex: 1e4,
                opacity: .6,
                display: "none",
                left: 0,
                top: 0
            }
        },
        style: function() {
            switch (this.$bar.css({
                overflow: "hidden",
                background: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAYAAAAPOoFWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPZJREFUeNq81tsOgjAMANB2ov7/7ypaN7IlIwi9rGuT8QSc9EIDAsAznxvY4pXPKr05RUE5MEVB+TyWfCEl9LZApYopCmo9C4FKSMtYoI8Bwv79aQJU4l6hXXCZrQbokJEksxHo9KMOgc6w1atHXM8K9DVC7FQnJ0i8iK3QooGgbnyKgMDygBWyYFZoqx4qS27KqLZJjA1D0jK6QJcYEQEiWv9PGkTsbqxQ8oT+ZtZB6AkdsJnQDnMoHXHLGKOgDYuCWmYhEERCI5gaamW0bnHdA3k2ltlIN+2qKRyCND0bhqSYCyTB3CAOc4WusBEIpkeBuPgJMAAX8Hs1NfqHRgAAAABJRU5ErkJggg==') repeat-x scroll left top #fff"
            }), this.$message.css({
                fontSize: "13px",
                lineHeight: "16px",
                textAlign: "center",
                padding: "8px 10px 9px",
                width: "auto",
                position: "relative"
            }), this.$closeButton.css({
                position: "absolute",
                top: 4,
                right: 4,
                width: 10,
                height: 10,
                background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAATpJREFUeNoszrFqVFEUheG19zlz7sQ7ijMQBAvfYBqbpJCoZSAQbOwEE1IHGytbLQUJ8SUktW8gCCFJMSGSNxCmFBJO7j5rpXD6n5/P5vM53H3b3T9LOiB5AQDuDjM7BnA7DMPHDGBH0nuSzwHsRcRVRNRSysuU0i6AOwA/02w2+9Fae00SEbEh6SGAR5K+k3zWWptKepCm0+kpyRoRGyRBcpPkDsn1iEBr7drdP2VJZyQXERGSPpiZAViTBACXKaV9kqd5uVzCzO5KKb/d/UZSDwD/eyxqree1VqSu6zKAF2Z2RPJJaw0rAkjOJT0m+SuT/AbgDcmnkmBmfwAsJL1dXQ8lWY6IGwB1ZbrOOb8zs8thGP4COFwx/mE8Ho9Go9ErMzvJOW/1fY/JZIJSypqZfXX3L13X9fcDAKJct1sx3OiuAAAAAElFTkSuQmCC)",
                display: "none",
                cursor: "pointer"
            }), this.$buttons.css({
                padding: 5,
                textAlign: "right",
                borderTop: "1px solid #ccc",
                backgroundColor: "#fff"
            }), this.$buttons.find("button").css({
                marginLeft: 5
            }), this.$buttons.find("button:first").css({
                marginLeft: 0
            }), this.$bar.bind({
                mouseenter: function() {
                    e(this).find(".noty_close").fadeIn()
                },
                mouseleave: function() {
                    e(this).find(".noty_close").fadeOut()
                }
            }), this.options.layout.name) {
            case "top":
                this.$bar.css({
                    borderRadius:
                    "0px 0px 5px 5px",
                    borderBottom: "2px solid #eee",
                    borderLeft: "2px solid #eee",
                    borderRight: "2px solid #eee",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                });
                break;
            case "topCenter":
            case "center":
            case "bottomCenter":
            case "inline":
                this.$bar.css({
                    borderRadius:
                    "5px",
                    border: "1px solid #eee",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }),
                this.$message.css({
                    fontSize: "13px",
                    textAlign: "center"
                });
                break;
            case "topLeft":
            case "topRight":
            case "bottomLeft":
            case "bottomRight":
            case "centerLeft":
            case "centerRight":
                this.$bar.css({
                    borderRadius:
                    "5px",
                    border: "1px solid #eee",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }),
                this.$message.css({
                    fontSize: "13px",
                    textAlign: "left"
                });
                break;
            case "bottom":
                this.$bar.css({
                    borderRadius:
                    "5px 5px 0px 0px",
                    borderTop: "2px solid #eee",
                    borderLeft: "2px solid #eee",
                    borderRight: "2px solid #eee",
                    boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)"
                });
                break;
            default:
                this.$bar.css({
                    border:
                    "2px solid #eee",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                })
            }
            switch (this.options.type) {
            case "alert":
            case "notification":
                this.$bar.css({
                    backgroundColor:
                    "#FFF",
                    borderColor: "#CCC",
                    color: "#444"
                });
                break;
            case "warning":
                this.$bar.css({
                    backgroundColor:
                    "#FFEAA8",
                    borderColor: "#FFC237",
                    color: "#826200"
                }),
                this.$buttons.css({
                    borderTop: "1px solid #FFC237"
                });
                break;
            case "error":
                this.$bar.css({
                    backgroundColor:
                    "red",
                    borderColor: "darkred",
                    color: "#FFF"
                }),
                this.$message.css({
                    fontWeight: "bold"
                }),
                this.$buttons.css({
                    borderTop: "1px solid darkred"
                });
                break;
            case "information":
                this.$bar.css({
                    backgroundColor:
                    "#57B7E2",
                    borderColor: "#0B90C4",
                    color: "#FFF"
                }),
                this.$buttons.css({
                    borderTop: "1px solid #0B90C4"
                });
                break;
            case "success":
                this.$bar.css({
                    backgroundColor:
                    "lightgreen",
                    borderColor: "#50C24E",
                    color: "darkgreen"
                }),
                this.$buttons.css({
                    borderTop: "1px solid #50C24E"
                });
                break;
            default:
                this.$bar.css({
                    backgroundColor:
                    "#FFF",
                    borderColor: "#CCC",
                    color: "#444"
                })
            }
        },
        callback: {
            onShow: function() {
                e.noty.themes.defaultTheme.helpers.borderFix.apply(this)
            },
            onClose: function() {
                e.noty.themes.defaultTheme.helpers.borderFix.apply(this)
            }
        }
    }
} (jQuery),
function(e) {
    e.noty.themes.maleskineTheme = {
        name: "maleskineTheme",
        helpers: {
            borderFix: function() {
                if (this.options.dismissQueue) {
                    var t = this.options.layout.container.selector + " " + this.options.layout.parent.selector;
                    switch (this.options.layout.name) {
                    case "top":
                        e(t).css({
                            borderRadius:
                            "0px 0px 0px 0px"
                        }),
                        e(t).last().css({
                            borderRadius: "0px 0px 5px 5px"
                        });
                        break;
                    case "topCenter":
                    case "topLeft":
                    case "topRight":
                    case "maleskineTopCenter":
                    case "maleskineTopRight":
                    case "bottomCenter":
                    case "bottomLeft":
                    case "bottomRight":
                    case "center":
                    case "centerLeft":
                    case "centerRight":
                    case "inline":
                        e(t).css({
                            borderRadius:
                            "0px 0px 0px 0px"
                        }),
                        e(t).first().css({
                            "border-top-left-radius": "5px",
                            "border-top-right-radius": "5px"
                        }),
                        e(t).last().css({
                            "border-bottom-left-radius": "5px",
                            "border-bottom-right-radius": "5px"
                        });
                        break;
                    case "maleskineCenter":
                        e(t).css({
                            borderRadius:
                            "0px 0px 0px 0px"
                        }),
                        e(t).first().css({
                            "border-top-left-radius": "5px",
                            "border-top-right-radius": "5px"
                        }),
                        e(t).last().css({
                            "border-bottom-left-radius": "5px",
                            "border-bottom-right-radius": "5px"
                        });
                        break;
                    case "bottom":
                        e(t).css({
                            borderRadius:
                            "0px 0px 0px 0px"
                        }),
                        e(t).first().css({
                            borderRadius: "5px 5px 0px 0px"
                        })
                    }
                }
            }
        },
        modal: {
            css: {
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "$white",
                zIndex: 1e4,
                opacity: .95,
                display: "none",
                left: 0,
                top: 0
            }
        },
        style: function() {
            switch (this.$bar.css({
                overflow: "hidden"
            }), this.$message.css({}), this.$closeButton.css({
                "float": "right",
                margin: "4px 0 0 10px",
                width: 10,
                height: 10,
                background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAATpJREFUeNoszrFqVFEUheG19zlz7sQ7ijMQBAvfYBqbpJCoZSAQbOwEE1IHGytbLQUJ8SUktW8gCCFJMSGSNxCmFBJO7j5rpXD6n5/P5vM53H3b3T9LOiB5AQDuDjM7BnA7DMPHDGBH0nuSzwHsRcRVRNRSysuU0i6AOwA/02w2+9Fae00SEbEh6SGAR5K+k3zWWptKepCm0+kpyRoRGyRBcpPkDsn1iEBr7drdP2VJZyQXERGSPpiZAViTBACXKaV9kqd5uVzCzO5KKb/d/UZSDwD/eyxqree1VqSu6zKAF2Z2RPJJaw0rAkjOJT0m+SuT/AbgDcmnkmBmfwAsJL1dXQ8lWY6IGwB1ZbrOOb8zs8thGP4COFwx/mE8Ho9Go9ErMzvJOW/1fY/JZIJSypqZfXX3L13X9fcDAKJct1sx3OiuAAAAAElFTkSuQmCC)",
                display: "none",
                cursor: "pointer"
            }), this.$buttons.css({
                padding: 10,
                textAlign: "right",
                borderTop: "1px solid #ccc",
                backgroundColor: "#f5f5f5"
            }), this.$buttons.find("button").css({
                marginLeft: 5
            }), this.$buttons.find("button:first").css({
                marginLeft: 0
            }), this.options.layout.name) {
            case "top":
                this.$bar.css({});
                break;
            case "topCenter":
            case "center":
            case "bottomCenter":
            case "inline":
            case "maleskineCenter":
            case "maleskineTopCenter":
                this.$bar.css({}),
                this.$message.css({
                    fontSize: "13px",
                    textAlign: "center"
                });
                break;
            case "topLeft":
            case "topRight":
            case "maleskineTopRight":
            case "bottomLeft":
            case "bottomRight":
            case "centerLeft":
            case "centerRight":
                this.$bar.css({}),
                this.$message.css({
                    fontSize: "13px",
                    textAlign: "left"
                });
                break;
            case "bottom":
                this.$bar.css({});
                break;
            default:
                this.$bar.css({})
            }
            switch (this.options.type) {
            case "alert":
            case "notification":
                this.$bar.css({
                    backgroundColor:
                    "#FFF",
                    borderColor: "#CCC",
                    color: "#444"
                });
                break;
            case "warning":
                this.$bar.css({
                    backgroundColor:
                    "#FFEAA8",
                    borderColor: "#FFC237",
                    color: "#826200"
                }),
                this.$buttons.css({
                    borderTop: "1px solid #FFC237"
                });
                break;
            case "error":
                this.$bar.css({
                    backgroundColor:
                    "#e58c7c",
                    borderColor: "darkred",
                    color: "#FFF"
                }),
                this.$message.css({
                    fontWeight: "bold"
                }),
                this.$buttons.css({
                    borderTop: "1px solid darkred"
                });
                break;
            case "information":
                this.$bar.css({
                    backgroundColor:
                    "#57B7E2",
                    borderColor: "#0B90C4",
                    color: "#FFF"
                }),
                this.$buttons.css({
                    borderTop: "1px solid #0B90C4"
                });
                break;
            case "maleskineInformation":
                this.$bar.css({}),
                this.$buttons.css({
                    borderTop: "1px solid #0B90C4"
                });
                break;
            case "success":
                this.$bar.css({
                    backgroundColor:
                    "lightgreen",
                    borderColor: "#50C24E",
                    color: "darkgreen"
                }),
                this.$buttons.css({
                    borderTop: "1px solid #50C24E"
                });
                break;
            default:
                this.$bar.css({
                    backgroundColor:
                    "#FFF",
                    borderColor: "#CCC",
                    color: "#444"
                })
            }
        },
        callback: {
            onShow: function() {
                e.noty.themes.maleskineTheme.helpers.borderFix.apply(this)
            },
            onClose: function() {
                e.noty.themes.maleskineTheme.helpers.borderFix.apply(this)
            }
        }
    }
} (jQuery);
var I18n = I18n || {};
I18n.defaultLocale = "en",
I18n.fallbacks = !1,
I18n.defaultSeparator = ".",
I18n.locale = null,
I18n.PLACEHOLDER = /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,
I18n.isValidNode = function(e, t, n) {
    return null !== e[t] && e[t] !== n
},
I18n.lookup = function(e, t) {
    var n, t = t || {},
    i = e,
    o = this.prepareOptions(I18n.translations),
    r = o[t.locale || I18n.currentLocale()],
    t = this.prepareOptions(t);
    if (r) {
        for ("object" == typeof e && (e = e.join(this.defaultSeparator)), t.scope && (e = t.scope.toString() + this.defaultSeparator + e), e = e.split(this.defaultSeparator); e.length > 0;) if (n = e.shift(), r = r[n], !r) {
            I18n.fallbacks && !t.fallback && (r = I18n.lookup(i, this.prepareOptions({
                locale: I18n.defaultLocale,
                fallback: !0
            },
            t)));
            break
        }
        return ! r && this.isValidNode(t, "defaultValue") && (r = t.defaultValue),
        r
    }
},
I18n.prepareOptions = function() {
    for (var e, t = {},
    n = arguments.length,
    i = 0; n > i; i++) if (e = arguments[i]) for (var o in e) this.isValidNode(t, o) || (t[o] = e[o]);
    return t
},
I18n.interpolate = function(e, t) {
    t = this.prepareOptions(t);
    var n, i, o, r = e.match(this.PLACEHOLDER);
    if (!r) return e;
    for (var s = 0; n = r[s]; s++) o = n.replace(this.PLACEHOLDER, "$1"),
    i = t[o],
    this.isValidNode(t, o) || (i = "[missing " + n + " value]"),
    regex = new RegExp(n.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}")),
    e = e.replace(regex, i);
    return e
},
I18n.translate = function(e, t) {
    t = this.prepareOptions(t);
    var n = this.lookup(e, t);
    try {
        return "object" == typeof n ? "number" == typeof t.count ? this.pluralize(t.count, e, t) : n: this.interpolate(n, t)
    } catch(i) {
        return this.missingTranslation(e)
    }
},
I18n.localize = function(e, t) {
    switch (e) {
    case "currency":
        return this.toCurrency(t);
    case "number":
        return e = this.lookup("number.format"),
        this.toNumber(t, e);
    case "percentage":
        return this.toPercentage(t);
    default:
        return e.match(/^(date|time)/) ? this.toTime(e, t) : t.toString()
    }
},
I18n.parseDate = function(e) {
    var t, n;
    if ("object" == typeof e) return e;
    if (t = e.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?(Z|\+0000)?/)) {
        for (var i = 1; 6 >= i; i++) t[i] = parseInt(t[i], 10) || 0;
        t[2] -= 1,
        n = t[7] ? new Date(Date.UTC(t[1], t[2], t[3], t[4], t[5], t[6])) : new Date(t[1], t[2], t[3], t[4], t[5], t[6])
    } else "number" == typeof e ? (n = new Date, n.setTime(e)) : e.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/) ? (n = new Date, n.setTime(Date.parse(e))) : (n = new Date, n.setTime(Date.parse(e)));
    return n
},
I18n.toTime = function(e, t) {
    var n = this.parseDate(t),
    i = this.lookup(e);
    return n.toString().match(/invalid/i) ? n.toString() : i ? this.strftime(n, i) : n.toString()
},
I18n.strftime = function(e, t) {
    var n = this.lookup("date");
    if (!n) return e.toString();
    n.meridian = n.meridian || ["AM", "PM"];
    var i = e.getDay(),
    o = e.getDate(),
    r = e.getFullYear(),
    s = e.getMonth() + 1,
    a = e.getHours(),
    l = a,
    c = a > 11 ? 1 : 0,
    u = e.getSeconds(),
    d = e.getMinutes(),
    h = e.getTimezoneOffset(),
    p = Math.floor(Math.abs(h / 60)),
    f = Math.abs(h) - 60 * p,
    m = (h > 0 ? "-": "+") + (p.toString().length < 2 ? "0" + p: p) + (f.toString().length < 2 ? "0" + f: f);
    l > 12 ? l -= 12 : 0 === l && (l = 12);
    var g = function(e) {
        var t = "0" + e.toString();
        return t.substr(t.length - 2)
    },
    y = t;
    return y = y.replace("%a", n.abbr_day_names[i]),
    y = y.replace("%A", n.day_names[i]),
    y = y.replace("%b", n.abbr_month_names[s]),
    y = y.replace("%B", n.month_names[s]),
    y = y.replace("%d", g(o)),
    y = y.replace("%e", o),
    y = y.replace("%-d", o),
    y = y.replace("%H", g(a)),
    y = y.replace("%-H", a),
    y = y.replace("%I", g(l)),
    y = y.replace("%-I", l),
    y = y.replace("%m", g(s)),
    y = y.replace("%-m", s),
    y = y.replace("%M", g(d)),
    y = y.replace("%-M", d),
    y = y.replace("%p", n.meridian[c]),
    y = y.replace("%S", g(u)),
    y = y.replace("%-S", u),
    y = y.replace("%w", i),
    y = y.replace("%y", g(r)),
    y = y.replace("%-y", g(r).replace(/^0+/, "")),
    y = y.replace("%Y", r),
    y = y.replace("%z", m)
},
I18n.toNumber = function(e, t) {
    t = this.prepareOptions(t, this.lookup("number.format"), {
        precision: 3,
        separator: ".",
        delimiter: ",",
        strip_insignificant_zeros: !1
    });
    var n, i, o = 0 > e,
    r = Math.abs(e).toFixed(t.precision).toString(),
    s = r.split("."),
    a = [];
    for (e = s[0], n = s[1]; e.length > 0;) a.unshift(e.substr(Math.max(0, e.length - 3), 3)),
    e = e.substr(0, e.length - 3);
    if (i = a.join(t.delimiter), t.precision > 0 && (i += t.separator + s[1]), o && (i = "-" + i), t.strip_insignificant_zeros) {
        var l = {
            separator: new RegExp(t.separator.replace(/\./, "\\.") + "$"),
            zeros: /0+$/
        };
        i = i.replace(l.zeros, "").replace(l.separator, "")
    }
    return i
},
I18n.toCurrency = function(e, t) {
    return t = this.prepareOptions(t, this.lookup("number.currency.format"), this.lookup("number.format"), {
        unit: "$",
        precision: 2,
        format: "%u%n",
        delimiter: ",",
        separator: "."
    }),
    e = this.toNumber(e, t),
    e = t.format.replace("%u", t.unit).replace("%n", e)
},
I18n.toHumanSize = function(e, t) {
    for (var n, i, o = 1024,
    r = e,
    s = 0; r >= o && 4 > s;) r /= o,
    s += 1;
    return 0 === s ? (n = this.t("number.human.storage_units.units.byte", {
        count: r
    }), i = 0) : (n = this.t("number.human.storage_units.units." + [null, "kb", "mb", "gb", "tb"][s]), i = r - Math.floor(r) === 0 ? 0 : 1),
    t = this.prepareOptions(t, {
        precision: i,
        format: "%n%u",
        delimiter: ""
    }),
    e = this.toNumber(r, t),
    e = t.format.replace("%u", n).replace("%n", e)
},
I18n.toPercentage = function(e, t) {
    return t = this.prepareOptions(t, this.lookup("number.percentage.format"), this.lookup("number.format"), {
        precision: 3,
        separator: ".",
        delimiter: ""
    }),
    e = this.toNumber(e, t),
    e + "%"
},
I18n.pluralize = function(e, t, n) {
    var i;
    try {
        i = this.lookup(t, n)
    } catch(o) {}
    if (!i) return this.missingTranslation(t);
    var r;
    switch (n = this.prepareOptions(n), n.count = e.toString(), Math.abs(e)) {
    case 0:
        r = this.isValidNode(i, "zero") ? i.zero: this.isValidNode(i, "none") ? i.none: this.isValidNode(i, "other") ? i.other: this.missingTranslation(t, "zero");
        break;
    case 1:
        r = this.isValidNode(i, "one") ? i.one: this.missingTranslation(t, "one");
        break;
    default:
        r = this.isValidNode(i, "other") ? i.other: this.missingTranslation(t, "other")
    }
    return this.interpolate(r, n)
},
I18n.missingTranslation = function() {
    for (var e = '[missing "' + this.currentLocale(), t = arguments.length, n = 0; t > n; n++) e += "." + arguments[n];
    return e += '" translation]'
},
I18n.currentLocale = function() {
    return I18n.locale || I18n.defaultLocale
},
I18n.t = I18n.translate,
I18n.l = I18n.localize,
I18n.p = I18n.pluralize,
function() {
    var e, t, n, i, o, r, s = {}.hasOwnProperty;
    r = "undefined" != typeof exports && null !== exports ? exports: this,
    t = function(e) {
        this.message = e
    },
    t.prototype = new Error,
    o = {
        prefix: "",
        default_url_options: {}
    },
    e = {
        GROUP: 1,
        CAT: 2,
        SYMBOL: 3,
        OR: 4,
        STAR: 5,
        LITERAL: 6,
        SLASH: 7,
        DOT: 8
    },
    n = {
        serialize: function(e, t) {
            var n, i, o, a, l, c, u, d;
            if (null == t && (t = null), !e) return "";
            if (!t && "object" !== this.get_object_type(e)) throw new Error("Url parameters should be a javascript hash");
            if (r.jQuery) return l = r.jQuery.param(e),
            l ? l: "";
            switch (c = [], this.get_object_type(e)) {
            case "array":
                for (i = u = 0, d = e.length; d > u; i = ++u) n = e[i],
                c.push(this.serialize(n, t + "[]"));
                break;
            case "object":
                for (o in e) s.call(e, o) && (a = e[o], null != a && (null != t && (o = "" + t + "[" + o + "]"), c.push(this.serialize(a, o))));
                break;
            default:
                e && c.push("" + encodeURIComponent(t.toString()) + "=" + encodeURIComponent(e.toString()))
            }
            return c.length ? c.join("&") : ""
        },
        clean_path: function(e) {
            var t;
            return e = e.split("://"),
            t = e.length - 1,
            e[t] = e[t].replace(/\/+/g, "/"),
            e.join("://")
        },
        set_default_url_options: function(e, t) {
            var n, i, r, s, a;
            for (a = [], n = r = 0, s = e.length; s > r; n = ++r) i = e[n],
            !t.hasOwnProperty(i) && o.default_url_options.hasOwnProperty(i) && a.push(t[i] = o.default_url_options[i]);
            return a
        },
        extract_anchor: function(e) {
            var t;
            return t = "",
            e.hasOwnProperty("anchor") && (t = "#" + e.anchor, delete e.anchor),
            t
        },
        extract_trailing_slash: function(e) {
            var t;
            return t = !1,
            o.default_url_options.hasOwnProperty("trailing_slash") && (t = o.default_url_options.trailing_slash),
            e.hasOwnProperty("trailing_slash") && (t = e.trailing_slash, delete e.trailing_slash),
            t
        },
        extract_options: function(e, t) {
            var n;
            return n = t[t.length - 1],
            t.length > e || null != n && "object" === this.get_object_type(n) && !this.look_like_serialized_model(n) ? t.pop() : {}
        },
        look_like_serialized_model: function(e) {
            return "id" in e || "to_param" in e
        },
        path_identifier: function(e) {
            var t;
            return 0 === e ? "0": e ? (t = e, "object" === this.get_object_type(e) && (t = "to_param" in e ? e.to_param: "id" in e ? e.id: e, "function" === this.get_object_type(t) && (t = t.call(e))), t.toString()) : ""
        },
        clone: function(e) {
            var t, n, i;
            if (null == e || "object" !== this.get_object_type(e)) return e;
            n = e.constructor();
            for (i in e) s.call(e, i) && (t = e[i], n[i] = t);
            return n
        },
        prepare_parameters: function(e, t, n) {
            var i, o, r, s, a;
            for (o = this.clone(n) || {},
            i = s = 0, a = e.length; a > s; i = ++s) r = e[i],
            i < t.length && (o[r] = t[i]);
            return o
        },
        build_path: function(e, t, i, o) {
            var r, s, a, l, c, u, d;
            if (o = Array.prototype.slice.call(o), s = this.extract_options(e.length, o), o.length > e.length) throw new Error("Too many parameters provided for path");
            return a = this.prepare_parameters(e, o, s),
            this.set_default_url_options(t, a),
            r = this.extract_anchor(a),
            c = this.extract_trailing_slash(a),
            l = "" + this.get_prefix() + this.visit(i, a),
            u = n.clean_path("" + l),
            c === !0 && (u = u.replace(/(.*?)[\/]?$/, "$1/")),
            (d = this.serialize(a)).length && (u += "?" + d),
            u += r
        },
        visit: function(n, i, o) {
            var r, s, a, l, c, u;
            switch (null == o && (o = !1), c = n[0], r = n[1], a = n[2], c) {
            case e.GROUP:
                return this.visit(r, i, !0);
            case e.STAR:
                return this.visit_globbing(r, i, !0);
            case e.LITERAL:
            case e.SLASH:
            case e.DOT:
                return r;
            case e.CAT:
                return s = this.visit(r, i, o),
                l = this.visit(a, i, o),
                !o || s && l ? "" + s + l: "";
            case e.SYMBOL:
                if (u = i[r], null != u) return delete i[r],
                this.path_identifier(u);
                if (o) return "";
                throw new t("Route parameter missing: " + r);
            default:
                throw new Error("Unknown Rails node type")
            }
        },
        visit_globbing: function(e, t, n) {
            var i, o, r, s;
            return r = e[0],
            i = e[1],
            o = e[2],
            i.replace(/^\*/i, "") !== i && (e[1] = i = i.replace(/^\*/i, "")),
            s = t[i],
            null == s ? this.visit(e, t, n) : (t[i] = function() {
                switch (this.get_object_type(s)) {
                case "array":
                    return s.join("/");
                default:
                    return s
                }
            }.call(this), this.visit(e, t, n))
        },
        get_prefix: function() {
            var e;
            return e = o.prefix,
            "" !== e && (e = e.match("/$") ? e: "" + e + "/"),
            e
        },
        _classToTypeCache: null,
        _classToType: function() {
            var e, t, n, i;
            if (null != this._classToTypeCache) return this._classToTypeCache;
            for (this._classToTypeCache = {},
            i = "Boolean Number String Function Array Date RegExp Object Error".split(" "), t = 0, n = i.length; n > t; t++) e = i[t],
            this._classToTypeCache["[object " + e + "]"] = e.toLowerCase();
            return this._classToTypeCache
        },
        get_object_type: function(e) {
            return r.jQuery && null != r.jQuery.type ? r.jQuery.type(e) : null == e ? "" + e: "object" == typeof e || "function" == typeof e ? this._classToType()[Object.prototype.toString.call(e)] || "object": typeof e
        }
    },
    i = function() {
        var e;
        return e = function(t, n) {
            var i, o;
            return o = n ? n.split(".") : [],
            o.length ? (i = o.shift(), t[i] = t[i] || {},
            e(t[i], o.join("."))) : void 0
        },
        e(r, "Routes"),
        r.Routes = {
            abuse_reports_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "abuse_reports", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            activities_note_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "activities", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            bookmarks_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "bookmarks", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            collection_collection_invitations_path: function() {
                return n.build_path(["collection_id"], ["format"], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [3, "collection_id", !1], [2, [7, "/", !1], [2, [6, "collection_invitations", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            collection_menu_note_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "collection_menu", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            collection_note_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "collection_notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            },
            collection_notes_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "collection_notes", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            collections_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "collections", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            destroy_user_session_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "sign_out", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            dismiss_comment_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "comments", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "dismiss", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            edit_editor_newsletter_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "newsletters", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "edit", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            },
            editable_collections_user_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "users", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [6, "editable", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            },
            editor_newsletter_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "newsletters", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            editor_newsletters_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "newsletters", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            },
            external_pages_info_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "external_pages", !1], [2, [7, "/", !1], [2, [6, "info", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            },
            fetch_collection_editor_collection_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "fetch_collection", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            },
            fetch_notebook_editor_notebook_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "notebooks", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "fetch_notebook", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            },
            fetch_public_note_editor_note_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "fetch_public_note", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            },
            fetch_user_editor_user_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "users", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "fetch_user", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            },
            following_collections_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [6, "following", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            },
            likes_note_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "likes", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            list_notebook_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notebooks", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "latest", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            message_inbox_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "messages", !1], [2, [7, "/", !1], [2, [6, "inbox", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            },
            new_editor_newsletter_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "newsletters", !1], [2, [7, "/", !1], [2, [6, "new", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            note_comment_path: function() {
                return n.build_path(["note_id", "id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "note_id", !1], [2, [7, "/", !1], [2, [6, "comments", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            },
            note_comments_path: function() {
                return n.build_path(["note_id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "note_id", !1], [2, [7, "/", !1], [2, [6, "comments", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            note_further_reading_path: function() {
                return n.build_path(["note_id", "id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "note_id", !1], [2, [7, "/", !1], [2, [6, "further_readings", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            },
            note_further_readings_path: function() {
                return n.build_path(["note_id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "note_id", !1], [2, [7, "/", !1], [2, [6, "further_readings", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            notebook_menu_note_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "notebook_menu", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            notifications_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "notifications", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            perform_editor_withdrawal_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "withdrawals", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "perform", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            },
            preferences_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "preferences", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            refresh_captcha_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "refresh_captcha", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            reject_editor_weibo_auth_application_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "editor", !1], [2, [7, "/", !1], [2, [6, "weibo_auth_applications", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "reject", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]]]], arguments)
            },
            rewards_note_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "rewards", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            root_path: function() {
                return n.build_path([], [], [7, "/", !1], arguments)
            },
            send_confirmation_email_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "settings", !1], [2, [7, "/", !1], [2, [6, "send_confirmation_email", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            },
            send_sms_verification_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "send_sms_verification", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            settings_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "settings", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            share_buttons_note_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "notes", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "share_buttons", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            show_collection_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "collection", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            },
            show_note_path: function() {
                return n.build_path(["slug"], ["format"], [2, [7, "/", !1], [2, [6, "p", !1], [2, [7, "/", !1], [2, [3, "slug", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            },
            subscribe_collection_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "subscribe", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            subscribers_collection_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "collection", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "subscribers", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            toggle_default_tab_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "preferences", !1], [2, [7, "/", !1], [2, [6, "toggle_default_tab", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            },
            top_daily_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "top", !1], [2, [7, "/", !1], [2, [6, "daily", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            },
            undismiss_comment_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "comments", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "undismiss", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            unsubscribe_collection_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "collections", !1], [2, [7, "/", !1], [2, [3, "id", !1], [2, [7, "/", !1], [2, [6, "unsubscribe", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            update_further_reading_state_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "update_further_reading_state", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            user_path: function() {
                return n.build_path(["id"], ["format"], [2, [7, "/", !1], [2, [6, "users", !1], [2, [7, "/", !1], [2, [3, "id", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            },
            user_password_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "users", !1], [2, [7, "/", !1], [2, [6, "password", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            },
            user_timeline_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "timeline", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            verify_sms_token_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "verify_sms_token", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            writer_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "writer", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]], arguments)
            },
            writer_search_collections_by_title_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "writer", !1], [2, [7, "/", !1], [2, [6, "search", !1], [2, [7, "/", !1], [2, [6, "collections_by_title", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]]]], arguments)
            },
            writer_submissions_path: function() {
                return n.build_path([], ["format"], [2, [7, "/", !1], [2, [6, "writer", !1], [2, [7, "/", !1], [2, [6, "submissions", !1], [1, [2, [8, ".", !1], [3, "format", !1]], !1]]]]], arguments)
            }
        },
        r.Routes.options = o,
        r.Routes
    },
    "function" == typeof define && define.amd ? define([],
    function() {
        return i()
    }) : i()
}.call(this);
var I18n = I18n || {};
I18n.translations = I18n.translations || {},
I18n.translations["zh-CN"] = {
    kalamu: {
        link_format_error: "\u4ec5\u652f\u6301http, https, ftp\u94fe\u63a5\u3002",
        insert_image: "\u63d2\u5165\u56fe\u7247",
        local_image: "\u672c\u5730\u4e0a\u4f20",
        or: "\u6216",
        internet_image: "\u7f51\u7edc\u56fe\u7247",
        select_image: "\u9009\u62e9\u56fe\u7247",
        cancel: "\u53d6\u6d88",
        image_url: "\u56fe\u7247\u94fe\u63a5",
        ok: "\u786e\u8ba4",
        processing: "\u4e0a\u4f20\u4e2d...",
        failed: "\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\u3002",
        image_url_blank: "\u8bf7\u8f93\u5165\u94fe\u63a5",
        insert_link: "\u63d2\u5165\u94fe\u63a5",
        link_url: "\u94fe\u63a5\u5730\u5740",
        link_text: "\u94fe\u63a5\u6587\u672c",
        wrong_image_file_format: "\u56fe\u7247\u683c\u5f0f\u9519\u8bef,\u8bf7\u4f7f\u7528jpg/jpeg/png/gif\u6587\u4ef6\u3002",
        size_excceed_limit: "\u6587\u4ef6\u5927\u5c0f\u8d85\u8fc7\u9650\u5236, \u8bf7\u9009\u62e95MB\u4ee5\u4e0b\u7684\u6587\u4ef6\u3002",
        image_url_blank: "\u8bf7\u586b\u5199\u56fe\u7247\u5730\u5740\u3002",
        image_protocol_not_supported: "\u6211\u4eec\u76ee\u524d\u4e0d\u652f\u6301\u8be5\u534f\u8bae\u3002",
        select_image: "\u9009\u62e9\u56fe\u7247\u4e0a\u4f20",
        image_privacy: "\u6709\u5173\u56fe\u7247\u79c1\u5bc6\u6027\u70b9\u51fb\u95ee\u53f7\u4e86\u89e3\u66f4\u591a",
        upload_internal_server_error: "\u4e0a\u4f20\u5931\u8d25, \u8bf7\u91cd\u8bd5\u3002",
        "image-uploading": "\u6b63\u5728\u4e0a\u4f20...",
        "retry-upload-image": "\u91cd\u65b0\u4e0a\u4f20"
    },
    ie_warning: {
        title: "\u60a8\u7684\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e",
        upgrade_ie: '\u8bf7\u5347\u7ea7\u60a8\u7684 IE \u6d4f\u89c8\u5668\uff0c <a href="http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie-9/worldwide-languages">\u70b9\u6b64\u5904\u5347\u7ea7</a>\u3002',
        use_chrome: '\u6211\u4eec\u63a8\u8350\u4f7f\u7528 <a href="http://www.google.com/chrome" class="use-chrome">Google Chrome </a>\u6765\u8bbf\u95ee\u7b80\u4e66\u83b7\u53d6\u6700\u4f73\u7684\u7528\u6237\u4f53\u9a8c\u3002',
        skip: "\u8df3\u8fc7"
    },
    reading: {
        abuse_report: {
            confirm: "\u662f\u5426\u4e3e\u62a5\uff1f",
            report_success: "\u4e3e\u62a5\u6210\u529f",
            no_reason: "\u8bf7\u586b\u5199\u4e3e\u62a5\u539f\u56e0",
            report: "\u4e3e\u62a5",
            ad: "\u5e7f\u544a\u53ca\u5783\u573e\u4fe1\u606f",
            other: "\u5176\u4ed6"
        },
        notes: {
            show: {
                like_item_tooltip: "{{nickname}} {{timeago}}\u559c\u6b22\u4e86\u8fd9\u7bc7\u6587\u7ae0",
                contribute_status: {
                    approved: "\uff08\u5df2\u6536\u5165\uff09",
                    pending: "\uff08\u7b49\u5f85\u4e2d\uff09"
                },
                reward: {
                    info: " \u4eba\u6253\u8d4f\u4e86\u8fd9\u7bc7\u6587\u7ae0"
                }
            }
        },
        captcha: {
            placeholder: "\u9a8c\u8bc1\u7801",
            refresh_button: "\u770b\u4e0d\u6e05\u695a\uff1f\u6362\u4e00\u5f20",
            invalid_message: "\u9a8c\u8bc1\u7801{{message}}"
        },
        wordage: "{{wordage}} \u5b57",
        views_count: "{{count}} \u6b21\u9605\u8bfb",
        self_destroy_done: "\u7528\u6237\u5df2\u6210\u529f\u5220\u9664\uff0c\u73b0\u5728\u6b63\u5728\u8df3\u8f6c\u56de\u9996\u9875...",
        registration_complete: "\u6ce8\u518c\u6210\u529f\uff0c\u6b63\u5728\u8df3\u8f6c...",
        errors: {
            email_invalid: "\u90ae\u4ef6\u5730\u5740\u683c\u5f0f\u6709\u8bef"
        },
        btn_group: {
            add_to_collection: "\u52a0\u5165\u4e13\u9898",
            bookmark: "\u6536\u85cf\u6587\u7ae0",
            share: "\u5206\u4eab\u6587\u7ae0"
        },
        bookmark: "\u6536\u85cf\u6587\u7ae0",
        bookmarked: "\u6536\u85cf\u6210\u529f",
        unbookmarked: "\u53d6\u6d88\u6536\u85cf\u6210\u529f",
        download_changweibo_image: "\u4e0b\u8f7d\u957f\u5fae\u535a\u56fe\u7247",
        following: " \u6b63\u5728\u5173\u6ce8",
        unfollow: " \u53d6\u6d88\u5173\u6ce8",
        subscribe: " \u6dfb\u52a0\u5173\u6ce8",
        subscribing: " \u6b63\u5728\u5173\u6ce8",
        unsubscribe: " \u53d6\u6d88\u5173\u6ce8",
        show_description: "\u5c55\u5f00\u63cf\u8ff0",
        hidden_description: "\u6536\u8d77\u63cf\u8ff0",
        bian: " \u7f16",
        remove: "\u79fb\u9664",
        comment: {
            undismiss_button: "\u64a4\u9500",
            dismiss_info: "\u8bc4\u8bba\u5df2\u5220\u9664",
            undismiss_info: "\u8bc4\u8bba\u5df2\u6062\u590d",
            delete_confirm: "\u786e\u5b9a\u8981\u5220\u9664\u8bc4\u8bba\u4e48?",
            delete_button: "\u5220\u9664",
            dismiss_button: "\u5220\u9664",
            reply_button: "\u56de\u590d"
        },
        reject: {
            title: "\u62d2\u7edd\u6295\u7a3f",
            description: "\u56de\u4e2a\u4fe1\u7ed9\u6295\u7a3f\u8005\uff0c\u544a\u77e5\u60a8\u62d2\u7edd\u7684\u7406\u7531\uff0c\u4e5f\u53ef\u4ee5\u4e0d\u586b\u3002",
            placeholder: "\u7ee7\u7eed\u52a0\u6cb9\u4ec0\u4e48\u7684\u2026\u2026",
            close: "\u5173\u95ed",
            submit: "\u786e\u5b9a"
        },
        further_reading: {
            button: {
                "continue": "\u7ee7\u7eed",
                save: "\u4fdd\u5b58",
                load: "\u786e\u5b9a",
                cancel: "\u53d6\u6d88",
                "delete": " \u5220\u9664"
            },
            from: " \u6765\u81ea ",
            add: "\u6dfb\u52a0",
            states: {
                "private": " \u79c1\u6709",
                "public": " \u516c\u5f00",
                dismiss: " \u5220\u9664"
            },
            load_link_error: "\u51fa\u9519\u4e86\uff0c\u6211\u4eec\u4e0d\u80fd\u52a0\u8f7d\u8fd9\u6761\u94fe\u63a5\uff01",
            undo_link: "\u94fe\u63a5{{state}} \u6210\u529f\u30fb<a class='undo' data-further-reading-id='{{id}}' data-state='{{originState}}' href='javascript:void(null)'>\u64a4\u9500</a>",
            link_text_placeholder: "\u7c98\u8d34\u6216\u8f93\u5165\u94fe\u63a5",
            title_placeholder: "\u6807\u9898",
            description_placeholder: "\u6dfb\u52a0\u63cf\u8ff0",
            delete_success: "\u62d3\u5c55\u9605\u8bfb\u5220\u9664\u6210\u529f"
        },
        timeline: {
            show_comments: "\u67e5\u770b\u8bc4\u8bba",
            collapse_comments: "\u6536\u8d77\u8bc4\u8bba",
            reply: "\u56de\u590d",
            "delete": "\u5220\u9664"
        },
        self_destruction_confirm: "\u8bf7\u786e\u8ba4\u60a8\u786e\u5b9e\u8981\u5220\u9664\u60a8\u7684\u8d26\u6237, \u6b64\u64cd\u4f5c\u65e0\u6cd5\u6062\u590d!",
        delete_comment_confirm: "\u786e\u5b9a\u8981\u5220\u9664\u8bc4\u8bba\u4e48?",
        collections: {
            select_note: "\u8bf7\u9009\u62e9\u6587\u7ae0\uff1a",
            select_note_error: "\u8bf7\u9009\u62e9\u4e00\u7bc7\u6587\u7ae0",
            show: {
                subscriber_tooltip: "{{nickname}} {{timeago}}\u5173\u6ce8\u4e86\u8fd9\u4e2a\u4e13\u9898",
                subscribers_count_tooltip: "\u67e5\u770b\u6240\u6709\u5173\u6ce8\u7528\u6237",
                can_not_contribute: "\u8be5\u4e13\u9898\u6682\u4e0d\u63a5\u53d7\u6295\u7a3f",
                invited: "\u5df2\u9080\u8bf7",
                invite_success: "\u9080\u8bf7\u6210\u529f",
                include_info_tooltip: "{{timeago}}\u6536\u5165",
                include_info_tooltip_from_editor: "\u7531 {{nickname}} {{timeago}}\u6536\u5165"
            }
        },
        social_sharing: {
            trailing_jianshushe: "- \u7b80\u4e66\u793e",
            share_to_label: {
                weibo: "\u5206\u4eab\u5230\u5fae\u535a",
                tweibo: "\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a",
                qzone: "\u5206\u4eab\u5230QQ\u7a7a\u95f4",
                douban: "\u5206\u4eab\u5230\u8c46\u74e3",
                twitter: "\u5206\u4eab\u5230Twitter",
                facebook: "\u5206\u4eab\u5230Facebook",
                google_plus: "\u5206\u4eab\u5230Google+",
                renren: "\u5206\u4eab\u5230\u4eba\u4eba\u7f51",
                weixin: "\u5206\u4eab\u5230\u5fae\u4fe1",
                changweibo: "\u4e0b\u8f7d\u957f\u5fae\u535a\u56fe\u7247"
            },
            self_share_note_text: "\u6211\u5199\u4e86\u65b0\u6587\u7ae0\u300a{{note_title}}\u300b",
            reader_share_note_text: "\u63a8\u8350 {{user} \u7684\u6587\u7ae0\u300a{{note_title}}\u300b",
            self_share_notebook_text: "\u6211\u53d1\u5e03\u4e86\u6587\u96c6\u300a{{notebook_title}}\u300b",
            reader_share_notebook_text: "\u63a8\u8350 {{user}} \u7684\u6587\u96c6\u300a{{notebook_title}}\u300b",
            share_collection_text: "\u63a8\u8350\u4e13\u9898\u300a{{collection_title}}\u300b",
            official_account: "\uff08 \u5206\u4eab\u81ea {{account}} \uff09"
        }
    },
    note_logs: {
        list_title: "\u5171 {{count}} \u6761\u5386\u53f2\u7248\u672c",
        apply_this_log: "\u6062\u590d\u5230\u8fd9\u4e2a\u7248\u672c",
        filter: "\u7b5b\u9009",
        types: {
            autosave: "\u81ea\u52a8\u4fdd\u5b58",
            publish: "\u516c\u5f00\u53d1\u5e03\u6587\u7ae0",
            post_updates: "\u53d1\u5e03\u66f4\u65b0",
            before_restore: "\u7248\u672c\u6062\u590d"
        }
    },
    browser_tip: {
        title: "\u522b\u518d\u62d6\u5ef6\uff0c\u662f\u65f6\u5019\u66f4\u65b0\u60a8\u7684\u6d4f\u89c8\u5668\u5566",
        intro: "\u4e3a\u4e86\u7ed9\u60a8\u5e26\u6765\u66f4\u4f18\u8d28\u7684\u5728\u7ebf\u5199\u4f5c\u4f53\u9a8c\uff0c\u7b80\u4e66\u5efa\u8bae\u60a8\u4f7f\u7528\u6700\u65b0\u7248\u672c\u7684 Chrome \u6d4f\u89c8\u5668\u6216\u5176\u4ed6\u63a8\u8350\u6d4f\u89c8\u5668\u8fdb\u884c\u5199\u4f5c\u3002",
        download: "\u5b98\u65b9\u7f51\u7ad9"
    },
    new_notebook: "\u65b0\u5efa\u6587\u96c6",
    new_notebook_name: "\u65b0\u6587\u96c6\u540d",
    new_note: "\u65b0\u5efa\u6587\u7ae0",
    default_note_title: "\u65e0\u6807\u9898\u6587\u7ae0",
    delete_notebook_confirm: "\u786e\u8ba4\u5220\u9664\u6587\u96c6\u300a{{title}}\u300b\u3002\u76f8\u5173\u6587\u7ae0\u5c06\u4f1a\u4e00\u540c\u5220\u9664, \u8be5\u64cd\u4f5c\u65e0\u6cd5\u9006\u8f6c\u3002",
    delete_note_confirm: "\u786e\u8ba4\u5220\u9664\u6587\u7ae0\u300a{{title}}\u300b\u3002\u8be5\u64cd\u4f5c\u65e0\u6cd5\u9006\u8f6c\u3002",
    rename_notebook: "\u4fee\u6539\u6587\u96c6\u540d",
    delete_notebook: "\u5220\u9664\u6587\u96c6",
    saving: "\u4fdd\u5b58\u4e2d...",
    saved: "\u5df2\u4fdd\u5b58",
    compiled: "\u66f4\u65b0\u5df2\u6210\u529f\u53d1\u5e03",
    saved_partially: "\u6587\u7ae0\u8fc7\u957f, \u5c3e\u7aef\u90e8\u5206\u5185\u5bb9\u672a\u4fdd\u5b58",
    change_notebook_placeholder: "\u8bf7\u9009\u62e9\u76ee\u6807\u6587\u96c6..",
    wordage: "\u5b57\u6570: {{wordage}}",
    commerical_placeholder: "\u5c5e\u4e8e\u5199\u4f5c\u8005\u7684\u6587\u96c6, \u4e00\u4e2a\u7b80\u6d01\u800c\u4f18\u96c5\u7684\u73af\u5883\u8ba9\u4f60\u4e13\u6ce8\u4e8e\u4e66\u5199\u3002",
    notebook_name_placeholder: "\u8bf7\u8f93\u5165\u6587\u96c6\u540d...",
    nickname_format_invalid: "\u6635\u79f0\u683c\u5f0f\u4e0d\u6b63\u786e",
    nickname: "\u6635\u79f0",
    spine_ajax_pending: "\u5b58\u50a8\u8bf7\u6c42\u5c1a\u672a\u5168\u90e8\u5b8c\u6210, \u672a\u4fdd\u5b58\u6570\u636e\u5c06\u4f1a\u4e22\u5931, \u786e\u5b9a\u8981\u79bb\u5f00\u9875\u9762\u4e48?",
    form_dirty: "\u68c0\u6d4b\u5230\u6709\u672a\u4fdd\u5b58\u7684\u6570\u636e, \u786e\u5b9a\u8981\u79bb\u5f00\u9875\u9762\u4e48?",
    toggle_to_markdown: "\u5207\u6362\u7f16\u8f91\u5668\u4e3a\u300cMarkdown\u7f16\u8f91\u5668\u300d",
    toggle_to_plain: "\u5207\u6362\u7f16\u8f91\u5668\u4e3a\u300c\u5bcc\u6587\u672c\u7f16\u8f91\u5668\u300d",
    suggest_chrome: "\u68c0\u6d4b\u5230\u60a8\u6b63\u5728\u4f7f\u7528 Internet Explorer, \u6211\u4eec\u5efa\u8bae\u4f7f\u7528 Google Chrome \u8bbf\u95ee\u300e\u7b80\u4e66\u300f\u4ee5\u83b7\u5f97\u6700\u4f73\u4f53\u9a8c\u3002",
    suggest_upgrade: "\u68c0\u6d4b\u5230\u60a8\u6b63\u5728\u4f7f\u7528 Internet Explorer 8/9, \u5728\u6b64\u60c5\u51b5\u4e0b, \u4f1a\u51fa\u73b0\u6027\u80fd\u95ee\u9898, \u5e76\u4e14\u6211\u4eec\u65e0\u6cd5\u63d0\u4f9b\u5b8c\u6574\u7684\u529f\u80fd, \u5efa\u8bae\u4f7f\u7528 Google Chrome \u8bbf\u95ee\u300e\u7b80\u4e66\u300f\u4ee5\u83b7\u5f97\u6700\u4f73\u4f53\u9a8c, \u6216\u662f\u5347\u7ea7\u81f3 Internet Explorer 10\u3002",
    chrome_bug: "\u6211\u4eec\u53d1\u73b0\u60a8\u5f53\u524d\u7684 Chrome \u7248\u672c(33.0.1750.152)\u5b58\u5728\u5df2\u77e5bug, \u5728\u5f53\u524d Chrome \u7248\u672c\u4e0b\u60a8\u5c06\u65e0\u6cd5\u5728\u5bcc\u6587\u672c\u7f16\u8f91\u5668\u4e2d\u4e0a\u4f20\u56fe\u7247/\u7f16\u8f91\u94fe\u63a5, \u8bf7\u5347\u7ea7\u81f3\u6700\u65b0Chrome\u7248\u672c\u3002",
    restore_a_locale_copy: "\u6211\u4eec\u4ece\u672c\u5730\u5b58\u50a8\u4e2d\u6062\u590d\u4e86\u60a8\u7684\u8fd9\u7bc7\u6587\u7ae0, \u5982\u679c\u4ed6\u4e0d\u662f\u6700\u65b0\u7248\u60a8\u53ef\u4ee5: ",
    leaving_note_unsaved: "\u60a8\u7684\u6587\u7ae0\u5df2\u7ecf\u4fee\u6539, \u5e76\u4e14\u5c1a\u672a\u4fdd\u5b58, \u662f\u5426\u4fdd\u5b58?",
    press_esc_to_leave: "\u6309 Esc \u9000\u51fa.",
    new_note_bottom: "\u5728\u4e0b\u65b9\u65b0\u5efa\u6587\u7ae0",
    ajax_error: "\u51fa\u73b0\u9519\u8bef, \u8bf7\u5907\u4efd\u60a8\u5f53\u524d\u7684\u4f5c\u54c1\u5e76\u5237\u65b0\u9875\u9762.",
    publish: "\u53d1\u5e03\u6587\u7ae0",
    published: "\u5df2\u53d1\u5e03",
    unpublish: "\u53d6\u6d88\u53d1\u5e03",
    publish_changes: "\u53d1\u5e03\u66f4\u65b0",
    publishing: "\u53d1\u5e03\u4e2d...",
    toolbar: {
        writing_mode: "\u5207\u6362\u5230\u5199\u4f5c\u6a21\u5f0f",
        preview_mode: "\u5207\u6362\u5230\u9884\u89c8\u6a21\u5f0f",
        save: "\u4fdd\u5b58",
        redo: "\u91cd\u505a",
        undo: "\u64a4\u9500",
        bold: "\u7c97\u4f53",
        italic: "\u659c\u4f53",
        strikethrough: "\u5220\u9664\u7ebf",
        blockquote: "\u5f15\u7528",
        heading1: "\u6807\u9898\u4e00",
        heading2: "\u6807\u9898\u4e8c",
        heading3: "\u6807\u9898\u4e09",
        heading4: "\u6807\u9898\u56db",
        headline: "\u5206\u5272\u7ebf",
        insert_link: "\u63d2\u5165\u94fe\u63a5",
        insert_image: "\u63d2\u5165\u56fe\u7247",
        history: "\u5386\u53f2\u7248\u672c"
    },
    errors: {
        401 : "\u51fa\u73b0\u5b89\u5168\u9a8c\u8bc1\u9519\u8bef, \u8bf7\u624b\u52a8\u4fdd\u5b58\u5f53\u524d\u4f5c\u54c1, \u5237\u65b0\u9875\u9762\u91cd\u8bd5.",
        404 : '\u8bf7\u6c42\u7684\u6587\u7ae0/\u6587\u96c6\u4e0d\u5b58\u5728, \u8bf7<a href="http://www.jianshu.com/writer/#/">\u70b9\u6b64\u5237\u65b0\u9875\u9762</a>.',
        500 : "\u670d\u52a1\u5668\u9519\u8bef, \u8bf7\u624b\u52a8\u4fdd\u5b58\u5f53\u524d\u4f5c\u54c1, \u5237\u65b0\u9875\u9762\u91cd\u8bd5.",
        content_overflow: "\u5f53\u524d\u6587\u7ae0\u5185\u5bb9\u8fc7\u957f, \u7bc7\u5c3e\u90e8\u5206\u5185\u5bb9\u65e0\u6cd5\u4fdd\u5b58, \u8bf7\u5148\u624b\u52a8\u5907\u4efd\uff0c\u7136\u540e\u65b0\u5efa\u6587\u7ae0\u5206\u5f00\u4e66\u5199!",
        writer_version_conflict: "\u60a8\u5df2\u5728\u5176\u4ed6\u7a97\u53e3\u4e2d\u5bf9\u672c\u6587\u8fdb\u884c\u4e86\u66f4\u65b0\uff0c\u4ee5\u9632\u4e22\u5931\u4efb\u4f55\u6587\u5b57\uff0c\u8bf7\u624b\u52a8\u5907\u4efd\u5f53\u524d\u6539\u52a8\uff0c\u5237\u65b0\u672c\u9875\u540e\u7ee7\u7eed"
    },
    warnings: {
        content_too_large: "\u5f53\u524d\u6587\u7ae0\u957f\u5ea6\u6b63\u5728\u63a5\u8fd1\u7b80\u4e66\u7684\u9650\u5ea6, \u8bf7\u8003\u8651\u5206\u7bc7\u4e66\u5199\u5427"
    },
    network: {
        issue: "\u7f51\u7edc\u8fde\u63a5\u901f\u5ea6\u8fc7\u6162\u6216\u6b63\u5728\u51fa\u73b0\u95ee\u9898, \u53ef\u80fd\u6062\u590d, \u53ef\u4ee5\u7ee7\u7eed\u64cd\u4f5c.",
        down: "\u7f51\u7edc\u8fde\u63a5\u8fde\u7eed\u51fa\u9519, \u8bf7\u52a1\u5fc5\u5907\u4efd\u60a8\u5f53\u524d\u7684\u4f5c\u54c1\u5e76\u5237\u65b0\u9875\u9762!",
        back: "\u60a8\u7684\u7f51\u7edc\u8fde\u63a5\u5df2\u6062\u590d\u3002"
    },
    navbar: {
        homepage: "\u9996\u9875",
        collections: "\u4e13\u9898",
        top: "\u7b80\u4e66\u70ed\u95e8",
        timeline: "\u7b80\u53cb\u5708",
        writer: "\u5199\u6587\u7ae0",
        user_homepage: "\u6211\u7684\u4e3b\u9875",
        favourites: "\u6211\u559c\u6b22\u7684",
        bookmarks: "\u6211\u7684\u6536\u85cf",
        notifications: "\u63d0\u9192",
        messages: "\u7b80\u4fe1",
        view_mode: "\u663e\u793a\u6a21\u5f0f",
        settings: "\u8bbe\u7f6e",
        sign_out: "\u767b\u51fa"
    },
    note_modified: {
        mac: "\u6587\u7ae0\u5df2\u66f4\u6539, \u8bf7\u6309 command + s \u4fdd\u5b58\u3002",
        nonmac: "\u6587\u7ae0\u5df2\u66f4\u6539, \u8bf7\u6309 ctrl + s \u4fdd\u5b58\u3002"
    },
    note: {
        untitled: "\u65e0\u6807\u9898\u6587\u7ae0",
        collection: {
            adding: "\u52a0\u8f7d\u4e2d\u2026\u2026"
        },
        dropdown: {
            share_directly: "\u76f4\u63a5\u53d1\u5e03",
            move_note: "\u79fb\u52a8\u6587\u7ae0",
            shared: "\u5df2\u53d1\u5e03",
            share_to: "\u5206\u4eab\u5230",
            delete_note: "\u5220\u9664\u6587\u7ae0",
            revision_history: "\u5386\u53f2\u7248\u672c",
            share_to_sns: {
                weibo: "\u5206\u4eab\u5230\u5fae\u535a",
                douban: "\u5206\u4eab\u5230\u8c46\u74e3",
                twitter: "\u5206\u4eab\u5230Twitter",
                tweibo: "\u5206\u4eab\u5230\u817e\u8baf\u5fae\u535a",
                qzone: "\u5206\u4eab\u5230QQ\u7a7a\u95f4",
                facebook: "\u5206\u4eab\u5230Facebook",
                google_plus: "\u5206\u4eab\u5230Google+"
            },
            open_in_new_window: "\u5728\u65b0\u7a97\u53e3\u6253\u5f00",
            stop_sharing: "\u505c\u6b62\u5206\u4eab"
        },
        moving: {
            title: "\u79fb\u52a8\u6587\u7ae0\u5230"
        },
        share: {
            title: "\u76f4\u63a5\u53d1\u5e03",
            help: "\u70b9\u51fb\u201c\u53d1\u5e03\u201d\u6309\u94ae\u540e\u6587\u7ae0\u5c06\u4f1a\u751f\u6210\u4e00\u4e2a\u201c\u56fa\u5b9a\u94fe\u63a5\u201d\uff0c\u4ed6\u4eba\u901a\u8fc7\u8be5\u56fa\u5b9a\u94fe\u63a5\u5373\u53ef\u8bbf\u95ee\u4f60\u7684\u6587\u7ae0\uff0c\u4f60\u4e5f\u53ef\u4ee5\u968f\u540e\u5c06\u56fa\u5b9a\u94fe\u63a5\u544a\u77e5\u4ed6\u4eba\u6216\u8005\u5206\u4eab\u5230\u4f60\u7684\u793e\u4ea4\u7f51\u7edc\u3002",
            permanent_link: "\u56fa\u5b9a\u94fe\u63a5\u5730\u5740",
            success: "\u6587\u7ae0\u53d1\u5e03\u6210\u529f\uff01",
            to_sns: "\u4f60\u8fd8\u53ef\u4ee5\u5206\u4eab\u6587\u7ae0\u5230\u793e\u4ea4\u7f51\u7edc:",
            share_note: "\u5206\u4eab\u6587\u7ae0",
            click_to_show: "\u70b9\u51fb\u6807\u9898\u53ef\u4ee5\u67e5\u770b\u5df2\u53d1\u5e03\u7684\u6587\u7ae0"
        },
        contribute: {
            hint: "\u4e3a\u4e86\u60a8\u7684\u6587\u7ae0\u88ab\u66f4\u591a\u4eba\u53d1\u73b0\uff0c\u60a8\u53ef\u4ee5\u9009\u62e9\u6295\u7a3f\u5230\u5bf9\u5e94\u4e13\u9898",
            contribute_to_collection: "\u6295\u7a3f",
            add_to_collection: "\u6536\u5165\u4e13\u9898",
            pending: "\u7b49\u5f85\u5ba1\u6838",
            remove_from_collection: "\u4ece\u4e13\u9898\u79fb\u9664",
            collection_info: "{{notes_count}} \u7bc7\u6587\u7ae0\uff0c{{subscribers_count}} \u4eba\u5173\u6ce8",
            similar_collections: "\u4ee5\u4e0b\u4e13\u9898\u53ef\u80fd\u4e0e\u60a8\u7684\u6587\u7ae0\u76f8\u5173\uff1a",
            editable_collections: "\u6211\u7f16\u8f91\u7684\u4e13\u9898\uff1a",
            no_search_result: "\u6ca1\u6709\u627e\u5230\u76f8\u5173\u7684\u4e13\u9898"
        },
        shareToWeibo: {
            share: "\u5206 \u4eab",
            done: "\u5e26\u957f\u5fae\u535a\u56fe\u7247\u5206\u4eab",
            download: "\u4e0b\u8f7d\u957f\u5fae\u535a\u56fe\u7247",
            processing: "\u6b63\u5728\u751f\u6210\u957f\u5fae\u535a\u56fe\u7247",
            processingNotice: "\u5982\u679c\u60a8\u4e0d\u9700\u8981\u5e26\u957f\u5fae\u535a\u5206\u4eab\uff0c\u53ef\u70b9\u51fb\u4e0b\u9762\u7684\u5206\u4eab\u6309\u94ae\u76f4\u63a5\u5206\u4eab\uff0c\u65e0\u9700\u7b49\u5f85\u3002"
        }
    },
    share: {
        text: "\u6211\u5199\u4e86\u65b0\u6587\u7ae0\u300a{{note_title}}\u300b",
        official_account: "\uff08 \u5206\u4eab\u81ea @{{official_account}} \uff09",
        trailing_jianshushe: "- \u7b80\u4e66\u793e"
    },
    button: {
        submitting: "\u6b63\u5728\u63d0\u4ea4...",
        submit_failed: "\u53d1\u9001\u5931\u8d25",
        submit: "\u63d0\u4ea4",
        cancel: "\u53d6\u6d88",
        close: "\u5173\u95ed",
        publish: "\u53d1\u5e03",
        ok: "\u786e\u8ba4",
        undo: "\u64a4\u9500",
        upload_image_notice: "\u5c06\u56fe\u7247\u6587\u4ef6\u76f4\u63a5\u62d6\u52a8\u5230\u7f16\u8f91\u533a\u57df\u5373\u53ef\u4e0a\u4f20",
        upload_image_paste_notice: "\u6216\u8005\u4e5f\u53ef\u4ee5\u5c06\u526a\u8d34\u677f\u91cc\u7684\u56fe\u7247\u76f4\u63a5\u7c98\u8d34\u8fdb\u7f16\u8f91\u533a\u57df"
    },
    "jquery-timeago": {
        prefixAgo: null,
        prefixFromNow: "\u4ece\u73b0\u5728\u5f00\u59cb",
        suffixAgo: "\u4e4b\u524d",
        suffixFromNow: null,
        seconds: "\u4e0d\u52301\u5206\u949f",
        minute: "\u5927\u7ea61\u5206\u949f",
        minutes: "%d\u5206\u949f",
        hour: "\u5927\u7ea61\u5c0f\u65f6",
        hours: "\u5927\u7ea6%d\u5c0f\u65f6",
        day: "1\u5929",
        days: "%d\u5929",
        month: "\u5927\u7ea61\u4e2a\u6708",
        months: "%d\u6708",
        year: "\u5927\u7ea61\u5e74",
        years: "%d\u5e74",
        numbers: [],
        wordSeparator: ""
    },
    date: {
        abbr_day_names: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
        abbr_month_names: [null, "1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
        day_names: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
        formats: {
            "default": "%Y-%m-%d",
            "long": "%Y\u5e74%b%d\u65e5",
            "short": "%b%d\u65e5"
        },
        month_names: [null, "\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
        order: ["year", "month", "day"]
    },
    datetime: {
        distance_in_words: {
            about_x_hours: {
                one: "\u5927\u7ea6\u4e00\u5c0f\u65f6",
                other: "\u5927\u7ea6 %{count} \u5c0f\u65f6"
            },
            about_x_months: {
                one: "\u5927\u7ea6\u4e00\u4e2a\u6708",
                other: "\u5927\u7ea6 %{count} \u4e2a\u6708"
            },
            about_x_years: {
                one: "\u5927\u7ea6\u4e00\u5e74",
                other: "\u5927\u7ea6 %{count} \u5e74"
            },
            almost_x_years: {
                one: "\u63a5\u8fd1\u4e00\u5e74",
                other: "\u63a5\u8fd1 %{count} \u5e74"
            },
            half_a_minute: "\u534a\u5206\u949f",
            less_than_x_minutes: {
                one: "\u4e0d\u5230\u4e00\u5206\u949f",
                other: "\u4e0d\u5230 %{count} \u5206\u949f"
            },
            less_than_x_seconds: {
                one: "\u4e0d\u5230\u4e00\u79d2",
                other: "\u4e0d\u5230 %{count} \u79d2"
            },
            over_x_years: {
                one: "\u4e00\u5e74\u591a",
                other: "%{count} \u5e74\u591a"
            },
            x_days: {
                one: "\u4e00\u5929",
                other: "%{count} \u5929"
            },
            x_minutes: {
                one: "\u4e00\u5206\u949f",
                other: "%{count} \u5206\u949f"
            },
            x_months: {
                one: "\u4e00\u4e2a\u6708",
                other: "%{count} \u4e2a\u6708"
            },
            x_seconds: {
                one: "\u4e00\u79d2",
                other: "%{count} \u79d2"
            }
        },
        prompts: {
            day: "\u65e5",
            hour: "\u65f6",
            minute: "\u5206",
            month: "\u6708",
            second: "\u79d2",
            year: "\u5e74"
        }
    }
};
var I18n = I18n || {};
I18n.translations = I18n.translations || {},
I18n.translations["zh-TW"] = {
    kalamu: {
        link_format_error: "\u50c5\u652f\u6301http, https, ftp\u93c8\u63a5\u3002",
        insert_image: "\u63d2\u5165\u5716\u7247",
        local_image: "\u672c\u5730\u4e0a\u8f09",
        or: "\u6216",
        internet_image: "\u7db2\u7d61\u5716\u7247",
        select_image: "\u9078\u64c7\u5716\u7247",
        cancel: "\u53d6\u6d88",
        image_url: "\u5716\u7247\u93c8\u63a5",
        ok: "\u78ba\u8a8d",
        processing: "\u4e0a\u8f09\u4e2d...",
        failed: "\u4e0a\u8f09\u5931\u6557\uff0c\u8acb\u91cd\u8a66\u3002",
        image_url_blank: "\u8acb\u8f38\u5165\u93c8\u63a5",
        insert_link: "\u63d2\u5165\u93c8\u63a5",
        link_url: "\u93c8\u63a5\u5730\u5740",
        link_text: "\u93c8\u63a5\u6587\u672c",
        wrong_image_file_format: "\u5716\u7247\u683c\u5f0f\u932f\u8aa4,\u8acb\u4f7f\u7528jpg/jpeg/png/gif\u6587\u4ef6\u3002",
        size_excceed_limit: "\u6587\u4ef6\u5927\u5c0f\u8d85\u904e\u9650\u5236, \u8acb\u9078\u64c75MB\u4ee5\u4e0b\u7684\u6587\u4ef6\u3002",
        image_url_blank: "\u8acb\u586b\u5beb\u5716\u7247\u5730\u5740\u3002",
        image_protocol_not_supported: "\u6211\u5011\u76ee\u524d\u4e0d\u652f\u6301\u8a72\u5354\u8b70\u3002",
        select_image: "\u9078\u64c7\u5716\u7247\u4e0a\u8f09",
        image_privacy: "\u6709\u95dc\u5716\u7247\u79c1\u5bc6\u6027\u9ede\u64ca\u554f\u865f\u77ad\u89e3\u66f4\u591a",
        upload_internal_server_error: "\u4e0a\u8f09\u5931\u6557, \u8acb\u91cd\u8a66\u3002",
        "image-uploading": "\u6b63\u5728\u4e0a\u50b3...",
        "retry-upload-image": "\u91cd\u65b0\u4e0a\u50b3"
    },
    ie_warning: {
        title: "\u60a8\u7684\u700f\u89bd\u5668\u7248\u672c\u904e\u4f4e",
        upgrade_ie: '\u8acb\u5347\u7d1a\u60a8\u7684 IE \u700f\u89bd\u5668\uff0c <a href="http://windows.microsoft.com/zh-CN/internet-explorer/downloads/ie-9/worldwide-languages">\u9ede\u6b64\u8655\u5347\u7d1a</a>\u3002',
        use_chrome: '\u6211\u5011\u63a8\u85a6\u4f7f\u7528 <a href="http://www.google.com/chrome" class="use-chrome">Google Chrome </a>\u4f86\u8a2a\u554f\u7c21\u66f8\u7372\u53d6\u6700\u4f73\u7684\u7528\u6236\u9ad4\u9a57\u3002',
        skip: "\u8df3\u904e"
    },
    reading: {
        abuse_report: {
            confirm: "\u662f\u5426\u8209\u5831\uff1f",
            report_success: "\u8209\u5831\u6210\u529f",
            no_reason: "\u8acb\u586b\u5beb\u8209\u5831\u539f\u56e0",
            report: "\u8209\u5831",
            ad: "\u5ee3\u544a\u53ca\u5783\u573e\u4fe1\u606f",
            other: "\u5176\u4ed6"
        },
        notes: {
            show: {
                like_item_tooltip: "{{nickname}} {{timeago}}\u559c\u6b61\u4e86\u9019\u7bc7\u6587\u7ae0",
                contribute_status: {
                    approved: "\uff08\u5df2\u6536\u5165\uff09",
                    pending: "\uff08\u7b49\u5f85\u4e2d\uff09"
                },
                reward: {
                    info: " \u4eba\u6253\u8cde\u4e86\u9019\u7bc7\u6587\u7ae0"
                }
            }
        },
        captcha: {
            placeholder: "\u9a57\u8b49\u78bc",
            refresh_button: "\u770b\u4e0d\u6e05\u695a\uff1f\u63db\u4e00\u5f35",
            invalid_message: "\u9a57\u8b49\u78bc{{message}}"
        },
        wordage: "{{wordage}} \u5b57",
        views_count: "{{count}} \u6b21\u95b1\u8b80",
        self_destroy_done: "\u7528\u6236\u5df2\u6210\u529f\u522a\u9664\uff0c\u73fe\u5728\u6b63\u5728\u8df3\u8f49\u56de\u9996\u9801...",
        registration_complete: "\u8a3b\u518a\u6210\u529f\uff0c\u6b63\u5728\u8df3\u8f49...",
        errors: {
            email_invalid: "\u96fb\u5b50\u4fe1\u7bb1\u683c\u5f0f\u6709\u8aa4"
        },
        btn_group: {
            add_to_collection: "\u52a0\u5165\u5c08\u984c",
            bookmark: "\u6536\u85cf\u6587\u7ae0",
            share: "\u5206\u4eab\u6587\u7ae0"
        },
        bookmark: "\u6536\u85cf\u6587\u7ae0",
        bookmarked: "\u6536\u85cf\u6210\u529f",
        unbookmarked: "\u53d6\u6d88\u6536\u85cf\u6210\u529f",
        download_changweibo_image: "\u4e0b\u8f09\u9577\u5fae\u535a\u5716\u7247",
        following: " \u6b63\u5728\u95dc\u6ce8",
        unfollow: " \u53d6\u6d88\u95dc\u6ce8",
        subscribe: " \u6dfb\u52a0\u95dc\u6ce8",
        subscribing: " \u6b63\u5728\u95dc\u6ce8",
        unsubscribe: " \u53d6\u6d88\u95dc\u6ce8",
        show_description: "\u5c55\u958b\u63cf\u8ff0",
        hidden_description: "\u6536\u8d77\u63cf\u8ff0",
        bian: " \u7de8",
        remove: "\u79fb\u9664",
        comment: {
            undismiss_button: "\u64a4\u92b7",
            dismiss_info: "\u8a55\u8ad6\u5df2\u522a\u9664",
            undismiss_info: "\u8a55\u8ad6\u5df2\u6062\u5fa9",
            delete_confirm: "\u78ba\u5b9a\u8981\u522a\u9664\u8a55\u8ad6\u9ebc?",
            delete_button: "\u522a\u9664",
            dismiss_button: "\u522a\u9664",
            reply_button: "\u56de\u8986"
        },
        reject: {
            title: "\u62d2\u7d55\u6295\u7a3f",
            description: "\u56de\u500b\u4fe1\u7d66\u6295\u7a3f\u8005\uff0c\u544a\u77e5\u60a8\u62d2\u7d55\u7684\u7406\u7531\u3002\u53ef\u4ee5\u4e0d\u586b\u3002",
            placeholder: "\u7e7c\u7e8c\u52a0\u6cb9\u4ec0\u9ebc\u7684\u2026\u2026",
            close: "\u95dc\u9589",
            submit: "\u78ba\u5b9a"
        },
        further_reading: {
            button: {
                "continue": "\u7e7c\u7e8c",
                save: "\u4fdd\u5b58",
                load: "\u78ba\u5b9a",
                cancel: "\u53d6\u6d88",
                "delete": " \u522a\u9664"
            },
            from: " \u4f86\u81ea ",
            add: "\u6dfb\u52a0",
            states: {
                "private": " \u79c1\u6709",
                "public": " \u516c\u958b",
                dismiss: " \u522a\u9664"
            },
            load_link_error: "\u51fa\u932f\u4e86\uff0c\u6211\u5011\u4e0d\u80fd\u52a0\u8f09\u9019\u689d\u93c8\u63a5\uff01",
            undo_link: "\u93c8\u63a5{{state}} \u6210\u529f\u30fb<a class='undo' data-further-reading-id='{{id}}' data-state='{{originState}}' href='javascript:void(null)'>\u64a4\u92b7</a>",
            link_text_placeholder: "\u7c98\u8cbc\u6216\u8f38\u5165\u93c8\u63a5",
            title_placeholder: "\u6a19\u984c",
            description_placeholder: "\u6dfb\u52a0\u63cf\u8ff0",
            delete_success: "\u62d3\u5c55\u95b1\u8b80\u522a\u9664\u6210\u529f"
        },
        timeline: {
            show_comments: "\u67e5\u770b\u8a55\u8ad6",
            collapse_comments: "\u6536\u8d77\u8a55\u8ad6",
            reply: "\u56de\u8986",
            "delete": "\u522a\u9664"
        },
        self_destruction_confirm: "\u8acb\u78ba\u8a8d\u60a8\u78ba\u5be6\u8981\u522a\u9664\u60a8\u7684\u5e33\u6236, \u6b64\u64cd\u4f5c\u7121\u6cd5\u6062\u5fa9!",
        delete_comment_confirm: "\u78ba\u5b9a\u8981\u522a\u9664\u8a55\u8ad6\u9ebc?",
        collections: {
            select_note: "\u8acb\u9078\u64c7\u6587\u7ae0\uff1a",
            select_note_error: "\u8acb\u9078\u64c7\u4e00\u7bc7\u6587\u7ae0\u3002",
            show: {
                subscriber_tooltip: "{{nickname}} {{timeago}}\u95dc\u6ce8\u4e86\u9019\u500b\u5c08\u984c",
                subscribers_count_tooltip: "\u67e5\u770b\u6240\u6709\u95dc\u6ce8\u7528\u6236",
                can_not_contribute: "\u8a72\u5c08\u984c\u66ab\u4e0d\u63a5\u53d7\u6295\u7a3f",
                invited: "\u5df2\u9080\u8acb",
                invite_success: "\u9080\u8acb\u6210\u529f",
                include_info_tooltip: "{{timeago}}\u6536\u5165",
                include_info_tooltip_from_editor: "\u7531 {{nickname}} {{timeago}}\u6536\u5165"
            }
        },
        social_sharing: {
            trailing_jianshushe: "- \u7c21\u66f8\u793e",
            share_to_label: {
                weibo: "\u5206\u4eab\u5230\u5fae\u535a",
                tweibo: "\u5206\u4eab\u5230\u9a30\u8a0a\u5fae\u535a",
                qzone: "\u5206\u4eab\u5230QQ\u7a7a\u9593",
                douban: "\u5206\u4eab\u5230\u8c46\u74e3",
                twitter: "\u5206\u4eab\u5230Twitter",
                facebook: "\u5206\u4eab\u5230Facebook",
                google_plus: "\u5206\u4eab\u5230Google+",
                renren: "\u5206\u4eab\u5230\u4eba\u4eba\u7db2",
                weixin: "\u5206\u4eab\u5230\u5fae\u4fe1",
                changweibo: "\u4e0b\u8f09\u9577\u5fae\u535a\u5716\u7247"
            },
            self_share_note_text: "\u6211\u5beb\u4e86\u65b0\u6587\u7ae0\u300a{{note_title}}\u300b",
            reader_share_note_text: "\u63a8\u85a6 {{user} \u7684\u6587\u7ae0\u300a{{note_title}}\u300b",
            self_share_notebook_text: "\u6211\u767c\u4f48\u4e86\u6587\u96c6\u300a{{notebook_title}}\u300b",
            reader_share_notebook_text: "\u63a8\u85a6 {{user} \u7684\u6587\u96c6\u300a{{notebook_title}}\u300b",
            share_collection_text: "\u63a8\u85a6\u5c08\u984c\u300a{{collection_title}}\u300b",
            official_account: "\uff08 \u5206\u4eab\u81ea {{account}} \uff09"
        }
    },
    note_logs: {
        list_title: "\u5171 {{count}} \u689d\u6b77\u53f2\u8a18\u9304",
        apply_this_log: "\u6062\u5fa9\u5230\u9019\u500b\u7248\u672c",
        filter: "\u7be9\u9078",
        types: {
            autosave: "\u81ea\u52d5\u4fdd\u5b58",
            publish: "\u516c\u958b\u767c\u4f48\u6587\u7ae0",
            post_updates: "\u767c\u4f48\u66f4\u65b0",
            before_restore: "\u7248\u672c\u6062\u5fa9"
        }
    },
    browser_tip: {
        title: "\u5225\u518d\u62d6\u5ef6\uff0c\u662f\u6642\u5019\u66f4\u65b0\u60a8\u7684\u700f\u89bd\u5668\u5566",
        intro: "\u7232\u4e86\u7d66\u60a8\u5e36\u4f86\u66f4\u512a\u8cea\u7684\u5728\u7dda\u5beb\u4f5c\u9ad4\u9a57\uff0c\u7c21\u66f8\u5efa\u8b70\u60a8\u4f7f\u7528\u6700\u65b0\u7248\u672c\u7684 Chrome \u700f\u89bd\u5668\u6216\u5176\u4ed6\u63a8\u85a6\u700f\u89bd\u5668\u9032\u884c\u5beb\u4f5c\u3002",
        download: "\u5b98\u65b9\u7db2\u7ad9"
    },
    new_notebook: "\u65b0\u5efa\u6587\u96c6",
    new_notebook_name: "\u65b0\u6587\u96c6\u540d",
    new_note: "\u65b0\u5efa\u6587\u7ae0",
    default_note_title: "\u7121\u6a19\u984c\u6587\u7ae0",
    delete_notebook_confirm: "\u78ba\u8a8d\u522a\u9664\u6587\u96c6\u300a{{title}}\u300b\u3002\u76f8\u95dc\u6587\u7ae0\u5c07\u6703\u4e00\u540c\u522a\u9664, \u8a72\u64cd\u4f5c\u7121\u6cd5\u64a4\u92b7\u3002",
    delete_note_confirm: "\u78ba\u8a8d\u522a\u9664\u6587\u7ae0\u300a{{title}}\u300b\u3002\u8a72\u64cd\u4f5c\u7121\u6cd5\u64a4\u92b7\u3002",
    rename_notebook: "\u4fee\u6539\u6587\u96c6\u540d",
    delete_notebook: "\u522a\u9664\u6587\u96c6",
    saving: "\u4fdd\u5b58\u4e2d...",
    saved: "\u5df2\u4fdd\u5b58",
    compiled: "\u66f4\u65b0\u5df2\u6210\u529f\u767c\u4f48",
    saved_partially: "\u6587\u7ae0\u904e\u9577, \u5c3e\u7aef\u90e8\u5206\u5167\u5bb9\u672a\u4fdd\u5b58",
    change_notebook_placeholder: "\u8acb\u9078\u64c7\u76ee\u6a19\u6587\u96c6..",
    wordage: "\u5b57\u6578: {{wordage}}",
    commerical_placeholder: "\u5c6c\u65bc\u5beb\u4f5c\u8005\u7684\u6587\u96c6, \u4e00\u500b\u7c21\u6f54\u800c\u512a\u96c5\u7684\u74b0\u5883\u8b93\u4f60\u5c08\u6ce8\u65bc\u66f8\u5beb\u3002",
    notebook_name_placeholder: "\u8acb\u8f38\u5165\u6587\u96c6\u540d...",
    nickname_format_invalid: "\u66b1\u7a31\u683c\u5f0f\u4e0d\u6b63\u78ba",
    nickname: "\u66b1\u7a31",
    spine_ajax_pending: "\u5b58\u5132\u8acb\u6c42\u5c1a\u672a\u5168\u90e8\u5b8c\u6210, \u672a\u4fdd\u5b58\u6578\u64da\u5c07\u6703\u4e1f\u5931, \u78ba\u5b9a\u8981\u96e2\u958b\u9801\u9762\u9ebc?",
    form_dirty: "\u6aa2\u6e2c\u5230\u6709\u672a\u4fdd\u5b58\u7684\u6578\u64da, \u78ba\u5b9a\u8981\u96e2\u958b\u9801\u9762\u9ebc?",
    toggle_to_markdown: "\u5207\u63db\u7de8\u8f2f\u5668\u7232\u300cMarkdown\u7de8\u8f2f\u5668\u300d",
    toggle_to_plain: "\u5207\u63db\u7de8\u8f2f\u5668\u7232\u300c\u5bcc\u6587\u5b57\u683c\u5f0f\u7de8\u8f2f\u5668\u300d",
    suggest_chrome: "\u6aa2\u6e2c\u5230\u60a8\u6b63\u5728\u4f7f\u7528 Internet Explorer, \u6211\u5011\u5efa\u8b70\u4f7f\u7528 Google Chrome \u8a2a\u554f\u300e\u7c21\u66f8\u300f\u4ee5\u7372\u5f97\u6700\u4f73\u9ad4\u9a57\u3002",
    suggest_upgrade: "\u6aa2\u6e2c\u5230\u60a8\u6b63\u5728\u4f7f\u7528 Internet Explorer 8/9, \u5728\u6b64\u60c5\u6cc1\u4e0b, \u6703\u51fa\u73fe\u6027\u80fd\u554f\u984c, \u4e26\u4e14\u6211\u5011\u7121\u6cd5\u63d0\u4f9b\u5b8c\u6574\u7684\u529f\u80fd, \u5efa\u8b70\u4f7f\u7528 Google Chrome \u8a2a\u554f\u300e\u7c21\u66f8\u300f\u4ee5\u7372\u5f97\u6700\u4f73\u9ad4\u9a57, \u6216\u662f\u5347\u7d1a\u81f3 Internet Explorer 10\u3002",
    chrome_bug: "\u6211\u5011\u767c\u73fe\u60a8\u7576\u524d\u7684\u700f\u89bd\u5668\u7248\u672c\uff0833.0.1750.152\uff09\u5b58\u5728\u5df2\u77e5\u7684bug\uff0c\u5728\u7576\u524d\u7684 Chrome \u7248\u672c\u4e0b\u60a8\u5c07\u7121\u6cd5\u5728\u5bcc\u6587\u672c\u7de8\u8f2f\u5668\u4e2d\u4e0a\u8f09\u5716\u7247/\u7de8\u8f2f\u93c8\u63a5\uff0c\u8acb\u5347\u7d1a\u81f3\u6700\u65b0\u7684Chrome\u7248\u672c\u3002",
    restore_a_locale_copy: "\u6211\u5011\u5f9e\u672c\u5730\u5b58\u5132\u4e2d\u6062\u5fa9\u4e86\u60a8\u7684\u9019\u7bc7\u6587\u7ae0, \u5982\u679c\u4ed6\u4e0d\u662f\u6700\u65b0\u7248\u60a8\u53ef\u4ee5: ",
    leaving_note_unsaved: "\u60a8\u7684\u6587\u7ae0\u5df2\u7d93\u4fee\u6539, \u4e26\u4e14\u5c1a\u672a\u4fdd\u5b58, \u662f\u5426\u4fdd\u5b58?",
    press_esc_to_leave: "\u6309 Esc\u9375 \u9000\u51fa.",
    new_note_bottom: "\u5728\u4e0b\u65b9\u65b0\u5efa\u6587\u7ae0",
    ajax_error: "\u51fa\u73fe\u932f\u8aa4, \u8acb\u5099\u4efd\u60a8\u7576\u524d\u7684\u4f5c\u54c1\u4e26\u5237\u65b0\u9801\u9762.",
    publish: "\u767c\u4f48\u6587\u7ae0",
    published: "\u5df2\u767c\u4f48",
    unpublish: "\u53d6\u6d88\u767c\u4f48",
    publish_changes: "\u767c\u4f48\u66f4\u65b0",
    publishing: "\u767c\u4f48\u4e2d...",
    toolbar: {
        writing_mode: "\u5207\u63db\u5230\u5beb\u4f5c\u6a21\u5f0f",
        preview_mode: "\u5207\u63db\u5230\u9810\u89bd\u6a21\u5f0f",
        save: "\u4fdd\u5b58",
        redo: "\u91cd\u505a",
        undo: "\u64a4\u92b7",
        bold: "\u7c97\u9ad4",
        italic: "\u659c\u9ad4",
        strikethrough: "\u522a\u9664\u7dda",
        blockquote: "\u5f15\u7528",
        heading1: "\u6a19\u984c\u4e00",
        heading2: "\u6a19\u984c\u4e8c",
        heading3: "\u6a19\u984c\u4e09",
        heading4: "\u6a19\u984c\u56db",
        headline: "\u5206\u5272\u7dda",
        insert_link: "\u63d2\u5165\u93c8\u63a5",
        insert_image: "\u63d2\u5165\u5716\u7247",
        history: "\u6b77\u53f2\u7248\u672c"
    },
    errors: {
        401 : "\u51fa\u73fe\u5b89\u5168\u9a57\u8b49\u932f\u8aa4, \u8acb\u624b\u52d5\u4fdd\u5b58\u7576\u524d\u4f5c\u54c1, \u5237\u65b0\u9801\u9762\u91cd\u8a66.",
        404 : '\u8acb\u6c42\u7684\u6587\u7ae0/\u6587\u96c6\u4e0d\u5b58\u5728, \u8acb<a href="http://www.jianshu.com/writer/#/">\u9ede\u6b64\u5237\u65b0\u9801\u9762</a>.',
        500 : "\u670d\u52d9\u5668\u932f\u8aa4, \u8acb\u624b\u52d5\u4fdd\u5b58\u7576\u524d\u4f5c\u54c1, \u5237\u65b0\u9801\u9762\u91cd\u8a66.",
        content_overflow: "\u7576\u524d\u6587\u7ae0\u5167\u5bb9\u904e\u9577, \u7bc7\u5c3e\u90e8\u5206\u5167\u5bb9\u7121\u6cd5\u4fdd\u5b58, \u8acb\u5148\u624b\u52d5\u5099\u4efd\uff0c\u7136\u5f8c\u65b0\u5efa\u6587\u7ae0\u5206\u958b\u66f8\u5beb!",
        writer_version_conflict: "\u60a8\u5df2\u5728\u5176\u4ed6\u7a97\u53e3\u4e2d\u5c0d\u672c\u6587\u9032\u884c\u4e86\u66f4\u65b0\uff0c\u4ee5\u9632\u4e1f\u5931\u4efb\u4f55\u6587\u5b57\uff0c\u8acb\u624b\u52d5\u5099\u4efd\u7576\u524d\u6539\u52d5\uff0c\u5237\u65b0\u672c\u9801\u5f8c\u7e7c\u7e8c"
    },
    warnings: {
        content_too_large: "\u7576\u524d\u6587\u7ae0\u9577\u5ea6\u6b63\u5728\u63a5\u8fd1\u7c21\u66f8\u7684\u9650\u5ea6, \u8acb\u8003\u616e\u5206\u7bc7\u66f8\u5beb\u5427"
    },
    network: {
        issue: "\u7db2\u7d61\u9023\u63a5\u901f\u5ea6\u904e\u6162, \u53ef\u80fd\u6062\u5fa9, \u53ef\u4ee5\u7e7c\u7e8c\u64cd\u4f5c.",
        down: "\u7db2\u7d61\u9023\u63a5\u9023\u7e8c\u51fa\u932f, \u8acb\u52d9\u5fc5\u5099\u4efd\u60a8\u7576\u524d\u7684\u4f5c\u54c1\u4e26\u5237\u65b0\u9801\u9762!",
        back: "\u60a8\u7684\u7db2\u7d61\u9023\u63a5\u5df2\u6062\u5fa9\u3002"
    },
    navbar: {
        homepage: "\u9996\u9801",
        collections: "\u5c08\u984c",
        top: "\u7c21\u66f8\u71b1\u9580",
        timeline: "\u7c21\u53cb\u5708",
        writer: "\u5beb\u6587\u7ae0",
        user_homepage: "\u6211\u7684\u4e3b\u9801",
        favourites: "\u6211\u559c\u6b61\u7684",
        bookmarks: "\u6211\u7684\u6536\u85cf",
        notifications: "\u63d0\u9192",
        messages: "\u7c21\u4fe1",
        view_mode: "\u986f\u793a\u6a21\u5f0f",
        settings: "\u8a2d\u5b9a",
        sign_out: "\u767b\u51fa"
    },
    note_modified: {
        mac: "\u6587\u7ae0\u5df2\u66f4\u6539, \u8acb\u6309 command + s \u4fdd\u5b58\u3002",
        nonmac: "\u6587\u7ae0\u5df2\u66f4\u6539, \u8acb\u6309 ctrl + s \u4fdd\u5b58\u3002"
    },
    note: {
        untitled: "\u7121\u6a19\u984c\u6587\u7ae0",
        collection: {
            adding: "\u52a0\u8f09\u4e2d\u2026\u2026"
        },
        dropdown: {
            share_directly: "\u76f4\u63a5\u767c\u4f48",
            move_note: "\u79fb\u52d5\u6587\u7ae0",
            shared: "\u5df2\u767c\u4f48",
            share_to: "\u5206\u4eab\u5230",
            delete_note: "\u522a\u9664\u6587\u7ae0",
            revision_history: "\u6b77\u53f2\u7248\u672c",
            share_to_sns: {
                weibo: "\u5206\u4eab\u5230\u5fae\u535a",
                douban: "\u5206\u4eab\u5230\u8c46\u74e3",
                twitter: "\u5206\u4eab\u5230Twitter",
                tweibo: "\u5206\u4eab\u5230\u9a30\u8a0a\u5fae\u535a",
                qzone: "\u5206\u4eab\u5230QQ\u7a7a\u9593",
                facebook: "\u5206\u4eab\u5230Facebook",
                google_plus: "\u5206\u4eab\u5230Google+"
            },
            open_in_new_window: "\u5728\u65b0\u7a97\u53e3\u6253\u958b",
            stop_sharing: "\u505c\u6b62\u5206\u4eab"
        },
        moving: {
            title: "\u79fb\u52d5\u6587\u7ae0\u5230"
        },
        share: {
            title: "\u76f4\u63a5\u767c\u4f48",
            help: "\u9ede\u64ca\u201c\u767c\u4f48\u201d\u6309\u9215\u5f8c\u6587\u7ae0\u5c07\u6703\u751f\u6210\u4e00\u500b\u201c\u56fa\u5b9a\u9023\u7d50\u201d\uff0c\u4ed6\u4eba\u901a\u904e\u8a72\u56fa\u5b9a\u93c8\u63a5\u5373\u53ef\u8a2a\u554f\u4f60\u7684\u6587\u7ae0\uff0c\u4f60\u4e5f\u53ef\u4ee5\u96a8\u5f8c\u5c07\u56fa\u5b9a\u9023\u7d50\u544a\u77e5\u4ed6\u4eba\u6216\u8005\u5206\u4eab\u5230\u4f60\u7684\u793e\u4ea4\u7db2\u8def\u3002",
            permanent_link: "\u56fa\u5b9a\u9023\u7d50\u5730\u5740",
            success: "\u6587\u7ae0\u767c\u4f48\u6210\u529f\uff01",
            to_sns: "\u4f60\u9084\u53ef\u4ee5\u5206\u4eab\u6587\u7ae0\u5230\u793e\u4ea4\u7db2\u8def:",
            share_note: "\u5206\u4eab\u6587\u7ae0",
            click_to_show: "\u9ede\u64ca\u6a19\u984c\u53ef\u4ee5\u8f49\u5230\u5df2\u767c\u4f48\u7684\u6587\u7ae0"
        },
        contribute: {
            hint: "\u7232\u4e86\u60a8\u7684\u6587\u7ae0\u88ab\u66f4\u591a\u4eba\u767c\u73fe\uff0c\u60a8\u53ef\u4ee5\u9078\u64c7\u6295\u7a3f\u5230\u5c0d\u61c9\u5c08\u984c",
            add_to_collection: "\u52a0\u5165\u5c08\u984c",
            contribute_to_collection: "\u6295\u7a3f",
            pending: "\u7b49\u5f85\u5be9\u8988",
            remove_from_collection: "\u5f9e\u5c08\u984c\u79fb\u9664",
            collection_info: "{{notes_count}} \u7bc7\u6587\u7ae0\uff0c{{subscribers_count}} \u4eba\u95dc\u6ce8",
            similar_collections: "\u4ee5\u4e0b\u5c08\u984c\u53ef\u80fd\u4e0e\u60a8\u7684\u6587\u7ae0\u76f8\u95dc\uff1a",
            editable_collections: "\u6211\u7de8\u8f2f\u7684\u5c08\u984c\uff1a",
            no_search_result: "\u7121\u6cd5\u627e\u5230\u76f8\u95dc\u7684\u5c08\u984c"
        },
        shareToWeibo: {
            share: "\u5206 \u4eab",
            done: "\u5e26\u9577\u5fae\u535a\u5206\u4eab",
            download: "\u4e0b\u8f09\u9577\u5fae\u535a\u5716\u7247",
            processing: "\u7372\u53d6\u9577\u5fae\u535a\u5716\u7247\u4e2d",
            processingNotice: "\u5982\u679c\u60a8\u4e0d\u9700\u8981\u5e36\u9577\u5fae\u535a\u5206\u4eab\uff0c\u53ef\u9ede\u64ca\u4e0b\u9762\u7684\u5206\u4eab\u6309\u9215\u76f4\u63a5\u5206\u4eab\uff0c\u7121\u9700\u7b49\u5f85\u3002"
        }
    },
    share: {
        text: "\u6211\u5beb\u4e86\u65b0\u6587\u7ae0\u300a{{note_title}}\u300b",
        official_account: "\uff08 \u5206\u4eab\u81ea @{{official_account}} \uff09",
        trailing_jianshushe: "- \u7c21\u66f8\u793e"
    },
    button: {
        submitting: "\u6b63\u5728\u63d0\u4ea4...",
        submit_failed: "\u767c\u9001\u5931\u6557",
        submit: "\u63d0\u4ea4",
        cancel: "\u53d6\u6d88",
        close: "\u95dc\u9589",
        publish: "\u767c\u4f48",
        ok: "\u78ba\u8a8d",
        undo: "\u64a4\u92b7",
        upload_image_notice: "\u5c07\u5716\u7247\u6587\u4ef6\u76f4\u63a5\u62d6\u52d5\u5230\u7de8\u8f2f\u5340\u57df\u5373\u53ef\u4e0a\u8f09",
        upload_image_paste_notice: "\u6216\u8005\u4e5f\u53ef\u4ee5\u5c07\u526a\u8cbc\u677f\u88cf\u7684\u5716\u7247\u76f4\u63a5\u7c98\u8cbc\u9032\u7de8\u8f2f\u5340\u57df"
    },
    "jquery-timeago": {
        prefixAgo: null,
        prefixFromNow: "\u5f9e\u73fe\u5728\u958b\u59cb",
        suffixAgo: "\u4e4b\u524d",
        suffixFromNow: null,
        seconds: "\u4e0d\u52301\u5206\u9418",
        minute: "\u5927\u7d041\u5206\u9418",
        minutes: "%d\u5206\u9418",
        hour: "\u5927\u7d041\u5c0f\u6642",
        hours: "%d\u5c0f\u6642",
        day: "\u5927\u7d041\u5929",
        days: "%d\u5929",
        month: "\u5927\u7d041\u500b\u6708",
        months: "%d\u500b\u6708",
        year: "\u5927\u7d041\u5e74",
        years: "%d\u5e74",
        numbers: [],
        wordSeparator: ""
    },
    date: {
        abbr_day_names: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
        abbr_month_names: [null, "1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
        day_names: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
        formats: {
            "default": "%Y-%m-%d",
            "long": "%Y\u5e74%b%d\u65e5",
            "short": "%b%d\u65e5"
        },
        month_names: [null, "\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
        order: ["year", "month", "day"]
    },
    datetime: {
        distance_in_words: {
            about_x_hours: {
                one: "\u5927\u7ea6\u4e00\u5c0f\u65f6",
                other: "\u5927\u7ea6 %{count} \u5c0f\u65f6"
            },
            about_x_months: {
                one: "\u5927\u7ea6\u4e00\u4e2a\u6708",
                other: "\u5927\u7ea6 %{count} \u4e2a\u6708"
            },
            about_x_years: {
                one: "\u5927\u7ea6\u4e00\u5e74",
                other: "\u5927\u7ea6 %{count} \u5e74"
            },
            almost_x_years: {
                one: "\u63a5\u8fd1\u4e00\u5e74",
                other: "\u63a5\u8fd1 %{count} \u5e74"
            },
            half_a_minute: "\u534a\u5206\u949f",
            less_than_x_minutes: {
                one: "\u4e0d\u5230\u4e00\u5206\u949f",
                other: "\u4e0d\u5230 %{count} \u5206\u949f"
            },
            less_than_x_seconds: {
                one: "\u4e0d\u5230\u4e00\u79d2",
                other: "\u4e0d\u5230 %{count} \u79d2"
            },
            over_x_years: {
                one: "\u4e00\u5e74\u591a",
                other: "%{count} \u5e74\u591a"
            },
            x_days: {
                one: "\u4e00\u5929",
                other: "%{count} \u5929"
            },
            x_minutes: {
                one: "\u4e00\u5206\u949f",
                other: "%{count} \u5206\u949f"
            },
            x_months: {
                one: "\u4e00\u4e2a\u6708",
                other: "%{count} \u4e2a\u6708"
            },
            x_seconds: {
                one: "\u4e00\u79d2",
                other: "%{count} \u79d2"
            }
        },
        prompts: {
            day: "\u65e5",
            hour: "\u65f6",
            minute: "\u5206",
            month: "\u6708",
            second: "\u79d2",
            year: "\u5e74"
        }
    }
},
!
function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t),
        this.options = e.extend({},
        e.fn.button.defaults, n)
    };
    t.prototype.setState = function(e) {
        var t = "disabled",
        n = this.$element,
        i = n.data(),
        o = n.is("input") ? "val": "html";
        e += "Text",
        i.resetText || n.data("resetText", n[o]()),
        n[o](i[e] || this.options[e]),
        setTimeout(function() {
            "loadingText" == e ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        },
        0)
    },
    t.prototype.toggle = function() {
        var e = this.$element.closest('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"),
        this.$element.toggleClass("active")
    };
    var n = e.fn.button;
    e.fn.button = function(n) {
        return this.each(function() {
            var i = e(this),
            o = i.data("button"),
            r = "object" == typeof n && n;
            o || i.data("button", o = new t(this, r)),
            "toggle" == n ? o.toggle() : n && o.setState(n)
        })
    },
    e.fn.button.defaults = {
        loadingText: "loading..."
    },
    e.fn.button.Constructor = t,
    e.fn.button.noConflict = function() {
        return e.fn.button = n,
        this
    },
    e(document).on("click.button.data-api", "[data-toggle^=button]",
    function(t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")),
        n.button("toggle")
    })
} (window.jQuery),
!
function(e) {
    "use strict";
    function t() {
        e(".dropdown-backdrop").remove(),
        e(i).each(function() {
            n(e(this)).removeClass("open")
        })
    }
    function n(t) {
        var n, i = t.attr("data-target");
        return i || (i = t.attr("href"), i = i && /#/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")),
        n = i && e(i),
        n && n.length || (n = t.parent()),
        n
    }
    var i = "[data-toggle=dropdown]",
    o = function(t) {
        var n = e(t).on("click.dropdown.data-api", this.toggle);
        e("html").on("click.dropdown.data-api",
        function() {
            n.parent().removeClass("open")
        })
    };
    o.prototype = {
        constructor: o,
        toggle: function() {
            var i, o, r = e(this);
            if (!r.is(".disabled, :disabled")) return i = n(r),
            o = i.hasClass("open"),
            t(),
            o || ("ontouchstart" in document.documentElement && e('<div class="dropdown-backdrop"/>').insertBefore(e(this)).on("click", t), i.toggleClass("open")),
            r.focus(),
            !1
        },
        keydown: function(t) {
            var o, r, s, a, l;
            if (/(38|40|27)/.test(t.keyCode) && (o = e(this), t.preventDefault(), t.stopPropagation(), !o.is(".disabled, :disabled"))) {
                if (s = n(o), a = s.hasClass("open"), !a || a && 27 == t.keyCode) return 27 == t.which && s.find(i).focus(),
                o.click();
                r = e("[role=menu] li:not(.divider):visible a", s),
                r.length && (l = r.index(r.filter(":focus")), 38 == t.keyCode && l > 0 && l--, 40 == t.keyCode && l < r.length - 1 && l++, ~l || (l = 0), r.eq(l).focus())
            }
        }
    };
    var r = e.fn.dropdown;
    e.fn.dropdown = function(t) {
        return this.each(function() {
            var n = e(this),
            i = n.data("dropdown");
            i || n.data("dropdown", i = new o(this)),
            "string" == typeof t && i[t].call(n)
        })
    },
    e.fn.dropdown.Constructor = o,
    e.fn.dropdown.noConflict = function() {
        return e.fn.dropdown = r,
        this
    },
    e(document).on("click.dropdown.data-api", t).on("click.dropdown.data-api", ".dropdown form",
    function(e) {
        e.stopPropagation()
    }).on("click.dropdown.data-api", i, o.prototype.toggle).on("keydown.dropdown.data-api", i + ", [role=menu]", o.prototype.keydown)
} (window.jQuery),
!
function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t,
        init: function(t, n, i) {
            var o, r, s, a, l;
            for (this.type = t, this.$element = e(n), this.options = this.getOptions(i), this.enabled = !0, s = this.options.trigger.split(" "), l = s.length; l--;) a = s[l],
            "click" == a ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : "manual" != a && (o = "hover" == a ? "mouseenter": "focus", r = "hover" == a ? "mouseleave": "blur", this.$element.on(o + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(r + "." + this.type, this.options.selector, e.proxy(this.leave, this)));
            this.options.selector ? this._options = e.extend({},
            this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function(t) {
            return t = e.extend({},
            e.fn[this.type].defaults, this.$element.data(), t),
            t.delay && "number" == typeof t.delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }),
            t
        },
        enter: function(t) {
            var n, i = e.fn[this.type].defaults,
            o = {};
            return this._options && e.each(this._options,
            function(e, t) {
                i[e] != t && (o[e] = t)
            },
            this),
            n = e(t.currentTarget)[this.type](o).data(this.type),
            n.options.delay && n.options.delay.show ? (clearTimeout(this.timeout), n.hoverState = "in", void(this.timeout = setTimeout(function() {
                "in" == n.hoverState && n.show()
            },
            n.options.delay.show))) : n.show()
        },
        leave: function(t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout),
            n.options.delay && n.options.delay.hide ? (n.hoverState = "out", void(this.timeout = setTimeout(function() {
                "out" == n.hoverState && n.hide()
            },
            n.options.delay.hide))) : n.hide()
        },
        show: function() {
            var t, n, i, o, r, s, a = e.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(a), a.isDefaultPrevented()) return;
                switch (t = this.tip(), this.setContent(), this.options.animation && t.addClass("fade"), r = "function" == typeof this.options.placement ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, t.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? t.appendTo(this.options.container) : t.insertAfter(this.$element), n = this.getPosition(), i = t[0].offsetWidth, o = t[0].offsetHeight, r) {
                case "bottom":
                    s = {
                        top: n.top + n.height,
                        left: n.left + n.width / 2 - i / 2
                    };
                    break;
                case "top":
                    s = {
                        top: n.top - o,
                        left: n.left + n.width / 2 - i / 2
                    };
                    break;
                case "left":
                    s = {
                        top: n.top + n.height / 2 - o / 2,
                        left: n.left - i
                    };
                    break;
                case "right":
                    s = {
                        top: n.top + n.height / 2 - o / 2,
                        left: n.left + n.width
                    }
                }
                this.applyPlacement(s, r),
                this.$element.trigger("shown")
            }
        },
        applyPlacement: function(e, t) {
            var n, i, o, r, s = this.tip(),
            a = s[0].offsetWidth,
            l = s[0].offsetHeight;
            s.offset(e).addClass(t).addClass("in"),
            n = s[0].offsetWidth,
            i = s[0].offsetHeight,
            "top" == t && i != l && (e.top = e.top + l - i, r = !0),
            "bottom" == t || "top" == t ? (o = 0, e.left < 0 && (o = -2 * e.left, e.left = 0, s.offset(e), n = s[0].offsetWidth, i = s[0].offsetHeight), this.replaceArrow(o - a + n, n, "left")) : this.replaceArrow(i - l, i, "top"),
            r && s.offset(e)
        },
        replaceArrow: function(e, t, n) {
            this.arrow().css(n, e ? 50 * (1 - e / t) + "%": "")
        },
        setContent: function() {
            var e = this.tip(),
            t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html": "text"](t),
            e.removeClass("fade in top bottom left right")
        },
        hide: function() {
            function t() {
                var t = setTimeout(function() {
                    n.off(e.support.transition.end).detach()
                },
                500);
                n.one(e.support.transition.end,
                function() {
                    clearTimeout(t),
                    n.detach()
                })
            }
            var n = this.tip(),
            i = e.Event("hide");
            return this.$element.trigger(i),
            i.isDefaultPrevented() ? void 0 : (n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? t() : n.detach(), this.$element.trigger("hidden"), this)
        },
        fixTitle: function() {
            var e = this.$element; (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
        },
        hasContent: function() {
            return this.getTitle()
        },
        getPosition: function() {
            var t = this.$element[0];
            return e.extend({},
            "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : {
                width: t.offsetWidth,
                height: t.offsetHeight
            },
            this.$element.offset())
        },
        getTitle: function() {
            var e, t = this.$element,
            n = this.options;
            return e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
        },
        tip: function() {
            return this.$tip = this.$tip || e(this.options.template)
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
        toggle: function(t) {
            var n = t ? e(t.currentTarget)[this.type](this._options).data(this.type) : this;
            n.tip().hasClass("in") ? n.hide() : n.show()
        },
        destroy: function() {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var n = e.fn.tooltip;
    e.fn.tooltip = function(n) {
        return this.each(function() {
            var i = e(this),
            o = i.data("tooltip"),
            r = "object" == typeof n && n;
            o || i.data("tooltip", o = new t(this, r)),
            "string" == typeof n && o[n]()
        })
    },
    e.fn.tooltip.Constructor = t,
    e.fn.tooltip.defaults = {
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
    e.fn.tooltip.noConflict = function() {
        return e.fn.tooltip = n,
        this
    }
} (window.jQuery),
function() {
    window.Maleskine = {}
}.call(this),
function() {
    Maleskine.CommonImages = {
        host: "http://baijii-common.b0.upaiyun.com",
        social_icon: function(e, t, n) {
            return "" + Maleskine.CommonImages.host + "/social_icons/" + t + "x" + n + "/" + e + ".png"
        },
        loader: function(e) {
            return "" + Maleskine.CommonImages.host + "/loaders/" + e + ".gif"
        }
    }
}.call(this),
function() {
    Maleskine.Settings = {
        emoji_host: "http://assets.jianshu.io",
        asset_host: "http://static.jianshu.io",
        faye_url: "http://faye.jianshu.io:28888/pubsub",
        weibo: {
            appKey: "1881139527"
        },
        douban: {
            appKey: "07b4f47aa74e2448171edd6ff5ea6cd8"
        },
        uploadImageSizeLimit: "10000000",
        official_weibo: {
            weibo: "\u7b80\u4e66",
            tweibo: "jianshuio",
            twitter: "jianshucom"
        },
        mention_official_account: function(e) {
            var t;
            return (t = Maleskine.Settings.official_weibo[e]) ? I18n.t("share.official_account", {
                official_account: t
            }) : ""
        }
    }
}.call(this),
function() {
    Maleskine.BrowserDetector = {
        isMac: function() {
            return $("body").hasClass("mac")
        },
        isWin: function() {
            return $("body").hasClass("mac")
        },
        isIE8: function() {
            return $("html").hasClass("ie8") || $("body").hasClass("ie8")
        },
        isIE9: function() {
            return $("html").hasClass("ie9") || $("body").hasClass("ie9")
        },
        isNotIE8NorIE9: function() {
            return ! Maleskine.BrowserDetector.isIE8() && !Maleskine.BrowserDetector.isIE9()
        },
        isIE10: function() {
            return $("body").hasClass("ie10")
        },
        isMozilla: function() {
            return $("body").hasClass("mozilla")
        },
        isIE11: function() {
            return $("body").hasClass("ie11")
        },
        isIE: function() {
            return $("body").hasClass("ie")
        },
        lessThanIE8: function() {
            return $("html").hasClass("lt-ie8")
        },
        isMobile: function() {
            return null != Modernizr.touch && Modernizr.touch
        },
        canPasteImage: function() {
            return window.navigator.userAgent.toLowerCase().indexOf("chrome") > 0 || window.navigator.userAgent.toLowerCase().indexOf("chromium")
        },
        canUseSelection: function() {
            var e;
            return Maleskine.BrowserDetector.__privates = Maleskine.BrowserDetector.__privates || {},
            Maleskine.BrowserDetector.__privates.can_use_selection !== !0 && Maleskine.BrowserDetector.__privates !== !1 && (e = $("textarea"), Maleskine.BrowserDetector.__privates.can_use_selection = !isNaN(e[0].selectionStart)),
            Maleskine.BrowserDetector.__privates.can_use_selection
        },
        canScrollManually: function() {
            return Maleskine.BrowserDetector.__privates = Maleskine.BrowserDetector.__privates || {},
            Maleskine.BrowserDetector.__privates.can_scroll_manually !== !0 && Maleskine.BrowserDetector.__privates !== !1 && (Maleskine.BrowserDetector.__privates.can_scroll_manually = !isNaN(window.scrollY) && !!window.scrollTo),
            Maleskine.BrowserDetector.__privates.can_scroll_manually
        }
    }
}.call(this),
function() { !
    function(e) {
        return e.fn.padding = function(e) {
            return parseInt(this.css("padding-" + e), 10)
        },
        e.fn.cssHeight = function() {
            return parseInt(this.css("height"), 10)
        },
        e.fn.cssWidth = function() {
            return parseInt(this.css("width"), 10)
        }
    } (jQuery)
}.call(this),
function() {
    Maleskine.Utils = {
        setCookie: function(e, t) {
            var n, i;
            return n = new Date,
            i = n.getTime(),
            i += 31536e9,
            n.setTime(i),
            document.cookie = "" + e + "=" + t + "; expires=" + n.toGMTString() + "; path=/"
        },
        toTitleCase: function(e) {
            return e.replace(/\w\S*/g,
            function(e) {
                return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
            })
        },
        fromClassNameToClassName: function(e) {
            return null != e ? (e = e.replace(/\-/g, " "), e = Maleskine.Utils.toTitleCase(e), e.replace(/\s/g, "")) : void 0
        },
        removeHtmlTags: function() {
            return function(e) {
                var t;
                return t = /<\/?(a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|data|datagrid|datalist|dd|del|details|dfn|div|dl|dt|em|embed|eventsource|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|font|keygen|label|legend|li|link|mark|map|menu|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|ruby|rp|rt|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr).*?\/?>/gim,
                e.replace(t, "")
            }
        } (this),
        findNodeWithTags: function(e, t) {
            var n;
            for ($.isArray(t) || (t = [t]); e;) {
                if (3 !== e.nodeType && (n = t.indexOf(e.tagName), -1 !== n)) return e;
                e = e.parentNode
            }
            return null
        },
        secureRandom: function(e) {
            var t, n, i;
            for (null == e && (e = 5), i = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = 0; e > t;) i += n.charAt(Math.floor(Math.random() * n.length)),
            t++;
            return i
        },
        setDay: function() {
            return function() {
                return $("body").removeClass("reader-night-mode").addClass("reader-day-mode"),
                Maleskine.Utils.setCookie("read_mode", "day"),
                $.ajax({
                    url: Routes.preferences_path(),
                    type: "PUT",
                    data: {
                        read_mode: "day"
                    }
                })
            }
        } (this),
        setNight: function() {
            return $("body").removeClass("reader-day-mode").addClass("reader-night-mode"),
            Maleskine.Utils.setCookie("read_mode", "night"),
            $.ajax({
                url: Routes.preferences_path(),
                type: "PUT",
                data: {
                    read_mode: "night"
                }
            })
        },
        setFont1: function() {
            return $("body").removeClass("reader-font2").addClass("reader-font1"),
            Maleskine.Utils.setCookie("default_font", "font1"),
            $.ajax({
                url: Routes.preferences_path(),
                type: "PUT",
                data: {
                    default_font: "font1"
                }
            })
        },
        setFont2: function() {
            return $("body").removeClass("reader-font1").addClass("reader-font2"),
            Maleskine.Utils.setCookie("default_font", "font2"),
            $.ajax({
                url: Routes.preferences_path(),
                type: "PUT",
                data: {
                    default_font: "font2"
                }
            })
        },
        format_number_short: function(e) {
            var t;
            return t = e - 0,
            t >= 1e3 ? "" + Math.floor(t / 1e3) + "." + Math.floor(t % 1e3 / 100) + "K": t + ""
        },
        initLaddaButton: function(e) {
            var t, n, i, o, r, s;
            for (r = $(e).find("button.ladda-button[data-remote]"), s = [], i = 0, o = r.length; o > i; i++) n = r[i],
            t = Ladda.create(n),
            $(n).on("ajax:beforeSend",
            function() {
                return function() {
                    return t.start()
                }
            } (this)),
            s.push($(n).on("ajax:complete",
            function() {
                return function() {
                    return t.stop()
                }
            } (this)));
            return s
        },
        initModule: function(e) {
            var t, n, i;
            return t = $(e),
            i = Maleskine.Utils.fromClassNameToClassName(t.data("js-module")),
            i.length > 0 ? n = "function" == typeof Maleskine[i] ? new Maleskine[i]({
                el: t
            }) : void 0 : void 0
        },
        initModulesInElement: function(e) {
            var t;
            return t = $(e),
            t.length > 0 ? t.find("[data-js-module]").each(function(e, t) {
                return Maleskine.Utils.initModule(t)
            }) : void 0
        },
        initFollowButtonEvents: function(e) {
            return e.on("ajax:success", ".follow a",
            function(e, t) {
                var n;
                return n = $(e.currentTarget),
                n.parent().removeClass("btn-success").addClass("following"),
                n.html("<i class='fa fa-check'></i><span>" + I18n.t("reading.subscribing") + "</span>"),
                n.data("collection-id") && n.attr("href", Routes.unsubscribe_collection_path(n.data("collection-id"))),
                n.siblings("span").text(t.subscribers_count),
                n.parent().next("[data-toggle=dropdown]").removeClass("btn-success"),
                Maleskine.AuthorCard.clearCachedCard(n.data("user-slug"))
            }),
            e.on("ajax:success", ".following a",
            function(e, t) {
                var n;
                return n = $(e.currentTarget),
                n.parent().removeClass("following").addClass("btn-success"),
                n.html("<i class='fa fa-plus'></i><span>" + I18n.t("reading.subscribe") + "</span>"),
                n.data("collection-id") && n.attr("href", Routes.subscribe_collection_path(n.data("collection-id"))),
                n.siblings("span").text(t.subscribers_count),
                n.parent().next("[data-toggle=dropdown]").addClass("btn-success"),
                Maleskine.AuthorCard.clearCachedCard(n.data("user-slug"))
            })
        }
    }
}.call(this);