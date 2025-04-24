import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

// Firebase - Lazy loaded to reduce initial bundle size
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { connectFirestoreEmulator, enableIndexedDbPersistence, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';

// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

// Factory function for TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  // Use absolute path for SSR compatibility
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding()
    ),
    // Enable client hydration for SSR and prerendering
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideAnimations(),
    
    // Firebase - with optimized configuration
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      // Use emulator in development if needed
      // if (!environment.production) {
      //   connectAuthEmulator(auth, 'http://localhost:9099');
      // }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      // Enable offline persistence to improve performance
      // Note: This is optional and can be removed if not needed
      // enableIndexedDbPersistence(firestore)
      //   .catch(err => console.error('Firestore persistence error:', err));
      
      // Use emulator in development if needed
      // if (!environment.production) {
      //   connectFirestoreEmulator(firestore, 'localhost', 8080);
      // }
      return firestore;
    }),
    provideStorage(() => {
      const storage = getStorage();
      // Use emulator in development if needed
      // if (!environment.production) {
      //   connectStorageEmulator(storage, 'localhost', 9199);
      // }
      return storage;
    }),
    
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        // Add SSR-specific configuration
        extend: true,
        isolate: false,
        useDefaultLang: true
      })
    )
  ]
};
