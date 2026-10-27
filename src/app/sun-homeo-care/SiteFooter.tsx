import { Link } from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-brand-surface border-t border-brand-border py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            Sun Homeo Care &copy; 2026. All rights reserved.
          </p>
          <Link href="/contactus" className="text-brand-primary font-medium hover:underline">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
