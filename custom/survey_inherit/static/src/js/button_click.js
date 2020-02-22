odoo.define('survey_inherit.button_click', function (require) {
"use strict";

var relationalField = require('web.relational_fields');
var core = require('web.core');
var QWeb = core.qweb;

var FieldX2Many = relationalField.FieldX2Many.include({
    custom_events: _.extend({}, relationalField.FieldX2Many.prototype.custom_events, {
          badge_clicked: '_OnBadgeClicked',
    }),
    _OnBadgeClicked : function(ev){
        
        if (this.mode != 'edit')
                return undefined;

        var result = ev.data.result; 
        var changes = {};

        changes['question'] = result['question'];
        changes['type'] = result['type'];
	changes['constr_mandatory'] = result['constr_mandatory'];
	changes['constr_error_msg'] = result['constr_error_msg'];	
      
        changes[this.name] = {
                operation: 'UPDATE',
                id: ev.data.dataPointID,
                changes: {} };

        this.trigger_up('field_changed', {
            dataPointID: this.dataPointID,  // here the ID is the parent(global) record
            changes: changes,
            viewType: this.viewType});
     },
});


var FieldMany2ManyTags = relationalField.FieldMany2ManyTags.include({	
    supportedFieldTypes: ['selection'],
    events: _.extend({}, relationalField.FieldMany2ManyTags.prototype.events, {
        'click .badge': '_onClickTag',
    }),

    _onClickTag: function(event){
		event.preventDefault();
        	event.stopPropagation();
		var self = this;

		var id = $(event.target).parent().data('id');
		
		var data = this._rpc({
			model: 'survey.survey',
			method: 'get_id',
			args: [id],
		}).then(function (result) {	
			self.trigger_up('badge_clicked', {
				result: result,
				dataPointID: self.dataPointID,
				id: id,
			});	

					
		});
		return data;
	},
});//close FieldMany2ManyTags

return {
	FieldMany2ManyTags: FieldMany2ManyTags,	
};

});//close odoo.define
































