import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  RegisterUserRequest: ["data"],
  RegisterUserSuccess: ["response"],
  RegisterUserFailure: ["error"]
});

export const RegisterUserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
  data: {}
});
const RegisterUserRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const RegisterUserSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response
  });

const RegisterUserFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_USER_REQUEST]: RegisterUserRequest,
  [Types.REGISTER_USER_SUCCESS]: RegisterUserSuccess,
  [Types.REGISTER_USER_FAILURE]: RegisterUserFailure
});
