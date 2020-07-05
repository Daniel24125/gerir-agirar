export default class UsersRepository {
    apiBaseUrl(){
      const url = new URL(process.env.REACT_APP_API_BASE)
      if (!url.pathname.endsWith('/')) url.pathname += '/'
      return url
    }

    getUsersList = (access_token) => {
        // console.log(access_token)
        let url = this.apiBaseUrl().toString()
        url += `users/getUsersList`
         const response =  fetch(url, {
             method: "GET", 
             headers: { authorization: `Bearer ${access_token}` }

         })
        return response.then(res =>res.json())
    }

    submitAssociateData = data =>{
        let url = this.apiBaseUrl().toString()
        url += `user`
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

    updateAssociateData = (id, data) =>{
        let url = this.apiBaseUrl().toString()
        url += `user`
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

    deleteAssociate = id =>{
        let url = this.apiBaseUrl().toString()
        url += `user`
        const response = fetch(url,{   
            method: "DELETE", 
            headers:{
            "Content-type": "application/json; charset=UTF-8", 
            // Authorization: `Bearer ${access_token.value}` 
            },
            body: JSON.stringify({id})
        })
        return response.then(res =>res.json())
    }
}