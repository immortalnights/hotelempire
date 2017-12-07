define(['backbone',
        'backbone.marionette',
        'views/header',
        'views/navigation'],
       function(Backbone,
                Marionette,
                Header,
                Navigation) {
	'use strict';

	var Layout = Marionette.View.extend({
		el: 'body',
		template: false,

		regions: {
			header: 'header',
			main: 'main',
			footer: 'footer'
		},

		initialize: function(options)
		{
			Marionette.View.prototype.initialize.call(this, options);
		},

		onRender: function()
		{
			var game = require('application')().getGame();

			this.showChildView('header', new Header({
				model: game.player
			}));

			// Current hotel Id provided to navigation template to create the correct links
			this.showChildView('footer', new Navigation({
				model: new Backbone.Model({
					id: 1
				})
			}));
		}
	});

	return Layout;
});
