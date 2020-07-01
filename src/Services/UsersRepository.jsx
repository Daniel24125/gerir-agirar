export default class UsersRepository {
    // private apiBaseUrl(): URL {
    //   const url = new URL(process.env.REACT_APP_API_BASE!)
    //   if (!url.pathname.endsWith('/')) url.pathname += '/'
    //   return url
    // }

    getUsersList = () => {
        return (new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    "-L229gfo3nZS66nLxjPc": {
                        "codPostal": "4400-328",
                        "contribuicao": "6",
                        "dataNascimento": "21/07/1990",
                        "email": "danielmadalena@msn.com",
                        "freqPagamento": "Trimestral",
                        "localidade": "Vila Nova de Gaia",
                        "modoPagamento": "Transferência bancária",
                        "morada": "Rua de trás nº157 6ºA",
                        "nib": "",
                        "nif": "123465798",
                        "nome": "Daniel Madalena",
                        "telefone": "912547305"
                    },
                    "-SBIFDVBEWIV": {
                        "codPostal": "4400-328",
                        "contribuicao": "6",
                        "dataNascimento": "01/07/1990",
                        "email": "danielmadalena@msn.com",
                        "freqPagamento": "Trimestral",
                        "localidade": "Vila Nova de Gaia",
                        "modoPagamento": "Transferência bancária",
                        "morada": "Rua de trás nº157 6ºA",
                        "nib": "",
                        "nif": "123465798",
                        "nome": "Daniel Madalena",
                        "telefone": "912547305"
                    },
                    "-IFDGERIPGNenig87098": {
                        "codPostal": "4400-328",
                        "contribuicao": "6",
                        "dataNascimento": "21/07/1990",
                        "email": "danielmadalena@msn.com",
                        "freqPagamento": "Trimestral",
                        "localidade": "Vila Nova de Gaia",
                        "modoPagamento": "Débito Direto",
                        "morada": "Rua de trás nº157 6ºA",
                        "nib": "65416519519819651981981918",
                        "nif": "123465798",
                        "nome": "Daniel Madalena",
                        "telefone": "912547305"
                    },
                    "-lfgvblwer98987987": {
                        "codPostal": "4400-328",
                        "contribuicao": "6",
                        "dataNascimento": "21/07/1990",
                        "email": "danielmadalena@msn.com",
                        "freqPagamento": "Trimestral",
                        "localidade": "Vila Nova de Gaia",
                        "modoPagamento": "Transferência bancária",
                        "morada": "Rua de trás nº157 6ºA",
                        "nib": "",
                        "nif": "123465798",
                        "nome": "Daniel Madalena",
                        "telefone": "912547305"
                    }
                })
            }, 2000);
        })))
    }

    submitAssociateData = data =>{
        return(new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    {
                        error: false
                    }
                   )
            }, 3000);
        })))
    }
}