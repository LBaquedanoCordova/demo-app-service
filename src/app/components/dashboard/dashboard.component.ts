import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, AzureService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Azure Services Dashboard</h2>
      
      @if (loading()) {
        <div class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      } @else {
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (service of services(); track service.id) {
            <div class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0 text-4xl">
                    {{ service.icon }}
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-lg font-medium text-gray-900 truncate">
                        {{ service.name }}
                      </dt>
                    </dl>
                  </div>
                </div>
                <div class="mt-4">
                  <p class="text-sm text-gray-500">
                    {{ service.description }}
                  </p>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private dataService = inject(DataService);
  
  services = signal<AzureService[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.dataService.getAzureServices().subscribe({
      next: (data) => {
        this.services.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching data', err);
        this.loading.set(false);
      }
    });
  }
}
