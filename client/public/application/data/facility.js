define(['backbone'],
       function(Backbone) {
	'use strict';

	var Facility = Backbone.Model.extend({
		baseUrl: '',

		initialize: function(attributes, options)
		{
			Backbone.Model.prototype.initialize.call(this, attributes, options);
		}
	});

	return Facility;
});
