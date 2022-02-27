import { UserMe } from "./hooks";

export interface BasicUser {
  firstName: string;
  lastName?: string;
  email: string;
  id: number;
  phoneNumbers: Phonenumber[];
  team: Team | null;
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
  id: number;
  name: string;
  cost: number;
  number: string;
  country: string;
  area: string;
  companyId: number;
  purchasedOn: Date;
  twillioId: string;
  users: UserMe[];
  teamId: number | null;
  available: boolean;
}

export type PhoneNumberDocumentStatus =
  | "UPLOADED"
  | "VERIFIED"
  | "PENDING"
  | "NOT_UPLOADED";

export type SettingsStatus = "DISABLED" | "TEXT" | "AUDIO";

export type PhoneNumberSettings = {
  id: number;
  phoneNumberId: number;
  allowRecord: boolean;
  allowPause: boolean;
  documentStatus: PhoneNumberDocumentStatus;
  greetingMsgStatus: SettingsStatus;
  greetingMsgText: string;
  greetingMsgAudio: string;
  voicemailStatus: SettingsStatus;
  voicemailText: string;
  voicemailAudio: string;
  ivrEnabled: boolean;
  ivrMessage: string;
  ivrDataTeamIds: number[];
  ivrData: any;
};

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
