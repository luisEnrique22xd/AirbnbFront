import Image from 'next/image';
import Conversation from '../components/inbox/Conversation';
const MyReservationsPage =()=>{
    return(
        <main className="max-w-[1500px] mx-auto px-6 pt-10 pb-6 space-y-4">
            <h1 className="mt-6 mb-2 text-2xl">Inbox</h1>
            <Conversation/>
            <Conversation/>
            <Conversation/>
        </main>
    )
}
export default MyReservationsPage;  