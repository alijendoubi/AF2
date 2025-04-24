import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
   <footer class="footer bg-dark text-white py-5">
      <div class="container py-4">
        <div class="row g-4">
          <div class="col-lg-4 mb-4 mb-lg-0">
            <h5 class="text-white mb-3 fw-bold">AutoFlowOS</h5>
            <p class="mb-4">{{ 'FOOTER.DESCRIPTION' | translate }}</p>
            <div class="social-links">
              <a href="#" class="social-icon me-3" aria-label="Twitter">
                <i class="bi bi-twitter fs-4"></i>
              </a>
              <a href="#" class="social-icon me-3" aria-label="LinkedIn">
                <i class="bi bi-linkedin fs-4"></i>
              </a>
              <a href="#" class="social-icon me-3" aria-label="GitHub">
                <i class="bi bi-github fs-4"></i>
              </a>
            </div>
          </div>
          <div class="col-6 col-lg-2">
            <h5 class="text-white mb-3 fw-bold">{{ 'FOOTER.COMPANY' | translate }}</h5>
            <ul class="list-unstyled footer-links">
              <li><a routerLink="/about">{{ 'FOOTER.ABOUT' | translate }}</a></li>
              <li><a routerLink="/features">{{ 'FOOTER.FEATURES' | translate }}</a></li>
              <li><a routerLink="/pricing">{{ 'FOOTER.PRICING' | translate }}</a></li>
              <li><a routerLink="/contact">{{ 'FOOTER.CONTACT' | translate }}</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-2">
            <h5 class="text-white mb-3 fw-bold">{{ 'FOOTER.RESOURCES' | translate }}</h5>
            <ul class="list-unstyled footer-links">
              <li><a href="#">{{ 'FOOTER.DOCUMENTATION' | translate }}</a></li>
              <li><a href="#">{{ 'FOOTER.API' | translate }}</a></li>
              <li><a href="#">{{ 'FOOTER.SUPPORT' | translate }}</a></li>
              <li><a href="#">{{ 'FOOTER.BLOG' | translate }}</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-2">
            <h5 class="text-white mb-3 fw-bold">{{ 'FOOTER.LEGAL' | translate }}</h5>
            <ul class="list-unstyled footer-links">
              <li><a href="#">{{ 'FOOTER.PRIVACY' | translate }}</a></li>
              <li><a href="#">{{ 'FOOTER.TERMS' | translate }}</a></li>
              <li><a href="#">{{ 'FOOTER.SECURITY' | translate }}</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-2">
            <h5 class="text-white mb-3 fw-bold">{{ 'FOOTER.ACCOUNT' | translate }}</h5>
            <ul class="list-unstyled footer-links">
              <li><a routerLink="/login">{{ 'FOOTER.LOGIN' | translate }}</a></li>
              <li><a routerLink="/signup">{{ 'FOOTER.SIGNUP' | translate }}</a></li>
              <li><a routerLink="/dashboard">{{ 'FOOTER.DASHBOARD' | translate }}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container mt-4 pt-4 border-top border-secondary">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <p class="mb-0">&copy; {{ currentYear }} AutoFlowOS. {{ 'FOOTER.RIGHTS' | translate }}</p>
          </div>
          <div class="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <div class="d-flex justify-content-center justify-content-md-end">
              <a href="#" class="text-white-50 me-3">{{ 'FOOTER.TERMS' | translate }}</a>
              <a href="#" class="text-white-50">{{ 'FOOTER.PRIVACY' | translate }}</a>
            </div>
          </div>
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
