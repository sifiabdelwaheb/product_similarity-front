import { takeLatest, put, call } from "redux-saga/effects";
import { BaseURL } from "../../utils/baseURL";
import axiosRequest from "../../utils/requests";

import editUserActions, {
  editUserTypes
} from "../../redux/users/editUserRedux";

function* apiRequest({ data, id }) {
  try {
    console.log("data saga", data);
    const form = yield new FormData();
    yield Object.keys(data).forEach(element => {
      form.append(element, data[element]);
    });
    let response = yield call(
      axiosRequest,
      "patch",
      BaseURL,
      "/user/" + id,
      form
    );
    yield put(editUserActions.editUserSuccess(response.data));
  } catch (e) {
    yield put(editUserActions.editUserFailure(e));
  }
}
export default function* editUserRequest() {
  yield takeLatest(editUserTypes.EDIT_USER_REQUEST, apiRequest);
}
