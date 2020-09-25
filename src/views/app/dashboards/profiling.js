import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { changeLocale } from '../../../redux/actions';
import { Navbar, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from '@material-ui/core';

import { Redirect } from 'react-router-dom';
import Classes from './style.module.css';
import IntlMessages from '../../../helpers/IntlMessages';
import { getParameterByName, randomString } from '../../../helpers/Utils';
import { makeStyles } from '@material-ui/core/styles';
import * as d3 from 'd3';

import { injectIntl } from 'react-intl';
import profilingAction from '../../../redux/profiling/profilingRedux';
import ChartAction from '../../../redux/profiling/piechart';
import { UserProfilingForm } from '../../../common/userprofiling';

import InputPattern from '../../../common/inputPattern';
import Hoc from '../../../hoc/wrapperInputs';
import { Spinner } from 'reactstrap';
import { ReactTableAdvancedCard } from '../../../containers/ui/ReactTableCards';
import Card from '../../../components/user/Card';
import DonutComponent from './Component/DonutChart/DonutComponent';

import './Component/styles.css';

const Wrapper = Hoc(InputPattern);
function Profiling(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [datac, setDatac] = useState([]);

  const redux = useSelector((state) => state);
  const [chartUsform, setChartForm] = useState(UserProfilingForm);
  const [loginErr, setLoginErr] = useState(false);
  const [clicked, setClick] = useState(false);
  const [isValid, setValidation] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState('All');
  const [groupColour, setGroupColour] = useState('lightgrey');

  //function that will hook into the state to change it
  function updateBarChart(group, colour) {
    setSelectedGroup(group);
    setGroupColour(colour);
  }
  const onSendForm = (form) => {
    let data = {};
    for (let key in form) {
      data[key] = form[key].value;
    }
    return data;
  };

  const onContactUS = () => {
    setClick(true);
    if (isValid) {
      dispatch(ChartAction.ChartRequest(onSendForm(chartUsform)));
    }
  };

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

  useEffect(() => {
    setData1(generateData());
    console.log('data1*******', data1);
  }, [!data1]);
  return (
    <div className={Classes.profiling}>
      <div style={{ marginTop: '120px' }}>
        <ReactTableAdvancedCard
          data={data}
          dataTableColumns={dataTableColumns}
        ></ReactTableAdvancedCard>
      </div>

      <div className={Classes.Container}>
        <Card
          xs="12"
          sm="12"
          md="10"
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
            onClick={() => onContactUS()}
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
          xs="12"
          sm="12"
          md="20"
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
  );
}

export default injectIntl(Profiling);
