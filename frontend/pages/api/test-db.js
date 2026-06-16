import { sql } from '../../lib/postgres'

export default async function handler(req, res) {
  try {
    const result = await sql`SELECT NOW()`

    res.status(200).json({
      success: true,
      serverTime: result[0]
    })
  } catch (err) {
    console.error(err)

    res.status(500).json({
      success: false,
      error: err.message
    })
  }
}
