function Base64() {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    this.encode = function(t) {
        var e, n, a, i, r, o, s, u = "",
        c = 0;
        for (t = _utf8_encode(t); t.length > c;) e = t.charCodeAt(c++),
        n = t.charCodeAt(c++),
        a = t.charCodeAt(c++),
        i = e >> 2,
        r = (3 & e) << 4 | n >> 4,
        o = (15 & n) << 2 | a >> 6,
        s = 63 & a,
        isNaN(n) ? o = s = 64 : isNaN(a) && (s = 64),
        u = u + _keyStr.charAt(i) + _keyStr.charAt(r) + _keyStr.charAt(o) + _keyStr.charAt(s);
        return u
    },
    this.decode = function(t) {
        var e, n, a, i, r, o, s, u = "",
        c = 0;
        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); t.length > c;) i = _keyStr.indexOf(t.charAt(c++)),
        r = _keyStr.indexOf(t.charAt(c++)),
        o = _keyStr.indexOf(t.charAt(c++)),
        s = _keyStr.indexOf(t.charAt(c++)),
        e = i << 2 | r >> 4,
        n = (15 & r) << 4 | o >> 2,
        a = (3 & o) << 6 | s,
        u += String.fromCharCode(e),
        64 != o && (u += String.fromCharCode(n)),
        64 != s && (u += String.fromCharCode(a));
        return u = _utf8_decode(u)
    },
    _utf8_encode = function(t) {
        t = t.replace(/\r\n/g, "\n");
        for (var e = "",
        n = 0; t.length > n; n++) {
            var a = t.charCodeAt(n);
            128 > a ? e += String.fromCharCode(a) : a > 127 && 2048 > a ? (e += String.fromCharCode(192 | a >> 6), e += String.fromCharCode(128 | 63 & a)) : (e += String.fromCharCode(224 | a >> 12), e += String.fromCharCode(128 | 63 & a >> 6), e += String.fromCharCode(128 | 63 & a))
        }
        return e
    },
    _utf8_decode = function(t) {
        for (var e = "",
        n = 0,
        a = c1 = c2 = 0; t.length > n;) a = t.charCodeAt(n),
        128 > a ? (e += String.fromCharCode(a), n++) : a > 191 && 224 > a ? (c2 = t.charCodeAt(n + 1), e += String.fromCharCode((31 & a) << 6 | 63 & c2), n += 2) : (c2 = t.charCodeAt(n + 1), c3 = t.charCodeAt(n + 2), e += String.fromCharCode((15 & a) << 12 | (63 & c2) << 6 | 63 & c3), n += 3);
        return e
    }
}
var Zepto = function() {
    function t(t) {
        return null == t ? t + "": Z[X.call(t)] || "object"
    }
    function e(e) {
        return "function" == t(e)
    }
    function n(t) {
        return null != t && t == t.window
    }
    function a(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE
    }
    function i(e) {
        return "object" == t(e)
    }
    function r(t) {
        return i(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
    }
    function o(t) {
        return "number" == typeof t.length
    }
    function s(t) {
        return T.call(t,
        function(t) {
            return null != t
        })
    }
    function u(t) {
        return t.length > 0 ? b.fn.concat.apply([], t) : t
    }
    function c(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }
    function l(t) {
        return t in M ? M[t] : M[t] = RegExp("(^|\\s)" + t + "(\\s|$)")
    }
    function d(t, e) {
        return "number" != typeof e || O[c(t)] ? e: e + "px"
    }
    function f(t) {
        var e, n;
        return N[t] || (e = _.createElement(t), _.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), N[t] = n),
        N[t]
    }
    function h(t) {
        return "children" in t ? I.call(t.children) : b.map(t.childNodes,
        function(t) {
            return 1 == t.nodeType ? t: P
        })
    }
    function m(t, e, n) {
        for (C in e) n && (r(e[C]) || J(e[C])) ? (r(e[C]) && !r(t[C]) && (t[C] = {}), J(e[C]) && !J(t[C]) && (t[C] = []), m(t[C], e[C], n)) : e[C] !== P && (t[C] = e[C])
    }
    function p(t, e) {
        return null == e ? b(t) : b(t).filter(e)
    }
    function g(t, n, a, i) {
        return e(n) ? n.call(t, a, i) : n
    }
    function v(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
    }
    function y(t, e) {
        var n = t.className || "",
        a = n && n.baseVal !== P;
        return e === P ? a ? n.baseVal: n: (a ? n.baseVal = e: t.className = e, P)
    }
    function x(t) {
        try {
            return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null: +t + "" == t ? +t: /^[\[\{]/.test(t) ? b.parseJSON(t) : t) : t
        } catch(e) {
            return t
        }
    }
    function w(t, e) {
        e(t);
        for (var n = 0,
        a = t.childNodes.length; a > n; n++) w(t.childNodes[n], e)
    }
    var P, C, b, S, A, $, E = [],
    I = E.slice,
    T = E.filter,
    _ = window.document,
    N = {},
    M = {},
    O = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    },
    L = /^\s*<(\w+|!)[^>]*>/,
    R = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    k = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    D = /^(?:body|html)$/i,
    j = /([A-Z])/g,
    z = ["val", "css", "html", "text", "data", "width", "height", "offset"],
    W = ["after", "prepend", "before", "append"],
    F = _.createElement("table"),
    U = _.createElement("tr"),
    B = {
        tr: _.createElement("tbody"),
        tbody: F,
        thead: F,
        tfoot: F,
        td: U,
        th: U,
        "*": _.createElement("div")
    },
    q = /complete|loaded|interactive/,
    H = /^[\w-]*$/,
    Z = {},
    X = Z.toString,
    G = {},
    Y = _.createElement("div"),
    V = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    },
    J = Array.isArray ||
    function(t) {
        return t instanceof Array
    };
    return G.matches = function(t, e) {
        if (!e || !t || 1 !== t.nodeType) return ! 1;
        var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (n) return n.call(t, e);
        var a, i = t.parentNode,
        r = !i;
        return r && (i = Y).appendChild(t),
        a = ~G.qsa(i, e).indexOf(t),
        r && Y.removeChild(t),
        a
    },
    A = function(t) {
        return t.replace(/-+(.)?/g,
        function(t, e) {
            return e ? e.toUpperCase() : ""
        })
    },
    $ = function(t) {
        return T.call(t,
        function(e, n) {
            return t.indexOf(e) == n
        })
    },
    G.fragment = function(t, e, n) {
        var a, i, o;
        return R.test(t) && (a = b(_.createElement(RegExp.$1))),
        a || (t.replace && (t = t.replace(k, "<$1></$2>")), e === P && (e = L.test(t) && RegExp.$1), e in B || (e = "*"), o = B[e], o.innerHTML = "" + t, a = b.each(I.call(o.childNodes),
        function() {
            o.removeChild(this)
        })),
        r(n) && (i = b(a), b.each(n,
        function(t, e) {
            z.indexOf(t) > -1 ? i[t](e) : i.attr(t, e)
        })),
        a
    },
    G.Z = function(t, e) {
        return t = t || [],
        t.__proto__ = b.fn,
        t.selector = e || "",
        t
    },
    G.isZ = function(t) {
        return t instanceof G.Z
    },
    G.init = function(t, n) {
        var a;
        if (!t) return G.Z();
        if ("string" == typeof t) if (t = t.trim(), "<" == t[0] && L.test(t)) a = G.fragment(t, RegExp.$1, n),
        t = null;
        else {
            if (n !== P) return b(n).find(t);
            a = G.qsa(_, t)
        } else {
            if (e(t)) return b(_).ready(t);
            if (G.isZ(t)) return t;
            if (J(t)) a = s(t);
            else if (i(t)) a = [t],
            t = null;
            else if (L.test(t)) a = G.fragment(t.trim(), RegExp.$1, n),
            t = null;
            else {
                if (n !== P) return b(n).find(t);
                a = G.qsa(_, t)
            }
        }
        return G.Z(a, t)
    },
    b = function(t, e) {
        return G.init(t, e)
    },
    b.extend = function(t) {
        var e, n = I.call(arguments, 1);
        return "boolean" == typeof t && (e = t, t = n.shift()),
        n.forEach(function(n) {
            m(t, n, e)
        }),
        t
    },
    G.qsa = function(t, e) {
        var n, i = "#" == e[0],
        r = !i && "." == e[0],
        o = i || r ? e.slice(1) : e,
        s = H.test(o);
        return a(t) && s && i ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : I.call(s && !i ? r ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
    },
    b.contains = _.documentElement.contains ?
    function(t, e) {
        return t !== e && t.contains(e)
    }: function(t, e) {
        for (; e && (e = e.parentNode);) if (e === t) return ! 0;
        return ! 1
    },
    b.type = t,
    b.isFunction = e,
    b.isWindow = n,
    b.isArray = J,
    b.isPlainObject = r,
    b.isEmptyObject = function(t) {
        var e;
        for (e in t) return ! 1;
        return ! 0
    },
    b.inArray = function(t, e, n) {
        return E.indexOf.call(e, t, n)
    },
    b.camelCase = A,
    b.trim = function(t) {
        return null == t ? "": String.prototype.trim.call(t)
    },
    b.uuid = 0,
    b.support = {},
    b.expr = {},
    b.map = function(t, e) {
        var n, a, i, r = [];
        if (o(t)) for (a = 0; t.length > a; a++) n = e(t[a], a),
        null != n && r.push(n);
        else for (i in t) n = e(t[i], i),
        null != n && r.push(n);
        return u(r)
    },
    b.each = function(t, e) {
        var n, a;
        if (o(t)) {
            for (n = 0; t.length > n; n++) if (e.call(t[n], n, t[n]) === !1) return t
        } else for (a in t) if (e.call(t[a], a, t[a]) === !1) return t;
        return t
    },
    b.grep = function(t, e) {
        return T.call(t, e)
    },
    window.JSON && (b.parseJSON = JSON.parse),
    b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
    function(t, e) {
        Z["[object " + e + "]"] = e.toLowerCase()
    }),
    b.fn = {
        forEach: E.forEach,
        reduce: E.reduce,
        push: E.push,
        sort: E.sort,
        indexOf: E.indexOf,
        concat: E.concat,
        map: function(t) {
            return b(b.map(this,
            function(e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function() {
            return b(I.apply(this, arguments))
        },
        ready: function(t) {
            return q.test(_.readyState) && _.body ? t(b) : _.addEventListener("DOMContentLoaded",
            function() {
                t(b)
            },
            !1),
            this
        },
        get: function(t) {
            return t === P ? I.call(this) : this[t >= 0 ? t: t + this.length]
        },
        toArray: function() {
            return this.get()
        },
        size: function() {
            return this.length
        },
        remove: function() {
            return this.each(function() {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function(t) {
            return E.every.call(this,
            function(e, n) {
                return t.call(e, n, e) !== !1
            }),
            this
        },
        filter: function(t) {
            return e(t) ? this.not(this.not(t)) : b(T.call(this,
            function(e) {
                return G.matches(e, t)
            }))
        },
        add: function(t, e) {
            return b($(this.concat(b(t, e))))
        },
        is: function(t) {
            return this.length > 0 && G.matches(this[0], t)
        },
        not: function(t) {
            var n = [];
            if (e(t) && t.call !== P) this.each(function(e) {
                t.call(this, e) || n.push(this)
            });
            else {
                var a = "string" == typeof t ? this.filter(t) : o(t) && e(t.item) ? I.call(t) : b(t);
                this.forEach(function(t) {
                    0 > a.indexOf(t) && n.push(t)
                })
            }
            return b(n)
        },
        has: function(t) {
            return this.filter(function() {
                return i(t) ? b.contains(this, t) : b(this).find(t).size()
            })
        },
        eq: function(t) {
            return - 1 === t ? this.slice(t) : this.slice(t, +t + 1)
        },
        first: function() {
            var t = this[0];
            return t && !i(t) ? t: b(t)
        },
        last: function() {
            var t = this[this.length - 1];
            return t && !i(t) ? t: b(t)
        },
        find: function(t) {
            var e, n = this;
            return e = t ? "object" == typeof t ? b(t).filter(function() {
                var t = this;
                return E.some.call(n,
                function(e) {
                    return b.contains(e, t)
                })
            }) : 1 == this.length ? b(G.qsa(this[0], t)) : this.map(function() {
                return G.qsa(this, t)
            }) : b()
        },
        closest: function(t, e) {
            var n = this[0],
            i = !1;
            for ("object" == typeof t && (i = b(t)); n && !(i ? i.indexOf(n) >= 0 : G.matches(n, t));) n = n !== e && !a(n) && n.parentNode;
            return b(n)
        },
        parents: function(t) {
            for (var e = [], n = this; n.length > 0;) n = b.map(n,
            function(t) {
                return (t = t.parentNode) && !a(t) && 0 > e.indexOf(t) ? (e.push(t), t) : P
            });
            return p(e, t)
        },
        parent: function(t) {
            return p($(this.pluck("parentNode")), t)
        },
        children: function(t) {
            return p(this.map(function() {
                return h(this)
            }), t)
        },
        contents: function() {
            return this.map(function() {
                return I.call(this.childNodes)
            })
        },
        siblings: function(t) {
            return p(this.map(function(t, e) {
                return T.call(h(e.parentNode),
                function(t) {
                    return t !== e
                })
            }), t)
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = ""
            })
        },
        pluck: function(t) {
            return b.map(this,
            function(e) {
                return e[t]
            })
        },
        show: function() {
            return this.each(function() {
                "none" == this.style.display && (this.style.display = ""),
                "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = f(this.nodeName))
            })
        },
        replaceWith: function(t) {
            return this.before(t).remove()
        },
        wrap: function(t) {
            var n = e(t);
            if (this[0] && !n) var a = b(t).get(0),
            i = a.parentNode || this.length > 1;
            return this.each(function(e) {
                b(this).wrapAll(n ? t.call(this, e) : i ? a.cloneNode(!0) : a)
            })
        },
        wrapAll: function(t) {
            if (this[0]) {
                b(this[0]).before(t = b(t));
                for (var e; (e = t.children()).length;) t = e.first();
                b(t).append(this)
            }
            return this
        },
        wrapInner: function(t) {
            var n = e(t);
            return this.each(function(e) {
                var a = b(this),
                i = a.contents(),
                r = n ? t.call(this, e) : t;
                i.length ? i.wrapAll(r) : a.append(r)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                b(this).replaceWith(b(this).children())
            }),
            this
        },
        clone: function() {
            return this.map(function() {
                return this.cloneNode(!0)
            })
        },
        hide: function() {
            return this.css("display", "none")
        },
        toggle: function(t) {
            return this.each(function() {
                var e = b(this); (t === P ? "none" == e.css("display") : t) ? e.show() : e.hide()
            })
        },
        prev: function(t) {
            return b(this.pluck("previousElementSibling")).filter(t || "*")
        },
        next: function(t) {
            return b(this.pluck("nextElementSibling")).filter(t || "*")
        },
        html: function(t) {
            return 0 in arguments ? this.each(function(e) {
                var n = this.innerHTML;
                b(this).empty().append(g(this, t, e, n))
            }) : 0 in this ? this[0].innerHTML: null
        },
        text: function(t) {
            return 0 in arguments ? this.each(function(e) {
                var n = g(this, t, e, this.textContent);
                this.textContent = null == n ? "": "" + n
            }) : 0 in this ? this[0].textContent: null
        },
        attr: function(t, e) {
            var n;
            return "string" != typeof t || 1 in arguments ? this.each(function(n) {
                if (1 === this.nodeType) if (i(t)) for (C in t) v(this, C, t[C]);
                else v(this, t, g(this, e, n, this.getAttribute(t)))
            }) : this.length && 1 === this[0].nodeType ? !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n: P
        },
        removeAttr: function(t) {
            return this.each(function() {
                1 === this.nodeType && t.split(" ").forEach(function(t) {
                    v(this, t)
                },
                this)
            })
        },
        prop: function(t, e) {
            return t = V[t] || t,
            1 in arguments ? this.each(function(n) {
                this[t] = g(this, e, n, this[t])
            }) : this[0] && this[0][t]
        },
        data: function(t, e) {
            var n = "data-" + t.replace(j, "-$1").toLowerCase(),
            a = 1 in arguments ? this.attr(n, e) : this.attr(n);
            return null !== a ? x(a) : P
        },
        val: function(t) {
            return 0 in arguments ? this.each(function(e) {
                this.value = g(this, t, e, this.value)
            }) : this[0] && (this[0].multiple ? b(this[0]).find("option").filter(function() {
                return this.selected
            }).pluck("value") : this[0].value)
        },
        offset: function(t) {
            if (t) return this.each(function(e) {
                var n = b(this),
                a = g(this, t, e, n.offset()),
                i = n.offsetParent().offset(),
                r = {
                    top: a.top - i.top,
                    left: a.left - i.left
                };
                "static" == n.css("position") && (r.position = "relative"),
                n.css(r)
            });
            if (!this.length) return null;
            var e = this[0].getBoundingClientRect();
            return {
                left: e.left + window.pageXOffset,
                top: e.top + window.pageYOffset,
                width: Math.round(e.width),
                height: Math.round(e.height)
            }
        },
        css: function(e, n) {
            if (2 > arguments.length) {
                var a, i = this[0];
                if (!i) return;
                if (a = getComputedStyle(i, ""), "string" == typeof e) return i.style[A(e)] || a.getPropertyValue(e);
                if (J(e)) {
                    var r = {};
                    return b.each(e,
                    function(t, e) {
                        r[e] = i.style[A(e)] || a.getPropertyValue(e)
                    }),
                    r
                }
            }
            var o = "";
            if ("string" == t(e)) n || 0 === n ? o = c(e) + ":" + d(e, n) : this.each(function() {
                this.style.removeProperty(c(e))
            });
            else for (C in e) e[C] || 0 === e[C] ? o += c(C) + ":" + d(C, e[C]) + ";": this.each(function() {
                this.style.removeProperty(c(C))
            });
            return this.each(function() {
                this.style.cssText += ";" + o
            })
        },
        index: function(t) {
            return t ? this.indexOf(b(t)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(t) {
            return t ? E.some.call(this,
            function(t) {
                return this.test(y(t))
            },
            l(t)) : !1
        },
        addClass: function(t) {
            return t ? this.each(function(e) {
                if ("className" in this) {
                    S = [];
                    var n = y(this),
                    a = g(this, t, e, n);
                    a.split(/\s+/g).forEach(function(t) {
                        b(this).hasClass(t) || S.push(t)
                    },
                    this),
                    S.length && y(this, n + (n ? " ": "") + S.join(" "))
                }
            }) : this
        },
        removeClass: function(t) {
            return this.each(function(e) {
                if ("className" in this) {
                    if (t === P) return y(this, "");
                    S = y(this),
                    g(this, t, e, S).split(/\s+/g).forEach(function(t) {
                        S = S.replace(l(t), " ")
                    }),
                    y(this, S.trim())
                }
            })
        },
        toggleClass: function(t, e) {
            return t ? this.each(function(n) {
                var a = b(this),
                i = g(this, t, n, y(this));
                i.split(/\s+/g).forEach(function(t) { (e === P ? !a.hasClass(t) : e) ? a.addClass(t) : a.removeClass(t)
                })
            }) : this
        },
        scrollTop: function(t) {
            if (this.length) {
                var e = "scrollTop" in this[0];
                return t === P ? e ? this[0].scrollTop: this[0].pageYOffset: this.each(e ?
                function() {
                    this.scrollTop = t
                }: function() {
                    this.scrollTo(this.scrollX, t)
                })
            }
        },
        scrollLeft: function(t) {
            if (this.length) {
                var e = "scrollLeft" in this[0];
                return t === P ? e ? this[0].scrollLeft: this[0].pageXOffset: this.each(e ?
                function() {
                    this.scrollLeft = t
                }: function() {
                    this.scrollTo(t, this.scrollY)
                })
            }
        },
        position: function() {
            if (this.length) {
                var t = this[0],
                e = this.offsetParent(),
                n = this.offset(),
                a = D.test(e[0].nodeName) ? {
                    top: 0,
                    left: 0
                }: e.offset();
                return n.top -= parseFloat(b(t).css("margin-top")) || 0,
                n.left -= parseFloat(b(t).css("margin-left")) || 0,
                a.top += parseFloat(b(e[0]).css("border-top-width")) || 0,
                a.left += parseFloat(b(e[0]).css("border-left-width")) || 0,
                {
                    top: n.top - a.top,
                    left: n.left - a.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || _.body; t && !D.test(t.nodeName) && "static" == b(t).css("position");) t = t.offsetParent;
                return t
            })
        }
    },
    b.fn.detach = b.fn.remove,
    ["width", "height"].forEach(function(t) {
        var e = t.replace(/./,
        function(t) {
            return t[0].toUpperCase()
        });
        b.fn[t] = function(i) {
            var r, o = this[0];
            return i === P ? n(o) ? o["inner" + e] : a(o) ? o.documentElement["scroll" + e] : (r = this.offset()) && r[t] : this.each(function(e) {
                o = b(this),
                o.css(t, g(this, i, e, o[t]()))
            })
        }
    }),
    W.forEach(function(e, n) {
        var a = n % 2;
        b.fn[e] = function() {
            var e, i, r = b.map(arguments,
            function(n) {
                return e = t(n),
                "object" == e || "array" == e || null == n ? n: G.fragment(n)
            }),
            o = this.length > 1;
            return 1 > r.length ? this: this.each(function(t, e) {
                i = a ? e: e.parentNode,
                e = 0 == n ? e.nextSibling: 1 == n ? e.firstChild: 2 == n ? e: null;
                var s = b.contains(_.documentElement, i);
                r.forEach(function(t) {
                    if (o) t = t.cloneNode(!0);
                    else if (!i) return b(t).remove();
                    i.insertBefore(t, e),
                    s && w(t,
                    function(t) {
                        null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                    })
                })
            })
        },
        b.fn[a ? e + "To": "insert" + (n ? "Before": "After")] = function(t) {
            return b(t)[e](this),
            this
        }
    }),
    G.Z.prototype = b.fn,
    G.uniq = $,
    G.deserializeValue = x,
    b.zepto = G,
    b
} ();
window.Zepto = Zepto,
void 0 === window.$ && (window.$ = Zepto),
function(t) {
    function e(t) {
        return t._zid || (t._zid = f++)
    }
    function n(t, n, r, o) {
        if (n = a(n), n.ns) var s = i(n.ns);
        return (g[e(t)] || []).filter(function(t) {
            return ! (!t || n.e && t.e != n.e || n.ns && !s.test(t.ns) || r && e(t.fn) !== e(r) || o && t.sel != o)
        })
    }
    function a(t) {
        var e = ("" + t).split(".");
        return {
            e: e[0],
            ns: e.slice(1).sort().join(" ")
        }
    }
    function i(t) {
        return RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
    }
    function r(t, e) {
        return t.del && !y && t.e in x || !!e
    }
    function o(t) {
        return w[t] || y && x[t] || t
    }
    function s(n, i, s, u, l, f, h) {
        var m = e(n),
        p = g[m] || (g[m] = []);
        i.split(/\s/).forEach(function(e) {
            if ("ready" == e) return t(document).ready(s);
            var i = a(e);
            i.fn = s,
            i.sel = l,
            i.e in w && (s = function(e) {
                var n = e.relatedTarget;
                return ! n || n !== this && !t.contains(this, n) ? i.fn.apply(this, arguments) : d
            }),
            i.del = f;
            var m = f || s;
            i.proxy = function(t) {
                if (t = c(t), !t.isImmediatePropagationStopped()) {
                    t.data = u;
                    var e = m.apply(n, t._args == d ? [t] : [t].concat(t._args));
                    return e === !1 && (t.preventDefault(), t.stopPropagation()),
                    e
                }
            },
            i.i = p.length,
            p.push(i),
            "addEventListener" in n && n.addEventListener(o(i.e), i.proxy, r(i, h))
        })
    }
    function u(t, a, i, s, u) {
        var c = e(t); (a || "").split(/\s/).forEach(function(e) {
            n(t, e, i, s).forEach(function(e) {
                delete g[c][e.i],
                "removeEventListener" in t && t.removeEventListener(o(e.e), e.proxy, r(e, u))
            })
        })
    }
    function c(e, n) {
        return (n || !e.isDefaultPrevented) && (n || (n = e), t.each(S,
        function(t, a) {
            var i = n[t];
            e[t] = function() {
                return this[a] = P,
                i && i.apply(n, arguments)
            },
            e[a] = C
        }), (n.defaultPrevented !== d ? n.defaultPrevented: "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = P)),
        e
    }
    function l(t) {
        var e, n = {
            originalEvent: t
        };
        for (e in t) b.test(e) || t[e] === d || (n[e] = t[e]);
        return c(n, t)
    }
    var d, f = 1,
    h = Array.prototype.slice,
    m = t.isFunction,
    p = function(t) {
        return "string" == typeof t
    },
    g = {},
    v = {},
    y = "onfocusin" in window,
    x = {
        focus: "focusin",
        blur: "focusout"
    },
    w = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents",
    t.event = {
        add: s,
        remove: u
    },
    t.proxy = function(n, a) {
        var i = 2 in arguments && h.call(arguments, 2);
        if (m(n)) {
            var r = function() {
                return n.apply(a, i ? i.concat(h.call(arguments)) : arguments)
            };
            return r._zid = e(n),
            r
        }
        if (p(a)) return i ? (i.unshift(n[a], n), t.proxy.apply(null, i)) : t.proxy(n[a], n);
        throw new TypeError("expected function")
    },
    t.fn.bind = function(t, e, n) {
        return this.on(t, e, n)
    },
    t.fn.unbind = function(t, e) {
        return this.off(t, e)
    },
    t.fn.one = function(t, e, n, a) {
        return this.on(t, e, n, a, 1)
    };
    var P = function() {
        return ! 0
    },
    C = function() {
        return ! 1
    },
    b = /^([A-Z]|returnValue$|layer[XY]$)/,
    S = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    t.fn.delegate = function(t, e, n) {
        return this.on(e, t, n)
    },
    t.fn.undelegate = function(t, e, n) {
        return this.off(e, t, n)
    },
    t.fn.live = function(e, n) {
        return t(document.body).delegate(this.selector, e, n),
        this
    },
    t.fn.die = function(e, n) {
        return t(document.body).undelegate(this.selector, e, n),
        this
    },
    t.fn.on = function(e, n, a, i, r) {
        var o, c, f = this;
        return e && !p(e) ? (t.each(e,
        function(t, e) {
            f.on(t, n, a, e, r)
        }), f) : (p(n) || m(i) || i === !1 || (i = a, a = n, n = d), (m(a) || a === !1) && (i = a, a = d), i === !1 && (i = C), f.each(function(f, m) {
            r && (o = function(t) {
                return u(m, t.type, i),
                i.apply(this, arguments)
            }),
            n && (c = function(e) {
                var a, r = t(e.target).closest(n, m).get(0);
                return r && r !== m ? (a = t.extend(l(e), {
                    currentTarget: r,
                    liveFired: m
                }), (o || i).apply(r, [a].concat(h.call(arguments, 1)))) : d
            }),
            s(m, e, i, a, n, c || o)
        }))
    },
    t.fn.off = function(e, n, a) {
        var i = this;
        return e && !p(e) ? (t.each(e,
        function(t, e) {
            i.off(t, n, e)
        }), i) : (p(n) || m(a) || a === !1 || (a = n, n = d), a === !1 && (a = C), i.each(function() {
            u(this, e, a, n)
        }))
    },
    t.fn.trigger = function(e, n) {
        return e = p(e) || t.isPlainObject(e) ? t.Event(e) : c(e),
        e._args = n,
        this.each(function() {
            e.type in x && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
        })
    },
    t.fn.triggerHandler = function(e, a) {
        var i, r;
        return this.each(function(o, s) {
            i = l(p(e) ? t.Event(e) : e),
            i._args = a,
            i.target = s,
            t.each(n(s, e.type || e),
            function(t, e) {
                return r = e.proxy(i),
                i.isImmediatePropagationStopped() ? !1 : d
            })
        }),
        r
    },
    "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
        t.fn[e] = function(t) {
            return 0 in arguments ? this.bind(e, t) : this.trigger(e)
        }
    }),
    t.Event = function(t, e) {
        p(t) || (e = t, t = e.type);
        var n = document.createEvent(v[t] || "Events"),
        a = !0;
        if (e) for (var i in e)"bubbles" == i ? a = !!e[i] : n[i] = e[i];
        return n.initEvent(t, a, !0),
        c(n)
    }
} (Zepto),
function(t) {
    function e(e, n, a) {
        var i = t.Event(n);
        return t(e).trigger(i, a),
        !i.isDefaultPrevented()
    }
    function n(t, n, a, i) {
        return t.global ? e(n || y, a, i) : void 0
    }
    function a(e) {
        e.global && 0 === t.active++&&n(e, null, "ajaxStart")
    }
    function i(e) {
        e.global && !--t.active && n(e, null, "ajaxStop")
    }
    function r(t, e) {
        var a = e.context;
        return e.beforeSend.call(a, t, e) === !1 || n(e, a, "ajaxBeforeSend", [t, e]) === !1 ? !1 : (n(e, a, "ajaxSend", [t, e]), void 0)
    }
    function o(t, e, a, i) {
        var r = a.context,
        o = "success";
        a.success.call(r, t, o, e),
        i && i.resolveWith(r, [t, o, e]),
        n(a, r, "ajaxSuccess", [e, a, t]),
        u(o, e, a)
    }
    function s(t, e, a, i, r) {
        var o = i.context;
        i.error.call(o, a, e, t),
        r && r.rejectWith(o, [a, e, t]),
        n(i, o, "ajaxError", [a, i, t || e]),
        u(e, a, i)
    }
    function u(t, e, a) {
        var r = a.context;
        a.complete.call(r, e, t),
        n(a, r, "ajaxComplete", [e, a]),
        i(a)
    }
    function c() {}
    function l(t) {
        return t && (t = t.split(";", 2)[0]),
        t && (t == b ? "html": t == C ? "json": w.test(t) ? "script": P.test(t) && "xml") || "text"
    }
    function d(t, e) {
        return "" == e ? t: (t + "&" + e).replace(/[&?]{1,2}/, "?")
    }
    function f(e) {
        e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)),
        !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = d(e.url, e.data), e.data = void 0)
    }
    function h(e, n, a, i) {
        return t.isFunction(n) && (i = a, a = n, n = void 0),
        t.isFunction(a) || (i = a, a = void 0),
        {
            url: e,
            data: n,
            success: a,
            dataType: i
        }
    }
    function m(e, n, a, i) {
        var r, o = t.isArray(n),
        s = t.isPlainObject(n);
        t.each(n,
        function(n, u) {
            r = t.type(u),
            i && (n = a ? i: i + "[" + (s || "object" == r || "array" == r ? n: "") + "]"),
            !i && o ? e.add(u.name, u.value) : "array" == r || !a && "object" == r ? m(e, u, a, n) : e.add(n, u)
        })
    }
    var p, g, v = 0,
    y = window.document,
    x = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    w = /^(?:text|application)\/javascript/i,
    P = /^(?:text|application)\/xml/i,
    C = "application/json",
    b = "text/html",
    S = /^\s*$/,
    A = y.createElement("a");
    A.href = window.location.href,
    t.active = 0,
    t.ajaxJSONP = function(e, n) {
        if (! ("type" in e)) return t.ajax(e);
        var a, i, u = e.jsonpCallback,
        c = (t.isFunction(u) ? u() : u) || "jsonp" + ++v,
        l = y.createElement("script"),
        d = window[c],
        f = function(e) {
            t(l).triggerHandler("error", e || "abort")
        },
        h = {
            abort: f
        };
        return n && n.promise(h),
        t(l).on("load error",
        function(r, u) {
            clearTimeout(i),
            t(l).off().remove(),
            "error" != r.type && a ? o(a[0], h, e, n) : s(null, u || "error", h, e, n),
            window[c] = d,
            a && t.isFunction(d) && d(a[0]),
            d = a = void 0
        }),
        r(h, e) === !1 ? (f("abort"), h) : (window[c] = function() {
            a = arguments
        },
        l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + c), y.head.appendChild(l), e.timeout > 0 && (i = setTimeout(function() {
            f("timeout")
        },
        e.timeout)), h)
    },
    t.ajaxSettings = {
        type: "GET",
        beforeSend: c,
        success: c,
        error: c,
        complete: c,
        context: null,
        global: !0,
        xhr: function() {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: C,
            xml: "application/xml, text/xml",
            html: b,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    },
    t.ajax = function(e) {
        var n, i = t.extend({},
        e || {}),
        u = t.Deferred && t.Deferred();
        for (p in t.ajaxSettings) void 0 === i[p] && (i[p] = t.ajaxSettings[p]);
        a(i),
        i.crossDomain || (n = y.createElement("a"), n.href = i.url, n.href = n.href, i.crossDomain = A.protocol + "//" + A.host != n.protocol + "//" + n.host),
        i.url || (i.url = "" + window.location),
        f(i);
        var h = i.dataType,
        m = /\?.+=\?/.test(i.url);
        if (m && (h = "jsonp"), i.cache !== !1 && (e && e.cache === !0 || "script" != h && "jsonp" != h) || (i.url = d(i.url, "_=" + Date.now())), "jsonp" == h) return m || (i.url = d(i.url, i.jsonp ? i.jsonp + "=?": i.jsonp === !1 ? "": "callback=?")),
        t.ajaxJSONP(i, u);
        var v, x = i.accepts[h],
        w = {},
        P = function(t, e) {
            w[t.toLowerCase()] = [t, e]
        },
        C = /^([\w-]+:)\/\//.test(i.url) ? RegExp.$1: window.location.protocol,
        b = i.xhr(),
        $ = b.setRequestHeader;
        if (u && u.promise(b), i.crossDomain || P("X-Requested-With", "XMLHttpRequest"), P("Accept", x || "*/*"), (x = i.mimeType || x) && (x.indexOf(",") > -1 && (x = x.split(",", 2)[0]), b.overrideMimeType && b.overrideMimeType(x)), (i.contentType || i.contentType !== !1 && i.data && "GET" != i.type.toUpperCase()) && P("Content-Type", i.contentType || "application/x-www-form-urlencoded"), i.headers) for (g in i.headers) P(g, i.headers[g]);
        if (b.setRequestHeader = P, b.onreadystatechange = function() {
            if (4 == b.readyState) {
                b.onreadystatechange = c,
                clearTimeout(v);
                var e, n = !1;
                if (b.status >= 200 && 300 > b.status || 304 == b.status || 0 == b.status && "file:" == C) {
                    h = h || l(i.mimeType || b.getResponseHeader("content-type")),
                    e = b.responseText;
                    try {
                        "script" == h ? (1, eval)(e) : "xml" == h ? e = b.responseXML: "json" == h && (e = S.test(e) ? null: t.parseJSON(e))
                    } catch(a) {
                        n = a
                    }
                    n ? s(n, "parsererror", b, i, u) : o(e, b, i, u)
                } else s(b.statusText || null, b.status ? "error": "abort", b, i, u)
            }
        },
        r(b, i) === !1) return b.abort(),
        s(null, "abort", b, i, u),
        b;
        if (i.xhrFields) for (g in i.xhrFields) b[g] = i.xhrFields[g];
        var E = "async" in i ? i.async: !0;
        b.open(i.type, i.url, E, i.username, i.password);
        for (g in w) $.apply(b, w[g]);
        return i.timeout > 0 && (v = setTimeout(function() {
            b.onreadystatechange = c,
            b.abort(),
            s(null, "timeout", b, i, u)
        },
        i.timeout)),
        b.send(i.data ? i.data: null),
        b
    },
    t.get = function() {
        return t.ajax(h.apply(null, arguments))
    },
    t.post = function() {
        var e = h.apply(null, arguments);
        return e.type = "POST",
        t.ajax(e)
    },
    t.getJSON = function() {
        var e = h.apply(null, arguments);
        return e.dataType = "json",
        t.ajax(e)
    },
    t.fn.load = function(e, n, a) {
        if (!this.length) return this;
        var i, r = this,
        o = e.split(/\s/),
        s = h(e, n, a),
        u = s.success;
        return o.length > 1 && (s.url = o[0], i = o[1]),
        s.success = function(e) {
            r.html(i ? t("<div>").html(e.replace(x, "")).find(i) : e),
            u && u.apply(r, arguments)
        },
        t.ajax(s),
        this
    };
    var $ = encodeURIComponent;
    t.param = function(e, n) {
        var a = [];
        return a.add = function(e, n) {
            t.isFunction(n) && (n = n()),
            null == n && (n = ""),
            this.push($(e) + "=" + $(n))
        },
        m(a, e, n),
        a.join("&").replace(/%20/g, "+")
    }
} (Zepto),
function(t) {
    t.fn.serializeArray = function() {
        var e, n, a = [],
        i = function(t) {
            return t.forEach ? t.forEach(i) : (a.push({
                name: e,
                value: t
            }), void 0)
        };
        return this[0] && t.each(this[0].elements,
        function(a, r) {
            n = r.type,
            e = r.name,
            e && "fieldset" != r.nodeName.toLowerCase() && !r.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || r.checked) && i(t(r).val())
        }),
        a
    },
    t.fn.serialize = function() {
        var t = [];
        return this.serializeArray().forEach(function(e) {
            t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
        }),
        t.join("&")
    },
    t.fn.submit = function(e) {
        if (0 in arguments) this.bind("submit", e);
        else if (this.length) {
            var n = t.Event("submit");
            this.eq(0).trigger(n),
            n.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
} (Zepto),
function(t) {
    "__proto__" in {} || t.extend(t.zepto, {
        Z: function(e, n) {
            return e = e || [],
            t.extend(e, t.fn),
            e.selector = n || "",
            e.__Z = !0,
            e
        },
        isZ: function(e) {
            return "array" === t.type(e) && "__Z" in e
        }
    });
    try {
        getComputedStyle(void 0)
    } catch(e) {
        var n = getComputedStyle;
        window.getComputedStyle = function(t) {
            try {
                return n(t)
            } catch(e) {
                return null
            }
        }
    }
} (Zepto),
function(t) {
    function e(t, e, n, a) {
        return Math.abs(t - e) >= Math.abs(n - a) ? t - e > 0 ? "Left": "Right": n - a > 0 ? "Up": "Down"
    }
    function n() {
        l = null,
        f.last && (f.el.trigger("longTap"), f = {})
    }
    function a() {
        l && clearTimeout(l),
        l = null
    }
    function i() {
        s && clearTimeout(s),
        u && clearTimeout(u),
        c && clearTimeout(c),
        l && clearTimeout(l),
        s = u = c = l = null,
        f = {}
    }
    function r(t) {
        return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
    }
    function o(t, e) {
        return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
    }
    var s, u, c, l, d, f = {},
    h = 750;
    t(document).ready(function() {
        var m, p, g, v, y = 0,
        x = 0;
        "MSGesture" in window && (d = new MSGesture, d.target = document.body),
        t(document).bind("MSGestureEnd",
        function(t) {
            var e = t.velocityX > 1 ? "Right": -1 > t.velocityX ? "Left": t.velocityY > 1 ? "Down": -1 > t.velocityY ? "Up": null;
            e && (f.el.trigger("swipe"), f.el.trigger("swipe" + e))
        }).on("touchstart MSPointerDown pointerdown",
        function(e) { (!(v = o(e, "down")) || r(e)) && (g = v ? e: e.touches[0], e.touches && 1 === e.touches.length && f.x2 && (f.x2 = void 0, f.y2 = void 0), m = Date.now(), p = m - (f.last || m), f.el = t("tagName" in g.target ? g.target: g.target.parentNode), s && clearTimeout(s), f.x1 = g.pageX, f.y1 = g.pageY, p > 0 && 250 >= p && (f.isDoubleTap = !0), f.last = m, l = setTimeout(n, h), d && v && d.addPointer(e.pointerId))
        }).on("touchmove MSPointerMove pointermove",
        function(t) { (!(v = o(t, "move")) || r(t)) && (g = v ? t: t.touches[0], a(), f.x2 = g.pageX, f.y2 = g.pageY, y += Math.abs(f.x1 - f.x2), x += Math.abs(f.y1 - f.y2))
        }).on("touchend MSPointerUp pointerup",
        function(n) { (!(v = o(n, "up")) || r(n)) && (a(), f.x2 && Math.abs(f.x1 - f.x2) > 30 || f.y2 && Math.abs(f.y1 - f.y2) > 30 ? c = setTimeout(function() {
                f.el.trigger("swipe"),
                f.el.trigger("swipe" + e(f.x1, f.x2, f.y1, f.y2)),
                f = {}
            },
            0) : "last" in f && (30 > y && 30 > x ? u = setTimeout(function() {
                var e = t.Event("tap");
                e.cancelTouch = i,
                f.el.trigger(e),
                f.isDoubleTap ? (f.el && f.el.trigger("doubleTap"), f = {}) : s = setTimeout(function() {
                    s = null,
                    f.el && f.el.trigger("singleTap"),
                    f = {}
                },
                250)
            },
            0) : f = {}), y = x = 0)
        }).on("touchcancel MSPointerCancel pointercancel", i),
        t(window).on("scroll", i)
    }),
    ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
        t.fn[e] = function(t) {
            return this.on(e, t)
        }
    })
} (Zepto);








var Flower = function(t, e, n) {
    this.title = "我的2014",
    this.name = t,
    this.pageName = t,
    this.amount = e,
    this.count = n,
    this.shareData = ["defeatRatio", "sumAmount", "sumCount"]
};
Flower.prototype.beginAmt = function() { ("" + data.sumAmount).split(".")[0].length > 6 && $("#" + this.pageName + " .amount > div").eq(1).css("font-size", "1.125em");
    var t = 0,
    e = this.amount,
    n = this.pageName,
    a = this.count;
    tempAnimated.amountAnimated = setInterval(function() {
        var i = e / constants.AMOUNT_FRAME * t,
        r = Math.floor(a / constants.AMOUNT_FRAME * t),
        o = ("" + i.toFixed(2)).split(".");
        $("#" + n + " .amount > div").eq(1).text(o[0]),
        $("#" + n + " .amount > div").eq(2).text("." + o[1]),
        $("#" + n + " .times > div").eq(0).text(r),
        t++,
        t == constants.AMOUNT_FRAME + 1 && clearInterval(tempAnimated.amountAnimated)
    },
    constants.AMOUNT_FRAME_SEC);
    for (var i = $("#" + n + " .flrContainer"), r = util.randomInteger, o = function(t, e) {
        return t + Math.random() * (e - t)
    },
    s = function(t) {
        return t + "px"
    },
    u = function(t) {
        return t + "s"
    },
    c = function() {
        var t = $("<div></div>"),
        e = $("<div></div>"),
        n = .5 > Math.random() ? "clockwiseSpin": "counterclockwiseSpinAndFlip",
        a = u(o(4, 6)),
        i = u(o(4, 8)),
        c = u(o(0, 5));
        return $(e).css("width", s(r(3, 6))).css("height", s(r(8, 11))).addClass("flower-color" + r(1, 4)).addClass("flower"),
        $(e)[0].style.webkitAnimationName = n,
        $(e)[0].style.webkitAnimationDuration = i,
        $(t).css("top", "0px").css("left", s(r(0, $(".body")[0].clientWidth))).append($(e)).addClass("fall-div"),
        $(t)[0].style.webkitAnimationName = "fade, drop",
        $(t)[0].style.webkitAnimationDuration = a + ", " + a,
        $(t)[0].style.webkitAnimationDelay = c + ", " + c,
        $(t)
    },
    l = 0; constants.NUMBER_OF_FLOWER > l; l++) $(i).append(c())
},
Flower.prototype.endPage = function() {
    $(".fall-div").remove(),
    $("#" + this.pageName + " .amount div").eq(1).text("0"),
    $("#" + this.pageName + " .amount div").eq(2).text(".00"),
    $("#" + this.pageName + " .times div").eq(0).text("0")
};
var tempAnimated = {},
constants = {
    NUMBER_OF_FLOWER: 30,
    AMOUNT_FRAME: 7,
    AMOUNT_FRAME_SEC: 100,
    BANNER_HEIGHT: 45,
    BALL_BASE: 60,
    BALl_PER_PERCENT: 1.8,
    DRAW_FRAME: 8,
    BALL_COLOR: ["#ffbd3d", "#00c0e5", "#2fe7ce", "#26cc7c", "#7c88ff"],
    BALL_IN_TIME: 200,
    AMT_UNIT: ["元", "十元", "百元", "千元", "万元", "十万元", "百万元", "千万元", "亿元", "十亿元"],
    MICRO_TEXT_IN_TIME: 800,
    ONE_SUN_WIN_HEIGHT: "50%",
    ONE_SUN_LOSE_HEIGHT: "25%",
    AVG_SUN_WIN_HEIGHT: "100%",
    AVG_SUN_LOSE_HEIGHT: "70%",
    SEESAW_WIN: "19",
    MIRO_SEC: "1s",
    DOWNLOAD_URL: "location.href='http://campaign.app.qq.com/dom/npsb/jump.jsp?pkgName=com.cmbchina.ccd.pluto.cmbActivity&ckey=1267628036436'"
},
pages = {
    noDutyPage: {
        title: "2014年度账单说明",
        init: function() {
            $("header .title-all").text("2014年度账单说明"),
            $("header .share").hide()
        }
    },
    flyInPage: {
        title: "回顾.2014",
        beginAmt: function() {
            var t = 0;
            tempAnimated.flyAnimated = setInterval(function() {
                3 >= t && $(".fly-in").eq(t).removeClass("hide").addClass("fadeInRight animated"),
                t++,
                6 == t && $(".together").removeClass("hide").addClass("fadeIn animated"),
                7 == t && ($("#flyInPage .start").removeClass("hide").addClass("fadeIn animated"), clearInterval(tempAnimated.flyAnimated))
            },
            800)
        },
        endPage: function() {
            clearInterval(tempAnimated.flyAnimated),
            $(".fadeInRight").removeClass("fadeInRight"),
            $(".fadeIn").removeClass("fadeIn"),
            $(".fly-in").addClass("hide"),
            $("#flyInPage .start").addClass("hide"),
            $(".together").addClass("hide")
        }
    },
    personAmtPage: void 0,
    avgAmtPage: void 0,
    brokenLinePage: {
        title: "我的2014",
        initPage: function() {
            $("#broken-line").attr("width", 2 * $(".body")[0].clientWidth).attr("height", 2 * .71875 * $(".body")[0].clientWidth).css("width", $(".body")[0].clientWidth).css("height", .71875 * $(".body")[0].clientWidth),
            this.DRAW_FRAME = constants.DRAW_FRAME,
            this.SIDE_MON_WIDTH = 34,
            this.MONTH_DISTANCE = 52,
            this.canvas = $("#broken-line")[0],
            this.ctx = this.canvas.getContext("2d"),
            this.width = 2 * $(".body")[0].clientWidth,
            this.height = 2 * .71875 * $(".body")[0].clientWidth,
            this.fix = this.width / 640,
            this.posXes = [],
            this.minScaleYuan = void 0,
            this.maxScaleYuan = void 0,
            this.initMothDetail = function() {
                for (var t = data.monthAmt,
                e = 0; t.length > e; e++) { ("" + t[e]).length > 9 && (t[e] = Math.round(100 * t[e]) / 100);
                    var n = e % 2,
                    a = Math.floor(e / 2);
                    $(".month-detail").eq(n).children(".every-month").eq(a).children("div").eq(2).text(t[e] + "元")
                }
            },
            this.drawBackGround(data.monthAmt),
            this.initMothDetail()
        },
        drawBackGround: function(t) {
            function e(t) {
                return t = ("" + t).split(".")[0],
                t.length - 1
            }
            this.ctx.fillStyle = "#ffffff",
            this.ctx.fillRect(0, 0, this.width, this.height);
            var n = this.ctx.createLinearGradient(0, 0, 0, this.height);
            n.addColorStop(0, "#007cd8"),
            n.addColorStop(1, "#17b2f3"),
            this.ctx.fillStyle = n,
            this.ctx.fillRect(0, 0, this.width, this.height),
            this.ctx.beginPath();
            for (var a = 0; 6 > a; a++) this.ctx.moveTo(30 * this.fix, 100 * this.fix + 60 * a * this.fix),
            this.ctx.lineTo(this.width - 32 * this.fix, 100 * this.fix + 60 * a * this.fix),
            this.ctx.lineWidth = 1,
            this.ctx.strokeStyle = "rgba(255,255,255,0.3)",
            this.ctx.stroke();
            this.ctx.textAlign = "center",
            this.ctx.fillStyle = "#ffffff",
            this.ctx.font = "18px neosans";
            for (var a = 0; 12 > a; a++) {
                var i = a + 1,
                r = this.SIDE_MON_WIDTH * this.fix + a * this.MONTH_DISTANCE * this.fix;
                this.ctx.fillText("" + i, r, this.height - 16 * this.fix),
                this.posXes.push(r)
            }
            var o = util.findMaxAndMin(t),
            s = o.max,
            u = o.min,
            c = e(s);
            $("#brokenLinePage .title2").text("单位:" + constants.AMT_UNIT[c] + "（自然月）");
            var l = Math.floor(u / Math.pow(10, c)),
            d = Math.ceil(s / Math.pow(10, c));
            l == d && (0 == l ? d = 100 : (l = 0, d = 2 * d)),
            this.minScaleYuan = l * Math.pow(10, c),
            this.maxScaleYuan = d * Math.pow(10, c);
            var f = [];
            f.push(l);
            for (var h = (d - l) / 5, a = 1; 5 > a; a++) {
                var m = l + h * a;
                f.push(Math.round(10 * m) / 10)
            }
            f.push(d);
            for (var a = 0; f.length > a; a++) {
                this.ctx.textAlign = "center",
                this.ctx.fillStyle = "#ffffff",
                this.ctx.font = "18px neosans";
                var r = this.width - 16 * this.fix,
                p = 100 * this.fix + 60 * (5 - a) * this.fix;
                this.ctx.fillText("" + f[a], r, p)
            }
        },
        beginAmt: function() {
            clearInterval(tempAnimated.interval),
            this.drawBrokeline(data.monthAmt)
        },
        drawBrokeline: function() {
            var t = 300 * this.fix / (this.maxScaleYuan - this.minScaleYuan);
            1 / 0 == t && (t = 0);
            var e = 400 * this.fix,
            n = this.MONTH_DISTANCE * this.fix / this.DRAW_FRAME,
            a = 0,
            i = 0,
            r = 0,
            o = this;
            tempAnimated.interval = setInterval(function() {
                if (0 == i) {
                    var s = o.posXes[a];
                    r = e - t * (data.monthAmt[a] - o.minScaleYuan),
                    o.ctx.beginPath(),
                    o.ctx.lineWidth = 1,
                    o.ctx.arc(s, r, 5.5, 0, 2 * Math.PI),
                    o.ctx.fillStyle = "#ffffff",
                    o.ctx.fill(),
                    o.ctx.stroke(),
                    o.ctx.beginPath(),
                    o.ctx.moveTo(s, r)
                }
                var u = (data.monthAmt[a + 1] - data.monthAmt[a]) * t / (o.MONTH_DISTANCE * o.fix),
                c = o.posXes[a] + (i + 1) * n;
                r -= n * u,
                o.ctx.lineTo(c, r),
                o.ctx.lineWidth = 4,
                o.ctx.strokeStyle = "#ffffff",
                o.ctx.stroke(),
                o.ctx.beginPath(),
                o.ctx.moveTo(c, r),
                i == o.DRAW_FRAME - 1 ? (a++, i = 0) : i++,
                12 == a && clearInterval(tempAnimated.interval)
            },
            20)
        },
        endPage: function() {
            this.drawBackGround(data.monthAmt),
            clearInterval(tempAnimated.interval)
        },
        shareData: ["monthAmt"]
    },
    fiveBallPage: {
        title: "我的2014",
        initPage: function() {
            for (var t = $(".body")[0].clientWidth, e = $(".body")[0].clientHeight, n = [t / 2, t / 4, t / 4, 3 * t / 4, 3 * t / 4], a = [e / 2, e / 4, 3 * e / 4, e / 4, 3 * e / 4], i = data.ratios, r = util.fix, o = 0; 5 > o; o++) {
                var s = util.randomInteger(0, 5 - o),
                u = constants.BALL_COLOR[s];
                constants.BALL_COLOR = constants.BALL_COLOR.slice(0, s).concat(constants.BALL_COLOR.slice(s + 1));
                var c = r(constants.BALL_BASE + 100 * i[o].value * constants.BALl_PER_PERCENT),
                l = 1.125 * (2 * c / 160),
                d = 2.25 * (2 * c / 160);
                $(".ball").eq(o).css("top", a[o] - c).css("left", n[o] - c).css("width", 2 * c).css("height", 2 * c).css("border-radius", c).css("background", u).children().eq(0).text(i[o].name).css("font-size", l + "em").css("padding-top", "25.5%").next().text((100 * i[o].value).toFixed(0) + "%").css("font-size", d + "em").css("padding-top", "1.625%")
            }
        },
        beginAmt: function() {
            function t() {
                tempAnimated.ballFlow = setInterval(function() {
                    $(".ball").eq(e).removeClass("hide").addClass("zoomIn animated"),
                    e++,
                    5 == e && (clearInterval(tempAnimated.ballFlow), t())
                },
                2e3)
            }
            var e = 0;
            tempAnimated.ballIn = setInterval(function() {
                $(".ball").eq(e).removeClass("hide").addClass("zoomIn animated"),
                e++,
                5 == e && (clearInterval(tempAnimated.ballIn), t())
            },
            constants.BALL_IN_TIME)
        },
        endPage: function() {
            $(".ball").addClass("hide"),
            clearInterval(tempAnimated.ballIn),
            $(".zoomIn").removeClass("zoomIn")
        },
        shareData: ["ratios"]
    },
    microEvalPage: {
        title: "年度微评",
        initPage: function() {
            data.personLogo1 ? ($("#microEvalPage .pay-count .signet").attr("lazy-src", "images/p4tiyanweizhong.png"), $("#microEvalPage .count-text").attr("lazy-src", "images/w1.png")) : ($("#microEvalPage .pay-count .signet").attr("lazy-src", "images/p3zhuanzhuzhishang.png"), $("#microEvalPage .count-text").attr("lazy-src", "images/w4.png")),
            data.personLogo2 ? ($("#microEvalPage .pay-amt .signet").attr("lazy-src", "images/p2gaoduandaqi.png"), $("#microEvalPage .amt-text").attr("lazy-src", "images/w2.png")) : ($("#microEvalPage .pay-amt .signet").attr("lazy-src", "images/p1didiaoshehua.png"), $("#microEvalPage .amt-text").attr("lazy-src", "images/w5.png")),
            data.personLogo3 ? ($("#microEvalPage .bounus-exchange .signet").attr("lazy-src", "images/p6jingmingduoduan.png"), $("#microEvalPage .bounus-text").attr("lazy-src", "images/w3.png")) : ($("#microEvalPage .bounus-exchange .signet").attr("lazy-src", "images/p5houjibofa.png"), $("#microEvalPage .bounus-text").attr("lazy-src", "images/w6.png"))
        },
        beginAmt: function() {
            util.doWin("pay-count", !data.personLogo1),
            util.doWin("pay-amt", !data.personLogo2),
            util.doWin("bounus-exchange", !data.personLogo3);
            var t = 0;
            tempAnimated.textIn = setInterval(function() {
                $("#microEvalPage .text").eq(t).removeClass("hide").addClass("fadeIn animated"),
                t++,
                3 == t && clearInterval(tempAnimated.textIn)
            },
            constants.MICRO_TEXT_IN_TIME);
            var e = 0;
            tempAnimated.signIn = setInterval(function() {
                $("#microEvalPage .signet").eq(e).removeClass("hide").addClass("bounceIn animated"),
                e++,
                3 == e && clearInterval(tempAnimated.signIn)
            },
            constants.MICRO_TEXT_IN_TIME)
        },
        endPage: function() {
            setTimeout(function() {
                util.backWin(),
                $("#microEvalPage .text").addClass("hide"),
                $("#microEvalPage .signet").addClass("hide"),
                clearInterval(tempAnimated.textIn),
                clearInterval(tempAnimated.signIn),
                $(".bounceIn").removeClass("bounceIn"),
                $(".fadeIn").removeClass("fadeIn")
            },
            1e3)
        },
        shareData: ["personLogo1", "personLogo2", "personLogo3"]
    },
    shapePage: {
        title: "年度成就",
        initPage: function() {
            $("#shapePage .person").attr("lazy-src", "images/mperson" + data.achiment + ".jpg")
        },
        beginAmt: function() {},
        endPage: function() {},
        shareData: ["achiment"]
    }
},
sumPage = [{
    title: "年度总结",
    name: "stageSumPage",
    initPage: function() {
        util.initSum(1, "stageSumPage", "分期交易$笔", "成功周转资金$元", !0)
    },
    beginAmt: function() {
        $("#stageSumPage .ch2").removeClass("hide").addClass("fadeIn animated"),
        setTimeout(function() {
            $("#stageSumPage .ch1").removeClass("hide").addClass("fadeIn animated")
        },
        500),
        setTimeout(function() {
            $("#stageSumPage .thoughts").removeClass("hide").addClass("tada animated")
        },
        1e3),
        setTimeout(function() {
            util.sumPageAnimed("stageSumPage")
        },
        1500)
    },
    endPage: function() {
        util.endSumPageAni("stageSumPage"),
        $(".bounceInUp").removeClass("bounceInUp"),
        $(".fadeIn").removeClass("fadeIn"),
        $(".tada").removeClass("tada"),
        $("#stageSumPage .ch1").addClass("hide"),
        $("#stageSumPage .ch2").addClass("hide"),
        $("#stageSumPage .thoughts").addClass("hide")
    }
},
{
    title: "年度总结",
    name: "tenStormSumPage",
    initPage: function() {
        for (var t = 0; data.reviews.length > t; t++) {
            var e = data.reviews[t];
            if (2 == e.identify) { + e.content1 ? $("#tenStormSumPage .title2").text("成功获得WMF锅具3件套") : $("#tenStormSumPage .title2").text("成功获得Targus双肩背包");
                break
            }
        }
    },
    beginAmt: function() {
        $("#tenStormSumPage .storm").removeClass("hide").addClass("zoomInRight animated"),
        setTimeout(function() {
            util.sumPageAnimed("tenStormSumPage")
        },
        800)
    },
    endPage: function() {
        util.endSumPageAni("tenStormSumPage"),
        $(".zoomInRight").removeClass("zoomInRight"),
        $("#tenStormSumPage .storm").addClass("hide")
    }
},
{
    title: "年度总结",
    name: "couponSumPage",
    initPage: function() {
        util.initSum(3, "couponSumPage", "成功获得优惠券$张", "")
    },
    beginAmt: function() {
        $("#couponSumPage .dialog1-count").removeClass("hide").addClass("tada animated"),
        setTimeout(function() {
            util.sumPageAnimed("couponSumPage")
        },
        500)
    },
    endPage: function() {
        util.endSumPageAni("couponSumPage"),
        $(".tada").removeClass("tada"),
        $("#couponSumPage .dialog1-count").addClass("hide")
    }
},
{
    title: "年度总结",
    name: "levelSumPage",
    initPage: function() {
        util.initSum(4, "levelSumPage", "卡片等级上升", "")
    },
    beginAmt: function() {
        $("#levelSumPage .ch-lev1").removeClass("hide").addClass("fadeIn animated"),
        setTimeout(function() {
            $("#levelSumPage .ch-lev2").removeClass("hide").addClass("fadeIn animated")
        },
        500),
        setTimeout(function() {
            $("#levelSumPage .ch-lev3").removeClass("hide").addClass("fadeIn animated")
        },
        1e3),
        setTimeout(function() {
            util.sumPageAnimed("levelSumPage")
        },
        1500)
    },
    endPage: function() {
        util.endSumPageAni("levelSumPage"),
        $(".fadeIn").removeClass("fadeIn"),
        $("#levelSumPage .ch-lev1").addClass("hide"),
        $("#levelSumPage .ch-lev2").addClass("hide"),
        $("#levelSumPage .ch-lev3").addClass("hide")
    }
},
{
    title: "年度总结",
    name: "cardSumPage",
    initPage: function() {
        util.initSum(5, "cardSumPage", "卡片申请达人", "您今年一共申请了$张卡片", !0)
    },
    beginAmt: function() {
        $("#cardSumPage .ch1").removeClass("hide").addClass("fadeIn animated"),
        setTimeout(function() {
            $("#cardSumPage .ch2").removeClass("hide").addClass("fadeIn animated")
        },
        300),
        setTimeout(function() {
            util.sumPageAnimed("cardSumPage")
        },
        600)
    },
    endPage: function() {
        util.endSumPageAni("cardSumPage"),
        $(".fadeIn").removeClass("fadeIn"),
        $(".tada").removeClass("tada"),
        $("#cardSumPage .ch1").addClass("hide"),
        $("#cardSumPage .ch2").addClass("hide")
    }
},
{
    title: "年度总结",
    name: "payAmtSumPage",
    initPage: function() {
        util.initSum(6, "payAmtSumPage", "单笔最高消费$元", "")
    },
    beginAmt: function() {
        $("#payAmtSumPage .img").removeClass("hide").addClass("rubberBand animated"),
        setTimeout(function() {
            util.sumPageAnimed("payAmtSumPage")
        },
        500)
    },
    endPage: function() {
        util.endSumPageAni("payAmtSumPage"),
        $(".rubberBand").removeClass("rubberBand"),
        $("#payAmtSumPage .img").addClass("hide")
    }
},
{
    title: "年度总结",
    name: "payCountSumPage",
    initPage: function() {
        util.initSum(7, "payCountSumPage", "消费商户数量$家", "")
    },
    beginAmt: function() {
        $("#payCountSumPage .img").removeClass("hide").addClass("zoomIn animated"),
        setTimeout(function() {
            util.sumPageAnimed("payCountSumPage")
        },
        500)
    },
    endPage: function() {
        util.endSumPageAni("payCountSumPage"),
        $(".zoomIn").removeClass("zoomIn"),
        $("#payCountSumPage .img").addClass("hide")
    }
},
{
    title: "年度总结",
    name: "bonusSumPage",
    initPage: function() {
        util.initSum(8, "bonusSumPage", "招行信用卡积分累计", "您今年共累计了$积分", !0)
    },
    beginAmt: function() {
        $("#bonusSumPage .presents").removeClass("hide").addClass("pulse animated"),
        setTimeout(function() {
            $("#bonusSumPage .present").removeClass("hide").addClass("bounceInDown animated")
        },
        500),
        setTimeout(function() {
            util.sumPageAnimed("bonusSumPage")
        },
        800)
    },
    endPage: function() {
        util.endSumPageAni("bonusSumPage"),
        $(".pulse").removeClass("pulse"),
        $(".bounceInDown").removeClass("bounceInDown"),
        $("#bonusSumPage .presents").addClass("hide"),
        $("#bonusSumPage .present").addClass("hide")
    }
}],
util = {
    clientWidth: void 0,
    randomInteger: function(t, e) {
        return t + Math.floor(Math.random() * (e - t))
    },
    fix: function(t) {
        return util.clientWidth || (util.clientWidth = $(".body")[0].clientWidth),
        t * util.clientWidth / 640
    },
    findMaxAndMin: function(t) {
        for (var e = t[0], n = t[0], a = 1; t.length > a; a++) {
            var i = t[a];
            i > e && (e = i),
            n > i && (n = i)
        }
        return {
            max: e,
            min: n
        }
    },
    lazyImgLoad: function(t) {
        $("#" + t + " img[lazy-src]").not("#" + t + " img[src]").each(function(t, e) {
            $(e).attr("src", $(e).attr("lazy-src"))
        }),
        $("#" + t + " div[lazy-src]").each(function(t, e) {
            $(e).css("background", "url(" + $(e).attr("lazy-src") + ")")
        })
    },
    sumPageAnimed: function(t) {
        $("#" + t + " .word").removeClass("hide").addClass("fadeInRight animated")
    },
    endSumPageAni: function(t) {
        $("#" + t + " .word").addClass("hide"),
        $(".fadeInRight").removeClass("fadeInRight")
    },
    backWin: function() {
        $(".one-sun-up").removeClass("one-sun-up"),
        $(".one-sun-down").removeClass("one-sun-down"),
        $(".avg-suns-up").removeClass("avg-suns-up"),
        $(".avg-suns-down").removeClass("avg-suns-down"),
        $(".see-saw-up").removeClass("see-saw-up"),
        $(".see-saw-down").removeClass("see-saw-down")
    },
    doWin: function(t, e) {
        e ? ($("." + t + " .one-sun").addClass("one-sun-up"), $("." + t + " .avg-suns").addClass("avg-suns-down"), $("." + t + " .seesaw").addClass("see-saw-up")) : ($("." + t + " .one-sun").addClass("one-sun-down"), $("." + t + " .avg-suns").addClass("avg-suns-up"), $("." + t + " .seesaw").addClass("see-saw-down"))
    },
    initSum: function(t, e, n, a, i) {
        for (var r = 0; data.reviews.length > r; r++) {
            var o = data.reviews[r];
            if (o.identify == t) {
                i ? (n && $("#" + e + " .title1").text(n.replace("$", o.content2)), a && $("#" + e + " .title2").text(a.replace("$", o.content1))) : (n && $("#" + e + " .title1").text(n.replace("$", o.content1)), a && $("#" + e + " .title2").text(a.replace("$", o.content2)));
                break
            }
        }
    }
},
data,
share = {
    href: void 0,
    page: void 0,
    getQueryString: function(t) {
        var e = RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i");
        this.href || (this.href = window.location);
        var n = this.href.search.substr(1).match(e);
        return null != n ? decodeURIComponent(n[2]) : null
    },
    init: function() {
        share.page = share.getQueryString("page");
        var t = parseInt(share.getQueryString("isappinstalled"));
        parseInt(share.getQueryString("isTest")),
        t || ($(".button a").text("立即下载掌上生活").attr("onclick", constants.DOWNLOAD_URL), $(".share-header a").attr("onclick", constants.DOWNLOAD_URL));
        var e = new Base64;
        data = JSON.parse(e.decode(share.getQueryString("data"))),
        $.get("./index.jsp",
        function(t) {
            var e = $(t.substring(t.indexOf("<head>"))),
            n = share.findIdInArray(e, share.page);
            $(".content").html(n),
            $(".up-arrow").remove(),
            $("#shapePage .share-gift").remove(),
            $("#shapePage .share").remove(),
            $(".pre-load-imgs").remove(),
            $("#flyInPage .start").remove(),
            $("#flyInPage .no-duty").remove(),
            $("#shapePage .personBack").remove(),
            $(".content").css("top", "-15px"),
            share.beginPage()
        })
    },
    findIdInArray: function(t, e) {
        for (var n = 0; t.length > n; n++) if (t[n].id == e) return t[n]
    },
    beginPage: function() {
        pages.personAmtPage = new Flower("personAmtPage", data.sumAmount, data.sumCount),
        pages.avgAmtPage = new Flower("avgAmtPage", 100 * data.defeatRatio);
        var t = share.page,
        e = RegExp(".*SumPage");
        if (e.test(t)) {
            for (var n = 0; sumPage.length > n; n++) if (sumPage[n].name == t) {
                sumPage[n].initPage && sumPage[n].initPage(),
                util.lazyImgLoad(t),
                sumPage[n].beginAmt && sumPage[n].beginAmt();
                break
            }
        } else pages[t].initPage && pages[t].initPage(),
        util.lazyImgLoad(t),
        pages[t].beginAmt && pages[t].beginAmt()
    }
};
Zepto(function() {
    share.init()
});