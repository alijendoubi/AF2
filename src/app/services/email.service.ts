import { Injectable } from '@angular/core';
import { init, send } from '@emailjs/browser';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor() {
    init(environment.emailJs.publicKey);
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    try {
      this.isLoadingSubject.next(true);
      await send(
        environment.emailJs.serviceId,
        environment.emailJs.welcomeTemplateId,
        {
          to_email: email,
          to_name: name,
        }
      );
    } catch (error) {
      console.error('Welcome email error:', error);
      throw error;
    } finally {
      this.isLoadingSubject.next(false);
    }
  }

  async sendContactEmail(
    name: string,
    email: string,
    subject: string,
    message: string
  ): Promise<void> {
    try {
      this.isLoadingSubject.next(true);
      await send(
        environment.emailJs.serviceId,
        environment.emailJs.contactTemplateId,
        {
          from_name: name,
          from_email: email,
          subject,
          message,
        }
      );
    } catch (error) {
      console.error('Contact email error:', error);
      throw error;
    } finally {
      this.isLoadingSubject.next(false);
    }
  }

  async subscribeToNewsletter(email: string): Promise<void> {
    try {
      this.isLoadingSubject.next(true);
      await send(
        environment.emailJs.serviceId,
        environment.emailJs.newsletterTemplateId,
        {
          subscriber_email: email,
        }
      );
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      throw error;
    } finally {
      this.isLoadingSubject.next(false);
    }
  }

  async submitBetaSignup(email: string, name: string, company?: string): Promise<void> {
    try {
      this.isLoadingSubject.next(true);
      await send(
        environment.emailJs.serviceId,
        environment.emailJs.betaSignupTemplateId,
        {
          subscriber_email: email,
          subscriber_name: name,
          company: company || 'Not specified',
        }
      );
    } catch (error) {
      console.error('Beta signup error:', error);
      throw error;
    } finally {
      this.isLoadingSubject.next(false);
    }
  }
}

