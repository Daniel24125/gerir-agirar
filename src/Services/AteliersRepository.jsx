export default class AteliersRepository {
  apiBaseUrl(){
    const url = new URL(process.env.REACT_APP_API_BASE)
    if (!url.pathname.endsWith('/')) url.pathname += '/'
    return url
  }
   
    getAteliersList = () => {
      let url = this.apiBaseUrl().toString()
        url += `ateliers/getAteliersList`
        const response =  fetch(url)
        return response.then(res => res.json())
    }

    submitAteliersData = async (access_token,data) =>{
      console.log(data)
      let url = this.apiBaseUrl().toString()
      url += `ateliers`
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

  updateAtelierData = (access_token,id, data) =>{
      let url = this.apiBaseUrl().toString()
      url += `ateliers`
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

  deleteAtelier = async (access_token,id) =>{
      let url = this.apiBaseUrl().toString()
      url += `ateliers`
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