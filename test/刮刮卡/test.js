//canvas hidpi polyfill
!function(a){var b=function(a){var b=a.backingStorePixelRatio||a.webkitBackingStorePixelRatio||a.mozBackingStorePixelRatio||a.msBackingStorePixelRatio||a.oBackingStorePixelRatio||a.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/b}(a),c=function(a,b){for(var c in a)a.hasOwnProperty(c)&&b(a[c],c)},d={fillRect:"all",clearRect:"all",strokeRect:"all",moveTo:"all",lineTo:"all",arc:[0,1,2],arcTo:"all",bezierCurveTo:"all",isPointinPath:"all",isPointinStroke:"all",quadraticCurveTo:"all",rect:"all",translate:"all",createRadialGradient:"all",createLinearGradient:"all"};1!==b&&(c(d,function(c,d){a[d]=function(a){return function(){var d,e,f=Array.prototype.slice.call(arguments);if("all"===c)f=f.map(function(a){return a*b});else if(Array.isArray(c))for(d=0,e=c.length;e>d;d++)f[c[d]]*=b;return a.apply(this,f)}}(a[d])}),a.stroke=function(a){return function(){this.lineWidth*=b,a.apply(this,arguments),this.lineWidth/=b}}(a.stroke),a.fillText=function(a){return function(){var c=Array.prototype.slice.call(arguments);c[1]*=b,c[2]*=b,this.font=this.font.replace(/(\d+)(px|em|rem|pt)/g,function(a,c,d){return c*b+d}),a.apply(this,c),this.font=this.font.replace(/(\d+)(px|em|rem|pt)/g,function(a,c,d){return c/b+d})}}(a.fillText),a.strokeText=function(a){return function(){var c=Array.prototype.slice.call(arguments);c[1]*=b,c[2]*=b,this.font=this.font.replace(/(\d+)(px|em|rem|pt)/g,function(a,c,d){return c*b+d}),a.apply(this,c),this.font=this.font.replace(/(\d+)(px|em|rem|pt)/g,function(a,c,d){return c/b+d})}}(a.strokeText))}(CanvasRenderingContext2D.prototype),function(a){a.getContext=function(a){return function(b){var c,d,e=a.call(this,b);return"2d"===b&&(c=e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1,d=(window.devicePixelRatio||1)/c,d>1&&(this.style.height=this.height+"px",this.style.width=this.width+"px",this.width*=d,this.height*=d)),e}}(a.getContext)}(HTMLCanvasElement.prototype);

function init() {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  var getPixelRatio = function(context) {
    var backingStore = context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1;

    return (window.devicePixelRatio || 1) / backingStore;
  };

  var ratio = getPixelRatio(ctx);

  console.log('ratio',ratio)

  ctx.drawImage(document.querySelector('img'), 0, 0, 300 * ratio, 90 * ratio);
}
