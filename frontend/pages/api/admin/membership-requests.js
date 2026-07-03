import { sql } from '../../../lib/postgres'

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  try {

    const requests = await sql`

      SELECT *

      FROM membership_requests

      ORDER BY created_at DESC

    `

    res.status(200).json(requests)

  }

  catch(err) {

    console.error(err)

    res.status(500).json({
      error: 'Database error'
    })

  }

}
