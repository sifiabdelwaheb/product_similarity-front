import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  MoteurRequest: ["data"],
  MoteurSuccess: ["response"],
  MoteurFailure: ["error"]
});

export const MoteurTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
  data: {}
});
const MoteurRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const MoteurSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response
  });

const MoteurFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOTEUR_REQUEST]: MoteurRequest,
  [Types.MOTEUR_SUCCESS]: MoteurSuccess,
  [Types.MOTEUR_FAILURE]: MoteurFailure
});
