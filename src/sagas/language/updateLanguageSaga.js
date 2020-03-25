import { takeLatest, put, call } from "redux-saga/effects";
import { BaseURL } from "../../utils/baseURL";
import axiosRequest from "../../utils/requests";

import updateLanguageActions, {
  updateLanguageTypes
} from "../../redux/language/updateLanguageRedux";

function* updateLanguageRequest({ data, id }) {
  data = { language: data };
  try {
    let response = yield call(
      axiosRequest,
      "patch",
      BaseURL,
      "/user/language/" + id,
      data
    );
    yield put(updateLanguageActions.updateLanguageSuccess(response));
  } catch (e) {
    yield put(updateLanguageActions.updateLanguageFailure(e));
  }
}

export default function* updateLanguage() {
  yield takeLatest(
    updateLanguageTypes.UPDATE_LANGUAGE_REQUEST,
    updateLanguageRequest
  );
}
