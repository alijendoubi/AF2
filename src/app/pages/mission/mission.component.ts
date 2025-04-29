import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="container py-5">
      <div class="row mb-5">
        <div class="col-lg-8 mx-auto text-center">
          <h1 class="display-4 fw-bold mb-4">{{ 'HOME.MISSION.TITLE' | translate }}</h1>
          <p class="lead mb-4">{{ 'HOME.MISSION.STATEMENT' | translate }}</p>
        </div>
      </div>
      
      <div class="row g-4 mt-3 justify-content-center">
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
      
      <div class="row mt-5">
        <div class="col-lg-10 mx-auto">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4 p-md-5">
              <div class="row align-items-center">
                <div class="col-md-6 mb-4 mb-md-0">
                  <h2 class="fw-bold mb-4">{{ 'ABOUT.MISSION.TITLE' | translate }}</h2>
                  <p class="mb-3">{{ 'ABOUT.MISSION.PARAGRAPH1' | translate }}</p>
                  <p class="mb-4">{{ 'ABOUT.MISSION.PARAGRAPH2' | translate }}</p>
                  
                  <div class="d-flex align-items-center mb-3">
                    <div class="bg-primary rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                      <i class="bi bi-lightbulb text-white"></i>
                    </div>
                    <div>
                      <h6 class="fw-bold mb-0">{{ 'ABOUT.MISSION.INNOVATION' | translate }}</h6>
                      <p class="small text-muted mb-0">{{ 'ABOUT.MISSION.INNOVATION_TEXT' | translate }}</p>
                    </div>
                  </div>
                  
                  <div class="d-flex align-items-center">
                    <div class="bg-primary rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                      <i class="bi bi-people text-white"></i>
                    </div>
                    <div>
                      <h6 class="fw-bold mb-0">{{ 'ABOUT.MISSION.COMMUNITY' | translate }}</h6>
                      <p class="small text-muted mb-0">{{ 'ABOUT.MISSION.COMMUNITY_TEXT' | translate }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="mission-quote p-4 rounded-4 bg-light">
                    <i class="bi bi-quote fs-1 text-primary opacity-25"></i>
                    <p class="fs-5 fst-italic mb-3">
                      "We believe that by automating routine tasks, we can free up human potential for more creative and meaningful work."
                    </p>
                    <div class="d-flex align-items-center">
                      <div class="bg-primary rounded-circle p-2 me-3 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                        <i class="bi bi-person text-white"></i>
                      </div>
                      <div>
                        <h6 class="fw-bold mb-0">CEO & Founder</h6>
                        <p class="small text-muted mb-0">AutoFlowOS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row mt-5">
        <div class="col-12 text-center">
          <h2 class="fw-bold mb-4">{{ 'ABOUT.CTA.TITLE' | translate }}</h2>
          <p class="lead mb-4">{{ 'ABOUT.CTA.SUBTITLE' | translate }}</p>
          <div class="d-flex justify-content-center gap-3">
            <a routerLink="/contact" class="btn btn-primary btn-lg px-4 shadow-sm">{{ 'ABOUT.CTA.CONTACT' | translate }}</a>
            <a routerLink="/signup" class="btn btn-outline-primary btn-lg px-4">{{ 'ABOUT.CTA.SIGNUP' | translate }}</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .mission-value {
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      background-color: var(--bs-white);
      position: relative;
      overflow: hidden;
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05);
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
    
    .bg-primary {
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
    }
    
    .mission-quote {
      position: relative;
      border-radius: 1rem;
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05);
    }
    
    .mission-quote i.bi-quote {
      position: absolute;
      top: 1rem;
      left: 1rem;
      z-index: 0;
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
      
      .mission-quote {
        background-color: rgba(255, 255, 255, 0.05) !important;
      }
    }
  `]
})
export class MissionComponent {}
