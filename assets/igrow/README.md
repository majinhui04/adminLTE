[IGrow.js](http://www.mediadreamworks.net/) - 让生活更美好
================================


这是基于jQuery的，拥有一整套方便易用的组件，适用于PC端以及移动端，让前段开发更简单，更有效



## Getting Started

### Downloading the prebuilt files

Prebuilt files can be downloaded from http://www.mediadreamworks.net/
### Downloading the latest changes

The unreleased development files can be obtained by:

 1. [Downloading](https://github.com/jzaefferer/jquery-validation/archive/master.zip) or Forking this repository
 2. [Setup the build](CONTRIBUTING.md#build-setup)
 3. Run `grunt` to create the built files in the "dist" directory

### Including it on your page

Include jQuery and the plugin on a page. 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <meta name="apple-touch-fullscreen" content="YES">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta http-equiv="Expires" content="-1">
    <meta http-equiv="pragram" content="no-cache">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    
    <link rel="stylesheet" href="./assets/igrow/css/igrow.css">
    <link rel="stylesheet" href="./assets/igrow/css/igrow.plugins.css">
    <link rel="stylesheet" href="./assets/css/app.css?v=1">
    <script src="./assets/igrow/external/jquery/1.11.1/jquery.min.js"></script>
    <script src="./assets/igrow/igrow.js"></script>
    
    
</head>
<body>
    
</body>
</html>
```



## 基本介绍

### IGrow.mobile 提示框

	包含一下几个对象
		1. loading // loading.show(message),loading.hide(),loading.success(message)
		2. alert(message, callback) 
		3. confirm(message, onConfirmFn, onCancelFn) 	

### IGrow.ua 检测浏览器信息

	有以下几个属性
		canTouch ,ie, ieVersion, ios, iphone, ipad, iosVersion, android, androidVersion, 等
		
### IGrow.iTemplate 模板控制器

	两个基本方法:
		substitute(tpl, obj) // 针对单个数据 iTemplate.substitute('<p a="{a}">{b}</p>',{a:1,b:2}) return '<p a="1">2</p>'
		makeList(tpl, arr, fn) // 针对数组数据 iTemplate.makeList('<p a="{a}">{b}</p>', [{a:1,b:2},{a:22,b:33}] ) return '<p a="1">2</p><p a="22">33</p>' ----------fn(index,item){}
		
### IGrow 基本方法与对象
	
	hex_md5() // md5加密
	_guid() // 生成随机uuid
	range(min,max) // 生成指定范围的随机数 [1,10]
	IsRunYear() // 判断闰年
	formatNewsTime(timeStamp) //返回发布时间 比如3分钟前
	imgReady(url, success, error) // 获取图片宽 和 高
	getNoRepeat(array) // 返回无重复的数组
	getQuery([key]) // 获取url 参数 http://www.baidu.com/q?name=1&age=2 return {name:1,age:2} 也可传入key 直接获取值
	formatDate(timeStamp,fmt) // 格式化日期 formatDate(new Date(1384931712000), 'yyyy-MM-dd hh:mm:ss')
	
	
## IGrow 插件

## Modal 模态框

![abc](./doc/icon80_smile.png)
	
	
	<!-- Button trigger modal -->
	<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
	  Launch demo modal
	</button>


	<div class="modal fade" id="myModal">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">Modal title</h4>
	      </div>
	      <div class="modal-body">
	        <p>One fine body&hellip;</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        <button type="button" class="btn btn-primary">Save changes</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
#### 方法

	$('#myModal').modal({
	  backdrop:'static', // static for a backdrop which doesn't close the modal on click
	  keyboard: false, // 键盘上的 esc 键被按下时关闭模态框
	  show:true, // 模态框初始化之后就立即显示出来。
	})
	or
	$('#myModal').modal('show') , $('#myModal').modal('hide')

#### 事件

	事件类型
	show.bs.modal show 
	// 方法调用之后立即触发该事件。如果是通过点击某个作为触发器的元素，则此元素可以通过事件的 relatedTarget 属性进行访问。
	shown.bs.modal
	hide.bs.modal
	hidden.bs.modal
	
	$('#myModal').on('hidden.bs.modal', function (e) {
	  // do something...
	})
	
	
	=======================


## Tabs

### Markup

You can activate a tab or pill navigation without writing any JavaScript by simply specifying data-toggle="tab" or data-toggle="pill" on an element. Adding the nav and nav-tabs classes to the tab ul will apply the Bootstrap tab styling, while adding the nav and nav-pills classes will apply pill styling.

	<div role="tabpanel">

  	<!-- Nav tabs -->
	  <ul class="nav nav-tabs" role="tablist">
	    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
	    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
	    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
	    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
	  </ul>

	  <!-- Tab panes -->
	  <div class="tab-content">
	    <div role="tabpanel" class="tab-pane active" id="home">...</div>
	    <div role="tabpanel" class="tab-pane" id="profile">...</div>
	    <div role="tabpanel" class="tab-pane" id="messages">...</div>
	    <div role="tabpanel" class="tab-pane" id="settings">...</div>
	  </div>

	</div>
	
### Methods
Activates a tab element and content container. Tab should have either a data-target or an href targeting a container node in the DOM.

	$(function () {
    	$('#myTab a:last').tab('show')
  	})
  	
### Events
 When showing a new tab, the events fire in the following order:
 
	hide.bs.tab (on the current active tab)
	show.bs.tab (on the to-be-shown tab)
	hidden.bs.tab (on the previous active tab, the same one as for the hide.bs.tab event)
	shown.bs.tab (on the newly-active just-shown tab, the same one as for the show.bs.tab event)
	
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  e.target // newly activated tab
	  e.relatedTarget // previous active tab
	})

	
## Validate 表单验证



待补完


## DeviceMotionHandler 手机摇一摇

### Methods
	
	DeviceMotionHandler.lock() // 锁定后将不再触发回调
	DeviceMotionHandler.unlock() // 解锁后将继续触发摇一摇后的回调
	DeviceMotionHandler.init({
		callback:function(){
			// here is do what you do after shake
		
		}
	});


## Drag jquery版简易拖拽

### Methods
	
	$('selector').drag({
		before:function(){},
		process:function(){},
		end:function($this,event){
			var pageX = event.pageX;
			var pageY = event.pageY;
			
		},
	});
	//记录初始位置,以便复位使用
	var startPos  = $(selector).data('startPos'); // {left:0,top:0}

## Touch

### Events

	'swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown','doubleTap', 'tap', 'singleTap', 'longTap' 
	
	$('selector').swipeRight(function(){})

## ImageView 移动端图片预览

### Markup

	<div class="photo-list">
		<div class="" data-role="photoItem" data-original="大图url" data-title="标题">
			img
		</div>
		<div class="" data-role="photoItem" data-original="大图url" data-title="标题">
			img
		</div>
		<div class="" data-role="photoItem" data-original="大图url" data-title="标题">
			img
		</div>
	</div>
	
### Methods

	// 自动去搜索要预览的照片实现绑定
	window.ImageView.run()
	
	// 手动绑定
	window.ImageView.init(pics,index,{ titles: titles });
	
## License
Copyright &copy; Jörn Zaefferer<br>
Licensed under the MIT license.
