import { base } from "./base";
import * as FS from 'fs';
import * as PATH from 'path';
import { config, errorLog } from '../../core/helpers/server';
import { generateUploadedFile, webRoute } from '../../core/helpers/app';
import { Op } from 'sequelize';
import { authenticate, login } from "../../core/helpers/auth";
// import * as moment from 'jalali-moment';
var moment = require('jalali-moment');

export class site extends base {
   async home() {
      return await this.render('root/home', {
         'navbar_class': 'is-info',
      });
   }

   /***************************************** */
   async login() {
      // =>get params
      const email = this.param('email');
      const password = this.param('password');
      console.log('login:', email, password);
      // =>auth user
      const user = await authenticate(email, password, 'email');
      if (user) {
         // =>login user
         await login(user.getDataValue('id'), this.request);
         // =>redirect to home page
         return this.redirect('home');
      }
      // =>if not login
      else {
         return await this.render('root/login', { error: 'incorrect_email_pass' });
      }
   }
   /***************************************** */
   async logout() {
      await this.request.logout();
      // =>redirect ot home page
      return this.redirect('home');
   }

}