import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="container py-5">
      <div class="row mb-5">
        <div class="col-lg-8 mx-auto text-center">
          <h1 class="display-4 fw-bold mb-4">{{ 'HOME.FEATURES.TITLE' | translate }}</h1>
          <p class="lead mb-4">{{ 'HOME.FEATURES.SUBTITLE' | translate }}</p>
        </div>
      </div>
      
      <div class="row g-4 g-lg-5">
        <div class="col-md-6 col-lg-3">
          <div class="card h-100 border-0 shadow-sm rounded-4 card-lift">
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
          <div class="card h-100 border-0 shadow-sm rounded-4 card-lift">
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
          <div class="card h-100 border-0 shadow-sm rounded-4 card-lift">
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
          <div class="card h-100 border-0 shadow-sm rounded-4 card-lift">
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
      
      <div class="row mt-5">
        <div class="col-lg-10 mx-auto">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4 p-md-5">
              <h2 class="fw-bold mb-4 text-center">{{ 'HOME.FEATURES.TITLE' | translate }} {{ 'COMMON.DETAILS' | translate }}</h2>
              
              <div class="row g-4 mt-2">
                <div class="col-md-6">
                  <div class="d-flex">
                    <div class="bg-primary rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                      <i class="bi bi-gear-fill text-white fs-5"></i>
                    </div>
                    <div>
                      <h5 class="mb-2">{{ 'HOME.FEATURES.AUTOMATION.TITLE' | translate }}</h5>
                      <p class="text-muted">
                        {{ 'HOME.FEATURES.AUTOMATION.DESCRIPTION' | translate }}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                        Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="d-flex">
                    <div class="bg-primary rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                      <i class="bi bi-graph-up text-white fs-5"></i>
                    </div>
                    <div>
                      <h5 class="mb-2">{{ 'HOME.FEATURES.ANALYTICS.TITLE' | translate }}</h5>
                      <p class="text-muted">
                        {{ 'HOME.FEATURES.ANALYTICS.DESCRIPTION' | translate }}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
                        Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="d-flex">
                    <div class="bg-primary rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                      <i class="bi bi-puzzle text-white fs-5"></i>
                    </div>
                    <div>
                      <h5 class="mb-2">{{ 'HOME.FEATURES.INTEGRATION.TITLE' | translate }}</h5>
                      <p class="text-muted">
                        {{ 'HOME.FEATURES.INTEGRATION.DESCRIPTION' | translate }}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
                        Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="d-flex">
                    <div class="bg-primary rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                      <i class="bi bi-shield-check text-white fs-5"></i>
                    </div>
                    <div>
                      <h5 class="mb-2">{{ 'HOME.FEATURES.SECURITY.TITLE' | translate }}</h5>
                      <p class="text-muted">
                        {{ 'HOME.FEATURES.SECURITY.DESCRIPTION' | translate }}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
                        Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl.
                      </p>
                    </div>
                  </div>
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
    
    .bg-primary {
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
    }
    
    /* Dark mode styles */
    :host-context(.dark-theme) {
      .bg-light {
        background-color: rgba(255, 255, 255, 0.02) !important;
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
    }
  `]
})
export class FeaturesComponent {}
