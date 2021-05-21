export interface BasicUser {
  firstName: string;
  lastName?: string;
  email: string;
  id: string;
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
  assignedTo: [];
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

export {};
