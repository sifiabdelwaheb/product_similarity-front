import React from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import IntlMessages from "../../helpers/IntlMessages";

const AddNewModal = props => {
  const pathname = window.location.pathname;
  return (
    <Modal
      isOpen={props.modalOpen}
      toggle={props.toggleModal}
      wrapClassName="modal-left"
      backdrop="static"
    >
      <ModalHeader className="text-primary" toggle={props.toggleModal}>
       {props.modaltitle}
      </ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>
        {!props.preview ? (
          <>
            <Button color="secondary" outline onClick={props.toggleModal}>
              <IntlMessages id="cancel" />
            </Button>
            <Button color="primary" onClick={props.onSubmitForm}>
              <IntlMessages id="submit" />
            </Button>
          </>
        ) : null}{" "}
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
