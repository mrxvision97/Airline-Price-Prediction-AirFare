export interface AirlineFormData {
  booking_date: string;
  journey_date: string;
  airline: string;
  source: string;
  destination: string;
  travel_class: string;
  stops: number;
  departure_hour: number;
  arrival_hour: number;
}

export interface PredictionResponse {
  fare: number;
}

export const AIRLINES = [
  'IndiGo',
  'Air India',
  'SpiceJet',
  'Vistara',
  'GoAir'
] as const;

export const CITIES = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Kolkata',
  'Chennai',
  'Ahmedabad'
] as const;

export const TRAVEL_CLASSES = [
  'Economy',
  'Business',
  'First'
] as const;

export const AIRLINE_WEBSITES = {
  'IndiGo': 'https://www.goindigo.in/',
  'Air India': 'https://www.airindia.in/',
  'SpiceJet': 'https://www.spicejet.com/',
  'Vistara': 'https://www.airvistara.com/',
  'GoAir': 'https://www.flygofirst.com/'
} as const;