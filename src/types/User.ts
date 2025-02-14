export interface User {
  id: string;
  userName: string;
  email: string;
  phoneNo: string;
  session: SidebarSession[];
}

export interface SidebarSession {
  _id: string;
  title: string;
  time: Date;
}
