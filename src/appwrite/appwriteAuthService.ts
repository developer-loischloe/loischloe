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

      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();

      return Boolean(data);
    } catch (error) {
      return false;
    }
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (error) {
      console.log("getCurrentUser error: ", error);
    } finally {
      return null;
    }
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.log("logout error: ", error);
    }
  }
}

export const appwriteAuthService = new AppwriteAuthService();
