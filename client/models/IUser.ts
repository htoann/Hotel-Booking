export interface IUser {
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  wishlist: Array<string>;
  __v: number;
}
