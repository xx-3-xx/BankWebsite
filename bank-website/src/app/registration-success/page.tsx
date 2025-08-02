'use client';

import { useRouter } from 'next/navigation';
import './registration-success.css';

export default function RegistrationSuccessPage() {
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1 className="success-title">Registration Successful!</h1>
        <p className="success-message">
          Congratulations! Your account has been created successfully. You can now access all our banking services.
        </p>
        
        <div className="success-details">
          <h3>What's Next?</h3>
          <ul>
            <li>You will receive a confirmation email shortly</li>
            <li>Your account details will be sent via SMS</li>
            <li>You can start using our mobile banking app</li>
            <li>Visit any branch to collect your ATM card</li>
          </ul>
        </div>

        <div className="success-actions">
          <button onClick={goToHome} className="home-button">
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
} 