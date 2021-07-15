import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  error: null,
  focusOnElement: 'number',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CHANGE_FOCUS_ON_CARD: {
      return {
        ...state,
        focusOnElement: action.data,
      };
    }
    case ACTION.PAYMENT_ACTION_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.PAYMENT_ACTION_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.CLEAR_PAYMENT_STORE: {
      return initialState;
    }
    case ACTION.CLEAR_STORE: {
      return { ...initialState };
    }
    default:
      return state;
  }
}
