import React, { useEffect } from 'react';
import * as XLSX from 'xlsx';
import EmployeeStore from '../mobx/EmployeeStore';

function Download({ onCancel }) {
    const downloadExcel = () => {
        const data = EmployeeStore.employees.map(employee => {
            return {
                שם: employee.firstName,
                משפחה : employee.lastName,
                תז: employee.tz,
                תאריך: employee.startDate.toLocaleDateString()
            };
        });
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
        XLSX.writeFile(workbook, 'employees.xlsx');
    };

    useEffect(() => {
        downloadExcel();
        onCancel()
    }, []);
    return null;
}

export default Download;
