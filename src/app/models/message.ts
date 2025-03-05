export class Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp?: Date;
  
    constructor(text: string, sender: 'user' | 'bot', timestamp?: Date) {
      this.text = text;
      this.sender = sender;
      this.timestamp = timestamp;
    }
  }
  