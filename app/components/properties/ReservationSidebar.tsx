'use client';
import { useState, useEffect } from "react";
import { DateRange, Range } from "react-date-range";
import apiServices from "@/app/services/apiServices";
import useLoginModal from "@/app/hooks/useLoginModal";
import {differenceInDays, eachDayOfInterval, format} from "date-fns";
import DatePicker from "../forms/Calendar";

const initalDateRange = {startDate: new Date, endDate: new Date, key: 'selection'}
export type Property={
    id:string;
    price_per_night: number;
    guests:number,
}

interface ReservationSidebarProp{
    userId: string | null,
    property:Property
}
const ReservationSidebar:React.FC<ReservationSidebarProp> = ({property, userId}) => { 
    const loginModal=useLoginModal();

    const [fee,setFee] = useState<number>(0);
    const [nights,setNights] = useState<number>(1);
    const [totalPrice,setTotalPrice] = useState<number>(0);
    const [dateRange,setDateRange] = useState<Range>(initalDateRange);
    const [minDate,setMinDate] = useState<Date>(new Date());
    const [guests, setGuests] = useState<string>('1');
    const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1)

    const performBooking = async () => {
        console.log('performBooking', userId);

        if (userId) {
            if (dateRange.startDate && dateRange.endDate) {
                const formData = new FormData();
                formData.append('guests', guests);
                formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
                formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
                formData.append('number_of_nights', nights.toString());
                formData.append('total_price', totalPrice.toString());

                const response = await apiServices.post(`/api/properties/${property.id}/book/`, formData);
                
                if (response.success) {
                    console.log('Bookin successful')
                } else {
                    console.log('Something went wrong...');
                }
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
            }
        } else {
            loginModal.open();
        }
    }

    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);

        if (newEndDate <= newStartDate) {
            newEndDate.setDate(newStartDate.getDate() + 1);
        }

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate
        })
    }
    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInDays (
                dateRange.endDate,
                dateRange.startDate
            );
            if(dayCount && property.price_per_night){
                const _fee = ((dayCount * property.price_per_night)/100)*5;
                setFee(_fee)
                setTotalPrice((dayCount * property.price_per_night)+_fee)
                setNights(dayCount);
            }else{
                const _fee = (property.price_per_night/100)*5;
                setFee(_fee);
                setTotalPrice(property.price_per_night + _fee)
                setNights(1)
            }
        } 
    },[dateRange])
    return(
        <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
            <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>
            <DatePicker
            value={dateRange}
            onChange={(value) =>_setDateRange(value.selection)}
            />
            <div className="mb-6 p-3 border border-gray-400 rounded-xl">
                <label className="block font-bold text-xs">Guests</label>
                <select
                 value={guests}
                 onChange={(e) => setGuests(e.target.value)}
                 className="w-full ml-1 text-sm" id="">
                    {guestsRange.map(number=>(
                        <option key={number} value={number}>{number}</option>
                    ))}
                </select> 
            </div>
            <div 
            onClick={performBooking}
            className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl" >Book</div>
            <div className="mb-4 flex justify-between align-center">
                <p>${property.price_per_night} * {nights} nights</p>
                <p>${property.price_per_night * nights}</p>
            </div>

            <div className="mb-4 flex justify-between align-center">
                <p>Django fee</p>
                <p>${fee}</p>
            </div>
            <hr />

            <div className="mt-4 flex justify-between align-center font-bold">
                <p>Total: </p>
                <p>${totalPrice}</p>
            </div>
        </aside>
    )
} 
export default ReservationSidebar;