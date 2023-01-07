import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  DEVELOPMENT_CHAINS,
  GOVERNANCE_TOKEN_MAX_SUPPLY,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../hardhat.consts";
import { GovernanceToken } from "../typechain-types";

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

  log("------------- Deployment is starting -------------", deployer);
  const deployResult = await deploy("GovernanceToken", {
    from: deployer,
    args: [GOVERNANCE_TOKEN_MAX_SUPPLY],
    log: true,
    waitConfirmations,
  });
  log("------------- Deployed to ", deployResult.address, " -------------");

  // We need to add a DelegateFunction
  // Because when this contract is deployed no one has voting power because no one is assigned any tokens
  // essentially we are creating a checkpoint of the token owned by the deployer 
  await delegate(deployResult.address, deployer);
  log("------------- Delegated -------------");
};

const delegate = async (
  governanceTokenAddress: string,
  delegateAccount: string
) => {
  const governanceToken = await ethers.getContractAt<GovernanceToken>(
    "GovernanceToken",
    governanceTokenAddress
  );
  const tx = await governanceToken.delegate(delegateAccount);
  tx.wait(1);
  console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegateAccount)}`);
};

export default func;
