import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { InterviewProvider } from './context/InterviewContext'
import ErrorBoundary from './components/ErrorBoundary'
import LandingPage from './pages/LandingPage'
import InterviewPage from './pages/InterviewPage'
import ExportPage from './pages/ExportPage'
import ReviewPage from './pages/ReviewPage'

function App() {
  return (
    <ErrorBoundary>
      <InterviewProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/interview/:sectionId" element={<InterviewPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/export" element={<ExportPage />} />
          </Routes>
        </BrowserRouter>
      </InterviewProvider>
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  )
}

export default App
