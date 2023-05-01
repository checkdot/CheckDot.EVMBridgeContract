const hre = require("hardhat");

async function main() {
  const chain = "MATIC";
  const dex = {
      in: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // in (WMATIC)
      out: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // out (DAI) Important Only 18 decimals!
      pool: '0x6BaEad5Db7FeE6D5c9F0Ca07Bb5038C4cD279F5c' // DAI/WMATIC uniswap v2 Pair
  };

  const BridgeContract = await hre.ethers.getContractFactory("EVMBridge");
  const bridge = await BridgeContract.deploy(
    chain,
    '0x26c80854c36ff62bba7414a358c8c23bbb8dec39',
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