import { getAccessToken } from "../lib/actions";
const apiServices = {
    get: async function (url:string): Promise<any> {
        console.log('GET', url);
        const token = await getAccessToken();
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method:'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json)=>{
                console.log("Response",json);
                resolve(json);
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            })
            
        })
        
    },
    post: async function (url:string, data: any): Promise<any> {
        const token = await getAccessToken();
        console.log('POST', url, data);
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method:'POST',
                body:data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then((json)=>{
                console.log("Response",json);
                resolve(json);
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            })
        })
        
    },
    postWithoutToken: async function (url:string, data: any): Promise<any> {
        const token = await getAccessToken();
        console.log('POST', url, data);
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method:'POST',
                body:data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    
                }
            })
            .then(response => response.json())
            .then((json)=>{
                console.log("Response",json);
                resolve(json);
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            })
        })
        
    }
}

export default apiServices;