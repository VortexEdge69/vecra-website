import { Link } from "next/link";

export default function About() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-3xl font-bold mb-4">About Sun Homeo Care</h2>
      <p className="text-gray-600 leading-relaxed">
        Sun Homeo Care is a homeopathy clinic located in Maruthi Nagar, Eluru Road, Vijayawada. We provide traditional homeopathic treatments for holistic wellness, focusing on natural, gentle remedies that support your body's innate healing abilities. Our clinic is open Monday through Saturday, offering convenient hours for our community.
      </p>
      <Link href="/contactus" className="inline-flex items-center gap-2 text-brand-primary font-medium hover:underline">
        Learn More
      </Link>
    </div>
  );
}
