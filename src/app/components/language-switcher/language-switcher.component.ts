import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="dropdown">
      <button class="btn btn-link dropdown-toggle" 
              type="button" 
              id="languageDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false">
        <i class="bi bi-globe me-1"></i>
        {{ getCurrentLanguageName() | translate }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
        <li *ngFor="let lang of languages">
          <button class="dropdown-item" 
                  [class.active]="isCurrentLanguage(lang.code)"
                  (click)="switchLanguage(lang.code)">
            {{ lang.name | translate }}
          </button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .dropdown-item.active {
      background-color: var(--bs-primary);
      color: white;
    }
  `]
})
export class LanguageSwitcherComponent {
  private translate = inject(TranslateService);
  
  protected languages = [
    { code: 'en', name: 'LANGUAGE.ENGLISH' },
    { code: 'fr', name: 'LANGUAGE.FRENCH' },
    { code: 'de', name: 'LANGUAGE.GERMAN' }
  ];
  
  protected switchLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('preferred-language', lang);
  }
  
  protected isCurrentLanguage(lang: string): boolean {
    return this.translate.currentLang === lang;
  }
  
  protected getCurrentLanguageName(): string {
    const currentLang = this.translate.currentLang;
    const language = this.languages.find(lang => lang.code === currentLang);
    return language ? language.name : this.languages[0].name;
  }
}
