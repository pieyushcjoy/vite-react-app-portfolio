@import "tailwindcss";
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" );

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", sans-serif;
  background-color: #000;
  color: #fff;
  overflow-x: hidden;
}

/* Web3 Gradient Background */
.web3-gradient {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 25%, #1e1b4b 50%, #312e81 75%, #1e293b 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Web3 Gradient Text */
.web3-gradient-text {
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Section Titles */
.section-title {
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  border-radius: 2px;
}

/* Hero Title */
.hero-title {
  text-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
}

.text-shadow-glow {
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

/* Buttons */
.btn-web3 {
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  border: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-web3::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);
  transition: left 0.3s ease;
  z-index: -1;
}

.btn-web3:hover::before {
  left: 0;
}

.web3-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
}

/* Enhanced View Portfolio Button */
.view-portfolio-btn {
  position: relative;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  transition: all 0.4s ease;
  overflow: hidden;
}

.view-portfolio-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%);
  transition: left 0.4s ease;
  z-index: -1;
}

.view-portfolio-btn:hover::before {
  left: 0;
}

.view-portfolio-btn:hover {
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(139, 92, 246, 0.4);
}

.view-portfolio-btn:hover .btn-text::after {
  content: " — See Campaigns + Decks";
  color: white;
  font-weight: 600;
}

/* Web3 Border */
.web3-border {
  border: 1px solid rgba(139, 92, 246, 0.3);
  position: relative;
}

.web3-border::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3));
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

/* Web3 Glow Effect */
.web3-glow {
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
}

/* Card Hover Effects */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(139, 92, 246, 0.6);
}

/* Float Animation */
.float-animation {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Pulse Glow Animation */
.pulse-glow-animation {
  animation: pulseGlow 2s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
  50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
}

/* Animation Delays */
.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Hamburger Button Styles */
.hamburger-button {
  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger-line.open:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-line.open:nth-child(2) {
  opacity: 0;
}

.hamburger-line.open:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Menu Styles */
.mobile-menu-overlay {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 40;
}

.mobile-menu-overlay.open {
  transform: translateX(0);
}

.mobile-menu-content {
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
}

/* Endless Tag Ribbon Styles */
.endless-tag-ribbon-container {
  width: 100%;
  overflow: hidden;
  background: linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%);
  padding: 1rem 0;
  position: relative;
}

.endless-tag-ribbon {
  display: flex;
  animation: scroll-endless 25s linear infinite;
  white-space: nowrap;
}

.endless-tag {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  margin: 0 0.75rem;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 25px;
  color: #d1d5db;
  font-weight: 500;
  font-size: 0.9rem;
  text-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.endless-tag:hover {
  background: rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.4);
  text-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
  transform: scale(1.05);
}

@keyframes scroll-endless {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

/* Infinite Portfolio Styles */
.infinite-portfolio-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 2rem 0;
}

.infinite-portfolio-track {
  display: flex;
  transition: transform 0.1s linear;
  gap: 1rem;
}

.infinite-portfolio-card {
  min-width: 300px;
  max-width: 300px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.infinite-portfolio-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.6);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.card-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-logo-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
}

.card-title {
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.card-subtitle {
  color: #9ca3af;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.card-role {
  color: #a855f7;
  font-size: 0.875rem;
  font-weight: 500;
}

.card-achievements {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  flex-grow: 1;
}

.card-achievements li {
  color: #d1d5db;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.card-achievements .bullet {
  color: #a855f7;
  font-weight: bold;
  flex-shrink: 0;
}

.card-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.card-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
}

/* Mobile Responsive Adjustments */
@media (max-width: 768px) {
  .infinite-portfolio-card {
    min-width: 280px;
    max-width: 280px;
    height: 320px;
  }
  
  .endless-tag-ribbon {
    animation: scroll-endless 15s linear infinite;
  }
  
  .endless-tag {
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
    margin: 0 0.5rem;
  }
  
  .hero-title {
    font-size: 3rem !important;
  }

  /* Adjust navigation for smaller screens */
  .max-w-7xl.mx-auto.px-4.sm\:px-6.lg\:px-8 > div {
    padding-left: 1rem; /* Add some padding to the left */
    padding-right: 1rem; /* Add some padding to the right */
  }

  .max-w-7xl.mx-auto.px-4.sm\:px-6.lg\:px-8 .flex.justify-between.items-center.h-16 {
    justify-content: space-between; /* Ensure space between logo and hamburger */
  }

  .text-white.font-bold.text-xl.web3-gradient-text {
    margin-left: 0; /* Remove any extra left margin */
  }

  .mobile-menu-overlay {
    top: 64px; /* Ensure it starts below the nav bar */
  }
}

/* Touch device support for infinite portfolio */
@media (hover: none) and (pointer: coarse) {
  .infinite-portfolio-container {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
  
  .infinite-portfolio-card {
    scroll-snap-align: center;
  }
}

/* Smooth scrolling for the entire page */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);
}
