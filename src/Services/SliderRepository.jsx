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
    
    submitSliderData = async (access_token,data) =>{
        let url = this.apiBaseUrl().toString()
        url += `slider`
         const response =  fetch(url,{
            method: "POST", 
            headers:{
            "Content-type": "application/json; charset=UTF-8", 
            authorization: `Bearer ${access_token}` 
            },
            body: JSON.stringify(data)
        })
        return response.then(res =>res.json())
    }

    updateSliderData = (access_token,id, data) =>{
        let url = this.apiBaseUrl().toString()
        url += `slider`
        const response = fetch(url,{   
            method: "PATCH", 
            headers:{
            "Content-type": "application/json; charset=UTF-8", 
            authorization: `Bearer ${access_token}` 
            },
            body: JSON.stringify({
                data: data, 
                id
            } )
        })
        return response.then(res =>res.json())
    }

    deleteSlider = async (access_token,id) =>{
        let url = this.apiBaseUrl().toString()
        url += `slider`
        const response = fetch(url,{   
            method: "DELETE", 
            headers:{
            "Content-type": "application/json; charset=UTF-8", 
            authorization: `Bearer ${access_token}` 
            },
            body: JSON.stringify({id})
        })
        const res = await response
        return await res.json()
    }
}