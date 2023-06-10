import {IOrderInfo, IOrderProduct, IProduct} from "../../models";
import {OrderIngredients} from "../OrderIngredients/OrderIngredients";
import {OrderIngredientsPreview} from "../OrderIngredientsPreview/OrderIngredientsPreview";
import {useMemo} from "react";
import {useSelector} from "../../services/hooks";

export const OrderInfo = ({
                              order,
                              isModal = false,
                              isPreview = false,
                              isFeed = false,
                          }: IOrderInfo & { isModal?: boolean } & { isPreview?: boolean } & { isFeed?: boolean }) => {
    const {products} = useSelector((state) => state.products);
    const {number, status, name, ingredients, createdAt} = order;

    const orderProducts: IOrderProduct[] = [];
    ingredients.forEach((ingredientId: string) => {
        const product = products.find((product: IProduct) => product._id === ingredientId);
        if (product) {
            const existingProduct = orderProducts.find((orderProduct: IOrderProduct) => orderProduct._id === product._id);
            if (existingProduct) {
                existingProduct.count += 1;
            } else {
                const newOrderProduct: IOrderProduct = {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image_mobile: product.image_mobile,
                    count: 1,
                };
                orderProducts.push(newOrderProduct);
            }
        }
    });

    const totalAmount = useMemo(() => {
        return orderProducts.reduce((accumulator, product) => {
            return accumulator + product.price * product.count;
        }, 0);
    }, [orderProducts]);

    const statusMapping: { [key: string]: string } = {
        created: "Создан",
        pending: "Готовится",
        done: "Выполнен",
    };
    const mappedStatus = statusMapping[status];

    function formatRelativeDate(date: Date) {
        const now = new Date();
        const diffInMilliseconds = now.getTime() - date.getTime();
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return "Сегодня";
        } else if (diffInDays === 1) {
            return "Вчера";
        } else {
            return `${diffInDays} дня назад`;
        }
    }

    function formatDateTime(date: Date) {
        const options = {
            hour: "2-digit" as const,
            minute: "2-digit" as const,
            timeZoneName: "short" as const,
            timeZone: "Europe/Moscow",
        };
        const formattedTime = date.toLocaleString("ru-RU", options);
        const timezone = formattedTime.substring(formattedTime.indexOf("GMT"));

        return formattedTime.replace(timezone, `i-${timezone}`);
    }

    const date = new Date(createdAt);
    const relativeDate = formatRelativeDate(date);
    const formattedTime = formatDateTime(date);

    return (
        <>
            {!isPreview &&
                <OrderIngredients ingredients={orderProducts}
                                  number={number}
                                  name={name}
                                  status={mappedStatus}
                                  totalAmount={totalAmount}
                                  createdAt={`${relativeDate}, ${formattedTime}`}
                                  isModal={isModal}
                />
            }
            {isPreview &&
                <OrderIngredientsPreview
                    ingredients={orderProducts}
                    number={number}
                    name={name}
                    status={mappedStatus}
                    totalAmount={totalAmount}
                    createdAt={`${relativeDate}, ${formattedTime}`}
                    isFeed={isFeed}
                />
            }
        </>

    );
}
