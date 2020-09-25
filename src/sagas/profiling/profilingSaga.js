import { takeLatest, put, call } from "redux-saga/effects";
import { BaseURL } from "../../utils/baseURL";
import axiosRequest, { setAuthorizationBearer } from "../../utils/requests";
import allProfilingActions, {
    allProfilingTypes
} from "../../redux/profiling/profilingRedux";

function* allProfilingRequest() {
  try {
    let response = yield call(axiosRequest, "get", BaseURL, "/profiling", {});
    yield put(allProfilingActions.allProfilingSuccess(response.data));
  } catch (e) {
    yield put(allProfilingActions.allProfilingFailure(e));
  }
}
export default function* allProfilings() {
  yield takeLatest(allProfilingTypes.ALL_PROFILING_REQUEST, allProfilingRequest);
}
