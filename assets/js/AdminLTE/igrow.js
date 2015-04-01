/*
    全局 api 配置 
    @params
        host:'http://api.igrow.com'
        version:''  
        map: ajax路径匹配
 */
(function(){
    // 全局路径配置 "http://"
    var dir = window.iDir = 'http://' + location.host + '/public';
    window.API = {
        host:dir, // 数据请求的绝对路径
        version:'',// 版本暂不使用
        demo:'/assets/api',
        //server: host + '/app/dao/dao.php',
        mode:'demo',
        map:{
            /* 用户 */
            '/user/list':{
                demo:'/assets/api/user/list.txt', // 模拟的静态数据路径
                // server:"/restful/api/user.php", //真实的服务器数据请求路径
                description:''
            },
            '/user/get':{
                demo:'/assets/api/user/get.txt',
                description:''
            },
            '/user/update':{
                demo:'/assets/api/user/update.txt',
                description:''
            },
            '/user/create':{
                demo:'/assets/api/user/create.txt',
                description:''
            },
            '/user/delete':{
                demo:'/assets/api/user/delete.txt',
                description:''
            },
            '/user/current':{
                demo:'/assets/api/user/current.txt',
                description:'获取当前用户'
            },
            '/user/validate':{
                demo:'/assets/api/user/validate.txt',
                //server:'/app/dao/login.php',
                description:''
            },

            /* 文章类别 */
            '/topicType/search':{
                demo:'/assets/api/topicType/search.txt',
                description:'文章类别搜索'
            },
            '/topicType/list':{
                demo:'/assets/api/topicType/list.txt',
                description:'文章类别列表'
            },
            '/topicType/get':{
                demo:'/assets/api/topicType/get.txt',
                description:'文章类别获取'
            },
            '/topicType/update':{
                demo:'/assets/api/topicType/update.txt',
                description:'文章类别更新'
            },
            '/topicType/create':{
                demo:'/assets/api/topicType/create.txt',
                description:'文章类别创建'
            },
            '/topicType/delete':{
                demo:'/assets/api/topicType/delete.txt',
                description:'文章类别删除'
            },

            /* 文章 */
            '/topic/search':{
                //mode:'demo',
                description:'文章类别搜索'
            },
            '/topic/list':{
                demo:'/assets/api/topic/list.txt',
                description:'文章类别列表'
            },
            '/topic/get':{
                demo:'/assets/api/topic/get.txt',
                description:'文章类别获取'
            },
            '/topic/update':{
                demo:'/assets/api/topic/update.txt',
                description:'文章类别更新'
            },
            '/topic/create':{
                demo:'/assets/api/topic/create.txt',
                description:'文章类别创建'
            },
            '/topic/delete':{
                demo:'/assets/api/topic/delete.txt',
                description:'文章类别删除'
            }
            
        }
    };
})();

/*
*  全局参数配置 
*  IGrow = { api:'ajax前缀',dir:'网站根目录',modules = [] }
*  modules中包含所有的路由控制 每个路由对应html模板和js
*/

