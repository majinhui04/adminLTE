/*


*/

(function(){
    var $ = window.jQuery || window.Zepto || { fn:{} };

    var arr = [];

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var support = {};

    // Use a stripped-down indexOf if we can't use a native one
    var indexOf = arr.indexOf || function( elem ) {
        var i = 0,
            len = this.length;
        for ( ; i < len; i++ ) {
            if ( this[i] === elem ) {
                return i;
            }
        }
        return -1;
    };
    // 缓存器
    var Cache = (function() {
        var a = {};
            return {
                set: function(b, c) {
                    a[b] = c
                },
                get: function(b) {
                    return a[b]
                },
                clear: function() {
                    a = {}
                },
                remove: function(b) {
                    delete a[b]
                }
            }
    } ());
    // region 浏览器检测
    var ua = function ( ua, appVersion, platform ) {
        return {
            // win系列
            win32 : platform === "Win32",
            ie : /MSIE ([^;]+)/.test( ua ),
            ieMobile : window.navigator.msPointerEnabled,
            ieVersion : Math.floor( (/MSIE ([^;]+)/.exec( ua ) || [0, "0"])[1] ),

            // ios系列
            ios : (/iphone|ipad/gi).test( appVersion ),
            iphone : (/iphone/gi).test( appVersion ),
            ipad : (/ipad/gi).test( appVersion ),
            iosVersion : parseFloat( ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec( ua ) || [0, ''])[1])
                .replace( 'undefined', '3_2' ).replace( '_', '.' ).replace( '_', '' ) ) || false,
            safari : /Version\//gi.test( appVersion ) && /Safari/gi.test( appVersion ),
            uiWebView : /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test( ua ),

            // 安卓系列
            android : (/android/gi).test( appVersion ),
            androidVersion : parseFloat( "" + (/android ([0-9\.]*)/i.exec( ua ) || [0, ''])[1] ),

            // chrome
            chrome : /Chrome/gi.test( ua ),
            chromeVersion : parseInt( ( /Chrome\/([0-9]*)/gi.exec( ua ) || [0, 0] )[1], 10 ),

            // 内核
            webkit : /AppleWebKit/.test( appVersion ),

            // 其他浏览器
            uc : appVersion.indexOf( "UCBrowser" ) !== -1,
            Browser : / Browser/gi.test( appVersion ),
            MiuiBrowser : /MiuiBrowser/gi.test( appVersion ),

            // 微信
            MicroMessenger : ua.toLowerCase().match( /MicroMessenger/i ) == "micromessenger",

            // 其他
            canTouch : "ontouchstart" in document
        };
    }( navigator.userAgent, navigator.appVersion, navigator.platform );
    /*
        模板控制器
    */
    var iTemplate = (function(){
        var template = function(){};
        template.prototype = {
            // 针对数组数据 iTemplate.makeList('<p a="{a}">{b}</p>', [{a:1,b:2},{a:22,b:33}] ) return '<p a="1">2</p><p a="22">33</p>'
            makeList: function(tpl, arr, fn){
                var res = [], $10 = [], reg = /{(.+?)}/g, json2 = {}, index = 0;
                for(var el = 0;el<arr.length;el++){
                    if(typeof fn === "function"){
                        json2 = fn.call(this, el, arr[el], index++)||{};
                    }
                    res.push(
                         tpl.replace(reg, function($1, $2){
                            return ($2 in json2)? json2[$2]: (undefined === arr[el][$2]? '':arr[el][$2]);
                        })
                    );
                }
                return res.join('');
            },
            // 针对单个数据 iTemplate.substitute('<p a="{a}">{b}</p>',{a:1,b:2}) return '<p a="1">2</p>'
            substitute: function(tpl, obj){
                if (!(Object.prototype.toString.call(tpl) === '[object String]')) {
                    return '';
                }
                if(!(Object.prototype.toString.call(obj) === '[object Object]' && 'isPrototypeOf' in obj)) {
                    return tpl;
                }
                //    /\{([^{}]+)\}/g
                return tpl.replace(/\{(.*?)\}/igm , function(match, key) {
                    if(typeof obj[key] != 'undefined'){
                        return obj[key];
                    }
                    return '';
                });
            }
        }
        return new template();
    })();


    var IGrow = window.IGrow = {
        version: '1.0.0',
        ua: ua,
        // A global GUID counter for objects
        guid: 1,
        $: $,
 
        mobile: {},
        plugins: {},
        iTemplate: iTemplate,
        Cache:Cache,
        type: function( obj ) {
            if ( obj == null ) {
                return obj + "";
            }
            // Support: Android < 4.0, iOS < 6 (functionish RegExp)
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[ toString.call(obj) ] || "object" :
                typeof obj;
        },
        // 生成随机uuid guid()
        _guid: function(){
            var S4 = function(){
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        },
        // 生成指定范围的随机数 [1,10]
        range: function(Min,Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
        },
        // 类继承
        extendClass: function( subClass, superClass ) {
            var F = function(){};

            F.prototype = superClass.prototype;　　
            subClass.prototype = new F();　　
         
            subClass.superclass = superClass.prototype;
        },
        // 判断闰年
        IsRunYear: function(year) {
            var monarr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            //闰年的话
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
                monarr[1] = "29";
                return true;
            }
            return false;
        },
        // 
        substitute: function(tpl, obj){
            if (!(Object.prototype.toString.call(tpl) === '[object String]')) {
                return '';
            }
            if(!(Object.prototype.toString.call(obj) === '[object Object]' && 'isPrototypeOf' in obj)) {
                return tpl;
            }
            //    /\{([^{}]+)\}/g
            return tpl.replace(/\{(.*?)\}/igm , function(match, key) {
                if(typeof obj[key] != 'undefined'){
                    return obj[key];
                }
                return '';
            });
        },
        // 字符串长度
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
        strLenCalc2: function(elem, showId, maxlen) {
            var v = elem.value, maxlen = !maxlen ? 200 : maxlen, curlen = maxlen, len = IGrow.strlen(v);
            
            for(var i = 0; i < v.length; i++) {
                if(v.charCodeAt(i) < 0 || v.charCodeAt(i) > 127) {
                    curlen -= 2;
                } else {
                    curlen -= 1;
                }
            }
            document.getElementById(showId).innerHTML = Math.floor(curlen / 2);
        },
        // 返回发布时间 new Date().valueOf()
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
        //获取图片宽 和 高
        imgReady: function( url, success, error ) {
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
        },
        // 返回无重复的数组
        getNoRepeat: function(array) {
            var map = {};
            var ret = [];

            for (var i = array.length - 1; i >= 0; i--) {
                var value = array[i];
                map[value] = 1;
            };

            for(var key in map) {
                ret.push(key);
            }

            return ret;
        },
        // 获取url 参数 http://www.baidu.com/q?name=1&age=2 return {name:1,age:2}
        getQuery : function(){
            var search = window.location.search;
            var key = arguments[0];
      
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

        },
        // 格式化日期 formatDate(new Date(1384931712000), 'yyyy-MM-dd hh:mm:ss')
        formatDate: function( date, fmt ) {
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
        },
        // 获取站点根目录
        getRootPath: function() {
            var strFullPath = window.document.location.href;
            var strPath = window.document.location.pathname;
            var pos = strFullPath.indexOf(strPath);
            var prePath = strFullPath.substring(0, pos);
            var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
            return (prePath + postPath);
        },
        // Evaluates a script in a global context
        globalEval: function( code ) {
            var script,
                indirect = eval;

            code = IGrow.trim( code );

            if ( code ) {
                // If the code includes a valid, prologue position
                // strict mode pragma, execute code by injecting a
                // script tag into the document.
                if ( code.indexOf("use strict") === 1 ) {
                    script = document.createElement("script");
                    script.text = code;
                    document.head.appendChild( script ).parentNode.removeChild( script );
                } else {
                // Otherwise, avoid the DOM node creation, insertion
                // and removal by using an indirect global eval
                    indirect( code );
                }
            }
        },
        nodeName: function( elem, name ) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        // results is for internal usage only
        makeArray: function( arr, results ) {
            var ret = results || [];

            if ( arr != null ) {
                if ( isArraylike( Object(arr) ) ) {
                    IGrow.merge( ret,
                        typeof arr === "string" ?
                        [ arr ] : arr
                    );
                } else {
                    push.call( ret, arr );
                }
            }

            return ret;
        },

        inArray: function( elem, arr, i ) {
            return arr == null ? -1 : indexOf.call( arr, elem, i );
        },
        // arg is for internal usage only
        map: function( elems, callback, arg ) {
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike( elems ),
                ret = [];

            // Go through the array, translating each of the items to their new values
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }

            // Go through every key on the object,
            } else {
                for ( i in elems ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply( [], ret );
        },
        merge: function( first, second ) {
            var len = +second.length,
                j = 0,
                i = first.length;

            for ( ; j < len; j++ ) {
                first[ i++ ] = second[ j ];
            }

            first.length = i;

            return first;
        },
        isEmptyObject: function( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
        },
        isArray: function( obj ) {
            return Object.prototype.toString.call(obj) === '[object Array]'; 
        },
        isWindow: function( obj ) {
            return obj != null && obj === obj.window;
        },

        isNumeric: function( obj ) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            return !IGrow.isArray( obj ) && obj - parseFloat( obj ) >= 0;
        },
        // 是否是纯粹的对象 new Object() || {}
        isPlainObject: function( obj ) {
            // Not plain objects:
            // - Any object or value whose internal [[Class]] property is not "[object Object]"
            // - DOM nodes
            // - window
            if ( IGrow.type( obj ) !== "object" || obj.nodeType || IGrow.isWindow( obj ) ) {
                return false;
            }

            if ( obj.constructor &&
                    !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
                return false;
            }

            // If the function hasn't returned already, we're confident that
            // |obj| is a plain object, created by {} or constructed with new Object
            return true;
        },
        isFunction: function( obj ) {
            return IGrow.type(obj) === "function";
        },
        noop: function() {},
        // args is for internal usage only
        each: function( obj, callback, args ) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike( obj );
            
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback.call( obj[ i ], i, obj[ i ] );

                    if ( value === false ) {
                        break;
                    }
                }
            } else {
                for ( i in obj ) {
                    value = callback.call( obj[ i ], i, obj[ i ] );

                    if ( value === false ) {
                        break;
                    }
                }
            }
            

            return obj;
        },
        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function( fn, context ) {
            var tmp, args, proxy;

            // this throws a TypeError, but we will just return undefined.
            if ( !IGrow.isFunction( fn ) ) {
                return undefined;
            }

            // Simulated bind
            args = slice.call( arguments, 2 );
            proxy = function() {
                return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || IGrow.guid++;

            return proxy;
        },
        trim: function(){
            return str.replace(/(^\s+|\s+$)/g, '');
        },

        grep: function( elems, callback, invert ) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for ( ; i < length; i++ ) {
                callbackInverse = !callback( elems[ i ], i );
                if ( callbackInverse !== callbackExpect ) {
                    matches.push( elems[ i ] );
                }
            }

            return matches;
        },
        debounce:debounce,



        /*------ui-------*/

        // 返回元素位置
        getElementPos: function(e) {
            if (e.parentNode === null || e.style.display == "none") return ! 1;
            var t = navigator.userAgent.toLowerCase(),
            n = null,
            r = [],
            i;
            if (e.getBoundingClientRect) {
                var s, o, u, a;
                return i = e.getBoundingClientRect(),
                s = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
                o = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
                u = document.body.clientTop,
                a = document.body.clientLeft,
                {
                    x: i.left + o - a,
                    y: i.top + s - u
                }
            }
            if (document.getBoxObjectFor) {
                i = document.getBoxObjectFor(e);
                var f = e.style.borderLeftWidth ? Math.floor(e.style.borderLeftWidth) : 0,
                l = e.style.borderTopWidth ? Math.floor(e.style.borderTopWidth) : 0;
                r = [i.x - f, i.y - l]
            } else {
                r = [e.offsetLeft, e.offsetTop],
                n = e.offsetParent;
                if (n != e) while (n) r[0] += n.offsetLeft,
                r[1] += n.offsetTop,
                n = n.offsetParent;
                if (t.indexOf("opera") > -1 || t.indexOf("safari") > -1 && e.style.position == "absolute") r[0] -= document.body.offsetLeft,
                r[1] -= document.body.offsetTop
            }
            e.parentNode ? n = e.parentNode: n = null;
            while (n && n.tagName != "BODY" && n.tagName != "HTML") r[0] -= n.scrollLeft,
            r[1] -= n.scrollTop,
            n.parentNode ? n = n.parentNode: n = null;
            return {
                x: r[0],
                y: r[1]
            }
        },
        // 返回元素的宽高
        getClient: function(elem) {
            var w,h;

            if (elem) {
                w = elem.clientWidth;
                h = elem.clientHeight;
            } else {
                w = (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
                h = (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
            }
            return {w:w,h:h};
        },
        // 元数屏幕居中显示 fixed
        centerElement: function(el,width,height,top) {
            var win = IGrow.getClient(),
                winHeight = win.h,
                winWidth = win.w,
                element = el.jquery?el[0]:el,
                _width = width || element.offsetWidth,
                height =  height || element.offsetHeight,
                scrollTop,
                _top,left;
            
            left =  Math.floor( (winWidth-_width)*0.5 );

            if(width){
                element.style.width = width+'px';
            }
            element.style.position = 'fixed';
            element.style.left = left+'px';
            
            if(top) {
                _top = top;
            }else {
                _top = Math.floor( (winHeight-height)*0.45 ) + 'px';
            }
            
            element.style.top = _top;
        }, 
        // 屏幕居中
        rate: function (width, height) {
            var wWidth = window.innerWidth,
                wHeight = window.innerHeight;
            var mid;
            if (width <= wWidth && height <= wHeight) {} else if (width > wWidth && height > wHeight) {
                var rateW = wWidth / width,
                    rateH = wHeight / height;
                if (rateW <= rateH) {
                    mid = width;
                    width = wWidth;
                    height = height * width / mid
                } else {
                    mid = height;
                    height = wHeight;
                    width = width * height / mid
                }
            } else if (width > wWidth) {
                mid = width;
                width = wWidth;
                height = height * wWidth / mid
            } else if (height > wHeight) {
                mid = height;
                height = wHeight;
                width = width * wHeight / mid
            } else {};
            var top = (wHeight - height) / 2,
                left = (wWidth - width) / 2;
            return {
                width: width,
                height: height,
                top: top,
                left: left
            }
        }
    };

    // Populate the class2type map
    IGrow.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });

    // 高频执行事件/方法的防抖 取自 UnderscoreJS 实用框架 
    // 添加resize的回调函数，但是只允许它每300毫秒执行一次  
    /* window.addEventListener('resize', debounce(function(event) {

        console.log('这里写resize过程 ') 

    }, 300));*/ 
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    function isArraylike( obj ) {
        var length = obj.length,
            type = IGrow.type( obj );

        if ( type === "function"  ) {
            return false;
        }

        if ( obj.nodeType === 1 && length ) {
            return true;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }

    IGrow.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !IGrow.isFunction(target) ) {
            target = {};
        }

        // extend  itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }
        

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( IGrow.isPlainObject(copy) || (copyIsArray = IGrow.isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && IGrow.isArray(src) ? src : [];

                        } else {
                            clone = src && IGrow.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = IGrow.extend( deep, clone, copy );

                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    }


    // 本地存储 
    var MStorage = (function() {
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

    IGrow.extend( { MStorage:MStorage } );

})();


/**
 * 绑定事件。
 *
 * `callback`方法在执行时，arguments将会来源于trigger的时候携带的参数。如
 * ```javascript
 * var obj = {};
 *
 * // 使得obj有事件行为
 * Mediator.installTo( obj );
 *
 * obj.on( 'testa', function( arg1, arg2 ) {
 *     console.log( arg1, arg2 ); // => 'arg1', 'arg2'
 * });
 *
 * obj.trigger( 'testa', 'arg1', 'arg2' );
 * ```
 *
 * 如果`callback`中，某一个方法`return false`了，则后续的其他`callback`都不会被执行到。
 * 切会影响到`trigger`方法的返回值，为`false`。
 *
 * `on`还可以用来添加一个特殊事件`all`, 这样所有的事件触发都会响应到。同时此类`callback`中的arguments有一个不同处，
 * 就是第一个参数为`type`，记录当前是什么事件在触发。此类`callback`的优先级比脚低，会再正常`callback`执行完后触发。
 * ```javascript
 * obj.on( 'all', function( type, arg1, arg2 ) {
 *     console.log( type, arg1, arg2 ); // => 'testa', 'arg1', 'arg2'
 * });
 * ```
 *
 * @method on
 * @grammar on( name, callback[, context] ) => self
 * @param  {String}   name     事件名，支持多个事件用空格隔开
 * @param  {Function} callback 事件处理器
 * @param  {Object}   [context]  事件处理器的上下文。
 * @return {self} 返回自身，方便链式
 * @chainable
 * @class Mediator
 */
(function( IGrow , $ ){

    var Mediator = function() {
        var slice = [].slice,
            separator = /\s+/,
            protos;
    
        // 根据条件过滤出事件handlers.
        function findHandlers( arr, name, callback, context ) {
            return IGrow.grep( arr, function( handler ) {
                return handler &&
                        (!name || handler.e === name) &&
                        (!callback || handler.cb === callback ||
                        handler.cb._cb === callback) &&
                        (!context || handler.ctx === context);
            });
        }
    
        function eachEvent( events, callback, iterator ) {
            // 不支持对象，只支持多个event用空格隔开
            IGrow.each( (events || '').split( separator ), function( _, key ) {
                iterator( key, callback );
            });
        }
    
        function triggerHanders( events, args ) {
            var stoped = false,
                i = -1,
                len = events.length,
                handler;
    
            while ( ++i < len ) {
                handler = events[ i ];
    
                if ( handler.cb.apply( handler.ctx2, args ) === false ) {
                    stoped = true;
                    break;
                }
            }
    
            return !stoped;
        }
    
        protos = {
    
            on: function( name, callback, context ) {
                var me = this,
                    set;
    
                if ( !callback ) {
                    return this;
                }
    
                set = this._events || (this._events = []);
    
                eachEvent( name, callback, function( name, callback ) {
                    var handler = { e: name };
    
                    handler.cb = callback;
                    handler.ctx = context;
                    handler.ctx2 = context || me;
                    handler.id = set.length;
    
                    set.push( handler );
                });
    
                return this;
            },
    
            /**
             * 绑定事件，且当handler执行完后，自动解除绑定。
             * @method once
             * @grammar once( name, callback[, context] ) => self
             * @param  {String}   name     事件名
             * @param  {Function} callback 事件处理器
             * @param  {Object}   [context]  事件处理器的上下文。
             * @return {self} 返回自身，方便链式
             * @chainable
             */
            once: function( name, callback, context ) {
                var me = this;
    
                if ( !callback ) {
                    return me;
                }
    
                eachEvent( name, callback, function( name, callback ) {
                    var once = function() {
                            me.off( name, once );
                            return callback.apply( context || me, arguments );
                        };
    
                    once._cb = callback;
                    me.on( name, once, context );
                });
    
                return me;
            },
    
            /**
             * 解除事件绑定
             * @method off
             * @grammar off( [name[, callback[, context] ] ] ) => self
             * @param  {String}   [name]     事件名
             * @param  {Function} [callback] 事件处理器
             * @param  {Object}   [context]  事件处理器的上下文。
             * @return {self} 返回自身，方便链式
             * @chainable
             */
            off: function( name, cb, ctx ) {
                var events = this._events;
    
                if ( !events ) {
                    return this;
                }
    
                if ( !name && !cb && !ctx ) {
                    this._events = [];
                    return this;
                }
    
                eachEvent( name, cb, function( name, cb ) {
                    IGrow.each( findHandlers( events, name, cb, ctx ), function() {
                        delete events[ this.id ];
                    });
                });
    
                return this;
            },
    
            /**
             * 触发事件
             * @method trigger
             * @grammar trigger( name[, args...] ) => self
             * @param  {String}   type     事件名
             * @param  {*} [...] 任意参数
             * @return {Boolean} 如果handler中return false了，则返回false, 否则返回true
             */
            trigger: function( type ) {
                var args, events, allEvents;
    
                if ( !this._events || !type ) {
                    return this;
                }
    
                args = slice.call( arguments, 1 );
                events = findHandlers( this._events, type );
                allEvents = findHandlers( this._events, 'all' );
    
                return triggerHanders( events, args ) &&
                        triggerHanders( allEvents, arguments );
            }
        };
    
        /**
         * 中介者，它本身是个单例，但可以通过[installTo](#WebUploader:Mediator:installTo)方法，使任何对象具备事件行为。
         * 主要目的是负责模块与模块之间的合作，降低耦合度。
         *
         * @class Mediator
         */
        return IGrow.extend({
    
            /**
             * 可以通过这个接口，使任何对象具备事件功能。
             * @method installTo
             * @param  {Object} obj 需要具备事件行为的对象。
             * @return {Object} 返回obj.
             */
            installTo: function( obj ) {
                return IGrow.extend( obj, protos );
            }
    
        }, protos );
    }();

    IGrow.Mediator = Mediator;
    
})( IGrow, IGrow.$ );
/* UI */

// Mobile Loading Dialog
(function( IGrow , $ ){
    var centerElement = IGrow.centerElement;
    var getClient = IGrow.getClient;
    /*------------------------------------------*/
    var Loading = {
        // params:notice timeout callback
        success: function(){
            var notice = '',timeout = 1000,callback,$dom;
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
            
            var tmpl = '<div id="mLoading" role="success"><div class="lbk success"></div><div class="lcont">' + notice + '</div></div>';
            $('#mLoading').remove();
            $dom = $(tmpl).appendTo($('body'));
            centerElement($('#mLoading'),146,146);
            setTimeout(function(){
                $dom.remove();
                callback && callback();
                
            }, timeout);
        },
        show: function(notice,options){
            var notice = notice || '正在加载...', options = options || {},
                tmpl = '<div id="mLoading"><div class="lbk loading"></div><div class="lcont ">' + notice + '</div></div>';

            if( $('#mLoading').length >0 ) {
                $('#mLoading .lbk').removeClass('success').addClass('loading');
                $('#mLoading .lcont').text(notice);
            }else{
                $('body').append(tmpl);
                centerElement($('#mLoading'),146,146);
            }
        },
        hide: function(){
            $('#mLoading').remove();
        },
        error: function() {
            
        }
    };
    
    var tplAlert = '<div class="modal" role="dialog" id="m-alert">'+
                        '<div class="modal-dialog modal-sm">'+
                            '<div class="modal-content">'+
                                '<div class="modal-title">温馨提示</div>'+
                                '<div class="modal-body"></div>'+
                                '<div class="modal-footer">'+
                                    '<a class="m-btn m-btn-danger m-btn-one" data-dismiss="modal" href="javascript:;">确认</a>'+
                                    
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

    var tplConfirm = '<div class="modal" role="dialog" id="m-confirm">'+
                        '<div class="modal-dialog modal-sm">'+
                            '<div class="modal-content">'+
                                '<div class="modal-title">确认框</div>'+
                                '<div class="modal-body"></div>'+
                                '<div class="modal-footer">'+
                                    '<a href="javascript:void(0)" class="btn-confirm-no m-btn " data-dismiss="modal">取消</a>'+
                                    '<a href="javascript:void(0)" class="btn-confirm-yes m-btn m-btn-success" data-dismiss="modal">确定</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';


    /*IGrow.mobile.Dialog.config = {

    };*/
    var Dialog = {
        alert:function(message,callback){
            $('#m-alert').remove();
            $(tplAlert).appendTo($('body'));
            $('#m-alert .modal-body').text(message);

            $('#m-alert .btn-alert').bind('click',function(){
                callback && callback();
            });

            $('#m-alert').modal({
                backdrop:'static',
                keyboard:false
            });
        },
        confirm:function(message,onConfirm,onCancel){
            $('#m-confirm').remove();
            $(tplConfirm).appendTo($('body'));
            $('#m-confirm .modal-body').text(message);

            $('#m-confirm .btn-confirm-yes').bind('click',function(){
                onConfirm && onConfirm();
            });
            $('#m-confirm .btn-confirm-no').bind('click',function(){
                onCancel && onCancel();
            });

            $('#m-confirm').modal({
                backdrop:'static',
                keyboard:false
            });
        }
    };

    IGrow.extend( IGrow.mobile, { loading:Loading }, Dialog );
    IGrow.extend(IGrow, Dialog);
    

})(IGrow,IGrow.$);

/* ========================================================================
 * Bootstrap: tab.js v3.3.2
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  };

  Tab.VERSION = '3.3.2';

  Tab.TRANSITION_DURATION = 150;

  Tab.prototype.show = function () {
    var $this    = this.element;
    var $ul      = $this.closest('ul:not(.dropdown-menu)');
    var selector = $this.data('target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return;

    var $previous = $ul.find('.active:last a');
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    });
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    });

    $previous.trigger(hideEvent);
    $this.trigger(showEvent);

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;

    var $target = $(selector);

    this.activate($this.closest('li'), $ul);
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      });
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  };

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active');
    var transition = callback
      && $.support.transition
      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length);

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false);

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true);

      if (transition) {
        element[0].offsetWidth; // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next();

    $active.removeClass('in')
  };


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data  = $this.data('bs.tab');

      if (!data) $this.data('bs.tab', (data = new Tab(this)));
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab;

  $.fn.tab             = Plugin;
  $.fn.tab.Constructor = Tab;


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this
  };


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault();
    Plugin.call($(this), 'show')
  };

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(IGrow.$);

/* ========================================================================
 * Bootstrap: modal.js v3.3.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.0'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .prependTo(this.$element)
        .on('click.dismiss.bs.modal', $.proxy(function (e) {
          if (e.target !== e.currentTarget) return
          this.options.backdrop == 'static'
            ? this.$element[0].focus.call(this.$element[0])
            : this.hide.call(this)
        }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    if (document.body.clientWidth >= window.innerWidth) return 0
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())
    
    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(IGrow.$);


/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, J�örn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.metadata.js 4187 2007-12-16 17:15:27Z joern.zaefferer $
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are three supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *          
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *   
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *          
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 * 
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 * 
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 * 
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 * 
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

if(!$){
    return;
}

$.extend({
    metadata : {
        defaults : {
            type: 'class',
            name: 'metadata',
            cre: /({.*})/,
            single: 'metadata'
        },
        setType: function( type, name ){
            this.defaults.type = type;
            this.defaults.name = name;
        },
        get: function( elem, opts ){
            var settings = $.extend({},this.defaults,opts);
            // check for empty string in single property
            if ( !settings.single.length ) settings.single = 'metadata';
            
            var data = $.data(elem, settings.single);
            // returned cached data if it already exists
            if ( data ) return data;
            
            data = "{}";
            
            if ( settings.type == "class" ) {
                var m = settings.cre.exec( elem.className );
                if ( m )
                    data = m[1];
            } else if ( settings.type == "elem" ) {
                if( !elem.getElementsByTagName )
                    return undefined;
                var e = elem.getElementsByTagName(settings.name);
                if ( e.length )
                    data = $.trim(e[0].innerHTML);
            } else if ( elem.getAttribute != undefined ) {
                var attr = elem.getAttribute( settings.name );
                if ( attr )
                    data = attr;
            }
            
            if ( data.indexOf( '{' ) <0 )
            data = "{" + data + "}";
            
            data = eval("(" + data + ")");
            
            $.data( elem, settings.single, data );
            return data;
        }
    }
});

/**
 * Returns the metadata object for the first member of the jQuery object.
 *
 * @name metadata
 * @descr Returns element's metadata object
 * @param Object opts An object contianing settings to override the defaults
 * @type jQuery
 * @cat Plugins/Metadata
 */
$.fn.metadata = function( opts ){
    return $.metadata.get( this[0], opts );
};

})(IGrow.$);

