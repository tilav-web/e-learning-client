import { privateInstance } from "@/common/api/client-api";
import { API } from "@/common/api/endpoints";

class AuthService {
  async login({ uid, password }: { uid: string; password: string }) {
    try {
      const res = await privateInstance.post(API.LOGIN, { uid, password });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async findMe() {
    try {
      const res = await privateInstance.get(API.FINDME);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async logout() {
    try {
      const res = await privateInstance.get(API.LOGOUT);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const authService = new AuthService();
