import EncryptionStore from 'src/data/EncryptionStore';
import apiClient from '../client/ApiClient';

const findMyMatches = (data: {page: number; pagesize: number}) => {
  return apiClient.get(
    `/api/match?page=${data.page}&pageSize=${data.pagesize}`,
  );
};

const getCurrentAccounts = () => {
  return apiClient.get(`/api/user/me`);
};

const exploreMatches = (data: {
  ageRange: any;
  distanceRange: any;
  page: any;
  pageSize: any;
}) => {
  const {ageRange, distanceRange, page, pageSize} = data;
  return apiClient.get(
    `/api/user/explore?ageRange=${ageRange}&distanceRange=${distanceRange}&page=${page}&pageSize=${pageSize}`,
  );
};

const postaMatchedUser = (data: {username: string; status: string}) => {
  return apiClient.post(`/api/swipe`, data);
};

const searchUsersByFlags = (data: {
  minAge: number;
  maxAge: number;
  minDistane: number;
  maxDistance: number;
  other: string;
  passion: string;
  longitude: number;
  latitude: number;
  page: number;
  pageSize: number;
}) => {
  return apiClient.get(
    `/api/user/explore?myLatitude=${data.latitude}&myLongitude=${data.longitude}&ageRange=${data.minAge}-${data.maxAge}&distanceRange=${data.minDistane}-${data.maxDistance}${data.passion}${data.other}&page=${data.page}&pageSize=${data.pageSize}`,
  );
};

const updateProfilePic = (
  data: {
    encoded_file: string;
    name: string;
    type: string;
    is_default: boolean;
  }[],
) => {
  return apiClient.post(`/api/user/media`, data);
};

export default {
  findMyMatches,
  getCurrentAccounts,
  exploreMatches,
  postaMatchedUser,
  searchUsersByFlags,
  updateProfilePic,
};
