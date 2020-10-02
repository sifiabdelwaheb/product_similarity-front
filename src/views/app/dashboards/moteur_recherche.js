import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import NavBar from '../../../components/user/NavBar';
import { changeLocale } from '../../../redux/actions';
import { Navbar, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import loginForms from '../../../common/authUser';
import SimilarityForm from '../../../common/Similarity';
import RechercheForm from '../../../common/Moteur';
import Classes from './style.module.css';
import IntlMessages from '../../../helpers/IntlMessages';
import { getParameterByName, randomString } from '../../../helpers/Utils';

import { injectIntl } from 'react-intl';
import Card from '../../../components/user/Card';
import packageTwoImg from '../../../assets/images/package-two.jpeg';
//import registerUserAction from '../../../redux/package/RegisterUserRedux';
import mouteurAction from '../../../redux/moteur/MoteruRedux';
import InputPattern from '../../../common/inputPattern';
import Hoc from '../../../hoc/wrapperInputs';
import { Spinner } from 'reactstrap';
import { Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

const Wrapper = Hoc(InputPattern);
function MoteurRecherche(props) {
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const [loginErr, setLoginErr] = useState(false);
  const [clicked, setClick] = useState(false);
  const [isValid, setValidation] = useState(false);
  const [forms, setForm] = useState(loginForms());
  const [contactUsform, setContactForm] = useState(RechercheForm().recheche);

  const redux = useSelector((state) => state);

  const onSendForm = (form) => {
    let data = {};
    for (let key in form) {
      data[key] = form[key].value;
    }
    return data;
  };
  let content = null;

  const showbutton = false;

  const onContactUS = () => {
    setClick(true);
    if (isValid) {
      dispatch(mouteurAction.MoteurRequest(onSendForm(contactUsform)));
    }
  };

  return (
    <div className={Classes.Container_Recherche}>
      <Card
        xs="6"
        sm="6"
        md="8"
        package={'Moteur de recherche specifique pour collecter des données:'}
        withImgCard={false}
        Card={Classes.Cardsearch}
        Col={Classes.Col}
      >
        <Wrapper
          // onClick={() => console.log(onSendForm(contactUsform))}
          form={contactUsform}
          textButton="Connexion"
          loading={redux.RegisterUser.fetching}
          login={login}
          clicked={clicked}
          setClick={setClick}
          error={redux.RegisterUser.error}
          loaded={redux.RegisterUser.loaded}
          setContactForm={setContactForm}
          setValidation={setValidation}
          // errorMessage={redux.contactUs.response}
        />

        <Button
          onClick={() => onContactUS()}
          variant="contained"
          style={{
            backgroundColor: '#da2323',
            fontWeight: 'bold',
            height: '40px',
            color: 'white',
          }}
        >
          collecter
        </Button>

        {!redux.Moteur.loaded && clicked ? (
          <div className={Classes.containerSpan}>
            <CircularProgress
              style={{
                color: '#da2323',
                width: '50px',
                height: '50px',
              }}
            />
          </div>
        ) : redux.Moteur.loaded && clicked ? (
          <div className={Classes.containerSpan}>
            <p style={{ color: 'green', fontSize: '22px' }}>Terminer</p>
          </div>
        ) : redux.Moteur.error && clicked ? (
          'error to load data'
        ) : (
          ''
        )}
      </Card>
    </div>
  );
}

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // pass in custom element to use
};

export default injectIntl(MoteurRecherche);
