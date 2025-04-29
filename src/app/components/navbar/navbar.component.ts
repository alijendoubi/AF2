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
    <nav class="navbar navbar-expand-lg navbar-modern" style="color: black;">
      <div class="container">
        <a class="navbar-brand" routerLink="/">{{ 'APP.TITLE' | translate }}</a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" aria-controls="navbarNav" 
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav" >
          <ul class="navbar-nav me-auto" style="color: black;" >
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" 
                 [routerLinkActiveOptions]="{exact: true}">{{ 'NAV.HOME' | translate }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/about" routerLinkActive="active">{{ 'NAV.ABOUTUS' | translate }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/mission" routerLinkActive="active">{{ 'NAV.MISSION' | translate }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/features" routerLinkActive="active">{{ 'NAV.FEATURES' | translate }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/contact" routerLinkActive="active">{{ 'NAV.CONTACTUS' | translate }}</a>
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
    /* Base host styling */
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      padding-bottom: 0;
      --primary-color: #2696AD;
      --accent-color: #8456EC;
      --secondary-color: #4A3AFF;
      --text-color: #000000;
    }

    /* Clean modern navbar styling */
    .navbar-modern {
      background: #FFFFFF;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      padding: 1rem 1.5rem;
      transition: all 0.3s ease;
    }

    /* Bold uppercase logo styling with gradient */
    .navbar-brand {
      font-weight: 800;
      font-size: 1.5rem;
      text-transform: uppercase;
      font-family: sans-serif;
      letter-spacing: 0.02em;
      background: linear-gradient(135deg, var(--primary-color) 10%, var(--accent-color) 50%, var(--secondary-color) 90%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient 3s ease infinite;
    }
    
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    /* Black nav links with hover effects */
    .nav-link {
      font-weight: 500;
      padding: 0.5rem 1rem;
      color: #000000 !important;
      transition: all 0.3s ease;
      margin: 0 0.25rem;
      position: relative;
      font-family: sans-serif;
      text-decoration: none;
    }

    .nav-link:hover {
      color: #555555 !important;
      transform: translateY(-2px);
      text-decoration: underline;
    }

    /* Ensure Bootstrap nav-link hover override */
    .navbar-nav .nav-link:focus, 
    .navbar-nav .nav-link:hover {
      color: #555555 !important;
    }

    .nav-link.active {
      color: var(--primary-color) !important;
      font-weight: 600;
    }
    /* Futuristic navbar toggler */

    .navbar-toggler:hover::before {
      opacity: 1;
    }

    .navbar-toggler:focus {
      box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb, 98, 0, 238, 0.25));
    }

    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='var(--primary-color, rgba(98, 0, 238, 0.85))' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
      transition: background-image 0.3s ease;
    }

    /* Futuristic button styles */
    .btn {
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      font-weight: 500;
      position: relative;
      overflow: hidden;
      z-index: 1;
      will-change: transform, box-shadow;
    }

    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: -1;
    }

    .btn-outline-primary {
      border: 2px solid var(--accent-color);
      background: transparent;
      color: var(--accent-color);
    }

    .btn-outline-primary:hover {
      background: var(--accent-color);
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(132, 86, 236, 0.2);
    }

    .btn-outline-primary:hover::before {
      opacity: 1;
    }

    .btn-primary {
      border: none;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 50%, var(--secondary-color) 100%);
      background-size: 200% auto;
      color: #ffffff;
      animation: gradient 3s ease infinite;
      box-shadow: 0 4px 10px rgba(38, 150, 173, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 8px 20px rgba(38, 150, 173, 0.4);
    }

    /* Futuristic dropdown styling */
    .dropdown-menu {
      border: none;
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.12),
        0 0 0 1px rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 0.75rem;
      margin-top: 10px !important;
      background: rgba(var(--bg-color-rgb, 255, 255, 255, 0.9));
      transition: background 0.3s ease, box-shadow 0.3s ease;
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      transform-origin: top center;
      animation: scaleIn 0.2s ease forwards;
      overflow: hidden;
    }

    @keyframes scaleIn {
      from { transform: translateY(10px) scale(0.95); opacity: 0; }
      to { transform: translateY(0) scale(1); opacity: 1; }
    }

    .dropdown-item {
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
      margin-bottom: 0.25rem;
      position: relative;
      z-index: 1;
      overflow: hidden;
    }

    .dropdown-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(var(--primary-color-rgb, 98, 0, 238, 0.15)) 0%,
        rgba(var(--primary-color-rgb, 98, 0, 238, 0.05)) 100%
      );
      border-radius: 8px;
      opacity: 0;
      z-index: -1;
      transform: translateX(-100%);
      transition: all 0.3s ease;
    }

    .dropdown-item:hover {
      background: transparent;
      color: var(--primary-color);
      transform: translateX(5px);
    }

    .dropdown-item:hover::before {
      opacity: 1;
      transform: translateX(0);
    }

    .dropdown-divider {
      margin: 0.5rem 0;
      border-top: 1px solid rgba(var(--primary-color-rgb, 98, 0, 238, 0.1));
      opacity: 0.5;
    }

    /* Dark theme support */
    /* Enhanced dark theme support with proper contrast */
    :host-context(.dark-theme) .navbar-modern {
      background: linear-gradient(
        135deg,
        rgba(30, 30, 30, 0.85) 0%,
        rgba(20, 20, 20, 0.75) 50%,
        rgba(30, 30, 30, 0.85) 100%
      );
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 
        0 4px 20px rgba(0, 0, 0, 0.3),
        0 2px 0 rgba(255, 255, 255, 0.05) inset,
        0 -1px 0 rgba(0, 0, 0, 0.8) inset;
      transition: background 0.6s ease, box-shadow 0.6s ease, border-color 0.6s ease;
    }

    :host-context(.dark-theme) .nav-link {
      color: rgba(255, 255, 255, 0.85) !important;
    }

    :host-context(.dark-theme) .nav-link:hover {
      color: rgba(255, 255, 255, 0.85) !important;
    }

    :host-context(.dark-theme) .nav-link.active {
      color: var(--primary-color) !important;
    }

    :host-context(.dark-theme) .dropdown-menu {
      background: rgba(var(--surface-color-rgb, 30, 30, 30, 0.95));
      box-shadow: 
        0 10px 30px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.05);
    }

    :host-context(.dark-theme) .dropdown-item {
      color: var(--text-color, rgba(255, 255, 255, 0.85));
    }

    :host-context(.dark-theme) .dropdown-item:hover {
      color: var(--primary-color);
    }

    :host-context(.dark-theme) .dropdown-divider {
      border-top-color: rgba(255, 255, 255, 0.1);
    }

    :host-context(.dark-theme) .navbar-toggler {
      background: rgba(30, 30, 30, 0.5);
    }

    :host-context(.dark-theme) .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }

    /* Mobile responsiveness with enhanced animations */
    @media (max-width: 991.98px) {
      .navbar-collapse {
        background: rgba(var(--bg-color-rgb, 255, 255, 255, 0.95));
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        margin: 1rem -1rem -1rem;
        padding: 1.25rem;
        border-radius: 16px;
        box-shadow: 
          0 10px 30px rgba(0, 0, 0, 0.15),
          0 0 0 1px rgba(255, 255, 255, 0.1);
        transform-origin: top center;
        animation: collapseIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: transform, opacity;
        border-top: 1px solid rgba(var(--primary-color-rgb, 98, 0, 238, 0.1));
      }
      @keyframes collapseIn {
        from { transform: translateY(-20px) scale(0.98); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
      }

      .navbar-nav {
        padding: 1rem 0;
      }

      .nav-item {
        margin: 0.3rem 0;
      }

      .nav-link {
        padding: 0.75rem 1rem;
        margin: 0.25rem 0;
        text-align: center;
        color: #000000 !important;
        font-family: sans-serif;
      }
      
      .nav-link:hover,
      .nav-link:focus {
        color: #555555 !important;
        text-decoration: underline;
      }

      .nav-link::after {
        bottom: 5px;
      }

      .d-flex {
        flex-direction: column;
        align-items: stretch !important;
        gap: 0.75rem;
      }

      .btn {
        width: 100%;
        margin: 0.25rem 0 !important;
        padding: 0.75rem 1rem;
        text-align: center;
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
