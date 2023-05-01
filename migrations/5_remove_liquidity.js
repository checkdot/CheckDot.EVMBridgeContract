const Bridge = artifacts.require('EVMBridge');

module.exports = async function (deployer, network, accounts) {
    if (network == "development") return ;

    if (network == "bsc") {
        const bridgeDeployed = await Bridge.deployed();
        const erc20Address = '0x0cBD6fAdcF8096cC9A43d90B45F65826102e3eCE';

        await bridgeDeployed.withdraw(erc20Address, web3.utils.toWei("2000"), { from: accounts[0] });
    }

    if (network == "eth") {
        const bridgeDeployed = await Bridge.deployed();
        const erc20Address = '0xCdB37A4fBC2Da5b78aA4E41a432792f9533e85Cc';

        await bridgeDeployed.withdraw(erc20Address, web3.utils.toWei("9895808"), { from: accounts[0] });
    }
};