(function(IGrow){
    window.uuids = ['808562361c7498ba5b8a73ca556add66','c89a0003f9fac1164c224c26262188b8','09f85502277f19b755a669fbfcea7026','6013f9e5fedbc92a4ed1663f6f9d24a5','2e757e62b5c65cd8239ba532e263334a','75e97270fbf5c7f3232a301f1b062d31','6bce4808c549cbb10dc237c0f49c570a','c39d788fa3bbb9bafc005bc6763fc815','930b3fc25a72cae32ded63ec0e570143','91cd1a29d1dca8673878cdd8f7eebf15','12837cc0e7ae32f980303e745fc3b983','ebe49d0f4749af5347034afacb5250f6'];
    IGrow.hex_md5 = function(){
        /*
         * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
         * Digest Algorithm, as defined in RFC 1321.
         * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
         * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
         * Distributed under the BSD License
         * See http://pajhome.org.uk/crypt/md5 for more info.
         */

        /*
         * Configurable variables. You may need to tweak these to be compatible with
         * the server-side, but the defaults work in most cases.
         */
        var hexcase = 0;
        /* hex output format. 0 - lowercase; 1 - uppercase        */
        var b64pad = "";
        /* base-64 pad character. "=" for strict RFC compliance   */

        /*
         * These are the functions you'll usually want to call
         * They take string arguments and return either hex or base-64 encoded strings
         */
        function hex_md5(s) {
            return rstr2hex(rstr_md5(str2rstr_utf8(s)));
        }
        function b64_md5(s) {
            return rstr2b64(rstr_md5(str2rstr_utf8(s)));
        }
        function any_md5(s, e) {
            return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
        }
        function hex_hmac_md5(k, d) {
            return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
        }
        function b64_hmac_md5(k, d) {
            return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
        }
        function any_hmac_md5(k, d, e) {
            return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
        }

        /*
         * Perform a simple self-test to see if the VM is working
         */
        function md5_vm_test() {
            return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
        }

        /*
         * Calculate the MD5 of a raw string
         */
        function rstr_md5(s) {
            return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
        }

        /*
         * Calculate the HMAC-MD5, of a key and some data (raw strings)
         */
        function rstr_hmac_md5(key, data) {
            var bkey = rstr2binl(key);
            if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

            var ipad = Array(16),
            opad = Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }

            var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
            return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
        }

        /*
         * Convert a raw string to a hex string
         */
        function rstr2hex(input) {
            try {
                hexcase
            } catch(e) {
                hexcase = 0;
            }
            var hex_tab = hexcase ? "0123456789ABCDEF": "0123456789abcdef";
            var output = "";
            var x;
            for (var i = 0; i < input.length; i++) {
                x = input.charCodeAt(i);
                output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
            }
            return output;
        }

        /*
         * Convert a raw string to a base-64 string
         */
        function rstr2b64(input) {
            try {
                b64pad
            } catch(e) {
                b64pad = '';
            }
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var output = "";
            var len = input.length;
            for (var i = 0; i < len; i += 3) {
                var triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > input.length * 8) output += b64pad;
                    else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
                }
            }
            return output;
        }

        /*
         * Convert a raw string to an arbitrary string encoding
         */
        function rstr2any(input, encoding) {
            var divisor = encoding.length;
            var i, j, q, x, quotient;

            /* Convert to an array of 16-bit big-endian values, forming the dividend */
            var dividend = Array(Math.ceil(input.length / 2));
            for (i = 0; i < dividend.length; i++) {
                dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
            }

            /*
           * Repeatedly perform a long division. The binary array forms the dividend,
           * the length of the encoding is the divisor. Once computed, the quotient
           * forms the dividend for the next step. All remainders are stored for later
           * use.
           */
            var full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
            var remainders = Array(full_length);
            for (j = 0; j < full_length; j++) {
                quotient = Array();
                x = 0;
                for (i = 0; i < dividend.length; i++) {
                    x = (x << 16) + dividend[i];
                    q = Math.floor(x / divisor);
                    x -= q * divisor;
                    if (quotient.length > 0 || q > 0) quotient[quotient.length] = q;
                }
                remainders[j] = x;
                dividend = quotient;
            }

            /* Convert the remainders to the output string */
            var output = "";
            for (i = remainders.length - 1; i >= 0; i--) output += encoding.charAt(remainders[i]);

            return output;
        }

        /*
         * Encode a string as utf-8.
         * For efficiency, this assumes the input is valid utf-16.
         */
        function str2rstr_utf8(input) {
            var output = "";
            var i = -1;
            var x, y;

            while (++i < input.length) {
                /* Decode utf-16 surrogate pairs */
                x = input.charCodeAt(i);
                y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                    x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                    i++;
                }

                /* Encode output as utf-8 */
                if (x <= 0x7F) output += String.fromCharCode(x);
                else if (x <= 0x7FF) output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
                else if (x <= 0xFFFF) output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
                else if (x <= 0x1FFFFF) output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            }
            return output;
        }

        /*
         * Encode a string as utf-16
         */
        function str2rstr_utf16le(input) {
            var output = "";
            for (var i = 0; i < input.length; i++) output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
            return output;
        }

        function str2rstr_utf16be(input) {
            var output = "";
            for (var i = 0; i < input.length; i++) output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
            return output;
        }

        /*
         * Convert a raw string to an array of little-endian words
         * Characters >255 have their high-byte silently ignored.
         */
        function rstr2binl(input) {
            var output = Array(input.length >> 2);
            for (var i = 0; i < output.length; i++) output[i] = 0;
            for (var i = 0; i < input.length * 8; i += 8) output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
            return output;
        }

        /*
         * Convert an array of little-endian words to a string
         */
        function binl2rstr(input) {
            var output = "";
            for (var i = 0; i < input.length * 32; i += 8) output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
            return output;
        }

        /*
         * Calculate the MD5 of an array of little-endian words, and a bit length.
         */
        function binl_md5(x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;

            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;

            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;

                a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

                a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

                a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

                a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
            }
            return Array(a, b, c, d);
        }

        /*
         * These functions implement the four basic operations the algorithm uses.
         */
        function md5_cmn(q, a, b, x, s, t) {
            return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
        }
        function md5_ff(a, b, c, d, x, s, t) {
            return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }
        function md5_gg(a, b, c, d, x, s, t) {
            return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }
        function md5_hh(a, b, c, d, x, s, t) {
            return md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }
        function md5_ii(a, b, c, d, x, s, t) {
            return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        function safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        /*
         * Bitwise rotate a 32-bit number to the left.
         */
        function bit_rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }

        return hex_md5;
    }();

})(IGrow);


