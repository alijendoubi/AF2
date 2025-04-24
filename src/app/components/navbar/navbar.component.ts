import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, ThemeService } from '../../services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" routerLink="/">AutoFlowOS</a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" aria-controls="navbarNav" 
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" 
                 [routerLinkActiveOptions]="{exact: true}">Home</a>
            </li>
            @if (authService.isAuthenticated()) {
              <li class="nav-item">
                <a class="nav-link" routerLink="/dashboard" 
                   routerLinkActive="active">Dashboard</a>
              </li>
            }
          </ul>
          
          <div class="d-flex align-items-center">
            <button class="btn btn-link" (click)="themeService.toggleTheme()">
              <i [class]="themeService.isDarkTheme() ? 'bi bi-sun' : 'bi bi-moon'"></i>
            </button>
            
            @if (authService.isAuthenticated()) {
              <div class="dropdown">
                <button class="btn btn-outline-primary dropdown-toggle" 
                        type="button" id="userDropdown" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false">
                  {{ authService.getCurrentUser()?.displayName || 'User' }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end" 
                    aria-labelledby="userDropdown">
                  <li>
                    <a class="dropdown-item" routerLink="/profile">Profile</a>
                  </li>
                  @if (authService.isAdminUser()) {
                    <li>
                      <a class="dropdown-item" routerLink="/admin">Admin Panel</a>
                    </li>
                  }
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <button class="dropdown-item" (click)="logout()">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            } @else {
              <a class="btn btn-outline-primary me-2" routerLink="/login">
                Login
              </a>
              <a class="btn btn-primary" routerLink="/signup">
                Sign Up
              </a>
            }
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .navbar {
      border-bottom: 1px solid var(--bs-border-color);
    }
  `]
})
export class NavbarComponent {
  protected authService = inject(AuthService);
  protected themeService = inject(ThemeService);

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}

