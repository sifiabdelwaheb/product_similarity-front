import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import registerUserActions, {
  RegisterUserTypes,
} from '../../redux/package/RegisterUserRedux';

function* RegisterUserRequest({ data }) {
  
  try {
    let response = yield call(axiosRequest, 'post', BaseURL, '/register', data);
    console.log("response data",response.data)
    yield put(registerUserActions.RegisterUserSuccess(response.data));
  } catch (e) {
    yield put(registerUserActions.RegisterUserFailure(e));
  }
}
export default function* registerRequest() {
  yield takeLatest(RegisterUserTypes.REGISTER_USER_REQUEST, RegisterUserRequest);
}


