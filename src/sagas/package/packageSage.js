import { takeLatest, put, call } from "redux-saga/effects";
import { BaseURL } from "../../utils/baseURL";
import axiosRequest from "../../utils/requests";
import packUserActions, {
  packageUserTypes
} from "../../redux/package/packageUSRedux";

function* getpackRequest() {
  try {
    let response = yield call(axiosRequest, "get", BaseURL, "/pack", {});
    yield put(packUserActions.packageUserSuccess(response.data));
  } catch (e) {
    yield put(packUserActions.packageUserFailure(e));
  }
}
export default function* packUserRequest() {
  yield takeLatest(packageUserTypes.PACKAGE_USER_REQUEST, getpackRequest);
}