/* 表单验证 */
(function($){


    $.extend($.fn, {
    // http://jqueryvalidation.org/validate/
    validate: function( options ) {

        // if nothing is selected, return nothing; can't chain anyway
        if ( !this.length ) {
            if ( options && options.debug && window.console ) {
                console.warn( "Nothing selected, can't validate, returning nothing." );
            }
            return;
        }

        // check if a validator for this form was already created
        var validator = $.data( this[ 0 ], "validator" );
        if ( validator ) {
            return validator;
        }

        // Add novalidate tag if HTML5.
        this.attr( "novalidate", "novalidate" );

        validator = new $.validator( options, this[ 0 ] );
        $.data( this[ 0 ], "validator", validator );

        if ( validator.settings.onsubmit ) {

            this.validateDelegate( ":submit", "click", function( event ) {
                if ( validator.settings.submitHandler ) {
                    validator.submitButton = event.target;
                }
                // allow suppressing validation by adding a cancel class to the submit button
                if ( $( event.target ).hasClass( "cancel" ) ) {
                    validator.cancelSubmit = true;
                }

                // allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                if ( $( event.target ).attr( "formnovalidate" ) !== undefined ) {
                    validator.cancelSubmit = true;
                }
            });

            // validate the form on submit
            this.submit( function( event ) {
                if ( validator.settings.debug ) {
                    // prevent form submit to be able to see console output
                    event.preventDefault();
                }
                function handle() {
                    var hidden, result;
                    if ( validator.settings.submitHandler ) {
                        if ( validator.submitButton ) {
                            // insert a hidden input as a replacement for the missing submit button
                            hidden = $( "<input type='hidden'/>" )
                                .attr( "name", validator.submitButton.name )
                                .val( $( validator.submitButton ).val() )
                                .appendTo( validator.currentForm );
                        }
                        result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
                        if ( validator.submitButton ) {
                            // and clean up afterwards; thanks to no-block-scope, hidden can be referenced
                            hidden.remove();
                        }
                        if ( result !== undefined ) {
                            return result;
                        }
                        return false;
                    }
                    return true;
                }

                // prevent submit for invalid forms or custom submit handlers
                if ( validator.cancelSubmit ) {
                    validator.cancelSubmit = false;
                    return handle();
                }
                if ( validator.form() ) {
                    if ( validator.pendingRequest ) {
                        validator.formSubmitted = true;
                        return false;
                    }
                    return handle();
                } else {
                    validator.focusInvalid();
                    return false;
                }
            });
        }

        return validator;
    },
    // http://jqueryvalidation.org/valid/
    valid: function() {
        var valid, validator, errorList;

        if ( $( this[ 0 ] ).is( "form" ) ) {
            valid = this.validate().form();
        } else {
            errorList = [];
            valid = true;
            validator = $( this[ 0 ].form ).validate();
            this.each( function() {
                valid = validator.element( this ) && valid;
                errorList = errorList.concat( validator.errorList );
            });
            validator.errorList = errorList;
        }
        return valid;
    },
    // attributes: space separated list of attributes to retrieve and remove
    removeAttrs: function( attributes ) {
        var result = {},
            $element = this;
        $.each( attributes.split( /\s/ ), function( index, value ) {
            result[ value ] = $element.attr( value );
            $element.removeAttr( value );
        });
        return result;
    },
    // http://jqueryvalidation.org/rules/
    rules: function( command, argument ) {
        var element = this[ 0 ],
            settings, staticRules, existingRules, data, param, filtered;

        if ( command ) {
            settings = $.data( element.form, "validator" ).settings;
            staticRules = settings.rules;
            existingRules = $.validator.staticRules( element );
            switch ( command ) {
            case "add":
                $.extend( existingRules, $.validator.normalizeRule( argument ) );
                // remove messages from rules, but allow them to be set separately
                delete existingRules.messages;
                staticRules[ element.name ] = existingRules;
                if ( argument.messages ) {
                    settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
                }
                break;
            case "remove":
                if ( !argument ) {
                    delete staticRules[ element.name ];
                    return existingRules;
                }
                filtered = {};
                $.each( argument.split( /\s/ ), function( index, method ) {
                    filtered[ method ] = existingRules[ method ];
                    delete existingRules[ method ];
                    if ( method === "required" ) {
                        $( element ).removeAttr( "aria-required" );
                    }
                });
                return filtered;
            }
        }

        data = $.validator.normalizeRules(
        $.extend(
            {},
            $.validator.classRules( element ),
            $.validator.attributeRules( element ),
            $.validator.dataRules( element ),
            $.validator.staticRules( element )
        ), element );

        // make sure required is at front
        if ( data.required ) {
            param = data.required;
            delete data.required;
            data = $.extend( { required: param }, data );
            $( element ).attr( "aria-required", "true" );
        }

        // make sure remote is at back
        if ( data.remote ) {
            param = data.remote;
            delete data.remote;
            data = $.extend( data, { remote: param });
        }

        return data;
    }
});

// Custom selectors
$.extend( $.expr[ ":" ], {
    // http://jqueryvalidation.org/blank-selector/
    blank: function( a ) {
        return !$.trim( "" + $( a ).val() );
    },
    // http://jqueryvalidation.org/filled-selector/
    filled: function( a ) {
        return !!$.trim( "" + $( a ).val() );
    },
    // http://jqueryvalidation.org/unchecked-selector/
    unchecked: function( a ) {
        return !$( a ).prop( "checked" );
    }
});

// constructor for validator
$.validator = function( options, form ) {
    this.settings = $.extend( true, {}, $.validator.defaults, options );
    this.currentForm = form;
    this.init();
};

// http://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
    if ( arguments.length === 1 ) {
        return function() {
            var args = $.makeArray( arguments );
            args.unshift( source );
            return $.validator.format.apply( this, args );
        };
    }
    if ( arguments.length > 2 && params.constructor !== Array  ) {
        params = $.makeArray( arguments ).slice( 1 );
    }
    if ( params.constructor !== Array ) {
        params = [ params ];
    }
    $.each( params, function( i, n ) {
        source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
            return n;
        });
    });
    return source;
};

