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
import SentimentForm from '../../../common/sentiment'
import Classes from './style.module.css';
import IntlMessages from '../../../helpers/IntlMessages';
import { getParameterByName, randomString } from '../../../helpers/Utils';
import * as d3 from 'd3';
import ChartAction from '../../../redux/profiling/piechart';
import { UserProfilingForm } from '../../../common/userprofiling';
import profilingAction from '../../../redux/profiling/profilingRedux';

import { injectIntl } from 'react-intl';
import Card from '../../../components/user/Card';
import packageTwoImg from '../../../assets/images/package-two.jpeg';
//import registerUserAction from '../../../redux/package/RegisterUserRedux';
import mouteurAction from '../../../redux/moteur/MoteruRedux';
import sentimentAction from '../../../redux/sentiment/sentimentRedux';
import InputPattern from '../../../common/inputPattern';
import Hoc from '../../../hoc/wrapperInputs';
import { Spinner } from 'reactstrap';
import { Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { ReactTableAdvancedCard } from '../../../containers/ui/ReactTableCards';
import DonutComponent from './Component/DonutChart/DonutComponent';

const Wrapper = Hoc(InputPattern);
function Sentiment(props) {
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  // const [loginErr, setLoginErr] = useState(false);
  const [clicked, setClick] = useState(false);
  const [isValid, setValidation] = useState(false);
  const [forms, setForm] = useState(loginForms());
  const [contactUsform, setContactForm] = useState(SentimentForm().sentiment);
  const [datac, setDatac] = useState([]);
  const [data, setData] = useState([]);
  const [chartUsform, setChartForm] = useState(UserProfilingForm);
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [groupColour, setGroupColour] = useState('lightgrey');
  const redux = useSelector((state) => state);

  const [dataTableColumns] = useState([
    {
      Header: 'Sentiment',
      accessor: 'Sentiment',
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

  const onContactUS = () => {
    setClick(true);
    if (isValid) {
      dispatch(sentimentAction.SentimentRequest(onSendForm(contactUsform)));
    }
  };
  const onContactUS1 = () => {
    setClick(true);
    if (isValid) {
      dispatch(ChartAction.ChartRequest(onSendForm(chartUsform)));
    }
  };
  useEffect(() => {
    dispatch(profilingAction.allProfilingRequest());

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  useEffect(() => {
    if (redux.profiling.loaded) {
      setData(redux.profiling.response.data.asMutable({ deep: true }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redux.profiling.loaded, redux.profiling.response]);
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
  return (
    <div className={Classes.profiling}>
      <Card
        xs="6"
        sm="6"
        md="10"
        package={' '}
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
          Discover
        </Button>
      </Card>
      {!redux.sentiment.loaded && clicked ? (
        <div className={Classes.containerSpan}>
          <CircularProgress
            style={{
              color: '#da2323',
              width: '50px',
              height: '50px',
            }}
          />
        </div>
      ) : redux.sentiment.loaded ? (
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
                clicked={clicked}
                setClick={setClick}
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
                <svg viewBox="-10 4 50 50" preserveAspectRatio="xMidYMid meet">
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

export default injectIntl(Sentiment);
