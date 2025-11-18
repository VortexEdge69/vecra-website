"use client"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import CustomPlanCard from "@/components/CustomPlanCard"
import Image from "next/image"

export default function CustomPlanClient() {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get("type")
  const type = (typeParam === "minecraft" || typeParam === "vps") ? typeParam : "vps"

  const title = type === "minecraft" ? "Request a Custom Minecraft Plan" : "Request a Custom VPS Plan"
  const intro = type === "minecraft"
    ? "Didn’t find a Minecraft plan that fits your needs? No worries — tell us what you want and we’ll tailor a plan for you."
    : "Didn’t find a VPS plan that fits your needs? No worries — share your requirements and we’ll tailor a plan for you."

  return (
    <div className="min-h-screen w-full px-4 pt-20 pb-12 bg-gradient-to-br from-[#0e1013] to-[#1b1f27] text-white flex flex-col items-center">
      <div className="max-w-xl w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 md:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <Image src="/assets/vecrahost-logo.svg" alt="Custom Plan" width={36} height={36} className="opacity-90" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-1">{title}</h1>
              <p className="text-gray-300 text-sm md:text-base">{intro}</p>
            </div>
          </div>
          <Link href="/" className="text-sm text-accent hover:underline">Back to Home</Link>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-5">
          <p className="text-xs md:text-sm text-yellow-300">
            After you submit, our staff will contact you via email. Please also check your spam/junk folder in case our emails are filtered there.
          </p>
        </div>

        <CustomPlanCard type={type as "minecraft" | "vps"} />
      </div>
    </div>
  )
}