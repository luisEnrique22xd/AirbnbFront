import Image from 'next/image';
import PropertyList from '../components/properties/PropertyList';
const MyReservationsPage =()=>{
    return(
        <main className="max-w-[1500px] mx-auto px-6 pt-10 pb-6">
            <h1 className="mt-6 mb-2 text-2xl">My Properties</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                <PropertyList 
                />
            </div>
        </main>
    )
}
export default MyReservationsPage;