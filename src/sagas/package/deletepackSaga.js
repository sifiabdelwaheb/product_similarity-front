import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import deletePackageActions, {
  deletePackageTypes,
} from '../../redux/package/deletepackRedux';

function* deletePackageRequest({ id }) {
  try {
    let response = yield call(axiosRequest, 'delete', BaseURL, '/pack/' + id);
    yield put(deletePackageActions.deletePackageSuccess(response.data));
  } catch (e) {
    yield put(deletePackageActions.deletePackageFailure(e));
  }
}

export default  function* deletePackage() {
  yield takeLatest(
    deletePackageTypes.DELETE_PACKAGE_REQUEST,
    deletePackageRequest,
  );
}
