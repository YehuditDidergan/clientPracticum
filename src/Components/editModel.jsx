import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import RoleStore from '../mobx/RoleStore';
import { Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

function EditModel({ emp, setEmp }) {
  console.log(RoleStore.roles)
  const today = new Date();

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {console.log('emp in edit : ' + emp.startDate)}
        {/* {console.log('role in edit : '+emp.employeeRoles[0].id===RoleStore[0].name)} */}
        {RoleStore.roles.map((role, index) => {
          // Check if the role is already in employeeRoles
          // console.log(emp.employeeRoles)
          const isRoleSelected = emp && emp.employeeRoles && emp.employeeRoles.length > 0
            && emp.employeeRoles.some(employeeRole => RoleStore.roles.find(role => role.id === employeeRole.roleId))
          return (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
              <h5>{role.name}</h5>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input
                  type="radio"
                  id={`true-${index}`}
                  name={`isManagement-${index}`}
                  value={true}
                  checked={isRoleSelected && emp.employeeRoles.find(item => item.roleId === role.id)?.isManagement === true}
                  onChange={(e) => {
                    const updatedemployeeRoles = [...emp.employeeRoles];
                    const existingRoleIndex = emp.employeeRoles.findIndex(item => item.roleId === role.id);
                    if (existingRoleIndex !== -1) {
                      updatedemployeeRoles[existingRoleIndex] = { ...emp.employeeRoles[existingRoleIndex], isManagement: true };
                    } else {
                      updatedemployeeRoles.push({ roleId: role.id, isManagement: true, startRole: null });
                    }
                    setEmp({ ...emp, employeeRoles: updatedemployeeRoles });
                  }}
                />
                <label htmlFor={`true-${index}`}>ניהולי</label>

                <input
                  type="radio"
                  id={`false-${index}`}
                  name={`isManagement-${index}`}
                  value={false}
                  checked={isRoleSelected && emp.employeeRoles.find(item => item.roleId === role.id)?.isManagement === false}
                  onChange={(e) => {
                    const updatedemployeeRoles = [...emp.employeeRoles];
                    const existingRoleIndex = emp.employeeRoles.findIndex(item => item.roleId === role.id);
                    if (existingRoleIndex !== -1) {
                      updatedemployeeRoles[existingRoleIndex] = { ...emp.employeeRoles[existingRoleIndex], isManagement: false };
                    } else {
                      updatedemployeeRoles.push({ roleId: role.id, isManagement: false, startRole: null });
                    }
                    setEmp({ ...emp, employeeRoles: updatedemployeeRoles });
                  }}
                />
                <label htmlFor={`false-${index}`}>לא ניהולי</label>
              </div>

              <DatePicker
                className='form-control'
                dateFormat="dd/MM/yyyy"
                selected={isRoleSelected ? emp.employeeRoles.find(item => item.roleId === role.id)?.startRole : null}
                onChange={(date) => {
                  const updatedemployeeRoles = [...emp.employeeRoles];
                  const existingRoleIndex = emp.employeeRoles.findIndex(item => item.roleId === role.id);
                  if (existingRoleIndex !== -1) {
                    updatedemployeeRoles[existingRoleIndex] = { ...emp.employeeRoles[existingRoleIndex], startRole: date };
                    setEmp({ ...emp, employeeRoles: updatedemployeeRoles });
                  }
                }}
                minDate={new Date(emp.startDate?emp.startDate:today)}
                maxDate={new Date(today.getFullYear() + 50, today.getMonth(), today.getDate())}
              />
              {emp.employeeRoles.find(item => item.roleId === role.id) &&
                <button style={{ border: 'none' }} onClick={() => {
                  const updatedemployeeRoles = emp.employeeRoles.filter(item => item.roleId !== role.id);
                  setEmp({ ...emp, employeeRoles: updatedemployeeRoles });
                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg></button>}
            </div>
          );
        })}

      </div>
    </>
  );
}

export default EditModel;
