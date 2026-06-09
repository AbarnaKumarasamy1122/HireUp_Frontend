import { Outlet } from "react-router-dom";
import CompanySidebar from "./CompanySidebar";

const CompanyLayout = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <CompanySidebar />

      <div className="flex-1 p-6 md:p-10 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default CompanyLayout;