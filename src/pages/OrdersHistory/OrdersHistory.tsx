import styles from "../Pages.module.css";
import {logoutUser} from "../../services/actions/userActions";
import {cleanPassword} from "../../services/actions/passwordActions";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import commonStyles from "../../components/App/App.module.css";
import {OrderInfo} from "../../components/OrderInfo/OrderInfo";
import {closeConnection, setConnection} from "../../services/reducers/orderSlice";
import {config} from "../../services/Api";
import Loader from "../../components/Loader/Loader";
import {useDispatch, useSelector} from "../../services/hooks";

export const OrdersHistory = () => {
    const isFeed = false
    const maxHeight = isFeed ? "812px" : "868px";
    const width = isFeed ? "596px" : "854px";
    const maxWidth = isFeed ? "612px" : "870px";
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);
    const ordersInfo = orders.userOrders;

    useEffect(() => {
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            const accessToken = userData.accessToken ?? '';
            const token = accessToken.substring(7) ?? '';
            dispatch(setConnection(`${config.wsUrlOrders}?token=${token}`));
        }
        return () => {
            dispatch(closeConnection);
        }
    }, [dispatch])

    const handleOpenModal = (_id: string) => {
        navigate(`/profile/orders/${_id}`,
            {state: {modal: true, from: '/profile/orders', background: location}});
    }

    const handleLogoutClick = () => {
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            const token = userData.refreshToken ?? '';

            dispatch(logoutUser({
                body: {token},
                navigate: navigate,
                navigateTo: ('/login'),
                navigateFrom: ('/profile/orders'),
            }));
        }
        dispatch(cleanPassword());
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.profile_wrapper}>
                <div className={styles.navigation}>
                    <Link to='/profile' className={`text text_type_main-medium text_color_inactive navigation_element
                ${styles.navigation_element}`}>Профиль</Link>
                    <Link to='/profile/orders' className={`text text_type_main-medium navigation_element 
                      ${styles.navigation_element}`}>История заказов</Link>
                    <Link to='/login' onClick={handleLogoutClick} className={`text text_type_main-medium 
                    text_color_inactive navigation_element mb-20 
                ${styles.navigation_element}`}>Выход</Link>
                    <p className="text text_type_main-small text_color_inactive">
                        В этом разделе вы можете <br/> просмотреть свою историю заказов
                    </p>
                </div>

                <div style={{
                    display: "flex",
                    marginRight: "auto",
                    marginLeft: "auto",
                }}
                >
                    <div className={`${commonStyles.scrollContainer} mb-10 mr-15`} style={{
                        maxHeight, maxWidth,
                        marginLeft: "auto",
                    }}>
                        {!ordersInfo &&
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "100vh",
                            }}>
                                <Loader/>
                            </div>
                        }
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "24px",
                            width,
                        }}>
                            {ordersInfo && ordersInfo.orders.map((order) => (
                                <span key={order._id} onClick={() => {
                                    handleOpenModal(order._id);
                                }}>
                                <OrderInfo order={order} isPreview={true} isFeed={isFeed}/>
                                </span>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
