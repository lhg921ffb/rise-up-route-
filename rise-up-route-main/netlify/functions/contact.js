// netlify/functions/contact.js
const { z } = require('zod');

// Validation schema (same as client-side, but server-side)
const contactSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z
    .string()
    .trim()
    .min(6)
    .regex(/^[+()\\-\\s\\d]+$/),
  medical: z.string().trim().max(500).optional().or(z.literal('')),
  // honeypot field – must be empty for a genuine submission
  website: z.string().optional().default(''),
});

exports.handler = async (event, context) => {
  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Parse JSON body
  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (_) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  // Validate with Zod (server-side validation)
  const result = contactSchema.safeParse(payload);
  if (!result.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({ errors: result.error.format() }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  const { website, ...cleanData } = result.data;

  // Honeypot check: if filled, treat as spam (silent success)
  if (website && website.trim().length > 0) {
    // Optionally log for your own monitoring
    console.warn('Honeypot triggered – likely spam submission');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Thanks!' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  // At this point we have a valid, non‑spam submission.
  // You can add any further processing here, e.g.:
  // - Send an email via SendGrid/Mailgun (API keys stored in Netlify env vars)
  // - Store in a database or CRM
  // - Log to a monitoring service
  // For this example we just log and return a success message.
  console.log('Legitimate contact form submission:', cleanData);

  // Respond to the frontend
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Your application has been received!' }),
    headers: { 'Content-Type': 'application/json' },
  };
};