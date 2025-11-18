"use client"
import React, { useState } from "react"
import Link from "next/link"

interface CustomPlanCardProps {
  type: "minecraft" | "vps"
}

export default function CustomPlanCard({ type }: CustomPlanCardProps) {
  const [email, setEmail] = useState("")
  const [cpu, setCpu] = useState("")
  const [ram, setRam] = useState("")
  const [storage, setStorage] = useState("")
  const [bandwidthOrPlayers, setBandwidthOrPlayers] = useState("")
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { success: boolean; message: string }>(null)
  const [submitted, setSubmitted] = useState(false)

  const title = type === "minecraft" ? "Custom Minecraft Plan" : "Custom VPS Plan"
  const subtitle = type === "minecraft" ? "Tell us your server needs" : "Share your VPS specs"
  const bwLabel = type === "minecraft" ? "Player slots / bandwidth" : "Bandwidth"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)

    try {
      const specs = {
        cpu,
        ram,
        storage,
        [type === "minecraft" ? "playersOrBandwidth" : "bandwidth"]: bandwidthOrPlayers,
        notes,
      }

      const res = await fetch("/api/custom-plan-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, email, specs }),
      })

      const data = await res.json()
      if (res.ok) {
        setStatus({ success: true, message: "Request sent successfully. We'll reach out soon!" })
        setEmail("")
        setCpu("")
        setRam("")
        setStorage("")
        setBandwidthOrPlayers("")
        setNotes("")
        setSubmitted(true)
      } else {
        setStatus({ success: false, message: data?.error || "Failed to send request" })
      }
    } catch {
      setStatus({ success: false, message: "Unexpected error while sending request" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs ${type === "minecraft" ? "bg-green-500/20 text-green-300" : "bg-blue-500/20 text-blue-300"}`}>
          {type === "minecraft" ? "Minecraft" : "VPS"}
        </span>
      </div>

      {!submitted && (
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex flex-col text-sm text-gray-300">
            Email
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
            CPU
            <input
              type="text"
              value={cpu}
              onChange={(e) => setCpu(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder={type === "minecraft" ? "e.g., 2 vCPU" : "e.g., 4 vCPU"}
            />
          </label>

          <label className="flex flex-col text-sm text-gray-300">
            RAM
            <input
              type="text"
              value={ram}
              onChange={(e) => setRam(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder={type === "minecraft" ? "e.g., 4 GB" : "e.g., 8 GB"}
            />
          </label>

          <label className="flex flex-col text-sm text-gray-300">
            Storage
            <input
              type="text"
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="e.g., 100 GB SSD"
            />
          </label>

          <label className="flex flex-col text-sm text-gray-300 sm:col-span-2">
            {bwLabel}
            <input
              type="text"
              value={bandwidthOrPlayers}
              onChange={(e) => setBandwidthOrPlayers(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder={type === "minecraft" ? "e.g., 50 players" : "e.g., 5 TB"}
            />
          </label>

          {/* Budget field removed per request */}

          <label className="flex flex-col text-sm text-gray-300 sm:col-span-2">
            Notes / Requirements
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent min-h-[80px]"
              placeholder="Mods, OS preference, control panel, migration needs, etc."
            />
          </label>
        </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-full px-4 py-2 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-[#005fcb] transition-colors disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Request Custom Plan"}
      </button>
      </form>
      )}

      {submitted && (
        <div className="mt-3 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
            <svg className="w-10 h-10 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="mt-4 text-green-400 font-semibold">Your request has been sent to our staff.</p>
          <p className="text-gray-300">We’ll reach out to you soon. Please keep an eye on your email.</p>
          <Link href="/" className="mt-4 inline-block px-5 py-2 bg-accent text-white rounded-lg hover:bg-[#005fcb] transition-colors">Return to Home</Link>
        </div>
      )}

      {!submitted && status && (
        <div className={`mt-3 text-sm ${status.success ? "text-green-400" : "text-red-400"}`}>
          {status.message}
        </div>
      )}
    </div>
  )
}