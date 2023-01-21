import {UserProfile} from 'src/utils/shared.types';
import apiClient from '../client/ApiClient';

const getEthnicGroups = () => {
  return apiClient.get(`/api/app/profile/ethnic-group/`);
};

const getListOfethnicGroups = (id: number) => {
  return apiClient.get(`/api/app/profile/ethnicity/${id}`);
};

const fetchOtherPersions = () => {
  return apiClient.get(`/api/app/profile/other`);
};

const fetchPassions = () => {
  return apiClient.get(`/api/app/profile/passion`);
};

const fetchLanguages = () => {
  return apiClient.get(`/api/app/profile/language`);
};

const createUser = (data: UserProfile) => {
  return apiClient.post(`/auth/register`, data);
};

const loginUser = (data: {username: string; password: string}) => {
  return apiClient.post(`/auth/login`, data);
};

const updatePassword = (data: {username: string}) => {
  return apiClient.put(`/auth/forgot-password`, data);
};

const createNewPassword = (data: {
  userId: number;
  resetToken: string;
  password: string;
}) => {
  return apiClient.put(`/auth/reset-password`, data);
};

const checkEmailAvailability = (username: string) => {
  return apiClient.get(`/auth/validate-email?email=${username}`);
};

const checkNameAvailability = (username: string) => {
  return apiClient.get(`/auth/validate-username?username=${username}`);
};

const checkPhoneAvailability = (username: string) => {
  return apiClient.get(`/auth/validate-phone?phone=${username}`);
};

const notificationTokenPost = (data: {token: string}) => {
  return apiClient.post('/api/user/me/firebase-message-token', data);
};

export default {
  getEthnicGroups,
  getListOfethnicGroups,
  fetchOtherPersions,
  fetchPassions,
  fetchLanguages,
  createUser,
  loginUser,
  updatePassword,
  createNewPassword,
  checkEmailAvailability,
  checkNameAvailability,
  checkPhoneAvailability,
  notificationTokenPost,
};
