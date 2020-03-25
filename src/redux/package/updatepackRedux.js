import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  updatePackRequest: ['data', 'id'],
  updatePackSuccess: ['response'],
  updatePackFailure: ['error'],
});

export const updatepackTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
});

const updatePackRequest = (state, { data, id }) => {
  return state.merge({
    fetching: true,
    error: null,
    loaded: null,
  });
};

const updatePackSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response,
  });

const updatePackFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    response: error,
    loaded: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_PACK_REQUEST]: updatePackRequest,
  [Types.UPDATE_PACK_SUCCESS]: updatePackSuccess,
  [Types.UPDATE_PACK_FAILURE]: updatePackFailure,
});
