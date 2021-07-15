import ACTION from '../actions/actionTypes';

const initialState = {
  contests: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SAVE_CONTEST_TO_STORE: {
      return {
        ...state,
        contests: { ...state.contests, ...{ [action.data.type]: action.data.info } },
      };
    }
    case ACTION.CLEAR_CONTEST_STORE: {
      return {
        contests: {},
      };
    }
    case ACTION.CLEAR_STORE: {
      return { ...initialState };
    }
    default:
      return state;
  }
}
