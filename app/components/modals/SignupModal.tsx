'use client';

import Modal from "./Modal";
import { useState } from "react";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import { useRouter } from "next/navigation";
import apiServices from "@/app/services/apiServices";
import { handleLogin } from "@/app/lib/actions";
const SignupModal = () => { 
    
    const router = useRouter();
    const signupModal = useSignupModal();
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const submitSignup = async () => {
        const formData = {
            email: email,
            password1: password1,
            password2: password2
        }
        const response = await apiServices.post('/api/auth/register/', JSON.stringify(formData));
        if(response.access){
            handleLogin(response.user.pk,response.access,response.refresh);

            signupModal.close();
            router.push('/');
        }else{
            const tmpErrors:string[] = Object.values(response).map((error:any) => {
                return error;
            });
            setErrors(tmpErrors);
        }
}
    const content = (
        <>
        <h2 className="mb-6 text-2xl"> Welcome to Djangobnb, please log in</h2>
        <form action={submitSignup} className="space-y-4">
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email adress" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
            <input onChange={(e) => setPassword1(e.target.value)} type="password" placeholder="Your password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
            <input onChange={(e) => setPassword2(e.target.value)} type="password" placeholder="Repeat password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
            {errors.map((error, index)=>{
                return(
                    <div 
                    key={`error_${index}}`}
                    className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                         {error}
                    </div>
                )
            })}
           
            <CustomButton
                label="Submit"
                onClick={submitSignup}
            />
        </form>
        </>
    )

    return(
        <Modal 
            label="Sign up"
            content={content}
            isOpen={signupModal.isOpen}
            close={signupModal.close}
        />
    )
}
export default SignupModal;