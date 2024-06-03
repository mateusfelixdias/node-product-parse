import { api_food } from 'src/services';

export const fileNameRequest = async (
    nextUrl: string = '/food/data/json/index.txt',
) => {
    const data = await api_food.get(nextUrl);

    return data;
};