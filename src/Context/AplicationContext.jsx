import React, { createContext, useState, useEffect, useContext } from 'react';

export const ApplicationContext = createContext();

export const useApplication = () => useContext(ApplicationContext);

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('applicants')) || [];
      setApplications(stored);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }, []);

  const persistApplications = (apps) => {
    localStorage.setItem('applicants', JSON.stringify(apps));
    setApplications(apps);
  };

  const addApplication = (app) => {
    const ussid = localStorage.getItem('ussid'); // Retrieve ussid from localStorage

    const newApp = {
      ...app,
      status: 'pending',
      submittedAt: new Date().toLocaleString(),
      buttonsVisible: true,
      ussid, // Include ussid in the application
    };
    const updated = [newApp, ...applications];
    persistApplications(updated);
  };

  const updateApplicantStatus = (email, status) => {
    const updated = applications.map((a) =>
      a.email === email ? { ...a, status, buttonsVisible: false } : a
    );
    persistApplications(updated);
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplicantStatus,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
