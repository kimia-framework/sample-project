import { HttpRoute } from "../core/interfaces";

export const ROUTES: HttpRoute[] = [
   {
      path: '/',
      redirectPath: '/home',
   },
   {
      path: '/home',
      name: 'home',
      view: ['site', 'home'],
   },
   {
      path: '/login',
      template: 'root/login',
      name: 'login',
   },
   {
      path: '/login',
      method: 'post',
      view: ['site', 'login'],
   },
   {
      path: '/logout',
      view: ['site', 'logout'],
      name: 'logout',
   },
];