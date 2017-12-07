define(['backbone.marionette'],
       function(Marionette) {
	'use strict';

	var RootLayout = Marionette.View.extend({
		el: 'body',
		template: false,

		regions: {
			main: 'main'
		},

		initialize: function(options)
		{
			Marionette.View.prototype.initialize.call(this, options);
		}
	});

	return RootLayout;
});
