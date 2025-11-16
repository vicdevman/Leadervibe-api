/**
 * Email templates for booking notifications
 */

/**
 * Generate admin notification email for new booking
 * @param {Object} booking - Booking details
 * @returns {Object} - Email content with subject, text and HTML
 */
const adminBookingNotification = (booking) => {
    const subject = `New Booking Request: ${booking.eventName}`;

    // Format the booking details in a readable way
    const formatBookingDetails = () => {
        return `
      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; width: 40%; font-weight: bold;">Organization</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.organizationName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Contact Person</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.contactPerson}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Event Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.eventName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Event Dates</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.eventDates}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Event Location</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.eventLocation}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Audience Type</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.audienceType}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Audience Size</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.audienceSize}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Preferred Speaker</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.preferredSpeaker || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Topic Preference</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.topicPreference || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Session Length</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.sessionLength}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">AV Setup</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.avSetup || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Recorded/Streamed</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.recordedOrStreamed || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Honorarium Budget</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.honorariumBudget || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Travel Support</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.travelSupport || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Additional Notes</td>
            <td style="padding: 10px;">${booking.additionalNotes || 'None'}</td>
          </tr>
        </table>
      </div>
    `;
    };

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
            <div class="title">New Booking Request</div>
          </div>
        </div>
      </div>

      <div class="content">
        <p class="lead">Hello Admin, a new booking request has been submitted for ${booking.eventName} by ${booking.organizationName}. Please review the details below.</p>

        <div class="section">
          <h4>Contact Information</h4>
          <div class="grid">
            <div>
              <div class="field"><strong>Organization:</strong><br>${booking.organizationName}</div>
            </div>
            <div>
              <div class="field"><strong>Contact:</strong><br>${booking.contactPerson}</div>
            </div>
            <div>
              <div class="field"><strong>Email:</strong><br>${booking.email}</div>
            </div>
            <div>
              <div class="field"><strong>Phone:</strong><br>${booking.phone}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h4>Event Details</h4>
          <div class="grid">
            <div>
              <div class="field"><strong>Event:</strong><br>${booking.eventName}</div>
            </div>
            <div>
              <div class="field"><strong>Dates:</strong><br>${booking.eventDates}</div>
            </div>
            <div>
              <div class="field"><strong>Location:</strong><br>${booking.eventLocation}</div>
            </div>
            <div>
              <div class="field"><strong>Audience:</strong><br>${booking.audienceType} — ${booking.audienceSize}</div>
            </div>
            <div class="full">
              <div class="field"><strong>Preferred Speaker:</strong> ${booking.preferredSpeaker || 'Not specified'}</div>
            </div>
            <div class="full">
              <div class="field"><strong>Topic / Theme:</strong><br>${booking.topicPreference || 'Not specified'}</div>
            </div>
            <div class="full">
              <div class="field"><strong>Session Length / AV:</strong><br>${booking.sessionLength} • ${booking.avSetup || 'Not specified'}</div>
            </div>
            <div class="full">
              <div class="field"><strong>Recorded / Streamed:</strong><br>${booking.recordedOrStreamed || 'Not specified'}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h4>Budget & Logistics</h4>
          <div class="grid">
            <div>
              <div class="field"><strong>Honorarium / Budget:</strong><br>${booking.honorariumBudget || 'Not specified'}</div>
            </div>
            <div>
              <div class="field"><strong>Travel Support:</strong><br>${booking.travelSupport || 'Not specified'}</div>
            </div>
            <div class="full">
              <div class="field"><strong>Additional Notes:</strong><br>${booking.additionalNotes || 'None'}</div>
            </div>
          </div>
        </div>

        <p style="margin-top:6px;color:#444;font-size:13px">Quick actions: <a href="${process.env.ADMIN_DASHBOARD_URL || '#'}" class="cta">View in Dashboard</a></p>
      </div>

      <div class="footer">
        <div>Best regards, The System</div>
        <div style="margin-top:8px">This email contains the raw submission. Please follow internal workflow to confirm availability and contract terms.</div>
      </div>
    </div>
  </body>
</html>`;

    const text = `
    New Booking Request: ${booking.eventName}
    
    Hello Admin,
    
    A new booking request has been submitted for ${booking.eventName} by ${booking.organizationName}. Please review the details below:
    
    Organization: ${booking.organizationName}
    Contact Person: ${booking.contactPerson}
    Email: ${booking.email}
    Phone: ${booking.phone}
    Event Name: ${booking.eventName}
    Event Dates: ${booking.eventDates}
    Event Location: ${booking.eventLocation}
    Audience Type: ${booking.audienceType}
    Audience Size: ${booking.audienceSize}
    Preferred Speaker: ${booking.preferredSpeaker || 'Not specified'}
    Topic Preference: ${booking.topicPreference || 'Not specified'}
    Session Length: ${booking.sessionLength}
    AV Setup: ${booking.avSetup || 'Not specified'}
    Recorded/Streamed: ${booking.recordedOrStreamed || 'Not specified'}
    Honorarium Budget: ${booking.honorariumBudget || 'Not specified'}
    Travel Support: ${booking.travelSupport || 'Not specified'}
    Additional Notes: ${booking.additionalNotes || 'None'}
    
    Best regards,
    The System
  `;

    return {
        subject,
        text,
        html
    };
};

/**
 * Generate confirmation email for the client who submitted the booking
 * @param {Object} booking - Booking details
 * @returns {Object} - Email content with subject, text and HTML
 */
const clientBookingConfirmation = (booking) => {
    const subject = `We've Received Your Booking Request: ${booking.eventName}`;

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
            <div class="title">Booking Request Received</div>
          </div>
        </div>
      </div>

      <div class="content">
        <p class="lead">Hello ${booking.contactPerson}, thank you for submitting your booking request for ${booking.eventName}. We have received your request and our team will review it shortly. We will contact you within 2-3 business days to discuss your request in more detail. If you have any questions in the meantime, please don't hesitate to contact us.</p>

        <div class="section">
          <h4>Booking Summary</h4>
          <div class="grid">
            <div>
              <div class="field"><strong>Organization:</strong><br>${booking.organizationName}</div>
            </div>
            <div>
              <div class="field"><strong>Event:</strong><br>${booking.eventName}</div>
            </div>
            <div>
              <div class="field"><strong>Dates:</strong><br>${booking.eventDates}</div>
            </div>
            <div>
              <div class="field"><strong>Location:</strong><br>${booking.eventLocation}</div>
            </div>
          </div>
        </div>

        <p style="margin-top:6px;color:#444;font-size:13px">Quick actions: <a href="${process.env.WEBSITE_URL || '#'}" class="cta">Visit our website</a></p>
      </div>

      <div class="footer">
        <div>Thank you for considering our services.</div>
      </div>
    </div>
  </body>
</html>`;

    const text = `
    We've Received Your Booking Request: ${booking.eventName}
    
    Hello ${booking.contactPerson},
    
    Thank you for submitting your booking request for ${booking.eventName}. We have received your request and our team will review it shortly.
    
    Booking Summary:
    Organization: ${booking.organizationName}
    Event: ${booking.eventName}
    Date(s): ${booking.eventDates}
    Location: ${booking.eventLocation}
    
    We will contact you within 2-3 business days to discuss your request in more detail. If you have any questions in the meantime, please don't hesitate to contact us.
    
    Thank you for considering our services.
  `;

    return {
        subject,
        text,
        html
    };
};

module.exports = {
    adminBookingNotification,
    clientBookingConfirmation
};