define(['backbone.marionette',
        'data/facilities',
        'tpl!screens/rooms/templates/edit.html',
        'tpl!screens/rooms/templates/editfacility.html'],
       function(Marionette,
                Facilities,
                template,
                editFacilityTemplate) {
	'use strict';

	var FacilityList = Marionette.NextCollectionView.extend({
		tagName: 'ul',
		className: 'list-unstyled',

		childView: Marionette.View.extend({
			tagName: 'li',
			template: editFacilityTemplate,

			events: {
				'change input[type=radio]': 'onToggleRadio'
			},

			modelEvents: {
				'change': 'render'
			},

			onToggleRadio: function(event)
			{
				var radio = $(event.target);

				// get all radio buttons for this item
				this.$('input[name="' + radio[0].name + '"]').parent().toggleClass('active');
			},

			serializeData: function()
			{
				var appliedFacilities = this.getOption('appliedFacilities');

				var data = Marionette.View.prototype.serializeData.call(this);
				data.enabled = _.contains(appliedFacilities, this.model.get('id'));
				return data;
			}
		}),

		childViewOptions: function() {
			return {
				appliedFacilities: this.getOption('appliedFacilities')
			};
		},

		initialize: function(options)
		{
			Marionette.NextCollectionView.prototype.initialize.call(this, options);
		}
	});

	var Layout = Marionette.View.extend({

		tagName: 'form',
		template: template,

		regions: {
			facilitiesLocation: '#facilitylist'
		},

		ui: {
			allocationLabel: '#allocation',
			allocate: 'input[name=allocate]'
		},

		events: {
			'change': 'onChange',
			'click button[name=allocate]': 'onChangeAllocation',
			'click button[name=apply]': 'onApply'
		},

		initialize: function(options)
		{
			Marionette.View.prototype.initialize.call(this, options);
		},

		getUnassignedRoomCount: function()
		{
			return this.getOption('hotel').get('unassignedRooms');
		},

		onChange: function()
		{
			var data = $(this.$el).serializeArray();
			console.log(data);
		},

		onChangeAllocation: function(event)
		{
			var value = $(event.target).val();
			var allocation = parseInt(this.ui.allocate.val());
			var maximum = this.getUnassignedRoomCount();

			if (value === 'none')
			{
				allocation = 0;
			}
			else if (value === 'max')
			{

				allocation = maximum;
			}
			else
			{
				allocation += parseInt(value);
			}

			// allocation = Math.max(0, Math.min(allocation, maximum));

			this.ui.allocationLabel.text(allocation);
			this.ui.allocate.val(allocation);
		},

		onApply: function()
		{
			// serialize form
			var data = $(this.$el).serializeArray();

			// verify allocated / available rooms, recalculate cost, verify player balance, apply upgrades, deduct cost
			var allocated = _.find(data, { name: 'allocate' });
			// Calculate available rooms (currently assigned and unassigned)
			var available = this.getUnassignedRoomCount() + this.model.get('allocated');
			allocated.value = parseInt(allocated.value);
			// Max to allocated room value
			allocated.value = Math.min(available, allocated.value);
			// Min to zero
			allocated.value = Math.max(0, allocated.value);

			// transform jQuery form data into model compatible data
			var modelData = {
				facilities: []
			};

			_.each(data, function(item) {
				// Find the original element
				var input = this.$('[name="' + item.name + '"]')[0];

				if (input.getAttribute('data-category') === 'facility')
				{
					// convert 'true' / 'false' values to booleans
					if (item.value === 'true')
					{
						modelData.facilities.push(item.name);
					}
				}
				else if (item.name === 'allocate')
				{
					modelData.allocated = item.value;
				}
				else
				{
					modelData[item.name] = item.value;
				}
			}, this);

			this.model.set(modelData);

			Backbone.history.navigate('#/Hotel/1/Rooms');
		},

		serializeData: function()
		{
			var data = Marionette.View.prototype.serializeData.call(this);
			data.available =  this.getUnassignedRoomCount();
			return data;
		},

		onRender: function()
		{
			var facilities = new Facilities();

			facilities.fetch();

			this.listenToOnce(facilities, 'sync', function(collection) {
				this.showChildView('facilitiesLocation', new FacilityList({
					collection: collection,
					appliedFacilities: this.model.get('facilities')
				}));
			});
		}
	});

	return Layout;
});
