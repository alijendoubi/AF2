import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { inject } from '@angular/core';
import { AuthService } from './services';

// Auth guard function for protecting routes
const isAuthenticated = () => {
  const authService = inject(AuthService);
  return authService.isLoggedIn() ? true : { path: '/login' };
};

// Admin guard function for protecting admin routes
const isAdmin = () => {
  const authService = inject(AuthService);
  return authService.isAdminUser() ? true : { path: '/dashboard' };
};

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'AutoFlowOS - Streamline Your Workflow'
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent),
        title: 'Login - AutoFlowOS'
      },
      {
        path: 'signup',
        loadComponent: () => import('./pages/auth/signup/signup.component').then(m => m.SignupComponent),
        title: 'Sign Up - AutoFlowOS'
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
        title: 'Forgot Password - AutoFlowOS'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [isAuthenticated],
        title: 'Dashboard - AutoFlowOS'
      },
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
        canActivate: [isAuthenticated, isAdmin],
        title: 'Admin Panel - AutoFlowOS'
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [isAuthenticated],
        title: 'Profile - AutoFlowOS'
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
        title: 'About Us - AutoFlowOS'
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
        title: 'Contact Us - AutoFlowOS'
      },
      {
        path: 'pricing',
        loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent),
        title: 'Pricing - AutoFlowOS'
      },
      {
        path: 'privacy',
        loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent),
        title: 'Privacy Policy - AutoFlowOS'
      },
      {
        path: 'features',
        loadComponent: () => import('./pages/features/features.component').then(m => m.FeaturesComponent),
        title: 'Features - AutoFlowOS'
      },
      {
        path: 'mission',
        loadComponent: () => import('./pages/mission/mission.component').then(m => m.MissionComponent),
        title: 'Our Mission - AutoFlowOS'
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 Not Found - AutoFlowOS'
  }
];
