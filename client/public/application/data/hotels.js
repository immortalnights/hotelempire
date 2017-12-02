define(['backbone',
        'data/hotel'],
       function(Backbone,
                Hotel) {
	'use strict'

	var Hotels = Backbone.Collection.extend({
		model: Hotel,

		initialize: function(attributes, options)
		{
			Backbone.Collection.prototype.initialize.call(this, attributes, options);
		},
	});

	return Hotels;
});
