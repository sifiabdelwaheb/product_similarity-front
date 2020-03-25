import { takeLatest, put, call } from "redux-saga/effects";
import { BaseURL } from "../../utils/baseURL";
import axiosRequest from "../../utils/requests";
import packHomeActions, {
  packageHomeTypes
} from "../../redux/package/packhomeRedux";

function* getpackHomeRequest() {
  try {
    let response = yield call(axiosRequest, "get", BaseURL, "/pack/home", {});
    yield put(packHomeActions.packageHomeSuccess(response.data));
  } catch (e) {
    yield put(packHomeActions.packageHomeFailure(e));
  }
}
export default function* packHomeRequest() {
  yield takeLatest(packageHomeTypes.PACKAGE_HOME_REQUEST, getpackHomeRequest);
}
