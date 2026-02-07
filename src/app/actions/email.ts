"use server";

import nodemailer from 'nodemailer';
import { getOrderEmailTemplate, getContactEmailTemplate } from '@/lib/email-templates';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function sendOrderNotificationEmail(order: any, items: any[]) {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.warn("Skipping email: GMAIL_USER or GMAIL_APP_PASSWORD not found.");
        return { success: false, error: "SMTP Credentials missing" };
    }

    try {
        const adminEmail = process.env.ADMIN_EMAIL || "laptopaccessnepal@gmail.com";
        const body = getOrderEmailTemplate(order, items);

        const info = await transporter.sendMail({
            from: `"LAN Store" <${process.env.GMAIL_USER}>`, // sender address
            to: adminEmail, // list of receivers
            subject: `🚨 New Order Received - ${order.customer_name}`, // Subject line
            html: body, // html body
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true, id: info.messageId };

    } catch (error: any) {
        console.error("Email send exception:", error);
        return { success: false, error: error.message };
    }
}

export async function sendContactEmail(contactData: { firstName: string, lastName: string, email: string, phone: string, message: string }) {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.warn("Skipping contact email: GMAIL_USER or GMAIL_APP_PASSWORD not found.");
        return { success: false, error: "SMTP Credentials missing" };
    }

    try {
        const adminEmail = process.env.ADMIN_EMAIL || "laptopaccessnepal@gmail.com";
        const body = getContactEmailTemplate(contactData);

        const info = await transporter.sendMail({
            from: `"LAN Store Contact" <${process.env.GMAIL_USER}>`,
            to: adminEmail,
            replyTo: contactData.email,
            subject: `📩 New Contact Message - ${contactData.firstName} ${contactData.lastName}`,
            html: body,
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true, id: info.messageId };

    } catch (error: any) {
        console.error("Contact email send exception:", error);
        return { success: false, error: error.message };
    }
}
