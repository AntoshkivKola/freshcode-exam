import ACTION from './actionTypes';

export const requestAuthRefresh = (refreshToken)=>({
    type: ACTION.AUTH_REFRESH,
    data: { refreshToken },
})

export const authActionLogin = (data) => {
    return {
        type: ACTION.AUTH_ACTION_LOGIN,
        data: data
    }
};

export const authActionRegister = (data) => {
    return {
        type: ACTION.AUTH_ACTION_REGISTER,
        data: data
    }
};

export const clearErrorSignUpAndLogin = () => {
    return {
        type: ACTION.AUTH_ACTION_CLEAR_ERROR
    }
};

export const clearUserStore = () => {
    return {
        type: ACTION.CLEAR_USER_STORE
    }
};

export const clearAddOfferError = () => {
    return {
        type: ACTION.CLEAR_ADD_OFFER_ERROR
    }
};


export const clearChangeMarkError = () => {
    return {
        type: ACTION.CLEAR_CHANGE_MARK_ERROR
    }
};

export const clearSetOfferStatusError = () => {
    return {
        type: ACTION.CLEAR_SET_OFFER_STATUS_ERROR
    }
};

export const getUserAction = (data) => {
    return {
        type: ACTION.GET_USER_ACTION,
        replace: data
    }
};


export const getDataForContest = (data) => {
    return {
        type: ACTION.GET_DATA_FOR_CONTEST_ACTION,
        data: data
    }
};

export const clearDataForContest = () => ({type: ACTION.CLEAR_DATA_FOR_SELECTS});


export const payRequest = (data) => {
    return {
        type: ACTION.PAYMENT_ACTION,
        data: data
    }
};


export const getContestsForCreative = (data) => {
    return {
        type: ACTION.GET_CONTESTS_FOR_CREATIVE,
        data: data
    }
};


export const getContestsForCustomer = (data) => {
    return {
        type: ACTION.GET_CONTESTS_FOR_CUSTOMER,
        data: data
    }
};


export const getContestById = (data) => {
    return {
        type: ACTION.GET_CONTEST_BY_ID_ACTION,
        data: data
    }
};


export const selectBundle = (bundle) => {
    return {
        type: ACTION.SELECT_BUNDLE_ACTION,
        bundle: bundle
    }
};

export const clearBundle = () => {
    return {
        type: ACTION.CLEAR_BUNDLE_ACTION
    }
};




export const updateContest = (data) => {
    return {
        type: ACTION.UPDATE_CONTEST_ACTION,
        data: data
    }
};




export const saveContestToStore = (data) => {
    return {
        type: ACTION.SAVE_CONTEST_TO_STORE,
        data: data
    }
};


export const changeMark = (data) => {
    return {
        type: ACTION.CHANGE_MARK_ACTION,
        data: data
    }
};


export const setOffer = (data) => {
    return {
        type: ACTION.SET_OFFER_ACTION,
        data: data
    }
};

export const setOfferStatus = (data) => {
    return {
        type: ACTION.SET_OFFER_STATUS_ACTION,
        data: data
    }
};


export const createCatalog=(data)=>{
    return{
        type: ACTION.CREATE_CATALOG_REQUEST,
        data: data
    }
};

export const updateUserData = (data) => {
    return {
        type: ACTION.UPDATE_USER_DATA,
        data: data
    }
};




export const cashOut = (data) => {
    return {
        type: ACTION.CASHOUT_ACTION,
        data: data
    }
};

export const clearContestList = () => {
    return {
        type: ACTION.CLEAR_CONTESTS_LIST
    }
};


export const onlyForNotAuthorize = (data) => {
    return {
        type: ACTION.ONLY_FOR_NOT_AUTHORIZE_USERS,
        replace: data
    }
};

export const headerRequest = () => {
    return {
        type: ACTION.HEADER_REQUEST_AUTHORIZE
    }
};

export const clearAuth = () => {
    return {
        type: ACTION.AUTH_ACTION_CLEAR
    }
};


export const getPreviewChat = () => {
    return {
        type: ACTION.GET_PREVIEW_CHAT_ASYNC
    }
};

export const backToDialogList = () => {
    return {
        type: ACTION.BACK_TO_DIALOG_LIST
    }
};

export const goToExpandedDialog = (data) => {
    return {
        type: ACTION.GO_TO_EXPANDED_DIALOG,
        data: data
    }
};

export const getDialogMessages = (data) => {
    return {

        type: ACTION.GET_DIALOG_MESSAGES_ASYNC,
        data: data
    }
};

export const sendMessageAction = (data) => {
    return {
        type: ACTION.SEND_MESSAGE_ACTION,
        data: data
    }
};

export const addMessage = (data) => {
    return {
        type: ACTION.SEND_MESSAGE,
        data: data
    }
};

