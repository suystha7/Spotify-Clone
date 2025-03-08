import DashboardStats from "@/components/admin/DashboardStats";
import Header from "@/components/admin/Header";
import { useAuthStore } from "@/stores/useAuthStore";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();
  if (!isAdmin && !isLoading) return <div>Unauthorized</div>;
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
      <Header />
      <DashboardStats />
    </div>
  );
};

export default AdminPage;
