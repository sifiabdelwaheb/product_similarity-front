import { takeLatest, put, call } from 'redux-saga/effects';
import { BaseURL } from '../../utils/baseURL';
import axiosRequest, { setAuthorizationBearer } from '../../utils/requests';

import ChartActions, { ChartTypes } from '../../redux/profiling/piechart';

function* PieChartRequest({ data }) {
  try {
    let response = yield call(axiosRequest, 'post', BaseURL, '/piechart', data);
    console.log('response data', response.data);
    yield put(ChartActions.ChartSuccess(response.data));
  } catch (e) {
    yield put(ChartActions.ChartFailure(e));
  }
}
export default function* PieChart() {
  yield takeLatest(ChartTypes.CHART_REQUEST, PieChartRequest);
}
