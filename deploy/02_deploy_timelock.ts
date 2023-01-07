import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  DEVELOPMENT_CHAINS,
  MIN_DELAY,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../hardhat.consts";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  // code here
  const {
    deployments: { deploy, log },
    getNamedAccounts,
    network,
  } = hre;
  const { deployer } = await getNamedAccounts();

  const waitConfirmations: number = DEVELOPMENT_CHAINS.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  log("------------- Deploying Timelock -------------", deployer);
  const deployResult = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, [], [], deployer],
    log: true,
    waitConfirmations,
  });
  log("------------- Deployed to ", deployResult.address, " -------------");
};

export default func;
