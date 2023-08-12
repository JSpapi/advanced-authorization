export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  profile?: string;
}

export type UserData = Omit<IUser, "id">;

export interface IEmail {
  username: string;
  email: string;
  text?: string;
  subject?: string | number;
}
