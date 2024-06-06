// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import * as Yup from 'yup';
// import { Modal, Button } from 'react-bootstrap';
// import EmployeeStore from '../mobx/EmployeeStore';
// import EditModel from './editModel';

// function EditEmp({ employeeId, onSave, onCancel }) {
//     const tmpEmp = EmployeeStore.employees.find(e => e.id === employeeId);

// const tmpEmpRoles = tmpEmp.employeeRoles ? tmpEmp.employeeRoles.slice() : [];

// const [initialValues, setInitialValues] = useState((employeeId !== -1) ?
//     {
//         ...tmpEmp,
//         employeeRoles: tmpEmpRoles
//     }
//     : {
//         firstName: "",
//         lastName: "",
//         tz: "",
//         startDate: "",
//         birthDate: "",
//         isMale: null,
//         status: true,
//         employeeRoles: []
//     }
// );


//     const validationSchema = Yup.object({
//         firstName: Yup.string()
//             .min(2, 'שם פרטי חייב להיות לפחות 2 תווים')
//             .required('שם פרטי הוא חובה'),
//         lastName: Yup.string()
//             .min(2, 'שם משפחה חייב להיות לפחות 2 תווים')
//             .required('שם משפחה הוא חובה'),
//         tz: Yup.string()
//             .matches(/^\d{9}$/, 'ת"ז חייבת להיות מורכבת מ-9 ספרות')
//             .required('ת"ז היא חובה'),
//         birthDate: Yup.date()
//             .required('תאריך לידה הוא חובה')
//             .test('age', 'תאריך לידה לא חוקי', value => {
//                 const today = new Date();
//                 const birthDate = new Date(value);
//                 const age = today.getFullYear() - birthDate.getFullYear();
//                 return age >= 18 && age <= 70;
//             }),
//         startDate: Yup.date()
//             .required('תאריך תחילת עבודה הוא חובה')
//             .min(Yup.ref('birthDate'), 'תאריך תחילת עבודה חייב להיות לפחות 18 שנה אחרי תאריך לידה')
//             .max(new Date(), 'תאריך תחילת עבודה לא יכול להיות בעתיד'),
//         isMale: Yup.boolean().required('יש לבחור מין')
//     });
//     const handleSubmit = (values) => {
//         console.log('!!!!!!!!!!!!!!!!')
//         // const hasErrors = Object.keys(errors).length > 0;

//         // if (hasErrors) {
//         //   console.error("יש שגיאות בטופס!");
//         //   return;
//         // }

//         onSave(values); // שלח נתונים מאומתים
//       };

