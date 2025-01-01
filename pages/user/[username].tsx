import { Dashboard, MainLayout } from "@/components";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <MainLayout>
      <Dashboard username={username as string} />
    </MainLayout>
  );
}
