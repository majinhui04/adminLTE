/**
 * @filename video.js
 * @description 基于videjs的视频播放插件
 * id or dom, options, callback
 * videojs("example_video_1", { "controls": true, "autoplay": false, "preload": "auto","width":200,"height":100 },function(){});
 *
 * <video id="example_video_1" class="video-js vjs-default-skin"
        controls preload="auto" width="640" height="264"
        poster="http://video-js.zencoder.com/oceans-clip.png"
        data-setup='{"example_option":true}'>
        <source src="http://video-js.zencoder.com/oceans-clip.mp4" type='video/mp4' />
        <source src="http://video-js.zencoder.com/oceans-clip.webm" type='video/webm' />
        <source src="http://video-js.zencoder.com/oceans-clip.ogv" type='video/ogg' />
        <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
    </video>
 **/

define(function(require, exports, module) {
    require('mediaelement.js');
    require('mediaelement.css');

    //videojs.options.flash.swf = "/assets/js/plugins/videojs/4.6.1/video-js.swf";

    

    var videoTpl = '<video id="{id}" class="" controls preload="auto" width="240" height="150"><source src="{source}" /></video>';
    var audioTpl = '<audio id="{id}" src="{source}" controls preload="true" width="240">您的浏览器不支持 audio 标签</audio>';
    var Media = {
        /*
            options
                id:'videoid',
                source:'xxx.mp4',
                place:'显示位置',
                controls:true,
                autoplay:false,
                preload:'auto',
                width:200,
                height:100
    
         */
        video: function(options) {
            var opts = options || {},
                videoOpts = $.extend(true,{},opts),
                id = opts.id || ('video_' + new Date().valueOf() ),
                source = opts.source || '',
                ext = source.split('.')[1],
                type = 'video/' + ext,
                $place = (typeof opts.place === 'string')?$('#'+opts.place):opts.place,
                parentWidth = $place.closest('.m-video-item').width(),
                width ,
                html = videoTpl;

    
                html = html.replace('{id}',id);
                html = html.replace('{source}',source);
                //html = html.replace('{type}',type);
                $place.html(html);

                delete videoOpts['id'];
                delete videoOpts['source'];
                delete videoOpts['place'];

                
               
                setTimeout(function(){
                    $('#' + id).mediaelementplayer({
                    });

                }, 1);

        },
        audio: function(options) {
            var opts = options || {},
                audioOpts = $.extend(true,{},opts),
                id = opts.id || ('audio_' + new Date().valueOf() ),
                source = opts.source || '',
                ext = source.split('.')[1],
                type = 'audio/' + ext,
                $place = (typeof opts.place === 'string')?$('#'+opts.place):opts.place,
                parentWidth = $place.closest('.m-audio-item').width(),
                width,
                html = audioTpl;

    
                html = html.replace('{id}',id);
                html = html.replace('{source}',source);
                //html = html.replace('{type}',type);
                $place.html(html);

                
                setTimeout(function(){
                    $('#' + id).mediaelementplayer({
                        
                    });

                }, 1);


        }
    };

    var bindShowMedia = function(e){
        var $poster = $(e.currentTarget);
        var $parent = $poster.closest('.m-media-player');
        var $show = $parent.find('[data-role="show"]');
        var $play = $parent.find('[data-role="play"]');
        var type = $parent.attr('data-type');
        var source = $parent.attr('data-source');

        if('video' === type) {
            $poster.hide();
            $show.show();
            Media.video({type:type,source:source,place:$play});
        }else if('audio' === type) {
            $poster.hide();
            $show.show();
            Media.audio({type:type,source:source,place:$play});
        }
        
    };
    var bindHideMedia = function(e){
        var $remove = $(e.currentTarget);
        var $parent = $remove.closest('.m-media-player');
        var $poster = $parent.find('[data-role="poster"]');
        var $show = $parent.find('[data-role="show"]');
        var $play = $parent.find('[data-role="play"]');

        $poster.show();
        $show.hide();
        $play.html('');
    }
    $('body').off('click','.m-media-player [data-role="poster"]',bindShowMedia);
    $('body').on('click','.m-media-player [data-role="poster"]',bindShowMedia);
    $('body').off('click','.m-media-player [data-role="remove"]',bindHideMedia);
    $('body').on('click','.m-media-player [data-role="remove"]',bindHideMedia);

    module.exports = Media;
});

