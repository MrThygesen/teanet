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
      linkedin_url,
      membership_type,
      newsletter
    } = req.body

    await sql`
      INSERT INTO membership_requests
      (
        full_name,
        email,       
        linkedin_url,    
        membership_type,
        newsletter
      )
      VALUES
      (
        ${full_name},
        ${email},
        ${linkedin_url},
        ${membership_type},
        ${newsletter}
      )
    `

    await apiInstance.sendTransacEmail({

      sender: {
        name: 'EDGE Spaces',
        email: 'hello@edgespaces.xyz'
      },

      to: [
        {
          email: process.env.ADMIN_EMAIL
        }
      ],

      subject: `New EDGE Spaces Membership Request`,

      htmlContent: `
      <h2>New Membership Request</h2>

      <p><strong>Name:</strong> ${full_name}</p> 
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>LinkedIn:</strong> ${linkedin_url}</p>
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
  name: 'EDGE Spaces',
  email: 'hello@edgespaces.xyz'
},
  to: [
    {
      email: email
    }
  ],

  subject: 'EDGE Spaces Membership Request Received',

  htmlContent: `
    <h2>Thank you for your application</h2>

    <p>Hello ${full_name},</p>

    <p>
    Your EDGE Spaces membership request has been received successfully.
    </p>

<p>
Membership requests are reviewed manually.
</p>

<p>
Approved members will receive updates and access to the EDGE Spaces community.
</p>

<p>
Wallet membership is optional and can be added later.
</p>

<p>
Join the Telegram community:<br>
https://t.me/edgespaces
</p>

    <p>
    Regards,<br>
    EDGE SPACES
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
