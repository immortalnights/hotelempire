define(['backbone',
        'data/rooms'],

       function(Backbone,
                Rooms) {
	'use strict'

	var Hotel = Backbone.Model.extend({
		initialize: function(attributes, options)
		{
			Backbone.Model.prototype.initialize.call(this, attributes, options);

			this.initRooms();
		},

		initRooms: function()
		{
			this.rooms = new Rooms();

			var self = this;
			var roomId = 0;

			var app = require('application')();
			var roomTypes = app.getData('rooms');

			roomTypes.each(function(item) {
				self.rooms.add(_.extend(item.pick('type', 'name'), {
					id: roomId++,
					enabled: false,
					allocated: 0
				}));
			});
		},

		getRooms: function()
		{
			return this.rooms;
		}
	});

	return Hotel;
});
