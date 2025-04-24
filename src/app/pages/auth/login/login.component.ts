import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslateModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow-sm border-0">
            <div class="card-body p-4 p-md-5">
              <h2 class="text-center mb-4">{{ 'AUTH.LOGIN.TITLE' | translate }}</h2>
              
              <div *ngIf="errorMessage" class="alert alert-danger">
                {{ errorMessage | translate }}
              </div>
              
              <form (ngSubmit)="login()" #loginForm="ngForm">
                <div class="mb-3">
                  <label for="email" class="form-label">{{ 'AUTH.LOGIN.EMAIL' | translate }}</label>
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
                  <label for="password" class="form-label">{{ 'AUTH.LOGIN.PASSWORD' | translate }}</label>
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
                
                <div class="mb-3 text-end">
                  <a routerLink="/forgot-password" class="text-decoration-none small">
                    {{ 'AUTH.LOGIN.FORGOT_PASSWORD' | translate }}
                  </a>
                </div>
                
                <div class="d-grid">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    [disabled]="loginForm.invalid || isLoading"
                  >
                    <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ 'AUTH.LOGIN.SUBMIT' | translate }}
                  </button>
                </div>
              </form>
              
              <div class="mt-4 text-center">
                <p class="mb-0">
                  {{ 'AUTH.LOGIN.NO_ACCOUNT' | translate }}
                  <a routerLink="/signup" class="text-decoration-none">{{ 'AUTH.LOGIN.SIGNUP' | translate }}</a>
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
    
    .feature-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      font-size: 2rem;
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  protected email = '';
  protected password = '';
  protected isLoading = false;
  protected errorMessage = '';
  
  protected async login() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Login error:', error);
      this.errorMessage = 'AUTH.LOGIN.ERROR';
    } finally {
      this.isLoading = false;
    }
  }
}
