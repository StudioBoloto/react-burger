import {IOrderResponse} from "../models";

const config = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json'
    }
}

function checkServerResponse(res: Response) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getIngredients = (): Promise<[]> => {
    return fetch(`${config.baseUrl}/ingredients`, {
        headers: config.headers
    })
        .then((res: Response) => {
            return checkServerResponse(res);
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
    return fetch(`${config.baseUrl}/orders`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then((res: Response) => {
            return checkServerResponse(res);
        })
        .then((data) => {
            return data;
        })
        .catch((error: Error) => {
            throw new Error(`Ошибка создания заказа: ${error.message}`);
        });
}
