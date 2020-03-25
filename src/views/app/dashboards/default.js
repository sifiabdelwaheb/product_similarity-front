import React, { useEffect, useState, useRef } from "react";
import { injectIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import AddButton from './components/AddButton';
import { Colxx } from "../../../components/common/CustomBootstrap";
import allUsersActions from "../../../redux/users/getAllUsersRedux";
import { ReactTableAdvancedCard } from "../../../containers/ui/ReactTableCards";
import IntlMessages from "../../../helpers/IntlMessages";
import AddNewModal from "../../../containers/pages/AddNewModal";
import addUserAction from "../../../redux/users/addUserRedux";
import editUserAction from "../../../redux/users/editUserRedux";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import addSociety from "../../../common/addSociety";
import Hoc from "../../../hoc/wrapperInputs";
import deleteUserActions from "../../../redux/users/deleteUserRedux";
import InputPattern from "../../../common/inputPattern";
import ListViewer from "../../../components/dashboards/ListViewer";
import Classes from "./style.module.css";
import ModalConfirm from "../../../components/dashboards/modalConfirm";
import { NotificationManager } from "../../../components/common/react-notifications";

const Wrapper = Hoc(InputPattern);
function DefaultDashboard(props) {
  const redux = useSelector(state => state);
  const [data, setData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [previous, setPrevious] = useState(false);
  const [isValid, setValidation] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setIdUser] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [clicked, setClick] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [imagePreviewUrl, setimagePreviewUrl] = useState(null);
  const [isOpenModalDelete, setisOpenModalDelete] = useState(false);
  const [preview, setPreview] = useState(false);
  let refUpdate = useRef(redux.editUser.loaded);
	let refAdd = useRef(redux.addUser.loaded);
	let refDelete = useRef(redux.deleteUser.loaded);

  const dispatch = useDispatch();
  const [dataTableColumns] = useState([
    {
      Header: props.intl.formatMessage({
        id: "users.logo"
      }),
      accessor: "logo",
      Cell: cell => {
        return (
          <div className={Classes.Society_Avatar}>
            <img
              width={"100px"}
              alt="edit"
              src={"https://api-mobilar.wereact.co/" + cell.value}
            />
          </div>
        );
      }
    },
    {
      Header: props.intl.formatMessage({
        id: "users.username"
      }),
      accessor: "username",
      Cell: cell => (
        <p onClick={() => {}} className="text-muted">
          {cell.value}
        </p>
      )
    },
    {
      Header: props.intl.formatMessage({
        id: "users.email"
      }),
      accessor: "email",
      Cell: props => <p className="text-muted">{props.value}</p>
    },
    {
      Header: props.intl.formatMessage({
        id: "users.name"
      }),
      accessor: "name",
      Cell: props => <p className="text-muted">{props.value}</p>
    },
    {
      Header: props.intl.formatMessage({ id: "users.role" }),
      accessor: "role",
      Cell: cell => <div>{cell.value}</div>
    },
    redux.auth.response.role === 'consumer' ? {}:
    {
      Header: props.intl.formatMessage({
        id: "users.edit"
      }),
      accesor: "Edit",
      maxWidth: 60,
      Cell: cell => (
        <i
          onClick={() => {
            onHandlerEditUser(cell);
          }}
          className={"iconsminds-pen-2 tableicons"}
        />
      )
    },
    redux.auth.response.role === 'consumer' ? {}:
    {
      Header: props.intl.formatMessage({
        id: "employee.delete tableicons"
      }),
      accessor: "Delete",
      maxWidth: 60,
      Cell: cell => (
        <i
          onClick={() => openDeleteConfirm(cell.original._id)}
          className={"simple-icon-trash tableicons"}
        />
      )
    }
  ]);

  useEffect(() => {
    setClick(false);
    dispatch(allUsersActions.allUsersRequest());

    localStorage.setItem(
      "__theme_color",
      redux.auth.response.theme ? redux.auth.response.theme : "light.purple"
    );

    return () => {
      setOpen(false);
      setData([]);
      localStorage.setItem(
        "__theme_color",
        redux.auth.response.theme ? redux.auth.response.theme : "light.purple"
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (redux.allUsers.loaded) {
      setData(redux.allUsers.response.response.asMutable({ deep: true }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redux.allUsers.loaded, redux.allUsers.response]);
  useEffect(() => {
    if (redux.addUser.loaded && redux.addUser.loaded !== refAdd.current) {
      setOpen(false);
      setPrevious(true);
      dispatch(allUsersActions.allUsersRequest());
      NotificationManager.success(
        'Thanks',
        props.intl.formatMessage({ id: 'user.add-succfully' }),
        3000,
        null,
        null
      );
      setUserDetails(addSociety(false, ""));
    }
   refAdd.current = null;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redux.addUser.loaded]);
  useEffect(() => {
    if (redux.editUser.loaded && redux.editUser.loaded !== refUpdate.current) {
      setOpen(false);
      dispatch(allUsersActions.allUsersRequest());
      NotificationManager.success(
        'Thanks',
        props.intl.formatMessage({ id: 'user.add-succfully' }),
        3000,
        null,
        null
      );
      setUserDetails(addSociety(false, ""));
    }
  refUpdate.current = null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redux.editUser.loaded]);

  useEffect(() => {
    if (redux.deleteUser.loaded && redux.deleteUser.loaded !== refDelete.current) {
      setisOpenModalDelete(false);
      dispatch(allUsersActions.allUsersRequest());
      NotificationManager.success(
        'Thanks',
        props.intl.formatMessage({ id: 'user.add-succfully' }),
        3000,
        null,
        null
      );
    }
  refDelete.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redux.deleteUser.loaded]);
  const openDeleteConfirm = cell => {
    setisOpenModalDelete(true);
    setIdUser(cell);
  };

  function deleteRequest() {
    dispatch(deleteUserActions.deleteUserRequest(id));
  }
  const onSendForm = form => {
    let data = {};
    for (let key in form) {
      data[key] = form[key].value;
      if (!form[key].touched || form[key].value === "") {
        delete data[key];
      } else if (form[key].elementType === "Select") {
        data[key] = form[key].value.value;
      }
    }
    return data;
  };

  function onHandlerEditUser(cell) {
    setIsEdit(true);
    setIdUser(cell.original._id);
    setUserDetails(addSociety(true, cell.original));
    setOpen(true);
    setimagePreviewUrl(null);
    setClick(false);
    setPreview(false);
  }

  function onHandlerAddUser() {
    setIsEdit(false);
    setimagePreviewUrl(null);
    setUserDetails(addSociety(false, ""));
    setOpen(true);
    setClick(false);
    setPreview(false);
  }
  function onHandlePreview(data) {
    setUserDetails(data);
    setOpen(true);
    setPreview(true);
    setIsEdit(false);
  }
  const onSendFormHandler = () => {
    setClick(true);
    if (isValid) {
      if (isEdit) {
        onEditUser(onSendForm(userDetails), id);
      } else {
        onAddUser(onSendForm(userDetails));
      }
    }
  };
  const onAddUser = data => {
    dispatch(addUserAction.addUserRequest(data));
  };
  const onEditUser = (data, id) => {
    dispatch(editUserAction.editUserRequest(data, id));
  };
  const onCloseModal = () => {
    setOpen(false);
  };
  const handleLogout = async () => {
    // await window.location.reload();
    await this.props.logoutHandler();
    await localStorage.removeItem("persist:root");
    await localStorage.removeItem("__theme_color");
  };
  let redirect = null;
  if (
    redux.allUsers &&
    redux.allUsers.response &&
    redux.allUsers.response.response &&
    redux.allUsers.response.response.status === 401
  ) {
    redirect = handleLogout();
  }
  let content = null;
  if (redux.allUsers.fetching) {
    content = <div className="loading" />;
  }
  content = (
    <Colxx xxs="12" className="mb-3">
      {redirect}
      <ModalConfirm
        isOpenModalDelete={isOpenModalDelete}
        setisOpenModalDelete={setisOpenModalDelete}
        deleteRequest={deleteRequest}
      />

      <Breadcrumb
        match={props.match}
        heading={<IntlMessages id="menu.users" />}
      />
      <ReactTableAdvancedCard data={data} dataTableColumns={dataTableColumns}>
       { redux.auth.response.role === 'consumer' ?<div/>:	<AddButton
						addfunction={() => {
							onHandlerAddUser();
						}}
					/>}
        <AddNewModal
          onSubmitForm={() => onSendFormHandler()}
          toggleModal={() => onCloseModal()}
          modalOpen={isOpen}
          preview={preview}
          // fetching={fetchingEdit}
          // error={errorEdit || errorAdd}
          clicked={clicked}
          addFetching={redux.addUser.fetching}
          drawerTitle="test"
          modaltitle={
            isEdit ? (
              <IntlMessages id="modaledit.users" />
            ) : (
              <IntlMessages id="modaltitle.users" />
            )
          }
        >
          <>
            {preview ? (
              <ListViewer
                data={userDetails}
                removedData={[
                  "delete",
                  "edit",
                  "valid",
                  "__v",
                  "createdAt",
                  "updatedAt",
                  "consumer",
                  "reseller",
                  "parent",
                  "details"
                ]}
              />
            ) : (
              <Wrapper
                setClick={setClick}
                setValidation={setValidation}
                isValid={isValid}
                clicked={clicked}
                form={userDetails}
                imagePreviewUrl={imagePreviewUrl}
                setimagePreviewUrl={setimagePreviewUrl}
                setPhoto={setPhoto}
                photo={photo}
                loaded={redux.addUser.loaded}
                error={redux.addUser.error || redux.editUser.error}
                errorMessage={
                  ((redux.addUser.response &&
                    redux.addUser.response.data &&
                    redux.addUser.response.data.message) ||  redux.addUser.response.message) ||
                  (redux.editUser.response &&
                    redux.editUser.response.data &&
                    redux.editUser.response.data.message)
                }
                edit={isEdit}
              />
            )}
          </>
        </AddNewModal>
        {/* <Modal isOpen={modalSmall} size="sm">
    <ModalBody>
      <span style={{ color: "green" }}>
        <IntlMessages id="alert.success" />
      </span>
    </ModalBody>
  </Modal> */}
      </ReactTableAdvancedCard>
    </Colxx>
  );

  return content;
}
export default injectIntl(DefaultDashboard);
