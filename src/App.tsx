import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Starfield from './components/Starfield'
import Chatbot from './components/Chatbot'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen relative">
      <Starfield />
      <Nav onAskAI={() => setChatOpen((v) => !v)} />
      <Hero />
      <Stats />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
