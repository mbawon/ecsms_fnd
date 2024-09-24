import { Navigate } from 'react-router-dom';
import UserStore from '@/stores/UserStore';
import { observer } from 'mobx-react-lite';

type PrivateRouteProps = {
  children: JSX.Element;
  roles: string[];
};

const PrivateRoute = observer(({ children, roles }: PrivateRouteProps) => {
  const user = UserStore.user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
    // Check if user exists and if their role is in the allowed roles
    if (!user || !roles.includes(user.role)) {
      return <Navigate to="/not-authorized" replace />;
    }

  // if (user.role && !roles.includes(user.role)) {
  //   return <Navigate to="/not-authorized" replace />;
  // }

  return children;
});

export default PrivateRoute;
