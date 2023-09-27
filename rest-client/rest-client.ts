import { Rest } from "./rest";

interface Service {
  service: (queryString: string) => Rest,
  $fetch: (requestUrl: string) => any
}

export default function restClient(baseUrl = ''): Service {
  return {
    service: (queryKey: string) => {
      return new Rest(queryKey, baseUrl)
    },

    $fetch: (requestUrl: string) => {
      const rest = new Rest(requestUrl, baseUrl)
      return rest.$fetch(requestUrl)
    }
  }
}