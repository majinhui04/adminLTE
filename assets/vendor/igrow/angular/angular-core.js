/*
 *    anuglar 通用的核心服务
 *    
 */
define(function(require, exports, module) {
    "use strict";
    
    // 配置
    var IGrow = window['IGrow'];
    var API = window['API'] || {};
    var app = angular.module('angular-core', ['ngRoute']);
    
    app.config(['$compileProvider', '$controllerProvider', '$filterProvider', '$httpProvider', '$provide', '$routeProvider' , function($compileProvider, $controllerProvider, $filterProvider, $httpProvider, $provide, $routeProvider){
        /*
            路由配置器
            多个路由共享同一个控制器 route: '' or [], title:'' or []
            example:
            {
                route:['/user/album','/:uid/user/album'],
                controller:'userAlbumController',
                title:['我的相册','相册'],
                controllerUrl:'modules/user/userAlbumController.js',
                templateUrl:'modules/user/userAlbum.html',
                dependency:[]
            },
            {
                body:'',
                route:'/error',
                title:'error',
                template:'<div style=" text-align:center;padding:15px;">error</div>',
                dependency:[]
            },
            {
                redirectTo:'/error'
            }

         */
        $provide.factory('routeConfig', [ function () {
            return function (modules) {

                var dir = IGrow.dir, ret = [];

                angular.forEach(modules, function(module , i) {
                    var copy ,title;
                    if(module.route && angular.isArray(module.route)){
                        for(var i = 0; i<module.route.length; i++){
                            copy = angular.copy(module);
                            copy.route = module.route[i];
                            copy.title = angular.isArray(module.title)?module.title[i]:module.title;
                            copy.controller = angular.isArray(module.controller)?module.controller[i]:module.controller;
                            copy.wrapper = angular.isArray(module.wrapper)?module.wrapper[i]:module.wrapper;
                            ret.push(copy);
                        }
                    }else{
                        ret.push(module);
                    }
                });
                
                angular.forEach(ret, function(module , i) {
                    var timeStamp = new Date().valueOf(),
                        template = module.template,
                        templateUrl =  module.templateUrl || module.view,
                        controller = module.controller,
                        controllerUrl = module.controllerUrl || module.path,
                        body = module.body,
                        title = module.title,
                        route = module.route,
                        wrapper = module.wrapper || '',
                        config = {
                            wrapper:wrapper,
                            body:body,
                            title:title
                        };

                    if(templateUrl) {
                        config.templateUrl = dir + templateUrl+ '?' + timeStamp;
    
                    }else if(typeof template === 'string'){
                        config.template = template;
                    }
                    //console.log(config)
                    // 假如需要动态加载controller
                    if( controllerUrl && typeof controller === 'string' ) {
                        config.controller = controller;
                        config.controllerUrl = dir + controllerUrl;
                    }else if( typeof controller === 'function' ) {
                        config.controller = controller;
                    }else{
                        config.controller = function($scope){
                            
                        };
                    }

                    // 假如是重定向
                    if(module.redirectTo){
                        $routeProvider.otherwise({ redirectTo:module.redirectTo });
                    }else {
                        $routeProvider.when(route,config);
                    }
                   
                });

            }

        }]);

        /*  module register 暂未使用 */
        $provide.factory('moduleRegister', ['$injector', '$log', function ($injector, $log) {
            var cache = [],
                requires = [],
                runBlocks = [],
                invokeQueue = [],
                providers = {
                    $compileProvider: $compileProvider,
                    $controllerProvider: $controllerProvider,
                    $filterProvider: $filterProvider,
                    $provide: $provide
                };
            return function (modules) {
                angular.forEach(modules, function (name, module) {
                    try {
                        if (module = angular.module(name).requires) {
                            requires = requires.concat(module);
                            this.push(name)
                        }
                    } catch (ex) {
                        if (ex.message) { ex.message += ' from ' + name; }
                        $log.error(ex.message);
                        throw ex
                    }
                }, modules = []);
                angular.forEach(requires, function (name) {
                    try {
                        angular.module(name) && modules.push(name)
                    } catch (ex) {
                        if (ex.message) { ex.message += ' from ' + name; }
                        $log.error(ex.message);
                        throw ex
                    }
                });
                angular.forEach(modules, function (module, index) {
                    try {
                        index = modules[modules.length - index - 1];
                        module = angular.module(index);
                        if (cache.indexOf(module.name) === -1) {
                            cache.push(module.name);
                            runBlocks = runBlocks.concat(module._runBlocks);
                            invokeQueue = invokeQueue.concat(module._invokeQueue);
                        }
                    } catch (ex) {
                        if (ex.message) { ex.message += ' from ' + index; }
                        $log.error(ex.message);
                        throw ex
                    }
                });
                angular.forEach(invokeQueue, function (queue, provide) {
                    try {
                        providers.hasOwnProperty(queue[0]) && (provide = providers[queue[0]]) && provide[queue[1]].apply(provide, queue[2]);
                        /*$log.error('unsupported provider ' + queue[0]);*/
                    } catch (ex) {
                        if (ex.message) { ex.message += ' from ' + queue[0]; }
                        $log.error(ex.message);
                        throw ex
                    }
                });
                angular.forEach(runBlocks, function (fn) { $injector.invoke(fn) });
            }
        }]);

    }]);
    /* 
        自定义ajax 
        @params
            _expire:1405492661238 //过期时间戳
    
    */
    app.factory('http', ['$http', '$q',
        function($http, $q ) {
            var Cache = {};
            var http = window['http'] = {
                ajax: function(url, data, opts,successCallback, failCallback,always) {
                    var self = this,
                        opts = opts || {},
                        data = data || {},
                        deferred = $q.defer(),
                        method = opts.type || 'GET',
                        dataType = opts.dataType || 'json',
                        timeout = opts.timeout || 60 * 1000,
                        context = opts.context || self,
                        expire = data._expire,// 数据保留时间
                        now = new Date().valueOf(),
                        params = jQuery.param(data),
                        cache_url = url + '?' + params,
                        result,
                        config = {};

           
                    if('GET' === method && expire && Cache[cache_url] && ( now-Cache[cache_url]['t']<expire ) ) {
                        result = Cache[cache_url]['data'];
                        successCallback && successCallback(result);
                        deferred.resolve(result);
                        always && always();

                        return deferred.promise;
                    }
                    delete data._expire;
                    config = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        transformRequest: function(obj) {
                            return jQuery.param(obj);
                        },
                        method: method,
                        url: url,                        
                        dataType: dataType,
                        data: data

                    };
                    if (method === 'POST') {
                        config.data = data;
                    } else {
                        config.params = data;
                    }

                    $http(config).success(function(data, status, headers, config) {
                        var message;
                        
                        if (data.code && data.code > 200) {
                            
                            message = data.message;
                            deferred.reject({
                                status:status,
                                message: message
                            });
                            failCallback && failCallback({
                                status:status,
                                message: message
                            });
                            
                        } else {
                            if(expire){
                                Cache[cache_url] = {
                                    data:data,
                                    t:now
                                };
                            }
                            successCallback && successCallback(data);
                            deferred.resolve(data);
                            
                        }
                        always && always();

                    }).error(function(data, status, headers, config) {
                        var message = '';

                        //console.warn(data)
                        if(data.code && data.code != 0){
                            message = data.message;
                            // 若未登录
                            if(data.code == 10020002){
                                var hash = location.hash || '';
                            }
                        }else {
                            data = {
                                message: '服务器出错'
                            };
                            
                        }
                        failCallback && failCallback(data);
                        deferred.reject({
                            status:status,
                            message: message
                        });
                        always && always();

                    });

                    return deferred.promise;
                },
                get: function(url, data,successCallback, failCallback,always) {

                    return this.ajax(url, data, {
                        type: 'GET'
                    },successCallback, failCallback,always);

                },
                post: function(url, data, successCallback, failCallback,always) {

                    return this.ajax(url, data, {
                        type: 'POST'
                    },successCallback, failCallback,always);

                },
                // 处理请求错误
                handleXhrError: function(xhr) {
                    var responseText,
                        error = {},
                        isResponseObject = function(xhr) {
                            return /^{/.test(xhr.responseText);
                        };

                    if (xhr.statusText === 'timeout') {
                        error.message = '请求超时 ';
                    } else if (xhr.message) {
                        error = xhr;
                    } else if (xhr.status == 500 && isResponseObject(xhr)) {
                        try {
                            responseText = xhr.responseText.replace('/\\/g', '//');
                            error = $.parseJSON(responseText);
                            error.message = error.message || '错误未知';

                        } catch (e) {
                            console.warn('responseText parse error');
                            error = {
                                message: ' 错误未知 '
                            };
                        }

                    } else {
                        error = {
                            message: ' 错误未知 '
                        };
                    }

                    error.status = xhr.status;

                    return error;
                }

            };

            return http;


        }
    ]);

   
    /*
        自定义resource 封装api请求
    *   @param url --> string ajax路径 example:假设完整路径 'http://m.igrow.cn/api/1.1b/school/people/get' 则url为'/school/people'
    *   @param options --> object 暂时没用
    *   @param actions --> object example :{ 'get2': { method:'GET',params:{ '默认参数1':'1','默认参数2':'2' } } }
    *
    *  默认返回的对象包含的方法:get,update,create,list,search,_delete   
    *  调用example
    *  var schoolPeople = resource('/school/people',{},{});
    *  schoolPeople.get({id:'1'}), function(result){
    *      console.log('返回的数据',result.data) ;
    *      
    *  },function(result){
    *      console.log( '错误信息',result.message );
    *  },function(){
    *      console.log('always')
    *  });
    */
    app.factory('resource', ['http',
        function(http) {
            var page = IGrow['page'] || '_page';
            var pagesize = IGrow['pagesize'] || '_pagesize';
            var checkURL = function(url){
                var map = API.map || {},
                    version = API.version || IGrow.version || '',
                    match;

                API.demo = API.demo || '';
                match = map[url];
                // 假如API里的请求配置模式是 'demo'
                if ( !match.server) {
                    url = API.host + match.demo;
                    
                } else {
                    url = API.host + match.server;
                }

                return url;
            };
            
            var $resource = function(url, options, actions) {
                var url = url || '',
                    options = options || {}, actions = actions || {},
                    resourse = {}, params;

                
                resourse = {
                    url: url,
                    list: function(data, successCallback, failCallback,always) {
                        var url = this.url + '/list',
                            data = data || {};

                        if(options.extra){data['__action'] = options.extra+'.list';}
                        data[page] = data[page] ? data[page] : 1;
                        data[pagesize] = data[pagesize] ? data[pagesize] : 20;
                        url = checkURL(url);

                        return http.get(url, data ,successCallback, failCallback,always);
                    },
                    get: function(data, successCallback, failCallback,always) {
                        var url = this.url + '/get',
                            data = data || {};

                        if(options.extra){data['__action'] = options.extra+'.get';}
                        url = checkURL(url);
                        return http.get(url, data, successCallback, failCallback,always);
                    },
                    search: function(data, successCallback, failCallback,always) {
                        var url = this.url + '/search',
                            data = data || {};

                        if(options.extra){data['__action'] = options.extra+'.search';}
                        data[page] = data[page] ? data[page] : 1;
                        data[pagesize] = data[pagesize] ? data[pagesize] : 20;
                        url = checkURL(url);

                        return http.get(url, data,successCallback, failCallback,always);
                    },
                    _delete: function(data, successCallback, failCallback,always) {
                        var url = this.url + '/delete',
                            data = data || {};

                        if(options.extra){data['__action'] = options.extra+'.delete';}
                        url = checkURL(url);

                        return http.get(url, data,successCallback, failCallback,always);
                    },
                    create: function(data, successCallback, failCallback,always) {
                        var url = this.url + '/create',
                            data = data || {};

                        if(options.extra){data['__action'] = options.extra+'.create';}
                        url = checkURL(url);

                        return http.post(url, data,successCallback, failCallback,always);
                    },
                    update: function(data, successCallback, failCallback,always) {
                        var url = this.url + '/update',
                            data = data || {};

                        if(options.extra){data['__action'] = options.extra+'.update';}
                        url = checkURL(url);
                        return http.post(url, data,successCallback, failCallback,always);
                    }
                };
                // 自定义action
                for (var action in actions) {
                    var opts = actions[action] || {}, method = opts.method || "GET",
                        params = opts.params || {};

                    method = method.toLowerCase();
                    resourse[action] = (function(url, action, method, params) {

                        return function(data, successCallback, failCallback,always) {
                            var data = data || {};

                            url = resourse['url'] + '/' + action;
                            url = checkURL(url);
                            data = jQuery.extend({}, params, data);

                            return http[method](url, data, successCallback, failCallback,always);

                        };

                    })(url, action, method, params)

                };



                return resourse;

            };

            return $resource;
        }
    ]);

    return app;


});