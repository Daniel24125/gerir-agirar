export default class HistoriaRepository {
  apiBaseUrl(){
    const url = new URL(process.env.REACT_APP_API_BASE)
    if (!url.pathname.endsWith('/')) url.pathname += '/'
    return url
  }
   
    getHistoriaList = () => {
      let url = this.apiBaseUrl().toString()
      url += `hist/getHistList`
      const response =  fetch(url)
      return response.then(res => res.json())
    }

    submitHistoriaData = async data =>{
      let url = this.apiBaseUrl().toString()
      url += `hist`
       const response =  fetch(url,{
          method: "POST", 
          headers:{
          "Content-type": "application/json; charset=UTF-8", 
          // Authorization: `Bearer ${access_token.value}` 
          },
          body: JSON.stringify(data)
      })
      return response.then(res =>res.json())
  }

  updateHistoriaData = (id, data) =>{
      let url = this.apiBaseUrl().toString()
      url += `hist`
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

  deleteHistoria = async id =>{
      let url = this.apiBaseUrl().toString()
      url += `hist`
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