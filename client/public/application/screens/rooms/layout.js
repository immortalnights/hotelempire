define(['backbone.marionette',
        'views/dialog',
        'screens/rooms/edit',
        'tpl!screens/rooms/templates/layout.html',
        'tpl!screens/rooms/templates/card.html'],
       function(Marionette,
                Dialog,
                Editor,
                template,
                cardTemplate) {
	'use strict';

	var Layout = Marionette.View.extend({
		template: template,

		regions: {
			standardLocation: '#standardrooms',
			suitsLocation: '#suitrooms',
			specialistLocation: '#specialistrooms'
		},

		modelEvents: {
			change: 'render'
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

			var hotel = this.model;

			// When any room is changed, update the hotel allocation
			this.listenTo(this.collection, 'change', function(room, options) {
				// verify the total is less than the max
				var totalAllocation = this.collection.reduce(function(memo, model, index, collection) {
					return memo + model.get('allocated');
				}, 0);

				var diff = hotel.get('totalRooms') - totalAllocation;

				console.assert(diff >= 0);

				hotel.set('unassignedRooms', diff);
			});

			var View = Marionette.NextCollectionView.extend({
				childView: Marionette.View,
				childViewOptions: function(item) {
					return {
						template: cardTemplate,
						className: (item.get('type') === 'family') ? 'col-md-offset-2 col-md-4' : 'col-md-4',

						modelEvents: {
							'change': 'render'
						},

						triggers: {
							'click a[data-control=editroom]': 'edit:room'
						}
					};
				},

				onChildviewEditRoom: function(view, event)
				{
					var dialog = new Dialog({
						title: "Edit '" + view.model.get('name') + "'",
						body: new Editor({
							model: view.model,
							hotel: hotel
						})
					});
					dialog.show();
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
