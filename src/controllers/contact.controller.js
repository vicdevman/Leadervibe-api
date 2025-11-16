const Contact = require('../models/contact.model');
const emailService = require('../services/email.service');
const contactEmailTemplates = require('../utils/contactEmailTemplates');
const AppError = require('../utils/appError');
const logger = require('../utils/logger');

/**
 * Handle new contact / get-in-touch message
 */
exports.createContact = async(req, res, next) => {
    try {
        const { name, email, message } = req.body;

        // Basic safety check (validation middleware already runs before this)
        if (!name || !email || !message) {
            return next(new AppError('Name, email and message are required', 400));
        }

        // Persist contact message
        const contact = await Contact.create({ name, email, message });

        const adminEmail = process.env.ADMIN_EMAIL;

        // Send admin notification (await like booking flow)
        if (adminEmail) {
            const adminMail = contactEmailTemplates.adminContactNotification(contact);
            try {
                await emailService.sendMail({
                    to: adminEmail,
                    subject: adminMail.subject,
                    text: adminMail.text,
                    html: adminMail.html,
                });
                logger.info(`Admin contact email sent for contact: ${contact._id}`);
            } catch (err) {
                logger.error(`Error sending admin contact email: ${err.message}`);
                // Do not block response if email fails
            }
        } else {
            logger.warn('ADMIN_EMAIL is not set. Skipping admin contact email.');
        }

        // Send confirmation to client (await like booking flow)
        const clientMail = contactEmailTemplates.clientContactConfirmation(contact);
        try {
            await emailService.sendMail({
                to: contact.email,
                subject: clientMail.subject,
                text: clientMail.text,
                html: clientMail.html,
            });
            logger.info(`Client contact confirmation sent for contact: ${contact._id}`);
        } catch (err) {
            logger.error(`Error sending client contact confirmation: ${err.message}`);
            // Do not block response if email fails
        }

        res.status(201).json({
            status: 'success',
            message: 'Message received successfully',
            data: { contact },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Admin: get all contact messages
 */
exports.getAllContacts = async(req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            results: contacts.length,
            data: { contacts },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Admin: get single contact message
 */
exports.getContact = async(req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return next(new AppError('No contact message found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { contact },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Admin: delete contact message
 */
exports.deleteContact = async(req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return next(new AppError('No contact message found with that ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};