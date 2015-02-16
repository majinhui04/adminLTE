/**
 *  自己的模块自己做主 
 *  @todo  指令无法用
 **/
 

 /*
// 引用
var injectorApp = require('../../public/injectorApp');
// 调用
var studentService = angular.injector(['ng', 'injectorApp']).get('studentService');
    studentService.get({},function(result){
        var student = result.data || {};
        $scope.name = student.name
    });

  */
define(function (require, exports, module) {
    var angularCoreApp = require('angular-core');
    var injectorApp = angular.module('injectorApp',['angular-core']);

    injectorApp.service('studentService',['resource',function(resource){
        var dao = resource('/school/student');
        return dao;
    }]);

    injectorApp.service('testService',['resource',function(resource){
        
        return {
            show:function(){
                console.log('testService')
            }
        };
    }]);

    return injectorApp;
});