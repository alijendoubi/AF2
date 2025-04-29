import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslateModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow-sm border-0">
            <div class="card-body p-4 p-md-5">
              <h2 class="text-center mb-4">{{ 'AUTH.FORGOT_PASSWORD.TITLE' | translate }}</h2>
              
              <div *ngIf="errorMessage" class="alert alert-danger">
                {{ errorMessage | translate }}
              </div>
              
              <div *ngIf="successMessage" class="alert alert-success">
                {{ successMessage | translate }}
              </div>
              
              <form (ngSubmit)="resetPassword()" #resetForm="ngForm">
                <div class="mb-3">
                  <label for="email" class="form-label">{{ 'AUTH.FORGOT_PASSWORD.EMAIL' | translate }}</label>
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
                    <div *ngIf="emailInput.errors?.['required']">{{ 'VALIDATION.REQUIRED' | translate }}</div>
                    <div *ngIf="emailInput.errors?.['email']">{{ 'VALIDATION.EMAIL' | translate }}</div>
                  </div>
                </div>
                
                <div class="d-grid">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    [disabled]="resetForm.invalid || isLoading"
                  >
                    <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ 'AUTH.FORGOT_PASSWORD.SUBMIT' | translate }}
                  </button>
                </div>
              </form>
              
              <div class="mt-4 text-center">
                <p class="mb-0">
                  {{ 'AUTH.FORGOT_PASSWORD.REMEMBER_PASSWORD' | translate }}
                  <a routerLink="/login" class="text-decoration-none">{{ 'AUTH.FORGOT_PASSWORD.LOGIN' | translate }}</a>
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
    
    .card {
      border-radius: 12px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .form-control {
      border-radius: 8px;
      padding: 0.75rem 1rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    
    .form-control:focus {
      box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb, 38, 150, 173, 0.2));
      border-color: var(--primary-color, #2696AD);
    }
    
    .btn-primary {
      border-radius: 8px;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      transition: all 0.3s ease;
      background: linear-gradient(135deg, var(--primary-color, #2696AD) 0%, var(--accent-color, #8456EC) 100%);
      border: none;
      box-shadow: 0 4px 10px rgba(38, 150, 173, 0.3);
    }
    
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(38, 150, 173, 0.4);
    }
    
    .btn-primary:disabled {
      background: linear-gradient(135deg, rgba(38, 150, 173, 0.7) 0%, rgba(132, 86, 236, 0.7) 100%);
    }
  `]
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  
  protected email = '';
  protected isLoading = false;
  protected errorMessage = '';
  protected successMessage = '';
  
  protected async resetPassword(): Promise<void> {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    try {
      await this.authService.sendPasswordResetEmail(this.email);
      this.successMessage = 'AUTH.FORGOT_PASSWORD.SUCCESS';
      this.email = ''; // Clear the form
    } catch (error) {
      console.error('Password reset error:', error);
      this.errorMessage = 'AUTH.FORGOT_PASSWORD.ERROR';
    } finally {
      this.isLoading = false;
    }
  }
}
