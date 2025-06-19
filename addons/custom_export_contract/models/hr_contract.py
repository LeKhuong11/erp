from odoo import models

class HrContract(models.Model):
    _inherit = 'hr.contract'

    def export_contract_pdf(self):
        print(">>> DEBUG: action_print_contract_pdf")
        try:
            action = self.env.ref('custom_export_contract.action_report_hr_contract')
            print(">>> Found action:", action)
            return action.report_action(self)
        except Exception as e:
            print(">>> ERROR:", e)
            raise
