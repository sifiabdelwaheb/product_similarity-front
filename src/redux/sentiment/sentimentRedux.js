import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  SentimentRequest: ["data"],
  SentimentSuccess: ["response"],
  SentimentFailure: ["error"]
});

export const SentimentTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
  data: {}
});
const SentimentRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null
  });

const SentimentSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response
  });

const SentimentFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SENTIMENT_REQUEST]: SentimentRequest,
  [Types.SENTIMENT_SUCCESS]: SentimentSuccess,
  [Types.SENTIMENT_FAILURE]: SentimentFailure
});
