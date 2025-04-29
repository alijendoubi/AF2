import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message, ChatbotResponse } from '../interfaces/chatbot.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  // Store chat messages
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  
  // Simple responses for the chatbot
  private responses: Record<string, string[]> = {
    greeting: [
      'Hello! How can I help you today?',
      'Hi there! What can I do for you?',
      'Welcome! How may I assist you?'
    ],
    about: [
      'AutoFlowOS is a workflow automation platform designed to streamline business processes and boost productivity.',
      'We help businesses automate their workflows and reduce manual tasks with our intuitive platform.',
      'Our mission is to make workflow automation accessible to everyone, not just technical experts.'
    ],
    features: [
      'Our key features include workflow automation, analytics, user management, and internationalization.',
      'AutoFlowOS offers drag-and-drop workflow creation, real-time analytics, and role-based access control.',
      'We provide a comprehensive set of tools for automating your business processes.'
    ],
    pricing: [
      'We offer several pricing plans: Free, Basic, Pro, and Enterprise. Each plan has different features and limits.',
      'Our pricing starts at $0/month for the Free plan, $19/month for Basic, $49/month for Pro, and custom pricing for Enterprise.',
      'You can view detailed pricing information on our pricing page.'
    ],
    contact: [
      'You can contact us at info@autoflowos.com or through our contact form.',
      'Our support team is available Monday to Friday, 9:00 AM to 6:00 PM.',
      'Feel free to reach out with any questions or feedback!'
    ],
    help: [
      'I can help you learn about AutoFlowOS, our features, pricing, or how to get started.',
      'Ask me anything about workflow automation, our platform, or how we can help your business.',
      'Need assistance? I can guide you through our features or connect you with our support team.'
    ],
    fallback: [
      'I\'m not sure I understand. Could you rephrase that?',
      'I don\'t have information about that yet. Would you like to know about our features or pricing instead?',
      'I\'m still learning! For more detailed information, please contact our support team.'
    ]
  };
  
  constructor() {}
  
  /**
   * Add a new message to the chat
   */
  addMessage(message: Message): void {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }
  
  /**
   * Get a response from the chatbot based on user input
   */
  async getBotResponse(userInput: string): Promise<string> {
    const input = userInput.toLowerCase();
    
    // Simple intent detection
    if (this.containsAny(input, ['hi', 'hello', 'hey', 'greetings'])) {
      return this.getRandomResponse('greeting');
    } else if (this.containsAny(input, ['about', 'what is', 'tell me about', 'company'])) {
      return this.getRandomResponse('about');
    } else if (this.containsAny(input, ['features', 'what can', 'functionality', 'capabilities'])) {
      return this.getRandomResponse('features');
    } else if (this.containsAny(input, ['price', 'pricing', 'cost', 'subscription', 'plan'])) {
      return this.getRandomResponse('pricing');
    } else if (this.containsAny(input, ['contact', 'support', 'help', 'email', 'phone'])) {
      return this.getRandomResponse('contact');
    } else if (this.containsAny(input, ['help', 'assist', 'guide', 'how to'])) {
      return this.getRandomResponse('help');
    } else {
      return this.getRandomResponse('fallback');
    }
  }
  
  /**
   * Check if input contains any of the keywords
   */
  private containsAny(input: string, keywords: string[]): boolean {
    return keywords.some(keyword => input.includes(keyword));
  }
  
  /**
   * Get a random response for a given intent
   */
  private getRandomResponse(intent: string): string {
    const responses = this.responses[intent] || this.responses['fallback'];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }
  
  /**
   * Clear all messages
   */
  clearMessages(): void {
    this.messagesSubject.next([]);
  }
}
