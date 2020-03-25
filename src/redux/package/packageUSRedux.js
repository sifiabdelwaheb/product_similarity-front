import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  packageUserRequest: ["fetching"],
  packageUserSuccess: ["response"],
  packageUserFailure: ["error"]
});

export const packageUserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: [],
  error: null,
  loaded: null
});
const packageUserRequest = state =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const packageUserSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response
  });

const packageUserFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PACKAGE_USER_REQUEST]: packageUserRequest,
  [Types.PACKAGE_USER_SUCCESS]: packageUserSuccess,
  [Types.PACKAGE_USER_FAILURE]: packageUserFailure
});
