const hre = require("hardhat");

async function main() {
  const chain = "OP";
  const dex = {
      in: '0x4200000000000000000000000000000000000006', // in (WETH)
      out: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', // out (USDC) Important Only 18 decimals!
      pool: '0x0493Bf8b6DBB159Ce2Db2E0E8403E753Abd1235b' // USDC/WETH Trade joe Pair
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