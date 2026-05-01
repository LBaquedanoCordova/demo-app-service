import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  private appInsights: ApplicationInsights | null = null;

  constructor(private router: Router) {
    // 1. Inicialización del SDK según documentación oficial usando la variable de entorno
    if (environment.appInsightsConnectionString) {
      this.appInsights = new ApplicationInsights({
        config: {
          connectionString: environment.appInsightsConnectionString,
          enableAutoRouteTracking: true,
        }
      });

      this.appInsights.loadAppInsights();
      this.createRouterSubscription();
    } else {
      console.warn('Application Insights is disabled (No connection string provided).');
    }
  }

  // 2. Rastreo automático de navegación (Page Views)
  private createRouterSubscription() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.appInsights?.trackPageView({ name: event.urlAfterRedirects });
    });
  }

  // 3. Métodos manuales para eventos personalizados
  trackException(exception: Error) {
    this.appInsights?.trackException({ exception });
  }

  trackEvent(name: string, properties?: { [key: string]: any }) {
    this.appInsights?.trackEvent({ name, properties });
  }
}