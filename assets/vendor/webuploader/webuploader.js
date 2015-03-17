/* IGrow WebUploader 1.0.0 */
/**
 * @fileOverview 让内部各个部件的代码可以用[amd](https://github.com/amdjs/amdjs-api/wiki/AMD)模块定义方式组织起来。
 *
 * AMD API 内部的简单不完全实现，请忽略。
 */
(function( root, factory ) {
    var modules = {},

        // 内部require, 简单不完全实现。
        // https://github.com/amdjs/amdjs-api/wiki/require
        _require = function( deps, callback ) {
            var args, len, i;

            // 如果deps不是数组，则直接返回指定module
            if ( typeof deps === 'string' ) {
                return getModule( deps );
            } else {
                args = [];
                for( len = deps.length, i = 0; i < len; i++ ) {
                    args.push( getModule( deps[ i ] ) );
                }

                return callback.apply( null, args );
            }
        },

        // 内部define，暂时不支持不指定id.
        _define = function( id, deps, factory ) {
            if ( arguments.length === 2 ) {
                factory = deps;
                deps = null;
            }

            _require( deps || [], function() {
                setModule( id, factory, arguments );
            });
        },

        // 设置module, 兼容CommonJs写法。
        setModule = function( id, factory, args ) {
            var module = {
                    exports: factory
                },
                returned;

            if ( typeof factory === 'function' ) {
                args.length || (args = [ _require, module.exports, module ]);
                returned = factory.apply( null, args );
                returned !== undefined && (module.exports = returned);
            }

            modules[ id ] = module.exports;
        },

        // 根据id获取module
        getModule = function( id ) {
            var module = modules[ id ] || root[ id ];

            if ( !module ) {
                throw new Error( '`' + id + '` is undefined' );
            }

            return module;
        },

        // 将所有modules，将路径ids装换成对象。
        exportsTo = function( obj ) {
            var key, host, parts, part, last, ucFirst;

            // make the first character upper case.
            ucFirst = function( str ) {
                return str && (str.charAt( 0 ).toUpperCase() + str.substr( 1 ));
            };

            for ( key in modules ) {
                host = obj;

                if ( !modules.hasOwnProperty( key ) ) {
                    continue;
                }

                parts = key.split('/');
                last = ucFirst( parts.pop() );

                while( (part = ucFirst( parts.shift() )) ) {
                    host[ part ] = host[ part ] || {};
                    host = host[ part ];
                }

                host[ last ] = modules[ key ];
            }
        },

        exports = factory( root, _define, _require ),
        origin;
    
    // exports every module.
    exportsTo( exports );

    // Browser globals case. Just assign the
    // result to a property on the global.
    origin = root.WebUploader;
    root.WebUploader = exports;
    root.WebUploader.noConflict = function() {
        root.WebUploader = origin;
    };
    
})( this, function( window, define, require ) {
    // 随机guid
    define('guid',[],function(){
        function S4() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        function guid(key) {
            var timeStamp = new Date().valueOf(),key = key || '';
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()+'-'+timeStamp+key);
        }

        return guid;
    });
    // 对字符串MD%加密
    define('hex_md5',[],function(){
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
    });
    /*  
    ===============================================================================
    Crc32 is a JavaScript function for computing the CRC32 of a string
    ...............................................................................

    Version: 1.2 - 2006/11 - http://noteslog.com/category/javascript/

    -------------------------------------------------------------------------------
    Copyright (c) 2006 Andrea Ercolino      
    http://www.opensource.org/licenses/mit-license.php
    ===============================================================================
    */
    define('crc32', [], function() {
        var strTable = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".split(' ');

        var table = new Array();
        for (var i = 0; i < strTable.length; ++i) {
            table[i] = parseInt("0x" + strTable[i]);
        }

        /* Number */
        var crc32 = function( /* String */ str, /* Number */ crc) {
            if (crc == window.undefined) crc = 0;
            var n = 0; //a number between 0 and 255
            var x = 0; //an hex number
            crc = crc ^ (-1);
            for (var i = 0, iTop = str.length; i < iTop; i++) {
                n = (crc ^ str.charCodeAt(i)) & 0xFF;
                crc = (crc >>> 8) ^ table[n];
            }
            var number = crc ^ (-1);
            if (number < 0) {
                number = 0xFFFFFFFF + number + 1;
            }
            return number;

        };

        return crc32;
    });

    /**
     * @fileOverview jQuery or Zepto
     */
    define('dollar',[],function() {
        return window.jQuery || window.Zepto;
    });

    /**
     * @fileOverview 使用jQuery的Promise
     */
    define('promise-third',[
        'dollar'
    ], function( $ ) {
        return {
            Deferred: $.Deferred,
            when: $.when,
    
            isPromise: function( anything ) {
                return anything && typeof anything.then === 'function';
            }
        };
    });
    /**
     * @fileOverview Promise/A+
     */
    define('promise',[
        'promise-third'
    ], function( _ ) {
        return _;
    });

    /**
     * @fileOverview 基础类方法。
     */
    
    /**
     * Web Uploader内部类的详细说明，以下提及的功能类，都可以在`WebUploader`这个变量中访问到。
     *
     * As you know, Web Uploader的每个文件都是用过[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)规范中的`define`组织起来的, 每个Module都会有个module id.
     * 默认module id该文件的路径，而此路径将会转化成名字空间存放在WebUploader中。如：
     *
     * * module `base`：WebUploader.Base
     * * module `file`: WebUploader.File
     * * module `lib/dnd`: WebUploader.Lib.Dnd
     * * module `runtime/html5/dnd`: WebUploader.Runtime.Html5.Dnd
     *
     *
     * 以下文档将可能省略`WebUploader`前缀。
     * @module WebUploader
     * @title WebUploader API文档
     */
    define('base',[
        'dollar',
        'promise'
    ], function( $, promise ) {
    
        var noop = function() {},
            call = Function.call;
    
        // http://jsperf.com/uncurrythis
        // 反科里化
        function uncurryThis( fn ) {
            return function() {
                return call.apply( fn, arguments );
            };
        }
    
        function bindFn( fn, context ) {
            return function() {
                return fn.apply( context, arguments );
            };
        }
    
        function createObject( proto ) {
            var f;
    
            if ( Object.create ) {
                return Object.create( proto );
            } else {
                f = function() {};
                f.prototype = proto;
                return new f();
            }
        }

        function isSupportHtml5() {
            var reader = {};

            if(window.FileReader) {
                reader = new FileReader();
            }

            return window.FormData && window.FileReader && reader.readAsBinaryString && window.XMLHttpRequest;
        }
    
    
        /**
         * 基础类，提供一些简单常用的方法。
         * @class Base
         */
        return {
    
            /**
             * @property {String} version 当前版本号。
             */
            version: '1.0.0',
    
            /**
             * @property {jQuery|Zepto} $ 引用依赖的jQuery或者Zepto对象。
             */
            $: $,
    
            Deferred: promise.Deferred,
    
            isPromise: promise.isPromise,
    
            when: promise.when,
    
            /**
             * @description  简单的浏览器检查结果。
             *
             * * `webkit`  webkit版本号，如果浏览器为非webkit内核，此属性为`undefined`。
             * * `chrome`  chrome浏览器版本号，如果浏览器为chrome，此属性为`undefined`。
             * * `ie`  ie浏览器版本号，如果浏览器为非ie，此属性为`undefined`。**暂不支持ie10+**
             * * `firefox`  firefox浏览器版本号，如果浏览器为非firefox，此属性为`undefined`。
             * * `safari`  safari浏览器版本号，如果浏览器为非safari，此属性为`undefined`。
             * * `opera`  opera浏览器版本号，如果浏览器为非opera，此属性为`undefined`。
             *
             * @property {Object} [browser]
             */
            browser: (function( ua ) {
                var ret = {},
                    webkit = ua.match( /WebKit\/([\d.]+)/ ),
                    chrome = ua.match( /Chrome\/([\d.]+)/ ) ||
                        ua.match( /CriOS\/([\d.]+)/ ),
    
                    ie = ua.match( /MSIE\s([\d.]+)/ ),
                    firefox = ua.match( /Firefox\/([\d.]+)/ ),
                    safari = ua.match( /Safari\/([\d.]+)/ ),
                    opera = ua.match( /OPR\/([\d.]+)/ );
    
                webkit && (ret.webkit = parseFloat( webkit[ 1 ] ));
                chrome && (ret.chrome = parseFloat( chrome[ 1 ] ));
                ie && (ret.ie = parseFloat( ie[ 1 ] ));
                firefox && (ret.firefox = parseFloat( firefox[ 1 ] ));
                safari && (ret.safari = parseFloat( safari[ 1 ] ));
                opera && (ret.opera = parseFloat( opera[ 1 ] ));
    
                return ret;
            })( navigator.userAgent ),
    
            /**
             * @description  操作系统检查结果。
             *
             * * `android`  如果在android浏览器环境下，此值为对应的android版本号，否则为`undefined`。
             * * `ios` 如果在ios浏览器环境下，此值为对应的ios版本号，否则为`undefined`。
             * @property {Object} [os]
             */
            os: (function( ua ) {
                var ret = {},
    
                    // osx = !!ua.match( /\(Macintosh\; Intel / ),
                    android = ua.match( /(?:Android);?[\s\/]+([\d.]+)?/ ),
                    ios = ua.match( /(?:iPad|iPod|iPhone).*OS\s([\d_]+)/ );
    
                // osx && (ret.osx = true);
                android && (ret.android = parseFloat( android[ 1 ] ));
                ios && (ret.ios = parseFloat( ios[ 1 ].replace( /_/g, '.' ) ));
    
                return ret;
            })( navigator.userAgent ),
    
            /**
             * 实现类与类之间的继承。
             * @method inherits
             * @grammar Base.inherits( super ) => child
             * @grammar Base.inherits( super, protos ) => child
             * @grammar Base.inherits( super, protos, statics ) => child
             * @param  {Class} super 父类
             * @param  {Object | Function} [protos] 子类或者对象。如果对象中包含constructor，子类将是用此属性值。
             * @param  {Function} [protos.constructor] 子类构造器，不指定的话将创建个临时的直接执行父类构造器的方法。
             * @param  {Object} [statics] 静态属性或方法。
             * @return {Class} 返回子类。
             * @example
             * function Person() {
             *     console.log( 'Super' );
             * }
             * Person.prototype.hello = function() {
             *     console.log( 'hello' );
             * };
             *
             * var Manager = Base.inherits( Person, {
             *     world: function() {
             *         console.log( 'World' );
             *     }
             * });
             *
             * // 因为没有指定构造器，父类的构造器将会执行。
             * var instance = new Manager();    // => Super
             *
             * // 继承子父类的方法
             * instance.hello();    // => hello
             * instance.world();    // => World
             *
             * // 子类的__super__属性指向父类
             * console.log( Manager.__super__ === Person );    // => true
             */
            inherits: function( Super, protos, staticProtos ) {
                var child;
    
                if ( typeof protos === 'function' ) {
                    child = protos;
                    protos = null;
                } else if ( protos && protos.hasOwnProperty('constructor') ) {
                    child = protos.constructor;
                } else {
                    child = function() {
                        return Super.apply( this, arguments );
                    };
                }
    
                // 复制静态方法
                $.extend( true, child, Super, staticProtos || {} );
    
                /* jshint camelcase: false */
    
                // 让子类的__super__属性指向父类。
                child.__super__ = Super.prototype;
    
                // 构建原型，添加原型方法或属性。
                // 暂时用Object.create实现。
                child.prototype = createObject( Super.prototype );
                protos && $.extend( true, child.prototype, protos );
    
                return child;
            },
    
            /**
             * 一个不做任何事情的方法。可以用来赋值给默认的callback.
             * @method noop
             */
            noop: noop,
    
            /**
             * 返回一个新的方法，此方法将已指定的`context`来执行。
             * @grammar Base.bindFn( fn, context ) => Function
             * @method bindFn
             * @example
             * var doSomething = function() {
             *         console.log( this.name );
             *     },
             *     obj = {
             *         name: 'Object Name'
             *     },
             *     aliasFn = Base.bind( doSomething, obj );
             *
             *  aliasFn();    // => Object Name
             *
             */
            bindFn: bindFn,
    
            /**
             * 引用Console.log如果存在的话，否则引用一个[空函数loop](#WebUploader:Base.log)。
             * @grammar Base.log( args... ) => undefined
             * @method log
             */
            log: (function() {
                if ( window.console ) {
                    return bindFn( console.log, console );
                }
                return noop;
            })(),
    
            nextTick: (function() {
    
                return function( cb ) {
                    setTimeout( cb, 1 );
                };
    
                // @bug 当浏览器不在当前窗口时就停了。
                // var next = window.requestAnimationFrame ||
                //     window.webkitRequestAnimationFrame ||
                //     window.mozRequestAnimationFrame ||
                //     function( cb ) {
                //         window.setTimeout( cb, 1000 / 60 );
                //     };
    
                // // fix: Uncaught TypeError: Illegal invocation
                // return bindFn( next, window );
            })(),
    
            /**
             * 被[uncurrythis](http://www.2ality.com/2011/11/uncurrying-this.html)的数组slice方法。
             * 将用来将非数组对象转化成数组对象。
             * @grammar Base.slice( target, start[, end] ) => Array
             * @method slice
             * @example
             * function doSomthing() {
             *     var args = Base.slice( arguments, 1 );
             *     console.log( args );
             * }
             *
             * doSomthing( 'ignored', 'arg2', 'arg3' );    // => Array ["arg2", "arg3"]
             */
            slice: uncurryThis( [].slice ),
    
            /**
             * 生成唯一的ID
             * @method guid
             * @grammar Base.guid() => String
             * @grammar Base.guid( prefx ) => String
             */
            guid: (function() {
                var counter = 0;
    
                return function( prefix ) {
                    var guid = (+new Date()).toString( 32 ),
                        i = 0;
    
                    for ( ; i < 5; i++ ) {
                        guid += Math.floor( Math.random() * 65535 ).toString( 32 );
                    }
    
                    return (prefix || 'wu_') + guid + (counter++).toString( 32 );
                };
            })(),
            parseJson: function( str ) {
                var json;
    
                try {
                    json = JSON.parse( str );
                } catch ( ex ) {
                    json = {};
                }
    
                return json;
            },
    
            /**
             * 格式化文件大小, 输出成带单位的字符串
             * @method formatSize
             * @grammar Base.formatSize( size ) => String
             * @grammar Base.formatSize( size, pointLength ) => String
             * @grammar Base.formatSize( size, pointLength, units ) => String
             * @param {Number} size 文件大小
             * @param {Number} [pointLength=2] 精确到的小数点数。
             * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
             * @example
             * console.log( Base.formatSize( 100 ) );    // => 100B
             * console.log( Base.formatSize( 1024 ) );    // => 1.00K
             * console.log( Base.formatSize( 1024, 0 ) );    // => 1K
             * console.log( Base.formatSize( 1024 * 1024 ) );    // => 1.00M
             * console.log( Base.formatSize( 1024 * 1024 * 1024 ) );    // => 1.00G
             * console.log( Base.formatSize( 1024 * 1024 * 1024, 0, ['B', 'KB', 'MB'] ) );    // => 1024MB
             */
            formatSize: function( size, pointLength, units ) {
                var unit;
    
                units = units || [ 'B', 'K', 'M', 'G', 'TB' ];
    
                while ( (unit = units.shift()) && size > 1024 ) {
                    size = size / 1024;
                }
    
                return (unit === 'B' ? size : size.toFixed( pointLength || 2 )) +
                        unit;
            },
            isSupportHtml5: isSupportHtml5
        };
    });
    
    /**
     * 事件处理类，可以独立使用，也可以扩展给对象使用。
     * @fileOverview Mediator
     */
    define('mediator',[
        'base'
    ], function( Base ) {
        var $ = Base.$,
            slice = [].slice,
            separator = /\s+/,
            protos;
    
        // 根据条件过滤出事件handlers.
        function findHandlers( arr, name, callback, context ) {
            return $.grep( arr, function( handler ) {
                return handler &&
                        (!name || handler.e === name) &&
                        (!callback || handler.cb === callback ||
                        handler.cb._cb === callback) &&
                        (!context || handler.ctx === context);
            });
        }
    
        function eachEvent( events, callback, iterator ) {
            // 不支持对象，只支持多个event用空格隔开
            $.each( (events || '').split( separator ), function( _, key ) {
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
                    $.each( findHandlers( events, name, cb, ctx ), function() {
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
        return $.extend({
    
            /**
             * 可以通过这个接口，使任何对象具备事件功能。
             * @method installTo
             * @param  {Object} obj 需要具备事件行为的对象。
             * @return {Object} 返回obj.
             */
            installTo: function( obj ) {
                return $.extend( obj, protos );
            }
    
        }, protos );
    });
    /**
     * @fileOverview 文件属性封装 WUFile
     */
    define('file',[
        'base',
        'mediator'
    ], function( Base, Mediator ) {
    
        var $ = Base.$,
            idPrefix = 'WU_FILE_',
            idSuffix = 0,
            rExt = /\.([^.]+)$/,
            statusMap = {};
    
        function gid() {
            return idPrefix + idSuffix++;
        }

    
        /**
         * 文件类
         * @class File
         * @constructor 构造函数
         * @grammar new File( source ) => File
         * @param {Lib.File} source [lib.File](#Lib.File)实例, 此source对象是带有Runtime信息的。
         */
        function WUFile( source ) {
            var me = this;
            /**
             * 文件名，包括扩展名（后缀）
             * @property name
             * @type {string}
             */
            this.name = source.name || source.fileName || 'Untitled';
    
            /**
             * 文件体积（字节）
             * @property size
             * @type {uint}
             * @default 0
             */
            this.size = source.size || source.fileSize || 0;
    
            /**
             * 文件MIMETYPE类型，与文件类型的对应关系请参考[http://t.cn/z8ZnFny](http://t.cn/z8ZnFny)
             * @property type
             * @type {string}
             * @default 'application'
             */
            this.type = source.type || 'application';
    
            /**
             * 文件最后修改日期
             * @property lastModifiedDate
             * @type {int}
             * @default 当前时间戳
             */
            this.lastModifiedDate = source.lastModifiedDate || (new Date() * 1);
    
            /**
             * 文件ID，每个对象具有唯一ID，与文件名无关
             * @property id
             * @type {string}
             */
            this.id = gid();
    
            /**
             * 文件扩展名，通过文件名获取，例如test.png的扩展名为png
             * @property ext
             * @type {string}
             */
            this.ext = rExt.exec( this.name ) ? RegExp.$1 : '';
    
    
            /**
             * 状态文字说明。在不同的status语境下有不同的用途。
             * @property statusText
             * @type {string}
             */
            this.statusText = '';
    
            // 存储文件状态，防止通过属性直接修改
            statusMap[ this.id ] = WUFile.Status.INITED;
    
            this.source = source;
            this.loaded = 0;
    
            this.on( 'error', function( msg ) {
                this.setStatus( WUFile.Status.ERROR, msg );
            });

            this.slice = function(start, end){
                var blob = me.source,
                    slice = blob.slice || blob.webkitSlice || blob.mozSlice;

                return slice.call( blob, start, end );
            };
        }
    
        $.extend( WUFile.prototype, {
    
            /**
             * 设置状态，状态变化时会触发`change`事件。
             * @method setStatus
             * @grammar setStatus( status[, statusText] );
             * @param {File.Status|String} status [文件状态值](#WebUploader:File:File.Status)
             * @param {String} [statusText=''] 状态说明，常在error时使用，用http, abort,server等来标记是由于什么原因导致文件错误。
             */
            setStatus: function( status, text ) {
    
                var prevStatus = statusMap[ this.id ];
    
                typeof text !== 'undefined' && (this.statusText = text);
    
                if ( status !== prevStatus ) {
                    statusMap[ this.id ] = status;
                    /**
                     * 文件状态变化
                     * @event statuschange
                     */
                    this.trigger( 'statuschange', status, prevStatus );
                }
    
            },
    
            /**
             * 获取文件状态
             * @return {File.Status}
             * @example
                     文件状态具体包括以下几种类型：
                     {
                         // 初始化
                        INITED:     0,
                        // 已入队列
                        QUEUED:     1,
                        // 正在上传
                        PROGRESS:     2,
                        // 上传出错
                        ERROR:         3,
                        // 上传成功
                        COMPLETE:     4,
                        // 上传取消
                        CANCELLED:     5
                    }
             */
            getStatus: function() {
                return statusMap[ this.id ];
            },
    
            /**
             * 获取文件原始信息。
             * @return {*}
             */
            getSource: function() {
                return this.source;
            },
    
            destory: function() {
                delete statusMap[ this.id ];
            }
        });
    
        Mediator.installTo( WUFile.prototype );
    
        /**
         * 文件状态值，具体包括以下几种类型：
         * * `inited` 初始状态
         * * `queued` 已经进入队列, 等待上传
         * * `progress` 上传中
         * * `complete` 上传完成。
         * * `error` 上传出错，可重试
         * * `interrupt` 上传中断，可续传。
         * * `invalid` 文件不合格，不能重试上传。会自动从队列中移除。
         * * `cancelled` 文件被移除。
         * @property {Object} Status
         * @namespace File
         * @class File
         * @static
         */
        WUFile.Status = {
            INITED:     'inited',    // 初始状态
            QUEUED:     'queued',    // 已经进入队列, 等待上传
            PROGRESS:   'progress',    // 上传中
            ERROR:      'error',    // 上传出错，可重试
            COMPLETE:   'complete',    // 上传完成。
            CANCELLED:  'cancelled',    // 上传取消。
            INTERRUPT:  'interrupt',    // 上传中断，可续传。
            INVALID:    'invalid'    // 文件不合格，不能重试上传。
        };
    
        return WUFile;
    });
    /**
     * @fileOverview 文件选择器
     */
    define('filepicker',[
        'base',
        'file',
        'mediator'
    ], function( Base, File, Mediator ) {
    
        var $ = Base.$;
    
        function FilePicker( opts ) {
            var me = this,
                opts = this.options = $.extend({}, FilePicker.options, opts ),
                owner = opts.owner,
                container = $( document.getElementById(opts.id) ),
                shimContainer = $( document.createElement('div') ),
                label = $( document.createElement('label') ),
                input = $( document.createElement('input') ),
                arr, i, len, mouseHandler;
        
            // 若已经绑定过 先删除
            container.find('.webuploader-shim-container').remove();
            container.css('position', 'relative');
            if ( !container.length ) {
                throw new Error('按钮指定错误');
            }
            
            shimContainer.addClass('webuploader-shim-container');
            mouseHandler = function( e ) {
                owner.trigger( e.type );
            };
            this.container = container;
            this.owner = owner;
            input.attr( 'type', 'file' );
            input.attr( 'name', opts.name );
            input.addClass('webuploader-element-invisible');

            label.on( 'click', function() {
                input.trigger('click');
            });

            label.css({
                opacity: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                cursor: 'pointer',
                background: '#ffffff'
            });
            label.on( 'mouseenter mouseleave', mouseHandler );

            shimContainer.css({
                width:container.outerWidth(),
                height:container.outerHeight(),
                position:'absolute',
                left:0,
                top:0
            });
    
            if ( opts.multiple ) {
                input.attr( 'multiple', 'multiple' );
            }
            // @todo Firefox不支持单独指定后缀
            if ( opts.accept && opts.accept.length > 0 ) {
                arr = [];

                for ( i = 0, len = opts.accept.length; i < len; i++ ) {
                    arr.push( opts.accept[ i ].mimeTypes );
                }

                input.attr( 'accept', arr.join(',') );
            }

            input.on( 'change', function( e ) {
                var fn = arguments.callee,
                    clone,files;

                files = e.target.files;
  
                // reset input
                clone = this.cloneNode( true );
                this.parentNode.replaceChild( clone, this );

                input.off();
                input = $( clone ).on( 'change', fn ).on( 'mouseenter mouseleave', mouseHandler );

                if(files){
                    me.trigger('select',files);
                }
                
            });

            shimContainer.append( input );
            shimContainer.append( label );
            container.append(shimContainer);
  
        }
    
        FilePicker.options = {
            button: null,
            container: null,
            label: null,
            multiple: true,
            accept: null,
            name: 'file'
        };
    
        FilePicker.prototype = {
            constructor: FilePicker,
    
            init: function() {
                var me = this;

                setTimeout(function() {
                    me.trigger('ready');
                }, 1 );
            },
            refresh: function() {
               
            },
            enable: function() {
                var opts = this.options,
                    container = $( document.getElementById(opts.id) );

                container.find('.webuploader-shim-container').css('top','0');
                container.removeClass('webuploader-pick-disable');
            },
            disable: function() {
                var opts = this.options,
                    container = $( document.getElementById(opts.id) );

                container.find('.webuploader-shim-container').css('top','-999999px');
                container.addClass('webuploader-pick-disable');
            },
            destroy: function() {
            
            }

        };
        
        Mediator.installTo( FilePicker.prototype );

        return FilePicker;
    });
    
    /*
        iframe 上传组件
     */
    define('iframeuploader',[
        'base',
        'mediator'
    ], function( Base, Mediator ) {
        var $ = Base.$,
            log = Base.log;


        function createXhr() {
            var request = null;
            try {
                request = new XMLHttpRequest();
            } 
            catch (trymicrosoft) {
                try {
                  request = new ActiveXObject("Msxml2.XMLHTTP");
                } 
                catch (othermicrosoft) {
                    try {
                        request = new ActiveXObject("Microsoft.XMLHTTP");
                    } 
                    catch (failed) {
                        request = false;
                    }
                }
            }

            return request;
        }
        //回调函数唯一的id 自增
        var funcid = 1;
        
        //上传错误类型
        var uploadError = {
            'Not accept, Bucket not exists' : '不接受请求,空间不存在',
            'Authorize has expired' : '不接受请求,上传授权已过期',
            'Not accept, Miss signature' : '不接受请求,缺少签名',
            'Not accept, Signature error' : '签名错误',
            'Not accept, POST URI error' : '不接受请求',
            'Not accept, Bucket disabled' : '不接受请求,空间被禁用',
            'Not accept, Form API disabled' : '不接受请求,表单 API 功能未打开',
            'Not accept, No file data' : '不接受请求,没有上传文件数据',
            'Not accept, File too large' : '不接受请求,上传文件过大 ',
            'Not accept, File too small' : '不接受请求,上传文件过小 ',
            'Not accept, File type Error' : '不接受请求,上传文件类型不允许',
            'Not accept, Content­md5 error' : '不接受请求,上传文件的内容 md5 校验错误',
            'Not accept, Not a image file' : '不接受请求,上传的不是图片文件',
            'Not accept, Image width too small' : '不接受请求,上传的图片宽度过小 ',
            'Not accept, Image width too large' : '不接受请求,上传的图片宽度过大 ',
            'Not accept, Image height too small' : '不接受请求,上传的图片高度过小',
            'Not accept, Image height too large' : '不接受请求,上传的图片高度过大 ',
            'Not accept, Data too long for ext-param' : ' 额外参数内容过长',
            'Image Rotate Invalid Parameters' : '图片旋转参数错误',
            'Image Crop Invalid Parameters' : '图片裁剪参数错误',
            'System Error ... Retry again' : '系统错误,请再尝试'

        };
        
        var iframeTpl = '<iframe src="" frameborder="0" name="uploaderIframe" id="uploaderIframe" style="position:absolute;left:-99999;top:-999999;"></iframe>';
       
        function IframeUploader(options){
            var opts = options || {};

            this.alert = opts.alert || function(message) { alert(message); };
            this.init(opts);

        }

        IframeUploader.options = {
            server:'/api/1.1b/file/upload/full/upload'
        };

        IframeUploader.prototype = {
            constructor:IframeUploader,
            
            init : function(opts){
                var self = this;

                if ( $.isPlainObject( opts.accept ) ) {
                    opts.accept = [ opts.accept ];

                    var arr = [];
    
                    for ( var i = 0, len = opts.accept.length; i < len; i++ ) {
                        var item = opts.accept[ i ].extensions;
                        item && arr.push( item );
                    }
    
                    if ( arr.length ) {
                        accept = '\\.' + arr.join(',')
                                .replace( /,/g, '$|\\.' )
                                .replace( /\*/g, '.*' ) + '$';
                    }
               
                    this.accept = new RegExp( accept, 'i' );
                }
                //继承参数
                this.opts = $.extend({},IframeUploader.options,opts);
                this.success = opts.success ?opts.success:this.success;
                this.fail = opts.fail ?opts.fail:this.fail;
                this.iframeName = 'uploaderIframe';
                this.uuid = (funcid++);
               
                this._formData = {
                    returnurl:'http://'+location.host+'/api/1.1b/file/upyun/form/uploadcallback_'+this.uuid
                };
                this.createForm();
                this.createCallback();
                this.createIframe();
                
            },
            parseJson: function( str ) {
                var json;
    
                try {
                    json = JSON.parse( str );
                } catch ( ex ) {
                    json = {};
                }
    
                return json;
            },
            addURLParam:function(url,name,value){
                url += (url.indexOf('?') == -1) ?'?':'&';
                url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
                return url;
            },
            //上传
            upload:function(){
                var self = this,
                    opts = this.opts,
                    fileField = self.fileField,
                    filePath = fileField.value,
                    container = this.container,
                    token = opts.token,
                    data = token.data || {},
                    formData = this._formData,
                    file,
                    rExt = /\.\w+$/,
                    url = 'http://'+location.host+'/api/1.1b/file/upload/token/get';

                
                //判断文件是否为空
                if(!filePath){
                    return;
                }
                file = self.file = this.getFile(filePath);
                if( this.accept && rExt.exec( file.name ) && !this.accept.test( file.name ) ) {
                    console.warn('类型不匹配');
                    return;
                }

                //上传前处理函数
                opts.beforeStart && opts.beforeStart();
                
                for(var key in data){
                    url = self.addURLParam(url,key,data[key]);
                };
                url = self.addURLParam(url,'from',location.host);
                var xhr = createXhr();
                var onload = function(){
                    var response = xhr.responseText,
                        result = self.parseJson(response),
                        data = result.data || {},
                        tasktoken = data.token;

                    formData['tasktoken'] = tasktoken;
            
                    self.createHiddenField();
                    
                    self.form.submit();
                };

                xhr.onerror = function(){
                    self.fail({message:'获取token失败'});
                };
                xhr.onreadystatechange = function(){
                    if ( xhr.readyState !== 4 ) {
                        return;
                    }

                    if( xhr.status == 200 ){
                        onload();
                    }else {
                        console.warn('iframe 获取token失败');
                        self.fail({message:'获取token失败'});
                    }
                };
       

                xhr.open('GET',url,true),
                xhr.send(null);

                
                
            },
            //解析错误信息
            parseError:function(error){
                var error = error || {},
                    message = error.message,
                    result = '';

                error.message = message = message.replace(/\+/g," ");
                error.message = message = decodeURIComponent(message);
                
                for(var msg in uploadError){
                    if(msg == message){
                        error.message = uploadError[msg];
                        break;
                    }
                }
                error.message = error.message.replace('Not accept, File type Error (Only Accept','文件类型不支持，(仅支持:');

                return error;
            },
            emptyFileField:function(){
                var self = this;
                
                self.fileField.value = '';
            },
            createHiddenField:function(){
                var formData = this._formData, $form = $( this.form ), server = this.opts.server;

                $form.find('.iframeuploader-hidden-field').remove();
                for(var key in formData) {
                    //server = this.addURLParam(server,key,formData[key]);

                    $form.append('<input type="hidden" name="'+key+'" value="'+formData[key]+'" class="iframeuploader-hidden-field">');
                };
               
                //$form.attr('action',server);
            },
            createForm:function(){
                var self = this,
                    opts = this.opts,
                    pick = opts.pick,
                    pickID = pick.id,
                    uuid = this.uuid,
                    formData = this._formData,
                    $container = $('<div class="webuploader-iframe-container"></div>'),
                    $form = '<form action="" name="iframeuploaderForm" enctype="multipart/form-data" method="post"></form>',
                    $file = $('<input type="file" name="file" class="webuploader-iframe-file">'),
                    containerID = 'webuploader-container-'+uuid,
                    $parent = $( '#'+pickID ),
                    parent = $parent[0],
                    parentForm,
                    findClosestForm = function(parent) {

                        while( parent.parentNode ) {
                            var tagName = parent.tagName.toLowerCase();
                            if('body' === tagName){
                                return null;
                            }
                            if('form' === tagName){
                                return parent;
                            }
                            parent = parent.parentNode;
                        }

                        return null;
                    };

                // 先删除原先的绑定
                $parent.find('.webuploader-iframe-container').remove();

                $container.attr('id', containerID);
                $parent.append( $container );

                this.container = $( document.getElementById(containerID) );

                // 先判断父级有无form
                parentForm = findClosestForm(parent);
                // 若父级存在form
                if(parentForm) {
                    this.form = parentForm;
                    this.container.append( $file );
                    
                }else {
                    this.container.append( $form );
                    this.form = this.container.find('form')[0];
                    $( this.form ).append( $file );

                }
                this.fileField = this.container.find('input[name="file"]')[0];

                this.readyForm();

                if ( opts.accept && opts.accept.length > 0 ) {
                    var arr = [];

                    for ( var i = 0, len = opts.accept.length; i < len; i++ ) {
                        arr.push( opts.accept[ i ].mimeTypes );
                    }

                    $(this.fileField).attr( 'accept', arr.join(',') );
                }
                
                $(this.fileField).bind('change',function() {
                    var file = self.getFile(this.value),
                        form = self.form;

                    if(file) {
                        
                        formData['name'] = file.name;
                        self.opts.auto && self.upload();
                    }
                        
                });

            },
            getFile:function(filePath) {
                var filePath = filePath || '',
                    name = this.getFileName(filePath),
                    ext = this.getFileExt(name);

                if( filePath ) {
                    return { name:name ,ext:ext };
                }else {
                    return null;
                }
            },
            getFileExt:function(name) {
                var name = name || '',arr = name.split('.');

                if( arr[1] ) {
                    return arr[1].toLowerCase();
                } else {
                    return '';
                }

            },
            getFileName:function(filePath) {
                var filePath = filePath || '',
                    index = filePath.lastIndexOf('\\'),
                    name;

                if( !filePath ) {
                    return '';
                }
                if( index>-1 ) {
                    name = filePath.substring( index + 1 );
                }else {
                    name = filePath;
                }

                return name;
            },
            //每个文件域 对应的回调
            createCallback:function(){
                var self = this,uuid = self.uuid;

                window['upload_callback_' + uuid] = function( result ) {
                    var error,file = self.file;
                    //console.log('upload_callback_',file)
                    if(result.code == 0) {
                        // 文件路径
                        self.emptyFileField();
                        self.success && self.success.call(self,file,result);
                    }else {
                        error = self.parseError(result);
                        self.fail && self.fail.call(self,file,error);
                    }
                        

                };
            },
            createIframe:function(){
                var self = this,
                    iframe,iframeName = self.iframeName;

                if( !document.getElementById(iframeName) ) {
                    iframe = document.createElement('iframe');
                    iframe.name = iframe.id = iframeName;
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);  
                    
                }
                    
            },
            readyForm:function(){
                var opts = this.opts;
                this.form.action = opts.server;
                this.form.encoding = 'multipart/form-data';//IE6,7
                this.form.setAttribute('enctype','multipart/form-data');
                this.form.setAttribute('method','post');
                this.form.setAttribute('target',this.iframeName);
            },
            changeToken:function(data) {
                var token = this.opts.token || {};

                this.opts.token = data;
            },
            fail:function(error){
                var error = error || {}, message = error.message || '';

                alert(error.message);
            }
            

        };

        return IframeUploader;

    });
    /**
     * @fileOverview Uploader上传类
     */
    define('uploader',[
        'base',
        'mediator',
        'iframeuploader'
    ], function( Base, Mediator, IframeUploader ) {
    
        var $ = Base.$,
            log = Base.log;
    
        /**
         * 上传入口类。
         * @class Uploader
         * @constructor
         * @grammar new Uploader( opts ) => Uploader
         * @example
         * var uploader = WebUploader.Uploader({
         *
         *     // 开起分片上传。
         *     chunked: true
         * });
         */
        function Uploader( opts ) {
            if ( $.isPlainObject( opts.accept ) ) {
                opts.accept = [ opts.accept ];
            }

            this.opts = this.options = $.extend( true, {}, Uploader.options, opts );
            // 弹出框
            this.alert = opts.alert || function( msg ) { window.alert( msg ); };

            if( opts.beforeStart && typeof opts.beforeStart === 'function' ) {
                
                this.on('startUpload', function() {
                    opts.beforeStart.call(this);
                });
            }
            if( opts.progress && typeof opts.progress === 'function' ) {
                this.on('uploadProgress', function( file, percentage ) {
                    opts.progress.call(this,file,percentage);
                });
            }
            if( opts.success && typeof opts.success === 'function' ) {
                this.on('uploadSuccess', function( file, ret ) {
                    opts.success.call(this,file ,ret.data);
                });
            }
            if( opts.fail && typeof opts.fail === 'function' ) {
                this.on('uploadError', function( file, ret ) {
                    opts.fail.call(this,file, ret);
                });
            }

            this._init( this.options );
        }
    
        // default Options
        // widgets中有相应扩展
        Uploader.options = {};
        Mediator.installTo( Uploader.prototype );
    
        // 批量添加纯命令式方法。
        $.each({
            upload: 'start-upload',
            stop: 'stop-upload',
            getFile: 'get-file',
            getFiles: 'get-files',
            addFile: 'add-file',
            addFiles: 'add-file',
            sort: 'sort-files',
            removeFile: 'remove-file',
            skipFile: 'skip-file',
            retry: 'retry',
            isInProgress: 'is-in-progress',
            makeThumb: 'make-thumb',
            getDimension: 'get-dimension',
            addButton: 'add-btn',
            getRuntimeType: 'get-runtime-type',
            refresh: 'refresh',
            disable: 'disable',
            enable: 'enable',
            getInfo:'getInfo',
            carryon:'carryon',
            reset: 'reset'
        }, function( fn, command ) {
            Uploader.prototype[ fn ] = function() {
                return this.request( command, arguments );
            };
        });
    
        $.extend( Uploader.prototype, {
            state: 'pending',
    
            _init: function( opts ) {
                var me = this;
                
                me.request( 'init', opts, function() {
                    me.state = 'ready';
                    me.trigger('ready');
                });
            },
            changeToken:function(data) {
                var token = this.opts.token || {};

                this.opts.token = data;
            },
            option: function( key, val ) {
                var opts = this.options;
    
                // setter
                if ( arguments.length > 1 ) {
    
                    if ( $.isPlainObject( val ) &&
                            $.isPlainObject( opts[ key ] ) ) {
                        $.extend( opts[ key ], val );
                    } else {
                        opts[ key ] = val;
                    }
    
                } else {    // getter
                    return key ? opts[ key ] : opts;
                }
            },
    
            /**
             * 获取文件统计信息。返回一个包含一下信息的对象。
             * * `successNum` 上传成功的文件数
             * * `uploadFailNum` 上传失败的文件数
             * * `cancelNum` 被删除的文件数
             * * `invalidNum` 无效的文件数
             * * `queueNum` 还在队列中的文件数
             * @method getStats
             * @grammar getStats() => Object
             */
            getStats: function() {
                // return this._mgr.getStats.apply( this._mgr, arguments );
                var stats = this.request('get-stats');
    
                return {
                    successNum: stats.numOfSuccess,
    
                    // who care?
                    // queueFailNum: 0,
                    cancelNum: stats.numOfCancel,
                    invalidNum: stats.numOfInvalid,
                    uploadFailNum: stats.numOfUploadFailed,
                    queueNum: stats.numOfQueue
                };
            },
    
            // 需要重写此方法来来支持opts.onEvent和instance.onEvent的处理器
            trigger: function( type/*, args...*/ ) {
                var args = [].slice.call( arguments, 1 ),
                    opts = this.options,
                    name = 'on' + type.substring( 0, 1 ).toUpperCase() +
                        type.substring( 1 );
    
                if (
                        // 调用通过on方法注册的handler.
                        Mediator.trigger.apply( this, arguments ) === false ||
    
                        // 调用opts.onEvent
                        $.isFunction( opts[ name ] ) &&
                        opts[ name ].apply( this, args ) === false ||
    
                        // 调用this.onEvent
                        $.isFunction( this[ name ] ) &&
                        this[ name ].apply( this, args ) === false ||
    
                        // 广播所有uploader的事件。
                        Mediator.trigger.apply( Mediator,
                        [ this, type ].concat( args ) ) === false ) {
    
                    return false;
                }
    
                return true;
            },
            // 获取图片base64
            getImgDataUrl:function(wufile,success,error){
                var file = wufile.source,  reader = new FileReader();

                // 只预览图片格式。
                if ( !wufile.type.match( /^image/ ) ) {
                    error && error();
                    return;
                }
                reader.onload = function(e) {
                    success && success(this.result)
                };
                reader.onerror = function(e) {
                    error && error()
                };

                reader.readAsDataURL(file);
            },
            // widgets/widget.js将补充此方法的详细文档。
            request: Base.noop
        });
        
        /*
            临时的构造器

         */
        var Fn = function( options ){
            var me = this,
                opts = options || {},
                pick = opts.pick || {},
                pickID = pick.id;

            this.alert = opts.alert || function( msg ) { window.alert( msg ); };

            $( document.getElementById(pickID) ).bind('click', function(){
                me.alert('您的浏览器不支持上传插件');
            });

        };

        Mediator.installTo( Fn.prototype );
        /**
         * 创建Uploader实例，等同于new Uploader( opts );
         * @method create
         * @class Base
         * @static
         * @grammar Base.create( opts ) => Uploader
         */
        Base.create = Uploader.create = function( opts ) {
            

            if(opts.mode === 'html5') {
                if( Base.isSupportHtml5() ){
                    return new Uploader( opts );
                }else {
                    return new Fn( opts );
                }
            }else if ( opts.mode === 'iframe'){
             
                return new IframeUploader(opts);

            }else if( opts.multiple ) {
                if( Base.isSupportHtml5() ){
                    return new Uploader( opts );
                }else {
                    return new Fn( opts );
                }
            }else if ( Base.browser.ie && Base.browser.ie < 8 ){
                return new Fn( opts );
            }
            else {
                // 单个上传
                if( Base.isSupportHtml5() ){
                    return new Uploader( opts );
                }else {
                    return new IframeUploader(opts);
                }
            }
            

            return new Uploader( opts );
        };
    
        // 暴露Uploader，可以通过它来扩展业务逻辑。
        Base.Uploader = Uploader;
    
        return Uploader;
    });
    
    /**
     * @fileOverview 组件基类。
     */
    define('widgets/widget',[
        'base',
        'uploader'
    ], function( Base, Uploader ) {
    
        var $ = Base.$,
            _init = Uploader.prototype._init,
            IGNORE = {},
            widgetClass = [];
    
        function isArrayLike( obj ) {
            if ( !obj ) {
                return false;
            }
    
            var length = obj.length,
                type = $.type( obj );
    
            if ( obj.nodeType === 1 && length ) {
                return true;
            }
    
            return type === 'array' || type !== 'function' && type !== 'string' &&
                    (length === 0 || typeof length === 'number' && length > 0 &&
                    (length - 1) in obj);
        }
    
        function Widget( uploader ) {
            this.owner = uploader;
            this.options = uploader.options;
        }
    
        $.extend( Widget.prototype, {
    
            init: Base.noop,
    
            // 类Backbone的事件监听声明，监听uploader实例上的事件
            // widget直接无法监听事件，事件只能通过uploader来传递
            invoke: function( apiName, args ) {
    
                /*
                    {
                        'make-thumb': 'makeThumb'
                    }
                 */
                var map = this.responseMap;
    
                // 如果无API响应声明则忽略
                if ( !map || !(apiName in map) || !(map[ apiName ] in this) ||
                        !$.isFunction( this[ map[ apiName ] ] ) ) {
    
                    return IGNORE;
                }
    
                return this[ map[ apiName ] ].apply( this, args );
    
            },
    
            /**
             * 发送命令。当传入`callback`或者`handler`中返回`promise`时。返回一个当所有`handler`中的promise都完成后完成的新`promise`。
             * @method request
             * @grammar request( command, args ) => * | Promise
             * @grammar request( command, args, callback ) => Promise
             * @for  Uploader
             */
            request: function() {
                return this.owner.request.apply( this.owner, arguments );
            }
        });
    
        // 扩展Uploader.
        $.extend( Uploader.prototype, {
    
            // 覆写_init用来初始化widgets
            _init: function() {
                var me = this,
                    widgets = me._widgets = [];
    
                $.each( widgetClass, function( _, klass ) {
                    widgets.push( new klass( me ) );
                });
    
                return _init.apply( me, arguments );
            },
            // good job
            request: function( apiName, args, callback ) {
                var i = 0,
                    widgets = this._widgets,
                    len = widgets.length,
                    rlts = [],
                    dfds = [],
                    widget, rlt;
    
                args = isArrayLike( args ) ? args : [ args ];
    
                for ( ; i < len; i++ ) {
                    widget = widgets[ i ];
                    rlt = widget.invoke( apiName, args );
    
                    if ( rlt !== IGNORE ) {
    
                        // Deferred对象
                        if ( Base.isPromise( rlt ) ) {
                            dfds.push( rlt );
                        } else {
                            rlts.push( rlt );
                        }
                    }
                }
    
                // 如果有callback，则用异步方式。
                if ( callback || dfds.length ) {
                    return Base.when.apply( Base, dfds )
    
                            // 很重要不能删除。删除了会死循环。
                            // 保证执行顺序。让callback总是在下一个tick中执行。
                            .then(function() {
                                var deferred = Base.Deferred(),
                                    args = arguments;
    
                                setTimeout(function() {
                                    deferred.resolve.apply( deferred, args );
                                }, 1 );
    
                                return deferred.promise();
                            })
                            .then( callback || Base.noop );
                } else {
                    return rlts[ 0 ];
                }
            }
        });
    
        /**
         * 添加组件
         * @param  {object} widgetProto 组件原型，构造函数通过constructor属性定义
         * @param  {object} responseMap API名称与函数实现的映射
         * @example
         *     Uploader.register( {
         *         init: function( options ) {},
         *         makeThumb: function() {}
         *     }, {
         *         'make-thumb': 'makeThumb'
         *     } );
         */
        Uploader.register = Widget.register = function( responseMap, widgetProto ) {
            var map = { init: 'init' },
                klass;
    
            if ( arguments.length === 1 ) {
                widgetProto = responseMap;
                widgetProto.responseMap = map;
            } else {
                widgetProto.responseMap = $.extend( map, responseMap );
            }
    
            klass = Base.inherits( Widget, widgetProto );
            widgetClass.push( klass );
    
            return klass;
        };
    
        return Widget;
    });
    
    

    /**
     * @fileOverview 文件选择相关
     */
    define('widgets/filepicker',[
        'base',
        'uploader',
        'filepicker'
    ], function( Base, Uploader, FilePicker ) {
        var $ = Base.$;
    
        $.extend( Uploader.options, {
    
            /**
             * @property {Selector | Object} [pick=undefined]
             * @namespace options
             * @for Uploader
             * @description 指定选择文件的按钮容器，不指定则不创建按钮。
             *
             * * `id` {Seletor} 指定选择文件的按钮容器，不指定则不创建按钮。
             * * `label` {String} 指定按钮文字。不指定时优先从指定的容器中看是否自带文字。
             * * `multiple` {Boolean} 是否开起同时选择多个文件能力。
             */
            pick: null
    

        });
    
        return Uploader.register({
            'add-btn': 'addButton',
            refresh: 'refresh',
            disable: 'disable',
            enable: 'enable'
        }, {
    
            init: function( opts ) {
                this.pickers = [];
                return opts.pick && this.addButton( opts.pick );
            },
    
            refresh: function() {
                $.each( this.pickers, function() {
                    this.refresh();
                });
            },
    
            /**
             * @method addButton
             * @for Uploader
             * @grammar addButton( pick ) => Promise
             * @description
             * 添加文件选择按钮，如果一个按钮不够，需要调用此方法来添加。参数跟[options.pick](#WebUploader:Uploader:options)一致。
             * @example
             * uploader.addButton({
             *     id: '#btnContainer',
             *     label: '选择文件'
             * });
             */
            addButton: function( pick ) {
                var me = this,
                    opts = me.options,
                    owner = me.owner,
                    multiple = opts.multiple?true:false,
                    options, picker, deferred;
    
                if ( !pick ) {
                    return;
                }
    
                deferred = Base.Deferred();
                $.isPlainObject( pick ) || (pick = {
                    id: pick
                });

                options = $.extend({}, pick,{ owner:owner,multiple:multiple,accept:opts.accept } );
    
                picker = new FilePicker( options );
    
                picker.once( 'ready', deferred.resolve );
                picker.on( 'select', function( files ) {

                    me.owner.request( 'add-file', [ files ]);
                });
                picker.init();
    
                this.pickers.push( picker );
    
                return deferred.promise();
            },
    
            disable: function() {
                $.each( this.pickers, function() {
                    this.disable();
                });
            },
    
            enable: function() {
                $.each( this.pickers, function() {
                    this.enable();
                });
            }
        });
    });

    /**
     * @fileOverview 文件队列
     */
    define('queue',[
        'base',
        'mediator',
        'file'
    ], function( Base, Mediator, WUFile ) {
    
        var $ = Base.$,
            STATUS = WUFile.Status;
    
        /**
         * 文件队列, 用来存储各个状态中的文件。
         * @class Queue
         * @extends Mediator
         */
        function Queue() {
    
            /**
             * 统计文件数。
             * * `numOfQueue` 队列中的文件数。
             * * `numOfSuccess` 上传成功的文件数
             * * `numOfCancel` 被移除的文件数
             * * `numOfProgress` 正在上传中的文件数
             * * `numOfUploadFailed` 上传错误的文件数。
             * * `numOfInvalid` 无效的文件数。
             * @property {Object} stats
             */
            this.stats = {
                numOfQueue: 0,
                numOfSuccess: 0,
                numOfCancel: 0,
                numOfProgress: 0,
                numOfUploadFailed: 0,
                numOfInvalid: 0
            };
    
            // 上传队列，仅包括等待上传的文件
            this._queue = [];
    
            // 存储所有文件
            this._map = {};
        }
    
        $.extend( Queue.prototype, {
    
            /**
             * 将新文件加入对队列尾部
             *
             * @method append
             * @param  {File} file   文件对象
             */
            append: function( file ) {
                this._queue.push( file );
                this._fileAdded( file );
                return this;
            },
    
            /**
             * 将新文件加入对队列头部
             *
             * @method prepend
             * @param  {File} file   文件对象
             */
            prepend: function( file ) {
                this._queue.unshift( file );
                this._fileAdded( file );
                return this;
            },
    
            /**
             * 获取文件对象
             *
             * @method getFile
             * @param  {String} fileId   文件ID
             * @return {File}
             */
            getFile: function( fileId ) {
                if ( typeof fileId !== 'string' ) {
                    return fileId;
                }
                return this._map[ fileId ];
            },
    
            /**
             * 从队列中取出一个指定状态的文件。
             * @grammar fetch( status ) => File
             * @method fetch
             * @param {String} status [文件状态值](#WebUploader:File:File.Status)
             * @return {File} [File](#WebUploader:File)
             */
            fetch: function( status ) {
                var len = this._queue.length,
                    i, file;
    
                status = status || STATUS.QUEUED;
    
                for ( i = 0; i < len; i++ ) {
                    file = this._queue[ i ];
    
                    if ( status === file.getStatus() ) {
                        return file;
                    }
                }
    
                return null;
            },
    
            /**
             * 对队列进行排序，能够控制文件上传顺序。
             * @grammar sort( fn ) => undefined
             * @method sort
             * @param {Function} fn 排序方法
             */
            sort: function( fn ) {
                if ( typeof fn === 'function' ) {
                    this._queue.sort( fn );
                }
            },
    
            /**
             * 获取指定类型的文件列表, 列表中每一个成员为[File](#WebUploader:File)对象。
             * @grammar getFiles( [status1[, status2 ...]] ) => Array
             * @method getFiles
             * @param {String} [status] [文件状态值](#WebUploader:File:File.Status)
             */
            getFiles: function() {
                var sts = [].slice.call( arguments, 0 ),
                    ret = [],
                    i = 0,
                    len = this._queue.length,
                    file;
    
                for ( ; i < len; i++ ) {
                    file = this._queue[ i ];
    
                    if ( sts.length && !~$.inArray( file.getStatus(), sts ) ) {
                        continue;
                    }
    
                    ret.push( file );
                }
    
                return ret;
            },
    
            _fileAdded: function( file ) {
                var me = this,
                    existing = this._map[ file.id ];
    
                if ( !existing ) {
                    this._map[ file.id ] = file;
    
                    file.on( 'statuschange', function( cur, pre ) {
                        me._onFileStatusChange( cur, pre );
                    });
                }
    
                file.setStatus( STATUS.QUEUED );
            },
    
            _onFileStatusChange: function( curStatus, preStatus ) {
                var stats = this.stats;
    
                switch ( preStatus ) {
                    case STATUS.PROGRESS:
                        stats.numOfProgress--;
                        break;
    
                    case STATUS.QUEUED:
                        stats.numOfQueue --;
                        break;
    
                    case STATUS.ERROR:
                        stats.numOfUploadFailed--;
                        break;
    
                    case STATUS.INVALID:
                        stats.numOfInvalid--;
                        break;
                }
    
                switch ( curStatus ) {
                    case STATUS.QUEUED:
                        stats.numOfQueue++;
                        break;
    
                    case STATUS.PROGRESS:
                        stats.numOfProgress++;
                        break;
    
                    case STATUS.ERROR:
                        stats.numOfUploadFailed++;
                        break;
    
                    case STATUS.COMPLETE:
                        stats.numOfSuccess++;
                        break;
    
                    case STATUS.CANCELLED:
                        stats.numOfCancel++;
                        break;
    
                    case STATUS.INVALID:
                        stats.numOfInvalid++;
                        break;
                }
            }
    
        });
    
        Mediator.installTo( Queue.prototype );
    
        return Queue;
    });
    

    /**
     * @fileOverview Transport
     * @todo 支持chunked传输，优势：
     * 可以将大文件分成小块，挨个传输，可以提高大文件成功率，当失败的时候，也只需要重传那小部分，
     * 而不需要重头再传一次。另外断点续传也需要用chunked方式。
     */
    /*
        filehash       (string)   选填，文件hash值
        tasktoken      (string)   必填，文件所在上传任务的token值
        filesize       (int)      选填，文件总大小
        chunk_size     (int)      选填，文件单片大小
        chunk_id       (int)      选填，文件分片ID

     */
    define('transport',[
        'base',
        'mediator'
    ], function( Base, Mediator ) {
    
        var noop = Base.noop,
            $ = Base.$,
            log = Base.log;
    
        function Transport( opts ){
            var opts = $.extend( true, {}, Transport.options, opts || {} );
            

            this.options = opts;
            this._formData = opts.formData || {};
            this._headers = opts.headers || {};
            this.init();
    
        }

        Transport.options = {
            // 上传地址
            server: '/api/1.1b/file/upload/chunk/upload',
            method: 'POST',
    
            // 跨域时，是否允许携带cookie, 只有html5 runtime才有效
            withCredentials: true,
            fileVal: 'file',
            timeout: 2 * 60 * 1000,    // 2分钟
            formData: {},
            headers: {
                
            },
            sendAsBinary: false
        };

        Transport.prototype = {
            init: function() {
                this._status = 0;
                this._response = null;
            },

            // 添加其他字段
            append: function( key, value ) {
                if ( typeof key === 'object' ) {
                    $.extend( this._formData, key );
                } else {
                    this._formData[ key ] = value;
                }
            },
            post: function() {
                var self = this,
                    owner = this.owner,
                    opts = this.options,
                    xhr = this._initAjax(),
                    server = opts.server,
                    formData = this._formData;
                
                if(formData){
                    for( var key in formData ) {
                        server = self.addURLParam(server,key,formData[key]);
                    }
                }

                if ( opts.withCredentials && 'withCredentials' in xhr ) {
                    xhr.open( 'POST', server, true );
                    xhr.withCredentials = true;
                } else {
                    xhr.open('POST',server);
                }
                
                this._setRequestHeader( xhr, opts.headers );
               
                xhr.send(null);
    
                
            },
            get: function() {
                var self = this,
                    owner = this.owner,
                    opts = this.options,
                    xhr = this._initAjax(),
                    server = opts.server,
                    formData = this._formData;
                
                if(formData){
                    for( var key in formData ) {
                        server = self.addURLParam(server,key,formData[key]);
                    }
                }

                if ( opts.withCredentials && 'withCredentials' in xhr ) {
                    xhr.open( 'get', server, true );
                    xhr.withCredentials = true;
                } else {
                    xhr.open('get',server);
                }
                
                this._setRequestHeader( xhr, opts.headers );
               
                xhr.send(null);
    
                
            },
            send: function() {
                var owner = this.owner,
                    opts = this.options,
                    xhr = this._initAjax(),
                    server = opts.server,
                    block = opts.block,
                    file = block.file,
                    source = file.source,
                    slice = source.slice || source.webkitSlice || source.mozSlice,
                    binary = slice.call(file.source, block.start, block.end ),
                    chunk_crc32 = block.chunk_crc32,
                    filetype = file.ext.toLowerCase(),
                    formData;
                
                // 假如是在安卓下 因为不能分片 直接上传完整文件
                if( Base.os.android ) {
                    formData = new FormData();
                    formData.append( 'tasktoken', opts.formData.tasktoken );
                    formData.append( opts.fileVal, file.source, file.name);
                    xhr.open( 'POST', '/api/1.1b/file/upload/full/upload' );
                    xhr.send(formData);

                } else {
                    formData = new FormData();
                    
                    $.each( this._formData, function( k, v ) {
                        formData.append( k, v );
                    });
                    formData.append( 'from', location.host );
                    formData.append( 'filetype', filetype );
                    formData.append( 'chunk_crc32', chunk_crc32 );
                    formData.append( opts.fileVal, binary, file.name);
                    
                   
                    if ( opts.withCredentials && 'withCredentials' in xhr ) {
                        
                        //xhr.withCredentials = true;

                        xhr.open( opts.method, server );
                        
                    } else {
               
                        xhr.open( opts.method, server );
                    }
                    
                    this._setRequestHeader( xhr, opts.headers );
                    if ( Base.os.android ) {

                        //xhr.overrideMimeType('application/octet-stream');
                    }
                    //if(!window.ooxx){window.ooxx = 1; alert('send22w24') ;}
                    xhr.send(formData);
                    //alert(3)
                }
                    
                
            },
    
            getResponse: function() {
                return this._response;
            },
    
            getResponseAsJson: function() {
                return this._parseJson( this._response );
            },
    
            getStatus: function() {
                return this._status;
            },
    
            abort: function() {
                var xhr = this._xhr;
    
                if ( xhr ) {
                    xhr.upload.onprogress = noop;
                    xhr.onreadystatechange = noop;
                    xhr.abort();
    
                    this._xhr = xhr = null;
                }
            },
    
            destroy: function() {
                this.abort();
            },
    
            _initAjax: function() {
                var me = this,
                    xhr = new XMLHttpRequest(),
                    opts = this.options;
    
                /*if ( opts.withCredentials && !('withCredentials' in xhr) &&
                        typeof XDomainRequest !== 'undefined' ) {
                    xhr = new XDomainRequest();
                }*/
                xhr.timeout = opts.timeout;
                xhr.ontimeout = function() {
                    return me.trigger( 'error', { message:'请求超时了' } );
                };
                xhr.upload.onprogress = function( e ) {
                    var percentage = 0;
    
                    if ( e.lengthComputable ) {
                        percentage = e.loaded / e.total;
                    }
     
    
                    return me.trigger( 'progress', percentage );
                };
    
                xhr.onreadystatechange = function() {
    
                    if ( xhr.readyState !== 4 ) {
                        return;
                    }
    
                    xhr.upload.onprogress = noop;
                    xhr.onreadystatechange = noop;
                    me._xhr = null;
                    me._status = xhr.status;
                    
                    if ( xhr.status === 200) {
                        me._response = xhr.responseText;

                        return me.trigger('load', me._parseJson(xhr.responseText) );

                    } else if ( xhr.status > 200 ) {
                        me._response = xhr.responseText;
                       
                        return me.trigger( 'error', me._parseJson(xhr.responseText) );
                    }
    
                    return me.trigger( 'error', { type:'http',message:'服务器出错' } );
                };
                xhr.onerror = function(){
                    return me.trigger( 'error', { type:'http',message:'服务器出错!' } );
                };
    
                me._xhr = xhr;
                return xhr;
            },
    
            _setRequestHeader: function( xhr, headers ) {
                
                $.each( headers, function( key, val ) {
                    xhr.setRequestHeader( key, val );
                });
            },
    
            _parseJson: function( str ) {
                var json;
    
                try {
                    json = JSON.parse( str );
                } catch ( ex ) {
                    json = {};
                }
    
                return json;
            },
            addURLParam:function(url,name,value){
                url += (url.indexOf('?') == -1) ?'?':'&';
                url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
                return url;
            }

        };

        // 让Transport具备事件功能。
        Mediator.installTo( Transport.prototype );


        return Transport;
    });
    

     /**
     * @fileOverview 负责文件上传相关。
     */
    define('widgets/upload',[
        'base',
        'uploader',
        'file',
        'transport',
        'crc32',
        'hex_md5',
        'guid'
    ], function( Base, Uploader, WUFile, Transport, crc32, hex_md5, guid ) {
    
        var $ = Base.$,
            log = Base.log,
            isPromise = Base.isPromise,
            Status = WUFile.Status;
    
        // 添加默认配置项
        $.extend( Uploader.options, {
            fileThreads: 3,
            /*
                文件是否去重 默认允许存在重复
             */
            duplicate:true,
            /*
                md5.js 路径
             */
            md5_path:'/assets/js/webuploader/md5.js',
            token:{
                url:'http://'+location.host+'/api/1.1b/file/upload/token/get',
                data:{}
            },
    
            /**
             * @property {Boolean} [prepareNextFile=false]
             * @namespace options
             * @for Uploader
             * @description 是否允许在文件传输时提前把下一个文件准备好。
             * 对于一个文件的准备工作比较耗时，比如图片压缩，md5序列化。
             * 如果能提前在当前文件传输期处理，可以节省总体耗时。
             */
            prepareNextFile: false,
    
            /**
             * @property {Boolean} [chunked=false]
             * @namespace options
             * @for Uploader
             * @description 是否要分片处理大文件上传。
             */
            chunked: false,
    
            /**
             * @property {Boolean} [chunkSize=5242880]
             * @namespace options
             * @for Uploader
             * @description 如果要分片，分多大一片？ 默认大小为5M.
             */
            chunkSize: 5 * 1024 * 1024,
    
            /**
             * @property {Boolean} [chunkRetry=2]
             * @namespace options
             * @for Uploader
             * @description 如果某个分片由于网络问题出错，允许自动重传多少次？
             */
            chunkRetry: 0,
    
            /**
             * @property {Boolean} [threads=3]
             * @namespace options
             * @for Uploader
             * @description 上传并发数。允许同时最大上传进程数。
             */
            threads: 3,
    
    
            /**
             * @property {Object} [formData]
             * @namespace options
             * @for Uploader
             * @description 文件上传请求的参数表，每次发送都会发送此对象中的参数。
             */
            formData: null
    
            /**
             * @property {Object} [fileVal='file']
             * @namespace options
             * @for Uploader
             * @description 设置文件上传域的name。
             */
    
            /**
             * @property {Object} [method='POST']
             * @namespace options
             * @for Uploader
             * @description 文件上传方式，`POST`或者`GET`。
             */
    
            /**
             * @property {Object} [sendAsBinary=false]
             * @namespace options
             * @for Uploader
             * @description 是否已二进制的流的方式发送文件，这样整个上传内容`php://input`都为文件内容，
             * 其他参数在$_GET数组中。
             */
        });
    
        // 负责将文件切片。WUFile
        function CuteFile( file, chunkSize ) {
            var pending = [],
                blob = file.source,
                total = blob.size,
                chunks = chunkSize ? Math.ceil( total / chunkSize ) : 1,
                start = 0,
                index = 0,
                len;
            

            while ( index < chunks ) {
                len = Math.min( chunkSize, total - start );
        
                // 分块集合 blocks
                pending.push({
                    file: file,
                    start: start,
                    end: chunkSize ? (start + len) : total,
                    total: total,
                    chunks: chunks,
                    chunk: index++
                });
                
                start += len;
            }
            // 
            file.blocks = pending.concat();
            file.remaning = pending.length;
    
            return {
                file: file,
    
                has: function() {
                    return !!pending.length;
                },
    
                fetch: function(chunk_next_id) {
                    var block;

                    if(chunk_next_id){
                        return file.blocks[chunk_next_id-1];
                    }
                    return pending.shift();
                }
            };
        }
    
        Uploader.register({
            'after-send-file':'afterSendFile',
            'before-send-file':'beforeSendFile',
            'before-send':'beforeSend',
            'start-upload': 'start',
            'stop-upload': 'stop',
            'skip-file': 'skipFile',
            'reset':'reset',
            'getInfo':'getInfo',
            'carryon':'carryon',
            'is-in-progress': 'isInProgress'
        }, {
            init: function() {
                var me = this,owner = this.owner;
    
                this.runing = false;
  
                this.__tick = Base.bindFn( this._tick, this );
                // 每个文件上传完成后都要检查下 整个上传队列是否全部结束
                owner.on( 'uploadComplete', function( file ) {
                    var stats = owner.getStats();
                    // 把其他块取消了。
                    file.blocks && $.each( file.blocks, function( _, v ) {
                        v.transport && (v.transport.abort(), v.transport.destroy());
                        delete v.transport;
                    });
                    // 若剩余上传文件为空且上传队列为空 则触发结束
                    if(!me.remaning && stats.queueNum === 0 ){
                        me.runing = false;
                        Base.nextTick(function(){
                            me.owner.trigger('uploadFinished');
                            //me.owner.reset();
                        });
                        
                    }
                    //delete file.blocks;
                    //delete file.remaning;
                });
            },
            reset: function(){
                this.runing = false;
            },
            getInfo:function(){
                var me = this;
                return {
                    runing:me.runing,
                    pool:me.pool,
                    uploading:me.remaning,
                    pending:me.pending
                };
            },
            // 文件发送后 判断是否成功还是失败
            afterSendFile:function(file, result){
                var deferred = Base.Deferred(), result = result || {}, reason = { message:'fail'};

                result.data = result.data || {};
                
                if(result.data.url){
                    deferred.resolve();
                }else {

                    reason.message = result.message || reason.message; 
                    deferred.reject(reason);
                }
                return deferred.promise();
            },
            // 文件块上传前进行CRC32计算 并且从服务器获取当前块的传输状态
            beforeSend:function( block ) {
                
                var opts = this.owner.options,
                    BlockMd5 = opts.BlockMd5,
                    CRC32 = opts.CRC32,
                    file = block.file,
                    filehash = file.filehash,
                    chunk_id = block.chunk+1,
                    source = file.source,
                    slice = source.slice || source.webkitSlice || source.mozSlice,
                    blog = slice.call(file.source,block.start,block.end),
                    
                    deferred = Base.Deferred();
                

                if(Base.os.android){
                    block.chunk_crc32 = 0;
                    deferred.resolve(false);
                }
                // 获取文件
                var getFileStatus = function(filehash){
                    var server = 'http://'+location.host+'/api/1.1b/file/upload/resumestatus/get?filehash='+filehash,
                        xhr = new XMLHttpRequest();

                    xhr.onreadystatechange = function(){
                        if(xhr.readyState == 4 && xhr.status == 200){
                            var result = Base.parseJson(xhr.responseText),
                                data = result.data || {},
                                url = data.url;

                            // 若文件已经上传了
                            if( url ) {
                                me.remaning--;
                                owner.trigger( 'uploadProgress', wufile, 1 );
                                wufile.setStatus( Status.PROGRESS );
                                deferred.resolve(result);

                            }else{
                                deferred.reject({ message:'服务器数据传输出错!' });
                            }
        
                            
                        }
                    };
                    xhr.onerror = function(){
                        var result = Base.parseJson(xhr.responseText);
                        deferred.reject(result);
                    };
                    xhr.open('GET',server);
                    xhr.send(null);

                };


                var checkChunkStatus = function(){
                    
                    var xhr = new XMLHttpRequest(),
                        server = 'http://'+location.host+'/api/1.1b/file/upload/chunkstatus/get?filehash='+filehash+'&chunk_id='+chunk_id;

                    xhr.onreadystatechange = function() {
                        if(xhr.readyState == 4 && xhr.status == 200){
                            var result = Base.parseJson(xhr.responseText),
                                isfinish = result.data.isfinish;

                            block.isfinish = isfinish;
                            // 假如块已经传输完成
                            if( isfinish ) {
                                
                                // 假如已经是最后一块并且传输完成
                                if( block.end >= block.total ) {
                                    getFileStatus();
                                }else {
                                    deferred.resolve(true);
                                }

                            }else {
                                deferred.resolve(false);
                            }
                            
                            //console.log('beforeSend',xhr.responseText);
                            
                        }
                    };
                    xhr.onerror = function(){
                        var result = Base.parseJson(xhr.responseText);
                        deferred.reject(result);
                    };
                    xhr.open('GET',server);
                    xhr.send(null);
                };
                
                var Qiniu_CRC = function(blob, fun) {

                    var _reader = new FileReader();
                    //alert('onload ' + typeof _reader.onload)
                    _reader.onloadend = function(evt) {
                   
                        if (evt.target.readyState == 2) { // DONE == 2
                            //alert(evt.target.result)
                            var crc = crc32(evt.target.result);
                            block.chunk_crc32 = crc;
                            // 若CRC正常读取 不为0
                            if(crc){
                                checkChunkStatus();
                                /*if(BlockMd5 === false) {
                                    deferred.resolve(false);
                                }else {
                                    checkChunkStatus();
                                }*/
                                
                            }else {
                                //console.log('crc32:'+evt.target.result)
                                deferred.reject({message:'CRC32计算失败'});


                            }
                           
                        }
                    };
                    _reader.onerror = function(evt) {
                        log('crc32 error');
                        deferred.reject({message:'CRC32计算失败'});

                    };
                    
                    //_reader.readAsArrayBuffer(blob);
                    _reader.readAsBinaryString(blob);
                };

                if(false == CRC32){
                    block.chunk_crc32 = 0;
                    checkChunkStatus();
                }else {
                    Qiniu_CRC(blog);
                }
                //deferred.resolve(false);
                

                return deferred.promise();
            },
            /*
                文件上传前 计算MD5 并且从服务器获取文件信息

             */
            beforeSendFile : function(wufile) {
                var me = this, file = wufile.source, deferred = Base.Deferred(), worker,owner = this.owner,opts = me.options,
                    configkey = opts.token.data.configkey,
                    filehashStamp = opts.filehashStamp?opts.filehashStamp:'',
                    stamp = configkey + filehashStamp,
                    FileMd5 = opts.FileMd5;


                if(Base.os.android){
                    wufile.chunk_next_id = 1;
                    wufile.chunk_size = wufile.size;
                    deferred.resolve();
                }
                function checkFileStatus(filehash){
                    var server = 'http://'+location.host+'/api/1.1b/file/upload/resumestatus/get?filehash='+filehash,
                        xhr = new XMLHttpRequest();

                    xhr.onreadystatechange = function(){
                        if(xhr.readyState == 4 && xhr.status == 200){
                            var result = Base.parseJson(xhr.responseText),
                                data = result.data || {},
                                chunk_size = data.chunk_size,
                                chunk_next_id = data.chunk_next_id,
                                url = data.url;


                            // 若文件已经上传了
                            if( url ) {
                                owner.trigger( 'uploadProgress', wufile, 1 );
                                //owner.trigger( 'uploadError', file, reason );
                                me.remaning--;
                                wufile.setStatus( Status.PROGRESS );
                                deferred.resolve(result);

                            } else if ( chunk_next_id ) {
                                wufile.chunk_next_id = chunk_next_id;
                                wufile.chunk_size = chunk_size;
                                deferred.resolve();

                            }else{
                                deferred.reject(result);
                            }
                            
                                
                            //console.log('beforeSendFile',xhr.responseText,wufile)
                            
                        }
                    };
                    xhr.open('GET',server);
                    xhr.send(null);

                }
                function handle_worker_event(id) {
                    return function (event) {
                        if (event.data.result) {
                            var hash = event.data.result;
                            // 对文件hash再进行一次MD5运算
                            wufile.filehash = hex_md5(hash+stamp);
                            //console.log('hash',hash,wufile.filehash)
                            //console.log(id, event.data.result);
                            checkFileStatus(wufile.filehash);
                            
                            
                        } else {
                            //console.log(id, event.data.block.end * 100 / event.data.block.file_size + '%')
                           
                        }
                    };
                }

                function hash_file(file, worker) {
                    var i, buffer_size, block, reader, blob, handle_hash_block, handle_load_block;
                 
                    var handle_load_block = function (event) {
                        //console.log(111,event.target.result)
                        // 计算文件hash时 给每段文件加上一个后缀
                        worker.postMessage({
                            'message': event.target.result,
                            'block': block
                        });
                        
                    };
                    var handle_hash_block = function (event) {
                       
                        if (block.end !== file.size) {
                            block.start += buffer_size;
                            block.end += buffer_size;
                 
                            if (block.end > file.size) {
                                block.end = file.size;
                            }
                            reader = new FileReader();
                            reader.onload = handle_load_block;
                            blob = file.slice(block.start, block.end);
                 
                            reader.readAsArrayBuffer(blob);
                        }
                        
                    };
                    buffer_size = 64 * 16 * 1024;
                    block = {
                        'file_size': file.size,
                        'start': 0
                    };
                 
                    block.end = buffer_size > file.size ? file.size : buffer_size;
                    
                    worker.addEventListener('message', handle_hash_block);
                 
                    reader = new FileReader();
                    reader.onload = handle_load_block;
                    blob = file.slice(block.start, block.end);
                 
                    reader.readAsArrayBuffer(blob);
                }

                if(wufile.filehash){
                    checkFileStatus(wufile.filehash);
                }else {
                    if(FileMd5 === false){
                        var hash = guid();
                        wufile.filehash = hex_md5(hash+stamp);
                        checkFileStatus(wufile.filehash);
                    }else {
                        worker = new Worker(opts.md5_path);
                        worker.addEventListener('message', handle_worker_event('md5_file_hash_' + new Date().valueOf() ), false);
                        hash_file(file, worker);
                    }
                        
                }
                    

                return deferred.promise();
            },

            /**
             * @event startUpload
             * @description 当开始上传流程时触发。
             * @for  Uploader
             */
    
            /**
             * 开始上传。此方法可以从初始状态调用开始上传流程，也可以从暂停状态调用，继续上传流程。
             * @grammar upload() => undefined
             * @method upload
             * @for  Uploader
             */
            start: function() {
                var me = this,
                    owner = this.owner,
                    opts = me.options,
                    token = opts.token,
                    url = token.url,
                    tokenParams = token.data,
                    formData = opts.formData || {};
                
                
                var _start = function(){
                    Base.nextTick( me.__tick );
                };
                
                // 假如还在上传 则不允许
                if ( me.runing ) {
                    return;
                }
                // 移出invalid的文件
                $.each( me.request( 'get-files', Status.INVALID ), function() {
                    me.request( 'remove-file', this );
                });
                // 记录当前正在传的数据，跟threads相关
                this.pool = [];
                // 缓存即将上传的文件。
                this.pending = [];
                // 跟踪还有多少文件没有完成上传。
                this.remaning = 0;
    
                me.runing = true;
                
                me._trigged = false;
                me.owner.trigger('startUpload');
                
                //url = self.addURLParam(url,'from',location.host);
                tokenParams.from = location.host;
                // 开始上传前先获取上传 上传规则 token
                var tr = new Transport( {
                    server: url,
                    method: 'GET',
                    withCredentials: true,
                    formData:tokenParams
                } );

                tr.on('load' ,function(result){
                    var data = result.data || {};
        
                    formData['tasktoken'] = data.token;
                    opts.formData = formData;
                    
            
                    // -------------------------------
                    
                    _start();
                });

                tr.on('error' ,function(result){

                    me.remaning = 0;
                    me.runing = false;
                    //log(result);
                    //owner.alert('获取token失败');
                    owner.trigger( 'error', 'GET_TOKEN_ERROR', result );
                });
                
                tr.get();
                
                
            },
    
            /**
             * @event stopUpload
             * @description 当开始上传流程暂停时触发。
             * @for  Uploader
             */
    
            /**
             * 暂停上传。第一个参数为是否中断上传当前正在上传的文件。
             * @grammar stop() => undefined
             * @grammar stop( true ) => undefined
             * @method stop
             * @for  Uploader
             */
            stop: function() {
                var me = this,owner = this.owner,files,i,len,blocks = [];
    
                me.runing = false;
                files = owner.getFiles(Status.PROGRESS);
                i = 0;
                len = files.length;
    
                for ( ; i < len; i++ ) {
                    file = files[ i ];
                    file.blocks = file.blocks || [];
                    blocks = blocks.concat(file.blocks);
                }
                //console.log('stop',files);
           
                $.each( blocks, function( _, v ) {
                    v.transport && v.transport.abort();
                    v.file.setStatus( Status.INTERRUPT );
                });
    
                me.owner.trigger('stopUpload');
            },
            /*
                继续上传

             */
            carryon:function(){
                var me = this,
                    owner = this.owner,
                    files, i, len;
    
                
                files = owner.getFiles(Status.INTERRUPT,Status.PROGRESS);
                i = 0;
                len = files.length;
    
                for ( ; i < len; i++ ) {
                    file = files[ i ];
                    file.setStatus( Status.QUEUED );
                }
                console.log('carryon',files)
                me.request('start-upload');
            },
    
            /**
             * 判断`Uplaode`r是否正在上传中。
             * @grammar isInProgress() => Boolean
             * @method isInProgress
             * @for  Uploader
             */
            isInProgress: function() {
                return !!this.runing;
            },
    
            getStats: function() {
                return this.request('get-stats');
            },
    
            /**
             * 掉过一个文件上传，直接标记指定文件为已上传状态。
             * @grammar skipFile( file ) => undefined
             * @method skipFile
             * @for  Uploader
             */
            skipFile: function( file, status ) {
                file = this.request( 'get-file', file );
    
                file.setStatus( status || Status.COMPLETE );
                file.skipped = true;
    
                // 如果正在上传。
                file.blocks && $.each( file.blocks, function( _, v ) {
                    var _tr = v.transport;
    
                    if ( _tr ) {
                        _tr.abort();
                        _tr.destroy();
                        delete v.transport;
                    }
                });
    
                this.owner.trigger( 'uploadSkip', file );
            },
    
            /**
             * @event uploadFinished
             * @description 当文件上传结束时触发。
             * @for  Uploader
             */
            _tick: function() {
                var me = this,
                    opts = me.options,
                    fn, val;
                
                // 上一个promise还没有结束，则等待完成后再执行。
                if ( me._promise ) {
                    return me._promise.always( me.__tick );
                }
    
                // 还有位置，且还有文件要处理的话。val 文件分块
                if ( me.pool.length < opts.fileThreads && me.getStats().numOfQueue && (val = me._nextFileBlock()) ) {
                    me.remaning++;
                    fn = function( val ) {
                        me._promise = null;
    
                        // 有可能是reject过来的，所以要检测val的类型。
                        val && val.file && me._startSend( val );
                        Base.nextTick( me.__tick );
                    };
    
                    me._promise = isPromise( val ) ? val.always( fn ) : fn( val );
    
                // 没有要上传的了，且没有正在传输的了。
                } 
            },

            _nextFileBlock: function() {
                var me = this,
                    act = me._act,
                    opts = me.options,
                    next, done;
                
               
                // 如果缓存中有，则直接在缓存中取，没有则去queue中取。
                // 若果缓存中没有 且 等待的队列文件还有
                if ( !me.pending.length && me.getStats().numOfQueue ) {
                    me._prepareNextFile();
                }

                next = me.pending.shift();
                done = function( file ) {
                    if ( !file ) {
                        return null;
                    }
                    // opts.chunkSize --> file.chunkSize 
                    act = CuteFile( file, file.chunk_size );
                    // 根据服务器的数据 选择某个分片
                    return act.fetch(file.chunk_next_id);
                };

                // 文件可能还在prepare中，也有可能已经完全准备好了。
                return isPromise( next ) ? next.then( done ) : done( next );
                
            },
    
    
            /**
             * @event uploadStart
             * @param {File} file File对象
             * @description 某个文件开始上传前触发，一个文件只会触发一次。
             * @for  Uploader
             */
            _prepareNextFile: function() {
                var me = this,
                    file = me.request('fetch-file'),
                    pending = me.pending,
                    promise;
    
                if ( file ) {
    
                    promise = me.request( 'before-send-file', file, function(result) {
                      
                        // 有可能文件被skip掉了。文件被skip掉后，状态肯定不是Queued. 有可能已经传输完成
                        if ( file.getStatus() === Status.QUEUED ) {
                            // 开始上传
                            me.owner.trigger( 'uploadStart', file );
                            // 状态改为正在上传中 以便获取下个队列中的文件
                            file.setStatus( Status.PROGRESS );
                            return file;
                        }
                        Base.nextTick( me.__tick );
                        return me._finishFile( file,result );
                    });
    
                    // 如果还在pending中，则替换成文件本身。
                    promise.done(function() {
                        var idx = $.inArray( promise, pending );
    
                        ~idx && pending.splice( idx, 1, file );
                    });
    
                    // befeore-send-file的钩子就有错误发生。
                    promise.fail(function( reason ) {
                        file.setStatus( Status.ERROR, reason );
                        me.owner.trigger( 'uploadError', file, reason );
                        me.owner.trigger( 'uploadComplete', file );
                    });
    
                    pending.push( promise );
                }
            },
    
            // 让出位置了，可以让其他分片开始上传
            _popBlock: function( block ) {
                var idx = $.inArray( block, this.pool );
        
                this.pool.splice( idx, 1 );
            },
    
            // 开始上传，可以被掉过。如果promise被reject了，则表示跳过此分片。
            _startSend: function( block ) {
                var me = this,
                    file = block.file,
                    promise;
    
                me.pool.push( block );
                if( me.runing === false ){
                    return;
                }

                // 将之前的块全部设置已完成
                var setPercentage = function(block){
                    var blocks = file.blocks || [];

                    for(var i = 0 ; i<block.chunk; i++ ){
                        blocks[i].percentage = 1;
                    }
                };
                setPercentage(block);

                // hook, 每个分片发送之前可能要做些异步的事情。
                promise = me.request( 'before-send', block, function(result) {

                    
                    // 有可能文件已经上传出错了，所以不需要再传输了。
                    if ( file.getStatus() === Status.PROGRESS ) {
                        // 若块已经上传完 则传下一块
                        if( typeof result ==='boolean' && block.isfinish ) {
                            block.percentage = 1;
                            me._popBlock( block );
                            file.chunk_next_id++;
                            me._startSend( file.blocks[file.chunk_next_id-1] );
                            
                        } // 若文件已经传完
                        else if( typeof result === 'object' ) {
                            Base.nextTick( me.__tick );
                            return me._finishFile( file,result );
                        }else {
                            
                            me._doSend( block );
                        }
                        
                    } else {
                        me._popBlock( block );
                        Base.nextTick( me.__tick );
                    }
                });
    
                // 如果为fail了，则跳过此分片。传下一个文件
                promise.fail(function() {
                    
                    me._finishFile( file ).always(function() {

                        me.remaning--;
                        block.percentage = 1;
                        me._popBlock( block );
                        me.owner.trigger( 'uploadComplete', file );
                        Base.nextTick( me.__tick );
                    });
                    
                });
            },
    
    
            /**
             * @event uploadBeforeSend
             * @param {Object} object
             * @param {Object} data 默认的上传参数，可以扩展此对象来控制上传参数。
             * @description 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
             * @for  Uploader
             */
    
            /**
             * @event uploadAccept
             * @param {Object} object
             * @param {Object} ret 服务端的返回数据，json格式，如果服务端不是json格式，从ret._raw中取数据，自行解析。
             * @description 当某个文件上传到服务端响应后，会派送此事件来询问服务端响应是否有效。如果此事件handler返回值为`false`, 则此文件将派送`server`类型的`uploadError`事件。
             * @for  Uploader
             */
    
            /**
             * @event uploadProgress
             * @param {File} file File对象
             * @param {Number} percentage 上传进度
             * @description 上传过程中触发，携带上传进度。
             * @for  Uploader
             */
    
    
            /**
             * @event uploadError
             * @param {File} file File对象
             * @param {String} reason 出错的code
             * @description 当文件上传出错时触发。
             * @for  Uploader
             */
    
            /**
             * @event uploadSuccess
             * @param {File} file File对象
             * @description 当文件上传成功时触发。
             * @for  Uploader
             */
    
            /**
             * @event uploadComplete
             * @param {File} [file] File对象
             * @description 不管成功或者失败，文件上传完成时触发。
             * @for  Uploader
             */
    
            // 做上传操作。
            _doSend: function( block ) {
                var me = this,
                    owner = me.owner,
                    opts = $.extend( {}, me.options, { block:block } ),
                    file = block.file,
                    tr = new Transport( opts ),
                    data = $.extend({}, opts.formData ),
                    headers = $.extend({}, opts.headers ),
                    requestAccept, ret;
               
                block.transport = tr;
                //alert('file.name:'+file.name)
                tr.on( 'destroy', function() {
                    delete block.transport;
                    me._popBlock( block );
                });
    
                // 广播上传进度。以文件为单位。
                tr.on( 'progress', function( percentage ) {
                    var totalPercent = 0,
                        uploaded = 0;

    
                    totalPercent = block.percentage = percentage;
    
                    if ( block.chunks > 1 ) {    // 计算文件的整体速度。
                        $.each( file.blocks, function( _, v ) {
                            uploaded += (v.percentage || 0) * (v.end - v.start);
                        });
    
                        totalPercent = uploaded / file.size;
                    }
    
                    owner.trigger( 'uploadProgress', file, totalPercent || 0 );
                });
    
    
                // 尝试重试，然后广播文件上传出错。
                tr.on( 'error', function( result ) {
                    block.retried = block.retried || 0;
                    
                    // 自动重试
                    if ( block.chunks > 1  && block.retried < opts.chunkRetry ) {
                        block.retried++;
                        tr.send();
                        //console.log('retried')
                    } else {
                        //console.log('destroy',result)
                        me.remaning--;
                        tr.trigger('destroy');
                        file.setStatus( Status.ERROR, 'server error' );
                        owner.trigger( 'uploadError', file, result );
                        owner.trigger( 'uploadComplete', file );
                        // 
                        Base.nextTick( me.__tick );
                    }
                });
    
                // 上传成功
                tr.on( 'load', function(result) {
                    var nextBlock, data = result.data || {}, chunk_next_id = data.chunk_next_id;

                    
                    tr.trigger('destroy');
                    
                    // 文件全部上传完成。
                    if ( data.url ) {
                        me.remaning--;
                        me._finishFile( file, result );
                        // 
                        Base.nextTick( me.__tick );
                    } else if( chunk_next_id ) {
                        file.chunk_next_id = chunk_next_id;
                        nextBlock = file.blocks[chunk_next_id-1];
                        me._startSend(nextBlock);

                    }else {
                        me.remaning--; 
                        file.setStatus( Status.ERROR, 'server error' );
                        owner.trigger( 'uploadError', file, { message:'上传失败' } );
                        owner.trigger( 'uploadComplete', file );
    
                        Base.nextTick( me.__tick );
                        

                    }
                });
              
                // 配置默认的上传字段。
                data = $.extend( data, {
                    filename:file.name,
                    filehash: file.filehash,
                    chunk_size: owner.options.chunkSize,
                    chunk_id: block.chunk+1,
                    filesize: file.size
                });
    
                // 如果默认的字段不够使用，可以通过监听此事件来扩展
                owner.trigger( 'uploadBeforeSend', block, data, headers );
    
                // 开始发送。
                tr.append( data );

                tr.send();
            },
    
            // 完成上传。
            _finishFile: function( file, ret, hds ) {
                var owner = this.owner;
    
                return owner
                        .request( 'after-send-file', arguments, function() {
                            
                            file.setStatus( Status.COMPLETE );
                            owner.trigger( 'uploadSuccess', file, ret, hds );
                        })
                        .fail(function( reason ) {
                            
                            // 如果外部已经标记为invalid什么的，不再改状态。
                            if ( file.getStatus() === Status.PROGRESS ) {
                                file.setStatus( Status.ERROR, reason );
                            }
    
                            owner.trigger( 'uploadError', file, reason );
                        })
                        .always(function() {
                            
                            owner.trigger( 'uploadComplete', file );
                        });
            }
    
        });
    });
    
    /**
     * @fileOverview 队列
     */
    define('widgets/queue',[
        'base',
        'uploader',
        'queue',
        'file'
    ], function( Base, Uploader, Queue, WUFile ) {
    
        var $ = Base.$,
            log = Base.log,
            rExt = /\.\w+$/,
            Status = WUFile.Status;
    
        return Uploader.register({
            'sort-files': 'sortFiles',
            'add-file': 'addFiles',
            'get-file': 'getFile',
            'fetch-file': 'fetchFile',
            'get-stats': 'getStats',
            'get-files': 'getFiles',
            'remove-file': 'removeFile',
            'retry': 'retry',
            'reset': 'reset'
        }, {
    
            init: function( opts ) {
                var me = this,
                    deferred, len, i, item, arr, accept, runtime;
    
                
    
                // accept中的中生成匹配正则。
                if ( opts.accept ) {
                    arr = [];
    
                    for ( i = 0, len = opts.accept.length; i < len; i++ ) {
                        item = opts.accept[ i ].extensions;
                        item && arr.push( item );
                    }
    
                    if ( arr.length ) {
                        accept = '\\.' + arr.join(',')
                                .replace( /,/g, '$|\\.' )
                                .replace( /\*/g, '.*' ) + '$';
                    }
      
                    me.accept = new RegExp( accept, 'i' );
                }

                me.queue = new Queue();
                me.stats = me.queue.stats;
               
                deferred = Base.Deferred();
                deferred.resolve();
                return deferred.promise();
            },
    
    
            // 为了支持外部直接添加一个原生File对象。
            _wrapFile: function( file ) {
                if ( !(file instanceof WUFile) ) {
    
                    file = new WUFile( file );
                }
    
                return file;
            },

            /**
             * @event beforeFileQueued
             * @param {File} file File对象
             * @description 当文件被加入队列之前触发，此事件的handler返回值为`false`，则此文件不会被添加进入队列。
             * @for  Uploader
             */
    
            /**
             * @event fileQueued
             * @param {File} file File对象
             * @description 当文件被加入队列以后触发。
             * @for  Uploader
             */
    
            _addFile: function( file ) {
                var me = this,options = me.owner.options,acceptExt;
                

                if ( !file || file.size < 6 || me.accept &&
    
                        // 如果名字中有后缀，才做后缀白名单处理。
                        rExt.exec( file.name ) && !me.accept.test( file.name ) ) {
                    acceptExt = options.accept[0].extensions;
                    me.owner.trigger('error','F_TYPE_INVALID',acceptExt,file);
                    return;
                }

                file = me._wrapFile( file );
    
                if ( !me.owner.trigger( 'beforeFileQueued', file ) ) {
                    return;
                }
    
                me.queue.append( file );
              
                me.owner.trigger( 'fileQueued', file );
                return file;
            },
    
            getFile: function( fileId ) {
                return this.queue.getFile( fileId );
            },
    
            /**
             * @event filesQueued
             * @param {File} files 数组，内容为原始File对象。
             * @description 当一批文件添加进队列以后触发。
             * @for  Uploader
             */
            addFiles: function( files ) {
                var me = this;
                
                if ( !files.length ) {
                    files = [ files ];
                }
    
                files = $.map( files, function( file ) {
                    return me._addFile( file );
                });
              
                me.owner.trigger( 'filesQueued', files );
        
                // 假如设置为自动上传 me.options既owner.options
                if ( me.options.auto ) {
                    me.request('start-upload');
                }
            },
    
            getStats: function() {
                return this.stats;
            },
    
            /**
             * @event fileDequeued
             * @param {File} file File对象
             * @description 当文件被移除队列后触发。
             * @for  Uploader
             */
    
            /**
             * @method removeFile
             * @grammar removeFile( file ) => undefined
             * @grammar removeFile( id ) => undefined
             * @param {File|id} file File对象或这File对象的id
             * @description 移除某一文件。
             * @for  Uploader
             * @example
             *
             * $li.on('click', '.remove-this', function() {
             *     uploader.removeFile( file );
             * })
             */
            removeFile: function( file ) {
                var me = this;
    
                file = file.id ? file : me.queue.getFile( file );
    
                file.setStatus( Status.CANCELLED );
               
                me.owner.trigger( 'fileDequeued', file );
            },
    
            /**
             * @method getFiles
             * @grammar getFiles() => Array
             * @grammar getFiles( status1, status2, status... ) => Array
             * @description 返回指定状态的文件集合，不传参数将返回所有状态的文件。
             * @for  Uploader
             * @example
             * console.log( uploader.getFiles() );    // => all files
             * console.log( uploader.getFiles('error') )    // => all error files.
             */
            getFiles: function() {
                return this.queue.getFiles.apply( this.queue, arguments );
            },
    
            fetchFile: function() {
                return this.queue.fetch.apply( this.queue, arguments );
            },
            /**
             * @method retry
             * @grammar retry() => undefined
             * @grammar retry( file ) => undefined
             * @description 重试上传，重试指定文件，或者从出错的文件开始重新上传。
             * @for  Uploader
             * @example
             * function retry() {
             *     uploader.retry();
             * }
             */
            retry: function( file, noForceStart ) {
                var me = this,
                    files, i, len;
    
                if ( file ) {
                    file = file.id ? file : me.queue.getFile( file );
                    file.setStatus( Status.QUEUED );
                    me.request('start-upload');
                    //noForceStart || me.request('start-upload');
                    return;
                }
    
                files = me.queue.getFiles( Status.ERROR );
                i = 0;
                len = files.length;
    
                for ( ; i < len; i++ ) {
                    file = files[ i ];
                    file.setStatus( Status.QUEUED );
                }
    
                me.request('start-upload');
            },
    
            /**
             * @method sort
             * @grammar sort( fn ) => undefined
             * @description 排序队列中的文件，在上传之前调整可以控制上传顺序。
             * @for  Uploader
             */
            sortFiles: function() {
                return this.queue.sort.apply( this.queue, arguments );
            },
    
            /**
             * @method reset
             * @grammar reset() => undefined
             * @description 重置uploader。目前只重置了队列。
             * @for  Uploader
             * @example
             * uploader.reset();
             */
            reset: function() {
                this.queue = new Queue();
                this.stats = this.queue.stats;
            }
        });
    
    });

    /**
     * @fileOverview 各种验证，包括文件总大小是否超出、单文件是否超出和文件是否重复。
     */
    
    define('widgets/validator',[
        'base',
        'uploader',
        'file'
    ], function( Base, Uploader, WUFile ) {
    
        var $ = Base.$,
            validators = {},
            api;
    
        /**
         * @event error
         * @param {String} type 错误类型。
         * @description 当validate不通过时，会以派送错误事件的形式通知调用者。通过`upload.on('error', handler)`可以捕获到此类错误，目前有以下错误会在特定的情况下派送错来。
         *
         * * `Q_EXCEED_NUM_LIMIT` 在设置了`fileNumLimit`且尝试给`uploader`添加的文件数量超出这个值时派送。
         * * `Q_EXCEED_SIZE_LIMIT` 在设置了`Q_EXCEED_SIZE_LIMIT`且尝试给`uploader`添加的文件总大小超出这个值时派送。
         * @for  Uploader
         */
    
        // 暴露给外面的api
        api = {
    
            // 添加验证器
            addValidator: function( type, cb ) {
                validators[ type ] = cb;
            },
    
            // 移除验证器
            removeValidator: function( type ) {
                delete validators[ type ];
            }
        };
    
        // 在Uploader初始化的时候启动Validators的初始化
        Uploader.register({
            init: function() {
                var me = this;
                $.each( validators, function() {
                    this.call( me.owner );
                });
            }
        });
    
        /**
         * @property {int} [fileNumLimit=undefined]
         * @namespace options
         * @for Uploader
         * @description 验证文件总数量, 超出则不允许加入队列。
         */
        api.addValidator( 'fileNumLimit', function() {
            var uploader = this,
                opts = uploader.options,
                count = 0,
                max = opts.fileNumLimit >> 0,
                flag = true;
    
            if ( !max ) {
                return;
            }
    
            uploader.on( 'beforeFileQueued', function() {
    
                if ( count >= max && flag ) {
                    flag = false;
                    this.trigger( 'error', 'Q_EXCEED_NUM_LIMIT', max );
                    setTimeout(function() {
                        flag = true;
                    }, 1 );
                }
    
                return count >= max ? false : true;
            });
    
            uploader.on( 'fileQueued', function() {
                count++;
            });
    
            uploader.on( 'fileDequeued', function() {
                count--;
            });
    
            uploader.on( 'uploadFinished', function() {
                count = 0;
            });
        });
    
    
        /**
         * @property {int} [fileSizeLimit=undefined]
         * @namespace options
         * @for Uploader
         * @description 验证文件总大小是否超出限制, 超出则不允许加入队列。
         */
        api.addValidator( 'fileSizeLimit', function() {
            var uploader = this,
                opts = uploader.options,
                count = 0,
                max = opts.fileSizeLimit >> 0,
                flag = true;
    
            if ( !max ) {
                return;
            }
    
            uploader.on( 'beforeFileQueued', function( file ) {
                var invalid = count + file.size > max;
    
                if ( invalid && flag ) {
                    flag = false;
                    this.trigger( 'error', 'Q_EXCEED_SIZE_LIMIT', max );
                    setTimeout(function() {
                        flag = true;
                    }, 1 );
                }
    
                return invalid ? false : true;
            });
    
            uploader.on( 'fileQueued', function( file ) {
                count += file.size;
            });
    
            uploader.on( 'fileDequeued', function( file ) {
                count -= file.size;
            });
    
            uploader.on( 'uploadFinished', function() {
                count = 0;
            });
        });
    
        /**
         * @property {int} [fileSingleSizeLimit=undefined]
         * @namespace options
         * @for Uploader
         * @description 验证单个文件大小是否超出限制, 超出则不允许加入队列。
         */
        api.addValidator( 'fileSingleSizeLimit', function() {
            var uploader = this,
                opts = uploader.options,
                max = opts.fileSingleSizeLimit;
    
            if ( !max ) {
                return;
            }
    
            uploader.on( 'beforeFileQueued', function( file ) {
    
                if ( file.size > max ) {
                    file.setStatus( WUFile.Status.INVALID, 'exceed_size' );
                    this.trigger( 'error', 'F_EXCEED_SIZE',max,file );
                    return false;
                }
    
            });
    
        });
    
        /**
         * @property {int} [duplicate=undefined]
         * @namespace options
         * @for Uploader
         * @description 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
         */
        api.addValidator( 'duplicate', function() {
            var uploader = this,
                opts = uploader.options,
                mapping = {};
    
            if ( opts.duplicate ) {
                return;
            }
    
            function hashString( str ) {
                var hash = 0,
                    i = 0,
                    len = str.length,
                    _char;
    
                for ( ; i < len; i++ ) {
                    _char = str.charCodeAt( i );
                    hash = _char + (hash << 6) + (hash << 16) - hash;
                }
    
                return hash;
            }
    
            uploader.on( 'beforeFileQueued', function( file ) {
                var hash = file.__hash || (file.__hash = hashString( file.name +
                        file.size + file.lastModifiedDate ));
    
                // 已经重复了
                if ( mapping[ hash ] ) {
                    this.trigger( 'error', 'F_DUPLICATE' );
                    return false;
                }
            });
    
            uploader.on( 'fileQueued', function( file ) {
                var hash = file.__hash;
    
                hash && (mapping[ hash ] = true);
            });
    
            uploader.on( 'fileDequeued', function( file ) {
                var hash = file.__hash;
    
                hash && (delete mapping[ hash ]);
            });
        });
    
        return api;
    });


    // -----------------------
    define('webuploader',[
        'base'
    ], function( base ) {

        return base;
    });

    return require('webuploader');

});
