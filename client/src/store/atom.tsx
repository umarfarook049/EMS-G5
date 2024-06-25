import { atom } from "recoil";

interface User {
  UserID: number;
  UserCode: string;
  FirstName: string;
  Email: string;
  IsAdmin: boolean;
}

export const userInfo = atom<User | null>({
  key: "userInfo",
  default: null,
});
