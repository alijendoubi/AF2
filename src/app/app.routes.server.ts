import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Skip prerendering for routes that require authentication
    // Use Server mode for dynamic routes that need server-side rendering on each request
    path: 'dashboard',
    renderMode: RenderMode.Server
  },
  {
    path: 'admin',
    renderMode: RenderMode.Server
  },
  {
    path: 'profile',
    renderMode: RenderMode.Server
  },
  {
    // Prerender all other routes
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