$.extend( $.validator, {

    defaults: {
        messages: {},
        groups: {},
        rules: {},
        errorClass: "error",
        validClass: "valid",
        errorElement: "label",
        focusCleanup: false,
        focusInvalid: true,
        errorContainer: $( [] ),
        errorLabelContainer: $( [] ),
        onsubmit: true,
        ignore: ":hidden",
        ignoreTitle: false,
        onfocusin: function( element ) {
            this.lastActive = element;

            // Hide error label and remove error class on focus if enabled
            if ( this.settings.focusCleanup ) {
                if ( this.settings.unhighlight ) {
                    this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
                }
                this.hideThese( this.errorsFor( element ) );
            }
        },
        onfocusout: function( element ) {
            if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
                this.element( element );
            }
        },
        onkeyup: function( element, event ) {
            // Avoid revalidate the field when pressing one of the following keys
            // Shift       => 16
            // Ctrl        => 17
            // Alt         => 18
            // Caps lock   => 20
            // End         => 35
            // Home        => 36
            // Left arrow  => 37
            // Up arrow    => 38
            // Right arrow => 39
            // Down arrow  => 40
            // Insert      => 45
            // Num lock    => 144
            // AltGr key   => 225
            var excludedKeys = [
                16, 17, 18, 20, 35, 36, 37,
                38, 39, 40, 45, 144, 225
            ];

            if ( event.which === 9 && this.elementValue( element ) === "" || excludedKeys.indexOf( event.keyCode ) !== -1 ) {
                return;
            } else if ( element.name in this.submitted || element === this.lastElement ) {
                this.element( element );
            }
        },
        onclick: function( element ) {
            // click on selects, radiobuttons and checkboxes
            if ( element.name in this.submitted ) {
                this.element( element );

            // or option elements, check parent select in that case
            } else if ( element.parentNode.name in this.submitted ) {
                this.element( element.parentNode );
            }
        },
        highlight: function( element, errorClass, validClass ) {
            if ( element.type === "radio" ) {
                this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
            } else {
                $( element ).addClass( errorClass ).removeClass( validClass );
            }
        },
        unhighlight: function( element, errorClass, validClass ) {
            if ( element.type === "radio" ) {
                this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
            } else {
                $( element ).removeClass( errorClass ).addClass( validClass );
            }
        }
    },

    // http://jqueryvalidation.org/jQuery.validator.setDefaults/
    setDefaults: function( settings ) {
        $.extend( $.validator.defaults, settings );
    },

    messages: {
        cellphone:'手机号码格式不正确',
        required: "此选项必填",
        //required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date ( ISO ).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        maxlength: $.validator.format( "Please enter no more than {0} characters." ),
        minlength: $.validator.format( "Please enter at least {0} characters." ),
        rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
        range: $.validator.format( "Please enter a value between {0} and {1}." ),
        max: $.validator.format( "Please enter a value less than or equal to {0}." ),
        min: $.validator.format( "Please enter a value greater than or equal to {0}." )
    },

    autoCreateRanges: false,

    prototype: {

        init: function() {
            this.labelContainer = $( this.settings.errorLabelContainer );
            this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
            this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
            this.submitted = {};
            this.valueCache = {};
            this.pendingRequest = 0;
            this.pending = {};
            this.invalid = {};
            this.reset();

            var groups = ( this.groups = {} ),
                rules;
            $.each( this.settings.groups, function( key, value ) {
                if ( typeof value === "string" ) {
                    value = value.split( /\s/ );
                }
                $.each( value, function( index, name ) {
                    groups[ name ] = key;
                });
            });
            rules = this.settings.rules;
            $.each( rules, function( key, value ) {
                rules[ key ] = $.validator.normalizeRule( value );
            });

            function delegate( event ) {
                var validator = $.data( this[ 0 ].form, "validator" ),
                    eventType = "on" + event.type.replace( /^validate/, "" ),
                    settings = validator.settings;
                if ( settings[ eventType ] && !this.is( settings.ignore ) ) {
                    settings[ eventType ].call( validator, this[ 0 ], event );
                }
            }
            $( this.currentForm )
                .validateDelegate( ":text, [type='password'], [type='file'], select, textarea, " +
                    "[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
                    "[type='email'], [type='datetime'], [type='date'], [type='month'], " +
                    "[type='week'], [type='time'], [type='datetime-local'], " +
                    "[type='range'], [type='color'], [type='radio'], [type='checkbox']",
                    "focusin focusout keyup", delegate)
                // Support: Chrome, oldIE
                // "select" is provided as event.target when clicking a option
                .validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", delegate);

            if ( this.settings.invalidHandler ) {
                $( this.currentForm ).bind( "invalid-form.validate", this.settings.invalidHandler );
            }

            // Add aria-required to any Static/Data/Class required fields before first validation
            // Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
            $( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
        },

        // http://jqueryvalidation.org/Validator.form/
        form: function() {
            this.checkForm();
            $.extend( this.submitted, this.errorMap );
            this.invalid = $.extend({}, this.errorMap );
            if ( !this.valid() ) {
                $( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
            }
            this.showErrors();
            return this.valid();
        },

        checkForm: function() {
            this.prepareForm();
            for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
                this.check( elements[ i ] );
            }
            return this.valid();
        },

        // http://jqueryvalidation.org/Validator.element/
        element: function( element ) {
            var cleanElement = this.clean( element ),
                checkElement = this.validationTargetFor( cleanElement ),
                result = true;

            this.lastElement = checkElement;

            if ( checkElement === undefined ) {
                delete this.invalid[ cleanElement.name ];
            } else {
                this.prepareElement( checkElement );
                this.currentElements = $( checkElement );

                result = this.check( checkElement ) !== false;
                if ( result ) {
                    delete this.invalid[ checkElement.name ];
                } else {
                    this.invalid[ checkElement.name ] = true;
                }
            }
            // Add aria-invalid status for screen readers
            $( element ).attr( "aria-invalid", !result );

            if ( !this.numberOfInvalids() ) {
                // Hide error containers on last error
                this.toHide = this.toHide.add( this.containers );
            }
            this.showErrors();
            return result;
        },

        // http://jqueryvalidation.org/Validator.showErrors/
        showErrors: function( errors ) {
            if ( errors ) {
                // add items to error list and map
                $.extend( this.errorMap, errors );
                this.errorList = [];
                for ( var name in errors ) {
                    this.errorList.push({
                        message: errors[ name ],
                        element: this.findByName( name )[ 0 ]
                    });
                }
                // remove items from success list
                this.successList = $.grep( this.successList, function( element ) {
                    return !( element.name in errors );
                });
            }
            if ( this.settings.showErrors ) {
                this.settings.showErrors.call( this, this.errorMap, this.errorList );
            } else {
                this.defaultShowErrors();
            }
        },

        // http://jqueryvalidation.org/Validator.resetForm/
        resetForm: function() {
            if ( $.fn.resetForm ) {
                $( this.currentForm ).resetForm();
            }
            this.submitted = {};
            this.lastElement = null;
            this.prepareForm();
            this.hideErrors();
            var i, elements = this.elements()
                .removeData( "previousValue" )
                .removeAttr( "aria-invalid" );

            if ( this.settings.unhighlight ) {
                for ( i = 0; elements[ i ]; i++ ) {
                    this.settings.unhighlight.call( this, elements[ i ],
                        this.settings.errorClass, "" );
                }
            } else {
                elements.removeClass( this.settings.errorClass );
            }
        },

        numberOfInvalids: function() {
            return this.objectLength( this.invalid );
        },

        objectLength: function( obj ) {
            /* jshint unused: false */
            var count = 0,
                i;
            for ( i in obj ) {
                count++;
            }
            return count;
        },

        hideErrors: function() {
            this.hideThese( this.toHide );
        },

        hideThese: function( errors ) {
            errors.not( this.containers ).text( "" );
            this.addWrapper( errors ).hide();
        },

        valid: function() {
            return this.size() === 0;
        },

        size: function() {
            return this.errorList.length;
        },

        focusInvalid: function() {
            if ( this.settings.focusInvalid ) {
                try {
                    $( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [])
                    .filter( ":visible" )
                    .focus()
                    // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                    .trigger( "focusin" );
                } catch ( e ) {
                    // ignore IE throwing errors when focusing hidden elements
                }
            }
        },

        findLastActive: function() {
            var lastActive = this.lastActive;
            return lastActive && $.grep( this.errorList, function( n ) {
                return n.element.name === lastActive.name;
            }).length === 1 && lastActive;
        },

        elements: function() {
            var validator = this,
                rulesCache = {};

            // select all valid inputs inside the form (no submit or reset buttons)
            return $( this.currentForm )
            .find( "input, select, textarea" )
            .not( ":submit, :reset, :image, [disabled]" )
            .not( this.settings.ignore )
            .filter( function() {
                if ( !this.name && validator.settings.debug && window.console ) {
                    console.error( "%o has no name assigned", this );
                }

                // select only the first element for each name, and only those with rules specified
                if ( this.name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
                    return false;
                }

                rulesCache[ this.name ] = true;
                return true;
            });
        },

        clean: function( selector ) {
            return $( selector )[ 0 ];
        },

        errors: function() {
            var errorClass = this.settings.errorClass.split( " " ).join( "." );
            return $( this.settings.errorElement + "." + errorClass, this.errorContext );
        },

        reset: function() {
            this.successList = [];
            this.errorList = [];
            this.errorMap = {};
            this.toShow = $( [] );
            this.toHide = $( [] );
            this.currentElements = $( [] );
        },

        prepareForm: function() {
            this.reset();
            this.toHide = this.errors().add( this.containers );
        },

        prepareElement: function( element ) {
            this.reset();
            this.toHide = this.errorsFor( element );
        },

        elementValue: function( element ) {
            var val,
                $element = $( element ),
                type = element.type;

            if ( type === "radio" || type === "checkbox" ) {
                return this.findByName( element.name ).filter(":checked").val();
            } else if ( type === "number" && typeof element.validity !== "undefined" ) {
                return element.validity.badInput ? false : $element.val();
            }

            val = $element.val();
            if ( typeof val === "string" ) {
                return val.replace(/\r/g, "" );
            }
            return val;
        },

        check: function( element ) {
            element = this.validationTargetFor( this.clean( element ) );

            var rules = $( element ).rules(),
                rulesCount = $.map( rules, function( n, i ) {
                    return i;
                }).length,
                dependencyMismatch = false,
                val = this.elementValue( element ),
                result, method, rule;

            for ( method in rules ) {
                rule = { method: method, parameters: rules[ method ] };
                try {

                    result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

                    // if a method indicates that the field is optional and therefore valid,
                    // don't mark it as valid when there are no other rules
                    if ( result === "dependency-mismatch" && rulesCount === 1 ) {
                        dependencyMismatch = true;
                        continue;
                    }
                    dependencyMismatch = false;

                    if ( result === "pending" ) {
                        this.toHide = this.toHide.not( this.errorsFor( element ) );
                        return;
                    }

                    if ( !result ) {
                        this.formatAndAdd( element, rule );
                        return false;
                    }
                } catch ( e ) {
                    if ( this.settings.debug && window.console ) {
                        console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
                    }
                    if ( e instanceof TypeError ) {
                        e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
                    }

                    throw e;
                }
            }
            if ( dependencyMismatch ) {
                return;
            }
            if ( this.objectLength( rules ) ) {
                this.successList.push( element );
            }
            return true;
        },

        // return the custom message for the given element and validation method
        // specified in the element's HTML5 data attribute
        // return the generic message if present and no method specific message is present
        customDataMessage: function( element, method ) {
            return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
                method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
        },

        // return the custom message for the given element name and validation method
        customMessage: function( name, method ) {
            var m = this.settings.messages[ name ];
            return m && ( m.constructor === String ? m : m[ method ]);
        },

        // return the first defined argument, allowing empty strings
        findDefined: function() {
            for ( var i = 0; i < arguments.length; i++) {
                if ( arguments[ i ] !== undefined ) {
                    return arguments[ i ];
                }
            }
            return undefined;
        },

        defaultMessage: function( element, method ) {
            return this.findDefined(
                this.customMessage( element.name, method ),
                this.customDataMessage( element, method ),
                // title is never undefined, so handle empty string as undefined
                !this.settings.ignoreTitle && element.title || undefined,
                $.validator.messages[ method ],
                "<strong>Warning: No message defined for " + element.name + "</strong>"
            );
        },

        formatAndAdd: function( element, rule ) {
            var message = this.defaultMessage( element, rule.method ),
                theregex = /\$?\{(\d+)\}/g;
            if ( typeof message === "function" ) {
                message = message.call( this, rule.parameters, element );
            } else if ( theregex.test( message ) ) {
                message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
            }
            this.errorList.push({
                message: message,
                element: element,
                method: rule.method
            });

            this.errorMap[ element.name ] = message;
            this.submitted[ element.name ] = message;
        },

        addWrapper: function( toToggle ) {
            if ( this.settings.wrapper ) {
                toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
            }
            return toToggle;
        },

        defaultShowErrors: function() {
            var i, elements, error;
            for ( i = 0; this.errorList[ i ]; i++ ) {
                error = this.errorList[ i ];
                if ( this.settings.highlight ) {
                    this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
                }
                this.showLabel( error.element, error.message );
            }
            if ( this.errorList.length ) {
                this.toShow = this.toShow.add( this.containers );
            }
            if ( this.settings.success ) {
                for ( i = 0; this.successList[ i ]; i++ ) {
                    this.showLabel( this.successList[ i ] );
                }
            }
            if ( this.settings.unhighlight ) {
                for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
                    this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
                }
            }
            this.toHide = this.toHide.not( this.toShow );
            this.hideErrors();
            this.addWrapper( this.toShow ).show();
        },

        validElements: function() {
            return this.currentElements.not( this.invalidElements() );
        },

        invalidElements: function() {
            return $( this.errorList ).map(function() {
                return this.element;
            });
        },

        showLabel: function( element, message ) {
            var place, group, errorID,
                error = this.errorsFor( element ),
                elementID = this.idOrName( element ),
                describedBy = $( element ).attr( "aria-describedby" );
            if ( error.length ) {
                // refresh error/success class
                error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
                // replace message on existing label
                error.html( message );
            } else {
                // create error element
                error = $( "<" + this.settings.errorElement + ">" )
                    .attr( "id", elementID + "-error" )
                    .addClass( this.settings.errorClass )
                    .html( message || "" );

                // Maintain reference to the element to be placed into the DOM
                place = error;
                if ( this.settings.wrapper ) {
                    // make sure the element is visible, even in IE
                    // actually showing the wrapped element is handled elsewhere
                    place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
                }
                if ( this.labelContainer.length ) {
                    this.labelContainer.append( place );
                } else if ( this.settings.errorPlacement ) {
                    this.settings.errorPlacement( place, $( element ) );
                } else {
                    place.insertAfter( element );
                }

                // Link error back to the element
                if ( error.is( "label" ) ) {
                    // If the error is a label, then associate using 'for'
                    error.attr( "for", elementID );
                } else if ( error.parents( "label[for='" + elementID + "']" ).length === 0 ) {
                    // If the element is not a child of an associated label, then it's necessary
                    // to explicitly apply aria-describedby

                    errorID = error.attr( "id" ).replace( /(:|\.|\[|\]|\$)/g, "\\$1");
                    // Respect existing non-error aria-describedby
                    if ( !describedBy ) {
                        describedBy = errorID;
                    } else if ( !describedBy.match( new RegExp( "\\b" + errorID + "\\b" ) ) ) {
                        // Add to end of list if not already present
                        describedBy += " " + errorID;
                    }
                    $( element ).attr( "aria-describedby", describedBy );

                    // If this element is grouped, then assign to all elements in the same group
                    group = this.groups[ element.name ];
                    if ( group ) {
                        $.each( this.groups, function( name, testgroup ) {
                            if ( testgroup === group ) {
                                $( "[name='" + name + "']", this.currentForm )
                                    .attr( "aria-describedby", error.attr( "id" ) );
                            }
                        });
                    }
                }
            }
            if ( !message && this.settings.success ) {
                error.text( "" );
                if ( typeof this.settings.success === "string" ) {
                    error.addClass( this.settings.success );
                } else {
                    this.settings.success( error, element );
                }
            }
            this.toShow = this.toShow.add( error );
        },

        errorsFor: function( element ) {
            var name = this.idOrName( element ),
                describer = $( element ).attr( "aria-describedby" ),
                selector = "label[for='" + name + "'], label[for='" + name + "'] *";

            // aria-describedby should directly reference the error element
            if ( describer ) {
                selector = selector + ", #" + describer.replace( /\s+/g, ", #" );
            }
            return this
                .errors()
                .filter( selector );
        },

        idOrName: function( element ) {
            return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
        },

        validationTargetFor: function( element ) {

            // If radio/checkbox, validate first element in group instead
            if ( this.checkable( element ) ) {
                element = this.findByName( element.name );
            }

            // Always apply ignore filter
            return $( element ).not( this.settings.ignore )[ 0 ];
        },

        checkable: function( element ) {
            return ( /radio|checkbox/i ).test( element.type );
        },

        findByName: function( name ) {
            return $( this.currentForm ).find( "[name='" + name + "']" );
        },

        getLength: function( value, element ) {
            switch ( element.nodeName.toLowerCase() ) {
            case "select":
                return $( "option:selected", element ).length;
            case "input":
                if ( this.checkable( element ) ) {
                    return this.findByName( element.name ).filter( ":checked" ).length;
                }
            }
            return value.length;
        },

        depend: function( param, element ) {
            return this.dependTypes[typeof param] ? this.dependTypes[typeof param]( param, element ) : true;
        },

        dependTypes: {
            "boolean": function( param ) {
                return param;
            },
            "string": function( param, element ) {
                return !!$( param, element.form ).length;
            },
            "function": function( param, element ) {
                return param( element );
            }
        },

        optional: function( element ) {
            var val = this.elementValue( element );
            return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
        },

        startRequest: function( element ) {
            if ( !this.pending[ element.name ] ) {
                this.pendingRequest++;
                this.pending[ element.name ] = true;
            }
        },

        stopRequest: function( element, valid ) {
            this.pendingRequest--;
            // sometimes synchronization fails, make sure pendingRequest is never < 0
            if ( this.pendingRequest < 0 ) {
                this.pendingRequest = 0;
            }
            delete this.pending[ element.name ];
            if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
                $( this.currentForm ).submit();
                this.formSubmitted = false;
            } else if (!valid && this.pendingRequest === 0 && this.formSubmitted ) {
                $( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
                this.formSubmitted = false;
            }
        },

        previousValue: function( element ) {
            return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
                old: null,
                valid: true,
                message: this.defaultMessage( element, "remote" )
            });
        }

    },

    classRuleSettings: {
        //af:{af:true},
        cellphone:{ cellphone:true },
        required: { required: true },
        email: { email: true },
        url: { url: true },
        date: { date: true },
        dateISO: { dateISO: true },
        number: { number: true },
        digits: { digits: true },
        creditcard: { creditcard: true }
    },

    addClassRules: function( className, rules ) {
        if ( className.constructor === String ) {
            this.classRuleSettings[ className ] = rules;
        } else {
            $.extend( this.classRuleSettings, className );
        }
    },

    classRules: function( element ) {
        var rules = {},
            classes = $( element ).attr( "class" );

        //console.log('in classRules')
        if ( classes ) {
            $.each( classes.split( " " ), function() {
                if ( this in $.validator.classRuleSettings ) {
                    $.extend( rules, $.validator.classRuleSettings[ this ]);
                }
            });
        }
        //console.log(element,rules)
        return rules;
    },

    attributeRules: function( element ) {
        var rules = {},
            $element = $( element ),
            type = element.getAttribute( "type" ),
            method, value;

        for ( method in $.validator.methods ) {

            // support for <input required> in both html5 and older browsers
            if ( method === "required" ) {
                value = element.getAttribute( method );
                // Some browsers return an empty string for the required attribute
                // and non-HTML5 browsers might have required="" markup
                if ( value === "" ) {
                    value = true;
                }
                // force non-HTML5 browsers to return bool
                value = !!value;
            } else {
                value = $element.attr( method );
            }

            // convert the value to a number for number inputs, and for text for backwards compability
            // allows type="date" and others to be compared as strings
            if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
                value = Number( value );
            }

            if ( value || value === 0 ) {
                rules[ method ] = value;
            } else if ( type === method && type !== "range" ) {
                // exception: the jquery validate 'range' method
                // does not test for the html5 'range' type
                rules[ method ] = true;
            }
        }

        // maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
        if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
            delete rules.maxlength;
        }

        return rules;
    },

    dataRules: function( element ) {
        var method, value,
            rules = {}, $element = $( element );
        for ( method in $.validator.methods ) {
            value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
            if ( value !== undefined ) {
                rules[ method ] = value;
            }
        }
        return rules;
    },

    staticRules: function( element ) {
        var rules = {},
            validator = $.data( element.form, "validator" );

        if ( validator.settings.rules ) {
            rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
        }
        return rules;
    },

    normalizeRules: function( rules, element ) {
        // handle dependency check
        $.each( rules, function( prop, val ) {
            // ignore rule when param is explicitly false, eg. required:false
            if ( val === false ) {
                delete rules[ prop ];
                return;
            }
            if ( val.param || val.depends ) {
                var keepRule = true;
                switch ( typeof val.depends ) {
                case "string":
                    keepRule = !!$( val.depends, element.form ).length;
                    break;
                case "function":
                    keepRule = val.depends.call( element, element );
                    break;
                }
                if ( keepRule ) {
                    rules[ prop ] = val.param !== undefined ? val.param : true;
                } else {
                    delete rules[ prop ];
                }
            }
        });

        // evaluate parameters
        $.each( rules, function( rule, parameter ) {
            rules[ rule ] = $.isFunction( parameter ) ? parameter( element ) : parameter;
        });

        // clean number parameters
        $.each([ "minlength", "maxlength" ], function() {
            if ( rules[ this ] ) {
                rules[ this ] = Number( rules[ this ] );
            }
        });
        $.each([ "rangelength", "range" ], function() {
            var parts;
            if ( rules[ this ] ) {
                if ( $.isArray( rules[ this ] ) ) {
                    rules[ this ] = [ Number( rules[ this ][ 0 ]), Number( rules[ this ][ 1 ] ) ];
                } else if ( typeof rules[ this ] === "string" ) {
                    parts = rules[ this ].replace(/[\[\]]/g, "" ).split( /[\s,]+/ );
                    rules[ this ] = [ Number( parts[ 0 ]), Number( parts[ 1 ] ) ];
                }
            }
        });

        if ( $.validator.autoCreateRanges ) {
            // auto-create ranges
            if ( rules.min != null && rules.max != null ) {
                rules.range = [ rules.min, rules.max ];
                delete rules.min;
                delete rules.max;
            }
            if ( rules.minlength != null && rules.maxlength != null ) {
                rules.rangelength = [ rules.minlength, rules.maxlength ];
                delete rules.minlength;
                delete rules.maxlength;
            }
        }

        return rules;
    },

    // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
    normalizeRule: function( data ) {
        if ( typeof data === "string" ) {
            var transformed = {};
            $.each( data.split( /\s/ ), function() {
                transformed[ this ] = true;
            });
            data = transformed;
        }
        return data;
    },

    // http://jqueryvalidation.org/jQuery.validator.addMethod/
    addMethod: function( name, method, message ) {
        $.validator.methods[ name ] = method;
        $.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
        if ( method.length < 3 ) {
            $.validator.addClassRules( name, $.validator.normalizeRule( name ) );
        }
    },

    methods: {

        // http://jqueryvalidation.org/required-method/
        required: function( value, element, param ) {
            // check if dependency is met
            if ( !this.depend( param, element ) ) {
                return "dependency-mismatch";
            }
            if ( element.nodeName.toLowerCase() === "select" ) {
                // could be an array for select-multiple or a string, both are fine this way
                var val = $( element ).val();
                return val && val.length > 0;
            }
            if ( this.checkable( element ) ) {
                return this.getLength( value, element ) > 0;
            }
            return $.trim( value ).length > 0;
        },

        // 
        cellphone: function( value, element ) {
             
            return this.optional( element ) || /^1[3|4|5|7|8][0-9]\d{8}$/.test( value );
        },

        // http://jqueryvalidation.org/email-method/
        email: function( value, element ) {
            // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
            // Retrieved 2014-01-14
            // If you have a problem with this implementation, report a bug against the above spec
            // Or use custom methods to implement your own email validation
            return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
        },

        // http://jqueryvalidation.org/url-method/
        url: function( value, element ) {
            // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
            return this.optional( element ) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test( value );
        },

        // http://jqueryvalidation.org/date-method/
        date: function( value, element ) {
            return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
        },

        // http://jqueryvalidation.org/dateISO-method/
        dateISO: function( value, element ) {
            return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
        },

        // http://jqueryvalidation.org/number-method/
        number: function( value, element ) {
            return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
        },

        // http://jqueryvalidation.org/digits-method/
        digits: function( value, element ) {
            return this.optional( element ) || /^\d+$/.test( value );
        },

        // http://jqueryvalidation.org/creditcard-method/
        // based on http://en.wikipedia.org/wiki/Luhn_algorithm
        creditcard: function( value, element ) {
            if ( this.optional( element ) ) {
                return "dependency-mismatch";
            }
            // accept only spaces, digits and dashes
            if ( /[^0-9 \-]+/.test( value ) ) {
                return false;
            }
            var nCheck = 0,
                nDigit = 0,
                bEven = false,
                n, cDigit;

            value = value.replace( /\D/g, "" );

            // Basing min and max length on
            // http://developer.ean.com/general_info/Valid_Credit_Card_Types
            if ( value.length < 13 || value.length > 19 ) {
                return false;
            }

            for ( n = value.length - 1; n >= 0; n--) {
                cDigit = value.charAt( n );
                nDigit = parseInt( cDigit, 10 );
                if ( bEven ) {
                    if ( ( nDigit *= 2 ) > 9 ) {
                        nDigit -= 9;
                    }
                }
                nCheck += nDigit;
                bEven = !bEven;
            }

            return ( nCheck % 10 ) === 0;
        },

        // http://jqueryvalidation.org/minlength-method/
        minlength: function( value, element, param ) {
            var length = $.isArray( value ) ? value.length : this.getLength( value, element );
            return this.optional( element ) || length >= param;
        },

        // http://jqueryvalidation.org/maxlength-method/
        maxlength: function( value, element, param ) {
            var length = $.isArray( value ) ? value.length : this.getLength( value, element );
            return this.optional( element ) || length <= param;
        },

        // http://jqueryvalidation.org/rangelength-method/
        rangelength: function( value, element, param ) {
            var length = $.isArray( value ) ? value.length : this.getLength( value, element );
            return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
        },

        // http://jqueryvalidation.org/min-method/
        min: function( value, element, param ) {
            return this.optional( element ) || value >= param;
        },

        // http://jqueryvalidation.org/max-method/
        max: function( value, element, param ) {
            return this.optional( element ) || value <= param;
        },

        // http://jqueryvalidation.org/range-method/
        range: function( value, element, param ) {
            return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
        },

        // http://jqueryvalidation.org/equalTo-method/
        equalTo: function( value, element, param ) {
            // bind to the blur event of the target in order to revalidate whenever the target field is updated
            // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
            var target = $( param );
            if ( this.settings.onfocusout ) {
                target.unbind( ".validate-equalTo" ).bind( "blur.validate-equalTo", function() {
                    $( element ).valid();
                });
            }
            return value === target.val();
        },

        // http://jqueryvalidation.org/remote-method/
        remote: function( value, element, param ) {
            if ( this.optional( element ) ) {
                return "dependency-mismatch";
            }

            var previous = this.previousValue( element ),
                validator, data;

            if (!this.settings.messages[ element.name ] ) {
                this.settings.messages[ element.name ] = {};
            }
            previous.originalMessage = this.settings.messages[ element.name ].remote;
            this.settings.messages[ element.name ].remote = previous.message;

            param = typeof param === "string" && { url: param } || param;

            if ( previous.old === value ) {
                return previous.valid;
            }

            previous.old = value;
            validator = this;
            this.startRequest( element );
            data = {};
            data[ element.name ] = value;
            $.ajax( $.extend( true, {
                url: param,
                mode: "abort",
                port: "validate" + element.name,
                dataType: "json",
                data: data,
                context: validator.currentForm,
                success: function( response ) {
                    var valid = response === true || response === "true",
                        errors, message, submitted;

                    validator.settings.messages[ element.name ].remote = previous.originalMessage;
                    if ( valid ) {
                        submitted = validator.formSubmitted;
                        validator.prepareElement( element );
                        validator.formSubmitted = submitted;
                        validator.successList.push( element );
                        delete validator.invalid[ element.name ];
                        validator.showErrors();
                    } else {
                        errors = {};
                        message = response || validator.defaultMessage( element, "remote" );
                        errors[ element.name ] = previous.message = $.isFunction( message ) ? message( value ) : message;
                        validator.invalid[ element.name ] = true;
                        validator.showErrors( errors );
                    }
                    previous.valid = valid;
                    validator.stopRequest( element, valid );
                }
            }, param ) );
            return "pending";
        }

    }

});

