import { sql } from '../../../lib/postgres'

export default async function handler(req, res) {

  const { wallet } = req.query

  if (!wallet) {
    return res.status(400).json({
      status: 'none'
    })
  }

  try {

    const result = await sql`

      SELECT
        status,
        claimed
      FROM membership_requests
      WHERE LOWER(wallet) = LOWER(${wallet})
      ORDER BY created_at DESC
      LIMIT 1

    `

    if (!result.length) {
      return res.json({
        status: 'none'
      })
    }

    const row = result[0]

    if (row.claimed) {
      return res.json({
        status: 'claimed'
      })
    }

    if (row.status === 'approved') {
      return res.json({
        status: 'approved'
      })
    }

    if (row.status === 'pending') {
      return res.json({
        status: 'pending'
      })
    }

    return res.json({
      status: 'none'
    })

  } catch (err) {

    console.error(err)

    return res.status(500).json({
      status: 'none'
    })

  }

}
