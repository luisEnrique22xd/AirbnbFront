import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { getUserId } from "@/app/lib/actions";
import React, {useState,useEffect} from "react";
import apiServices from "@/app/services/apiServices";
import { UserType } from "../page";
import { getAccessToken } from "@/app/lib/actions";


export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType
}

const ConversationPage = async({params}: {params: {id:string }}) => {
    const userId = await getUserId();
    const token = await getAccessToken();
        if(!userId|| !token){
            return(
                <main className="max-w-[1500px] max-auto px-6 py-12">
                    <p>you need to be auth</p>
                </main>
            )
        }
    const conversation = await apiServices.get(`/api/chat/${params.id}/`)

    return(
        <main className="max-w-[1500px] mx-auto px-6 pt-10 pb-6">
            <ConversationDetail
            token={token}
            userId={userId}
            conversation = {conversation.conversation}
            />
        </main>
    )
}
export default ConversationPage;