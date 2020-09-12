import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import SimilarityActions, {
  SimilarityTypes,
} from '../../redux/similarity/ProductSimilarity';

function* ProductSimilarityRequest({ data }) {
  try {
    let response = yield call(
      axiosRequest,
      'post',
      BaseURL,
      '/similarity',
      data,
    );
    console.log('response data', response.data);
    yield put(SimilarityActions.SimilaritySuccess(response.data));
  } catch (e) {
    yield put(SimilarityActions.SimilarityFailure(e));
  }
}
export default function* SimilarityRequest() {
  yield takeLatest(
    SimilarityTypes.SIMILARITY_REQUEST,
    ProductSimilarityRequest,
  );
}
