/*
 *   文章类别管理
 *   
 */
define(function(require, exports, module) {
    
    var app = require('adminApp');

    // 列表
    app.register.controller('articleTypeController', ['$scope', '$q', 'mLoading','mNotice','resource',
        function($scope, $q, mLoading,mNotice,resource) {
            var articleTypeDao = resource('/topicType', { extra:'articletype' });

            // 批量删除 默认disabled
            $scope.checked = false;
            // 点击全选checkbox
            $scope.checkAll = function($event){
                var dataList = $scope.dataList || [],target = $event.currentTarget, checked = target.checked;

                angular.forEach(dataList, function(item, _){
                    item._checked = checked;
                });
                if(checked){
                    $scope.checked = true;
                }else {
                    $scope.checked = false;
                }
                //console.log(checked,$scope.dataList);
            };
            // 点击单个checkbox
            $scope.check = function($event,data){
                var dataList = $scope.dataList || [],target = $event.currentTarget, checked = target.checked,ret = [];

                data._checked = checked;
                angular.forEach(dataList, function(item, _){
                    if(item._checked){ret.push(item);}
                });
                
                $scope.checked = ret.length>0?true:false;
                
            };
            $scope._delete = function(data){
                var dataList = $scope.dataList || [];

                mLoading.show('正在删除...');
                articleTypeDao._delete({ id:data.id },function(result){
                    mLoading.success('删除成功');
                },function(result){
                    mLoading.hide();
                    mNotice(result.message,'error');
                },function(){
                    
                    Utils.removeItem(dataList,data,'id');
                });
            };
            $scope.list = function(){
                
                mLoading.show();
                articleTypeDao.list({ },function(result){
                    var list = result.data || [];
                    
                    $scope.dataList = list;

                },function(result){
                    mNotice(result.message,'error');

                },function(){
                    mLoading.hide();
                });
            };

            $scope.toBulkDeleteView = function(){
                var dataList = $scope.dataList || [], ret = [];

                Utils.confirm('确定批量删除?',function(){
                    angular.forEach(dataList, function(data, _){
                        if(data._checked){
                            $scope._delete(data);
                        };
                    });
                });
                    


            };
           
            $scope.toDeleteView = function(data){
                Utils.confirm('确定删除?',function(){
                    $scope._delete(data);
                });
            };
            

            
            $scope.list();
       
           
           

        }
    ]);
    // 更新
    app.register.controller('articleTypeUpdateController', ['$scope', '$q', 'mLoading','mNotice','resource','$routeParams',
        function($scope, $q, mLoading,mNotice,resource,$routeParams) {
            var articleTypeDao = resource('/topicType', { extra:'articletype' }),
                id = $routeParams.id;

            $scope._action = '修改';
            $scope.run = function(){
                mLoading.show();
                articleTypeDao.get({id:id},function(result){
                    var data = result.data || {};

                    $scope.formData = data;

                },function(result){
                    mNotice(result.message,'error');

                },function(){
                    mLoading.hide();
                });
            };
            $scope.update = function(formData){
                
                mLoading.show('正在保存');
                articleTypeDao.update(formData,function(){
                    mLoading.success(function(){
                        location.hash = '#/article_type';
                    });
                },function(result){
                    mLoading.hide();
                    mNotice(result.message,'error');
                },function(){
                    
                });

            };
            $scope.save  = function(){
                var formData = $scope.formData;

                $scope.update(formData);
            };
           
            $scope.run();
        }
    ]);

    // 添加
    app.register.controller('articleTypeAddController', ['$scope', '$q', 'mLoading','mNotice','resource','$routeParams',
        function($scope, $q, mLoading,mNotice,resource,$routeParams) {
            var articleTypeDao = resource('/topicType', { extra:'articletype' });

            $scope._action = '添加';
            $scope.formData = {};

            $scope.add = function(formData){
                
                mLoading.show('正在保存');
                articleTypeDao.create(formData,function(result){
                    mLoading.success(function(){
                        location.hash = '#/article_type';
                    });
                    
                },function(result){
                    mNotice(result.message,'error');
                    mLoading.hide();
                },function(){
                    
                });

            };
            $scope.save  = function(){
                var formData = $scope.formData;

                $scope.add(formData);
            };
    
        }
    ]);

    return app;
});