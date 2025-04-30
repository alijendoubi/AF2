import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ChatbotService } from '../../services/chatbot.service';
import { Message } from '../../interfaces/chatbot.interface';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  template: `
    <div class="chatbot-container" [class.chatbot-open]="isOpen">
      <!-- Chat Header -->
      <div class="chatbot-header" (click)="toggleChat()">
        <div class="d-flex align-items-center">
          <i class="bi bi-chat-dots-fill me-2"></i>
          <span>{{ 'CHATBOT.TITLE' | translate }}</span>
        </div>
        <button class="btn-close btn-close-white" *ngIf="isOpen"></button>
      </div>
      
      <!-- Chat Body -->
      <div class="chatbot-body" *ngIf="isOpen">
        <div class="messages-container" #messagesContainer>
          <div *ngFor="let message of messages" 
               class="message" 
               [ngClass]="{'user-message': message.sender === 'user', 'bot-message': message.sender === 'bot'}">
            <div class="message-content">
              <div *ngIf="message.sender === 'bot'" class="bot-avatar">
                <i class="bi bi-robot"></i>
              </div>
              <div class="message-text">
                {{ message.text }}
              </div>
            </div>
            <div class="message-time">
              {{ message.timestamp | date:'shortTime' }}
            </div>
          </div>
          
          <div *ngIf="isTyping" class="message bot-message">
            <div class="message-content">
              <div class="bot-avatar">
                <i class="bi bi-robot"></i>
              </div>
              <div class="message-text typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Input Area -->
        <div class="input-container">
          <input 
            type="text" 
            class="form-control" 
            [(ngModel)]="userInput" 
            (keyup.enter)="sendMessage()"
            [placeholder]="'CHATBOT.INPUT_PLACEHOLDER' | translate"
            [disabled]="isTyping"
          >
          <button 
            class="btn btn-primary send-button" 
            (click)="sendMessage()" 
            [disabled]="!userInput.trim() || isTyping"
          >
            <i class="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
      
      <!-- Chat Button (when closed) -->
      <div class="chat-button" *ngIf="!isOpen" (click)="toggleChat()">
        <i class="bi bi-chat-dots-fill"></i>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .chatbot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      overflow: hidden;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transform: scale(1);
      }
      50% {
        box-shadow: 0 4px 30px rgba(38, 150, 173, 0.4);
        transform: scale(1.05);
      }
      100% {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transform: scale(1);
      }
    }
    
    .chatbot-open {
      width: 350px;
      height: 500px;
      border-radius: 16px;
      overflow: hidden;
    }
    
    .chatbot-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
      color: white;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .chatbot-body {
      display: flex;
      flex-direction: column;
      height: calc(100% - 56px);
      background-color: #f8f9fa;
    }
    
    .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .message {
      max-width: 80%;
      padding: 10px 15px;
      border-radius: 18px;
      margin-bottom: 5px;
      word-wrap: break-word;
    }
    
    .user-message {
      align-self: flex-end;
      background-color: var(--bs-primary);
      color: white;
      border-bottom-right-radius: 5px;
    }
    
    .bot-message {
      align-self: flex-start;
      background-color: #e9ecef;
      color: #212529;
      border-bottom-left-radius: 5px;
    }
    
    .message-content {
      display: flex;
      align-items: flex-start;
    }
    
    .bot-avatar {
      width: 30px;
      height: 30px;
      background-color: var(--bs-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      margin-right: 10px;
      flex-shrink: 0;
    }
    
    .message-text {
      line-height: 1.4;
    }
    
    .message-time {
      font-size: 0.7rem;
      opacity: 0.7;
      margin-top: 5px;
      text-align: right;
    }
    
    .input-container {
      display: flex;
      padding: 10px;
      background-color: white;
      border-top: 1px solid #dee2e6;
    }
    
    .input-container .form-control {
      border-radius: 20px;
      padding-right: 50px;
    }
    
    .send-button {
      margin-left: -45px;
      z-index: 1;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .chat-button {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--bs-primary) 0%, #6f42c1 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2.5rem;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease;
      animation: pulse 2s infinite;
    }
    
    .chat-button:hover {
      transform: scale(1.1);
      animation: none;
    }
    
    /* Typing indicator */
    .typing-indicator {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      min-height: 20px;
    }
    
    .typing-indicator span {
      height: 8px;
      width: 8px;
      float: left;
      margin: 0 1px;
      background-color: #9E9EA1;
      display: block;
      border-radius: 50%;
      opacity: 0.4;
    }
    
    .typing-indicator span:nth-of-type(1) {
      animation: 1s blink infinite 0.3333s;
    }
    
    .typing-indicator span:nth-of-type(2) {
      animation: 1s blink infinite 0.6666s;
    }
    
    .typing-indicator span:nth-of-type(3) {
      animation: 1s blink infinite 0.9999s;
    }
    
    @keyframes blink {
      50% {
        opacity: 1;
      }
    }
    
    /* Dark theme support */
    :host-context(.dark-theme) {
      .chatbot-body {
        background-color: #2b2b2b;
      }
      
      .bot-message {
        background-color: #3a3a3a;
        color: #e9ecef;
      }
      
      .input-container {
        background-color: #333333;
        border-top: 1px solid #444444;
      }
      
      .input-container .form-control {
        background-color: #444444;
        color: #e9ecef;
        border-color: #555555;
      }
      
      .input-container .form-control::placeholder {
        color: #adb5bd;
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 576px) {
      .chatbot-open {
        width: calc(100vw - 40px);
        height: 60vh;
        bottom: 10px;
        right: 10px;
      }
    }
  `]
})
export class ChatbotComponent implements OnInit {
  private chatbotService = inject(ChatbotService);
  private platformId = inject(PLATFORM_ID);
  
