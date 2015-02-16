define(function(require,module,exports){
    
    var adminApp = require('adminApp');

    
    adminApp.register.controller('articlePreviewController',['$scope', '$q', 'mLoading','mNotice','resource','$routeParams',
        function($scope, $q, mLoading,mNotice,resource,$routeParams){
            var articleDao = resource('/topic',{ extra:'article' });
            
            $scope.run = function(){

                mLoading.show();

                // 获取文章详情
                articleDao.get({id:$routeParams.id},function(result){
                    $scope.data = result.data || {};

                },function(result){
                    mNotice(result.message,'error');
                },function(){
                    mLoading.hide();
                });

            };

            $scope.run();

        }
    ]);

    return adminApp;
});