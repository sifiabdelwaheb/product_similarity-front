import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  allProfilingRequest: ['fetching'],
  allProfilingSuccess: ['response'],
  allProfilingFailure: ['error'],
});
export const allProfilingTypes = Types;
export default Creators;
/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  response: [],
  error: null,
  fetching: null,
  loaded: null,
});

/* ------------- Reducers ------------- */

const allProfilingRequest = (state) =>
  state.merge({
    fetching: true,
    loaded: null,
    error: null,
  });

const allProfilingSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    response,
    loaded: true,
  });

const allProfilingFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    response: error,
    loaded: false,
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALL_PROFILING_REQUEST]: allProfilingRequest,
  [Types.ALL_PROFILING_SUCCESS]: allProfilingSuccess,
  [Types.ALL_PROFILING_FAILURE]: allProfilingFailure,
});
