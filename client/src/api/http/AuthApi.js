import axios from 'axios'
import CONSTANTS from '../../constants'

class AuthApi {
  #_client
  #_accessToken

  constructor (client) {
    this.#_client = client
    this._url = 'auth/'
    this.#_accessToken = null

    this.#_client.interceptors.request.use(this.requestInterceptor, err =>
      Promise.reject(err)
    )
    this.#_client.interceptors.response.use(
      this.responseInterceptor,
      this.responseInterceptorError
    )
  }

  login = async data => {
    return this.#_client.post(`${this._url}sign-in`, data)
  }

  signUp = async data => {
    return this.#_client.post(`${this._url}sign-up`, data)
  }

  refresh = async data => {
    return this.#_client.post(`${this._url}refresh`, data)
  }

  changePassword = async data => {
    return this.#_client.post(`${this._url}change-password`, data)
  }

  updateUserPassword = async data => {
    return this.#_client.post(`${this._url}update-password`, data)
  }

  logout = () => {
    window.localStorage.removeItem(CONSTANTS.REFRESH_TOKEN)
    this.#_accessToken = null
  }

  requestInterceptor = config => {
    if (this.#_accessToken) {
      config.headers['Authorization'] = `Bearer ${this.#_accessToken}`
    }
    
    return config
  }

  _saveTokenPair = ({ refresh, access }) => {
    window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh)
    this.#_accessToken = access
  }

  responseInterceptor = async response => {
    const {
      config: { url }
    } = response

    if (url.includes(this._url) && !url.includes('change-password')) {
      const {
        data: {
          data: { tokenPair }
        }
      } = response
      this._saveTokenPair(tokenPair)
    }

    return response
  }

  responseInterceptorError = async error => {
    const { config, response } = error
    const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN)

    if (response.status === 419 && refreshToken) {
      const {
        data: {
          data: { tokenPair }
        }
      } = await this.refresh({ refreshToken })

      this._saveTokenPair(tokenPair)

      config.headers['Authorization'] = `Bearer ${tokenPair.accessToken}`
      return this.#_client(config)
    }

    if (response.status === 401 && refreshToken) {
      this.logout()
    }

    return Promise.reject(error)
  }
}

export default AuthApi
