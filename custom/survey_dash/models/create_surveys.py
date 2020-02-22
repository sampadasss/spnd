from odoo import models, fields

class Surveys(models.Model):
    
    _name='demo.demo'
    _inherit=['survey.survey','survey.page']