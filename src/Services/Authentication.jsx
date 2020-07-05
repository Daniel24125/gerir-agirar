import Auth0 from '../Infrastructure/Auth0'
import Account from '../Domain/Account'
export class AccessDeniedAuthenticationError extends Error {}
export class UnknownAuthenticationError extends Error {
  constructor(details) {
    super()
  }
}
export class UnhandledSubError extends Error {
  constructor(sub) {
    super(`Unrecognized sub in Auth0 user result: ${sub}`)
  }
}

export default class Authentication {
    auth0

  constructor(container) {
    this.auth0 = container.get(Auth0)
  }

  isAuthenticated() {
    return this.auth0.isAuthenticated()
  }

  async current() {
    const user = await this.auth0.getUser()
    if (!user) return null


    const token = await this.auth0.getTokenSilently()
    return new Account({
      accessToken: token,
      email: user.email,
      nickname: user.nickname,
      avatar: new URL(user.picture),
    })
  }

  async login() {
    try {
      await this.auth0.login()
    } catch (e) {
      if (e.error === 'access_denied') {
        throw new AccessDeniedAuthenticationError()
      }
      throw new UnknownAuthenticationError(e)
    }
  }

  async logout() {
    await this.auth0.logout()
  }
}
