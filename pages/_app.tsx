import { Providers } from "@/components";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";

import { Poppins, Saira } from "next/font/google";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { apiPoster } from "@/utils/api";
import { UserApiResponse } from "./api/user";
import { RegisterUsernameModal } from "@/components/Modals";
import { ShowWhen } from "@/components/Utils";
import { JWTKeyName } from "@/utils/constants";
import { SignInApiResponse } from "./api/auth/signin";
import { useUser } from "@/states";

// Instantiate the Saira font with the desired options
export const saira = Saira({
  weight: ["400", "700"], // You can specify the font weights you need
  subsets: ["latin"], // Specify the subsets
  variable: "--font-saira", // Optional: Set a CSS variable if you want to use the font in global styles
});

export const poppins = Poppins({
  weight: ["400", "700"], // You can specify the font weights you need
  subsets: ["latin"], // Specify the subsets
  variable: "--font-poppings", // Optional: Set a CSS variable if you want to use the font in global styles
});

function AuthComp() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();
  const { setUser } = useUser();

  useEffect(() => {
    (async () => {
      if (isConnected) {
        const user = await apiPoster<UserApiResponse>("/api/user", { address });
        const userData = user.data.user;

        if (!userData) setShowRegisterModal(true);
        else {
          setUser(userData);
          const signin = await apiPoster<SignInApiResponse>(
            "/api/auth/signin",
            {
              address,
              username: userData.username,
            }
          );
          const token = signin.data.token;
          if (token) localStorage.setItem(JWTKeyName, token);
        }
      } else if (isDisconnected) {
        localStorage.removeItem(JWTKeyName);
      }
    })();
  }, [isConnected, address, isDisconnected, setUser]);

  return (
    <>
      <ShowWhen
        component={
          <RegisterUsernameModal setShowModal={setShowRegisterModal} />
        }
        when={showRegisterModal}
      />
    </>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <AuthComp />
      <Component {...pageProps} />
    </Providers>
  );
}
