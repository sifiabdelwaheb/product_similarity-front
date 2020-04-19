import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import { connect, useDispatch } from 'react-redux';

import logoutAction from '../../redux/auth/authUserRedux';
import {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
} from '../../redux/actions';
import allLanguageActions from '../../redux/language/updateLanguageRedux';

import { localeOptions } from '../../constants/defaultValues';

import { getDirection, setDirection } from '../../helpers/Utils';
import Classes from './style.module.css';

import IntlMessages from '../../helpers/IntlMessages';

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false,
      searchKeyword: '',
      lang:
        (localStorage.getItem('currentLanguage') &&
          localStorage.getItem('currentLanguage').toUpperCase()) ||
        'EN',
    };
  }

  handleChangeLocale = (locale, direction) => {
    console.log('direction', direction);
    this.props.changeLocale(locale);
    this.props.updateLanguage(locale, this.props.id);
    this.setState({ lang: locale.toUpperCase() });

    setDirection(direction);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  handleLogout = async () => {
    await window.location.reload();
    await this.props.logoutHandler();
    await localStorage.removeItem('persist:root');
    //await localStorage.removeItem('__theme_color');
  };

  render() {
    console.log('lang', this.state.lang);
    return (
      <Navbar color="light" light expand="md">
        <div className={'container'}>
          <NavbarBrand style={{ maxWidth: '202px' }}>
            <img
              src={require('../../assets/images/bot.png')}
              style={{ width: '57%' }}
            />
          </NavbarBrand>
        </div>
        <div style={{ width: '330px', marginRight: '1px', paddingTop: '6px' }}>
          <div
            className="name mr-1 font-weight-bold h4"
            style={{ width: '230px', marginLeft: '120px', color: '#000' }}
          >
            {this.props.auth.response.username}
          </div>
        </div>
        <UncontrolledDropdown>
          <DropdownToggle
            caret
            color="#"
            size="sm"
            style={{ backgroundColor: '#da2323' }}
          >
            <span className="name">{this.state.lang}</span>
          </DropdownToggle>
          <DropdownMenu className="mt-3" right>
            {localeOptions.map((l) => {
              return (
                <DropdownItem
                  onClick={() => this.handleChangeLocale(l.id, l.direction)}
                  key={l.id}
                >
                  {l.name}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </UncontrolledDropdown>

        <div className="mt-3" left>
          {/* {isDarkSwitchActive && <TopnavDarkSwitch />} */}

          <div className="user d-inline-block" style={{ marginLeft: '30px' }}>
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                color="#"
                size="sm"
                style={{
                  backgroundColor: '#f8f9fa',
                  width: '70px',
                  height: '70px',
                }}
              ></DropdownToggle>

              <DropdownMenu className="mt-3" right>
                <DropdownItem onClick={this.handleLogout}>
                  <IntlMessages id={'topnav.signout'} />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    containerClassnames: state.menu.containerClassnames,
    menuClickCount: state.menu.menuClickCount,
    selectedMenuHasSubItems: state.menu.selectedMenuHasSubItems,
    locale: state.settings.locale,
    auth: state.auth,
    id: state.auth.response.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setContainerClassnames: (parm1, param2, param3) =>
      dispatch(setContainerClassnames(parm1, param2, param3)),
    clickOnMobileMenu: (parm1) => dispatch(clickOnMobileMenu(parm1)),
    changeLocale: (parm1) => dispatch(changeLocale(parm1)),
    logoutHandler: () => dispatch(logoutAction.logout()),
    updateLanguage: (data, id) =>
      dispatch(allLanguageActions.updateLanguageRequest(data, id)),
  };
};
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TopNav));
