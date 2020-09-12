import React, { Fragment, useEffect, useState, useRef } from "react";
import { injectIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import AddButton from "./components/AddButton";
import moment from "moment";
import { Colxx } from "../../../components/common/CustomBootstrap";
import allEmployeeActions from "../../../redux/employee/getAllEmployeesRedux";
import allIncapacityActions from "../../../redux/incapacity/getIncapacityRedux";
import AddEmployeeActions from "../../../redux/employee/addEmployeeRedux";
import addEmployee from "../../../common/addEmployee";
import updateEmployeeActions from "../../../redux/employee/updateEmployeeRedux";
import deleteEmployeeActions from "../../../redux/employee/deleteEmployeeRedux";
import { ReactTableAdvancedCard } from "../../../containers/ui/ReactTableCards";
import IntlMessages from "../../../helpers/IntlMessages";
import AddNewModal from "../../../containers/pages/AddNewModal";
import Hoc from "../../../hoc/wrapperInputs";
import InputPattern from "../../../common/inputPattern";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { NotificationManager } from "../../../components/common/react-notifications";

const Wrapper = Hoc(InputPattern);
function EmployeeDefault(props) {
  const [data, setData] = useState([]);
  const [dataTableColumns, setdataTableColumns] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [modalSmall, setModalSmall] = useState(false);
  const [deleteVerif, setdeleteVerif] = useState(false);
  const [isValid, setValidation] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [selectedId, setSelectedId] = useState();
  const [clicked, setClick] = useState(false);
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  // Refs for  loaded previous state
  let refUpdate = useRef(redux.updateEmployees.loaded);
  let refAdd = useRef(redux.addEmployees.loaded);
  let refDelete = useRef(redux.deleteEmployees.loaded);
  useEffect(() => {
    dispatch(allEmployeeActions.allEmployeeRequest());
    dispatch(allIncapacityActions.allIncapacityRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(
    () => {
      if (
        redux.deleteEmployees.loaded &&
        redux.deleteEmployees.loaded !== refDelete.current
      ) {
        dispatch(allEmployeeActions.allEmployeeRequest());
        setdeleteVerif(false);
        NotificationManager.success(
          "Thanks",
          props.intl.formatMessage({ id: "user.add-succfully" }),
          3000,
          null,
          null
        );
      }
      refDelete.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [redux.deleteEmployees.loaded]
  );

  useEffect(
    () => {
      if (
        redux.addEmployees.loaded &&
        redux.addEmployees.loaded !== refAdd.current
      ) {
        dispatch(allEmployeeActions.allEmployeeRequest());
        onCloseModalHandler();
        NotificationManager.success(
          "Thanks",
          props.intl.formatMessage({ id: "user.add-succfully" }),
          3000,
          null,
          null
        );
        setUserDetails(addEmployee(false, ""));
      }
      refAdd.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [redux.addEmployees.loaded]
  );
  // edit success
  useEffect(
    () => {
      if (
        redux.updateEmployees.loaded &&
        redux.updateEmployees.loaded !== refUpdate.current
      ) {
        dispatch(allEmployeeActions.allEmployeeRequest());
        onCloseModalHandler();
        // setModalSmall(true);
        // setTimeout(() => {
        // 	setModalSmall(false);
        // }, 2000);
        NotificationManager.success(
          "Thanks",
          props.intl.formatMessage({ id: "user.add-succfully" }),
          3000,
          null,
          null
        );
        setUserDetails(addEmployee(false, ""));
      }
      refUpdate.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [redux.updateEmployees.loaded]
  );
  useEffect(
    () => {
      if (redux.allEmployees.loaded) {
        setData(redux.allEmployees.response.docs.asMutable({ deep: true }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [redux.allEmployees.loaded]
  );

  // convert finalobj to a valid object to send to API
  function dataObj(obj) {
    let finalData = {};
    for (let key in obj) {
      if (key === "status") {
        finalData[key] = obj[key].value.value;
      } else {
        finalData[key] = obj[key].value;
      }
    }

    return finalData;
  }

  // edit functions
  function onHandlerEditUser(cell, id) {
    setEdit(true);
    console.log("cell.original", cell.original);
    setUserDetails(addEmployee(true, cell.original));
    console.log("userdetails:", userDetails);
    setSelectedId(id);
    setOpen(true);
    console.log("userdetails:2", userDetails);
  }
  function onHandlerDeleteEmployee(id) {
    dispatch(deleteEmployeeActions.deleteEmployeeRequest(id));
    setSelectedId("");
  }

  //modal closer
  function onCloseModalHandler() {
    setOpen(false);
    setClick(false);
  }
  function openDeleteModal(id) {
    setdeleteVerif(true);
    setSelectedId(id);
  }
  // add user form submit
  function onSubmitForm() {
    setClick(true);
    if (isValid) {
      if (!edit) {
        dispatch(AddEmployeeActions.addEmployeeRequest(dataObj(userDetails)));
      } else {
        dispatch(
          updateEmployeeActions.updateEmployeeRequest(
            dataObj(userDetails),
            selectedId
          )
        );
        setSelectedId("");
      }
    }
  }
  // add employee form
  function onHandlerAddEmployee() {
    setEdit(false);
    setUserDetails(addEmployee(false, ""));
    setOpen(true);
  }
  useEffect(
    () => {
      const arr = [];
      if (data.length > 0) {
        const obj = Object.assign(data[0], {});
        obj.edit = true;
        obj.delete = true;
        obj.preview = true;
        delete obj.valid;
        delete obj.parent;
        delete obj.__v;
        delete obj.createdAt;
        delete obj.updatedAt;
        delete obj.role;
        delete obj.password;
        delete obj.confirmPassword;
        Object.keys(obj).forEach(item => {
          const dates = [
            "nbDaysLeaveRestitution",
            "beginDateContract",
            "beginDateRestitution"
          ];
          arr.push({
            Header: props.intl.formatMessage({
              id: "employee." + item
            }),
            accessor: item === "_id" ? null : item,
            maxWidth:
              item === "_id"
                ? 0
                : item === "reseller" ||
                  item === "edit" ||
                  item === "delete" ||
                  item === "preview"
                ? 40
                : item === "status"
                ? 50
                : 150,
            Cell: cell => {
              if (item === "_id") {
                return null;
              } else {
                if (
                  item === "edit" ||
                  item === "delete" ||
                  item === "preview"
                ) {
                  return (
                    <i
                      onClick={() =>
                        item === "delete"
                          ? openDeleteModal(cell.original._id)
                          : item === "edit"
                          ? onHandlerEditUser(cell, cell.original._id)
                          : props.history.push({
                              pathname:
                                props.location.pathname +
                                "/" +
                                cell.original._id,
                              state: { employee: cell.original }
                            })
                      }
                      className={
                        item === "edit"
                          ? "iconsminds-pen-2 tableicons"
                          : item === "delete"
                          ? "simple-icon-trash tableicons"
                          : "simple-icon-eye tableicons"
                      }
                    />
                  );
                } else {
                  return (
                    <Fragment>
                      {cell.value === "_id" ? null : (
                        <p className="list-item-heading">
                          {typeof cell.value === "boolean" ? (
                            cell.value === true ? (
                              props.intl.formatMessage({
                                id: "user.status-true"
                              })
                            ) : (
                              props.intl.formatMessage({
                                id: "user.status-false"
                              })
                            )
                          ) : (
                            <span onClick={() => console.log("user")}>
                              {dates.includes(item)
                                ? moment(cell.value).format("MMM Do YY")
                                : cell.value}
                            </span>
                          )}
                        </p>
                      )}
                    </Fragment>
                  );
                }
              }
            }
          });
        });
        setdataTableColumns(arr);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, props, props.intl, props.match.url]
  );

  return (
    <Colxx xxs="12" className="mb-3">
      <Breadcrumb
        match={props.match}
        heading={<IntlMessages id="menu.employee" />}
      />
      <ReactTableAdvancedCard data={data} dataTableColumns={dataTableColumns}>
        <AddButton
          addfunction={() => {
            onHandlerAddEmployee();
          }}
        />

        <AddNewModal
          onSubmitForm={() => onSubmitForm()}
          toggleModal={onCloseModalHandler}
          modalOpen={isOpen}
          // fetching={fetchingEdit}
          // error={errorEdit || errorAdd}
          // clicked={clicked}
          // addFetching={fetchingAdd}
          drawerTitle="test"
          modaltitle={
            edit ? (
              <IntlMessages id="modaledit.employee" />
            ) : (
              <IntlMessages id="modaltitle.employee" />
            )
          }
        >
          <Wrapper
            setClick={setClick}
            setValidation={setValidation}
            isValid={isValid}
            clicked={clicked}
            form={userDetails}
            imagePreviewUrl={data.logo}
            loaded={redux.addEmployees.loaded}
            error={redux.addEmployees.error || redux.updateEmployees.error}
            errorMessage={
              (redux.addEmployees.response.response &&
                redux.addEmployees.response.response.data &&
                redux.addEmployees.response.response.data.message) ||
              (redux.updateEmployees.response &&
                redux.updateEmployees.response.data &&
                redux.updateEmployees.response.data.message)
            }
            // edit={edit}
          />
          {/* {isEdit
				  ? this.renderInputs(editable)
				  : this.renderInputs(addUserForm(data && data.groups).addUser)} */}
        </AddNewModal>
        <Modal
          isOpen={modalSmall}
          toggle={() => setModalSmall(false)}
          size="sm"
        >
          <ModalBody>
            {" "}
            <span style={{ color: "green" }}>
              <IntlMessages id="alert.success" />
            </span>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={deleteVerif}
          toggle={() => setdeleteVerif(false)}
          style={{ width: "400px" }}
        >
          <ModalBody>
            <div
              style={{
                height: 140,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <h3>
                <IntlMessages id="deletemessage" />
              </h3>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  color="danger"
                  size="m"
                  className="top-right-button"
                  style={{ width: 140 }}
                  onClick={() => onHandlerDeleteEmployee(selectedId)}
                >
                  <IntlMessages id="Delete" />
                </Button>
                <Button
                  color="danger"
                  size="m"
                  className="top-right-button"
                  style={{ width: 140 }}
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
export default injectIntl(EmployeeDefault);
