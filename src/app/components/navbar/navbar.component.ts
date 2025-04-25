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
    <nav class="navbar navbar-expand-lg navbar-modern">
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
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" 
                 [routerLinkActiveOptions]="{exact: true}">{{ 'NAV.ABOUTUS' | translate }}</a>
            </li><li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" 
                 [routerLinkActiveOptions]="{exact: true}">{{ 'NAV.MISSION' | translate }}</a>
            </li><li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" 
                 [routerLinkActiveOptions]="{exact: true}">{{ 'NAV.FEATURES' | translate }}</a>
            </li><li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" 
                 [routerLinkActiveOptions]="{exact: true}">{{ 'NAV.CONTACTUS' | translate }}</a>
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
      position: sticky;
      top: 0;
      z-index: 1000;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  
    .navbar-modern {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      padding: 1rem 0;
      margin-bottom: 0;
    }

    .navbar-brand {
      font-weight: 700;
      font-size: 1.5rem;
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: opacity 0.3s ease;
    }

    .navbar-brand:hover {
      opacity: 0.8;
    }

    .nav-link {
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      background: rgba(var(--bs-primary-rgb), 0.1);
      color: var(--bs-primary);
    }

    .nav-link.active {
      color: var(--bs-primary);
      background: rgba(var(--bs-primary-rgb), 0.1);
    }

    .navbar-toggler {
      border: none;
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }

    .navbar-toggler:hover {
      background: rgba(var(--bs-primary-rgb), 0.1);
    }

    .btn {
      padding: 0.5rem 1.25rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .btn-outline-primary {
      border-width: 2px;
    }

    .btn-outline-primary:hover {
      background: var(--bs-primary);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(var(--bs-primary-rgb), 0.2);
    }

    .btn-primary {
      border: none;
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(var(--bs-primary-rgb), 0.3);
    }

    .dropdown-menu {
      border: none;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border-radius: 1rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    .dropdown-item {
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .dropdown-item:hover {
      background: rgba(var(--bs-primary-rgb), 0.1);
      color: var(--bs-primary);
      transform: translateX(5px);
    }

    .dropdown-divider {
      margin: 0.5rem 0;
    }

    /* Light theme is always used */

    /* Mobile responsiveness */
    @media (max-width: 991.98px) {
      .navbar-collapse {
        background: rgba(255, 255, 255, 0.98);
        margin: 1rem -1rem -1rem;
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .navbar-nav {
        padding: 1rem 0;
      }

      .nav-item {
        margin: 0.25rem 0;
      }

      .nav-link {
        padding: 0.75rem 1rem;
      }

      .d-flex {
        flex-direction: column;
        align-items: stretch !important;
        gap: 0.5rem;
      }

      .btn {
        width: 100%;
        margin: 0.25rem 0 !important;
      }

      .dropdown {
        width: 100%;
      }

      .dropdown-toggle {
        width: 100%;
        text-align: left;
      }

      .dropdown-menu {
        width: 100%;
        margin-top: 0.5rem !important;
        box-shadow: none;
        background: rgba(255, 255, 255, 0.98);
        padding: 0;
      }

      .dropdown-item {
        padding: 0.75rem 1rem;
      }
    }
  `]
})
export class NavbarComponent {
  protected authService = inject(AuthService);

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
