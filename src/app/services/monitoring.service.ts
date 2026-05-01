import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  private appInsights: ApplicationInsights;

  constructor(private router: Router) {
    // 1. Inicialización del SDK según documentación oficial
    this.appInsights = new ApplicationInsights({
      config: {
        connectionString: 'InstrumentationKey=53458414-c28b-407d-8900-45010a81215e;IngestionEndpoint=https://chilecentral-0.in.applicationinsights.azure.com/;LiveEndpoint=https://chilecentral.livediagnostics.monitor.azure.com/;ApplicationId=a033a65b-e806-41e2-a590-27157cbe379b',
        enableAutoRouteTracking: true,
      }
    });

    this.appInsights.loadAppInsights();
    this.createRouterSubscription();
  }

  // 2. Rastreo automático de navegación (Page Views)
  private createRouterSubscription() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.appInsights.trackPageView({ name: event.urlAfterRedirects });
    });
  }

  // 3. Métodos manuales para eventos personalizados
  trackException(exception: Error) {
    this.appInsights.trackException({ exception });
  }

  trackEvent(name: string, properties?: { [key: string]: any }) {
    this.appInsights.trackEvent({ name, properties });
  }
}