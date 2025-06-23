from odoo import models, fields
import logging

# _logger = logging.getLogger(__name__)

class HrContract(models.Model):
    _inherit = 'hr.contract'
    
    def export_contract_pdf(self):
        try:
            action = self.env.ref('custom_export_contract.action_report_hr_contract')
            
            # print(">>> Found:", self)
            return action.report_action(self)
        except Exception as e:
            print(">>> ERROR:", e)
            raise