$.format = function deprecated() {
    throw "$.format has been deprecated. Please use $.validator.format instead.";
};


// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
    ajax;
// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
    $.ajaxPrefilter(function( settings, _, xhr ) {
        var port = settings.port;
        if ( settings.mode === "abort" ) {
            if ( pendingRequests[port] ) {
                pendingRequests[port].abort();
            }
            pendingRequests[port] = xhr;
        }
    });
} else {
    // Proxy ajax
    ajax = $.ajax;
    $.ajax = function( settings ) {
        var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
            port = ( "port" in settings ? settings : $.ajaxSettings ).port;
        if ( mode === "abort" ) {
            if ( pendingRequests[port] ) {
                pendingRequests[port].abort();
            }
            pendingRequests[port] = ajax.apply(this, arguments);
            return pendingRequests[port];
        }
        return ajax.apply(this, arguments);
    };
}


// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target

$.extend($.fn, {
    validateDelegate: function( delegate, type, handler ) {
        return this.bind(type, function( event ) {
            var target = $(event.target);
            if ( target.is(delegate) ) {
                return handler.apply(target, arguments);
            }
        });
    }
});

// 手机号码
/*$.validate.addMethod('cellphone1',function(value, element){
    return this.optional( element ) || /123/.test(value);
},'bbb');*/


})(IGrow.$);


