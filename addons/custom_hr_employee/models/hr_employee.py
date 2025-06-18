from odoo import models, fields;

class HrEmployee(models.Model):
    _inherit = 'hr.employee'

    permanent_address = fields.Char(string="Địa chỉ thường trú", help="Permanent address of the employee")
    current_address = fields.Char(string="Địa chỉ tạm trú", help="Temporary address of the employee")
    customer_id = fields.Char(string="Mã khách hàng", help="Unique identifier for the customer")
    timekeeping_code = fields.Char(string="Mã chấm công", help="Code used for timekeeping purposes")
    cccd = fields.Char(string="Số CCCD", help="Citizen ID card number")
    cccd_front_image  = fields.Binary(string="CCCD mặt trước", help="Image of the front side of the CCCD")
    cccd_back_image = fields.Binary(string="CCCD mặt sau", help="Image of the back side of the CCCD")
    issue_date_id_card = fields.Date(string="Ngày cấp CCCD", help="Date when the CCCD was issued")
    issue_place_id_card = fields.Char(string="Nơi cấp CCCD", help="Place where the CCCD was issued")
    start_date = fields.Date(string="Ngày vào làm", help="Start date of the employee's contract")
    official_date = fields.Date(string="Ngày chính thức", help="Official date when the employee becomes a full-time employee")
    ethnicity = fields.Char(string="Dân tộc", help="Official date when the employee becomes a full-time employee")
    religion = fields.Char(string="Tôn giáo", help="Religion of the employee")
    hometown = fields.Char(string="Quê quán", help="Hometown of the employee")
    medical_insurance_id = fields.Char(string="Số sổ BHYT", help="Medical insurance card number")
    tax_code = fields.Char(string="Mã số thuế", help="Tax identification number of the employee")
    education_level = fields.Char(string="Trình độ", help="Trình độ học vấn của nhân viên")
    major = fields.Char(string="Chuyên ngành", help="Chuyên ngành học của nhân viên")
    it_level = fields.Char(string="Trình độ tin học", help="Trình độ tin học của nhân viên")
    language_level = fields.Char(string="Trình độ ngoại ngữ", help="Trình độ ngoại ngữ của nhân viên")
     