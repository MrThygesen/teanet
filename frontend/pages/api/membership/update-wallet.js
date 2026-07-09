import { sql } from '../../../lib/postgres'

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  try {

    const { email, wallet } = req.body

    if (!email || !wallet) {
      return res.status(400).json({
        error: 'Email and wallet are required'
      })
    }

    // Prevent the same wallet from belonging to multiple members

    const existingWallet = await sql`

      SELECT id

      FROM membership_requests

      WHERE LOWER(wallet) = LOWER(${wallet})

      LIMIT 1

    `

    if (existingWallet.length) {

      return res.status(400).json({

        error: 'This wallet is already registered.'

      })

    }

    // Only approved members may register a wallet

   const updated = await sql`

  UPDATE membership_requests

  SET wallet = ${wallet}

  WHERE LOWER(email) = LOWER(${email})

  AND status = 'approved'

  AND (
      wallet IS NULL
      OR TRIM(wallet) = ''
  )

  RETURNING id

`

    if (!updated.length) {

      return res.status(404).json({

        error: 'Approved membership not found, or a wallet is already registered.'

      })

    }

    return res.status(200).json({

      success: true

    })

  }

  catch (err) {

    console.error(err)

    return res.status(500).json({

      error: 'Database error'

    })

  }

}
