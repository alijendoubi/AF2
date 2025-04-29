import { Injectable, inject, signal } from '@angular/core';
import { Auth, User as FirebaseUser, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail as firebaseSendPasswordResetEmail, sendEmailVerification } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, map, switchMap, tap } from 'rxjs';
import { User, UserRole } from '../interfaces';
import { getDocumentById, observeAuthState } from '../firebase/firebase-optimizations';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  
  public isAuthenticated = signal<boolean>(false);
  public isAdmin = signal<boolean>(false);

  constructor() {
    // Use optimized auth state observer
    observeAuthState().subscribe(async (firebaseUser) => {
      if (firebaseUser) {
        // Use optimized document fetching
        getDocumentById<User>('users', firebaseUser.uid).subscribe(user => {
          this.userSubject.next(user);
          this.isAuthenticated.set(!!user);
          this.isAdmin.set(user?.role === UserRole.ADMIN);
        });
      } else {
        this.userSubject.next(null);
        this.isAuthenticated.set(false);
        this.isAdmin.set(false);
      }
    });
  }

  async signup(email: string, password: string, displayName: string): Promise<UserCredential> {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      const user: User = {
        uid: credential.user.uid,
        email,
        displayName,
        role: UserRole.USER,
        createdAt: new Date(),
        isActive: true
      };

      await this.setUserData(user);
      return credential;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      await this.updateLoginTimestamp(credential.user.uid);
      return credential;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Using the optimized function from firebase-optimizations.ts instead
  private getUserData(uid: string): Observable<User | null> {
    return getDocumentById<User>('users', uid);
  }

  private async setUserData(user: User): Promise<void> {
    try {
      await setDoc(doc(this.firestore, 'users', user.uid), user);
    } catch (error) {
      console.error('Set user data error:', error);
      throw error;
    }
  }

  private async updateLoginTimestamp(uid: string): Promise<void> {
    try {
      await setDoc(doc(this.firestore, 'users', uid), {
        lastLogin: new Date()
      }, { merge: true });
    } catch (error) {
      console.error('Update login timestamp error:', error);
      throw error;
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  isAdminUser(): boolean {
    return this.isAdmin();
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  /**
   * Send password reset email to the specified email address
   * @param email The email address to send the password reset link to
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await firebaseSendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error('Password reset email error:', error);
      throw error;
    }
  }

  /**
   * Send email verification to the current user
   * @param user The Firebase user to send verification email to
   */
  async sendEmailVerification(user: FirebaseUser): Promise<void> {
    try {
      await sendEmailVerification(user);
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  }
}
