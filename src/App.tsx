import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InterviewProvider } from './context/InterviewContext'
import LandingPage from './pages/LandingPage'
import InterviewPage from './pages/InterviewPage'
import ExportPage from './pages/ExportPage'
import { Agentation } from 'agentation'

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
    </InterviewProvider>
  )
}

export default App