  isOpen = false;
  messages: Message[] = [];
  userInput = '';
  isTyping = false;
  
  ngOnInit(): void {
    // Add entrance animation
    this.addEntranceAnimation();
    
    // Add initial welcome message
    setTimeout(() => {
      this.addBotMessage('CHATBOT.WELCOME_MESSAGE');
    }, 1500);
    
    // Subscribe to messages from the service
    this.chatbotService.messages$.subscribe(messages => {
      this.messages = messages;
      this.scrollToBottom();
    });
  }
  
  toggleChat(): void {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen && this.messages.length === 0) {
      this.addBotMessage('CHATBOT.WELCOME_MESSAGE');
    }
    
    // Scroll to bottom when opening chat
    if (this.isOpen) {
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }
  }
  
  sendMessage(): void {
    const message = this.userInput.trim();
    if (!message || this.isTyping) return;
    
    // Add user message
    this.chatbotService.addMessage({
      text: message,
      sender: 'user',
      timestamp: new Date()
    });
    
    // Clear input
    this.userInput = '';
    
    // Show typing indicator
    this.isTyping = true;
    
    // Get bot response
    setTimeout(() => {
      this.chatbotService.getBotResponse(message).then(response => {
        this.isTyping = false;
        this.chatbotService.addMessage({
          text: response,
          sender: 'bot',
          timestamp: new Date()
        });
      });
    }, 1000);
  }
  
  private addBotMessage(text: string): void {
    this.chatbotService.addMessage({
      text: text,
      sender: 'bot',
      timestamp: new Date()
    });
  }
  
  private scrollToBottom(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const messagesContainer = document.querySelector('.messages-container');
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 100);
    }
  }
  
  private addEntranceAnimation(): void {
    // Only run animation in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Add a class to trigger the entrance animation
      const chatbotContainer = document.querySelector('.chatbot-container');
      if (chatbotContainer) {
        // First make it invisible
        (chatbotContainer as HTMLElement).style.opacity = '0';
        (chatbotContainer as HTMLElement).style.transform = 'translateY(20px) scale(0.8)';
        
        // Then animate it in
        setTimeout(() => {
          (chatbotContainer as HTMLElement).style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
          (chatbotContainer as HTMLElement).style.opacity = '1';
          (chatbotContainer as HTMLElement).style.transform = 'translateY(0) scale(1)';
        }, 300);
      }
    }
  }
}
