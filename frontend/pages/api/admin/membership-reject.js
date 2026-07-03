//pages/api/membership-reject.js

import { sql } from '../../../lib/postgres'

export default async function handler(req, res) {

  if (req.method !== 'POST') {

    return res.status(405).json({
      error: 'Method not allowed'
    })

  }

  try {

    const { id } = req.body

    if (!id) {

      return res.status(400).json({
        error: 'Missing membership request id'
      })

    }

    await sql`

      UPDATE membership_requests

      SET status='rejected'

      WHERE id=${id}

    `

    return res.status(200).json({

      success: true

    })

  }

  catch (err) {

    console.error(err)

    return res.status(500).json({

      error: 'Reject failed'

    })

  }

}
