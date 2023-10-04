import jwt_decode from 'jwt-decode';

interface IGetTokens {
  accessToken: string
  refreshToken: string
}

export const useToken = () => {
  const TOKENS = 'bibbleo_tokens';
  const request = useRequest()

  const setTokens = (tokens: Array<string>) => {
    localStorage.setItem(TOKENS, JSON.stringify(tokens))
  }

  const getTokens = () : IGetTokens => {
    const item = localStorage.getItem(TOKENS)
    const [accessToken, refreshToken] = item ? JSON.parse(item) : []
    return { accessToken, refreshToken }
  }

  const get = (KEY: string) => {
    const token = getTokens() as any;
    return token[KEY]
  }

  const isExpired = () => {
    const token = get('accessToken')
    if (!token) return true;

    const decoded = jwt_decode(token) as { exp: number };
    const now = new Date().getTime()
    const expiredTime = decoded.exp * 1000

    return expiredTime < now
  }

  const refreshIfExpired = async () : Promise<any> => {
    if (hasTokens() && isExpired()) {
      return refresh()
    }
  }

  const refresh = async () => {
    try {
      const storageRefreshToken = get('refreshToken')
      const { app: { API_URL } } = useRuntimeConfig()
      const headers = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${ storageRefreshToken }`
        }
      }
      const response = await fetch(`${ API_URL }/auth/refresh`, headers)
      const { accessToken = null, refreshToken = null } = await response.json()

      if (!!accessToken && !!refreshToken) {
        setTokens([accessToken, refreshToken])
      } else {
        return navigateTo('/login')
      }
    } catch (e) {
      return navigateTo('/login')
    }
  }

  const removeTokens = () => {
    localStorage.removeItem(TOKENS)
  }

  const logout = async () => {
    removeTokens()

    try {
      await request.$fetch('auth/logout')
    } catch(e) {
      console.log(e)
    }
  }

  const hasTokens = () => {
    const { accessToken, refreshToken } = getTokens()
    return !!accessToken && !!refreshToken
  }

  const logTime = (ms: number) => {
    let seconds = parseInt((ms / 1000).toFixed(1));
    let minutes = parseInt((ms / (1000 * 60)).toFixed(1));
    let hours = parseInt((ms / (1000 * 60 * 60)).toFixed(1));
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Days"
  }

  return {
    refreshIfExpired,
    logout,
    setTokens,
    getTokens,
    hasTokens,
    removeTokens,
    get,
    refresh
  }
}