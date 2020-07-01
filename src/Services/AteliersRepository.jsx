export default class AteliersRepository {
    // private apiBaseUrl(): URL {
    //   const url = new URL(process.env.REACT_APP_API_BASE!)
    //   if (!url.pathname.endsWith('/')) url.pathname += '/'
    //   return url
    // }
   
    getAteliersList = () => {
        return (new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    "-L0V6oRPHsiDvTNTJVfT" : {
                        "desc" : "Promover através da pintura, colagens e cerâmica um espaço onde possam utilizar as atividades como uma forma de expressão não-verbal. Criar oportunidade para conhecer novas formas de lazer, promovendo a partilha de conhecimentos entre si, através da realização de trabalhos manuais, artes decorativas, bijuterias",
                        "dias" : "SEG",
                        "horas" : "14:30 - 16:30",
                        "id" : 0,
                        "imagePublicId" : "fuf24ch1h9oj5zthqatr",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1519034961/fuf24ch1h9oj5zthqatr.jpg",
                        "name" : "Atelier de Artes Plástica e de Lavores"
                      },
                      "-L0V6oRdaIXbzuRpk-UP" : {
                        "desc" : "Espaço lúdico, mas também de aprendizagem, que permite explorar e desenvolver competências na área da informática",
                        "dias" : "QUA",
                        "horas" : "11:00 - 13h00",
                        "id" : 1,
                        "imagePublicId" : "v1513460991",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1513460991/ateliers/at1.jpg",
                        "name" : "Atelier de Informática"
                      },
                      "-L0V6oRgVsXmgtiDxpUI" : {
                        "desc" : "Espaço lúdico, de encontro, onde se promove uma melhor forma de gerir os tempos livres e de lazer organizando visitas na comunidade para melhor conhecer as estruturas culturais e recreativas existentes na área metropolitana do Porto, nomeadamente museus, jardins, teatros, etc.",
                        "dias" : "SEG & TER & QUA & QUI & SEX & SAB & DOM",
                        "horas" : "  - A definir",
                        "id" : 2,
                        "imagePublicId" : "dvq9csutvubruocok2s0",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1519035015/dvq9csutvubruocok2s0.jpg",
                        "name" : "Clube Social"
                      },
                      "-L0V6oRhMce35usnI8PV" : {
                        "desc" : "Espaço criado para valorizar a comunicação não verbal, permitindo observar o modo como cada pessoa se relaciona com o seu corpo, com o seu espaço e com os restantes elementos do grupo. Processo criativo onde se trabalha com o corpo e com a sua linguagem própria",
                        "dias" : "QUI",
                        "horas" : "14h30 - 15h45",
                        "id" : 3,
                        "imagePublicId" : "enngeyfuevfcszc1wm0f",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1519035112/enngeyfuevfcszc1wm0f.jpg",
                        "name" : "Atelier de Movimento e Expressão Corporal"
                      },
                      "-L0V6oRisgZ2kN_RoBlj" : {
                        "desc" : "Através de algumas técnicas específicas trabalhar a diminuição das tensões corporais e a auto-consciencialização das várias partes do corpo, permitindo lidar com algumas tensões, angústias e receios, assim como, aprender a controlar o corpo e as emoções em determinadas situações concretas",
                        "dias" : "QUI",
                        "horas" : "16h00 - 17h00",
                        "id" : 4,
                        "imagePublicId" : "he9kdivbrlwphyzoi942",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1519035133/he9kdivbrlwphyzoi942.jpg",
                        "name" : "Atelier de Relaxamento"
                      },
                      "-L0V6oRjOg-4sZzy-Ipq" : {
                        "desc" : "É dirigido aos familiares/associados e pretende-se através da realização de trabalhos manuais artesanais promover o convívio entre os mesmos diminuindo o isolamento social de muitas famílias quando têm de lidar com um familiar doente",
                        "dias" : "QUA",
                        "horas" : "14:30 - 16.30",
                        "id" : 5,
                        "imagePublicId" : "v1513460989",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1513460989/ateliers/at5.jpg",
                        "name" : "Atelier de Artesanato"
                      },
                      "-L5hYw4jGzdbkUuRnkFW" : {
                        "desc" : "As sessões de Estimulação Cognitiva pretendem preservar ou melhorar o desempenho ou as funções cognitivas das pessoas, como sejam a memória, a atenção, o raciocínio, a capacidade de resolução de problemas, entre outras.",
                        "dias" : "TER",
                        "horas" : "14h30 - 16h00",
                        "id" : 6,
                        "imagePublicId" : "xq5ddyp1efywaci30yjh",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1519035401/xq5ddyp1efywaci30yjh.jpg",
                        "name" : "Atelier de Estimulação Cognitiva"
                      },
                      "-L5h_EbsjCClCIlkVJU3" : {
                        "desc" : "O grupo terapêutico é um sistema de ajuda mútua que assenta em princípios de respeito, responsabilidade partilhada e compreensão da situação do outro. Baseia-se na crença de que alguém que enfrentou e superou alguma adversidade pode oferecer apoio, encorajamento, e orientação, a outros que enfrentam situações similares",
                        "dias" : "TER",
                        "horas" : "16h15 - 17h15",
                        "id" : 7,
                        "imagePublicId" : "yvfoltyfh6xv2138i1a6",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1519035676/yvfoltyfh6xv2138i1a6.jpg",
                        "name" : "Grupo Terapêutico "
                      },
                      "-L5h_no0McCeX-QoUH8C" : {
                        "desc" : "A piscina ajuda a diminuir problemas de postura e transmite sensação de bem-estar, melhorando a imagem corporal dos indivíduos e aumentando a autoestima.",
                        "dias" : "QUA",
                        "horas" : "10h - 11h30",
                        "id" : 8,
                        "imagePublicId" : "s8qtqz6arbggapvxw83h",
                        "imagemURL" : "http://res.cloudinary.com/agirar/image/upload/v1519035824/s8qtqz6arbggapvxw83h.jpg",
                        "name" : "Piscina"
                      }
                })
            }, 2000);
        })))
    }
}