import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Utility function to safely extract error messages
const extractErrorMessage = (errorData) => {
  if (!errorData) return 'An error occurred';
  
  // If it's already a string, return it
  if (typeof errorData === 'string') return errorData;
  
  // If it's an array, extract messages from each item
  if (Array.isArray(errorData)) {
    return errorData.map(item => {
      if (typeof item === 'string') return item;
      if (typeof item === 'object') {
        return item.msg || item.message || 'Validation error';
      }
      return 'Validation error';
    }).join(', ');
  }
  
  // If it's an object, look for common error message fields
  if (typeof errorData === 'object') {
    return errorData.detail || errorData.message || errorData.msg || 'Validation error';
  }
  
  return 'An error occurred';
};

function App() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    cnic: '',
    date_of_birth: '',
    phone_number: '',
    address: '',
    degree: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post('http://localhost:8000/students/', formData);
      setSuccess('Student registered successfully! 🎉');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        cnic: '',
        date_of_birth: '',
        phone_number: '',
        address: '',
        degree: ''
      });
      console.log('Student created:', response.data);
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error response data:', error.response?.data);
      
      const errorMessage = extractErrorMessage(error.response?.data);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="background-overlay"></div>
      <div className="content-container">
        <header className="App-header">
          <h1>🎓 Student Registration Form</h1>
          <p>Complete your academic journey with us</p>
        </header>
        
        <main className="App-main">
          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cnic">CNIC *</label>
                <input
                  type="text"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleChange}
                  placeholder="33100-2234567-1"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date_of_birth">Date of Birth *</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="03001234567"
                />
              </div>
              <div className="form-group">
                <label htmlFor="degree">Degree/Program *</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="BSc Computer Science"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your residential address"
              />
            </div>

            <button 
              type="submit" 
              className={`submit-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register Student'}
            </button>
          </form>
          
          {error && (
            <div className="message error">
              <span className="message-icon">⚠️</span>
              <span>{typeof error === 'string' ? error : 'An error occurred. Please try again.'}</span>
            </div>
          )}
          
          {success && (
            <div className="message success">
              <span className="message-icon">✅</span>
              <span>{success}</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;