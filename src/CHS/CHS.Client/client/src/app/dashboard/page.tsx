import DashboardProfile from "@/components/pages/Dashboard/Profile";
import UserSnippets from "@/components/pages/Dashboard/UserSnippets";

export default function Dashboard() {
  return (
    <main className="flex flex-col flex-grow items-center justify-center w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">
      <DashboardProfile />
      <UserSnippets />
    </main>
  );
}
