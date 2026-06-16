// MembershipForm.js
'use client'

import { useState } from 'react'

export default function MembershipForm() {

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    full_name: '',
    company: '',
    project: '',
    wallet: '',
    reason: '',
    membership_type: 'Founder',
    newsletter: false
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

    try {

      const res = await fetch('/api/membership/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Submission failed')
      }

      setSuccess(true)

      setForm({
        full_name: '',
        company: '',
        project: '',
        wallet: '',
        reason: '',
        membership_type: 'Founder',
        newsletter: false
      })

    } catch (err) {

      console.error(err)
      alert(err.message)

    }

    setLoading(false)
  }

  if (success) {

    return (

      <div className="bg-zinc-900 border border-green-700 rounded-2xl p-8 max-w-3xl mx-auto">

        <h2 className="text-2xl font-bold text-green-400 mb-4">
          Membership Request Submitted
        </h2>

        <p className="text-zinc-300">
          Thank you for your interest in TEANET.
        </p>

        <p className="text-zinc-400 mt-3">
          Membership requests are reviewed manually.
        </p>

      </div>

    )
  }

  return (

    <div className="max-w-4xl mx-auto px-6 py-14">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

        <div className="mb-8">

          <div className="text-sm uppercase tracking-[0.2em] text-blue-400 mb-3">
            Membership
          </div>

          <h2 className="text-3xl font-bold">
            Apply for Membership
          </h2>

          <p className="text-zinc-400 mt-4 leading-relaxed">
            TEANET supports founders, investors, mentors,
            ecosystem partners and community participants.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Name */}

          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Full Name
            </label>

            <input
              type="text"
              required
              value={form.full_name}
              onChange={(e) =>
                updateField('full_name', e.target.value)
              }
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
            />

          </div>

          {/* Company */}

          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Company / Startup
            </label>

            <input
              type="text"
              value={form.company}
              onChange={(e) =>
                updateField('company', e.target.value)
              }
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
            />

          </div>

          {/* Project */}

          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Project
            </label>

            <input
              type="text"
              value={form.project}
              onChange={(e) =>
                updateField('project', e.target.value)
              }
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
            />

          </div>

          {/* Wallet */}

          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Wallet Address
            </label>

            <input
              type="text"
              required
              placeholder="0x..."
              value={form.wallet}
              onChange={(e) =>
                updateField('wallet', e.target.value)
              }
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
            />

          </div>

          {/* Membership */}

          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Membership Type
            </label>

            <select
              value={form.membership_type}
              onChange={(e) =>
                updateField('membership_type', e.target.value)
              }
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
            >

              <option>Founder</option>
              <option>Investor</option>
              <option>Partner</option>
              <option>Mentor</option>
              <option>Community Member</option>

            </select>

          </div>

          {/* Reason */}

          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Reason for Joining
            </label>

            <textarea
              rows={6}
              value={form.reason}
              onChange={(e) =>
                updateField('reason', e.target.value)
              }
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
            />

          </div>

          {/* Newsletter */}

          <label className="flex items-start gap-3 text-sm text-zinc-400">

            <input
              type="checkbox"
              checked={form.newsletter}
              onChange={(e) =>
                updateField('newsletter', e.target.checked)
              }
              className="mt-1"
            />

            <span>
              I agree to receive updates and information from
              TEANET and selected ecosystem partners.
            </span>

          </label>

          <button
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>

        </form>

      </div>

    </div>

  )
}
