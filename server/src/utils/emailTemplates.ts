/**
 * Standardized branded email templates for Shrestha Services.
 * Designed for high deliverability, clean typography, and consistent
 * styling matching the brand identity (#d8402a).
 */

interface BaseTemplateOptions {
  title: string;
  subtitle?: string;
  bodyContent: string;
  footerNote?: string;
}

const wrapInEmailLayout = ({ title, subtitle, bodyContent, footerNote }: BaseTemplateOptions): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); overflow: hidden;">
    <!-- Brand Header -->
    <tr>
      <td style="padding: 24px 32px 16px; border-bottom: 1px solid #f1f5f9;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="font-size: 18px; font-weight: 800; letter-spacing: -0.5px; color: #0f172a;">
                Shrestha <span style="color: #d8402a;">Services</span>
              </span>
            </td>
            <td align="right" style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">
              Official Notice
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding: 32px;">
        <h2 style="margin: 0 0 12px; color: #d8402a; font-size: 24px; font-weight: 800; line-height: 1.3;">
          ${title}
        </h2>
        ${subtitle ? `<p style="margin: 0 0 24px; color: #475569; font-size: 15px; line-height: 1.6;">${subtitle}</p>` : ""}

        ${bodyContent}

        ${
          footerNote
            ? `<p style="margin: 28px 0 0; color: #64748b; font-size: 13px; line-height: 1.5;">${footerNote}</p>`
            : `<p style="margin: 28px 0 0; color: #64748b; font-size: 13px; line-height: 1.5;">If you didn't request this, please ignore this email.</p>`
        }
      </td>
    </tr>

    <!-- Brand Footer -->
    <tr>
      <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #f1f5f9; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
          <strong>Shrestha Services Pvt. Ltd.</strong> · Premium Flex, Signage & Printing Solutions<br>
          Biratnagar, Koshi Province, Nepal · info@shresthaservices.com.np
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

/**
 * OTP Verification Email Template
 */
export const renderOtpEmail = (otp: string, customMessage?: string) => {
  const title = "Welcome to Shrestha Services!";
  const subtitle = customMessage || "Thank you for registering. Please use the following OTP to verify your email:";

  const bodyContent = `
    <div style="background-color: #fffaf9; border: 1.5px dashed #fca5a5; border-radius: 8px; padding: 24px 16px; margin: 20px 0; text-align: center;">
      <div style="font-size: 34px; font-weight: 800; color: #d8402a; letter-spacing: 10px; font-family: 'Courier New', Courier, monospace;">
        ${otp}
      </div>
      <div style="margin-top: 10px; font-size: 13px; font-weight: 600; color: #64748b;">
        This OTP is valid for 10 minutes.
      </div>
    </div>
  `;

  const html = wrapInEmailLayout({
    title,
    subtitle,
    bodyContent,
    footerNote: "This OTP is valid for 10 minutes.<br>If you didn't request this, please ignore this email.",
  });

  const text = `Welcome to Shrestha Services!\n\n${subtitle}\n\nOTP: ${otp}\n\nThis OTP is valid for 10 minutes.\nIf you didn't request this, please ignore this email.\n\nShrestha Services Pvt. Ltd.`;

  return { html, text, subject: "Verify Your Email - Shrestha Services" };
};

/**
 * Password Reset Email Template
 */
export const renderPasswordResetEmail = (resetUrl: string) => {
  const title = "Reset Your Password";
  const subtitle = "We received a request to reset the password for your Shrestha Services account.";

  const bodyContent = `
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetUrl}" style="background-color: #d8402a; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 700; font-size: 15px; display: inline-block; box-shadow: 0 2px 4px rgba(216, 64, 42, 0.25);">
        Reset Password
      </a>
    </div>
    <div style="background-color: #f8fafc; border-radius: 6px; padding: 14px 16px; margin-top: 24px; border: 1px solid #e2e8f0;">
      <p style="margin: 0 0 6px; font-size: 12px; font-weight: 600; color: #64748b;">Or paste this link into your browser:</p>
      <a href="${resetUrl}" style="word-break: break-all; font-size: 12px; color: #d8402a; text-decoration: underline;">
        ${resetUrl}
      </a>
    </div>
  `;

  const html = wrapInEmailLayout({
    title,
    subtitle,
    bodyContent,
    footerNote: "This link is valid for 1 hour. If you didn't request a password reset, you can safely ignore this email.",
  });

  const text = `Reset Your Password - Shrestha Services\n\n${subtitle}\n\nReset Link: ${resetUrl}\n\nThis link is valid for 1 hour. If you didn't request a reset, you can safely ignore this email.`;

  return { html, text, subject: "Reset Your Password - Shrestha Services" };
};

/**
 * Quote Received Confirmation Email
 */
