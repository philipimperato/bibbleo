import restClient from '~/rest-client/rest-client'

export const useRequest = () => {
  const API_URL = 'http://localhost:3030';
  return restClient(API_URL)
};
