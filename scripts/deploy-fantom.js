const hre = require("hardhat");

async function main() {
  const chain = "FTM";
  const dex = {
      in: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', // in (WFTM)
      out: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', // out (DAI) Important Only 18 decimals!
      pool: '0xe120ffbda0d14f3bb6d6053e90e63c572a66a428' // DAI/WFTM Spooky
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