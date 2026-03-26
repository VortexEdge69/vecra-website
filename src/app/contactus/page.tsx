"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

export default function ContactUs() {
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('Billing Inquiry')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { success: boolean; message: string }>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !category || !description) return
    setSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch('/api/support-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, category, description })
      })
      if (res.ok) {
        setStatus({ success: true, message: 'Your request has been submitted. Our team will email you shortly.' })
        setEmail('')
        setCategory('Billing Inquiry')
        setDescription('')
      } else {
        setStatus({ success: false, message: 'Failed to submit request. Please try again.' })
      }
    } catch (error) {
      console.error('Support request error:', error)
      setStatus({ success: false, message: 'Unexpected error. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <main className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Centralized Support</h1>
            <p className="text-brand-muted text-lg max-w-2xl mx-auto leading-relaxed">
              Need technical assistance or have questions about enterprise configurations?
              Our engineering team is available 24/7 to support your infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sidebar Info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="card-enterprise">
                <div className="w-10 h-10 bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h4 className="font-bold text-lg mb-2">Direct Email</h4>
                <p className="text-brand-muted text-sm mb-4">For sales and partnerships:</p>
                <a href="mailto:support@vecrahost.in" className="text-brand-primary font-mono text-sm font-bold hover:underline">support@vecrahost.in</a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <div className="card-enterprise">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black tracking-widest text-brand-muted">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-text focus:outline-none focus:border-brand-primary transition-colors text-sm"
                        placeholder="corporate@domain.com"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase font-black tracking-widest text-brand-muted">Inquiry Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-text focus:outline-none focus:border-brand-primary transition-colors text-sm cursor-pointer"
                      >
                        <option>Billing Inquiry</option>
                        <option>Technical Support</option>
                        <option>Sales Inquiry</option>
                        <option>Project Consultation</option>
                        <option>Abuse Report</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black tracking-widest text-brand-muted">Message Analysis</label>
                    <textarea
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={8}
                      className="w-full px-4 py-3 bg-brand-bg border border-brand-border text-brand-text focus:outline-none focus:border-brand-primary transition-colors text-sm resize-none"
                      placeholder="Provide a detailed description of your request..."
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full md:w-auto px-12 py-4 disabled:opacity-50"
                    >
                      {submitting ? 'Processing...' : 'Submit Request'}
                    </button>

                    {status && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-sm font-bold ${status.success ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {status.message}
                      </motion.p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}