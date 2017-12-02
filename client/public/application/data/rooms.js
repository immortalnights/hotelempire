define(['backbone',
        'data/room'],
       function(Backbone,
                Room) {
	'use strict';

	var Rooms = Backbone.Collection.extend({
		url: 'application/staticdata/hotelrooms.json',
		model: Room,

		initialize: function(models, options)
		{
			Backbone.Collection.prototype.initialize.call(this, models, options);
		}
	});

	return Rooms;
});
