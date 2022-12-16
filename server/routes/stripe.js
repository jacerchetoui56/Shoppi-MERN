require('dotenv').config()
const stripe = require('stripe');
const express = require('express');
const router = express.Router()
const User = require('../models/User.model')

const endpointSecret = process.env.END_POINT_SECRET;

router.post('/', express.raw({ type: 'application/json' }), async (request, response) => {

    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        if (event?.type === 'checkout.session.completed') {
            const user_id = event?.data?.object?.metadata.shoppi_user_id
            if (user_id) {
                const user = await User.findByIdAndUpdate(user_id, {
                    $set: { 'cart': [] }
                }, { new: true })
            }
        }
        // console.log(event?.type)
    } catch (err) {
        console.log(err.message)
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Return a 200 response to acknowledge receipt of the event
    response.status(200).json({ success: true });
});


module.exports = router