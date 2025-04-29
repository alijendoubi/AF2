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
    <section class="hero bg-primary text-white position-relative overflow-hidden">
      <div class="hero-bg-pattern position-absolute top-0 start-0"></div>
      <div class="container py-4 py-lg-5 position-relative z-index-1">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-3 text-shadow">{{ 'HOME.HERO.TITLE' | translate }}</h1>
            <p class="lead mb-4 opacity-90">{{ 'HOME.HERO.SUBTITLE' | translate }}</p>
            <div class="d-grid gap-2 d-md-flex">
              <a routerLink="/signup" class="btn btn-light btn-lg px-4 me-md-2 shadow-sm btn-hover-effect" aria-label="Join Beta Program">{{ 'HOME.HERO.CTA' | translate }}</a>
              <a routerLink="/dashboard" class="btn btn-outline-light btn-lg px-4 btn-hover-effect" aria-label="Go to Dashboard">{{ 'HOME.HERO.DASHBOARD' | translate }}</a>
            </div>
          </div>
          <div class="col-lg-6 d-none d-lg-block">
            <img src="assets/images/hero-image.png" alt="AutoFlowOS Dashboard Preview" class="img-fluid">
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about bg-light">
      <div class="container py-4 py-lg-5">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="img-wrapper">
              <img src="assets/images/about-image.png" alt="About AutoFlowOS" class="img-fluid">
            </div>
          </div>
          <div class="col-lg-6">
            <h2 class="fw-bold mb-4 section-title">{{ 'HOME.ABOUT.TITLE' | translate }}</h2>
            <p class="lead mb-3">{{ 'HOME.ABOUT.DESCRIPTION' | translate }}</p>
            <p class="mb-4">{{ 'HOME.ABOUT.ADDITIONAL_TEXT' | translate }}</p>
            <hr class="divider my-4">
            <div class="d-flex align-items-center">
              <div class="badge bg-primary rounded-pill px-3 py-2 me-2">NEW</div>
              <span class="fst-italic">{{ 'HOME.ABOUT.LATEST_UPDATE' | translate }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Mission Section -->
    <section class="mission">
      <div class="container py-4 py-lg-5">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="fw-bold mb-4 section-title with-accent">{{ 'HOME.MISSION.TITLE' | translate }}</h2>
            <div class="mission-icon mb-4">
              <i class="bi bi-bullseye text-primary"></i>
            </div>
            <p class="lead mb-5">{{ 'HOME.MISSION.STATEMENT' | translate }}</p>
            <div class="row g-4 mt-3">
              <div class="col-md-4">
                <div class="mission-value p-4 rounded-4 shadow-hover h-100">
                  <div class="value-icon mb-3">
                    <i class="bi bi-lightbulb text-primary fs-1"></i>
                  </div>
                  <h5 class="fw-bold mb-3">{{ 'HOME.MISSION.VALUES.INNOVATION' | translate }}</h5>
                  <p class="mb-0">{{ 'HOME.MISSION.VALUES.INNOVATION_TEXT' | translate }}</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="mission-value p-4 rounded-4 shadow-hover h-100">
                  <div class="value-icon mb-3">
                    <i class="bi bi-slash-circle text-primary fs-1"></i>
                  </div>
                  <h5 class="fw-bold mb-3">{{ 'HOME.MISSION.VALUES.SIMPLICITY' | translate }}</h5>
                  <p class="mb-0">{{ 'HOME.MISSION.VALUES.SIMPLICITY_TEXT' | translate }}</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="mission-value p-4 rounded-4 shadow-hover h-100">
                  <div class="value-icon mb-3">
                    <i class="bi bi-people text-primary fs-1"></i>
                  </div>
                  <h5 class="fw-bold mb-3">{{ 'HOME.MISSION.VALUES.EMPOWERMENT' | translate }}</h5>
                  <p class="mb-0">{{ 'HOME.MISSION.VALUES.EMPOWERMENT_TEXT' | translate }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features bg-light position-relative">
      <div class="feature-pattern-bg"></div>
      <div class="container py-4 py-lg-5 position-relative">
        <div class="text-center mb-5">
          <h2 class="fw-bold section-title with-accent">{{ 'HOME.FEATURES.TITLE' | translate }}</h2>
          <p class="lead col-md-8 mx-auto">{{ 'HOME.FEATURES.SUBTITLE' | translate }}</p>
        </div>
        <div class="row g-4 g-lg-5">
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-hover rounded-4 card-lift">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3 mx-auto">
                  <i class="bi bi-gear-fill"></i>
                </div>
                <h5 class="card-title fw-bold mb-3">{{ 'HOME.FEATURES.AUTOMATION.TITLE' | translate }}</h5>
                <p class="card-text mb-0">{{ 'HOME.FEATURES.AUTOMATION.DESCRIPTION' | translate }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-hover rounded-4 card-lift">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3 mx-auto">
                  <i class="bi bi-graph-up"></i>
                </div>
                <h5 class="card-title fw-bold mb-3">{{ 'HOME.FEATURES.ANALYTICS.TITLE' | translate }}</h5>
                <p class="card-text mb-0">{{ 'HOME.FEATURES.ANALYTICS.DESCRIPTION' | translate }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-hover rounded-4 card-lift">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3 mx-auto">
                  <i class="bi bi-puzzle"></i>
                </div>
                <h5 class="card-title fw-bold mb-3">{{ 'HOME.FEATURES.INTEGRATION.TITLE' | translate }}</h5>
                <p class="card-text mb-0">{{ 'HOME.FEATURES.INTEGRATION.DESCRIPTION' | translate }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-hover rounded-4 card-lift">
              <div class="card-body text-center p-4">
                <div class="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3 mx-auto">
                  <i class="bi bi-shield-check"></i>
                </div>
                <h5 class="card-title fw-bold mb-3">{{ 'HOME.FEATURES.SECURITY.TITLE' | translate }}</h5>
                <p class="card-text mb-0">{{ 'HOME.FEATURES.SECURITY.DESCRIPTION' | translate }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Contact Section -->
    <section class="contact position-relative">
      <div class="contact-pattern-bg position-absolute top-0 start-0"></div>
      <div class="container py-4 py-lg-5 position-relative z-index-1">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="text-center mb-5">
              <h2 class="fw-bold section-title with-accent">{{ 'HOME.CONTACT.TITLE' | translate }}</h2>
              <p class="lead">{{ 'HOME.CONTACT.SUBTITLE' | translate }}</p>
            </div>
            <form (ngSubmit)="submitContactForm()" #contactForm="ngForm" novalidate>
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label for="name" class="form-label">{{ 'HOME.CONTACT.NAME' | translate }}</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="name" 
                      name="name"
                      [(ngModel)]="contactFormData.name"
                      #nameInput="ngModel"
                      required
                      aria-required="true"
                    >
                    <div *ngIf="nameInput.invalid && (nameInput.dirty || nameInput.touched)" class="text-danger form-text mt-1">
                      <small *ngIf="nameInput.errors?.['required']">{{ 'VALIDATION.REQUIRED' | translate }}</small>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group mb-3">
                    <label for="email" class="form-label">{{ 'HOME.CONTACT.EMAIL' | translate }}</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      id="email" 
                      name="email"
                      [(ngModel)]="contactFormData.email"
                      #emailInput="ngModel"
                      required
                      email
                      aria-required="true"
                    >
                    <div *ngIf="emailInput.invalid && (emailInput.dirty || emailInput.touched)" class="text-danger form-text mt-1">
                      <small *ngIf="emailInput.errors?.['required']">{{ 'VALIDATION.REQUIRED' | translate }}</small>
                      <small *ngIf="emailInput.errors?.['email']">{{ 'VALIDATION.EMAIL' | translate }}</small>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group mb-3">
                    <label for="subject" class="form-label">{{ 'HOME.CONTACT.SUBJECT' | translate }}</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="subject" 
                      name="subject"
                      [(ngModel)]="contactFormData.subject"
                      #subjectInput="ngModel"
                      required
                      aria-required="true"
                    >
                    <div *ngIf="subjectInput.invalid && (subjectInput.dirty || subjectInput.touched)" class="text-danger form-text mt-1">
                      <small *ngIf="subjectInput.errors?.['required']">{{ 'VALIDATION.REQUIRED' | translate }}</small>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group mb-3">
                    <label for="message" class="form-label">{{ 'HOME.CONTACT.MESSAGE' | translate }}</label>
                    <textarea 
                      class="form-control" 
                      id="message" 
                      name="message"
                      rows="5"
                      [(ngModel)]="contactFormData.message"
                      #messageInput="ngModel"
                      required
                      aria-required="true"
                    ></textarea>
                    <div *ngIf="messageInput.invalid && (messageInput.dirty || messageInput.touched)" class="text-danger form-text mt-1">
                      <small *ngIf="messageInput.errors?.['required']">{{ 'VALIDATION.REQUIRED' | translate }}</small>
                    </div>
                  </div>
                </div>
                <div class="col-12 text-center mt-4">
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-lg px-5 shadow-sm btn-hover-effect"
                    [disabled]="contactForm.invalid || isSubmitting"
                  >
                    <span *ngIf="isSubmitting" class="spinner-border spinner-border-sm me-2 spinner-anim" role="status" aria-hidden="true"></span>
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
    <section class="newsletter bg-primary text-white position-relative overflow-hidden">
      <div class="newsletter-pattern position-absolute top-0 start-0"></div>
      <div class="container py-4 py-lg-5 position-relative z-index-1">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h3 class="fw-bold mb-4">{{ 'HOME.NEWSLETTER.TITLE' | translate }}</h3>
            <p class="mb-4 col-md-10 mx-auto">{{ 'HOME.NEWSLETTER.DESCRIPTION' | translate }}</p>
            <form (ngSubmit)="subscribeToNewsletter()" #newsletterForm="ngForm" class="newsletter-form mx-auto" novalidate>
              <div class="row g-2 g-md-3 justify-content-center align-items-center">
                <div class="col-12 col-md-8">
                  <input 
                    type="email" 
                    class="form-control form-control-lg shadow-sm"
                    id="newsletterEmail"
                    name="newsletterEmail"
                    [(ngModel)]="newsletterEmail"
                    #newsletterEmailInput="ngModel"
                    required
                    email
                    aria-required="true"
                    placeholder="{{ 'HOME.NEWSLETTER.PLACEHOLDER' | translate }}"
                  >
                  <div *ngIf="newsletterEmailInput.invalid && newsletterEmailInput.touched" class="invalid-feedback d-block">
                    {{ 'VALIDATION.VALID_EMAIL' | translate }}
                  </div>
                </div>
                <div class="col-12 col-md-auto">
                  <button 
                    type="submit" 
                    class="btn btn-light btn-lg w-100 shadow-sm btn-hover-effect"
                    [disabled]="newsletterForm.invalid || isNewsletterSubmitting"
                  >
                    <span *ngIf="isNewsletterSubmitting" class="spinner-border spinner-border-sm me-2 spinner-anim" role="status" aria-hidden="true"></span>
                    {{ 'HOME.NEWSLETTER.SUBMIT' | translate }}
                  </button>
                </div>
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
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="betaSignupModalLabel">{{ 'BETA.MODAL.TITLE' | translate }}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="lead">{{ 'BETA.MODAL.DESCRIPTION' | translate }}</p>
            <form #betaForm="ngForm" (ngSubmit)="submitBetaForm()" novalidate>
              <div class="mb-3">
                <label for="betaEmail" class="form-label">{{ 'BETA.MODAL.EMAIL' | translate }}</label>
                <input 
                  type="email" 
                  class="form-control"
                  id="betaEmail"
                  name="betaEmail"
                  [(ngModel)]="betaEmail"
                  #betaEmailInput="ngModel"
                  required
                  email
                  aria-required="true"
                  placeholder="{{ 'BETA.MODAL.EMAIL_PLACEHOLDER' | translate }}"
                >
                <div *ngIf="betaEmailInput.invalid && betaEmailInput.touched" class="invalid-feedback d-block">
                  {{ 'VALIDATION.VALID_EMAIL' | translate }}
                </div>
              </div>
              <div class="mb-3">
                <label for="betaName" class="form-label">{{ 'BETA.MODAL.NAME' | translate }}</label>
                <input 
                  type="text" 
                  class="form-control"
                  id="betaName"
                  name="betaName"
                  [(ngModel)]="betaName"
                  #betaNameInput="ngModel"
                  required
                  aria-required="true"
                >
                <div *ngIf="betaNameInput.invalid && betaNameInput.touched" class="invalid-feedback d-block">
                  {{ 'VALIDATION.REQUIRED' | translate }}
                </div>
              </div>
              <div class="mb-3">
                <label for="betaCompany" class="form-label">{{ 'BETA.MODAL.COMPANY' | translate }}</label>
                <input 
                  type="text" 
                  class="form-control"
                  id="betaCompany"
                  name="betaCompany"
                  [(ngModel)]="betaCompany"
                >
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              {{ 'BETA.MODAL.CLOSE' | translate }}
            </button>
            <button 
              type="button"
              class="btn btn-primary"
              [disabled]="betaForm.invalid || isBetaSubmitting"
              (click)="submitBetaForm()"
            >
              <span *ngIf="isBetaSubmitting" class="spinner-border spinner-border-sm me-2 spinner-anim" role="status" aria-hidden="true"></span>
              {{ 'BETA.MODAL.SUBMIT' | translate }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Base styles */
    :host {
      display: block;
    }
    
    /* Section styles */
    /* Section styles */
    section {
      position: relative;
      z-index: 1;
      overflow: hidden;
      padding: 5rem 0;
    }
    
    /* Hero section */
    .hero {
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
      padding-top: 0;
      margin-top: 0;
    }
    .hero-bg-pattern {
      width: 100%;
      height: 100%;
      opacity: 0.15;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .text-shadow {
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Feature section */
    .feature-icon {
      width: 4rem;
      height: 4rem;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-lift {
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                  box-shadow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .card-lift:hover {
      transform: translateY(-5px);
      box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.1),
                  0 0.5rem 1rem -0.75rem rgba(0, 0, 0, 0.1) !important;
    }

    /* Mission section */
    .mission-value {
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      background-color: var(--bs-white);
      position: relative;
      overflow: hidden;
    }

    .mission-value::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(var(--bs-primary-rgb), 0.1) 0%, rgba(111, 66, 193, 0.1) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .mission-value:hover::before {
      opacity: 1;
    }

    .mission-value:hover {
      transform: translateY(-5px);
      box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.1);
    }

    .value-icon {
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Newsletter section */
    .newsletter {
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
    }

    .newsletter-pattern {
      width: 100%;
      height: 100%;
      opacity: 0.15;
      background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23ffffff' fill-opacity='0.15' d='M0 0h12v6H0V0zm20 8h12v6H20V8zm-8 12h12v6H12v-6zm28 0h12v6H40v-6zm-8 12h12v6H32v-6zm28 0h12v6H60v-6zM12 0h12v6H12V0zm28 8h12v6H40V8zm-8 12h12v6H32v-6zm28 0h12v6H60v-6zm-8 12h12v6H52v-6zm28 0h12v6H80v-6z'/%3E%3C/svg%3E");
    }

    /* Add contact section pattern */
    .contact-pattern-bg {
      width: 100%;
      height: 100%;
      opacity: 0.05;
      background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    /* Form styles */
    .form-control {
      height: calc(3.5rem + 2px);
      padding: 1rem 1.25rem;
      font-size: 0.9375rem;
      border-radius: 0.5rem;
      border: 1.5px solid rgba(0, 0, 0, 0.1);
      background-color: var(--bs-white);
      transition: all 0.2s ease-in-out;

      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
      }

      &:hover {
        border-color: rgba(var(--bs-primary-rgb), 0.4);
      }

      &:focus {
        border-color: var(--bs-primary);
        box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
        background-color: var(--bs-white);
      }
    }

    textarea.form-control {
      height: auto;
      min-height: 150px;
    }

    .form-label {
      font-weight: 500;
      margin-bottom: 0.5rem;
      font-size: 0.9375rem;
    }

    /* Enhance error states */
    .form-control.ng-invalid.ng-touched {
      border-color: var(--bs-danger);
      border-width: 2px;
      padding-right: calc(1.5em + 0.75rem);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right calc(0.375em + 0.1875rem) center;
      background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
      
      &:focus {
        box-shadow: 0 0 0 0.25rem rgba(var(--bs-danger-rgb), 0.25);
      }
    }

    .invalid-feedback {
      font-size: 0.875rem;
      margin-top: 0.5rem;
      color: var(--bs-danger);
      font-weight: 500;
      padding: 0.375rem 0.75rem;
      background-color: rgba(var(--bs-danger-rgb), 0.1);
      border-radius: 0.375rem;
    }
    /* Button styles */
    .btn-hover-effect {
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .btn-hover-effect:hover:not([disabled]) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
    }

    /* Footer styles */
    .footer-links a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.3s ease;
      padding-left: 0;
    }

    .footer-links a:hover {
      color: #ffffff;
      padding-left: 10px;
    }

    .social-icon {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
    }

    .social-icon:hover {
      color: #ffffff;
      transform: translateY(-3px);
      background: var(--bs-primary);
    }

    /* Loading animation */
    .spinner-anim {
      opacity: 0.8;
      animation: spin 1s linear infinite;
    }

    .btn {
      position: relative;
      min-height: 48px;
      padding: 0.75rem 1.5rem;
      
      &.btn-lg {
        min-height: 56px;
        padding: 1rem 2rem;
      }
      
      .spinner-border {
        position: relative;
        top: -1px;
      }
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Dark mode styles */
    :host-context(.dark-theme) {
      .bg-light {
        background-color: rgba(255, 255, 255, 0.02) !important;
      }
      
      .mission-value {
        background-color: rgba(255, 255, 255, 0.05);
        
        &::before {
          background: linear-gradient(135deg, rgba(var(--bs-primary-rgb), 0.15) 0%, rgba(111, 66, 193, 0.15) 100%);
        }
      }

      .card {
        background-color: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
          border-color: rgba(var(--bs-primary-rgb), 0.2);
        }
      }

      .form-control {
        background-color: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
        color: var(--bs-light);
        
        &::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        &:hover {
          border-color: rgba(var(--bs-primary-rgb), 0.4);
          background-color: rgba(255, 255, 255, 0.08);
        }
        
        &:focus {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: var(--bs-primary);
          color: var(--bs-white);
        }
        
        &.ng-invalid.ng-touched {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
        }

        &:focus-visible {
          outline-color: var(--bs-primary);
          box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
        }
      }

      .invalid-feedback {
        background-color: rgba(255, 107, 107, 0.1);
        color: #ff6b6b;
      }

      .form-label {
        color: var(--bs-light);
      }

      .btn {
        &:focus-visible {
          outline-color: var(--bs-primary);
          box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
        }

        .spinner-border {
          opacity: 0.8;
        }
      }

      .social-icon:hover {
        background: var(--bs-primary);
        box-shadow: 0 0 20px rgba(var(--bs-primary-rgb), 0.3);
      }
      
      .btn-light {
        color: var(--bs-white);
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.1);

        &:hover:not([disabled]) {
          color: var(--bs-white);
          background-color: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.15);
        }

        &:focus {
          box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
        }

        &:focus-visible {
          outline-color: #ffffff;
        }
      }
    }
    /* Newsletter form specific styles */
    .newsletter-form {
      max-width: 640px;
      margin: 0 auto;
      
      .form-control {
        height: calc(3.5rem + 2px);
        padding: 1rem 1.25rem;
      }
      
      .btn {
        height: calc(3.5rem + 2px);
        padding: 1rem 1.5rem;
      }
    }

    /* Hero section button improvements */
    .hero .btn {
      min-width: 160px;
    }

    /* Enhanced hover transitions */
    .card, .mission-value, .btn {
      will-change: transform;
    }

    /* Simple image styling */
    .img-wrapper {
      display: block;
      width: 100%;
      max-width: 60%;
      margin: 0 auto 1rem auto;
    }

    .form-control, .btn {
      will-change: box-shadow, border-color;
    }

    /* Better form validation states */
    .form-control {
      &.ng-invalid.ng-touched {
        border-color: var(--bs-danger);
        
        &:focus {
          box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
        }
      }
    }

    /* Prevent layout shift during loading */
    .btn {
      min-height: 48px;
      
      &.btn-lg {
        min-height: 56px;
      }
    }

    /* Responsive styles */
    /* Responsive styles */
    @media (max-width: 768px) {
      section {
        padding: 4rem 0;
      }
      
      section.hero {
        padding: 6rem 0 6rem 0;
        padding-top: 0;
      }
      .hero {
        h1 {
          font-size: calc(2rem + 1.5vw);
        }
        
        .btn {
          min-width: auto;
          width: 100%;
        }
        
        .d-md-flex {
          gap: 1rem;
        }
      }
      
      .section-title {
        font-size: calc(1.5rem + 1vw);
      }
      
      .feature-icon {
        width: 3rem;
        height: 3rem;
        font-size: 1.5rem;
      }
      
      .form-control {
        height: calc(3.5rem + 2px);
        padding: 1rem 1.25rem;
      }
      
      .footer {
        text-align: center;
        
        .social-links {
          justify-content: center;
          margin-top: 2rem;
        }
        
        .footer-links {
          margin-bottom: 2rem;
        }
      }
      
      .modal-content {
        margin: 1rem;
      }
      .contact form {
        padding: 1.5rem;
      }
      
      
      .newsletter-form {
        .row {
          flex-direction: column;
          gap: 1rem;
        }
        
        .btn {
          width: 100%;
          margin-top: 0;
        }
      }
    }
    
    @media (max-width: 576px) {
      .btn-lg {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      }
      
      .social-links {
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
    
    /* Modal styles */
    .modal {
      .modal-content {
        border-radius: 1rem;
        border: none;
        box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.15);
      }
      
      .modal-header {
        border-top-left-radius: calc(1rem - 1px);
        border-top-right-radius: calc(1rem - 1px);
        padding: 1.5rem;
      }
      
      .modal-body {
        padding: 1.5rem;
        
        .form-group:not(:last-child) {
          margin-bottom: 1.5rem;
        }
      }
      
      .modal-footer {
        padding: 1.5rem;
        gap: 1rem;
        justify-content: space-between;
        border-bottom-left-radius: calc(1rem - 1px);
        border-bottom-right-radius: calc(1rem - 1px);
        
        .btn {
          min-width: 140px;
        }
      }
    }
    
    /* Print styles */
    @media print {
      .hero-bg-pattern,
      .newsletter-pattern {
        display: none;
      }
      
      .text-white {
        color: #000 !important;
      }
      
      .bg-primary {
        background-color: transparent !important;
      }
    }
    
    /* Accessibility & behavior */
    :host {
      scroll-behavior: smooth;
    }

    /* Enhance focus states for better accessibility */
    .form-control:focus-visible,
    .btn:focus-visible {
      outline: 2px solid var(--bs-primary);
      outline-offset: 2px;
      box-shadow: none;
    }
  `]
})
export class HomeComponent {
  private emailService = inject(EmailService);
  private platformId = inject(PLATFORM_ID);
  
  // Get current year for copyright in footer
  protected currentYear = new Date().getFullYear();
  
  // Beta signup
  protected betaEmail = '';
  protected betaName = '';
  protected betaCompany = '';
  protected isBetaSubmitting = false;
  
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
  
  protected async submitBetaForm() {
    if (this.isBetaSubmitting) return;
    
    this.isBetaSubmitting = true;
    
    try {
      // In a real app, integrate with your email service
      await this.emailService.submitBetaSignup(this.betaEmail, this.betaName, this.betaCompany);
      this.betaEmail = '';
      this.betaName = '';
      this.betaCompany = '';
      
      // Close modal on success
      if (isPlatformBrowser(this.platformId)) {
        const betaModalElement = document.getElementById('betaSignupModal');
        if (betaModalElement && typeof bootstrap !== 'undefined') {
          const betaModal = bootstrap.Modal.getInstance(betaModalElement);
          betaModal?.hide();
        }
      }
    } catch (error) {
      console.error('Beta signup error:', error);
    } finally {
      this.isBetaSubmitting = false;
    }
  }
}
