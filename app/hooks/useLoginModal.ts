import { create } from "zustand";

interface LoginModalStote {
    isOpen : boolean;
    open: ()=>void;
    close: ()=>void;
}

const useLoginModal = create<LoginModalStote>((set)=>({
    isOpen: false,
    open: ()=>set({isOpen: true}),
    close: ()=>set({isOpen: false})
}));

export default useLoginModal;