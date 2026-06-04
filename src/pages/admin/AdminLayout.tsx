import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex bg-background text-foreground">

      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto min-h-screen">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;