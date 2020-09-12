import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import ImmutablePersistenceTransform from './ImmutablePersistenceTransform';
import storage from 'redux-persist/lib/storage'; // defaults to localStorag
import reducers from './redux';
import globalSagas from './sagas';
import { createLogger } from 'redux-logger';
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
});
const persistConfig = {
  key: 'root',
  storage,
  transforms: [ImmutablePersistenceTransform],

  whiteList: [],
};
const middlewares = [sagaMiddleware, logger];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);
const persistor = persistStore(store);
sagaMiddleware.run(globalSagas);
export { store, persistor };
