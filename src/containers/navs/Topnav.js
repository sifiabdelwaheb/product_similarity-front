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
import { NavLink } from 'react-router-dom';
import { MobileMenuIcon, MenuIcon } from '../../components/svg';

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
  menuButtonClick = (e, menuClickCount, containerClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    this.props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.props.selectedMenuHasSubItems,
    );
  };
  mobileMenuButtonClick = (e, containerClassnames) => {
    e.preventDefault();
    this.props.clickOnMobileMenu(containerClassnames);
  };
  render() {
    console.log('lang', this.state.lang);
    const { containerClassnames, menuClickCount, locale } = this.props;
    const { messages } = this.props.intl;
    console.log('lang', this.state.lang);
    return (
      <Navbar color="light" light expand="md">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            location={{}}
            className="menu-button d-none d-md-block"
            onClick={(e) =>
              this.menuButtonClick(e, menuClickCount, containerClassnames)
            }
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={(e) => this.mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>

          {/* <div className="search" data-search-path="/app/pages/search">
						<Input
							name="searchKeyword"
							id="searchKeyword"
							placeholder={messages['menu.search']}
							value={this.state.searchKeyword}
							onChange={(e) => this.handleSearchInputChange(e)}
							onKeyPress={(e) => this.handleSearchInputKeyPress(e)}
						/>
						<span className="search-icon" onClick={(e) => this.handleSearchIconClick(e)}>
							<i className="simple-icon-magnifier" />
						</span>
					</div> */}

          {/* <div className="position-relative d-none d-none d-lg-inline-block">
            <a
              className="btn btn-outline-primary btn-sm ml-2"
              target="_top"
              href="https://themeforest.net/cart/configure_before_adding/22544383?license=regular&ref=ColoredStrategies&size=source"
            >
              <IntlMessages id="user.buy" />
            </a>
          </div> */}
        </div>
        <div className={'container'}>
          <NavbarBrand style={{ maxWidth: '202px' }}>
            <img
              src={require('../../assets/images/logo.JPG')}
              style={{ width: '100%' }}
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
