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
				fitToSection: true,
				afterRender: function () {
					$('body').addClass('fp-ready');
				}
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
			$('#nav').find('.navItem').add('#nav-close')
				.off('click.closeNav')
				.on('click.closeNav', function (e) {
					$('#nav').removeClass('activated');
				});
		}
	};

	return App;
})(window.App);
