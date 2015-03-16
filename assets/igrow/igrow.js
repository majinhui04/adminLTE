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
    
    var tplAlert = '<div class="modal modal-mobile" role="dialog" id="m-alert">'+
                        '<div class="modal-dialog ">'+
                            '<div class="modal-content">'+
                                '<div class="modal-title">温馨提示</div>'+
                                '<div class="modal-body"></div>'+
                                '<div class="modal-footer">'+
                                    '<a href="javascript:void(0)" class="btn-alert" data-dismiss="modal">确定</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

    var tplConfirm = '<div class="modal modal-mobile" role="dialog" id="m-confirm">'+
                        '<div class="modal-dialog ">'+
                            '<div class="modal-content">'+
                                '<div class="modal-title">确认框</div>'+
                                '<div class="modal-body"></div>'+
                                '<div class="modal-footer">'+
                                    '<a href="javascript:void(0)" class="btn-confirm-no" data-dismiss="modal">取消</a>'+
                                    '<a href="javascript:void(0)" class="btn-confirm-yes" data-dismiss="modal">确定</a>'+
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

})(IGrow,IGrow.$);


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

/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 * Downloads By http://www.veryhuo.com
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function($) {

$.extend($.fn, {
    // http://docs.jquery.com/Plugins/Validation/validate
    validate: function( options ) {

        // if nothing is selected, return nothing; can't chain anyway
        if ( !this.length ) {
            if ( options && options.debug && window.console ) {
                console.warn( "Nothing selected, can't validate, returning nothing." );
            }
            return;
        }

        // check if a validator for this form was already created
        var validator = $.data( this[0], "validator" );
        if ( validator ) {
            return validator;
        }

        // Add novalidate tag if HTML5.
        this.attr( "novalidate", "novalidate" );

        validator = new $.validator( options, this[0] );
        $.data( this[0], "validator", validator );

        if ( validator.settings.onsubmit ) {

            this.validateDelegate( ":submit", "click", function( event ) {
                if ( validator.settings.submitHandler ) {
                    validator.submitButton = event.target;
                }
                // allow suppressing validation by adding a cancel class to the submit button
                if ( $(event.target).hasClass("cancel") ) {
                    validator.cancelSubmit = true;
                }

                // allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                if ( $(event.target).attr("formnovalidate") !== undefined ) {
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
                    var hidden;
                    if ( validator.settings.submitHandler ) {
                        if ( validator.submitButton ) {
                            // insert a hidden input as a replacement for the missing submit button
                            hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val( $(validator.submitButton).val() ).appendTo(validator.currentForm);
                        }
                        validator.settings.submitHandler.call( validator, validator.currentForm, event );
                        if ( validator.submitButton ) {
                            // and clean up afterwards; thanks to no-block-scope, hidden can be referenced
                            hidden.remove();
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
    // http://docs.jquery.com/Plugins/Validation/valid
    valid: function() {
        if ( $(this[0]).is("form")) {
            return this.validate().form();
        } else {
            var valid = true;
            var validator = $(this[0].form).validate();
            this.each(function() {
                valid = valid && validator.element(this);
            });
            return valid;
        }
    },
    // attributes: space seperated list of attributes to retrieve and remove
    removeAttrs: function( attributes ) {
        var result = {},
            $element = this;
        $.each(attributes.split(/\s/), function( index, value ) {
            result[value] = $element.attr(value);
            $element.removeAttr(value);
        });
        return result;
    },
    // http://docs.jquery.com/Plugins/Validation/rules
    rules: function( command, argument ) {
        var element = this[0];

        if ( command ) {
            var settings = $.data(element.form, "validator").settings;
            var staticRules = settings.rules;
            var existingRules = $.validator.staticRules(element);
            switch(command) {
            case "add":
                $.extend(existingRules, $.validator.normalizeRule(argument));
                // remove messages from rules, but allow them to be set separetely
                delete existingRules.messages;
                staticRules[element.name] = existingRules;
                if ( argument.messages ) {
                    settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
                }
                break;
            case "remove":
                if ( !argument ) {
                    delete staticRules[element.name];
                    return existingRules;
                }
                var filtered = {};
                $.each(argument.split(/\s/), function( index, method ) {
                    filtered[method] = existingRules[method];
                    delete existingRules[method];
                });
                return filtered;
            }
        }

        var data = $.validator.normalizeRules(
        $.extend(
            {},
            $.validator.classRules(element),
            $.validator.attributeRules(element),
            $.validator.dataRules(element),
            $.validator.staticRules(element)
        ), element);

        // make sure required is at front
        if ( data.required ) {
            var param = data.required;
            delete data.required;
            data = $.extend({required: param}, data);
        }

        return data;
    }
});

// Custom selectors
$.extend($.expr[":"], {
    // http://docs.jquery.com/Plugins/Validation/blank
    blank: function( a ) { return !$.trim("" + $(a).val()); },
    // http://docs.jquery.com/Plugins/Validation/filled
    filled: function( a ) { return !!$.trim("" + $(a).val()); },
    // http://docs.jquery.com/Plugins/Validation/unchecked
    unchecked: function( a ) { return !$(a).prop("checked"); }
});

// constructor for validator
$.validator = function( options, form ) {
    this.settings = $.extend( true, {}, $.validator.defaults, options );
    this.currentForm = form;
    this.init();
};

$.validator.format = function( source, params ) {
    if ( arguments.length === 1 ) {
        return function() {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.validator.format.apply( this, args );
        };
    }
    if ( arguments.length > 2 && params.constructor !== Array  ) {
        params = $.makeArray(arguments).slice(1);
    }
    if ( params.constructor !== Array ) {
        params = [ params ];
    }
    $.each(params, function( i, n ) {
        source = source.replace( new RegExp("\\{" + i + "\\}", "g"), function() {
            return n;
        });
    });
    return source;
};

$.extend($.validator, {

    defaults: {
        messages: {},
        groups: {},
        rules: {},
        errorClass: "error",
        validClass: "valid",
        errorElement: "label",
        focusInvalid: true,
        errorContainer: $([]),
        errorLabelContainer: $([]),
        onsubmit: true,
        ignore: ":hidden",
        ignoreTitle: false,
        onfocusin: function( element, event ) {
            this.lastActive = element;

            // hide error label and remove error class on focus if enabled
            if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
                if ( this.settings.unhighlight ) {
                    this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
                }
                this.addWrapper(this.errorsFor(element)).hide();
            }
        },
        onfocusout: function( element, event ) {
            if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
                this.element(element);
            }
        },
        onkeyup: function( element, event ) {
            if ( event.which === 9 && this.elementValue(element) === "" ) {
                return;
            } else if ( element.name in this.submitted || element === this.lastElement ) {
                this.element(element);
            }
        },
        onclick: function( element, event ) {
            // click on selects, radiobuttons and checkboxes
            if ( element.name in this.submitted ) {
                this.element(element);
            }
            // or option elements, check parent select in that case
            else if ( element.parentNode.name in this.submitted ) {
                this.element(element.parentNode);
            }
        },
        highlight: function( element, errorClass, validClass ) {
            if ( element.type === "radio" ) {
                this.findByName(element.name).addClass(errorClass).removeClass(validClass);
            } else {
                $(element).addClass(errorClass).removeClass(validClass);
            }
        },
        unhighlight: function( element, errorClass, validClass ) {
            if ( element.type === "radio" ) {
                this.findByName(element.name).removeClass(errorClass).addClass(validClass);
            } else {
                $(element).removeClass(errorClass).addClass(validClass);
            }
        }
    },

    // http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
    setDefaults: function( settings ) {
        $.extend( $.validator.defaults, settings );
    },

    messages: {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        maxlength: $.validator.format("Please enter no more than {0} characters."),
        minlength: $.validator.format("Please enter at least {0} characters."),
        rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
        range: $.validator.format("Please enter a value between {0} and {1}."),
        max: $.validator.format("Please enter a value less than or equal to {0}."),
        min: $.validator.format("Please enter a value greater than or equal to {0}.")
    },

    autoCreateRanges: false,

    prototype: {

        init: function() {
            this.labelContainer = $(this.settings.errorLabelContainer);
            this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
            this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
            this.submitted = {};
            this.valueCache = {};
            this.pendingRequest = 0;
            this.pending = {};
            this.invalid = {};
            this.reset();

            var groups = (this.groups = {});
            $.each(this.settings.groups, function( key, value ) {
                if ( typeof value === "string" ) {
                    value = value.split(/\s/);
                }
                $.each(value, function( index, name ) {
                    groups[name] = key;
                });
            });
            var rules = this.settings.rules;
            $.each(rules, function( key, value ) {
                rules[key] = $.validator.normalizeRule(value);
            });

            function delegate(event) {
                var validator = $.data(this[0].form, "validator"),
                    eventType = "on" + event.type.replace(/^validate/, "");
                if ( validator.settings[eventType] ) {
                    validator.settings[eventType].call(validator, this[0], event);
                }
            }
            $(this.currentForm)
                .validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
                    "[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
                    "[type='email'], [type='datetime'], [type='date'], [type='month'], " +
                    "[type='week'], [type='time'], [type='datetime-local'], " +
                    "[type='range'], [type='color'] ",
                    "focusin focusout keyup", delegate)
                .validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

            if ( this.settings.invalidHandler ) {
                $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
            }
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/form
        form: function() {
            this.checkForm();
            $.extend(this.submitted, this.errorMap);
            this.invalid = $.extend({}, this.errorMap);
            if ( !this.valid() ) {
                $(this.currentForm).triggerHandler("invalid-form", [this]);
            }
            this.showErrors();
            return this.valid();
        },

        checkForm: function() {
            this.prepareForm();
            for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
                this.check( elements[i] );
            }
            return this.valid();
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/element
        element: function( element ) {
            element = this.validationTargetFor( this.clean( element ) );
            this.lastElement = element;
            this.prepareElement( element );
            this.currentElements = $(element);
            var result = this.check( element ) !== false;
            if ( result ) {
                delete this.invalid[element.name];
            } else {
                this.invalid[element.name] = true;
            }
            if ( !this.numberOfInvalids() ) {
                // Hide error containers on last error
                this.toHide = this.toHide.add( this.containers );
            }
            this.showErrors();
            return result;
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/showErrors
        showErrors: function( errors ) {
            if ( errors ) {
                // add items to error list and map
                $.extend( this.errorMap, errors );
                this.errorList = [];
                for ( var name in errors ) {
                    this.errorList.push({
                        message: errors[name],
                        element: this.findByName(name)[0]
                    });
                }
                // remove items from success list
                this.successList = $.grep( this.successList, function( element ) {
                    return !(element.name in errors);
                });
            }
            if ( this.settings.showErrors ) {
                this.settings.showErrors.call( this, this.errorMap, this.errorList );
            } else {
                this.defaultShowErrors();
            }
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/resetForm
        resetForm: function() {
            if ( $.fn.resetForm ) {
                $(this.currentForm).resetForm();
            }
            this.submitted = {};
            this.lastElement = null;
            this.prepareForm();
            this.hideErrors();
            this.elements().removeClass( this.settings.errorClass ).removeData( "previousValue" );
        },

        numberOfInvalids: function() {
            return this.objectLength(this.invalid);
        },

        objectLength: function( obj ) {
            var count = 0;
            for ( var i in obj ) {
                count++;
            }
            return count;
        },

        hideErrors: function() {
            this.addWrapper( this.toHide ).hide();
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
                    $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
                    .filter(":visible")
                    .focus()
                    // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                    .trigger("focusin");
                } catch(e) {
                    // ignore IE throwing errors when focusing hidden elements
                }
            }
        },

        findLastActive: function() {
            var lastActive = this.lastActive;
            return lastActive && $.grep(this.errorList, function( n ) {
                return n.element.name === lastActive.name;
            }).length === 1 && lastActive;
        },

        elements: function() {
            var validator = this,
                rulesCache = {};

            // select all valid inputs inside the form (no submit or reset buttons)
            return $(this.currentForm)
            .find("input, select, textarea")
            .not(":submit, :reset, :image, [disabled]")
            .not( this.settings.ignore )
            .filter(function() {
                if ( !this.name && validator.settings.debug && window.console ) {
                    console.error( "%o has no name assigned", this);
                }

                // select only the first element for each name, and only those with rules specified
                if ( this.name in rulesCache || !validator.objectLength($(this).rules()) ) {
                    return false;
                }

                rulesCache[this.name] = true;
                return true;
            });
        },

        clean: function( selector ) {
            return $(selector)[0];
        },

        errors: function() {
            var errorClass = this.settings.errorClass.replace(" ", ".");
            return $(this.settings.errorElement + "." + errorClass, this.errorContext);
        },

        reset: function() {
            this.successList = [];
            this.errorList = [];
            this.errorMap = {};
            this.toShow = $([]);
            this.toHide = $([]);
            this.currentElements = $([]);
        },

        prepareForm: function() {
            this.reset();
            this.toHide = this.errors().add( this.containers );
        },

        prepareElement: function( element ) {
            this.reset();
            this.toHide = this.errorsFor(element);
        },

        elementValue: function( element ) {
            var type = $(element).attr("type"),
                val = $(element).val();

            if ( type === "radio" || type === "checkbox" ) {
                return $("input[name='" + $(element).attr("name") + "']:checked").val();
            }

            if ( typeof val === "string" ) {
                return val.replace(/\r/g, "");
            }
            return val;
        },

        check: function( element ) {
            element = this.validationTargetFor( this.clean( element ) );

            var rules = $(element).rules();
            var dependencyMismatch = false;
            var val = this.elementValue(element);
            var result;

            for (var method in rules ) {
                var rule = { method: method, parameters: rules[method] };
                try {

                    result = $.validator.methods[method].call( this, val, element, rule.parameters );

                    // if a method indicates that the field is optional and therefore valid,
                    // don't mark it as valid when there are no other rules
                    if ( result === "dependency-mismatch" ) {
                        dependencyMismatch = true;
                        continue;
                    }
                    dependencyMismatch = false;

                    if ( result === "pending" ) {
                        this.toHide = this.toHide.not( this.errorsFor(element) );
                        return;
                    }

                    if ( !result ) {
                        this.formatAndAdd( element, rule );
                        return false;
                    }
                } catch(e) {
                    if ( this.settings.debug && window.console ) {
                        console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
                    }
                    throw e;
                }
            }
            if ( dependencyMismatch ) {
                return;
            }
            if ( this.objectLength(rules) ) {
                this.successList.push(element);
            }
            return true;
        },

        // return the custom message for the given element and validation method
        // specified in the element's HTML5 data attribute
        customDataMessage: function( element, method ) {
            return $(element).data("msg-" + method.toLowerCase()) || (element.attributes && $(element).attr("data-msg-" + method.toLowerCase()));
        },

        // return the custom message for the given element name and validation method
        customMessage: function( name, method ) {
            var m = this.settings.messages[name];
            return m && (m.constructor === String ? m : m[method]);
        },

        // return the first defined argument, allowing empty strings
        findDefined: function() {
            for(var i = 0; i < arguments.length; i++) {
                if ( arguments[i] !== undefined ) {
                    return arguments[i];
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
                $.validator.messages[method],
                "<strong>Warning: No message defined for " + element.name + "</strong>"
            );
        },

        formatAndAdd: function( element, rule ) {
            var message = this.defaultMessage( element, rule.method ),
                theregex = /\$?\{(\d+)\}/g;
            if ( typeof message === "function" ) {
                message = message.call(this, rule.parameters, element);
            } else if (theregex.test(message)) {
                message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
            }
            this.errorList.push({
                message: message,
                element: element
            });

            this.errorMap[element.name] = message;
            this.submitted[element.name] = message;
        },

        addWrapper: function( toToggle ) {
            if ( this.settings.wrapper ) {
                toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
            }
            return toToggle;
        },

        defaultShowErrors: function() {
            var i, elements;
            for ( i = 0; this.errorList[i]; i++ ) {
                var error = this.errorList[i];
                if ( this.settings.highlight ) {
                    this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
                }
                this.showLabel( error.element, error.message );
            }
            if ( this.errorList.length ) {
                this.toShow = this.toShow.add( this.containers );
            }
            if ( this.settings.success ) {
                for ( i = 0; this.successList[i]; i++ ) {
                    this.showLabel( this.successList[i] );
                }
            }
            if ( this.settings.unhighlight ) {
                for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
                    this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
                }
            }
            this.toHide = this.toHide.not( this.toShow );
            this.hideErrors();
            this.addWrapper( this.toShow ).show();
        },

        validElements: function() {
            return this.currentElements.not(this.invalidElements());
        },

        invalidElements: function() {
            return $(this.errorList).map(function() {
                return this.element;
            });
        },

        showLabel: function( element, message ) {
            var label = this.errorsFor( element );
            if ( label.length ) {
                // refresh error/success class
                label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
                // replace message on existing label
                label.html(message);
            } else {
                // create label
                label = $("<" + this.settings.errorElement + ">")
                    .attr("for", this.idOrName(element))
                    .addClass(this.settings.errorClass)
                    .html(message || "");
                if ( this.settings.wrapper ) {
                    // make sure the element is visible, even in IE
                    // actually showing the wrapped element is handled elsewhere
                    label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                }
                if ( !this.labelContainer.append(label).length ) {
                    if ( this.settings.errorPlacement ) {
                        this.settings.errorPlacement(label, $(element) );
                    } else {
                        label.insertAfter(element);
                    }
                }
            }
            if ( !message && this.settings.success ) {
                label.text("");
                if ( typeof this.settings.success === "string" ) {
                    label.addClass( this.settings.success );
                } else {
                    this.settings.success( label, element );
                }
            }
            this.toShow = this.toShow.add(label);
        },

        errorsFor: function( element ) {
            var name = this.idOrName(element);
            return this.errors().filter(function() {
                return $(this).attr("for") === name;
            });
        },

        idOrName: function( element ) {
            return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
        },

        validationTargetFor: function( element ) {
            // if radio/checkbox, validate first element in group instead
            if ( this.checkable(element) ) {
                element = this.findByName( element.name ).not(this.settings.ignore)[0];
            }
            return element;
        },

        checkable: function( element ) {
            return (/radio|checkbox/i).test(element.type);
        },

        findByName: function( name ) {
            return $(this.currentForm).find("[name='" + name + "']");
        },

        getLength: function( value, element ) {
            switch( element.nodeName.toLowerCase() ) {
            case "select":
                return $("option:selected", element).length;
            case "input":
                if ( this.checkable( element) ) {
                    return this.findByName(element.name).filter(":checked").length;
                }
            }
            return value.length;
        },

        depend: function( param, element ) {
            return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
        },

        dependTypes: {
            "boolean": function( param, element ) {
                return param;
            },
            "string": function( param, element ) {
                return !!$(param, element.form).length;
            },
            "function": function( param, element ) {
                return param(element);
            }
        },

        optional: function( element ) {
            var val = this.elementValue(element);
            return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
        },

        startRequest: function( element ) {
            if ( !this.pending[element.name] ) {
                this.pendingRequest++;
                this.pending[element.name] = true;
            }
        },

        stopRequest: function( element, valid ) {
            this.pendingRequest--;
            // sometimes synchronization fails, make sure pendingRequest is never < 0
            if ( this.pendingRequest < 0 ) {
                this.pendingRequest = 0;
            }
            delete this.pending[element.name];
            if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
                $(this.currentForm).submit();
                this.formSubmitted = false;
            } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                $(this.currentForm).triggerHandler("invalid-form", [this]);
                this.formSubmitted = false;
            }
        },

        previousValue: function( element ) {
            return $.data(element, "previousValue") || $.data(element, "previousValue", {
                old: null,
                valid: true,
                message: this.defaultMessage( element, "remote" )
            });
        }

    },

    classRuleSettings: {
        required: {required: true},
        email: {email: true},
        url: {url: true},
        date: {date: true},
        dateISO: {dateISO: true},
        number: {number: true},
        digits: {digits: true},
        creditcard: {creditcard: true}
    },

    addClassRules: function( className, rules ) {
        if ( className.constructor === String ) {
            this.classRuleSettings[className] = rules;
        } else {
            $.extend(this.classRuleSettings, className);
        }
    },

    classRules: function( element ) {
        var rules = {};
        var classes = $(element).attr("class");
        if ( classes ) {
            $.each(classes.split(" "), function() {
                if ( this in $.validator.classRuleSettings ) {
                    $.extend(rules, $.validator.classRuleSettings[this]);
                }
            });
        }
        return rules;
    },

    attributeRules: function( element ) {
        var rules = {};
        var $element = $(element);
        var type = $element[0].getAttribute("type");

        for (var method in $.validator.methods) {
            var value;

            // support for <input required> in both html5 and older browsers
            if ( method === "required" ) {
                value = $element.get(0).getAttribute(method);
                // Some browsers return an empty string for the required attribute
                // and non-HTML5 browsers might have required="" markup
                if ( value === "" ) {
                    value = true;
                }
                // force non-HTML5 browsers to return bool
                value = !!value;
            } else {
                value = $element.attr(method);
            }

            // convert the value to a number for number inputs, and for text for backwards compability
            // allows type="date" and others to be compared as strings
            if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
                value = Number(value);
            }

            if ( value ) {
                rules[method] = value;
            } else if ( type === method && type !== 'range' ) {
                // exception: the jquery validate 'range' method
                // does not test for the html5 'range' type
                rules[method] = true;
            }
        }

        // maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
        if ( rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength) ) {
            delete rules.maxlength;
        }

        return rules;
    },

    dataRules: function( element ) {
        var method, value,
            rules = {}, $element = $(element);
        for (method in $.validator.methods) {
            value = $element.data("rule-" + method.toLowerCase());
            if ( value !== undefined ) {
                rules[method] = value;
            }
        }
        return rules;
    },

    staticRules: function( element ) {
        var rules = {};
        var validator = $.data(element.form, "validator");
        if ( validator.settings.rules ) {
            rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
        }
        return rules;
    },

    normalizeRules: function( rules, element ) {
        // handle dependency check
        $.each(rules, function( prop, val ) {
            // ignore rule when param is explicitly false, eg. required:false
            if ( val === false ) {
                delete rules[prop];
                return;
            }
            if ( val.param || val.depends ) {
                var keepRule = true;
                switch (typeof val.depends) {
                case "string":
                    keepRule = !!$(val.depends, element.form).length;
                    break;
                case "function":
                    keepRule = val.depends.call(element, element);
                    break;
                }
                if ( keepRule ) {
                    rules[prop] = val.param !== undefined ? val.param : true;
                } else {
                    delete rules[prop];
                }
            }
        });

        // evaluate parameters
        $.each(rules, function( rule, parameter ) {
            rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
        });

        // clean number parameters
        $.each(['minlength', 'maxlength'], function() {
            if ( rules[this] ) {
                rules[this] = Number(rules[this]);
            }
        });
        $.each(['rangelength', 'range'], function() {
            var parts;
            if ( rules[this] ) {
                if ( $.isArray(rules[this]) ) {
                    rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                } else if ( typeof rules[this] === "string" ) {
                    parts = rules[this].split(/[\s,]+/);
                    rules[this] = [Number(parts[0]), Number(parts[1])];
                }
            }
        });

        if ( $.validator.autoCreateRanges ) {
            // auto-create ranges
            if ( rules.min && rules.max ) {
                rules.range = [rules.min, rules.max];
                delete rules.min;
                delete rules.max;
            }
            if ( rules.minlength && rules.maxlength ) {
                rules.rangelength = [rules.minlength, rules.maxlength];
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
            $.each(data.split(/\s/), function() {
                transformed[this] = true;
            });
            data = transformed;
        }
        return data;
    },

    // http://docs.jquery.com/Plugins/Validation/Validator/addMethod
    addMethod: function( name, method, message ) {
        $.validator.methods[name] = method;
        $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
        if ( method.length < 3 ) {
            $.validator.addClassRules(name, $.validator.normalizeRule(name));
        }
    },

    methods: {

        // http://docs.jquery.com/Plugins/Validation/Methods/required
        required: function( value, element, param ) {
            // check if dependency is met
            if ( !this.depend(param, element) ) {
                return "dependency-mismatch";
            }
            if ( element.nodeName.toLowerCase() === "select" ) {
                // could be an array for select-multiple or a string, both are fine this way
                var val = $(element).val();
                return val && val.length > 0;
            }
            if ( this.checkable(element) ) {
                return this.getLength(value, element) > 0;
            }
            return $.trim(value).length > 0;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/email
        email: function( value, element ) {
            // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
            return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/url
        url: function( value, element ) {
            // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
            return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/date
        date: function( value, element ) {
            return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/dateISO
        dateISO: function( value, element ) {
            return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/number
        number: function( value, element ) {
            return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/digits
        digits: function( value, element ) {
            return this.optional(element) || /^\d+$/.test(value);
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/creditcard
        // based on http://en.wikipedia.org/wiki/Luhn
        creditcard: function( value, element ) {
            if ( this.optional(element) ) {
                return "dependency-mismatch";
            }
            // accept only spaces, digits and dashes
            if ( /[^0-9 \-]+/.test(value) ) {
                return false;
            }
            var nCheck = 0,
                nDigit = 0,
                bEven = false;

            value = value.replace(/\D/g, "");

            for (var n = value.length - 1; n >= 0; n--) {
                var cDigit = value.charAt(n);
                nDigit = parseInt(cDigit, 10);
                if ( bEven ) {
                    if ( (nDigit *= 2) > 9 ) {
                        nDigit -= 9;
                    }
                }
                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) === 0;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/minlength
        minlength: function( value, element, param ) {
            var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
            return this.optional(element) || length >= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/maxlength
        maxlength: function( value, element, param ) {
            var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
            return this.optional(element) || length <= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/rangelength
        rangelength: function( value, element, param ) {
            var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
            return this.optional(element) || ( length >= param[0] && length <= param[1] );
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/min
        min: function( value, element, param ) {
            return this.optional(element) || value >= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/max
        max: function( value, element, param ) {
            return this.optional(element) || value <= param;
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/range
        range: function( value, element, param ) {
            return this.optional(element) || ( value >= param[0] && value <= param[1] );
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/equalTo
        equalTo: function( value, element, param ) {
            // bind to the blur event of the target in order to revalidate whenever the target field is updated
            // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
            var target = $(param);
            if ( this.settings.onfocusout ) {
                target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    $(element).valid();
                });
            }
            return value === target.val();
        },

        // http://docs.jquery.com/Plugins/Validation/Methods/remote
        remote: function( value, element, param ) {
            if ( this.optional(element) ) {
                return "dependency-mismatch";
            }

            var previous = this.previousValue(element);
            if (!this.settings.messages[element.name] ) {
                this.settings.messages[element.name] = {};
            }
            previous.originalMessage = this.settings.messages[element.name].remote;
            this.settings.messages[element.name].remote = previous.message;

            param = typeof param === "string" && {url:param} || param;

            if ( previous.old === value ) {
                return previous.valid;
            }

            previous.old = value;
            var validator = this;
            this.startRequest(element);
            var data = {};
            data[element.name] = value;
            $.ajax($.extend(true, {
                url: param,
                mode: "abort",
                port: "validate" + element.name,
                dataType: "json",
                data: data,
                success: function( response ) {
                    validator.settings.messages[element.name].remote = previous.originalMessage;
                    var valid = response === true || response === "true";
                    if ( valid ) {
                        var submitted = validator.formSubmitted;
                        validator.prepareElement(element);
                        validator.formSubmitted = submitted;
                        validator.successList.push(element);
                        delete validator.invalid[element.name];
                        validator.showErrors();
                    } else {
                        var errors = {};
                        var message = response || validator.defaultMessage( element, "remote" );
                        errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                        validator.invalid[element.name] = true;
                        validator.showErrors(errors);
                    }
                    previous.valid = valid;
                    validator.stopRequest(element, valid);
                }
            }, param));
            return "pending";
        }

    }

});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

}( IGrow.$ ));

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
(function($) {
    var pendingRequests = {};
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
        var ajax = $.ajax;
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
}(IGrow.$));

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
(function($) {
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
}(IGrow.$));






