import { useStores } from "@/common/contexts/StoreContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Logout = observer(() => {
    const { UserStore } = useStores();
    const user = UserStore.user;
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    useEffect(() => {
        const handleLogout = async () => {
            if (user) {
                await AsyncStorage.clear();
                UserStore.clearUser();
                setIsLoggedOut(true);
            }
        };

        handleLogout();
    }, [user, UserStore]);

    if (!user || isLoggedOut) {
        return <Navigate to="/login" replace />;
    }

    return <div>Processing...</div>;
});

export default Logout;
