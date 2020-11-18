import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import NavBar from '../../components/user/NavBar';
import { changeLocale } from '../../redux/actions';
import { Navbar, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from '@material-ui/core';
import * as d3 from 'd3';
import RechercheForm from '../../common/Moteur';
import ChartAction from '../../redux/profiling/piechart';
import { UserProfilingForm } from '../../common/userprofiling';
import profilingAction from '../../redux/profiling/profilingRedux';
import { Redirect } from 'react-router-dom';
import loginForms from '../../common/authUser';
import SimilarityForm from '../../common/Similarity';
import Classes from './style.module.css';
import IntlMessages from '../../helpers/IntlMessages';
import { getParameterByName, randomString } from '../../helpers/Utils';
import { CircularProgress } from '@material-ui/core';
import sentimentAction from '../../redux/sentiment/sentimentRedux';
import { ReactTableAdvancedCard } from '../../containers/ui/ReactTableCards';
import DonutComponent from '../app/dashboards/Component/DonutChart/DonutComponent';
import { injectIntl } from 'react-intl';
import Card from '../../components/user/Card';
import packageTwoImg from '../../assets/images/package-two.jpeg';
import registerUserAction from '../../redux/package/RegisterUserRedux';
import similarityAction from '../../redux/similarity/ProductSimilarity';
import InputPattern from '../../common/inputPattern';
import Hoc from '../../hoc/wrapperInputs';
import { Spinner } from 'reactstrap';
import SentimentForm from '../../common/sentiment';

const Wrapper = Hoc(InputPattern);
function DefaultDashboard(props) {
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const [loginErr, setLoginErr] = useState(false);
  const [clicked1, setClick1] = useState(false);
  const [clicked2, setClick2] = useState(false);
  const [clicked3, setClick3] = useState(false);

  const [clicked, setClick] = useState(false);
  const [isValid, setValidation] = useState(false);
  const [forms, setForm] = useState(loginForms());

  const [datac, setDatac] = useState([]);
  const [data, setData] = useState([]);
  const [chartUsform, setChartForm] = useState(UserProfilingForm);
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [groupColour, setGroupColour] = useState('lightgrey');

  const [similarityUsform, setSimilarityForm] = useState(
    SimilarityForm().similarity,
  );
  const [sentimentUsform, setSentimentForm] = useState(
    SentimentForm().sentiment,
  );

  const redux = useSelector((state) => state);
  const [dataTableColumns] = useState([
    {
      Header: 'Sentiment',
      accessor: 'Sentiment',
    },
    {
      Header: 'Tweet',
      accessor: 'Tweet',
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: 'Followers',
      accessor: 'Followers',
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: 'Location',
      accessor: 'Location',
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: 'Name',
      accessor: 'Name',
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: 'Gender',
      accessor: 'Gender',
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: 'Verified',
      accessor: 'Verified',
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: 'Description',
      accessor: 'Description',
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
    {
      Header: 'Age',
      accessor: 'Age',
      Cell: (props) => <p className="text-muted">{props.value}</p>,
    },
  ]);

  const onSendForm = (form) => {
    let data = {};
    for (let key in form) {
      data[key] = form[key].value;
    }
    return data;
  };
  let content = null;

  const showbutton = false;

  const onContactUS1 = () => {
    setClick3(true);

    if (isValid) {
      dispatch(ChartAction.ChartRequest(onSendForm(chartUsform)));
    }
  };

  useEffect(() => {
    dispatch(ChartAction.ChartRequest(onSendForm(chartUsform)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (redux.chart.loaded) {
      setDatac(redux.chart.response.data.asMutable({ deep: true }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redux.chart.loaded, redux.chart.response]);

  const generateData = (value, length = 15) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value:
        value === null || value === undefined ? Math.random() * 100 : value,
    }));

  const [data1, setData1] = useState(generateData(0));

  const changeData = () => {
    setData1(generateData());
  };
  function updateBarChart(group, colour) {
    setSelectedGroup(group);
    setGroupColour(colour);
  }

  useEffect(() => {
    setData1(generateData());
    console.log('data1*******', data1);
  }, [!data1]);

  if (redux.auth.loaded) {
    content = <Redirect to="/app/dashboards/users" />;
  }

  const onClickSimilarity = () => {
    setClick1(true);

    if (isValid) {
      dispatch(
        similarityAction.SimilarityRequest(onSendForm(similarityUsform)),
      );
    }
  };
  const onSentimentClick = () => {
    setClick2(true);
    if (redux.sentiment.loaded) {
      setData(redux.sentiment.response.data.asMutable({ deep: true }));
    }
  };
  useEffect(() => {
    dispatch(profilingAction.allProfilingRequest());

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSentiment = (twitter) => {
    setClick(true);
    // window.location.reload(true);

    if (isValid) {
      dispatch(sentimentAction.SentimentRequest(onSendForm(sentimentUsform)));
      //setData(redux.profiling.response.data.asMutable({ deep: true }));
    }
  };
  return (
    <div className={Classes.Home_Container}>
      <div className={Classes.Similarity_Container}>
        <Card
          xs="12"
          sm="12"
          md="12"
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
            clicked={clicked1}
            setClick={setClick1}
            error={redux.RegisterUser.error}
            loaded={redux.RegisterUser.loaded}
            setSimilarityForm={setSimilarityForm}
            setValidation={setValidation}
            // errorMessage={redux.contactUs.response}
          />

          <Button
            onClick={() => onClickSimilarity()}
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
        clicked1 &&
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
        ) : redux.ProductSimilarity.loaded && clicked1 && isValid ? (
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
            <Wrapper
              // onClick={() => console.log(onSendForm(contactUsform))}
              form={sentimentUsform}
              textButton="Connexion"
              loading={redux.RegisterUser.fetching}
              clicked={clicked}
              setClick={setClick}
              error={redux.RegisterUser.error}
              loaded={redux.RegisterUser.loaded}
              setSentimentForm={setSentimentForm}
              setValidation={setValidation}
              // errorMessage={redux.contactUs.response}
            />
            <Button
              onClick={() => onSentiment()}
              variant="contained"
              style={{
                backgroundColor: '#da2323',
                fontWeight: 'bold',
                height: '40px',
                color: 'white',
              }}
            >
              Discover
            </Button>
            {redux.sentiment.loaded && clicked ? (
              <Button
                onClick={() => onSentimentClick()}
                variant="contained"
                style={{
                  backgroundColor: '#da2323',
                  fontWeight: 'bold',
                  height: '40px',
                  width: '120px',
                  color: 'white',
                  marginLeft: '70px',
                }}
              >
                View
              </Button>
            ) : redux.sentiment.error && clicked ? (
              <p style={{ color: 'red', marginLeft: '110px' }}>
                error of discover twitter{' '}
              </p>
            ) : (
              ''
            )}
          </Card>
        ) : redux.ProductSimilarity.error &&
          !redux.ProductSimilarity.loaded &&
          clicked1 ? (
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

      <div></div>
      <div className={Classes.profiling}>
        {!redux.sentiment.loaded && clicked && !redux.sentiment.error ? (
          <div className={Classes.containerSpan}>
            <CircularProgress
              style={{
                color: '#da2323',
                width: '50px',
                height: '50px',
              }}
            />
          </div>
        ) : redux.sentiment.loaded && clicked2 && clicked ? (
          <div className={Classes.sentiment_container}>
            <div style={{ marginTop: '120px' }}>
              <ReactTableAdvancedCard
                data={data}
                dataTableColumns={dataTableColumns}
              ></ReactTableAdvancedCard>
            </div>
            <div className={Classes.Container}>
              <Card
                xs="4"
                sm="4"
                md="4"
                package={' '}
                withImgCard={false}
                Card={Classes.Card}
                Col={Classes.Col}
              >
                <Wrapper
                  // onClick={() => console.log(onSendForm(contactUsform))}
                  form={chartUsform}
                  textButton="Connexion"
                  //loading={redux.RegisterUser.fetching}
                  //login={login}
                  clicked={clicked3}
                  setClick={setClick3}
                  error={redux.RegisterUser.error}
                  loaded={redux.RegisterUser.loaded}
                  setContactForm={setChartForm}
                  setValidation={setValidation}
                  // errorMessage={redux.contactUs.response}
                />
                <Button
                  onClick={() => onContactUS1()}
                  variant="contained"
                  color="secondary"
                  style={{
                    backgroundColor: '#da2323',
                    fontWeight: 'bold',
                    height: '40px',
                  }}
                >
                  Show
                </Button>
              </Card>
              <Card
                xs="6"
                sm="6"
                md="6"
                package={'Pi Chart with D3js :'}
                withImgCard={false}
                Card={Classes.Cardpie}
                Col={Classes.Col}
              >
                <div>
                  <svg
                    viewBox="-10 4 50 50"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <DonutComponent
                      x={15}
                      y={20}
                      onChangeGroup={updateBarChart}
                      donutChartData={datac}
                    />
                  </svg>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
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
