import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
	updateLanguageRequest: [ 'data', 'id' ],
	updateLanguageSuccess: [ 'response' ],
	updateLanguageFailure: [ 'error' ]
});

export const updateLanguageTypes = Types;
export default Creators;

//-------------*InitialState*-------------------

export const INITIAL_STATE = Immutable({
	fetching: null,
	response: {},
	error: null,
	loaded: null
});

//------------------*Reducers*---------------------

const updateLanguageRequest = (state, { data, id }) =>
	state.merge({
		fetching: true,
		error: null,
		loaded: null
	});

const updateLanguageSuccess = (state, { response }) =>
	state.merge({
		fetching: false,
		error: false,
		loaded: true,
		response: response.data.language
	});

const updateLanguageFailure = (state, { error }) =>
	state.merge({
		fetching: false,
		error: true,
		response: error,
		loaded: false
	});

export const reducer = createReducer(INITIAL_STATE, {
	[Types.UPDATE_LANGUAGE_REQUEST]: updateLanguageRequest,
	[Types.UPDATE_LANGUAGE_SUCCESS]: updateLanguageSuccess,
	[Types.UPDATE_LANGUAGE_FAILURE]: updateLanguageFailure
});
