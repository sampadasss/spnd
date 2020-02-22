odoo.define('survey_inherit.CustWidget', function (require) {
"use strict";
console.log('toggle');
var basic_fields = require('web.basic_fields');
var fieldRegistry = require('web.field_registry');
var FormRenderer = require('web.FormRenderer');

FormRenderer.include({
	autofocus: function () {
		var self =this;
		var $labels = this.$('label');
		if(self.state.model === 'survey.survey'){
			var nodes = window.$('.mandatory_check_class');
					
			if (nodes !== true){
				$('.mandatory_msg_class').hide();
				var node = window.$('.mandatory_msg_class').parent().parent();	
				node.find('.o_form_label').hide(); 			
			}
        }
        return this._super();
	},
});
	
var Toggle = basic_fields.BooleanToggle.extend({

    _onClick: function (event) {
        var self = this;
        this._super(event);
        var node = event.view.$('.custom-control-input');
	
        if(this.value) {
	   $('.mandatory_msg_class').show();
	   var node = window.$('.mandatory_msg_class').parent().parent();	
	   node.find('.o_form_label').show();
        } else {
	    console.log('toggle else');
	    $('.mandatory_msg_class').hide();
	    var node = window.$('.mandatory_msg_class').parent().parent();	
	    node.find('.o_form_label').hide();
        }
    },
});

fieldRegistry.add('toggle', Toggle);

return Toggle;

});































































