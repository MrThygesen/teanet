import { useEffect, useState } from 'react'

export default function MembershipRequests() {

  const [requests, setRequests] = useState([])

  async function load() {
    const res = await fetch('/api/admin/membership-requests')
    const data = await res.json()
    setRequests(data)
  }

  useEffect(() => {
    load()
  }, [])

  return (

    <div className="bg-black min-h-screen text-white">

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-3xl font-bold mb-8">
          Membership Requests
        </h1>

        <div className="space-y-6">

          {requests.map((r) => (

            <div
              key={r.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-semibold">
                    {r.full_name}
                  </h2>

                  <div className="text-zinc-400">
                    {r.company}
                  </div>

                </div>

                <div className="text-yellow-400">
                  {r.status}
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6 text-sm">

                <div>
                  <strong>Email</strong><br />
                  {r.email}
                </div>

                <div>
                  <strong>Role</strong><br />
                  {r.membership_type}
                </div>

                <div>
                  <strong>LinkedIn</strong><br />
                  {r.linkedin_url || '-'}
                </div>

                <div>
                  <strong>Telegram</strong><br />
                  {r.telegram_username || '-'}
                </div>

                <div className="md:col-span-2">
                  <strong>Wallet</strong><br />
                  {r.wallet || '-'}
                </div>

                <div className="md:col-span-2">
                  <strong>Reason</strong><br />
                  {r.join_reason}
                </div>

              </div>

              <div className="flex gap-3 mt-8">

                <button
                  className="bg-green-600 px-4 py-2 rounded"
                >
                  Approve
                </button>

                <button
                  className="bg-red-600 px-4 py-2 rounded"
                >
                  Reject
                </button>

                <button
                  className="bg-blue-600 px-4 py-2 rounded"
                >
                  Send Welcome Email
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}
