import { Suspense, lazy } from 'react'
import { MouseProvider } from './lib/MouseProvider.jsx'
import { SmoothScroll } from './lib/SmoothScroll.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Skills from './sections/Skills.jsx'
import Projects from './sections/Projects.jsx'
import Experience from './sections/Experience.jsx'
import Education from './sections/Education.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'

// Code-split the WebGL background so the initial HTML/CSS paints without it.
const SceneCanvas = lazy(() => import('./three/SceneCanvas.jsx'))

export default function App() {
  return (
    <MouseProvider>
      <SmoothScroll>
        <CustomCursor />

        {/* If WebGL/3D fails (or its chunk can't load), fall back to a solid
            background instead of crashing the page. */}
        <ErrorBoundary fallback={<div className="fixed inset-0 -z-10 bg-bg" aria-hidden="true" />}>
          <Suspense fallback={null}>
            <SceneCanvas />
          </Suspense>
        </ErrorBoundary>

        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>

        <Footer />
      </SmoothScroll>
    </MouseProvider>
  )
}
