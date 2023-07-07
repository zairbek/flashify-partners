import axios from "axios";

const headers = {
  'client-id': '99101220-b12a-41bc-8948-fbe3e6202e90',
  'client-secret': 'qRaB75DqzY35cjIMvWaokbog8IhfHaXI7nBeqXIF',
  "Content-type": "application/json",
}

export const instance = axios.create({
  baseURL: 'http://market.loc/api/partners/v1',
  withCredentials: true,
  headers: headers
})

