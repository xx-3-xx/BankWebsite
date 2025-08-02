'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FaceScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError(null);
      }
    } catch (err) {
      setError('Unable to access camera. Please check permissions.');
      console.error('Camera access error:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsStreaming(false);
    }
  };

  const captureImage = () => {
    console.log('Capture image called');
    console.log('Video ref:', videoRef.current);
    console.log('Canvas ref:', canvasRef.current);
    
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      console.log('Video dimensions:', video.videoWidth, 'x', video.videoHeight);

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        console.log('Image captured, size:', imageData.length);
        setCapturedImage(imageData);
        stopCamera();
      } else {
        console.error('Could not get canvas context');
      }
    } else {
      console.error('Video or canvas ref not available');
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setError(null);
    startCamera();
  };

  const processFaceImage = async () => {
    if (!capturedImage) return;

    setIsProcessing(true);
    try {
      const response = await fetch('/api/face-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: capturedImage
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Store the face image in sessionStorage instead of URL parameter
        sessionStorage.setItem('capturedFaceImage', capturedImage);
        // Navigate back to registration
        router.push('/registration');
      } else {
        setError('Face processing failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Face processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const goBack = () => {
    stopCamera();
    router.push('/registration');
  };

  return (
    <div className="face-scan-container">
      <header className="face-scan-header">
        <button onClick={goBack} className="back-button">
          ← Back
        </button>
        <h1>Face Capture</h1>
        <div></div> {/* Spacer for flex layout */}
      </header>

      <div className="face-scan-content">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={startCamera} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {!capturedImage ? (
          <div className="camera-section">
            <div className="camera-container">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="camera-video"
              />
              {!isStreaming && (
                <div className="camera-placeholder">
                  <div className="camera-icon">📷</div>
                  <p>Camera not available</p>
                </div>
              )}
            </div>
            
            {/* Hidden canvas for capturing images */}
            <canvas
              ref={canvasRef}
              style={{ display: 'none' }}
            />
            
            <div className="capture-instructions">
              <h3>Instructions</h3>
              <ul>
                <li>Position your face in the center of the frame</li>
                <li>Ensure good lighting</li>
                <li>Look directly at the camera</li>
                <li>Keep your face steady</li>
              </ul>
            </div>

            <button
              onClick={captureImage}
              disabled={!isStreaming}
              className="capture-button"
            >
              CAPTURE PHOTO
            </button>
          </div>
        ) : (
          <div className="preview-section">
            <div className="image-preview">
              <img src={capturedImage} alt="Captured face" />
            </div>
            
            <div className="preview-actions">
              <button onClick={retakePhoto} className="retake-button">
                RETAKE PHOTO
              </button>
              <button
                onClick={processFaceImage}
                disabled={isProcessing}
                className="process-button"
              >
                {isProcessing ? 'PROCESSING...' : 'USE THIS PHOTO'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 