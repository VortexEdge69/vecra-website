import { Link } from "next/link";

export default function SiteHeader() {
  return (
    <header className="bg-brand-primary text-white py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl">
            Sun Homeo Care
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/contactus" className="text-white text-sm font-medium hover:underline">
              Contact
            </Link>
            <Link href="/services" className="text-white text-sm font-medium hover:underline">
              Services
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
