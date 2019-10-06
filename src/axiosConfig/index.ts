import axios from './axiosConfig';

// 登录接口
export const login = data => {
  return axios.post('/user/login', data);
};
