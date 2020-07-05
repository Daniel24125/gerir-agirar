import { useAuth0 } from "@auth0/auth0-react";

export default class SliderRepository {
    apiBaseUrl(){
        const url = new URL(process.env.REACT_APP_API_BASE)
        if (!url.pathname.endsWith('/')) url.pathname += '/'
        return url
      }
  
   
    getSliderList = async () => {
        let url = this.apiBaseUrl().toString()
        url += `slider/getSliderList`  
        const response =  fetch(url)
        const res = await response
        return await res.json()
    }
    
    submitSliderData = async (data, access_token) =>{
        let url = this.apiBaseUrl().toString()
        url += `slider`
        console.log(this.auth.getTokenSilently())
         const response =  fetch(url,{
            method: "POST", 
            headers:{
            "Content-type": "application/json; charset=UTF-8", 
            Authorization: `Bearer ${access_token}` 
            },
            body: JSON.stringify(data)
        })
        return response.then(res =>res.json())
    }

    updateSliderData = (id, data) =>{
        let url = this.apiBaseUrl().toString()
        url += `slider`
        const response = fetch(url,{   
            method: "PATCH", 
            headers:{
            "Content-type": "application/json; charset=UTF-8", 
            // Authorization: `Bearer ${access_token.value}` 
            },
            body: JSON.stringify({
                data: data, 
                id
            } )
        })
        return response.then(res =>res.json())
    }

    deleteSlider = async id =>{
        let url = this.apiBaseUrl().toString()
        url += `slider`
        const response = fetch(url,{   
            method: "DELETE", 
            headers:{
            "Content-type": "application/json; charset=UTF-8", 
            // Authorization: `Bearer ${access_token.value}` 
            },
            body: JSON.stringify({id})
        })
        const res = await response
        return await res.json()
    }
}