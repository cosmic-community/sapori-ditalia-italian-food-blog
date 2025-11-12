import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Sapori d\'Italia',
  description: 'Get in touch with us for recipe questions, collaboration opportunities, or just to share your love of Italian cuisine.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-green-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Have a question about a recipe? Want to collaborate? We&apos;d love to hear from you!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-gray-600">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <ContactForm />

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Other Ways to Connect</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">📧</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600 text-sm">hello@saporiditalia.com</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📱</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Social Media</h4>
                  <p className="text-gray-600 text-sm">Follow us @saporiditaliarecipes</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🕐</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Response Time</h4>
                  <p className="text-gray-600 text-sm">Usually within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}