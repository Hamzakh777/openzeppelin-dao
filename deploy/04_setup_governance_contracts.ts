// The Governor should be the only proposer in the TimeLock
import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  DEVELOPMENT_CHAINS,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../hardhat.consts";
import { GovernanceToken, Governor, TimeLock } from "../typechain-types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const {
    deployments: { deploy, log, get },
    getNamedAccounts,
    network,
  } = hre;
  const { deployer } = await getNamedAccounts();
  const governanceToken = await ethers.getContract<GovernanceToken>(
    "GovernanceToken"
  );
  const timeLock = await ethers.getContract<TimeLock>("TimeLock", deployer);
  const governorContract = await ethers.getContract<Governor>("GovernorContract", deployer);

  const waitConfirmations: number = DEVELOPMENT_CHAINS.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  log("Setting up roles...")
  const proposerRole = await timeLock.PROPOSER_ROLE()
  const executorRole = await timeLock.EXECUTOR_ROLE()
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

  // once a proposal has gone through
  const proposerTx = await timeLock.grantRole(proposerRole, governorContract.address)
  await proposerTx.wait(waitConfirmations)
  // anybody can execute it
  const executorTx = await timeLock.grantRole(executorRole, ethers.constants.AddressZero)
  await executorTx.wait(waitConfirmations)
  const revokeTx = await timeLock.revokeRole(adminRole, deployer)
  await revokeTx.wait(waitConfirmations)

  // Guess what? Now, anything the timelock wants to do has to go through the governance process! 
  // And no one owns the Timelock controller

};

export default func;
