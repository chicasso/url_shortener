export interface IUser {
  email: string;
  userName: string;
  password: string;
  countryCode: string;
  phoneNumber: string;
  subscriptionId: string;
  profileUrl: string;
  profileIcon: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
