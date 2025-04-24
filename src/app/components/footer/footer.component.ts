import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer mt-auto py-4 bg-light">
      <div class="container">
        <div class="row gy-4">
          <div class="col-md-4">
            <h5>AutoFlowOS</h5>
            <p class="text-muted">
              Streamline your workflow with our powerful automation platform.
            </p>
          </div>
          <div class="col-md-4">
            <h5>Quick Links</h5>
            <ul class="list-unstyled">
              <li><a routerLink="/about" class="text-decoration-none">About</a></li>
              <li><a routerLink="/pricing" class="text-decoration-none">Pricing</a></li>
              <li><a routerLink="/contact" class="text-decoration-none">Contact</a></li>
              <li><a routerLink="/privacy" class="text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h5>Connect</h5>
            <ul class="list-unstyled">
              <li>
                <a href="https://twitter.com/autoflowos" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="text-decoration-none">
                  <i class="bi bi-twitter me-2"></i>Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/autoflowos" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="text-decoration-none">
                  <i class="bi bi-linkedin me-2"></i>LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/autoflowos" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="text-decoration-none">
                  <i class="bi bi-github me-2"></i>GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="text-center">
          <p class="mb-0">© {{ currentYear }} AutoFlowOS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .footer {
      border-top: 1px solid var(--bs-border-color);
    }
    
    a {
      color: var(--bs-body-color);
      
      &:hover {
        color: var(--bs-primary);
      }
    }
  `]
})
export class FooterComponent {
  protected currentYear = new Date().getFullYear();
}

