export interface UserInfoDto {
  name: string;
  email: string;
  city: string;
  state: string;
  country: string;
  agreement: boolean;
}

export enum PaymentStatus {
  New = 0,
  Paying = 1,
  Expired = 2,
}

export interface UserStatusDto {
  status: PaymentStatus;
  message: string;
}

export interface PaymentPlanDto {
  title: string;
  favourite: boolean;
  amount: number;
  months: number;
}

export interface PaymentToProcessDto {
  amount: number;
  months: number;
  nonce: string;
}
