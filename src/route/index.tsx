import { Routes, Route, Link, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "@/app/Login";
import Dashboard from "@/app/admins";
import { ChartArea, Home, MessageCircle, Users } from "lucide-react";
import Chat from "@/app/agents/Chat";
import { Fragment } from "react/jsx-runtime";
import TopLoader from "@/components/loader";
import Logout from "@/app/Logout";
import { useStores } from "@/common/contexts/StoreContext";
import AgentDashboard from "@/app/agents";
import { toJS } from "mobx";

const Teams = () => <div>Teams</div>;
const Messages = () => <div>Messages</div>;

export const navs: any[] = [
  {
    label: 'Dashboard',
    route: '/',
    userType: ['admin'],
    component: <Dashboard />,
    icon: <Home className="w-5 h-5" />
  },
  {
    label: 'Cases',
    route: '/messages',
    userType: ['admin'],
    component: <Messages />,
    icon: <MessageCircle className="w-5 h-5" />
  },
  {
    label: 'Reports',
    route: '/reports',
    userType: ['admin'],
    component: <Teams />,
    icon: <ChartArea className="w-5 h-5" />
  },
  {
    label: 'Users',
    route: '/users',
    userType: ['admin'],
    component: <Teams />,
    icon: <Users className="w-5 h-5" />
  },
  {
    label: 'Dashboard',
    route: '/',
    userType: ['agent'],
    component: <Chat />,
    icon: <Home className="w-5 h-5" />
  },
  // {
  //   label: 'Chat',
  //   route: '/chat',
  //   userType: ['agent'],
  //   component: <Chat />,
  //   icon: <MessageCircle className="w-5 h-5" />
  // },
];

import { observer } from 'mobx-react-lite';
// other imports...

const Router = observer(() => {
  const { UserStore } = useStores();
  const user = toJS(UserStore?.user);
  const userRoutes = navs.filter(nav => nav.userType.includes(user?.role));

  return (
    <Fragment>
      <TopLoader />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {!user ? (
          <Route path="*" element={<Navigate to="/login" replace />} />
        ) : (
          <>
            {userRoutes.length > 0 ? (
              userRoutes.map((nav) => (
                <Route
                  key={nav.route}
                  path={nav.route}
                  element={<PrivateRoute roles={nav.userType}>{nav.component}</PrivateRoute>}
                />
              ))
            ) : (
              <Route path="*" element={<Navigate to="/not-authorized" replace />} />
            )}
          </>
        )}

        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
});

export default Router;


// Not Authorized Component
const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <img
        src="/images/not-authorized.svg"
        alt="Not Authorized"
        className="w-64 h-64 mb-8"
      />
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-600 mb-8">Sorry, you don't have permission to view this page.</p>
      <Link to="/">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

// Not Found Component
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <img
        src="/images/404.svg"
        alt="Page Not Found"
        className="w-64 h-64 mb-8"
      />
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};
