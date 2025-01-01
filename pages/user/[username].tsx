import { Dashboard, MainLayout } from "@/components";
import { ShowWhen } from "@/components/Utils";
import { useAccount } from "wagmi";
import { SignInRequired } from "@/components/SignInRequired";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { username } = router.query;

  return (
    <MainLayout>
      <ShowWhen
        component={<Dashboard username={username as string} />}
        when={isConnected}
        otherwise={<SignInRequired />}
      />
    </MainLayout>
  );
}
