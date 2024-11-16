import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone?: string;
  primaryJurisdiction: string;
  registrationNumber?: string;
  officeAddress: string;
  teamSize: number;
  website?: string;
  linkedIn?: string;
  yearsOfExperience: number;
  specialtyAreas: string[];
  status: 'pending' | 'approved' | 'rejected';
  role: 'user' | 'admin';
  profilePicture?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}