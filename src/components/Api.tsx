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
