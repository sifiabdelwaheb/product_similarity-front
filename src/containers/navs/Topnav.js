import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Navbar,
  Input,
  NavbarBrand,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import logoutAction from '../../redux/auth/authUserRedux';
import {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
} from '../../redux/actions';
import allUsersActions from '../../redux/users/getAllUsersRedux';
import allLanguageActions from '../../redux/language/updateLanguageRedux';

import {
  menuHiddenBreakpoint,
  searchPath,
  localeOptions,
  isDarkSwitchActive,
} from '../../constants/defaultValues';

import { MobileMenuIcon, MenuIcon } from '../../components/svg';
import TopnavEasyAccess from './Topnav.EasyAccess';
import TopnavNotifications from './Topnav.Notifications';
import TopnavDarkSwitch from './Topnav.DarkSwitch';

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
  isInFullScreen = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  handleSearchIconClick = e => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains('search')) {
        if (e.target.parentElement.classList.contains('search')) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains('mobile-view')) {
        this.search();
        elem.classList.remove('mobile-view');
        this.removeEventsSearch();
      } else {
        elem.classList.add('mobile-view');
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  addEventsSearch = () => {
    document.addEventListener('click', this.handleDocumentClickSearch, true);
  };
  removeEventsSearch = () => {
    document.removeEventListener('click', this.handleDocumentClickSearch, true);
  };

  handleDocumentClickSearch = e => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        this.search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      this.removeEventsSearch();
      this.setState({
        searchKeyword: '',
      });
    }
  };
  handleSearchInputChange = e => {
    this.setState({
      searchKeyword: e.target.value,
    });
  };
  handleSearchInputKeyPress = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  search = () => {
    this.props.history.push(searchPath + '/' + this.state.searchKeyword);
    this.setState({
      searchKeyword: '',
    });
  };

  toggleFullScreen = () => {
    const isInFullScreen = this.isInFullScreen();

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    this.setState({
      isInFullScreen: !isInFullScreen,
    });
  };

  handleLogout = async () => {
    await window.location.reload();
    await this.props.logoutHandler();
    await localStorage.removeItem('persist:root');
    await localStorage.removeItem('__theme_color');
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
    return (
      <Navbar color="light" light expand="md">
        <div className={'container'}>
          <NavbarBrand>
            <img
              src={require('../../assets/images/bot.png')}
              className={Classes.Logo}
            />
          </NavbarBrand>
        </div>
        <div style={{ width: '230px', marginRight: '1px', paddingTop: '6px'}}>
          <div
            className="name mr-1 font-weight-bold h4"
            style={{ width: '230px', marginRight: '1px'}}
          >
            {this.props.auth.response.username}
          </div>
        </div>
        <div className="navbar-right">
          {/* {isDarkSwitchActive && <TopnavDarkSwitch />} */}

          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle>
                <div className="name mr-1 font-weight-bold h5" style={{color:'#ffffff'}}>Logout</div>
              </DropdownToggle>
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

const mapStateToProps = state => {
  return {
    containerClassnames: state.menu.containerClassnames,
    menuClickCount: state.menu.menuClickCount,
    selectedMenuHasSubItems: state.menu.selectedMenuHasSubItems,
    locale: state.settings.locale,
    auth: state.auth,
    id: state.auth.response.id,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setContainerClassnames: (parm1, param2, param3) =>
      dispatch(setContainerClassnames(parm1, param2, param3)),
    clickOnMobileMenu: parm1 => dispatch(clickOnMobileMenu(parm1)),
    changeLocale: parm1 => dispatch(changeLocale(parm1)),
    logoutHandler: () => dispatch(logoutAction.logout()),
    updateLanguage: (data, id) =>
      dispatch(allLanguageActions.updateLanguageRequest(data, id)),
  };
};
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TopNav));
