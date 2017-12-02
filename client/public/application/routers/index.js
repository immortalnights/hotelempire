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
			Backbone.history.navigate('#/Hotel/1');
			// this.getApp().show(new Marionette.View({
			// 	template: _.template('abc')
			// }));
		},

		hotel: function(id)
		{
			console.log("router:hotel", id);

			this.getApp().show(new Marionette.View({
				template: _.template('<a href="#/Hotel/1/Rooms">Manage Rooms</a>')
			}));
		},

		rooms: function(hotelId)
		{
			console.log("router:rooms");

			// var rooms = new HotelRooms();
			// rooms.fetch();

			this.getApp().show(new RoomsLayout({
				collection: this.getApp().hotel.getRooms()
			}));
		},

		room: function(hotelId, roomId)
		{
			this.getApp().show(new EditRoomLayout({
				model: this.getApp().hotel.getRooms().get(roomId),
				availableRooms: 100
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
