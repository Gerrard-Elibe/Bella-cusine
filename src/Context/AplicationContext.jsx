import React, { createContext, useState, useEffect, useContext } from 'react';

export const ApplicationContext = createContext();

// Custom hook to use the ApplicationContext
export const useApplication = () => {
  return useContext(ApplicationContext);
};

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

  const addApplication = (app) => {
    const newApp = { ...app, status: 'pending', submittedAt: new Date().toLocaleString() };
    const updated = [newApp, ...applications];
    setApplications(updated);

    try {
      localStorage.setItem('applicants', JSON.stringify(updated));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return (
    <ApplicationContext.Provider value={{ applications, addApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
};
