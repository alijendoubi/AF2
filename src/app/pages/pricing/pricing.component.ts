import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, FormsModule],
  templateUrl: './templates/pricing.template.html',
  styles: [`
    :host {
      display: block;
    }
    
    .bg-primary {
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
    }
    
    .ribbon {
      width: 150px;
      height: 150px;
      overflow: hidden;
      position: absolute;
    }
    
    .ribbon span {
      position: absolute;
      display: block;
      width: 225px;
      padding: 8px 0;
      background-color: var(--bs-primary);
      box-shadow: 0 5px 10px rgba(0,0,0,.1);
      color: #fff;
      font-size: 13px;
      text-transform: uppercase;
      text-align: center;
    }
    
    .ribbon-top-right {
      top: -10px;
      right: -10px;
    }
    
    .ribbon-top-right span {
      left: -25px;
      top: 30px;
      transform: rotate(45deg);
    }
    
    .accordion-button:not(.collapsed) {
      background-color: rgba(var(--bs-primary-rgb), 0.1);
      color: var(--bs-primary);
    }
    
    .accordion-button:focus {
      box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
    }
  `]
})
export class PricingComponent {
  protected isAnnual = false;
}
