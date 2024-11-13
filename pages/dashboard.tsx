import { Dashboard, MainLayout } from "@/components";
import { ShowWhen } from "@/components/Utils";
import { useAccount } from "wagmi";
import { SignInRequired } from "@/components/SignInRequired";

export default function DashboardPage() {
  const { isConnected } = useAccount();

  return (
    <MainLayout>
      <ShowWhen
        component={<Dashboard />}
        when={isConnected}
        otherwise={<SignInRequired />}
      />
    </MainLayout>
  );
}
