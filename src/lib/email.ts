import nodemailer from 'nodemailer';

// ========================================
// EMAIL CONFIGURATION (Gmail SMTP)
// ========================================

// Create reusable transporter
export const emailTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (NOT your regular password)
  },
});

// Verify transporter configuration
export async function verifyEmailConfig() {
  try {
    await emailTransporter.verify();
    console.log('✅ Email server is ready to send messages');
    return true;
  } catch (error) {
    console.error('❌ Email server verification failed:', error);
    return false;
  }
}

// ========================================
// EMAIL TEMPLATES
// ========================================

interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  paymentMethod: string;
  address: string;
  phone: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface RepairBookingData {
  bookingId: string;
  customerName: string;
  customerEmail?: string;
  deviceType: string;
  brand?: string;
  model?: string;
  issueDescription: string;
  phone: string;
}

// ========================================
// ORDER CONFIRMATION EMAIL (Customer)
// ========================================

export function getOrderConfirmationEmailHTML(data: OrderEmailData): string {
  const itemsHTML = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">NPR ${item.price.toLocaleString()}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">NPR ${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0; font-size: 28px;">Order Confirmed! 🎉</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px;">Thank you for your order</p>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">Dear <strong>${data.customerName}</strong>,</p>
    
    <p>Thank you for shopping with <strong>Laptop Accessories Nepal</strong>! We've received your order and it's being processed.</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h2 style="margin-top: 0; color: #667eea;">Order Details</h2>
      <p><strong>Order ID:</strong> ${data.orderId}</p>
      <p><strong>Payment Method:</strong> ${data.paymentMethod === 'QR' ? 'QR Payment' : 'Cash on Delivery'}</p>
      <p><strong>Delivery Address:</strong> ${data.address}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
    </div>
    
    <h3 style="color: #667eea;">Items Ordered:</h3>
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
      <thead>
        <tr style="background: #667eea; color: white;">
          <th style="padding: 12px; text-align: left;">Product</th>
          <th style="padding: 12px; text-align: center;">Qty</th>
          <th style="padding: 12px; text-align: right;">Price</th>
          <th style="padding: 12px; text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
        <tr style="background: #f0f0f0; font-weight: bold;">
          <td colspan="3" style="padding: 15px; text-align: right;">Total Amount:</td>
          <td style="padding: 15px; text-align: right; color: #667eea; font-size: 18px;">NPR ${data.total.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
    
    ${data.paymentMethod === 'QR'
      ? `
    <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; color: #856404;"><strong>⚠️ Payment Pending:</strong> Please upload your payment proof to complete your order. Our team will verify and confirm your order within 24 hours.</p>
    </div>
    `
      : `
    <div style="background: #d4edda; border: 1px solid #28a745; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; color: #155724;"><strong>✅ Cash on Delivery:</strong> Please keep the exact amount ready. Our delivery partner will contact you soon.</p>
    </div>
    `
    }
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
      <p style="margin: 5px 0;"><strong>Need help?</strong></p>
      <p style="margin: 5px 0;">📧 Email: info@laptopaccessoriesnepal.com</p>
      <p style="margin: 5px 0;">📞 Phone: +977-1-XXXXXXX</p>
    </div>
    
    <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
      © ${new Date().getFullYear()} Laptop Accessories Nepal. All rights reserved.
    </p>
  </div>
</body>
</html>
  `;
}

// ========================================
// NEW ORDER ALERT EMAIL (Admin)
// ========================================

export function getNewOrderAlertEmailHTML(data: OrderEmailData): string {
  const itemsHTML = data.items
    .map(
      (item) =>
        `<li>${item.name} - Qty: ${item.quantity} - NPR ${(item.price * item.quantity).toLocaleString()}</li>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Order Alert</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0;">🔔 New Order Received!</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
    <h2>Order ID: ${data.orderId}</h2>
    
    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <h3 style="margin-top: 0;">Customer Information:</h3>
      <p><strong>Name:</strong> ${data.customerName}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      ${data.customerEmail ? `<p><strong>Email:</strong> ${data.customerEmail}</p>` : ''}
      <p><strong>Address:</strong> ${data.address}</p>
    </div>
    
    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <h3 style="margin-top: 0;">Order Details:</h3>
      <p><strong>Payment Method:</strong> ${data.paymentMethod === 'QR' ? 'QR Payment (Pending Verification)' : 'Cash on Delivery'}</p>
      <p><strong>Total Amount:</strong> NPR ${data.total.toLocaleString()}</p>
      
      <h4>Items:</h4>
      <ul>${itemsHTML}</ul>
    </div>
    
    <div style="text-align: center; margin-top: 20px;">
      <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/orders" 
         style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
        View in Admin Panel
      </a>
    </div>
  </div>
</body>
</html>
  `;
}

// ========================================
// CONTACT FORM AUTO-REPLY (Customer)
// ========================================

export function getContactFormAutoReplyHTML(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You for Contacting Us</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0;">Thank You for Reaching Out! 💬</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Dear <strong>${data.name}</strong>,</p>
    
    <p>Thank you for contacting <strong>Laptop Accessories Nepal</strong>. We've received your message and our team will get back to you within 24 hours.</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">Your Message:</h3>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; font-style: italic;">${data.message}</p>
    </div>
    
    <p>If you have any urgent queries, feel free to call us at <strong>+977-1-XXXXXXX</strong>.</p>
    
    <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
      © ${new Date().getFullYear()} Laptop Accessories Nepal. All rights reserved.
    </p>
  </div>
</body>
</html>
  `;
}

// ========================================
// CONTACT FORM NOTIFICATION (Admin)
// ========================================

export function getContactFormNotificationHTML(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #17a2b8; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0;">📬 New Contact Form Submission</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <h3 style="margin-top: 0;">Contact Details:</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
    </div>
    
    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <h3 style="margin-top: 0;">Message:</h3>
      <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${data.message}</p>
    </div>
    
    <p style="text-align: center; margin-top: 20px;">
      <a href="mailto:${data.email}" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Reply to Customer
      </a>
    </p>
  </div>
</body>
</html>
  `;
}

// ========================================
// REPAIR BOOKING CONFIRMATION (Customer)
// ========================================

export function getRepairBookingConfirmationHTML(data: RepairBookingData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Repair Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0;">🔧 Repair Booking Confirmed!</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Dear <strong>${data.customerName}</strong>,</p>
    
    <p>Thank you for choosing <strong>Laptop Accessories Nepal</strong> for your repair needs. We've received your booking and our technicians will contact you shortly.</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">Booking Details:</h3>
      <p><strong>Booking ID:</strong> ${data.bookingId}</p>
      <p><strong>Device Type:</strong> ${data.deviceType}</p>
      ${data.brand ? `<p><strong>Brand:</strong> ${data.brand}</p>` : ''}
      ${data.model ? `<p><strong>Model:</strong> ${data.model}</p>` : ''}
      <p><strong>Issue Description:</strong></p>
      <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${data.issueDescription}</p>
      <p><strong>Contact Phone:</strong> ${data.phone}</p>
    </div>
    
    <div style="background: #d4edda; border: 1px solid #28a745; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; color: #155724;"><strong>✅ Next Steps:</strong> Our team will contact you within 24 hours to schedule a convenient time for diagnosis or repair.</p>
    </div>
    
    <p>For immediate assistance, call us at <strong>+977-1-XXXXXXX</strong>.</p>
    
    <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
      © ${new Date().getFullYear()} Laptop Accessories Nepal. All rights reserved.
    </p>
  </div>
</body>
</html>
  `;
}

// ========================================
// PAYMENT VERIFIED EMAIL (Customer)
// ========================================

export function getPaymentVerifiedEmailHTML(data: OrderEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Verified</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #28a745; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0;">✅ Payment Verified!</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Dear <strong>${data.customerName}</strong>,</p>
    
    <p>Great news! Your payment has been verified and your order is now being processed for shipment.</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
      <p><strong>Order ID:</strong> ${data.orderId}</p>
      <p><strong>Total Amount:</strong> NPR ${data.total.toLocaleString()}</p>
      <p><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">Payment Confirmed ✓</span></p>
    </div>
    
    <p>We'll notify you once your order has been shipped with tracking details.</p>
    
    <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
      © ${new Date().getFullYear()} Laptop Accessories Nepal. All rights reserved.
    </p>
  </div>
</body>
</html>
  `;
}

// ========================================
// ORDER SHIPPED EMAIL (Customer)
// ========================================

export function getOrderShippedEmailHTML(
  data: OrderEmailData & { trackingNumber?: string }
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Shipped</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0;">📦 Your Order is On the Way!</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Dear <strong>${data.customerName}</strong>,</p>
    
    <p>Exciting news! Your order has been shipped and is on its way to you.</p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <p><strong>Order ID:</strong> ${data.orderId}</p>
      ${data.trackingNumber ? `<p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>` : ''}
      <p><strong>Delivery Address:</strong> ${data.address}</p>
    </div>
    
    <div style="background: #d1ecf1; border: 1px solid #17a2b8; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; color: #0c5460;"><strong>📍 Estimated Delivery:</strong> Your order should arrive within 2-5 business days.</p>
    </div>
    
    <p>Our delivery partner will contact you at <strong>${data.phone}</strong> before delivery.</p>
    
    <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
      © ${new Date().getFullYear()} Laptop Accessories Nepal. All rights reserved.
    </p>
  </div>
</body>
</html>
  `;
}

// ========================================
// EMAIL SENDING FUNCTIONS
// ========================================

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  if (!data.customerEmail) {
    console.log('⚠️ No customer email provided, skipping order confirmation email');
    return { success: false, message: 'No email provided' };
  }

  try {
    await emailTransporter.sendMail({
      from: `"Laptop Accessories Nepal" <${process.env.GMAIL_USER}>`,
      to: data.customerEmail,
      subject: `Order Confirmation - ${data.orderId}`,
      html: getOrderConfirmationEmailHTML(data),
    });

    console.log(`✅ Order confirmation email sent to ${data.customerEmail}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
    return { success: false, error };
  }
}

export async function sendNewOrderAlertEmail(data: OrderEmailData) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;

  try {
    await emailTransporter.sendMail({
      from: `"Laptop Accessories Nepal" <${process.env.GMAIL_USER}>`,
      to: adminEmail,
      subject: `🔔 New Order Received - ${data.orderId}`,
      html: getNewOrderAlertEmailHTML(data),
    });

    console.log(`✅ New order alert sent to admin`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send new order alert:', error);
    return { success: false, error };
  }
}

export async function sendContactFormEmails(data: ContactFormData) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;

  try {
    // Send auto-reply to customer
    await emailTransporter.sendMail({
      from: `"Laptop Accessories Nepal" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: 'Thank You for Contacting Us',
      html: getContactFormAutoReplyHTML(data),
    });

    // Send notification to admin
    await emailTransporter.sendMail({
      from: `"Laptop Accessories Nepal" <${process.env.GMAIL_USER}>`,
      to: adminEmail,
      subject: `📬 New Contact Form: ${data.subject}`,
      html: getContactFormNotificationHTML(data),
    });

    console.log(`✅ Contact form emails sent`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send contact form emails:', error);
    return { success: false, error };
  }
}

export async function sendRepairBookingConfirmation(data: RepairBookingData) {
  if (!data.customerEmail) {
    console.log('⚠️ No customer email provided, skipping repair booking confirmation');
    return { success: false, message: 'No email provided' };
  }

  try {
    await emailTransporter.sendMail({
      from: `"Laptop Accessories Nepal" <${process.env.GMAIL_USER}>`,
      to: data.customerEmail,
      subject: `Repair Booking Confirmed - ${data.bookingId}`,
      html: getRepairBookingConfirmationHTML(data),
    });

    console.log(`✅ Repair booking confirmation sent to ${data.customerEmail}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send repair booking confirmation:', error);
    return { success: false, error };
  }
}

export async function sendPaymentVerifiedEmail(data: OrderEmailData) {
  if (!data.customerEmail) return { success: false, message: 'No email provided' };

  try {
    await emailTransporter.sendMail({
      from: `"Laptop Accessories Nepal" <${process.env.GMAIL_USER}>`,
      to: data.customerEmail,
      subject: `Payment Verified - Order ${data.orderId}`,
      html: getPaymentVerifiedEmailHTML(data),
    });

    console.log(`✅ Payment verified email sent to ${data.customerEmail}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send payment verified email:', error);
    return { success: false, error };
  }
}

export async function sendOrderShippedEmail(
  data: OrderEmailData & { trackingNumber?: string }
) {
  if (!data.customerEmail) return { success: false, message: 'No email provided' };

  try {
    await emailTransporter.sendMail({
      from: `"Laptop Accessories Nepal" <${process.env.GMAIL_USER}>`,
      to: data.customerEmail,
      subject: `Order Shipped - ${data.orderId}`,
      html: getOrderShippedEmailHTML(data),
    });

    console.log(`✅ Order shipped email sent to ${data.customerEmail}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send order shipped email:', error);
    return { success: false, error };
  }
}
