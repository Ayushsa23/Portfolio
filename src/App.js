import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Toast from './Toast';

const profilePic = process.env.PUBLIC_URL + '/pfp.jpeg';

const roles = [
  'Web & App Developer',
  'Frontend Enthusiast',
  'Tech Explorer'
];

function TypingRole() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing && displayed.length < roles[index].length) {
      timeout = setTimeout(() => {
        setDisplayed(roles[index].slice(0, displayed.length + 1));
      }, 80);
    } else if (typing && displayed.length === roles[index].length) {
      timeout = setTimeout(() => setTyping(false), 1200);
    } else if (!typing) {
      timeout = setTimeout(() => {
        setDisplayed('');
        setTyping(true);
        setIndex((index + 1) % roles.length);
      }, 800);
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index]);

  return (
    <span className="typing-role">{displayed}<span className="typing-cursor">|</span></span>
  );
}

function ProjectDetail({ title, description, images }) {
  // Section data for Travel Buddy App
  const travelBuddySections = [
    {
      label: 'Onboarding Screens',
      img: process.env.PUBLIC_URL + '/project1/on-boarding1.jpg',
      text: (<span>The onboarding screens introduce users to the app, its features, and how it helps them <span className="highlight-main">find travel buddies</span> for their journeys.</span>)
    },
    {
      label: 'Home Page',
      img: process.env.PUBLIC_URL + '/project1/home-page.jpg',
      text: (<span>The <span className="highlight-blue">home page</span> is the main dashboard where users can <span className="highlight-yellow">view their trips</span>, <span className="highlight-green">join new ones</span>, or <span className="highlight-red">create a trip</span> to find companions.</span>)
    },
    {
      label: 'New Trip Page',
      img: process.env.PUBLIC_URL + '/project1/new-trip.jpg',
      text: (<span>On the <span className="highlight-blue">New Trip</span> page, users can <span className="highlight-main">create a new trip</span> by entering <span className="highlight-yellow">destination</span>, <span className="highlight-yellow">date</span>, and other details to <span className="highlight-green">find or invite travel buddies</span>.</span>)
    },
    {
      label: 'Find Trip Page',
      img: process.env.PUBLIC_URL + '/project1/find-trip.jpg',
      text: (<span>The <span className="highlight-blue">Find Trip</span> page allows users to <span className="highlight-main">search for existing trips</span> that match their <span className="highlight-yellow">destination</span> and <span className="highlight-yellow">schedule</span>, making it easy to <span className="highlight-green">join others</span>.</span>)
    }
  ];

  // Section data for Secure Bite App
  const secureBiteSections = [
    {
      label: 'Profile Page',
      img: process.env.PUBLIC_URL + '/Project2/profile.jpg',
      text: (<span>The <span className="highlight-blue">Profile Page</span> allows users to manage their personal information and dietary preferences for personalized food recommendations.</span>)
    },
    {
      label: 'Preference & Allergens Selection',
      img: process.env.PUBLIC_URL + '/Project2/preference-and-allergens-select.jpg',
      text: (<span>Users can select their <span className="highlight-yellow">food preferences</span> and <span className="highlight-red">allergens</span> to receive safe and tailored meal suggestions.</span>)
    },
    {
      label: 'Signup Page',
      img: process.env.PUBLIC_URL + '/Project2/signup-page.jpg',
      text: (<span>The <span className="highlight-green">Signup Page</span> features a clean and intuitive UI for new users to quickly register and start using the app.</span>)
    },
    {
      label: 'Home Page',
      img: process.env.PUBLIC_URL + '/Project2/homepage.jpg',
      text: (<span>The <span className="highlight-main">Home Page</span> provides an overview of meal tracking, recommendations, and easy navigation to other features.</span>)
    }
  ];

  if (title === 'Travel Buddy App') {
    return (
      <div className="project-detail-page" style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2>{title}</h2>
        <p style={{ marginBottom: 32 }}>{description}</p>
        {travelBuddySections.map((section, idx) => (
          <div key={section.label} style={{ display: 'flex', flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', marginBottom: 48, gap: 32 }}>
            <img src={section.img} alt={section.label} style={{ width: 260, height: 'auto', borderRadius: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }} />
            <div>
              <h3 style={{ marginBottom: 12 }}>{section.label}</h3>
              <p>{section.text}</p>
            </div>
          </div>
        ))}
        <Link to="/" style={{ color: '#7ec4ff', textDecoration: 'underline' }}>Back to Home</Link>
      </div>
    );
  }
  if (title === 'Secure Bite App') {
    return (
      <div className="project-detail-page" style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
        <h2>{title}</h2>
        <p style={{ marginBottom: 32 }}>{description}</p>
        {secureBiteSections.map((section, idx) => (
          <div key={section.label} style={{ display: 'flex', flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', marginBottom: 48, gap: 32 }}>
            <img src={section.img} alt={section.label} style={{ width: 260, height: 'auto', borderRadius: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }} />
            <div>
              <h3 style={{ marginBottom: 12 }}>{section.label}</h3>
              <p>{section.text}</p>
            </div>
          </div>
        ))}
        <Link to="/" style={{ color: '#7ec4ff', textDecoration: 'underline' }}>Back to Home</Link>
      </div>
    );
  }
  // Placeholder for now, will expand later
  return (
    <div className="project-detail-page" style={{ padding: '2rem' }}>
      <h2>{title}</h2>
      {images && images.map((img, i) => (
        <img key={i} src={img} alt={title + ' screenshot ' + (i+1)} style={{ maxWidth: '400px', margin: '1rem 0', display: 'block' }} />
      ))}
      <p>{description}</p>
      <Link to="/" style={{ color: '#7ec4ff', textDecoration: 'underline' }}>Back to Home</Link>
    </div>
  );
}

function FadeInSection({ children, className = '', ...props }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={domRef}
      className={`fade-in-section${isVisible ? ' visible' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [toast, setToast] = useState({ show: false, message: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ show: true, message: 'Message sent!' });
        setForm({ name: '', email: '', message: '' });
      } else {
        setToast({ show: true, message: 'Error sending message: ' + (data.error || 'Unknown error') });
      }
    } catch (err) {
      setToast({ show: true, message: 'Network error: ' + err.message });
    }
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };
  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
        <label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <Toast message={toast.message} show={toast.show} />
    </>
  );
}

function MainSite() {
  return (
    <div className="main-site">
      <nav className="sticky-navbar">
        <a href="#home" className="nav-link">Home</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#skills" className="nav-link">Skills</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>
      <section id="home" className="hero-section hero-2col">
        <div className="hero-2col-content">
          <div className="hero-2col-text">
            <div className="hero-greeting">Hello!</div>
            <div className="hero-name">I am <span className="highlight-main">Ayush Singh</span></div>
            <div className="hero-role">a {' '}
              <TypingRole />
            </div>
            <div className="hero-bio">
              I am a passionate Web & App Developer and third-year undergraduate at <span className="highlight-blue">IIT Kanpur</span>. I enjoy solving <span className="highlight-yellow">Data Structures &amp; Algorithms</span> problems in <span className="highlight-red">C++</span> and love building beautiful apps with <span className="highlight-green">Flutter (using Dart)</span>. I'm also comfortable with tools such as <span className="highlight-yellow">MATLAB, VS Code, and Android Studio</span>. Whether I'm coding, learning new technologies, or collaborating on a team project, I'm always eager to grow and make a difference. Let's connect and create something amazing together!
            </div>
            <div className="hero-btns">
              <a href="https://www.linkedin.com/in/ayush-singh-238b41279" target="_blank" rel="noopener noreferrer" className="hero-btn linkedin">View LinkedIn</a>
            </div>
          </div>
          <div className="hero-2col-pic">
            <img src={profilePic} alt="Ayush Singh" className="profile-pic-2col" />
          </div>
        </div>
      </section>
      <FadeInSection>
        <div className="section-container">
          <h2>About</h2>
          <p>
            I am a passionate Web &amp; App Developer and third-year undergraduate at <span className="highlight-blue">IIT Kanpur</span>. I enjoy solving <span className="highlight-yellow">Data Structures &amp; Algorithms</span> problems in <span className="highlight-red">C++</span> and love building beautiful apps with <span className="highlight-green">Flutter (using Dart)</span>. I'm also comfortable with tools such as <span className="highlight-yellow">MATLAB, VS Code, and Android Studio</span>. Whether I'm coding, learning new technologies, or collaborating on a team project, I'm always eager to grow and make a difference. Let's connect and create something amazing together!
          </p>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="section-container">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-card">App Development</div>
            <div className="skill-card">Frontend</div>
            <div className="skill-card">Web Development</div>
            <div className="skill-card">DSA</div>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="section-container">
          <h2>Projects</h2>
          <div className="projects-grid">
            <Link to="/projects/travel-buddy" className="project-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="project-title">Travel Buddy App</div>
              <div className="project-desc">
                This app helps travelers find trip buddies heading to the same destination. You can create or join trips, making it easier to share costs and enjoy the journey together.
              </div>
            </Link>
            <Link to="/projects/secure-bite" className="project-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="project-title">Secure Bite App</div>
              <div className="project-desc">
                Developed the frontend of a health-oriented food recommendation app using Flutter. Designed intuitive UI for onboarding, meal tracking, and food suggestion screens. Modular widget structure for clean code and future backend integration. Smooth navigation and UX, ready for AI-based food analysis.
              </div>
            </Link>
            <div className="project-card">
              <div className="project-title">Coming Soon</div>
              <div className="project-desc">Stay tuned for more exciting projects!</div>
            </div>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="section-container">
          <h2>Certifications</h2>
          <div className="certifications-list">
            <div className="cert-card">
              <div className="cert-title">Flutter Certification</div>
              <div className="cert-issuer">by Raveen Ranawat (Udemy)</div>
              <a className="cert-link" href="https://www.udemy.com/certificate/UC-29a3e474-57a2-4c50-b534-b0f9db67e187/" target="_blank" rel="noopener noreferrer">View Certificate</a>
            </div>
            <div className="cert-card">
              <div className="cert-title">Introductory Options Course</div>
              <div className="cert-issuer">by IIT Guwahati</div>
              <a className="cert-link" href="https://certificate.givemycertificate.com/c/dd395120-7c03-406e-8fbe-7c39e8a69381" target="_blank" rel="noopener noreferrer">View Certificate</a>
            </div>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="section-container">
          <h2>Get in Touch</h2>
          <ContactForm />
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="section-container">
          <h2>Contact</h2>
          <p>Email: <a href="mailto:ayushsa23@iitk.ac.in">ayushsa23@iitk.ac.in</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/ayush-singh-238b41279" target="_blank" rel="noopener noreferrer">here</a></p>
        </div>
      </FadeInSection>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/projects/travel-buddy" element={<ProjectDetail title="Travel Buddy App" description="This app helps travelers find trip buddies heading to the same destination. You can create or join trips, making it easier to share costs and enjoy the journey together." images={[
          process.env.PUBLIC_URL + '/project1/on-boarding1.jpg',
          process.env.PUBLIC_URL + '/project1/on-boarding2.jpg',
          process.env.PUBLIC_URL + '/project1/on-boarding3.jpg',
          process.env.PUBLIC_URL + '/project1/home-page.jpg',
          process.env.PUBLIC_URL + '/project1/new-trip.jpg',
          process.env.PUBLIC_URL + '/project1/find-trip.jpg',
        ]} />} />
        <Route path="/projects/secure-bite" element={<ProjectDetail title="Secure Bite App" description={
          `Developed the frontend of a health-oriented food recommendation app using Flutter.\n\n- Designed intuitive UI for onboarding, meal tracking, and food suggestion screens.\n- Followed a modular widget structure for clean code and future backend integration.\n- Focused on smooth navigation and UX, preparing the app for AI-based food analysis.`
        } images={[
          process.env.PUBLIC_URL + '/Project2/profile.jpg',
          process.env.PUBLIC_URL + '/Project2/preference-and-allergens-select.jpg',
          process.env.PUBLIC_URL + '/Project2/signup-page.jpg',
          process.env.PUBLIC_URL + '/Project2/homepage.jpg',
        ]} />} />
      </Routes>
    </Router>
  );
}

export default App;
