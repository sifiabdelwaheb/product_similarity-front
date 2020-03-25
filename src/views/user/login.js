import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import NavBar from '../../components/user/NavBar';
import { changeLocale } from '../../redux/actions';
import { Navbar, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import loginForms from '../../common/authUser';
import contactUsForms from '../../common/contactUs';
import Classes from './style.module.css';
import IntlMessages from '../../helpers/IntlMessages';
import { getParameterByName, randomString } from '../../helpers/Utils';

import { injectIntl } from 'react-intl';
import Card from '../../components/user/Card';
import packageOneImg from '../../assets/images/package-one.jpeg';
// import packageTwoImg from "../../assets/images/package-two.jpeg";
import registerUserAction from '../../redux/package/RegisterUserRedux';
import InputPattern from '../../common/inputPattern';
import Hoc from '../../hoc/wrapperInputs';
import loginAction from '../../redux/auth/authUserRedux';

const Wrapper = Hoc(InputPattern);
function Login(props) {
	const [ email ] = useState('');
	const [ password ] = useState('');
	const [ modal, setModal ] = useState(false);
	const [ login, setLogin ] = useState(false);
	const [ data, setData ] = useState([]);
	const dispatch = useDispatch();
	const [ loginErr, setLoginErr ] = useState(false);
	const [ clicked, setClick ] = useState(false);
	const [ isValid, setValidation ] = useState(false);
	const [ form, setForm ] = useState(loginForms());
	const [ contactUsform, setContactForm ] = useState(contactUsForms().contactUs);
	const [ user, setUser ] = useState(null);

	const redux = useSelector((state) => state);



	useEffect(
		() => {
			if (redux.packhome.loaded) {
				setData(redux.packhome.response.asMutable({ deep: true }));
			}

			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[ redux.packhome.loaded ]
	);
	useEffect(
		() => {
			return () => {
				setLoginErr(false);
				// setContactUsErr(false);
			};
			//
		},
		[ redux.auth.error ]
	);
	useEffect(
		() => {
			if (redux.auth.token) {
				dispatch(changeLocale(redux.auth.response.language || localStorage.getItem('currentLanguage')));
			}
			return () => {
				setLoginErr(false);
				// setContactUsErr(false);
			};
			//
		},
		[ dispatch, redux.auth.response.language, redux.auth.token ]
	);

	const toggle = () => setModal(!modal);

	function onClickLogin() {
		setLogin(true);
		setModal(true);
	}
	function onClickRegister() {
		setLogin(false);
		setModal(true);
	}
	function onClickCard() {
		setLogin(false);
		setModal(true);
	}

	const onSendForm = (form) => {
		let data = {};
		for (let key in form) {
			data[key] = form[key].value;
		}
		return data;
	};
	let content = null;

	if (redux.auth.token) {
		content = <Redirect to="/app" />;
	}

	const onSendFormHandler = () => {
		setClick(true);
		if (isValid) {
			onLogin(onSendForm(form));

			// setTimeout(()=>{
			//
			// },1000)
		}
		else{
			setClick(false)
		}
	};
	const onLogin = (data) => {
		dispatch(loginAction.authUserRequest(data));
	};

	const onContactUS = () => {
		setClick(true);
		if (isValid) {
			dispatch(registerUserAction.RegisterUserRequest(onSendForm(contactUsform)));
		}
	};
	return (
		<Fragment>
			{content}
			<div className={Classes.RowHome}>
				<Modal centered isOpen={modal} toggle={toggle} className={Classes.Modal}>
					<ModalHeader toggle={toggle}>
						{' '}
						<IntlMessages id={login ? 'user.login-button' : 'user.register-button'} />
					</ModalHeader>
					<ModalBody>
						<Wrapper
							form={form}
							textButton="Connexion"
							error={redux.auth.error}
							clicked={clicked}
							setClick={setClick}
							loaded={redux.auth.loaded}
							errorMessage={
								redux.auth.response && redux.auth.response.data && redux.auth.response.data.message
							}
							isValid={isValid}
							setValidation={setValidation}
						>
							<Button
								color="primary"
								className={`btn-shadow btn-multiple-state ${redux.auth.fetching ? 'show-spinner' : ''}`}
								size="lg"
								onClick={() => onSendFormHandler()}
							>
								<span className="spinner d-inline-block">
									<span className="bounce1" />
									<span className="bounce2" />
									<span className="bounce3" />
								</span>
								<span className="label">
									{redux.auth.fetching !== null || !redux.auth.fetching ? (
										<IntlMessages id={login ? 'user.login-button' : 'user.register-button'} />
									) : (
										''
									)}
								</span>
							</Button>
						</Wrapper>
					</ModalBody>
				</Modal>
				<NavBar onClickRegister={() => onClickRegister()} onClickLogin={() => onClickLogin()} />

				<div className={`container  ${Classes.Container}`}>
					{data.map((item) => {
						return (
							<Card
								xs="12"
								sm="12"
								md="6"
								packageImg={'https://api-mobilar.wereact.co/' + item.image}
								package={item.name}
								withImgCard={true}
								Card={Classes.Card}
								Col={Classes.Col}
								description={item.description}
								//price={item.price}
								onClickCard={() => onClickCard()}
							>
								<Button color="primary">
									<IntlMessages id="Home.packageOne" />
								</Button>
							</Card>
						);
					})}
				</div>
				<div className={`container  ${Classes.Container}`}>
					<Card
						xs="12"
						sm="12"
						md="12"
						packageImg={packageOneImg}
						package={'chat.contactUs'}
						withImgCard={false}
						Card={Classes.Card}
						Col={Classes.Col}
					>
						<Wrapper
							// onClick={() => console.log(onSendForm(contactUsform))}
							form={contactUsform}
							textButton="Connexion"
							loading={redux.contactUs.fetching}
							login={login}
							clicked={clicked}
							setClick={setClick}
							error={redux.contactUs.error}
							loaded={redux.contactUs.loaded}
							setContactForm={setContactForm}
							setValidation={setValidation}
							// errorMessage={redux.contactUs.response}
						/>
						{redux.contactUs.loaded && <p style={{ color: 'green' }}>Mesaage sended successfuly</p>}
						<Button onClick={() => onContactUS()} color="primary">
							<IntlMessages id="pages.send" />
						</Button>
					</Card>
				</div>
				<Navbar className={Classes.FooterHome} color="light" light expand="md">
					<div className="container">© assistant-virtuel - 2020 Tous droits réservés.</div>
				</Navbar>
			</div>
		</Fragment>
	);
}

Navbar.propTypes = {
	light: PropTypes.bool,
	dark: PropTypes.bool,
	fixed: PropTypes.string,
	color: PropTypes.string,
	role: PropTypes.string,
	expand: PropTypes.oneOfType([ PropTypes.bool, PropTypes.string ]),
	tag: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ])
	// pass in custom element to use
};

export default injectIntl(Login);
