export interface IProduct {
    "_id": string
    "name": string
    "type": string
    "proteins": number
    "fat": number
    "carbohydrates": number
    "calories": number
    "price": number
    "image": string
    "image_mobile": string
    "image_large": string
    "__v": number
    "count" : number
    "id" : string
}

export interface IOrder {
    "_id": string
    "status": string
    "address": string
    "image": string
}

export interface IOrderProduct {
    _id: string;
    name: string;
    price: number;
    image_mobile: string;
    count: number;
}

export interface IOrdersInfo {
    success: boolean;
    orders: {
        ingredients: string[];
        _id: string;
        status: string;
        name: string;
        number: number;
        createdAt: string;
        updatedAt: string;
    }[];
    total: number;
    totalToday: number;
}

export interface IOrderInfo {
    order: {
        ingredients: string[];
        _id: string;
        status: string;
        name: string;
        number: number;
        createdAt: string;
        updatedAt: string;
    };
}

export interface IOrderResponse {
    name: string;
    order: {
        number: number;
    };
    success: boolean;
}

export interface IRegistrationRequest {
    email: string;
    password: string;
    name: string;
}

export interface IUser {
    currentEmail: string;
    currentName: string;
}

export interface IRegistrationResponse {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        name: string;
    };
}

export interface IUserInfo {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
}

export interface ITokenRequest {
    token: string;
}

export interface ILogoutResponse {
    success: boolean;
    message: string;
}

export interface IPasswordResetRequest {
    email: string;
}

export interface IPasswordRequest {
    password: string;
    token: string;
}

export interface IPasswordResponse {
    success: boolean;
    message: string;
}

export interface ITokenResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}
