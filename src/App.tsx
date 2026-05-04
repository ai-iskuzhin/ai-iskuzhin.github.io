import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

type ThemeMode = 'light' | 'dark' | 'system'

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#links', label: 'Links' },
  { href: '#contact', label: 'Contact' },
]

const experience = [
  {
    period: '2024 - Present',
    role: 'AI & Front-End Engineer',
    company: 'Independent Projects',
    summary:
      'Building practical AI-assisted products, portfolio systems, and production-ready web interfaces with a focus on clarity, performance, and maintainable architecture.',
    skills: ['React', 'TypeScript', 'Vite', 'AI tooling', 'UI systems'],
  },
  {
    period: '2022 - 2024',
    role: 'Software Developer',
    company: 'Product Engineering',
    summary:
      'Delivered responsive applications, refined component patterns, and turned ambiguous product ideas into usable interfaces with reliable frontend foundations.',
    skills: ['JavaScript', 'APIs', 'Accessibility', 'Design systems'],
  },
  {
    period: 'Earlier',
    role: 'Technical Problem Solver',
    company: 'Learning & Client Work',
    summary:
      'Developed a broad engineering base across web fundamentals, automation, debugging, and project delivery.',
    skills: ['HTML', 'CSS', 'Git', 'Automation'],
  },
]

const projects = [
  {
    title: 'AI Personal Website',
    description:
      'A refined portfolio built to present experience, selected work, contact paths, and professional links in one focused destination.',
    stack: ['React', 'TypeScript', 'GitHub Pages'],
    href: 'https://github.com/ai-iskuzhin',
  },
  {
    title: 'Project Operating System',
    description:
      'A reusable structure for organizing project briefs, delivery notes, links, and engineering decisions across ongoing work.',
    stack: ['Documentation', 'Workflow', 'Automation'],
    href: 'https://github.com/ai-iskuzhin',
  },
  {
    title: 'Interface Experiments',
    description:
      'A collection of frontend experiments exploring motion, layout, accessible interaction states, and polished responsive behavior.',
    stack: ['CSS', 'React', 'UX'],
    href: 'https://github.com/ai-iskuzhin',
  },
]

