define(['backbone.marionette',
       'data/hotels',
       'cookies'],
       function(Marionette,
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
			totalRooms: 10,
			unassignedRooms: 10
		});

		game.hotels.add(defaultHotel);

		return game;
	}

	return Game;
});
