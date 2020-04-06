import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  authUserRequest: ["data", "fetching"],
  authUserSuccess: ["response", "connected"],
  authUserFailure: ["error"],
  logout: ["token"],
  loginFacebookRequest: ['requestFacebook'],


});

export const authUserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  loaded: null,
  error: null,
  connected: false,
  requestFacebook: null,


 
  data: {}
});


const authfacebookSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
   
    connected: true,

  });

const authUserFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false,
    response: error,
    requestFacebook: null,


  });

const logout = (state = INITIAL_STATE) => ({
  ...state,
 
  connected: false,
  error: null,
  response: {}
});
const loginFacebookRequest = (state) => state.merge({ requestFacebook: true });


export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_USER_REQUEST]: authUserRequest,
  [Types.AUTH_USER_SUCCESS]: authUserSuccess,
  [Types.AUTH_USER_FAILURE]: authUserFailure,
  [Types.LOGOUT]: logout,
  [Types.LOGIN_FACEBOOK_REQUEST]: loginFacebookRequest,
});
