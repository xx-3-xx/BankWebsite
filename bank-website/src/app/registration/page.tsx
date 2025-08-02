'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistrationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    nric: '',
    phoneNumber: '',
    email: '',
    address: '',
    enableFacePay: true
  });
  const [faceImage, setFaceImage] = useState<string | null>(null);

  useEffect(() => {
    // Check for face image in sessionStorage instead of URL parameters
    const storedFaceImage = sessionStorage.getItem('capturedFaceImage');
    if (storedFaceImage) {
      setFaceImage(storedFaceImage);
      // Clear the stored image after retrieving it
      sessionStorage.removeItem('capturedFaceImage');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      enableFacePay: e.target.checked
    }));
  };

  const handleCaptureFace = () => {
    // Navigate to face scanning page
    router.push('/face-scan');
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.fullName || !formData.nric || !formData.phoneNumber || !formData.email || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registration successful:', result);
        // Navigate to next step
        router.push('/upload-documents');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        alert(`Registration failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Network error during registration. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      {/* Header */}
      <header className="header">
        <div className="logo">Bank</div>
        <a href="/logout" className="logout-link">Log out</a>
      </header>

      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-step active">
          <div className="step-number">1</div>
          <span className="step-text">New Customer Registration</span>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-number">2</div>
          <span className="step-text">Upload IC / Document</span>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-number">3</div>
          <span className="step-text">Link to Account</span>
        </div>
      </div>

      {/* Main Form */}
      <div className="form-container">
        <h1 className="form-title">NEW CUSTOMER REGISTRATION</h1>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nric">NRIC</label>
              <input
                type="text"
                id="nric"
                name="nric"
                value={formData.nric}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>
          </div>

          {/* FacePay Section */}
          <div className="facepay-section">
            <div className="facepay-toggle">
              <label htmlFor="enableFacePay">Enable FacePay?</label>
              <div className="toggle-container">
                <input
                  type="checkbox"
                  id="enableFacePay"
                  name="enableFacePay"
                  checked={formData.enableFacePay}
                  onChange={handleToggleChange}
                  className="toggle-input"
                />
                <label htmlFor="enableFacePay" className="toggle-label"></label>
              </div>
            </div>

            <div className="face-capture">
              <label>Capture Face</label>
              <div className="capture-container">
                <div className="face-preview">
                  {faceImage ? (
                    <img src={faceImage} alt="Captured face" />
                  ) : (
                    <div className="face-placeholder">
                      <div className="placeholder-icon">👤</div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="capture-button"
                  onClick={handleCaptureFace}
                >
                  CAPTURE
                </button>
              </div>
            </div>
          </div>

          <div className="form-row">
            <button type="submit" className="submit-button">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 