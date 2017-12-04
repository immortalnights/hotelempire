define(['backbone.marionette',
       'routers/index',
       'game',
       'cookies'],
       function(Marionette,
                Router,
                Game,
                Cookies) {
	'use strict';

	var RootLayout = Marionette.View.extend({
		el: 'body',
		template: false,


		regions: {
			main: 'main'
		},

		onRender: function()
		{
		}
	})

	var Application = Marionette.Application.extend({
		initialize: function(options)
		{
			Marionette.Application.prototype.initialize.call(this, options);
			console.log("Application initialized");
			new Router();

			// Reduce the global request timeout
			Backbone.$.ajaxSetup({
				timeout: 5000
			});
		},

		// getGame: function()
		// {
		// 	return this.game;
		// },

		onStart: function()
		{
			console.log("Started...");
			this.rootLayout = new RootLayout();

			this.data = {};

			// Load static game data
			var rooms = new Backbone.Collection();
			this.data['rooms'] = rooms;
			var facilities = new Backbone.Collection();
			this.data['facilities'] = facilities;

			var deferred = [];
			deferred.push(rooms.fetch({
				url: 'application/staticdata/rooms.json'
			}));
			deferred.push(facilities.fetch({
				url: 'application/staticdata/facilities.json'
			}));

			Promise.all(deferred).then(_.bind(this.onPreloadComplete, this)).catch(function() {
				console.error("Failed to load some data");
			});
			console.log("Loading static data...")


			// var game = Game.resume();

			// if (game)
			// {
			// 	// Don't want too long for the game to load 'cause it blocks the user
			// 	game.fetch()
			// 	.then(_.bind(function(game) {
			// 		this.game = game;
			// 		console.log("Successfully loaded / joined game");
			// 	}, this))
			// 	.catch(function() {

			// 		// Could be done using 'game.leave'
			// 		Cookies.remove('gameId');
			// 		Cookies.remove('playerId');

			// 		console.log("Failed to load / join game");
			// 	})
			// 	.always(_.bind(this.onPreloadComplete, this));
			// }
			// else
			// {
			// 	console.log("No game to resume");
				// this.onPreloadComplete();
			// }
		},

		onPreloadComplete: function()
		{
			// Start a new game
			this.game = Game.start();

			// Start routing
			console.log("Starting Backbone.history");
			_.defer(function() { Backbone.history.start() });
		},

		getGame: function()
		{
			return this.game;
		},

		getData: function(key)
		{
			return this.data[key];
		},

		show: function(view)
		{
			console.log("Show");
			this.rootLayout.showChildView('main', view);
		}
	});

	var app;
	return function() {
		if (!app)
		{
			app = new Application();
		}

		return app;
	}
});
