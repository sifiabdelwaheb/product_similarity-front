import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  packageHomeRequest: ["fetching"],
  packageHomeSuccess: ["response"],
  packageHomeFailure: ["error"]
});

export const packageHomeTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: [],
  error: null,
  loaded: null
});
const packageHomeRequest = state =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const packageHomeSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response
  });

const packageHomeFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PACKAGE_HOME_REQUEST]: packageHomeRequest,
  [Types.PACKAGE_HOME_SUCCESS]: packageHomeSuccess,
  [Types.PACKAGE_HOME_FAILURE]: packageHomeFailure
});
