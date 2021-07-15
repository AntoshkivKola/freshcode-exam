import axios from 'axios';
import CONTANTS from '../../constants';
import AuthApi from './AuthApi';

const httpClient = axios.create({
  baseURL: CONTANTS.BASE_URL,
});

export const auth = new AuthApi(httpClient);

export default httpClient;
