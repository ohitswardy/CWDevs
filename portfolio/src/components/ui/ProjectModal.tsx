import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, ChevronDown, CheckCircle2 } from 'lucide-react'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID  = 'service_pqzwplr'
const OWNER_TEMPLATE_ID   = 'template_ry157ra'
const CLIENT_TEMPLATE_ID  = 'template_pv7x5t8'
const EMAILJS_PUBLIC_KEY  = 'VzvJcuN_rFOb1yZR-'

const SERVICE_OPTIONS = [
  'System Design & Architecture',
  'Full-Stack Development',
  'Automation & Integration',
  'UI/UX Design',
  'API Development',
  'Other / Not Sure Yet',
]

const BUDGET_OPTIONS = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
  'To be discussed',
]

const TIMELINE_OPTIONS = [
  'ASAP (within 2 weeks)',
  '1 month',
  '2–3 months',
  '3–6 months',
  'Flexible / ongoing',
]

interface FormData {
  name: string
  email: string
  company: string
  service: string
  budget: string
  timeline: string
  message: string
}

const EMPTY: FormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
}

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div className="relative">
      <label className="block text-xs font-display font-semibold tracking-widest uppercase text-cw-muted mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-cw-surface border border-cw-border rounded-sm px-4 py-3 text-sm text-cw-text focus:outline-none focus:border-cw-accent transition-colors duration-200 pr-10"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-cw-muted pointer-events-none"
        />
      </div>
    </div>
  )
}

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
  }, [])

  const set = (key: keyof FormData) => (v: string) =>
    setForm(prev => ({ ...prev, [key]: v }))

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSendError(null)

    const submissionDate = new Date().toLocaleString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short',
      day: 'numeric', hour: '2-digit', minute: '2-digit',
    })

    const ownerParams = {
      to_email:        'hello@cwdevs.com',
      from_name:       form.name,
      reply_to:        form.email,
      company:         form.company || 'N/A',
      service:         form.service,
      budget:          form.budget  || 'Not specified',
      timeline:        form.timeline || 'Not specified',
      message:         form.message,
      submission_date: submissionDate,
    }

    const clientParams = {
      to_email: form.email,
      to_name:  form.name,
      reply_to: form.email,
      message:  form.message,
    }

    try {
      await Promise.all([
        emailjs.send(EMAILJS_SERVICE_ID, OWNER_TEMPLATE_ID,  ownerParams),
        emailjs.send(EMAILJS_SERVICE_ID, CLIENT_TEMPLATE_ID, clientParams),
      ])
      setSubmitted(true)
    } catch (err: unknown) {
      console.error('EmailJS error:', err)
      let msg = 'Something went wrong. Please try again or email us directly at hello@cwdevs.com.'
      if (err && typeof err === 'object' && 'text' in err) {
        msg = `EmailJS: ${(err as { status: number; text: string }).text} (status ${(err as { status: number; text: string }).status})`
      } else if (err instanceof Error) {
        msg = err.message
      }
      setSendError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setSendError(null)
      setForm(EMPTY)
    }, 400)
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const panelVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } },
    exit:    { opacity: 0, y: 20, scale: 0.97, transition: { duration: 0.2, ease: 'easeIn' } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25 }}
          onClick={e => { if (e.target === overlayRef.current) handleClose() }}
          style={{ background: 'rgba(8,10,15,0.85)', backdropFilter: 'blur(12px)' }}
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-cw-dark border border-cw-border rounded-sm shadow-2xl"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--cw-border) transparent' }}
          >
            {/* Accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cw-accent/60 to-transparent" />

            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 text-cw-muted hover:text-white transition-colors duration-200"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-6 py-20 px-8 text-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-cw-accent/20 animate-ping" />
                    <CheckCircle2 size={56} className="relative text-cw-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white mb-3">
                      Message Received
                    </h3>
                    <p className="text-cw-muted text-sm leading-relaxed max-w-sm">
                      Thanks, <span className="text-white">{form.name || 'there'}</span>. We'll review your inquiry and get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-2 px-8 py-3 border border-cw-accent text-cw-accent text-xs font-display font-semibold tracking-widest uppercase rounded-sm hover:bg-cw-accent hover:text-cw-black transition-all duration-300"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Header */}
                  <div className="px-8 pt-10 pb-6 border-b border-cw-border">
                    <p className="text-xs font-display font-semibold tracking-widest uppercase text-cw-accent mb-2">
                      New Inquiry
                    </p>
                    <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white">
                      Start a Project
                    </h2>
                    <p className="text-cw-muted text-sm mt-2">
                      Tell us what you're building — we'll handle the rest.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
                    {/* Row: Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-display font-semibold tracking-widest uppercase text-cw-muted mb-2">
                          Full Name <span className="text-cw-accent">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={e => set('name')(e.target.value)}
                          placeholder="Name"
                          className="w-full bg-cw-surface border border-cw-border rounded-sm px-4 py-3 text-sm text-cw-text placeholder-cw-muted/50 focus:outline-none focus:border-cw-accent transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-display font-semibold tracking-widest uppercase text-cw-muted mb-2">
                          Email <span className="text-cw-accent">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={e => set('email')(e.target.value)}
                          placeholder="@"
                          className="w-full bg-cw-surface border border-cw-border rounded-sm px-4 py-3 text-sm text-cw-text placeholder-cw-muted/50 focus:outline-none focus:border-cw-accent transition-colors duration-200"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-display font-semibold tracking-widest uppercase text-cw-muted mb-2">
                        Company / Organisation
                      </label>
                      <input
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={e => set('company')(e.target.value)}
                        placeholder="(optional)"
                        className="w-full bg-cw-surface border border-cw-border rounded-sm px-4 py-3 text-sm text-cw-text placeholder-cw-muted/50 focus:outline-none focus:border-cw-accent transition-colors duration-200"
                      />
                    </div>

                    {/* Service */}
                    <SelectField
                      label="Service Needed *"
                      value={form.service}
                      onChange={set('service')}
                      options={SERVICE_OPTIONS}
                      placeholder="Select a service…"
                    />

                    {/* Budget + Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <SelectField
                        label="Budget Range"
                        value={form.budget}
                        onChange={set('budget')}
                        options={BUDGET_OPTIONS}
                        placeholder="Select a range…"
                      />
                      <SelectField
                        label="Timeline"
                        value={form.timeline}
                        onChange={set('timeline')}
                        options={TIMELINE_OPTIONS}
                        placeholder="Select timeline…"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-display font-semibold tracking-widest uppercase text-cw-muted mb-2">
                        Project Brief <span className="text-cw-accent">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={e => set('message')(e.target.value)}
                        placeholder="Describe your project, goals, any existing systems we need to work with, and anything else that helps us understand the scope…"
                        className="w-full bg-cw-surface border border-cw-border rounded-sm px-4 py-3 text-sm text-cw-text placeholder-cw-muted/50 focus:outline-none focus:border-cw-accent transition-colors duration-200 resize-none leading-relaxed"
                      />
                    </div>

                    {/* Error message */}
                    {sendError && (
                      <div className="flex items-start gap-3 px-4 py-3 rounded-sm border border-cw-accent-3/40 bg-cw-accent-3/10">
                        <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-cw-accent-3 shrink-0 mt-1.5" />
                        <p className="text-xs text-cw-accent-3 leading-relaxed">{sendError}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <div className="flex items-center justify-between pt-2 border-t border-cw-border">
                      <p className="text-xs text-cw-muted">
                        <span className="text-cw-accent">*</span> Required fields
                      </p>
                      <button
                        type="submit"
                        disabled={loading || !form.service}
                        className="inline-flex items-center gap-3 px-8 py-3.5 bg-cw-accent text-cw-black text-xs font-display font-bold tracking-widest uppercase rounded-sm hover:bg-cw-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-cw-black/30 border-t-cw-black rounded-full animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Inquiry
                            <Send size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
