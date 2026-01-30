export const getOrderEmailTemplate = (order: any, items: any[]) => {
    const itemsHtml = items.map(item => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">NPR ${item.price.toLocaleString()}</td>
        </tr>
    `).join('');

    return `
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #2563eb; text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Order Received!</h2>
        <p>You have a new order from <strong>${order.customer_name}</strong>.</p>
        
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #6b7280;">Customer Details</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${order.customer_name}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${order.phone}</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${order.address}</p>
            <p style="margin: 5px 0;"><strong>Payment Status:</strong> ${order.payment_method} (${order.status})</p>
        </div>

        <h3 style="font-size: 14px; text-transform: uppercase; color: #6b7280;">Order Items</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
                <tr style="background: #f3f4f6;">
                    <th style="padding: 12px; text-align: left;">Item</th>
                    <th style="padding: 12px; text-align: center;">Qty</th>
                    <th style="padding: 12px; text-align: right;">Price</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2" style="padding: 12px; font-weight: bold; text-align: right;">Total</td>
                    <td style="padding: 12px; font-weight: bold; text-align: right; font-size: 18px; color: #2563eb;">NPR ${order.total.toLocaleString()}</td>
                </tr>
            </tfoot>
        </table>

        <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin/orders" 
               style="background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                View Order in Dashboard
            </a>
        </div>
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 40px;">
            This is an automated notification from your store.
        </p>
    </div>
    `;
};

export const getContactEmailTemplate = (data: { firstName: string, lastName: string, email: string, phone: string, message: string }) => {
    return `
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #4f46e5; text-align: center; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">New Contact Message</h2>
        <p>You have received a new message from the contact form on your website.</p>
        
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #6b7280;">Sender Details</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${data.phone}</p>
        </div>

        <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #6b7280;">Message</h3>
            <p style="margin: 5px 0; white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${data.email}" 
               style="background: #4f46e5; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reply to Sender
            </a>
        </div>
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 40px;">
            This is an automated notification from your website's contact form.
        </p>
    </div>
    `;
};
