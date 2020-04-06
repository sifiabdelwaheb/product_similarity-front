
import { takeLatest, put, call } from 'redux-saga/effects';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import MessageActions, {
  MessageTypes,
} from '../../redux/chatbot/Message';

function* MessageRequest({ data }) {
  
  const url='localhost:5000/api'
  try {
    let response = yield call(axiosRequest, 'post', url, '/df_text_query', {data});
    console.log("response data",response.data)
    yield put(MessageActions.MessageSuccess(response.data));
  } catch (e) {
    yield put(MessageActions.MessageFailure(e));
  }
}
export default function* msgRequest() {
  yield takeLatest(MessageTypes.REGISTER_USER_REQUEST, MessageRequest);
}


