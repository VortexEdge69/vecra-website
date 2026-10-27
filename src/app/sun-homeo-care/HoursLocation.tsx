import { Link } from "next/link";

export default function HoursLocation() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-3xl font-bold mb-4">Opening Hours</h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        We are open Monday through Saturday from 11:00 AM to 7:00 PM.
        This gives you convenient access to our homeopathy services during your weekdays and weekends.
      </p>
      <Link href="/contactus" className="inline-flex items-center gap-2 text-brand-primary font-medium hover:underline">
        View Hours
      </Link>
    </div>
  );
}
