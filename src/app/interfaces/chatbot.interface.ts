export interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export interface ChatbotResponse {
    text: string;
    intent?: string;
    confidence?: number;
}

export interface ChatbotState {
    messages: Message[];
    isTyping: boolean;
}
