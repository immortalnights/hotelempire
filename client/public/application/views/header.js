define(['backbone.marionette',
       'tpl!templates/header.html'],
       function(Marionette,
                template) {
	'use strict';

	var Header = Marionette.View.extend({
		template: template,
		className: 'navbar navbar-default navbar-fixed-top',

		initialize: function(options)
		{
			Marionette.View.prototype.initialize.call(this, options);
		}
	});

	return Header;
});
