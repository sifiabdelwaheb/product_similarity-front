import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import updatepackActions, { updatepackTypes } from '../../redux/package/updatepackRedux';

function* updatepackRequest({ data, id }) {
	const form = yield new FormData();
    yield Object.keys(data).forEach(element => {
      form.append(element, data[element]);
    });
	try {
		let response = yield call(axiosRequest, 'patch', BaseURL, '/pack/' + id, form);
		yield put(updatepackActions.updatePackSuccess(response.data));
	} catch (e) {
		yield put(updatepackActions.updatePackFailure(e));
	}
}

export default function* updatePack() {
	yield takeLatest(updatepackTypes.UPDATE_PACK_REQUEST, updatepackRequest);
}
