import { useQuery} from 'react-query'
import { Container } from 'typedi'
import Users from "../Services/UsersRepository"
import Slider from "../Services/SliderRepository"
import Ateliers from "../Services/AteliersRepository"
import Eventos from "../Services/EventosRepository"
import Historia from '../Services/HistoriaRepository'
import { useAuth0 } from "@auth0/auth0-react";

export const useGetUsers = ()=>{
    const users = Container.get(Users)
    return useQuery({
        queryKey: ['users_cards'],
        queryFn:  () => {
            const usersList =  users.getUsersList()
            return usersList.then(res=> res)
        },
        config: { 
          refetchOnWindowFocus: false,
          refetchInterval: false,
          refetchIntervalInBackground: false,
        }
      })
}

export const useGetUserById = id=>{
    const users = Container.get(Users)
    return useQuery({
        queryKey: ['user_id'],
        queryFn: async () => {
            const items = await users.getUsersList()
            return (items[id])
        },
        config: { 
          refetchOnWindowFocus: false,
          refetchInterval: false,
          refetchIntervalInBackground: false,
         
        }
      })
}

export const useSubmitAssociate = data => {
    const submit = Container.get(Users)
    return useQuery({
        queryKey: ['submit_associate'],
        queryFn: () => {
            const response = submit.submitAssociateData(data)
            return (response)
        },
        config: { 
          refetchOnWindowFocus: false,
          refetchInterval: false,
          refetchIntervalInBackground: false,
        }
      })
}

export const useUpdateAssociate = (id, data) => {
  const submit = Container.get(Users)
  return useQuery({
      queryKey: ['update_associate'],
      queryFn: () => {
          const response = submit.updateAssociateData(id, data)
          return (response)
      },
      config: { 
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
      }
    })
}

export const useDeleteAssociate = (id) => {
  const submit = Container.get(Users)
  return useQuery({
      queryKey: ['delete_associate'],
      queryFn: () => {
          const response = submit.deleteAssociate(id)
          return (response)
      },
      config: { 
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
      }
    })
}

export const useGetSliderList = ()=>{
    const slider = Container.get(Slider)
    return useQuery({
        queryKey: ['slider_cards'],
        queryFn:  () => {
            const items =  slider.getSliderList()
            return (items.then(res=>res))
        },
        config: { 
          refetchOnWindowFocus: false,
          refetchInterval: false,
          refetchIntervalInBackground: false,
         
        }
      })
}

export const useGetSliderById = id=>{
    const users = Container.get(Slider)
    return useQuery({
        queryKey: ['slider_id'],
        queryFn: async () => {
            const items = await users.getSliderList()
            return (items[id])
        },
        config: { 
          refetchOnWindowFocus: false,
          refetchInterval: false,
          refetchIntervalInBackground: false,
         
        }
      })
}

export const useSubmitSlider = data => {
  const submit = Container.get(Slider)
  return useQuery({
      queryKey: ['submit_slider'],
      queryFn: async () => {
          const response = await submit.submitSliderData(data)
          return (response)
      },
      config: { 
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
      }
    })
}


export const useUpdateSlider = (id, data) => {
  const submit = Container.get(Slider)
  return useQuery({
      queryKey: ['update_slider'],
      queryFn: () => {
          const response = submit.updateSliderData(id, data)
          return (response)
      },
      config: { 
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
      }
    })
}

export const useDeleteSlider = (id) => {
  const submit = Container.get(Slider)
  return useQuery({
      queryKey: ['delete_slider'],
      queryFn: () => {
          const response = submit.deleteSlider(id)
          return (response)
      },
      config: { 
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
      }
    })
}


export const useGetAteliersList = ()=>{
    const ateliers = Container.get(Ateliers)
    return useQuery({
        queryKey: ['at_cards'],
        queryFn: async () => {
            const items = await ateliers.getAteliersList()
            return (items)
        },
        config: { 
          refetchOnWindowFocus: false,
          refetchInterval: false,
          refetchIntervalInBackground: false,
        }
      })
}


