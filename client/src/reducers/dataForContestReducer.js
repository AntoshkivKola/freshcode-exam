import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: true,
  data: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_DATA_FOR_CONTEST_ACTION_REQUEST: {
      return {
        isFetching: true,
        data: null,
        error: null,
      };
    }
    case ACTION.GET_DATA_FOR_CONTEST_ACTION_SUCCESS: {
      return {
        isFetching: false,
        data: action.data,
        error: null,
      };
    }
    case ACTION.GET_DATA_FOR_CONTEST_ACTION_ERROR: {
      return {
        isFetching: false,
        data: null,
        error: action.error,
      };
    }
    case ACTION.CLEAR_PREFERENCE: {
      return initialState;
    }
    case ACTION.CLEAR_STORE: {
      return { ...initialState };
    }
    default:
      return state;
  }
}
