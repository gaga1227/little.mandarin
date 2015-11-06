window.App = (function (app) {
	var App = app || {};

	// data module
	App.data = {

		// data
		// -------------------------------------------------------------------------------------------

		// init
		// -------------------------------------------------------------------------------------------
		init: function () {

		}
	};

	return App;
})(window.App);

window.App = (function (app) {
	var App = app || {};

	// utils module
	App.utils = {

		// addDeviceClass
		addDeviceClass: function () {
			// using is.js
			var p = window.is;

			$html = $('html:eq(0)');
			$html.removeClass('no-js').addClass('js');

			// exit
			if (p === undefined) {
				return;
			}

			// touch
			if (p.touchDevice()) {
				$html.addClass('touch');
			} else {
				$html.addClass('no-touch');
			}

			// platform
			if (p.desktop()) {
				$html.addClass('desktop');
			} else if (p.tablet()) {
				$html.addClass('tablet');
			} else if (p.mobile()) {
				$html.addClass('mobile');
			}

			// browser
			if (p.ie()) {
				$html.addClass('ie');
			}

			// iOS
			if (p.ios()) {
				$html.addClass('ios');
				if (p.iphone()) {
					$html.addClass('iphone');
				} else if (p.ipod()) {
					$html.addClass('ipod');
				} else if (p.ipad()) {
					$html.addClass('ipad');
				}
			}
			// android
			else if (p.android()) {
				$html.addClass('android');
				if (p.androidPhone()) {
					$html.addClass('androidPhone');
				} else if (p.androidTablet()) {
					$html.addClass('androidTablet');
				}
			}
		},

		// load Templates
		loadTemplates: function () {
			var $templates = $('script[id|="template"]');
			if (!$templates.length) {
				return;
			}

			var templates = {};
			_.forEach($templates, function (tmpl) {
				var $tmpl = $(tmpl);
				var name = $tmpl.attr('id').split('-')[1];
				tmplHtml = $.trim($tmpl.html());
				if (tmplHtml) {
					templates[name] = tmplHtml;
				}
			});

			return templates;
		},

		// init
		// -------------------------------------------------------------------------------------------
		init: function () {
			this.addDeviceClass();
		}
	};

	return App;
})(window.App);

window.App = (function (app) {
	var App = app || {};

	// view module
	App.view = {

		// properties
		// -------------------------------------------------------------------------------------------

		// events
		events: {
			transitionEnd: 'transitionend webkitTransitionEnd'
		},

		// view data

		// elems
		//$game: $('#game'),


		// init
		// -------------------------------------------------------------------------------------------

		init: function () {
			// init fullpage
			$('#fullpage').fullpage({
				anchors: ['home', 'about', 'location'],
				menu: '#nav',
				css3: true,
				navigation: true,
				navigationPosition: 'right',
				fitToSection: true
				// responsiveWidth: 1000
			});

			// init logo button
			$('#nav').find('.brand-logo')
				.off('click')
				.on('click', function (e) {
					e.preventDefault();
					$.fn.fullpage.moveTo(1);
				});

			// init mobile nav trigger
			$('#nav-trigger')
				.off('click')
				.on('click', function (e) {
					e.preventDefault();
					$('#nav').toggleClass('activated');
				});

			// init nav items closing nav
			$('#nav').find('.navItem')
				.off('click.closeNav')
				.on('click.closeNav', function (e) {
					$('#nav').removeClass('activated');
				});
		}
	};

	return App;
})(window.App);

window.App = (function (app) {
	App = app || {};

	// properties
	// -------------------------------------------------------------------------------------------

	App.name = 'Little Mandarin';
	App.version = '1.0.0';
	App.lastUpdate = '2015-11';

	// init
	// -------------------------------------------------------------------------------------------

	App.init = function () {
		//init app modules
		App.utils.init();
		App.data.init();
		App.view.init();
	};

	return App;
})(window.App);

// init App
App.init();
