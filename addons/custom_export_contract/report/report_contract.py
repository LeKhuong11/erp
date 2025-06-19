from odoo import api, models

class ContractReport(models.AbstractModel):
    _name = 'report.custom_export_contract.report_contract_document'
    _description = 'Custom Contract Report'

    @api.model
    def _get_report_values(self, docids, data=None):
        docs = self.env['hr.contract'].browse(docids)
        return {
            'doc_ids': docids,
            'doc_model': 'hr.contract',
            'docs': docs,
        }
        
    def _render_qweb_pdf(self, docids, data=None):
        """Override to ensure the report is rendered correctly."""
        self.ensure_one()
        report_values = self._get_report_values(docids, data)
        return self.env.ref('custom_export_contract.report_contract_document')._render_qweb_pdf(report_values)