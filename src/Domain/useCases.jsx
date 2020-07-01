import { useQuery, queryCache} from 'react-query'
import { Container } from 'typedi'
import Users from "../Services/UsersRepository"
import Slider from "../Services/SliderRepository"
import Ateliers from "../Services/AteliersRepository"
import Eventos from "../Services/EventosRepository"
import Historia from '../Services/HistoriaRepository'

export const useGetUsers = ()=>{
    const users = Container.get(Users)
    return useQuery({
        queryKey: ['users_cards'],
        queryFn: async () => {
            const items = await users.getUsersList()
            return (items)
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
        queryFn: async () => {
            const response = await submit.submitAssociateData(data)
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
        queryFn: async () => {
            const items = await slider.getSliderList()
            return (items)
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