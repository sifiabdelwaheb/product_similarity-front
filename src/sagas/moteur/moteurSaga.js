import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import MoteurActions, { MoteurTypes } from '../../redux/moteur/MoteruRedux';

function* MoteurRechecheRequest({ data }) {
  try {
    let response = yield call(axiosRequest, 'post', BaseURL, '/moteur', data);
    console.log('response data', response.data);
    yield put(MoteurActions.MoteurSuccess(response.data));
  } catch (e) {
    yield put(MoteurActions.MoteurFailure(e));
  }
}
export default function* MoteurRequest() {
  yield takeLatest(MoteurTypes.MOTEUR_REQUEST, MoteurRechecheRequest);
}
