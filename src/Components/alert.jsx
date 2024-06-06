import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, Toast } from 'react-bootstrap';


function JumpAlert({ content, onCancel }) {
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCancel()
    }, 1000);

  }, []);

  return (
    <>
      <Toast bg="primary" text="white" className='p-0'>
        <Toast.Body>{content}</Toast.Body>
      </Toast>
    </>
  );
}

export default JumpAlert;
