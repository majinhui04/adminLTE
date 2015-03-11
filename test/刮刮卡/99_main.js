var car2 = {
    _events: {},
    _windowHeight: $(window).height(),
    _windowWidth: $(window).width(),
    _rotateNode: $(".p-ct"),
    _turnMode: $("#turnMode").val(),
    _page: $(".m-page"),
    _pageNum: $(".m-page").size(),
    _pageNow: 0,
    _pageNext: null,
    _preLoadPageCount: 5,
    _touchStartValY: 0,
    _touchDeltaY: 0,
    _loopMode: $("#isLoop").val() == "true",
    _moveStart: true,
    _movePosition: null,
    _movePosition_c: null,
    _mouseDown: false,
    _moveFirst: true,
    _moveInit: false,
    _moveing: false,
    _firstChange: false,
    _map: $(".ylmap"),
    _mapValue: null,
    _mapIndex: null,
    _audioNode: $(".u-audio"),
    _audio: null,
    _audio_val: true,
    _hasClickAudioCountorl: false,
    _elementStyle: document.createElement("div").style,
    _paddingTop: 0,
    _paddingLeft: 0,
    _imgScale: 1,
    _maskIndex: 0,
    _maskType: 0,
    _maskHasDel: 0,
    _linkUrl: "",
    hasSubmitInfo: false,
    _initHideEffect: ["flying", "fadeIn", "flipinX", "flipinY", "lightSpeedIn", "spiralBg", "flashOnce", "smallZoom", "bounce", "bounceT", "bounceR", "bounceB", "bounceL", "laterShow", "graduallyIn"],
    _UC: RegExp("Android").test(navigator.userAgent) && RegExp("UC").test(navigator.userAgent) ? true: false,
    _weixin: RegExp("MicroMessenger").test(navigator.userAgent) ? true: false,
    _iPhoen: RegExp("iPhone").test(navigator.userAgent) || RegExp("iPod").test(navigator.userAgent) || RegExp("iPad").test(navigator.userAgent) ? true: false,
    _Android: RegExp("Android").test(navigator.userAgent) ? true: false,
    _IsPC: function() {
        var D = navigator.userAgent;
        var B = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var C = true;
        for (var A = 0; A < B.length; A++) {
            if (D.indexOf(B[A]) > 0) {
                C = false;
                break
            }
        }
        return C
    },
    _isOwnEmpty: function(B) {
        for (var A in B) {
            if (B.hasOwnProperty(A)) {
                return false
            }
        }
        return true
    },
    _WXinit: function(A) {
        if (typeof window.WeixinJSBridge == "undefined" || typeof window.WeixinJSBridge.invoke == "undefined") {
            setTimeout(function() {
                this.WXinit(A)
            },
            200)
        } else {
            A()
        }
    },
    _vendor: function() {
        var C = ["t", "webkitT", "MozT", "msT", "OT"],
        D,
        B = 0,
        A = C.length;
        for (; B < A; B++) {
            D = C[B] + "ransform";
            if (D in this._elementStyle) {
                return C[B].substr(0, C[B].length - 1)
            }
        }
        return false
    },
    _prefixStyle: function(A) {
        if (this._vendor() === false) {
            return false
        }
        if (this._vendor() === "") {
            return A
        }
        return this._vendor() + A.charAt(0).toUpperCase() + A.substr(1)
    },
    _hasPerspective: function() {
        var A = this._prefixStyle("perspective") in this._elementStyle;
        if (A && "webkitPerspective" in this._elementStyle) {
            this._injectStyles("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",
            function(C, B) {
                A = C.offsetLeft === 9 && C.offsetHeight === 3
            })
        }
        return !! A
    },
    _translateZ: function() {
        if (car2._hasPerspective) {
            return " translateZ(0)"
        } else {
            return ""
        }
    },
    _injectStyles: function(B, L, K, F) {
        var I, C, A, J, D = document.createElement("div"),
        H = document.body,
        E = H || document.createElement("body"),
        G = "modernizr";
        if (parseInt(K, 10)) {
            while (K--) {
                A = document.createElement("div");
                A.id = F ? F[K] : G + (K + 1);
                D.appendChild(A)
            }
        }
        I = ["&#173;", '<style id="s', G, '">', B, "</style>"].join("");
        D.id = G; (H ? D: E).innerHTML += I;
        E.appendChild(D);
        if (!H) {
            E.style.background = "";
            E.style.overflow = "hidden";
            J = docElement.style.overflow;
            docElement.style.overflow = "hidden";
            docElement.appendChild(E)
        }
        C = L(D, B);
        if (!H) {
            E.parentNode.removeChild(E);
            docElement.style.overflow = J
        } else {
            D.parentNode.removeChild(D)
        }
        return !! C
    },
    _handleEvent: function(A) {
        if (!this._events[A]) {
            return
        }
        var B = 0,
        C = this._events[A].length;
        if (!C) {
            return
        }
        for (; B < C; B++) {
            this._events[A][B].apply(this, [].slice.call(arguments, 1))
        }
    },
    _on: function(B, A) {
        if (!this._events[B]) {
            this._events[B] = []
        }
        this._events[B].push(A)
    },
    _scrollStop: function() {
        $(window).on("touchmove.scroll", this._scrollControl);
        $(window).on("scroll.scroll", this._scrollControl)
    },
    _scrollStart: function() {
        $(window).off("touchmove.scroll");
        $(window).off("scroll.scroll")
    },
    _scrollControl: function(A) {
        A.preventDefault()
    },
    page_start: function() {
        if (car2._pageNum > 1) {
            car2._page.on("touchstart mousedown", car2.page_touch_start);
            car2._page.on("touchmove mousemove", car2.page_touch_move);
            car2._page.on("touchend mouseup", car2.page_touch_end)
        }
    },
    page_stop: function() {
        car2._page.off("touchstart mousedown");
        car2._page.off("touchmove mousemove");
        car2._page.off("touchend mouseup")
    },
    page_touch_start: function(A) {
        if (!car2._moveStart) {
            return
        }
        if (car2._page.eq(car2._pageNow).attr("canTurnPage") == "false") {
            return
        }
        if (A.type == "touchstart") {
            car2._touchStartValY = window.event.touches[0].pageY
        } else {
            car2._touchStartValY = A.pageY || A.y;
            car2._mouseDown = true
        }
        car2._moveInit = true;
        car2._handleEvent("start");
        if (!car2._hasClickAudioCountorl) {
            if (car2._audio) {
                car2._audio.play()
            }
        }
    },
    page_touch_move: function(F) {
        F.preventDefault();
        if (!car2._moveStart) {
            return
        }
        if (!car2._moveInit) {
            return
        }
        var A = car2._page.eq(car2._pageNow),
        D = parseInt(A.height()),
        B,
        E,
        G = null,
        C = false;
        if (F.type == "touchmove") {
            B = window.event.touches[0].pageY;
            C = true
        } else {
            if (car2._mouseDown) {
                B = F.pageY || F.y;
                C = true
            } else {
                return
            }
        }
        if (Math.abs(car2._touchStartValY - B) < 100) {
            return
        }
        car2._moveing = true;
        G = car2.page_position(F, B, A);
        if (G != undefined) {
            if (B - car2._touchStartValY < 0) {
                if (G[0].getAttribute("hasloaded") != "true") {
                    car2._pageNext = null;
                    car2.loadingLastPageShow();
                    return
                }
            }
        }
        car2.page_translate(G);
        car2._handleEvent("move")
    },
    page_position: function(D, C, A) {
        var E, B;
        if (C != "undefined") {
            car2._touchDeltaY = C - car2._touchStartValY
        }
        car2._movePosition = C - car2._touchStartValY > 0 ? "down": "up";
        if (car2._movePosition != car2._movePosition_c) {
            car2._moveFirst = true;
            car2._movePosition_c = car2._movePosition
        } else {
            car2._moveFirst = false
        }
        if (car2._touchDeltaY <= 0) {
            if (A.next(".m-page").length == 0) {
                if (car2._loopMode) {
                    car2._pageNext = 0
                } else {
                    car2.loadingLastPageShow("作品已经结束，谢谢观看！");
                    car2._mouseDown = car2._moveInit = false;
                    return
                }
            } else {
                car2._pageNext = car2._pageNow + 1
            }
            B = car2._page.eq(car2._pageNext)[0]
        } else {
            if (A.prev(".m-page").length == 0) {
                if (car2._firstChange) {
                    car2._pageNext = car2._pageNum - 1
                } else {
                    return
                }
            } else {
                car2._pageNext = car2._pageNow - 1
            }
            B = car2._page.eq(car2._pageNext)[0]
        }
        E = car2._page.eq(car2._pageNow)[0];
        node = [B, E];
        if (car2._moveFirst) {
            F(node)
        }
        function F(J) {
            var G, I, H = car2._translateZ();
            car2._page.removeClass("action");
            $(J[1]).addClass("action").removeClass("f-hide");
            car2._page.not(".action").addClass("f-hide");
            car2.height_auto(car2._page.eq(car2._pageNext), "false");
            $(J[0]).removeClass("f-hide").addClass("active");
            if (car2._movePosition == "up") {
                G = parseInt($(window).scrollTop());
                if (G > 0) {
                    I = $(window).height() + G
                } else {
                    I = $(window).height()
                }
                J[0].style[car2._prefixStyle("transform")] = "translate(0," + I + "px)" + H;
                $(J[0]).attr("data-translate", I);
                $(J[1]).attr("data-translate", 0)
            } else {
                J[0].style[car2._prefixStyle("transform")] = "translate(0,-" + Math.max($(window).height(), $(J[0]).height()) + "px)" + H;
                $(J[0]).attr("data-translate", -Math.max($(window).height(), $(J[0]).height()));
                $(J[1]).attr("data-translate", 0)
            }
        }
        return node
    },
    page_translate: function(G) {
        if (!G) {
            return
        }
        var D = car2._translateZ(),
        B,
        A,
        C,
        F = car2._touchDeltaY;
        if ($(G[0]).attr("data-translate")) {
            B = F + parseInt($(G[0]).attr("data-translate"))
        }
        G[0].style[car2._prefixStyle("transform")] = "translate(0," + B + "px)" + D;
        if ($(G[1]).attr("data-translate")) {
            A = F + parseInt($(G[1]).attr("data-translate"))
        }
        C = 1 - Math.abs(F * 0.2 / $(window).height());
        A = A / 5;
        var E = "translate(0," + A + "px)" + D;
        if (typeof(car2._turnMode) == "undefined" || "V" == car2._turnMode) {
            E += " scale(" + C + ")"
        }
        G[1].style[car2._prefixStyle("transform")] = E
    },
    page_touch_end: function(A) {
        car2._moveInit = false;
        car2._mouseDown = false;
        if (!car2._moveStart) {
            return
        }
        if (!car2._pageNext && car2._pageNext != 0) {
            return
        }
        car2._moveStart = false;
        car2._moveing = false;
        if (Math.abs(car2._touchDeltaY) > 10) {
            car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle("transition")] = "all .3s";
            car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle("transition")] = "all .3s"
        }
        if (Math.abs(car2._touchDeltaY) >= 100) {
            car2.page_success()
        } else {
            if (Math.abs(car2._touchDeltaY) > 10 && Math.abs(car2._touchDeltaY) < 100) {
                car2.page_fial()
            } else {
                car2.page_fial()
            }
        }
        car2._handleEvent("end");
        car2._movePosition = null;
        car2._movePosition_c = null;
        car2._touchStartValY = 0
    },
    page_success: function() {
        var B = car2._translateZ();
        car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle("transform")] = "translate(0,0)" + B;
        var A = car2._touchDeltaY > 0 ? $(window).height() / 5 : -$(window).height() / 5;
        var D = 0.8;
        var C = "translate(0," + A + "px)" + B;
        if (typeof(car2._turnMode) == "undefined" || "V" == car2._turnMode) {
            C += " scale(" + D + ")"
        }
        car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle("transform")] = C;
        car2._handleEvent("success")
    },
    page_fial: function() {
        var A = car2._translateZ();
        if (!car2._pageNext && car2._pageNext != 0) {
            car2._moveStart = true;
            car2._moveFirst = true;
            return
        }
        if (car2._movePosition == "up") {
            car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle("transform")] = "translate(0," + $(window).height() + "px)" + A
        } else {
            car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle("transform")] = "translate(0,-" + $(window).height() + "px)" + A
        }
        car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle("transform")] = "translate(0,0)" + A + " scale(1)";
        car2._handleEvent("fial")
    },
    loadStartImg: function(B, A) {
        var D = new Array();
        if (B > car2._pageNum) {
            B = car2._pageNum
        }
        for (var C = 0; C < B; C++) {
            D.push(car2._page.eq(C))
        }
        loadPageTools.loadPagesArray(D, true, A)
    },
    haddle_envent_fn: function() {
        car2._on("start", car2.lazy_bigP);
        car2._on("move",
        function() {});
        car2._on("fial",
        function() {
            setTimeout(function() {
                car2._page.eq(car2._pageNow).attr("data-translate", "");
                car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle("transform")] = "";
                car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle("transition")] = "";
                car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle("transform")] = "";
                car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle("transition")] = "";
                car2._page.eq(car2._pageNext).removeClass("active").addClass("f-hide");
                car2._moveStart = true;
                car2._moveFirst = true;
                car2._pageNext = null;
                car2._touchDeltaY = 0
            },
            300)
        });
        car2._on("success",
        function() {
            if (car2._loopMode && car2._pageNext == 0 && car2._pageNow == car2._pageNum - 1) {
                car2._firstChange = true
            }
            setTimeout(function() {
                car2.Txt_init(car2._page.eq(car2._pageNow));
                if (car2._pageNext == car2._pageNum - 1) {
                    $(".u-arrow").addClass("f-hide")
                } else {
                    if ($("#j-mengban").hasClass("z-show")) {} else {
                        $(".u-arrow").removeClass("f-hide")
                    }
                }
                car2._page.eq(car2._pageNow).addClass("f-hide");
                car2._page.eq(car2._pageNow).attr("data-translate", "");
                car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle("transform")] = "";
                car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle("transition")] = "";
                car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle("transform")] = "";
                car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle("transition")] = "";
                $(".p-ct").removeClass("fixed");
                car2._page.eq(car2._pageNext).removeClass("active");
                car2._page.eq(car2._pageNext).removeClass("fixed");
                car2._pageNow = car2._pageNext;
                car2._moveStart = true;
                car2._moveFirst = true;
                car2._pageNext = null;
                car2._page.eq(car2._pageNow).removeClass("fixed");
                car2._page.eq(car2._pageNow).attr("data-translate", "");
                car2._touchDeltaY = 0;
                setTimeout(function() {
                    if (car2._page.eq(car2._pageNow).hasClass("z-animate")) {
                        return
                    }
                    car2._page.eq(car2._pageNow).addClass("z-animate")
                },
                20);
                $(".j-detail").removeClass("z-show");
                $(".txt-arrow").removeClass("z-toggle");
                if (car2._maskHasDel == 0 && $("#r-cover").val() != null && $("#r-cover").val().length > 3) {
                    if (car2._pageNow == car2._maskIndex) {
                        if (car2._maskType == "1") {
                            car2.page_stop();
                            car2._scrollStop()
                        } else {
                            if (car2._maskType == "0") {
                                $("#j-mengban").removeClass("f-hide");
                                $("#j-mengban").addClass("z-show");
                                car2._page.eq(car2._pageNow).each(function() {
                                    var A = $(this).find(".page-con-img").attr("origin-src");
                                    $(this).find(".page-con-img").attr("src", A)
                                })
                            }
                        }
                        $(".u-arrow").addClass("f-hide");
                        car2._audioNode.addClass("f-hide")
                    } else {
                        car2.startEffect()
                    }
                } else {
                    car2.startEffect()
                }
                $("video").each(function() {
                    if (!this.paused) {
                        this.pause()
                    }
                });
                car2.Txt_init(car2._page.eq(car2._pageNow))
            },
            300)
        })
    },
    startEffect: function() {
        car2._page.not(car2._pageNow).find(".animation").each(function() {
            var A = $(this).attr("animationType");
            $(this).removeClass(A);
            if (car2.isInitNeedHide(A)) {
                $(this).hide();
                $(this).css("opacity", "0")
            }
        });
        car2._page.eq(car2._pageNow).find(".animation").each(function() {
            var A = $(this).attr("animationType");
            $(this).show();
            $(this).addClass(A)
        })
    },
    mapAddEventHandler: function(E, C, A, D) {
        var B = A;
        if (!car2._isOwnEmpty(D)) {
            B = function(F) {
                A.call(this, D)
            }
        }
        E.each(function() {
            $(this).on(C, B)
        })
    },
    mapShow: function(E) {
        var F = $(this).attr("data-detail");
        E.detal = F;
        E.latitude = $(this).attr("data-latitude");
        E.longitude = $(this).attr("data-longitude");
        var C = E.detal,
        G = E.latitude,
        D = E.longitude,
        A = E.fnOpen,
        B = E.fnClose;
        car2._scrollStop();
        car2._map.addClass("show");
        $(document.body).animate({
            scrollTop: 0
        },
        0);
        if ($(this).attr("data-mapIndex") != car2._mapIndex) {
            car2._map.html($('<div class="bk"><span class="css_sprite01 s-bg-map-logo"></span></div>'));
            car2._mapValue = false;
            car2._mapIndex = $(this).attr("data-mapIndex")
        } else {
            car2._mapValue = true
        }
        setTimeout(function() {
            if (car2._map.find("div").length >= 1) {
                car2._map.addClass("mapOpen");
                car2.page_stop();
                car2._scrollStop();
                car2._audioNode.addClass("z-low");
                car2._page.eq(car2._pageNow).css("z-index", 15);
                setTimeout(function() {
                    if (!car2._mapValue) {
                        car2.addMap(C, G, D, A, B)
                    }
                },
                500)
            } else {
                return
            }
        },
        100)
    },
    mapSave: function() {
        $(window).on("webkitTransitionEnd transitionend", A);
        car2.page_start();
        car2._scrollStart();
        car2._map.removeClass("mapOpen");
        car2._audioNode.removeClass("z-low");
        if (!car2._mapValue) {
            car2._mapValue = true
        }
        function A() {
            car2._map.removeClass("show");
            car2._page.eq(car2._pageNow).css("z-index", 9);
            $(window).off("webkitTransitionEnd transitionend")
        }
    },
    addMap: function(A, F, B, D, E) {
        var A = A,
        F = Number(F),
        B = Number(B);
        var D = typeof(D) === "function" ? D: "",
        E = typeof(E) === "function" ? E: "";
        var C = {
            sign_name: "",
            contact_tel: "",
            address: A
        };
        A = C; ! F ? F = 39.915 : F = F; ! B ? B = 116.404 : B = B;
        car2._map.ylmap({
            detal: A,
            latitude: F,
            longitude: B,
            fnOpen: D,
            fnClose: E
        })
    },
    mapCreate: function() {
        if (".j-map".length <= 0) {
            return
        }
        var B = $(".j-map");
        var A = {
            fnOpen: car2._scrollStop,
            fnClose: car2.mapSave
        };
        car2.mapAddEventHandler(B, "click", car2.mapShow, A)
    },
    audio_init: function() {
        var A = {
            loop: true,
            preload: "auto",
            src: car2._audioNode.attr("data-src")
        };
        if (A.src != null && A.src.length > 5) {
            car2._audio = new Audio();
            for (var B in A) {
                if (A.hasOwnProperty(B) && (B in car2._audio)) {
                    car2._audio[B] = A[B]
                }
            }
            if (car2._audio) {
                car2._audio.load()
            }
        }
    },
    audio_addEvent: function() {
        if (car2._audioNode.length <= 0) {
            return
        }
        var B = car2._audioNode.find(".txt_audio"),
        A = null;
        car2._audioNode.find(".btn_audio").on("click",
        function() {
            car2._hasClickAudioCountorl = true;
            car2.audio_contorl()
        });
        $(car2._audio).on("play",
        function() {
            car2._audio_val = false;
            C(B, true, A);
            $.fn.coffee.start();
            $(".coffee-steam-box").show(500)
        });
        $(car2._audio).on("pause",
        function() {
            C(B, false, A);
            $.fn.coffee.stop();
            $(".coffee-steam-box").hide(500)
        });
        function C(E, F, D) {
            if (F) {
                E.text("打开")
            } else {
                E.text("关闭")
            }
            if (D) {
                clearTimeout(D)
            }
            E.removeClass("z-move z-hide");
            D = setTimeout(function() {
                E.addClass("z-move").addClass("z-hide")
            },
            1000)
        }
    },
    audio_contorl: function() {
        if (!car2._audio_val) {
            car2.audio_stop()
        } else {
            car2.audio_play()
        }
    },
    audio_play: function() {
        car2._audio_val = false;
        if (car2._audio) {
            car2._audio.play()
        }
    },
    audio_stop: function() {
        car2._audio_val = true;
        if (car2._audio) {
            car2._audio.pause()
        }
    },
    video_init: function() {
        $(".j-video").each(function() {
            var D = {
                controls: "controls",
                preload: "none",
                width: $(this).attr("data-width"),
                height: $(this).attr("data-height"),
                src: $(this).attr("data-src")
            };
            var C = $('<video class="f-hide"></video>')[0];
            for (var B in D) {
                if (D.hasOwnProperty(B) && (B in C)) {
                    C[B] = D[B]
                }
                this.appendChild(C)
            }
            var A = $(C).prev();
            $(C).on("play",
            function() {
                A.hide();
                $(C).removeClass("f-hide")
            });
            $(C).on("pause",
            function() {
                A.show();
                $(C).addClass("f-hide")
            })
        });
        $(".j-video .img").on("click",
        function() {
            var A = $(this).next()[0];
            if (A.paused) {
                $(A).removeClass("f-hide");
                A.play();
                $(this).hide()
            }
        })
    },
    media_control: function() {
        if (!car2._audio) {
            return
        }
        if ($("video").length <= 0) {
            return
        }
        $(car2._audio).on("play",
        function() {
            $("video").each(function() {
                if (!this.paused) {
                    this.pause()
                }
            })
        });
        $("video").on("play",
        function() {
            if (!car2._audio_val) {
                car2.audio_contorl()
            }
        })
    },
    media_init: function() {
        car2.audio_init();
        car2.video_init();
        car2.audio_addEvent();
        car2.media_control()
    },
    lazy_img: function() {
        var A = $(".lazy-img");
        A.each(function() {
            var C = $(this);
            if (C.is("img")) {
                C.attr("src", "style3/img/load.gif")
            } else {
                var D = C.css("background-position"),
                B = C.css("background-size");
                C.attr({
                    "data-position": D,
                    "data-size": B
                });
                if (C.attr("data-bg") == "no") {
                    C.css({
                        "background-repeat": "no-repeat"
                    })
                }
                C.css({
                    "background-image": "url(style3/img/load.gif)",
                    "background-size": "120px 120px",
                    "background-position": "center"
                });
                if (C.attr("data-image") == "no") {
                    C.css({
                        "background-image": "none"
                    })
                }
            }
        })
    },
    lazy_start: function() {
        setTimeout(function() {
            for (var A = 0; A < 3; A++) {
                var B = $(".m-page").eq(A);
                if (B.length == 0) {
                    break
                }
                if (B.find(".lazy-img").length != 0) {
                    car2.lazy_change(B, false);
                    if (B.attr("data-page-type") == "flyCon") {
                        car2.lazy_change($(".m-flypop"), false)
                    }
                } else {
                    continue
                }
            }
        },
        200)
    },
    lazy_bigP: function() {
        for (var A = 3; A <= 5; A++) {
            var B = $(".m-page").eq(car2._pageNow + A);
            if (B.length == 0) {
                break
            }
            if (B.find(".lazy-img").length != 0) {
                car2.lazy_change(B, true);
                if (B.attr("data-page-type") == "flyCon") {
                    car2.lazy_change($(".m-flypop"), false)
                }
            } else {
                continue
            }
        }
    },
    lazy_change: function(D, C) {
        if (D.attr("data-page-type") == "3d") {
            car2.lazy_3d(D)
        }
        if (D.attr("data-page-type") == "flyCon") {
            var A = $(".m-flypop").find(".lazy-img");
            A.each(function() {
                var E = $(this),
                F = E.attr("data-src");
                $("<img />").on("load",
                function() {
                    if (E.is("img")) {
                        E.attr("src", F)
                    }
                }).attr("src", F)
            })
        }
        var B = D.find(".lazy-img");
        B.each(function() {
            var F = $(this),
            G = F.attr("data-src"),
            H = F.attr("data-position"),
            E = F.attr("data-size");
            if (F.attr("data-bg") != "no") {
                $("<img />").on("load",
                function() {
                    if (F.is("img")) {
                        F.attr("src", G)
                    } else {
                        F.css({
                            "background-image": "url(" + G + ")",
                            "background-position": H,
                            "background-size": E
                        })
                    }
                    if (C) {
                        for (var J = 0; J < $(".m-page").size(); J++) {
                            var I = $(".m-page").eq(J);
                            if ($(".m-page").find(".lazy-img").length == 0) {
                                continue
                            } else {
                                car2.lazy_change(I, true)
                            }
                        }
                    }
                }).attr("src", G);
                F.removeClass("lazy-img").addClass("lazy-finish")
            } else {
                if (F.attr("data-auto") == "yes") {
                    F.css("background", "none")
                }
            }
        })
    },
    signUp_submit: function() {
        $("#j-signUp-submit").on("click",
        function(B) {
            B.preventDefault();
            if (car2.hasSubmitInfo) {
                car2.showCheckMessage("您已经提交过信息了！", true);
                return
            }
            var A = $(this).parents("#j-signUp");
            var C = car2.signUpCheck_input(A);
            if (C) {
                car2.signUpCheck_submit(A)
            } else {
                return
            }
        })
    },
    signUpCheck_input: function(C, B) {
        var D = true;
        var A = C.find("input");
        A.each(function() {
            if (this.name != "" && this.name != "undefined") {
                var E = $(this).attr("allowEmpty") == "true";
                var F = this.name;
                var I = car2.regFunction(F);
                var H = I.empty_tip,
                G = I.reg,
                J = I.reg_tip;
                if ($.trim($(this).val()) == "" && !E) {
                    car2.showCheckMessage(H, true);
                    $(this).focus();
                    $(this).addClass("z-error");
                    D = false;
                    return false
                }
                if (!E) {
                    if (G != undefined && G != "") {
                        if (!$(this).val().match(G)) {
                            $(this).focus();
                            $(this).addClass("z-error");
                            car2.showCheckMessage(J, true);
                            D = false;
                            return false
                        }
                    }
                }
                $(this).removeClass("z-error");
                $(".u-note-error").html("")
            }
        });
        if (D == false) {
            return false
        } else {
            return true
        }
    },
    regFunction: function(C) {
        var B = "",
        D = "",
        A = "";
        switch (C) {
        case "name":
            A = /^[\u4e00-\u9fa5|a-z|A-Z|\s]{1,20}$/;
            B = "不能落下姓名哦！";
            D = "这名字太怪了！";
            break;
        case "sex":
            B = "想想，该怎么称呼您呢？";
            D = "想想，该怎么称呼您呢？";
            break;
        case "tel":
            A = /^1[0-9][0-9]\d{8}$/;
            B = "有个联系方式，就更好了！";
            D = "这号码,可打不通... ";
            break;
        case "email":
            A = /(^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$)/i;
            B = "都21世纪了，应该有个电子邮箱吧！";
            D = "邮箱格式有问题哦！";
            break;
        case "company":
            A = /^[\u4e00-\u9fa5|a-z|A-Z|\s|\d]{1,20}$/;
            B = "填个公司吧！";
            D = "这个公司太奇怪了！";
            break;
        case "industry":
            A = /^[\u4e00-\u9fa5|a-z|A-Z|\s|\d]{1,20}$/;
            B = "所属行业不能为空！";
            D = "这个行业太奇怪了！";
            break;
        case "job":
            A = /^[\u4e00-\u9fa5|a-z|A-Z|\s]{1,20}$/;
            B = "请您填个职位";
            D = "这个职位太奇怪了！";
            break;
        case "date":
            B = "给个日期吧！";
            D = "";
            break;
        case "weixin":
            B = "必须填写微信号哦！";
            D = "";
            break;
        case "time":
            B = "填下具体时间更好哦！";
            D = "";
            break;
        case "age":
            A = /^([3-9])|([1-9][0-9])|([1][0-3][0-9])$/;
            B = "有个年龄就更好了！";
            D = "这年龄可不对哦！";
            break;
        case '"yingye"':
            B = "";
            D = "";
            break
        }
        return {
            empty_tip: B,
            reg_tip: D,
            reg: A
        }
    },
    signUpCheck_submit: function(B) {
        car2.loadingPageShow();
        var A = "/uwp/newServlet?serviceName=ShareMag&medthodName=addShareInfo&shareID=" + $("#shareID").val();
        $.ajax({
            url: A,
            cache: false,
            dataType: "json",
            async: true,
            type: "POST",
            data: B.serialize(),
            success: function(C) {
                car2.loadingPageHide();
                if (C.code == 200) {
                    car2.showCheckMessage("提交成功！", true);
                    car2.hasSubmitInfo = true;
                    setTimeout(function() {
                        $(".u-arrow").removeClass("f-hide");
                        $(".u-audio").removeClass("f-hide");
                        $(".book-form").removeClass("z-show");
                        $(".book-bg").removeClass("z-show");
                        setTimeout(function() {
                            $(document.body).css("height", "100%");
                            car2.page_start();
                            car2._scrollStop();
                            $(".book-bg").addClass("f-hide");
                            $(".book-form").addClass("f-hide")
                        },
                        500)
                    },
                    1000);
                    $(".book-bd .bd-form .btn").addClass("z-stop");
                    $(".book-bd .bd-form .btn").attr("data-submit", "true")
                } else {
                    if (C.code == "400") {
                        car2.hasSubmitInfo = false;
                        car2.showCheckMessage("提交失败", false)
                    }
                }
            },
            error: function(D, C, E) {
                car2.showCheckMessage(E, true);
                setTimeout(function() {
                    car2.loadingPageHide()
                },
                500)
            }
        })
    },
    showCheckMessage: function(A, B) {
        if (B) {
            $(".u-note-error").html(A);
            $(".u-note-error").addClass("on");
            $(".u-note-sucess").removeClass("on");
            setTimeout(function() {
                $(".u-note").removeClass("on")
            },
            2000)
        } else {
            $(".u-note-sucess").addClass("on");
            $(".u-note-error").removeClass("on");
            setTimeout(function() {
                $(".u-note").removeClass("on")
            },
            2000)
        }
    },
    height_auto: function(B, D) {
        B.children(".page-con").css("height", "auto");
        var C = $(window).height();
        var A = true;
        if (!A) {
            if (B.height() <= C) {
                B.children(".page-con").height(C + 2);
                if ((!$(".p-ct").hasClass("fixed")) && D == "true") {
                    $(".p-ct").addClass("fixed")
                }
            } else {
                car2._scrollStart();
                if (D == "true") {
                    $(".p-ct").removeClass("fixed")
                }
                B.children(".page-con").css("height", "100%");
                return
            }
        } else {
            B.children(".page-con").height(C + 2);
            if ((!$(".p-ct").hasClass("fixed")) && D == "true") {
                $(".p-ct").addClass("fixed")
            }
        }
    },
    Txt_init: function(A) {
        if (A.find(".j-txt").length <= 0) {
            return
        }
        if (A.find(".j-txt").find(".j-detail p").length <= 0) {
            return
        }
        A.find(".j-txt").each(function() {
            var D = $(this).find(".j-detail"),
            C = $(this).find(".j-title"),
            G = C.find(".txt-arrow"),
            E = D.find("p"),
            H = parseInt(C.height()),
            B = parseInt(E.height()),
            F = B + H;
            if ($(this).parents(".m-page").hasClass("m-smallTxt")) {
                if ($(this).parents(".smallTxt-bd").index() == 0) {
                    D.css("top", H)
                } else {
                    D.css("bottom", H)
                }
            }
            D.attr("data-height", B);
            $(this).attr("data-height-init", H);
            $(this).attr("data-height-extand", F);
            E[0].style[car2._prefixStyle("transform")] = "translate(0,-" + B + "px)";
            if ($(this.parentNode).hasClass("z-left")) {
                E[0].style[car2._prefixStyle("transform")] = "translate(0," + B + "px)"
            }
            D.css("height", "0");
            G.removeClass("z-toggle");
            $(this).css("height", H)
        })
    },
    bigTxt_extand: function() {
        $("body").on("click", ".j-title",
        function() {
            if ($(".j-detail").length <= 0) {
                return
            }
            var A = $(this.parentNode).find(".j-detail");
            $(".j-detail").removeClass("action");
            A.addClass("action");
            if ($(this).hasClass("smallTxt-arrow")) {
                $(".smallTxt-bd").removeClass("action");
                A.parent().addClass("action")
            }
            if (A.hasClass("z-show")) {
                A.removeClass("z-show");
                A.css("height", 0);
                $(this.parentNode).css("height", parseInt($(this.parentNode).attr("data-height-init")))
            } else {
                A.addClass("z-show");
                A.css("height", parseInt(A.attr("data-height")));
                $(this.parentNode).css("height", parseInt($(this.parentNode).attr("data-height-extand")))
            }
            $(".j-detail").not(".action").removeClass("z-show");
            $(".txt-arrow").removeClass("z-toggle");
            A.hasClass("z-show") ? ($(this).find(".txt-arrow").addClass("z-toggle")) : ($(this).find(".txt-arrow").removeClass("z-toggle"))
        })
    } (),
    Txt_back: function() {
        $("body").on("click", ".m-page",
        function(D) {
            D.stopPropagation();
            var E = $(D.target);
            var A = E.parents(".m-page");
            var B = E.parents(".j-txtWrap").length == 0 ? E: E.parents(".j-txtWrap");
            if (A.find(".j-txt").find(".j-detail p").length <= 0) {
                return
            }
            if (A.find(".j-txt").length <= 0 || E.parents(".j-txt").length >= 1 || E.hasClass("bigTxt-btn") || E.parents(".bigTxt-btn").length >= 1) {
                return
            }
            var C = B.find(".j-detail");
            $(".j-detail").removeClass("action");
            C.addClass("action");
            $(".j-detail").not(".action").removeClass("z-show");
            B.each(function() {
                var G = $(this).find(".j-detail");
                var F = $(this).find(".txt-arrow");
                var H = $(this).find(".j-txt");
                if (G.hasClass("z-show")) {
                    G.removeClass("z-show");
                    G.css("height", 0);
                    H.css("height", parseInt(H.attr("data-height-init")))
                } else {
                    G.addClass("z-show");
                    G.css("height", parseInt(G.attr("data-height")));
                    H.css("height", parseInt(H.attr("data-height-extand")))
                }
                G.hasClass("z-show") ? (F.addClass("z-toggle")) : (F.removeClass("z-toggle"))
            })
        })
    } (),
    input_form: function() {
        $("body").on("click", ".popSubmitInfo",
        function() {
            var A = $(this).attr("data-submit");
            if (A == "true") {
                return
            }
            var B = $(window).height();
            $(document.body).css("height", B);
            car2.page_stop();
            car2._scrollStart();
            car2._page.eq(car2._pageNow).css("z-index", 15);
            $(".book-bg").removeClass("f-hide");
            $(".book-form").removeClass("f-hide");
            $(".u-arrow").addClass("f-hide");
            $(".u-audio").addClass("f-hide");
            setTimeout(function() {
                $(".book-form").addClass("z-show");
                $(".book-bg").addClass("z-show")
            },
            50);
            $(".book-bg").off("click");
            $(".book-bg").on("click",
            function(C) {
                C.stopPropagation();
                var D = $(C.target);
                if (D.parents(".book-form").length >= 1 && !D.hasClass("j-close-img") && D.parents(".j-close").length <= 0) {
                    return
                }
                $(".book-form").removeClass("z-show");
                $(".book-bg").removeClass("z-show");
                setTimeout(function() {
                    $(document.body).css("height", "100%");
                    car2.page_start();
                    car2._scrollStop();
                    car2._page.eq(car2._pageNow).css("z-index", 9);
                    $(".book-bg").addClass("f-hide");
                    $(".book-form").addClass("f-hide")
                },
                500)
            })
        })
    } (),
    sex_select: function() {
        var B = $("#j-signUp").find(".sex p");
        var C = $("#j-signUp").find(".sex strong");
        var A = $("#j-signUp").find(".sex input");
        B.on("click",
        function() {
            var D = $(this).find("strong");
            C.removeClass("open");
            D.addClass("open");
            var E = $(this).attr("data-sex");
            A.val(E)
        })
    } (),
    lightapp_intro_show: function() {
        $(".market-notice").removeClass("f-hide");
        setTimeout(function() {
            $(".market-notice").addClass("show")
        },
        100)
    },
    lightapp_intro_hide: function(A) {
        if (A) {
            $(".market-notice").addClass("f-hide").removeClass("show");
            return
        }
        $(".market-notice").removeClass("show");
        setTimeout(function() {
            $(".market-notice").addClass("f-hide")
        },
        500)
    },
    page_show_info_bar: function() {
        $(".market-page").removeClass("f-hide");
        setTimeout(function() {
            $(".market-page").addClass("show");
            setTimeout(function() {
                $(".market-img").addClass("show")
            },
            100)
        },
        100);
        car2.page_stop();
        car2._scrollStop();
        $(".market-page").off("click");
        $(".market-page").on("click",
        function(A) {
            car2.page_hide_info_bar(A)
        })
    },
    page_hide_info_bar: function(A) {
        if ($(A.target).hasClass("market-page")) {
            $(".market-img").removeClass("show");
            setTimeout(function() {
                $(".market-page").removeClass("show");
                setTimeout(function() {
                    $(".market-page").addClass("f-hide")
                },
                200)
            },
            500);
            car2.lightapp_intro_show();
            car2.page_start();
            car2._scrollStart()
        }
    },
    lightapp_intro: function() {
        $(".market-notice").on("click",
        function() {
            car2.page_show_info_bar()
        });
        $(".market-page").off("click");
        $(".market-page").on("click",
        function(A) {
            car2.page_hide_info_bar()
        })
    },
    ajaxTongji: function(A) {
        var B = location.search.substr(location.search.indexOf("channel=") + 8);
        B = B.match(/^\d+/);
        if (!B || isNaN(B) || B < 0) {
            B = 1
        }
        var D = $("#activity_id").val();
        var C = "/analyseplugin/plugin?activity_id=" + D + "&plugtype=" + A;
        $.get(C, {},
        function() {})
    },
    wxShare: function() {
        $("body").on("click", ".bigTxt-btn-wx",
        function() {
            var A = $(this).parent().find(".bigTxt-weixin");
            A.addClass("z-show");
            car2.page_stop();
            A.on("click",
            function() {
                $(this).removeClass("z-show");
                car2.page_start();
                $(this).off("click")
            })
        })
    } (),
    loadingPageShow: function() {
        $(".u-pageLoading").show()
    },
    loadingPageHide: function() {
        $(".u-pageLoading").hide()
    },
    loadingLastPageShow: function(A) {
        if (typeof(A) == "undefined") {
            A = "正在努力加载剩余页面..."
        }
        $(".lastPageLoading div").html(A);
        $(".lastPageLoading").css("opacity", 1);
        $(".lastPageLoading").css("z-index", 9999999);
        setTimeout(function() {
            car2.loadingLastPageHide()
        },
        2000)
    },
    loadingLastPageHide: function() {
        $(".lastPageLoading").css("opacity", 0);
        $(".lastPageLoading").css("z-index", 0)
    },
    refresh: function() {
        $(window).height() = $(window).height();
        car2._windowWidth = $(window).width()
    },
    plugin: function() {
        car2.mapCreate();
        $("#coffee_flow").coffee({
            steams: ["<img src='/youtuShare/style3/img/audio_widget_01@2x.png' />", "<img src='/youtuShare/style3/img/audio_widget_01@2x.png' />"],
            steamHeight: 100,
            steamWidth: 44
        });
        car2.initMask()
    },
    cover_draw: function(G, F, D, A, E, B) {
        if (G.style.display.indexOf("none") > -1) {
            return
        }
        var C = new Lottery(G, F, D, A, E, B);
        C.init()
    },
    menban_callback: function() {
        if (car2._maskHasDel == 0) {
            car2._maskHasDel = 1;
            setTimeout(function() {
                $("#j-mengban canvas").addClass("hideMengBan");
                setTimeout(function() {
                    $("#j-mengban").removeClass("z-show");
                    $("#j-mengban").addClass("f-hide");
                    setTimeout(function() {
                        if (car2._pageNow < car2._pageNum - 1) {
                            $(".u-arrow").removeClass("f-hide")
                        }
                        car2.page_start();
                        if (!car2._hasClickAudioCountorl) {
                            car2._audioNode.removeClass("f-hide");
                            if (car2._audio) {
                                car2._audio.play()
                            }
                        }
                    },
                    1000);
                    car2.startEffect()
                },
                500)
            },
            500)
        }
    },
    startFirstPageEffect: function() {
        if (!car2._firstChange && car2._pageNow == 0) {
            if ($("#r-cover").val().length == 0) {
                setTimeout(function() {
                    car2.startEffect()
                },
                500)
            } else {
                if (car2._maskType == "1" && car2._pageNow == car2._maskIndex && car2._maskHasDel == "0") {
                    car2.page_stop();
                    car2._scrollStop();
                    $(".u-arrow").addClass("f-hide")
                }
            }
        }
    },
    initMask: function() {
        if ($("#r-cover").val() == null || $("#r-cover").val().length < 4) {
            car2.page_start();
            car2._audioNode.removeClass("f-hide");
            if (car2._audio) {
                car2._audio.play()
            }
            $(".u-arrow").removeClass("f-hide");
            return
        }
        if (car2._maskType != "0") {
            car2._audioNode.removeClass("f-hide");
            $(".u-arrow").removeClass("f-hide");
            car2.page_start();
            return
        }
        var F = $("#j-mengban")[0],
        E = $("#r-cover").val(),
        C = "image",
        A = 640,
        D = $(window).height(),
        B = car2.menban_callback;
        if (car2._maskIndex > 0) {
            car2.page_start();
            $(".u-arrow").removeClass("f-hide");
            if (car2._audio) {
                car2._audioNode.removeClass("f-hide");
                if (car2._audio) {
                    car2._audio.play()
                }
            }
            $("#j-mengban").removeClass("z-show");
            $("#j-mengban").addClass("f-hide")
        } else {
            $(".u-arrow").addClass("f-hide")
        }
        car2.cover_draw(F, E, C, A, D, B)
    },
    styleInit: function() {
        document.body.style.userSelect = "none";
        document.body.style.mozUserSelect = "none";
        document.body.style.webkitUserSelect = "none";
        if (car2._IsPC()) {
            $(document.body).addClass("pc")
        } else {
            $(document.body).addClass("mobile")
        }
        if (car2._Android) {
            $(document.body).addClass("android")
        }
        if (car2._iPhoen) {
            $(document.body).addClass("iphone")
        }
        if (!car2._hasPerspective()) {
            car2._rotateNode.addClass("transformNode-2d");
            $(document.body).addClass("no-3d")
        } else {
            car2._rotateNode.addClass("transformNode-3d");
            $(document.body).addClass("perspective");
            $(document.body).addClass("yes-3d")
        }
        this.lazy_img();
        car2.Txt_init(car2._page.eq(car2._pageNow));
        setTimeout(function() {
            $(".m-alert").find("strong").addClass("z-show")
        },
        1000);
        $(".u-arrow").on("touchmove",
        function(D) {
            D.preventDefault()
        });
        $(".p-ct").height($(window).height());
        $(".m-page").height($(window).height());
        $("#j-mengban").height($(window).height());
        $(".translate-back").height($(window).height());
        var C = navigator.userAgent;
        var A = 460;
        if (/Android (\d+\.\d+)/.test(C)) {
            A = window.screen.width / window.devicePixelRatio
        } else {
            if (/iphone (\d+\.\d+)/.test(C)) {
                A = window.screen.width
            } else {
                A = 460
            }
        }
        var B = 460 / A;
        $(".opusInfo").css("-webkit-transform", "scale(" + B + ")")
    },
    isInitNeedHide: function(A) {
        var D = false;
        for (var C = 0; C < car2._initHideEffect.length; C++) {
            var B = car2._initHideEffect[C];
            if (A.indexOf(B) > -1) {
                D = true;
                break
            }
        }
        return D
    },
    initSpritePostion: function() {
        $(".animation").each(function() {
            var B = $(this).attr("animationType");
            if (car2.isInitNeedHide(B)) {
                $(this).hide()
            }
            var A = ($(this).attr("endX") * car2._imgScale - car2._paddingLeft);
            var D = ($(this).attr("endY") - car2._paddingTop) * car2._imgScale;
            A = Math.round(A);
            D = Math.round(D);
            var E = $(this).attr("originW");
            var C = $(this).attr("originH");
            $(this).css("left", A + "px");
            $(this).css("top", D + "px");
            if (B.indexOf("graduallyIn") == -1) {
                $(this).css("width", Math.round(E * car2._imgScale) + "px");
                $(this).css("height", Math.round(C * car2._imgScale) + "px");
                $(this).find("img").each(function() {
                    $(this).css("width", Math.round(E * car2._imgScale) + "px");
                    $(this).css("height", Math.round(C * car2._imgScale) + "px")
                })
            } else {
                $(this).css("left", A + (E * (car2._imgScale - 1) / 2) + "px");
                $(this).css("top", D + (C * (car2._imgScale - 1) / 2) + "px");
                $(this).find("img").each(function() {
                    $(this).css("width", Math.round(E) + "px");
                    $(this).css("height", Math.round(C) + "px")
                })
            }
        })
    },
    initConPostion: function() {
        var C = $("#imgWidth").val();
        var A = $("#imgHeight").val();
        $(".page-con-img").each(function() {
            $(this).css("left", -car2._paddingLeft + "px");
            $(this).css("top", -car2._paddingTop + "px");
            $(this).css("width", Math.round(C * car2._imgScale) + "px");
            $(this).css("height", Math.round(A * car2._imgScale) + "px")
        });
        $(".swiper-con").each(function() {
            $(this).css("width", "640px");
            $(this).css("height", car2._windowHeight + "px")
        });
        try {
            initSwiper()
        } catch(B) {}
        $(".customForm").css("top", (400 - car2._paddingTop) + "px");
        $(".arrow-left").css("top", car2._windowHeight / 2 + "px");
        $(".arrow-right").css("top", car2._windowHeight / 2 + "px")
    },
    init: function() {
        this.styleInit();
        this.haddle_envent_fn();
        car2.lightapp_intro();
        this._scrollStop();
        $('input[type="hidden"]').appendTo($("body"));
        $("<img />").attr("src", $("#r-cover").val());
        $("<img />").attr("src", $(".m-fengye").find(".page-con").attr("data-src"));
        var A = new Date().getTime();
        $(window).on("load",
        function() {
            var B = $(window).height();
            var G = $("#imgWidth").val();
            var E = $("#imgHeight").val();
            if (640 / B < G / E) {
                car2._paddingLeft = (G / E * B - 640) / 2;
                car2._imgScale = B / E
            } else {
                car2._paddingTop = (640 / G * E - B) / 2;
                car2._imgScale = 640 / G
            }
            car2.initSpritePostion();
            car2.initConPostion();
            var H = new Date().getTime();
            var D = false;
            var F;
            var C = H - A;
            if (C >= 500) {
                D = true
            }
            if (D) {
                F = 0
            } else {
                F = 500 - C
            }
            car2._maskIndex = $("#r-cover-index").val();
            car2._maskType = $("#maskType").val();
            car2._linkUrl = $("#linkUrl").val();
            setTimeout(function() {
                setTimeout(function() {
                    $(".m-alert").addClass("f-hide")
                },
                1000);
                car2.loadStartImg(car2._preLoadPageCount,
                function() {
                    setTimeout(function() {
                        var N = $("#r-cover").val();
                        if (car2._maskIndex == 0 && N.length > 1) {
                            $("#j-mengban").addClass("z-show");
                            $("#j-mengban").removeClass("f-hide")
                        }
                        $(".startImg").css("height", "0px");
                        $(".translate-back").removeClass("translate-back-hide");
                        $(".m-fengye").removeClass("f-hide");
                        car2.height_auto(car2._page.eq(car2._pageNow), "false");
                        car2.media_init();
                        car2.startFirstPageEffect();
                        var M = new Array();
                        for (var O = car2._preLoadPageCount; O < car2._pageNum; O++) {
                            var P = car2._page.eq(O);
                            M.push(P)
                        }
                        loadPageTools.loadPagesArray(M, false,
                        function() {})
                    },
                    1000)
                });
                car2.signUp_submit();
                try {
                    car2.plugin()
                } catch(K) {}
                if (car2._pageNum < 2) {
                    car2.page_stop();
                    $(".u-arrow").addClass("f-hide")
                }
                var I = location.search.substr(location.search.indexOf("channel=") + 8);
                I = I.match(/^\d+/);
                if (!I || isNaN(I) || I < 0) {
                    I = 1
                }
                var L = $("#activity_id").val();
                var J = "/auto/analyse/" + L + "?channel=" + I;
                $(".p-ct").height($(window).height());
                $(".m-page").height($(window).height());
                $("#j-mengban").height($(window).height());
                $(".translate-back").height($(window).height())
            },
            F)
        })
    }
};
car2.init();
var loadPageTools = {
    curNeedLoadPageArray: null,
    loadStartImgCallBack: null,
    isPreLoading: false,
    loadPagesArray: function(D, B, A) {
        loadPageTools.curNeedLoadPageArray = D;
        loadPageTools.isPreLoading = B;
        loadPageTools.loadStartImgCallBack = A;
        loadPageTools.curLoadedImgCount = 0;
        loadPageTools.curNeedLoadImgCount = 0;
        for (var E = 0; E < loadPageTools.curNeedLoadPageArray.length; E++) {
            var F = loadPageTools.curNeedLoadPageArray[E];
            var C = F.find(".uniImg");
            loadPageTools.curNeedLoadImgCount += C.length
        }
        loadPageTools.startLoadPage()
    },
    startLoadPage: function() {
        if (loadPageTools.curNeedLoadPageArray.length == 0) {
            loadPageTools.loadStartImgCallBack.call();
            return
        }
        var A = loadPageTools.curNeedLoadPageArray.shift();
        loadPageTools.loadPageImg(A,
        function() {
            A.attr("hasLoaded", "true");
            loadPageTools.startLoadPage()
        })
    },
    curLoadedImgCount: 0,
    curNeedLoadImgCount: 0,
    loadPageImg: function(B, A) {
        var D = B.find(".uniImg");
        var E = 0;
        var C = D.length;
        if (C == 0) {
            A.call();
            return
        }
        D.each(function() {
            var F = $(this).attr("data-src");
            $(this).attr("src", F);
            $(this).on("load",
            function() {
                E++;
                loadPageTools.curLoadedImgCount++;
                if (loadPageTools.isPreLoading) {
                    var G = (loadPageTools.curLoadedImgCount / loadPageTools.curNeedLoadImgCount) * 260;
                    if (G > 0) {
                        $(".expand").css("width", G + "px")
                    }
                }
                if (E >= C) {
                    A.call()
                }
            });
            $(this).on("error",
            function() {
                $(this).hide();
                E++;
                loadPageTools.curLoadedImgCount++;
                if (loadPageTools.isPreLoading) {
                    var G = (loadPageTools.curLoadedImgCount / loadPageTools.curNeedLoadImgCount) * 260;
                    if (G > 0) {
                        $(".expand").css("width", G + "px")
                    }
                }
                if (E >= C) {
                    A.call()
                }
            })
        })
    },
};