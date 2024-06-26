"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { useState, useEffect } from "react";
import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  okxWallet,
  ledgerWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Provider } from "react-redux";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@fontsource/source-code-pro";
import { projectId } from "../config";
import Loading from "@/components/molecules/bittensor/loading";
import SidebarMenu from "@/components/templates/Sidebar/sidebar";
import Footer from "@/components/templates/footer/footer";
import Head from "@/components/templates/head";
import ThemeProvider from "@/context/toggle-theme-provider";
import "./globals.css";
import "reactflow/dist/style.css";
import { store } from "@/store/reducers/index";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, sepolia, goerli],
  [
    alchemyProvider({ apiKey: "Pg7_v8x8SlXaP0ZsI90QrGFxOEEJBCtA" }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ projectId, chains }), // Metamask
      ...(projectId ? [walletConnectWallet({ projectId, chains })] : []),
      ...(projectId ? [trustWallet({ projectId, chains })] : []),
      // walletConnectWallet({ projectId, chains }),
      // trustWallet({ projectId, chains }),
      // Add more recommended wallets as needed
    ],
  },
  {
    groupName: "Other",
    wallets: [
      ...(projectId ? [rainbowWallet({ projectId, chains })] : []),
      ...(projectId ? [okxWallet({ projectId, chains })] : []),
      ...(projectId ? [ledgerWallet({ projectId, chains })] : []),

      // rainbowWallet({ projectId, chains }),
      // coinbaseWallet({ projectId, chains }),
      // okxWallet({ projectId, chains }),
      // ledgerWallet({ projectId, chains }),
      // Add other wallets to the "Other" group
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      window.removeEventListener("load", handleLoad);
    };
  }, []);
  return (
    <html lang="en">
      <Head />
      <body>
        {isLoading ? (
          <Loading />
        ) : (
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} coolMode theme={darkTheme()}>
              <Provider store={store}>
                <ThemeProvider>
                  {/* <Banner /> */}
                  <SidebarMenu setExpand={setSideMenuIsExpand} />
                  <div
                    className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${
                      sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
                    }`}
                  >
                    {children}
                  </div>
                  <Footer />
                </ThemeProvider>
              </Provider>
            </RainbowKitProvider>
          </WagmiConfig>
        )}
      </body>
    </html>
  );
}
