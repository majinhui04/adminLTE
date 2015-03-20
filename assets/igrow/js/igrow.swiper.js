/* 音乐视频 */
(function(iMobile){
    function Player(el,options ,callback){
        this.el = el;
        this.callback = callback || function(){}
        this.isPlay = false;
        this.init(options);
    }
    Player.prototype = {
        init: function(options){
            var _this = this,
                opts = options || {},
                attr = {loop: true, preload: "auto", src: this.el.attr("data-src")};

            if(opts.loop === false ){
                delete opts['loop'];
                delete attr['loop'];
            }
        
            $.extend(true, attr , opts);
            
            this._audio = new Audio();
           
            $(this._audio).on({
                canplay: function(){
                    console.log('canplay')
                    _this.callback.call(_this, true);
                    
                },
                error: function(e){
                    console.log('error')
                    _this.callback.call(_this, false, e);
                }

            })

            try{
                for (var i in attr){
                    attr.hasOwnProperty(i) && i in this._audio && (this._audio[i] = attr[i]);
                }

                this._audio.load();
    
            }catch(e){
                console.log('exception')
                this.callback.call(_this, false, e);
            }
            
            this.el.parent().on('click', function(){
                _this._play();
            });
        },
        _play: function(){
            var _text = this.el.prev()[0];

        
            if(!this.isPlay){
                this._audio.play();
                this.el.addClass('on');
                this.el.parent().addClass('on');
                $(_text).text('打开');
            }else{
                //alert(1)
                this._audio.pause();
                this.el.removeClass('on');
                this.el.parent().removeClass('on');
                $(_text).text('关闭');
            }
            //console.log('this.isPlay',this.isPlay);
            this.isPlay = !this.isPlay;

            _text.className = 'text';
            setTimeout(function(){
                _text.className = 'text move hide';
            }, 1000);
        },
        play:function(){
            var _text = this.el.prev()[0];

            this.isPlay = true;
            this._audio.play();
            this.el.addClass('on');
            this.el.parent().addClass('on');
            $(_text).text('打开');

            _text.className = 'text';
            setTimeout(function(){
                _text.className = 'text move hide';
            }, 1000);
        },
        pause:function(){
            var _text = this.el.prev()[0];

            this.isPlay = false;
            this._audio.pause();
            this.el.removeClass('on');
            this.el.parent().removeClass('on');
            $(_text).text('关闭');

            _text.className = 'text';
            setTimeout(function(){
                _text.className = 'text move hide';
            }, 1000);
        }

    }

    function Media(el, showCb, closeCb){
        this.el = el;
        this.init(showCb, closeCb);
    }
    Media.prototype = {
        init: function(showCb, closeCb){
            var attr = {controls: "controls", preload: "none", src: $(this.el).data('src')},
                _video = $("<video></video>")[0],
                _videoWrap = $('<div class="video_wrap"><a href="javascript:void(0);" class="video_close"></a></div>').appendTo($('.container')),
                _this = this;

            for (var i in attr){
                attr.hasOwnProperty(i) && i in _video && (_video[i] = attr[i]);
            }

            _videoWrap.append(_video);

            $(this.el).on('click', function(){
                'function' == typeof showCb && showCb();

                $(this).hide();             
                if(/android/i.test(navigator.userAgent)){
                    setTimeout(function() {
                        _videoWrap.addClass('show');
                        setTimeout(function() {
                            "function" == typeof _video.play && _video.play();
                        }, 500);
                    }, 20);
                }else{
                    _videoWrap.addClass('show');
                    _video.play();
                }
                
                return false;
            });
            
            _videoWrap.find('.video_close').on('click', function(){
                _videoWrap.removeClass('show');
                $(_this.el).show();
                'function' == typeof closeCb && closeCb();
            });
        }
    }

    iMobile.Player = Player;
    iMobile.Media = Media;
    
})(window);




$(function(){
    
    var ua = navigator.userAgent.toLowerCase(); 
    var SwiperApp = window.SwiperApp || {};
    var defaults = {
        coverUrl:'',
        loop:false,
        slideActiveClass:'cur',
        
        onTouchMove:function(swiper){
            //console.log(swiper)
        },
        mode:'vertical',
        //pagination: '.pagination',
   
        grabCursor: true,
        swipeCur: 0,
        swipeDir:'vertical', // 'vertical' // horizontal
    };
    var config = $.extend(true,defaults ,SwiperApp.config || {} ); 
    var index = 0;
    function imgLoad(imgs ,successCallback, failCallback ){
        var length = imgs.length
        if(!length) {
            done();
            return;
        }
        var img = new Image();

        img.src = imgs[index];

        if(img.complete){
            img = null;           
            setTimeout(function(){
                onload();
            },10)
            return ;
        }
        img.onload=function(){
            img=null;   
            setTimeout(function(){
                onload();
            },10)
        };
        img.onerror = function(){
            img=null;   
            setTimeout(function(){
                onload();
            },10)
        };    
        function onload(){
            index++;
            console.log('load img index',index);
            var a = Math.floor(100 / length * index);

            SwiperApp.load = a;
            SwiperApp.loading && SwiperApp.loading(a);
            //loadspan.style.width = a+'%';
            //loadtxt.innerHTML = a+'%'             
            //全部加载完毕
            if (index == length) {  
                done();
                       
            }else{
                imgLoad(imgs,successCallback);
            }       
        }

        function done(){
            SwiperApp.load = 100;
            SwiperApp.loading && SwiperApp.loading(100);
            
            SwiperApp.load_done && SwiperApp.load_done(); 
            successCallback && successCallback();
        }
    }




    var Obj = {
       
        init:function(){
            var self = this;
            var imgs = SwiperApp.imgs || [];

            imgLoad(imgs,function(){
                self.bind();
                self.bindSwiper();
            });
            
        },
        bind:function(){
            this.bindMusic();
        },
        bindSwiper:function(){
            $('.swiper-load-container').remove();
            $('body').attr('data-status="done"');
            // 每页绑定滑动
            var mySwiper = window.mySwiper = new Swiper('.swipe',config);
        },
        /* music*/
        bindMusic:function(){
            if(ua.indexOf('iphone')>-1) {
                $(document).one('touchstart',function(){
                    var a = $('#music')[0]; // audio_open

                    a && a.pause();
                    a && a.play();
                });
            }
            $(document).on('click','#btn-audio',function(){
                var a = $('#music')[0]; // audio_open

                var btn = $('#btn-audio');

                if(btn.hasClass('audio_open')) {
                    btn.removeClass('audio_open');
                    a&&a.pause()
                }else {
                    btn.addClass('audio_open');
                    a&&a.play();
                }

            });
        }
    }

    Obj.init();

   

    


   
});
    