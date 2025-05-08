import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApplication } from '../Context/AplicationContext'; // Correct import path
import 'react-toastify/dist/ReactToastify.css';
import '../styles/admin.css';

const AdminDashboard = () => {
  const { applications, setApplications } = useApplication(); // Access global state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const applicantsPerPage = 5;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.email !== 'gerardelibe@gmail.com' || user.password !== 'Gerrard21$') {
      toast.error('❌ Unauthorized access. Please log in as Admin.');
      navigate('/AdminLogin');
    }
  }, [navigate]);

  const handleApprove = (index) => {
    const updated = [...applications];
    updated[index].status = 'accepted';
    setApplications(updated);
    toast.success('✅ Applicant Approved!');
  };

  const handleDecline = (index) => {
    const updated = [...applications];
    updated[index].status = 'declined';
    setApplications(updated);
    toast.error('❌ Applicant Declined.');
  };

  const handleToggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('✅ Logged out successfully.');
    navigate('/');
  };

  const filtered = applications.filter((a) => {
    const matchSearch = a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / applicantsPerPage);
  const currentApplicants = filtered.slice((currentPage - 1) * applicantsPerPage, currentPage * applicantsPerPage);

  return (
    <div className={darkMode ? 'admin-dashboard dark' : 'admin-dashboard'}>
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-actions">
          <button onClick={handleToggleDarkMode} className="dark-mode-toggle">
            {darkMode ? '🌞' : '🌙'}
          </button>
          <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
        </div>
      </div>

      <section className="search-filter">
        <input
          type="text"
          placeholder="Search applicants by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
        </select>
      </section>

      <section className="applicants-section">
        <h2>Applicants</h2>
        {currentApplicants.length === 0 ? (
          <p className="no-applicants">No applicants found.</p>
        ) : (
          currentApplicants.map((a, index) => (
            <div key={a.email} className="applicant-card">
              <h3>{a.fullName}</h3>
              <p><strong>Email:</strong> {a.email}</p>
              <p><strong>Phone:</strong> {a.phone}</p>
              <p><strong>Position:</strong> {a.position || 'N/A'}</p>
              <p><strong>Experience:</strong> {a.experience || a.bio}</p>
              <p><strong>Status:</strong> {a.status}</p>
              <p><strong>Submitted:</strong> {new Date(a.submittedAt).toLocaleString()}</p>
              <div className="admin-buttons">
                <button className="accept-btn" onClick={() => handleApprove(index)}>Accept</button>
                <button className="decline-btn" onClick={() => handleDecline(index)}>Decline</button>
              </div>
            </div>
          ))
        )}

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
