import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-gray-50 min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block">Welcome to</span>
          <span class="block text-blue-600">Azure Demo App</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          This is a robust Angular 21 application built to showcase deployment on Azure App Service (Windows). It uses standalone components, Tailwind CSS, and is SPA-ready.
        </p>
        <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div class="rounded-md shadow">
            <a routerLink="/dashboard" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
}
