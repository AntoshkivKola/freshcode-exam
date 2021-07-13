import httpClient from './';

export const setNewOffer = data => httpClient.post('setNewOffer', data);
export const setOfferStatus = data => httpClient.post('setOfferStatus', data);
export const changeMark = (data) => httpClient.post('changeMark', data);

export const payMent = (data) => httpClient.post('pay', data.formData);
export const cashOut = (data) => httpClient.post('cashout', data);
export const updateUser = (data) => httpClient.post('updateUser', data);

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

export const updateContest = data => httpClient.post('updateContest', data);
export const downloadContestFile = (data) => httpClient.get('downloadFile/' + data.fileName);
export const dataForContest = (data) => httpClient.post('dataForContest', data);
export const getCustomersContests = (data) => {
    return httpClient.post('getCustomersContests', {limit: data.limit, offset: data.offset}, {
        headers: {
            status: data.contestStatus
        }
    });
};

export const getActiveContests = ({offset, limit, typeIndex, contestId, industry, awardSort, ownEntries}) => {
    return httpClient.post('getAllContests', {offset, limit, typeIndex, contestId, industry, awardSort, ownEntries})
};

export const getContestById = (data) => {
    return httpClient.get('getContestById', {
        headers: {
            contestId: data.contestId
        }
    });
};

export const getOffers = (data) => httpClient.post('getOffers', data);
export const banOrPandingOffer = (data) => httpClient.post('banOrPandingOffer', data);









