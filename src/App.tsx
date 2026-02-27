import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InterviewProvider } from './context/InterviewContext'
import LandingPage from './pages/LandingPage'
import InterviewPage from './pages/InterviewPage'
import ExportPage from './pages/ExportPage'
import { Agentation } from 'agentation'
import ThemeDrawer from './components/theme-editor/ThemeDrawer'

function App() {
  return (
    <InterviewProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/interview/:sectionId" element={<InterviewPage />} />
          <Route path="/export" element={<ExportPage />} />
        </Routes>
      </BrowserRouter>
      {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
      {import.meta.env.DEV && <ThemeDrawer />}
    </InterviewProvider>
  )
}

export default App
