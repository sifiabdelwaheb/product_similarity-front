import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';
import './style.css';
function ModalConfirm(props) {
  return (
    <Modal
      centered
      isOpen={props.isOpenModalDelete}
      toggle={props.toggle}
      className="Modal_Delete_confirm"
    >
      <ModalBody>
        <div
          style={{
            height: 150,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <IntlMessages id="deletemessage" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              color="primary"
              size="m"
              className="top-right-button"
              style={{ width: 150 }}
              onClick={() => props.setisOpenModalDelete(false)}
            >
              <IntlMessages id="cancel" />
            </Button>
            <Button
              color="danger"
              size="m"
              className="top-right-button"
              onClick={props.deleteRequest}
              style={{ width: 150 }}
            >
              <IntlMessages id="Delete" />
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default ModalConfirm;
