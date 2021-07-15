import ACTION from '../actions/actionTypes';

const initialState = {
  error: null,
  events: [],
  lastId: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CREATE_EVENT: {
      const { events, lastId } = state;
      return {
        ...state,
        error: null,
        events: [...events, action.data],
        lastId: lastId + 1,
      };
    }
    case ACTION.GET_EVENTS: {
      const { lastId } = state;
      return {
        ...state,
        error: null,
        events: [...action.data],
        length: (lastId + action.data.length),
      };
    }
    case ACTION.DELETE_EVENT: {
      const { events } = state;
      const deleteEventId = action.data;
      return {
        ...state,
        error: null,
        events: [...events.filter((event) => event.id !== deleteEventId)],
      };
    }
    case ACTION.ERROR_EVENT: {
      return {
        ...state,
        error: action.err,
      };
    }

    default:
      return state;
  }
}
