import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
             <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Cookie Policy</h1>
        <p className="text-gray-500 mb-12">Last updated: January 26, 2026</p>

        <div className="space-y-12 text-lg leading-relaxed text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. What Are Cookies</h2>
            <p>
              Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. How We Use Cookies</h2>
            <p className="mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>To enable certain functions of the Service.</li>
                <li>To provide analytics.</li>
                <li>To store your preferences.</li>
                <li>To enable advertisements delivery, including behavioral advertising.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Your Choices</h2>
            <p>
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
