import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services';
import { User, UserRole } from '../../interfaces';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <div class="container py-5">
      <h1 class="mb-4">{{ 'PROFILE.TITLE' | translate }}</h1>
      
      <!-- Loading State -->
      <div *ngIf="isLoading" class="d-flex justify-content-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ 'COMMON.LOADING' | translate }}</span>
        </div>
      </div>
      
      <div *ngIf="!isLoading" class="row">
        <!-- Personal Information -->
        <div class="col-md-6 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0">
              <h5 class="card-title mb-0">{{ 'PROFILE.PERSONAL_INFO' | translate }}</h5>
            </div>
            <div class="card-body">
              <form (ngSubmit)="updateProfile()" #profileForm="ngForm">
                <div class="mb-3">
                  <label for="displayName" class="form-label">{{ 'PROFILE.NAME' | translate }}</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="displayName" 
                    name="displayName"
                    [(ngModel)]="user.displayName"
                    required
                  >
                </div>
                
                <div class="mb-3">
                  <label for="email" class="form-label">{{ 'PROFILE.EMAIL' | translate }}</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    name="email"
                    [(ngModel)]="user.email"
                    required
                    email
                    disabled
                  >
                  <div class="form-text text-muted">Email cannot be changed</div>
                </div>
                
                <div *ngIf="updateSuccess" class="alert alert-success">
                  {{ 'COMMON.SUCCESS' | translate }}
                </div>
                
                <div *ngIf="updateError" class="alert alert-danger">
                  {{ 'COMMON.ERROR' | translate }}
                </div>
                
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    [disabled]="profileForm.invalid || isUpdating"
                  >
                    <span *ngIf="isUpdating" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ 'PROFILE.UPDATE' | translate }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <!-- Change Password -->
        <div class="col-md-6 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0">
              <h5 class="card-title mb-0">{{ 'PROFILE.PASSWORD.TITLE' | translate }}</h5>
            </div>
            <div class="card-body">
              <form (ngSubmit)="updatePassword()" #passwordForm="ngForm">
                <div class="mb-3">
                  <label for="currentPassword" class="form-label">{{ 'PROFILE.PASSWORD.CURRENT' | translate }}</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="currentPassword" 
                    name="currentPassword"
                    [(ngModel)]="passwordData.currentPassword"
                    required
                  >
                </div>
                
                <div class="mb-3">
                  <label for="newPassword" class="form-label">{{ 'PROFILE.PASSWORD.NEW' | translate }}</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="newPassword" 
                    name="newPassword"
                    [(ngModel)]="passwordData.newPassword"
                    required
                    minlength="6"
                  >
                </div>
                
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">{{ 'PROFILE.PASSWORD.CONFIRM' | translate }}</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    id="confirmPassword" 
                    name="confirmPassword"
                    [(ngModel)]="passwordData.confirmPassword"
                    required
                  >
                  <div *ngIf="passwordData.newPassword !== passwordData.confirmPassword && passwordForm.submitted" class="text-danger mt-1">
                    Passwords do not match
                  </div>
                </div>
                
                <div *ngIf="passwordSuccess" class="alert alert-success">
                  {{ 'COMMON.SUCCESS' | translate }}
                </div>
                
                <div *ngIf="passwordError" class="alert alert-danger">
                  {{ 'COMMON.ERROR' | translate }}
                </div>
                
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    [disabled]="passwordForm.invalid || isUpdatingPassword || passwordData.newPassword !== passwordData.confirmPassword"
                  >
                    <span *ngIf="isUpdatingPassword" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ 'PROFILE.PASSWORD.UPDATE' | translate }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <!-- Account Information -->
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0">
              <h5 class="card-title mb-0">Account Information</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <p><strong>Account Type:</strong> {{ user.role === UserRole.ADMIN ? 'Administrator' : 'User' }}</p>
                  <p><strong>Member Since:</strong> {{ user.createdAt | date:'mediumDate' }}</p>
                </div>
                <div class="col-md-6">
                  <p><strong>Last Login:</strong> {{ user.lastLogin | date:'medium' }}</p>
                  <p><strong>Status:</strong> <span class="badge bg-success">Active</span></p>
                </div>
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
      margin-bottom: 1.5rem;
    }
  `]
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  
  protected UserRole = UserRole; // Make UserRole enum available in the template
  protected isLoading = true;
  protected isUpdating = false;
  protected isUpdatingPassword = false;
  protected updateSuccess = false;
  protected updateError = false;
  protected passwordSuccess = false;
  protected passwordError = false;
  
  protected user: User = {
    uid: '',
    email: '',
    displayName: '',
    role: UserRole.USER,
    createdAt: new Date(),
    isActive: true
  };
  
  protected passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  
  ngOnInit(): void {
    this.loadUserData();
  }
  
  private loadUserData(): void {
    this.isLoading = true;
    
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = { ...currentUser };
    }
    
    // Simulate loading delay
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
  
  protected async updateProfile(): Promise<void> {
    if (this.isUpdating) return;
    
    this.isUpdating = true;
    this.updateSuccess = false;
    this.updateError = false;
    
    try {
      // In a real application, this would update the user profile in Firebase
      // For now, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.updateSuccess = true;
    } catch (error) {
      console.error('Update profile error:', error);
      this.updateError = true;
    } finally {
      this.isUpdating = false;
    }
  }
  
  protected async updatePassword(): Promise<void> {
    if (this.isUpdatingPassword) return;
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) return;
    
    this.isUpdatingPassword = true;
    this.passwordSuccess = false;
    this.passwordError = false;
    
    try {
      // In a real application, this would update the user's password in Firebase
      // For now, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.passwordSuccess = true;
      this.passwordData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
    } catch (error) {
      console.error('Update password error:', error);
      this.passwordError = true;
    } finally {
      this.isUpdatingPassword = false;
    }
  }
}
