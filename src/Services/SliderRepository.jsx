export default class SliderRepository {
    // private apiBaseUrl(): URL {
    //   const url = new URL(process.env.REACT_APP_API_BASE!)
    //   if (!url.pathname.endsWith('/')) url.pathname += '/'
    //   return url
    // }
   
    getSliderList = () => {
        return (new Promise(((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    "-L229gfo3nZS66nLxjPc": {
                        url: "https://images.pexels.com/photos/951290/pexels-photo-951290.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                        title: "LOREM IPSUM",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada libero vel erat elementum, sed dictum nunc tempor. Nullam auctor lobortis aliquet"
                    },
                    "-SBIFDVBEWIV": {
                        url: "https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                        title: "LOREM IPSUM",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada libero vel erat elementum, sed dictum nunc tempor. Nullam auctor lobortis aliquet"
                    },
                    "-IFDGERIPGNenig87098": {
                        url: "https://images.pexels.com/photos/786799/pexels-photo-786799.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                        title: "LOREM IPSUM",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada libero vel erat elementum, sed dictum nunc tempor. Nullam auctor lobortis aliquet"
                    },
                    "-lfgvblwer98987987": {
                        url: "https://images.pexels.com/photos/2549572/pexels-photo-2549572.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                        title: "LOREM IPSUM",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada libero vel erat elementum, sed dictum nunc tempor. Nullam auctor lobortis aliquet"
                    },
                    "-WGWER9867897WFWEFdfwef": {
                        url: "https://images.pexels.com/photos/4403924/pexels-photo-4403924.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                        title: "LOREM IPSUM",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada libero vel erat elementum, sed dictum nunc tempor. Nullam auctor lobortis aliquet"
                    }
                })
            }, 2000);
        })))
    }
    submitSliderData = data =>{
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