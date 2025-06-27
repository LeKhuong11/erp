{
    "name": "Ant Backend Theme",
    "version": "18.0.1.0.0",
    "category": "Themes/Backend",
 "summary": """Ant Backend Theme \n A modern and minimalist theme for Odoo backend inspired by Ant Design. Features include:
    - Clean and professional interface
    - Improved navigation and menu system
    - Enhanced visual components
    - Better user experience
    - Responsive design
    - Customizable color schemes""",
    "description": """A modern and minimalist theme for Odoo backend inspired by Ant Design. Features include:
    - Clean and professional interface
    - Improved navigation and menu system
    - Enhanced visual components
    - Better user experience
    - Responsive design
    - Customizable color schemes""",
    "description": """Minimalist and elegant theme for Odoo backend""",
    "author": "3B",
    "company": "3B",
    "maintainer": "3B",
     "live_preview_url": "http://ant-backend-theme.online/",
     "live_test_url": "http://144.202.16.240:8069/web/login?redirect=%2Fodoo%3F&login=demo&password=demo",
    "website": "https://bro3b-odoo-themes.lovable.app/",
    "depends": ["web", "mail"],
    "price": 11,
    "data": [
        "views/res_config_settings_views.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "ant_backend_theme/static/src/xml/header_custom_views.xml",
            "ant_backend_theme/static/src/css/variable/index.scss",
            "ant_backend_theme/static/src/js/ant_apps_menu.js",
            
            "ant_backend_theme/static/src/css/components/color/color.scss",
            "ant_backend_theme/static/src/css/variable/color/base_color_palettes.scss",
            "ant_backend_theme/static/src/css/variable/color/neutral_colors.scss",
            "ant_backend_theme/static/src/css/variable/spacing/border_radius.scss",
            "ant_backend_theme/static/src/css/variable/spacing/size.scss",

            "ant_backend_theme/static/src/css/components/header/ant_pro_header.scss",
            "ant_backend_theme/static/src/css/components/header/ant_apps_menu.scss",
            "ant_backend_theme/static/src/css/components/modal/modal.scss",
            "ant_backend_theme/static/src/css/components/tab/tab.scss",
            "ant_backend_theme/static/src/css/components/button/button.scss",
            "ant_backend_theme/static/src/css/components/notification/notification.scss",
            "ant_backend_theme/static/src/css/components/tooltip/tooltip.scss",
            "ant_backend_theme/static/src/css/components/loading/loading.scss",
            "ant_backend_theme/static/src/css/components/layout/layout.scss",
            "ant_backend_theme/static/src/css/components/card/card.scss",
            "ant_backend_theme/static/src/css/components/input/input.scss",
            "ant_backend_theme/static/src/css/components/select/select.scss",
            "ant_backend_theme/static/src/css/components/radio/radio.scss",
            "ant_backend_theme/static/src/css/components/checkbox/checkbox.scss",
            "ant_backend_theme/static/src/css/components/status/status.scss",
            "ant_backend_theme/static/src/css/components/breadcrumb/breadcrumb.scss",
            "ant_backend_theme/static/src/css/components/fileViewer/fileViewer.scss",
            "ant_backend_theme/static/src/css/components/switch/switch.scss",
            "ant_backend_theme/static/src/css/components/icon/icon.scss",
            "ant_backend_theme/static/src/css/components/popover/popover.scss", # popover
        ],
    },
    "images": [
        "static/description/demo_screenshot.gif",
            "static/description/thumbnail_screenshot.png",
    ],
    "license": "LGPL-3",
    "installable": True,
    "auto_install": False,
    "application": False,
}