/*
    手机摇一摇
    DeviceMotionHandler.init({
        callback:function(){
            // 摇一摇之后的回调函数
            // DeviceMotionHandler.lock(); 
        }
    })
*/
(function(){

    var SHAKE_THRESHOLD = 800; // 800
    var last_update = 0;
    var x = y = z = last_x = last_y = last_z = 0;

    var DeviceMotionHandler = window['DeviceMotionHandler'] = {
        setShake:function(num){
            SHAKE_THRESHOLD = num;
        },
        isLock:false,
        alert:function(msg){
            alert(msg);
        },
        unlock:function(){
            this.isLock = false;
        },
        lock:function(){
            this.isLock = true;
        },
        handler:function(eventData){
            var acceleration = eventData.accelerationIncludingGravity;
            var curTime = new Date().getTime();
            var self = this;

            // 100毫秒进行一次位置判断，若前后x, y, z间的差值的绝对值和时间比率超过了预设的阈值，则判断设备进行了摇晃操作。
            if ((curTime - last_update) > 100) {
                var diffTime = curTime - last_update;
                last_update = curTime;
                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;
                var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                
                if (speed > SHAKE_THRESHOLD) {
                    self.callback(eventData,x,y,z);
                }
                last_x = x;
                last_y = y;
                last_z = z;
            }
        },
        init:function(options){
            var opts = options || {};
            
            var self = this;

            this.callback = opts.callback || function(){};

            //console.log(SHAKE_THRESHOLD);


            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', function(event){
                    
                    !self.isLock && self.handler(event);

                }, false);
            } else {
                self.alert('本设备不支持devicemotion事件');
            }
        }
    };


})();


/*
    简单拖拽插件
    $('#div1').drag({  
        before: function(e) {  
            $(this).text('拖动前' + e.pageX + ','+e.pageY);  
        },  
        process: function(e) {  
            document.title = '拖动中' + e.pageX + ','+e.pageY;
            $(this).html('拖动中' + e.pageX + '<br>'+e.pageY);  
        },  
        end: function(e) {  
            $(this).text('拖动完' + e.pageX); 
            // startPos 起始位置
            console.log($(this).data('startPos')); 
        }  
    });  

*/
(function($) {
    var old = $.fn.drag;

    function Drag(element, options) {
        this.ver = '1.0';
        this.$element = $(element);
        this.options = $.extend({}, $.fn.drag.defaults, options);
        this.init();
    }

    Drag.prototype = {
        constructor: Drag,
        init: function() {
            var options = this.options;

            this.$element.on('touchstart.drag.founder mousedown.drag.founder', function(e) {
                var ev = e.type == 'touchstart' ? e.originalEvent.touches[0] : e,
                    startPos = $(this).position(),
                    disX = ev.pageX - startPos.left,
                    disY = ev.pageY - startPos.top,
                    that = this;

                // console.log(ev)
                //记录初始位置,以便复位使用
                $(this).data('startPos', startPos);

                if (options.before && $.isFunction(options.before)) {
                    options.before.call(that, ev);
                }

                $(document).on('touchmove.drag.founder mousemove.drag.founder', function(e) {
                    var ev = e.type == 'touchmove' ? e.originalEvent.touches[0] : e,
                        $this = $(that),
                        $parent = $this.offsetParent(),
                        $parent=$parent.is(':root')?$(window):$parent,
                        pPos = $parent.offset(),
                        pPos=pPos?pPos:{left:0,top:0},
                        left = ev.pageX - disX - pPos.left,
                        top = ev.pageY - disY - pPos.top,
                        r = $parent.width() - $this.outerWidth(true),
                        d = $parent.height() - $this.outerHeight(true);

                    left = left < 0 ? 0 : left > r ? r : left;
                    top = top < 0 ? 0 : top > d ? d : top;


                    $(that).css({
                        left: left + 'px',
                        top: top + 'px'
                    });

                    if (options.process && $.isFunction(options.process)) {
                        options.process.call(that, ev);
                    }

                    e.preventDefault();
                });

                $(document).on('touchend.drag.founder mouseup.drag.founder', function(e) {
                    var ev = e.type == 'touchend' ? e.originalEvent.changedTouches[0] : e;

                    if (options.end && $.isFunction(options.end)) {
                        options.end.call(that, ev);
                    }

                    $(document).off('.drag.founder');
                });
            
                e.preventDefault();
            });
        }
    };

    //jQ插件模式
    $.fn.drag = function(options) {
        return this.each(function() {
            var $this = $(this),
                instance = $this.data('drag');

            if (!instance) {
                instance = new Drag(this, options);
                $this.data('drag', instance);
            } else {
                instance.init();
            }

            if (typeof options === 'string') {
                //instance.options[options].call(this);
            }

        });
    };

    $.fn.drag.defaults = {
        before: $.noop,
        process: $.noop,
        end: $.noop
    };

    $.fn.drag.noConflict = function() {
        $.fn.drag = old;
        return this;
    };

})(IGrow.$);


/*  
    'swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown','doubleTap', 'tap', 'singleTap', 'longTap' 
*/

