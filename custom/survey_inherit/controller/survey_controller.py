from odoo import http,models
from odoo.http import request
import werkzeug

class SurveyController(http.Controller):
    
    @http.route('/survey/create', type='http', auth='public')
    def surveycreate(self):
       
        action_id =  request.env.ref('survey_inherit.survey_create_action')
        return werkzeug.utils.redirect('web?debug=true#id=&action=%s&model=survey.inherit&view_type=form&menu_id=91' %(action_id))
        #return werkzeug.utils.redirect('/web?&#id=1&action=%s&model=survey.inherit&view_type=form&menu_id=84' %(action_id))
        #return werkzeug.utils.redirect('web?debug=true#id=&action=122&model=survey.inherit&view_type=form&menu_id=91')
        #return request.render('survey_inherit.action_view')
    
  