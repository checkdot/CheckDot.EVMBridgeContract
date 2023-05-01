const hre = require("hardhat");

async function main() {
  const token = await (await ethers.getContractFactory("EVMBridge")).attach("0xa8cC7370C641eAcFA4c60e0B8B7eBfB06da55DfC")


  await token.deposit("0x26c80854C36FF62BBa7414a358C8C23BBb8dEC39", "9897808000000000000000000");

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