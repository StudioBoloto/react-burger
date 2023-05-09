import React from 'react';
import {Navigate} from 'react-router-dom';

interface UnprotectedRouteElementProps {
    element: React.ReactNode;
}

export const UnprotectedRouteElement: React.FC<UnprotectedRouteElementProps> = ({
                                                                                    element,
                                                                                    ...props
                                                                                }: UnprotectedRouteElementProps) => {
    const token = localStorage.getItem('accessToken') ?? '';

    return token === '' ? (
        <>{element}</>
    ) : (
        <Navigate to="/" replace/>
    );
};
