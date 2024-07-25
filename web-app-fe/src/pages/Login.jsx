import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

// Update the prefix based on your build tool
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter both email and password.',
      });
      return;
    }

    const requestData = { email, password };

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, requestData);

      if (response.status === 200) {
        const { token, user } = response.data.result;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        setAuthorizationToken(token);
        navigate('/addsales');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login failed. Please try again.',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred. Please try again.',
      });
    }
  };

  const setAuthorizationToken = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">LOGIN FORM</h3>
      <form onSubmit={login} className="shadow-sm p-3">
        <div className="mb-3">
          <label className="form-label text-muted">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-muted">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
