import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    // Basic form validation
    if (!firstName || !lastName || !email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'All fields are required.',
      });
      return false;
    }
    
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid email format.',
      });
      return false;
    }
    
    // Check password length
    if (password.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Password must be at least 6 characters long.',
      });
      return false;
    }

    return true;
  };

  const signup = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const requestData = { firstName, lastName, email, password };

    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, requestData);

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'User successfully registered',
        });
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        navigate('/login');
      } else {
        console.error('Signup failed:', response.statusText);
        Swal.fire({
          icon: 'error',
          title: 'Signup failed. Please try again.',
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">REGISTRATION FORM</h3>
      <form onSubmit={signup} className="shadow-sm p-3">
        <div className="mb-3">
          <label className="form-label text-muted">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(ev) => setFirstName(ev.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-muted">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(ev) => setLastName(ev.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-muted">Email</label>
          <input
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-muted">Password</label>
          <input
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
