define(['backbone.marionette',
       'cookies'],
       function(Marionette,
                Cookies) {
	'use strict';

	var CoreRouter = Marionette.AppRouter.extend({
		initialize: function(options)
		{
			Marionette.AppRouter.prototype.initialize.call(this, options);
		},

		getApp: function()
		{
			return require('application')();
		},

		getGame: function()
		{
			return this.getApp().getGame();
		},

		execute: function(callback, args, name)
		{
			// var game = this.getApp().getGame();

			// if (name === 'index' && game)
			// {
			// 	Backbone.history.navigate('#/System');
			// }
			// else if (name !== 'index' && !game)
			// {
			// 	console.log("null", name);
			// 	Backbone.history.navigate('', true);
			// }
			// else
			{
				console.log("continue");
				// Continue to requested page
				Marionette.AppRouter.prototype.execute.call(this, callback, args, name);
			}
		}
	});

	return CoreRouter;
});
