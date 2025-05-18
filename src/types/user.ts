export interface IUser {
  userId: string;
  name: string;
  userEmail: string;
  image: string;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}
