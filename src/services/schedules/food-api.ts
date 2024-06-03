import axios from 'axios';

export const api_food = axios.create({
  baseURL: "https://challenges.coode.sh",
});
