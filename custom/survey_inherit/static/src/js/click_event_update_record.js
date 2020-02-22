odoo.define('survey_inherit.button_click', function (require) {
"use strict";

var relationalField = require('web.relational_fields');
var FormController = require('web.FormController');
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
    custom_events: _.extend({}, relationalField.FieldMany2ManyTags.prototype.events, {
	update_tag: '_fieldChanged',
    }),
    events: _.extend({}, relationalField.FieldMany2ManyTags.prototype.events, {
        'click .badge': '_onClickTag',
    }),

    _fieldChanged: function(ev) {
		console.log('Field many2manytags');
		var test = ev.data.result;
		//var test1 = ev.data.dataPointID;
		//var test2 = ev.data.id;

		console.log('test:'+test);
		//console.log('test1:'+test1);
		//console.log('test2:'+test2);
	},

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

var formController = FormController.include({
	//id = 0;
	_onButtonClicked: function (event) {
		var self = this;
		if(event.data.attrs.id === "button_update_question"){
			var id = 1			
			this._rpc({
                                    model: 'survey.survey',
                                    method: 'update_question',
				    args: [{
						'id': id,
					}],   
                                }).then(function (result) {
					console.log('Form controller');	
					self.trigger_up('update_tag', {
						result: result,
						dataPointID: self.dataPointID,
						id: id,
					});
				/*console.log('result:'+result);
				var test = result['question'];
				console.log('result[question]:'+test);*/
			});
		}
		this._super(event);
		},
	});

return {
	FieldMany2ManyTags: FieldMany2ManyTags,	
};

});//close odoo.define
































/*odoo.define('survey_inherit.click_event_update_record',function(require){
"use strict";

var FormController = require('web.FormController');

var formController = FormController.include({
	//id = 0;
	_onButtonClicked: function (event) {
		
		if(event.data.attrs.id === "button_update_question"){
			var id = 1
			
			this._rpc({
                                    model: 'survey.survey',
                                    method: 'update_question',
				    args: [{
						'id': id,
					}],
				   
                                })
                                .then(function () {	
				/*var test = $('.question_class').text('check');
				var test1 = $('.select_question').val();
				console.log('js call');
				
				console.log('question:',+test);
				
				console.log('type:'+test1);
			});
		
		}
		this._super(event);
		},
	});	
});*///close odoo.define

