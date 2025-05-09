import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ApplicationContext } from '../Context/AplicationContext';
import ReactModal from 'react-modal';
import '../styles/form.css';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { addApplication } = useContext(ApplicationContext);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const dataToSubmit = {
        ...formData,
        resume: formData.resume?.name || null,
        submittedAt: new Date().toISOString(),
      };

      addApplication(dataToSubmit);

      // Open the success modal
      setIsModalOpen(true);

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        resume: null,
      });

      setIsSubmitting(false);
    }, 1500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/'); // Navigate back to home page after closing the modal
  };

  return (
    <div className='main-container'>
      <div className="form-container">
        <button className="back-button" onClick={() => navigate('/')}>
          <FaArrowLeft /> Back to Home
        </button>

        <h2>Job Application</h2>

        <form onSubmit={handleSubmit} className="application-form">
          <label>
            Full Name:
            <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} />
          </label>

          <label>
            Email:
            <input type="email" name="email" required value={formData.email} onChange={handleChange} />
          </label>

          <label>
            Phone Number:
            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
          </label>

          <label>
  Position:
  <select name="position" required value={formData.position} onChange={handleChange}>
    <option value="">Select Position</option>
    <option value="Virtual Assistant">Virtual Assistant</option>
    <option value="Customer Service Representative">Customer Service Representative</option>
    <option value="Online Order Manager">Online Order Manager</option>

    <option value="Social Media Manager">Social Media Manager</option>
    <option value="Digital Marketer">Digital Marketer</option>
    <option value="Content Creator">Content Creator</option>
  </select>
</label>


          <label>
            Experience:
            <textarea name="experience" rows="4" required value={formData.experience} onChange={handleChange}></textarea>
          </label>

          <label>
            Upload Resume (optional):
            <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} />
          </label>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? <span className="spinner"></span> : 'Submit Application'}
          </button>
        </form>

        {/* Success Modal */}
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Application Success"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <h2 className="modal-title">Application Submitted!</h2>
          <p className="modal-message">
            Your application has been submitted successfully! We will review your application and get back to you shortly.
            <br />
            For any questions, you can contact us at +123-456-7890 or reach out to us on our social media handles.
          </p>
          <button onClick={closeModal} className="close-modal-button">
            Close
          </button>
        </ReactModal>
      </div>
    </div>
  );
};

export default ApplicationForm;
