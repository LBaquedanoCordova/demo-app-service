import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandlerService } from './services/error-handler.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient()
    ,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ]
};
