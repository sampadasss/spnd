from odoo import models,fields, api
#from odoo.addons.survey.model.survey import *

class SurveyCreate(models.Model):
    
    _name = 'survey.survey'
    _inherit = ['survey.survey','survey.question']
    
    
    pages_ids = fields.One2many('survey.page','survey_id', string='Pages', copy=True)    
    
    
    @api.model
    def get_id(self,id):
        #print('From js to python')
        dict = {}
        vals = self.env['survey.question'].search([('id','=',id)])
        # print('vals:',vals)
        for i in vals:
            """  print('id:',i.id)
            print('question:',i.question)
            print('type',i.type)
            print('constr_mandatory',i.constr_mandatory)
            print('constr_mandatory',i.constr_error_msg)"""
            dict = {
                    'id': i.id,
                    'question': i.question,
                    'type': i.type,
                    'constr_mandatory': i.constr_mandatory,
                    'constr_error_msg': i.constr_error_msg,
                }
          
            #print('self.question:',self.question)
        #self.create_question(id)
        return dict
    
    @api.multi
    def create_question(self):
     
        for i in self.pages_ids:
            id = i.id
                        
#         print('question: ',self.question)
#         print('type: ',self.type)    
        question_id = self.env['survey.question'].create({
            'page_id': id,#self.pages_ids.id,
            'question':self.question,
            'type':self.type,
            'matrix_subtype':self.matrix_subtype,#column_nb and display_mode remain
            'labels_ids':self.labels_ids,
            'labels_ids_2':self.labels_ids_2,
            'comments_allowed':self.comments_allowed,
            'comments_message':self.comments_message,
            'comment_count_as_answer':self.comment_count_as_answer,
            'validation_required':self.validation_required,
            'validation_email':self.validation_email,
            'validation_length_min':self.validation_length_min,
            'validation_length_max':self.validation_length_max,
            'validation_min_float_value':self.validation_min_float_value,
            'validation_max_float_value':self.validation_max_float_value,
            'validation_min_date':self.validation_min_date,
            'validation_max_date':self.validation_max_date,
            'validation_error_msg':self.validation_error_msg,
            'constr_mandatory':self.constr_mandatory,
            'constr_error_msg':self.constr_error_msg,
            'user_input_line_ids':self.user_input_line_ids,  
        })
               
        self.question = ''
        self.type = ''
        self.labels_ids = ''
        self.constr_mandatory = ''

    @api.model  
    @api.multi
    def update_question(self,vals):#id,result
#         print('update_question')
#         print('update_question id',id)
        print('click from js to python')
        print('click from js to python',vals)
        id = vals['id']
        update_data = {}
#         for i in result:
#             id = i
#             print('id:',i)#result['id']
#         print('click from js to python:',id)
#         print('id1:',id1)
#         print('question:',self.question)
#         print('type:',self.type)
#         print('constr_mandatory:',self.constr_mandatory)
#         print('constr_error_msg:',self.constr_error_msg)
        update_data = {
            'question': 'question1',#self.question,
            'type': self.type,
            'constr_mandatory': self.constr_mandatory,
            'constr_error_msg': self.constr_error_msg,
        }
        exiting_data = self.env['survey.question'].search([('id','=',id)]).write(update_data)
#         print(exiting_data)
        print('exiting_data:',exiting_data)
        data = self.env['survey.question'].search([('id','=',id)])
        print('data:',data)
        dict = {}
        for i in data:
            print('question:',i.question)
            print('type:',i.type)
            dict = {
                'question': i.question,
                'type': i.type,
            }
#              exiting_data.write({'question_ids': [(4, id1)]})
        
        return dict
#         for i in self:
#             i.question = ''
#             i.type = ''
#             i.constr_mandatory = ''
            
       
      
       
   