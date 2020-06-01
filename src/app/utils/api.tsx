import { CarModel } from 'app/models';

const X_API_KEY = 'a0b95ae5-b85c-4e9c-bfe1-604bb73896c9';
const API_ENDPOINT = 'https://reacttestprojectapi.azurewebsites.net';

export const makeCarsRequest = async (): Promise<CarModel[]> => {
  const data = await request(`${API_ENDPOINT}/cars/models`) as Array<CarModel>;
  return data;
}

export const makeCarConfigurationRequest = async (code: number): Promise<Object> => {
  const data = await request(`${API_ENDPOINT}/cars/model/${code}`);
  return data;
}

export async function request (url: string, options?: Object): Promise<Object> {
  const params = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': X_API_KEY,
    },
  }
  const result = await fetch(url, params);
  const body = await result.json();

  return body;
}
