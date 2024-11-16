import { Timestamp } from 'firebase/firestore';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  clientName: string;
  startDate: Timestamp;
  endDate?: Timestamp;
  budget?: number;
  team: string[];
  documents: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface JurisdictionUpdate {
  id: string;
  jurisdiction: string;
  title: string;
  description: string;
  type: 'regulation' | 'compliance' | 'legal';
  importance: 'high' | 'medium' | 'low';
  date: Timestamp;
  link?: string;
}

export interface Content {
  id: string;
  title: string;
  body: string;
  status: 'draft' | 'published' | 'scheduled';
  publishDate?: Timestamp;
  tags: string[];
  authorId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface MarketingStats {
  id: string;
  month: string;
  reach: number;
  engagement: number;
  roi: number;
  conversionRate: number;
  leads: number;
}

export interface ClientRequirement {
  id: string;
  title: string;
  description: string;
  jurisdiction: string;
  industry: string;
  budget?: number;
  timeline: string;
  status: 'open' | 'in-progress' | 'closed';
  partnerId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'network';
    showEmail: boolean;
    showPhone: boolean;
  };
  theme: {
    mode: 'light' | 'dark' | 'system';
    color: string;
  };
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  link?: string;
  createdAt: Timestamp;
}