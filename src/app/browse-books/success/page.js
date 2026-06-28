import { stripe } from '@/src/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button, Card } from '@heroui/react'
import { FaCheckCircle, FaEnvelope, FaBookOpen } from 'react-icons/fa'
import { PaymentStatus } from '@/src/lib/action/payment'

export default async function Success({ searchParams }) {
    const params = await searchParams
    const session_id = params?.session_id

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    
    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    const transactionId = session?.payment_intent?.id || 'N/A'
    const status = session?.status
    const customerEmail = session?.customer_details?.email
    const amountTotal = session?.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'
    const metadata = session?.metadata || {}
    const requestDate = new Date().toLocaleString()

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {
        try {
            await PaymentStatus({
                ...metadata,
                transactionId,
                session_id,
                status: "pending delivery",
                requestDate
            })
        } catch (dbError) {
            console.error("Failed to update payment status in DB:", dbError)
            
        }

        return (
            <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white flex items-center justify-center p-4 sm:p-6">

                {/* Main Success Container Card */}
                <Card
                    className="max-w-md w-full p-6 sm:p-8 border border-gray-100 bg-white shadow-xl rounded-3xl flex flex-col items-center text-center space-y-6"
                    shadow="none"
                >
                    {/* Animated Check Icon Green Badge */}
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-20 h-20 bg-green-100 rounded-full animate-ping opacity-25" />
                        <div className="relative p-4 bg-green-500 text-white rounded-full shadow-md shadow-green-200">
                            <FaCheckCircle size={40} />
                        </div>
                    </div>

                    {/* Success Headers */}
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                            Payment Successful!
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">
                            Thank you for your order. Your delivery request is now <span className="text-amber-600 font-semibold uppercase">Pending Delivery</span>.
                        </p>
                    </div>

                    {/* Order Meta Brief Receipt */}
                    <div className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl p-4 text-left space-y-2.5 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-medium">Amount Paid</span>
                            <span className="text-gray-900 font-bold text-base">${amountTotal}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-2.5">
                            <span className="text-gray-400 font-medium">Delivery Email</span>
                            <span className="text-gray-900 font-semibold line-clamp-1 max-w-[180px]">{customerEmail}</span>
                        </div>
                
                        <div className="flex justify-between items-center border-t border-gray-100 pt-2.5 text-xs text-gray-400">
                            <span>Transaction ID</span>
                            <span className="font-mono">{transactionId.slice(0, 12)}...</span>
                        </div>
                    </div>

                    {/* Informative Email Paragraph Text */}
                    <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                        A confirmation receipt and doorstep tracking details have been dispatched to{' '}
                        <span className="text-primary font-bold">{customerEmail}</span>.
                    </p>

                    <hr className="w-full border-gray-100" />

                    <div className="flex items-center gap-2 text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                        <FaEnvelope className="text-gray-400" /> Have questions?{' '}
                        <a href="mailto:support@bibliodrop.com" className="text-primary font-bold hover:underline">
                            support@bibliodrop.com
                        </a>
                    </div>

                    {/* Dynamic Link Nav Action Buttons Panel */}
                    <div className="w-full pt-2 flex flex-col gap-3">
                        <Link href="/browse-books">
                            <Button
                                color="primary"
                                size="lg"
                                className="w-full font-bold rounded-xl shadow-md bg-primary hover:bg-primary-600 text-white transition-all transform active:scale-[0.98]"
                                startContent={<FaBookOpen size={16} />}
                            >
                                Continue Browsing
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        )
    }
}