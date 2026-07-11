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
      linkedin_url,
telegram_username,
join_reason,
      wallet,
      membership_type
    } = req.body


// Email already exists

const existingEmail = await sql`
    SELECT id
    FROM membership_requests
    WHERE LOWER(email)=LOWER(${email})
    LIMIT 1
`

if (existingEmail.length) {

    return res.status(409).json({
        error: 'This email has already submitted a membership request.'
    })

}

// Wallet already exists

if (wallet?.trim()) {

    const existingWallet = await sql`
        SELECT id
        FROM membership_requests
        WHERE LOWER(wallet)=LOWER(${wallet})
        LIMIT 1
    `

    if (existingWallet.length) {

        return res.status(409).json({
            error: 'This wallet is already registered.'
        })

    }

}


    await sql`
      INSERT INTO membership_requests
      (
        full_name,
        email,
        company,       
        linkedin_url,    
telegram_username,
join_reason,
        wallet,      
        membership_type
      )
      VALUES
      (
        ${full_name},
        ${email},
        ${company},
        ${linkedin_url},
        ${telegram_username},
        ${join_reason},
        ${wallet},
        ${membership_type}
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

<p><strong>Company / Organization:</strong> ${company}</p>

<p><strong>Primary Role:</strong> ${membership_type}</p>

<p><strong>Professional Profile:</strong> ${linkedin_url || '-'}</p>

<p><strong>Telegram:</strong> ${telegram_username || '-'}</p>

<p><strong>Wallet:</strong> ${wallet || '-'}</p>

<p><strong>Reason for joining:</strong></p>

<p>${join_reason}</p>  `
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
Its optional to receive and apply the digital membership card.
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
