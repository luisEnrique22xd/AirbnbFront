'use client';
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import SelectCountry,{SelectCountryValue} from "../forms/SelectCountry";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";
import {Range } from "react-date-range";
import DatePicker from "../forms/Calendar";

const initalDateRange = {startDate: new Date, endDate: new Date, key: 'selection'}

const SearchModal=()=>{
    let content = (<></>);
    const searchModal = useSearchModal();
    const [dateRange,setDateRange]= useState<Range>(initalDateRange)
    const [country, setCountry]= useState<SelectCountryValue>();

    //set date range
    const _setDateRange = (selection:Range)=>{
        if(searchModal.step == 'checkIn'){
            searchModal.open('checkOut')
        }else if(searchModal.step === 'checkOut'){
            searchModal.open('details')
        }
        setDateRange(selection)
    }


    const contentLocation =(
        <>
        <h2 className="mb-6 text-2xl">
            Where do you want to go?
        </h2>
        <SelectCountry
        value={country}
        onChange={(value)=>setCountry(value as SelectCountryValue)}
        />
        <div className="mt-6 flex flex-row gap-4">
            <CustomButton
                label="Check in date ->"
                onClick={()=>searchModal.open('checkIn')}
                />
        </div>
        </>
    )
    const contentCheckIn =(
        <>
        <h2 className="mb-6 text-2xl">
            When do you want to check in?
        </h2>
        <DatePicker
             value = {dateRange}
             onChange={(value)=>_setDateRange(value.selection)}
        />
        <div className="mt-6 flex flex-row gap-4">
        <CustomButton
                label="<- Location"
                onClick={()=>searchModal.open('location')}
                />
        <CustomButton
                label="Check out date ->"
                onClick={()=>searchModal.open('checkOut')}
                />
        </div>
        </>
    )
    const contentCheckOut =(
        <>
        <h2 className="mb-6 text-2xl">
            When do you want to check out?
        </h2>
        <DatePicker
             value = {dateRange}
             onChange={(value)=>_setDateRange(value.selection)}
        />
        <div className="mt-6 flex flex-row gap-4">
        <CustomButton
                label="<- Check in date"
                onClick={()=>searchModal.open('checkIn')}
                />
        <CustomButton
                label="Details ->"
                onClick={()=>searchModal.open('details')}
                />
        </div>
        </>
    )
    if(searchModal.step === 'location'){
        content = contentLocation
    }else if(searchModal.step ==='checkIn'){
        content = contentCheckIn
    }else if(searchModal.step ==='checkOut'){
        content = contentCheckOut
    }
    return(
        <Modal
            isOpen={searchModal.isOpen}
            close = {searchModal.close}
            label="Search"
            content={content}
        />
    )
}

export default SearchModal;