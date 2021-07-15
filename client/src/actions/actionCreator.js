import ACTION from './actionTypes';

export const requestAuthRefresh = (refreshToken) => ({
  type: ACTION.AUTH_REFRESH,
  data: { refreshToken },
});

export const authActionLogin = (data) => ({
  type: ACTION.AUTH_ACTION_LOGIN,
  data,
});

export const authActionRegister = (data) => ({
  type: ACTION.AUTH_ACTION_REGISTER,
  data,
});

export const clearErrorSignUpAndLogin = () => ({
  type: ACTION.AUTH_ACTION_CLEAR_ERROR,
});

export const clearUserStore = () => ({
  type: ACTION.CLEAR_USER_STORE,
});

export const clearAddOfferError = () => ({
  type: ACTION.CLEAR_ADD_OFFER_ERROR,
});

export const clearChangeMarkError = () => ({
  type: ACTION.CLEAR_CHANGE_MARK_ERROR,
});

export const clearSetOfferStatusError = () => ({
  type: ACTION.CLEAR_SET_OFFER_STATUS_ERROR,
});

export const getUserAction = (data) => ({
  type: ACTION.GET_USER_ACTION,
  replace: data,
});

export const getDataForContest = (data) => ({
  type: ACTION.GET_DATA_FOR_CONTEST_ACTION,
  data,
});

export const clearDataForContest = () => ({ type: ACTION.CLEAR_DATA_FOR_SELECTS });

export const payRequest = (data) => ({
  type: ACTION.PAYMENT_ACTION,
  data,
});

export const getContestsForCreative = (data) => ({
  type: ACTION.GET_CONTESTS_FOR_CREATIVE,
  data,
});

export const getContestsForCustomer = (data) => ({
  type: ACTION.GET_CONTESTS_FOR_CUSTOMER,
  data,
});

export const getContestById = (data) => ({
  type: ACTION.GET_CONTEST_BY_ID_ACTION,
  data,
});

export const selectBundle = (bundle) => ({
  type: ACTION.SELECT_BUNDLE_ACTION,
  bundle,
});

export const clearBundle = () => ({
  type: ACTION.CLEAR_BUNDLE_ACTION,
});

export const updateContest = (data) => ({
  type: ACTION.UPDATE_CONTEST_ACTION,
  data,
});

export const saveContestToStore = (data) => ({
  type: ACTION.SAVE_CONTEST_TO_STORE,
  data,
});

export const changeMark = (data) => ({
  type: ACTION.CHANGE_MARK_ACTION,
  data,
});

export const setOffer = (data) => ({
  type: ACTION.SET_OFFER_ACTION,
  data,
});

export const setOfferStatus = (data) => ({
  type: ACTION.SET_OFFER_STATUS_ACTION,
  data,
});

export const createCatalog = (data) => ({
  type: ACTION.CREATE_CATALOG_REQUEST,
  data,
});

export const updateUserData = (data) => ({
  type: ACTION.UPDATE_USER_DATA,
  data,
});

export const cashOut = (data) => ({
  type: ACTION.CASHOUT_ACTION,
  data,
});

export const clearContestList = () => ({
  type: ACTION.CLEAR_CONTESTS_LIST,
});

export const onlyForNotAuthorize = (data) => ({
  type: ACTION.ONLY_FOR_NOT_AUTHORIZE_USERS,
  replace: data,
});

export const headerRequest = () => ({
  type: ACTION.HEADER_REQUEST_AUTHORIZE,
});

export const clearAuth = () => ({
  type: ACTION.AUTH_ACTION_CLEAR,
});

export const getPreviewChat = () => ({
  type: ACTION.GET_PREVIEW_CHAT_ASYNC,
});

export const backToDialogList = () => ({
  type: ACTION.BACK_TO_DIALOG_LIST,
});

export const goToExpandedDialog = (data) => ({
  type: ACTION.GO_TO_EXPANDED_DIALOG,
  data,
});

export const getDialogMessages = (data) => ({

  type: ACTION.GET_DIALOG_MESSAGES_ASYNC,
  data,
});

export const sendMessageAction = (data) => ({
  type: ACTION.SEND_MESSAGE_ACTION,
  data,
});

export const addMessage = (data) => ({
  type: ACTION.SEND_MESSAGE,
  data,
});

export const clearMessageList = () => ({
  type: ACTION.CLEAR_MESSAGE_LIST,
});

export const changeChatShow = () => ({
  type: ACTION.CHANGE_CHAT_SHOW,
});

