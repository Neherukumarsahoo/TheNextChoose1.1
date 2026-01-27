import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
            <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Last updated: January 26, 2026</p>

        <div className="space-y-12 text-lg leading-relaxed text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Personal identifiers (name, email address, phone number).</li>
                <li>Business information (company name, role).</li>
                <li>Payment information (processed securely by our providers).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. How We Use Your Information</h2>
            <p>
              We use the collected data to provide, maintain, and improve our services, including processing transactions, sending technical notices, and responding to your comments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
