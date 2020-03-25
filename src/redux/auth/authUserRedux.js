import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  authUserRequest: ["data", "fetching"],
  authUserSuccess: ["response", "connected"],
  authUserFailure: ["error"],
  logout: ["token"]
});

export const authUserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  loaded: null,
  error: null,
  connected: false,
 
  data: {}
});
const authUserRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const authUserSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response,
    connected: true,

  });

const authUserFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false,
    response: error
  });

const logout = (state = INITIAL_STATE) => ({
  ...state,
  token: null,
  connected: false,
  error: null,
  response: {}
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_USER_REQUEST]: authUserRequest,
  [Types.AUTH_USER_SUCCESS]: authUserSuccess,
  [Types.AUTH_USER_FAILURE]: authUserFailure,
  [Types.LOGOUT]: logout
});
