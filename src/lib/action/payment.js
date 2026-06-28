
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ;
export const PaymentStatus = async (data) => {
    const res = await fetch(`${baseUrl}/api/payment-status`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res.json();
}