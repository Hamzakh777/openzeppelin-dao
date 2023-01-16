import { BigNumber } from "ethers";

export const GOVERNANCE_TOKEN_MAX_SUPPLY = BigNumber.from(
  "100000000000000000000"
);
export const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
export const DEVELOPMENT_CHAINS: string[] = ["hardhat", "localhost"];
export const MIN_DELAY = 3600;
export const VOTING_PERIOD = 5; // blocks
export const VOTING_DELAY = 1; // block
export const QUORUM_PERCENTAGE = 4;
export const NEW_STORE_VALUEU = 77;

