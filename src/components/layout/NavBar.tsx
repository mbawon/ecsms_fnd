import { navs } from "@/route";
import { LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStores } from "@/common/contexts/StoreContext";

const NavBar = observer(() => {
    const { UserStore } = useStores();
    const user = UserStore.user


    return (
        <div className="w-[250px] h-screen bg-[#ff0000] flex flex-col justify-between pb-10">
            <div>
                <div className="flex flex-col items-center justify-center relative">
                    <img src="/images/logo2.jpg" alt="Logo" className="w-full h-52 rounded-xl" />
                    <h1 className="text-white text-2xl font-bold absolute bottom-3">EC-SMS</h1>
                </div>
                <div className="py-6">
                    {
                        navs
                            .filter(nav => nav.userType.includes(user!!.role))
                            .map((nav, i) => (
                                <NavLink key={i} to={nav.route}>
                                    <div className="flex flex-row justify-between items-center p-2 px-8 text-white">
                                        <div className="flex flex-row items-center gap-1">
                                            {nav.icon}
                                            <span className="text-lg font-light">{nav.label}</span>
                                        </div>
                                    </div>
                                </NavLink>
                            ))
                    }
                </div>
            </div>
            <NavLink to="/logout" className="flex flex-row items-center gap-1 px-8 text-white">
                <LogOut className="w-5 h-5" />
                <span className="text-lg font-light">Logout</span>
            </NavLink>
        </div>
    );
});

export default NavBar;
