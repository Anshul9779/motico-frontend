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

export {};
