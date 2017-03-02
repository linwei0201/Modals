;(function($) {

function gernerateHtml(type, className, width, title, text, btns, timer) {
  return [
    '<div class="ui-' + type + ' ' + className + (timer ? ' timer-modal' : '') + '">',
      // '<div class="wrapper">',
          '<div class="box" ' + (width ? ('style="width: ' + width + 'px"') : '') + '>',
            !timer ? '<div class="close">×</div>' : '',
            '<div class="hd">',
              title,
            '</div>',
            '<div class="bd">',
              text,
            '</div>',
            '<div class="ft">',
              btns.map(function(v, i) {
                return '<span>' + v + '</span>';
              }).join(''),
            '</div>',
          '</div>',
      // '</div>',
    '</div>'
  ].join('');
}

$.modal = function(options) {
  $.modal.hide();
  var defaults = {
    text: '',
    title: '提示',
    className: '',
    btns: ['确定', '取消'],
    timer: 0,
    timerClass: '.ui-modal .timer',
    timerBtn: '.ui-modal .ok-btn',
    callback: null,
    ready: null
  };
  var settings = $.extend({}, defaults, options);
  $(gernerateHtml('modal', settings.className, settings.width, settings.title, settings.text, settings.btns, settings.timer))
  .appendTo(document.body)
  /*.click(function(e) {
    e.target == this && $.modal.hide();
  })*/
  .on('click','.ft span',function() {
    var index = $(this).index();
    var len = settings.btns.length;
    if(len === 1) {
      settings.callback && settings.callback();
    }else {
      if(index === len - 1) {
        $.modal.hide()
      }else {
        settings.callback && settings.callback(index);
      }
    }
  })
  .on('click','.close',$.modal.hide);
  $.isFunction(settings.ready) && settings.ready();
  var timer = settings.timer;
  if(timer){
    var timerInterval = setInterval(function(){
      if(timer == 0){
        clearInterval(timerInterval);
        $(settings.timerBtn)[0].click();
        return false;
      }
      timer--;
      $(settings.timerClass).html(timer);
    }, 1000);
  }
};
$.modal.hide = function() {
  $('.ui-modal').remove();
};

$.alert = function(text, title, callback) {
  $.alert.hide();
  var options = {
    text: text,
    title: '提示'
  };
  if($.isFunction(title)) {
    options.callback = title;
  }else {
    options.title = title || '提示';
    options.callback = callback;
  }
  $(gernerateHtml('alert', '', '', options.title, options.text, ['确认']))
  .appendTo(document.body)
  .click(function(e) {
    e.target == this && $.alert.hide();
  })
  .on('click', '.ft span', function() {
    $.alert.hide();
    options.callback && options.callback();
  })
  .on('click', '.close', $.alert.hide);
};
$.alert.hide = function() {
  $('.ui-alert').remove();
};

$.toast = function(text, stillShow) {
  $.toast.hide();
  var temp = [
    '<div class="ui-toast">',
      '<div class="box">',
        stillShow && '<div class="icon-loading">' + '<span></span>'.repeat(7) + '</div>',
        '<div>',
          text,
        '</div>',
      '</div>',
    '</div>'
  ].join('');
  $(temp).appendTo(document.body);
  !stillShow && setTimeout($.toast.hide, 2e3);
};
$.toast.hide = function() {
  $('.ui-toast').remove();
};

$.confirm = function(text, title, callback) {
  $.confirm.hide();
  var options = {
    text: text,
    title: '确认',
  };
  if($.isFunction(title)) {
    options.callback = title;
  }else {
    options.title = title || '确认';
    options.callback = callback || $.noop;
  }
  var temp = [
    '<div class="ui-modal ui-confirm">',
      '<div class="box">',
        '<div class="close">×</div>',
        '<div class="hd">',
          options.title,
        '</div>',
        '<div class="bd">',
          options.text,
        '</div>',
        '<div class="ft">',
          '<span>确定</span>',
          '<span>取消</span>',
        '</div>',
      '</div>',
    '</div>'
  ].join('');
  $(temp).appendTo(document.body)
  .click(function(e) {
    e.target == this && $.confirm.hide();
  })
  .find('.ft span').click(function() {
    if($(this).index() == 0){
      options.callback();
    }else{
      $.confirm.hide();
    }
  })
  .end().find('.close').click($.confirm.hide);
};
$.confirm.hide = function() {
  $('.ui-confirm').remove();
};


})(jQuery);