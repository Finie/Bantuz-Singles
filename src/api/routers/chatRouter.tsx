import apiClient from '../client/ApiClient';

const getMessageChatRooms = () => {
  return apiClient.get(`/api/conversation?page=1&pageSize=10`);
};

const getIndividualMessages = (
  username: string,
  page: number,
  pageSize: number,
) => {
  return apiClient.get(
    `/api/message?username=${username}&page=${page}&pageSize=${pageSize}`,

    // `/api/message?username=kate&page=1&pageSize=100`,
  );
};

export default {
  getMessageChatRooms,
  getIndividualMessages,
};
