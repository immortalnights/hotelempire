define(['backbone'],
       function(Backbone) {
	'use strict';

	var Rooms = Backbone.Collection.extend({
		url: 'application/staticdata/types.json',
		model: Backbone.Model,

		initialize: function(models, options)
		{
			Backbone.Collection.prototype.initialize.call(this, models, options);
		}
	});

	return Rooms;
});
