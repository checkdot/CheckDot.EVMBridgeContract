const hre = require("hardhat");

async function main() {
  const chain = "AVAX";
  const dex = {
      in: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', // in (WAVAX)
      out: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70', // out (DAI.e) Important Only 18 decimals!
      pool: '0x87Dee1cC9FFd464B79e058ba20387c1984aed86a' // DAI.e/WAVAX Trade joe Pair
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