export const useGetAteliersById = id=>{
  const submit = Container.get(Ateliers)
  return useQuery({
      queryKey: ['ateliers_id'],
      queryFn: async () => {
          const items = await submit.getAteliersList()
          return (items[id])
      },
      config: { 
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
       
      }
    })
}

export const useSubmitAteliers = data => {
const submit = Container.get(Ateliers)
return useQuery({
    queryKey: ['submit_atelier'],
    queryFn: async () => {
        const response = await submit.submitAteliersData(data)
        return (response)
    },
    config: { 
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  })
}


export const useUpdateAtelier = (id, data) => {
const submit = Container.get(Ateliers)
return useQuery({
    queryKey: ['update_atelier'],
    queryFn: () => {
        const response = submit.updateAtelierData(id, data)
        return (response)
    },
    config: { 
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  })
}

export const useDeleteAtelier = (id) => {
const submit = Container.get(Ateliers)
return useQuery({
    queryKey: ['delete_atelier'],
    queryFn: () => {
        const response = submit.deleteAtelier(id)
        return (response)
    },
    config: { 
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  })
}


export const useGetEventosList = ()=>{
    const eventos = Container.get(Eventos)
    return useQuery({
        queryKey: ['eventos_cards'],
        queryFn: async () => {
            const items = await eventos.getEventosList()
            return (items)
        },
        config: { 
          refetchOnWindowFocus: false,
          refetchInterval: false,
          refetchIntervalInBackground: false,
        }
      })
}

export const useGetEventosById = id=>{
  const submit = Container.get(Eventos)
  return useQuery({
      queryKey: ['eventos_id'],
      queryFn: async () => {
          const items = await submit.getEventosList()
          return (items[id])
      },
      config: { 
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
       
      }
    })
}

export const useSubmitEventos = data => {
const submit = Container.get(Eventos)
return useQuery({
    queryKey: ['submit_eventos'],
    queryFn: async () => {
        const response = await submit.submitEventosData(data)
        return (response)
    },
    config: { 
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  })
}


export const useUpdateEventos = (id, data) => {
const submit = Container.get(Eventos)
return useQuery({
    queryKey: ['update_eventos'],
    queryFn: () => {
        const response = submit.updateEventosData(id, data)
        return (response)
    },
    config: { 
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  })
}

export const useDeleteEventos = (id) => {
const submit = Container.get(Eventos)
return useQuery({
    queryKey: ['delete_eventos'],
    queryFn: () => {
        const response = submit.deleteEventos(id)
        return (response)
    },
    config: { 
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  })
}

export const useGetHistoriaList = ()=>{
    const historia = Container.get(Historia)
    return useQuery({
        queryKey: ['historia_cards'],
        queryFn: async () => {
            const items = await historia.getHistoriaList()
            return (items)
        },
        config: { 
          refetchOnWindowFocus: false,
          refetchInterval: false,
          refetchIntervalInBackground: false,
        }
      })
}


export const useGetHistoriaById = id=>{
  const submit = Container.get(Historia)
  return useQuery({
      queryKey: ['historia_id'],
      queryFn: async () => {
          const items = await submit.getHistoriaList()
          return (items[id])
      },
      config: { 
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
       
      }
    })
}

export const useSubmitHistoria = data => {
const submit = Container.get(Historia)
return useQuery({
    queryKey: ['submit_historia'],
    queryFn: async () => {
        const response = await submit.submitHistoriaData(data)
        return (response)
    },
    config: { 
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  })
}


export const useUpdateHistoria = (id, data) => {
const submit = Container.get(Historia)
return useQuery({
    queryKey: ['update_historia'],
    queryFn: () => {
        const response = submit.updateHistoriaData(id, data)
        return (response)
    },
    config: { 
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  })
}

export const useDeleteHistoria = (id) => {
const submit = Container.get(Historia)
return useQuery({
    queryKey: ['delete_historia'],
    queryFn: () => {
        const response = submit.deleteHistoria(id)
        return (response)
    },
    config: { 
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
    }
  })
}