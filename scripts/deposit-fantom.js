const hre = require("hardhat");

async function main() {
  const token = await (await ethers.getContractFactory("EVMBridge")).attach("0x1dCF92BfA88082d1c5FE57e93df21Aa82396CF5a")


  await token.deposit("0x0cBD6fAdcF8096cC9A43d90B45F65826102e3eCE", "9897808000000000000000000");

  console.log(
    `CheckDot Deposit to ${token.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});