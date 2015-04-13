define(function(require, exports, module) {
    require('/public/assets/igrow/angular/angular-core');
    /*require('angular-route');
    require('angular-lazyload');
    require('angular-core');
    require('angular-sanitize');*/
    if(!location.hash) {
        location.hash = '#/dashboard';
    }
    

    var app = angular.module('adminApp', ['ngRoute','angular-lazyload', 'angular-core','ngSanitize']);
    var IGrow = window['IGrow'] || {};
    //配置期
    app.config(['$routeProvider','$compileProvider',
        function($routeProvider,$compileProvider) {
            // 去除链接中的unsafe
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
        }
    ]);

    // WdatePicker 日历
    app.directive('wdatepicker', function () {
       
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function ($scope, elm, attr, $ngModelCtrl) {
                var datefmt = elm.attr('datefmt') || 'yyyy-MM-dd ';
                
                elm[0].onclick = function(e){
                    window.WdatePicker({
                        dateFmt:datefmt,
                        onpicked:function(){
                            var value = this.value;

                            console.log('date',this.value)
                            $scope[attr.ngModel] = value;
                            $ngModelCtrl.$setViewValue(value);
                            $scope.$apply();
                        }
                    });
                    
                };

               
            }
        }
    });
    // 编辑器
    app.directive('editor', function () {
       
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elm, attr, ngModelCtrl) {
                var id = elm[0].id;
            
                window.UE.getEditor(id).ready(function() {
                    //this是当前创建的编辑器实例
                    this.setContent('');
                });
                var isSet = false;
                scope.$watch(attr.ngModel, function (content) {

                    //var content = scope[attr.ngModel] || '';
                    //console.log(111111,content,attr.ngModel,content)
                    setTimeout(function(){
                        window.UE.getEditor(id).ready(function() {
                            //this是当前创建的编辑器实例
                            this.setContent(content);
                        });
                    },10);
                    isSet = true;
                        
                });
                
                    
               
            }
        }
    });

    // auto iframe
    app.directive('autoiframe', function () {
       
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elm, attr, ngModelCtrl) {
                var iframe = elm[0];
                
                iframe.onload = function(){
                    //var iframe = document.getElementById("frameWin");
                    var newHeight;
                    if (iframe.document) {
                        newHeight = iframe.document.body.scrollHeight + 20 + "px";
                    } else {
                        newHeight = iframe.contentDocument.body.scrollHeight + 20 + "px";
                    }
                    iframe.style.height = newHeight;
                }
               
            }
        }
    });

    // treeview
    app.directive('treeview', function () {
       
        return {
            restrict: 'A',
            //require: '?ngModel',
            link: function (scope, elm, attr, ngModelCtrl) {
                
               return elm.each(function() {
                    var btn = $(this).children("a").first();
                    var menu = $(this).children(".treeview-menu").first();
                    var isActive = $(this).hasClass('active');

                    //initialize already active menus
                    if (isActive) {
                        menu.show();
                        btn.children(".fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
                    }
                    //Slide open or close the menu on link click
                    btn.click(function(e) {
                        //e.preventDefault();
                        if (isActive) {
                            //Slide up to close menu
                            menu.slideUp();
                            isActive = false;
                            btn.children(".fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
                            btn.parent("li").removeClass("active");
                        } else {
                            //Slide down to open menu
                            menu.slideDown();
                            isActive = true;
                            btn.children(".fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
                            btn.parent("li").addClass("active");
                        }
                    });

                    /* Add margins to submenu elements to give it a tree look */
                    menu.find("li > a").each(function() {
                        var pad = parseInt($(this).css("margin-left")) + 10;

                        $(this).css({"margin-left": pad + "px"});
                    });

                });

            }
        }
    });
    /*分页*/
    app.directive('pagination', function () {
       
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elm, attr, ngModelCtrl) {

                var pageModel = scope[attr.ngModel];
                var target = attr.ngModel+'.total';
        
                if(!ngModelCtrl) return;
                if(!pageModel) return;
            
                scope.$watch(target, function (total) {
                    var pageModel = scope[attr.ngModel];
                
                    pageModel.page = pageModel.page || 1;
                    page = pageModel.page;
                
                    total = total ? total : 0;
                    //console.log('total',total)
                    if (total === 0) {
                        elm.html('');
                        return;
                    }
                    elm.addClass('pagination');
                    elm.pagination(total,{
                        current_page:page - 1,
                        items_per_page:pageModel.pagesize,
                        $scope:scope,
                        callback:function(page){
                            pageModel.page = page+1;
                            pageModel.click && pageModel.click(page+1);
                            return false;
                        }
                    }); 

                });
               
            }
        }
    });
    // 若图片加载不出来
    app.directive('imgError',function(){
        return {
                restrict : 'A',
                link:function(scope, elm, attr, ngModelCtrl){
                    var imgError = '/assets/img/public/img-error.jpg';
                 
                    elm[0].onerror = function(){
                        this.src = imgError;
                        this.setAttribute('data-original', imgError);
                    };
                }
        }; 
    });

    
    
    /* 自定义 MLoading */
    app.factory('mLoading',function(){
        //console.log(111111,IGrow)
        return IGrow.mobile.loading;
    });
    /* 自定义 MNotice */
    app.factory('mNotice',function(){

        return {};
    });
    app.controller('adminController',['$scope','$q','$route','$timeout','routeConfig','resource', 'mLoading','mNotice','$routeParams','$route',function($scope,$q,$route,$timeout,routeConfig,resource,mLoading,mNotice,$routeParams,$route){
        var userDao = resource('/user',{ extra:'user' },{current:{}});

        var Guests = window.Guests || [];
        var username = localStorage.getItem('username') || '';

        // 用户列表
        for (var i = Guests.length - 1; i >= 0; i--) {
            if(Guests[i].username == username) {
                $scope.user = Guests[i];
                break;
            }
        };

        // 左侧菜单
        $scope.menus = window.Menus || [];
        for (var i = $scope.menus.length - 1; i >= 0; i--) {
            $scope.menus[i].icon = $scope.menus[i].icon || 'fa fa-folder';
        };

        $scope.user = $scope.user || { name:'喵星人',avatar:'/public/assets/img/cat.jpg' };


        $scope.logout = IGrow.logout;
        
        $scope.run = function(){
            $scope.test = 'test';
            console.log('$scope.run')
            // 初始化路由
            routeConfig(IGrow.modules);

            $scope.bindUI();
        };
        $scope.bindUI = function(){
            
        };
        

        // init
        $scope.run();


        
    }]);

    //运行期
    app.run(['$rootScope','$lazyload', function($rootScope,$lazyload) {
            //Step5: init lazyload & hold refs
            $lazyload.init(app);
            app.register = $lazyload.register;

            var locationChangeStartOff = $rootScope.$on('$locationChangeStart', locationChangeStart);  
            var locationChangeSuccessOff = $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);  
            var routeChangeStartOff = $rootScope.$on('$routeChangeStart', routeChangeStart);  
            var routeChangeSuccessOff = $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);  
          
            function locationChangeStart(event) {  
                //$log.log('locationChangeStart');  
                //$log.log(arguments);  
            }  
          
            function locationChangeSuccess(event) {  
                //$log.log('locationChangeSuccess');  
                //$log.log(arguments); 
                hashChange();
            }  
          
            function routeChangeStart(event) {  
                //$log.log('routeChangeStart');  
                //$log.log(arguments);  
            }  
          
            function routeChangeSuccess(event) {  
                //$log.log('routeChangeSuccess');  
                //$log.log(arguments); 
                //$log.log(11111111111111,$location.hash(),location.hash) 
                
            }  



            function hashChange(hash) {
                var module;
                var modules = IGrow.modules || [];
                var hash = hash || location.hash|| '',
                    match = /(#\/\w+)\/?\S*?/.exec(hash),
                    route = match?match[1]:'',
                    $target = $('.sidebar').find('a[href="'+hash+'"]'),
                    $li = $target.closest('li'),
                    title = '',
                    $parent = $li.parent().closest('.treeview');

                console.log('hash,route,111',hash,route,111);
                console.log('$target',$target,$parent)
                
                for (var i = modules.length - 1; i >= 0; i--) {
                    if(modules[i].route == hash.substring(1)){
                        module = modules[i];
                        title = modules[i].title;
                        break;
                    }
                };
                console.log('title',title)

                // 面包屑
                $('.content-header h1 span,.breadcrumb .active').text(title);
                
                $('.treeview-menu li ').removeClass('active');
                $li.addClass('active');
                $parent.addClass('active');
            }

        }
    ]);

    module.exports = app;
});