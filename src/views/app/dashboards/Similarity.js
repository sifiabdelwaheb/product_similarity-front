import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import NavBar from '../../../components/user/NavBar';
import { changeLocale } from '../../../redux/actions';
import { Navbar, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from '@material-ui/core';

import { Redirect } from 'react-router-dom';
import loginForms from '../../../common/authUser';
import SimilarityForm from '../../../common/Similarity';
import Classes from './style.module.css';
import IntlMessages from '../../../helpers/IntlMessages';
import { getParameterByName, randomString } from '../../../helpers/Utils';
import { CircularProgress } from '@material-ui/core';

import { injectIntl } from 'react-intl';
import Card from '../../../components/user/Card';
import packageTwoImg from '../../../assets/images/package-two.jpeg';
import registerUserAction from '../../../redux/package/RegisterUserRedux';
import similarityAction from '../../../redux/similarity/ProductSimilarity';
import InputPattern from '../../../common/inputPattern';
import Hoc from '../../../hoc/wrapperInputs';
import { Spinner } from 'reactstrap';

const Wrapper = Hoc(InputPattern);
function DefaultDashboard(props) {
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const [loginErr, setLoginErr] = useState(false);
  const [clicked, setClick] = useState(false);
  const [isValid, setValidation] = useState(false);
  const [forms, setForm] = useState(loginForms());
  const [similarityUsform, setSimilarityForm] = useState(
    SimilarityForm().similarity,
  );

  const redux = useSelector((state) => state);

  const onSendForm = (form) => {
    let data = {};
    for (let key in form) {
      data[key] = form[key].value;
    }
    return data;
  };
  let content = null;

  if (redux.auth.loaded) {
    content = <Redirect to="/app/dashboards/users" />;
  }

  const onContactUS = () => {
    setClick(true);
    if (isValid) {
      dispatch(
        similarityAction.SimilarityRequest(onSendForm(similarityUsform)),
      );
    }
  };
  return (
    <div className={Classes.Similarity_Container}>
      <Card
        xs="12"
        sm="12"
        md="15"
        package={'Les produits le plus similaire à notre produit !'}
        withImgCard={false}
        Card={Classes.Card}
        Col={Classes.Col}
      >
        <Wrapper
          // onClick={() => console.log(onSendForm(contactUsform))}
          form={similarityUsform}
          textButton="Connexion"
          loading={redux.RegisterUser.fetching}
          login={login}
          clicked={clicked}
          setClick={setClick}
          error={redux.RegisterUser.error}
          loaded={redux.RegisterUser.loaded}
          setSimilarityForm={setSimilarityForm}
          setValidation={setValidation}
          // errorMessage={redux.contactUs.response}
        />

        <Button
          onClick={() => onContactUS()}
          variant="contained"
          color="secondary"
          style={{
            backgroundColor: '#da2323',
            fontWeight: 'bold',
            height: '40px',
          }}
        >
          <IntlMessages id="pages.predict" />
        </Button>
      </Card>

      {!redux.ProductSimilarity.loaded &&
      clicked &&
      isValid &&
      !redux.ProductSimilarity.error ? (
        <div className={Classes.containerSpann}>
          <CircularProgress
            style={{
              color: '#da2323',
              width: '50px',
              height: '50px',
            }}
          />
        </div>
      ) : redux.ProductSimilarity.loaded && clicked && isValid ? (
        <Card
          xs="8"
          sm="8"
          md="8"
          package={'Le produit  similaire :'}
          withImgCard={false}
          Card={Classes.Card}
          Col={Classes.Col}
        >
          <p style={{ color: 'green' }}>
            {redux.ProductSimilarity.response.predict}
          </p>
        </Card>
      ) : redux.ProductSimilarity.error &&
        !redux.ProductSimilarity.loaded &&
        clicked ? (
        <Card
          xs="8"
          sm="8"
          md="8"
          package={'Le produit  similaire :'}
          withImgCard={false}
          Card={Classes.Card}
          Col={Classes.Col}
        >
          <p style={{ color: 'red' }}>
            on nous trouve pas un produit similaire pour ces caractéristique
          </p>
        </Card>
      ) : (
        ''
      )}
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

export default injectIntl(DefaultDashboard);
