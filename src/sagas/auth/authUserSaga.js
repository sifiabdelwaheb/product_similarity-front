import { takeLatest, put, call, select } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest from '../../utils/requests';
import authUserActions, { authUserTypes } from '../../redux/auth/authUserRedux';

function* getRequest({ data }) {
  try {
    let response = yield call(axiosRequest, 'post', BaseURL, '/login', data);
    console.log('response data', response.data);
    yield put(authUserActions.authUserSuccess(response.data));
    //yield localStorage.setItem('currentLanguage', response.data.language);
    console.log(response.data.language);
  } catch (e) {
    yield put(authUserActions.authUserFailure(e));
  }
}
export default function* authUserRequest() {
  yield takeLatest(authUserTypes.AUTH_USER_REQUEST, getRequest);
}
