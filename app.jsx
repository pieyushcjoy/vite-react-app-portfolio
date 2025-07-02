import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { ExternalLink, Download, Calendar, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import './App.css'

import pieyushHeadshot from './assets/pieyush-headshot.jpeg'
import gemsLogo from './assets/gems-logo.png'
import triskelWalletLogo from './assets/triskel-wallet.png'
import salutebankLogo from './assets/salutebank.png'
import heliumWarsLogo from './assets/helium-wars.png'

// Import skill icons
import tokenDesignIcon from './assets/token-design.png'
import growthMarketingIcon from './assets/growth-marketing.png'
import web3ToolsIcon from './assets/web3-tools.png'
import productManagementIcon from './assets/product-management.png'
import ecosystemGrowthIcon from './assets/ecosystem-growth.png'
import analyticalToolsIcon from './assets/analytical-tools.png'

// Three.js imports
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Simple 3D Scene Component with parallax effect
const Scene = () => {
  const meshRef = useRef()
  const { camera } = useThree()
  const scrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      // Rotate the sphere
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.005

      // Simple parallax effect: move the sphere based on scroll
      // Adjust these values for desired effect
      meshRef.current.position.y = -scrollY.current * 0.001
      meshRef.current.position.x = Math.sin(scrollY.current * 0.0005) * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

// Navigation Component with scroll effects and mobile menu
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'verticals', label: 'Verticals' },
    { id: 'experience', label: 'Experience' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'speaking', label: 'Speaking' },
    { id: 'skills', label: 'Skills' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'contact', label: 'Contact' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false) // Close mobile menu after clicking a link
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-purple-500/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-white font-bold text-xl web3-gradient-text">
            Pieyush C Joy
          </div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors duration-200 ${
                  activeSection === item.id 
                    ? 'text-purple-400' 
                    : 'text-white hover:text-purple-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button 
              className="hamburger-button focus:outline-none" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
              <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
              <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left py-3 px-4 text-lg transition-colors duration-200 ${
                activeSection === item.id 
                  ? 'text-purple-400 bg-purple-900/20' 
                  : 'text-white hover:text-purple-400 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

// Animated Section Wrapper
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  )
}

// Hero Section Component with enhanced animations and 3JS background
const HeroSection = () => {
  const handleDownloadResume = () => {
    window.open('https://linkedin.com/in/pieyushcjoy', '_blank' )
  }

  const handleViewPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio')
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center web3-gradient relative overflow-hidden">
      {/* 3JS Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Scene />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>
      
      <AnimatedSection className="text-center z-10 max-w-4xl mx-auto px-4">
        <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-shadow-glow">
          SCALING TOKENS.<br />
          LAUNCHING WALLETS.<br />
          BUILDING ECOSYSTEMS.
        </h1>
        <AnimatedSection delay={500}>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Web3 Product-Growth Lead | Tokenomics, GTM, DAO Strategy
          </p>
        </AnimatedSection>
        <AnimatedSection delay={1000}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleDownloadResume}
              className="btn-web3 text-white px-8 py-3 text-lg web3-hover pulse-glow-animation flex items-center gap-2"
            >
              <Download size={20} />
              Download Resume
            </Button>
            <Button 
              onClick={handleViewPortfolio}
              className="view-portfolio-btn border-white text-white px-8 py-3 text-lg flex items-center gap-2"
            >
              <ExternalLink size={20} />
              <span className="btn-text">View Portfolio</span>
            </Button>
          </div>
        </AnimatedSection>
      </AnimatedSection>
    </section>
  )
}

// About Section Component with animations
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <h2 className="section-title text-4xl font-bold text-white mb-6 uppercase tracking-wide web3-gradient-text">
              About Me
            </h2>
            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                Web3 product-growth leader scaling wallets & token ecosystems. Shipped 8+ grant-funded GTM campaigns (Polygon, BNB, TON), driving 40K+ wallets via viral loops & token incentives. Expert in tokenomics, chain abstraction, and transforming DeFi/GameFi primitives into growth engines.
              </p>
              <p>
                Expert in turning product features into viral narratives and onboarding strategies. Proven track record in building GTM engines, closing ecosystem grants, and crafting community-driven campaigns using Zealy, Galxe, Discord, and X.
              </p>
              <p>
                Spearheaded the development of DID wallets, perpetual trading UX, RWA tokenization apps, and cross-chain identity layers. Experience working with token design teams on emission schedules, utility alignment, and incentive loops.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">Web3 Growth Marketing</span>
              <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">Token Launch Campaigns</span>
              <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">Product Management</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={300} className="flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden web3-glow float-animation">
              <img src={pieyushHeadshot} alt="Pieyush C Joy Headshot" className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// Endless Scrolling Tag Ribbon Component
const EndlessTagRibbon = () => {
  const tags = [
    "AI", "RWA", "DePIN", "DIDs", "Chain Abstraction", "GameFi", 
    "Modular Chains", "Tokenomics", "zk/AA", "Wallet Infra"
  ]

  return (
    <section className="py-8 bg-black overflow-hidden">
      <div className="endless-tag-ribbon-container">
        <div className="endless-tag-ribbon">
          {[...tags, ...tags, ...tags].map((tag, index) => (
            <span key={index} className="endless-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// Experience Section Component with preserved animations
const ExperienceSection = () => {
  const experiences = [
    {
      company: "Antier Solutions",
      role: "Product Manager",
      period: "Feb 2023 – Present",
      location: "Chandigarh",
      achievements: [
        "Drove 40% MAU growth in 6 months by combining lifecycle comms, gamified wallet UX, and viral referral mechanics",
        "Defined strategic product roadmap and closed 8+ ecosystem grants across Polygon, TON, and BNB Chain",
        "Built and optimized DeFi integrations (perpetual trading, token swaps, staking) across 5+ Web3 wallet products",
        "Led GTM strategies for token launches and airdrop campaigns using Galxe, Quest3, and community memetics",
        "Worked closely with token design teams to define vesting models, phased emissions, and on-chain utility layers"
      ]
    },
    {
      company: "Gems Pocket",
      role: "Growth Architect",
      period: "2023 – 2024",
      location: "Remote",
      achievements: [
        "Built DID-powered wallet with IPFS usernames and gasless swaps",
        "Designed viral growth loops through smart airdrop quests (Zealy + Galxe)",
        "Helped grow user base from launch to 40K+ wallets with <10% CAC"
      ]
    },
    {
      company: "Triskel Wallet",
      role: "RWA GTM Lead",
      period: "2023 – 2024",
      location: "Remote",
      achievements: [
        "Positioned wallet as an RWA-first hybrid custodial product",
        "Unlocked grant partnerships with Polygon, TON, and GalaChain",
        "Led community rollout via governance explainers and Zealy campaigns"
      ]
    },
    {
      company: "Helium Wars",
      role: "TVL Growth Strategist",
      period: "2024",
      location: "Remote",
      achievements: [
        "Led pre-launch growth strategy for mainnet readiness",
        "Designed gated NFT weapon upgrades and swap-based monetization",
        "Created quest campaigns onboarding 10K+ gamers during testnet"
      ]
    },
    {
      company: "Meta Arrow & WebxInfinity",
      role: "Product Manager",
      period: "2020 – 2023",
      location: "Bengaluru",
      achievements: [
        "Built an NFT-powered virtual studio and creator marketplace from concept to beta",
        "Delivered Web3 dApps and NFT tools, increasing client conversions by 30%",
        "Improved team efficiency by 25% through agile adoption and sprint rituals"
      ]
    }
  ]

  return (
    <section id="experience" className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="section-title text-4xl font-bold text-white mb-12 text-center uppercase tracking-wide web3-gradient-text">
            Experience
          </h2>
        </AnimatedSection>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <AnimatedSection key={index} delay={index * 200}>
              <div className="bg-black rounded-lg p-6 web3-border card-hover">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                    <p className="text-purple-400 font-medium">{exp.role}</p>
                    <p className="text-gray-400 text-sm">{exp.location}</p>
                  </div>
                  <span className="text-gray-400 text-sm mt-2 md:mt-0">{exp.period}</span>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// Infinite Portfolio Section Component
const InfinitePortfolioSection = () => {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const carouselRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const projects = [
    {
      title: "Gems Pocket",
      subtitle: "DID Wallet + Web3 Growth Engine",
      role: "Growth Architect",
      logo: gemsLogo,
      achievements: [
        "Built DID-powered wallet with IPFS usernames and gasless swaps",
        "Designed viral growth loops through smart airdrop quests (Zealy + Galxe)",
        "Helped grow user base from launch to 40K+ wallets with <10% CAC"
      ],
      tags: ["DID", "Wallet", "Growth"],
      link: "https://gemspocket.com/"
    },
    {
      title: "Triskel Wallet",
      subtitle: "RWA Wallet with Grant-Fueled GTM",
      role: "RWA GTM Lead",
      logo: triskelWalletLogo,
      achievements: [
        "Positioned wallet as an RWA-first hybrid custodial product",
        "Unlocked grant partnerships with Polygon, TON, and GalaChain",
        "Led community rollout via governance explainers and Zealy campaigns"
      ],
      tags: ["RWA", "Grants", "GTM"],
      link: "https://www.triskelwallet.io/"
    },
    {
      title: "Helium Wars",
      subtitle: "GameFi Launch Support & Wallet Integration",
      role: "TVL Growth Strategist",
      logo: heliumWarsLogo,
      achievements: [
        "Led pre-launch growth strategy for mainnet readiness",
        "Designed gated NFT weapon upgrades and swap-based monetization",
        "Created quest campaigns onboarding 10K+ gamers during testnet"
      ],
      tags: ["GameFi", "NFT", "TVL"],
      link: "https://0xheliumwars.io/"
    },
    {
      title: "Godo Payment Gateway",
      subtitle: "Crypto Checkout System for Emerging Markets",
      role: "Product Manager",
      logo: salutebankLogo,
      achievements: [
        "Developed SDK and merchant dashboards for USDT (ETH/TRON )",
        "Designed withdrawal lock rules and KYB/KYC flows",
        "Generated 18K+ airdrop quests and $150K+ qualified liquidity"
      ],
      tags: ["Payments", "USDT", "SDK"],
      link: "#"
    },
    {
      title: "Lendary Asia",
      subtitle: "Localized Rollout Strategy for Southeast Asia",
      role: "Product Manager",
      logo: null,
      achievements: [
        "Adapted wallet onboarding for Singapore, Philippines, Vietnam",
        "Created micro-community activation plans for Discord and TG",
        "Built SEA-specific crypto and Web2 conversion campaigns"
      ],
      tags: ["Localization", "SEA", "Marketing"],
      link: "https://www.lendary.xyz/"
    }
  ]

  const handleMouseDown = (e ) => {
    setIsAutoScrolling(false)
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 2; // The '2' is a sensitivity multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsAutoScrolling(true)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setIsAutoScrolling(true)
  }

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth / 2; // Scroll half the visible width
      carouselRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let animationFrameId
    let lastTimestamp = 0
    const speed = 0.5 // pixels per frame

    const animateScroll = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const elapsed = timestamp - lastTimestamp

      if (isAutoScrolling && carouselRef.current) {
        carouselRef.current.scrollLeft += speed * (elapsed / 16) // Adjust speed based on frame rate

        // Reset scroll to create infinite loop effect
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = carouselRef.current.scrollWidth / 4 // Jump back to a quarter of the total width
        }
      }

      lastTimestamp = timestamp
      animationFrameId = requestAnimationFrame(animateScroll)
    }

    animationFrameId = requestAnimationFrame(animateScroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isAutoScrolling])

  return (
    <section id="portfolio" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="section-title text-4xl font-bold text-white mb-12 text-center uppercase tracking-wide web3-gradient-text">
            Tokens, Wallets, and Growth Engines I've Built
          </h2>
        </AnimatedSection>
        <div 
          className="infinite-portfolio-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="infinite-portfolio-track" ref={carouselRef}>
            {[...projects, ...projects, ...projects].map((project, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="infinite-portfolio-card card-tilt">
                  <div className="card-header">
                    {project.logo ? (
                      <div className="card-logo">
                        <img src={project.logo} alt={`${project.title} Logo`} />
                      </div>
                    ) : (
                      <div className="card-logo-placeholder">
                        {project.title.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="card-title">{project.title}</h3>
                      <p className="card-role">{project.role}</p>
                    </div>
                  </div>
                  <ul className="card-achievements">
                    {project.achievements.map((achievement, idx) => (
                      <li key={idx}><span className="bullet">•</span> {achievement}</li>
                    ))}
                  </ul>
                  {project.link && project.link !== '#' && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="card-btn flex items-center justify-center gap-2">
                      View Project <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8 gap-4">
          <Button onClick={() => scroll(-1)} className="btn-web3 px-4 py-2 rounded-full"><ChevronLeft size={24} /></Button>
          <Button onClick={() => scroll(1)} className="btn-web3 px-4 py-2 rounded-full"><ChevronRight size={24} /></Button>
        </div>
      </div>
    </section>
  )
}

// Speaking Section Component
const SpeakingSection = () => {
  const amas = [
    { title: "Crypto Poolz AMA", tags: ["#DeFi", "#YieldFarming"], date: "Jan 2024" },
    { title: "Helium Wars Community Call", tags: ["#GameFi", "#NFT"], date: "Feb 2024" },
    { title: "CrossFi Ecosystem Update", tags: ["#CrossChain", "#Interoperability"], date: "Mar 2024" },
    { title: "DAO Governance Deep Dive", tags: ["#DAO", "#Governance"], date: "Apr 2024" },
    { title: "Tokenomics Design Principles", tags: ["#Tokenomics", "#Web3"], date: "May 2024" },
  ]

  return (
    <section id="speaking" className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="section-title text-4xl font-bold text-white mb-12 text-center uppercase tracking-wide web3-gradient-text">
            Speaking & Community
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amas.map((ama, index) => (
            <AnimatedSection key={index} delay={index * 150}>
              <div className="bg-black rounded-lg p-6 web3-border card-hover">
                <h3 className="text-xl font-bold text-white mb-2">{ama.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{ama.date}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {ama.tags.map((tag, idx) => (
                    <span key={idx} className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 italic">"Pieyush's insights on {ama.tags[0].replace('##', '')} were incredibly valuable. A true thought leader in the space."</p>
                <p className="text-gray-500 text-sm mt-2">- Community Member</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={500} className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4 web3-gradient-text">Featured Quote</h3>
          <blockquote className="text-xl italic text-gray-300 leading-relaxed max-w-3xl mx-auto">
            "The future of Web3 isn't just about technology; it's about building vibrant, self-sustaining ecosystems where innovation is incentivized and community is at the core. That's where true scaling happens."
          </blockquote>
          <p className="text-gray-400 mt-4">— Pieyush C Joy, Silicon Dreams Podcast</p>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Tools & Skills Section Component
const SkillsSection = () => {
  const skills = [
    { name: "Token Design", icon: tokenDesignIcon },
    { name: "Liquidity Planning", icon: null }, // Placeholder for icon
    { name: "Airdrop Campaigns", icon: null }, // Placeholder for icon
    { name: "Zealy / Galxe / QuestN", icon: null }, // Placeholder for icon
    { name: "Dune, Snapshot, Discord Growth", icon: null }, // Placeholder for icon
    { name: "DAO Governance Flows", icon: null }, // Placeholder for icon
    { name: "Product Management", icon: productManagementIcon },
    { name: "Analytical Tools", icon: analyticalToolsIcon },
    { name: "Growth Marketing", icon: growthMarketingIcon },
    { name: "Ecosystem Growth", icon: ecosystemGrowthIcon },
    { name: "Web3 Tools", icon: web3ToolsIcon },
  ]

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="section-title text-4xl font-bold text-white mb-12 text-center uppercase tracking-wide web3-gradient-text">
            Tools & Skills
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className="bg-slate-900 rounded-lg p-6 flex flex-col items-center text-center web3-border card-hover">
                {skill.icon ? (
                  <img src={skill.icon} alt={skill.name} className="w-16 h-16 mb-4 object-contain" />
                ) : (
                  <div className="w-16 h-16 mb-4 flex items-center justify-center text-3xl text-purple-400">
                    💡
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// Hobbies Section Component
const HobbiesSection = () => {
  const hobbies = [
    { emoji: "🎵", title: "Music Production & Rap Lyricism", description: "Produce original tracks with a focus on UK drill & indie-inspired themes" },
    { emoji: "⚽", title: "Football", description: "Active player with a passion for team dynamics and competitive play" },
    { emoji: "🎮", title: "Gaming", description: "Blend personal gaming interest and understanding user experience of products" },
    { emoji: "📸", title: "Creative Direction & Visual Branding", description: "Design visual identities and brand moodboards for content series, side projects, and social profiles" },
  ]

  return (
    <section id="hobbies" className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="section-title text-4xl font-bold text-white mb-12 text-center uppercase tracking-wide web3-gradient-text">
            🎧 Hobbies & Personal Interests
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hobbies.map((hobby, index) => (
            <AnimatedSection key={index} delay={index * 150}>
              <div className="bg-black rounded-lg p-6 web3-border card-hover flex items-start space-x-4">
                <span className="text-5xl flex-shrink-0">{hobby.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{hobby.title}</h3>
                  <p className="text-gray-300">{hobby.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="section-title text-4xl font-bold text-white mb-12 text-center uppercase tracking-wide web3-gradient-text">
            Let's launch your token the right way.
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={200}>
            <div className="bg-slate-900 rounded-lg p-8 web3-border card-hover">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="space-y-4 text-lg text-gray-300">
                <p className="flex items-center gap-3"><Mail size={20} className="text-purple-400" /> pieyushcjoy@gmail.com</p>
                <p className="flex items-center gap-3"><Phone size={20} className="text-purple-400" /> +91 98765 43210 (India)</p>
                <p className="flex items-center gap-3"><MapPin size={20} className="text-purple-400" /> Remote / Global</p>
              </div>
              <div className="mt-8 flex gap-6">
                <a href="https://www.linkedin.com/in/pieyushcjoy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://x.com/pi3yush" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.901 1.153h3.68l-8.042 9.167 9.967 12.107h-8.625l-6.045-7.545-6.491 7.545h-3.68l8.625-9.967-9.967-12.107h8.625l6.045 7.545z" />
                  </svg>
                </a>
                <a href="https://linktr.ee/luke4l1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.293 8.293a1 1 0 00-1.414-1.414L12 9.586 8.121 5.707a1 1 0 00-1.414 1.414L10.586 11l-3.879 3.879a1 1 0 001.414 1.414L12 12.414l3.879 3.879a1 1 0 001.414-1.414L13.414 11l3.879-3.879z" />
                  </svg>
                </a>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <div className="bg-slate-900 rounded-lg p-8 web3-border card-hover">
              <h3 className="text-2xl font-bold text-white mb-6">Book a Call</h3>
              <p className="text-gray-300 mb-4">Schedule a meeting directly via Calendly:</p>
              <a href="https://calendly.com/your-calendly-link" target="_blank" rel="noopener noreferrer" className="btn-web3 text-white px-6 py-3 text-lg flex items-center justify-center gap-2">
                <Calendar size={20} />
                Book Now
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
   )
}

const App = () => {
  return (
    <div className="relative">
      <Navigation />
      <HeroSection />
      <EndlessTagRibbon />
      <AboutSection />
      <ExperienceSection />
      <InfinitePortfolioSection />
      <SpeakingSection />
      <SkillsSection />
      <HobbiesSection />
      <ContactSection />
    </div>
  )
}

export default App
