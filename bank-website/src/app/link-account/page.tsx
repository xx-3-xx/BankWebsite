'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './link-account.css';

export default function LinkAccountPage() {
  const router = useRouter();
  const [accountData, setAccountData] = useState({
    accountNumber: '',
    bankName: '',
    accountType: 'savings'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountData.accountNumber || !accountData.bankName) {
      alert('Please fill in account number and bank name');
      return;
    }

    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/link-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Account linked successfully:', result);
        alert('Registration completed successfully! Your account has been created.');
        // Navigate to success page or dashboard
        router.push('/registration-success');
      } else {
        const errorData = await response.json();
        console.error('Account linking failed:', errorData);
        alert(`Account linking failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during account linking:', error);
      alert('Network error during account linking. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const goBack = () => {
    router.push('/upload-documents');
  };

  return (
    <div className="link-account-container">
      {/* Header */}
      <header className="header">
        <div className="logo">Bank</div>
        <a href="/logout" className="logout-link">Log out</a>
      </header>

      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-step completed">
          <div className="step-number">✓</div>
          <span className="step-text">New Customer Registration</span>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step completed">
          <div className="step-number">✓</div>
          <span className="step-text">Upload IC / Document</span>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step active">
          <div className="step-number">3</div>
          <span className="step-text">Link to Account</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="form-container">
        <h1 className="form-title">LINK TO ACCOUNT</h1>
        
        <form onSubmit={handleSubmit} className="link-account-form">
          <div className="account-section">
            <h3>Bank Account Information</h3>
            <p className="section-description">
              Link your existing bank account for seamless transactions
            </p>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="accountNumber">Account Number *</label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={accountData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your account number"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bankName">Bank Name *</label>
                <select
                  id="bankName"
                  name="bankName"
                  value={accountData.bankName}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Bank</option>
                  <option value="maybank">Maybank</option>
                  <option value="cimb">CIMB Bank</option>
                  <option value="public">Public Bank</option>
                  <option value="rhb">RHB Bank</option>
                  <option value="hongleong">Hong Leong Bank</option>
                  <option value="ambank">AmBank</option>
                  <option value="alliance">Alliance Bank</option>
                  <option value="affin">Affin Bank</option>
                  <option value="bankislam">Bank Islam</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="accountType">Account Type</label>
                <select
                  id="accountType"
                  name="accountType"
                  value={accountData.accountType}
                  onChange={handleInputChange}
                >
                  <option value="savings">Savings Account</option>
                  <option value="current">Current Account</option>
                  <option value="fixed">Fixed Deposit</option>
                </select>
              </div>
                         </div>
           </div>

           <div className="form-actions">
            <button type="button" onClick={goBack} className="back-button">
              ← Back
            </button>
            <button type="submit" disabled={isProcessing} className="submit-button">
              {isProcessing ? 'PROCESSING...' : 'COMPLETE REGISTRATION'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 