import DashboardStats from "../components/DashboardStats";
import NoteActivity from "../components/NoteActivity";
import RecentNotes from "../components/RecentNotes";
import WelcomeBanner from "../components/WelcomeBanner";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <WelcomeBanner />
      <DashboardStats />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr] xl:items-stretch">
        <RecentNotes />
        <NoteActivity />
      </div>
    </div>
  );
};

export default DashboardPage;
