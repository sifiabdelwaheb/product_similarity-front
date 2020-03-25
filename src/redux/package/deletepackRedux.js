import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  deletePackageRequest: ['id'],
  deletePackageSuccess: ['response'],
  deletePackageFailure: ['error'],
});

export const deletePackageTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: null,
  response: {},
  error: null,
  loaded: null,
});

const deletePackageRequest = (state, { id, token }) =>
  state.merge({
    fetching: true,
    error: null,
    loaded: null,
  });

const deletePackageSuccess = (state, { response }) =>
  state.merge({
    fetching: false,
    error: false,
    loaded: true,
    response,
  });

const deletePackageFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error: true,
    response: error,
    loaded: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_PACKAGE_REQUEST]: deletePackageRequest,
  [Types.DELETE_PACKAGE_SUCCESS]: deletePackageSuccess,
  [Types.DELETE_PACKAGE_FAILURE]: deletePackageFailure,
});
