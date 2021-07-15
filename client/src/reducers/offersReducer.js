import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  error: null,
  offers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_MODERATOR_OFFERS_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ACTION.GET_MODERATOR_OFFERS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        offers: [...state.offers, ...action.data],
      };
    }
    case ACTION.GET_MODERATOR_OFFERS_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ACTION.DELETE_MODERATOR_OFFER: {
      const deletedOfferId = action.data;
      const { offers } = state;
      const newOffers = offers.filter((offer) => offer.id !== deletedOfferId);

      return {
        ...state,
        offers: newOffers,
      };
    }
    default:
      return state;
  }
}
