
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MonitoringService } from './monitoring.service';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
	constructor(private injector: Injector) {}

	handleError(error: any): void {
		// Lazy injection to avoid cyclic dependency
		const monitoringService = this.injector.get(MonitoringService);
		monitoringService.trackException(error instanceof Error ? error : new Error(error));

		// Opcional: también puedes loguear en consola para desarrollo
		if (typeof ngDevMode === 'undefined' || ngDevMode) {
			console.error('Global error captured:', error);
		}
	}
}
