/*
jQuery colex plugin
Copyright (c) 2013 Tom Ryan (tomryandesign.com)
Licensed under nothing. All rights reversed.
Version: 0.9
*/
(function($){
	$.fn.colex = function(options) {
		var opt = $.extend({
			initState: 1,
			target: null,
			labelContainer: 'span',
			colClass: 'collapse',
			expClass: 'expand',
			hovClass: 'colex-hover',
			focClass: 'colex-focus',
			actClass: 'colex-active',
			clickedClass: 'colex-clicked',
			colLabel: 'collapse',
			expLabel: 'expand',
			beforeColCmds: null,
			beforeExpCmds: null,
			colSpeed: 200,
			expSpeed: 200,
			easeCol: 'linear',
			easeExp: 'linear',
			labelSpeed: 0,
			labelDelay: 0,
			afterColCmds: null,
			afterExpCmds: null,
			callbackDelay: 0
		}, options);
		
		var $controller = $(this);
		
		$(document.createElement(opt.labelContainer)).addClass(opt.colClass).html(opt.colLabel).appendTo($controller);
		$(document.createElement(opt.labelContainer)).addClass(opt.expClass).html(opt.expLabel).appendTo($controller);
		
		if (opt.initState > 0) {
			$controller.addClass(opt.colClass);
			$(opt.labelContainer + '.' + opt.expClass, $controller).hide();
			$(opt.target).show();
		} else {
			$controller.addClass(opt.expClass);
			$(opt.labelContainer + '.' + opt.colClass, $controller).hide();
			$(opt.target).hide();
		}
		
		$controller
		.hover(function() {
			$(this).addClass(opt.hovClass);
		}, function() {
			$(this).removeClass(opt.hovClass);
		})
		.focus(function(e) {
			console.log(e.target);
			$(this).addClass(opt.focClass);
		}, function() {
			$(this).removeClass(opt.focClass);
		});
		
		$controller.on('click', function() {
			if ($(this).hasClass(opt.colClass)) {
				if (opt.beforeColCmds != null) {
					opt.beforeColCmds();
				}
				$(this)
				.removeClass(opt.colClass)
				.addClass(opt.expClass);
				$(opt.target).slideUp(opt.colSpeed, opt.easeCol, setTimeout($.proxy(function() {
					$('.' + opt.colClass, $(this)).fadeOut(opt.labelSpeed);
					$('.' + opt.expClass, $(this)).fadeIn(opt.labelSpeed);
				}, this), opt.labelDelay))
				if (opt.afterColCmds != null) {
					setTimeout(function() {
						opt.afterColCmds();
					}, opt.callbackDelay);
				}
				opt.initState = 0;
			} else if ($(this).hasClass(opt.expClass)) {
				if (opt.beforeExpCmds != null) {
					opt.beforeExpCmds();
				}
				$(this)
				.removeClass(opt.expClass)
				.addClass(opt.colClass);
				$(opt.target).slideDown(opt.expSpeed, opt.easeExp, setTimeout($.proxy(function() {
					$('.' + opt.expClass, $(this)).fadeOut(opt.labelSpeed);
					$('.' + opt.colClass, $(this)).fadeIn(opt.labelSpeed);
				}, this), opt.labelDelay))
				if (opt.afterExpCmds != null) {
					setTimeout(function() {
						opt.afterExpCmds();
					}, opt.callbackDelay);
				}
				opt.initState = 1;
			};
			$(this).addClass(opt.clickedClass);
			return false;
		});
	};
})(jQuery);
