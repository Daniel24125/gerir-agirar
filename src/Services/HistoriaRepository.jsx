export default class HistoriaRepository {
    // private apiBaseUrl(): URL {
    //   const url = new URL(process.env.REACT_APP_API_BASE!)
    //   if (!url.pathname.endsWith('/')) url.pathname += '/'
    //   return url
    // }
   
    getHistoriaList = () => {
        return (new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    "-L17FhVWpYBx9lam3V1E" : {
                        "data" : "08/07/2013",
                        "detalhes" : "A AGIRAR surgiu a 8 de Julho de 2013 através do esforço de um grupo de familiares e amigos com o apoio de uma equipa multidisciplinar de profissionais do Serviço de Psiquiatria e Saúde Mental do Centro Hospitalar de Vila Nova de Gaia/Espinho que, em regime de voluntariado se uniu para criar uma resposta na área de saúde mental até ao momento inexistente no concelho de Vila Nova de Gaia",
                        "id" : 0,
                        "imagePublicId" : "v1513460965",
                        "imagemURL" : "https://res.cloudinary.com/agirar/image/upload/v1513460965/historia/hist1.jpg",
                        "titulo" : "Nasce um sonho"
                      },
                      "-L17FhVljHnM4aaNwHN_" : {
                        "data" : "10/10/2014",
                        "detalhes" : "Decorreram no Solar Condes de Resende – Canelas as comemorações deste dia organizadas pelo Serviço de Psiquiatria e Saúde Mental do Centro Hospitalar de Vila Nova de Gaia/Espinho. A AGIRAR esteve presente divulgando a Associação junto de utentes, familiares e profissionais.",
                        "id" : 1,
                        "imagePublicId" : "v1513460991",
                        "imagemURL" : "https://res.cloudinary.com/agirar/image/upload/v1513460991/historia/hist2.jpg",
                        "titulo" : "Vivendo com a Esquizofrenia"
                      },
                      "-L17FhVljHnM4aaNwHNa" : {
                        "data" : "17/10/2014",
                        "detalhes" : "A AGIRAR tem vindo a participar nestas iniciativas no sentido de angariar pequenas verbas para ajudar a desenvolver a sua atividade. Os associados têm aderido tanto na divulgação junto dos seus familiares e amigos como na oferta de produtos (roupa, livros, bibelots, brinquedos, …) para venda.",
                        "id" : 2,
                        "imagemURL" : "https://res.cloudinary.com/agirar/image/upload/v1513460954/historia/hist3.png",
                        "titulo" : "Participação no Flea Market"
                      },
                      "-L17FhVljHnM4aaNwHNb" : {
                        "data" : "08/06/2015",
                        "detalhes" : "Realizou-se no passado mês de Junho um passeio a Arouca para celebrarmos o aniversário da AGIRAR. O programa incluía além de atividades recreativas a visita às Pedras Parideiras e à Torre do IPMA.",
                        "id" : 3,
                        "imagePublicId" : "v1513460960",
                        "imagemURL" : "https://res.cloudinary.com/agirar/image/upload/v1513460960/historia/hist4.png",
                        "titulo" : "Aniversário da AGIRAR"
                      },
                      "-MAvDd9RMcxKAnkYs5c8" : {
                        "data" : "17/12/2016",
                        "detalhes" : "E foi assim o Jantar de Natal da AGIRAR! Muita alegria, conversas e boa companhia!",
                        "id" : 5,
                        "imagePublicId" : "ezvjdwzpgficxtrwbn4a",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1593352819/ezvjdwzpgficxtrwbn4a.jpg",
                        "titulo" : "Jantar de Natal da AGIRAR"
                      },
                      "-MAvDptnQ0ORgUCdlzUO" : {
                        "data" : "14/10/2017",
                        "detalhes" : "Decorreu hoje a Caminhada \" Um Passo pela Saúde Mental\"! Esteve uma bonita manhã de Outono com um sol radiante e uma temperatura amena.",
                        "id" : 6,
                        "imagePublicId" : "lqsgmpfsflnsz4fzliii",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1593352871/lqsgmpfsflnsz4fzliii.jpg",
                        "titulo" : "Um Passo pela Saúde Mental"
                      },
                      "-MAvE3A47-poTk-8MagY" : {
                        "data" : "06/02/2018",
                        "detalhes" : "Já estamos a preparar o Carnaval na AGIRAR!\nTrabalhos realizados no atelier de artes plásticas.",
                        "id" : 7,
                        "imagePublicId" : "q0tmiblcrvl9xnzuq5hi",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1593353071/q0tmiblcrvl9xnzuq5hi.jpg",
                        "titulo" : "Carnaval na AGIRAR"
                      },
                      "-MAvEm9cPInZVzvK8Nh1" : {
                        "data" : "28/10/2019",
                        "detalhes" : "Este ano demos mais “ Um Passo pela Saúde Mental”! IV Caminhada - se não conseguiu participar inscreva-se para o ano e venha caminhar connosco!",
                        "id" : 8,
                        "imagePublicId" : "ppgt28oaod4z1w48hhzc",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1593353118/ppgt28oaod4z1w48hhzc.jpg",
                        "titulo" : "Um Passo pela Saúde Mental"
                      },
                      "-MAvEuhWeGzk0IbLJipL" : {
                        "data" : "03/06/2020",
                        "detalhes" : "A AGIRAR foi convidada para amanhã às 11,15h estar presente na rubrica Consultório de Saúde Mental no Programa Praça da Alegria. O tema a abordar será A Psicose e irá estar presente o Psiquiatra Dr Jorge Bouça e a Enfermeira Fernanda Castro em representação da AGIRAR. Vamos dar Voz à Saúde Mental e ao papel importante que a AGiRAR tem vindo a desenvolver na comunidade onde está inserida.",
                        "id" : 9,
                        "imagePublicId" : "gqftkepmfda9ef8a9d9r",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1593353153/gqftkepmfda9ef8a9d9r.jpg",
                        "titulo" : "Praça da Alegria"
                      }
                })
            }, 2000);
        })))
    }
}