/*
    访客
 */
(function(){
    window.Menus = [
        {
            id:1,
            title:'demos',
            href:'javascript:;',
            items:[
                {
                    id:'1-1',
                    title:'翻滚吧地球',
                    href:'#/demos/1/earth',
                    page:'/public/demos/earth/index.html',
                },
                {
                    id:'1-2',
                    title:'iOS-Overlay',
                    href:'#/demos/1/iOS-Overlay',
                    page:'/public/demos/iOS-Overlay/index.html',
                },
                {
                    id:'1-3',
                    title:'page-transitions',
                    href:'#/demos/1/page-transitions',
                    page:'/public/demos/page-transitions/index.html',
                }
            ]
        },
        {
            id:1,
            title:'啦啦啦',
            href:'#/demos2/1',
            page:'/public/admin/pages/mobile/animate.html',
            controller:function($scope){
                console.log(12345);
            },
            items:[
                
            ]
        }
    ];
})();
    