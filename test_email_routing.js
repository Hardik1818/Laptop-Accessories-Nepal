const { Resend } = require('resend');
const resend = new Resend('re_LTLimwgm_6zHVwf5gg1GQdMdVZCGvZ6nu');

async function testSend() {
    console.log('Initiating Manual Override Send to: accessoriesnepal@gmail.com');
    try {
        const { data, error } = await resend.emails.send({
            from: 'LAN System Test <onboarding@resend.dev>',
            to: 'accessoriesnepal@gmail.com',
            subject: 'SYSTEM OVERRIDE: Email Routing Test',
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #2563eb;">Manual Routing Confirmation</h2>
                    <p>This is a manually triggered test to verify that the Resend system is correctly addressing emails to <strong>accessoriesnepal@gmail.com</strong>.</p>
                    <p>If you are seeing this at another address, it indicates Resend is rerouting the transmission at the provider level.</p>
                    <hr/>
                    <p style="font-size: 12px; color: #666;">Timestamp: ${new Date().toISOString()}</p>
                </div>
            `
        });

        if (error) {
            console.error('Transmission Failed:', error);
        } else {
            console.log('Transmission Successful. ID:', data.id);
        }
    } catch (e) {
        console.error('System Exception:', e);
    }
}

testSend();
