from odoo import models

class HrContract(models.Model):
    _inherit = 'hr.contract'

    def action_print_contract_pdf(self):
        print(">>> DEBUG: action_print_contract_pdf called")
        try:
            action = self.env.ref('custom_hr_contract_pdf_export.action_hr_contract_pdf')
            print(">>> Found action:", action)
            return action.report_action(self)
        except Exception as e:
            print(">>> ERROR:", e)
            raise
