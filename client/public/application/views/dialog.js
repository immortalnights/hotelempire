define(['backbone.marionette',
        'tpl!templates/dialog.html'],
        function(Marionette,
                 template) {
	'use strict';

	var Dialog = Marionette.View.extend({
		className: 'modal-dialog',
		template: template,

		regions: {
			body: '.modal-body',
			footer: '.modal-footer',
		},

		ui: {
			title: '.modal-title'
		},

		initialize: function(options)
		{
			this.mergeOptions(options, ['title', 'body', 'footer']);
			Marionette.View.prototype.initialize.call(this, options);
		},

		show: function()
		{
			var app = require('application')();
			app.showDialog(this);
			return this;
		},

		onRender: function()
		{
			// Render the title
			this.ui.title.text(this.title);

			var body = this.getOption('body');
			this.showChildView('body', body);
		}
	});

	return Dialog;
});
