'use client'

import Select from 'react-select';
import useCountries from '@/app/hooks/useContries';

export type SelectCountryValue={
    label: string;
    value: string;
}
interface SelectCountryTypeProps{
    value?: SelectCountryValue;
    onChange:(value:SelectCountryValue)=>void;
}
const SelectCountry:React.FC<SelectCountryTypeProps>=({
    value,
    onChange
})=>{
    const {getAll}=useCountries();
    return(
    <>
    <Select
    isClearable
    placeholder="anywhere"
    options={getAll()}
    value={value}
    onChange={(value)=>onChange(value as SelectCountryValue)}
    />
    </>
)
}
export default SelectCountry