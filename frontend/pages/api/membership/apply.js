//apply.js
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

    const {
      full_name,
      email,
      company,
      project,
      wallet,
      reason,
      membership_type,
      newsletter
    } = req.body

    await sql`
      INSERT INTO membership_requests
      (
        full_name,
        email,       
        company,
        project,
        wallet,
        reason,
        membership_type,
        newsletter
      )
      VALUES
      (
        ${full_name},
        ${email},
        ${company},
        ${project},
        ${wallet},
        ${reason},
        ${membership_type},
        ${newsletter}
      )
    `

    await apiInstance.sendTransacEmail({

      sender: {
        name: 'TNET MEMBERSHIP',
        email: 'hello@teanet.xyz'
      },

      to: [
        {
          email: process.env.ADMIN_EMAIL
        }
      ],

      subject: `New TEANET Membership Request`,

      htmlContent: `
      <h2>New Membership Request</h2>

      <p><strong>Name:</strong> ${full_name}</p> 
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Project:</strong> ${project}</p>
      <p><strong>Wallet:</strong> ${wallet}</p>
      <p><strong>Membership:</strong> ${membership_type}</p>
      <p><strong>Newsletter:</strong> ${newsletter}</p>

      <p>
      <strong>Reason:</strong><br/>
      ${reason}
      </p>
      `
    })

 
await apiInstance.sendTransacEmail({
  sender: {
    name: 'TNET Membership',
    email: 'hello@teanet.xyz'
  },

  to: [
    {
      email: email
    }
  ],

  subject: 'TEANET Membership Request Received',

  htmlContent: `
    <h2>Thank you for your application</h2>

    <p>Hello ${full_name},</p>

    <p>
    Your TEANET membership request has been received successfully.
    </p>

    <p>
     A confirmation email has been sent to your email address, and we will get back to you as soon as possible with a membership delievered to your wallets NFT section.
    </p>

    <p>
    Regards,<br>
    TEANET Membership
    </p>
  `
})


   return res.status(200).json({
      success: true
    })


  } catch (err) {

    console.error(err)

    return res.status(500).json({
      error: 'Request failed'
    })
  }
}
