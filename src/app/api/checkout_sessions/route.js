import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const formData = await request.formData();
        const deliveryfee = formData.get('price')
        const title = formData.get('title')

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            // line_items: [
            //     {
            //         // Provide the exact Price ID (for example, price_1234) of the product you want to sell
            //         price: 'price_1TmzA4KwMtzQDYd0Zp4BwtPb',
            //         quantity: 1,
            //     },
            // ],
            // mode: 'subscription',
            line_items: [
                {
                    price_data: {
                        currency: 'usd', 
                        product_data: {
                            name:  title , 
                            description: `Delivery charge for your requested book`,
                        },
                        
                        unit_amount: Math.round(parseFloat(deliveryfee) * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/browse-books/success?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}