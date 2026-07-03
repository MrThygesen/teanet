import { useEffect, useState } from 'react'

export default function MembershipRequests() {

  const [requests, setRequests] = useState([])
  const [loadingId, setLoadingId] = useState(null)

  async function load() {
    try {
      const res = await fetch('/api/admin/membership-requests')
      const data = await res.json()
      setRequests(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function approve(id) {

    setLoadingId(id)

    try {

      const res = await fetch('/api/admin/membership-approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Approval failed')
      }

      await load()

    } catch (err) {
      alert(err.message)
      console.error(err)
    }

    setLoadingId(null)
  }

  async function reject(id) {

    setLoadingId(id)

    try {

      const res = await fetch('/api/admin/membership-reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Reject failed')
      }

      await load()

    } catch (err) {
      alert(err.message)
      console.error(err)
    }

    setLoadingId(null)
  }

  return (

    <div className="bg-black min-h-screen text-white">

      <div className="max-w-6xl mx-auto p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Membership Requests
          </h1>

          <a
            href="/admin/sbt-manager"
            className="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700"
          >
            SBT Management
          </a>

        </div>

        {requests.length === 0 && (

          <div className="text-zinc-500 text-center py-20">
            No membership requests found.
          </div>

        )}

        <div className="space-y-6">

          {requests.map((r) => (

            <div
              key={r.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-xl font-semibold">
                    {r.full_name}
                  </h2>

                  <div className="text-zinc-400">
                    {r.company || '-'}
                  </div>

                </div>

                <div>

                  {r.status === 'pending' && (
                    <span className="text-yellow-400 font-medium">
                      Pending
                    </span>
                  )}

                  {r.status === 'approved' && (
                    <span className="text-green-400 font-medium">
                      Approved
                    </span>
                  )} 

                  {r.status === 'rejected' && (
                    <span className="text-red-400 font-medium">
                      Rejected
                    </span>
                  )}

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-5 mt-6 text-sm">

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

              {r.status === 'pending' && (

                <div className="flex gap-3 mt-8">

                  <button
                    onClick={() => approve(r.id)}
                    disabled={loadingId === r.id}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                  >
                    {loadingId === r.id ? 'Approving...' : 'Approve'}
                  </button>

                  <button
                    onClick={() => reject(r.id)}
                    disabled={loadingId === r.id}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                  >
                    Reject
                  </button>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}
