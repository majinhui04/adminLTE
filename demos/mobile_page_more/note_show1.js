!
function(t) {
    "use strict";
    var e = function(e) {
        this.element = t(e)
    };
    e.prototype = {
        constructor: e,
        show: function() {
            var e, n, r, i = this.element,
            o = i.closest("ul:not(.dropdown-menu)"),
            a = i.attr("data-target");
            a || (a = i.attr("href"), a = a && a.replace(/.*(?=#[^\s]*$)/, "")),
            i.parent("li").hasClass("active") || (e = o.find(".active:last a")[0], r = t.Event("show", {
                relatedTarget: e
            }), i.trigger(r), r.isDefaultPrevented() || (n = t(a), this.activate(i.parent("li"), o), this.activate(n, n.parent(),
            function() {
                i.trigger({
                    type: "shown",
                    relatedTarget: e
                })
            })))
        },
        activate: function(e, n, r) {
            function i() {
                o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),
                e.addClass("active"),
                a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"),
                e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"),
                r && r()
            }
            var o = n.find("> .active"),
            a = r && t.support.transition && o.hasClass("fade");
            a ? o.one(t.support.transition.end, i) : i(),
            o.removeClass("in")
        }
    };
    var n = t.fn.tab;
    t.fn.tab = function(n) {
        return this.each(function() {
            var r = t(this),
            i = r.data("tab");
            i || r.data("tab", i = new e(this)),
            "string" == typeof n && i[n]()
        })
    },
    t.fn.tab.Constructor = e,
    t.fn.tab.noConflict = function() {
        return t.fn.tab = n,
        this
    },
    t(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]',
    function(e) {
        e.preventDefault(),
        t(this).tab("show")
    })
} (window.jQuery),
function() {
    Maleskine.ShareScripts = {
        share: function(t, e, n, r, i, o, a) {
            var s, u;
            return e = e.replace(/'/, "%2527"),
            u = o ? I18n.t("reading.social_sharing.self_share_note_text", {
                note_title: e
            }) : I18n.t("reading.social_sharing.reader_share_note_text", {
                note_title: e,
                user: i
            }),
            u += Maleskine.Settings.mention_official_account(t),
            null != n && (n = n.replace(/'/, "%2527"), u = "" + u + " \u300c" + n + "\u300d"),
            s = Maleskine.ShareScripts.getShareUrl(t, e, n, u, r, a),
            "javascript:void(function(){var d=document;var r='" + s + "';var x=function(){if(!window.open(r,'" + t + "','toolbar=0,status=0,resizable=1,scrollbars=yes,status=1,width=440,height=430,left='+(screen.width-440)/2+',top='+(screen.height-430)/2))location.href=r};if(/Firefox/.test(navigator.userAgent)){setTimeout(x,0)}else{x()}}())"
        },
        getShareUrl: function(t, e, n, r, i, o) {
            var a;
            switch (e = encodeURIComponent(e), r = encodeURIComponent(r), i = encodeURIComponent(i + ("?utm_campaign=maleskine&utm_content=note&utm_medium=reader_share&utm_source=" + t)), t) {
            case "weibo":
                return a = "http://service.weibo.com/share/share.php?appkey=" + Maleskine.Settings.weibo.appKey + "&title=" + encodeURIComponent(r) + "&url=" + encodeURIComponent(i) + "&searchPic=false&style=simple",
                o.length > 0 && (a += "&pic=" + encodeURIComponent(o[0])),
                a;
            case "twitter":
                return null != n ? "http://twitter.com/share?url=" + i + "&text=" + r + "&related=jianshucom": "http://twitter.com/share?url=" + encodeURIComponent(i) + "&text=" + r + "&related=jianshucom";
            case "douban":
                return "http://www.douban.com/recommend/?url=" + encodeURIComponent(i) + "&title=" + e + "&v=1";
            case "tweibo":
                return "http://share.v.t.qq.com/index.php?c=share&a=index&url=" + encodeURIComponent(i) + "&title=" + r;
            case "qzone":
                return "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(i) + "&title=" + r;
            case "facebook":
                return "http://www.facebook.com/sharer.php?s=100&p[url]=" + encodeURIComponent(i) + "&p[title]=" + e + "&p[summary]=" + r;
            case "google_plus":
                return "http://plus.google.com/share?url=" + encodeURIComponent(i);
            case "renren":
                return "http://widget.renren.com/dialog/share?resourceUrl=" + encodeURIComponent(i) + "&description=" + r + "&title=" + e
            }
        }
    }
}.call(this),
function() { !
    function(t) {
        return "function" == typeof define && define.amd ? define(["jquery"], t) : t(window.jQuery)
    } (function(t) {
        "use strict";
        var e, n, r, i, o, a, s, u, l, c, h;
        return c = "caret",
        e = function() {
            function e(t) {
                this.$inputor = t,
                this.domInputor = this.$inputor[0]
            }
            return e.prototype.setPos = function() {
                return this.domInputor
            },
            e.prototype.getIEPosition = function() {
                return t.noop()
            },
            e.prototype.getPosition = function() {
                return t.noop()
            },
            e.prototype.getOldIEPos = function() {
                var t, e;
                return e = s.selection.createRange(),
                t = s.body.createTextRange(),
                t.moveToElementText(this.domInputor),
                t.setEndPoint("EndToEnd", e),
                t.text.length
            },
            e.prototype.getPos = function() {
                var t, e, n;
                return (n = this.range()) ? (t = n.cloneRange(), t.selectNodeContents(this.domInputor), t.setEnd(n.endContainer, n.endOffset), e = t.toString().length, t.detach(), e) : s.selection ? this.getOldIEPos() : void 0
            },
            e.prototype.getOldIEOffset = function() {
                var t, e;
                return t = s.selection.createRange().duplicate(),
                t.moveStart("character", -1),
                e = t.getBoundingClientRect(),
                {
                    height: e.bottom - e.top,
                    left: e.left,
                    top: e.top
                }
            },
            e.prototype.getOffset = function() {
                var e, n, r, i;
                if (l.getSelection && (r = this.range())) {
                    if (r.endOffset - 1 < 0) return null;
                    e = r.cloneRange(),
                    e.setStart(r.endContainer, r.endOffset - 1),
                    e.setEnd(r.endContainer, r.endOffset),
                    i = e.getBoundingClientRect(),
                    n = {
                        height: i.height,
                        left: i.left + i.width,
                        top: i.top
                    },
                    e.detach()
                } else s.selection && (n = this.getOldIEOffset());
                return n && !u && (n.top += t(l).scrollTop(), n.left += t(l).scrollLeft()),
                n
            },
            e.prototype.range = function() {
                var t;
                if (l.getSelection) return t = l.getSelection(),
                t.rangeCount > 0 ? t.getRangeAt(0) : null
            },
            e
        } (),
        n = function() {
            function e(t) {
                this.$inputor = t,
                this.domInputor = this.$inputor[0]
            }
            return e.prototype.getIEPos = function() {
                var t, e, n, r, i, o, a;
                return e = this.domInputor,
                o = s.selection.createRange(),
                i = 0,
                o && o.parentElement() === e && (r = e.value.replace(/\r\n/g, "\n"), n = r.length, a = e.createTextRange(), a.moveToBookmark(o.getBookmark()), t = e.createTextRange(), t.collapse(!1), i = a.compareEndPoints("StartToEnd", t) > -1 ? n: -a.moveStart("character", -n)),
                i
            },
            e.prototype.getPos = function() {
                return s.selection ? this.getIEPos() : this.domInputor.selectionStart
            },
            e.prototype.setPos = function(t) {
                var e, n;
                return e = this.domInputor,
                s.selection ? (n = e.createTextRange(), n.move("character", t), n.select()) : e.setSelectionRange && e.setSelectionRange(t, t),
                e
            },
            e.prototype.getIEOffset = function(t) {
                var e, n, r, i;
                return n = this.domInputor.createTextRange(),
                t || (t = this.getPos()),
                n.move("character", t),
                r = n.boundingLeft,
                i = n.boundingTop,
                e = n.boundingHeight,
                {
                    left: r,
                    top: i,
                    height: e
                }
            },
            e.prototype.getOffset = function(e) {
                var n, r, i;
                return n = this.$inputor,
                s.selection ? (r = this.getIEOffset(e), r.top += t(l).scrollTop() + n.scrollTop(), r.left += t(l).scrollLeft() + n.scrollLeft(), r) : (r = n.offset(), i = this.getPosition(e), r = {
                    left: r.left + i.left - n.scrollLeft(),
                    top: r.top + i.top - n.scrollTop(),
                    height: i.height
                })
            },
            e.prototype.getPosition = function(t) {
                var e, n, i, o, a, s;
                return e = this.$inputor,
                i = function(t) {
                    return t.replace(/</g, "&lt").replace(/>/g, "&gt").replace(/`/g, "&#96").replace(/"/g, "&quot").replace(/\r\n|\r|\n/g, "<br />")
                },
                void 0 === t && (t = this.getPos()),
                s = e.val().slice(0, t),
                o = "<span>" + i(s) + "</span>",
                o += "<span id='caret'>|</span>",
                a = new r(e),
                n = a.create(o).rect()
            },
            e.prototype.getIEPosition = function(t) {
                var e, n, r, i, o;
                return r = this.getIEOffset(t),
                n = this.$inputor.offset(),
                i = r.left - n.left,
                o = r.top - n.top,
                e = r.height,
                {
                    left: i,
                    top: o,
                    height: e
                }
            },
            e
        } (),
        r = function() {
            function e(t) {
                this.$inputor = t
            }
            return e.prototype.css_attr = ["overflowY", "height", "width", "paddingTop", "paddingLeft", "paddingRight", "paddingBottom", "marginTop", "marginLeft", "marginRight", "marginBottom", "fontFamily", "borderStyle", "borderWidth", "wordWrap", "fontSize", "lineHeight", "overflowX", "text-align"],
            e.prototype.mirrorCss = function() {
                var e, n = this;
                return e = {
                    position: "absolute",
                    left: -9999,
                    top: 0,
                    zIndex: -2e4,
                    "white-space": "pre-wrap"
                },
                t.each(this.css_attr,
                function(t, r) {
                    return e[r] = n.$inputor.css(r)
                }),
                e
            },
            e.prototype.create = function(e) {
                return this.$mirror = t("<div></div>"),
                this.$mirror.css(this.mirrorCss()),
                this.$mirror.html(e),
                this.$inputor.after(this.$mirror),
                this
            },
            e.prototype.rect = function() {
                var t, e, n;
                return t = this.$mirror.find("#caret"),
                e = t.position(),
                n = {
                    left: e.left,
                    top: e.top,
                    height: t.height()
                },
                this.$mirror.remove(),
                n
            },
            e
        } (),
        i = {
            contentEditable: function(t) {
                return ! (!t[0].contentEditable || "true" !== t[0].contentEditable)
            }
        },
        a = {
            pos: function(t) {
                return t || 0 === t ? this.setPos(t) : this.getPos()
            },
            position: function(t) {
                return s.selection ? this.getIEPosition(t) : this.getPosition(t)
            },
            offset: function(e) {
                var n, r;
                return r = this.getOffset(e),
                u && (n = t(u).offset(), r.top += n.top, r.left += n.left),
                r
            }
        },
        s = null,
        l = null,
        u = null,
        h = function(t) {
            return u = t,
            l = t.contentWindow,
            s = t.contentDocument || l.document
        },
        o = function(e, n) {
            var r, i;
            if (t.isPlainObject(n) && (i = n.iframe)) return e.data("caret-iframe", i),
            h(i);
            if (i = e.data("caret-iframe")) return h(i);
            s = e[0].ownerDocument,
            l = s.defaultView || s.parentWindow;
            try {
                return u = l.frameElement
            } catch(o) {
                r = o
            }
        },
        t.fn.caret = function(r) {
            var s;
            return "object" == typeof r ? (o(this, r), this) : a[r] ? (o(this), s = i.contentEditable(this) ? new e(this) : new n(this), a[r].apply(s, Array.prototype.slice.call(arguments, 1))) : t.error("Method " + r + " does not exist on jQuery.caret")
        },
        t.fn.caret.EditableCaret = e,
        t.fn.caret.InputCaret = n,
        t.fn.caret.Utils = i,
        t.fn.caret.apis = a
    })
}.call(this),
function() { !
    function(t) {
        return "function" == typeof define && define.amd ? define(["jquery"], t) : t(window.jQuery)
    } (function(t) {
        var e, n, r, i, o, a, s, u, l, c = [].slice;
        r = function() {
            function e(e) {
                this.current_flag = null,
                this.controllers = {},
                this.alias_maps = {},
                this.$inputor = t(e),
                this.iframe = null,
                this.setIframe(),
                this.listen()
            }
            return e.prototype.setIframe = function(t) {
                var e;
                if (t) return this.window = t.contentWindow,
                this.document = t.contentDocument || this.window.document,
                this.iframe = t,
                this;
                this.document = this.$inputor[0].ownerDocument,
                this.window = this.document.defaultView || this.document.parentWindow;
                try {
                    return this.iframe = this.window.frameElement
                } catch(n) {
                    e = n
                }
            },
            e.prototype.controller = function(t) {
                return this.controllers[this.alias_maps[t] || t || this.current_flag]
            },
            e.prototype.set_context_for = function(t) {
                return this.current_flag = t,
                this
            },
            e.prototype.reg = function(t, e) {
                var n, r;
                return n = (r = this.controllers)[t] || (r[t] = new o(this, t)),
                e.alias && (this.alias_maps[e.alias] = t),
                n.init(e),
                this
            },
            e.prototype.listen = function() {
                return this.$inputor.on("keyup.atwhoInner",
                function(t) {
                    return function(e) {
                        return t.on_keyup(e)
                    }
                } (this)).on("keydown.atwhoInner",
                function(t) {
                    return function(e) {
                        return t.on_keydown(e)
                    }
                } (this)).on("scroll.atwhoInner",
                function(t) {
                    return function() {
                        var e;
                        return null != (e = t.controller()) ? e.view.hide() : void 0
                    }
                } (this)).on("blur.atwhoInner",
                function(t) {
                    return function() {
                        var e;
                        return (e = t.controller()) ? e.view.hide(e.get_opt("display_timeout")) : void 0
                    }
                } (this))
            },
            e.prototype.shutdown = function() {
                var t, e, n;
                n = this.controllers;
                for (e in n) t = n[e],
                t.destroy(),
                delete this.controllers[e];
                return this.$inputor.off(".atwhoInner")
            },
            e.prototype.dispatch = function() {
                return t.map(this.controllers,
                function(t) {
                    return function(e) {
                        var n;
                        return (n = e.get_opt("delay")) ? (clearTimeout(t.delayedCallback), t.delayedCallback = setTimeout(function() {
                            return e.look_up() ? t.set_context_for(e.at) : void 0
                        },
                        n)) : e.look_up() ? t.set_context_for(e.at) : void 0
                    }
                } (this))
            },
            e.prototype.on_keyup = function(e) {
                var n;
                switch (e.keyCode) {
                case s.ESC:
                    e.preventDefault(),
                    null != (n = this.controller()) && n.view.hide();
                    break;
                case s.DOWN:
                case s.UP:
                case s.CTRL:
                    t.noop();
                    break;
                case s.P:
                case s.N:
                    e.ctrlKey || this.dispatch();
                    break;
                default:
                    this.dispatch()
                }
            },
            e.prototype.on_keydown = function(e) {
                var n, r;
                if (n = null != (r = this.controller()) ? r.view: void 0, n && n.visible()) switch (e.keyCode) {
                case s.ESC:
                    e.preventDefault(),
                    n.hide();
                    break;
                case s.UP:
                    e.preventDefault(),
                    n.prev();
                    break;
                case s.DOWN:
                    e.preventDefault(),
                    n.next();
                    break;
                case s.P:
                    if (!e.ctrlKey) return;
                    e.preventDefault(),
                    n.prev();
                    break;
                case s.N:
                    if (!e.ctrlKey) return;
                    e.preventDefault(),
                    n.next();
                    break;
                case s.TAB:
                case s.ENTER:
                    if (!n.visible()) return;
                    e.preventDefault(),
                    n.choose();
                    break;
                default:
                    t.noop()
                }
            },
            e
        } (),
        o = function() {
            function n(n, r) {
                this.app = n,
                this.at = r,
                this.$inputor = this.app.$inputor,
                this.id = this.$inputor[0].id || this.uid(),
                this.setting = null,
                this.query = null,
                this.pos = 0,
                this.cur_rect = null,
                this.range = null,
                e.append(this.$el = t("<div id='atwho-ground-" + this.id + "'></div>")),
                this.model = new u(this),
                this.view = new l(this)
            }
            return n.prototype.uid = function() {
                return (Math.random().toString(16) + "000000000").substr(2, 8) + (new Date).getTime()
            },
            n.prototype.init = function(e) {
                return this.setting = t.extend({},
                this.setting || t.fn.atwho["default"], e),
                this.view.init(),
                this.model.reload(this.setting.data)
            },
            n.prototype.destroy = function() {
                return this.trigger("beforeDestroy"),
                this.model.destroy(),
                this.view.destroy(),
                this.$el.remove()
            },
            n.prototype.call_default = function() {
                var e, n, r;
                r = arguments[0],
                e = 2 <= arguments.length ? c.call(arguments, 1) : [];
                try {
                    return a[r].apply(this, e)
                } catch(i) {
                    return n = i,
                    t.error("" + n + " Or maybe At.js doesn't have function " + r)
                }
            },
            n.prototype.trigger = function(t, e) {
                var n, r;
                return null == e && (e = []),
                e.push(this),
                n = this.get_opt("alias"),
                r = n ? "" + t + "-" + n + ".atwho": "" + t + ".atwho",
                this.$inputor.trigger(r, e)
            },
            n.prototype.callbacks = function(t) {
                return this.get_opt("callbacks")[t] || a[t]
            },
            n.prototype.get_opt = function(t) {
                var e;
                try {
                    return this.setting[t]
                } catch(n) {
                    return e = n,
                    null
                }
            },
            n.prototype.content = function() {
                return this.$inputor.is("textarea, input") ? this.$inputor.val() : this.$inputor.text()
            },
            n.prototype.catch_query = function() {
                var t, e, n, r, i, o;
                return e = this.content(),
                t = this.$inputor.caret("pos"),
                o = e.slice(0, t),
                r = this.callbacks("matcher").call(this, this.at, o, this.get_opt("start_with_space")),
                "string" == typeof r && r.length <= this.get_opt("max_len", 20) ? (i = t - r.length, n = i + r.length, this.pos = i, r = {
                    text: r,
                    head_pos: i,
                    end_pos: n
                },
                this.trigger("matched", [this.at, r.text])) : (r = null, this.view.hide()),
                this.query = r
            },
            n.prototype.rect = function() {
                var t, e;
                if (t = this.$inputor.caret({
                    iframe: this.app.iframe
                }).caret("offset", this.pos - 1)) return "true" === this.$inputor.attr("contentEditable") && (t = this.cur_rect || (this.cur_rect = t) || t),
                e = this.app.document.selection ? 0 : 2,
                {
                    left: t.left,
                    top: t.top,
                    bottom: t.top + t.height + e
                }
            },
            n.prototype.reset_rect = function() {
                return "true" === this.$inputor.attr("contentEditable") ? this.cur_rect = null: void 0
            },
            n.prototype.mark_range = function() {
                return "true" === this.$inputor.attr("contentEditable") && (this.app.window.getSelection && (this.range = this.app.window.getSelection().getRangeAt(0)), this.app.document.selection) ? this.ie8_range = this.app.document.selection.createRange() : void 0
            },
            n.prototype.insert_content_for = function(e) {
                var n, r, i;
                return r = e.data("value"),
                i = this.get_opt("insert_tpl"),
                this.$inputor.is("textarea, input") || !i ? r: (n = t.extend({},
                e.data("item-data"), {
                    "atwho-data-value": r,
                    "atwho-at": this.at
                }), this.callbacks("tpl_eval").call(this, i, n))
            },
            n.prototype.insert = function(e, n) {
                var r, i, o, a, s, u, l, c, h, d, p;
                return r = this.$inputor,
                "true" === r.attr("contentEditable") && (o = "atwho-view-flag atwho-view-flag-" + (this.get_opt("alias") || this.at), a = "" + e + "<span contenteditable='false'>&nbsp;<span>", s = "<span contenteditable='false' class='" + o + "'>" + a + "</span>", i = t(s, this.app.document).data("atwho-data-item", n.data("item-data")), this.app.document.selection && (i = t("<span contenteditable='true'></span>", this.app.document).html(i))),
                r.is("textarea, input") ? (e = "" + e, h = r.val(), d = h.slice(0, Math.max(this.query.head_pos - this.at.length, 0)), p = "" + d + e + " " + h.slice(this.query.end_pos || 0), r.val(p), r.caret("pos", d.length + e.length + 1)) : (l = this.range) ? (u = l.startOffset - (this.query.end_pos - this.query.head_pos) - this.at.length, l.setStart(l.endContainer, Math.max(u, 0)), l.setEnd(l.endContainer, l.endOffset), l.deleteContents(), l.insertNode(i[0]), l.collapse(!1), c = this.app.window.getSelection(), c.removeAllRanges(), c.addRange(l)) : (l = this.ie8_range) && (l.moveStart("character", this.query.end_pos - this.query.head_pos - this.at.length), l.pasteHTML(a), l.collapse(!1), l.select()),
                r.is(":focus") || r.focus(),
                r.change()
            },
            n.prototype.render_view = function(t) {
                var e;
                return e = this.get_opt("search_key"),
                t = this.callbacks("sorter").call(this, this.query.text, t.slice(0, 1001), e),
                this.view.render(t.slice(0, this.get_opt("limit")))
            },
            n.prototype.look_up = function() {
                var e, n;
                if (e = this.catch_query()) return n = function(t) {
                    return t && t.length > 0 ? this.render_view(t) : this.view.hide()
                },
                this.model.query(e.text, t.proxy(n, this)),
                e
            },
            n
        } (),
        u = function() {
            function e(t) {
                this.context = t,
                this.at = this.context.at,
                this.storage = this.context.$inputor
            }
            return e.prototype.destroy = function() {
                return this.storage.data(this.at, null)
            },
            e.prototype.saved = function() {
                return this.fetch() > 0
            },
            e.prototype.query = function(t, e) {
                var n, r, i;
                return n = this.fetch(),
                r = this.context.get_opt("search_key"),
                n = this.context.callbacks("filter").call(this.context, t, n, r) || [],
                i = this.context.callbacks("remote_filter"),
                n.length > 0 || !i && 0 === n.length ? e(n) : i.call(this.context, t, e)
            },
            e.prototype.fetch = function() {
                return this.storage.data(this.at) || []
            },
            e.prototype.save = function(t) {
                return this.storage.data(this.at, this.context.callbacks("before_save").call(this.context, t || []))
            },
            e.prototype.load = function(t) {
                return ! this.saved() && t ? this._load(t) : void 0
            },
            e.prototype.reload = function(t) {
                return this._load(t)
            },
            e.prototype._load = function(e) {
                return "string" == typeof e ? t.ajax(e, {
                    dataType: "json"
                }).done(function(t) {
                    return function(e) {
                        return t.save(e)
                    }
                } (this)) : this.save(e)
            },
            e
        } (),
        l = function() {
            function e(e) {
                this.context = e,
                this.$el = t("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>"),
                this.timeout_id = null,
                this.context.$el.append(this.$el),
                this.bind_event()
            }
            return e.prototype.init = function() {
                var t;
                return t = this.context.get_opt("alias") || this.context.at.charCodeAt(0),
                this.$el.attr({
                    id: "at-view-" + t
                })
            },
            e.prototype.destroy = function() {
                return this.$el.remove()
            },
            e.prototype.bind_event = function() {
                var e;
                return e = this.$el.find("ul"),
                e.on("mouseenter.atwho-view", "li",
                function(n) {
                    return e.find(".cur").removeClass("cur"),
                    t(n.currentTarget).addClass("cur")
                }).on("click",
                function(t) {
                    return function(e) {
                        return t.choose(),
                        e.preventDefault()
                    }
                } (this))
            },
            e.prototype.visible = function() {
                return this.$el.is(":visible")
            },
            e.prototype.choose = function() {
                var t, e;
                return (t = this.$el.find(".cur")).length ? (e = this.context.insert_content_for(t), this.context.insert(this.context.callbacks("before_insert").call(this.context, e, t), t), this.context.trigger("inserted", [t]), this.hide()) : void 0
            },
            e.prototype.reposition = function(e) {
                var n, r;
                return e.bottom + this.$el.height() - t(window).scrollTop() > t(window).height() && (e.bottom = e.top - this.$el.height()),
                n = {
                    left: e.left,
                    top: e.bottom
                },
                null != (r = this.context.callbacks("before_reposition")) && r.call(this.context, n),
                this.$el.offset(n),
                this.context.trigger("reposition", [n])
            },
            e.prototype.next = function() {
                var t, e;
                return t = this.$el.find(".cur").removeClass("cur"),
                e = t.next(),
                e.length || (e = this.$el.find("li:first")),
                e.addClass("cur")
            },
            e.prototype.prev = function() {
                var t, e;
                return t = this.$el.find(".cur").removeClass("cur"),
                e = t.prev(),
                e.length || (e = this.$el.find("li:last")),
                e.addClass("cur")
            },
            e.prototype.show = function() {
                var t;
                return this.context.mark_range(),
                this.visible() || (this.$el.show(), this.context.trigger("shown")),
                (t = this.context.rect()) ? this.reposition(t) : void 0
            },
            e.prototype.hide = function(t) {
                var e;
                return isNaN(t && this.visible()) ? (this.context.reset_rect(), this.$el.hide(), this.context.trigger("hidden")) : (e = function(t) {
                    return function() {
                        return t.hide()
                    }
                } (this), clearTimeout(this.timeout_id), this.timeout_id = setTimeout(e, t))
            },
            e.prototype.render = function(e) {
                var n, r, i, o, a, s, u;
                if (! (t.isArray(e) && e.length > 0)) return void this.hide();
                for (this.$el.find("ul").empty(), r = this.$el.find("ul"), a = this.context.get_opt("tpl"), s = 0, u = e.length; u > s; s++) i = e[s],
                i = t.extend({},
                i, {
                    "atwho-at": this.context.at
                }),
                o = this.context.callbacks("tpl_eval").call(this.context, a, i),
                n = t(this.context.callbacks("highlighter").call(this.context, o, this.context.query.text)),
                n.data("item-data", i),
                r.append(n);
                return this.show(),
                this.context.get_opt("highlight_first") ? r.find("li:first").addClass("cur") : void 0
            },
            e
        } (),
        s = {
            DOWN: 40,
            UP: 38,
            ESC: 27,
            TAB: 9,
            ENTER: 13,
            CTRL: 17,
            P: 80,
            N: 78
        },
        a = {
            before_save: function(e) {
                var n, r, i, o;
                if (!t.isArray(e)) return e;
                for (o = [], r = 0, i = e.length; i > r; r++) n = e[r],
                o.push(t.isPlainObject(n) ? n: {
                    name: n
                });
                return o
            },
            matcher: function(t, e, n) {
                var r, i;
                return t = t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
                n && (t = "(?:^|\\s)" + t),
                i = new RegExp(t + "([A-Za-z0-9_+-]*)$|" + t + "([^\\x00-\\xff]*)$", "gi"),
                r = i.exec(e),
                r ? r[2] || r[1] : null
            },
            filter: function(t, e, n) {
                var r, i, o, a;
                for (a = [], i = 0, o = e.length; o > i; i++) r = e[i],
                ~r[n].toLowerCase().indexOf(t.toLowerCase()) && a.push(r);
                return a
            },
            remote_filter: null,
            sorter: function(t, e, n) {
                var r, i, o, a;
                if (!t) return e;
                for (a = [], i = 0, o = e.length; o > i; i++) r = e[i],
                r.atwho_order = r[n].toLowerCase().indexOf(t.toLowerCase()),
                r.atwho_order > -1 && a.push(r);
                return a.sort(function(t, e) {
                    return t.atwho_order - e.atwho_order
                })
            },
            tpl_eval: function(t, e) {
                var n;
                try {
                    return t.replace(/\$\{([^\}]*)\}/g,
                    function(t, n) {
                        return e[n]
                    })
                } catch(r) {
                    return n = r,
                    ""
                }
            },
            highlighter: function(t, e) {
                var n;
                return e ? (n = new RegExp(">\\s*(\\w*)(" + e.replace("+", "\\+") + ")(\\w*)\\s*<", "ig"), t.replace(n,
                function(t, e, n, r) {
                    return "> " + e + "<strong>" + n + "</strong>" + r + " <"
                })) : t
            },
            before_insert: function(t) {
                return t
            }
        },
        n = {
            load: function(t, e) {
                var n;
                return (n = this.controller(t)) ? n.model.load(e) : void 0
            },
            getInsertedItemsWithIDs: function(e) {
                var n, r, i;
                return (n = this.controller(e)) ? (e && (e = "-" + (n.get_opt("alias") || n.at)), r = [], i = t.map(this.$inputor.find("span.atwho-view-flag" + (e || "")),
                function(e) {
                    var n;
                    return n = t(e).data("atwho-data-item"),
                    r.indexOf(n.id) > -1 ? void 0 : (n.id && (r.push = n.id), n)
                }), [r, i]) : [null, null]
            },
            getInsertedItems: function(t) {
                return n.getInsertedItemsWithIDs.apply(this, [t])[1]
            },
            getInsertedIDs: function(t) {
                return n.getInsertedItemsWithIDs.apply(this, [t])[0]
            },
            setIframe: function(t) {
                return this.setIframe(t)
            },
            run: function() {
                return this.dispatch()
            },
            destroy: function() {
                return this.shutdown(),
                this.$inputor.data("atwho", null)
            }
        },
        i = {
            init: function(e) {
                var n, i;
                return i = (n = t(this)).data("atwho"),
                i || n.data("atwho", i = new r(this)),
                i.reg(e.at, e),
                this
            }
        },
        e = t("<div id='atwho-container'></div>"),
        t.fn.atwho = function(r) {
            var o, a;
            return a = arguments,
            t("body").append(e),
            o = null,
            this.filter("textarea, input, [contenteditable=true]").each(function() {
                var e;
                return "object" != typeof r && r ? n[r] ? (e = t(this).data("atwho")) ? o = n[r].apply(e, Array.prototype.slice.call(a, 1)) : void 0 : t.error("Method " + r + " does not exist on jQuery.caret") : i.init.apply(this, a)
            }),
            o || this
        },
        t.fn.atwho["default"] = {
            at: void 0,
            alias: void 0,
            data: null,
            tpl: "<li data-value='${atwho-at}${name}'>${name}</li>",
            insert_tpl: "<span>${atwho-data-value}</span>",
            callbacks: a,
            search_key: "name",
            start_with_space: !0,
            highlight_first: !0,
            limit: 5,
            max_len: 20,
            display_timeout: 300,
            delay: null
        }
    })
}.call(this),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
} (function(t) {
    function e() {
        var e = n(this),
        a = o.settings;
        return isNaN(e.datetime) || (0 == a.cutoff || Math.abs(i(e.datetime)) < a.cutoff) && t(this).text(r(e.datetime)),
        this
    }
    function n(e) {
        if (e = t(e), !e.data("timeago")) {
            e.data("timeago", {
                datetime: o.datetime(e)
            });
            var n = t.trim(e.text());
            o.settings.localeTitle ? e.attr("title", e.data("timeago").datetime.toLocaleString()) : !(n.length > 0) || o.isTime(e) && e.attr("title") || e.attr("title", n)
        }
        return e.data("timeago")
    }
    function r(t) {
        return o.inWords(i(t))
    }
    function i(t) {
        return (new Date).getTime() - t.getTime()
    }
    t.timeago = function(e) {
        return r(e instanceof Date ? e: "string" == typeof e ? t.timeago.parse(e) : "number" == typeof e ? new Date(e) : t.timeago.datetime(e))
    };
    var o = t.timeago;
    t.extend(t.timeago, {
        settings: {
            refreshMillis: 6e4,
            allowPast: !0,
            allowFuture: !1,
            localeTitle: !1,
            cutoff: 0,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                inPast: "any moment now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                wordSeparator: " ",
                numbers: []
            }
        },
        inWords: function(e) {
            function n(n, i) {
                var o = t.isFunction(n) ? n(i, e) : n,
                a = r.numbers && r.numbers[i] || i;
                return o.replace(/%d/i, a)
            }
            if (!this.settings.allowPast && !this.settings.allowFuture) throw "timeago allowPast and allowFuture settings can not both be set to false.";
            var r = this.settings.strings,
            i = r.prefixAgo,
            o = r.suffixAgo;
            if (this.settings.allowFuture && 0 > e && (i = r.prefixFromNow, o = r.suffixFromNow), !this.settings.allowPast && e >= 0) return this.settings.strings.inPast;
            var a = Math.abs(e) / 1e3,
            s = a / 60,
            u = s / 60,
            l = u / 24,
            c = l / 365,
            h = 45 > a && n(r.seconds, Math.round(a)) || 90 > a && n(r.minute, 1) || 45 > s && n(r.minutes, Math.round(s)) || 90 > s && n(r.hour, 1) || 24 > u && n(r.hours, Math.round(u)) || 42 > u && n(r.day, 1) || 30 > l && n(r.days, Math.round(l)) || 45 > l && n(r.month, 1) || 365 > l && n(r.months, Math.round(l / 30)) || 1.5 > c && n(r.year, 1) || n(r.years, Math.round(c)),
            d = r.wordSeparator || "";
            return void 0 === r.wordSeparator && (d = " "),
            t.trim([i, h, o].join(d))
        },
        parse: function(e) {
            var n = t.trim(e);
            return n = n.replace(/\.\d+/, ""),
            n = n.replace(/-/, "/").replace(/-/, "/"),
            n = n.replace(/T/, " ").replace(/Z/, " UTC"),
            n = n.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"),
            n = n.replace(/([\+\-]\d\d)$/, " $100"),
            new Date(n)
        },
        datetime: function(e) {
            var n = t(e).attr(o.isTime(e) ? "datetime": "title");
            return o.parse(n)
        },
        isTime: function(e) {
            return "time" === t(e).get(0).tagName.toLowerCase()
        }
    });
    var a = {
        init: function() {
            var n = t.proxy(e, this);
            n();
            var r = o.settings;
            r.refreshMillis > 0 && (this._timeagoInterval = setInterval(n, r.refreshMillis))
        },
        update: function(n) {
            var r = o.parse(n);
            t(this).data("timeago", {
                datetime: r
            }),
            o.settings.localeTitle && t(this).attr("title", r.toLocaleString()),
            e.apply(this)
        },
        updateFromDOM: function() {
            t(this).data("timeago", {
                datetime: o.parse(t(this).attr(o.isTime(this) ? "datetime": "title"))
            }),
            e.apply(this)
        },
        dispose: function() {
            this._timeagoInterval && (window.clearInterval(this._timeagoInterval), this._timeagoInterval = null)
        }
    };
    t.fn.timeago = function(t, e) {
        var n = t ? a[t] : a.init;
        if (!n) throw new Error("Unknown function name '" + t + "' for timeago");
        return this.each(function() {
            n.call(this, e)
        }),
        this
    },
    document.createElement("abbr"),
    document.createElement("time")
}),
function() {
    var t = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    },
    e = {}.hasOwnProperty,
    n = function(t, n) {
        function r() {
            this.constructor = t
        }
        for (var i in n) e.call(n, i) && (t[i] = n[i]);
        return r.prototype = n.prototype,
        t.prototype = new r,
        t.__super__ = n.prototype,
        t
    };
    Maleskine.NoteLike = function(e) {
        function r(e) {
            this.initItemTooltip = t(this.initItemTooltip, this),
            this.loadMoreLikeItems = t(this.loadMoreLikeItems, this),
            this.loadLikeItems = t(this.loadLikeItems, this),
            this.loadLikeButtonContent = t(this.loadLikeButtonContent, this),
            this.initLikeButton = t(this.initLikeButton, this),
            r.__super__.constructor.apply(this, arguments),
            this.note = e.note,
            this.note || (this.note = JSON.parse($("script[data-name=note]").html())),
            $.timeago.settings.strings = I18n.t("jquery-timeago"),
            this.initLikeButton(),
            this.loadLikeButtonContent(),
            setTimeout(function(t) {
                return function() {
                    return t.loadLikeItems()
                }
            } (this), 1e3)
        }
        return n(r, e),
        r.prototype.elements = {
            ".like-list": "likeList"
        },
        r.prototype.events = {
            "click .like-list > .more": "loadMoreLikeItems"
        },
        r.prototype.initLikeButton = function() {
            var t;
            return t = this.$("a.like-button"),
            t.on("click",
            function(t) {
                return $(this).parent().hasClass("load") ? (t.preventDefault(), t.stopPropagation()) : void 0
            }),
            t.on("ajax:beforeSend",
            function() {
                return $(this).parent().addClass("load")
            }),
            t.on("ajax:complete",
            function() {
                return $(this).parent().removeClass("load")
            }),
            t.on("ajax:success",
            function(e) {
                return function() {
                    return t.hasClass("note-liked") ? e.initItemTooltip() : void 0
                }
            } (this))
        },
        r.prototype.loadLikeButtonContent = function() {
            var t, e;
            return t = $(".like-button").find(".like-content").html().trim(),
            e = $(".like-button").find(".like-content").text().trim(),
            $(".like-button").find(".like-content").html(t.replace(e, this.note.likes_count.toString() + e))
        },
        r.prototype.loadLikeItems = function() {
            return this.likeList.load(Routes.likes_note_path(this.note.id, {
                format: "html"
            }),
            function(t) {
                return function() {
                    return t.initItemTooltip()
                }
            } (this))
        },
        r.prototype.loadMoreLikeItems = function(t) {
            var e;
            return e = $(t.currentTarget).data("max-id"),
            $.get(Routes.likes_note_path(this.note.id, {
                max_id: e,
                format: "html"
            }),
            function(e) {
                return function(n) {
                    return $(t.currentTarget).replaceWith(n),
                    e.initItemTooltip()
                }
            } (this))
        },
        r.prototype.initItemTooltip = function() {
            return this.likeList.find("a.avatar").tooltip({
                placement: "bottom",
                title: function() {
                    return I18n.t("reading.notes.show.like_item_tooltip", {
                        nickname: $(this).data("nickname"),
                        timeago: $.timeago(new Date($(this).data("created-at")))
                    })
                }
            })
        },
        r
    } (Maleskine.BaseModule)
}.call(this),
function() {
    var t = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    },
    e = {}.hasOwnProperty,
    n = function(t, n) {
        function r() {
            this.constructor = t
        }
        for (var i in n) e.call(n, i) && (t[i] = n[i]);
        return r.prototype = n.prototype,
        t.prototype = new r,
        t.__super__ = n.prototype,
        t
    };
    Maleskine.PaymentList = function(e) {
        function r(e) {
            this.replaceWithPaymentList = t(this.replaceWithPaymentList, this),
            this.loadRewardsListItems = t(this.loadRewardsListItems, this),
            this.loadPaymentListContent = t(this.loadPaymentListContent, this),
            r.__super__.constructor.apply(this, arguments),
            this.note = e.note,
            this.note || (this.note = JSON.parse($("script[data-name=note]").html())),
            this.loadPaymentListContent(),
            this.loadRewardsListItems(),
            this.el.parents().find('#pay-modal input[type="submit"]').on("click",
            function(t) {
                return function() {
                    var e, n;
                    return n = t.el.find(".rewards_total_count").length > 0 ? parseInt(t.el.find(".rewards_total_count").html()) + 1 : 1,
                    e = {
                        rewards_total_count: n
                    },
                    t.replaceWithPaymentList(e)
                }
            } (this))
        }
        return n(r, e),
        r.prototype.elements = {
            "#listModal": "listModal"
        },
        r.prototype.loadPaymentListContent = function() {
            return this.replaceWithPaymentList(this.note)
        },
        r.prototype.loadRewardsListItems = function() {
            return this.listModal.on("show.bs.modal",
            function(t) {
                return function() {
                    return t.listModal.find("ul").load(Routes.rewards_note_path(t.note.id, {
                        format: "html"
                    }))
                }
            } (this))
        },
        r.prototype.replaceWithPaymentList = function(t) {
            return t.rewards_total_count > 0 ? this.el.find("p.payment-list").replaceWith($(JST.render("note/reward_info", {
                note: t
            }))) : void 0
        },
        r
    } (Maleskine.BaseModule)
}.call(this),
function() {
    var t = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    },
    e = {}.hasOwnProperty,
    n = function(t, n) {
        function r() {
            this.constructor = t
        }
        for (var i in n) e.call(n, i) && (t[i] = n[i]);
        return r.prototype = n.prototype,
        t.prototype = new r,
        t.__super__ = n.prototype,
        t
    };
    Maleskine.CommentForm = function(e) {
        function r(e) {
            this.insertEmoji = t(this.insertEmoji, this),
            this.initEmojiSet = t(this.initEmojiSet, this),
            this.initAtUsers = t(this.initAtUsers, this);
            var n, i, o, a, s;
            r.__super__.constructor.apply(this, arguments),
            this.initAtUsers(),
            this.initEmojiSet(),
            (n = e.entity) && (a = JSON.parse($("script[data-name=note]").html()), i = JSON.parse($("script[data-name=author]").html()), o = JSON.parse($("script[data-name=current-user]").html()), n.find(".comment-footer").html(JST.render("comment/footer", {
                currentUser: o,
                noteAuthor: i,
                note: a,
                comment: n.data(),
                blocking: o.blocked_by_author || -1 !== $.inArray(n.data("user-id"), o.blocked_user_ids)
            })), s = new Maleskine.Report({
                el: n.find("div.report")
            }))
        }
        return n(r, e),
        r.prototype.elements = {
            textarea: "textarea",
            "input[type=submit]": "commentSubmitButton",
            "#emoji-modal": "emojiModal"
        },
        r.prototype.events = {
            "keydown textarea": "submitCommentHotkey"
        },
        r.prototype.initAtUsers = function() {
            return this.textarea.atwho({
                at: "@",
                data: this.textarea.data("user-names"),
                limit: 10
            }).atwho({
                at: ":",
                limit: 10,
                tpl: "<li data-value=':${name}:'><img src='" + Maleskine.Settings.emoji_host + "/assets/emojis/${name}.png' height='20' width='20'/> ${name} </li>",
                data: Maleskine.Emoji
            })
        },
        r.prototype.initEmojiSet = function() {
            var t;
            return this.emojiSet = ["smile", "blush", "smiley", "relaxed", "wink", "heart_eyes", "kissing_heart", "kissing_closed_eyes", "flushed", "grin", "relieved", "stuck_out_tongue_winking_eye", "stuck_out_tongue_closed_eyes", "unamused", "smirk", "sweat", "pensive", "confounded", "disappointed_relieved", "cold_sweat", "fearful", "persevere", "cry", "sob", "joy", "scream", "angry", "sleepy", "mask", "innocent", "yum", "anguished", "frowning", "hushed", "dizzy_face", "stuck_out_tongue", "no_mouth", "sunglasses", "sweat_smile", "worried", "+1", "-1", "clap", "v", "pray", "fist", "heart", "broken_heart", "heartbeat", "sparkling_heart", "cupid", "beer", "beers", "birthday", "heavy_exclamation_mark", "bangbang", "interrobang", "underage", "no_bicycles", "no_mobile_phones", "u7981", "up", "sunny", "moon", "high_brightness", "first_quarter_moon_with_face", "zap", "snowflake", "cloud", "tada", "bear", "cat", "cow", "dog", "hamster", "monkey_face", "rabbit", "tiger", "turtle", "whale", "whale2", "dolphin", "crocodile", "dragon_face", "squirrel", "hatching_chick", "hatched_chick", "baby_chick", "frog", "ant", "bug", "beetle", "ghost", "accept", "airplane", "alarm_clock", "ambulance", "angel", "apple", "arrows_counterclockwise", "balloon", "beginner", "bikini", "black_nib", "blossom", "bomb", "boom", "bow", "bread", "bulb", "cake", "cactus", "camera", "candy", "checkered_flag", "cherries", "cherry_blossom", "chocolate_bar", "christmas_tree", "clapper", "closed_umbrella", "closed_lock_with_key", "clubs", "cocktail", "coffee", "confetti_ball", "crown", "dancer", "dancers", "dart", "doughnut", "first_quarter_moon", "fries", "game_die", "golf", "guitar", "gun", "herb", "hibiscus", "high_heel", "hocho", "icecream", "ideograph_advantage", "jack_o_lantern", "key", "kiss", "lock", "lollipop", "mag", "moneybag", "bell", "no_bell", "ribbon", "skull", "snowman", "spaghetti", "sparkles", "strawberry", "sunflower", "sweat_drops", "toilet", "watermelon", "anger", "chart", "corn", "deciduous_tree", "dash", "dress", "ear_of_rice", "eyes", "fallen_leaf", "feet", "fishing_pole_and_fish", "hankey", "heavy_check_mark", "leaves", "lipstick", "mag_right", "mailbox_with_mail", "mailbox_with_no_mail", "man_with_gua_pi_mao", "metal", "mushroom", "musical_keyboard", "on", "arrow_right", "arrow_left", "arrow_up", "arrow_down", "atm", "crystal_ball", "eight_spoked_asterisk", "octocat", "crying_cat_face", "heart_eyes_cat", "joy_cat", "scream_cat", "smile_cat", "smiley_cat", "smirk_cat"],
            this.emojiInitialized = !1,
            $("#emoji-modal").on("show",
            function(t) {
                return function() {
                    return t.emojiInitialized ? void 0 : t.insertEmoji()
                }
            } (this)),
            t = function() {
                return function(t, e) {
                    var n, r, i;
                    return document.selection ? (t.focus(), r = document.selection.createRange(), r.text = e) : t.selectionStart || "0" === t.selectionStart ? (i = t.selectionStart, n = t.selectionEnd, t.value = t.value.substring(0, i) + e + t.value.substring(n, t.value.length), t.selectionStart = n + e.length, t.selectionEnd = n + e.length) : t.value += e
                }
            } (this),
            $("#emoji-modal").on("mousedown", "[data-emoji-name]",
            function(e) {
                return function(n) {
                    var r;
                    return n.preventDefault(),
                    r = " :" + $(n.currentTarget).data("emoji-name") + ": ",
                    t(e.textarea[0], r),
                    e.emojiModal.modal("hide")
                }
            } (this))
        },
        r.prototype.insertEmoji = function() {
            var t, e, n, r, i, o, a, s, u, l, c, h;
            for (o = $("#emojiTabContent ul"), c = [0, 1, 2, 3], a = 0, u = c.length; u > a; a++) {
                for (r = c[a], i = 50 * r, n = 50 * (r + 1) - 1, e = "", h = this.emojiSet.slice(i, +n + 1 || 9e9), s = 0, l = h.length; l > s; s++) t = h[s],
                e = "" + e + "<li><a href='javascript:void(null)' data-emoji-name='" + t + "'><img src='" + Maleskine.Settings.emoji_host + "/assets/emojis/" + t + ".png' alt=':" + t + ":' title='" + t + "' class='emoji'></a></li>";
                $(o[r]).append(e)
            }
            return this.emojiInitialized = !0
        },
        r.prototype.submitCommentHotkey = function(t) {
            if (Maleskine.BrowserDetector.isMac()) {
                if (t.metaKey && 13 === t.keyCode) return this.commentSubmitButton.trigger("click")
            } else if ((10 === t.keyCode || 13 === t.keyCode) && t.ctrlKey) return this.commentSubmitButton.trigger("click")
        },
        r
    } (Maleskine.BaseModule)
}.call(this),
function() {
    var t = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    },
    e = {}.hasOwnProperty,
    n = function(t, n) {
        function r() {
            this.constructor = t
        }
        for (var i in n) e.call(n, i) && (t[i] = n[i]);
        return r.prototype = n.prototype,
        t.prototype = new r,
        t.__super__ = n.prototype,
        t
    };
    Maleskine.CommentList = function(e) {
        function r(e) {
            this.appendFooter = t(this.appendFooter, this),
            this.registerUndismissEvent = t(this.registerUndismissEvent, this),
            this.registerDismissEvent = t(this.registerDismissEvent, this),
            this.registerReplyEvent = t(this.registerReplyEvent, this),
            this.loadComments = t(this.loadComments, this),
            r.__super__.constructor.apply(this, arguments),
            this.note = e.note,
            this.noteAuthor = e.author,
            this.currentUser = e.current_user,
            this.loadComments(),
            this.registerReplyEvent(),
            this.registerDismissEvent(),
            this.registerUndismissEvent(),
            this.el.on("ajax:success", ".pagination a[data-remote]",
            function(t) {
                return function(e, n) {
                    var r, i, o, a, s;
                    return o = t.el.find(".pagination"),
                    i = o.length > 0 ? o.offset().top: -1,
                    t.el.html(n),
                    t.appendFooter(),
                    a = new Maleskine.Report({
                        el: t.el.find("div.report")
                    }),
                    o = t.el.find(".pagination"),
                    i >= 0 && o.length > 0 && (s = o.offset().top, r = i - s, Maleskine.BrowserDetector.canScrollManually()) ? (r = window.scrollY - r, window.scrollTo(window.scrollX, r)) : void 0
                }
            } (this))
        }
        return n(r, e),
        r.prototype.loadComments = function() {
            var t;
            return 1 === this.el.children().length ? $.ajax({
                url: Routes.note_comments_path(this.note.id, {
                    format: "html"
                }),
                success: function(t) {
                    return function(e) {
                        var n;
                        return t.el.html(e),
                        t.appendFooter(),
                        n = new Maleskine.Report({
                            el: t.el.find("div.report")
                        })
                    }
                } (this)
            }) : (this.appendFooter(), t = new Maleskine.Report({
                el: this.el.find("div.report")
            }))
        },
        r.prototype.registerReplyEvent = function() {
            return $("#comment-list").on("click", "a.reply",
            function() {
                return function(t) {
                    var e, n;
                    return e = $(t.currentTarget),
                    $("#comments textarea").focus(),
                    n = $("#comments textarea").val(),
                    n.length > 1 && " " !== n[n.length - 1] && (n += " "),
                    $("#comments textarea").val(n + ("@" + e.data("nickname") + " "))
                }
            } (this))
        },
        r.prototype.registerDismissEvent = function() {
            return this.el.on("ajax:success", ".dismiss",
            function() {
                return function(t, e) {
                    var n;
                    return $("#comment-" + e.id).hide("slow"),
                    n = "<a href='" + Routes.undismiss_comment_path(e.id) + "' class='undismiss' data-method='post' data-remote='true' data-type='json' rel='nofollow'>" + I18n.t("reading.comment.undismiss_button") + "</a>",
                    noty({
                        text: I18n.t("reading.comment.dismiss_info") + "\u30fb" + n,
                        layout: "topCenter",
                        type: "information",
                        timeout: 5500,
                        closeWith: [],
                        theme: "maleskineTheme"
                    })
                }
            } (this)),
            this.el.on("ajax:error", ".dismiss",
            function(t) {
                return function(e, n) {
                    return t.notyError($.parseJSON(n.responseText).errors[0])
                }
            } (this))
        },
        r.prototype.registerUndismissEvent = function() {
            return $("body").on("ajax:success", ".undismiss",
            function(t) {
                return function(e, n) {
                    return $("#comment-" + n.id).show("slow"),
                    $(e.currentTarget).closest("ul").remove(),
                    t.notyInfo(I18n.t("reading.comment.undismiss_info"))
                }
            } (this)),
            $("body").on("ajax:error", ".undismiss",
            function(t) {
                return function(e, n) {
                    return t.notyError($.parseJSON(n.responseText).errors[0])
                }
            } (this))
        },
        r.prototype.appendFooter = function() {
            var t, e, n, r, i;
            for (r = this.el.find(".note-comment"), i = [], e = 0, n = r.length; n > e; e++) t = r[e],
            i.push($(t).find(".comment-footer").html(JST.render("comment/footer", {
                currentUser: this.currentUser,
                noteAuthor: this.noteAuthor,
                note: this.note,
                comment: $(t).data(),
                blocking: this.currentUser && (this.currentUser.blocked_by_author || -1 !== $.inArray($(t).data("user-id"), this.currentUser.blocked_user_ids))
            })));
            return i
        },
        r
    } (Maleskine.BaseModule)
}.call(this),
function() {
    var t = {}.hasOwnProperty,
    e = function(e, n) {
        function r() {
            this.constructor = e
        }
        for (var i in n) t.call(n, i) && (e[i] = n[i]);
        return r.prototype = n.prototype,
        e.prototype = new r,
        e.__super__ = n.prototype,
        e
    };
    Maleskine.Report = function(t) {
        function n() {
            n.__super__.constructor.apply(this, arguments),
            this.el.find("a[data-toggle='modal']").on("click",
            function() {
                return function(t) {
                    var e, n;
                    return $("#report-modal").modal("show"),
                    e = $(t.currentTarget).data("id"),
                    n = $(t.currentTarget).data("type"),
                    $("#report-modal #report-form").find("#abuse_report_abuse_reportable_id").val(e),
                    $("#report-modal #report-form").find("#abuse_report_abuse_reportable_type").val(n)
                }
            } (this)),
            this.el.on("ajax:beforeSend", "a[data-type]",
            function(t) {
                return function() {
                    return confirm(I18n.t("reading.abuse_report.confirm")) ? void 0 : (t.el.removeClass("open"), !1)
                }
            } (this)),
            this.el.on("ajax:success", "a[data-type]",
            function(t) {
                return function() {
                    return t.el.removeClass("open"),
                    t.notyInfo(I18n.t("reading.abuse_report.report_success"))
                }
            } (this)),
            this.el.on("ajax:error", "a[data-type]",
            function(t) {
                return function(e, n) {
                    return t.el.removeClass("open"),
                    t.notyError($.parseJSON(n.responseText).error[0])
                }
            } (this))
        }
        return e(n, t),
        n
    } (Maleskine.BaseModule)
}.call(this),
function() {
    var t = {}.hasOwnProperty,
    e = function(e, n) {
        function r() {
            this.constructor = e
        }
        for (var i in n) t.call(n, i) && (e[i] = n[i]);
        return r.prototype = n.prototype,
        e.prototype = new r,
        e.__super__ = n.prototype,
        e
    };
    Maleskine.ReportModal = function(t) {
        function n() {
            n.__super__.constructor.apply(this, arguments),
            this.el.on("hide.bs.modal",
            function(t) {
                return function() {
                    return t.reportForm.find("textarea").val(""),
                    t.reportForm.find("#abuse_report_abuse_reportable_id").val(""),
                    t.reportForm.find("#abuse_report_abuse_reportable_type").val("")
                }
            } (this)),
            this.el.on("ajax:beforeSend", "form",
            function(t) {
                return function() {
                    return t.el.find("textarea").val().length <= 0 ? (t.notyError(I18n.t("reading.abuse_report.no_reason")), !1) : void 0
                }
            } (this)),
            this.el.on("ajax:error", "form",
            function(t) {
                return function(e, n) {
                    return t.el.modal("hide"),
                    t.notyError($.parseJSON(n.responseText).error[0])
                }
            } (this)),
            this.el.on("ajax:success", "form",
            function(t) {
                return function() {
                    return t.el.modal("hide"),
                    t.notyInfo(I18n.t("reading.abuse_report.report_success"))
                }
            } (this))
        }
        return e(n, t),
        n.prototype.elements = {
            "#report-form": "reportForm"
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
    n = function(t, n) {
        function r() {
            this.constructor = t
        }
        for (var i in n) e.call(n, i) && (t[i] = n[i]);
        return r.prototype = n.prototype,
        t.prototype = new r,
        t.__super__ = n.prototype,
        t
    };
    Maleskine.FurtherReading = function(e) {
        function r(e) {
            this.setFurtherReadingState = t(this.setFurtherReadingState, this),
            this.hideStateDropdown = t(this.hideStateDropdown, this),
            this.showStateDropdown = t(this.showStateDropdown, this),
            this.pasteLoadFurtherLink = t(this.pasteLoadFurtherLink, this),
            this.enterKeyLoadFurtherLink = t(this.enterKeyLoadFurtherLink, this),
            this.loadFurtherLink = t(this.loadFurtherLink, this),
            this.deleteFurtherReading = t(this.deleteFurtherReading, this),
            this.submitFurtherReading = t(this.submitFurtherReading, this),
            this.cancelFurtherReading = t(this.cancelFurtherReading, this),
            this.startNewFurtherReadingLink = t(this.startNewFurtherReadingLink, this),
            this.initFurtherReadings = t(this.initFurtherReadings, this),
            r.__super__.constructor.apply(this, arguments),
            this.note = e.note,
            this.note || (this.note = JSON.parse($("script[data-name=note]").html())),
            this.initFurtherReadings()
        }
        return n(r, e),
        r.prototype.elements = {
            "#further-readings-list": "furtherReadingsList",
            "#further-reading-line": "furtherReadingsTitle",
            "#further-reading-description": "furtherReadingDescription"
        },
        r.prototype.events = {
            "click #further-reading-new-prompt": "startNewFurtherReadingLink",
            "click #load-further-reading": "loadFurtherLink",
            "click #cancel-further-reading": "cancelFurtherReading",
            "click #submit-further-reading": "submitFurtherReading",
            "click #delete-further-reading": "deleteFurtherReading",
            "keypress #further-reading-link-text": "enterKeyLoadFurtherLink",
            "paste #further-reading-link-text": "pasteLoadFurtherLink",
            "mouseover .further-reading-states>li": "showStateDropdown",
            "mouseout .further-reading-states>li": "hideStateDropdown"
        },
        r.prototype.initFurtherReadings = function() {
            return this.note.has_further_readings && $.getJSON(Routes.note_further_readings_path(this.note.slug, {
                format: "json"
            })).done(function(t) {
                return function(e) {
                    var n, r, i, o;
                    if (e.length > 0) {
                        for (t.furtherReadingsTitle.show(), i = 0, o = e.length; o > i; i++) r = e[i],
                        t.furtherReadingsList.append(JST.render("note/further_reading_item", r));
                        if (n = t.getURLParmeter("further_reading")) return t.scrollToAnchor("further_reading_" + n)
                    }
                }
            } (this)),
            this.furtherReadingsList.on("click", ".state-item",
            function(t) {
                return function(e) {
                    return t.setFurtherReadingState($(e.currentTarget))
                }
            } (this)),
            $("body").on("click", ".undo",
            function(t) {
                return function(e) {
                    var n, r, i;
                    return t.furtherReadingsTitle.show(),
                    i = $(e.currentTarget).data("state"),
                    t.removeFurtherReadingItem && "dismiss" !== i && clearTimeout(t.removeFurtherReadingItem),
                    n = $(e.currentTarget).data("further-reading-id"),
                    r = t.furtherReadingsList.find("li#further_reading_" + n),
                    t.setFurtherReadingState(r.find("li[data-state='" + i + "']")),
                    $(e.currentTarget).parents("ul").remove()
                }
            } (this))
        },
        r.prototype.startNewFurtherReadingLink = function(t) {
            return $(t.currentTarget).hide(),
            $("#further-reading-form").replaceWith(JST.render("note/further_reading_link")),
            $("#further-reading-form").show(),
            this.selectText($("#further-reading-link-text"))
        },
        r.prototype.cancelFurtherReading = function(t) {
            return $(t.currentTarget).parent().empty().removeClass("active"),
            $("#further-reading-new-prompt").show()
        },
        r.prototype.submitFurtherReading = function() {
            var t, e, n;
            return e = $("#further-reading-title").text(),
            t = $("#further-reading-description").text(),
            n = $("#further-reading-url").attr("href"),
            $.post(Routes.note_further_readings_path(this.note.slug, {
                format: "json"
            }), {
                further_reading: {
                    title: e,
                    description: t,
                    url: n
                }
            },
            function(t) {
                return function(e) {
                    return t.furtherReadingsTitle.show(),
                    t.furtherReadingsList.append(JST.render("note/further_reading_item", e)),
                    $("#further-reading-form").empty().removeClass("active"),
                    $("#further-reading-new-prompt").show()
                }
            } (this)).fail(function(t) {
                return function(e) {
                    return t.notyError($.parseJSON(e.responseText).errors[0])
                }
            } (this))
        },
        r.prototype.deleteFurtherReading = function(t) {
            var e, n;
            return n = $(t.currentTarget).parents("li"),
            e = $(t.currentTarget).data("further-reading-id"),
            $.ajax({
                url: Routes.note_further_reading_path(this.note.slug, e, {
                    format: "json"
                }),
                type: "DELETE",
                dataType: "json"
            }).done(function(t) {
                return function() {
                    return n.remove(),
                    0 === t.furtherReadingsList.children().length && t.furtherReadingsTitle.hide(),
                    t.notyInfo(I18n.t("reading.further_reading.delete_success"))
                }
            } (this))
        },
        r.prototype.loadFurtherLink = function() {
            var t;
            return t = $.trim($("#further-reading-link-text").text()),
            t.length > 0 ? (/^(http(s?):\/\/|www)/.test(t) || $("#further-reading-link-text").text("http://" + t), $.ajax({
                url: Routes.external_pages_info_path({
                    url: t
                }),
                dataType: "json",
                beforeSend: function() {
                    return function() {
                        return $("#loader").show()
                    }
                } (this)
            }).done(function(t) {
                return function(e) {
                    var n, r, i;
                    return i = $("#further-readings").data("user-slug"),
                    r = $("#further-readings").data("user-nickname"),
                    $("#further-reading-form").replaceWith(JST.render("note/further_reading_content", {
                        data: e,
                        slug: i,
                        nickname: r
                    })),
                    n = $("#further-reading-description"),
                    t.selectText(n),
                    n.on("keypress",
                    function(e) {
                        var n;
                        return n = e.keyCode || e.which,
                        13 === n ? t.submitFurtherReading() : void 0
                    })
                }
            } (this)).fail(function(t) {
                return function() {
                    return t.notyInfo(I18n.t("reading.further_reading.load_link_error"))
                }
            } (this)).always(function() {
                return function() {
                    return $("#loader").hide()
                }
            } (this))) : void 0
        },
        r.prototype.enterKeyLoadFurtherLink = function(t) {
            return 13 === t.which ? (this.loadFurtherLink(), t.preventDefault()) : void 0
        },
        r.prototype.pasteLoadFurtherLink = function() {
            return setTimeout(function(t) {
                return function() {
                    return t.loadFurtherLink()
                }
            } (this), 100)
        },
        r.prototype.showStateDropdown = function(t) {
            return $(t.currentTarget).parent().children().show()
        },
        r.prototype.hideStateDropdown = function(t) {
            return $(t.currentTarget).parent().children(".hide").hide()
        },
        r.prototype.setFurtherReadingState = function(t) {
            var e, n, r, i, o;
            return n = t.parents("li"),
            e = t.parent().data("further-reading-id"),
            r = n.data("can-be-dismissed"),
            i = t.parent().data("origin-state"),
            o = t.data("state"),
            t.parent().replaceWith(JST.render("note/further_reading_states", {
                id: e,
                state: o,
                can_be_dismissed: r
            })),
            n.show(),
            "dismiss" === o && (n.hide(), 1 === this.furtherReadingsList.children().length && this.furtherReadingsTitle.hide()),
            $.post(Routes.update_further_reading_state_path({
                format: "json"
            }), {
                note_id: this.note.slug,
                id: e,
                state: o
            },
            function(t) {
                return function() {
                    var r;
                    return t.removeFurtherReadingItem = setTimeout(function() {
                        return "dismiss" === o ? n.remove() : void 0
                    },
                    5e3),
                    r = I18n.t("reading.further_reading.states." + o),
                    noty({
                        text: I18n.t("reading.further_reading.undo_link", {
                            state: r,
                            id: e,
                            originState: i
                        }),
                        layout: "topCenter",
                        type: "information",
                        timeout: 4800,
                        closeWith: [],
                        theme: "maleskineTheme"
                    })
                }
            } (this)).fail(function(t) {
                return function(r) {
                    return n.find(".further-reading-states").replaceWith(JST.render("note/further_reading_states", {
                        id: e,
                        state: i
                    })),
                    t.notyError($.parseJSON(r.responseText).errors[0]),
                    "dismiss" === o ? (t.furtherReadingsList.children().length > 0 && t.furtherReadingsTitle.hide(), n.show()) : void 0
                }
            } (this))
        },
        r.prototype.selectText = function(t) {
            var e, n, r;
            return e = t[0],
            document.body.createTextRange ? (n = document.body.createTextRange(), n.moveToElementText(e), n.select()) : window.getSelection ? (r = window.getSelection(), n = document.createRange(), n.selectNodeContents(e), r.removeAllRanges(), r.addRange(n)) : void 0
        },
        r
    } (Maleskine.BaseModule)
}.call(this),
function() {
    var t = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    },
    e = {}.hasOwnProperty,
    n = function(t, n) {
        function r() {
            this.constructor = t
        }
        for (var i in n) e.call(n, i) && (t[i] = n[i]);
        return r.prototype = n.prototype,
        t.prototype = new r,
        t.__super__ = n.prototype,
        t
    };
    Maleskine.NoteShow = function(e) {
        function r() {
            this.submitReward = t(this.submitReward, this),
            this.markNoteRead = t(this.markNoteRead, this),
            this.markNoteViewed = t(this.markNoteViewed, this),
            this.loadShareButtons = t(this.loadShareButtons, this),
            this.loadActivities = t(this.loadActivities, this),
            this.initTopShareButton = t(this.initTopShareButton, this),
            this.loadContributeModal = t(this.loadContributeModal, this),
            this.bindTooltip = t(this.bindTooltip, this),
            this.customizeMenuHeight = t(this.customizeMenuHeight, this),
            this.loadCollectionMenu = t(this.loadCollectionMenu, this),
            this.loadNotebookMenu = t(this.loadNotebookMenu, this);
            var e, n, i, o, a, s, u;
            r.__super__.constructor.apply(this, arguments),
            this.shrink.toggleHeader("hide-wrap-btn"),
            this.wrapbtn.toggleHeader("hide-wrap-btn", ".panel"),
            this.$("[data-toggle=tooltip]").tooltip(),
            this.note = JSON.parse($("script[data-name=note]").html()),
            this.author = JSON.parse($("script[data-name=author]").html()),
            $("script[data-name=current-user]").length > 0 && (this.currentUser = JSON.parse($("script[data-name=current-user]").html())),
            u = $(".author-info .user-stats").find("a"),
            $(u[0]).find("b").text(this.author.public_notes_count),
            $(u[1]).find("b").text(this.author.followers_count),
            $(u[2]).find("b").text(this.author.total_likes_count),
            /#comments/.test(location.hash) && (this.goToComment = !0),
            Maleskine.BrowserDetector.isIE8() && $(window).width() <= 1024 && $(".container").addClass("fix-ie8"),
            $(window).scroll(function(t) {
                return function() {
                    var e;
                    return e = $(window).scrollTop(),
                    e > 200 ? (t.goTopButton.removeClass("hide-go-top"), t.wrapbtn.css({
                        top: "-1px"
                    })) : t.goTopButton.addClass("hide-go-top")
                }
            } (this)),
            this.wordage.text(I18n.t("reading.wordage", {
                wordage: this.note.wordage
            })),
            this.viewsCount.text(I18n.t("reading.views_count", {
                count: this.note.views_count
            })),
            s = null,
            this.collectionSearch.userChange(function(t) {
                return function() {
                    return null !== s && clearTimeout(s),
                    s = setTimeout(function() {
                        var e;
                        return e = t.collectionSearch.val(),
                        $.post(t.collectionSearch.data("search-collections-url") + ("&&search_term=" + e))
                    },
                    250)
                }
            } (this)),
            this.initAddList(),
            this.initTopShareButton(),
            this.startReadingTime = (new Date).getTime(),
            this.readScrollLimit = this.metaBottom.offset().top,
            this.markNoteViewed(),
            i = new Maleskine.FurtherReading({
                el: this.el.find("#further-readings"),
                note: this.note
            }),
            o = new Maleskine.NoteLike({
                el: this.el,
                note: this.note
            }),
            e = new Maleskine.CommentForm({
                el: this.el.find("#comments form")
            }),
            n = new Maleskine.CommentList({
                el: this.el.find("#comment-list"),
                note: this.note,
                author: this.author,
                current_user: this.currentUser
            }),
            this.el.find("div.support-author").length > 0 && (a = new Maleskine.PaymentList({
                el: this.el.find("div.support-author"),
                note: this.note
            })),
            setTimeout(function(t) {
                return function() {
                    return t.loadShareButtons()
                }
            } (this), 1e3),
            this.initButtonTooltip(),
            this.contributeModal.on("shown",
            function() {
                return $(".add-collection").tooltip("hide")
            }),
            this.contributeModal.on("hidden",
            function() {
                return $(".add-collection").tooltip("hide")
            })
        }
        return n(r, e),
        r.prototype.elements = {
            "a.go-top": "goTopButton",
            ".wrap-btn": "wrapbtn",
            ".shrink": "shrink",
            "#myModal": "readModeModal",
            ".wordage": "wordage",
            ".views-count": "viewsCount",
            "#notebooks-menu": "notebooksMenuModal",
            "#collection-menu": "collectionMenuModal",
            "#contribute-modal": "contributeModal",
            "input#search_term": "collectionSearch",
            ".other-article": "otherArticle",
            ".activities": "activities",
            "div.meta-bottom": "metaBottom",
            "#pay-modal": "rewardModal",
            "#success-pay": "rewardSuccessModal"
        },
        r.prototype.events = {
            "click .notebooks-menu-btn": "loadNotebookMenu",
            "click .collection-menu-btn": "loadCollectionMenu",
            "show #contribute-modal": "loadContributeModal",
            'click #pay-modal input[type="submit"]': "submitReward"
        },
        r.prototype.initButtonTooltip = function() {
            return $(".add-collection").tooltip({
                placement: "bottom",
                title: I18n.t("reading.btn_group.add_to_collection")
            }),
            $(".bookmark, .bookmarked").tooltip({
                placement: "bottom",
                title: I18n.t("reading.btn_group.bookmark")
            }),
            $(".btn-group").find("i.fa-share-square-o").parent().tooltip({
                placement: "right",
                title: I18n.t("reading.btn_group.share")
            })
        },
        r.prototype.loadNotebookMenu = function() {
            return this.notebooksMenuModal.load(Routes.notebook_menu_note_path(this.note.id, {
                format: "html"
            }),
            function(t) {
                return function() {
                    return t.customizeMenuHeight(t.notebooksMenuModal),
                    t.bindTooltip(t.notebooksMenuModal),
                    t.notebooksMenuModal.find("#notebook_menu_note_" + t.note.id).addClass("active")
                }
            } (this))
        },
        r.prototype.loadCollectionMenu = function() {
            return this.collectionMenuModal.load(Routes.collection_menu_note_path(this.note.id, {
                format: "html"
            }),
            function(t) {
                return function() {
                    return t.customizeMenuHeight(t.collectionMenuModal),
                    t.bindTooltip(t.collectionMenuModal)
                }
            } (this))
        },
        r.prototype.customizeMenuHeight = function(t) {
            var e, n;
            return n = t.find(".panel-heading").outerHeight(),
            e = $(window).height() - 40 - n - 55,
            t.find("ul.list-group").css({
                "max-height": "" + e + "px"
            })
        },
        r.prototype.bindTooltip = function(t) {
            return t.find("a.following").tooltip({
                placement: "left",
                title: I18n.t("reading.unsubscribe")
            }),
            t.find("a.follow").tooltip({
                placement: "left",
                title: I18n.t("reading.subscribe")
            })
        },
        r.prototype.loadContributeModal = function() {
            return $(".modal-body #search_term").val(""),
            $.getJSON(Routes.editable_collections_user_path(this.currentUser.slug, {
                note_id: this.note.id,
                format: "json"
            }),
            function(t) {
                return function(e) {
                    var n, r;
                    return r = $("ul.add-list"),
                    r && r.length > 0 && r[0] ? (r[0].reset = function() {
                        return r.empty().append(JST.render("note/collection", {
                            collections: e.collections,
                            note_id: t.note.id
                        })),
                        r[0].setListItem()
                    },
                    r[0].reset(), n = t.contributeModal.find(".search-query"), n.focus()) : void 0
                }
            } (this))
        },
        r.prototype.initTopShareButton = function() {
            var t, e, n, r, i, o, a, s, u;
            for (t = $("<a href='javascript:void(null)' data-toggle='dropdown' id='top-share-button'><i class='fa fa-share-square-o'></i></a>"), e = $("<ul class='dropdown-menu top-share-dropdown arrow-top'></ul>"), o = $(".meta-bottom").find(".share-group").find("a[data-name=weixin]").attr("href"), o && e.append("<li><a data-toggle='modal' href='#share-weixin-modal'><img src='" + Maleskine.CommonImages.social_icon("weixin", 32, 32) + "'> " + I18n.t("reading.social_sharing.share_to_label.weixin") + "</a></li>"), u = ["weibo", "tweibo", "qzone", "twitter", "douban", "facebook", "google_plus", "renren"], a = 0, s = u.length; s > a; a++) r = u[a],
            i = $(".meta-bottom").find(".share-group").find("a[data-name=" + r + "]").attr("href"),
            i && e.append('<li><a href="' + i + "\"><img src='" + Maleskine.CommonImages.social_icon(r, 32, 32) + "'> " + I18n.t("reading.social_sharing.share_to_label." + r) + "</a></li>");
            return n = $(".meta-bottom").find(".share-group").find("a[data-name=changweibo]").attr("href"),
            n && e.append("<li><a href='" + n + "' target='_blank'><i class='fa fa-arrow-circle-o-down'></i>" + I18n.t("reading.social_sharing.share_to_label.changweibo") + "</a></li>"),
            $(".editor-article").children("span").append(t).append(e)
        },
        r.prototype.initAddList = function() {
            var t, e, n;
            return e = -1,
            n = $("ul.add-list"),
            n && n.length > 0 && n[0] ? (t = function() {
                return n.find("li.selected").removeClass("selected"),
                e > -1 ? $(n.find("li")[e]).addClass("selected") : void 0
            },
            n[0].setListItem = function() {
                var r, i, o, a;
                for (e = -1, i = n.find("li"), o = 0, a = i.length; a > o; o++) r = i[o],
                r = $(r),
                r[0]._self = r,
                r.on("click",
                function() {
                    return function(t) {
                        var e, n;
                        for (e = t.target;
                        "li" !== e.tagName.toLowerCase() && e.parentElement;) e = e.parentElement;
                        return "li" !== e.tagName.toLowerCase() || e.querySelectorAll("a.delete").length > 0 || $(e).is(".declined") || $(e).is(".withdrawed") ? void 0 : (n = e.querySelector("h5"), n.innerHTML = n.innerHTML + '&nbsp;&nbsp;&nbsp;&nbsp;<img alt="Tiny" class="loader-tiny" src="' + Maleskine.CommonImages.loader("tiny") + '" />')
                    }
                } (this));
                return t()
            },
            this.collectionSearch.on("keydown",
            function(r) {
                var i, o, a;
                if (40 === r.keyCode || 38 === r.keyCode || 13 === r.keyCode) return 13 === r.keyCode ? (i = n.find("li.selected"), a = i.find("a.delete"), void(a.length > 0 ? a.trigger("click") : i.find("a").trigger("click"))) : (o = n.find("li"), 38 === r.keyCode ? (e--, -1 > e && (e = -1)) : 40 === r.keyCode && (e++, e >= o.length && (e = -1)), t(), r.preventDefault())
            })) : void 0
        },
        r.prototype.loadActivities = function() {
            return this.activities.load(Routes.activities_note_path(this.note.id, {
                format: "html"
            }))
        },
        r.prototype.loadShareButtons = function() {
            return $(".article-share").load(Routes.share_buttons_note_path(this.note.id, {
                format: "html"
            }))
        },
        r.prototype.markNoteViewed = function() {
            var t, e, n, r;
            for (n = /([^&=]+)=?([^&]*)/g, e = window.location.search.slice(1, +window.location.search.length + 1 || 9e9), this.visit_data = {},
            this.visit_data.token = Maleskine.Utils.secureRandom(64), null != document.referrer && document.referrer.length > 0 && (this.visit_data.referrer = document.referrer); t = n.exec(e);)("utm_source" === (r = t[1]) || "utm_medium" === r || "utm_term" === r || "utm_content" === r || "utm_campaign" === r) && (this.visit_data[t[1]] = t[2]);
            return $.post("/notes/" + this.note.slug + "/mark_viewed.json", this.visit_data),
            null == this.goToComment ? $(document).scrollTop() + $(window).height() >= this.readScrollLimit ? window.setTimeout(function(t) {
                return function() {
                    return t.markNoteRead()
                }
            } (this), 1500) : $(window).on("scroll.markread",
            function(t) {
                return function() {
                    return $(document).scrollTop() + $(window).height() >= t.readScrollLimit ? ($(window).off("scroll.markread"), t.markNoteRead()) : void 0
                }
            } (this)) : void 0
        },
        r.prototype.markNoteRead = function() {
            var t, e;
            return e = Math.floor(((new Date).getTime() - this.startReadingTime) / 1e3),
            t = this.visit_data,
            t.reading_time = e,
            $.post("/notes/" + this.note.slug + "/mark_read.json", t)
        },
        r.prototype.submitReward = function() {
            return this.rewardModal.modal("hide"),
            this.rewardSuccessModal.modal("show")
        },
        r
    } (Maleskine.BaseModule)
}.call(this);