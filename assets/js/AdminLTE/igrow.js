/*
    全局 api 配置 
    请求地址:version + api
    @params
        demo:'统一本地资源前缀'
        host:'http://api.igrow.com'
        version:''  
        mode: 'server' or 'demo' or '' 。 'server':全局使用服务器接口,'demo':全局使用本地模拟数据,'':根据匹配到的api具体配置
 */
(function(){
    var host = 'http://' + location.host + '/public';
    window.API = {
        host:host,
        version:'',
        demo:'/assets/api',
        //server: host + '/app/dao/dao.php',
        mode:'demo',
        map:{
            /* 用户 */
            '/user/search':{
                //mode:'demo',
                description:''
            },
            '/user/list':{
                //mode:'demo',
                description:''
            },
            '/user/get':{
                //mode:'demo',
                description:''
            },
            '/user/update':{
                //mode:'demo',
                description:''
            },
            '/user/create':{
                //mode:'demo',
                description:''
            },
            '/user/delete':{
                //mode:'demo',
                description:''
            },
            '/user/current':{
                //mode:'demo',
                description:'获取当前用户'
            },
            '/user/validate':{
                //mode:'demo',
                server:'/app/dao/login.php',
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
*/

(function(){
    var dir = 'http://' + location.host + '/public';
    var IGrow = window['IGrow'] = {
        login:window['API']['host']+'/login.html',
        logout:window['API']['host']+'/app/dao/logout.php',
        admin:window['API']['host']+'/admin.html',
        host:'http://' + location.host,
        dir:dir,
        page:'_page',
        pagesize:'_pagesize',
        log:function(){
            console.log.apply(console,arguments);
        },
        seajs_dir:window['API']['host'], // 配置seajs路径
        modules:[
            /* 公共 */
            {
                redirectTo:'/dashboard'
            },
            {
                body:'404',
                route:'/404',
                title:'error',
                template:'<div class="error-404">404 Error</div>',
                dependency:[]
            },
            /*出错*/
            {
                body:'',
                route:'/error',
                title:'error',
                template:'<div style=" text-align:center;padding:15px;">error</div>',
                dependency:[]
            },
            // 首页
            {
                route:'/dashboard',
                title:'首页',
                controller: function($scope, $routeParams, $location) {
                    console.log('dashboard')
                    
                },
                template: '<div class="wrapper"><div class="welcome"><div class="welcome-txt">欢迎使用文章管理系统</div></div>',
                dependency:[],
                description:'作业详情-跳转'
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
    };
    



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