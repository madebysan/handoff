import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useInterview } from '../hooks/useInterview'
import { SECTIONS } from '../lib/interview-data'
import InterviewLayout from '../components/interview/InterviewLayout'
import SectionRenderer from '../components/interview/SectionRenderer'

export default function InterviewPage() {
  const { sectionId } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useInterview()

  // Default to first section if none specified
  const currentSectionId = sectionId || state.currentSection || 'contacts'
  const currentIndex = SECTIONS.findIndex(s => s.id === currentSectionId)

  useEffect(() => {
    if (currentSectionId !== state.currentSection) {
      dispatch({ type: 'SET_CURRENT_SECTION', section: currentSectionId })
    }
  }, [currentSectionId, state.currentSection, dispatch])

  // Redirect to valid section if invalid
  useEffect(() => {
    if (currentIndex === -1) {
      navigate('/interview/contacts', { replace: true })
    }
  }, [currentIndex, navigate])

  const handleNext = () => {
    if (currentIndex < SECTIONS.length - 1) {
      const nextSection = SECTIONS[currentIndex + 1]
      navigate(`/interview/${nextSection.id}`)
    } else {
      navigate('/export')
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevSection = SECTIONS[currentIndex - 1]
      navigate(`/interview/${prevSection.id}`)
    }
  }

  const handleSkip = () => {
    handleNext()
  }

  if (currentIndex === -1) return null

  return (
    <InterviewLayout
      currentSectionId={currentSectionId}
      onNavigate={(id) => navigate(`/interview/${id}`)}
    >
      <SectionRenderer
        sectionId={currentSectionId}
        onNext={handleNext}
        onPrev={currentIndex > 0 ? handlePrev : undefined}
        onSkip={handleSkip}
        isFirst={currentIndex === 0}
        isLast={currentIndex === SECTIONS.length - 1}
      />
    </InterviewLayout>
  )
}
