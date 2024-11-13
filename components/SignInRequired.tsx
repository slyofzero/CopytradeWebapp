import { ConnectButton } from "./blockchain";

export function SignInRequired() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center flex-grow ">
      <span className="text-3xl font-extrabold text-center">
        Please sign in to continue.
      </span>
      <ConnectButton />
    </div>
  );
}
