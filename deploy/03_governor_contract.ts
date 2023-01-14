import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  DEVELOPMENT_CHAINS,
  MIN_DELAY,
  QUORUM_PERCENTAGE,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  VOTING_DELAY,
  VOTING_PERIOD,
} from "../hardhat.consts";
import { GovernanceToken, TimeLock } from "../typechain-types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  // code here
  const {
    deployments: { deploy, log, get },
    getNamedAccounts,
    network,
  } = hre;
  const { deployer } = await getNamedAccounts();
  const governanceToken = await ethers.getContract<GovernanceToken>(
    "GovernanceToken"
  );
  const timeLock = await ethers.getContract<TimeLock>("TimeLock");

  const waitConfirmations: number = DEVELOPMENT_CHAINS.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  log("------------- Deploying GovernorContract -------------", deployer);
  const deployResult = await deploy("GovernorContract", {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUORUM_PERCENTAGE,
    ],
    gasLimit: 1000000,
    log: true,
    waitConfirmations,
  });
  log("------------- Deployed to ", deployResult.address, " -------------");
};

export default func;
