// The Governor should be the only proposer in the TimeLock
import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  DEVELOPMENT_CHAINS,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../hardhat.consts";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const {
    deployments: { deploy, log, get },
    getNamedAccounts,
    network,
  } = hre;
  const { deployer } = await getNamedAccounts();
  const waitConfirmations: number = DEVELOPMENT_CHAINS.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("Deploying Box and waiting for confirmations...")
    const box = await deploy("Box", {
      from: deployer,
      args: [],
      log: true,
      // we need to wait if on a live network so we can verify properly
      waitConfirmations,
    })
    log(`Box at ${box.address}`)
    
    const boxContract = await ethers.getContractAt("Box", box.address)
    const timeLock = await ethers.getContract("TimeLock")
    const transferTx = await boxContract.transferOwnership(timeLock.address)
    await transferTx.wait(1)

};

export default func;
func.tags = ["all", "box"]
