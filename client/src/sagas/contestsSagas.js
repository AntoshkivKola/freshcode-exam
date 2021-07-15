import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/http/restController';

export function* activeContestsSaga(action) {
  yield put({ type: ACTION.GET_CONTESTS_ACTION_REQUEST });
  try {
    const { data } = yield restController.getActiveContests(action.data);
    yield put({ type: ACTION.GET_CONTESTS_ACTION_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_CONTESTS_ACTION_ERROR, error: e.response });
  }
}

export function* customerContestsSaga(action) {
  yield put({ type: ACTION.GET_CONTESTS_ACTION_REQUEST });
  try {
    const { data } = yield restController.getCustomersContests(action.data);
    yield put({ type: ACTION.GET_CONTESTS_ACTION_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_CONTESTS_ACTION_ERROR, error: e.response });
  }
}

export function* updateContestSaga(action) {
  yield put({ type: ACTION.UPDATE_CONTEST_REQUEST });
  try {
    const { data } = yield restController.updateContest(action.data);
    yield put({ type: ACTION.UPDATE_STORE_AFTER_UPDATE_CONTEST, data });
  } catch (e) {
    yield put({ type: ACTION.UPDATE_CONTEST_ERROR, error: e.response });
  }
}

export function* dataForContestSaga(action) {
  try {
    const { data } = yield restController.dataForContest(action.data);
    yield put({ type: ACTION.GET_DATA_FOR_CONTEST_ACTION_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.GET_DATA_FOR_CONTEST_ACTION_ERROR, error: e.response });
  }
}

export function* getContestByIdSaga(action) {
  yield put({ type: ACTION.GET_CONTEST_BY_ID_REQUEST });
  try {
    const { data } = yield restController.getContestById(action.data);
    const { Offers } = data;
    delete data.Offers;
    yield put({ type: ACTION.GET_CONTEST_BY_ID_SUCCESS, data: { contestData: data, offers: Offers } });
  } catch (e) {
    yield put({ type: ACTION.GET_CONTEST_BY_ID_ERROR, error: e.response });
  }
}

export function* downloadContestFileSaga(action) {
  yield put({ type: ACTION.DOWNLOAD_CONTEST_FILE_REQUEST });
  try {
    const { data } = yield restController.downloadContestFile(action.data);
    yield put({ type: ACTION.DOWNLOAD_CONTEST_FILE_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.DOWNLOAD_CONTEST_FILE_ERROR, error: e.response });
  }
}
