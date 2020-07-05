import createAuth0Client from '@auth0/auth0-spa-js'


export default class Auth0 {
  window
  client = null
  clientPromise = null

  constructor(container) {
    this.window = container.get(Window)
  }

  async login(){
    const client = await this.open()
    await client.loginWithPopup()
  }

  async logout(){
    const client = await this.open()
    await client.logout({
      localOnly: true
    })
  }

  async isAuthenticated() {
    const client = await this.open()
    return client.isAuthenticated()
  }

  async getUser() {
    const client = await this.open()
    const user = await client.getUser()
    if (user === undefined) return null
    return user 
  }

  async getTokenSilently(options) {
    const client = await this.open()
    return client.getTokenSilently(options)
  }

   open(){
    if (this.client) return Promise.resolve(this.client)
    else if (this.clientPromise) return this.clientPromise
    else {
      this.clientPromise = createAuth0Client({
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirect_uri: this.window.location.origin,
        authorizeTimeoutInSeconds: 10,
      }).then(async (client) => {
        this.client = client
        this.clientPromise = null
        return this.client
      })
      return this.clientPromise
    }
  }
}
