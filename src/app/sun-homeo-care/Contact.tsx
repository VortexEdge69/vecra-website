import { Link } from "next/link";

export default function Contact() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        Reach out to Sun Homeo Care for appointments, inquiries, or to learn more about our homeopathy services.
      </p>
      <Link href="/contactus" className="inline-flex items-center gap-2 text-brand-primary font-medium hover:underline">
        Get in Touch
      </Link>
      <div className="mt-6">
        <p className="text-gray-500 text-sm">
          Sun Homeo Care<br>
          Maruthi Nagar, Eluru Road<br>
          Vijayawada, AP<br>
          Phone: [Public number available]<br>
          Website: https://vecrahost.in/sun-homeo-care
        </p>
      </div>
    </div>
  );
}
