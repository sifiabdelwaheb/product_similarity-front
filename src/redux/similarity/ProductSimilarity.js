import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  SimilarityRequest: ["data"],
  SimilaritySuccess: ["response"],
  SimilarityFailure: ["error"]
});

export const SimilarityTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
  data: {}
});
const SimilarityRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const SimilaritySuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response
  });

const SimilarityFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIMILARITY_REQUEST]: SimilarityRequest,
  [Types.SIMILARITY_SUCCESS]: SimilaritySuccess,
  [Types.SIMILARITY_FAILURE]: SimilarityFailure
});
