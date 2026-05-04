import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AzureService {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Course {
  id: number;
  title: string;
  thumbnail: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly courses = signal<Course[]>([
    {
      id: 1,
      title: 'Dominando Azure para Frontend',
      thumbnail: `${environment.blobStorageUrl}/test-image1.jpg`,
    },
  ]);

  getAzureServices(): Observable<AzureService[]> {
    const services: AzureService[] = [
      {
        id: '1',
        name: 'App Service',
        description: 'Fully managed platform for building, deploying, and scaling web apps.',
        icon: '🌐',
      },
      {
        id: '2',
        name: 'Azure SQL Database',
        description: 'Managed, intelligent SQL database in the cloud.',
        icon: '🗄️',
      },
      {
        id: '3',
        name: 'Azure Functions',
        description: 'Event-driven serverless compute platform.',
        icon: '⚡',
      },
      {
        id: '4',
        name: 'Azure Storage',
        description: 'Massively scalable, secure cloud storage for your data, apps, and workloads.',
        icon: '📦',
      },
    ];

    return of(services).pipe(delay(300)); // Simulate network latency
  }
}
