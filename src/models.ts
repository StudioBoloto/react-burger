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
}

export interface IOrder {
    "_id": string
    "status": string
    "address": string
    "image": string
}

export interface IOrderResponse {
    name: string;
    order: {
        number: number;
    };
    success: boolean;
}
