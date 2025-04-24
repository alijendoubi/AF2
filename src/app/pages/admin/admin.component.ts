import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, DashboardService } from '../../services';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="container-fluid py-4">
      <h1 class="mb-4">{{ 'ADMIN.TITLE' | translate }}</h1>
      
      <!-- Loading State -->
      <div *ngIf="isLoading" class="d-flex justify-content-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ 'COMMON.LOADING' | translate }}</span>
        </div>
      </div>
      
      <div *ngIf="!isLoading" class="row g-4">
        <!-- User Management -->
        <div class="col-md-6">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0">
              <h5 class="card-title mb-0">{{ 'ADMIN.USERS.TITLE' | translate }}</h5>
            </div>
            <div class="card-body">
              <div class="row g-4">
                <div class="col-md-4">
                  <div class="text-center">
                    <div class="display-6">{{ adminData?.userStats?.total || 0 }}</div>
                    <div class="text-muted">{{ 'ADMIN.USERS.TOTAL' | translate }}</div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="text-center">
                    <div class="display-6 text-success">{{ adminData?.userStats?.active || 0 }}</div>
                    <div class="text-muted">{{ 'ADMIN.USERS.ACTIVE' | translate }}</div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="text-center">
                    <div class="display-6 text-danger">{{ adminData?.userStats?.total - adminData?.userStats?.active || 0 }}</div>
                    <div class="text-muted">{{ 'ADMIN.USERS.INACTIVE' | translate }}</div>
                  </div>
                </div>
              </div>
              
              <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button class="btn btn-outline-primary">
                  <i class="bi bi-person-plus me-2"></i> Add User
                </button>
                <button class="btn btn-outline-secondary">
                  <i class="bi bi-people me-2"></i> Manage Users
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Subscription Management -->
        <div class="col-md-6">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0">
              <h5 class="card-title mb-0">{{ 'ADMIN.SUBSCRIPTIONS.TITLE' | translate }}</h5>
            </div>
            <div class="card-body">
              <div class="row g-4">
                <div class="col-md-4">
                  <div class="text-center">
                    <div class="display-6">
                      {{ 
                        (adminData?.subscriptionStats?.free || 0) + 
                        (adminData?.subscriptionStats?.basic || 0) + 
                        (adminData?.subscriptionStats?.pro || 0) + 
                        (adminData?.subscriptionStats?.enterprise || 0)
                      }}
                    </div>
                    <div class="text-muted">{{ 'ADMIN.SUBSCRIPTIONS.TOTAL' | translate }}</div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="text-center">
                    <div class="display-6 text-success">{{ adminData?.userStats?.active || 0 }}</div>
                    <div class="text-muted">{{ 'ADMIN.SUBSCRIPTIONS.ACTIVE' | translate }}</div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="text-center">
                    <div class="display-6 text-warning">{{ adminData?.subscriptionStats?.expired || 0 }}</div>
                    <div class="text-muted">{{ 'ADMIN.SUBSCRIPTIONS.EXPIRED' | translate }}</div>
                  </div>
                </div>
              </div>
              
              <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button class="btn btn-outline-primary">
                  <i class="bi bi-plus-circle me-2"></i> Add Plan
                </button>
                <button class="btn btn-outline-secondary">
                  <i class="bi bi-gear me-2"></i> Manage Plans
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- System Settings -->
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0">
              <h5 class="card-title mb-0">System Settings</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Site Name</label>
                    <input type="text" class="form-control" value="AutoFlowOS" disabled>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Admin Email</label>
                    <input type="email" class="form-control" value="admin@autoflowos.com" disabled>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Maintenance Mode</label>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="maintenanceMode">
                      <label class="form-check-label" for="maintenanceMode">Enable Maintenance Mode</label>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Registration</label>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="allowRegistration" checked>
                      <label class="form-check-label" for="allowRegistration">Allow New Registrations</label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button class="btn btn-primary">
                  <i class="bi bi-save me-2"></i> Save Settings
                </button>
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
export class AdminComponent implements OnInit {
  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);
  
  protected isLoading = true;
  protected adminData: any = null;
  
  ngOnInit(): void {
    this.loadAdminData();
  }
  
  private async loadAdminData(): Promise<void> {
    this.isLoading = true;
    
    try {
      this.dashboardService.getAdminDashboard().subscribe(data => {
        this.adminData = data;
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      // Simulate loading delay
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }
}
