import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AutoFlowOS';
  
  constructor(private translate: TranslateService) {
    // Set default language
    translate.setDefaultLang('en');
    translate.use('en');
    
    // Add supported languages
    translate.addLangs(['en', 'fr', 'de']);
  }
}
