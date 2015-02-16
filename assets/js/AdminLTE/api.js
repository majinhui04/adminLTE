/*
    email 504397517@qq.com
    全局 api 配置 
    请求地址:version + api
    @params
        demo:'统一本地资源前缀'
        host:'http://api.igrow.com'
        version:''  
        mode: 'server' or 'demo' or '' 。 'server':全局使用服务器接口,'demo':全局使用本地模拟数据,'':根据匹配到的api具体配置
 */
(function(){
    window.API = {
        host:'http://' + location.host,
        version:'',
        demo:'/assets/api',
        server:'http://' + location.host + '/myadmin',
        mode:'server',
        map:{
            '/user/get':{
                mode:'demo',
                description:''
            }
            
        }
    };
})();
    