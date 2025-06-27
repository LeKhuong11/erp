/** @odoo-module */

import { NavBar } from "@web/webclient/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import { onMounted,useRef,onWillStart, useState, useEffect } from "@odoo/owl";

// =======================================
// ANT DESIGN V5 APPS MENU FUNCTIONALITY
// =======================================

patch(NavBar.prototype, {
    setup() {
        super.setup();
        this.orm = useService("orm");
        this.menuService = useService("menu");
        this.state = useState({ sections: [], logo: '', brandName: '' });
        // Wait for menu service to be ready before setting up
        onWillStart(async () => {
            await this.menuService.reload();
            window.menuService = this.menuService;
        });

        useEffect(() => {
            const currentApp = this.currentApp;
            if (currentApp) {
                console.log({currentApp});
                this.setupSectionsMenu(currentApp);
            }
        }, () => [this.currentApp?.id]);

        onMounted(() => {
            this.setupAppsMenu();
            this.getLogo();
            this.getBrandName();

             console.log('final img src:', this.getViewLogo());
        });
    },


    setupAppsMenu() {
        console.log(this.menuService.getCurrentApp());
        // Use DOM selectors to find elements
        const appsMenuTrigger = document.getElementById('ant-apps-menu-trigger-all-apps');
        const appsPopover = document.querySelector('.ant-apps-popover');
        const appsMenuWrapper = document.querySelector('.ant-apps-menu-wrapper');
        
        if (!appsMenuTrigger || !appsPopover) {
            console.warn("Apps menu elements not found");
            return;
        }

        // Get apps from menu service
        const apps = this.getMenuApps();
        
        // Generate apps grid
        this.generateAppsGrid(apps, appsPopover);
        
        // Setup event listeners
        this.setupEventListeners(appsMenuTrigger, appsPopover, appsMenuWrapper);
    },


    setupSectionsMenu(app) {
        this.state.sections = this.menuService.getMenuAsTree(app.id).childrenTree;
    },

   async getLogo() {
        const res = await this.orm.call(
            'res.config.settings',
            'get_values',
            [],
            {}
        )
        console.log({res});
        
        // Handle different image formats
        if (res.theme_logo) {
            // Check if the logo is already a complete data URL
            if (res.theme_logo.startsWith('data:')) {
                this.state.logo = res.theme_logo;
            } else {
                // Handle base64 encoded images
                const imageType = this.detectMimeFromBase64(res.theme_logo);
                this.state.logo = `data:${imageType};base64,${res.theme_logo}`;
            }
        } else {
            // Default logo if none is set
            this.state.logo = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
        }
        console.log({logo: this.state.logo});
    },

    detectMimeFromBase64(base64) {
    const signatures = {
        "PHN2Zy": "image/svg+xml",     // "<svg"
        "PD94bW": "image/svg+xml",     // "<?xml"
        "/9j/": "image/jpeg",
        "iVBOR": "image/png",
        "R0lGOD": "image/gif",
        "UklGR": "image/webp",
    };

    for (let sig in signatures) {
        if (base64.startsWith(sig)) {
            return signatures[sig];
        }
    }
    return "application/octet-stream"; // fallback
},

  getViewLogo() {
    return this.state.logo
},

    async getBrandName() {
        const res = await this.orm.call(
            'res.config.settings',
            'get_values',
            [],
            {}
        )
        this.state.brandName = res.theme_brand_name || 'Odoo | Ant Design';
    },

    getMenuApps() {
        try {
            // Try different ways to get apps based on Odoo 18 structure
            if (this.menuService.getApps) {
                return this.menuService.getApps();
            } else if (this.menuService.getMenuAsTree) {
                const menuTree = this.menuService.getMenuAsTree("root");
                console.log({menuTree});
                return menuTree ? menuTree.children || [] : [];
            } else if (this.env.services.menu) {
                // Fallback to env.services.menu
                const menuSrv = this.env.services.menu;
                if (menuSrv.getApps) {
                    return menuSrv.getApps();
                } else if (menuSrv.getMenuAsTree) {
                    const tree = menuSrv.getMenuAsTree("root");
                    return tree ? tree.children || [] : [];
                }
            }
            
            // Last fallback - try to access menu data directly
            if (this.menuService.menuItems) {
                console.log(this.menuService.menuItems);
                return Object.values(this.menuService.menuItems).filter(item => !item.parent_id);
            }
            
            console.warn("Could not find apps from menu service");
            return [];
        } catch (error) {
            console.error("Error getting apps:", error);
            return [];
        }
    },

    generateAppsGrid(apps, appsPopover) {
        const appsGrid = appsPopover.querySelector('.ant-apps-grid');
        const appsCount = appsPopover.querySelector('.ant-apps-count');
        const subMenu = document.querySelector('.ant-sub-menu');
        
        if (!appsGrid) {
            console.warn("Apps grid container not found");
            return;
        }

        // Clear existing content
        appsGrid.innerHTML = '';

        if (!apps || apps.length === 0) {
            appsGrid.innerHTML = '<div class="ant-apps-empty">No applications found</div>';
            if (appsCount) {
                appsCount.textContent = '0 applications';
            }
            return;
        }

        if (appsCount) {
            appsCount.textContent = `${apps.length} applications`;
        }

        // Generate app items
        apps.forEach(app => {
            const appItem = this.createAppItem(app);


            console.log({app});


            appsGrid.appendChild(appItem);

        });
    },

    createAppItem(app) {
        const appItem = document.createElement('div');
        appItem.className = 'ant-app-item';
        appItem.setAttribute('data-app-id', app.id || app.xmlid);
        appItem.setAttribute('title', app.name || app.display_name || 'Unknown App');
        
        // Create app icon element
        const appIcon = document.createElement('div');
        appIcon.className = 'ant-app-icon';
        
        // Try to get app icon
        if (app.webIconData) {
            const img = document.createElement('img');
            img.src = app.webIconData;
            img.alt = app.name || app.display_name || 'App Icon';
            appIcon.appendChild(img);
        } else {
            appIcon.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            `;
            if(appIcon.classList) {
            appIcon.classList.add('ant-app-default');
            }

        }
        
        // Create app name element
        const appName = document.createElement('div');
        appName.className = 'ant-app-name';
        appName.textContent = app.name || app.display_name || 'Unknown App';
        
        // Assemble app item
        appItem.appendChild(appIcon);
        appItem.appendChild(appName);



        // Add click handler
        appItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.openApp(app);
        });

        return appItem;
    },


    openApp(app) {
        try {
            // Close the popover first
            this.closeAppsMenu();

            this.menuService.selectMenu(app);

            // Setup sections menu after action is executed
            this.setupSectionsMenu(app);

        } catch (error) {
            console.error("Error opening app:", error);
        }
    },

    getLogoAndBrandName() {
        // Get logo and brand name from settings using rpc
        this.orm.call(
            'res.config.settings',
            'get_values',
            [],
            {}
        ).then((result) => {
            const logo = result.theme_logo;
            const brandName = result.theme_brand_name || 'Odoo | Ant Design';

            // Update logo and brand name in header
            const logoImg = document.querySelector('.o_menu_brand_icon');
            const brandNameSpan = document.querySelector('.o_menu_brand span');

            if (logoImg) {
                logoImg.src = logo || 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
            }

            if (brandNameSpan) {
                brandNameSpan.textContent = brandName;
            }
        });
    },

    setupEventListeners(appsMenuTrigger, appsPopover, appsMenuWrapper) {
        // Toggle apps menu
        appsMenuTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleAppsMenu(appsMenuTrigger);
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!appsMenuWrapper.contains(e.target)) {
                this.closeAppsMenu(appsMenuTrigger);
            }
        });

        // Search functionality
        const searchInput = appsPopover.querySelector('.ant-apps-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterApps(e.target.value, appsPopover);
            });
        }

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAppsMenu(appsMenuTrigger);
            }
        });
    },

    toggleAppsMenu(appsMenuTrigger) {
        const isOpen = appsMenuTrigger.classList.contains('ant-apps-active');
        if (isOpen) {
            this.closeAppsMenu(appsMenuTrigger);
        } else {
            this.openAppsMenu(appsMenuTrigger);
        }
    },

    openAppsMenu(appsMenuTrigger) {
        // Add active class to trigger - CSS will handle showing popover
        appsMenuTrigger.classList.add('ant-apps-active');
        
        // Focus search input if available
        const searchInput = document.querySelector('.ant-apps-search-input');
        if (searchInput) {
            setTimeout(() => {
                searchInput.focus();
            }, 100);
        }
    },

    closeAppsMenu(appsMenuTrigger) {
        if (!appsMenuTrigger) {
            appsMenuTrigger = document.getElementById('ant-apps-menu-trigger-all-apps');
        }
        
        if (appsMenuTrigger) {
            // Remove active class from trigger - CSS will handle hiding popover
            appsMenuTrigger.classList.remove('ant-apps-active');
        }
        
        // Clear search
        const searchInput = document.querySelector('.ant-apps-search-input');
        if (searchInput) {
            searchInput.value = '';
            this.filterApps('', document.querySelector('.ant-apps-popover'));
        }
    },


    filterApps(searchTerm, appsPopover) {
        const appItems = appsPopover.querySelectorAll('.ant-app-item');
        const term = searchTerm.toLowerCase();

        appItems.forEach(item => {
            const appName = item.querySelector('.ant-app-name').textContent.toLowerCase();
            const matches = appName.includes(term);
            item.style.display = matches ? 'flex' : 'none';
        });
    }
});

// Add CSS for focused state and animations
const focusedStyle = document.createElement('style');
focusedStyle.textContent = `
    .ant-app-item.ant-app-focused {
        background: #1890ff !important;
        color: white !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 12px rgba(22, 119, 255, 0.3) !important;
    }
    
    .ant-app-item.ant-app-focused .ant-app-name,
    .ant-app-item.ant-app-focused .ant-app-desc {
        color: white !important;
    }
    
    .ant-app-animate-in {
        animation: fadeInUp 0.3s ease-out !important;
    }
    
    .ant-app-default::before {
        background: linear-gradient(135deg, #8c8c8c, #595959) !important;
    }
`;
document.head.appendChild(focusedStyle); 