define(['backbone',
        'data/facility'],
       function(Backbone,
                Model) {
	'use strict';

	var Facilities = Backbone.Collection.extend({
		url: 'application/staticdata/facilities.json',
		model: Model,

		initialize: function(models, options)
		{
			Backbone.Collection.prototype.initialize.call(this, models, options);
		}
	});

	return Facilities;
});
