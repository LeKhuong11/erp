/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { LoginForm } from "@web/webclient/login/login_form";

patch(LoginForm.prototype, "ant_backend_theme_login", {
    setup() {
        this._super();
        // Add custom setup logic here
    },

    async willStart() {
        await this._super();
        // Add custom willStart logic here
    },

    mounted() {
        this._super();
        // Add custom mounted logic here
        // this._applyCustomStyles();
        console.log("login_custom.js mounted");
    },

    _applyCustomStyles() {
        const form = document.querySelector('.oe_login_form');
        if (form) {
            print("form: ", form)
            // form.innerHTML = `
            //     <div class="login-container">
            //         <div class="login-header">
            //             <img src="${this.env.session.company_logo}" class="company-logo"/>
            //             <h2 class="login-title">Welcome Back</h2>
            //             <p class="login-subtitle">Please sign in to continue</p>
            //         </div>
            //         <div class="form-group">
            //             <label for="login">Username</label>
            //             <div class="input-group">
            //                 <i class="fa fa-user input-icon"/>
            //                 <input type="text" name="login" id="login" class="form-control" placeholder="Enter your username" required="required"/>
            //             </div>
            //         </div>
            //         <div class="form-group">
            //             <label for="password">Password</label>
            //             <div class="input-group">
            //                 <i class="fa fa-lock input-icon"/>
            //                 <input type="password" name="password" id="password" class="form-control" placeholder="Enter your password" required="required"/>
            //             </div>
            //         </div>
            //         <div class="form-group">
            //             <button type="submit" class="btn btn-primary btn-block">Sign In</button>
            //         </div>
            //         <div class="form-group text-center">
            //             <a href="/web/reset_password" class="forgot-password">Forgot Password?</a>
            //         </div>
            //     </div>
            // `;
        }
    }
}); 