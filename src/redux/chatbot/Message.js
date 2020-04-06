import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  MessageRequest: ['data'],
  MessageSuccess: ['response'],
  MessageFailure: ['error'],
});

export const MessageTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
  data: {},
});
const MessageRequest = (state, { data }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null,
  });

const MessageSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response,
  });

const MessageFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    loaded: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MESSAGE_REQUEST]: MessageRequest,
  [Types.MESSAGE_SUCCESS]: MessageSuccess,
  [Types.MESSAGE_FAILURE]: MessageFailure,
});
