/**
 * @file 
 * Modal相关功能，以及ajax相关功能
 * 
 * @author Edxxu <xujin@vxplo.com>
 */

(function ($) {
  Drupal.behaviors.vxModal = {
    attach: function(context, settings) {
      Drupal.vxModal.stringTrim();

      $('#modalBackdrop').live('click', function() {
        Drupal.vxModal.overlayContentRemove();
      })

      $is360 = ("v8Locale"in window) 
              && ("scoped" in document.createElement("style")) 
              && ("track" in document.createElement("track"));

      //快速注册弹出层，IE6下不使用弹出层注册
      if (!(($.browser.msie && ($.browser.version == "6.0")) || $is360)) {
        $('.signup').once('ajax', function() {
          var element_settings = {};

          element_settings.url = $(this).attr('href');
          element_settings.event = 'click';
          element_settings.progress = {};

          new Drupal.ajax('signup', this, element_settings);
        });
      }

      Drupal.vxModal.searchSubmit();
    }
  }
	
  Drupal.vxModal = Drupal.vxModal || {};

  Drupal.vxModal.stringTrim = function() {
    String.prototype.trim= function(){  
        // 用正则表达式将前后空格  
        // 用空字符串替代。  
        return this.replace(/(^\s*)|(\s*$)/g, "");  
    }
  }

  Drupal.vxModal.searchSubmit = function() {
    $('#search-form').bind('submit', onSearchSubmit);

    function onSearchSubmit() {
      var sKey = $('#edit-keys').val().trim();
      return (sKey.length>0 && sKey!='搜索帮助');
    }
  }
  
  /**
   * 显示弹出层
   * @param string content
   *   弹出层中显示的内容
   * @param array options
	 *   -hideTop： boolean, 是否隐藏头部黑色条
	 *   -extra_class: string, 额外的class
   */
  Drupal.vxModal.overlayContent = function(content, options) {
		var defaults = {
			hideTop: false,
			extra_class: '',
			reset: true,	//默认移除之前的弹出层
			id : 'modalContent'  //如果没有设置弹出层ID，则使用默认的ID
		}
		
		options = $.extend(defaults, options);
		
    if (self.pageYOffset) { // all except Explorer
      var wt = self.pageYOffset;
    } 
    else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
      var wt = document.documentElement.scrollTop;
    } 
    else if (document.body) { // all other Explorers
      var wt = document.body.scrollTop;
    }
      
    var docHeight = $(document).height();
    var docWidth = $(document).width();
    var winHeight = $(window).height();
    var winWidth = $(window).width();
		
    if( docHeight < winHeight ) {
      docHeight = winHeight;
    }
		
    // if we already ahve a modalContent, remove it
    if ( $('#modalBackdrop')) $('#modalBackdrop').remove();
    
    if (options.reset) {
        $('.modalContent').remove(); //移除之前的弹出层
    }
    else {
        $('.modalContent').hide();  //隐藏之前的弹出层
    }

    var modalHtml = Drupal.theme('overlayModal', content, options.hideTop, options.extra_class, options.id);
    //$('body').append(modalHtml);
	$('body').prepend(modalHtml);

    //关闭弹层的功能
    $('#' + options.id + ' .close, #' + options.id + ' .cancel').click(function() {
        Drupal.vxModal.overlayContentRemove();
    });
    
    var css = {
      position: 'absolute',
      left: '0px',
      margin: '0px',
      background: '#000',
      opacity: '.8'
    };

    // Add opacity handling for IE.
    css.filter = 'alpha(opacity=55)';
      
	var modalContent = $('#' + options.id).css('top','-1000px');
	var mdcTop = wt + (winHeight / 2) - (modalContent.outerHeight() / 2);
	var mdcLeft = (winWidth / 2) - (modalContent.outerWidth() / 2);
	
	if(mdcTop<0) mdcTop=0;
	if(mdcLeft<0) mdcLeft=0;
	
	$('#modalBackdrop').css(css).css('top', 0).css('height', docHeight + 'px').css('width', docWidth + 'px').css('z-index', 1000).show();
	modalContent.css({
		top: mdcTop + 'px', 
		left: mdcLeft + 'px'
	}).hide().show();
  }
  
  /**
   * 隐藏弹出层
   */
  Drupal.vxModal.overlayContentRemove = function() {
    $('#modalBackdrop').remove();
    $('.modalContent').remove();
  }
  
	/**
   * 显示正在处理中的gif动画
	 * 
	 * @param boolean reset
	 *   是否重置之前的弹出层
   */
  Drupal.vxModal.overlayProcessing = function(reset) {
    $('#modalProcessing').remove();
    var content = Drupal.theme('processing');
    //弹出层显示正在处理
    Drupal.vxModal.overlayContent(content, {
      hideTop: true,
      reset: reset ? reset : false,
      id: 'modalProcessing'
    });
  }
  
	/**
   * Theme function for overlay modal. 弹出层结构
	 * 
   * @param string content
   *   要显示在弹层中的内容。
   * @param boolean hideTop
   *   是否隐藏头部
   * @param string extra_class
   *   额外的class
	 * @param string id
	 *   弹出层的ID
   */
	Drupal.theme.overlayModal = function(content, hideTop, extra_class, id) {
		var contentClass = extra_class ?　('modalContent ' + extra_class) : 'modalContent';
		var html = '';
    
		html += '<div id="modalBackdrop" style="position:relative;"><div style="z-index: 1018; display: none;"></div></div>';  //背景半透明层    
		html += '<div id="' + id + '" class="' + contentClass + '" style="z-index: 1019; position: absolute;">';
		html +=   '<div class="block-modal-content" style="position:relative;">';
		if (!hideTop) {
			html +=   '<div id="modalTop" class="modalTop"></div>';
		}
		html +=     '<div class="close">';
		html +=       '<a href="javascript:void(0)">';
		html +=         '<img src="/sites/all/themes/vpzen/images/close_img.png" class="png_css">';
		html +=       '</a>';
		html +=     '</div>';
		html +=      content;
		html +=   '</div>';
		html += '</div>';
    
		return html;
	}
  
  /**
   * Theme function for 等待处理弹出层
   */
  Drupal.theme.processing = function() {
    var html = '';
    
    html += '<div class="ajax-processing">';
    html +=   '<div class="overlay-head">';
    html +=     '<h2 class="overlay-title">';
    html +=       '<span class="overlay-title-text">请稍等…</span>';
    html +=     '</h2>';
    html +=   '</div>';
    html +=   '<div class="overlay-body">';
    html +=     '<p>';
    html +=       '我们正在处理您的请求。';
    html +=       '<br>';
    html +=       '<img width="631" height="14" alt="Processing..." src="/sites/all/themes/vpzen/images/progress-bar.gif">';
    html +=     '</p>';
    html +=   '</div>';
    html += '</div>';
    
    return html;
  }
})(jQuery);