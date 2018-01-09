define(['backbone.marionette',
       'tpl!templates/navigation.html'],
       function(Marionette,
                template) {
	'use strict';

	var Navigation = Marionette.View.extend({
		template: template,
		className: 'navbar fixed-bottom navbar-light bg-light justify-content-center',

		initialize: function(options)
		{
			Marionette.View.prototype.initialize.call(this, options);
		}
	});

	return Navigation;
});
