import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'timesheet-2b740',
        appId: '1:841860863724:web:6d27ab6b29b2b4b6bb77c9',
        storageBucket: 'timesheet-2b740.firebasestorage.app',
        apiKey: 'AIzaSyBLjQ4-yqnBnjp-nkufvejCBHg6GJnI5aE',
        authDomain: 'timesheet-2b740.firebaseapp.com',
        messagingSenderId: '841860863724',
        measurementId: 'G-Q338MK761R',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), provideAnimationsAsync(),
  ],
};
