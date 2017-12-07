define(['backbone.marionette'],
       function(Marionette) {
	'use strict';

	var MainMenu = Marionette.View.extend({
		template: _.template('menu'),

		initialize: function(options)
		{
			Marionette.View.prototype.initialize.call(this, options);
		}
	});

	return MainMenu;
});
