import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

const DashboardDefault = React.lazy(() => import(/* webpackChunkName: "dashboard-default" */ './default'));
const Dashboards = ({ match, role }) => (
	<Suspense fallback={<div className="loading" />}>
		<Switch>
			
			<Route path={`${match.url}/users`} render={(props) => <DashboardDefault {...props} />} />
			
			<Redirect to="/error" />
		</Switch>
	</Suspense>
);

const mapStateToProps = (state) => {
	return {
		role: state.auth.response
	};
};
export default connect(mapStateToProps)(Dashboards);
