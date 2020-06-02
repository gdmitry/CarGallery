import { CarModel } from 'app/models';

const X_API_KEY = 'a0b95ae5-b85c-4e9c-bfe1-604bb73896c9';
const API_ENDPOINT = 'https://reacttestprojectapi.azurewebsites.net';

export const makeCarsRequest = async (): Promise<CarModel[]> => {
  const data = await request(`${API_ENDPOINT}/cars/models`) as Array<CarModel>;
  return data;
}

export const makeCarConfigurationRequest = async (code: string): Promise<Object> => {
  const data = await request(`${API_ENDPOINT}/cars/model/${code}`);
  return data;
}

export const makeCheckoutRequest = async (modelName: string, colorName: string, trimName: string): Promise<Object> => {
  const payload = { modelName, colorName, trimName };
  try {
    await request(`${API_ENDPOINT}/cars/lead`, { method: 'POST', body: JSON.stringify(payload) });
    return 'success';
  } catch(e) {
    return 'failed';
  }
}

export async function request(url: string, options?: Object): Promise<Object> {
  const params = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': X_API_KEY,
    },
  }

  const result = await fetch(url, params);

  if (result.status === 204) {
    return result;
  }

  if (result.status === 500) {
    throw new Error(result.statusText);
  }

  const body = await result.json();
  return body;
}