export const renderQuoteReceivedEmail = (quote: {
  id: string;
  customerName: string;
  material: string;
  width: number;
  height: number;
  quantity?: number;
  estimatedPrice: number;
}) => {
  const title = "Quote Request Received";
  const subtitle = `Hi ${quote.customerName}, we have received your printing quote request (Ref: #${quote.id.substring(0, 8).toUpperCase()}).`;

  const bodyContent = `
    <div style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; margin: 20px 0;">
      <table role="presentation" width="100%" cellpadding="6" cellspacing="0" style="font-size: 14px;">
        <tr>
          <td style="color: #64748b; font-weight: 600;">Job ID:</td>
          <td align="right" style="font-weight: 700; color: #0f172a; font-family: monospace;">${quote.id.substring(0, 8).toUpperCase()}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Material:</td>
          <td align="right" style="font-weight: 600; color: #0f172a;">${quote.material}</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Dimensions:</td>
          <td align="right" style="color: #0f172a;">${quote.width} × ${quote.height} ft</td>
        </tr>
        <tr>
          <td style="color: #64748b; font-weight: 600;">Quantity:</td>
          <td align="right" style="color: #0f172a;">${quote.quantity || 1} units</td>
        </tr>
        <tr style="border-top: 1px solid #cbd5e1;">
          <td style="color: #d8402a; font-weight: 800; font-size: 15px; padding-top: 12px;">Estimated Total:</td>
          <td align="right" style="color: #d8402a; font-weight: 800; font-size: 18px; padding-top: 12px;">NPR ${(quote.estimatedPrice || 0).toLocaleString()}</td>
        </tr>
      </table>
    </div>
    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0;">
      Our team is reviewing your design and specifications. We will notify you once your quote is approved and ready for printing.
    </p>
  `;

  const html = wrapInEmailLayout({
    title,
    subtitle,
    bodyContent,
    footerNote: "You can track your project status anytime from your customer dashboard.",
  });

  const text = `Quote Request Received - Shrestha Services\n\nHi ${quote.customerName},\nWe received your request #${quote.id.substring(0, 8).toUpperCase()}.\nMaterial: ${quote.material}\nDimensions: ${quote.width}x${quote.height} ft\nEstimated Price: NPR ${quote.estimatedPrice}\n\nOur team is reviewing your order!`;

  return { html, text, subject: `Quote Request #${quote.id.substring(0, 8).toUpperCase()} Received - Shrestha Services` };
};

/**
 * Quote Status Update Email (Approved / In Progress / Completed)
 */
export const renderQuoteStatusEmail = (data: {
  id: string;
  customerName: string;
  status: string;
  price: number;
}) => {
  const title = `Quote ${data.status}!`;
  const subtitle = `Hi ${data.customerName}, your quote #${data.id.substring(0, 8).toUpperCase()} has been updated to "${data.status}".`;

  const statusColor = data.status === "Approved" ? "#16a34a" : data.status === "Rejected" ? "#dc2626" : "#2563eb";

  const bodyContent = `
    <div style="background-color: #f8fafc; border-left: 4px solid ${statusColor}; border-radius: 6px; padding: 20px; margin: 20px 0;">
      <p style="margin: 0 0 10px; font-size: 14px; color: #475569;">
        <strong>Status:</strong> <span style="color: ${statusColor}; font-weight: 700; text-transform: uppercase;">${data.status}</span>
      </p>
      <p style="margin: 0; font-size: 16px; font-weight: 700; color: #0f172a;">
        Final Price: <span style="color: #d8402a;">NPR ${data.price.toLocaleString()}</span>
      </p>
    </div>
    <p style="font-size: 14px; color: #475569; line-height: 1.6;">
      Log in to your account to view the full specifications, print status, and invoice details.
    </p>
  `;

  const html = wrapInEmailLayout({
    title,
    subtitle,
    bodyContent,
    footerNote: "Thank you for choosing Shrestha Services.",
  });

  const text = `Quote ${data.status} - Shrestha Services\n\nHi ${data.customerName},\nYour quote #${data.id.substring(0, 8).toUpperCase()} status is now ${data.status}.\nFinal Price: NPR ${data.price}`;

  return { html, text, subject: `Update: Quote #${data.id.substring(0, 8).toUpperCase()} is ${data.status} - Shrestha Services` };
};

/**
 * Contact Inquiry Confirmation Email
 */
export const renderInquiryConfirmationEmail = (data: { name: string; subject?: string }) => {
  const title = "Thank You for Contacting Us!";
  const subtitle = `Hi ${data.name}, we have received your inquiry${data.subject ? ` regarding "${data.subject}"` : ""}.`;

  const bodyContent = `
    <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 16px;">
      Our customer support and sales representative will review your message and get back to you within 24 business hours.
    </p>
    <div style="background-color: #f8fafc; border-radius: 6px; padding: 16px; font-size: 13px; color: #64748b; line-height: 1.5;">
      <strong>Need immediate assistance?</strong><br>
      Call us directly at <strong>+977-21-525000</strong> or visit our office at Main Road, Biratnagar.
    </div>
  `;

  const html = wrapInEmailLayout({
    title,
    subtitle,
    bodyContent,
    footerNote: "This is an automated confirmation of your inquiry submission.",
  });

  const text = `Thank You for Contacting Shrestha Services!\n\nHi ${data.name},\nWe received your inquiry and our team will get back to you shortly.\n\nShrestha Services Pvt. Ltd.`;

  return { html, text, subject: "We received your inquiry - Shrestha Services" };
};
