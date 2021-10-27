import { base } from "./base";
import * as FS from 'fs';
import * as PATH from 'path';
import { config, debugLog, errorLog } from '../../core/helpers/server';
import { generateUploadedFile, webRoute } from '../../core/helpers/app';
import { Op } from 'sequelize';
import { authenticate, login, userModel, encryptPassword } from "../../core/helpers/auth";
import { UserStatus } from "../../core/database/types";
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
         // console.log('user:', user);
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
   /***************************************** */
   async signup() {
      // =>get params
      const email = this.param('email');
      const alias = this.param('alias');
      const password = this.param('password');
      console.log('signup:', email, alias, password);
      try {
         // =>check valid email, password
         if (!email || !password || password.length < 5) {
            return await this.render('root/signup', { error: 'invalid_fields' });
         }
         // =>check not exist email or alias
         let user = await userModel().findOne({
            where: {
               [Op.or]: [
                  { email },
                  { alias },
               ],
            }
         });

         // =>check exist alias 
         if (user && user.getDataValue('alias') === alias) {
            return await this.render('root/signup', { error: 'exist_alias' });
         }
         // =>check exist email
         else if (user && user.getDataValue('email') === email) {
            return await this.render('root/signup', { error: 'exist_email' });
         }
         // =>create new user
         user = await userModel().create({
            username: email,
            email,
            password: await encryptPassword(password),
            alias,
            status: UserStatus.ACTIVE,
         });
         // console.log(user);
         // =>login user
         await login(user.getDataValue('id'), this.request);
         // =>redirect to home page
         return this.redirect('home');
      } catch (e) {
         errorLog('err436534', e);
         return await this.render('root/signup', { error: 'server_error' });
      }
   }

}