import httpClient from './http-client';
import AuthApi from './auth';

class Api {
  auth = new AuthApi();
  httpClient = httpClient;
}
export default new Api();
