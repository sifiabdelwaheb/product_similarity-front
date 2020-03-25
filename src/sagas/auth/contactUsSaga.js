import { takeLatest, put, call } from "redux-saga/effects";
import { BaseURL } from "../../utils/baseURL";
import axiosRequest from "../../utils/requests";
import contactUsActions, {
  contactUsTypes
} from "../../redux/auth/contactUsRedux";

function* getRequest({ data }) {
  try {
    let response = yield call(axiosRequest, "post", BaseURL, "/contact", data);
    yield put(contactUsActions.contactUsSuccess(response.data));
  } catch (e) {
    yield put(contactUsActions.contactUsFailure(e));
  }
}
export default function* contactUsRequest() {
  yield takeLatest(contactUsTypes.CONTACT_US_REQUEST, getRequest);
}
