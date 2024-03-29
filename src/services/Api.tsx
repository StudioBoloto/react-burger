export const config = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json'
    },
    wsUrlOrdersAll: 'wss://norma.nomoreparties.space/orders/all',
    wsUrlOrders: 'wss://norma.nomoreparties.space/orders'
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
