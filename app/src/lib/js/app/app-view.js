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
			$('#fullpage').fullpage({
				anchors: ['home', 'about', 'location'],
				menu: '#nav',
				css3: true,
				navigation: true,
				navigationPosition: 'right',
				fitToSection: true
				// responsiveWidth: 1000
			});
			$('#nav').find('.brand-logo').click(function (e) {
				e.preventDefault();
				$.fn.fullpage.moveTo(1);
			});
		}
	};

	return App;
})(window.App);
