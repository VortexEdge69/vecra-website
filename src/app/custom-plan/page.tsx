import { Suspense } from "react"
import CustomPlanClient from "./CustomPlanClient"

export default function CustomPlanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full px-6 pt-24 pb-16 bg-gradient-to-br from-[#0e1013] to-[#1b1f27] text-white flex items-center justify-center">Loading...</div>}>
      <CustomPlanClient />
    </Suspense>
  )
}