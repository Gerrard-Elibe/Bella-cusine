import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import restaurant from "../../public/restaurant.avif";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import '../styles/landing.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const updatedMessages = [...existingMessages, formData];
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    alert("Message submitted successfully!");
    setFormData({ name: '', email: '', message: '' });
  };

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero" data-aos="fade-up">
        <div className="hero-content">
          <h1 className="hero-title">Bella Cucina</h1>
          <p className="hero-subtitle">Experience authentic Italian cuisine at its best!</p>
          <h3 className="hero-motto">Join Our Kitchen Family</h3>
          <div className="hero-cta-buttons">
            <Link to="/apply">
              <button className="cta-button">Apply Now</button>
            </Link>
            <Link to="/restaurantpage">
              <button className="cta-button">View Restaurant</button>
            </Link>
          </div>
        </div>
        <div className="hero-image-container" data-aos="zoom-in">
          <img src={restaurant} alt="Restaurant interior" className="hero-image" />
        </div>
      </section>

      {/* Job Opportunities */}
      <section className="job-opportunities" data-aos="fade-up">
        <h2>Remote Job Opportunities</h2>
        <p>Join our innovative team and work from the comfort of your home. Explore our available remote roles:</p>
        <div className="job-list">
          {[
            "Virtual Assistant",
            "Customer Service Representative",
            "Online Order Manager",
            "Social Media Manager",
            "Digital Marketer",
            "Content Creator",
          ].map((role, index) => (
            <div key={index} className="job-item">
              <h3>{role}</h3>
              <p>{{
                "Virtual Assistant": "Support administrative tasks, manage communication, and keep things running smoothly.",
                "Customer Service Representative": "Assist customers with inquiries and ensure a delightful experience.",
                "Online Order Manager": "Monitor and coordinate incoming food orders efficiently.",
                "Social Media Manager": "Create engaging content and manage our online presence.",
                "Digital Marketer": "Drive customer engagement through digital campaigns and promotions.",
                "Content Creator": "Write menus, blogs, and social media content to promote our brand."
              }[role]}</p>
              <Link to="/apply">
                <button className="cta-button">Apply Now</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials" data-aos="fade-up">
        <h2>What Our Remote Team Says</h2>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000 }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="testimonial">
              <p>"Managing online orders from my home office has been smooth and fulfilling. Bella Cucina trusts and empowers us!"</p>
              <h4>- Michael, Online Order Manager</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial">
              <p>"As a VA, I handle daily tasks from anywhere. The flexibility has boosted my productivity and well-being."</p>
              <h4>- Emily, Virtual Assistant</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial">
              <p>"Customer support is meaningful when you work for a brand that truly cares. I love being part of the Bella team remotely."</p>
              <h4>- Sarah, Customer Service Representative</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial">
              <p>"Creating content and managing campaigns remotely is a dream come true. The culture is collaborative and inclusive."</p>
              <h4>- Daniel, Digital Marketer</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial">
              <p>"Even working from different cities, I feel connected. Bella Cucina has built an amazing remote work environment."</p>
              <h4>- Jessica, Content Creator</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="testimonial">
              <p>"Working remotely here has taught me how valuable and respected employees can feel—even from home."</p>
              <h4>- James, Social Media Manager</h4>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Contact Form */}
      <section className="get-in-touch" data-aos="fade-up">
        <h2>Get In Touch</h2>
        <p>We'd love to hear from you! Send us a message below.</p>
        <form className="get-in-touch-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="cta-button">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer" data-aos="fade-up">
        <div className="footer-content">
          <p>&copy; 2025 Bella Cucina | All Rights Reserved</p>
          <div className="footer-links">
            <Link to="/apply">Apply Now</Link>
          </div>
          <p>Follow Us on Social Media</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={30} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={30} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={30} /></a>
          </div>
          <div className="footer-links">
            <Link to="/admin">
              <button className="cta-button">Go to Admin Dashboard</button>
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
