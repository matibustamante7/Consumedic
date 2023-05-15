import { Routes, Route } from 'react-router-dom';
import {
  Home,
  HomeNuevo,
  Landing,
  Login,
  DoctorsList,
  CreatePatient,
  PatientPanel,
  DoctorDetail,
} from './views';
import { useContext, useEffect } from 'react';

import { Context, UtilitiesContext } from './context/ContextProvider';

import './App.css';

const App = () => {
  const { fetchUtilities } = useContext(UtilitiesContext);

  useEffect(() => {
    fetchUtilities();
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* HOME NUEVO */}
        {/* <Route path="/home" element={<HomeNuevo />} /> */}
        {/* HOME NUEVO */}

        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<HomeNuevo />} />
        <Route path="/search" element={<DoctorsList />} />
        <Route path="/detail/:id" element={<DoctorDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreatePatient />} />
        <Route path="/patientpanel/:id" element={<PatientPanel />} />
      </Routes>
    </div>
  );
};

export default App;
