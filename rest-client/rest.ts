import queryString from "query-string";
import { useMutation, useQuery } from '@tanstack/vue-query';
import { FindParams, Query } from "./declarations";
import jwt_decode from "jwt-decode";

export class Rest {
  private queryKey: string;
  private baseUrl: string;
  private DEFAULTS = {
    cacheTime:0
  }

  constructor(queryKey: string, baseUrl: string) {
    this.queryKey = queryKey
    this.baseUrl = baseUrl
  }

  private buildAuthHeader() {
    const { get } = useToken()
    const accessToken = get('accessToken')

    return `Bearer ${ accessToken }`
  }

  private makeUrl(query: Query, id?: string | number | null) {
    let url = this.baseUrl

    query = query || {}

    if (typeof id !== 'undefined' && id !== null) {
      url += `/${encodeURIComponent(id)}`
    }

    return `${url}/${this.queryKey}` + this.getQuery(query)
  }

  private getQuery(query: Query) {
    if (Object.keys(query).length !== 0) {
      const qs = queryString.stringify(query)
      return `?${qs}`
    }
    return ''
  }

  private getQueryFn(action: string, params: FindParams) {
    switch (action) {
      case 'find': {
        const queryUrl = this.makeUrl(params.query)
        const options = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.buildAuthHeader()
          }
        }

        return fetch(queryUrl, options)
      }
    }
  }

  find(params: FindParams) {
    if (!params || !params.query) {
      throw Error('Must Include params with a query object')
    }

    return useQuery({
      queryKey: [this.queryKey, 'find'],
      queryFn: async () => {
        const { refreshIfExpired, removeTokens } = useToken()
        await refreshIfExpired()

        const stream = await this.getQueryFn('find', params)
        const response = await stream?.json()

        if (response.statusCode === 401) {
          removeTokens()
          navigateTo('/login')
        }

        return response;
      },
      ...this.DEFAULTS
    })
  }

  create() {
    const createFn = async (data: any) => {
      const response = await fetch(
        `${ this.baseUrl }/${ this.queryKey }/`,
        {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(data),
        } as any
      )

      return await response.json()
    }


    return useMutation({
      mutationFn: data => createFn(data),
      mutationKey: [this.queryKey, 'create']
    })
  }

  $fetch(requestUrl: string) {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.buildAuthHeader()
      }
    }

    return fetch(`${this.baseUrl}/${requestUrl}`, options)
  }
}