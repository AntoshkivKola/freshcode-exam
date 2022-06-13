import httpClient from '.';

export const setNewOffer = (data) => httpClient.post(`/contest/${data.get('contestId')}/offer`, data);
export const setOfferStatus = (data) => httpClient.post(`offer/${data.offerId}/status`, data);
export const changeMark = (data) => httpClient.put(`offer/${data.offerId}/mark`, data);

export const payMent = (data) => httpClient.post('pay', data.formData);
export const cashOut = (data) => httpClient.post('cashout', data);
export const updateUser = (data) => httpClient.put('user', data);

export const getPreviewChat = () => httpClient.get('chat/preview');
export const getDialog = (data) => httpClient.get('chat', {
  params: data
});
export const newMessage = (data) => httpClient.post('message', data);
export const changeChatFavorite = (data) => httpClient.post('favorite', data);
export const changeChatBlock = (data) => httpClient.post('blacklist', data);
export const getCatalogList = () => httpClient.get('catalogs');
export const addChatToCatalog = (data) => httpClient.post(`catalog/${data.catalogId}/chat/${data.chatId}`, data);
export const createCatalog = (data) => httpClient.post('catalog', data);
export const deleteCatalog = (data) => httpClient.delete(`catalog/${data.catalogId}`);
export const removeChatFromCatalog = (data) => httpClient.delete(`catalog/${data.catalogId}/chat/${data.chatId}`);
export const changeCatalogName = (data) => httpClient.put(`catalog/${data.catalogId}`, data);

export const updateContest = (data) => httpClient.put(`contest/${data.get('contestId')}`, data);
export const downloadContestFile = (data) => httpClient.get(`downloadFile/${data.fileName}`);
export const dataForContest = (data) => httpClient.get('contests_data', {
  params: data
});
export const getCustomersContests = (data) => httpClient.get('/customer/contests', {
  params: {
    limit: data.limit, offset: data.offset
  },
  headers: {
    status: data.contestStatus,
  },
});

export const getActiveContests = ({
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
}) => httpClient.get('creative/contests', {
  params: {
    offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
  }
});

export const getContestById = (data) => httpClient.get(`contest/${data.contestId}`);

export const getOffers = (data) => httpClient.get('offers', { params: data });
export const banOrPandingOffer = (data) => httpClient.post('moderate_offer', data);
