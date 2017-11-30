define(['backbone.marionette',
       'routers/core'],
       function(Marionette,
                CoreRouter) {
	'use strict';

	var Router = CoreRouter.extend({
		routes: {
			'':                     'index',
			'*notFound':            'notFound'
		},

		initialize: function(options)
		{
			CoreRouter.prototype.initialize.call(this, options);
			console.log("Router initialized");
		},

		index: function()
		{
			console.log("router:index");
			this.getApp().show(new Marionette.View({
				template: _.template('abc')
			}));
		},

		notFound: function()
		{
			this.getApp().show(new Marionette.View({
				template: _.template('404 Not Found')
			}));
		}
	});

	return Router;
});
