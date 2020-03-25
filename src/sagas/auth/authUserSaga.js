import { takeLatest, put, call } from "redux-saga/effects";
import { BaseURL } from "../../utils/baseURL";
import axiosRequest from "../../utils/requests";
import authUserActions, { authUserTypes } from "../../redux/auth/authUserRedux";

function* getRequest({ data }) {
  try {
    let response = yield call(
      axiosRequest,
      "post",
      BaseURL,
      data.mobilar ? "/register" : "/register",
      data
    );
    yield put(authUserActions.authUserSuccess(response.data));
    yield localStorage.setItem("currentLanguage", response.data.language);
  } catch (e) {
    yield put(authUserActions.authUserFailure(e));
  }
}
export default function* authUserRequest() {
  yield takeLatest(authUserTypes.AUTH_USER_REQUEST, getRequest);
}
