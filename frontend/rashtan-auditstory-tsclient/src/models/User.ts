export interface UserModel {
  userId: string;
  name: string | null;
  email: string | null;
  emailVerified: boolean;
  getIdToken(forceRefresh?: boolean): Promise<string | undefined>;
  sendEmailVerification(code: string | null): Promise<void>;
}

export interface RegisterDataDto {
  name: string;
  email: string;
  password: string;
}
