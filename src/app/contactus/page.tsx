"use client"
import { useState } from 'react'
import Head from 'next/head'

export default function ContactUs() {
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('Billing')
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
        setCategory('Billing')
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
    <>
      <Head>
        <title>Support - VecraHost</title>
        <meta name="description" content="Get support from VecraHost" />
      </Head>
      <main className="container mx-auto px-4 py-12 bg-gray-900 text-white min-h-screen pt-24">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-purple-400">Support</h1>
          <div className="bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-purple-300">Email</h2>
              <p>
                <a href="mailto:support@vecrahost.in" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  support@vecrahost.in
                </a>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="flex flex-col text-sm text-gray-300">
                Your Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="you@example.com"
                />
              </label>

              <label className="flex flex-col text-sm text-gray-300">
                Category
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 px-3 py-2 rounded-lg bg-gray-800 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option>Billing</option>
                  <option>Minecraft Hosting</option>
                  <option>VPS Hosting</option>
                  <option>Technical Support</option>
                  <option>Sales</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="flex flex-col text-sm text-gray-300">
                Description
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="mt-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Describe your issue or request"
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 bg-accent text-white font-semibold rounded-lg hover:bg-[#005fcb] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Support Request'}
              </button>

              {status && (
                <p className={`text-sm ${status.success ? 'text-green-400' : 'text-red-400'}`}>{status.message}</p>
              )}
            </form>
          </div>
        </div>
      </main>
    </>
  )
}