//     return (
//         <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             //onSubmit={handleSubmit}
//         >
//             {({ values, handleChange, setFieldValue, errors, touched }) => (
//                 <Form>
//                     <Modal show={true} onHide={onCancel}>
//                         <Modal.Header>
//                             <Modal.Title>{employeeId !== -1 ? 'עריכת עובד' : 'הוספת עובד'}</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
//                                 <div style={{ textAlign: 'center' }}>
//                                     <label>שם פרטי</label>
//                                     <br />
//                                     <Field
//                                         className="form-control"
//                                         type="text"
//                                         name="firstName"
//                                     />
//                                     <ErrorMessage name="firstName" component="div" style={{ color: 'red' }} />
//                                 </div>
//                                 <div style={{ marginRight: '20px', textAlign: 'center' }}>
//                                     <label>שם משפחה</label>
//                                     <br />
//                                     <Field
//                                         className="form-control"
//                                         type="text"
//                                         name="lastName"
//                                     />
//                                     <ErrorMessage name="lastName" component="div" style={{ color: 'red' }} />
//                                 </div>
//                                 <div style={{ marginRight: '20px', textAlign: 'center' }}>
//                                     <label>ת"ז:</label>
//                                     <br />
//                                     <Field
//                                         className="form-control"
//                                         type="text"
//                                         name="tz"
//                                     />
//                                     <ErrorMessage name="tz" component="div" style={{ color: 'red' }} />
//                                 </div>
//                             </div>
//                             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
//                                 <div style={{ marginRight: '20px', textAlign: 'center' }}>
//                                     <label>תאריך לידה</label>
//                                     <br />
//                                     <DatePicker
//                                         className={`form-control ${errors.birthDate && touched.birthDate ? 'is-invalid' : ''}`}
//                                         selected={values.birthDate}
//                                         onChange={(date) => setFieldValue('birthDate', date)}
//                                         dateFormat="dd/MM/yyyy"
//                                     />
//                                     {errors.birthDate && touched.birthDate && (
//                                         <div style={{ color: 'red' }}>{errors.birthDate}</div>
//                                     )}
//                                 </div>
//                                 <div style={{ marginRight: '20px', textAlign: 'center' }}>
//                                     <label>תאריך תחילת עבודה</label>
//                                     <br />
//                                     <DatePicker
//                                         className={`form-control ${errors.startDate && touched.startDate ? 'is-invalid' : ''}`}
//                                         selected={values.startDate}
//                                         onChange={(date) => {setFieldValue('startDate', date)}}
//                                         dateFormat="dd/MM/yyyy"
//                                     />
//                                     {errors.startDate && touched.startDate && (
//                                         <div style={{ color: 'red' }}>{errors.startDate}</div>
//                                     )}
//                                 </div>
//                                 <div style={{ marginRight: '20px', textAlign: 'center' }}>
//                                     <input
//                                         type="radio"
//                                         name="isMale"
//                                         value="true"
//                                         checked={values.isMale === true}
//                                         onChange={() => setFieldValue('isMale', true)}
//                                     />
//                                     <label>זכר</label>
//                                     <br />
//                                     <input
//                                         type="radio"
//                                         name="isMale"
//                                         value="false"
//                                         checked={values.isMale === false}
//                                         onChange={() => setFieldValue('isMale', false)}
//                                     />
//                                     <label>נקבה</label>
//                                     <ErrorMessage name="isMale" component="div" style={{ color: 'red' }} />
//                                 </div>
//                             </div>
//                             <hr />
//                             <EditModel
//                                 emp={values}
//                                 setEmp={(newEmp) => setFieldValue('employeeRoles', newEmp.employeeRoles)}
//                             />
//                         </Modal.Body>
//                         <Modal.Footer>
//                             <Button variant="secondary" onClick={onCancel}>
//                                 ביטול
//                             </Button>
//                             {console.log("values: "+ JSON.stringify(values))}
//                             <Button variant="primary" onClick={handleSubmit} >
//                                 שמור
//                             </Button>
//                         </Modal.Footer>
//                     </Modal>
//                 </Form>
//             )}
//         </Formik>
//     );
// };

