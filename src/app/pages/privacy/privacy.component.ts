import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="container py-5">
      <div class="row mb-5">
        <div class="col-lg-8 mx-auto">
          <h1 class="display-4 fw-bold mb-4">{{ 'PRIVACY.TITLE' | translate }}</h1>
          <p class="lead mb-4">{{ 'PRIVACY.SUBTITLE' | translate }}</p>
          <p class="text-muted">{{ 'PRIVACY.LAST_UPDATED' | translate: { date: 'April 24, 2025' } }}</p>
        </div>
      </div>
      
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <!-- Introduction -->
          <section class="mb-5">
            <h2 class="fw-bold mb-4">{{ 'PRIVACY.INTRODUCTION.TITLE' | translate }}</h2>
            <p>{{ 'PRIVACY.INTRODUCTION.PARAGRAPH1' | translate }}</p>
            <p>{{ 'PRIVACY.INTRODUCTION.PARAGRAPH2' | translate }}</p>
          </section>
          
          <!-- Information We Collect -->
          <section class="mb-5">
            <h2 class="fw-bold mb-4">{{ 'PRIVACY.INFORMATION_COLLECTED.TITLE' | translate }}</h2>
            <p>{{ 'PRIVACY.INFORMATION_COLLECTED.PARAGRAPH1' | translate }}</p>
            
            <h5 class="fw-bold mt-4">{{ 'PRIVACY.INFORMATION_COLLECTED.PERSONAL_INFO.TITLE' | translate }}</h5>
            <ul>
              <li>{{ 'PRIVACY.INFORMATION_COLLECTED.PERSONAL_INFO.ITEM1' | translate }}</li>
              <li>{{ 'PRIVACY.INFORMATION_COLLECTED.PERSONAL_INFO.ITEM2' | translate }}</li>
              <li>{{ 'PRIVACY.INFORMATION_COLLECTED.PERSONAL_INFO.ITEM3' | translate }}</li>
              <li>{{ 'PRIVACY.INFORMATION_COLLECTED.PERSONAL_INFO.ITEM4' | translate }}</li>
            </ul>
            
            <h5 class="fw-bold mt-4">{{ 'PRIVACY.INFORMATION_COLLECTED.USAGE_DATA.TITLE' | translate }}</h5>
            <ul>
              <li>{{ 'PRIVACY.INFORMATION_COLLECTED.USAGE_DATA.ITEM1' | translate }}</li>
              <li>{{ 'PRIVACY.INFORMATION_COLLECTED.USAGE_DATA.ITEM2' | translate }}</li>
              <li>{{ 'PRIVACY.INFORMATION_COLLECTED.USAGE_DATA.ITEM3' | translate }}</li>
            </ul>
          </section>
          
          <!-- How We Use Your Information -->
          <section class="mb-5">
            <h2 class="fw-bold mb-4">{{ 'PRIVACY.INFORMATION_USAGE.TITLE' | translate }}</h2>
            <p>{{ 'PRIVACY.INFORMATION_USAGE.PARAGRAPH1' | translate }}</p>
            
            <ul>
              <li>{{ 'PRIVACY.INFORMATION_USAGE.ITEM1' | translate }}</li>
              <li>{{ 'PRIVACY.INFORMATION_USAGE.ITEM2' | translate }}</li>
              <li>{{ 'PRIVACY.INFORMATION_USAGE.ITEM3' | translate }}</li>
              <li>{{ 'PRIVACY.INFORMATION_USAGE.ITEM4' | translate }}</li>
              <li>{{ 'PRIVACY.INFORMATION_USAGE.ITEM5' | translate }}</li>
              <li>{{ 'PRIVACY.INFORMATION_USAGE.ITEM6' | translate }}</li>
            </ul>
          </section>
          
          <!-- Information Sharing -->
          <section class="mb-5">
            <h2 class="fw-bold mb-4">{{ 'PRIVACY.INFORMATION_SHARING.TITLE' | translate }}</h2>
            <p>{{ 'PRIVACY.INFORMATION_SHARING.PARAGRAPH1' | translate }}</p>
            
            <h5 class="fw-bold mt-4">{{ 'PRIVACY.INFORMATION_SHARING.THIRD_PARTIES.TITLE' | translate }}</h5>
            <ul>
              <li>{{ 'PRIVACY.INFORMATION_SHARING.THIRD_PARTIES.ITEM1' | translate }}</li>
              <li>{{ 'PRIVACY.INFORMATION_SHARING.THIRD_PARTIES.ITEM2' | translate }}</li>
              <li>{{ 'PRIVACY.INFORMATION_SHARING.THIRD_PARTIES.ITEM3' | translate }}</li>
            </ul>
            
            <h5 class="fw-bold mt-4">{{ 'PRIVACY.INFORMATION_SHARING.LEGAL_REQUIREMENTS.TITLE' | translate }}</h5>
            <p>{{ 'PRIVACY.INFORMATION_SHARING.LEGAL_REQUIREMENTS.PARAGRAPH' | translate }}</p>
          </section>
          
          <!-- Data Security -->
          <section class="mb-5">
            <h2 class="fw-bold mb-4">{{ 'PRIVACY.DATA_SECURITY.TITLE' | translate }}</h2>
            <p>{{ 'PRIVACY.DATA_SECURITY.PARAGRAPH1' | translate }}</p>
            <p>{{ 'PRIVACY.DATA_SECURITY.PARAGRAPH2' | translate }}</p>
          </section>
          
          <!-- Your Rights -->
          <section class="mb-5">
            <h2 class="fw-bold mb-4">{{ 'PRIVACY.YOUR_RIGHTS.TITLE' | translate }}</h2>
            <p>{{ 'PRIVACY.YOUR_RIGHTS.PARAGRAPH1' | translate }}</p>
            
            <ul>
              <li>{{ 'PRIVACY.YOUR_RIGHTS.ITEM1' | translate }}</li>
              <li>{{ 'PRIVACY.YOUR_RIGHTS.ITEM2' | translate }}</li>
              <li>{{ 'PRIVACY.YOUR_RIGHTS.ITEM3' | translate }}</li>
              <li>{{ 'PRIVACY.YOUR_RIGHTS.ITEM4' | translate }}</li>
              <li>{{ 'PRIVACY.YOUR_RIGHTS.ITEM5' | translate }}</li>
            </ul>
            
            <p>{{ 'PRIVACY.YOUR_RIGHTS.PARAGRAPH2' | translate }}</p>
          </section>
          
          <!-- Children's Privacy -->
          <section class="mb-5">
            <h2 class="fw-bold mb-4">{{ 'PRIVACY.CHILDRENS_PRIVACY.TITLE' | translate }}</h2>
            <p>{{ 'PRIVACY.CHILDRENS_PRIVACY.PARAGRAPH1' | translate }}</p>
          </section>
          
          <!-- Changes to Privacy Policy -->
          <section class="mb-5">
            <h2 class="fw-bold mb-4">{{ 'PRIVACY.CHANGES.TITLE' | translate }}</h2>
            <p>{{ 'PRIVACY.CHANGES.PARAGRAPH1' | translate }}</p>
            <p>{{ 'PRIVACY.CHANGES.PARAGRAPH2' | translate }}</p>
          </section>
          
          <!-- Contact Us -->
          <section class="mb-5">
            <h2 class="fw-bold mb-4">{{ 'PRIVACY.CONTACT.TITLE' | translate }}</h2>
            <p>{{ 'PRIVACY.CONTACT.PARAGRAPH1' | translate }}</p>
            <p>
              <strong>{{ 'PRIVACY.CONTACT.EMAIL' | translate }}:</strong> privacy&#64;autoflowos.com<br>
              <strong>{{ 'PRIVACY.CONTACT.ADDRESS' | translate }}:</strong> 123 Innovation Street, San Francisco, CA 94103, USA
            </p>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    section {
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--bs-border-color);
    }
    
    section:last-child {
      border-bottom: none;
    }
  `]
})
export class PrivacyComponent {}
