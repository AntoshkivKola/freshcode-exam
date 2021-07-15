import { put, select } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/http/restController';
import CONSTANTS from '../constants';

export function* changeMarkSaga(action) {
  try {
    const { data } = yield restController.changeMark(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.forEach((offer) => {
      if (offer.User.id === data.userId) {
        offer.User.rating = data.rating;
      }
      if (offer.id === action.data.offerId) {
        offer.mark = action.data.mark;
      }
    });
    yield put({ type: ACTION.CHANGE_MARK_SUCCESS, data: offers });
  } catch (err) {
    yield put({ type: ACTION.CHANGE_MARK_ERROR, error: err.response });
  }
}

export function* addOfferSaga(action) {
  try {
    const { data } = yield restController.setNewOffer(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.unshift(data);
    yield put({ type: ACTION.ADD_NEW_OFFER_TO_STORE, data: offers });
  } catch (e) {
    yield put({ type: ACTION.ADD_OFFER_ERROR, error: e.response });
  }
}

export function* setOfferStatusSaga(action) {
  try {
    yield restController.setOfferStatus(action.data);
    document.location.reload();
  } catch (e) {
    yield put({ type: ACTION.SET_OFFER_STATUS_ERROR, error: e.response });
  }
}

export function* getOffers(action) {
  yield put({ type: ACTION.GET_MODERATOR_OFFERS_REQUEST });
  try {
    const { data } = yield restController.getOffers(action.data);
    yield put({ type: ACTION.GET_MODERATOR_OFFERS_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_MODERATOR_OFFERS_ERROR, error: e.response });
  }
}

export function* banOrPandingOffer(action) {
  try {
    yield restController.banOrPandingOffer(action.data);
    yield put({ type: ACTION.DELETE_MODERATOR_OFFER, data: action.data.offerId });
  } catch (e) {
    console.log(e);
    yield put({ type: ACTION.GET_MODERATOR_OFFERS_ERROR, error: e.response });
  }
}
