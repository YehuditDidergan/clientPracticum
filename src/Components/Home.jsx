import React, { useState, useEffect } from 'react';
import EmployeeStore from '../mobx/EmployeeStore';
export default function Home() {
    
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            
            setEmployees(data);
            console.log("home happen!!!!!!!!!!!!!")
        } catch (error) {
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const renderEmployees = () => {
        if (loading) {
            return <p>Loading...</p>;
        }

        return employees.map(employee => (
            <div key={employee.id}>
                <h3>{employee.name}</h3>
                {/* שדות נוספים של העובד */}
            </div>
        ));
    };

    return (
        <div>
            {renderEmployees()}
        </div>
    );
};

    






// import React from 'react';
// import IconButton from '@mui/material/IconButton';
// // import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import EditIcon from '@mui/icons-material/Edit';

// function MyComponent() {
//   return (
//     <div>
//       {/* <IconButton aria-label="הוספה">
//         <AddIcon />
//       </IconButton> */}
//       {/* <IconButton aria-label="מחיקה">
//         <DeleteIcon />
//       </IconButton> */}
//       {/* <IconButton aria-label="הורדה">
//         <CloudDownloadIcon />
//       </IconButton> */}
//       {/* <IconButton aria-label="עריכה">
//         <EditIcon />
//       </IconButton> */}
//     </div>
//   );
// }

// export default MyComponent;
