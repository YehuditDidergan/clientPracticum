import './App.css'
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import EmployeeTable from './Components/EmployeeTable';
import EditModel from './Components/editModel';
import EmployeeStore from './mobx/EmployeeStore';
import Home from './Components/Home';
import Pic from './Components/pic';

function App() {
  const [render, setRender] = useState(false)
  
  const fetchData = async () => {
    await console.log("fetchData");
    try {
      await EmployeeStore.getAllEmployees();
      await console.log("after MobX");
    } catch (error) {
      console.error(error);
    }
    await setRender(true)
  };

  fetchData()

  return (
    <>
      <div className='container'>
        {render && <EmployeeTable />}
      </div>
    </>
  )
}

export default App;
