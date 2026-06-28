import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getUser } from '@/src/lib/userSession'

export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const formData = await request.formData();
        const deliveryfee = formData.get('price')
        const title = formData.get('title')
        const librarianId = formData.get('librarianId')
        const bookId = formData.get('bookId')

        const user = await getUser();
        const userId = user?.id; // Fallback to null if user ID is not available
        const userName = user?.name; // Fallback to null if user name is not available
        
        

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
            metadata : {
                userId,
                librarianId,
                title,
                deliveryfee,
                userName,
                bookId
            },
            mode: 'payment',
            success_url: `${origin}/browse-books/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/browse-books/cancel`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}