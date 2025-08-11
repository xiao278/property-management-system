import { JSX, useContext } from 'react';
import { AuthContext } from './AuthProvider';

interface AuthOrHideProps {
    children: JSX.Element | JSX.Element[];
    adminOnly: boolean;
}

export function AuthOrHide(props: AuthOrHideProps) {
    const { adminOnly, children } = props;
    const { user, isAuthenticated } = useContext(AuthContext);
    return (
        <>
            {(isAuthenticated && (!adminOnly || (user?.isAdmin)))? children : <></>}
        </>
    );
}