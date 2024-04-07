import nodemailer from 'nodemailer';

import config from '../config/config.js';
export default class EmailService {
    static #instance = null;
    constructor() {
        this.transport = nodemailer.createTransport({
            service: config.email_tipe,
            port: config.email_port,
            auth: {
                user: config.email_user,
                pass: config.email_password,
            },
        });
    }

    sendEmail(to, subject, html, attachments = []) {
        return this.transport.sendMail({
            from: config.email_user,
            to,
            subject,
            html,
            attachments,
        });
    }

    static getInstance() {
        if (!EmailService.#instance) {
            EmailService.#instance = new EmailService();
        }
        return EmailService.#instance;
    }
}