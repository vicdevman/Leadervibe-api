/**
 * Email templates for contact / get-in-touch
 */

/**
 * Generate admin notification email for a new contact message
 * @param {Object} contact - Contact details
 * @returns {{subject: string, text: string, html: string}}
 */
const adminContactNotification = (contact) => {
    const subject = `New Contact Message from ${contact.name}`;

    const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${subject}</title>
    <style>
      /* Inline CSS here is intentionally simple; many email clients strip external CSS. */
      body{margin:0;padding:0;background:#f6f7f9;font-family:Arial,Helvetica,sans-serif}
      .wrapper{max-width:680px;margin:28px auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e9e9eb}
      .header{background:#002348;padding:22px 28px;color:#ffffff}
      .brand{display:flex;align-items:center;gap:12px}
      .brand img{height:40px}
      .title{font-size:18px;font-weight:700;margin-top:6px}
      .content{padding:22px 28px;color:#1a1a1a}
      .lead{color:#626262;margin-bottom:18px}
      .section{margin-bottom:18px}
      .section h4{margin:0 0 8px 0;color:#002348;font-size:15px}
      .field{padding:10px 12px;border-radius:6px;background:#f7f8fa;border:1px solid #efeff1;font-size:14px;color:#222 }
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .full{grid-column:1/-1}
      .footer{background:#fafafa;padding:18px 28px;color:#626262;font-size:13px;border-top:1px solid #f0f0f0}
      .cta{display:inline-block;margin-top:12px;padding:10px 16px;background:#c28c27;color:#fff;border-radius:8px;text-decoration:none;font-weight:700}
      @media (max-width:520px){.grid{grid-template-columns:1fr}.brand{gap:8px}.header{padding:18px}.content{padding:18px}}
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header">
        <div class="brand">
          
          <div>
            <div style="font-size:14px;opacity:0.9">LeaderVibe</div>
            <div class="title">New Inbox Message</div>
          </div>
        </div>
      </div>

      <div class="content">
        <p class="lead">You have received a new contact message. Below are the submitted details.</p>

        <div class="section">
          <h4>Contact Information</h4>
          <div class="grid">
            <div>
              <div class="field"><strong>Name:</strong><br>${contact.name}</div>
            </div>
            <div>
              <div class="field"><strong>Email:</strong><br>${contact.email}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h4>Message Details</h4>
          <div class="grid">
            <div class="full">
              <div class="field"><strong>Message:</strong><br>${contact.message}</div>
            </div>
          </div>
        </div>

        <p style="margin-top:6px;color:#444;font-size:13px">Quick actions: <a href="mailto:${contact.email}" class="cta">Reply to Contact</a></p>
      </div>

      <div class="footer">
        <div>Reply directly to ${contact.email} to continue the conversation.</div>
        <div style="margin-top:8px">This email contains the raw submission. Please follow internal workflow to respond appropriately.</div>
      </div>
    </div>
  </body>
</html>`;

    const text = `New contact message\n\nFrom: ${contact.name} <${contact.email}>\n\nMessage:\n${contact.message}`;

    return { subject, text, html };
};

/**
 * Generate confirmation email for the person who reached out
 * @param {Object} contact - Contact details
 * @returns {{subject: string, text: string, html: string}}
 */
const clientContactConfirmation = (contact) => {
    const subject = `Thanks for reaching out, ${contact.name}`;

    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${subject}</title>
    <style>
      /* Inline CSS here is intentionally simple; many email clients strip external CSS. */
      body{margin:0;padding:0;background:#f6f7f9;font-family:Arial,Helvetica,sans-serif}
      .wrapper{max-width:680px;margin:28px auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e9e9eb}
      .header{background:#002348;padding:22px 28px;color:#ffffff}
      .brand{display:flex;align-items:center;gap:12px}
      .brand img{height:40px}
      .title{font-size:18px;font-weight:700;margin-top:6px}
      .content{padding:22px 28px;color:#1a1a1a}
      .lead{color:#626262;margin-bottom:18px}
      .section{margin-bottom:18px}
      .section h4{margin:0 0 8px 0;color:#002348;font-size:15px}
      .field{padding:10px 12px;border-radius:6px;background:#f7f8fa;border:1px solid #efeff1;font-size:14px;color:#222}
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .full{grid-column:1/-1}
      .footer{background:#fafafa;padding:18px 28px;color:#626262;font-size:13px;border-top:1px solid #f0f0f0}
      .cta{display:inline-block;margin-top:12px;padding:10px 16px;background:#c28c27;color:#fff;border-radius:8px;text-decoration:none;font-weight:700}
      @media (max-width:520px){.grid{grid-template-columns:1fr}.brand{gap:8px}.header{padding:18px}.content{padding:18px}}
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header">
        <div class="brand">
          
          <div>
            <div style="font-size:14px;opacity:0.9">LeaderVibe</div>
            <div class="title">Message Received</div>
          </div>
        </div>
      </div>

      <div class="content">
        <p class="lead">Hi ${contact.name}, thanks for taking a moment to get in touch. We've received your message and will get back to you as soon as possible. Below is a copy of what you sent for your records.</p>

        <div class="section">
          <h4>Your Message</h4>
          <div class="grid">
            <div class="full">
              <div class="field"><strong>Message:</strong><br>${contact.message}</div>
            </div>
          </div>
        </div>

        <p style="margin-top:6px;color:#444;font-size:13px">Quick actions: <a href="${process.env.WEBSITE_URL || '#'}" class="cta">Visit Website</a></p>
      </div>

      <div class="footer">
        <div>If this was sent by mistake, you can simply ignore this email.</div>
      </div>
    </div>
  </body>
</html>`;

    const text = `Hi ${contact.name},\n\nThanks for reaching out  your message has been received and Ill get back to you as soon as possible.\n\nHere is a copy of what you sent:\n\n${contact.message}\n`;

    return { subject, text, html };
};

module.exports = {
    adminContactNotification,
    clientContactConfirmation,
};