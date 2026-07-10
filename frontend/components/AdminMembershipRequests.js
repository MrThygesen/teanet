'use client'

import { useEffect, useState } from 'react'

export default function AdminMembershipRequests() {

  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadRequests() {

    setLoading(true)

    try {

      const res = await fetch('/api/membership-requests')
      const json = await res.json()

      setRequests(json)

    } catch (err) {

      console.error(err)

    }

    setLoading(false)

  }

  useEffect(() => {

    loadRequests()

  }, [])

  async function approve(id) {

    await fetch('/api/membership-approve', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ id })

    })

    loadRequests()

  }

  async function reject(id) {

    await fetch('/api/membership-reject', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ id })

    })

    loadRequests()

  }

  return (

    <div className="p-6 bg-zinc-900 border border-zinc-700 rounded-xl">

      <h3 className="text-xl font-semibold mb-6">

        Pending Membership Requests

      </h3>

      {loading && (

        <div className="text-zinc-400">

          Loading...

        </div>

      )}

      {!loading && requests.length === 0 && (

        <div className="text-zinc-400">

          No pending membership requests.

        </div>

      )}

      <div className="space-y-6">

        {requests.map(member => (

          <div
            key={member.id}
            className="border border-zinc-700 rounded-lg p-5"
          >

            <div className="font-semibold text-lg">

              {member.full_name}

            </div>

            <div className="text-zinc-400">

              {member.email}

            </div>

            <div className="text-zinc-500 mt-2">

              {member.company || 'No company'}

            </div>

            <div className="font-mono text-sm text-zinc-500 mt-2 break-all">

              {member.wallet || 'No wallet'}

            </div>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => approve(member.id)}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
              >
                Approve
              </button>

              <button
                onClick={() => reject(member.id)}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
              >
                Reject
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}
