import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: true,
  contestData: null,
  isEditContest: false,
  error: null,
  offers: [],
  changeMarkError: null,
  addOfferError: null,
  setOfferStatusError: null,
  isBrief: true,
  isShowOnFull: false,
  imagePath: null,
  isShowModal: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_CONTEST_BY_ID_REQUEST: {
      return {
        ...state,
        isFetching: true,
        contestData: null,
        error: null,
        offers: [],
      };
    }
    case ACTION.GET_CONTEST_BY_ID_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        contestData: action.data.contestData,
        error: null,
        offers: action.data.offers,
      };
    }
    case ACTION.CHANGE_CONTEST_VIEW_MODE: {
      return {
        ...state,
        isEditContest: false,
        isBrief: action.data,
      };
    }
    case ACTION.CHANGE_EDIT_CONTEST: {
      return {
        ...state,
        isEditContest: action.data,
      };
    }
    case ACTION.GET_CONTEST_BY_ID_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.UPDATE_STORE_AFTER_UPDATE_CONTEST: {
      return {
        ...state,
        error: null,
        isEditContest: false,
        contestData: { ...state.contestData, ...action.data },
      };
    }
    case ACTION.ADD_NEW_OFFER_TO_STORE: {
      return {
        ...state,
        error: null,
        offers: [...action.data],
      };
    }
    case ACTION.CHANGE_MARK_SUCCESS: {
      return {
        ...state,
        error: null,
        offers: [...action.data],
      };
    }
    case ACTION.CHANGE_STORE_FOR_STATUS: {
      return {
        ...state,
        error: null,
        offers: [...action.data],
      };
    }
    case ACTION.CHANGE_MARK_ERROR: {
      return {
        ...state,
        changeMarkError: action.error,
      };
    }
    case ACTION.ADD_OFFER_ERROR: {
      return {
        ...state,
        addOfferError: action.error,
      };
    }
    case ACTION.SET_OFFER_STATUS_ERROR: {
      return {
        ...state,
        setOfferStatusError: action.error,
      };
    }
    case ACTION.CLEAR_ADD_OFFER_ERROR: {
      return {
        ...state,
        addOfferError: null,
      };
    }
    case ACTION.CLEAR_SET_OFFER_STATUS_ERROR: {
      return {
        ...state,
        setOfferStatusError: null,
      };
    }
    case ACTION.CLEAR_CHANGE_MARK_ERROR: {
      return {
        ...state,
        changeMarkError: null,
      };
    }
    case ACTION.CHANGE_SHOW_IMAGE: {
      return {
        ...state,
        isShowOnFull: action.data.isShowOnFull,
        imagePath: action.data.imagePath,
      };
    }
    case ACTION.CHANGE_SHOW_MODAL: {
      return {
        ...state,
        isShowModal: action.data,
      };
    }
    case ACTION.CLEAR_STORE: {
      return { ...initialState };
    }
    default:
      return state;
  }
}
