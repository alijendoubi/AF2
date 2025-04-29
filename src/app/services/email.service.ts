import { Injectable } from '@angular/core';
import { init, send, EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interface for email service state
export interface EmailServiceState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Interface for email operation result
export interface EmailOperationResult {
  success: boolean;
  error?: string;
}
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // State management BehaviorSubjects
  private serviceStateSubject = new BehaviorSubject<EmailServiceState>({
    loading: false,
    error: null,
    success: false
  });
  
  // Public observables for components to subscribe to
  public serviceState$ = this.serviceStateSubject.asObservable();
  public isLoading$ = this.serviceStateSubject.asObservable().pipe(
    map(state => state.loading)
  );
  public errorMessage$ = this.serviceStateSubject.asObservable().pipe(
    map(state => state.error)
  );
  public isSuccess$ = this.serviceStateSubject.asObservable().pipe(
    map(state => state.success)
  );

  // Initialization status
  private initialized = false;

  constructor() {
    this.initializeEmailJs();
  }

  /**
   * Initialize EmailJS with error handling
   */
  private initializeEmailJs(): void {
    try {
      init(environment.emailJs.publicKey);
      this.initialized = true;
      console.log('EmailJS initialized successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to initialize EmailJS:', errorMessage);
      this.updateState({ loading: false, error: `EmailJS initialization failed: ${errorMessage}`, success: false });
    }
  }

  /**
   * Update the service state
   */
  private updateState(state: Partial<EmailServiceState>): void {
    this.serviceStateSubject.next({
      ...this.serviceStateSubject.value,
      ...state
    });
  }

  /**
   * Check if EmailJS is initialized before sending emails
   */
  private checkInitialization(): boolean {
    if (!this.initialized) {
      this.updateState({ 
        loading: false, 
        error: 'EmailJS is not initialized. Please try again later.', 
        success: false 
      });
      return false;
    }
    return true;
  }

  /**
   * Send welcome email to new user
   * @param email User's email address
   * @param name User's name
   * @returns Promise with email operation result
   */
  async sendWelcomeEmail(email: string, name: string): Promise<EmailOperationResult> {
    // Reset state for this operation
    this.updateState({ loading: true, error: null, success: false });
    
    // Check if initialized before proceeding
    if (!this.checkInitialization()) {
      return { success: false, error: 'EmailJS is not initialized' };
    }
    
    try {
      const response = await send(
        environment.emailJs.serviceId,
        environment.emailJs.welcomeTemplateId,
        {
          to_email: email,
          to_name: name,
        }
      );
      
      // Update state on success
      this.updateState({ loading: false, error: null, success: true });
      return { success: true };
    } catch (error) {
      // Handle and log error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error sending welcome email';
      console.error('Welcome email error:', error);
      
      // Update state with error
      this.updateState({ loading: false, error: errorMessage, success: false });
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Send contact form email
   * @param name Sender's name
   * @param email Sender's email
   * @param subject Email subject
   * @param message Email message content
   * @returns Promise with email operation result
   */
  async sendContactEmail(
    name: string,
    email: string,
    subject: string,
    message: string
  ): Promise<EmailOperationResult> {
    // Reset state for this operation
    this.updateState({ loading: true, error: null, success: false });
    
    // Check if initialized before proceeding
    if (!this.checkInitialization()) {
      return { success: false, error: 'EmailJS is not initialized' };
    }
    
    try {
      const response = await send(
        environment.emailJs.serviceId,
        environment.emailJs.contactTemplateId,
        {
          from_name: name,
          from_email: email,
          subject,
          message,
        }
      );
      
      // Update state on success
      this.updateState({ loading: false, error: null, success: true });
      return { success: true };
    } catch (error) {
      // Handle and log error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error sending contact email';
      console.error('Contact email error:', error);
      
      // Update state with error
      this.updateState({ loading: false, error: errorMessage, success: false });
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Subscribe user to newsletter
   * @param email Subscriber's email address
   * @returns Promise with email operation result
   */
  async subscribeToNewsletter(email: string): Promise<EmailOperationResult> {
    // Reset state for this operation
    this.updateState({ loading: true, error: null, success: false });
    
    // Check if initialized before proceeding
    if (!this.checkInitialization()) {
      return { success: false, error: 'EmailJS is not initialized' };
    }
    
    try {
      const response = await send(
        environment.emailJs.serviceId,
        environment.emailJs.newsletterTemplateId,
        {
          subscriber_email: email,
        }
      );
      
      // Update state on success
      this.updateState({ loading: false, error: null, success: true });
      return { success: true };
    } catch (error) {
      // Handle and log error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error subscribing to newsletter';
      console.error('Newsletter subscription error:', error);
      
      // Update state with error
      this.updateState({ loading: false, error: errorMessage, success: false });
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Submit beta signup form
   * @param email User's email address
   * @param name User's name
   * @param company User's company (optional)
   * @returns Promise with email operation result
   */
  async submitBetaSignup(email: string, name: string, company?: string): Promise<EmailOperationResult> {
    // Reset state for this operation
    this.updateState({ loading: true, error: null, success: false });
    
    // Check if initialized before proceeding
    if (!this.checkInitialization()) {
      return { success: false, error: 'EmailJS is not initialized' };
    }
    
    try {
      const response = await send(
        environment.emailJs.serviceId,
        environment.emailJs.betaSignupTemplateId,
        {
          subscriber_email: email,
          subscriber_name: name,
          company: company || 'Not specified',
        }
      );
      
      // Update state on success
      this.updateState({ loading: false, error: null, success: true });
      return { success: true };
    } catch (error) {
      // Handle and log error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error submitting beta signup';
      console.error('Beta signup error:', error);
      
      // Update state with error
      this.updateState({ loading: false, error: errorMessage, success: false });
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Clear current state (can be used to reset the service state)
   */
  clearState(): void {
    this.updateState({ loading: false, error: null, success: false });
  }
}
