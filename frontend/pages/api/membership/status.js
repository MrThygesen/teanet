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

        id,
        full_name,
        company,
        email,
        telegram_username,
        linkedin_url,

        membership_type,

        status,
        claimed,

        approved_at,
        claimed_at,

        token_id,

        wallet

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

    const member = result[0]

    return res.json({

      id: member.id,

      status: member.status,

      claimed: member.claimed,

      full_name: member.full_name,

      company: member.company,

      email: member.email,

      membership_type: member.membership_type,

      telegram_username: member.telegram_username,

      linkedin_url: member.linkedin_url,

      wallet: member.wallet,

      approved_at: member.approved_at,

      claimed_at: member.claimed_at,

      token_id: member.token_id

    })

  }

  catch (err) {

    console.error(err)

    return res.status(500).json({

      status: 'none',

      error: 'Database error'

    })

  }

}
