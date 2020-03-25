import { takeLatest, put, call } from "redux-saga/effects";
import { BaseURL } from "../../utils/baseURL";
import axiosRequest from "../../utils/requests";

import deleteUserActions, {
  deleteUserTypes
} from "../../redux/users/deleteUserRedux";

function* deleteUserRequest({ id }) {
  console.log("id", id);
  try {
    let response = yield call(axiosRequest, "delete", BaseURL, "/user/" + id);
    yield put(deleteUserActions.deleteUserSuccess(response.data));
  } catch (e) {
    yield put(deleteUserActions.deleteUserFailure(e));
  }
}

export default function* deleteUser() {
  yield takeLatest(deleteUserTypes.DELETE_USER_REQUEST, deleteUserRequest);
}