//  export default EditEmp;

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EmployeeStore from '../mobx/EmployeeStore';
import { Modal, Button, Popover } from 'react-bootstrap';
import EditModel from './editModel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
function EditEmp({ employeeId, onSave, onCancel }) {

    const [show, setShow] = useState(true);//בשביל המודל
    const tmpEmp = EmployeeStore.employees.find(e => e.id === employeeId)
    const [emp, setEmp] = useState((employeeId !== -1) ?
        tmpEmp.employeeRoles && tmpEmp.employeeRoles.length > 0 ?
            {
                ...EmployeeStore.employees.find(e => e.id === employeeId),
                employeeRoles: EmployeeStore.employees.find(e => e.id === employeeId).employeeRoles.slice()
            }
            : {
                ...EmployeeStore.employees.find(e => e.id === employeeId),
                employeeRoles: []
            }
        : {
            // id: EmployeeStore.id++,
            firstName: "",
            lastName: "",
            tz: "",
            startDate: "",
            birthDate: "",
            isMale: null,
            status: true,
            employeeRoles: []
        }
    );
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(2, 'שם פרטי חייב להיות לפחות 2 תווים')
            .required('שם פרטי הוא חובה'),
        lastName: Yup.string()
            .min(2, 'שם משפחה חייב להיות לפחות 2 תווים')
            .required('שם משפחה הוא חובה'),
        tz: Yup.string()
            .matches(/^\d{9}$/, 'ת"ז חייבת להיות מורכבת מ-9 ספרות')
            .required('ת"ז היא חובה'),
        birthDate: Yup.date()
            .required('תאריך לידה הוא חובה')
            .test('age', 'תאריך לידה לא חוקי', value => {
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                return age >= 18 && age <= 70;
            }),
        startDate: Yup.date()
            .required('תאריך תחילת עבודה הוא חובה')
            .min(Yup.ref('birthDate'), 'תאריך תחילת עבודה חייב להיות לפחות 18 שנה אחרי תאריך לידה')
            .max(new Date(), 'תאריך תחילת עבודה לא יכול להיות בעתיד'),
        isMale: Yup.boolean().required('יש לבחור מין')
    });
    const handleStartDateChange = (date) => {
        const dateObject = new Date(date); // המרת המחרוזת לאובייקט תאריך
        setEmp({ ...emp, startDate: dateObject });
    };
    const handleBirthDateChange = (date) => {
        const dateObject = new Date(date); // המרת המחרוזת לאובייקט תאריך
        setEmp({ ...emp, birthDate: dateObject });
    };
    const handleFemaleChange = event => {
        const { name, value } = event.target;
        const isMaleValue = value === "זכר";
        setEmp({ ...emp, [name]: isMaleValue });
    };
    const handleInputChange = event => {
        const { name, value } = event.target;
        setEmp({ ...emp, [name]: value })
    };
    const today = new Date();
    return (

        <div>
            <Formik
                initialValues={emp}
                validationSchema={validationSchema}
            >{({ errors, touched }) => (
                <Form>
                    {console.log('iddddd ' + emp.firstName)}
                    {/* {console.log('emp ssss ' + emp.employeeRoles[0].startRole)} */}
                    <Modal show={show} onHide={onCancel}>
                        <Modal.Header >
                            {employeeId !== -1 ? <Modal.Title>עריכת עובד</Modal.Title> : <Modal.Title>הוספת עובד</Modal.Title>}
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <label>שם פרטי</label>
                                    <br />
                                    <Field
                                        className={`form-control ${touched.firstName && errors.firstName ? 'is-invalid' : ''}`}
                                        type="text"
                                        name="firstName"
                                        value={emp.firstName}
                                        onChange={handleInputChange}
                                    />
                                    {touched.firstName && errors.firstName ? (
                                        <div style={{ color: 'red' }}>{errors.firstName}</div>
                                    ) : null}


                                </div>
                                <div style={{ marginRight: '20px', textAlign: 'center' }}>
                                    <label>שם משפחה</label>
                                    <br />
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="lastName"
                                        value={emp.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div style={{ marginRight: '20px', textAlign: 'center' }}>
                                    <label>ת"ז:</label>
                                    <br />
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="tz"
                                        value={emp.tz}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
                                <div style={{ marginRight: '20px', textAlign: 'center' }}>
                                    <label>תאריך לידה</label>
                                    <br />
                                    <DatePicker
                                        className="form-control"
                                        selected={emp.birthDate}
                                        onChange={handleBirthDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        startDate={emp.birthDate}
                                        minDate={new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())}
                                        maxDate={new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())}
                                    />
                                </div>
                                <div style={{ marginRight: '20px', textAlign: 'center' }}>
                                    <label>תאריך תחילת עבודה</label>
                                    <br />
                                    <DatePicker
                                        className="form-control"
                                        selected={emp.startDate}
                                        onChange={handleStartDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        startDate={emp.startDate}
                                        minDate={new Date(
                                            (emp.birthDate ? emp.birthDate.getFullYear() + 18 : today.getFullYear() - 70),
                                            today.getMonth(), today.getDate())}
                                        maxDate={new Date()}
                                    />
                                </div>
                                <div style={{ marginRight: '20px', textAlign: 'center' }}>
                                    <input
                                        type="radio"
                                        name="isMale"
                                        defaultChecked={emp.isMale}
                                        onChange={handleInputChange}
                                    />
                                    <label>זכר</label>
                                    <br />
                                    <input
                                        type="radio"
                                        name="isMale"
                                        defaultChecked={employeeId !== -1 ? !emp.isMale : null}
                                        onChange={handleFemaleChange}
                                    />
                                    <label>נקבה</label>
                                </div>
                            </div>
                            {/* {console.log('emp aaaa ' + emp.employeeRoles[0].startRole)} */}
                            <hr />
                            <EditModel
                                emp={emp}
                                setEmp={setEmp}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onCancel}>
                                ביטול
                            </Button>
                            <Button variant="primary" onClick={() => onSave(emp)}>
                                שמור
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
            )}
            </Formik>
        </div >
    );
};
{/*  */ }
export default EditEmp;