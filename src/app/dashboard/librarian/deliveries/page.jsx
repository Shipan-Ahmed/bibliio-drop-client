
import DeliveryTable from '@/src/Components/LibraranDashboard/DeliveryTable';
import { getPaymentlibrarian } from '@/src/lib/action/api';
const DeliveryPages = async () => {

    const allDeliveries = await getPaymentlibrarian() || [];


    return (
        <div className="container mx-auto">
            <h1 className='text-3xl font-bold  my-4'>Manage Deliveries</h1>
            <p className=' text-gray-600'>Here you can view all your deliveries.</p>
            <div className='overflow-x-auto mt-6'>
                {
                    allDeliveries.length === 0 ? (
                        <p className="text-gray-500 p-4 bg-white">No deliveries available.</p>
                    ) : (
                           <DeliveryTable allDeliveries={allDeliveries} /> 
                    )
                }
                
            </div>
        </div>
    );
};

export default DeliveryPages;