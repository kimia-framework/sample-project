import * as PATH from 'path';

import { AppErrorHandler } from '../app/error-handler';
import { ProjectSettings } from '../app/interfaces';
import { KimiaSettings } from '../core/types';

export function load(): KimiaSettings<ProjectSettings> {
   const Settings: KimiaSettings<ProjectSettings> = {

      SITE_INFO:
      {
         name: 'sample-project',
         version: '1.0.0',
         poweredBy: 'kimia-framework',
         author: 'madkne',
         host: 'http://localhost:8081',
      },

      DEBUG_MODE: true,

      SERVER_PORT: 8081,

      API_PATH: '/api',

      STORAGE_PATH: PATH.join(__dirname, '..', '..', 'storage'),

      TMP_PATH: '/tmp',

      LOCALES_PATH: PATH.join(__dirname, '..', 'resources', 'locales'),

      ASSETS_PATH: PATH.join(__dirname, '..', '..', 'resources', 'assets'),

      UPLOAD_INFO: {
         path: 'uploads',
         fieldName: 'file',
         url: '/uploaded',
      },

      PUBLIC_MIDDLEWARES: [
         // 'UploadFile',
         'RequestInit',
         // 'SessionCookie',
         'XPoweredBy',
         'StaticFiles',
         'RoutingResolver',
      ],

      PREFIX_URL: '',

      ASSETS_URL: '/assets',

      DEFAULT_LOCALE: 'en',

      FALLBACK_LOCALE: 'en',

      DEFAULT_TIMEZONE: 'UTC',

      SESSION_INFO: {
         lifetime: 60 * 24 * 30, // 1 month 
         driver: 'database',
         cookieName: 'kimia_app_session',
         cookiePath: '/',
      },

      LOG_INFO: {
         modelName: 'CoreLog',
         path: 'logs',
      },

      INIT_MODELS: [
         'CoreFile',
         'CoreLog',
         'CoreSession',
      ],

      DATABASE_INFO: {
         driver: 'sqlite',
         path: 'database.db',
         dbName: 'kimia_app',
      },

      // USED_PLUGINS: [
      //    'nodeMailer',
      //    'jsZip',
      // ],


      MEMORY_CACHE_INFO: {
         maxMemoryCacheSize: 100 * 1000 * 1000, // 100MB
         memoryCacheExpired: 5,
      },

      TEMPLATE_INFO: {
         engine: 'twing',
         extension: '.twing.html',
         path: PATH.join(__dirname, '..', '..', 'resources', 'templates'),
      },

      HTTP_ERROR_HANDLER: AppErrorHandler,


      EMAIL_HOST: 'smtp.ethereal.email',
      EMAIL_PORT: 587,
      EMAIL_USER: 'hallie.abbott74@ethereal.email',
      EMAIL_PASS: 'EyE5pRwjCMqCQHTVFm',
      SERVER_EMAIL: 'hallie.abbott74@ethereal.email',

   };

   Settings.UPLOAD_INFO.path = PATH.join(Settings.STORAGE_PATH, 'uploads');
   Settings.LOG_INFO.path = PATH.join(Settings.STORAGE_PATH, 'logs');
   Settings.DATABASE_INFO.path = PATH.join(Settings.STORAGE_PATH, 'database.db');
   Settings.TMP_PATH = PATH.join(Settings.STORAGE_PATH, 'tmp');



   return Settings;
}
