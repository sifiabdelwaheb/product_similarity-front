import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import SentimentActions, {
  SentimentTypes,
} from '../../redux/sentiment/sentimentRedux';
import allProfilingActions from '../../redux/profiling/profilingRedux';
function* SentimenttwitterRequest({ data }) {
  try {
    let response = yield call(
      axiosRequest,
      'post',
      BaseURL,
      '/sentiment',
      data,
    );
    console.log('response data', response.data);
    yield put(SentimentActions.SentimentSuccess(response.data));
  } catch (e) {
    yield put(SentimentActions.SentimentFailure(e));
  }
}
export default function* SentimentRequest() {
  yield takeLatest(SentimentTypes.SENTIMENT_REQUEST, SentimenttwitterRequest);
}
