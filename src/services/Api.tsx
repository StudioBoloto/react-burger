import {
    ILoginRequest,
    ILoginResponse, ILogoutResponse,
    IOrderResponse, IPasswordRequest, IPasswordResetRequest, IPasswordResponse,
    IRegistrationRequest,
    IRegistrationResponse, ITokenRequest, ITokenResponse,
    IUserInfo
} from "../models";

const config = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json'
    }
}

function request(endpoint: string, options: RequestInit) {
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

export const createUser = (body: IRegistrationRequest): Promise<IRegistrationResponse> => {

    return request('/auth/register', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then((data) => {
            return data;
        })
        .catch((error: Error) => {
            throw new Error(`Ошибка создания пользователя: ${error.message}`);
        });
}

export const loginUser = (body: ILoginRequest): Promise<ILoginResponse> => {

    return request('/auth/login', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then((data) => {
            return data;
        })
        .catch((error: Error) => {
            throw new Error(`Ошибка авторизации пользователя: ${error.message}`);
        });
}

export const logoutUser = (body: ITokenRequest): Promise<ILogoutResponse> => {

    return request('/auth/logout', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then((data) => {
            return data;
        })
        .catch((error: Error) => {
            throw new Error(`Ошибка выхода из системы пользователя: ${error.message}`);
        });
}

export const updateToken = (body: ITokenRequest): Promise<ITokenResponse> => {

    return request('/auth/token', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then((data) => {
            return data;
        })
        .catch((error: Error) => {
            throw new Error(`Ошибка обновления токена: ${error.message}`);
        });
}

export const updatePassword = (body: IPasswordRequest): Promise<IPasswordResponse> => {

    return request('/password-reset/reset', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then((data) => {
            return data;
        })
        .catch((error: Error) => {
            throw new Error(`Ошибка обновления пароля: ${error.message}`);
        });
}

export const resetPassword = (body: IPasswordResetRequest): Promise<IPasswordResponse> => {

    return request('/password-reset', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then((data) => {
            return data;
        })
        .catch((error: Error) => {
            throw new Error(`Ошибка сброса пароля: ${error.message}`);
        });
}

export const updateUser = (body: IRegistrationRequest): Promise<IUserInfo> => {

    return request('/auth/user', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(body)
    })
        .then((data) => {
            return data;
        })
        .catch((error: Error) => {
            throw new Error(`Ошибка обновления данных пользователя: ${error.message}`);
        });
}

export const getUser = (token: ITokenRequest): Promise<IUserInfo> => {

    return request('/auth/user', {
        method: 'GET',
        headers: {
            ...config.headers,
            Authorization: token.token,
        },
    })
        .then((data) => {
            return data;
        })
        .catch((error: Error) => {
            throw new Error(`Ошибка получения данных пользователя: ${error.message}`);
        });
}
