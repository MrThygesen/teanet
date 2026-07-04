import { sql } from '../../../lib/postgres'
import SibApiV3Sdk from 'sib-api-v3-sdk'

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.BREVO_API_KEY

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

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

    const result = await sql`

      UPDATE membership_requests

      SET status='approved'

      WHERE id=${id}

      RETURNING *

    `

    if (!result.length) {

      return res.status(404).json({
        error: 'Membership request not found'
      })

    }

    const member = result[0]

    await apiInstance.sendTransacEmail({

      sender: {
        name: 'EDGE Spaces',
        email: 'hello@edgespaces.xyz'
      },

      to: [
        {
          email: member.email,
          name: member.full_name
        }
      ],

      subject: 'Welcome to EDGE Spaces',

      htmlContent: `

<h2>Welcome to EDGE Spaces</h2>

<p>Hi ${member.full_name},</p>

<p>

Your membership application has been approved.

</p>

<p>

We're excited to welcome you to the EDGE Spaces community.

</p>

<p>

<b>Join our Telegram community:</b>

</p>

<p>

<a href="https://t.me/+OUveBWfawQlhNDE1">

https://t.me/+OUveBWfawQlhNDE1

</a>

</p>

<p>

Once you request access, your membership will be approved inside Telegram.

</p>

${
member.wallet
? `<p>Your Digital Membership Card can now be issued.</p>`
: ''
}

<p>

We look forward to having you as part of the community.

</p>

<p>

Best regards,

<br><br>

Morten Thygesen

<br>

EDGE Spaces

<br>

https://edgespaces.xyz

</p>

`

    })

    return res.status(200).json({

      success: true

    })

  }

  catch (err) {

    console.error(err)

    return res.status(500).json({

      error: 'Approval failed'

    })

  }

}
