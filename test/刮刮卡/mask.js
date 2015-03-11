$(".popImgShare").on("click",
function(A) {
    $(".share-page").removeClass("f-hide");
    $(".share-page").css("opacity", 1);
    car2.page_stop();
    car2._scrollStop();
    $(".share-page").on("click",
    function(B) {
        $(".market-img").removeClass("show");
        setTimeout(function() {
            $(".share-page").removeClass("show");
            setTimeout(function() {
                $(".share-page").addClass("f-hide")
            },
            100)
        },
        100);
        car2.page_start();
        car2._scrollStart()
    })
});
$(".j-close-img").on("click",
function(A) {
    $(".u-arrow").removeClass("f-hide");
    $(".u-audio").removeClass("f-hide");
    $(document.body).css("height", "100%");
    car2.page_start();
    car2._scrollStop();
    $(".book-bg").addClass("f-hide");
    $(".book-form").addClass("f-hide")
});
$(".mask-circle-1").on("click",
function(E) {
    $(this).hide();
    $(".mask-toolTip").hide();
    var B = "";
    var C = "";
    B = -jQuery(".mask-img-touch").attr("width");
    C = -jQuery(".mask-img-touch").attr("height");
    var D = 0;
    var A = setInterval(function() {
        var G = Math.floor(D / 4);
        var F = Math.floor(D % 4);
        jQuery(".mask-img-touch").css("-webkit-mask-position", (B * F) + "px " + (C * G) + "px");
        D++;
        if (D >= 20) {
            jQuery(".groupPicsCon").show();
            jQuery(".groupPicsConMirror").hide();
            jQuery(".mask-click-top").hide();
            clearInterval(A);
            car2.menban_callback()
        }
    },
    150)
});
var preClickTime = 0;
$(".popTextInfo").on("click",
function(B) {
    car2._scrollStart();
    var A = $(this).attr("popTextInfoIndex");
    $(".showText" + A).addClass("uniShow")
});
$(".showTextWin .showTextContainer").on("click",
function(A) {
    car2._scrollStop();
    $(".showTextWin").removeClass("uniShow")
});
$(".m-page .uniLink").on("click",
function(E) {
    var A = $(this).attr("hrefUrl");
    $(".htmlCon").addClass("uniShow");
    $(".htmlCon").css("z-index", "99999");
    $(".htmlCon").css("background-color", "#FFFFFF");
    $("#htmlFrame").css("display", "block");
    if (A.indexOf("v.youku.com") > -1 && A.indexOf(".html") > -1) {
        var D = A.split("/");
        var C = D.pop();
        var B = C.substring(0, C.indexOf(".html"));
        B = B.replace("id_", "");
        B = B.split("_")[0];
        $("#youkuPlayer").css("display", "block");
        $(".htmlCon").css("background-color", "rgba(0, 0, 0, 0.7)");
        $("#htmlFrame").css("display", "none");
        setTimeout(function() {
            showYoutkuVideo(B)
        },
        1)
    } else {
        $("#youkuPlayer").css("display", "none");
        $(".htmlCon iframe").attr("src", A)
    }
    car2.audio_stop();
    $(".u-arrow").addClass("f-hide");
    car2._audioNode.addClass("f-hide")
});
$(".j-close-htmlFrame").on("click",
function(A) {
    $(".htmlCon").css("z-index", "-1");
    $(".htmlCon").removeClass("uniShow");
    $("#htmlFrame").attr("src", "about:blank");
    $("#youkuPlayer").children().remove();
    $("#youkuPlayer").css("display", "none");
    $(".htmlCon").css("background-color", "#FFFFFF");
    car2.audio_play();
    if (car2._pageNow < car2._pageNum - 1) {
        $(".u-arrow").removeClass("f-hide")
    }
    car2._audioNode.removeClass("f-hide")
});
function showYoutkuVideo(A) {
    showVideo("youkuPlayer", A)
}
var youkuPlayer;
function showVideo(B, A) {
    youkuPlayer = new YKU.Player(B, {
        client_id: "698d1ef24d7c819e",
        vid: A,
        show_related: false,
        autoplay: true
    })
}
var slice = {
    _touchStartValY: 0,
    _touchStartValX: 0,
    _mouseDown: false,
    removeBindEvent: function() {
        $(".sliceCon").off("touchmove mousemove");
        $(".sliceCon").off("touchstart mousedown")
    },
    bindEvent: function() {
        $(".sliceCon").on("touchstart mousedown", slice.toucheSliceStart);
        $(".sliceCon").on("touchmove mousemove", slice.toucheSliceMove)
    },
    toucheSliceMove: function(F) {
        F.preventDefault();
        if (car2._page.eq(car2._pageNow).attr("canTurnPage") == "true") {
            return
        }
        var G = $(this),
        H = parseInt(G.height()),
        E,
        A,
        C,
        B = null,
        D = false;
        if (F.type == "touchmove") {
            A = window.event.touches[0].pageX;
            E = window.event.touches[0].pageY;
            D = true
        } else {
            if (slice._mouseDown) {
                E = F.pageY || F.y;
                A = F.pageX || F.x;
                D = true
            } else {
                return
            }
        }
        if (Math.abs(slice._touchStartValY - E) < 100 && Math.abs(slice._touchStartValX - A) < 100) {
            return
        }
        slice.startShowEffect($(this))
    },
    toucheSliceStart: function(A) {
        A.preventDefault();
        if (slice._mouseDown) {
            return
        }
        if (A.type == "touchstart") {
            slice._touchStartValY = window.event.touches[0].pageY;
            slice._touchStartValX = window.event.touches[0].pageX
        } else {
            slice._touchStartValY = A.pageY || A.y;
            slice._touchStartValX = A.pageX || A.x;
            slice._mouseDown = true
        }
    },
    startShowEffect: function(A) {
        A.find(".sl-content-slice").each(function() {
            var B = $(this).attr("data-dir");
            var C = $(this).attr("data-distance");
            $(this)[0].style[car2._prefixStyle("transform")] = "translate" + B + "(" + C + "%) rotate(0deg) scale(1)"
        });
        setTimeout(function() {
            car2._page.eq(car2._pageNow).attr("canTurnPage", "true");
            car2.menban_callback();
            $(".sliceCon").remove()
        },
        2000);
        slice.removeBindEvent()
    }
};
slice.bindEvent();