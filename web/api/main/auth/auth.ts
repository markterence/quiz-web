import httpClient from '../http-client';

export default class AuthApi {
  login(data: { email?: string; username: string; password?: string }) {
    return httpClient.post('/auth/v2/login', data);
  }

  session(data?: any) {
    return httpClient.post('/auth/v2/session', data);
  }
}
