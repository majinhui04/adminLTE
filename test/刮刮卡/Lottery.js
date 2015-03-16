/*
    F:
    C:
    A:
    D:
    B:
    E:
*/

function Lottery(F, C, A, D, B, E) {
    this.conNode = F;
    this.background = null;
    this.backCtx = null;
    this.mask = null;
    this.maskCtx = null;
    this.lottery = null;
    this.lotteryType = "image";
    this.cover = C || "#000";
    this.coverType = A;
    this.pixlesData = null;
    this.width = D;
    this.height = B;
    this.lastPosition = null;
    this.drawPercentCallback = E;
    this.vail = false
}
Lottery.prototype = {
    createElement: function(D, C) {
        var A = document.createElement(D);
        for (var B in C) {
            A.setAttribute(B, C[B])
        }
        return A
    },
    getTransparentPercent: function(G, C, E) {
        var I = G.getImageData(0, 0, C, E),
        F = I.data,
        H = [];
        for (var A = 0,
        B = F.length; A < B; A += 4) {
            var D = F[A + 3];
            if (D < 128) {
                H.push(A)
            }
        }
        return (H.length / (F.length / 4) * 100).toFixed(2)
    },
    resizeCanvas: function(C, B, A) {
        C.width = B;
        C.height = A;
        C.getContext("2d").clearRect(0, 0, B, A)
    },
    resizeCanvas_w: function(C, B, A) {
        C.width = B;
        C.height = A;
        C.getContext("2d").clearRect(0, 0, B, A);
        if (this.vail) {
            this.drawLottery()
        } else {
            this.drawMask()
        }
    },
    drawPoint: function(B, C, A) {
        this.maskCtx.beginPath();
        this.maskCtx.arc(B, C, 30, 0, Math.PI * 2);
        this.maskCtx.fill();
        this.maskCtx.beginPath();
        this.maskCtx.lineWidth = 80;
        this.maskCtx.lineCap = this.maskCtx.lineJoin = "round";
        if (this.lastPosition) {
            this.maskCtx.moveTo(this.lastPosition[0], this.lastPosition[1])
        }
        this.maskCtx.lineTo(B, C);
        this.maskCtx.stroke();
        this.lastPosition = [B, C];
        this.mask.style.zIndex = (this.mask.style.zIndex == 20) ? 21 : 20
    },
    bindEvent: function() {
        var E = this;
        var C = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        var A = C ? "touchstart": "mousedown";
        var B = C ? "touchmove": "mousemove";
        if (!C) {
            var D = false;
            E.conNode.addEventListener("mouseup",
            function(G) {
                G.preventDefault();
                D = false;
                var F = E.getTransparentPercent(E.maskCtx, E.width, E.height);
                if (F >= 10) {
                    if (typeof(E.drawPercentCallback) == "function") {
                        E.drawPercentCallback()
                    }
                }
            },
            false)
        } else {
            E.conNode.addEventListener("touchmove",
            function(F) {
                if (D) {
                    F.preventDefault()
                }
                if (F.cancelable) {
                    F.preventDefault()
                } else {
                    window.event.returnValue = false
                }
            },
            false);
            E.conNode.addEventListener("touchend",
            function(G) {
                D = false;
                var F = E.getTransparentPercent(E.maskCtx, E.width, E.height);
                if (F >= 10) {
                    if (typeof(E.drawPercentCallback) == "function") {
                        E.drawPercentCallback()
                    }
                }
            },
            false)
        }
        this.mask.addEventListener(A,
        function(H) {
            H.preventDefault();
            D = true;
            var F = (C ? H.touches[0].pageX: H.offsetX || H.pageX);
            var G = (C ? H.touches[0].pageY: H.offsetY || H.pageY);
            E.drawPoint(F, G, D)
        },
        false);
        this.mask.addEventListener(B,
        function(H) {
            H.preventDefault();
            if (!D) {
                return false
            }
            H.preventDefault();
            var F = (C ? H.touches[0].pageX: H.offsetX || H.pageX);
            var G = (C ? H.touches[0].pageY: H.offsetY || H.pageY);
            E.drawPoint(F, G, D)
        },
        false)
    },
    drawLottery: function() {
        if (this.lotteryType == "image") {
            var B = new Image(),
            C = this;
            B.onload = function() {
                this.width = C.width;
                this.height = C.height;
                C.resizeCanvas(C.background, C.width, C.height);
                C.backCtx.drawImage(this, 0, 0, C.width, C.height);
                C.drawMask()
            };
            B.src = this.lottery
        } else {
            if (this.lotteryType == "text") {
                this.width = this.width;
                this.height = this.height;
                this.resizeCanvas(this.background, this.width, this.height);
                this.backCtx.save();
                this.backCtx.fillStyle = "#FFF";
                this.backCtx.fillRect(0, 0, this.width, this.height);
                this.backCtx.restore();
                this.backCtx.save();
                var A = 30;
                this.backCtx.font = "Bold " + A + "px Arial";
                this.backCtx.textAlign = "center";
                this.backCtx.fillStyle = "#F60";
                this.backCtx.fillText(this.lottery, this.width / 2, this.height / 2 + A / 2);
                this.backCtx.restore();
                this.drawMask()
            }
        }
    },
    drawMask: function() {
        if (this.coverType == "color") {
            this.maskCtx.fillStyle = this.cover;
            this.maskCtx.fillRect(0, 0, this.width, this.height);
            this.maskCtx.globalCompositeOperation = "destination-out"
        } else {
            if (this.coverType == "image") {
                var A = new Image(),
                B = this;
                A.onload = function() {
                    B.resizeCanvas(B.mask, B.width, B.height);
                    var D = (/android/i.test(navigator.userAgent.toLowerCase()));
                    B.maskCtx.globalAlpha = 0.98;
                    B.maskCtx.drawImage(this, car2._paddingLeft, car2._paddingTop, this.width - car2._paddingLeft * 2, this.height - car2._paddingTop * 2, 0, 0, B.width, B.height);
                    var C = 50;
                    var E = $("#ca-tips").val();
                    var F = B.maskCtx.createLinearGradient(0, 0, B.width, 0);
                    F.addColorStop("0", "#fff");
                    F.addColorStop("1.0", "#000");
                    B.maskCtx.font = "Bold " + C + "px Arial";
                    B.maskCtx.textAlign = "left";
                    B.maskCtx.fillStyle = F;
                    B.maskCtx.fillText(E, B.width / 2 - B.maskCtx.measureText(E).width / 2, 100);
                    B.maskCtx.globalAlpha = 1;
                    B.maskCtx.globalCompositeOperation = "destination-out"
                };
                A.src = this.cover
            }
        }
    },
    init: function(A, B) {
        if (A) {
            this.lottery = A;
            this.lottery.width = this.width;
            this.lottery.height = this.height;
            this.lotteryType = B || "image";
            this.vail = true
        }
        if (this.vail) {
            this.background = this.background || this.createElement("canvas", {
                style: "position:fixed;left:50%;top:0;width:640px;margin-left:-320px;height:100%;background-color:transparent;"
            })
        }
        this.mask = this.mask || this.createElement("canvas", {
            style: "position:fixed;left:50%;top:0;width:640px;margin-left:-320px;height:100%;background-color:transparent;"
        });
        this.mask.style.zIndex = 20;
        if (!this.conNode.innerHTML.replace(/[\w\W]| /g, "")) {
            if (this.vail) {
                this.conNode.appendChild(this.background)
            }
            this.conNode.appendChild(this.mask);
            this.bindEvent()
        }
        if (this.vail) {
            this.backCtx = this.backCtx || this.background.getContext("2d")
        }
        this.maskCtx = this.maskCtx || this.mask.getContext("2d");
        if (this.vail) {
            this.drawLottery()
        } else {
            this.drawMask()
        }
        var C = this;
        window.addEventListener("resize",
        function() {
            C.width = document.documentElement.clientWidth;
            C.height = document.documentElement.clientHeight;
            C.resizeCanvas_w(C.mask, C.width, C.height)
        },
        false)
    }
};