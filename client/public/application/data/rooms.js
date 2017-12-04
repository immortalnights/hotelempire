define(['backbone',
        'data/room'],
       function(Backbone,
                Room) {
	'use strict';

	var Rooms = Backbone.Collection.extend({
		url: false,
		model: Room,

		initialize: function(models, options)
		{
			Backbone.Collection.prototype.initialize.call(this, models, options);
		}
	});

	return Rooms;
});
