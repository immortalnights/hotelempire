define(['backbone.marionette',
       'routers/core',
       'data/hotel',
       'screens/rooms/layout',
       'screens/rooms/edit',
       'views/dialog',
       'tpl!screens/staff/templates/layout.html',
       'tpl!screens/hotels/templates/hoteltile.html'],
       function(Marionette,
                CoreRouter,
                Hotel,
                RoomsLayout,
                EditRoomLayout,
                Dialog,
                staffLayoutTemplate,
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

			var layout = new Marionette.View({
				template: _.template('<div id="hotelcontrols" class="text-right"><button class="btn btn-primary" data-control="buyhotel"><span class="fas fa-plus"></span> Buy Hotel</button></div><div id="hotels"></div>'),

				triggers: {
					'click button[data-control=buyhotel]': 'buy:hotel'
				},

				regions: {
					controlsLocation: '#hotelcontrols',
					hotelsInventory: '#hotels',
				}
			});

			this.listenTo(layout, 'buy:hotel', function() {
				this.getApp().showDialog(new Dialog({
					body: {
						template: _.template("new hotel")
					}
				}))
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
			console.log("router:staff", id);

			var hotel = this.getGame().getHotels().get(id);

			if (hotel)
			{
				this.getApp().show(new Marionette.View({
					template: staffLayoutTemplate,
					model: hotel
				}));
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
