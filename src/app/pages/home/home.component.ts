import { Component, inject, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services';

// Bootstrap type declaration
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, FormsModule],
  template: `
    <!-- Hero Section -->
    <section class="hero bg-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-3">{{ 'HOME.HERO.TITLE' | translate }}</h1>
            <p class="lead mb-4">{{ 'HOME.HERO.SUBTITLE' | translate }}</p>
            <div class="d-grid gap-2 d-md-flex">
              <a routerLink="/signup" class="btn btn-light btn-lg px-4 me-md-2">{{ 'HOME.HERO.CTA' | translate }}</a>
            </div>
          </div>
          <div class="col-lg-6 d-none d-lg-block">
            <img src="assets/images/hero-image.svg" alt="AutoFlowOS Dashboard" class="img-fluid">
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold">{{ 'HOME.FEATURES.TITLE' | translate }}</h2>
        </div>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3">
                  <i class="bi bi-gear-fill"></i>
                </div>
                <h5 class="card-title">{{ 'HOME.FEATURES.AUTOMATION.TITLE' | translate }}</h5>
                <p class="card-text">{{ 'HOME.FEATURES.AUTOMATION.DESCRIPTION' | translate }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3">
                  <i class="bi bi-graph-up"></i>
                </div>
                <h5 class="card-title">{{ 'HOME.FEATURES.ANALYTICS.TITLE' | translate }}</h5>
                <p class="card-text">{{ 'HOME.FEATURES.ANALYTICS.DESCRIPTION' | translate }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3">
                  <i class="bi bi-puzzle"></i>
                </div>
                <h5 class="card-title">{{ 'HOME.FEATURES.INTEGRATION.TITLE' | translate }}</h5>
                <p class="card-text">{{ 'HOME.FEATURES.INTEGRATION.DESCRIPTION' | translate }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3">
                  <i class="bi bi-shield-check"></i>
                </div>
                <h5 class="card-title">{{ 'HOME.FEATURES.SECURITY.TITLE' | translate }}</h5>
                <p class="card-text">{{ 'HOME.FEATURES.SECURITY.DESCRIPTION' | translate }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about py-5 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <img src="assets/images/about-image.svg" alt="About AutoFlowOS" class="img-fluid rounded">
          </div>
          <div class="col-lg-6">
            <h2 class="fw-bold mb-4">{{ 'HOME.ABOUT.TITLE' | translate }}</h2>
            <p class="lead">{{ 'HOME.ABOUT.DESCRIPTION' | translate }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="text-center mb-5">
              <h2 class="fw-bold">{{ 'HOME.CONTACT.TITLE' | translate }}</h2>
            </div>
            <form (ngSubmit)="submitContactForm()" #contactForm="ngForm">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="name" class="form-label">{{ 'HOME.CONTACT.NAME' | translate }}</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    name="name"
                    [(ngModel)]="contactFormData.name"
                    required
                  >
                </div>
                <div class="col-md-6">
                  <label for="email" class="form-label">{{ 'HOME.CONTACT.EMAIL' | translate }}</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    name="email"
                    [(ngModel)]="contactFormData.email"
                    required
                    email
                  >
                </div>
                <div class="col-12">
                  <label for="subject" class="form-label">{{ 'HOME.CONTACT.SUBJECT' | translate }}</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="subject" 
                    name="subject"
                    [(ngModel)]="contactFormData.subject"
                    required
                  >
                </div>
                <div class="col-12">
                  <label for="message" class="form-label">{{ 'HOME.CONTACT.MESSAGE' | translate }}</label>
                  <textarea 
                    class="form-control" 
                    id="message" 
                    name="message"
                    rows="5"
                    [(ngModel)]="contactFormData.message"
                    required
                  ></textarea>
                </div>
                <div class="col-12 text-center">
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-lg px-5"
                    [disabled]="contactForm.invalid || isSubmitting"
                  >
                    <span *ngIf="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ 'HOME.CONTACT.SUBMIT' | translate }}
                  </button>
                </div>
              </div>
            </form>
            
            <div *ngIf="formSubmitted" class="alert mt-4" [ngClass]="formSubmitSuccess ? 'alert-success' : 'alert-danger'">
              {{ (formSubmitSuccess ? 'HOME.CONTACT.SUCCESS' : 'HOME.CONTACT.ERROR') | translate }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter py-5 bg-primary text-white">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h3 class="mb-4">{{ 'HOME.NEWSLETTER.TITLE' | translate }}</h3>
            <form (ngSubmit)="subscribeToNewsletter()" #newsletterForm="ngForm" class="row g-2 justify-content-center">
              <div class="col-auto flex-grow-1">
                <input 
                  type="email" 
                  class="form-control form-control-lg" 
                  id="newsletterEmail" 
                  name="newsletterEmail"
                  [(ngModel)]="newsletterEmail"
                  [placeholder]="'HOME.NEWSLETTER.PLACEHOLDER' | translate"
                  required
                  email
                >
              </div>
              <div class="col-auto">
                <button 
                  type="submit" 
                  class="btn btn-light btn-lg"
                  [disabled]="newsletterForm.invalid || isNewsletterSubmitting"
                >
                  <span *ngIf="isNewsletterSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {{ 'HOME.NEWSLETTER.SUBMIT' | translate }}
                </button>
              </div>
            </form>
            
            <div *ngIf="newsletterSubmitted" class="alert mt-4" [ngClass]="newsletterSubmitSuccess ? 'alert-light' : 'alert-danger'">
              {{ (newsletterSubmitSuccess ? 'HOME.NEWSLETTER.SUCCESS' : 'HOME.NEWSLETTER.ERROR') | translate }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Beta Signup Modal -->
    <div class="modal fade" id="betaSignupModal" tabindex="-1" aria-labelledby="betaSignupModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="betaSignupModalLabel">Join Our Beta Program</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Be among the first to try AutoFlowOS and help shape its future!</p>
            <form>
              <div class="mb-3">
                <label for="betaEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="betaEmail" placeholder="name@example.com">
              </div>
              <div class="mb-3">
                <label for="betaName" class="form-label">Name</label>
                <input type="text" class="form-control" id="betaName">
              </div>
              <div class="mb-3">
                <label for="betaCompany" class="form-label">Company (Optional)</label>
                <input type="text" class="form-control" id="betaCompany">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Sign Up for Beta</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .hero {
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
    }
    
    .feature-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      font-size: 2rem;
    }
    
    .newsletter {
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
    }
  `]
})
export class HomeComponent {
  private emailService = inject(EmailService);
  private platformId = inject(PLATFORM_ID);
  
