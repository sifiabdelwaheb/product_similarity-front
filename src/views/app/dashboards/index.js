import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

const DashboardDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './Similarity'),
);

const MoteurRecherche = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './moteur_recherche'),
);
const ProfilingUser = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './profiling'),
);
const TwitterSentiment = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './sentiment'),
);

const Dashboards = ({ match, role }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/similarity`}
        render={(props) => <DashboardDefault {...props} />}
      />
      <Route
        path={`${match.url}/moteur`}
        render={(props) => <MoteurRecherche {...props} />}
      />
      <Route
        path={`${match.url}/profiling`}
        render={(props) => <ProfilingUser {...props} />}
      />
      <Route
        path={`${match.url}/sentiment`}
        render={(props) => <TwitterSentiment {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);

const mapStateToProps = (state) => {
  return {
    role: state.auth.response,
  };
};
export default connect(mapStateToProps)(Dashboards);
