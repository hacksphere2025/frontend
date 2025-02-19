export enum LoginType {
  Buyer,
  Seller,
  Common,
}
export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNo: string;
  loginType: LoginType;
  session: SidebarSession[];
}

export interface SidebarSession {
  _id: string;
  title: string;
  time: Date;
}
