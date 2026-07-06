import { sql } from '../../../lib/postgres'

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
  }

  try {

    const { wallet, tokenId } = req.body

    if (!wallet) {
      return res.status(400).json({
        success: false,
        error: 'Wallet is required'
      })
    }

    await sql`

      UPDATE membership_requests

      SET
        claimed = TRUE,
        claimed_at = NOW(),
        token_id = ${tokenId ?? null}

      WHERE LOWER(wallet) = LOWER(${wallet})

    `

    return res.json({
      success: true
    })

  } catch (err) {

    console.error(err)

    return res.status(500).json({
      success: false,
      error: 'Database error'
    })

  }

}
