import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import AddButton from './components/AddButton';
import { NotificationManager } from '../../../components/common/react-notifications';
import Classes from './style.module.css';
import IntlMessages from '../../../helpers/IntlMessages';
import { injectIntl } from 'react-intl';
import packageAction from '../../../redux/package/packageUSRedux';
import { ReactTableAdvancedCard } from '../../../containers/ui/ReactTableCards';
import addpackAction from '../../../redux/package/RegisterUserRedux';
import deletepackageActions from '../../../redux/package/deletepackRedux';
import updatepackageActions from '../../../redux/package/updatepackRedux';
import AddNewModal from '../../../containers/pages/AddNewModal';
import Hoc from '../../../hoc/wrapperInputs';
import InputPattern from '../../../common/inputPattern';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import addPack from '../../../common/addpack';
const Wrapper = Hoc(InputPattern);

function ContentDashboard(props) {
	const dispatch = useDispatch();
	const [ isOpen, setOpen ] = useState(false);
	const redux = useSelector((state) => state);
	//const [dataTableColumns, setdataTableColumns] = useState([]);
	const [ data, setData ] = useState([]);
	const [ packageDetails, setPackageDetails ] = useState({});
	const [ clicked, setClick ] = useState(false);
	const [ isValid, setValidation ] = useState(false);
	const [ selectedId, setSelectedId ] = useState();
	const [ deleteVerif, setdeleteVerif ] = useState(false);
	const [ modalSmall, setModalSmall ] = useState(false);
	const [ imagePreviewUrl, setimagePreviewUrl ] = useState(null);
	const [ photo, setPhoto ] = useState(null);
	//const package=useSelector(state=>State)
	const [ isEdit, setIsEdit ] = useState(false);
	const [ id, setIdPack ] = useState('');
	let refUpdate = useRef(redux.updatapack.loaded);
	let refAdd = useRef(redux.addpackUS.loaded);
	let refDelete = useRef(redux.deletepack.loaded);

	useEffect(() => {
		dispatch(packageAction.packageUserRequest());
		// eslint-disable-next-line react-hooks/exhaustive-deps
		setModalSmall(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		() => {
			if (redux.packageUS.loaded) {
				setData(redux.packageUS.response.asMutable({ deep: true }));
				//setdataTableColumns(redux.packageUS.response);
				setModalSmall(false);
			}
		},
		[ redux.packageUS.loaded, redux.packageUS.response ]
	);

	useEffect(
		() => {
			if (redux.deletepack.loaded && redux.deletepack.loaded !== refDelete.current) {
				dispatch(packageAction.packageUserRequest());
				setdeleteVerif(false);
				NotificationManager.success(
					'Thanks',
					props.intl.formatMessage({ id: 'user.add-succfully' }),
					3000,
					null,
					null
				);
			}
			refDelete.current = null;
			// if (redux.updatapack.loaded) {
			// 	dispatch(updatepackageActions.updatePackRequest());
			// 	onCloseModalHandler();
			// }
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ redux.deletepack.loaded ]
	);

	function onHandlerDeletePackage(id) {
		dispatch(deletepackageActions.deletePackageRequest(id, redux.auth.token));
		setModalSmall(true);
	}
	const onSendForm = (form) => {
		let data = {};
		for (let key in form) {
			data[key] = form[key].value;
			if (form[key].value === '') {
				delete data[key];
			} else if (form[key].elementType === 'Select') {
				data[key] = form[key].value.value;
			}
		}
		return data;
	};

	function openDeleteModal(id) {
		setdeleteVerif(true);
		setSelectedId(id);
	}

	function onHandlerAddPackage() {
		setIsEdit(false);
		setimagePreviewUrl(null);
		setPackageDetails(addPack(false, ''));

		setOpen(true);
		setClick(false);
	}

	function onHandlerEditPackage(cell) {
		setIsEdit(true);
		setIdPack(cell.original._id);
		setPackageDetails(addPack(true, cell.original));
		setOpen(true);
		setimagePreviewUrl(null);
		setClick(false);
		setSelectedId(id);
	}

	useEffect(
		() => {
			if (redux.addpackUS.loaded && redux.addpackUS.loaded !== refAdd.current) {
				setOpen(false);
				dispatch(packageAction.packageUserRequest());
				NotificationManager.success(
					'Thanks',
					props.intl.formatMessage({ id: 'user.add-succfully' }),
					3000,
					null,
					null
				);
			}
			refAdd.current = null;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ redux.addpackUS.loaded ]
	);
	useEffect(
		() => {
			if (redux.updatapack.loaded && redux.updatapack.loaded !== refUpdate.current) {
				setOpen(false);
				dispatch(packageAction.packageUserRequest());
				NotificationManager.success(
					'Thanks',
					props.intl.formatMessage({ id: 'user.add-succfully' }),
					3000,
					null,
					null
				);
			}
			refUpdate.current = null;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ redux.updatapack.loaded ]
	);
	const [ dataTableColumns ] = useState([
		{
			Header: props.intl.formatMessage({
				id: 'Pack.image'
			}),
			accessor: 'image',
			Cell: (cell) => {
				return (
					<div className={Classes.Society_Avatar}>
						<img width={'100px'} alt="edit" src={'https://api-mobilar.wereact.co/' + cell.value} />
					</div>
				);
			}
		},
		{
			Header: props.intl.formatMessage({
				id: 'Pack.name'
			}),
			accessor: 'name',
			Cell: (cell) => (
				<p onClick={() => {}} className="text-muted">
					{cell.value}
				</p>
			)
		},
		{
			Header: props.intl.formatMessage({
				id: 'Pack.description'
			}),
			accessor: 'description',
			Cell: (props) => <p className="text-muted">{props.value}</p>
		},
		{
			Header: props.intl.formatMessage({
				id: 'Pack.price'
			}),
			accessor: 'price',
			Cell: (cell) => (
				<p onClick={() => {}} className="text-muted">
					{cell.value}
				</p>
			)
		},
		{
			Header: props.intl.formatMessage({ id: 'Pack.showInHomePage' }),
			accessor: 'showInHomePage',
			Cell: (cell) => (
				<div>
					{cell.value === true ? (
						props.intl.formatMessage({ id: 'pack.true' })
					) : (
						props.intl.formatMessage({ id: 'pack.false' })
					)}
				</div>
			)
		},
		redux.auth.response.name === 'mobilar'
			? {}
			: {
					Header: 'Edit',
					accesor: 'Edit',
					maxWidth: 60,

					Cell: (cell) => (
						<i
							onClick={() => {
								onHandlerEditPackage(cell);
							}}
							className={'iconsminds-pen-2 tableicons'}
						/>
					)
				},
		redux.auth.response.name === 'mobilar'
			? {}
			: {
					Header: 'Delete',
					accessor: 'Delete',
					maxWidth: 60,
					Cell: (cell) => (
						<i onClick={() => openDeleteModal(cell.original._id)} className={'simple-icon-trash tableicons'} />
					)
				}
	]);

	function onCloseModalHandler() {
		setOpen(false);
	}
	const onEditPack = (data, id) => {
		dispatch(updatepackageActions.updatePackRequest(data, id));
	};
	const onAddUser = (data) => {
		dispatch(addpackAction.AddpackUserRequest(data));
	};
	const onSendFormHandler = () => {
		console.log('is valid', isValid);
		setClick(true);
		if (isValid) {
			if (isEdit) {
				onEditPack(onSendForm(packageDetails), id);
			} else {
				onAddUser(onSendForm(packageDetails));
			}
		}
	};
	return (
		<Colxx xxs="12" className="mb-3">
			<Breadcrumb match={props.match} heading={<IntlMessages id="menu.packages" />} />

			<ReactTableAdvancedCard data={data} dataTableColumns={dataTableColumns}>
				{redux.auth.response.role === 'superAdmin' ? (
					<AddButton
						addfunction={() => {
							onHandlerAddPackage();
						}}
					/>
				) : (
					<div />
				)}
				<AddNewModal
					onSubmitForm={() => onSendFormHandler()}
					toggleModal={onCloseModalHandler}
					modalOpen={isOpen}
					imagePreviewUrl={imagePreviewUrl}
					setimagePreviewUrl={setimagePreviewUrl}
					setPhoto={setPhoto}
					photo={photo}
					drawerTitle="test"
					modaltitle={isEdit ? <IntlMessages id="modaledit.pack" /> : <IntlMessages id="modaltitle.pack" />}
				>
					<Wrapper
						setClick={setClick}
						setValidation={setValidation}
						isValid={isValid}
						clicked={clicked}
						form={packageDetails}
						error={redux.addpackUS.error}
						errorMessage="Acces denied"
					/>
				</AddNewModal>

				<Modal isOpen={deleteVerif} toggle={() => setdeleteVerif(false)} className={Classes.Modal}>
					<ModalBody>
						<div
							style={{
								height: 150,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between'
							}}
						>
						<IntlMessages id="deletemessage" />
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Button
									color="danger"
									size="m"
									className="top-right-button"
									style={{ width: 150 }}
									onClick={() => onHandlerDeletePackage(selectedId)}
								>
									<IntlMessages id="Delete" />
								</Button>
								<Button
									color="primary"
									size="m"
									style={{ width: 150 }}
									className="top-right-button"
									onClick={() => setdeleteVerif(false)}
								>
									<IntlMessages id="cancel" />
								</Button>
							</div>
						</div>
					</ModalBody>
				</Modal>
			</ReactTableAdvancedCard>
		</Colxx>
	);
}

export default injectIntl(ContentDashboard);
