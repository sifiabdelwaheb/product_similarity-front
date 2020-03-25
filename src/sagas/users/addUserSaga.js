import { takeLatest, put, call } from "redux-saga/effects";
import { BaseURL } from "../../utils/baseURL";
import axiosRequest from "../../utils/requests";

import addUserActions, { addUserTypes } from "../../redux/users/addUserRedux";

function* apiRequest({ data }) {
  try {
    const form = yield new FormData();
    yield Object.keys(data).forEach(element => {
      form.append(element, data[element]);
    });
    let response = yield call(axiosRequest, "post", BaseURL, "/user", form);
    yield put(addUserActions.addUserSuccess(response.data));
  } catch (e) {
    yield put(addUserActions.addUserFailure(e));
  }
}
export default function* addUserRequest() {
  yield takeLatest(addUserTypes.ADD_USER_REQUEST, apiRequest);
}
