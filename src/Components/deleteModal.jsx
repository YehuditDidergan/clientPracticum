import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteModal({onSave, onCancel}) {
  const [show, setShow] = useState(true);
  return (
    <>
      <Modal show={show} onHide={onCancel}>
        <Modal.Header >
          <Modal.Title>מחיקת עובד</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          האם אתה בטוח שברצונך למחוק את העובד?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            ביטול
          </Button>
          <Button variant="primary" onClick={onSave}>
            מחק
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;