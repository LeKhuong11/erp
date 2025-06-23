{
    'name': 'HR Contract PDF Export',
    'version': '1.0',
    'depends': [
        'base',              # ✔ luôn nên có
        'web',               # ✔ để báo cáo QWeb hoạt động
        'hr',
        'hr_contract',
    ],
    'category': 'Human Resources',
    'summary': 'Xuất file PDF hợp đồng lao động',
    'description': """
        Module này thêm tính năng xuất hợp đồng lao động dưới dạng PDF từ menu Employee > Contract.
    """,
    'data': [
        'views/hr_contract_view.xml',                # nếu bạn có custom view thêm nút
        'reports/hr_contract_report_template.xml',    # template QWeb
        'reports/report.xml',                         # khai báo <report>
        # 'reports/header_template.xml',                # template header
    ],
    'assets': {
        'web.report_assets_common': [
            'custom_export_contract/static/src/css/style.scss',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': False,
}
