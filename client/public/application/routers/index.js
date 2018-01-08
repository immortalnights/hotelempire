define(['backbone.marionette',
       'routers/core',
       'data/hotel',
       'screens/rooms/layout',
       'screens/rooms/edit',
       'screens/staff/layout',
       'tpl!screens/hotels/templates/hoteltile.html'],
       function(Marionette,
                CoreRouter,
                Hotel,
                RoomsLayout,
                EditRoomLayout,
                staffLayout,
                hotelTileTemplate) {
	'use strict';

	var Router = CoreRouter.extend({
		routes: {
			'':                     'index',
			'Hotel/:id/View':       'hotel',
			'Hotel/:id/Rooms':      'rooms',
			'Hotel/:id/Rooms/:id':  'room',
			'Hotel/:id/Staff':      'staff',
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
			var hotels = this.getGame().getHotels();

			window.h = hotels;

			var layout = new Marionette.View({
				template: _.template('<div id="hotelcontrols"></div><div id="hotels"></div>'),
				regions: {
					controlsLocation: '#hotelcontrols',
					hotelsInventory: '#hotels',
				}
			});

			this.getApp().show(layout);

			layout.showChildView('hotelsInventory', new Marionette.NextCollectionView({
				collection: hotels,
				childView: Marionette.View,
				className: 'row',
				childViewOptions: {
					className: 'col-md-4',
					template: hotelTileTemplate
				}
			}));
		},

		hotel: function(id)
		{
			console.log("router:hotel", id);

			var hotel = this.getGame().getHotels().get(id);

			if (hotel)
			{
				this.getApp().show(new Marionette.View({
					template: hotelTileTemplate,
					model: hotel
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

		staff: function(id)
		{
			console.log("router:staff");

			var hotel = this.getGame().getHotels().get(id);

			if (hotel)
			{
				var view = new staffLayout({
					model: hotel,
					collection: hotel.getRooms()
				});
				this.getApp().show(view);
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
