import React, { useEffect, useState } from 'react';
import '../styles/restaurant.css';
import { useNavigate } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import italy4 from "../../public/italy4.avif";
import italy5 from "../../public/italy5.avif";
import italy6 from "../../public/italy6.avif";
import italy7 from "../../public/italy7.avif";
import italy8 from "../../public/italy8.avif";
import italy9 from "../../public/italy9.avif";
import italy10 from "../../public/italy10.avif";

import pasta from "../../public/pasta.avif";
import steak from "../../public/steak.avif";
import desert from "../../public/desert.avif";

const RestaurantPage = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(true);
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setTimeout(() => setPageVisible(true), 50);

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`restaurant-page ${pageVisible ? 'page-visible' : 'page-hidden'}`}>
      <button
        className={`back-button ${showButton ? 'visible' : 'hidden'}`}
        onClick={() => navigate('/')}
      >
        ⬅ Back to Home
      </button>

      <header className="restaurant-header">
        <h1>Welcome to Bella Cucina</h1>
        <p>Explore our authentic Italian dishes crafted with love and tradition.</p>
      </header>

      <section className="restaurant-slideshow" data-aos="fade-up">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          modules={[Autoplay, EffectFade]}
        >
          {[
            { src: italy4, caption: "Rustic dining room with Italian charm" },
            { src: italy5, caption: "Master chefs at work" },
            { src: italy6, caption: "Fresh ingredients daily" },
            { src: italy7, caption: "Traditional wood-fired oven" },
            { src: italy8, caption: "Handmade pasta prep" },
            { src: italy9, caption: "Warm, welcoming ambiance" },
            { src: italy10, caption: "Culinary artistry in every dish" },
          ].map((item, index) => (
            <SwiperSlide key={index}>
              <div className="slide-content">
                <img src={item.src} alt={`Slide ${index + 1}`} className="slideshow-image" />
                <p className="slide-caption">{item.caption}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="dishes-gallery">
        <h2 data-aos="fade-up">Signature Dishes</h2>
        <div className="dish-grid">
          <div className="dish" data-aos="zoom-in-up">
            <img src={pasta} alt="Pasta" />
            <h3>Spaghetti Carbonara</h3>
            <p>Creamy Roman favorite with pancetta and Parmesan.</p>
          </div>
          <div className="dish" data-aos="zoom-in-up">
            <img src={steak} alt="Steak" />
            <h3>Florentine Steak</h3>
            <p>Juicy, grilled T-bone steak seasoned to perfection.</p>
          </div>
          <div className="dish" data-aos="zoom-in-up">
            <img src={desert} alt="Dessert" />
            <h3>Tiramisu</h3>
            <p>Classic layered dessert with mascarpone and espresso.</p>
          </div>
        </div>
      </section>

      <section className="testimonials" data-aos="fade-up">
        <h2>What Our Guests Say</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
        >
          {[
            "The best Italian dining experience I've had outside of Rome!",
            "Bella Cucina made my anniversary unforgettable. 10/10.",
            "Authentic food, warm ambiance, and amazing staff!",
          ].map((text, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial">
                <p>"{text}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default RestaurantPage;
