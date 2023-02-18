import { IAuthData, removeTokenStorage, saveToStorage } from './auth.helper';
import { axiosClassic } from '../api/interceptors';

export const AuthService = {
   async login(email: string, password: string) {
      const response = await axiosClassic.post<IAuthData>('/auth/login', {
         email,
         password,
      });

      if (response.data.accessToken) saveToStorage(response.data);

      return response.data;
   },

   async register(email: string, password: string) {
      const response = await axiosClassic.post<IAuthData>('/auth/register', {
         email,
         password,
      });

      if (response.data.accessToken) saveToStorage(response.data);

      return response.data;
   },

   logout() {
      removeTokenStorage();
      localStorage.removeItem('user');
   },
};
