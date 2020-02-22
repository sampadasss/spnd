from odoo import models,fields, http
from odoo.http import request
import werkzeug

class SurveyCreate(http.Controller): 
    
    @http.route('/survey/create',type='http',auth='public')
    def createsurvey(self):
        survey = request.env['survey.survey'].search([])
        page = request.env['survey.page']
        question = request.env['survey.question']
       
       # action_id = request.env.ref('survey.survey_form')
       # return werkzeug.utils.redirect('/web?&#min=1&limit=80&view_type=form&model=survey.survey&action=%s' %(action_id))
       # return werkzeug.utils.redirect('/web?&#id=1&action=%s&model=survey.survey&view_type=form&menu_id=84' %(action_id))
        return request.render('survey_dash.template_survey_create', {'survey':survey})