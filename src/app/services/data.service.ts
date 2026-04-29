import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface AzureService {
  id: string;
  name: string;
  description: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  getAzureServices(): Observable<AzureService[]> {
    const services: AzureService[] = [
      {
        id: '1',
        name: 'App Service',
        description: 'Fully managed platform for building, deploying, and scaling web apps.',
        icon: '🌐'
      },
      {
        id: '2',
        name: 'Azure SQL Database',
        description: 'Managed, intelligent SQL database in the cloud.',
        icon: '🗄️'
      },
      {
        id: '3',
        name: 'Azure Functions',
        description: 'Event-driven serverless compute platform.',
        icon: '⚡'
      },
      {
        id: '4',
        name: 'Azure Storage',
        description: 'Massively scalable, secure cloud storage for your data, apps, and workloads.',
        icon: '📦'
      }
    ];

    return of(services).pipe(delay(300)); // Simulate network latency
  }
}
