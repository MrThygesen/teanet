import { sql } from '../../../lib/postgres'

export default async function handler(req, res) {

  try {

    // =====================================================
    // Members
    // =====================================================

    const [{ count: members }] = await sql`
      SELECT COUNT(*)::int AS count
      FROM membership_requests
      WHERE status = 'approved'
    `

    // =====================================================
    // Community Composition
    // =====================================================

    const roles = await sql`
      SELECT
        membership_type,
        COUNT(*)::int AS count
      FROM membership_requests
      WHERE status = 'approved'
      GROUP BY membership_type
      ORDER BY count DESC
    `

    // =====================================================
    // Approval Rate
    // =====================================================

    const [{ rate }] = await sql`
      SELECT
        ROUND(
          100.0 *
          COUNT(*) FILTER (WHERE status='approved')
          /
          NULLIF(
            COUNT(*) FILTER (
              WHERE status IN ('approved','declined')
            ),
            0
          ),
          1
        ) AS rate
      FROM membership_requests
    `

    // =====================================================
    // Why Members Join
    // =====================================================

    const reasons = await sql`
      SELECT
        reason,
        COUNT(*)::int AS count
      FROM membership_requests
      WHERE
        status='approved'
        AND reason IS NOT NULL
        AND reason <> ''
      GROUP BY reason
      ORDER BY count DESC
      LIMIT 4
    `

    // =====================================================
    // Response
    // =====================================================

    return res.status(200).json({

      members,

      approvalRate: Number(rate) || 0,

      roles,

      reasons

    })

  } catch (err) {

    console.error(err)

    return res.status(500).json({
      error: 'Failed to load community statistics'
    })

  }

}