const links = [
  { label: 'GitHub', href: 'https://github.com/ai-iskuzhin' },
  { label: 'Telegram', href: 'https://t.me/mrx_eternal' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Resume', href: '/resume.pdf' },
  { label: 'Email', href: 'mailto:hello@example.com' },
  { label: 'Phone', href: 'tel:+79279383562' },
]

const themeModes: Array<{ label: string; mode: ThemeMode }> = [
  { label: 'Light', mode: 'light' },
  { label: 'Dark', mode: 'dark' },
  { label: 'System', mode: 'system' },
]

function GitHubIcon() {
  return (
    <svg
      className="github-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg
      className="telegram-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#26a5e4"
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function LinkIcon({ label }: { label: string }) {
  if (label === 'GitHub') {
    return <GitHubIcon />
  }

  if (label === 'Telegram') {
    return <TelegramIcon />
  }

  return null
}

function ThemeIcon({ mode }: { mode: ThemeMode }) {
  if (mode === 'light') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    )
  }

  if (mode === 'dark') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path d="M21 12.79A8.5 8.5 0 1 1 11.21 3 6.5 6.5 0 0 0 21 12.79z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState(navItems[0].href)
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const storedTheme = localStorage.getItem('theme-mode')

    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
      return storedTheme
    }

    return 'system'
  })

  useEffect(() => {
    if (themeMode === 'system') {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme-mode', themeMode)
      return
    }

    document.documentElement.dataset.theme = themeMode
    localStorage.setItem('theme-mode', themeMode)
  }, [themeMode])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleSection?.target.id) {
          setActiveSection(`#${visibleSection.target.id}`)
        }
      },
      {
        rootMargin: '-24% 0px -58% 0px',
        threshold: [0.15, 0.35, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="site-shell">
      <aside className="intro-panel" aria-label="Profile introduction">
        <div className="profile-hero">
          <img className="profile-photo" src="/me.jpg" alt="Aigiz Iskuzhin" />

          <div className="theme-switcher" aria-label="Color theme">
            {themeModes.map((item) => (
              <button
                type="button"
                className={themeMode === item.mode ? 'active' : undefined}
                key={item.mode}
                onClick={() => setThemeMode(item.mode)}
                aria-label={`${item.label} theme`}
                aria-pressed={themeMode === item.mode}
                title={`${item.label} theme`}
              >
                <ThemeIcon mode={item.mode} />
              </button>
            ))}
          </div>

          <div className="intro-copy">
            <p className="eyebrow">Personal portfolio</p>
            <h3 id="top">Aigiz Iskuzhin</h3>
            <h4>Software developer building focused web products and AI-assisted tools.</h4>
          </div>
        </div>
        <div>
            <p>
              I turn complex ideas into clean, durable interfaces. This site collects
              my experience, selected projects, professional links, and the best ways
              to get in touch.
            </p>
        </div>

        <nav className="section-nav" aria-label="Sections">
          {navItems.map((item) => (
            <a
              className={activeSection === item.href ? 'active' : undefined}
              href={item.href}
              key={item.href}
              aria-current={activeSection === item.href ? 'true' : undefined}
            >
              <span />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="social-row" aria-label="External links">
          {links.slice(0, 3).map((link) => (
            <a
              className={link.label === 'GitHub' || link.label === 'Telegram' ? 'icon-link' : undefined}
              href={link.href}
              key={link.label}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
            >
              <LinkIcon label={link.label} />
              {link.label !== 'GitHub' && link.label !== 'Telegram' && link.label}
            </a>
          ))}
        </div>
      </aside>

      <section className="content-panel">
        <section className="hero-card" aria-label="Portfolio highlight">
          <div>
            <p className="eyebrow">Available for selected opportunities</p>
            <p>
              Product-minded engineering, modern frontend development, and useful
              AI workflows for teams that value execution quality.
            </p>
          </div>
          <img src={heroImg} alt="" />
        </section>

        <section className="content-section" id="about">
          <p className="section-kicker">About</p>
          <div className="section-body">
            <p>
              I care about the practical side of software: interfaces that are fast,
              readable, accessible, and easy to evolve. My work sits between product
              thinking and implementation, where the details of layout, interaction,
              copy, and code quality all matter.
            </p>
            <p>
              Recently I have been focused on React, TypeScript, AI-enabled workflows,
              automation, and personal product experiments. I like projects where the
              goal is not just to ship a screen, but to make the underlying system
              simpler and stronger.
            </p>
          </div>
        </section>

        <section className="content-section" id="experience">
          <p className="section-kicker">Experience</p>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item" key={`${item.period}-${item.role}`}>
                <p className="period">{item.period}</p>
                <div>
                  <h3>
                    {item.role} <span>{item.company}</span>
                  </h3>
                  <p>{item.summary}</p>
                  <ul className="tag-list" aria-label={`${item.role} skills`}>
                    {item.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="projects">
          <p className="section-kicker">Projects</p>
          <div className="project-list">
            {projects.map((project) => (
              <a className="project-card" href={project.href} key={project.title}>
                <div>
                  <p className="project-label">Selected project</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <ul className="tag-list">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </section>

        <section className="content-section" id="links">
          <p className="section-kicker">Links</p>
          <div className="link-grid">
            {links.map((link) => (
              <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                <span>
                  <LinkIcon label={link.label} />
                  {link.label}
                </span>
                <span aria-hidden="true">-&gt;</span>
              </a>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <p className="section-kicker">Contact</p>
          <h2>Have a project, role, or collaboration in mind?</h2>
          <p>
            Send a short note with the context, timeline, and links. I read every
            message and prefer direct, concrete conversations.
          </p>
          <a className="primary-link" href="mailto:hello@example.com">
            Say hello
          </a>
        </section>
      </section>
    </main>
  )
}

export default App
