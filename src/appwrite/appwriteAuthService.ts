import { ID } from "appwrite";
import { account } from "./appwriteConfig";

interface CreateUserAccount {
  email: string;
  password: string;
  name: string;
}

interface LoginUserAccount {
  email: string;
  password: string;
}

export class AppwriteAuthService {
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("createUserAccount error: ", error);

      throw error;
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      console.log("login error: ", error);

      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      console.log("getCurrentUser error: ", error);
    }

    return null;
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.log("logout error: ", error);
      throw error;
    }
  }
}

export const appwriteAuthService = new AppwriteAuthService();
