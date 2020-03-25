import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ id, ...other }) => {
	if (!id) {
		return <Redirect to="/" />;
	}

	return <Route {...other} />;
};

export default ProtectedRoute;
