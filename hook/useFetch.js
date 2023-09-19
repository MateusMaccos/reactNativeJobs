import { useState,useEffect } from "react";
import axios from 'axios'

const useFetch = (endpoint,query)=>{
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': 
            '38a1ea2e16mshceff3f5b02d5a91p18cc2fjsnb6c9b7390996',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {
            ...query
        }   
    };

    const fetchData = async()=>{
        setIsLoading(true)

        try{
            const response = await axios.request(options)
            console.log(response.data)
            setData(response.data.data)
            setIsLoading(false)
        }catch(error){
            setError(error)
            console.log(error)
            alert("Ocorreu um error!")
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
      fetchData()
    }, [])
    
    const refetch = () =>{
        setIsLoading(true)
        fetchData()
    }

    return {data,isLoading,error,refetch}

}

export default useFetch