(function(){
    window.IGrow = window.IGrow || {};
    var dir = window.iDir;
    var IGrow = $.extend(window['IGrow'], {
        login:dir + '/login.html',
        logout:dir + '/app/dao/logout.php',
        admin:dir + '/admin.html',
        host:'http://' + location.host,
        dir:dir,
        page:'_page', // 分页参数名称
        pagesize:'_pagesize', // 分页大小参数名称
        log:function(){
            console.log.apply(console,arguments);
        },
        seajs_dir:dir, // 配置seajs路径
        modules:[
            // 默认跳转 
            {
                redirectTo:'/404'
            },
            // 404
            {
                body:'404',
                route:'/404',
                title:'error',
                templateUrl:'/assets/tpl/404.html',
                dependency:[]
            },
            
            // 首页
            {
                route:'/dashboard',
                title:'首页',
                controller: function($scope, $routeParams, $location) {
                    
                    
                },
                templateUrl: '/assets/js/controllers/dashboard/dashboard.html',
                dependency:[],
                description:''
            },

            /*
                Mobile
            */
            {
                route:'/mobile/api',
                title:'移动端',
                controller: function($scope, $routeParams, $location) {
                    
                    //  /assets/js/controllers/mobile/api.html
                },
                template: '<div class=""><iframe autoiframe id="frameWin" src="/public/admin/pages/mobile/api.html" name="opWin" style="min-height:400px;width:100%;" frameborder="0" scrolling="no"></iframe></div>',
                dependency:[],
                description:''
            },
            {
                route:'/mobile/animate',
                title:'动画',
                controller: function($scope, $routeParams, $location) {
                    
                    //  /assets/js/controllers/mobile/api.html
                },
                template: '<div class=""><iframe autoiframe id="frameWin" src="/public/admin/pages/mobile/animate.html" name="opWin" style="min-height:400px;width:100%;" frameborder="0" scrolling="no"></iframe></div>',
                dependency:[],
                description:''
            },
            {
                route:'/mobile/animate1',
                title:'animate.css',
                controller: function($scope, $routeParams, $location) {
                    
                    //  /assets/js/controllers/mobile/api.html
                },
                template: '<div class=""><iframe autoiframe id="frameWin" src="/public/admin/pages/mobile/animate_css.html" name="opWin" style="min-height:400px;width:100%;" frameborder="0" scrolling="no"></iframe></div>',
                dependency:[],
                description:''
            },

            /* 
                文章类别

            */
            // 文章类别列表
            {
                route:'/article_type',
                controller:'articleTypeController',
                title:'文章类别列表',
                controllerUrl:'/assets/js/controllers/article/articleTypeController.js',
                templateUrl:'/assets/js/controllers/article/articleType.html',
                description:''
            },
            // 文章类别添加
            {
                route:'/article_type/add',
                controller:'articleTypeAddController',
                title:'文章类别添加',
                controllerUrl:'/assets/js/controllers/article/articleTypeController.js',
                templateUrl:'/assets/js/controllers/article/articleTypeEdit.html',
                description:''
            },
            // 文章类别编辑
            {
                route:'/article_type/update/:id',
                controller:'articleTypeUpdateController',
                title:'文章类别编辑',
                controllerUrl:'/assets/js/controllers/article/articleTypeController.js',
                templateUrl:'/assets/js/controllers/article/articleTypeEdit.html',
                description:''
            },

            /* 
                文章 

            */
            // 文章列表
            {
                route:'/article',
                controller:'articleController',
                title:'文章列表',
                controllerUrl:'/assets/js/controllers/article/articleController.js',
                templateUrl:'/assets/js/controllers/article/article.html',
                description:''
            },
            // 文章添加
            {
                route:'/article/add',
                controller:'articleAddController',
                title:'文章添加',
                controllerUrl:'/assets/js/controllers/article/articleEditController.js',
                templateUrl:'/assets/js/controllers/article/articleEdit.html',
                description:''
            },
            // 文章编辑
            {
                route:'/article/update/:id',
                controller:'articleUpdateController',
                title:'文章编辑',
                controllerUrl:'/assets/js/controllers/article/articleEditController.js',
                templateUrl:'/assets/js/controllers/article/articleEdit.html',
                description:''
            },
            // 文章预览
            {
                route:'/article/preview/:id',
                controller:'articlePreviewController',
                title:'文章预览',
                controllerUrl:'/assets/js/controllers/article/articlePreviewController.js',
                templateUrl:'/assets/js/controllers/article/articlePreview.html',
                description:''
            },

            /* 
                用户 

            */
            {
                route:'/user',
                controller:'userController',
                title:'用户列表',
                controllerUrl:'/assets/js/controllers/user/userController.js',
                templateUrl:'/assets/js/controllers/user/user.html',
                description:''
            },
            {
                route:'/user/add',
                controller:'userAddController',
                title:'用户添加',
                controllerUrl:'/assets/js/controllers/user/userController.js',
                templateUrl:'/assets/js/controllers/user/userEdit.html',
                description:''
            },
            {
                route:'/user/update/:id',
                controller:'userUpdateController',
                title:'用户编辑',
                controllerUrl:'/assets/js/controllers/user/userController.js',
                templateUrl:'/assets/js/controllers/user/userEdit.html',
                description:''
            }
            
            
        ]
    });
    



})();

/* 
*
*  seajs 配置 
*  
*/
(function(){
    var seajs_dir = window['IGrow']['seajs_dir'] || '';
    // 设置别名
    var alias = {
        // libs
        'My97DatePicker':'/assets/vendor/My97DatePicker/WdatePicker.js',
        'angular-sanitize':'/assets/js/libs/angularjs/1.2.14/angular-sanitize.min.js',
        'angular-route':'/assets/js/libs/angularjs/1.2.14/angular-route.min.js',
        'ueditor-config':'/assets/js/AdminLTE/ueditor.config.js',
        'ueditor-all':'/assets/vendor/ueditor/1.4.3/ueditor.all.min.js',
        'ueditor-lang':'/assets/vendor/ueditor/1.4.3/lang/zh-cn/zh-cn.js',
        // plugins
        'datetimepicker.css':'/assets/js/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
        'datetimepicker.js':'/assets/js/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',
        'mediaelement.js':'/assets/js/plugins/mediaelement/2.13.1/mediaelement-and-player.min.js',
        'mediaelement.css':'/assets/js/plugins/mediaelement/2.13.1/mediaelementplayer.min.css',
        // core
        'angular-core':'/assets/js/core/angular-core.js',
        'angular-lazyload': '/assets/js/core/angular-lazyload.js',
        // seajs module
        'datetimepickerDirective':'/assets/js/directive/datetimepickerDirective.js',
        'media':'/assets/js/public/media.js',

        // seajs app
        'adminApp':'/assets/js/AdminLTE/adminApp.js'

    };
    for(var key in alias){
        alias[key] = seajs_dir + alias[key];
    };

    window['seajs'] && seajs.config({
        alias:alias,
        charset: 'utf-8',
        map: [
            [ /(controllers\/\w+\/\w+)(\.js)/i,'$1$2?'+new Date().valueOf() ]
            //[ /^(.*\.(?:css|js))(.*)$/i, '$1?'+new Date().valueOf() ]
        ]
    });

    window['seajs'] && seajs.on('error', function(module){

        if(module.status!=5){
            alert(module.status)
            console.error('seajs error: ', module);
        }
    });

})();