{
    'name': 'HR Contract PDF Export',
    'version': '1.0',
    'depends': ['hr_contract'],
    'category': 'Human Resources',
    'summary': 'Xuất file PDF hợp đồng lao động',
    'data': [
        'views/hr_contract_view.xml',
        'reports/hr_contract_report.xml',
        'views/report.xml',
    ],
    'installable': True,
    'application': False,
}