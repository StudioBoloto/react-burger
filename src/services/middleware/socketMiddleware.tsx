import {setConnectionStatus} from "../reducers/orderSlice";
import {Middleware} from "redux";

interface SocketMiddlewareOptions {
    authorizedActions: string[];
    unauthorizedActions: string[];
}

export const socketMiddleware = (options: SocketMiddlewareOptions): Middleware => {
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
                        const isAuthorized = (event.currentTarget as WebSocket)?.url?.includes('token');
                        const { authorizedActions, unauthorizedActions } = options;
                        if (isAuthorized) {
                            authorizedActions.forEach(actionType => {
                                store.dispatch({ type: actionType, payload: data });
                            });
                        } else {
                            unauthorizedActions.forEach(actionType => {
                                store.dispatch({ type: actionType, payload: data });
                            });
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
