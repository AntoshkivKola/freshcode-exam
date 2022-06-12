import httpClient from '.';

export const setNewOffer = (data) => httpClient.post(`/contest/${data.get('contestId')}/offer`, data);
export const setOfferStatus = (data) => httpClient.post('setOfferStatus', data);
export const changeMark = (data) => httpClient.post('changeMark', data);

export const payMent = (data) => httpClient.post('pay', data.formData);
export const cashOut = (data) => httpClient.post('cashout', data);
export const updateUser = (data) => httpClient.put('user', data);

export const getPreviewChat = () => httpClient.post('getPreview');
export const getDialog = (data) => httpClient.post('getChat', data);
export const newMessage = (data) => httpClient.post('newMessage', data);
export const changeChatFavorite = (data) => httpClient.post('favorite', data);
export const changeChatBlock = (data) => httpClient.post('blackList', data);
export const getCatalogList = (data) => httpClient.post('getCatalogs', data);
export const addChatToCatalog = (data) => httpClient.post('addNewChatToCatalog', data);
export const createCatalog = (data) => httpClient.post('createCatalog', data);
export const deleteCatalog = (data) => httpClient.post('deleteCatalog', data);
export const removeChatFromCatalog = (data) => httpClient.post('removeChatFromCatalog', data);
export const changeCatalogName = (data) => httpClient.post('updateNameCatalog', data);

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

export const getOffers = (data) => httpClient.post('getOffers', data);
export const banOrPandingOffer = (data) => httpClient.post('banOrPandingOffer', data);
