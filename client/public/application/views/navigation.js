define(['backbone.marionette',
       'tpl!templates/navigation.html'],
       function(Marionette,
                template) {
	'use strict';

	var Navigation = Marionette.View.extend({
		template: template,
		className: 'navbar navbar-default navbar-fixed-bottom',

		initialize: function(options)
		{
			Marionette.View.prototype.initialize.call(this, options);
		}
	});

	return Navigation;
});
