
import { load as dev } from './dev';
import * as PATH from 'path';
import { KimiaSettings } from '../core/types';
import { ProjectSettings } from '../app/interfaces';

export function load(): KimiaSettings<ProjectSettings> {

   const Settings = dev();

   Settings.DEBUG_MODE = false;

   Settings.STORAGE_PATH = PATH.join(__dirname, '..', 'storage');

   Settings.LOG_INFO.path = PATH.join(Settings.STORAGE_PATH, 'logs');

   Settings.UPLOAD_INFO.path = PATH.join(Settings.STORAGE_PATH, 'uploads');

   Settings.TEMPLATE_INFO.path = PATH.join(__dirname, '..', 'resources', 'templates');

   Settings.ASSETS_PATH = PATH.join(__dirname, '..', 'resources', 'assets');


   Settings.TMP_PATH = PATH.join(Settings.STORAGE_PATH, 'tmp');



   return Settings;
}


