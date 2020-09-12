import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import packages from './package';
import similaritys from './similarity'
import language from './language';
const sagas = [...auth, ...packages,...language,...similaritys];
function* rootSaga() {
  const globalSagasForks = sagas.map(saga => fork(saga));
  yield all([...globalSagasForks]);
}
export default rootSaga;
