from odoo import models, fields, api

class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    theme_logo = fields.Binary(string="Logo Image", attachment=True)
    theme_brand_name = fields.Char(string="Brand Name")

    @api.model
    def get_values(self):
        res = super().get_values()
        params = self.env['ir.config_parameter'].sudo()
        res.update({
            'theme_brand_name': params.get_param('ant_backend_theme.theme_brand_name', default='Odoo | Ant Design'),
            'theme_logo': params.get_param('ant_backend_theme.theme_logo'),
        })
        return res

    def set_values(self):
        super().set_values()
        params = self.env['ir.config_parameter'].sudo()
        params.set_param('ant_backend_theme.theme_brand_name', self.theme_brand_name or '')
        params.set_param('ant_backend_theme.theme_logo', self.theme_logo or '')