export const clearMessageList=()=>{
    return{
        type: ACTION.CLEAR_MESSAGE_LIST
    }
};

export const changeChatShow=()=>{
    return{
        type: ACTION.CHANGE_CHAT_SHOW
    }
};

export const setNewCustomerFilter=(filter)=>{
    return{
        type: ACTION.SET_NEW_CUSTOMER_FILTER,
        filter: filter
    }
};

export const setNewCreatorFilter=(filter)=>{
    return{
        type: ACTION.SET_NEW_CREATOR_FILTER,
        filter: filter
    }
};


export const setPreviewChatMode=(mode)=>{
    return {
        type: ACTION.SET_CHAT_PREVIEW_MODE,
        mode: mode
    }
};

export const changeChatFavorite=(data)=>{
    return{
        type: ACTION.SET_CHAT_FAVORITE_FLAG,
        data: data
    }
};

export const changeChatBlock=(data)=>{
    return{
        type: ACTION.SET_CHAT_BLOCK_FLAG,
        data: data
    }
};

export const changeBlockStatusInStore=(data)=>{
    return{
        type: ACTION.CHANGE_CHAT_BLOCK,
        data: data
    }
};

export const getCatalogList=(data)=>{
    return{
        type: ACTION.GET_CATALOG_LIST_ASYNC,
        data: data
    }
};


export const changeShowModeCatalog=(data)=>{
    return{
        type: ACTION.CHANGE_SHOW_MODE_CATALOG,
        data: data
    }
};

export const changeTypeOfChatAdding=(data)=>{
    return{
        type: ACTION.CHANGE_TYPE_ADDING_CHAT_IN_CATALOG,
        data: data
    }
};

export const changeShowAddChatToCatalogMenu=(data)=>{
    return{
        type: ACTION.CHANGE_SHOW_ADD_CHAT_TO_CATALOG,
        data: data
    }
};

export const addChatToCatalog=(data)=>{
    return {
        type: ACTION.ADD_CHAT_TO_CATALOG_ASYNC,
        data: data
    }
};

export const deleteCatalog=(data)=>{
    return{
        type: ACTION.DELETE_CATALOG_REQUEST,
        data: data
    }
};

export const removeChatFromCatalog=(data)=>{
    return{
        type: ACTION.REMOVE_CHAT_FROM_CATALOG_REQUEST,
        data: data
    }
};

export const changeRenameCatalogMode=()=>{
    return{
        type: ACTION.CHANGE_RENAME_CATALOG_MODE
    }
};

export const changeCatalogName=(data)=>{
    return{
        type: ACTION.CHANGE_CATALOG_NAME_REQUEST,
        data: data
    }
};

export const changeEditContest=(data)=>{
    return{
        type: ACTION.CHANGE_EDIT_CONTEST,
        data: data
    }
};

export const changeContestViewMode=(data)=>{
    return{
        type: ACTION.CHANGE_CONTEST_VIEW_MODE,
        data: data
    }
};

export const changeShowImage=(data)=>{
    return{
        type: ACTION.CHANGE_SHOW_IMAGE,
        data: data
    }
};

export const changeFocusOnCard=(data)=>{
    return{
        type: ACTION.CHANGE_FOCUS_ON_CARD,
        data: data
    }
};


export const changeProfileModeView=(data)=>{
    return{
        type: ACTION.CHANGE_PROFILE_MODE_VIEW,
        data: data
    }
};

export const changeEditModeOnUserProfile=(data)=>{
    return{
        type: ACTION.CHANGE_EDIT_MODE_ON_USER_PROFILE,
        data: data
    }
};

export const clearPaymentStore=()=>{
    return{
        type: ACTION.CLEAR_PAYMENT_STORE
    }
};

export const clearUpdateContestStore=()=>{
    return{
        type: ACTION.CLEAR_UPDATE_CONTEST_STORE
    }
};

export const clearUserError=()=>{
    return{
        type: ACTION.CLEAR_USER_ERROR
    }
};

export const clearChatError=()=>{
    return{
        type: ACTION.CLEAR_CHAT_ERROR
    }
};

export const changeModalShow=(data)=>{
    return{
        type: ACTION.CHANGE_SHOW_MODAL,
        data: data
    }
};

export const createEvent=(event)=>{
    return {
        type: ACTION.CREATE_EVENT,
        data: event
    }
}

export const getEvents=(events)=>{
    return {
        type: ACTION.GET_EVENTS,
        data: events
    }
}

export const deleteEvent=(id)=>{
    return {
        type: ACTION.DELETE_EVENT,
        data: id
    }
}

export const eventError=(err)=>{
    return {
        type: ACTION.ERROR_EVENT,
        err: err
    }
}

