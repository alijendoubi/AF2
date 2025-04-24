import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EmailService } from '../../services';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <div class="container py-5">
      <div class="row mb-5">
        <div class="col-lg-8 mx-auto text-center">
          <h1 class="display-4 fw-bold mb-4">{{ 'CONTACT.TITLE' | translate }}</h1>
          <p class="lead mb-4">{{ 'CONTACT.SUBTITLE' | translate }}</p>
        </div>
      </div>
      
      <div class="row">
        <!-- Contact Form -->
        <div class="col-lg-8 mb-4 mb-lg-0">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4 p-md-5">
              <h2 class="fw-bold mb-4">{{ 'CONTACT.FORM.TITLE' | translate }}</h2>
              
              <div *ngIf="formSubmitted && formSubmitSuccess" class="alert alert-success mb-4">
                {{ 'CONTACT.FORM.SUCCESS' | translate }}
              </div>
              
              <div *ngIf="formSubmitted && !formSubmitSuccess" class="alert alert-danger mb-4">
                {{ 'CONTACT.FORM.ERROR' | translate }}
              </div>
              
              <form (ngSubmit)="submitContactForm()" #contactForm="ngForm">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="name" class="form-label">{{ 'CONTACT.FORM.NAME' | translate }}</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="name" 
                      name="name"
                      [(ngModel)]="contactFormData.name"
                      required
                      #nameInput="ngModel"
                    >
                    <div *ngIf="nameInput.invalid && (nameInput.dirty || nameInput.touched)" class="text-danger small mt-1">
                      {{ 'CONTACT.FORM.NAME_REQUIRED' | translate }}
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <label for="email" class="form-label">{{ 'CONTACT.FORM.EMAIL' | translate }}</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      id="email" 
                      name="email"
                      [(ngModel)]="contactFormData.email"
                      required
                      email
                      #emailInput="ngModel"
                    >
                    <div *ngIf="emailInput.invalid && (emailInput.dirty || emailInput.touched)" class="text-danger small mt-1">
                      <div *ngIf="emailInput.errors?.['required']">{{ 'CONTACT.FORM.EMAIL_REQUIRED' | translate }}</div>
                      <div *ngIf="emailInput.errors?.['email']">{{ 'CONTACT.FORM.EMAIL_INVALID' | translate }}</div>
                    </div>
                  </div>
                  
                  <div class="col-12">
                    <label for="subject" class="form-label">{{ 'CONTACT.FORM.SUBJECT' | translate }}</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="subject" 
                      name="subject"
                      [(ngModel)]="contactFormData.subject"
                      required
                      #subjectInput="ngModel"
                    >
                    <div *ngIf="subjectInput.invalid && (subjectInput.dirty || subjectInput.touched)" class="text-danger small mt-1">
                      {{ 'CONTACT.FORM.SUBJECT_REQUIRED' | translate }}
                    </div>
                  </div>
                  
                  <div class="col-12">
                    <label for="message" class="form-label">{{ 'CONTACT.FORM.MESSAGE' | translate }}</label>
                    <textarea 
                      class="form-control" 
                      id="message" 
                      name="message"
                      rows="5"
                      [(ngModel)]="contactFormData.message"
                      required
                      #messageInput="ngModel"
                    ></textarea>
                    <div *ngIf="messageInput.invalid && (messageInput.dirty || messageInput.touched)" class="text-danger small mt-1">
                      {{ 'CONTACT.FORM.MESSAGE_REQUIRED' | translate }}
                    </div>
                  </div>
                  
                  <div class="col-12">
                    <button 
                      type="submit" 
                      class="btn btn-primary btn-lg"
                      [disabled]="contactForm.invalid || isSubmitting"
                    >
                      <span *ngIf="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {{ 'CONTACT.FORM.SUBMIT' | translate }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <!-- Contact Information -->
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body p-4">
              <h3 class="fw-bold mb-3">{{ 'CONTACT.INFO.TITLE' | translate }}</h3>
              
              <div class="d-flex mb-3">
                <div class="bg-primary rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                  <i class="bi bi-geo-alt text-white fs-5"></i>
                </div>
                <div>
                  <h5 class="mb-1">{{ 'CONTACT.INFO.ADDRESS.TITLE' | translate }}</h5>
                  <p class="mb-0 text-muted">
                    123 Innovation Street<br>
                    San Francisco, CA 94103<br>
                    United States
                  </p>
                </div>
              </div>
              
              <div class="d-flex mb-3">
                <div class="bg-primary rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                  <i class="bi bi-envelope text-white fs-5"></i>
                </div>
                <div>
                  <h5 class="mb-1">{{ 'CONTACT.INFO.EMAIL.TITLE' | translate }}</h5>
                  <p class="mb-0 text-muted">
                    <a href="mailto:info&#64;autoflowos.com" class="text-decoration-none text-muted">info&#64;autoflowos.com</a><br>
                    <a href="mailto:support&#64;autoflowos.com" class="text-decoration-none text-muted">support&#64;autoflowos.com</a>
                  </p>
                </div>
              </div>
              
              <div class="d-flex">
                <div class="bg-primary rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                  <i class="bi bi-telephone text-white fs-5"></i>
                </div>
                <div>
                  <h5 class="mb-1">{{ 'CONTACT.INFO.PHONE.TITLE' | translate }}</h5>
                  <p class="mb-0 text-muted">
                    <a href="tel:+14155550123" class="text-decoration-none text-muted">+1 (415) 555-0123</a><br>
                    <a href="tel:+14155550124" class="text-decoration-none text-muted">+1 (415) 555-0124</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <h3 class="fw-bold mb-3">{{ 'CONTACT.HOURS.TITLE' | translate }}</h3>
              
              <div class="d-flex justify-content-between mb-2">
                <span>{{ 'CONTACT.HOURS.MONDAY_FRIDAY' | translate }}</span>
                <span class="fw-bold">9:00 AM - 6:00 PM</span>
              </div>
              
              <div class="d-flex justify-content-between mb-2">
                <span>{{ 'CONTACT.HOURS.SATURDAY' | translate }}</span>
                <span class="fw-bold">10:00 AM - 4:00 PM</span>
              </div>
              
              <div class="d-flex justify-content-between">
                <span>{{ 'CONTACT.HOURS.SUNDAY' | translate }}</span>
                <span class="fw-bold">{{ 'CONTACT.HOURS.CLOSED' | translate }}</span>
              </div>
              
              <hr class="my-4">
              
              <h5 class="fw-bold mb-3">{{ 'CONTACT.SOCIAL.TITLE' | translate }}</h5>
              
              <div class="d-flex">
                <a href="#" class="btn btn-outline-primary rounded-circle me-2">
                  <i class="bi bi-facebook"></i>
                </a>
                <a href="#" class="btn btn-outline-primary rounded-circle me-2">
                  <i class="bi bi-twitter"></i>
                </a>
                <a href="#" class="btn btn-outline-primary rounded-circle me-2">
                  <i class="bi bi-linkedin"></i>
                </a>
                <a href="#" class="btn btn-outline-primary rounded-circle">
                  <i class="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Map Section -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-0">
              <div class="ratio ratio-21x9">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968900464623!2d-122.41941548468204!3d37.77492997975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter!5e0!3m2!1sen!2sus!4v1619826381244!5m2!1sen!2sus" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .bg-primary {
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
    }
  `]
})
export class ContactComponent {
  private emailService = inject(EmailService);
  
  protected contactFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  protected isSubmitting = false;
  protected formSubmitted = false;
  protected formSubmitSuccess = false;
  
  protected async submitContactForm(): Promise<void> {
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
}
