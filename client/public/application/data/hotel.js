define(['backbone',
        'data/rooms',
        'data/roomtypes'],
       function(Backbone,
                Rooms,
                RoomTypes) {
	'use strict'

	var Hotel = Backbone.Model.extend({
		initialize: function(attributes, options)
		{
			Backbone.Model.prototype.initialize.call(this, attributes, options);

			this.rooms = new Rooms();

			var self = this;
			var roomId = 0;
			var roomTypes = new RoomTypes();
			roomTypes.fetch().then(function() {
				roomTypes.each(function(item) {
					self.rooms.add(_.extend(item.pick('type', 'name'), {
						id: roomId++,
						enabled: false,
						allocated: 0
					}));
				});

				self.trigger('ready', this);
			});
		},

		getRooms: function()
		{
			return this.rooms;
		}
	});

	return Hotel;
});
