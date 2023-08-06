export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  profile?: string;
}

export type UserData = Omit<IUser, "id">;
