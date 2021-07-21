export interface BasicUser {
  firstName: string;
  lastName?: string;
  email: string;
  id: string;
  phoneNumbers: string[];
}

export interface LoginPayload extends BasicUser {
  issuedAt: number;
  token: string;
  validTime: number;
  roles: string[];
  companyId: string;
}

export interface Phonenumber {
  area: string;
  assignedTo: string[];
  available: boolean;
  company: string;
  number: string;
  cost: number;
  country: string;
  isRecording: boolean;
  name: string;
  purchasedOn: number;
  twillioId: string;
  voiceMail: boolean;
  _id: string;
}

export interface Country {
  name: string;
  code: string;
  imagePath: string;
}

export interface AvailablePhoneNumber {
  addressRequirements: string;
  beta: boolean;
  capabilities: {
    mms: boolean;
    sms: boolean;
    voice: boolean;
  };
  friendlyName: string;
  isoCountry: Country["code"];
  lata: string;
  latitude: string;
  locality: string;
  longitude: string;
  phoneNumber: string;
  postalCode: string;
  rateCenter: string;
  region: string;
}

export interface Team {
  id: string;
  name: string;
  numUsers: number;
}

export {};
