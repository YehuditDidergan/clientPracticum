import React, { useState } from 'react';
import { Modal, Popover, Button } from 'react-bootstrap';
import RoleStore from '../mobx/RoleStore';
import DatePicker from 'react-datepicker';

function AddRole({ role, handleFemale, handleStartDate }) {
    const [showPopover, setShowPopover] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const handleButtonClick = () => {
        setShowPopover(!showPopover);
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div
                target={document.getElementById("add-role-button")}
                placement="bottom"
                container={document.querySelector('.modal-body')} // או כל איבר אחר ב-DOM שתרצה
                className='divForRole'>
                <label>תפקיד מנהלי</label>
                <input
                    type="radio"
                    name="isManagement"
                    onChange={handleFemale}
                />
                <label>תאריך תחילת התפקיד</label>
                <DatePicker
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    onChange={handleStartDate}
                />
            </div>
        </>
    );
}

export default AddRole;