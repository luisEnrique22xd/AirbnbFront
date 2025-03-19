'use client';
import apiServices from "@/app/services/apiServices";
import { useEffect,useState } from "react";
import PropertyListItem from "./PropertyListItem";

export type PropertyType = {
    id: string;
    title: string;
    price_per_night: number;
    image_url: string;
}

const PropertyList = () => {
    const [properties, setProperties] = useState<PropertyType[]>([]);
    const getProperties = async () => {
        const tmpProperties = await apiServices.get('/api/properties/');

        setProperties(tmpProperties.data
        );

    };

    useEffect(() => {
        getProperties();
    },[]);

    return(
         <>
         {properties.map((property)=>{
            return (
                <PropertyListItem 
                key={property.id} 
                property={property}
                />
            )
         })}
         </>
    )
}
export default PropertyList; 