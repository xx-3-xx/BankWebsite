import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome to Bank</h1>
          <p className={styles.subtitle}>Your trusted financial partner</p>
        </div>

        <div className={styles.content}>
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>Secure Banking</h3>
              <p>Advanced security measures to protect your financial information</p>
            </div>
            <div className={styles.feature}>
              <h3>FacePay Technology</h3>
              <p>Revolutionary face recognition for secure payments</p>
            </div>
            <div className={styles.feature}>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support for all your banking needs</p>
            </div>
          </div>

          <div className={styles.ctas}>
            <a
              className={styles.primary}
              href="/registration"
            >
              New Customer Registration
            </a>
            <a
              href="/login"
              className={styles.secondary}
            >
              Existing Customer Login
            </a>
          </div>
        </div>
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2024 Bank. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
