// MembershipForm.js
'use client'

import { useState } from 'react'

export default function MembershipForm() {

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const [form, setForm] = useState({
    full_name: '',
    email: '',    
    linkedin_url: '',
    company: '',    
    reason: '',    
    join_reason: '',    
    wallet: '',    
    membership_type: 'Founder'
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
        email: '',
        linkedin_url: '',
company: '',
reason,
join_reason: '',      
wallet: '',
        membership_type: 'Founder',
      })

setPrivacyAccepted(false)

    }

catch (err) {

  console.error(err)
  setError(err.message)

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
          Thank you for your interest in EDGE Spaces.
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
      Join a trusted community of founders, builders, advisors and investors exploring new opportunities together.
          </p>

         </div>

        {error && (
          <div className="bg-zinc-900 border border-red-700 rounded-2xl p-8 mb-8">

           <h2 className="text-2xl font-bold text-red-400 mb-4">
            Unable to Submit Request
           </h2>

            <p className="text-zinc-300">
            {error}
            </p>

<p className="text-zinc-400 mt-3">
  If you believe this is an error, please contact us.
</p>


          </div>
        )}

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

<div>

<label className="block text-sm text-zinc-400 mb-2">
  Email Address
</label>

<input
  type="email"
  required
  value={form.email}
  onChange={(e) =>
    updateField('email', e.target.value)
  }
  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
/>
        </div>

<div>

<label className="block text-sm text-zinc-400 mb-2">
Organization / Company
</label>

<input
  type="text"
  required
  placeholder=""
  value={form.company}
  onChange={(e) =>
    updateField('company', e.target.value)
  }
  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
/>

</div>


 <div>
 <label className="block text-sm text-zinc-400 mb-2">
  Professional Profile (linkedin / github)
 </label>
 <input
   type="text"
   placeholder="https://linkedin.com/in/..."
   value={form.linkedin_url}
   onChange={(e) =>
   updateField('linkedin_url', e.target.value)
   }
   className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
   />
  </div>

<div>

  <label className="block text-sm text-zinc-400 mb-2">
    Wallet (Optional)
  </label>

  <input
    type="text"
    placeholder="For Membership Card"
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
              Primary Role
            </label>

            <select
              value={form.membership_type}
              onChange={(e) =>
                updateField('membership_type', e.target.value)
              }
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
            >

        <option>Founder</option>
        <option>Builder</option>
<option>Developer</option>
<option>Manager</option>
<option>Investor</option>
<option>Angel Investor</option>
<option>VC Investor</option>
<option>Family Office</option>
<option>Specialist</option>
<option>Ecosystem Partner</option>
<option>Student</option>
<option>Other</option>

            </select>

          </div>



<div>

 <label className="block text-sm text-zinc-400 mb-2">
 Primary Purpose of Joining
 </label>

 <select
 required
 value={form.reason}
 onChange={(e)=>
 updateField('reason', e.target.value)
 }
 className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
 >
   <option value="">Select...</option>
   <option>Build Startups</option>
  <option>Find Co-founders</option>
   <option>Join Startup Teams</option>
   <option>Angel Investing</option>
   <option>Mentor Founders</option>
   <option>Share Expertise</option>
   <option>Expand Professional Network</option>
   <option>Explore EDGE Spaces</option>
   <option>Other</option>
 </select>

 <label className="block text-sm text-zinc-400 mb-2 mt-6">
 Tell us a little about yourself
 </label>

 <textarea
 rows={4}
 required
 value={form.join_reason}
 onChange={(e)=>
 updateField('join_reason', e.target.value)
 }
 className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white"
 />

</div>

<div className="flex items-start gap-3">

  <input
    id="privacy"
    type="checkbox"
    required
    checked={privacyAccepted}
    onChange={(e) => setPrivacyAccepted(e.target.checked)}
    className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-950"
  />

  <label
    htmlFor="privacy"
    className="text-sm text-zinc-400 leading-relaxed"
  >
    I have read and agree to the{" "}
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
  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 text-white disabled:text-zinc-300 font-medium"
>
  {loading ? 'Submitting...' : 'Request Access'}
</button>
        </form>

      </div>

    </div>

  )
}
