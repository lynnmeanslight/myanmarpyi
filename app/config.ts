import { createConfig, http } from "wagmi";
import { baseSepolia, mainnet, sepolia } from "wagmi/chains";
import { baseAccount } from "wagmi/connectors";

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    baseAccount({
      appName: "Myanmar Pyi",
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
});