export const setNewCustomerFilter = (filter) => ({
  type: ACTION.SET_NEW_CUSTOMER_FILTER,
  filter,
});

export const setNewCreatorFilter = (filter) => ({
  type: ACTION.SET_NEW_CREATOR_FILTER,
  filter,
});

export const setPreviewChatMode = (mode) => ({
  type: ACTION.SET_CHAT_PREVIEW_MODE,
  mode,
});

export const changeChatFavorite = (data) => ({
  type: ACTION.SET_CHAT_FAVORITE_FLAG,
  data,
});

export const changeChatBlock = (data) => ({
  type: ACTION.SET_CHAT_BLOCK_FLAG,
  data,
});

export const changeBlockStatusInStore = (data) => ({
  type: ACTION.CHANGE_CHAT_BLOCK,
  data,
});

export const getCatalogList = (data) => ({
  type: ACTION.GET_CATALOG_LIST_ASYNC,
  data,
});

export const changeShowModeCatalog = (data) => ({
  type: ACTION.CHANGE_SHOW_MODE_CATALOG,
  data,
});

export const changeTypeOfChatAdding = (data) => ({
  type: ACTION.CHANGE_TYPE_ADDING_CHAT_IN_CATALOG,
  data,
});

export const changeShowAddChatToCatalogMenu = (data) => ({
  type: ACTION.CHANGE_SHOW_ADD_CHAT_TO_CATALOG,
  data,
});

export const addChatToCatalog = (data) => ({
  type: ACTION.ADD_CHAT_TO_CATALOG_ASYNC,
  data,
});

export const deleteCatalog = (data) => ({
  type: ACTION.DELETE_CATALOG_REQUEST,
  data,
});

export const removeChatFromCatalog = (data) => ({
  type: ACTION.REMOVE_CHAT_FROM_CATALOG_REQUEST,
  data,
});

export const changeRenameCatalogMode = () => ({
  type: ACTION.CHANGE_RENAME_CATALOG_MODE,
});

export const changeCatalogName = (data) => ({
  type: ACTION.CHANGE_CATALOG_NAME_REQUEST,
  data,
});

export const changeEditContest = (data) => ({
  type: ACTION.CHANGE_EDIT_CONTEST,
  data,
});

export const changeContestViewMode = (data) => ({
  type: ACTION.CHANGE_CONTEST_VIEW_MODE,
  data,
});

export const changeShowImage = (data) => ({
  type: ACTION.CHANGE_SHOW_IMAGE,
  data,
});

export const changeFocusOnCard = (data) => ({
  type: ACTION.CHANGE_FOCUS_ON_CARD,
  data,
});

export const changeProfileModeView = (data) => ({
  type: ACTION.CHANGE_PROFILE_MODE_VIEW,
  data,
});

export const changeEditModeOnUserProfile = (data) => ({
  type: ACTION.CHANGE_EDIT_MODE_ON_USER_PROFILE,
  data,
});

export const clearPaymentStore = () => ({
  type: ACTION.CLEAR_PAYMENT_STORE,
});

export const clearUpdateContestStore = () => ({
  type: ACTION.CLEAR_UPDATE_CONTEST_STORE,
});

export const clearUserError = () => ({
  type: ACTION.CLEAR_USER_ERROR,
});

export const clearChatError = () => ({
  type: ACTION.CLEAR_CHAT_ERROR,
});

export const changeModalShow = (data) => ({
  type: ACTION.CHANGE_SHOW_MODAL,
  data,
});

export const createEvent = (event) => ({
  type: ACTION.CREATE_EVENT,
  data: event,
});

export const getEvents = (events) => ({
  type: ACTION.GET_EVENTS,
  data: events,
});

export const deleteEvent = (id) => ({
  type: ACTION.DELETE_EVENT,
  data: id,
});

export const eventError = (err) => ({
  type: ACTION.ERROR_EVENT,
  err,
});

export const changePassword = (data) => ({
  type: ACTION.AUTH_ACTION_CHANGE_PASSWORD,
  data,
});

export const getModeratorOffers = (data) => ({
  type: ACTION.GET_MODERATOR_OFFERS,
  data,
});

export const updateUserPassword = (data) => ({
  type: ACTION.AUTH_ACTION_UPDATE_PASSWORD,
  data,
});

export const setModeratorOfferStatus = (data) => ({
  type: ACTION.SET_MODERATOR_OFFER_STATUS,
  data,
});
