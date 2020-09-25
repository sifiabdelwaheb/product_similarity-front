import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './login'),
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ './register'),
);

const User = ({ match }) => {
  return (
    <>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
          <Route
            path={`${match.url}/login`}
            render={(props) => <Login {...props} />}
          />
          <Route
            path={`${match.url}/register`}
            render={(props) => <Register {...props} />}
          />

          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </>
  );
};

export default User;
