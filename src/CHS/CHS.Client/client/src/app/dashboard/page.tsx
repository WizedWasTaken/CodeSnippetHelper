import DashboardProfile from "@/components/pages/Dashboard/Profile";
import UserStatistics from "@/components/pages/Dashboard/UserStatistics";

export default function Dashboard() {
  return (
    <main className="w-full rounded-none shadow-input grid md:grid-cols-2 md:grid-cols-2 gap-4">
      <div>
        <DashboardProfile />
      </div>
      <div className="md:row-span-2">
        <UserStatistics />
      </div>
      <div className="hidden md:block">
        <h1>Mere stuff</h1>
      </div>
    </main>
  );
}
