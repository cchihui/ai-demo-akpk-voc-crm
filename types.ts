export type SubmitterType = 'Individual' | 'Organization';

export interface FormData {
  submitterType: SubmitterType;
  name: string;
  idType: string;
  idNumber: string;
  email: string;
  phone: string;
  mailingAddress: string;
  description: string;
}