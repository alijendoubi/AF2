import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, EmailService } from '../../../services';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslateModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow-sm border-0">
            <div class="card-body p-4 p-md-5">
              <h2 class="text-center mb-4">{{ 'AUTH.SIGNUP.TITLE' | translate }}</h2>
              
              <div *ngIf="errorMessage" class="alert alert-danger">
                {{ errorMessage | translate }}
              </div>
              
              <div *ngIf="successMessage" class="alert alert-success">
                {{ successMessage | translate }}
              </div>
              
              <form (ngSubmit)="signup()" #signupForm="ngForm">
                <div class="mb-3">
                  <label for="name" class="form-label">{{ 'AUTH.SIGNUP.NAME' | translate }}</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="name" 
                    name="name"
                    [(ngModel)]="name"
                    required
                    #nameInput="ngModel"
                  >
                  <div *ngIf="nameInput.invalid && (nameInput.dirty || nameInput.touched)" class="text-danger small mt-1">
                    <div *ngIf="nameInput.errors?.['required']">Name is required</div>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="email" class="form-label">{{ 'AUTH.SIGNUP.EMAIL' | translate }}</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    name="email"
                    [(ngModel)]="email"
                    required
                    email
                    #emailInput="ngModel"
                  >
                  <div *ngIf="emailInput.invalid && (emailInput.dirty || emailInput.touched)" class="text-danger small mt-1">
                    <div *ngIf="emailInput.errors?.['required']">Email is required</div>
                    <div *ngIf="emailInput.errors?.['email']">Please enter a valid email</div>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">{{ 'AUTH.SIGNUP.PASSWORD' | translate }}</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="password" 
                    name="password"
                    [(ngModel)]="password"
                    required
                    minlength="6"
                    #passwordInput="ngModel"
                  >
                  <div *ngIf="passwordInput.invalid && (passwordInput.dirty || passwordInput.touched)" class="text-danger small mt-1">
                    <div *ngIf="passwordInput.errors?.['required']">Password is required</div>
                    <div *ngIf="passwordInput.errors?.['minlength']">Password must be at least 6 characters</div>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">{{ 'AUTH.SIGNUP.CONFIRM_PASSWORD' | translate }}</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="confirmPassword" 
                    name="confirmPassword"
                    [(ngModel)]="confirmPassword"
                    required
                    #confirmPasswordInput="ngModel"
                  >
                  <div *ngIf="confirmPasswordInput.dirty && password !== confirmPassword" class="text-danger small mt-1">
                    {{ 'AUTH.SIGNUP.PASSWORD_MISMATCH' | translate }}
                  </div>
                </div>
                
                <div class="d-grid">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    [disabled]="signupForm.invalid || password !== confirmPassword || isLoading"
                  >
                    <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ 'AUTH.SIGNUP.SUBMIT' | translate }}
                  </button>
                </div>
              </form>
              
              <div class="mt-4 text-center">
                <p class="mb-0">
                  {{ 'AUTH.SIGNUP.HAVE_ACCOUNT' | translate }}
                  <a routerLink="/login" class="text-decoration-none">{{ 'AUTH.SIGNUP.LOGIN' | translate }}</a>
                </p>
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
  `]
})
export class SignupComponent {
  private authService = inject(AuthService);
  private emailService = inject(EmailService);
  private router = inject(Router);
  
  protected name = '';
  protected email = '';
  protected password = '';
  protected confirmPassword = '';
  protected isLoading = false;
  protected errorMessage = '';
  
  protected successMessage = '';

  protected async signup() {
    if (this.isLoading) return;
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'AUTH.SIGNUP.PASSWORD_MISMATCH';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    try {
      const credential = await this.authService.signup(this.email, this.password, this.name);
      
      // Send email verification
      try {
        await this.authService.sendEmailVerification(credential.user);
        this.successMessage = 'AUTH.SIGNUP.VERIFICATION_SENT';
      } catch (verificationError) {
        console.error('Email verification error:', verificationError);
        // Continue with signup even if verification email fails
      }
      
      // Send welcome email
      try {
        await this.emailService.sendWelcomeEmail(this.email, this.name);
      } catch (emailError) {
        console.error('Welcome email error:', emailError);
        // Continue with signup even if email fails
      }
      
      // Show success message instead of redirecting immediately
      // This gives the user a chance to see the verification message
      if (!this.successMessage) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Signup error:', error);
      this.errorMessage = 'AUTH.SIGNUP.ERROR';
    } finally {
      this.isLoading = false;
    }
  }
}
