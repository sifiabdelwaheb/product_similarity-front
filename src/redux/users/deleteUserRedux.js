import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  deleteUserRequest: ["id"],
  deleteUserSuccess: ["response"],
  deleteUserFailure: ["error"]
});

export const deleteUserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null
});
const deleteUserRequest = (state, { id }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const deleteUserSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response
  });

const deleteUserFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false,
    response: error.response
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_USER_REQUEST]: deleteUserRequest,
  [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,
  [Types.DELETE_USER_FAILURE]: deleteUserFailure
});
