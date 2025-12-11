import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  priceRange?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum PageView {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  CONTACT = 'CONTACT',
  ABOUT = 'ABOUT',
  FAQ = 'FAQ'
}