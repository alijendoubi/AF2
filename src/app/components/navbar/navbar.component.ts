import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LanguageSwitcherComponent, TranslateModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" routerLink="/">{{ 'APP.TITLE' | translate }}</a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" aria-controls="navbarNav" 
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" 
                 [routerLinkActiveOptions]="{exact: true}">{{ 'NAV.HOME' | translate }}</a>
            </li>
            @if (authService.isAuthenticated()) {
              <li class="nav-item">
                <a class="nav-link" routerLink="/dashboard" 
                   routerLinkActive="active">{{ 'NAV.DASHBOARD' | translate }}</a>
              </li>
            }
          </ul>
          
          <div class="d-flex align-items-center">
            <app-language-switcher class="me-2"></app-language-switcher>
            
            @if (authService.isAuthenticated()) {
              <div class="dropdown ms-2">
                <button class="btn btn-outline-primary dropdown-toggle" 
                        type="button" id="userDropdown" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false">
                  {{ authService.getCurrentUser()?.displayName || 'User' }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end" 
                    aria-labelledby="userDropdown">
                  <li>
                    <a class="dropdown-item" routerLink="/profile">{{ 'NAV.PROFILE' | translate }}</a>
                  </li>
                  @if (authService.isAdminUser()) {
                    <li>
                      <a class="dropdown-item" routerLink="/admin">{{ 'NAV.ADMIN' | translate }}</a>
                    </li>
                  }
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <button class="dropdown-item" (click)="logout()">
                      {{ 'NAV.LOGOUT' | translate }}
                    </button>
                  </li>
                </ul>
              </div>
            } @else {
              <a class="btn btn-outline-primary ms-2" routerLink="/login">
                {{ 'NAV.LOGIN' | translate }}
              </a>
              <a class="btn btn-primary ms-2" routerLink="/signup">
                {{ 'NAV.SIGNUP' | translate }}
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

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
