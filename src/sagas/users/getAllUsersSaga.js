import { takeLatest, put, call } from "redux-saga/effects";
import { BaseURL } from "../../utils/baseURL";
import axiosRequest, { setAuthorizationBearer } from "../../utils/requests";
import allUsersActions, {
  allUsersTypes
} from "../../redux/users/getAllUsersRedux";

function* allUsersRequest() {
  try {
    let response = yield call(axiosRequest, "get", BaseURL, "/user", {});
    yield put(allUsersActions.allUsersSuccess(response.data));
  } catch (e) {
    yield put(allUsersActions.allUsersFailure(e));
  }
}
export default function* allUsers() {
  yield takeLatest(allUsersTypes.ALL_USERS_REQUEST, allUsersRequest);
}
