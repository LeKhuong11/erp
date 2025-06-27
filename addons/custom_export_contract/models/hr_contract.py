from odoo import models

class HrContract(models.Model):
    _inherit = 'hr.contract'

    def export_contract_pdf(self):
        try:
            action = self.env.ref('custom_export_contract.action_report_hr_contract')
            # print(">>> Contract IDs:", self.ids)
            # print(">>> Employee Name:", self.employee_id.name)
            # print(">>> Country:", self.employee_id.country_id.name)
            return action.report_action(self)
        except Exception as e:
            print(">>> ERROR:", e)
            raise