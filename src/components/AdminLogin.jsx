import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../styles/login.css"; // Ensure you have styles for the eye icon and other elements
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons
import { Link } from 'react-router-dom'; // Use Link from react-router-dom for client-side routing

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'gerardelibe@gmail.com' && password === 'Gerrard21$') {
      localStorage.setItem('user', JSON.stringify({
        email: 'gerardelibe@gmail.com',
        password: 'Gerrard21$',
        role: 'admin'
      }));

      toast.success('✅ Login Successful!');
      navigate('/admin');
    } else {
      toast.error('❌ Invalid credentials!');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-logo">
        <h2 className='text'>Admin Login</h2>
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="password-input">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setPasswordVisible(!passwordVisible)}
            style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%' }}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="non-admin-message">
        If you're not an admin, please go back to the <Link to="/">Home Page</Link>.
      </p>
    </div>
  );
}

export default AdminLogin;