;(function($){
    var touch = {},
      touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
      longTapDelay = 750,
      gesture

    function swipeDirection(x1, x2, y1, y2) {
      return Math.abs(x1 - x2) >=
        Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
    }

    function longTap() {
      longTapTimeout = null
      if (touch.last) {
        touch.el.trigger('longTap')
        touch = {}
      }
    }

    function cancelLongTap() {
      if (longTapTimeout) clearTimeout(longTapTimeout)
      longTapTimeout = null
    }

    function cancelAll() {
      if (touchTimeout) clearTimeout(touchTimeout)
      if (tapTimeout) clearTimeout(tapTimeout)
      if (swipeTimeout) clearTimeout(swipeTimeout)
      if (longTapTimeout) clearTimeout(longTapTimeout)
      touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
      touch = {}
    }

    function isPrimaryTouch(event){
      return (event.pointerType == 'touch' ||
        event.pointerType == event.MSPOINTER_TYPE_TOUCH)
        && event.isPrimary
    }

    function isPointerEventType(e, type){
      return (e.type == 'pointer'+type ||
        e.type.toLowerCase() == 'mspointer'+type)
    }

    $(document).ready(function(){
      var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

      if ('MSGesture' in window) {
        gesture = new MSGesture()
        gesture.target = document.body
      }

      $(document)
        .bind('MSGestureEnd', function(e){
          var swipeDirectionFromVelocity =
            e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
          if (swipeDirectionFromVelocity) {
            touch.el.trigger('swipe')
            touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
          }
        })
        .on('touchstart MSPointerDown pointerdown', function(e){
          if((_isPointerType = isPointerEventType(e, 'down')) &&
            !isPrimaryTouch(e)) return
          firstTouch = _isPointerType ? e : e.originalEvent.touches[0]
          if (e.originalEvent.touches && e.originalEvent.touches.length === 1 && touch.x2) {
            // Clear out touch movement data if we have it sticking around
            // This can occur if touchcancel doesn't fire due to preventDefault, etc.
            touch.x2 = undefined
            touch.y2 = undefined
          }
          now = Date.now()
          delta = now - (touch.last || now)
          touch.el = $('tagName' in firstTouch.target ?
            firstTouch.target : firstTouch.target.parentNode)
          touchTimeout && clearTimeout(touchTimeout)
          touch.x1 = firstTouch.pageX
          touch.y1 = firstTouch.pageY
          if (delta > 0 && delta <= 250) touch.isDoubleTap = true
          touch.last = now
          longTapTimeout = setTimeout(longTap, longTapDelay)
          // adds the current touch contact for IE gesture recognition
          if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
        })
        .on('touchmove MSPointerMove pointermove', function(e){
          if((_isPointerType = isPointerEventType(e, 'move')) &&
            !isPrimaryTouch(e)) return
          firstTouch = _isPointerType ? e : e.originalEvent.touches[0]
          cancelLongTap()
          touch.x2 = firstTouch.pageX
          touch.y2 = firstTouch.pageY

          deltaX += Math.abs(touch.x1 - touch.x2)
          deltaY += Math.abs(touch.y1 - touch.y2)
        })
        .on('touchend MSPointerUp pointerup', function(e){
          if((_isPointerType = isPointerEventType(e, 'up')) &&
            !isPrimaryTouch(e)) return
          cancelLongTap()

          // swipe
          if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
              (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

            swipeTimeout = setTimeout(function() {
              touch.el.trigger('swipe')
              touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
              touch = {}
            }, 0)

          // normal tap
          else if ('last' in touch)
            // don't fire tap when delta position changed by more than 30 pixels,
            // for instance when moving to a point and back to origin
            if (deltaX < 30 && deltaY < 30) {
              // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
              // ('tap' fires before 'scroll')
              tapTimeout = setTimeout(function() {

                // trigger universal 'tap' with the option to cancelTouch()
                // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
                var event = $.Event('tap')
                event.cancelTouch = cancelAll
                touch.el.trigger(event)

                // trigger double tap immediately
                if (touch.isDoubleTap) {
                  if (touch.el) touch.el.trigger('doubleTap')
                  touch = {}
                }

                // trigger single tap after 250ms of inactivity
                else {
                  touchTimeout = setTimeout(function(){
                    touchTimeout = null
                    if (touch.el) touch.el.trigger('singleTap')
                    touch = {}
                  }, 250)
                }
              }, 0)
            } else {
              touch = {}
            }
            deltaX = deltaY = 0

        })
        // when the browser window loses focus,
        // for example when a modal dialog is shown,
        // cancel all ongoing events
        .on('touchcancel MSPointerCancel pointercancel', cancelAll)

      // scrolling the window indicates intention of the user
      // to scroll, not tap or swipe, so cancel all ongoing events
      $(window).on('scroll', cancelAll)
    })

    ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
      'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
      $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
    })

})(IGrow.$ || jQuery);


/* 
    手机图片预览 
*/

