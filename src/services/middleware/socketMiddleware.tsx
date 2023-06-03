import {setAllOrders, setConnectionStatus, setUserOrders} from "../reducers/orderSlice";

export const socketMiddleware = () => {
    return (store: { dispatch: any; getState: any; }) => {
        let socket: WebSocket | null = null;

        // @ts-ignore
        return next => action => {
            switch (action.type) {
                case 'orders/setConnection':
                    if (socket !== null) {
                        socket.close();
                    }
                    socket = new WebSocket(action.payload);

                    socket.onopen = () => {
                        store.dispatch(setConnectionStatus(true));
                    };

                    socket.onmessage = (event) => {
                        const data = JSON.parse(event.data);
                        const isUserOrders = (event.currentTarget as WebSocket)?.url?.includes('token');
                        if (isUserOrders) {
                            store.dispatch(setUserOrders(data));
                        } else {
                            store.dispatch(setAllOrders(data));
                        }
                    };

                    socket.onclose = () => {
                        socket = null;
                        store.dispatch(setConnectionStatus(false));
                    };

                    break;
                case 'orders/closeConnection':
                    if (socket !== null) {
                        socket.close();
                        socket = null;
                    }
                    store.dispatch(setConnectionStatus(false));
                    break;
                default:
                    return next(action);
            }
        };
    };
};
