import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  allUsersRequest: ["fetching"],
  allUsersSuccess: ["response"],
  allUsersFailure: ["error"]
});

export const allUsersTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  response: [],
  error: null,
  fetching: null,
  loaded: null
});

/* ------------- Reducers ------------- */

const allUsersRequest = state =>
  state.merge({
    fetching: true,
    loaded: null,
    error: null,
    response: []
  });

const allUsersSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    response,
    loaded: true
  });

const allUsersFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    response: error,
    loaded: false
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALL_USERS_REQUEST]: allUsersRequest,
  [Types.ALL_USERS_SUCCESS]: allUsersSuccess,
  [Types.ALL_USERS_FAILURE]: allUsersFailure
});
