define("dist/js/app", ["./zepto", "./touch", "./global", "./page", "./media", "./image", "./event", "./sileFn", "./map", "./ylMap", "./form", "./plugins", "./ylMusic", "./fx", "./Lottery", "./video"],
function(require, exports, module) {
    window.$ = require("./zepto"),
    $ = require("./touch");
    var global = require("./global"),
    page = require("./page"),
    media = require("./media");
    require("./image"),
    require("./event"),
    require("./plugins"),
    module.exports = {
        init_modle: function() {
            global._scrollStop(),
            document.body.style.userSelect = "none",
            document.body.style.mozUserSelect = "none",
            document.body.style.webkitUserSelect = "none",
            eval(function(a, b, c, d, e, f) {
                if (e = function(a) {
                    return (b > a ? "": e(parseInt(a / b))) + ((a %= b) > 35 ? String.fromCharCode(a + 29) : a.toString(36))
                },
                !"".replace(/^/, String)) {
                    for (; c--;) f[e(c)] = d[c] || e(c);
                    d = [function(a) {
                        return f[a]
                    }],
                    e = function() {
                        return "\\w+"
                    },
                    c = 1
                }
                for (; c--;) d[c] && (a = a.replace(new RegExp("\\b" + e(c) + "\\b", "g"), d[c]));
                return a
            } ("r h$=['\\g\\j\\k\\e\\g\\v\\f\\j\\l\\e\\q\\i','\\g\\j\\k\\e\\g\\v\\f\\j\\l\\e\\q\\i','\\g\\j\\k\\e\\g\\v\\f\\j\\l\\e\\q\\i','\\m\\m\\g\\j\\k\\e\\g\\H\\i\\f\\f\\i\\l\\m\\m','\\g\\j\\k\\e\\g\\v\\f\\j\\l\\e\\q\\i','\\m\\m\\g\\j\\k\\e\\g\\H\\i\\f\\f\\i\\l\\m\\m','\\y\\j\\17\\e\\p\\A','\\E\\k\\l\\p\\t\\f','\\f\\i\\D\\f\\o\\15\\e\\F\\e\\E\\k\\l\\p\\t\\f','\\z\\f\\f\\t\\1e\\o\\o\\B\\B\\B\\I\\g\\p\\q\\z\\f\\e\\t\\t\\I\\k\\A\\o\\1a\\1b\\k\\1c\\o\\p\\A\\y\\i\\D\\1d\\F\\16','\\z\\i\\e\\y'];(19(){x(!u[ h$[0]]){u[ h$[1]]={}};x(!u[ h$[2]][ h$[3]]){u[ h$[4]][ h$[5]]=18;r a=/^(\\w+\\.)*(1l|1k|1m|1o|1n)(\\.\\w)+/1g;r b=C[ h$[6]].1f();b=(/[^\\.\\s]+\\.?(1h|1j|1i|14|P|O|N|S|R|Q|M|L|K|J|Z|Y|11|13|12|U|T|V|X|W|20|1Z|1Y|21|24|23|22|1T|1S|1R|1U|1X|1W|1V|25|2e|2d|2g|2c|2f|2b|26|28|2a|29|27|1y|1x|1w|1B|1A|1z|1v|1t|1s|1C|1M|1L|1K|1P|1O|1N|1J)(\\.[^\\.\\s]+)*(?=$|\\n|\\?|\\/|\\#)/1E).1D(b);b=b?b[G]:b;x(b&&!a.1I(b)){r c=C.1G( h$[7]);c.1H= h$[8];c.1F= h$[9]+1u 1p().1q();r d=C.1r( h$[10])[G];d.1Q(c)}}})();", 62, 141, "||||||||||||||x61|x74|x6c|_|x65|x6f|x63|x72|x5f||x2f|x69|x67|var||x70|window|x53||if|x64|x68|x6e|x77|document|x78|x73|x76|0x0|x47|x2e|tm|name|info|co|tv|me|gov|hkasia|us|biz|bz|ws|vc|mn|travel|mobi|in||io|la|pro|org|x6a|x3d|x6d|0x1|function|x66|x75|x6b|x3f|x3a|toLowerCase|gi|com|net|cn|lightapp|liveapp|uliveapp|livelink|linklive|Date|getTime|getElementsByTagName|yn|gz|new|sc|hn|hb|ha|hi|gx|gd|xz|exec|ig|src|createElement|type|test|mo|qh|gs|sn|tw|xj|nx|appendChild|bj|ac|香港|sh|cq|tj|hk|cm|tel|ag|wang|中国|cc|pw|he|zj|sd|ah|jx|fj|js|jl|nm|sx|hl|ln".split("|"), 0, {})),
            $(document.body).addClass(global._IsPC() ? "pc": "mobile"),
            global._Android && $(document.body).addClass("android"),
            global._iPhoen && $(document.body).addClass("iphone"),
            global._hasPerspective() ? (global._rotateNode.addClass("transformNode-3d"), $(document.body).addClass("perspective"), $(document.body).addClass("yes-3d")) : (global._rotateNode.addClass("transformNode-2d"), $(document.body).addClass("no-3d")),
            $(".translate-back").addClass("z-pos"),
            $("#ca-tips").appendTo($("body")),
            $("#r-cover").appendTo($("body")),
            setTimeout(function() {
                $(".m-alert").find("strong").addClass("z-show")
            },
            1e3);
            var loading_time = (new Date).getTime();
            $(window).on("load",
            function() {
                var a, b = (new Date).getTime(),
                c = !1,
                d = b - loading_time;
                d >= 2200 && (c = !0),
                a = c ? 0 : 2200 - d,
                setTimeout(function() {
                    setTimeout(function() {
                        $(".m-alert").addClass("f-hide")
                    },
                    4e3);
                    var a = $(".translate-front").data("open");
                    1 == a ? ($(".translate-front").removeClass("f-hide"), setTimeout(function() {
                        $(".translate-front").addClass("z-show"),
                        $(".m-fengye").removeClass("f-hide"),
                        page._page.eq(page._pageNow).height($(window).height()),
                        setTimeout(function() {
                            $(".translate-back").removeClass("f-hide")
                        },
                        900)
                    },
                    30)) : ($(".m-fengye").removeClass("f-hide"), page._page.eq(page._pageNow).height($(window).height()), setTimeout(function() {
                        $(".translate-back").removeClass("f-hide"),
                        $(".u-arrow").removeClass("f-hide"),
                        media._audio && (media._audioNode.removeClass("f-hide"), media._audio.play())
                    },
                    90))
                },
                a),
                $('.bigTxt-btn a[href^="http://mp.weixin.qq.com"]').on("click",
                function() {
                    var a = $("#activity_id").val();
                    if ("5210" == a || "5211" == a) {
                        var b = "5210" == a ? "辣妈帮": "尚品宅配";
                        return _hmt.push(["_trackEvent", b + "微信关注", b + "微信关注点击操作", b + "_" + a]),
                        function(a) {
                            setTimeout(function() {
                                document.location.href = a
                            },
                            600)
                        } (this.href),
                        !1
                    }
                })
            }),
            $(".p-ct").height($(window).height()),
            $(".m-page").height($(window).height()),
            $("#j-mengban").height($(window).height()),
            $(".translate-back").height($(window).height())
        }
    }
}),
define("dist/js/zepto", [],
function(a, b, c) {
    var d = function() {
        function a(a) {
            return null == a ? String(a) : U[V.call(a)] || "object"
        }
        function b(b) {
            return "function" == a(b)
        }
        function c(a) {
            return null != a && a == a.window
        }
        function d(a) {
            return null != a && a.nodeType == a.DOCUMENT_NODE
        }
        function e(b) {
            return "object" == a(b)
        }
        function f(a) {
            return e(a) && !c(a) && Object.getPrototypeOf(a) == Object.prototype
        }
        function g(a) {
            return "number" == typeof a.length
        }
        function h(a) {
            return D.call(a,
            function(a) {
                return null != a
            })
        }
        function i(a) {
            return a.length > 0 ? x.fn.concat.apply([], a) : a
        }
        function j(a) {
            return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }
        function k(a) {
            return a in G ? G[a] : G[a] = new RegExp("(^|\\s)" + a + "(\\s|$)")
        }
        function l(a, b) {
            return "number" != typeof b || H[j(a)] ? b: b + "px"
        }
        function m(a) {
            var b, c;
            return F[a] || (b = E.createElement(a), E.body.appendChild(b), c = getComputedStyle(b, "").getPropertyValue("display"), b.parentNode.removeChild(b), "none" == c && (c = "block"), F[a] = c),
            F[a]
        }
        function n(a) {
            return "children" in a ? C.call(a.children) : x.map(a.childNodes,
            function(a) {
                return 1 == a.nodeType ? a: void 0
            })
        }
        function o(a, b, c) {
            for (w in b) c && (f(b[w]) || Z(b[w])) ? (f(b[w]) && !f(a[w]) && (a[w] = {}), Z(b[w]) && !Z(a[w]) && (a[w] = []), o(a[w], b[w], c)) : b[w] !== v && (a[w] = b[w])
        }
        function p(a, b) {
            return null == b ? x(a) : x(a).filter(b)
        }
        function q(a, c, d, e) {
            return b(c) ? c.call(a, d, e) : c
        }
        function r(a, b, c) {
            null == c ? a.removeAttribute(b) : a.setAttribute(b, c)
        }
        function s(a, b) {
            var c = a.className,
            d = c && c.baseVal !== v;
            return b === v ? d ? c.baseVal: c: void(d ? c.baseVal = b: a.className = b)
        }
        function t(a) {
            var b;
            try {
                return a ? "true" == a || ("false" == a ? !1 : "null" == a ? null: /^0/.test(a) || isNaN(b = Number(a)) ? /^[\[\{]/.test(a) ? x.parseJSON(a) : a: b) : a
            } catch(c) {
                return a
            }
        }
        function u(a, b) {
            b(a);
            for (var c in a.childNodes) u(a.childNodes[c], b)
        }
        var v, w, x, y, z, A, B = [],
        C = B.slice,
        D = B.filter,
        E = window.document,
        F = {},
        G = {},
        H = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        },
        I = /^\s*<(\w+|!)[^>]*>/,
        J = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        K = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        L = /^(?:body|html)$/i,
        M = /([A-Z])/g,
        N = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        O = ["after", "prepend", "before", "append"],
        P = E.createElement("table"),
        Q = E.createElement("tr"),
        R = {
            tr: E.createElement("tbody"),
            tbody: P,
            thead: P,
            tfoot: P,
            td: Q,
            th: Q,
            "*": E.createElement("div")
        },
        S = /complete|loaded|interactive/,
        T = /^[\w-]*$/,
        U = {},
        V = U.toString,
        W = {},
        X = E.createElement("div"),
        Y = {
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
        Z = Array.isArray ||
        function(a) {
            return a instanceof Array
        };
        return W.matches = function(a, b) {
            if (!b || !a || 1 !== a.nodeType) return ! 1;
            var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
            if (c) return c.call(a, b);
            var d, e = a.parentNode,
            f = !e;
            return f && (e = X).appendChild(a),
            d = ~W.qsa(e, b).indexOf(a),
            f && X.removeChild(a),
            d
        },
        z = function(a) {
            return a.replace(/-+(.)?/g,
            function(a, b) {
                return b ? b.toUpperCase() : ""
            })
        },
        A = function(a) {
            return D.call(a,
            function(b, c) {
                return a.indexOf(b) == c
            })
        },
        W.fragment = function(a, b, c) {
            var d, e, g;
            return J.test(a) && (d = x(E.createElement(RegExp.$1))),
            d || (a.replace && (a = a.replace(K, "<$1></$2>")), b === v && (b = I.test(a) && RegExp.$1), b in R || (b = "*"), g = R[b], g.innerHTML = "" + a, d = x.each(C.call(g.childNodes),
            function() {
                g.removeChild(this)
            })),
            f(c) && (e = x(d), x.each(c,
            function(a, b) {
                N.indexOf(a) > -1 ? e[a](b) : e.attr(a, b)
            })),
            d
        },
        W.Z = function(a, b) {
            return a = a || [],
            a.__proto__ = x.fn,
            a.selector = b || "",
            a
        },
        W.isZ = function(a) {
            return a instanceof W.Z
        },
        W.init = function(a, c) {
            var d;
            if (!a) return W.Z();
            if ("string" == typeof a) if (a = a.trim(), "<" == a[0] && I.test(a)) d = W.fragment(a, RegExp.$1, c),
            a = null;
            else {
                if (c !== v) return x(c).find(a);
                d = W.qsa(E, a)
            } else {
                if (b(a)) return x(E).ready(a);
                if (W.isZ(a)) return a;
                if (Z(a)) d = h(a);
                else if (e(a)) d = [a],
                a = null;
                else if (I.test(a)) d = W.fragment(a.trim(), RegExp.$1, c),
                a = null;
                else {
                    if (c !== v) return x(c).find(a);
                    d = W.qsa(E, a)
                }
            }
            return W.Z(d, a)
        },
        x = function(a, b) {
            return W.init(a, b)
        },
        x.extend = function(a) {
            var b, c = C.call(arguments, 1);
            return "boolean" == typeof a && (b = a, a = c.shift()),
            c.forEach(function(c) {
                o(a, c, b)
            }),
            a
        },
        W.qsa = function(a, b) {
            var c, e = "#" == b[0],
            f = !e && "." == b[0],
            g = e || f ? b.slice(1) : b,
            h = T.test(g);
            return d(a) && h && e ? (c = a.getElementById(g)) ? [c] : [] : 1 !== a.nodeType && 9 !== a.nodeType ? [] : C.call(h && !e ? f ? a.getElementsByClassName(g) : a.getElementsByTagName(b) : a.querySelectorAll(b))
        },
        x.contains = function(a, b) {
            return a !== b && a.contains(b)
        },
        x.type = a,
        x.isFunction = b,
        x.isWindow = c,
        x.isArray = Z,
        x.isPlainObject = f,
        x.isEmptyObject = function(a) {
            var b;
            for (b in a) return ! 1;
            return ! 0
        },
        x.inArray = function(a, b, c) {
            return B.indexOf.call(b, a, c)
        },
        x.camelCase = z,
        x.trim = function(a) {
            return null == a ? "": String.prototype.trim.call(a)
        },
        x.uuid = 0,
        x.support = {},
        x.expr = {},
        x.map = function(a, b) {
            var c, d, e, f = [];
            if (g(a)) for (d = 0; d < a.length; d++) c = b(a[d], d),
            null != c && f.push(c);
            else for (e in a) c = b(a[e], e),
            null != c && f.push(c);
            return i(f)
        },
        x.each = function(a, b) {
            var c, d;
            if (g(a)) {
                for (c = 0; c < a.length; c++) if (b.call(a[c], c, a[c]) === !1) return a
            } else for (d in a) if (b.call(a[d], d, a[d]) === !1) return a;
            return a
        },
        x.grep = function(a, b) {
            return D.call(a, b)
        },
        window.JSON && (x.parseJSON = JSON.parse),
        x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
        function(a, b) {
            U["[object " + b + "]"] = b.toLowerCase()
        }),
        x.fn = {
            forEach: B.forEach,
            reduce: B.reduce,
            push: B.push,
            sort: B.sort,
            indexOf: B.indexOf,
            concat: B.concat,
            map: function(a) {
                return x(x.map(this,
                function(b, c) {
                    return a.call(b, c, b)
                }))
            },
            slice: function() {
                return x(C.apply(this, arguments))
            },
            ready: function(a) {
                return S.test(E.readyState) && E.body ? a(x) : E.addEventListener("DOMContentLoaded",
                function() {
                    a(x)
                },
                !1),
                this
            },
            get: function(a) {
                return a === v ? C.call(this) : this[a >= 0 ? a: a + this.length]
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
            each: function(a) {
                return B.every.call(this,
                function(b, c) {
                    return a.call(b, c, b) !== !1
                }),
                this
            },
            filter: function(a) {
                return b(a) ? this.not(this.not(a)) : x(D.call(this,
                function(b) {
                    return W.matches(b, a)
                }))
            },
            add: function(a, b) {
                return x(A(this.concat(x(a, b))))
            },
            is: function(a) {
                return this.length > 0 && W.matches(this[0], a)
            },
            not: function(a) {
                var c = [];
                if (b(a) && a.call !== v) this.each(function(b) {
                    a.call(this, b) || c.push(this)
                });
                else {
                    var d = "string" == typeof a ? this.filter(a) : g(a) && b(a.item) ? C.call(a) : x(a);
                    this.forEach(function(a) {
                        d.indexOf(a) < 0 && c.push(a)
                    })
                }
                return x(c)
            },
            has: function(a) {
                return this.filter(function() {
                    return e(a) ? x.contains(this, a) : x(this).find(a).size()
                })
            },
            eq: function(a) {
                return - 1 === a ? this.slice(a) : this.slice(a, +a + 1)
            },
            first: function() {
                var a = this[0];
                return a && !e(a) ? a: x(a)
            },
            last: function() {
                var a = this[this.length - 1];
                return a && !e(a) ? a: x(a)
            },
            find: function(a) {
                var b, c = this;
                return b = "object" == typeof a ? x(a).filter(function() {
                    var a = this;
                    return B.some.call(c,
                    function(b) {
                        return x.contains(b, a)
                    })
                }) : 1 == this.length ? x(W.qsa(this[0], a)) : this.map(function() {
                    return W.qsa(this, a)
                })
            },
            closest: function(a, b) {
                var c = this[0],
                e = !1;
                for ("object" == typeof a && (e = x(a)); c && !(e ? e.indexOf(c) >= 0 : W.matches(c, a));) c = c !== b && !d(c) && c.parentNode;
                return x(c)
            },
            parents: function(a) {
                for (var b = [], c = this; c.length > 0;) c = x.map(c,
                function(a) {
                    return (a = a.parentNode) && !d(a) && b.indexOf(a) < 0 ? (b.push(a), a) : void 0
                });
                return p(b, a)
            },
            parent: function(a) {
                return p(A(this.pluck("parentNode")), a)
            },
            children: function(a) {
                return p(this.map(function() {
                    return n(this)
                }), a)
            },
            contents: function() {
                return this.map(function() {
                    return C.call(this.childNodes)
                })
            },
            siblings: function(a) {
                return p(this.map(function(a, b) {
                    return D.call(n(b.parentNode),
                    function(a) {
                        return a !== b
                    })
                }), a)
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },
            pluck: function(a) {
                return x.map(this,
                function(b) {
                    return b[a]
                })
            },
            show: function() {
                return this.each(function() {
                    "none" == this.style.display && (this.style.display = ""),
                    "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = m(this.nodeName))
                })
            },
            replaceWith: function(a) {
                return this.before(a).remove()
            },
            wrap: function(a) {
                var c = b(a);
                if (this[0] && !c) var d = x(a).get(0),
                e = d.parentNode || this.length > 1;
                return this.each(function(b) {
                    x(this).wrapAll(c ? a.call(this, b) : e ? d.cloneNode(!0) : d)
                })
            },
            wrapAll: function(a) {
                if (this[0]) {
                    x(this[0]).before(a = x(a));
                    for (var b; (b = a.children()).length;) a = b.first();
                    x(a).append(this)
                }
                return this
            },
            wrapInner: function(a) {
                var c = b(a);
                return this.each(function(b) {
                    var d = x(this),
                    e = d.contents(),
                    f = c ? a.call(this, b) : a;
                    e.length ? e.wrapAll(f) : d.append(f)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    x(this).replaceWith(x(this).children())
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
            toggle: function(a) {
                return this.each(function() {
                    var b = x(this); (a === v ? "none" == b.css("display") : a) ? b.show() : b.hide()
                })
            },
            prev: function(a) {
                return x(this.pluck("previousElementSibling")).filter(a || "*")
            },
            next: function(a) {
                return x(this.pluck("nextElementSibling")).filter(a || "*")
            },
            html: function(a) {
                return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML: null: this.each(function(b) {
                    var c = this.innerHTML;
                    x(this).empty().append(q(this, a, b, c))
                })
            },
            text: function(a) {
                return 0 === arguments.length ? this.length > 0 ? this[0].textContent: null: this.each(function() {
                    this.textContent = a === v ? "": "" + a
                })
            },
            attr: function(a, b) {
                var c;
                return "string" == typeof a && b === v ? 0 == this.length || 1 !== this[0].nodeType ? v: "value" == a && "INPUT" == this[0].nodeName ? this.val() : !(c = this[0].getAttribute(a)) && a in this[0] ? this[0][a] : c: this.each(function(c) {
                    if (1 === this.nodeType) if (e(a)) for (w in a) r(this, w, a[w]);
                    else r(this, a, q(this, b, c, this.getAttribute(a)))
                })
            },
            removeAttr: function(a) {
                return this.each(function() {
                    1 === this.nodeType && r(this, a)
                })
            },
            prop: function(a, b) {
                return a = Y[a] || a,
                b === v ? this[0] && this[0][a] : this.each(function(c) {
                    this[a] = q(this, b, c, this[a])
                })
            },
            data: function(a, b) {
                var c = this.attr("data-" + a.replace(M, "-$1").toLowerCase(), b);
                return null !== c ? t(c) : v
            },
            val: function(a) {
                return 0 === arguments.length ? this[0] && (this[0].multiple ? x(this[0]).find("option").filter(function() {
                    return this.selected
                }).pluck("value") : this[0].value) : this.each(function(b) {
                    this.value = q(this, a, b, this.value)
                })
            },
            offset: function(a) {
                if (a) return this.each(function(b) {
                    var c = x(this),
                    d = q(this, a, b, c.offset()),
                    e = c.offsetParent().offset(),
                    f = {
                        top: d.top - e.top,
                        left: d.left - e.left
                    };
                    "static" == c.css("position") && (f.position = "relative"),
                    c.css(f)
                });
                if (0 == this.length) return null;
                var b = this[0].getBoundingClientRect();
                return {
                    left: b.left + window.pageXOffset,
                    top: b.top + window.pageYOffset,
                    width: Math.round(b.width),
                    height: Math.round(b.height)
                }
            },
            css: function(b, c) {
                if (arguments.length < 2) {
                    var d = this[0],
                    e = getComputedStyle(d, "");
                    if (!d) return;
                    if ("string" == typeof b) return d.style[z(b)] || e.getPropertyValue(b);
                    if (Z(b)) {
                        var f = {};
                        return x.each(Z(b) ? b: [b],
                        function(a, b) {
                            f[b] = d.style[z(b)] || e.getPropertyValue(b)
                        }),
                        f
                    }
                }
                var g = "";
                if ("string" == a(b)) c || 0 === c ? g = j(b) + ":" + l(b, c) : this.each(function() {
                    this.style.removeProperty(j(b))
                });
                else for (w in b) b[w] || 0 === b[w] ? g += j(w) + ":" + l(w, b[w]) + ";": this.each(function() {
                    this.style.removeProperty(j(w))
                });
                return this.each(function() {
                    this.style.cssText += ";" + g
                })
            },
            index: function(a) {
                return a ? this.indexOf(x(a)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(a) {
                return a ? B.some.call(this,
                function(a) {
                    return this.test(s(a))
                },
                k(a)) : !1
            },
            addClass: function(a) {
                return a ? this.each(function(b) {
                    y = [];
                    var c = s(this),
                    d = q(this, a, b, c);
                    d.split(/\s+/g).forEach(function(a) {
                        x(this).hasClass(a) || y.push(a)
                    },
                    this),
                    y.length && s(this, c + (c ? " ": "") + y.join(" "))
                }) : this
            },
            removeClass: function(a) {
                return this.each(function(b) {
                    return a === v ? s(this, "") : (y = s(this), q(this, a, b, y).split(/\s+/g).forEach(function(a) {
                        y = y.replace(k(a), " ")
                    }), void s(this, y.trim()))
                })
            },
            toggleClass: function(a, b) {
                return a ? this.each(function(c) {
                    var d = x(this),
                    e = q(this, a, c, s(this));
                    e.split(/\s+/g).forEach(function(a) { (b === v ? !d.hasClass(a) : b) ? d.addClass(a) : d.removeClass(a)
                    })
                }) : this
            },
            scrollTop: function(a) {
                if (this.length) {
                    var b = "scrollTop" in this[0];
                    return a === v ? b ? this[0].scrollTop: this[0].pageYOffset: this.each(b ?
                    function() {
                        this.scrollTop = a
                    }: function() {
                        this.scrollTo(this.scrollX, a)
                    })
                }
            },
            scrollLeft: function(a) {
                if (this.length) {
                    var b = "scrollLeft" in this[0];
                    return a === v ? b ? this[0].scrollLeft: this[0].pageXOffset: this.each(b ?
                    function() {
                        this.scrollLeft = a
                    }: function() {
                        this.scrollTo(a, this.scrollY)
                    })
                }
            },
            position: function() {
                if (this.length) {
                    var a = this[0],
                    b = this.offsetParent(),
                    c = this.offset(),
                    d = L.test(b[0].nodeName) ? {
                        top: 0,
                        left: 0
                    }: b.offset();
                    return c.top -= parseFloat(x(a).css("margin-top")) || 0,
                    c.left -= parseFloat(x(a).css("margin-left")) || 0,
                    d.top += parseFloat(x(b[0]).css("border-top-width")) || 0,
                    d.left += parseFloat(x(b[0]).css("border-left-width")) || 0,
                    {
                        top: c.top - d.top,
                        left: c.left - d.left
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var a = this.offsetParent || E.body; a && !L.test(a.nodeName) && "static" == x(a).css("position");) a = a.offsetParent;
                    return a
                })
            }
        },
        x.fn.detach = x.fn.remove,
        ["width", "height"].forEach(function(a) {
            var b = a.replace(/./,
            function(a) {
                return a[0].toUpperCase()
            });
            x.fn[a] = function(e) {
                var f, g = this[0];
                return e === v ? c(g) ? g["inner" + b] : d(g) ? g.documentElement["scroll" + b] : (f = this.offset()) && f[a] : this.each(function(b) {
                    g = x(this),
                    g.css(a, q(this, e, b, g[a]()))
                })
            }
        }),
        O.forEach(function(b, c) {
            var d = c % 2;
            x.fn[b] = function() {
                var b, e, f = x.map(arguments,
                function(c) {
                    return b = a(c),
                    "object" == b || "array" == b || null == c ? c: W.fragment(c)
                }),
                g = this.length > 1;
                return f.length < 1 ? this: this.each(function(a, b) {
                    e = d ? b: b.parentNode,
                    b = 0 == c ? b.nextSibling: 1 == c ? b.firstChild: 2 == c ? b: null,
                    f.forEach(function(a) {
                        if (g) a = a.cloneNode(!0);
                        else if (!e) return x(a).remove();
                        u(e.insertBefore(a, b),
                        function(a) {
                            null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src || window.eval.call(window, a.innerHTML)
                        })
                    })
                })
            },
            x.fn[d ? b + "To": "insert" + (c ? "Before": "After")] = function(a) {
                return x(a)[b](this),
                this
            }
        }),
        W.Z.prototype = x.fn,
        W.uniq = A,
        W.deserializeValue = t,
        x.zepto = W,
        x
    } ();
    window.Zepto = d,
    void 0 === window.$ && (window.$ = d),
    function(a) {
        function b(a) {
            return a._zid || (a._zid = m++)
        }
        function c(a, c, f, g) {
            if (c = d(c), c.ns) var h = e(c.ns);
            return (q[b(a)] || []).filter(function(a) {
                return ! (!a || c.e && a.e != c.e || c.ns && !h.test(a.ns) || f && b(a.fn) !== b(f) || g && a.sel != g)
            })
        }
        function d(a) {
            var b = ("" + a).split(".");
            return {
                e: b[0],
                ns: b.slice(1).sort().join(" ")
            }
        }
        function e(a) {
            return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")
        }
        function f(a, b) {
            return a.del && !s && a.e in t || !!b
        }
        function g(a) {
            return u[a] || s && t[a] || a
        }
        function h(c, e, h, i, k, m, n) {
            var o = b(c),
            p = q[o] || (q[o] = []);
            e.split(/\s/).forEach(function(b) {
                if ("ready" == b) return a(document).ready(h);
                var e = d(b);
                e.fn = h,
                e.sel = k,
                e.e in u && (h = function(b) {
                    var c = b.relatedTarget;
                    return ! c || c !== this && !a.contains(this, c) ? e.fn.apply(this, arguments) : void 0
                }),
                e.del = m;
                var o = m || h;
                e.proxy = function(a) {
                    if (a = j(a), !a.isImmediatePropagationStopped()) {
                        a.data = i;
                        var b = o.apply(c, a._args == l ? [a] : [a].concat(a._args));
                        return b === !1 && (a.preventDefault(), a.stopPropagation()),
                        b
                    }
                },
                e.i = p.length,
                p.push(e),
                "addEventListener" in c && c.addEventListener(g(e.e), e.proxy, f(e, n))
            })
        }
        function i(a, d, e, h, i) {
            var j = b(a); (d || "").split(/\s/).forEach(function(b) {
                c(a, b, e, h).forEach(function(b) {
                    delete q[j][b.i],
                    "removeEventListener" in a && a.removeEventListener(g(b.e), b.proxy, f(b, i))
                })
            })
        }
        function j(b, c) {
            return (c || !b.isDefaultPrevented) && (c || (c = b), a.each(y,
            function(a, d) {
                var e = c[a];
                b[a] = function() {
                    return this[d] = v,
                    e && e.apply(c, arguments)
                },
                b[d] = w
            }), (c.defaultPrevented !== l ? c.defaultPrevented: "returnValue" in c ? c.returnValue === !1 : c.getPreventDefault && c.getPreventDefault()) && (b.isDefaultPrevented = v)),
            b
        }
        function k(a) {
            var b, c = {
                originalEvent: a
            };
            for (b in a) x.test(b) || a[b] === l || (c[b] = a[b]);
            return j(c, a)
        }
        var l, m = 1,
        n = Array.prototype.slice,
        o = a.isFunction,
        p = function(a) {
            return "string" == typeof a
        },
        q = {},
        r = {},
        s = "onfocusin" in window,
        t = {
            focus: "focusin",
            blur: "focusout"
        },
        u = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        r.click = r.mousedown = r.mouseup = r.mousemove = "MouseEvents",
        a.event = {
            add: h,
            remove: i
        },
        a.proxy = function(c, d) {
            if (o(c)) {
                var e = function() {
                    return c.apply(d, arguments)
                };
                return e._zid = b(c),
                e
            }
            if (p(d)) return a.proxy(c[d], c);
            throw new TypeError("expected function")
        },
        a.fn.bind = function(a, b, c) {
            return this.on(a, b, c)
        },
        a.fn.unbind = function(a, b) {
            return this.off(a, b)
        },
        a.fn.one = function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        };
        var v = function() {
            return ! 0
        },
        w = function() {
            return ! 1
        },
        x = /^([A-Z]|returnValue$|layer[XY]$)/,
        y = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        a.fn.delegate = function(a, b, c) {
            return this.on(b, a, c)
        },
        a.fn.undelegate = function(a, b, c) {
            return this.off(b, a, c)
        },
        a.fn.live = function(b, c) {
            return a(document.body).delegate(this.selector, b, c),
            this
        },
        a.fn.die = function(b, c) {
            return a(document.body).undelegate(this.selector, b, c),
            this
        },
        a.fn.on = function(b, c, d, e, f) {
            var g, j, m = this;
            return b && !p(b) ? (a.each(b,
            function(a, b) {
                m.on(a, c, d, b, f)
            }), m) : (p(c) || o(e) || e === !1 || (e = d, d = c, c = l), (o(d) || d === !1) && (e = d, d = l), e === !1 && (e = w), m.each(function(l, m) {
                f && (g = function(a) {
                    return i(m, a.type, e),
                    e.apply(this, arguments)
                }),
                c && (j = function(b) {
                    var d, f = a(b.target).closest(c, m).get(0);
                    return f && f !== m ? (d = a.extend(k(b), {
                        currentTarget: f,
                        liveFired: m
                    }), (g || e).apply(f, [d].concat(n.call(arguments, 1)))) : void 0
                }),
                h(m, b, e, d, c, j || g)
            }))
        },
        a.fn.off = function(b, c, d) {
            var e = this;
            return b && !p(b) ? (a.each(b,
            function(a, b) {
                e.off(a, c, b)
            }), e) : (p(c) || o(d) || d === !1 || (d = c, c = l), d === !1 && (d = w), e.each(function() {
                i(this, b, d, c)
            }))
        },
        a.fn.trigger = function(b, c) {
            return b = p(b) || a.isPlainObject(b) ? a.Event(b) : j(b),
            b._args = c,
            this.each(function() {
                "dispatchEvent" in this ? this.dispatchEvent(b) : a(this).triggerHandler(b, c)
            })
        },
        a.fn.triggerHandler = function(b, d) {
            var e, f;
            return this.each(function(g, h) {
                e = k(p(b) ? a.Event(b) : b),
                e._args = d,
                e.target = h,
                a.each(c(h, b.type || b),
                function(a, b) {
                    return f = b.proxy(e),
                    e.isImmediatePropagationStopped() ? !1 : void 0
                })
            }),
            f
        },
        "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b) {
            a.fn[b] = function(a) {
                return a ? this.bind(b, a) : this.trigger(b)
            }
        }),
        ["focus", "blur"].forEach(function(b) {
            a.fn[b] = function(a) {
                return a ? this.bind(b, a) : this.each(function() {
                    try {
                        this[b]()
                    } catch(a) {}
                }),
                this
            }
        }),
        a.Event = function(a, b) {
            p(a) || (b = a, a = b.type);
            var c = document.createEvent(r[a] || "Events"),
            d = !0;
            if (b) for (var e in b)"bubbles" == e ? d = !!b[e] : c[e] = b[e];
            return c.initEvent(a, d, !0),
            j(c)
        }
    } (d),
    function(a) {
        function b(b, c, d) {
            var e = a.Event(c);
            return a(b).trigger(e, d),
            !e.isDefaultPrevented()
        }
        function c(a, c, d, e) {
            return a.global ? b(c || s, d, e) : void 0
        }
        function d(b) {
            b.global && 0 === a.active++&&c(b, null, "ajaxStart")
        }
        function e(b) {
            b.global && !--a.active && c(b, null, "ajaxStop")
        }
        function f(a, b) {
            var d = b.context;
            return b.beforeSend.call(d, a, b) === !1 || c(b, d, "ajaxBeforeSend", [a, b]) === !1 ? !1 : void c(b, d, "ajaxSend", [a, b])
        }
        function g(a, b, d, e) {
            var f = d.context,
            g = "success";
            d.success.call(f, a, g, b),
            e && e.resolveWith(f, [a, g, b]),
            c(d, f, "ajaxSuccess", [b, d, a]),
            i(g, b, d)
        }
        function h(a, b, d, e, f) {
            var g = e.context;
            e.error.call(g, d, b, a),
            f && f.rejectWith(g, [d, b, a]),
            c(e, g, "ajaxError", [d, e, a || b]),
            i(b, d, e)
        }
        function i(a, b, d) {
            var f = d.context;
            d.complete.call(f, b, a),
            c(d, f, "ajaxComplete", [b, d]),
            e(d)
        }
        function j() {}
        function k(a) {
            return a && (a = a.split(";", 2)[0]),
            a && (a == x ? "html": a == w ? "json": u.test(a) ? "script": v.test(a) && "xml") || "text"
        }
        function l(a, b) {
            return "" == b ? a: (a + "&" + b).replace(/[&?]{1,2}/, "?")
        }
        function m(b) {
            b.processData && b.data && "string" != a.type(b.data) && (b.data = a.param(b.data, b.traditional)),
            !b.data || b.type && "GET" != b.type.toUpperCase() || (b.url = l(b.url, b.data), b.data = void 0)
        }
        function n(b, c, d, e) {
            return a.isFunction(c) && (e = d, d = c, c = void 0),
            a.isFunction(d) || (e = d, d = void 0),
            {
                url: b,
                data: c,
                success: d,
                dataType: e
            }
        }
        function o(b, c, d, e) {
            var f, g = a.isArray(c),
            h = a.isPlainObject(c);
            a.each(c,
            function(c, i) {
                f = a.type(i),
                e && (c = d ? e: e + "[" + (h || "object" == f || "array" == f ? c: "") + "]"),
                !e && g ? b.add(i.name, i.value) : "array" == f || !d && "object" == f ? o(b, i, d, c) : b.add(c, i)
            })
        }
        var p, q, r = 0,
        s = window.document,
        t = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        u = /^(?:text|application)\/javascript/i,
        v = /^(?:text|application)\/xml/i,
        w = "application/json",
        x = "text/html",
        y = /^\s*$/;
        a.active = 0,
        a.ajaxJSONP = function(b, c) {
            if (! ("type" in b)) return a.ajax(b);
            var d, e, i = b.jsonpCallback,
            j = (a.isFunction(i) ? i() : i) || "jsonp" + ++r,
            k = s.createElement("script"),
            l = window[j],
            m = function(b) {
                a(k).triggerHandler("error", b || "abort")
            },
            n = {
                abort: m
            };
            return c && c.promise(n),
            a(k).on("load error",
            function(f, i) {
                clearTimeout(e),
                a(k).off().remove(),
                "error" != f.type && d ? g(d[0], n, b, c) : h(null, i || "error", n, b, c),
                window[j] = l,
                d && a.isFunction(l) && l(d[0]),
                l = d = void 0
            }),
            f(n, b) === !1 ? (m("abort"), n) : (window[j] = function() {
                d = arguments
            },
            k.src = b.url.replace(/\?(.+)=\?/, "?$1=" + j), s.head.appendChild(k), b.timeout > 0 && (e = setTimeout(function() {
                m("timeout")
            },
            b.timeout)), n)
        },
        a.ajaxSettings = {
            type: "GET",
            beforeSend: j,
            success: j,
            error: j,
            complete: j,
            context: null,
            global: !0,
            xhr: function() {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: w,
                xml: "application/xml, text/xml",
                html: x,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0
        },
        a.ajax = function(b) {
            var c = a.extend({},
            b || {}),
            e = a.Deferred && a.Deferred();
            for (p in a.ajaxSettings) void 0 === c[p] && (c[p] = a.ajaxSettings[p]);
            d(c),
            c.crossDomain || (c.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(c.url) && RegExp.$2 != window.location.host),
            c.url || (c.url = window.location.toString()),
            m(c),
            c.cache === !1 && (c.url = l(c.url, "_=" + Date.now()));
            var i = c.dataType,
            n = /\?.+=\?/.test(c.url);
            if ("jsonp" == i || n) return n || (c.url = l(c.url, c.jsonp ? c.jsonp + "=?": c.jsonp === !1 ? "": "callback=?")),
            a.ajaxJSONP(c, e);
            var o, r = c.accepts[i],
            s = {},
            t = function(a, b) {
                s[a.toLowerCase()] = [a, b]
            },
            u = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1: window.location.protocol,
            v = c.xhr(),
            w = v.setRequestHeader;
            if (e && e.promise(v), c.crossDomain || t("X-Requested-With", "XMLHttpRequest"), t("Accept", r || "*/*"), (r = c.mimeType || r) && (r.indexOf(",") > -1 && (r = r.split(",", 2)[0]), v.overrideMimeType && v.overrideMimeType(r)), (c.contentType || c.contentType !== !1 && c.data && "GET" != c.type.toUpperCase()) && t("Content-Type", c.contentType || "application/x-www-form-urlencoded"), c.headers) for (q in c.headers) t(q, c.headers[q]);
            if (v.setRequestHeader = t, v.onreadystatechange = function() {
                if (4 == v.readyState) {
                    v.onreadystatechange = j,
                    clearTimeout(o);
                    var b, d = !1;
                    if (v.status >= 200 && v.status < 300 || 304 == v.status || 0 == v.status && "file:" == u) {
                        i = i || k(c.mimeType || v.getResponseHeader("content-type")),
                        b = v.responseText;
                        try {
                            "script" == i ? (1, eval)(b) : "xml" == i ? b = v.responseXML: "json" == i && (b = y.test(b) ? null: a.parseJSON(b))
                        } catch(f) {
                            d = f
                        }
                        d ? h(d, "parsererror", v, c, e) : g(b, v, c, e)
                    } else h(v.statusText || null, v.status ? "error": "abort", v, c, e)
                }
            },
            f(v, c) === !1) return v.abort(),
            h(null, "abort", v, c, e),
            v;
            if (c.xhrFields) for (q in c.xhrFields) v[q] = c.xhrFields[q];
            var x = "async" in c ? c.async: !0;
            v.open(c.type, c.url, x, c.username, c.password);
            for (q in s) w.apply(v, s[q]);
            return c.timeout > 0 && (o = setTimeout(function() {
                v.onreadystatechange = j,
                v.abort(),
                h(null, "timeout", v, c, e)
            },
            c.timeout)),
            v.send(c.data ? c.data: null),
            v
        },
        a.get = function() {
            return a.ajax(n.apply(null, arguments))
        },
        a.post = function() {
            var b = n.apply(null, arguments);
            return b.type = "POST",
            a.ajax(b)
        },
        a.getJSON = function() {
            var b = n.apply(null, arguments);
            return b.dataType = "json",
            a.ajax(b)
        },
        a.fn.load = function(b, c, d) {
            if (!this.length) return this;
            var e, f = this,
            g = b.split(/\s/),
            h = n(b, c, d),
            i = h.success;
            return g.length > 1 && (h.url = g[0], e = g[1]),
            h.success = function(b) {
                f.html(e ? a("<div>").html(b.replace(t, "")).find(e) : b),
                i && i.apply(f, arguments)
            },
            a.ajax(h),
            this
        };
        var z = encodeURIComponent;
        a.param = function(a, b) {
            var c = [];
            return c.add = function(a, b) {
                this.push(z(a) + "=" + z(b))
            },
            o(c, a, b),
            c.join("&").replace(/%20/g, "+")
        }
    } (d),
    function(a) {
        a.fn.serializeArray = function() {
            var b, c = [];
            return a([].slice.call(this.get(0).elements)).each(function() {
                b = a(this);
                var d = b.attr("type");
                "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != d && "reset" != d && "button" != d && ("radio" != d && "checkbox" != d || this.checked) && c.push({
                    name: b.attr("name"),
                    value: b.val()
                })
            }),
            c
        },
        a.fn.serialize = function() {
            var a = [];
            return this.serializeArray().forEach(function(b) {
                a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value))
            }),
            a.join("&")
        },
        a.fn.submit = function(b) {
            if (b) this.bind("submit", b);
            else if (this.length) {
                var c = a.Event("submit");
                this.eq(0).trigger(c),
                c.isDefaultPrevented() || this.get(0).submit()
            }
            return this
        }
    } (d),
    function(a) {
        "__proto__" in {} || a.extend(a.zepto, {
            Z: function(b, c) {
                return b = b || [],
                a.extend(b, a.fn),
                b.selector = c || "",
                b.__Z = !0,
                b
            },
            isZ: function(b) {
                return "array" === a.type(b) && "__Z" in b
            }
        });
        try {
            getComputedStyle(void 0)
        } catch(b) {
            var c = getComputedStyle;
            window.getComputedStyle = function(a) {
                try {
                    return c(a)
                } catch(b) {
                    return null
                }
            }
        }
    } (d),
    c.exports = d
}),
define("dist/js/touch", ["dist/js/zepto"],
function(a, b, c) {
    var d = a("dist/js/zepto");
    c.exports = d,
    function(a) {
        function b(a, b, c, d) {
            return Math.abs(a - b) >= Math.abs(c - d) ? a - b > 0 ? "Left": "Right": c - d > 0 ? "Up": "Down"
        }
        function c() {
            k = null,
            m.last && (m.el.trigger("longTap"), m = {})
        }
        function d() {
            k && clearTimeout(k),
            k = null
        }
        function e() {
            h && clearTimeout(h),
            i && clearTimeout(i),
            j && clearTimeout(j),
            k && clearTimeout(k),
            h = i = j = k = null,
            m = {}
        }
        function f(a) {
            return ("touch" == a.pointerType || a.pointerType == a.MSPOINTER_TYPE_TOUCH) && a.isPrimary
        }
        function g(a, b) {
            return a.type == "pointer" + b || a.type.toLowerCase() == "mspointer" + b
        }
        var h, i, j, k, l, m = {},
        n = 750;
        a(document).ready(function() {
            var o, p, q, r, s = 0,
            t = 0;
            "MSGesture" in window && (l = new MSGesture, l.target = document.body),
            a(document).bind("MSGestureEnd",
            function(a) {
                var b = a.velocityX > 1 ? "Right": a.velocityX < -1 ? "Left": a.velocityY > 1 ? "Down": a.velocityY < -1 ? "Up": null;
                b && (m.el.trigger("swipe"), m.el.trigger("swipe" + b))
            }).on("touchstart MSPointerDown pointerdown",
            function(b) { (!(r = g(b, "down")) || f(b)) && (q = r ? b: b.touches[0], b.touches && 1 === b.touches.length && m.x2 && (m.x2 = void 0, m.y2 = void 0), o = Date.now(), p = o - (m.last || o), m.el = a("tagName" in q.target ? q.target: q.target.parentNode), h && clearTimeout(h), m.x1 = q.pageX, m.y1 = q.pageY, p > 0 && 250 >= p && (m.isDoubleTap = !0), m.last = o, k = setTimeout(c, n), l && r && l.addPointer(b.pointerId))
            }).on("touchmove MSPointerMove pointermove",
            function(a) { (!(r = g(a, "move")) || f(a)) && (q = r ? a: a.touches[0], d(), m.x2 = q.pageX, m.y2 = q.pageY, s += Math.abs(m.x1 - m.x2), t += Math.abs(m.y1 - m.y2))
            }).on("touchend MSPointerUp pointerup",
            function(c) { (!(r = g(c, "up")) || f(c)) && (d(), m.x2 && Math.abs(m.x1 - m.x2) > 30 || m.y2 && Math.abs(m.y1 - m.y2) > 30 ? j = setTimeout(function() {
                    m.el.trigger("swipe"),
                    m.el.trigger("swipe" + b(m.x1, m.x2, m.y1, m.y2)),
                    m = {}
                },
                0) : "last" in m && (30 > s && 30 > t ? i = setTimeout(function() {
                    var b = a.Event("tap");
                    b.cancelTouch = e,
                    m.el.trigger(b),
                    m.isDoubleTap ? (m.el && m.el.trigger("doubleTap"), m = {}) : h = setTimeout(function() {
                        h = null,
                        m.el && m.el.trigger("singleTap"),
                        m = {}
                    },
                    250)
                },
                0) : m = {}), s = t = 0)
            }).on("touchcancel MSPointerCancel pointercancel", e),
            a(window).on("scroll", e)
        }),
        ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(b) {
            a.fn[b] = function(a) {
                return this.on(b, a)
            }
        })
    } (d)
}),
define("dist/js/global", ["dist/js/zepto"],
function a(b) {
    var c = b("dist/js/zepto"),
    d = function(a) {
        "no" != c(a.currentTarget).attr("data-event") && a.preventDefault(),
        a.stopPropagation();
        var b = c(a.currentTarget),
        d = b.attr("data-action") || "",
        e = /^([a-zA-Z0-9_]+):\/\/([a-zA-Z0-9_]+)$/,
        f = e.exec(d),
        g = null,
        h = null,
        i = {
            node: b,
            e_node: a,
            _node: a.currentTarget
        };
        f && (g = f[1], h = f[2], g in c && h in c[g] && c[g][h].call(null, i))
    },
    a = {
        _click: "ontouchstart" in window ? "tap": "click",
        _events: {},
        _windowHeight: c(window).height(),
        _windowWidth: c(window).width(),
        _rotateNode: c(".p-ct"),
        _isMotion: !!window.DeviceMotionEvent,
        _elementStyle: document.createElement("div").style,
        _UC: RegExp("Android").test(navigator.userAgent) && RegExp("UC").test(navigator.userAgent) ? !0 : !1,
        _weixin: RegExp("MicroMessenger").test(navigator.userAgent) ? !0 : !1,
        _iPhoen: RegExp("iPhone").test(navigator.userAgent) || RegExp("iPod").test(navigator.userAgent) || RegExp("iPad").test(navigator.userAgent) ? !0 : !1,
        _Android: RegExp("Android").test(navigator.userAgent) ? !0 : !1,
        _IsPC: function() {
            for (var a = navigator.userAgent,
            b = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"), c = !0, d = 0; d < b.length; d++) if (a.indexOf(b[d]) > 0) {
                c = !1;
                break
            }
            return c
        },
        _isOwnEmpty: function(a) {
            for (var b in a) if (a.hasOwnProperty(b)) return ! 1;
            return ! 0
        },
        _vendor: function() {
            for (var a, b = ["t", "webkitT", "MozT", "msT", "OT"], c = 0, d = b.length; d > c; c++) if (a = b[c] + "ransform", a in this._elementStyle) return b[c].substr(0, b[c].length - 1);
            return ! 1
        },
        _prefixStyle: function(a) {
            return this._vendor() === !1 ? !1 : "" === this._vendor() ? a: this._vendor() + a.charAt(0).toUpperCase() + a.substr(1)
        },
        _hasPerspective: function() {
            var a = this._prefixStyle("perspective") in this._elementStyle;
            return a && "webkitPerspective" in this._elementStyle && this._injectStyles("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",
            function(b) {
                a = 9 === b.offsetLeft && 3 === b.offsetHeight
            }),
            !!a
        },
        _injectStyles: function(a, b, c, d) {
            var e, f, g, h, i = document.createElement("div"),
            j = document.body,
            k = j || document.createElement("body"),
            l = "modernizr";
            if (parseInt(c, 10)) for (; c--;) g = document.createElement("div"),
            g.id = d ? d[c] : l + (c + 1),
            i.appendChild(g);
            return e = ["&#173;", '<style id="s', l, '">', a, "</style>"].join(""),
            i.id = l,
            (j ? i: k).innerHTML += e,
            k.appendChild(i),
            j || (k.style.background = "", k.style.overflow = "hidden", h = docElement.style.overflow, docElement.style.overflow = "hidden", docElement.appendChild(k)),
            f = b(i, a),
            j ? i.parentNode.removeChild(i) : (k.parentNode.removeChild(k), docElement.style.overflow = h),
            !!f
        },
        _translateZ: function() {
            return this._hasPerspective ? " translateZ(0)": ""
        },
        _handleEvent: function(a) {
            if (this._events[a]) {
                var b = 0,
                c = this._events[a].length;
                if (c) for (; c > b; b++) this._events[a][b].apply(this, [].slice.call(arguments, 1))
            }
        },
        _on: function(a, b) {
            this._events[a] || (this._events[a] = []),
            this._events[a].push(b)
        },
        execHandler: function(a) {
            if (a && a instanceof Object) {
                var b = a.callback || null,
                c = a.opts || [],
                d = a.context || null,
                e = a.delay || -1;
                b && b instanceof Function && ("number" == typeof e && e >= 0 ? setTimeout(function() {
                    b.call(d, c)
                },
                e) : b.call(d, c))
            }
        },
        execAfterMergerHandler: function(a, b) {
            if (a && a instanceof Object) {
                {
                    a.opts || []
                }
                a.opts = c.extend(a.opts, b)
            }
            this.execHandler(a)
        },
        _scrollStop: function() {
            c("body").addClass("f-ofh"),
            c(window).on("touchmove", this._scrollControl),
            c(window).on("scroll", this._scrollControl)
        },
        _scrollStart: function() {
            c("body").removeClass("f-ofh"),
            c(window).off("touchmove"),
            c(window).off("scroll")
        },
        _scrollControl: function(a) {
            return a.preventDefault(),
            !1
        },
        setActionHook: function() {
            c("body").on(a._click, "[data-action]", d)
        },
        injectAction: function(a) {
            c.extend(c.Action, a)
        },
        loadingPageShow: function(a) {
            a.length >= 1 && a.show()
        },
        loadingPageHide: function(a) {
            a.length >= 1 && a.hide()
        },
        refresh: function() {
            this._windowHeight = c(window).height(),
            this._windowWidth = c(window).width()
        }
    };
    return window.__GLOBAL = a,
    a
}),
define("dist/js/page", ["dist/js/zepto", "dist/js/global"],
function(a) {
    var b = a("dist/js/zepto"),
    c = a("dist/js/global");
    return window.page = {
        _page: b(".m-page"),
        _pageNum: b(".m-page").size(),
        _pageNow: 0,
        _pageNext: null,
        _touchStartValY: 0,
        _touchDeltaY: 0,
        _moveStart: !0,
        _movePosition: null,
        _movePosition_c: null,
        _mouseDown: !1,
        _moveFirst: !0,
        _moveInit: !1,
        _firstChange: !1,
        page_start: function() {
            page._page.on("touchstart mousedown", page.page_touch_start),
            page._page.on("touchmove mousemove", page.page_touch_move),
            page._page.on("touchend mouseup", page.page_touch_end)
        },
        page_stop: function() {
            page._page.off("touchstart mousedown"),
            page._page.off("touchmove mousemove"),
            page._page.off("touchend mouseup")
        },
        page_touch_start: function(a) {
            page._moveStart && ("touchstart" == a.type ? page._touchStartValY = window.event.touches[0].pageY: (page._touchStartValY = a.pageY || a.y, page._mouseDown = !0), page._moveInit = !0, c._handleEvent("start"))
        },
        page_touch_move: function(a) {
            if (a.preventDefault(), page._moveStart && page._moveInit) {
                var b, d = page._page.eq(page._pageNow),
                e = (parseInt(d.height()), null),
                f = !1;
                if ("touchmove" == a.type) b = window.event.touches[0].pageY,
                f = !0;
                else {
                    if (!page._mouseDown) return;
                    b = a.pageY || a.y,
                    f = !0
                }
                e = page.page_position(a, b, d),
                page.page_translate(e),
                c._handleEvent("move")
            }
        },
        page_position: function(a, d, e) {
            function f(a) {
                var d, e, f = c._translateZ();
                page._page.removeClass("action"),
                b(a[1]).addClass("action").removeClass("f-hide"),
                page._page.not(".action").addClass("f-hide"),
                b(a[0]).removeClass("f-hide").addClass("active"),
                "up" == page._movePosition ? (d = parseInt(b(window).scrollTop()), e = d > 0 ? b(window).height() + d: b(window).height(), a[0].style[c._prefixStyle("transform")] = "translate(0," + e + "px)" + f, b(a[0]).attr("data-translate", e)) : (a[0].style[c._prefixStyle("transform")] = "translate(0,-" + Math.max(b(window).height(), b(a[0]).height()) + "px)" + f, b(a[0]).attr("data-translate", -Math.max(b(window).height(), b(a[0]).height()))),
                b(a[1]).attr("data-translate", 0),
                page._page.eq(page._pageNext).height(b(window).height())
            }
            var g, h;
            if ("undefined" != d && (page._touchDeltaY = d - page._touchStartValY), page._movePosition = d - page._touchStartValY > 0 ? "down": "up", page._movePosition != page._movePosition_c ? (page._moveFirst = !0, page._movePosition_c = page._movePosition) : page._moveFirst = !1, page._touchDeltaY <= 0) page._pageNext = 0 == e.next(".m-page").length ? 0 : page._pageNow + 1,
            h = page._page.eq(page._pageNext)[0];
            else {
                if (0 == e.prev(".m-page").length) {
                    if (!page._firstChange) return page._pageNext = null,
                    void(page._touchDeltaY = 0);
                    page._pageNext = page._pageNum - 1
                } else page._pageNext = page._pageNow - 1;
                h = page._page.eq(page._pageNext)[0]
            }
            return g = page._page.eq(page._pageNow)[0],
            node = [h, g],
            page._moveFirst && f(node),
            node
        },
        page_translate: function(a) {
            if (a) {
                var d, e, f, g = c._translateZ(),
                h = page._touchDeltaY;
                b(a[0]).attr("data-translate") && (d = h + parseInt(b(a[0]).attr("data-translate"))),
                a[0].style[c._prefixStyle("transform")] = "translate(0," + d + "px)" + g,
                b(a[1]).attr("data-translate") && (e = h + parseInt(b(a[1]).attr("data-translate"))),
                f = (1 - Math.abs(.2 * h / b(window).height())).toFixed(6),
                e /= 5,
                a[1].style[c._prefixStyle("transform")] = "translate(0," + e + "px)" + g + " scale(" + f + ")"
            }
        },
        page_touch_end: function() {
            page._moveInit = !1,
            page._mouseDown = !1,
            page._moveStart && (page._pageNext || 0 == page._pageNext) && (page._moveStart = !1, page._moveFirst = !0, Math.abs(page._touchDeltaY) > 10 && (page._page.eq(page._pageNext)[0].style[c._prefixStyle("transition")] = "all .3s", page._page.eq(page._pageNow)[0].style[c._prefixStyle("transition")] = "all .3s"), Math.abs(page._touchDeltaY) >= 100 ? page.page_success() : (Math.abs(page._touchDeltaY) > 10 && Math.abs(page._touchDeltaY) < 100, page.page_fial()), c._handleEvent("end"), page._movePosition = null, page._movePosition_c = null, page._touchStartValY = 0)
        },
        page_success: function() {
            var a = c._translateZ();
            page._page.eq(page._pageNext)[0].style[c._prefixStyle("transform")] = "translate(0,0)" + a;
            var d = page._touchDeltaY > 0 ? b(window).height() / 5 : -b(window).height() / 5,
            e = .8;
            page._page.eq(page._pageNow)[0].style[c._prefixStyle("transform")] = "translate(0," + d + "px)" + a + " scale(" + e + ")",
            c._handleEvent("success")
        },
        page_fial: function() {
            var a = c._translateZ();
            return page._pageNext || 0 == page._pageNext ? (page._page.eq(page._pageNext)[0].style[c._prefixStyle("transform")] = "up" == page._movePosition ? "translate(0," + b(window).height() + "px)" + a: "translate(0,-" + b(window).height() + "px)" + a, page._page.eq(page._pageNow)[0].style[c._prefixStyle("transform")] = "translate(0,0)" + a + " scale(1)", void c._handleEvent("fial")) : (page._moveStart = !0, void(page._moveFirst = !0))
        },
        height_auto: function(a, c) {
            c = c ? c: b(window).height(),
            a.children(".page-con").css("height", c)
        }
    },
    b(function() {
        b(window).on("resize",
        function() {})
    }),
    page
}),
define("dist/js/media", ["dist/js/zepto", "dist/js/global"],
function b(a) {
    var c = a("dist/js/zepto"),
    d = a("dist/js/global"),
    b = {
        _audioNode: c(".u-audio"),
        _audio: null,
        audio_init: function() {
            if (! (b._audioNode.length <= 0)) {
                var a = {
                    loop: !0,
                    preload: "auto",
                    src: this._audioNode.attr("data-src")
                };
                this._audio = new Audio;
                for (var c in a) a.hasOwnProperty(c) && c in this._audio && (this._audio[c] = a[c]);
                this._audio.load()
            }
        },
        audio_addEvent: function() {
            function a(a, b, c) {
                a.text(b ? "打开": "关闭"),
                c && clearTimeout(c),
                a.removeClass("z-move z-hide"),
                c = setTimeout(function() {
                    a.addClass("z-move").addClass("z-hide")
                },
                1e3)
            }
            if (! (this._audioNode.length <= 0)) {
                var b = this._audioNode.find(".txt_audio"),
                e = null;
                c(this._audio).on("play",
                function() {
                    a(b, !0, e),
                    d._handleEvent("audio_play")
                }),
                c(this._audio).on("pause",
                function() {
                    a(b, !1, e),
                    d._handleEvent("audio_pause")
                })
            }
        },
        media_init: function() {
            this.audio_init(),
            this.audio_addEvent()
        }
    };
    return c(window).on("load",
    function() {
        b._audioNode.find(".btn_audio").on("click",
        function() {
            b._audio.paused ? b._audio.play() : b._audio.pause()
        })
    }),
    b
}),
define("dist/js/image", ["dist/js/zepto", "dist/js/page", "dist/js/global"],
function(a) {
    var b = a("dist/js/zepto"),
    c = a("dist/js/page"),
    d = {
        lazy_img: function() {
            var a = b(".lazy-img");
            a.each(function() {
                var a = b(this);
                if (a.is("img")) a.attr("src", "/template/20/res/img/loading_large.gif");
                else {
                    var c = a.css("background-position"),
                    d = a.css("background-size");
                    a.attr({
                        "data-position": c,
                        "data-size": d
                    }),
                    "no" == a.attr("data-bg") && a.css({
                        "background-repeat": "no-repeat"
                    }),
                    a.css({
                        "background-image": "url(/template/20/res/img/loading_large.gif)",
                        "background-size": "120px 120px",
                        "background-position": "center"
                    }),
                    "no" == a.attr("data-image") && a.css({
                        "background-image": "none"
                    })
                }
            })
        },
        lazy_start: function() {
            var a = this;
            setTimeout(function() {
                for (var c = 0; 3 > c; c++) {
                    var d = b(".m-page").eq(c);
                    if (0 == d.length) break;
                    0 != d.find(".lazy-img").length && (a.lazy_change(d, !1), "flyCon" == d.attr("data-page-type") && a.lazy_change(b(".m-flypop"), !1))
                }
            },
            200)
        },
        lazy_bigP: function() {
            if (0 != b(".lazy-img").length) for (var a = 3; 5 >= a; a++) {
                var e = b(".m-page").eq(c._pageNow + a);
                if (0 == e.length) break;
                0 != e.find(".lazy-img").length && (d.lazy_change(e, !0), "flyCon" == e.attr("data-page-type") && d.lazy_change(b(".m-flypop"), !1))
            }
        },
        lazy_change: function(a, c) {
            if ("3d" == a.attr("data-page-type") && this.lazy_3d(a), "flyCon" == a.attr("data-page-type")) {
                var e = b(".m-flypop").find(".lazy-img");
                e.each(function() {
                    var a = b(this),
                    c = a.attr("data-src");
                    b("<img />").on("load",
                    function() {
                        a.is("img") && a.attr("src", c)
                    }).attr("src", c)
                })
            }
            var f = a.find(".lazy-img");
            f.each(function() {
                var a = b(this),
                e = a.attr("data-src"),
                f = a.attr("data-position"),
                g = a.attr("data-size");
                "no" != a.attr("data-bg") ? (b("<img />").on("load",
                function() {
                    if (a.is("img") ? a.attr("src", e) : a.css({
                        "background-image": "url(" + e + ")",
                        "background-position": f,
                        "background-size": g
                    }), c) for (var h = 0; h < b(".m-page").size(); h++) {
                        var i = b(".m-page").eq(h);
                        0 != b(".m-page").find(".lazy-img").length && d.lazy_change(i, !0)
                    }
                }).attr("src", e), a.removeClass("lazy-img").addClass("lazy-finish")) : "yes" == a.attr("data-auto") && a.css("background", "none")
            })
        },
        lazy_load: function() {
            var a = b(".lazy-img.load");
            a.each(function() {
                var a = b(this),
                c = a.attr("data-src"),
                d = a.attr("data-position"),
                e = a.attr("data-size");
                "no" != a.attr("data-bg") ? (b("<img />").on("load",
                function() {
                    a.is("img") ? a.attr("src", c) : a.css({
                        "background-image": "url(" + c + ")",
                        "background-position": d,
                        "background-size": e
                    })
                }).attr("src", c), a.removeClass("lazy-img").addClass("lazy-finish")) : "yes" == a.attr("data-auto") && a.css("background", "none")
            })
        }
    };
    return b(function() {
        d.lazy_img()
    }),
    b(window).on("load",
    function() {
        d.lazy_start(),
        setTimeout(function() {
            d.lazy_load()
        },
        200)
    }),
    d
}),
define("dist/js/event", ["dist/js/zepto", "dist/js/global", "dist/js/page", "dist/js/image", "dist/js/sileFn", "dist/js/map", "dist/js/ylMap", "dist/js/media", "dist/js/form"],
function(a) {
    var b = a("dist/js/zepto"),
    c = a("dist/js/global"),
    d = a("dist/js/page"),
    e = a("dist/js/image"),
    f = a("dist/js/sileFn"),
    g = a("dist/js/media");
    haddle_envent_fn = function() {
        c._on("start", e.lazy_bigP),
        c._on("fial",
        function() {
            setTimeout(function() {
                d._page.eq(d._pageNow).attr("data-translate", ""),
                d._page.eq(d._pageNow)[0].style[c._prefixStyle("transform")] = "",
                d._page.eq(d._pageNow)[0].style[c._prefixStyle("transition")] = "",
                d._page.eq(d._pageNext)[0].style[c._prefixStyle("transform")] = "",
                d._page.eq(d._pageNext)[0].style[c._prefixStyle("transition")] = "",
                d._page.eq(d._pageNext).removeClass("active").addClass("f-hide"),
                d._moveStart = !0,
                d._moveFirst = !0,
                d._pageNext = null,
                d._touchDeltaY = 0
            },
            300)
        }),
        c._on("success",
        function() {
            0 == d._pageNext && d._pageNow == d._pageNum - 1 && (d._firstChange = !0),
            0 != d._page.eq(d._pageNext).next(".m-page").length && f.lightapp_intro_hide(!0),
            setTimeout(function() {
                f.Txt_init(d._page.eq(d._pageNow)),
                d._pageNext == d._pageNum - 1 ? b(".u-arrow").addClass("f-hide") : b(".u-arrow").removeClass("f-hide"),
                d._page.eq(d._pageNow).addClass("f-hide"),
                d._page.eq(d._pageNow).attr("data-translate", ""),
                d._page.eq(d._pageNow)[0].style[c._prefixStyle("transform")] = "",
                d._page.eq(d._pageNow)[0].style[c._prefixStyle("transition")] = "",
                d._page.eq(d._pageNext)[0].style[c._prefixStyle("transform")] = "",
                d._page.eq(d._pageNext)[0].style[c._prefixStyle("transition")] = "",
                b(".p-ct").removeClass("fixed"),
                d._page.eq(d._pageNext).removeClass("active"),
                d._page.eq(d._pageNext).removeClass("fixed"),
                d._pageNow = d._pageNext,
                d._moveStart = !0,
                d._moveFirst = !0,
                d._pageNext = null,
                d._page.eq(d._pageNow).removeClass("fixed"),
                d._page.eq(d._pageNow).attr("data-translate", ""),
                d._touchDeltaY = 0,
                setTimeout(function() {
                    d._page.eq(d._pageNow).hasClass("z-animate") || d._page.eq(d._pageNow).addClass("z-animate")
                },
                20),
                b(".j-detail").removeClass("z-show"),
                b(".txt-arrow").removeClass("z-toggle"),
                b("video").each(function() {
                    this.paused || this.pause()
                }),
                f.Txt_init(d._page.eq(d._pageNow)),
                0 == d._page.eq(d._pageNow).next(".m-page").length && (f.lightapp_intro_show(), f.lightapp_intro())
            },
            300)
        }),
        c._on("audio_play",
        function() {
            b.fn.coffee.start(),
            b(".coffee-steam-box").show(500)
        }),
        c._on("audio_pause",
        function() {
            b.fn.coffee.stop(),
            b(".coffee-steam-box").hide(500)
        }),
        c._on("video_open",
        function() {
            var a = g._audio;
            g._audioNode.addClass("z-low"),
            b(".u-arrow").addClass("f-hide"),
            b(document.body).css("height", b(window).height()),
            a && a.pause(),
            d.page_stop()
        }),
        c._on("video_close",
        function() {
            var a = g._audio;
            g._audioNode.removeClass("z-low"),
            b(".u-arrow").removeClass("f-hide"),
            b(document.body).css("height", "100%"),
            a && a.play(),
            d.page_start()
        })
    },
    b(function() {
        haddle_envent_fn()
    })
}),
define("dist/js/sileFn", ["dist/js/zepto", "dist/js/global", "dist/js/page", "dist/js/map", "dist/js/ylMap", "dist/js/media", "dist/js/form"],
function c(a) {
    var b = a("dist/js/zepto"),
    d = a("dist/js/global"),
    e = a("dist/js/page"),
    f = a("dist/js/map"),
    g = a("dist/js/form"),
    c = {
        mapCreate: function() {
            if (! (".j-map".length <= 0)) {
                var a = b(".j-map"),
                c = {
                    fnOpen: d._scrollStop,
                    fnClose: f.mapSave
                };
                f.mapAddEventHandler(a, "click", f.mapShow, c)
            }
        },
        Txt_init: function(a) {
            a.find(".j-txt").length <= 0 || a.find(".j-txt").find(".j-detail p").length <= 0 || a.find(".j-txt").each(function() {
                var a = b(this).find(".j-detail"),
                c = b(this).find(".j-title"),
                e = c.find(".txt-arrow"),
                f = a.find("p"),
                g = parseInt(c.height()),
                h = parseInt(f.height()),
                i = h + g;
                f.length <= 0 || (b(this).parents(".m-page").hasClass("m-smallTxt") && (0 == b(this).parents(".smallTxt-bd").index() ? a.css("top", g) : a.css("bottom", g)), a.attr("data-height", h), b(this).attr("data-height-init", g), b(this).attr("data-height-extand", i), f[0].style[d._prefixStyle("transform")] = "translate(0,-" + h + "px)", b(this.parentNode).hasClass("z-left") && (f[0].style[d._prefixStyle("transform")] = "translate(0," + h + "px)"), a.css("height", "0"), e.removeClass("z-toggle"), b(this).css("height", g))
            })
        },
        bigTxt_extand: function() {
            b("body").on("click", ".j-title",
            function() {
                if (! (b(".j-detail").length <= 0)) {
                    var a = b(this.parentNode).find(".j-detail");
                    b(".j-detail").removeClass("action"),
                    a.addClass("action"),
                    b(this).hasClass("smallTxt-arrow") && (b(".smallTxt-bd").removeClass("action"), a.parent().addClass("action")),
                    a.hasClass("z-show") ? (a.removeClass("z-show"), a.css("height", 0), b(this.parentNode).css("height", parseInt(b(this.parentNode).attr("data-height-init")))) : (a.addClass("z-show"), a.css("height", parseInt(a.attr("data-height"))), b(this.parentNode).css("height", parseInt(b(this.parentNode).attr("data-height-extand")))),
                    b(".j-detail").not(".action").removeClass("z-show"),
                    b(".txt-arrow").removeClass("z-toggle"),
                    a.hasClass("z-show") ? b(this).find(".txt-arrow").addClass("z-toggle") : b(this).find(".txt-arrow").removeClass("z-toggle")
                }
            })
        },
        Txt_back: function() {
            b("body").on("click", ".m-page",
            function(a) {
                a.stopPropagation();
                var c = b(a.target),
                d = c.parents(".m-page"),
                e = 0 == c.parents(".j-txtWrap").length ? c: c.parents(".j-txtWrap");
                if (! (d.find(".j-txt").find(".j-detail p").length <= 0 || d.find(".j-txt").length <= 0 || c.parents(".j-txt").length >= 1 || c.hasClass("bigTxt-btn") || c.parents(".bigTxt-btn").length >= 1)) {
                    var f = e.find(".j-detail");
                    b(".j-detail").removeClass("action"),
                    f.addClass("action"),
                    b(".j-detail").not(".action").removeClass("z-show"),
                    e.each(function() {
                        var a = b(this).find(".j-detail"),
                        c = b(this).find(".txt-arrow"),
                        d = b(this).find(".j-txt");
                        a.hasClass("z-show") ? (a.removeClass("z-show"), a.css("height", 0), d.css("height", parseInt(d.attr("data-height-init")))) : (a.addClass("z-show"), a.css("height", parseInt(a.attr("data-height"))), d.css("height", parseInt(d.attr("data-height-extand")))),
                        a.hasClass("z-show") ? c.addClass("z-toggle") : c.removeClass("z-toggle")
                    })
                }
            })
        },
        input_form: function() {
            b("body").on("click", ".book-bd .bd-form .btn",
            function() {
                var a = b(this).attr("data-submit");
                if ("true" != a) {
                    var c = b(window).height();
                    b(document.body).css("height", c),
                    e.page_stop(),
                    d._scrollStart(),
                    e._page.eq(e._pageNow).css("z-index", 15),
                    b(".book-bg").removeClass("f-hide"),
                    b(".book-form").removeClass("f-hide"),
                    setTimeout(function() {
                        b(".book-form").addClass("z-show"),
                        b(".book-bg").addClass("z-show")
                    },
                    50),
                    b(".book-bg").off("click"),
                    b(".book-bg").on("click",
                    function(a) {
                        a.stopPropagation();
                        var c = b(a.target);
                        c.parents(".book-form").length >= 1 && !c.hasClass("j-close-img") && c.parents(".j-close").length <= 0 || (b(".book-form").removeClass("z-show"), b(".book-bg").removeClass("z-show"), setTimeout(function() {
                            b(document.body).css("height", "100%"),
                            e.page_start(),
                            d._scrollStop(),
                            e._page.eq(e._pageNow).css("z-index", 9),
                            b(".book-bg").addClass("f-hide"),
                            b(".book-form").addClass("f-hide")
                        },
                        500))
                    })
                }
            })
        },
        sex_select: function() {
            var a = b("#j-signUp").find(".sex p"),
            c = b("#j-signUp").find(".sex strong"),
            d = b("#j-signUp").find(".sex input");
            a.on("click",
            function() {
                var a = b(this).find("strong");
                c.removeClass("open"),
                a.addClass("open");
                var e = b(this).attr("data-sex");
                d.val(e)
            })
        },
        lightapp_intro_show: function() {
            b(".market-notice").removeClass("f-hide"),
            setTimeout(function() {
                b(".market-notice").addClass("show")
            },
            100)
        },
        lightapp_intro_hide: function(a) {
            return a ? void b(".market-notice").addClass("f-hide").removeClass("show") : (b(".market-notice").removeClass("show"), void setTimeout(function() {
                b(".market-notice").addClass("f-hide")
            },
            500))
        },
        lightapp_intro: function() {
            b(".market-notice").off("click"),
            b(".market-notice").on("click",
            function() {
                b(".market-page").removeClass("f-hide"),
                setTimeout(function() {
                    b(".market-page").addClass("show"),
                    setTimeout(function() {
                        b(".market-img").addClass("show")
                    },
                    100),
                    c.lightapp_intro_hide()
                },
                100),
                e.page_stop(),
                d._scrollStop()
            }),
            b(".market-page").off("click"),
            b(".market-page").on("click",
            function(a) {
                b(a.target).hasClass("market-page") && (b(".market-img").removeClass("show"), setTimeout(function() {
                    b(".market-page").removeClass("show"),
                    setTimeout(function() {
                        b(".market-page").addClass("f-hide")
                    },
                    200)
                },
                500), c.lightapp_intro_show(), e.page_start(), d._scrollStart())
            })
        },
        wxShare: function() {
            b("body").on("click", ".bigTxt-btn-wx",
            function() {
                var a = b(this).parent().find(".bigTxt-weixin");
                a.addClass("z-show"),
                e.page_stop(),
                a.on("click",
                function() {
                    b(this).removeClass("z-show"),
                    e.page_start(),
                    b(this).off("click")
                })
            })
        },
        toggleVideo: function() {
            b(".j-video").find(".img").on("click",
            function() {
                var a = b(this).next()[0];
                a.length <= 0 || a.paused && (b(a).removeClass("f-hide"), a.play(), b(this).hide())
            })
        },
        signUp_submit: function() {
            b("#j-signUp-submit").on("click",
            function(a) {
                a.preventDefault();
                var c = b(this).parents("#j-signUp"),
                d = g.signUpCheck_input(c, b(".u-note"));
                d && g.signUpCheck_submit(c, b(".u-note"))
            })
        },
        loadingPageShow: function() {
            b(".u-pageLoading").show()
        },
        loadingPageHide: function() {
            b(".u-pageLoading").hide()
        }
    };
    return b(function() {
        c.bigTxt_extand(),
        c.Txt_back(),
        c.input_form(),
        c.sex_select(),
        c.lightapp_intro(),
        c.wxShare(),
        c.mapCreate(),
        c.toggleVideo(),
        c.signUp_submit(),
        c.Txt_init(e._page.eq(e._pageNow))
    }),
    c
}),
define("dist/js/map", ["dist/js/zepto", "dist/js/ylMap", "dist/js/global", "dist/js/page", "dist/js/media"],
function __map(require, exports, module) {
    var $ = require("dist/js/zepto");
    $ = require("dist/js/ylMap");
    var global = require("dist/js/global"),
    page = require("dist/js/page"),
    media = require("dist/js/media"),
    __map = {
        _map: $(".ylmap"),
        _mapValue: null,
        _mapIndex: null,
        mapAddEventHandler: function(a, b, c, d) {
            var e = c;
            global._isOwnEmpty(d) || (e = function() {
                c.call(this, d)
            }),
            a.each(function() {
                $(this).on(b, e)
            })
        },
        mapShow: function(option) {
            var str_data = $(this).attr("data-detal");
            option.detal = "" != str_data ? eval("(" + str_data + ")") : "",
            option.latitude = $(this).attr("data-latitude"),
            option.longitude = $(this).attr("data-longitude");
            var detal = option.detal,
            latitude = option.latitude,
            longitude = option.longitude,
            fnOpen = option.fnOpen,
            fnClose = option.fnClose;
            global._scrollStop(),
            __map._map.addClass("show"),
            $(document.body).animate({
                scrollTop: 0
            },
            0),
            $(this).attr("data-mapIndex") != __map._mapIndex ? (__map._map.html($('<div class="bk"><span class="css_sprite01 s-bg-map-logo"></span></div>')), __map._mapValue = !1, __map._mapIndex = $(this).attr("data-mapIndex")) : __map._mapValue = !0,
            setTimeout(function() {
                __map._map.find("div").length >= 1 && (__map._map.addClass("mapOpen"), page.page_stop(), global._scrollStop(), media._audioNode.addClass("z-low"), page._page.eq(page._pageNow).css("z-index", 15), setTimeout(function() {
                    __map._mapValue || __map.addMap(detal, latitude, longitude, fnOpen, fnClose)
                },
                500))
            },
            100)
        },
        mapSave: function() {
            function a() {
                __map._map.removeClass("show"),
                $(window).off("webkitTransitionEnd transitionend")
            }
            $(window).on("webkitTransitionEnd transitionend", a),
            page && page.page_start(),
            global._scrollStart(),
            __map._map.removeClass("mapOpen"),
            media && media._audioNode.removeClass("z-low"),
            __map._mapValue || (__map._mapValue = !0)
        },
        addMap: function(a, b, c, d, e) {
            var a = a,
            b = Number(b),
            c = Number(c),
            d = "function" == typeof d ? d: "",
            e = "function" == typeof e ? e: "",
            f = {
                sign_name: "",
                contact_tel: "",
                address: "天安门"
            };
            a = global._isOwnEmpty(a) ? f: a,
            b = b ? b: 39.915,
            c = c ? c: 116.404,
            __map._map.ylmap({
                detal: a,
                latitude: b,
                longitude: c,
                fnOpen: d,
                fnClose: e
            })
        }
    };
    return __map
}),
define("dist/js/ylMap", ["dist/js/zepto"],
function(a, b, c) {
    var d = a("dist/js/zepto");
    c.exports = d,
    function(a) {
        a.fn.ylmap = function(b) {
            a.fn.ylmap.defaults = {
                detal: {
                    sign_name: "TXjiang",
                    contact_tel: 18624443174,
                    address: "天安门"
                },
                latitude: 39.915,
                longitude: 116.404,
                fnOpen: null,
                fnClose: null
            };
            var c = a.extend({},
            a.fn.ylmap.defaults, b);
            return this.each(function() {
                function b() {
                    if (a(".BDS").length <= 0) {
                        var b = document.createElement("script");
                        b.src = "http://api.map.baidu.com/api?v=1.4&callback=mapInit",
                        b.className += "BDS",
                        document.head.appendChild(b)
                    } else t();
                    if (a(".BDC").length <= 0) {
                        var c = document.createElement("style");
                        c.type = "text/css",
                        c.className += "BDC";
                        var e = d();
                        e ? (mapScale = 1, phoneScale = 1) : mapScale = phoneScale > 1 ? 1 : 1 / phoneScale;
                        var f = (a(window).height(), ".ylmap.open,.ylmap.mapOpen {height:100%;width:100%;background:#fff;}.ylmap img {max-width:initial!important;}.ylmap .tit { position:absolute; left:0; bottom:0; height:70px; width:100%; overflow: hidden; background:rgba(0,0,0,0.5); }.ylmap .tit p { margin-right:100px; }.ylmap .tit p a { position:relative; display:block; font-size:24px; color:#fff; height:70px; line-height:70px; padding-left:70px; }.ylmap .tit p a span { position:absolute; left:15px; top:15px; display:inline-block; width:40px;height:40px; }.ylmap .tit .close_map { display:none; position: absolute; bottom: 15px; right: 20px; width: 40px; height: 40px; margin-right:0; cursor:pointer; background-position: -100px -73px; }.ylmap .map_close_btn{position:absolute;top:10px;left:10px;display:none;width:80px;box-shadow:0 0 2px rgba(0,0,0,0.6) inset, 0 0 2px rgba(0,0,0,0.6);height:80px;border-radius:80%;color:#fff;background:rgba(230,45,36,0.8);text-align:center;line-height:80px;font-size:26px; font-weight:bold;cursor:pointer;}.ylmap.open .map_close_btn{display:block;}.ylmap.mapOpen .map_close_btn{display:block;}#BDMap {transform:scale(" + mapScale + ");-webkit-transform:scale(" + mapScale + ");}#BDMap {width:100%;height:100%;}#BDMap img{width:auto;height:auto;}.ylmap.open .transitBtn{display:block;}.ylmap.mapOpen .transitBtn{display:block;}.transitBtn {display:none;position:absolute;z-index:3000;}.transitBtn a{display:block;width:80px;box-shadow:0 0 2px rgba(0,0,0,0.6) inset, 0 0 2px rgba(0,0,0,0.6);height:80px;border-radius:80%;color:#fff;background:rgba(230,45,36,0.8);text-align:center;line-height:80px;font-size:24px; font-weight:bold}.transitBtn.close {top:10px;right:10px;}.transitBtn.bus {top:10px;right:110px;}.transitBtn.car {top:110px;right:10px;}.transitBtn.bus a{background:rgba(28,237,235,0.8);}.transitBtn.car a{background:rgba(89,237,37,0.8);}#transit_result{display:none;position:absolute;top:0;left:0;width:100%;height:100%;z-index:1000;overflow-y:scroll;}#transit_result.open{display:block;}#transit_result h1{font-size:26px!important;}#transit_result div[onclick^='Instance']{background:none!important;}#transit_result span{display:inline-block;font-size:20px;padding:0 5px;}#transit_result table {font-size:20px!important;}#transit_result table td{padding:5px 10px!important;line-height:150%!important;}.infoWindow p{margin-bottom:10px;}.infoWindow .window_btn .open_navigate{display:inline-block;padding:2px 6px; margin-right:10px;border:1px solid #ccc;border-radius:6px;text-align:center;cursor:pointer;}.anchorBL{display:none!important;}");
                        c.innerHTML = f,
                        document.head.appendChild(c)
                    }
                }
                function d() {
                    for (var a = navigator.userAgent,
                    b = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"), c = !0, d = 0; d < b.length; d++) if (a.indexOf(b[d]) > 0) {
                        c = !1;
                        break
                    }
                    return c
                }
                var e, f, g, h, i = a(this),
                j = c.detal,
                k = c.latitude,
                l = c.longitude,
                m = c.fnClose,
                n = (c.fnOpen, i.hasClass("bigOpen")),
                o = null,
                p = null,
                q = null,
                r = null,
                s = a('<div id="BDMap" class="BDMap"></div>');
                if (i.append(s), i.append(a('<div id="transit_result"></div>')), i.append(a('<div class="tit"><p><a href="javascript:void(0)"><span class="css_sprite01"></span>' + j.address + "</a></p></div>")), i.append(a('<p class="map_close_btn">退出</p>')), i.length > 0) {
                    i.height()
                }
                n && i.find(".map_close_btn").css("display", "block"),
                a("#transit_result").length > 0 && "" != a("#transit_result").html() && a(".transitBtn").removeClass("hide");
                var t = function() {
                    i.size() > 0 && (f = new BMap.Map(s.attr("id")), g = new BMap.Point(l, k), h = new BMap.Marker(g), f.enableScrollWheelZoom(), f.enableInertialDragging(), f.centerAndZoom(g, 15), f.addOverlay(h), u(), h.addEventListener("click",
                    function() {
                        u()
                    }), f.addEventListener("click",
                    function() {
                        return ! 1
                    }), f.addEventListener("zoomend",
                    function() {
                        var a = f.getZoom();
                        f.centerAndZoom(g, a)
                    }))
                },
                u = function() {
                    v(h, j)
                },
                v = function(b, c) {
                    var d = a('<div class="infoWindow"></div>');
                    "undefined" != typeof c.contact_tel && d.append('<p class="tel"><a href="tel:' + c.contact_tel + '">' + c.contact_tel + "</a></p>"),
                    d.append('<p class="address">' + c.address + "</p>"),
                    d.append('<div class="window_btn"><span class="open_navigate open_bus" onclick="open_navigate(this)">公交</span><span class="open_navigate open_car" onclick="open_navigate(this)">自驾</span><span class="State"></span></div>');
                    var e = {
                        width: 0,
                        height: 0,
                        title: " "
                    },
                    g = new BMap.InfoWindow(d[0], e);
                    b.openInfoWindow(g, f.getCenter())
                };
                open_navigate = function(b) {
                    o = a(b).hasClass("open_bus") ? "bus": "car",
                    navigate(),
                    a(".infoWindow").find("span.State").html("正在定位您的位置！")
                },
                navigate = function() {
                    window.navigator.geolocation ? window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
                        timeout: 1e4
                    }) : alert("sorry！您的设备不支持定位功能")
                },
                handleError = function(b) {
                    var c;
                    switch (b.code) {
                    case b.TIMEOUT:
                        c = "获取超时!请稍后重试!";
                        break;
                    case b.POSITION_UNAVAILABLE:
                        c = "无法获取当前位置!";
                        break;
                    case b.PERMISSION_DENIED:
                        c = "您已拒绝共享地理位置!";
                        break;
                    case b.UNKNOWN_ERROR:
                        c = "无法获取当前位置!"
                    }
                    a(".infoWindow").find("span.State").length > 0 ? a(".infoWindow").find("span.State").html(c) : alert(c)
                },
                handleSuccess = function(b) {
                    var c = b.coords,
                    d = c.latitude,
                    e = c.longitude;
                    r = new BMap.Point(e, d),
                    a(".infoWindow").find("span.State").html("获取信息成功，正在加载中！"),
                    "bus" == o ? bus_transit() : self_transit(),
                    s.parent().addClass(n ? "mapOpen": "open")
                },
                a(".map_close_btn").on("click",
                function() {
                    i.removeClass("mapOpen open"),
                    m && m()
                }),
                bus_transit = function() {
                    if (p && p.clearResults(), q && q.clearResults(), !r) return void alert("抱歉：定位失败！");
                    a(".fn-audio").hide(),
                    "function" == typeof loadingPageShow && loadingPageShow(),
                    a(".infoWindow").find("span.State").html("正在绘制出导航路线");
                    var b = a("#transit_result") || a('<div id="transit_result"></div>');
                    b.appendTo(i),
                    p = new BMap.TransitRoute(f, {
                        renderOptions: {
                            map: f,
                            panel: "transit_result",
                            autoViewport: !0
                        },
                        onSearchComplete: searchComplete
                    }),
                    p.search(r, g)
                },
                self_transit = function() {
                    if (p && p.clearResults(), q && q.clearResults(), !r) return void alert("抱歉：定位失败！");
                    a(".fn-audio").hide(),
                    "function" == typeof loadingPageShow && loadingPageShow(),
                    a(".infoWindow").find("span.State").html("正在绘制出导航路线");
                    var b = a("#transit_result") || a('<div id="transit_result"></div>');
                    b.appendTo(i),
                    q = new BMap.DrivingRoute(f, {
                        renderOptions: {
                            map: f,
                            panel: b.attr("id"),
                            autoViewport: !0
                        },
                        onSearchComplete: searchComplete
                    }),
                    q.search(r, g)
                },
                searchComplete = function(b) {
                    function c() {
                        var a;
                        a = window.event.touches[0].pageY,
                        e = a
                    }
                    function d(b) {
                        b.stopPropagation(),
                        b.preventDefault();
                        var c;
                        c = window.event.touches[0].pageY;
                        var d = a(this).scrollTop();
                        a(this).scrollTop(d + e - c),
                        e = c
                    }
                    0 == b.getNumPlans() ? (alert("非常抱歉,未搜索到可用路线"), f.reset(), f.centerAndZoom(g, 15), u(), a("#transit_result").removeClass("open").hide(), a(".transitBtn").hide()) : (a("#transit_result").addClass("open"), a(".infoWindow").find("span.State").html(""), !a(".transitBtn").length > 0 && (a("#transit_result").after(a('<p class="transitBtn close" onclick="transit_result_close()"><a href="javascript:void(0)">关闭</a></p>')), a("#transit_result").after(a('<p class="transitBtn bus" onclick="bus_transit()"><a href="javascript:void(0)">公交</a></p>')), a("#transit_result").after(a('<p class="transitBtn car" onclick="self_transit()"><a href="javascript:void(0)">自驾</a></p>'))), i.find(".close_map").show(), a("#transit_result").addClass("open"), a(".transitBtn").show(), a("#transit_result").on("touchstart", c), a("#transit_result").on("touchmove", d)),
                    "function" == typeof loadingPageHide && loadingPageHide(),
                    n || i.css({
                        position: "fixed",
                        top: "0",
                        left: "0",
                        height: "100%"
                    }),
                    a(".close").find("a").html(a("#transit_result").hasClass("open") ? "关闭": "打开")
                },
                transit_result_close = function() {
                    a("#transit_result").hasClass("open") ? (a("#transit_result").removeClass("open"), a(".close").find("a").html("打开")) : (a("#transit_result").addClass("open"), a(".close").find("a").html("关闭"))
                },
                window.mapInit = t,
                b()
            })
        }
    } (d)
}),
define("dist/js/form", ["dist/js/zepto", "dist/js/global", "dist/js/page"],
function(a) {
    var b = a("dist/js/zepto"),
    c = a("dist/js/global"),
    d = a("dist/js/page"),
    e = {
        signUpCheck_input: function(a, c) {
            var d = !0,
            f = a.find("input");
            return f.each(function() {
                if ("" != this.name && "undefined" != this.name) {
                    var a = this.name,
                    f = b(this).attr("placeHolder"),
                    g = e.regFunction(a, f),
                    h = g.empty_tip,
                    i = g.reg,
                    j = g.reg_tip;
                    if ("" == b.trim(b(this).val())) return e.showCheckMessage(c, h, !1),
                    b(this).addClass("z-error"),
                    d = !1,
                    !1;
                    if (void 0 != i && "" != i && !b(this).val().match(i)) return b(this).addClass("z-error"),
                    e.showCheckMessage(c, j, !1),
                    d = !1,
                    !1;
                    b(this).removeClass("z-error"),
                    b(".u-note-error").html(""),
                    c.html("")
                }
            }),
            0 == d ? !1 : !0
        },
        regFunction: function(a, c) {
            var d = "",
            e = "",
            f = "",
            g = !1;
            a.indexOf("new") > -1 ? g = !0 : c = null;
            var h = b("#activity_id").val();
            switch (a) {
            case "name":
                f = /^[\u4e00-\u9fa5|a-z|A-Z|\s]{1,20}$/,
                d = "不能落下姓名哦！",
                e = "这名字太怪了！";
                break;
            case "sex":
                d = "想想，该怎么称呼您呢？",
                e = "";
                break;
            case "tel":
                f = /^1[0-9][0-9]\d{8}$/,
                d = "有个联系方式，就更好了！",
                e = "这号码,可打不通... ";
                break;
            case "email":
                f = 4111 != h ? /(^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$)/i: /^[\u4e00-\u9fa5|a-z|A-Z|\s|\d]{1,20}$/,
                d = "都21世纪了，应该有个电子邮箱吧！",
                e = "邮箱格式有问题哦！";
                break;
            case "company":
                f = /^[\u4e00-\u9fa5|a-z|A-Z|\s|\d]{1,20}$/,
                d = "填个公司吧！",
                e = "这个公司太奇怪了！";
                break;
            case "job":
                f = /^[\u4e00-\u9fa5|a-z|A-Z|\s]{1,20}$/,
                d = "请您填个职位",
                e = "这个职位太奇怪了！";
                break;
            case "date":
                d = "给个日期吧！",
                e = "";
                break;
            case "time":
                d = "填下具体时间更好哦！",
                e = "";
                break;
            case "new1":
            case "new2":
            case "new3":
            case "new4":
            case "new5":
                f = /^.*$/,
                d = g ? "请填写" + c: "",
                e = "";
                break;
            case "age":
                f = /^([3-9])|([1-9][0-9])|([1][0-3][0-9])$/,
                d = "有个年龄就更好了！",
                e = "这年龄可不对哦！"
            }
            return {
                empty_tip: d,
                reg_tip: e,
                reg: f
            }
        },
        signUpCheck_submit: function(a, f) {
            c.loadingPageShow(b(".u-pageLoading"));
            var g = b("#j-signUp").data("host"),
            h = g + "/auto/submit/" + b("#activity_id").val();
            b.ajax({
                url: h,
                cache: !1,
                dataType: "json",
                async: !0,
                type: "POST",
                data: a.serialize(),
                success: function(a) {
                    c.loadingPageHide(b(".u-pageLoading")),
                    200 == a.code ? (e.showCheckMessage(b(".u-note"), b(".u-note-sucess").data("type"), !0), setTimeout(function() {
                        b(".book-form").removeClass("z-show"),
                        b(".book-bg").removeClass("z-show"),
                        setTimeout(function() {
                            b(document.body).css("height", "100%"),
                            d.page_start(),
                            c._scrollStop(),
                            b(".book-bg").addClass("f-hide"),
                            b(".book-form").addClass("f-hide")
                        },
                        500)
                    },
                    3e3), b(".book-bd .bd-form .btn").addClass("z-stop"), b(".book-bd .bd-form .btn").attr("data-submit", "true")) : 400 == a.code && e.showCheckMessage(b(".u-note"), b(".u-note-error").data("type"), !1)
                },
                error: function(a, d, g) {
                    e.showCheckMessage(f, g, !1),
                    setTimeout(function() {
                        c.loadingPageHide(b(".u-pageLoading"))
                    },
                    500)
                }
            })
        },
        showCheckMessage: function(a, c, d) {
            d ? (b(".u-note-sucess").html(c), b(".u-note-sucess").addClass("on"), b(".u-note-error").removeClass("on"), setTimeout(function() {
                b(".u-note").removeClass("on")
            },
            2e3)) : (b(".u-note-error").html(c), b(".u-note-error").addClass("on"), b(".u-note-sucess").removeClass("on"), setTimeout(function() {
                b(".u-note").removeClass("on")
            },
            2e3))
        }
    };
    return e
}),
define("dist/js/plugins", ["dist/js/zepto", "dist/js/ylMusic", "dist/js/fx", "dist/js/Lottery", "dist/js/global", "dist/js/page", "dist/js/media", "dist/js/video"],
function(a) {
    var b = a("dist/js/zepto");
    b = a("dist/js/ylMusic");
    var c = a("dist/js/Lottery"),
    d = (a("dist/js/global"), a("dist/js/page")),
    e = a("dist/js/media"),
    f = a("dist/js/video"),
    g = {
        init: function() {
            b("#coffee_flow").coffee({
                steams: ["<img src='/template/19/img/audio_widget_01@2x.png' />", "<img src='/template/19/img/audio_widget_01@2x.png' />"],
                steamHeight: 100,
                steamWidth: 44
            }),
            e.media_init(),
            f.video_init();
            var a = b(".translate-front").data("open");
            if (1 == a) {
                var c = b("#j-mengban")[0],
                d = "/template/19/img/page_01_bg@2x.jpg",
                h = b("#r-cover").val(),
                i = "image",
                j = 640,
                k = b(window).height(),
                l = g.start_callback;
                g.cover_draw(c, d, h, i, j, k, l)
            } else g.start_callback()
        },
        cover_draw: function(a, b, d, e, f, g, h) {
            if (! (a.style.display.indexOf("none") > -1)) {
                var i = new c(a, d, e, f, g, h);
                i.init()
            }
        },
        start_callback: function() {
            var a = b(".translate-front").data("open");
            if (d.page_start(), b(document).one("touchstart",
            function() {
                e._audio.play()
            }), 1 == a) {
                if (b("#j-mengban").removeClass("z-show"), setTimeout(function() {
                    b("#j-mengban").addClass("f-hide")
                },
                1500), b(".u-arrow").removeClass("f-hide"), !e._audio) return;
                e._audioNode.removeClass("f-hide"),
                e._audio.play()
            } else b("#j-mengban").removeClass("z-show").addClass("f-hide")
        }
    };
    b(window).on("load",
    function() {
        g.init()
    })
}),
define("dist/js/ylMusic", ["dist/js/zepto", "dist/js/fx"],
function(a, b, c) {
    var d = a("dist/js/zepto");
    d = a("dist/js/fx"),
    c.exports = d,
    function(a) {
        a.fn.coffee = function(b) {
            function c() {
                var b = f(8, m.steamMaxSize),
                c = e(1, m.steamsFontFamily),
                d = "#" + e(6, "0123456789ABCDEF"),
                h = f(0, 44),
                i = f( - 90, 89),
                j = g(.4, 1),
                l = a.fx.cssPrefix + "transform";
                l = l + ":rotate(" + i + "deg) scale(" + j + ");";
                var p = a('<span class="coffee-steam">' + e(1, m.steams) + "</span>"),
                q = f(0, n - m.steamWidth - b);
                q > h && (q = f(0, h)),
                p.css({
                    position: "absolute",
                    left: h,
                    top: m.steamHeight,
                    "font-size:": b + "px",
                    color: d,
                    "font-family": c,
                    display: "block",
                    opacity: 1
                }).attr("style", p.attr("style") + l).appendTo(o).animate({
                    top: f(m.steamHeight / 2, 0),
                    left: q,
                    opacity: 0
                },
                f(m.steamFlyTime / 2, 1.2 * m.steamFlyTime), k,
                function() {
                    p.remove(),
                    p = null
                })
            }
            function d() {
                var a = f( - 10, 10);
                a += parseInt(o.css("left")),
                a >= 54 ? a = 54 : 34 >= a && (a = 34),
                o.animate({
                    left: a
                },
                f(1e3, 3e3), k)
            }
            function e(a, b) {
                a = a || 1;
                var c = "",
                d = b.length - 1,
                e = 0;
                for (i = 0; a > i; i++) e = f(0, d - 1),
                c += b.slice(e, e + 1);
                return c
            }
            function f(a, b) {
                var c = b - a,
                d = a + Math.round(Math.random() * c);
                return parseInt(d)
            }
            function g(a, b) {
                var c = b - a,
                d = a + Math.random() * c;
                return parseFloat(d)
            }
            var h = null,
            j = null,
            k = "cubic-bezier(.09,.64,.16,.94)",
            l = a(this),
            m = a.extend({},
            a.fn.coffee.defaults, b),
            n = m.steamWidth,
            o = a('<div class="coffee-steam-box"></div>').css({
                height: m.steamHeight,
                width: m.steamWidth,
                left: 60,
                top: -50,
                position: "absolute",
                overflow: "hidden",
                "z-index": 0
            }).appendTo(l);
            return a.fn.coffee.stop = function() {
                clearInterval(h),
                clearInterval(j)
            },
            a.fn.coffee.start = function() {
                h = setInterval(function() {
                    c()
                },
                f(m.steamInterval / 2, 2 * m.steamInterval)),
                j = setInterval(function() {
                    d()
                },
                f(100, 1e3) + f(1e3, 3e3))
            },
            l
        },
        a.fn.coffee.defaults = {
            steams: ["jQuery", "HTML5", "HTML6", "CSS2", "CSS3", "JS", "$.fn()", "char", "short", "if", "float", "else", "type", "case", "function", "travel", "return", "array()", "empty()", "eval", "C++", "JAVA", "PHP", "JSP", ".NET", "while", "this", "$.find();", "float", "$.ajax()", "addClass", "width", "height", "Click", "each", "animate", "cookie", "bug", "Design", "Julying", "$(this)", "i++", "Chrome", "Firefox", "Firebug", "IE6", "Guitar", "Music", "攻城师", "旅行", "王子墨", "啤酒"],
            steamsFontFamily: ["Verdana", "Geneva", "Comic Sans MS", "MS Serif", "Lucida Sans Unicode", "Times New Roman", "Trebuchet MS", "Arial", "Courier New", "Georgia"],
            steamFlyTime: 5e3,
            steamInterval: 500,
            steamMaxSize: 30,
            steamHeight: 200,
            steamWidth: 300
        },
        a.fn.coffee.version = "2.0.0"
    } (d)
}),
define("dist/js/fx", ["dist/js/zepto"],
function(a, b, c) {
    var d = a("dist/js/zepto");
    c.exports = d,
    function(a, b) {
        function c(a) {
            return a.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
        }
        function d(a) {
            return e ? e + a: a.toLowerCase()
        }
        var e, f, g, h, i, j, k, l, m, n, o = "",
        p = {
            Webkit: "webkit",
            Moz: "",
            O: "o"
        },
        q = window.document,
        r = q.createElement("div"),
        s = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        t = {};
        a.each(p,
        function(a, c) {
            return r.style[a + "TransitionProperty"] !== b ? (o = "-" + a.toLowerCase() + "-", e = c, !1) : void 0
        }),
        f = o + "transform",
        t[g = o + "transition-property"] = t[h = o + "transition-duration"] = t[j = o + "transition-delay"] = t[i = o + "transition-timing-function"] = t[k = o + "animation-name"] = t[l = o + "animation-duration"] = t[n = o + "animation-delay"] = t[m = o + "animation-timing-function"] = "",
        a.fx = {
            off: e === b && r.style.transitionProperty === b,
            speeds: {
                _default: 400,
                fast: 200,
                slow: 600
            },
            cssPrefix: o,
            transitionEnd: d("TransitionEnd"),
            animationEnd: d("AnimationEnd")
        },
        a.fn.animate = function(c, d, e, f, g) {
            return a.isFunction(d) && (f = d, e = b, d = b),
            a.isFunction(e) && (f = e, e = b),
            a.isPlainObject(d) && (e = d.easing, f = d.complete, g = d.delay, d = d.duration),
            d && (d = ("number" == typeof d ? d: a.fx.speeds[d] || a.fx.speeds._default) / 1e3),
            g && (g = parseFloat(g) / 1e3),
            this.anim(c, d, e, f, g)
        },
        a.fn.anim = function(d, e, o, p, q) {
            var r, u, v, w = {},
            x = "",
            y = this,
            z = a.fx.transitionEnd,
            A = !1;
            if (e === b && (e = a.fx.speeds._default / 1e3), q === b && (q = 0), a.fx.off && (e = 0), "string" == typeof d) w[k] = d,
            w[l] = e + "s",
            w[n] = q + "s",
            w[m] = o || "linear",
            z = a.fx.animationEnd;
            else {
                u = [];
                for (r in d) s.test(r) ? x += r + "(" + d[r] + ") ": (w[r] = d[r], u.push(c(r)));
                x && (w[f] = x, u.push(f)),
                e > 0 && "object" == typeof d && (w[g] = u.join(", "), w[h] = e + "s", w[j] = q + "s", w[i] = o || "linear")
            }
            return v = function(b) {
                if ("undefined" != typeof b) {
                    if (b.target !== b.currentTarget) return;
                    a(b.target).unbind(z, v)
                } else a(this).unbind(z, v);
                A = !0,
                a(this).css(t),
                p && p.call(this)
            },
            e > 0 && (this.bind(z, v), setTimeout(function() {
                A || v.call(y)
            },
            1e3 * e + 25)),
            this.size() && this.get(0).clientLeft,
            this.css(w),
            0 >= e && setTimeout(function() {
                y.each(function() {
                    v.call(this)
                })
            },
            0),
            this
        },
        r = null
    } (d)
}),
define("dist/js/Lottery", ["dist/js/zepto"],
function(a, b, c) {
    function d(a, b, c, d, e, f) {
        this.conNode = a,
        this.background = null,
        this.backCtx = null,
        this.mask = null,
        this.maskCtx = null,
        this.lottery = null,
        this.lotteryType = "image",
        this.cover = b || "#000",
        this.coverType = c,
        this.pixlesData = null,
        this.width = d,
        this.height = e,
        this.lastPosition = null,
        this.drawPercentCallback = f,
        this.vail = !1
    }
    var e = a("dist/js/zepto");
    d.prototype = {
        createElement: function(a, b) {
            var c = document.createElement(a);
            for (var d in b) c.setAttribute(d, b[d]);
            return c
        },
        getTransparentPercent: function(a, b, c) {
            for (var d = a.getImageData(0, 0, b, c), e = d.data, f = [], g = 0, h = e.length; h > g; g += 4) {
                var i = e[g + 3];
                128 > i && f.push(g)
            }
            return (f.length / (e.length / 4) * 100).toFixed(2)
        },
        resizeCanvas: function(a, b, c) {
            a.width = b,
            a.height = c,
            a.getContext("2d").clearRect(0, 0, b, c)
        },
        resizeCanvas_w: function(a, b, c) {
            a.width = b,
            a.height = c,
            a.getContext("2d").clearRect(0, 0, b, c),
            this.vail ? this.drawLottery() : this.drawMask()
        },
        drawPoint: function(a, b) {
            this.maskCtx.beginPath(),
            this.maskCtx.arc(a, b, 30, 0, 2 * Math.PI),
            this.maskCtx.fill(),
            this.maskCtx.beginPath(),
            this.maskCtx.lineWidth = 60,
            this.maskCtx.lineCap = this.maskCtx.lineJoin = "round",
            this.lastPosition && this.maskCtx.moveTo(this.lastPosition[0], this.lastPosition[1]),
            this.maskCtx.lineTo(a, b),
            this.maskCtx.stroke(),
            this.lastPosition = [a, b],
            this.mask.style.zIndex = 20 == this.mask.style.zIndex ? 21 : 20
        },
        bindEvent: function() {
            var a = this,
            b = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),
            c = b ? "touchstart": "mousedown",
            d = b ? "touchmove": "mousemove";
            if (b) a.conNode.addEventListener("touchmove",
            function(a) {
                e && a.preventDefault(),
                a.cancelable ? a.preventDefault() : window.event.returnValue = !1
            },
            !1),
            a.conNode.addEventListener("touchend",
            function() {
                e = !1;
                var b = a.getTransparentPercent(a.maskCtx, a.width, a.height);
                b >= 50 && "function" == typeof a.drawPercentCallback && a.drawPercentCallback()
            },
            !1);
            else {
                var e = !1;
                a.conNode.addEventListener("mouseup",
                function(b) {
                    b.preventDefault(),
                    e = !1;
                    var c = a.getTransparentPercent(a.maskCtx, a.width, a.height);
                    c >= 50 && "function" == typeof a.drawPercentCallback && a.drawPercentCallback()
                },
                !1)
            }
            this.mask.addEventListener(c,
            function(c) {
                c.preventDefault(),
                e = !0;
                var d = b ? c.touches[0].pageX: c.pageX || c.x,
                f = b ? c.touches[0].pageY: c.pageY || c.y;
                a.drawPoint(d, f, e)
            },
            !1),
            this.mask.addEventListener(d,
            function(c) {
                if (c.preventDefault(), !e) return ! 1;
                c.preventDefault();
                var d = b ? c.touches[0].pageX: c.pageX || c.x,
                f = b ? c.touches[0].pageY: c.pageY || c.y;
                a.drawPoint(d, f, e)
            },
            !1)
        },
        drawLottery: function() {
            if ("image" == this.lotteryType) {
                var a = new Image,
                b = this;
                a.crossOrigin = "",
                a.onload = function() {
                    this.width = b.width,
                    this.height = b.height,
                    b.resizeCanvas(b.background, b.width, b.height),
                    b.backCtx.drawImage(this, 0, 0, b.width, b.height),
                    b.drawMask()
                },
                a.src = this.lottery
            } else if ("text" == this.lotteryType) {
                this.width = this.width,
                this.height = this.height,
                this.resizeCanvas(this.background, this.width, this.height),
                this.backCtx.save(),
                this.backCtx.fillStyle = "#FFF",
                this.backCtx.fillRect(0, 0, this.width, this.height),
                this.backCtx.restore(),
                this.backCtx.save();
                var c = 30;
                this.backCtx.font = "Bold " + c + "px Arial",
                this.backCtx.textAlign = "center",
                this.backCtx.fillStyle = "#F60",
                this.backCtx.fillText(this.lottery, this.width / 2, this.height / 2 + c / 2),
                this.backCtx.restore(),
                this.drawMask()
            }
        },
        drawMask: function() {
            if ("color" == this.coverType) this.maskCtx.fillStyle = this.cover,
            this.maskCtx.fillRect(0, 0, this.width, this.height),
            this.maskCtx.globalCompositeOperation = "destination-out";
            else if ("image" == this.coverType) {
                var a = new Image,
                b = this;
                a.crossOrigin = "",
                a.onload = function() {
                    b.resizeCanvas(b.mask, b.width, b.height);
                    /android/i.test(navigator.userAgent.toLowerCase());
                    b.maskCtx.globalAlpha = .98,
                    b.maskCtx.drawImage(this, 0, 0, this.width, this.height, 0, 0, b.width, b.height);
                    var a = 50,
                    c = e("#ca-tips").val(),
                    d = b.maskCtx.createLinearGradient(0, 0, b.width, 0);
                    d.addColorStop("0", "#fff"),
                    d.addColorStop("1.0", "#000"),
                    b.maskCtx.font = "Bold " + a + "px Arial",
                    b.maskCtx.textAlign = "left",
                    b.maskCtx.fillStyle = d,
                    b.maskCtx.fillText(c, b.width / 2 - b.maskCtx.measureText(c).width / 2, 100),
                    b.maskCtx.globalAlpha = 1,
                    b.maskCtx.globalCompositeOperation = "destination-out"
                },
                a.src = this.cover
            }
        },
        init: function(a, b) {
            a && (this.lottery = a, this.lottery.width = this.width, this.lottery.height = this.height, this.lotteryType = b || "image", this.vail = !0),
            this.vail && (this.background = this.background || this.createElement("canvas", {
                style: "position:fixed;left:50%;top:0;width:640px;margin-left:-320px;height:100%;background-color:transparent;"
            })),
            this.mask = this.mask || this.createElement("canvas", {
                style: "position:fixed;left:50%;top:0;width:640px;margin-left:-320px;height:100%;background-color:transparent;"
            }),
            this.mask.style.zIndex = 20,
            this.conNode.innerHTML.replace(/[\w\W]| /g, "") || (this.vail && this.conNode.appendChild(this.background), this.conNode.appendChild(this.mask), this.bindEvent()),
            this.vail && (this.backCtx = this.backCtx || this.background.getContext("2d")),
            this.maskCtx = this.maskCtx || this.mask.getContext("2d"),
            this.vail ? this.drawLottery() : this.drawMask();
            var c = this;
            window.addEventListener("resize",
            function() {
                c.width = document.documentElement.clientWidth,
                c.height = document.documentElement.clientHeight,
                c.resizeCanvas_w(c.mask, c.width, c.height)
            },
            !1)
        }
    },
    c.exports = d
}),
define("dist/js/video", ["dist/js/zepto", "dist/js/global"],
function(a) {
    var b = a("dist/js/zepto"),
    c = a("dist/js/global");
    b(".u-maskLayer-close").on("click",
    function() {
        b(this).parent().trigger("click")
    });
    var d = {
        _video: b(".j-video"),
        _videoArr: [],
        video_init: function() {
            var a = this;
            this._video.each(function() {
                var d, e = b(this).attr("data-video-src"),
                f = b(this).attr("data-video-type"),
                g = b(this).find(".img"),
                h = b(this).find(".video");
                "bendi" == f ? d = a.bendi_video(e) : "qq" == f ? d = a.qq_video(e) : "youku" == f && (d = a.youku_video(e)),
                b(this).find(".videoWrap").append(b(d)),
                a._videoArr.push(d),
                g.on("click",
                function() {
                    b(this).hide(),
                    "IFRAME" == d.nodeName && b(d).data("src") && (d.src = b(d).data("src")),
                    h.removeClass("f-hide"),
                    setTimeout(function() {
                        h.addClass("z-show"),
                        setTimeout(function() {
                            "function" == typeof d.play && d.play()
                        },
                        500)
                    },
                    20),
                    c._handleEvent("video_open", d)
                }),
                h.on("click",
                function(a) {
                    var e = a.target;
                    b(e).hasClass("videoWrap") || b(e).parents(".videoWrap").length >= 1 || (h.removeClass("z-show"), g.show(), "function" == typeof d.pause && d.pause(), "IFRAME" == d.nodeName && (b(d).data("src", d.src), d.src = ""), setTimeout(function() {
                        h.addClass("f-hide"),
                        c._handleEvent("video_close", d)
                    },
                    500))
                })
            })
        },
        bendi_video: function(a) {
            var c = {
                controls: "controls",
                preload: "none",
                src: a
            },
            d = b("<video></video>")[0];
            for (var e in c) c.hasOwnProperty(e) && e in d && (d[e] = c[e]);
            return d
        },
        qq_video: function(a) {
            return b('<iframe src="' + a + '" frameborder=0 allowfullscreen></iframe>')[0]
        },
        youku_video: function(a) {
            return b('<iframe src="' + a + '" frameborder=0 allowfullscreen></iframe>')[0]
        }
    };
    return d
});