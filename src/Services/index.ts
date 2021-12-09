import axios from 'axios';
import Config from 'react-native-config';
import handleError from '@/Services/utils/handleError';

const instance = axios.create({
  baseURL: Config.CS_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

instance.interceptors.response.use(
  (response) => response,
  ({ message, response: { data, status } }) => handleError({ message, data, status }),
);

export default instance;
