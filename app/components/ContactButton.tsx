'use client'
import useLoginModal from "../hooks/useLoginModal";
import { useRouter } from "next/navigation";
import apiServices from "../services/apiServices";

interface ContactButtonProps{
    userId:string|null;
    landlordId: string;
}

const ContactButton:React.FC<ContactButtonProps> = ({userId,landlordId}) => { 
    const loginModal=useLoginModal() ;
    const router = useRouter();
    const startConversation = async()=>{
        if(userId){
            const conversation= await apiServices.get(`/api/chat/start/${landlordId}/`)
            if(conversation.conversation_id){
                router.push(`/inbox/${conversation.conversation_id}`)
            }
        }
        else{
            loginModal.open();
        }
    }
    return(
        <div 
        onClick={startConversation}
        className="py-4 px-6 cursor-pointer bg-airbnb text-white rounded-xl hover:bg-airbnb-dark transition">
            Contact
        </div>
    )
}
export default ContactButton;