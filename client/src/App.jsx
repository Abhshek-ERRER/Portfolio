import { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight, FiGithub, FiLinkedin, FiMapPin,
  FiMail, FiMenu, FiX, FiExternalLink, FiSend, FiCode,
  FiDatabase, FiServer, FiTool, FiCopy, FiCheck
} from "react-icons/fi";
import { profile, skills, projects, certificates } from "./data";

const skillIcons = { Frontend: FiCode, Backend: FiServer, "Database & Cloud": FiDatabase, Tools: FiTool };

function Reveal({ children, className = "" }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["About", "Skills", "Projects", "Education", "Certificates", "Contact"];
  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">AR</span>
          <span>Abhishek<span className="brand-dot">.</span></span>
        </a>
        <button className="menu-btn" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Let's talk <FiArrowUpRight /></a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-grid" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="container hero-inner">
        <Reveal className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> Available for opportunities</div>
          <p className="kicker">FULL STACK DEVELOPER · MERN</p>
          <h1>Hi,I'm <span>Abhishek Rajbhar</span></h1>
          <p className="hero-subtitle">Full Stack Web Developer <b>|</b> MERN Stack</p>
          <p className="hero-text">I build modern, responsive, and scalable web applications with clean code and a focus on great user experiences.</p>
          <div className="hero-actions">
            <a className="btn primary" href="#projects">View My Projects <FiArrowUpRight /></a>
            <a className="btn ghost" href="/Abhishek-Rajbhar-Resume.html" target="_blank" rel="noreferrer">View Resume <FiExternalLink /></a>
          </div>
          <div className="hero-meta">
            <span><FiMapPin /> {profile.location}</span>
            <span className="meta-line" />
            <a href={profile.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
          </div>
        </Reveal>

        <Reveal className="hero-visual">
          <div className="visual-glow" />
          <div className="code-card code-top"><span>const</span> developer = <em>"MERN"</em>;</div>
          <div className="code-card code-side"><span>01</span><br/>build<br/>ship<br/>iterate</div>
          <div className="glass-orb">
            <div className="orb-core" />
            <div className="ring ring-a" />
            <div className="ring ring-b" />
            <div className="ring ring-c" />
            <div className="orb-label"><small>FULL STACK</small><strong>AR</strong></div>
          </div>
          <div className="floating-chip chip-react">React.js</div>
          <div className="floating-chip chip-node">Node.js</div>
          <div className="floating-chip chip-mongo">MongoDB</div>
        </Reveal>
      </div>
      <div className="scroll-cue">SCROLL TO EXPLORE <span /></div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal className="section-head"><span>01 / ABOUT</span><h2>Turning ideas into <i>useful</i> digital experiences.</h2></Reveal>
        <div className="about-grid">
          <Reveal className="glass about-card">
            <div className="card-index">01</div>
            <p className="lead">I'm a B.Tech Computer Science and Engineering (AI and ML) student at AKTU, Lucknow, with a strong foundation in full-stack web development.</p>
            <p>I enjoy building real-world web applications, learning new technologies, and solving problems through code. My focus is on creating interfaces that feel polished while keeping the engineering underneath clean and maintainable.</p>
            <div className="mini-tags"><span>MERN</span><span>REST APIs</span><span>MongoDB</span><span>Responsive UI</span></div>
          </Reveal>
          <Reveal className="about-stack">
            <div className="stack-card stack-one"><span>01</span><strong>Frontend</strong><small>Interfaces that feel fast & intuitive.</small></div>
            <div className="stack-card stack-two"><span>02</span><strong>Backend</strong><small>Structured APIs with reliable logic.</small></div>
            <div className="stack-card stack-three"><span>03</span><strong>Database</strong><small>Practical data modeling & integration.</small></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <Reveal className="section-head"><span>02 / SKILLS</span><h2>A toolkit built for <i>shipping.</i></h2></Reveal>
        <div className="skills-grid">
          {Object.entries(skills).map(([group, items]) => {
            const Icon = skillIcons[group];
            return <Reveal key={group} className="glass skill-card">
              <div className="skill-icon"><Icon /></div>
              <h3>{group}</h3>
              <div className="skill-list">{items.map(item => <span key={item}>{item}</span>)}</div>
            </Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured }) {
  return <Reveal className={`project-card glass ${featured ? "featured" : ""}`}>
    <div className="project-top">
      <span className="project-number">{project.number}</span>
      <div className="project-links">
        {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>}
        {project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live demo"><FiExternalLink /></a>}
      </div>
    </div>
    <div className="project-visual">
      <div className="project-window">
        <div className="window-bar"><i/><i/><i/></div>
        <div className="window-content"><span>{project.stack[0].toUpperCase()}</span><strong>{project.title}</strong><small>{project.stack.slice(0, 3).join(" · ").toUpperCase()}</small></div>
      </div>
    </div>
    <p className="project-label">{project.label}</p>
    <h3>{project.title}</h3>
    <p className="project-description">{project.description}</p>
    <ul>{project.features.map(f => <li key={f}>{f}</li>)}</ul>
    <div className="stack-row">{project.stack.map(s => <span key={s}>{s}</span>)}</div>
    {(project.live || project.github) && <div className="project-actions">
      {project.live && <a className="text-link" href={project.live} target="_blank" rel="noreferrer">Live Demo <FiArrowUpRight /></a>}
      {project.github && <a className="text-link" href={project.github} target="_blank" rel="noreferrer">GitHub <FiGithub /></a>}
    </div>}
  </Reveal>;
}

function Projects() {
  return <section id="projects" className="section">
    <div className="container">
      <Reveal className="section-head split"><div><span>03 / PROJECTS</span><h2>Selected work, <i>built for real.</i></h2></div><p>No inflated metrics. Just practical projects that demonstrate how I approach product, UI, APIs, and data.</p></Reveal>
      <div className="projects-grid">{projects.map((p, i) => <ProjectCard key={p.title} project={p} featured={i === 0} />)}</div>
    </div>
  </section>;
}

function Education() {
  return <section id="education" className="section section-alt">
    <div className="container">
      <Reveal className="section-head"><span>04 / EDUCATION</span><h2>Learning the craft, <i>one build at a time.</i></h2></Reveal>
      <Reveal className="timeline">
        <div className="timeline-line" />
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-date">2022 — 2026</div>
          <div className="timeline-card glass"><p>UNDERGRADUATE DEGREE</p><h3>B.Tech — Computer Science & Engineering (AI & ML)</h3><span>AKTU · Lucknow</span><small>Building a strong foundation in computer science, artificial intelligence, machine learning, and software development.</small></div>
        </div>
      </Reveal>
    </div>
  </section>;
}

function CertificateCard({ certificate }) {
  const [copyState, setCopyState] = useState("idle");
  const dialogRef = useRef(null);

  async function copyCredentialId() {
    try {
      await navigator.clipboard.writeText(certificate.credentialId);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("failed");
    }
  }

  return <Reveal className="certificate-card glass">
    <div className="certificate-mark">CERTIFICATE OF COMPLETION</div>
    <p className="certificate-issuer">{certificate.issuer}</p>
    <h3>{certificate.title}</h3>
    {certificate.issued && <p className="certificate-date">Issued {certificate.issued}</p>}
    <p className="certificate-id"><span>Credential ID</span><code>{certificate.credentialId}</code></p>
    <div className="certificate-actions">
      <button className="text-link view-certificate" type="button" onClick={() => dialogRef.current?.showModal()}>View certificate <FiArrowUpRight /></button>
    </div>
    <dialog ref={dialogRef} className="certificate-dialog" onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <div className="certificate-dialog-content">
        <button className="certificate-dialog-close" type="button" aria-label="Close certificate details" onClick={() => dialogRef.current?.close()}><FiX /></button>
        <p className="certificate-mark">CERTIFICATE OF COMPLETION</p>
        <p className="certificate-issuer">{certificate.issuer}</p>
        <h2>{certificate.title}</h2>
        {certificate.issued && <p className="certificate-date">Issued {certificate.issued}</p>}
        <p className="certificate-id"><span>Credential ID</span><code>{certificate.credentialId}</code></p>
        <div className="certificate-actions">
          {certificate.verifyUrl && <a className="text-link" href={certificate.verifyUrl} target="_blank" rel="noreferrer">Verify certificate <FiExternalLink /></a>}
          <button className="text-link copy-certificate" type="button" onClick={copyCredentialId}>
            {copyState === "copied" ? <><FiCheck /> Copied</> : <><FiCopy /> Copy ID</>}
          </button>
        </div>
        {copyState === "failed" && <p className="copy-status" role="status">Clipboard access is unavailable.</p>}
      </div>
    </dialog>
  </Reveal>;
}

function Certificates() {
  return <section id="certificates" className="section section-alt">
    <div className="container">
      <Reveal className="section-head"><span>05 / CERTIFICATES</span><h2>Learning, <i>recognized.</i></h2></Reveal>
      <div className="certificates-grid">{certificates.map(certificate => <CertificateCard key={certificate.credentialId} certificate={certificate} />)}</div>
    </div>
  </section>;
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState({ loading: false, message: "" });

  async function submit(e) {
    e.preventDefault();
    setState({ loading: true, message: "" });
    try {
      const apiBaseUrl = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000/api" : "/api")).replace(/\/+$/, "");
      const res = await fetch(`${apiBaseUrl}/contact`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to send message.");
      setState({ loading: false, message: data.message });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setState({ loading: false, message: err.message });
    }
  }

  return <section id="contact" className="section contact">
    <div className="contact-glow" />
    <div className="container">
      <Reveal className="contact-wrap glass">
        <div className="contact-copy">
          <span>06 / CONTACT</span>
          <h2>Let's Build Something <i>Great Together.</i></h2>
          <p>Have a project, opportunity, or idea worth exploring? Send a message and let's start a conversation.</p>
          <div className="socials">
            <a href={profile.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub <FiArrowUpRight /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn <FiArrowUpRight /></a>
          </div>
        </div>
        <form onSubmit={submit} className="contact-form">
          <label>Name<input required minLength="2" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" /></label>
          <label>Email<input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" /></label>
          <label>Message<textarea required minLength="10" rows="5" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell me a little about your idea..." /></label>
          <button className="btn primary" disabled={state.loading}>{state.loading ? "Sending..." : <>Send Message <FiSend /></>}</button>
          {state.message && <p className="form-status" role="status">{state.message}</p>}
        </form>
      </Reveal>
    </div>
  </section>;
}

function Footer() {
  return <footer><div className="container footer-inner"><span>© {new Date().getFullYear()} Abhishek Rajbhar</span><span>Designed & built with React + Node.js</span><a href="#home">Back to top ↑</a></div></footer>;
}

export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
    }), { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <><Navbar/><main><Hero/><About/><Skills/><Projects/><Education/><Certificates/><Contact/></main><Footer/></>;
}
