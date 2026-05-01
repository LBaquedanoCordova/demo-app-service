import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MonitoringService } from './services/monitoring.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  constructor(private monitoringService: MonitoringService) {}

  ngOnInit() {
    // Al inyectar el servicio en el constructor, se activa el rastreo de rutas
    console.log('Azure Application Insights inicializado correctamente.');
  }
}
