import {ethers, getChainId} from 'hardhat'
import { Box, GovernorContract } from '../typechain-types';

async function main(args: any[], functionToCall: string) {
    console.log(await getChainId());
    const governor = await ethers.getContract<GovernorContract>("GovernorContract");
    const box = await ethers.getContract<Box>("Box");
    const encodedFunctionCall = box.interface.encodeFunctionData(
        functionToCall,
        args
    )
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})