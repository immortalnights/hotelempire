define(['backbone.marionette',
       'routers/core',
       'data/hotel',
       'screens/rooms/layout',
       'screens/rooms/edit'],
       function(Marionette,
                CoreRouter,
                Hotel,
                RoomsLayout,
                EditRoomLayout) {
	'use strict';

	var Router = CoreRouter.extend({
		routes: {
			'':                     'index',
			'Hotel/:id':            'hotel',
			'Hotel':                'hotel',
			'Hotel/:id/Rooms':      'rooms',
			'Hotel/:id/Rooms/:id':  'room',
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

			// Get the ID of the first hotel
			var id = this.getGame().getHotels().first().id;

			Backbone.history.navigate('#/Hotel/' + id);
			// this.getApp().show(new Marionette.View({
			// 	template: _.template('abc')
			// }));
		},

		hotel: function(id)
		{
			console.log("router:hotel", id);

			var hotel = this.getGame().getHotels().get(id);

			if (hotel)
			{
				this.getApp().show(new Marionette.View({
					template: _.template('<a href="#/Hotel/' + hotel.id + '/Rooms">Manage Rooms</a>')
				}));
			}
			else
			{
				
			}
		},

		rooms: function(id)
		{
			console.log("router:rooms");

			var hotel = this.getGame().getHotels().get(id);

			if (hotel)
			{
				var view = new RoomsLayout({
					model: hotel,
					collection: hotel.getRooms()
				});
				this.getApp().show(view);
			}
		},

		room: function(id, roomId)
		{
			var hotel = this.getGame().getHotels().get(id);

			if (hotel)
			{
				var room = hotel.getRooms().get(roomId);

				if (room)
				{
					this.getApp().show(new EditRoomLayout({
						hotel: hotel,
						model: room,
					}));
				}
				else
				{

				}
			}
			else
			{

			}
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
