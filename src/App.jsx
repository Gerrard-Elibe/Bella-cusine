import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ApplicationForm from './components/ApplicationForm';
import AdminDashboard from './components/AdminDashboard';
import RestaurantPage from './components/RestaurantPage';
import AdminLogin from './components/AdminLogin';
import {ApplicationProvider} from './Context/AplicationContext';

const App = () => {
  return (
    <ApplicationProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/restaurantpage" element={<RestaurantPage/>}/>
        <Route path="/AdminLogin" element={<AdminLogin/>}/>
      </Routes>
    </Router>
    </ApplicationProvider>
  );
};

export default App;
