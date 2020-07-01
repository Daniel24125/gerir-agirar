export default class EventosRepository {
    // private apiBaseUrl(): URL {
    //   const url = new URL(process.env.REACT_APP_API_BASE!)
    //   if (!url.pathname.endsWith('/')) url.pathname += '/'
    //   return url
    // }
   
    getEventosList = () => {
        return (new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    "-L0sm1dAeihLQRJtjN3h" : {
                        "asMain" : true,
                        "data" : "10/10/2015",
                        "detalhes" : "Inscreva-se já! Venha participar num momento descontraído e agradável de convívio.",
                        "horario" : "10:30",
                        "imagePublicId" : "v1513854303",
                        "imagemURL" : "https://res.cloudinary.com/agirar/image/upload/v1513854303/horizon-seas-towers_tvqk0i.jpg",
                        "localizacao" : "Centro Social e Paroquial de Vilar de Andorinho",
                        "price" : "0",
                        "tipo" : "Atividade",
                        "titulo" : "Comemoração do Dia Mundial da Saúde Mental - \"Dignidade na Saúde Mental\""
                      },
                      "-L0sm1dPXGXd_2jYL_bR" : {
                        "asMain" : false,
                        "data" : "22/10/2016",
                        "detalhes" : "Inscrições até 18 de Outubro através do telefone 912353788 ou do e-mail agirar.2013@gmail.com",
                        "horario" : "10:00",
                        "imagePublicId" : "v1513854303",
                        "imagemURL" : "https://res.cloudinary.com/agirar/image/upload/v1513854303/horizon-seas-towers_tvqk0i.jpg",
                        "localizacao" : "Marina Da Afurada, Vila Nova de Gaia",
                        "price" : "15",
                        "tipo" : "Evento",
                        "titulo" : "I Caminhada \"Um passo pela Saúde Mental\""
                      },
                      "-L0sm1dRPFYxDS4OXJlp" : {
                        "asMain" : false,
                        "data" : "08/07/2017",
                        "detalhes" : "A participação nesta iniciativa tem um custo de 20 € e a inscrição é obrigatória para que possamos fazer a respectiva reserva. Deve efectuar a sua inscrição para agirar.2013@gmail.com ou através de tlm 912 353 788 até 30 de Junho",
                        "horario" : "17:00",
                        "imagePublicId" : "v1513854303",
                        "imagemURL" : "https://res.cloudinary.com/agirar/image/upload/v1513854303/horizon-seas-towers_tvqk0i.jpg",
                        "localizacao" : "R. de São Filipe de Nery, 4050-546 Porto",
                        "price" : "20",
                        "tipo" : "Evento",
                        "titulo" : "Comemoração do 4º Aniversário da Agirar"
                      },
                      "-L0sm1dSFCafGqJyCZc1" : {
                        "asMain" : true,
                        "data" : "14/10/2017",
                        "detalhes" : "Integrado nas Comemorações do Dia Mundial de Saúde Mental vai decorrer este ano novamente a Caminhada \"Um Passo pela Saúde Mental\". Participe e traga um amigo! Inscreva-se!",
                        "horario" : "09:30",
                        "imagePublicId" : "y7ty5iugl3jeludjcub7",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1519035977/y7ty5iugl3jeludjcub7.jpg",
                        "localizacao" : "Praia de Lavadores - Pedras Amarelas",
                        "price" : "15",
                        "tipo" : "Evento",
                        "titulo" : "II Caminhada \"Um Passo pela Saúde Mental\""
                      },
                      "-L0sm1dTI81WBOBi9V_e" : {
                        "asMain" : true,
                        "data" : "29/10/2017",
                        "detalhes" : "Vai decorrer no Auditório Salvador Caetano um Concerto em que vários artistas irão através da música demonstrar a sua solidariedade!",
                        "horario" : "15:00",
                        "imagePublicId" : "nswegxh6ywcacxorjh8m",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1519036014/nswegxh6ywcacxorjh8m.jpg",
                        "localizacao" : "Auditório Salvador Caetano - Rua da Azenha, 995, 4430-432 Vilar De Andorinho",
                        "price" : "10",
                        "tipo" : "Evento",
                        "titulo" : "Concerto Solidário Agirar"
                      }
                })
            }, 2000);
        })))
    }
}