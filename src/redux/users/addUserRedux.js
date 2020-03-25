import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  addUserRequest: ["data"],
  addUserSuccess: ["response"],
  addUserFailure: ["error"]
});

export const addUserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null
});
const addUserRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const addUserSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response
  });

const addUserFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false,
    response: error.response
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_USER_REQUEST]: addUserRequest,
  [Types.ADD_USER_SUCCESS]: addUserSuccess,
  [Types.ADD_USER_FAILURE]: addUserFailure
});
