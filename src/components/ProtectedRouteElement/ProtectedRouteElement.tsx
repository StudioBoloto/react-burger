import {Navigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {getUser} from "../../services/Api";
import {updateProfile} from "../../services/actions/profileActions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/store";

interface ProtectedRouteElementProps {
    element: React.ReactNode;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({element}: ProtectedRouteElementProps) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('accessToken') ?? '';
    const [isUserLoaded, setUserLoaded] = useState(false);
    const {currentEmail, currentName} = useSelector((state: RootState) => state.profile);

    const init = async () => {
        const data = await getUser({token});
        dispatch(updateProfile({currentEmail: data.user.email, currentName: data.user.name}));
        setUserLoaded(true);
    };

    useEffect(() => {
        init().catch((error) => console.error(error));
    }, [dispatch, token]);

    if (!isUserLoaded) {
        return null;
    }

    return currentEmail !== '' && currentName !== '' ? (
        <>{element}</>
    ) : (
        <Navigate to="/login" replace/>
    );
};
