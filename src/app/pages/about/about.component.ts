import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  template: `
    <div class="container py-5">
      <div class="row mb-5">
        <div class="col-lg-8 mx-auto text-center">
          <h1 class="display-4 fw-bold mb-4">{{ 'ABOUT.TITLE' | translate }}</h1>
          <p class="lead mb-4">{{ 'ABOUT.SUBTITLE' | translate }}</p>
        </div>
      </div>
      
      <!-- Our Story -->
      <div class="row align-items-center mb-5">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <img src="assets/images/about-team.jpg" alt="Our Team" class="img-fluid rounded shadow-sm">
        </div>
        <div class="col-lg-6">
          <h2 class="fw-bold mb-4">{{ 'ABOUT.STORY.TITLE' | translate }}</h2>
          <p class="mb-3">{{ 'ABOUT.STORY.PARAGRAPH1' | translate }}</p>
          <p class="mb-3">{{ 'ABOUT.STORY.PARAGRAPH2' | translate }}</p>
          <p>{{ 'ABOUT.STORY.PARAGRAPH3' | translate }}</p>
        </div>
      </div>
      
      <!-- Our Mission -->
      <div class="row align-items-center mb-5">
        <div class="col-lg-6 order-lg-2 mb-4 mb-lg-0">
          <img src="assets/images/about-mission.jpg" alt="Our Mission" class="img-fluid rounded shadow-sm">
        </div>
        <div class="col-lg-6 order-lg-1">
          <h2 class="fw-bold mb-4">{{ 'ABOUT.MISSION.TITLE' | translate }}</h2>
          <p class="mb-3">{{ 'ABOUT.MISSION.PARAGRAPH1' | translate }}</p>
          <p>{{ 'ABOUT.MISSION.PARAGRAPH2' | translate }}</p>
          
          <div class="d-flex align-items-center mt-4">
            <div class="bg-primary rounded-circle p-3 me-3">
              <i class="bi bi-lightbulb text-white fs-4"></i>
            </div>
            <div>
              <h5 class="mb-1">{{ 'ABOUT.MISSION.INNOVATION' | translate }}</h5>
              <p class="mb-0 text-muted">{{ 'ABOUT.MISSION.INNOVATION_TEXT' | translate }}</p>
            </div>
          </div>
          
          <div class="d-flex align-items-center mt-3">
            <div class="bg-primary rounded-circle p-3 me-3">
              <i class="bi bi-people text-white fs-4"></i>
            </div>
            <div>
              <h5 class="mb-1">{{ 'ABOUT.MISSION.COMMUNITY' | translate }}</h5>
              <p class="mb-0 text-muted">{{ 'ABOUT.MISSION.COMMUNITY_TEXT' | translate }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Team Section -->
      <div class="row mb-5">
        <div class="col-12 text-center mb-4">
          <h2 class="fw-bold">{{ 'ABOUT.TEAM.TITLE' | translate }}</h2>
          <p class="lead">{{ 'ABOUT.TEAM.SUBTITLE' | translate }}</p>
        </div>
        
        <!-- Team Member 1 -->
        <div class="col-md-6 col-lg-3 mb-4">
          <div class="card border-0 shadow-sm h-100">
            <img src="assets/images/team-1.jpg" class="card-img-top" alt="Team Member">
            <div class="card-body text-center">
              <h5 class="card-title mb-1">Sarah Johnson</h5>
              <p class="text-muted mb-3">CEO & Founder</p>
              <p class="card-text">Passionate about creating tools that make work more efficient and enjoyable.</p>
              <div class="d-flex justify-content-center">
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle mx-1">
                  <i class="bi bi-linkedin"></i>
                </a>
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle mx-1">
                  <i class="bi bi-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Team Member 2 -->
        <div class="col-md-6 col-lg-3 mb-4">
          <div class="card border-0 shadow-sm h-100">
            <img src="assets/images/team-2.jpg" class="card-img-top" alt="Team Member">
            <div class="card-body text-center">
              <h5 class="card-title mb-1">Michael Chen</h5>
              <p class="text-muted mb-3">CTO</p>
              <p class="card-text">Tech enthusiast with a background in AI and cloud infrastructure.</p>
              <div class="d-flex justify-content-center">
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle mx-1">
                  <i class="bi bi-linkedin"></i>
                </a>
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle mx-1">
                  <i class="bi bi-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Team Member 3 -->
        <div class="col-md-6 col-lg-3 mb-4">
          <div class="card border-0 shadow-sm h-100">
            <img src="assets/images/team-3.jpg" class="card-img-top" alt="Team Member">
            <div class="card-body text-center">
              <h5 class="card-title mb-1">Emily Rodriguez</h5>
              <p class="text-muted mb-3">Head of Design</p>
              <p class="card-text">Creating intuitive and beautiful user experiences is her passion.</p>
              <div class="d-flex justify-content-center">
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle mx-1">
                  <i class="bi bi-linkedin"></i>
                </a>
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle mx-1">
                  <i class="bi bi-dribbble"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Team Member 4 -->
        <div class="col-md-6 col-lg-3 mb-4">
          <div class="card border-0 shadow-sm h-100">
            <img src="assets/images/team-4.jpg" class="card-img-top" alt="Team Member">
            <div class="card-body text-center">
              <h5 class="card-title mb-1">David Kim</h5>
              <p class="text-muted mb-3">Head of Customer Success</p>
              <p class="card-text">Dedicated to ensuring our customers get the most out of our platform.</p>
              <div class="d-flex justify-content-center">
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle mx-1">
                  <i class="bi bi-linkedin"></i>
                </a>
                <a href="#" class="btn btn-sm btn-outline-primary rounded-circle mx-1">
                  <i class="bi bi-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- CTA Section -->
      <div class="row">
        <div class="col-lg-10 mx-auto">
          <div class="card border-0 bg-primary text-white shadow-lg">
            <div class="card-body p-5 text-center">
              <h2 class="fw-bold mb-3">{{ 'ABOUT.CTA.TITLE' | translate }}</h2>
              <p class="lead mb-4">{{ 'ABOUT.CTA.SUBTITLE' | translate }}</p>
              <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                <a routerLink="/contact" class="btn btn-light btn-lg px-4 me-md-2">{{ 'ABOUT.CTA.CONTACT' | translate }}</a>
                <a routerLink="/signup" class="btn btn-outline-light btn-lg px-4">{{ 'ABOUT.CTA.SIGNUP' | translate }}</a>
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
export class AboutComponent {}
