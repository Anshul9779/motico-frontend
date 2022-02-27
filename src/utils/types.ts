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
  phoneNumber: string;
  reciveUpdates: boolean;
  missedCallAlert: boolean;
  voicemailAlert: boolean;
  dashboard: boolean;
  dialler: boolean;
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

export type TeamCallType = "SIMULTANEOUSLY" | "FIRST_ORDER" | "ROUND_ROBIN";

export interface Team {
  id: number;
  name: string;
  companyId: number;
  callType: TeamCallType;
  createdAt: Date;
}

export {};

type Status = "DISABLED" | "TEXT" | "AUDIO";
export interface PhoneSettings {
  callQueing: boolean;
  canPause: boolean;
  canRecord: boolean;
  documentStatus: "UPLOADED" | "VERIFIED" | "PENDING" | "NOT_UPLOADED";
  greetingMessageInfo: string;
  greetingMessageStatus: Status;
  ivrData: string;
  ivrInfo: string;
  ivrStatus: Status;
  phoneNumber: Phonenumber;
  voiceMailInfo: string;
  voiceMailStatus: Status;
  _id: string;
}

export interface CallRecord {
  id: string;
  callSid: string;
  isActive: boolean;
  startTime: number;
  endTime: number;
  from: string;
  to: string;
  user: BasicUser;
  type: "OUTGOING" | "INCOMING" | "MISSED";
  company: string;
}
