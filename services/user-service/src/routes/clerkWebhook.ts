import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

// Clerk webhook for user.created
router.post('/clerk-webhook', async (req: Request, res: Response) => {
    try {
        console.log('Received webhook:', JSON.stringify(req.body, null, 2)); // Log incoming webhook
        const event = req.body;
        if (event.type === 'user.created') {
            const clerkUser = event.data;
            // Map Clerk fields to your User model
            const newUser = new User({
                USER_ID: clerkUser.id, // Clerk user ID
                ROLE_ID: '2', // or assign based on your logic
                NAME: (clerkUser.first_name || '') + ' ' + (clerkUser.last_name || ''),
                ADDRESS: '',
                PHONE: '',
                BIRTH_DATE: null,
                EMAIL: clerkUser.email_addresses?.[0]?.email_address || '',
                USERNAME: clerkUser.username || clerkUser.email_addresses?.[0]?.email_address || '',
                PASSWORD: '', // Not stored, handled by Clerk
                AVATAR: clerkUser.image_url || 'https://res.cloudinary.com/djf63iwha/image/upload/v1750324534/s3491d6v5qxa1_hq1msl.png',
                BIO: '',
                JOIN_DATE: new Date(),
                STATUS: true
            });
            await newUser.save();
            return res.status(201).json({ message: 'User created in DB' });
        }
        res.status(200).json({ message: 'Event ignored' });
    } catch (error) {
        console.error('Webhook error:', error); // Log error
        res.status(500).json({ message: 'Error processing webhook', error });
    }
});

export default router;
