/**
 * Firebase Optimizations
 * 
 * This file provides optimized Firebase imports and configurations to reduce bundle size
 * and improve performance. It uses dynamic imports for Firebase modules that are not
 * needed immediately on application startup.
 */

import { inject } from '@angular/core';
import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

/**
 * Optimized Firestore document fetching
 * Uses RxJS to handle async operations and error handling
 */
export function getDocumentById<T>(
  collectionName: string, 
  documentId: string
): Observable<T | null> {
  const firestore = inject(Firestore);
  
  return from(getDoc(doc(firestore, collectionName, documentId))).pipe(
    map(snapshot => snapshot.exists() ? snapshot.data() as T : null),
    catchError(error => {
      console.error(`Error fetching document ${documentId} from ${collectionName}:`, error);
      return of(null);
    })
  );
}

/**
 * Optimized Firestore query
 * Uses RxJS to handle async operations and error handling
 */
export function queryCollection<T>(
  collectionName: string,
  fieldPath: string,
  operator: '==' | '!=' | '<' | '<=' | '>' | '>=',
  value: any
): Observable<T[]> {
  const firestore = inject(Firestore);
  const collectionRef = collection(firestore, collectionName);
  const q = query(collectionRef, where(fieldPath, operator, value));
  
  return from(getDocs(q)).pipe(
    map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T)),
    catchError(error => {
      console.error(`Error querying collection ${collectionName}:`, error);
      return of([]);
    })
  );
}

/**
 * Optimized auth state observer
 * Returns an Observable that emits the current user state
 */
export function observeAuthState(): Observable<User | null> {
  const auth = inject(Auth);
  
  return new Observable<User | null>(observer => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => observer.next(user),
      error => observer.error(error),
      () => observer.complete()
    );
    
    // Return the unsubscribe function to clean up when the Observable is unsubscribed
    return unsubscribe;
  });
}

/**
 * Lazy load Firebase Analytics
 * Only loads when explicitly called to reduce initial bundle size
 */
export async function initializeAnalytics(): Promise<void> {
  try {
    const { getAnalytics } = await import('@angular/fire/analytics');
    getAnalytics();
    console.log('Firebase Analytics initialized');
  } catch (error) {
    console.error('Error initializing Firebase Analytics:', error);
  }
}

/**
 * Lazy load Firebase Storage
 * Only loads when explicitly called to reduce initial bundle size
 */
export async function getFirebaseStorage() {
  try {
    const { getStorage } = await import('@angular/fire/storage');
    return getStorage();
  } catch (error) {
    console.error('Error loading Firebase Storage:', error);
    throw error;
  }
}

/**
 * Lazy load Firebase Messaging
 * Only loads when explicitly called to reduce initial bundle size
 */
export async function getFirebaseMessaging() {
  try {
    const { getMessaging } = await import('@angular/fire/messaging');
    return getMessaging();
  } catch (error) {
    console.error('Error loading Firebase Messaging:', error);
    throw error;
  }
}
