// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo">SYNCREO</Link>
        <div className="nav-links">
          <ScrollLink to="features" smooth={true} duration={500}>
            Features
          </ScrollLink>
          <ScrollLink to="how-it-works" smooth={true} duration={500}>
            How It Works
          </ScrollLink>
          <ScrollLink to="testimonials" smooth={true} duration={500}>
            Testimonials
          </ScrollLink>
          <Link to="/register" className="signup-link">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Connect & Create with Syncreo</h1>
          <p>Where artistry meets opportunity. Join our community of creatives and clients.</p>
          <ScrollLink to="features" smooth={true} duration={500}>
            <button className="cta-button">Explore Features</button>
          </ScrollLink>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Our Unique Features</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>Secure Payments</h3>
            <p>Fast, protected transactions for peace of mind.</p>
          </div>
          <div className="feature-item">
            <h3>Collaborative Tools</h3>
            <p>Seamless communication for effective project delivery.</p>
          </div>
          <div className="feature-item">
            <h3>Showcase Portfolios</h3>
            <p>Create and display your artistic journey.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">1</div>
            <h3>Sign Up</h3>
            <p>Join as an artist or client, set up your profile.</p>
          </div>
          <div className="step">
            <div className="step-icon">2</div>
            <h3>Find & Connect</h3>
            <p>Browse projects and talent, connect and collaborate.</p>
          </div>
          <div className="step">
            <div className="step-icon">3</div>
            <h3>Get Paid</h3>
            <p>Complete projects and manage payments securely.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-carousel">
          <div className="testimonial">
            <p>"Syncreo makes finding commissions easy and enjoyable!"</p>
            <h4>- Alex B.</h4>
          </div>
          <div className="testimonial">
            <p>"The perfect platform for creatives to thrive and collaborate."</p>
            <h4>- Jordan C.</h4>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="final-cta">
        <h2>Ready to Begin?</h2>
        <Link to="/register">
          <button className="cta-button">Join Syncreo</button>
        </Link>
      </section>
    </div>
  );
}

export default LandingPage;
