import { useRef, useEffect, useState, useCallback } from 'react'
import { useInterview } from '../../hooks/useInterview'
import { getSection } from '../../lib/interview-data'
import SectionIntro from '../interview/SectionIntro'
import TextField from '../interview/fields/TextField'
import TextArea from '../interview/fields/TextArea'
import { Eraser } from 'lucide-react'

// --- Signature Pad ---

interface SignaturePadProps {
  value: string
  onChange: (dataUrl: string) => void
}

function SignaturePad({ value, onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  // Initialize canvas with existing signature or blank
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match display size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)

    // Style
    ctx.strokeStyle = '#1A1A1A'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // Load existing signature if any
    if (value) {
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height)
        setHasDrawn(true)
      }
      img.src = value
    }
  }, []) // Only run once on mount

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()

    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    setIsDrawing(true)
    setHasDrawn(true)
  }, [getPos])

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx) return

    const pos = getPos(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }, [isDrawing, getPos])

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      onChange(canvas.toDataURL('image/png'))
    }
  }, [isDrawing, onChange])

  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return

    const rect = canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, rect.width, rect.height)
    setHasDrawn(false)
    onChange('')
  }, [onChange])

  return (
    <div className="mb-4">
      <div className="relative border border-input rounded-md bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full cursor-crosshair touch-none"
          style={{ height: '160px' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {/* Signature line */}
        <div className="absolute bottom-8 left-6 right-6 border-b border-muted-foreground/20" />
        <div className="absolute bottom-3 left-6 text-[10px] text-muted-foreground/40">sign here</div>

        {/* Clear button */}
        {hasDrawn && (
          <button
            onClick={clearSignature}
            className="absolute top-2 right-2 p-1.5 rounded-md bg-white/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear signature"
          >
            <Eraser className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// --- Main Section ---

export default function VerificationSection() {
  const { state, dispatch } = useInterview()
  const section = getSection('verification')
  const [signatureMode, setSignatureMode] = useState<'draw' | 'type'>(
    () => state.verification.signatureData?.startsWith('typed:') ? 'type' : 'draw'
  )

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_NESTED_FIELD', section: 'verification', field, value })
  }

  // Auto-fill today's date if empty
  useEffect(() => {
    if (!state.verification.verificationDate) {
      const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
      update('verificationDate', today)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleModeSwitch = (mode: 'draw' | 'type') => {
    if (mode !== signatureMode) {
      update('signatureData', '')
      setSignatureMode(mode)
    }
  }

  return (
    <div>
      <SectionIntro {...section} />

      {/* Verification statement */}
      <div className="bg-card rounded-md p-5 mb-6 border border-input">
        <p className="text-sm text-foreground leading-relaxed">
          By signing below, I confirm that I created this document voluntarily, that the information is accurate to the best of my knowledge, and that it reflects my current wishes.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label="Full legal name"
          value={state.verification.fullName}
          onChange={(v) => update('fullName', v)}
          placeholder="As it appears on your ID"
        />
        <TextField
          label="Date"
          value={state.verification.verificationDate}
          onChange={(v) => update('verificationDate', v)}
          placeholder="Today's date"
        />
      </div>

      {/* Signature */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-1.5">Your signature</label>
        <div className="flex flex-wrap gap-3 mb-3">
          <button
            type="button"
            onClick={() => handleModeSwitch('draw')}
            className={`px-4 py-2.5 rounded-button text-sm font-medium border transition-colors min-h-[44px] ${
              signatureMode === 'draw'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-white text-secondary-foreground border-input hover:border-primary'
            }`}
          >
            Draw
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('type')}
            className={`px-4 py-2.5 rounded-button text-sm font-medium border transition-colors min-h-[44px] ${
              signatureMode === 'type'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-white text-secondary-foreground border-input hover:border-primary'
            }`}
          >
            Type
          </button>
        </div>

        {signatureMode === 'draw' ? (
          <>
            <p className="text-xs text-muted-foreground mb-2">
              Draw your signature using your mouse, trackpad, or finger
            </p>
            <SignaturePad
              value={state.verification.signatureData}
              onChange={(v) => update('signatureData', v)}
            />
          </>
        ) : (
          <div className="relative border border-input rounded-md bg-white overflow-hidden" style={{ height: '160px' }}>
            <div className="h-full flex items-end px-6 pb-10">
              <input
                type="text"
                value={state.verification.signatureData.startsWith('typed:') ? state.verification.signatureData.slice(6) : ''}
                onChange={(e) => update('signatureData', `typed:${e.target.value}`)}
                placeholder="Type your full name"
                className="w-full text-2xl border-none outline-none bg-transparent text-foreground"
                style={{ fontFamily: "'Caveat', 'Segoe Script', 'Bradley Hand', cursive" }}
              />
            </div>
            {/* Signature line */}
            <div className="absolute bottom-8 left-6 right-6 border-b border-muted-foreground/20" />
            <div className="absolute bottom-3 left-6 text-[10px] text-muted-foreground/40">sign here</div>
          </div>
        )}
      </div>

      {/* Family passphrase */}
      <div className="mt-8">
        <div className="mb-3">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Personal proof</h3>
          <div className="mt-2 border-t border-border" />
        </div>

        <TextArea
          label="Something only you would know"
          value={state.verification.familyPassphrase}
          onChange={(v) => update('familyPassphrase', v)}
          placeholder="A personal detail or memory that only you and your closest family would know..."
          helpText="This isn't a security password — it's a personal detail that proves you wrote this"
        />
      </div>
    </div>
  )
}
