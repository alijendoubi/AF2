import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, ChatbotComponent],
  template: `
    <div class="d-flex flex-column min-vh-100">
      <app-navbar />
      <main class="flex-grow-1">
        <router-outlet />
      </main>
      <app-footer />
      <app-chatbot />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    main {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
  `]
})
export class MainLayoutComponent {}
