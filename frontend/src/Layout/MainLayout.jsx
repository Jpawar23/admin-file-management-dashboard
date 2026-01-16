import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
    return (
        <div className="bg-gray-100 flex flex-row">
            <div>
                <Sidebar />
            </div>
            <div className="w-full overflow-x-hidden px-16 py-12">

                <Outlet />

            </div>
        </div>
    );
};

export default MainLayout;

