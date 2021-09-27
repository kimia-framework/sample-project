import { debugLog } from "../core/helpers/server";
import { HttpErrorHandler } from "../core/server/error-handler";
import { HttpStatusCode } from "../core/server/types";


export class AppErrorHandler extends HttpErrorHandler {

   async webHandler(code: HttpStatusCode, data?: object) {
      if (code === HttpStatusCode.HTTP_404_NOT_FOUND) {
         return this.request.response(await this.render('errors/404', data), code);
      }
      else if (code === HttpStatusCode.HTTP_401_UNAUTHORIZED) {
         return this.request.response(await this.render('errors/401', data), code);
      }
      return await super.webHandler(code, data);
   }
}