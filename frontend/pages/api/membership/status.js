import { sql } from '../../../lib/postgres'

export default async function handler(req, res) {

    const { wallet } = req.query

    if (!wallet) {

        return res.status(400).json({

            status: 'none'

        })

    }

    const result = await pool.query(

        `
        SELECT
            status,
            claimed,
            membership_type
        FROM membership_requests
        WHERE LOWER(wallet)=LOWER($1)
        ORDER BY id DESC
        LIMIT 1
        `,
        [wallet]
    )

    if (result.rows.length === 0) {

        return res.json({

            status: 'none'

        })

    }

    const row = result.rows[0]

    if (row.claimed) {

        return res.json({

            status: 'claimed',

            membershipType: row.membership_type

        })

    }

    if (row.status === 'approved') {
    "status":"approved"
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

}
