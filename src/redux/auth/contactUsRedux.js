import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  contactUsRequest: ["data", "fetching"],
  contactUsSuccess: ["response", "connected"],
  contactUsFailure: ["error"],
});

export const contactUsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  loaded: null,
  error: null,
  connected: false,
  data: {}
});
const contactUsRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const contactUsSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response,
    connected: true,
  });

const contactUsFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false,
    response: error
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONTACT_US_REQUEST]: contactUsRequest,
  [Types.CONTACT_US_SUCCESS]: contactUsSuccess,
  [Types.CONTACT_US_FAILURE]: contactUsFailure
});
