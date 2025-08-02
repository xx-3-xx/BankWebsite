'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './upload-documents.css';

export default function UploadDocumentsPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState({
    icFront: null as File | null,
    icBack: null as File | null,
    selfie: null as File | null
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (field: keyof typeof documents) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocuments(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required documents are uploaded
    if (!documents.icFront || !documents.icBack) {
      alert('Please upload both front and back of your IC');
      return;
    }

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      if (documents.icFront) formData.append('icFront', documents.icFront);
      if (documents.icBack) formData.append('icBack', documents.icBack);
      if (documents.selfie) formData.append('selfie', documents.selfie);

      const response = await fetch('/api/upload-documents', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Documents uploaded successfully:', result);
        // Navigate to final step
        router.push('/link-account');
      } else {
        const errorData = await response.json();
        console.error('Upload failed:', errorData);
        alert(`Upload failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during upload:', error);
      alert('Network error during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const goBack = () => {
    router.push('/registration');
  };

  return (
    <div className="upload-documents-container">
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
        <div className="progress-step active">
          <div className="step-number">2</div>
          <span className="step-text">Upload IC / Document</span>
        </div>
        <div className="progress-line"></div>
        <div className="progress-step">
          <div className="step-number">3</div>
          <span className="step-text">Link to Account</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="form-container">
        <h1 className="form-title">UPLOAD DOCUMENTS</h1>
        
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="document-section">
            <h3>Identity Card (IC)</h3>
            <p className="section-description">
              Please upload clear photos of your IC front and back
            </p>
            
            <div className="upload-row">
              <div className="upload-group">
                <label htmlFor="icFront">IC Front Side *</label>
                <input
                  type="file"
                  id="icFront"
                  accept="image/*"
                  onChange={handleFileChange('icFront')}
                  required
                />
                {documents.icFront && (
                  <div className="file-preview">
                    <span>✓ {documents.icFront.name}</span>
                  </div>
                )}
              </div>
              
              <div className="upload-group">
                <label htmlFor="icBack">IC Back Side *</label>
                <input
                  type="file"
                  id="icBack"
                  accept="image/*"
                  onChange={handleFileChange('icBack')}
                  required
                />
                {documents.icBack && (
                  <div className="file-preview">
                    <span>✓ {documents.icBack.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="document-section">
            <h3>Additional Documents (Optional)</h3>
            <p className="section-description">
              Upload a selfie for additional verification
            </p>
            
            <div className="upload-group">
              <label htmlFor="selfie">Selfie Photo</label>
              <input
                type="file"
                id="selfie"
                accept="image/*"
                onChange={handleFileChange('selfie')}
              />
              {documents.selfie && (
                <div className="file-preview">
                  <span>✓ {documents.selfie.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={goBack} className="back-button">
              ← Back
            </button>
            <button type="submit" disabled={isUploading} className="submit-button">
              {isUploading ? 'UPLOADING...' : 'UPLOAD DOCUMENTS'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 