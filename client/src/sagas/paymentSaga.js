import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import history from '../browserHistory';
import CONSTANTS from '../constants';
import * as restController from '../api/http/restController';

export function* paymentSaga(action) {
  yield put({ type: ACTION.PAYMENT_ACTION_REQUEST });
  try {
    yield restController.payMent(action.data);
    history.replace('dashboard');
    yield put({ type: ACTION.CLEAR_CONTEST_STORE });
    yield put({ type: ACTION.CLEAR_PAYMENT_STORE });
  } catch (err) {
    yield put({ type: ACTION.PAYMENT_ACTION_ERROR, error: err.response });
  }
}

export function* cashoutSaga(action) {
  yield put({ type: ACTION.PAYMENT_ACTION_REQUEST, data: action.data });
  try {
    const { data } = yield restController.cashOut(action.data);
    yield put({ type: ACTION.UPDATE_USER_DATA_SUCCESS, data });
    yield put({ type: ACTION.CLEAR_PAYMENT_STORE });
    yield put({ type: ACTION.CHANGE_PROFILE_MODE_VIEW, data: CONSTANTS.USER_INFO_MODE });
  } catch (e) {
    yield put({ type: ACTION.PAYMENT_ACTION_ERROR, error: e.response });
  }
}
