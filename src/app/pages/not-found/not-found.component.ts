import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="container py-5 text-center">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="error-container">
            <h1 class="display-1 fw-bold text-primary">404</h1>
            <h2 class="mb-4">Page Not Found</h2>
            <p class="lead mb-5">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
            <a routerLink="/" class="btn btn-primary btn-lg px-4">
              <i class="bi bi-house-door me-2"></i> Go to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 80vh;
      display: flex;
      align-items: center;
    }
    
    .error-container {
      padding: 3rem;
      border-radius: 0.5rem;
      background-color: #fff;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    }
  `]
})
export class NotFoundComponent {}
