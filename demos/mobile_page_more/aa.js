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