// pages/contact.js

import { useState } from 'react'
import Header from '../components/Header'
import Head from 'next/head'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    company: '',
    subject: 'General Question',
    message: ''
  })

  function updateField(name, value) {
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Unable to send message.')
      }

      setSuccess(true)

      setForm({
        full_name: '',
        email: '',
        company: '',
        subject: 'General Question',
        message: ''
      })

      setPrivacyAccepted(false)

    } catch (err) {
      console.error(err)
      setError(err.message)
    }

    setLoading(false)
  }

return (
    <>
<Head>
  <title>Contact | EDGE Spaces</title>

  <meta
    name="description"
    content="Contact EDGE Spaces regarding membership, partnerships, events or collaboration."
  />

  <meta
    property="og:title"
    content="Contact | EDGE Spaces"
  />

  <meta
    property="og:description"
    content="Questions about membership, partnerships or collaboration? We'd love to hear from you."
  />

  <meta
    property="og:image"
    content="https://edgespaces.xyz/images/community-preview.jpg"
  />

  <meta
    property="og:url"
    content="https://edgespaces.xyz/contact"
  />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="EDGE Spaces" />
  <meta property="og:locale" content="en_US" />

  <link
    rel="canonical"
    href="https://edgespaces.xyz/contact"
  />
</Head>     


 <div className="bg-black text-white min-h-dvh">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-14">

        {success ? (

          <div className="bg-zinc-900 border border-green-700 rounded-2xl p-8">

            <h1 className="text-3xl font-bold text-green-400 mb-4">
              Message Sent
            </h1>

            <p className="text-zinc-300">
              Thank you for contacting EDGE Spaces.
            </p>

            <p className="text-zinc-400 mt-3">
              We'll get back to you as soon as possible.
            </p>

          </div>

        ) : (

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

            <div className="mb-8">

              <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
                Contact
              </div>

              <h1 className="text-3xl font-bold">
                Get in Touch
              </h1>

              <p className="text-zinc-400 mt-4 leading-relaxed">
                Have a question about membership, partnerships, events or collaboration?
                We'd love to hear from you.
              </p>

<div className="flex flex-wrap gap-3 mt-6">

  <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm">
    Membership
  </span>

  <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm">
    Partnerships
  </span>

  <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm">
    Events & Collaboration
  </span>

</div>

            </div>






            {error && (
              <div className="bg-zinc-950 border border-red-700 rounded-xl p-5 mb-8">

                <div className="font-semibold text-red-400">
                  Unable to Send Message
                </div>

                <p className="text-zinc-300 mt-2">
                  {error}
                </p>

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  Full Name
                </label>

                <input
                  required
                  type="text"
                  value={form.full_name}
                  onChange={(e)=>updateField('full_name',e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
                />

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  Email Address
                </label>

                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e)=>updateField('email',e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
                />

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  Organization / Company (optional)
                </label>

                <input
                  type="text"
                  value={form.company}
                  onChange={(e)=>updateField('company',e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
                />

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  Subject
                </label>

                <select
                  value={form.subject}
                  onChange={(e)=>updateField('subject',e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
                >
                  <option>General Question</option>
                  <option>Membership</option>
                  <option>Partnerships</option>
                  <option>Events</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-2">
                  Message
                </label>

                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e)=>updateField('message',e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
                />

              </div>

              <div className="flex items-start gap-3">

                <input
                  id="privacy"
                  type="checkbox"
                  required
                  checked={privacyAccepted}
                  onChange={(e)=>setPrivacyAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-950"
                />

                <label
                  htmlFor="privacy"
                  className="text-sm text-zinc-400 leading-relaxed"
                >
                  I have read and agree to the{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Privacy Policy
                  </a>.
                </label>

              </div>

              <button
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 text-white font-medium"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

            </form>

          </div>

        )}

   </div>
   </div>
    </>
  )
}
