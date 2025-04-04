import { create } from "zustand";

export type SearchQuery={
    country:string;
    checkIn:Date|null;
    checkOut:Date|null;
    guests:Number;
    bathrooms:Number;
    bedrooms:Number;
    category:string;

}

interface SearchModalStore {
    isOpen : boolean;
    step:string
    open: (step:string)=>void;
    close: ()=>void;
    query:SearchQuery;
    setQuery:(query:SearchQuery)=>void;
}

const useSearchModal = create<SearchModalStore>((set)=>({
    isOpen: false,
    step:'',
    open: (step)=>set({isOpen: true,step:step}),
    close: ()=>set({isOpen: false}),
    setQuery:(query:SearchQuery)=>set({query}),
    query:{
        country:'',
        checkIn:null,
        checkOut:null,
        guests:1,
        bedrooms:0,
        bathrooms:0,
        category:''
    }
}));

export default useSearchModal;