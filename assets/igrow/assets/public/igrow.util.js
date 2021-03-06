(function(){
    var IGrow = window.IGrow || (window.IGrow = {});
    var a,
        // 本地存储 
        MStorage = (function() {
            var _session = window.sessionStorage,
                _local = window.localStorage,
                _get = function(k) {
                    var d = _getData(k);
                    if (d != null) return d.value;
                    return null;
                }, _getData = function(k) {
                    if (k in _session) {
                        return JSON.parse(_session.getItem(k));
                    } else if (k in _local) return JSON.parse(_local.getItem(k));
                    else return null;
                }, _set = function(k, v) {
                    var d = {
                        value: v,
                        ts: (new Date).getTime()
                    };
                    d = JSON.stringify(d);
                    //_session.setItem(k, v);
                    _local.setItem(k, v);
                }, _clear = function() {
                    //_session.clear();
                    _local.clear();
                }, _remove = function(k) {
                    //_session.removeItem(k);
                    _local.removeItem(k);
                }, _removeExpires = function(time) {
                    var now = (new Date).getTime(),
                        data;
                    for (var key in _local) {
                        data = MStorage.getData(key);
                        if (now - data.ts > time) {
                            _local.removeItem(key);
                            //_session.removeItem(key);
                        }
                    }
                }, _setData = function(k,data) {
                    var d;
                    if(typeof data === 'object') {
                        data.ts = (new Date).getTime();
                        d = JSON.stringify(data);
                        _local.setItem(k, d);
                    }
                };
            return {
                set: _set,
                get: _get,
                setData: _setData,
                getData: _getData,
                clear: _clear,
                remove: _remove,
                removeExpires: _removeExpires
            };
        }());
       

   
    function _trim(str) {
        return str.replace(/(^\s+|\s+$)/g, '');
    }

    // _setTimeout(function(a,b){},3000,'a','b')
    function _setTimeout() {
        var func = arguments[0],
            timeout = arguments[1],
            args = Array.prototype.slice.call(arguments, 2);
        return window.setTimeout(function(args) {
            return function() {
                func.apply(null, args);
            }
        }(args), timeout);
    }
    
    /*------------------------------------------*/
    var mLoading = {
        // params:notice timeout callback
        success: function(){
            var notice = '成功了',timeout = 1000,callback,$dom;
            if(arguments.length === 3){
                notice =  arguments[0];
                timeout = arguments[1];
                callback = arguments[2];
            }else if(arguments.length === 2){
                notice =  arguments[0];
                timeout = (typeof arguments[1] == 'number')?arguments[1]:timeout;
                callback = (typeof arguments[1] == 'function')?arguments[1]:null;
            }else if(arguments.length == 1){
                notice = (typeof arguments[0] == 'string')?arguments[0]:notice;
                callback = (typeof arguments[0] == 'function')?arguments[0]:null;
            }
            
            var tmpl = '<div id="mLoading" role="success"><div class="lbk"></div><div class="lcont">' + notice + '</div></div>';
            $('#mLoading').remove();
            $dom = $(tmpl).appendTo($('body'));
            centerElement($('#mLoading'),146,146);
            setTimeout(function(){
                $dom.remove();
                callback && callback();
                
            }, timeout);
        },
        show: function(notice,options){
            var notice = notice || '正在加载...',options = options || {},
                tmpl = '<div id="mLoading"><div class="lbk"></div><div class="lcont">' + notice + '</div></div>';

            if( $('#mLoading').length >0 ) {
                $('#mLoading .lcont').text(notice);
            }else{
                $('body').append(tmpl);
                centerElement($('#mLoading'),146,146);
            }
        },
        hide: function(){
            $('#mLoading').remove();
        }
    };
    //生成modal
    function makeModal(options) {
        var options = options || {},
            zIndex = options.zIndex || 900,
            opacity = options.opacity || 0.5;
            win = getClient(),
            backgroundColor = options.backgroundColor || '#000',
            height = win.h,
            position = options.position || 'fixed',
            id = 'modal_' + new Date().getTime(),
            tmpl = '<div class="m-modal"><a href="javascript:;" style="display:block;"></a></div>';

        $modal = $(tmpl).appendTo($('body'));
        $modal.css({
            left:0,
            top:0,
            position:position,
            width:'100%',
            zIndex: zIndex,
            opacity: opacity,
            backgroundColor:backgroundColor
        }).attr('id',id);

        $modal.find('a').css('height',height);

        return $modal;
    }
    function removeModal($element) {
        if ($element) {
            $element.remove();
        }else {
            $('.m-modal').remove();
        }
    }
    // 获取宽和高
    function getClient(e){
        var w,h;
        if (e) {
            w = e.clientWidth;
            h = e.clientHeight;
        } else {
            w = (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
            h = (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
        }
        return {w:w,h:h};
    }
    function mNotice(message, iconType, timeout){
        if(iconType === 'error') {
            Utils.alert(message);
            return;
        }
        var message = message || '',iconType = iconType || 'info',timeout,ntc,
            tmpl = '<div class="mNotice">' + '<i class="' + iconType + '"></i>' + '<span>'+message+'</span>' + '</div>';
        
        if('success' === iconType) {
            timeout = timeout?timeout:800;
        }else {
            timeout = timeout?timeout:3000;
        }
        ntc = $(tmpl).appendTo($('body'));
        centerElement(ntc);
        setTimeout(function() {
            ntc.remove();
    
        }, timeout);

        return ntc;
    };
    // 元素屏幕居中显示 position:fixed
    function centerElement(el,width,height) {
        var win = getClient(),
            winHeight = win.h,
            winWidth = win.w,
            element = el.jquery?el[0]:el,
            _width = width || element.offsetWidth,
            height =  height || element.offsetHeight,
            scrollTop,
            top,left;
            
        left =  Math.floor( (winWidth-_width)*0.5 );

        if(width){
            element.style.width = width+'px';
        }
        element.style.position = 'fixed';
        element.style.left = left+'px';
        
        top = Math.floor( (winHeight-height)*0.45 );
        element.style.top = top+'px';
    }
    function removePhotoSuffix(url){
        var index,url = url || '';

        index = url.lastIndexOf('!');
        if(index > -1){
            url = url.substring(0,index);
        }
        return url;
    }
    function addPhotoSuffix(url,suffix){
        var index,url = url || '',suffix = suffix || '';

        if(url){
            url = removePhotoSuffix(url) + suffix;
        }
        return url;
    }
    
    // 格式化日期 formatDate(new Date(1384931712000), 'yyyy-MM-dd hh:mm:ss')
    function formatDate(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            //月份   
            "d+": date.getDate(),
            //日   
            "h+": date.getHours(),
            //小时   
            "m+": date.getMinutes(),
            //分   
            "s+": date.getSeconds(),
            //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3),
            //季度   
            "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    // 获取文件后缀
    function getFileExt(name){
        var name = name || '', ext = '',arr = name.split('.');

        ext = arr[arr.length-1];

        return ext.toLowerCase();
    }
    var videoTypes = ['3gp','mov','mp4','ogg','avi'],
        photoTypes = ['jpg','png','gif','bmp','jpeg'],
        audioTypes = ['mp3','wav'],
        docTypes = ['doc','xls','ppt','docx','xlsx','pptx','pdf'];
    // 为附件分类
    function classifyAttachment(list){
        var list = list || [],
            result = {
                videos:[],
                photos:[],
                audios:[],
                docs:[],
                others:[]
            },
            item,url,ext;

        for (var i = list.length - 1; i >= 0; i--) {
            item = list[i];
            url = item.url || '';
            ext = getFileExt(url);
            if( videoTypes.indexOf(ext)>-1 ){
                result.videos.unshift(item);

            }else if(photoTypes.indexOf(ext)>-1){
                result.photos.unshift(item);

            }else if(audioTypes.indexOf(ext)>-1){
                result.audios.unshift(item);

            }else if(docTypes.indexOf(ext)>-1){
                result.docs.unshift(item);

            }else {
                result.others.unshift(item);
            }
        };

        return result;
    }

    // 预览照片
    /*function previewPhoto(e){
        var $photoItem = $(e.currentTarget),
            $photo = $photoItem.find('img'),
            $list = $photoItem.closest('[data-role="photoList"]'),
            url = $photoItem.attr('data-original') || $photo.attr('data-original') || '',
            ext = getFileExt(url),
            current = url + '!small.240',
            index,
            pics = [];

        if( photoTypes.indexOf(ext) === -1 ){
            return;
        }
        if( $list.length === 0 ){
            url && pics.push(current);
        }else {
            $list.find('[data-role="photoItem"]').each(function( _,item ) {
                var url = $(item).find('img').attr('data-original'),ext = getFileExt(url),thumb = url + '!small.320';

                (photoTypes.indexOf(ext) > -1) && pics.push(thumb);
            });
        }
            
        console.log(current,pics);
        if(window.WeixinJSBridge) {
            seajs.use(['WeixinApi'],function(){
                WeixinApi.imagePreview( current ,pics );
            });
            
        }else {

            index = $photoItem.index();
            seajs.use(['imageview'],function(imageview){
                imageview.init(pics, index);
            });
        }
        
    
    }
    function bindPreviewPhoto(options){
        var opts = options || {},
            wrapper = opts.wrapper || 'body',
            item = opts.item || '[data-role="photoItem"]';

        $(wrapper).off('click', item, previewPhoto);
        $(wrapper).on('click', item, previewPhoto);
    }*/

    // 获取站点根目录
    function getRootPath() {
        var strFullPath = window.document.location.href;
        var strPath = window.document.location.pathname;
        var pos = strFullPath.indexOf(strPath);
        var prePath = strFullPath.substring(0, pos);
        var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
        return (prePath + postPath);
    }
    //获取图片宽 和 高
    function imgReady(url, success, error) {
        var width, height, intervalId, check, div,
            img = new Image(),
            body = document.body;
            
        img.src = url;
        
        // 从缓存中读取
        if (img.complete) {
            return success(img.width, img.height);
        }
        // 通过占位提前获取图片头部数据
        if (body) {
            div = document.createElement('div');
            div.style.cssText = 'position:absolute;left:-99999px;top:0;';
            div.appendChild(img);
            body.appendChild(div);
            width = img.offsetWidth;
            height = img.offsetHeight;
           
            check = function () {
               
                if (img.offsetWidth !== width || img.offsetHeight !== height) {
                    
                    clearInterval(intervalId);
                    success(img.offsetWidth, img.clientHeight);
                    img.onload = null;
                    div.innerHTML = '';
                    div.parentNode.removeChild(div);
                };

            };
            
            intervalId = setInterval(check, 150);
        }
        
        // 加载完毕后方式获取
        img.onload = function () {
            if(img.complete){
                success(img.width, img.height);
                img.onload = img.onerror = null;
                clearInterval(intervalId);
                body && img.parentNode &&img.parentNode.removeChild(img);
            }
                
        };
        
        // 图片加载错误
        img.onerror = function () {
            error && error();
            clearInterval(intervalId);
            body && img.parentNode && img.parentNode.removeChild(img);
        };
        
    }
    // getQuery() return {} ,getQuery(key) return string or null
    function getQuery(key) {
        
        var search = window.location.search;
      
        if (search.indexOf('?') != -1) {
            var params = search.substr(1).split('&');
            var query = {};
            var q = [];
            var name = '';

            for (i = 0; i < params.length; i++) {
                q = params[i].split('=');
                name = decodeURIComponent(q[0]);

                if (name.substr(-2) == '[]') {
                    if (!query[name]) {
                        query[name] = [];
                    }
                    query[name].push(q[1]);
                } else {
                    query[name] = q[1];
                }

            }
            if (key) {
                if (query[key]) {
                    return query[key];
                }

                return null;
            } else {
                return query;
            }
        }
    }

    
    var mDialogTpl = '<div class="m-dialog" style="">'+
                            '<div class="m-content">'+
                                '<div class="m-txt"></div>'+
                            '</div>'+
                            '<div class="m-footer">'+
                                '<button class="m-btn" data-role="ok"></button>'+
                                '<button class="m-btn" data-role="cancel"></button>'+
                            '</div>'+
                        '</div>';

    var Utils= window['Utils'] = {
        videoTypes:videoTypes,
        photoTypes:photoTypes,
        audioTypes:audioTypes,
        docTypes:docTypes,
        alert:function( message,callback ) {
            var opts = {
                dialogClass:'m-alert-dialog',
                content:message,
                ok:callback,
                okClass:'m-btn-danger m-one-btn',
                btnCancel:false
            };
            Utils.dialog(opts);
        },
        confirm:function( message,callback ) {
            var opts = {
                content:message,
                ok:callback,
                okClass:'m-btn-danger'
            };
            Utils.dialog(opts);
        },
        /*
            @params 
                content
                okText
                cancelText
                okClass
                cancelClass
         */
        dialog:function(options) {
            setTimeout(function(){
                Utils._dialog(options);
            }, 5)
        },
        /*
            <div class="m-modal"></div>
            <div class="m-dialog" style="left:100px;top:100px;">
                <div class="m-content">
                    <div class="m-txt">内容啊</div>
                </div>
                <div class="m-footer">
                    <button class="m-btn m-btn-success">确认</button>
                    <button class="m-btn">取消</button>
                </div>
            </div>

         */
        _dialog:function(options) {
            var opts = options || {},
                timeStamp = new Date().valueOf(),
                dialogClass = opts.dialogClass || '',
                autoClose = opts.autoClose || false,
                dId = opts.id || 'm_dialog_' + timeStamp,
                maskId = 'm_modal_' + timeStamp,
                modal = (opts.modal === false )?false:true,
                btnOk = (opts.btnOk === false )?false:true,
                btnCancel = (opts.btnCancel === false )?false:true,
                okText = opts.okText || '确认',
                cancelText = opts.cancelText || '取消',
                okClass = opts.okClass || 'm-btn-success',
                cancelClass = opts.cancelClass || '',
                content = opts.content || '',
                $body = $('body'),
                $dialog,$ok,$cancel;

            $('.m-dialog-modal, .m-dialog').remove();
            
            if(modal) {
                $('<div class="m-modal m-dialog-modal" id="'+maskId+'"></div>').appendTo($body);
            }
            $dialog = $(mDialogTpl).appendTo($body);
            $dialog.addClass(dialogClass).attr('id',dId);
            $dialog.find('.m-txt').html(content);
            $ok = $dialog.find('[data-role="ok"]');
            $cancel = $dialog.find('[data-role="cancel"]');

            if(btnOk) {
                $ok.text(okText);
                okClass && $ok.addClass(okClass);
                $ok.bind('click',function(){
                    opts.ok && opts.ok();
                    $('.m-dialog-modal, .m-dialog').remove();
                });
            }else{
                $ok.remove();
            }

            if(btnCancel){
                $cancel.text(cancelText);
                cancelClass && $cancel.addClass(cancelClass);
                $cancel.bind('click',function(){
                    opts.cancel && opts.cancel();
                    $('.m-dialog-modal, .m-dialog').remove();
                });
            }else {
                $cancel.remove();
            }

            if(!btnOk && !btnCancel){
                $dialog.find('.m-footer').remove();
            }

            var clientWidth = jQuery(window).width();
            var clientHeight = jQuery(window).height();
            var dialogLeft =  (clientWidth - $dialog.outerWidth()) / 2;
            var dialogTop =  (clientHeight - $dialog.height()) * 0.382;
            // position left
            dialogLeft = opts.left || dialogLeft;
            // position top
            dialogTop = opts.top || dialogTop;

            $dialog.css({ "top": dialogTop + "px", "left": dialogLeft + "px" });

            // 自动关闭弹窗
            if (autoClose) {
                
                autoClose = autoClose > 1 ? autoClose : 1000;
                setTimeout(function() {
                    jQuery('#' + dId).fadeOut('slow', function() {
                        jQuery('#' + maskId).hide();
                        jQuery('#' + maskId).remove();
                        jQuery('#' + dId).hide();
                        jQuery('#' + dId).remove();
                        // close callback
                        if (typeof opts.closeCallback == 'function') {
                            opts.closeCallback();
                        }
                    });
                }, autoClose);
            }



        },
        getNoRepeat:function(list,key){
            var list = list || [],ret = [], map = {},item, key = key || 'id';

            for (var i = 0; i < list.length; i++) {
                item = list[i];
                
                if(!map[item[key]]) {
                    ret.push(item);
                    map[item[key]] = true;
                }
                
            };
            //console.log(map,ret)
            return ret;

        },
        removeItem: function(list,target,param) {
            var list = list || [], target = target || {},param = param || 'id',item,index = -1;

            for(var i = 0; i < list.length; i++){
                item = list[i];
                if(target[param] == item[param]) {
                    index = i;
                    break;
                }
            };

            if(index!==-1) {
                list.splice(index,1);
            }

        },
        getItem: function(list,params) {
            var list = list || [], param,item,refer = [],ret = [];

            if(typeof params === 'object'){
                for(var key in params) {
                    refer.push(params[key]);
                };
                refer = refer.join('');

                for(var i = 0; i < list.length; i++){
                    item = list[i];
                    ret = [];
                    for(var key in params) {
                        ret.push(item[key]);
                    };
                    ret = ret.join('');
                    if(ret === refer) {
                        return item;
                    }
                };

                return null;
            }else {
                return null;
            }
        },
        strlen: function(str) {
            return (/msie/.test(navigator.userAgent.toLowerCase()) && str.indexOf('\n') !== -1) ? str.replace(/\r?\n/g, '_').length : str.length;
        },
        mb_strlen: function(str) {
            var len = 0;
            for(var i = 0; i < str.length; i++) {
                len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? ( 'utf-8' === 'utf-8' ? 3 : 2) : 1;
            }
            return len;
        },
        mb_cutstr: function(str, maxlen, dot) {
            var len = 0;
            var ret = '';
            var dot = !dot && dot !== '' ? '...' : dot;
            maxlen = maxlen - dot.length;
            for(var i = 0; i < str.length; i++) {
                len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? ('utf-8' === 'utf-8' ? 1 : 1) : 1;
                if(len > maxlen) {
                    ret += dot;
                    break;
                }
                ret += str.substr(i, 1);
            }
            return ret;
        },
        strLenCalc: function(obj, showId, maxlen) {
            var v = obj.value, maxlen = !maxlen ? 200 : maxlen, curlen = maxlen, len = Utils.strlen(v);
            
            for(var i = 0; i < v.length; i++) {
                curlen -= 1;
                /*if(v.charCodeAt(i) < 0 || v.charCodeAt(i) > 127) {
                    curlen -= 2;
                } else {
                    curlen -= 1;
                }*/
            }
            jQuery('#' + showId).html(Math.floor(curlen));
        },
        strLenCalc2: function(obj, showId, maxlen) {
            var v = obj.value, maxlen = !maxlen ? 200 : maxlen, curlen = maxlen, len = Utils.strlen(v);
            
            for(var i = 0; i < v.length; i++) {
                if(v.charCodeAt(i) < 0 || v.charCodeAt(i) > 127) {
                    curlen -= 2;
                } else {
                    curlen -= 1;
                }
            }
            jQuery('#' + showId).html(Math.floor(curlen / 2));
        },
        timerId: false,
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
                window.clearInterval(Utils.timerId);
                touch = event.touches[0];
                endX = touch.pageX;
                endY = touch.pageY;
                if ( scrollTop <= 0 && (startY - endY) <= 0 && jQuery.os.ios) {
                    event.preventDefault();
                }
//                if (Math.abs(endX - startX) > 10 && Math.abs(endY - startY) < 25) {
//                        event.preventDefault();
//                }
                
                if (typeof opts.move == 'function') {
                    var offset = {x:startX - endX, y:startY - endY};
                    opts.move(event, offset);
                }
                if (!jQuery.os.ios) {
                    Utils.timerId = window.setTimeout(function() {
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
            if (jQuery.os.ios) {
                obj.addEventListener('touchend', touchEnd, false);
            }
        },
        // 返回发布时间
        formatNewsTime: function(timeStamp){
            var now = new Date().valueOf();
            var result = '';
            var delta = (now - timeStamp)/1000;
            if(delta<60) {
                result = '刚刚';
            }else if(delta<60*60) {
                result = Math.floor( delta/(60) ) + '分钟前';
            }
            else if(delta<24*60*60) {
                result = Math.floor( delta/(60*60) ) + '小时前';
            }else if(delta<30*24*60*60) {
                result = Math.floor( delta/(24*60*60) ) + '天前';
            }
            else if(delta<12*30*24*60*60) {
                result = Math.floor( delta/(30*24*60*60) ) + '个月前';
            }else if(delta>=12*30*24*60*60){
                result = Math.floor( delta/(12*30*24*60*60) ) + '年前';
            }

            return result;
        },
        bindGoTop:function(elm){
            var gotop = function(){
                var scrollTop = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
                if( scrollTop>500 ){
                    elm.show();
                }else {
                    elm.hide();
                }
            };
            $(window).unbind('scroll',gotop);
            $(window).bind('scroll',gotop);
            elm.bind('click',function(){
                $(window).scrollTop(0);
            });
        },
        mLoading:mLoading,
        mNotice:mNotice,
        classifyAttachment:classifyAttachment,
        getFileExt:getFileExt,
        getQuery:getQuery,
        imgReady:imgReady,
        formatDate:formatDate,
        env:_env,
        MCache:MCache,
        MStorage:MStorage,
        MData:MData,
        MURLHash:MURLHash,
        addPhotoSuffix:addPhotoSuffix,
        removePhotoSuffix:removePhotoSuffix

    };

})();
