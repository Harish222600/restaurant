'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /**
   * PRELOAD
   * 
   * loading will end after document is loaded
   */
  
  const preloader = document.querySelector("[data-preaload]");
  
  window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
  });
  
  
  /**
   * add event listener on multiple elements
   */
  
  const addEventOnElements = function (elements, eventType, callback) {
    elements.forEach(element => {
      element.addEventListener(eventType, callback);
    });
  }
  
  
  /**
   * NAVBAR
   */
  
  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const overlay = document.querySelector("[data-overlay]");
  
  const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  }
  
  addEventOnElements(navTogglers, "click", toggleNavbar);
  
  
  /**
   * HEADER & BACK TOP BTN
   */
  
  const header = document.querySelector("[data-header]");
  const backTopBtn = document.querySelector("[data-back-top-btn]");
  
  let lastScrollPos = 0;
  
  const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
  
    lastScrollPos = window.scrollY;
  }
  
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 50) {
      header.classList.add("active");
      backTopBtn.classList.add("active");
      hideHeader();
    } else {
      header.classList.remove("active");
      backTopBtn.classList.remove("active");
    }
  });
  
  
  /**
   * HERO SLIDER
   */
  
  const heroSlider = document.querySelector("[data-hero-slider]");
  const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
  const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
  const heroSliderNextBtn = document.querySelector("[data-next-btn]");
  
  let currentSlidePos = 0;
  let lastActiveSliderItem = heroSliderItems[0];
  
  const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
  }
  
  const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }
  
    updateSliderPos();
  }
  
  heroSliderNextBtn.addEventListener("click", slideNext);
  
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = heroSliderItems.length - 1;
    } else {
      currentSlidePos--;
    }
  
    updateSliderPos();
  }
  
  heroSliderPrevBtn.addEventListener("click", slidePrev);
  
  /**
   * Auto slide functionality for hero slider
   */
  
  let autoSlideInterval;
  
  const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
      slideNext();
    }, 7000);
  }
  
  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
  });
  
  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
  
  // Start auto slide on load
  autoSlide();
  
  
  /**
   * PARALLAX EFFECT
   */
  
  const parallaxItems = document.querySelectorAll("[data-parallax-item]");
  
  window.addEventListener("mousemove", function (event) {
    let x = (event.clientX / window.innerWidth * 10) - 5;
    let y = (event.clientY / window.innerHeight * 10) - 5;
  
    // reverse the number eg. 20 -> -20, -5 -> 5
    x = x - (x * 2);
    y = y - (y * 2);
  
    for (let i = 0, len = parallaxItems.length; i < len; i++) {
      let speed = Number(parallaxItems[i].dataset.parallaxSpeed);
      parallaxItems[i].style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0px)`;
    }
  });
  
  
  /**
   * TESTIMONIAL SLIDER
   */
  
  const testiSlider = document.querySelector('[data-testi-slider]');
  const testiItems = document.querySelectorAll('[data-testi-slider-item]');
  const prevBtn = document.querySelector('[data-testi-prev-btn]');
  const nextBtn = document.querySelector('[data-testi-next-btn]');
  let currentSlide = 0;
  
  function showSlide(index) {
    testiItems[currentSlide].classList.remove('active');
    currentSlide = (index + testiItems.length) % testiItems.length;
    testiItems[currentSlide].classList.add('active');
  }
  
  prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  
  // Auto-slide functionality (optional)
  setInterval(() => showSlide(currentSlide + 1), 5000); // Change slide every 5 seconds
  
});
