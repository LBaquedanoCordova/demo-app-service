import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { App } from './app';

// ---------------------------------------------------------
// Page Object Pattern
// ---------------------------------------------------------
// Centralizamos las consultas al DOM para que, si el HTML 
// cambia en el futuro, solo modifiquemos esta clase y no 
// todos los tests individualmente.
class AppPage {
  constructor(private fixture: ComponentFixture<App>) {}

  get navbarBrand(): HTMLElement {
    return this.fixture.debugElement.query(By.css('nav .font-bold')).nativeElement;
  }

  get navLinks(): HTMLAnchorElement[] {
    return this.fixture.debugElement.queryAll(By.css('nav a')).map(de => de.nativeElement);
  }

  get routerOutlet() {
    return this.fixture.debugElement.query(By.css('router-outlet'));
  }
}

describe('App Component', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let page: AppPage;

  beforeEach(async () => {
    // Arrange: Configuración del módulo de pruebas
    // Importamos el componente (standalone) y proveemos un router vacío 
    // para satisfacer las dependencias de RouterOutlet y RouterLink.
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])] 
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    page = new AppPage(fixture);
    
    // Act: Disparamos el ciclo de vida inicial de Angular
    fixture.detectChanges();
  });

  it('should create the app', () => {
    // Assert: Verificamos que el componente se instancie correctamente
    expect(component).toBeTruthy();
  });

  it('should render the navbar with the brand title', () => {
    // Assert: Verificamos el contenido del Navbar
    const brandText = page.navbarBrand.textContent?.trim();
    expect(brandText).toContain('☁️ Azure Demo');
  });

  it('should render navigation links for Home and Dashboard', () => {
    // Assert: Comprobamos que los enlaces existan y apunten a las rutas correctas
    const links = page.navLinks;
    expect(links.length).toBe(2);
    
    expect(links[0].textContent?.trim()).toBe('Home');
    expect(links[0].getAttribute('href')).toBe('/home');
    
    expect(links[1].textContent?.trim()).toBe('Dashboard');
    expect(links[1].getAttribute('href')).toBe('/dashboard');
  });

  it('should contain a router-outlet for rendering child routes', () => {
    // Assert: Verificamos que exista el punto de anclaje de las rutas
    expect(page.routerOutlet).not.toBeNull();
  });
});