(function($) {
    
    // 浏览器信息
    var os = $.os = {
        ios : false,
        android: false,
        version: false
    };
      
    var ua = navigator.userAgent;
    var browser = {},
        webkit = ua.match(/WebKit\/([\d.]+)/),
        android = ua.match(/(Android)\s+([\d.]+)/),
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = ua.match(/(iPod).*OS\s([\d_]+)/),
        iphone = !ipod && !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
        touchpad = webos && ua.match(/TouchPad/),
        kindle = ua.match(/Kindle\/([\d.]+)/),
        silk = ua.match(/Silk\/([\d._]+)/),
        blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
        mqqbrowser = ua.match(/MQQBrowser\/([\d.]+)/),
        chrome = ua.match(/CriOS\/([\d.]+)/),
        opera = ua.match(/Opera\/([\d.]+)/),
        safari = ua.match(/Safari\/([\d.]+)/);
      // if (browser.webkit = !! webkit) browser.version = webkit[1]
    if (android) {
        os.android = true;
        os.version = android[2];
    }
    if (iphone) {
        os.ios = jQuery.os.iphone = true;
        os.version = iphone[2].replace(/_/g, '.');
    }
    if (ipad) {
        os.ios = jQuery.os.ipad = true;
        os.version = ipad[2].replace(/_/g, '.');
    }
    if (ipod) {
        os.ios = jQuery.os.ipod = true;
        os.version = ipod[2].replace(/_/g, '.');
    }

   

    var tmpl = {
        'item': function(data) {

            var __p = [],
            _p = function(s) {
                __p.push(s)
            };
            with(data || {}) {
                var arrTitle = titles || [];
                __p.push('<ul class="pv-inner" style="line-height:');
                _p(height);
                __p.push('px;">');
                for (var i = 0; i < photos.length; i++) {
                    var imgTitle = arrTitle[i] || '';
                    __p.push('<li class="pv-img" title="' + imgTitle + '" style="width:');
                    _p(width);
                    __p.push('px;height:');
                    _p(height);
                    __p.push('px;"></li>');
                }
                __p.push('</ul>    <span class="ui-loading white" id="J_loading"><div class="loadInco"><span class="blockG" id="rotateG_01"></span><span class="blockG" id="rotateG_02"></span><span class="blockG" id="rotateG_03"></span><span class="blockG" id="rotateG_04"></span><span class="blockG" id="rotateG_05"></span><span class="blockG" id="rotateG_06"></span><span class="blockG" id="rotateG_07"></span><span class="blockG" id="rotateG_08"></span></div></span><p class="counts"><span class="value" id="J_index">');
                _p(index + 1);
                __p.push('/');
                _p(photos.length);
                __p.push('</span></p>');
                __p.push('<p class="slide-view-title"><span id="J_title" class="value"></span></p>');

            }
            return __p.join("");
        }
    };
    var ImageView = window['ImageView'] = {
        photos: null,
        index: 0,
        el: null,
        config: null,
        lastContainerScroll: 0,
        zoom: 1,
        advancedSupport: false,
        lastTapDate: 0,
        /**
         *
         * @param photos {Array} photo url list
         * @param index {Number} display photo at this index as default
         * @param config{
         *      count: global photo count, leave blank while {photos} is enough for displaying.
         *      idx_space: global index of the first photo in given photo array, leave blank in the same condition above.
         *      onRequestMore: callback when lacking of photos
         *      onIndexChange:callback at index changes
         *      onClose: callback at close
         * }
         */
        init: function(photos, index, config) {
            var self = this;
            index = +index || 0;
            this.config = $.extend({
                fade: true
            },
            config);

            this.lastContainerScroll = document.body.scrollTop;
            // if mobile is iphone or android
            if ($.os.iphone || ($.os.android && parseFloat($.os.version) >= 4.0)) {
                this.advancedSupport = true;
            }

            //rebuild photos array based on global count ????for what
            if (this.config.count) {
                this.photos = new Array(this.config.count);
                var len = photos.length,
                start = this.config.idx_space || 0;
                for (var i = start; i < start + len; i++) {
                    this.photos[i] = photos[i - start];
                }
                this.index = start + index;
            } else {
                this.photos = photos || [];
                this.index = index || 0;
            }

            //do size calculation in next tick, leave time to browser for any size related changes to take place.
            setTimeout(function() {
                self.clearStatus();
                self.render(true);
                self.bind();
                self.changeIndex(self.index, true);
            },
            0);
        },

        //reset sizes.
        clearStatus: function() {
            this.width = Math.max(window.innerWidth, document.body.clientWidth); //android compatibility
            this.height = window.innerHeight;
            this.zoom = 1;
            this.zoomX = 0;
            this.zoomY = 0;
        },
        render: function(first) {
            var config = this.config || {},
            titles = config.titles || [];

            if (first) {
                $('<div id="imageView" class="slide-view" style="display:none;">').appendTo($('body'));
            }

            this.el = $('#imageView');
            this.el.html(tmpl.item({
                photos: this.photos,
                titles: titles,
                index: this.index,
                width: this.width,
                height: this.height
            }));
            //window.scrollY+'px'
            if (first) {
                this.el.css({
                    'opacity': 0,
                    'height': this.height + 2 + 'px',
                    //2px higher
                    'top': window.scrollY + 'px'
                    //'top':this.lastContainerScroll - 1 +'px'
                }).show().animate({
                    'opacity': 1
                },
                300);
            }

        },
        topFix: function() {
            if (!ImageView.el) return;
            ImageView.el.css('top', window.scrollY + 'px');
        },
        bind: function() {
            var self = this;
            this.unbind();
            $(window).on('scroll', this.topFix);
            this.el.on('touchstart touchmove touchend touchcancel',
            function(e) {
                //alert(e.originalEvent.touches[0].pageX)
                e.touches = e.originalEvent ? e.originalEvent.touches: null;
                self.handleEvent(e);
            });
            this.el.on('click',
            function(e) {
                //console.log('click',e)
                e.preventDefault();
                var now = new Date();
                if (now - this.lastTapDate < 500) {
                    return;
                }
                this.lastTapDate = now;
                self.onSingleTap(e);
            }).on('doubleTap',
            function(e) {

                e.preventDefault();
                self.onDoubleTap(e);
            });

            this._resize = function() {
                self.resize();
            };
            'onorientationchange' in window ? window.addEventListener('orientationchange', this._resize, false) : window.addEventListener('resize', this._resize, false);
        },
        unbind: function() {
            this.el.off();
            $(window).off('scroll', this.topFix);
            'onorientationchange' in window ? window.removeEventListener('orientationchange', this._resize, false) : window.removeEventListener('resize', this._resize, false);
        },
        handleEvent: function(e) {
            switch (e.type) {

            case 'touchstart':
                this.onTouchStart(e);
                break;
            case 'touchmove':
                e.preventDefault();
                this.onTouchMove(e);
                break;
            case 'touchcancel':
            case 'touchend':
                this.onTouchEnd(e);
                break;
            case 'orientationchange':
            case 'resize':
                this.resize(e);
                break;
            }
        },
        onSingleTap: function(e) {
            this.close(e);
        },
        getDist: function(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 2);
        },
        doubleZoomOrg: 1,
        doubleDistOrg: 1,
        isDoubleZoom: false,
        onTouchStart: function(e) {
            if (this.advancedSupport && e.touches && e.touches.length >= 2) {
                var img = this.getImg();
                img.style.webkitTransitionDuration = '0';
                this.isDoubleZoom = true;
                this.doubleZoomOrg = this.zoom;
                this.doubleDistOrg = this.getDist(e.touches[0].pageX, e.touches[0].pageY, e.touches[1].pageX, e.touches[1].pageY);
                return;
            }

            e = e.touches ? e.touches[0] : e;
            //alert(1111+','+e.touches[0].pageX)
            this.isDoubleZoom = false;
            this.startX = e.pageX;
            this.startY = e.pageY;
            this.orgX = e.pageX;
            this.orgY = e.pageY;
            this.hasMoved = false;
            //alert(this.startX+',')
            if (this.zoom != 1) {
                this.zoomX = this.zoomX || 0;
                this.zoomY = this.zoomY || 0;
                var img = this.getImg();
                if (img) {
                    img.style.webkitTransitionDuration = '0';
                }
                this.drag = true;
            } else {
                //disable movement with single photo
                if (this.photos.length == 1) {
                    return;
                }
                this.el.find('.pv-inner').css('transitionDuration', '0');
                //this.el.find('.pv-inner').css('-webkitTransitionDuration','0');
                this.transX = -this.index * this.width;
                this.slide = true;
            }
        },

        onTouchMove: function(e) {
            if (this.advancedSupport && e.touches && e.touches.length >= 2) {
                var newDist = this.getDist(e.touches[0].pageX, e.touches[0].pageY, e.touches[1].pageX, e.touches[1].pageY);
                this.zoom = newDist * this.doubleZoomOrg / this.doubleDistOrg;
                var img = this.getImg();
                img.style.webkitTransitionDuration = '0';
                if (this.zoom < 1) {
                    this.zoom = 1;
                    this.zoomX = 0;
                    this.zoomY = 0;
                    img.style.webkitTransitionDuration = '200ms';
                } else if (this.zoom > this.getScale(img) * 2) {
                    this.zoom = this.getScale(img) * 2;
                }
                img.style.webkitTransform = "scale(" + this.zoom + ") translate(" + this.zoomX + "px," + this.zoomY + "px)";
                return;
            }
            //disable movement at double status.
            if (this.isDoubleZoom) {
                return;
            }
            e = e.touches ? e.touches[0] : e;
            //move distance larger than 5px
            if (!this.hasMoved && (Math.abs(e.pageX - this.orgX) > 5 || Math.abs(e.pageY - this.orgY) > 5)) {
                this.hasMoved = true;
            }
            //zoom status
            if (this.zoom != 1) {
                var deltaX = (e.pageX - this.startX) / this.zoom;
                var deltaY = (e.pageY - this.startY) / this.zoom;
                this.startX = e.pageX;
                this.startY = e.pageY;

                var img = this.getImg();
                var newWidth = img.width * this.zoom,
                newHeight = img.height * this.zoom;
                var borderX = (newWidth - this.width) / 2 / this.zoom,
                borderY = (newHeight - this.height) / 2 / this.zoom;
                //edge status
                if (borderX >= 0) {
                    if (this.zoomX < -borderX || this.zoomX > borderX) {
                        deltaX /= 3;
                    }
                }
                if (borderY > 0) {
                    if (this.zoomY < -borderY || this.zoomY > borderY) {
                        deltaY /= 3;
                    }
                }
                this.zoomX += deltaX;
                this.zoomY += deltaY;
                //long image status
                if ((this.photos.length == 1 && newWidth < this.width)) {
                    this.zoomX = 0;
                } else if (newHeight < this.height) {
                    this.zoomY = 0;
                }
                img.style.webkitTransform = "scale(" + this.zoom + ") translate(" + this.zoomX + "px," + this.zoomY + "px)";
            } else {

                //slide status
                if (!this.slide) {
                    return;
                }

                var deltaX = e.pageX - this.startX;
                //alert(e.pageX+','+this.startX)
                if (this.transX > 0 || this.transX < -this.width * (this.photos.length - 1)) {
                    deltaX /= 4;
                }

                this.transX = -this.index * this.width + deltaX;
                //alert(this.width+','+deltaX+','+this.index)
                this.el.find('.pv-inner').css('transform', 'translateX(' + this.transX + 'px)');
                //this.el.find('.pv-inner').css('-webkitTransform','translateX('+this.transX+'px)');
            }
        },
        onTouchEnd: function(e) {
            if (this.isDoubleZoom) {
                return;
            }

            if (!this.hasMoved) {
                return;
            }
            if (this.zoom != 1) {
                if (!this.drag) {
                    return;
                }
                var img = this.getImg();
                img.style.webkitTransitionDuration = '200ms';

                var newWidth = img.width * this.zoom,
                newHeight = img.height * this.zoom;
                var borderX = (newWidth - this.width) / 2 / this.zoom,
                borderY = (newHeight - this.height) / 2 / this.zoom;
                //index change conditions
                var len = this.photos.length;
                if (len > 1 && borderX >= 0) {
                    var updateDelta = 0;
                    var switchDelta = this.width / 6;
                    if (this.zoomX < -borderX - switchDelta / this.zoom && this.index < len - 1) {
                        updateDelta = 1;
                    } else if (this.zoomX > borderX + switchDelta / this.zoom && this.index > 0) {
                        updateDelta = -1;
                    }
                    if (updateDelta != 0) {
                        this.scaleDown(img);
                        this.changeIndex(this.index + updateDelta);
                        return;
                    }
                }
                //edge
                if (borderX >= 0) {
                    if (this.zoomX < -borderX) {
                        this.zoomX = -borderX;
                    } else if (this.zoomX > borderX) {
                        this.zoomX = borderX;
                    }
                }
                if (borderY > 0) {
                    if (this.zoomY < -borderY) {
                        this.zoomY = -borderY;
                    } else if (this.zoomY > borderY) {
                        this.zoomY = borderY;
                    }
                }
                if (this.isLongPic(img) && Math.abs(this.zoomX) < 10) {
                    img.style.webkitTransform = "scale(" + this.zoom + ") translate(0px," + this.zoomY + "px)";
                    return;
                } else {
                    img.style.webkitTransform = "scale(" + this.zoom + ") translate(" + this.zoomX + "px," + this.zoomY + "px)";
                }
                this.drag = false;

            } else {
                if (!this.slide) {
                    return;
                }
                var deltaX = this.transX - ( - this.index * this.width);
                var updateDelta = 0;
                if (deltaX > 50) {
                    updateDelta = -1;
                } else if (deltaX < -50) {
                    updateDelta = 1;
                }
                this.changeIndex(this.index + updateDelta);
                this.slide = false;
            }
        },
        getImg: function(index) {
            var img = this.el.find('li').eq(index || this.index).find('img');
            if (img.size() == 1) {
                return img[0];
            } else {
                return null;
            }
        },
        //return default zoom factor
        getScale: function(img) {
            //long images
            if (this.isLongPic(img)) {
                return this.width / img.width; //scale to fit window
            } else {
                //other images
                //return 1 if image is smaller than window
                var h = img.naturalHeight,
                w = img.naturalWidth;
                var hScale = h / img.height,
                wScale = w / img.width;
                if (hScale > wScale) {
                    return wScale;
                } else {
                    return hScale;
                }
            }
        },
        onDoubleTap: function(e) {
            var now = new Date();
            if (now - this.lastTapDate < 500) {
                return;
            }
            this.lastTapDate = now;
            var img = this.getImg();
            if (!img) {
                return;
            }

            if (this.zoom != 1) {
                this.scaleDown(img);
            } else {
                this.scaleUp(img);
            }
            this.afterZoom(img);
        },

        scaleUp: function(img) {
            var scale = this.getScale(img);
            if (scale > 1) {
                img.style.webkitTransform = "scale(" + scale + ")";
                img.style.webkitTransition = "200ms";
            }

            this.zoom = scale;
            this.afterZoom(img);
        },

        scaleDown: function(img) {
            this.zoom = 1;
            this.zoomX = 0;
            this.zoomY = 0;
            this.doubleDistOrg = 1;
            this.doubleZoomOrg = 1;
            img.style.webkitTransform = "";
            this.afterZoom(img);
        },
        afterZoom: function(img) {
            //reposition: top of image.
            if (this.zoom > 1 && this.isLongPic(img)) {
                var newHeight = img.height * this.zoom;
                var borderY = (newHeight - this.height) / 2 / this.zoom;
                if (borderY > 0) {
                    this.zoomY = borderY;
                    img.style.webkitTransform = "scale(" + this.zoom + ") translate(0px," + borderY + "px)";
                }
            }
        },
        isLongPic: function(img) {
            return img.height / img.width >= 3.5
        },
        resizeTimer: null,
        resize: function(e) {
            clearTimeout(this.resizeTimer);
            var self = this;
            this.resizeTimer = setTimeout(function() {

                document.body.style.minHeight = window.innerHeight + 1 + 'px';
                if (self.zoom != 1) {
                    //cancel zoom status
                    self.scaleDown(self.getImg());
                }
                self.clearStatus();
                self.render(); //re-render is faster than nodes modification.
                self.el.height(self.height).css('top', window.scrollY + 'px');
                self.changeIndex(self.index, true);
            },
            600);
        },

        changeIndex: function(index, force) {
            if (this.indexChangeLock) {
                return;
            }
            if (index < 0) {
                index = 0;
            } else if (index >= this.photos.length) {
                index = this.photos.length - 1;
            }
            var changed = this.index != index;
            this.index = index;
            var inner = this.el.find('.pv-inner');
            inner.css({
                'transitionDuration': force ? '0': '200ms',
                'transform': 'translateX(-' + index * this.width + 'px)'
            });
            /*inner.css({
                '-webkitTransitionDuration':force?'0':'200ms',
                '-webkitTransform':'translateX(-'+index*this.width+'px)'
            });*/
            //load image at current index
            var li = inner.find('li').eq(index);
            var title = li.attr('title') || '';
            var imgs = li.find('img');
            var self = this;
            if (!imgs.size()) {
                this.el.find('#J_loading').show();
                if (typeof this.photos[index] != 'undefined') {
                    var img = new Image();
                    img.onload = function() {
                        if (self.el == null) {
                            return;
                        }
                        img.onload = null;
                        self.el.find('#J_loading').hide();
                        img.style.webkitTransform = '';
                        img.style.opacity = '';
                        if (self.isLongPic(img)) {
                            setTimeout(function() {
                                self.scaleUp(img);
                            },
                            0);
                        }
                    };
                    img.ontimeout = img.onerror = function() {
                        li.html('<i style="color:white;">This image is broken, try again later.</i>');
                        self.el.find('#J_loading').hide();
                    }
                    if (this.advancedSupport) {
                        img.style.webkitBackfaceVisibility = 'hidden';
                    }
                    img.style.opacity = '0';
                    img.src = this.getImgUrl(index);
                    li.html('').append(img);
                    //do we have enough photos
                    if (this.config.onRequestMore && this.index > 0 && typeof this.photos[index - 1] == 'undefined') {
                        this.config.onRequestMore(this.photos[index], -1, index);
                    } else if (this.config.onRequestMore && this.index < this.photos.length - 1 && typeof this.photos[this.index + 1] == 'undefined') {
                        this.config.onRequestMore(this.photos[index], 1, index);
                    }
                    this.preload(index - 1);
                    this.preload(index + 1);
                } else {
                    this.indexChangeLock = true;
                }
            }
            if (changed || force) {
                this.el.find('#J_index').html((index + 1) + '/' + this.photos.length);
                this.el.find('#J_title').html(title);
                this.config.onIndexChange && this.config.onIndexChange(img, this.photos, index);
            }
            setTimeout(function() {
                self.memoryClear();
            },
            0);
        },
        //defaule memory clear，remove nodes at index between [0, index - 10] && [index+10, max]
        memoryClear: function() {
            var li = this.el.find('.pv-img');
            var i = this.index - 10;
            while (i >= 0) {
                if (li.eq(i).html() == '') break;
                li.eq(i).html('');
                i--;
            }
            i = this.index + 10;
            while (i < li.size()) {
                if (li.eq(i).html() == '') break;
                li.eq(i).html('');
                i++;
            }
        },

        getImgUrl: function(index, useOrg) {
            if (index < 0 || index >= this.photos.length || !this.photos[index]) {
                return "";
            }

            return this.photos[index];
        },

        preload: function(index) {
            if (index < 0 || index >= this.photos.length || !this.getImg(index)) {
                return;
            }
            var url = this.getImgUrl(index);
            if (url) {
                var img = new Image();
                img.src = url;
            }
        },
        /**
         * update photos at given index
         * @param photos {Array}
         * @param index {Number} global index of first photo in given array
         */
        update: function(photos, index) {
            if (index < this.photos.length) {
                var len = photos.length;
                for (var i = index; i < index + len; i++) {
                    this.photos[i] = photos[i - index];
                }

                if (this.indexChangeLock) {
                    this.indexChangeLock = false;
                    this.changeIndex(this.index);
                }
            }
        },

        destroy: function() {
            if (this.el) {
                var self = this;
                this.unbind();
                this.el.animate({
                    'opacity': 0
                },
                300, 'linear',
                function() {
                    if (self.el) {
                        self.el.html('').remove();
                        self.el = null;
                    }
                });
                this.config.onClose && this.config.onClose(this.img, this.photos, this.index);
            }
        },

        close: function() {
            this.destroy();
        },

        run:function(){
            var titles = [];
            var pics = [];
            $('[data-role="photoItem"]').each(function(i,item){
                var $photoItem = $(this);
                var pic = $photoItem.attr('data-original');
                var title = $photoItem.attr('data-title');
                $(this).attr('photo-index',i);

                titles.push(title);
                pics.push(pic);
            });
            $('body').on('click', '[data-role="photoItem"]', function(e){
                var $photoItem = $(e.currentTarget);
                var index = $photoItem.attr('photo-index');

                index = parseInt(index);
                window.ImageView.init(pics,index,{ titles: titles });

            });
        }
    };

    return ImageView;

})(IGrow.$);

/* 图片预加载 */
(function(IGrow){

    IGrow.imgLoad = imgLoad;

    function imgLoad(imgs ,done ,loading){
        
        this.index = 0;
        this.imgs = imgs || [];
        this.done = done || function(){ console.log('done') };
        this.loading = function(p){ document.getElementById('loader-progress-txt').innerHTML= (p + '%'); };

        if(!imgs.length){
            this.loading(100);
            this.done();
        }else {
            console.log(this);
            this.run();
        }
    }

    imgLoad.prototype.run = function() {
        var self = this;

        var imgs = this.imgs;
        var length = imgs.length;
        var img = new Image();
        var index = this.index;
        var loading = this.loading;
        var done = this.done;
        var src = imgs[index];

        img.src = src;

        if(img.complete){
            img = null;           
            setTimeout(function(){
                onload();
            },10)
            return ;
        }
        img.onload = function(){
            img = null;   
            setTimeout(function(){
                onload();
            },10)
        };
        img.onerror = function(){
            img = null;   
            setTimeout(function(){
                onload();
            },10)
        };    
        function onload(){
            self.index++;
            console.log('load img index',self.index);
            var a = Math.floor(100 / length * self.index);
            // 加载的百分比
            loading(a);
            if (self.index >= length) {  
                complete();
                       
            }else{
                self.run(imgs);
            }       
        }

        function complete(){
            var _loader = document.getElementById('loader');
            //loading(100);
            _loader.parentNode.removeChild(_loader);
            done();
        }
    };
})(IGrow)



