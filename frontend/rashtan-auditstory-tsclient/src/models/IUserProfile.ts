export enum UserStatus {
  Paid = 0,
  Expired = 1,
  Trial = 2,
  New = 3
}

export interface IUserProfile {
  status: UserStatus;
}
