import { feathers, type FeathersService } from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import { createPiniaClient } from 'feathers-pinia';

type ServiceTypes = Record<string, FeathersService>;

export default defineNuxtPlugin((nuxt) => {
  const API_URL = 'http://localhost:3030';
  const feathersClient = feathers<ServiceTypes>();
  const restClient = rest(API_URL);

  feathersClient.configure(restClient.fetch(window.fetch.bind(window)));

  const api2 = createPiniaClient(feathersClient, {
    pinia: nuxt.$pinia,
    idField: '_id',
    ssr: false,
    whitelist: ['$regex'],
    paramsForServer: [],
    services: {
      users: {
        idField: 'userId',
      },
    },
  });

  return {
    provide: { api2 },
  };
});
