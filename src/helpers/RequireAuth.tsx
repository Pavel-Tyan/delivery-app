import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const jwt = useAppSelector((s: RootState) => s.user.jwt);

    if (!jwt) {
        return <Navigate to='/auth/login' replace />;
    }
    return children;
};

export default RequireAuth;