  // Contact form
  protected contactFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  protected isSubmitting = false;
  protected formSubmitted = false;
  protected formSubmitSuccess = false;
  
  // Newsletter
  protected newsletterEmail = '';
  protected isNewsletterSubmitting = false;
  protected newsletterSubmitted = false;
  protected newsletterSubmitSuccess = false;
  
  ngOnInit() {
    // Only run in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Show beta signup modal after 5 seconds
      setTimeout(() => {
        const betaModalElement = document.getElementById('betaSignupModal');
        if (betaModalElement && typeof bootstrap !== 'undefined') {
          const betaModal = new bootstrap.Modal(betaModalElement);
          betaModal.show();
        }
      }, 5000);
    }
  }
  
  protected async submitContactForm() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.formSubmitted = false;
    
    try {
      await this.emailService.sendContactEmail(
        this.contactFormData.name,
        this.contactFormData.email,
        this.contactFormData.subject,
        this.contactFormData.message
      );
      
      this.formSubmitSuccess = true;
      this.contactFormData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    } catch (error) {
      console.error('Contact form error:', error);
      this.formSubmitSuccess = false;
    } finally {
      this.isSubmitting = false;
      this.formSubmitted = true;
    }
  }
  
  protected async subscribeToNewsletter() {
    if (this.isNewsletterSubmitting) return;
    
    this.isNewsletterSubmitting = true;
    this.newsletterSubmitted = false;
    
    try {
      await this.emailService.subscribeToNewsletter(this.newsletterEmail);
      this.newsletterSubmitSuccess = true;
      this.newsletterEmail = '';
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      this.newsletterSubmitSuccess = false;
    } finally {
      this.isNewsletterSubmitting = false;
      this.newsletterSubmitted = true;
    }
  }
}
