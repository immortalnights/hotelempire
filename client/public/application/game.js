define(['backbone',
       'backbone.marionette',
       'data/hotels',
       'cookies'],
       function(Backbone,
                Marionette,
                Hotels,
                Cookies) {
	'use strict';

	var Game = Marionette.Object.extend({
		initialize: function(options)
		{
			Marionette.Object.prototype.initialize.call(this, options);

			this.hotels = new Hotels();
		},

		getHotels: function()
		{
			return this.hotels;
		}


	});

	// Given a cookie, attempt to resume a game
	Game.resume = function(cookie)
	{

	}

	// Start a new game (single player only)
	Game.start = function()
	{
		var game = new Game();

		// Temporary setup - until more new game handling is completed
		var defaultHotel = new (Hotels.prototype.model)({
			id: 1,
			region: 'England',
			location: 'seaside',
			totalRooms: 10,
			unassignedRooms: 10
		});

		game.player = new Backbone.Model({
			date: { week: 1, year: 2017 },
			balance: 25000
		});

		game.hotels.add(defaultHotel);

		return game;
	}

	return Game;
});
