
import { Outlet, useLocation } from "react-router";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import AppSidebar from "./AppSidebar";

const noteDetailPath = /^\/notes\/[^/]+$/;

const pages: Record<string, { title: string; description: string }> = {
  "/notes": {
    title: "All Notes",
    description: "Manage, search and organize your notes.",
  },
  "/favourites": {
    title: "Favourites",
    description: "Your favourite notes in one place.",
  },
};

const AppLayout = () => {
  const { pathname } = useLocation();
  const isNoteDetail = noteDetailPath.test(pathname);
  const page = pages[pathname] ?? {
    title: "Dashboard",
    description: "Welcome back, Aman 👋",
  };

  return (
    <div className="flex min-h-screen bg-[#F5F8FE]">
      <AppSidebar />

      <main className="min-w-0 flex-1 p-5 sm:p-6 lg:p-7">
        <div className={isNoteDetail ? "space-y-5" : "space-y-6"}>
          {isNoteDetail ? (
            <DashboardHeader variant="bar" />
          ) : (
            <DashboardHeader title={page.title} description={page.description} />
          )}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
