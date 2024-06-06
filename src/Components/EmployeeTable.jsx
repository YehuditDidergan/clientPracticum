import React, { useState, useEffect } from 'react';
import EditEmp from './EditEmployee'
import DeleteModal from './deleteModal';
import Download from './download';
import EmployeeStore from '../mobx/EmployeeStore';
import { Button } from 'react-bootstrap';
import { format } from 'date-fns';
import JumpAlert from './alert';
//import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function EmployeeTable() {
  //  EmployeeStore.getAllEmployees()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  const [searchTerm, setSearchTerm] = useState('');

  const [contentAlert, setContentAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const deleteEmployee = () => {
    EmployeeStore.removeEmployee(selectedEmployeeId)
    setShowDeleteModal(false)
    setSelectedEmployeeId(null)
    setShowAlert(true)
  };

  return (<>

    {console.log("see you")}
    {/* <button onClick={() => setSeeGet(true)}>ד עוזר</button> */}
    <h1>טבלת עובדים</h1>
    <input
      className="form-control"
      type="text"
      placeholder="חיפוש"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <div style={{ textAlign: 'right' }} >
      <Button variant="primary" onClick={() => setShowDownloadModal(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
        </svg>
      </Button>

      <Button style={{ marginRight: '5px' }}
        variant="primary" onClick={() => { setShowAddModal(true); setContentAlert("נוסף") }}>

        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
          <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
        </svg>
        {/* print */}
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-printer" viewBox="0 0 16 16">
            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
          </svg> */}
      </Button>
    </div>
    <table className="table">
      <thead>
        <tr>
          <th>מחיקה</th>
          <th>עריכה</th>
          <th>שם פרטי</th>
          <th>שם משפחה</th>
          <th>ת"ז</th>
          <th>תאריך תחילת עבודה</th>
        </tr>
      </thead>{
        <tbody>
          {EmployeeStore.employees
            .filter(employee =>
              employee.firstName.includes(searchTerm) ||
              employee.lastName.includes(searchTerm) ||
              employee.tz.includes(searchTerm) ||
              employee.startDate.toString().includes(searchTerm)
            )
            .map((employee) => (
              <tr key={employee.id}>
                <td>
                  <span onClick={() => { setShowDeleteModal(true); setSelectedEmployeeId(employee.id); setContentAlert("נמחק") }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3 text-primary" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </span>
                </td>
                <td>
                  <span onClick={() => { setShowEditModal(true); setSelectedEmployeeId(employee.id); setContentAlert("שונה") }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil text-primary" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                  </span>
                </td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.tz}</td>
                <td>{format(new Date(employee.startDate), 'dd/MM/yyyy')}</td>
              </tr>
            )
            )}
        </tbody>}
    </table>

    {showAddModal &&
      <EditEmp
        employeeId={-1}
        onSave={(updatedEmployees) => {
          EmployeeStore.addEmployee(updatedEmployees)
          setShowAddModal(false); setShowAlert(true)
        }}
        onCancel={() => setShowAddModal(false)}
      />}

    {showEditModal &&
      <EditEmp
        employeeId={selectedEmployeeId}
        onSave={(updatedEmployees) => {
          EmployeeStore.putEmployeeById(selectedEmployeeId, updatedEmployees)
          // if (EmployeeStore.putEmployeeById(selectedEmployeeId, updatedEmployees) == null) {
          //   setContentAlert("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
          //   console.log("fffffffffffff")
          // }
          setShowAlert(true)
          setShowEditModal(false); setSelectedEmployeeId(null);
        }}
        onCancel={() => { setShowEditModal(false); setSelectedEmployeeId(null) }}
      />}

    {showDeleteModal &&
      <DeleteModal
        onSave={deleteEmployee}
        onCancel={() => { setShowDeleteModal(false); setSelectedEmployeeId(null) }}
      />
    }

    {showAlert && (
      <JumpAlert
        content={"העובד " + contentAlert + " בהצלחה! 😀"}
        onCancel={() => setShowAlert(false)}
      />
    )}
    {showDownloadModal &&
      <Download
        onCancel={() => setShowDownloadModal(false)}
      />}

  </>
  );
}
export default EmployeeTable;
