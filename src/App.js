import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';
import { getDirection } from './helpers/Utils';
import './overridecss.css';
import { useDispatch, useSelector } from 'react-redux';

const ViewMain = React.lazy(() => import(/* webpackChunkName: "views" */ './views'));
const ViewApp = React.lazy(() => import(/* webpackChunkName: "views-app" */ './views/app'));
const ViewUser = React.lazy(() => import(/* webpackChunkName: "views-user" */ './views/user'));
const ViewError = React.lazy(() => import(/* webpackChunkName: "views-error" */ './views/error'));

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
	  const redux = useSelector(state => state);

	console.log('authUser', authUser);
	return (
		<Route
			{...rest}
			render={(props) =>
				authUser===true ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/user/login',
							state: { from: props.location }
						}}
					/>
				)}
		/>
	);
};

class App extends Component {
	constructor(props) {
		super(props);
		const direction = getDirection();
		if (direction.isRtl) {
			document.body.classList.add('rtl');
			document.body.classList.remove('ltr');
		} else {
			document.body.classList.add('ltr');
			document.body.classList.remove('rtl');
		}
	}

	render() {
		const { authUser, lang } = this.props;
		const currentAppLocale = AppLocale[lang];
		return (
			<div className="h-100">
				<IntlProvider locale={lang} messages={currentAppLocale.messages}>
					<React.Fragment>
						<NotificationContainer />
						{/* {isMultiColorActive && <ColorSwitcher />} */}
						<Suspense fallback={<div className="loading" />}>
							<Router>
								<Switch>
									<AuthRoute path="/app" authUser={authUser} component={ViewApp} />
									<Route path="/user" render={(props) => <ViewUser {...props} />} />
									<Route path="/error" exact render={(props) => <ViewError {...props} />} />
									<Route path="/" exact render={(props) => <ViewMain {...props} />} />
									<Redirect to="/error" />
								</Switch>
							</Router>
						</Suspense>
					</React.Fragment>
				</IntlProvider>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		lang: state.settings.locale,
		authUser: state.auth.loaded,
		theme: state.auth.response.theme
	};
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
