import DashboardProfile from "@/components/pages/Dashboard/Profile";
import UserStatistics from "@/components/pages/Dashboard/UserStatistics";

export default function Dashboard() {
  return (
    <main className="w-full rounded-none shadow-input grid xl:grid-cols-2 xl:grid-cols-2 gap-4">
      <div>
        <DashboardProfile />
      </div>
      <div className="xl:row-span-2">
        <UserStatistics />
      </div>
      {/* <div className="hidden xl:block">
        <h1>Mere stuff</h1>
      </div> */}
    </main>
  );
}
