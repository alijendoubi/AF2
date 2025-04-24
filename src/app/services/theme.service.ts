import { Injectable, signal } from '@angular/core';
import { Theme, ThemeConfig } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme-preference';
  private readonly DARK_THEME_CLASS = 'dark-theme';
  private readonly LIGHT_THEME_CLASS = 'light-theme';

  private readonly darkTheme: Theme = {
    name: 'dark',
    properties: {
      '--bg-color': '#121212',
      '--text-color': '#ffffff',
      '--primary-color': '#bb86fc',
      '--secondary-color': '#03dac6',
      '--accent-color': '#cf6679',
      '--surface-color': '#1e1e1e',
      '--error-color': '#cf6679'
    }
  };

  private readonly lightTheme: Theme = {
    name: 'light',
    properties: {
      '--bg-color': '#ffffff',
      '--text-color': '#000000',
      '--primary-color': '#6200ee',
      '--secondary-color': '#03dac6',
      '--accent-color': '#3700b3',
      '--surface-color': '#ffffff',
      '--error-color': '#b00020'
    }
  };

  public currentTheme = signal<Theme['name']>('dark');

  constructor() {
    this.loadTheme();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadTheme(): void {
    if (!this.isBrowser()) {
      // Default to dark theme in SSR
      return;
    }

    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    if (savedTheme) {
      this.setTheme(savedTheme as Theme['name']);
    } else {
      // Always default to dark theme
      this.setTheme('dark');
    }
  }


  public setTheme(theme: Theme['name']): void {
    const selectedTheme = theme === 'dark' ? this.darkTheme : this.lightTheme;
    
    if (this.isBrowser()) {
      // Remove previous theme class
      document.body.classList.remove(this.DARK_THEME_CLASS, this.LIGHT_THEME_CLASS);
      // Add new theme class
      document.body.classList.add(`${theme}-theme`);

      // Apply CSS custom properties
      Object.entries(selectedTheme.properties).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value);
      });

      // Save preference to localStorage
      localStorage.setItem(this.STORAGE_KEY, theme);
    }

    // Update signal (works in both browser and server)
    this.currentTheme.set(theme);
  }

  public toggleTheme(): void {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  public isDarkTheme(): boolean {
    return this.currentTheme() === 'dark';
  }
}
