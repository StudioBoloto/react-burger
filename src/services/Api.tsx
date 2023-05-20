import {IOrderResponse} from "../models";

export const config = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json'
    }
}

export function request(endpoint: string, options: RequestInit) {
    return fetch(`${config.baseUrl}${endpoint}`, options)
        .then((res: Response) => {
            return checkServerResponse(res);
        })
}

function checkServerResponse(res: Response) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getIngredients = (): Promise<[]> => {
    return request('/ingredients', {
        headers: config.headers
    })
        .then((data) => {
            return data.data;
        })
        .catch((error: Error) => {
            throw new Error(`Ошибка получения ингредиентов: ${error.message}`);
        });
}

export const createOrder = (ingredients: string[]): Promise<IOrderResponse> => {
    const body = {
        ingredients
    };
    return request('/orders', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then((data) => {
            return data;
        })
        .catch((error: Error) => {
            throw new Error(`Ошибка создания заказа: ${error.message}`);
        });
}
