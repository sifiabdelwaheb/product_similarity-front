import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TopNav from '../containers/navs/Topnav';
import TopNabHome from '../containers/navs/TopnavHome';
import Sidebar from '../containers/navs/Sidebar';
import { Navbar, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import Classes from './style.module.css';
import img from '../assets/images/big_data_analytics.jpg';

class AppLayout extends Component {
  render() {
    const { containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNav
          history={this.props.history}
          style={{
            opacity: '1',
          }}
        />
        <Sidebar />
        <main style={{ marginTop: '0px', opacity: '4' }}>
          <div className="container">{this.props.children}</div>
        </main>
        <Navbar className={Classes.FooterHome} expand="md">
          <div className="container">
            © Five consulting- 2020 Tous droits réservés.
          </div>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout),
);
