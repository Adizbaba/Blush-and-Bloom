/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ServiceCategory = 'Hair Styling' | 'Colouring' | 'Bridal' | 'Event Makeup' | 'Beauty Treatments';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  price: string;
  duration: string;
  description: string;
  badge?: string;
  features: string[];
}

export interface Artist {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  rating: number;
}

export interface Review {
  id: string;
  author: string;
  stars: number;
  date: string;
  text: string;
  service: string;
}

export interface BookingState {
  selectedServices: ServiceItem[];
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  dietaryOrNotes: string;
  bookingStep: 'services' | 'datetime' | 'details' | 'success';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
    description?: string;
  }[];
}
