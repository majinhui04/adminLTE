(function(){
    var timerId = false;
    var ios = (/iphone|ipad/gi).test( navigator.appVersion ) || '';

    var _export = {
        /*
            @param obj --> dom
            @param start --> function , touchStart
            @param move --> function , touchMove
            @param end --> function , touchEnd

         */
        initTouch: function(opts) {
            var obj = opts.obj || document;
            var startX, startY, endX, endY, moveTouch;

            function touchStart(event) {
                var touch = event.touches[0];
                startY = touch.pageY;
                startX = touch.pageX;
                endX = touch.pageX;
                endY = touch.pageY;
                if (typeof opts.start == 'function') {
                    opts.start(event);
                }
            }

            function touchMove(event) {
                var scrollTop = Math.max(document.body.scrollTop,document.documentElement.scrollTop);

                window.clearInterval(timerId);
                touch = event.touches[0];
                endX = touch.pageX;
                endY = touch.pageY;
                if ( scrollTop <= 0 && (startY - endY) <= 0 && ios) {
                    event.preventDefault();
                }
//                if (Math.abs(endX - startX) > 10 && Math.abs(endY - startY) < 25) {
//                        event.preventDefault();
//                }
                
                if (typeof opts.move == 'function') {
                    var offset = {x:startX - endX, y:startY - endY};
                    opts.move(event, offset);
                }
                if (ios) {
                    timerId = window.setTimeout(function() {
                        touchEnd();
                    }, 50);
                }
            }
            function touchEnd(event) {

                if (typeof opts.end == 'function') {
                    var offset = {x:startX - endX, y:startY - endY};
                    opts.end(event, offset);
                }
            }

            obj.addEventListener('touchstart', touchStart, false);
            obj.addEventListener('touchmove', touchMove, false);
            if (ios) {
                obj.addEventListener('touchend', touchEnd, false);
            }
        }
    };

    var MobileLoadMore = {
        
        link: function (scope, elm, attr,dragCallback,pullCallback) {
                var level = /Android 4.0/.test(window.navigator.userAgent) ? -10 : -100;
                var obj = $('#view>div')[0];
                var drag = elm.attr('data-drag');
                var pull = elm.attr('data-pull');
                scope.isLoadingNew = true;
                _export.initTouch({
                    obj:obj,
                    end:function(event,offset){
                        document.ontouchmove = function(e){ return true;}
                        scope.page = scope.page || 1;
                        var scrollTop = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
                        var loadingPos = elm;
                        var loadingObjTop = loadingPos.offset().top - scrollTop - window.screen.availHeight;
                        
                        // 向上滑 drag
                        if (offset.y > 10 && loadingObjTop <= 10 && scope.isLoadingNew && !scope.isLoading) {
                            drag && scope[drag] && scope[drag]({page:++scope.page,action:'drag'});
                        }
                        // 向下拉刷新 pull
                        if (offset.y < level && scrollTop <= 0) {
                            scope.page = 1;
                            pull && scope[pull] && scope[pull]({page:1,action:'pull'});
                        }
                        
                    }
                });
            }
    }


})();


        