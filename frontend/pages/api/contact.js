// pages/api/contact.js

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
      subject,
      message
    } = req.body

    if (!full_name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields.'
      })
    }

    // Email to EDGE Spaces
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

      replyTo: {
        email,
        name: full_name
      },

      subject: `Contact Form: ${subject}`,

      htmlContent: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || '-'}</p>
        <p><strong>Subject:</strong> ${subject}</p>

        <hr>

        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })

    // Confirmation email
    await apiInstance.sendTransacEmail({
      sender: {
        name: 'EDGE Spaces',
        email: 'hello@edgespaces.xyz'
      },

      to: [
        {
          email
        }
      ],

      subject: 'We received your message',

      htmlContent: `
        <h2>Thank you for contacting EDGE Spaces</h2>

        <p>Hello ${full_name},</p>

        <p>
          Thank you for reaching out to us.
          We've received your message and will get back to you as soon as possible.
        </p>

        <p>
          Best regards,<br>
          EDGE Spaces
        </p>
      `
    })

    return res.status(200).json({
      success: true
    })

  } catch (err) {
    console.error(err)

    return res.status(500).json({
      error: 'Unable to send message.'
    })
  }
}
