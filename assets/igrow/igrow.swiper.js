

$(function(){
    
    var ua = navigator.userAgent.toLowerCase(); 
    var SwiperApp = window.SwiperApp || {};
    var defaults = {
        direction: 'vertical',
        grabCursor: true
    };
    

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

            $(document).on('click','.please-share-container a',function(){
                //console.log($('.please-share-container').size())
                $('.please-share-container').hide();
            });
            
        },
        bind:function(){
            this.bindMusic();
        },
        bindSwiper:function(){
            $('.swiper-load-container').fadeOut('400',function(){
                $('.swiper-load-container').remove();
            });



            $('body').attr('data-status','done');
            // 每页绑定滑动
            var config = $.extend({},defaults ,SwiperApp.config  );
            console.log('swiper config',config)
            
            //var mySwiper = window.mySwiper = SwiperApp.mySwiper = new Swiper('#swipe',config);
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
    