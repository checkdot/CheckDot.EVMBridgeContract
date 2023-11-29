const hre = require("hardhat");

async function main() {
  const chain = "BASE";
  const dex = {
      in: '0x4200000000000000000000000000000000000006', // in (WETH)
      out: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // out (USDC) Important Only 18 decimals!
      pool: '0x83240b049Fa89b65be714aeD68e5B074df6aAc84' // USDC/WETH Trade joe Pair
  };

  const BridgeContract = await hre.ethers.getContractFactory("EVMBridge");
  const bridge = await BridgeContract.deploy(
    chain,
    '0x0cBD6fAdcF8096cC9A43d90B45F65826102e3eCE',
    '10000000000000000000', // 10 USD cost BRIDGE ETH to BSC
    '0', // transfer fees
    dex.in, // in (WETH)
    dex.out, // out (BUSD)
    dex.pool // pool
  );

  await bridge.deployed();

  console.log(
    `Bridge deployed to ${bridge.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});