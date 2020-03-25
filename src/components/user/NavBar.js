import React, { useState } from "react";
import IntlMessages from "../../helpers/IntlMessages";
import PropTypes from "prop-types";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { localeOptions } from "../../constants/defaultValues";
import { setDirection } from "../../helpers/Utils";
import { changeLocale } from "../../redux/actions";
import Classes from "./style.module.css";
function NavBar(props) {
  const [lang, setLang] = useState(
    (localStorage.getItem("currentLanguage") &&
      localStorage.getItem("currentLanguage").toUpperCase()) ||
      "EN"
  );

  function handleChangeLocale(locale, direction) {
    changeLocale(locale);
    setDirection(direction);
    setLang(locale.toUpperCase());
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  return (
    <>
      <Navbar color="light" light expand="md">
        <div className={"container"}>
          <NavbarBrand href="/">
          <img src={require('../../assets/images/bot.png')} className={Classes.Logo} />
            
          </NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {lang}
                </DropdownToggle>
                <DropdownMenu className="mt-3" left>
                  {localeOptions.map(l => {
                    return (
                      <DropdownItem
                        onClick={() => handleChangeLocale(l.id, l.direction)}
                        key={l.id}
                      >
                        {l.name}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            {/* <Button
              color="primary"
              className={`btn-shadow btn-multiple-state ${
                props.loading ? "show-spinner" : ""
              }`}
              size="lg"
              onClick={props.onClickRegister}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>

              <span className="label">
                <IntlMessages id="user.register-button" />
              </span>
            </Button> */}
            <Button
              color="primary"
              className={`btn-shadow btn-multiple-state ${
                props.loading ? "show-spinner" : ""
              }`}
              size="lg"
              onClick={props.onClickLogin}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>

              <span className="label">
                <IntlMessages id="user.login-button" />
              </span>
            </Button>
          </Collapse>
        </div>
      </Navbar>
    </>
  );
}

NavBar.propTypes = {
  loading: PropTypes.bool,
  onClickLogin: PropTypes.func.isRequired,
  left: PropTypes.string
};
NavBar.defaultProps = {
  loading: null,
  onClickLogin: () => {},
  left: ""
};
export default NavBar;
