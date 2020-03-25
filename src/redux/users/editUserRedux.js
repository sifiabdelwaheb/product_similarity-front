import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  editUserRequest: ["data", "id"],
  editUserSuccess: ["response"],
  editUserFailure: ["error"]
});

export const editUserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null
});
const editUserRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const editUserSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response
  });

const editUserFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false,
    response: error.response
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EDIT_USER_REQUEST]: editUserRequest,
  [Types.EDIT_USER_SUCCESS]: editUserSuccess,
  [Types.EDIT_USER_FAILURE]: editUserFailure
});
