define(['backbone.marionette',
        'tpl!screens/rooms/templates/layout.html',
        'tpl!screens/rooms/templates/card.html'],
       function(Marionette,
                template,
                cardTemplate) {
	'use strict';

	var Layout = Marionette.View.extend({
		className: 'container-fluid',
		template: template,

		regions: {
			standardLocation: '#standardrooms',
			suitsLocation: '#suitrooms',
			specialistLocation: '#specialistrooms'
		},

		initialize: function(options)
		{
			Marionette.View.prototype.initialize.call(this, options);
		},

		onRender: function()
		{
			var standard = new Backbone.Collection();
			var suits = new Backbone.Collection();
			var specialist = new Backbone.Collection();

			standard.add(this.collection.filter(function(model) {
				var type = model.get('type');
				return type === 'single' || type === 'double' || type === 'twin';
			}));

			suits.add(this.collection.filter(function(model) {
				var type = model.get('type');
				return type === 'family' || type === 'suit';
			}));

			specialist.add(this.collection.filter(function(model) {
				var type = model.get('type');
				return type === 'bridal' || type === 'presidential' || type === 'penthouse';
			}));

			standard.invoke('set', 'enabled', true);
			suits.invoke('set', 'enabled', true);

			var View = Marionette.NextCollectionView.extend({
				childView: Marionette.View,
				childViewOptions: function(item) {
					return {
						template: cardTemplate,
						className: (item.get('type') === 'family') ? 'col-md-offset-2 col-md-4' : 'col-md-4',

						modelEvents: {
							'change': 'render'
						}
					};
				}
			});

			this.showChildView('standardLocation', new View({
				className: 'row',
				collection: standard
			}));

			this.showChildView('suitsLocation', new View({
				className: 'row',
				collection: suits
			}));

			this.showChildView('specialistLocation', new View({
				className: 'row',
				collection: specialist
			}));
		}
	});

	return Layout;
});
